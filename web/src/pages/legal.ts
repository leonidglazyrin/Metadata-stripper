// Privacy Policy and Terms of Service, rendered by LegalPage.tsx with the
// same blocks as the guides. __CONTACT_EMAIL__ is filled in by the server
// from CONTACT_EMAIL. These are drafts: have them reviewed by a lawyer for
// the countries you operate in before relying on them.

import type { Section } from './guides';

export type LegalDoc = {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  updated: string;
  intro: string[];
  sections: Section[];
};

const UPDATED = '2026-11-11';
const CONTACT = '[__CONTACT_EMAIL__](mailto:__CONTACT_EMAIL__)';

export const PRIVACY: LegalDoc = {
  path: '/privacy/',
  title: 'Privacy Policy',
  metaTitle: 'Privacy Policy · {site}',
  description: 'How {site} handles your account, payments and files: on-device mode never uploads them, and server mode deletes them right after processing.',
  updated: UPDATED,
  intro: [
    'This policy explains what {site} (“we”, “us”) collects when you use the website and its tools, why, and what you can do about it. The short version: files you clean on your device never reach us, files you process on our server are deleted as soon as they are done, and we do not sell your data or show ads.',
  ],
  sections: [
    {
      h: '1. What we collect',
      blocks: [
        { p: '**Your account.** You sign in with Google. Google tells us your name, email address, profile picture and a Google account ID. We use these to identify your account and show who is signed in.' },
        { p: '**Your subscription.** Payments are handled by Stripe. We never see or store your card number. Stripe tells us a customer ID, which plan you are on, its status (for example active or cancelled) and the current billing period.' },
        { p: '**Usage counts.** We count how many strips and downloads each account has used, with the time of each use, so we can apply the free allowance and plan limits.' },
        { p: '**Server logs.** Like most websites, our server records technical logs of requests: time, the tool used, file names and sizes, the links you paste into a downloader, error messages and, for sign-in and billing events, your account ID and email. We use them to keep the service running, fix problems and prevent abuse.' },
        { p: '**Basic request data.** Your IP address and browser details reach our hosting provider with every request, as they do for any website.' },
      ],
    },
    {
      h: '2. Your files',
      blocks: [
        { p: '**This device mode.** The file is processed inside your browser. It is never uploaded to us, and we cannot see it. Only a usage count is sent to our server.' },
        { p: '**Server mode.** The file is uploaded over an encrypted connection, processed in temporary storage on our server, sent back to you, and deleted as soon as the request finishes, whether it succeeded or failed. We do not keep copies, look at the contents, share them, or use them to train any model.' },
        { p: '**Downloaders.** When you paste a link, our server fetches that public video from the platform and keeps the resulting file for up to 30 minutes so you can save it, then deletes it. The link and the video title appear in our logs.' },
      ],
    },
    {
      h: '3. Why we use it (legal bases)',
      blocks: [
        {
          ul: [
            'To provide the service you signed up for: your account, the tools, your subscription and usage limits (performance of a contract).',
            'To keep the service secure and working, and to prevent abuse of the free allowance (our legitimate interests).',
            'To keep billing and tax records (legal obligation).',
          ],
        },
        { p: 'We do not use your data for advertising or sell it to anyone.' },
      ],
    },
    {
      h: '4. Who we share it with',
      blocks: [
        { p: 'We use a small number of service providers, who process data on our behalf and only for the purposes above:' },
        {
          ul: [
            '**Google**, for sign-in.',
            '**Stripe**, for payments, invoices and the subscription portal. Stripe’s own [privacy policy](https://stripe.com/privacy) applies to the payment details you give it.',
            '**Supabase**, which hosts our database of accounts, subscriptions and usage counts.',
            '**Our hosting provider**, which runs the server and handles network traffic.',
          ],
        },
        { p: 'When you use a downloader, our server contacts the platform you linked to (YouTube, TikTok, X or Instagram) to fetch the video. We may also disclose data if the law requires it, or to protect our rights or users.' },
      ],
    },
    {
      h: '5. Cookies and local storage',
      blocks: [
        {
          ul: [
            'A session cookie keeps you signed in for up to 30 days. It is HttpOnly, so scripts on the page cannot read it.',
            'A short-lived cookie protects the Google sign-in from forgery while you sign in.',
            'Your browser’s local storage remembers preferences such as your last chosen tool and mode. It stays on your device.',
          ],
        },
        { p: 'We do not use advertising or cross-site tracking cookies. The landing page shows “featured on” badges loaded from the sites that issue them; those sites can see that your browser loaded the image.' },
      ],
    },
    {
      h: '6. How long we keep it',
      blocks: [
        {
          ul: [
            'Files: deleted right after processing (server mode) or never received (device mode). Downloaded videos: up to 30 minutes.',
            'Account, subscription and usage data: while your account exists. When you ask us to delete your account, we delete it, except records we must keep by law.',
            'Billing records: as long as tax and accounting law requires, usually several years. Stripe keeps its own records.',
            'Server logs: only as long as needed to run and secure the service, then deleted.',
          ],
        },
      ],
    },
    {
      h: '7. Your rights',
      blocks: [
        { p: `Depending on where you live (for example under the GDPR in the EU and UK, or the CCPA in California), you can ask to access, correct, export or delete your data, object to or restrict how we use it, and withdraw consent. Email ${CONTACT} from the address on your account. You can also complain to your local data protection authority.` },
        { p: 'You can cancel your subscription at any time from Manage subscription in the account menu.' },
      ],
    },
    {
      h: '8. Security and transfers',
      blocks: [
        { p: 'Connections to {site} are encrypted with HTTPS, access to the database is limited to our server, and files are deleted as described above. Our providers may process data outside your country, including in the United States; where required, transfers rely on safeguards such as the European Commission’s Standard Contractual Clauses.' },
      ],
    },
    {
      h: '9. Children',
      blocks: [{ p: '{site} is not intended for children under 16, and we do not knowingly collect their data. If you believe a child has created an account, contact us and we will delete it.' }],
    },
    {
      h: '10. Changes and contact',
      blocks: [
        { p: `We may update this policy. The date at the top shows the latest version, and we will tell signed-in users about significant changes. Questions: ${CONTACT}.` },
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  path: '/terms/',
  title: 'Terms of Service',
  metaTitle: 'Terms of Service · {site}',
  description: 'The terms for using {site}: accounts, paid plans billed through Stripe, acceptable use, and the limits of what the tools can do.',
  updated: UPDATED,
  intro: [
    'These terms are an agreement between you and {site} (“we”, “us”) for your use of the website and its tools. By creating an account or using the tools, you accept them. If you do not agree, do not use {site}.',
  ],
  sections: [
    {
      h: '1. The service',
      blocks: [
        { p: '{site} provides tools to remove metadata from photos and videos, to alter files with the aim of disrupting embedded watermarks such as SynthID, and to download videos from public links on supported platforms. Tools can run in your browser (“This device”) or on our server (“Server”). We may change, add or remove features at any time.' },
      ],
    },
    {
      h: '2. Your account',
      blocks: [
        { p: 'You need a Google account to sign in. You must be at least 16 and able to form a binding contract. Keep your Google account secure: you are responsible for activity under your {site} account. One account per person; creating extra accounts to get more free uses is not allowed.' },
      ],
    },
    {
      h: '3. Plans, billing and cancellation',
      blocks: [
        {
          ul: [
            'Each account includes a limited free allowance, as shown in the app. Paid plans and their prices are shown on the pricing section of the site and at checkout.',
            'Paid plans are subscriptions billed monthly in advance through Stripe, and renew automatically until you cancel.',
            'You can cancel at any time from Manage subscription in the account menu. Your plan stays active until the end of the period you paid for; we do not refund partial months, except where the law requires it.',
            'If you are a consumer in the EU or UK, you agree that the service starts right away and acknowledge that this ends your 14-day withdrawal right once you use a paid feature, as permitted by law.',
            'We may change prices with notice before your next billing period. If you do not agree, cancel before the change applies.',
            'If a payment fails, Stripe may retry it, and we may suspend paid features until it succeeds.',
          ],
        },
      ],
    },
    {
      h: '4. Acceptable use',
      blocks: [
        { p: 'You may only process and download content that you own, or that you have the rights or permission to use. You must not use {site}:' },
        {
          ul: [
            'to infringe copyright or other rights, or to break a platform’s terms that apply to you;',
            'to deceive people, commit fraud, impersonate others, spread disinformation, or pass off AI-generated content as real where that is unlawful or causes harm;',
            'to avoid legal duties to label or disclose AI-generated or altered content;',
            'to process sexual content involving minors, non-consensual intimate imagery, or any other illegal content;',
            'to overload, probe or attack the service, get around usage limits, or resell access without our permission.',
          ],
        },
        { p: 'You are responsible for the files you process and how you use the results, including following the laws and platform rules on disclosing AI-generated content. We may suspend or close accounts that break these terms.' },
      ],
    },
    {
      h: '5. No guarantees about results',
      blocks: [
        { p: 'Metadata removal works on the formats listed on the site. Watermark disruption is best effort: watermarks such as SynthID are designed to survive edits, and detection methods change. **We do not guarantee that a file will be free of any watermark, that a detector will not identify it, or that any platform will or will not label it as AI-generated.** Keep your originals; we do not store them.' },
      ],
    },
    {
      h: '6. Downloaders',
      blocks: [
        { p: 'Downloaders only work with public videos. Private, protected and login-only content is not supported. Platforms change how they work, so a downloader may stop working for some or all links at any time. {site} is not affiliated with or endorsed by YouTube, Google, TikTok, X, Instagram or Meta, and their names are used only to describe compatibility.' },
      ],
    },
    {
      h: '7. Your content and our service',
      blocks: [
        { p: 'You keep all rights to your files. You give us only the permission needed to process them for you, which ends when they are deleted. The {site} name, website and software belong to us; these terms do not give you any rights to them beyond using the service.' },
      ],
    },
    {
      h: '8. Disclaimer and limitation of liability',
      blocks: [
        { p: 'The service is provided “as is” and “as available”, without warranties of any kind, to the fullest extent the law allows. To the fullest extent the law allows, we are not liable for indirect, incidental or consequential losses, lost data or lost profits, and our total liability for any claim is limited to the amount you paid us in the 12 months before it. Nothing in these terms limits liability that cannot be limited by law, or your statutory rights as a consumer.' },
      ],
    },
    {
      h: '9. Indemnity',
      blocks: [{ p: 'If you use {site} in breach of these terms or the law and someone makes a claim against us because of it, you agree to cover our reasonable losses and costs, to the extent the law allows.' }],
    },
    {
      h: '10. Ending the agreement',
      blocks: [{ p: 'You can stop using {site} and ask us to delete your account at any time. We may suspend or end your access if you break these terms, if required by law, or if we stop offering the service; if we stop the service, we will refund any prepaid period you have not used.' }],
    },
    {
      h: '11. Changes, law and contact',
      blocks: [
        { p: 'We may update these terms. The date at the top shows the latest version; for significant changes we will tell signed-in users in advance. If you keep using {site} after a change, the new terms apply.' },
        { p: 'These terms are governed by the laws of the country where the operator of {site} is established, without depriving consumers of the protection of the mandatory laws of the country where they live.' },
        { p: `Questions: ${CONTACT}. See also our [Privacy Policy](/privacy/).` },
      ],
    },
  ],
};

export const LEGAL_DOCS = [PRIVACY, TERMS];
