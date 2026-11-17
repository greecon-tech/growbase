// English content. Keep the key structure identical to sq.mjs (scripts/check.mjs enforces this).
// Inline markup: *italic*  **bold**  [text](https://…)  [text](@routeKey)  [text](mailto:…)

export default {
  lang: 'en',
  locale: 'en_US',
  label: 'English',
  short: 'EN',

  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    closeMenu: 'Close menu',
    homeLabel: 'Grow Base — home',
    primaryNav: 'Primary navigation',
    footerNav: 'Footer navigation',
    legalNav: 'Legal',
    languageNav: 'Language',
    switchTo: 'Shqip',
    switchToLabel: 'Shiko këtë faqe në shqip',
    cta: 'Start a project',
    nav: { services: 'Services', process: 'Process', about: 'About', contact: 'Contact' },
    breadcrumbHome: 'Home',
    footer: {
      tagline: 'A boutique marketing studio. Strategy, creativity, and calm execution.',
      explore: 'Explore',
      contact: 'Contact',
      follow: 'Follow',
      rights: 'All rights reserved.',
      art: 'Art: Claude Lorrain & François Lemoyne — public domain.',
      artLink: 'Credits',
      legal: { privacy: 'Privacy Policy', cookies: 'Cookie Notice', terms: 'Terms & Legal Notice' },
    },
  },

  seo: {
    home: {
      title: 'Grow Base — Boutique Marketing Studio in Tirana',
      description:
        'Grow Base is a boutique marketing studio in Tirana helping businesses clarify their message, scale campaigns, and turn attention into measurable results.',
    },
    services: {
      title: 'Services — Brand, Advertising, Web & CRM | Grow Base',
      description:
        'Brand identity, advertising on Google, Meta, TikTok and LinkedIn, websites that convert and CRM systems — one calm, measurable approach to modern marketing.',
    },
    process: {
      title: 'Our Process — Discover, Design, Deliver, Evolve | Grow Base',
      description:
        'Growth is not a mystery — it’s a system. See how Grow Base moves from discovery to design, delivery and continuous evolution, with progress every week.',
    },
    about: {
      title: 'About — Smarter, Simpler, More Human Marketing | Grow Base',
      description:
        'A small team of senior professionals in branding, design, advertising and web development, based in Tirana and working with clients globally.',
    },
    contact: {
      title: 'Contact — Start a Project | Grow Base',
      description:
        'Send us your website and goals and we’ll reply with personalized insights and a clear plan forward. Grow Base — Tirana, Albania, working globally.',
    },
    privacy: {
      title: 'Privacy Policy | Grow Base',
      description: 'How Grow Base collects, uses and protects personal data on growbase.agency, and the rights you have over it.',
    },
    cookies: {
      title: 'Cookie Notice | Grow Base',
      description: 'growbase.agency sets no cookies and uses no third-party trackers. Here is what that means for you.',
    },
    terms: {
      title: 'Terms of Use & Legal Notice | Grow Base',
      description: 'Legal notice, terms of use and art credits for growbase.agency, operated by Grow Base in Tirana, Albania.',
    },
    thanks: {
      title: 'Thank you | Grow Base',
      description: 'Your message to Grow Base has been received.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Boutique marketing studio · Tirana',
      title: 'Growth is not a mystery. It’s a *system*.',
      lead:
        'Grow Base is a boutique marketing studio helping businesses clarify their message, scale campaigns, and convert attention into measurable results — with strategy, creativity, and calm execution.',
      primary: 'Start a project',
      secondary: 'See how we work',
      art: {
        alt: 'Oil painting of a harbour with the sun low over calm water: a tall ship beside a stone tower, rowing boats loading cargo, a palace and ancient columns framing the scene.',
        caption: '*Seaport with the Embarkation of the Queen of Sheba*',
        credit: 'Claude Lorrain, 1648 · National Gallery, London',
      },
      facts: [
        { k: 'Tirana, Albania', v: 'Working with clients globally' },
        { k: 'Senior team', v: 'Branding, design, advertising, web' },
        { k: 'Every week', v: 'Progress you can see and measure' },
        { k: 'Platforms', v: 'Google · Meta · TikTok · LinkedIn' },
      ],
    },
    marquee: ['Strategy', 'Creativity', 'Calm execution', 'Measurable results'],
    work: {
      eyebrow: 'Our work',
      title: 'Our work speaks for *itself*',
      intro:
        'From startups finding their first customers to established brands looking to scale, we’ve helped companies grow through strategy, storytelling, and smart execution.',
      cards: [
        { n: 'I', k: 'E-commerce', t: 'Ad systems that perform', p: 'We increased e-commerce revenue through high-performing ad systems.' },
        { n: 'II', k: 'B2B', t: 'Pipelines, automated', p: 'We transformed B2B marketing pipelines with automation.' },
        { n: 'III', k: 'Brand', t: 'Identities that elevate', p: 'We redesigned brand identities that elevated online presence and conversion rates.' },
      ],
      outro: 'Every project starts with understanding what truly matters — growth that feels consistent, sustainable, and real.',
    },
    services: {
      eyebrow: 'What we do',
      title: 'A complete approach to *modern marketing*',
      intro:
        'We start by defining who you are and where you stand in your market. From there, every detail is designed to make your marketing calm, effective, and measurable.',
      items: [
        { n: '01', t: 'Brand identity', p: 'Who you are and where you stand — shaped into an identity that communicates trust and value.', tags: ['Positioning', 'Voice', 'Visual identity'] },
        { n: '02', t: 'Advertising', p: 'Campaigns that reach the right people on Google, Meta, TikTok, and LinkedIn, guided by precise performance data.', tags: ['Google', 'Meta', 'TikTok', 'LinkedIn'] },
        { n: '03', t: 'Websites & content', p: 'Websites and content that turn visitors into customers.', tags: ['Websites', 'Landing pages', 'Content'] },
        { n: '04', t: 'CRM & automation', p: 'CRM systems that turn leads into loyal relationships.', tags: ['CRM', 'Automation', 'Lead nurturing'] },
      ],
      link: 'Explore our services',
    },
    process: {
      eyebrow: 'How we work',
      title: 'Our process is built on *clarity* and focus',
      intro:
        'We begin every collaboration with a fast discovery phase to understand your audience, goals, and data. Then we design, launch, measure, and refine — openly and every week.',
      steps: [
        { n: 'I', t: 'Discover', p: 'We study your business, audience, data, and competitors.' },
        { n: 'II', t: 'Design', p: 'Strategy meets creativity: voice, identity, campaigns, and landing pages.' },
        { n: 'III', t: 'Deliver', p: 'We launch, measure everything, and ship improvements weekly.' },
        { n: 'IV', t: 'Evolve', p: 'We track, adapt, and compound progress as your business grows.' },
      ],
      outro: 'This rhythm of strategy, design, and delivery ensures you see progress every single week.',
      link: 'Read the full process',
    },
    philosophy: {
      eyebrow: 'Our philosophy',
      intro: 'Grow Base was created with one goal: to make marketing smarter, simpler, and more human.',
      lines: ['Clarity beats *complexity.*', 'Creativity must *pay for itself.*', 'Progress comes from shipping small, *steady* improvements.'],
      art: {
        alt: 'Baroque ceiling painting: gods and heroes rising through luminous clouds into a blue sky, a golden canopy held aloft at the centre.',
        caption: '*The Apotheosis of Hercules*',
        credit: 'François Lemoyne, 1736 · Salon d’Hercule, Versailles',
      },
      link: 'About Grow Base',
    },
    cta: {
      title: 'Let’s talk about your *project.*',
      p: 'Send us a quick message with your website and goals, and we’ll respond with personalized insights and a clear plan forward.',
      primary: 'Start a project',
    },
  },

  services: {
    hero: {
      eyebrow: 'Services',
      title: 'A complete approach to *modern marketing*',
      lead:
        'We start by defining who you are and where you stand in your market, shaping a brand identity that communicates trust and value. From there, we design advertising, websites, content, and CRM systems that work together — calm, effective, and measurable.',
    },
    includes: 'What’s included',
    items: [
      {
        id: 'brand',
        n: '01',
        t: 'Brand identity',
        p: [
          'Before any campaign, we get clear on who you are and where you stand in your market. We shape a brand identity — voice, visuals, and message — that communicates trust and value, and gives every channel something consistent to say.',
        ],
        list: ['Market and competitor positioning', 'Brand voice and messaging', 'Visual identity and guidelines', 'Content direction'],
      },
      {
        id: 'advertising',
        n: '02',
        t: 'Advertising',
        p: [
          'We design advertising campaigns that reach the right people on platforms like Google, Meta, TikTok, and LinkedIn, combining creativity with precise performance data.',
        ],
        list: ['Campaign strategy and creative', 'Google, Meta, TikTok, and LinkedIn ads', 'Tracking, reporting, and weekly optimization', 'High-performing ad systems for e-commerce'],
      },
      {
        id: 'web',
        n: '03',
        t: 'Websites & content',
        p: ['We create websites and content that convert visitors into customers: clear structure, fast pages, and a story worth reading.'],
        list: ['Websites and landing pages', 'Content and storytelling', 'Conversion-focused structure', 'Analytics-ready setup'],
      },
      {
        id: 'crm',
        n: '04',
        t: 'CRM & automation',
        p: ['We develop CRM systems that turn leads into loyal relationships, and automation that keeps your marketing pipeline moving without the noise.'],
        list: ['CRM setup and structure', 'Marketing automation', 'Lead nurturing flows', 'B2B pipeline reporting'],
      },
    ],
    closing: {
      title: 'Calm, effective, measurable.',
      p: 'Every detail is designed to make your marketing calm, effective, and measurable — and every project starts by understanding what truly matters to your business.',
    },
    cta: {
      title: 'Not sure where to start? *Start with a conversation.*',
      p: 'Send us your website and goals. We’ll reply with personalized insights and a clear plan forward.',
      primary: 'Start a project',
    },
  },

  process: {
    hero: {
      eyebrow: 'Process',
      title: 'Growth is not a mystery — it’s a *system*',
      lead:
        'Every successful collaboration begins with clarity, structure, and a shared goal. Our process brings creative ideas and business objectives into perfect alignment, so your brand can grow calmly, intelligently, and with measurable results.',
    },
    steps: [
      {
        n: 'I',
        t: 'Discover',
        tagline: 'Understand before we act.',
        p: [
          'Every partnership begins with understanding. In this phase, we take a deep look into your business, your audience, and your current performance. We analyze your data, review your content, and study your competitors to uncover what truly drives results — and what’s holding you back.',
          'This discovery process is not just research; it’s the foundation that shapes every decision moving forward.',
        ],
      },
      {
        n: 'II',
        t: 'Design',
        tagline: 'Where strategy meets creativity.',
        p: [
          'Once we’ve gathered insights, we move into design. Here we develop your brand voice, visual identity, and content direction. We build campaigns, landing pages, and systems that communicate your story clearly and attract the right audience.',
          'The focus is always on simplicity, functionality, and consistency — design that not only looks good but performs even better.',
        ],
      },
      {
        n: 'III',
        t: 'Deliver',
        tagline: 'Where clarity becomes impact.',
        p: [
          'Execution is where clarity becomes impact. We launch your campaigns, monitor data, and refine continuously based on real results.',
          'Our delivery process is fast, transparent, and adaptive — we measure everything, learn quickly, and optimize constantly. By shipping weekly improvements instead of waiting for big moments, we create a rhythm of progress that compounds over time.',
        ],
      },
      {
        n: 'IV',
        t: 'Evolve',
        tagline: 'Growth doesn’t stop at launch.',
        p: [
          'Growth doesn’t stop after launch. We track performance across platforms, identify new opportunities, and adapt strategies as your business evolves.',
          'This continuous optimization keeps your brand relevant, your message strong, and your marketing efficient. Every phase builds on the last — making your growth sustainable and scalable.',
        ],
      },
    ],
    rhythm: {
      eyebrow: 'The weekly rhythm',
      title: 'You see progress every single week',
      items: [
        { t: 'Measure', p: 'We measure everything that matters.' },
        { t: 'Refine', p: 'We refine constantly, based on real results.' },
        { t: 'Communicate', p: 'We communicate openly, so you always know where you stand.' },
      ],
    },
    cta: {
      title: 'Ready to start the *first phase?*',
      p: 'Discovery is fast. Send us your website and goals, and we’ll take it from there.',
      primary: 'Start a project',
    },
  },

  about: {
    hero: {
      eyebrow: 'About',
      title: 'Marketing that is smarter, simpler, and more *human*',
      lead: 'Grow Base was created with one goal: to make marketing smarter, simpler, and more human.',
    },
    story: {
      title: 'A small team doing real work',
      p: [
        'We’re a small team of senior professionals across branding, design, advertising, and web development. We don’t believe in complicated hierarchies or noisy processes; we believe in doing real work that drives real results.',
        'Based in Tirana and working with clients globally, we value transparency, consistency, and long-term partnerships.',
      ],
      facts: [
        { k: 'Based in', v: 'Tirana, Albania' },
        { k: 'Working with', v: 'Clients globally' },
        { k: 'The team', v: 'Senior professionals' },
        { k: 'Disciplines', v: 'Branding, design, advertising, web development' },
      ],
    },
    principles: {
      eyebrow: 'Our philosophy',
      title: 'Three beliefs we work by',
      items: [
        { n: 'I', t: 'Clarity beats complexity', p: 'A clear message, a simple structure, and a focused plan outperform clever complication every time.' },
        { n: 'II', t: 'Creativity must pay for itself', p: 'We love bold ideas — and we measure them. Creative work earns its place by moving real numbers.' },
        { n: 'III', t: 'Progress comes from small, steady improvements', p: 'We ship weekly instead of waiting for big moments, and let consistent progress compound.' },
      ],
    },
    values: {
      title: 'What we value',
      items: [
        { t: 'Transparency', p: 'Open communication and honest reporting, always.' },
        { t: 'Consistency', p: 'The same standard of work, week after week.' },
        { t: 'Long-term partnerships', p: 'We grow when you grow — that’s the only metric that lasts.' },
      ],
    },
    gallery: {
      eyebrow: 'Gallery note',
      title: 'Why the old masters?',
      lead: 'The paintings on this site are public-domain masterworks, chosen for what they quietly teach about our craft.',
      items: [
        {
          set: 'lorrain-arch',
          alt: 'Claude Lorrain’s harbour scene: tall ship, stone tower and sun low over calm water.',
          t: '*Seaport with the Embarkation of the Queen of Sheba*',
          credit: 'Claude Lorrain, 1648 · National Gallery, London',
          p: 'A harbour with the sun low over open water, cargo being loaded, a ship about to leave. Every launch deserves a heading this clear.',
        },
        {
          set: 'lemoyne-arch',
          alt: 'Lemoyne’s ceiling: figures rising through bright clouds into a blue sky.',
          t: '*The Apotheosis of Hercules*',
          credit: 'François Lemoyne, completed 1736 · Salon d’Hercule, Versailles',
          p: 'On the ceiling of Versailles, Lemoyne opens the vault into sky and lets a hero rise among the gods. Growth, painted as ascent.',
        },
      ],
      outro: 'Composition, light, patience: the old masters understood what we practise every day.',
    },
    cta: {
      title: 'Let’s build something *steady.*',
      p: 'Tell us about your business and where you want it to go.',
      primary: 'Start a project',
    },
  },

  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Let’s talk about your *project*',
      lead:
        'We’d love to hear about your project. Whether you’re launching a new brand, scaling an existing business, or simply exploring opportunities, our team is ready to help. Send us a quick message with your website and goals, and we’ll respond with personalized insights and a clear plan forward.',
    },
    details: {
      title: 'Reach us directly',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      follow: 'Follow',
      address: 'Bulevardi Dëshmorët e Kombit',
      city: 'Tirana, Albania',
      map: 'Open in maps',
    },
    form: {
      title: 'Send us a message',
      required: 'Required fields are marked with *',
      name: 'Your name',
      email: 'Email address',
      website: 'Your website',
      websiteHint: 'Optional — it helps us prepare useful insights.',
      goals: 'Your goals',
      goalsPlaceholder: 'What would you like to achieve?',
      consent: 'I agree that Grow Base may use these details to reply to my enquiry, as described in the [Privacy Policy](@privacy).',
      submit: 'Send message',
      sending: 'Sending…',
      errorRequired: 'Please fill in this field.',
      errorEmail: 'Please enter a valid email address.',
      errorConsent: 'Please tick the box so we can reply to you.',
      errorSend: 'Something went wrong. Please try again, or write to us at info@growbase.agency.',
      successTitle: 'Thank you — message received',
      successText: 'We’ll review your website and goals and get back to you with personalized insights and a clear plan forward.',
    },
  },

  thanks: {
    eyebrow: 'Message received',
    title: 'Thank *you.*',
    p: 'Your message is on its way to our team. We’ll review your website and goals and respond with personalized insights and a clear plan forward.',
    back: 'Back to home',
    explore: 'Explore our process',
  },

  notFound: {
    eyebrow: 'Error 404',
    title: 'This page has set *sail.*',
    p: 'We couldn’t find the page you were looking for. It may have moved, or the link may be mistyped.',
    back: 'Back to home',
  },

  legal: {
    tocLabel: 'On this page',
    updatedLabel: 'Last updated',
    updated: '17 November 2026',
    privacy: {
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      lead: 'We collect very little personal data, we use it only to talk to you, and we never sell it. This page explains the details.',
      sections: [
        {
          id: 'controller',
          h: 'Who we are',
          blocks: [
            'This website, growbase.agency, is operated by **Grow Base** (“Grow Base”, “we”, “us”), a marketing studio based at Bulevardi Dëshmorët e Kombit, Tirana, Albania. We are the controller of the personal data described in this policy.',
            'For anything related to privacy, write to [info@growbase.agency](mailto:info@growbase.agency) or call +355 69 829 8980.',
            'We process personal data in line with Albanian Law No. 124/2024 “On the Protection of Personal Data” and, for visitors in the European Union and European Economic Area, the General Data Protection Regulation (GDPR, Regulation (EU) 2016/679).',
          ],
        },
        {
          id: 'data',
          h: 'What we collect',
          blocks: [
            'We keep data collection to a minimum. This website has no user accounts, no advertising trackers, and no analytics cookies.',
            [
              '**Contact form** — your name, email address, website (optional), the message you write, and the time you sent it.',
              '**Direct communication** — anything you send us by email, phone, or social media, such as your contact details and project information.',
              '**Technical data** — when you visit, our hosting provider automatically processes your IP address, browser type, device, the pages requested, and the time of the request in server logs, for security and to deliver the site.',
            ],
          ],
        },
        {
          id: 'purposes',
          h: 'Why we use it, and on what basis',
          blocks: [
            [
              'To reply to your enquiry and, if you ask, prepare a proposal — necessary to take steps at your request before entering into a contract (GDPR Art. 6(1)(b)), and our legitimate interest in answering the people who contact us (Art. 6(1)(f)).',
              'To keep the website secure and prevent spam and abuse — our legitimate interest (Art. 6(1)(f)).',
              'To meet legal obligations, such as accounting and tax rules if you become a client (Art. 6(1)(c)).',
            ],
            'Where we rely on your consent, you can withdraw it at any time without affecting earlier processing. We do not sell personal data, and we do not use it for automated decision-making or profiling.',
          ],
        },
        {
          id: 'recipients',
          h: 'Who receives it',
          blocks: [
            'We share personal data only with providers that help us run the site and our business, under contracts that require them to protect it:',
            [
              '**Hosting and form handling** — Netlify, Inc., which hosts this website and stores contact-form submissions on our behalf.',
              '**Email and business tools** — the providers we use to send and receive email, manage projects, and keep records.',
              '**Professional advisers and authorities** — where the law requires it, or to protect our legal rights.',
            ],
            'Some providers are located outside Albania, including in the United States. Where data is transferred internationally, we rely on appropriate safeguards such as adequacy decisions, standard contractual clauses, or equivalent mechanisms.',
          ],
        },
        {
          id: 'retention',
          h: 'How long we keep it',
          blocks: [
            'We keep enquiries only as long as needed to respond and follow up — normally no longer than 24 months after our last contact. If we work together, we keep project and invoicing records for as long as accounting and tax law requires. Server logs are kept by our hosting provider for a short period only.',
          ],
        },
        {
          id: 'rights',
          h: 'Your rights',
          blocks: [
            'Subject to the law, you have the right to:',
            [
              'access the personal data we hold about you;',
              'have inaccurate data corrected;',
              'have your data erased;',
              'restrict how we process it;',
              'receive your data in a portable format;',
              'object to processing based on our legitimate interests; and',
              'withdraw consent at any time.',
            ],
            'To exercise any of these rights, email [info@growbase.agency](mailto:info@growbase.agency). We will respond within one month. If you are not happy with our response, you can complain to Albania’s Commissioner for the Right to Information and Protection of Personal Data ([idp.al](https://idp.al)) or to the data protection authority in your own EU/EEA country.',
          ],
        },
        {
          id: 'security',
          h: 'Security',
          blocks: [
            'We serve the whole site over HTTPS, limit access to personal data to the people who need it, and choose reputable providers. No system is perfectly secure, so please avoid sending sensitive information — such as passwords or payment details — through the contact form.',
          ],
        },
        {
          id: 'children',
          h: 'Children',
          blocks: ['Our services are for businesses. This website is not directed at children, and we do not knowingly collect their data.'],
        },
        {
          id: 'links',
          h: 'Links to other sites',
          blocks: ['This website links to our Instagram and LinkedIn profiles. Those platforms have their own privacy policies, and we do not control them.'],
        },
        {
          id: 'changes',
          h: 'Changes to this policy',
          blocks: ['We may update this policy as our practices or the law change. The date at the top of the page shows when it was last revised.'],
        },
      ],
    },
    cookies: {
      eyebrow: 'Legal',
      title: 'Cookie Notice',
      lead: 'This website sets no cookies and uses no third-party trackers — so there is no cookie banner to click away.',
      sections: [
        {
          id: 'short',
          h: 'In short',
          blocks: ['growbase.agency does not use cookies for analytics, advertising, or profiling, and it does not load third-party trackers. Because of that, we do not show a cookie banner.'],
        },
        {
          id: 'what',
          h: 'What cookies are',
          blocks: ['Cookies are small text files that websites store on your device. Similar technologies, such as local storage, work in comparable ways.'],
        },
        {
          id: 'use',
          h: 'What this site uses',
          blocks: [
            'We do not set any cookies. The scripts on this site only control the mobile menu, animations, and the contact form, and they do not store anything on your device.',
            'Our typeface is hosted on our own server, so no requests are sent to third-party font services when you visit.',
          ],
        },
        {
          id: 'links',
          h: 'Links and embeds',
          blocks: ['We link to Instagram and LinkedIn but do not embed their content, so they cannot set cookies through this website. If you follow those links, their own cookie rules apply.'],
        },
        {
          id: 'change',
          h: 'If this changes',
          blocks: ['If we ever add analytics, advertising, or other non-essential technologies, we will first ask for your consent through a clear choice and update this notice.'],
        },
        {
          id: 'manage',
          h: 'Managing cookies and questions',
          blocks: [
            'You can block or delete cookies in your browser settings at any time. If you have questions about this notice, write to [info@growbase.agency](mailto:info@growbase.agency). More about how we handle personal data is in our [Privacy Policy](@privacy).',
          ],
        },
      ],
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Terms of Use & Legal Notice',
      lead: 'The practical rules for using this website, who runs it, and where our images come from.',
      sections: [
        {
          id: 'notice',
          h: 'Legal notice',
          blocks: [
            'This website is operated by **Grow Base**, a marketing studio.',
            ['Address: Bulevardi Dëshmorët e Kombit, Tirana, Albania', 'Email: [info@growbase.agency](mailto:info@growbase.agency)', 'Phone: +355 69 829 8980'],
          ],
        },
        {
          id: 'use',
          h: 'Using this website',
          blocks: ['By using this website you agree to these terms. The site provides general information about our services. Please use it lawfully, and do not try to disrupt it, probe it for vulnerabilities, or misuse the contact form (for example, to send spam).'],
        },
        {
          id: 'services',
          h: 'Our services',
          blocks: ['Information on this site is not a binding offer. Work with Grow Base is governed by a separate written agreement or proposal that sets out scope, fees, and timelines.'],
        },
        {
          id: 'results',
          h: 'No guarantee of results',
          blocks: ['Marketing performance depends on many factors outside our control, including market conditions, budgets, product-market fit, and platform changes. The examples and descriptions on this site illustrate our approach and do not promise any specific outcome.'],
        },
        {
          id: 'ip',
          h: 'Intellectual property',
          blocks: ['The Grow Base name, logo, design, text, and code on this site belong to Grow Base or its licensors and are protected by copyright and other laws. You may view the site and share links to it, but you may not copy or reuse our content or brand without written permission.'],
        },
        {
          id: 'credits',
          h: 'Art and typeface credits',
          blocks: [
            'The paintings on this site are works in the public domain, shown through public-domain reproductions hosted on Wikimedia Commons:',
            [
              '*Seaport with the Embarkation of the Queen of Sheba* — Claude Lorrain, 1648. National Gallery, London.',
              '*The Apotheosis of Hercules* (ceiling) — François Lemoyne, completed 1736. Salon d’Hercule, Palace of Versailles.',
            ],
            'The typeface is Tinos, a metric-compatible companion to Times New Roman, used under the SIL Open Font License 1.1.',
          ],
        },
        {
          id: 'liability',
          h: 'Liability and external links',
          blocks: ['We take care to keep this site accurate and available, but it is provided “as is”. To the fullest extent permitted by law, Grow Base is not liable for losses arising from use of the site or reliance on its content, and we are not responsible for the content of third-party sites we link to. Nothing here limits liability that cannot be limited by law.'],
        },
        {
          id: 'law',
          h: 'Governing law',
          blocks: ['These terms are governed by the laws of the Republic of Albania, and the courts of Tirana have jurisdiction, without affecting any mandatory rights you may have as a consumer in your country of residence.'],
        },
        {
          id: 'contact',
          h: 'Changes and contact',
          blocks: ['We may update these terms from time to time; the date at the top shows the latest revision. Questions? Write to [info@growbase.agency](mailto:info@growbase.agency).'],
        },
      ],
    },
  },
};
