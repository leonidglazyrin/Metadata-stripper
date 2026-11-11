// RGB fallback for the video SynthID filter, used only when a decoded frame
// isn't in a YUV layout we can filter directly (see synthid-yuv.ts).
// Same chain: 3×3 gblur sigma 0.3 → ±1 temporal luma noise → 3×3 luma unsharp 0.4.

const VERT = `#version 300 es
in vec2 p;
out vec2 uv;
void main() {
  uv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

// Pass 1: 3×3 blur with ffmpeg gblur=sigma=0.3's measured strength (0.0395 / 0.921), then
// uniform noise of ±1 code value on luma, re-seeded every frame like c0f=t.
// The frame is flipped here so the output ends up upright after readback.
const PASS1 = `#version 300 es
precision highp float;
uniform sampler2D src;
uniform vec2 texel;
uniform float seed;
in vec2 uv;
out vec4 color;
const float S = 0.0395;
const float C = 0.921;
float hash(vec2 q) {
  vec3 p3 = fract(vec3(q.xyx) * 0.1031 + seed);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
void main() {
  vec2 st = vec2(uv.x, 1.0 - uv.y);
  vec3 acc = vec3(0.0);
  for (int y = -1; y <= 1; y++) {
    float wy = y == 0 ? C : S;
    for (int x = -1; x <= 1; x++) {
      float wx = x == 0 ? C : S;
      acc += wx * wy * texture(src, st + vec2(float(x), float(y)) * texel).rgb;
    }
  }
  float n = (hash(gl_FragCoord.xy) * 2.0 - 1.0) / 255.0;
  color = vec4(clamp(acc + n, 0.0, 1.0), 1.0);
}`;

// Pass 2: unsharp on luma only, 3×3, amount 0.4 (chroma amount 0).
const PASS2 = `#version 300 es
precision highp float;
uniform sampler2D src;
uniform vec2 texel;
in vec2 uv;
out vec4 color;
const vec3 L = vec3(0.2126, 0.7152, 0.0722);
void main() {
  vec3 c = texture(src, uv).rgb;
  float sum = 0.0;
  for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++)
      sum += dot(L, texture(src, uv + vec2(float(x), float(y)) * texel).rgb);
  float d = 0.4 * (dot(L, c) - sum / 9.0);
  color = vec4(clamp(c + d, 0.0, 1.0), 1.0);
}`;

export class GlFilter {
  readonly canvas: OffscreenCanvas;
  private gl: WebGL2RenderingContext;
  private p1: WebGLProgram;
  private p2: WebGLProgram;
  private srcTex: WebGLTexture;
  private midTex: WebGLTexture;
  private fbo: WebGLFramebuffer;
  private w = 0;
  private h = 0;
  private frame = 0;

  constructor() {
    this.canvas = new OffscreenCanvas(2, 2);
    const gl = this.canvas.getContext('webgl2', { premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: false });
    if (!gl) throw new Error('WebGL2 unavailable');
    this.gl = gl;
    this.p1 = this.program(PASS1);
    this.p2 = this.program(PASS2);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    for (const prog of [this.p1, this.p2]) {
      const loc = gl.getAttribLocation(prog, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    }
    this.srcTex = this.texture();
    this.midTex = this.texture();
    this.fbo = gl.createFramebuffer()!;
  }

  private program(frag: string) {
    const gl = this.gl;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link');
    return prog;
  }

  private texture() {
    const gl = this.gl;
    const t = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  }

  private resize(w: number, h: number) {
    const gl = this.gl;
    this.w = w;
    this.h = h;
    this.canvas.width = w;
    this.canvas.height = h;
    gl.bindTexture(gl.TEXTURE_2D, this.midTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.midTex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /** Filters one frame; the result is left on `this.canvas`. */
  apply(frame: TexImageSource, w: number, h: number) {
    const gl = this.gl;
    if (w !== this.w || h !== this.h) this.resize(w, h);
    gl.viewport(0, 0, w, h);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.srcTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, frame);

    gl.useProgram(this.p1);
    gl.uniform1i(gl.getUniformLocation(this.p1, 'src'), 0);
    gl.uniform2f(gl.getUniformLocation(this.p1, 'texel'), 1 / w, 1 / h);
    gl.uniform1f(gl.getUniformLocation(this.p1, 'seed'), (this.frame++ * 0.618034) % 1);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.useProgram(this.p2);
    gl.bindTexture(gl.TEXTURE_2D, this.midTex);
    gl.uniform1i(gl.getUniformLocation(this.p2, 'src'), 0);
    gl.uniform2f(gl.getUniformLocation(this.p2, 'texel'), 1 / w, 1 / h);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.flush();
  }
}

