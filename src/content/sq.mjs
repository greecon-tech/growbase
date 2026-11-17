// Albanian (Shqip) content. Keep the key structure identical to en.mjs (scripts/check.mjs enforces this).
// Register: formal "ju" throughout, as is standard for business websites.
// Inline markup: *italic*  **bold**  [text](https://…)  [text](@routeKey)  [text](mailto:…)

export default {
  lang: 'sq',
  locale: 'sq_AL',
  label: 'Shqip',
  short: 'SQ',

  ui: {
    skip: 'Kalo te përmbajtja',
    menu: 'Menyja',
    closeMenu: 'Mbyll menynë',
    homeLabel: 'Grow Base — kryefaqja',
    primaryNav: 'Navigimi kryesor',
    footerNav: 'Navigimi në fund të faqes',
    legalNav: 'Dokumente ligjore',
    languageNav: 'Gjuha',
    switchTo: 'English',
    switchToLabel: 'View this page in English',
    cta: 'Filloni një projekt',
    nav: { services: 'Shërbimet', process: 'Procesi', about: 'Rreth nesh', contact: 'Kontakt' },
    breadcrumbHome: 'Kryefaqja',
    footer: {
      tagline: 'Një studio marketingu butik. Strategji, kreativitet dhe ekzekutim i qetë.',
      explore: 'Eksploroni',
      contact: 'Kontakt',
      follow: 'Na ndiqni',
      rights: 'Të gjitha të drejtat e rezervuara.',
      art: 'Arti: Claude Lorrain dhe François Lemoyne — pronë publike.',
      artLink: 'Kreditet',
      legal: { privacy: 'Politika e Privatësisë', cookies: 'Njoftimi për Cookies', terms: 'Kushtet dhe Njoftimi Ligjor' },
    },
  },

  seo: {
    home: {
      title: 'Grow Base — Studio marketingu butik në Tiranë',
      description:
        'Studio marketingu butik në Tiranë që ndihmon bizneset të qartësojnë mesazhin, të shkallëzojnë fushatat dhe ta kthejnë vëmendjen në rezultate të matshme.',
    },
    services: {
      title: 'Shërbimet — Marka, Reklamim, Web dhe CRM | Grow Base',
      description:
        'Identitet marke, reklamim në Google, Meta, TikTok dhe LinkedIn, faqe që konvertojnë dhe sisteme CRM — një qasje e qetë dhe e matshme ndaj marketingut.',
    },
    process: {
      title: 'Procesi ynë — Zbulim, Dizajn, Realizim, Evolucion | Grow Base',
      description:
        'Rritja nuk është mister — është sistem. Shihni si ecën Grow Base nga zbulimi te dizajni, realizimi dhe evolucioni i vazhdueshëm, me progres çdo javë.',
    },
    about: {
      title: 'Rreth nesh — Marketing më i thjeshtë, më njerëzor | Grow Base',
      description:
        'Një ekip i vogël profesionistësh me përvojë në markë, dizajn, reklamim dhe zhvillim web, me qendër në Tiranë dhe klientë në të gjithë botën.',
    },
    contact: {
      title: 'Kontakt — Filloni një projekt | Grow Base',
      description:
        'Na dërgoni faqen tuaj dhe objektivat, dhe do t’ju përgjigjemi me vlerësime të personalizuara dhe një plan të qartë. Grow Base — Tiranë, Shqipëri.',
    },
    privacy: {
      title: 'Politika e Privatësisë | Grow Base',
      description: 'Si i mbledh, i përdor dhe i mbron Grow Base të dhënat personale në growbase.agency, dhe të drejtat që keni mbi to.',
    },
    cookies: {
      title: 'Njoftimi për Cookies | Grow Base',
      description: 'growbase.agency nuk vendos cookies dhe nuk përdor gjurmues të palëve të treta. Ja çfarë do të thotë kjo për ju.',
    },
    terms: {
      title: 'Kushtet e Përdorimit dhe Njoftimi Ligjor | Grow Base',
      description: 'Njoftimi ligjor, kushtet e përdorimit dhe kreditet e artit për growbase.agency, e administruar nga Grow Base në Tiranë, Shqipëri.',
    },
    thanks: {
      title: 'Faleminderit | Grow Base',
      description: 'Mesazhi juaj për Grow Base u mor.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Studio marketingu butik · Tiranë',
      title: 'Rritja nuk është mister. Është *sistem*.',
      lead:
        'Grow Base është një studio marketingu butik që ndihmon bizneset të qartësojnë mesazhin, të shkallëzojnë fushatat dhe ta kthejnë vëmendjen në rezultate të matshme — me strategji, kreativitet dhe ekzekutim të qetë.',
      primary: 'Filloni një projekt',
      secondary: 'Shihni si punojmë',
      art: {
        alt: 'Pikturë me bojë vaji e një porti me diellin e ulët mbi ujin e qetë: një anije e lartë pranë një kulle prej guri, varka me rrema që ngarkojnë mallra, një pallat dhe kolona antike që e rrethojnë skenën.',
        caption: '*Porti me nisjen e Mbretëreshës së Shebës*',
        credit: 'Claude Lorrain, 1648 · Galeria Kombëtare, Londër',
        note: 'Çdo nisje fillon me një drejtim të qartë.',
      },
      facts: [
        { k: 'Tiranë, Shqipëri', v: 'Punojmë me klientë në të gjithë botën' },
        { k: 'Ekip me përvojë', v: 'Markë, dizajn, reklamim, web' },
        { k: 'Çdo javë', v: 'Progres që e shihni dhe e matni' },
        { k: 'Platformat', v: 'Google · Meta · TikTok · LinkedIn' },
      ],
    },
    marquee: ['Strategji', 'Kreativitet', 'Ekzekutim i qetë', 'Rezultate të matshme'],
    work: {
      eyebrow: 'Puna jonë',
      title: 'Puna jonë flet *vetë*',
      intro:
        'Nga startup-et që po gjejnë klientët e parë te markat e konsoliduara që duan të rriten, kemi ndihmuar kompani të rriten përmes strategjisë, rrëfimit dhe ekzekutimit të zgjuar.',
      cards: [
        { n: 'I', k: 'Tregti elektronike', t: 'Sisteme reklamimi që performojnë', p: 'Kemi rritur të ardhurat nga tregtia elektronike përmes sistemeve reklamuese me performancë të lartë.' },
        { n: 'II', k: 'B2B', t: 'Pipeline me automatizim', p: 'Kemi transformuar pipeline-in e marketingut B2B me automatizim.' },
        { n: 'III', k: 'Marka', t: 'Identitete që ngrenë nivelin', p: 'Kemi ridizajnuar identitete markash që e ngritën praninë online dhe shkallën e konvertimit.' },
      ],
      outro: 'Çdo projekt fillon me të kuptuarit e asaj që ka vërtet rëndësi — rritje e vazhdueshme, e qëndrueshme dhe e vërtetë.',
    },
    services: {
      eyebrow: 'Çfarë bëjmë',
      title: 'Një qasje e plotë ndaj *marketingut modern*',
      intro:
        'Fillojmë duke përcaktuar kush jeni dhe ku qëndroni në tregun tuaj. Prej andej, çdo detaj është ndërtuar që marketingu juaj të jetë i qetë, efektiv dhe i matshëm.',
      items: [
        { n: '01', t: 'Identiteti i markës', p: 'Kush jeni dhe ku qëndroni — e shndërruar në një identitet që përçon besim dhe vlerë.', tags: ['Pozicionim', 'Zë i markës', 'Identitet vizual'] },
        { n: '02', t: 'Reklamimi', p: 'Fushata që arrijnë njerëzit e duhur në Google, Meta, TikTok dhe LinkedIn, të udhëhequra nga të dhëna të sakta performance.', tags: ['Google', 'Meta', 'TikTok', 'LinkedIn'] },
        { n: '03', t: 'Faqe interneti dhe përmbajtje', p: 'Faqe interneti dhe përmbajtje që i kthejnë vizitorët në klientë.', tags: ['Faqe interneti', 'Landing page', 'Përmbajtje'] },
        { n: '04', t: 'CRM dhe automatizim', p: 'Sisteme CRM që i kthejnë lead-et në marrëdhënie besnike.', tags: ['CRM', 'Automatizim', 'Kultivimi i lead-eve'] },
      ],
      link: 'Eksploroni shërbimet tona',
    },
    process: {
      eyebrow: 'Si punojmë',
      title: 'Procesi ynë ndërtohet mbi *qartësinë* dhe fokusin',
      intro:
        'Çdo bashkëpunim e nisim me një fazë të shpejtë zbulimi për të kuptuar audiencën, objektivat dhe të dhënat tuaja. Pastaj dizajnojmë, nisim, masim dhe përmirësojmë — hapur dhe çdo javë.',
      steps: [
        { n: 'I', t: 'Zbulimi', p: 'Studiojmë biznesin, audiencën, të dhënat dhe konkurrentët tuaj.' },
        { n: 'II', t: 'Dizajni', p: 'Strategjia takon kreativitetin: zë, identitet, fushata dhe landing page.' },
        { n: 'III', t: 'Realizimi', p: 'Nisim, masim gjithçka dhe sjellim përmirësime çdo javë.' },
        { n: 'IV', t: 'Evolucioni', p: 'Ndjekim, përshtatemi dhe e shumëfishojmë progresin ndërsa biznesi juaj rritet.' },
      ],
      outro: 'Ky ritëm strategjie, dizajni dhe realizimi siguron që ta shihni progresin çdo javë.',
      link: 'Lexoni procesin e plotë',
    },
    philosophy: {
      eyebrow: 'Filozofia jonë',
      intro: 'Grow Base u krijua me një qëllim: ta bëjë marketingun më të zgjuar, më të thjeshtë dhe më njerëzor.',
      lines: ['Qartësia mposht *kompleksitetin.*', 'Kreativiteti duhet të *kthejë investimin.*', 'Progresi vjen nga sjellja e përmirësimeve të vogla dhe *të qëndrueshme.*'],
      art: {
        alt: 'Pikturë tavani baroke: perëndi dhe heronj që ngjiten nëpër re të ndritura drejt një qielli blu, me një tendë të artë të mbajtur lart në qendër.',
        caption: '*Apoteoza e Herkulit*',
        credit: 'François Lemoyne, 1736 · Salla e Herkulit, Versajë',
      },
      link: 'Rreth Grow Base',
    },
    cta: {
      title: 'Le të flasim për *projektin tuaj.*',
      p: 'Na dërgoni një mesazh të shkurtër me faqen tuaj të internetit dhe objektivat, dhe do t’ju përgjigjemi me vlerësime të personalizuara dhe një plan të qartë.',
      primary: 'Filloni një projekt',
    },
  },

  services: {
    hero: {
      eyebrow: 'Shërbimet',
      title: 'Një qasje e plotë ndaj *marketingut modern*',
      lead:
        'Fillojmë duke përcaktuar kush jeni dhe ku qëndroni në tregun tuaj, duke ndërtuar një identitet marke që përçon besim dhe vlerë. Prej andej, dizajnojmë reklamim, faqe interneti, përmbajtje dhe sisteme CRM që funksionojnë së bashku — të qeta, efektive dhe të matshme.',
    },
    includes: 'Çfarë përfshihet',
    items: [
      {
        id: 'brand',
        n: '01',
        t: 'Identiteti i markës',
        p: [
          'Para çdo fushate, qartësojmë kush jeni dhe ku qëndroni në tregun tuaj. Ndërtojmë një identitet marke — zë, vizual dhe mesazh — që përçon besim dhe vlerë, dhe i jep çdo kanali diçka konsistente për të thënë.',
        ],
        list: ['Pozicionimi në treg dhe ndaj konkurrentëve', 'Zëri i markës dhe mesazhi', 'Identiteti vizual dhe udhëzuesit', 'Drejtimi i përmbajtjes'],
      },
      {
        id: 'advertising',
        n: '02',
        t: 'Reklamimi',
        p: [
          'Dizajnojmë fushata reklamuese që arrijnë njerëzit e duhur në platforma si Google, Meta, TikTok dhe LinkedIn, duke bashkuar kreativitetin me të dhëna të sakta performance.',
        ],
        list: ['Strategjia dhe kreativiteti i fushatës', 'Reklama në Google, Meta, TikTok dhe LinkedIn', 'Matje, raportim dhe optimizim javor', 'Sisteme reklamimi me performancë të lartë për tregtinë elektronike'],
      },
      {
        id: 'web',
        n: '03',
        t: 'Faqe interneti dhe përmbajtje',
        p: ['Krijojmë faqe interneti dhe përmbajtje që i kthejnë vizitorët në klientë: strukturë e qartë, faqe të shpejta dhe një histori që ia vlen të lexohet.'],
        list: ['Faqe interneti dhe landing page', 'Përmbajtje dhe rrëfim', 'Strukturë e fokusuar te konvertimi', 'Konfigurim i gatshëm për analitikë'],
      },
      {
        id: 'crm',
        n: '04',
        t: 'CRM dhe automatizim',
        p: ['Zhvillojmë sisteme CRM që i kthejnë lead-et në marrëdhënie besnike, dhe automatizim që e mban pipeline-in tuaj të marketingut në lëvizje pa zhurmë.'],
        list: ['Konfigurimi dhe struktura e CRM-së', 'Automatizim marketingu', 'Rrjedha për kultivimin e lead-eve', 'Raportim për pipeline-in B2B'],
      },
    ],
    closing: {
      title: 'E qetë, efektive, e matshme.',
      p: 'Çdo detaj është ndërtuar që marketingu juaj të jetë i qetë, efektiv dhe i matshëm — dhe çdo projekt fillon duke kuptuar atë që ka vërtet rëndësi për biznesin tuaj.',
    },
    cta: {
      title: 'Nuk jeni të sigurt ku të filloni? *Filloni me një bisedë.*',
      p: 'Na dërgoni faqen tuaj të internetit dhe objektivat. Do t’ju përgjigjemi me vlerësime të personalizuara dhe një plan të qartë.',
      primary: 'Filloni një projekt',
    },
  },

  process: {
    hero: {
      eyebrow: 'Procesi',
      title: 'Rritja nuk është mister — është *sistem*',
      lead:
        'Çdo bashkëpunim i suksesshëm fillon me qartësi, strukturë dhe një qëllim të përbashkët. Procesi ynë i sjell në përputhje të përsosur idetë kreative dhe objektivat e biznesit, që marka juaj të rritet me qetësi, zgjuarsi dhe rezultate të matshme.',
    },
    steps: [
      {
        n: 'I',
        t: 'Zbulimi',
        tagline: 'Kuptojmë para se të veprojmë.',
        p: [
          'Çdo partneritet fillon me të kuptuarit. Në këtë fazë shohim thellë biznesin tuaj, audiencën dhe performancën aktuale. Analizojmë të dhënat tuaja, shqyrtojmë përmbajtjen dhe studiojmë konkurrentët për të zbuluar çfarë sjell vërtet rezultate — dhe çfarë ju ngadalëson.',
          'Ky proces zbulimi nuk është thjesht kërkim; është themeli që formëson çdo vendim në vazhdim.',
        ],
      },
      {
        n: 'II',
        t: 'Dizajni',
        tagline: 'Aty ku strategjia takon kreativitetin.',
        p: [
          'Pasi kemi mbledhur njohuritë, kalojmë te dizajni. Këtu zhvillojmë zërin e markës suaj, identitetin vizual dhe drejtimin e përmbajtjes. Ndërtojmë fushata, landing page dhe sisteme që e komunikojnë qartë historinë tuaj dhe tërheqin audiencën e duhur.',
          'Fokusi është gjithmonë te thjeshtësia, funksionaliteti dhe konsistenca — dizajn që jo vetëm duket mirë, por performon edhe më mirë.',
        ],
      },
      {
        n: 'III',
        t: 'Realizimi',
        tagline: 'Aty ku qartësia bëhet ndikim.',
        p: [
          'Ekzekutimi është vendi ku qartësia bëhet ndikim. Nisim fushatat tuaja, monitorojmë të dhënat dhe përmirësojmë vazhdimisht mbi bazën e rezultateve reale.',
          'Procesi ynë i realizimit është i shpejtë, transparent dhe adaptiv — masim gjithçka, mësojmë shpejt dhe optimizojmë pa pushim. Duke sjellë përmirësime javore në vend që të presim momente të mëdha, krijojmë një ritëm progresi që shumëfishohet me kohën.',
        ],
      },
      {
        n: 'IV',
        t: 'Evolucioni',
        tagline: 'Rritja nuk ndalet me nisjen.',
        p: [
          'Rritja nuk ndalet pas nisjes. Ndjekim performancën nëpër platforma, identifikojmë mundësi të reja dhe përshtatim strategjitë ndërsa biznesi juaj evoluon.',
          'Ky optimizim i vazhdueshëm e mban markën tuaj aktuale, mesazhin tuaj të fortë dhe marketingun tuaj efikas. Çdo fazë ndërtohet mbi të mëparshmen — duke e bërë rritjen tuaj të qëndrueshme dhe të shkallëzueshme.',
        ],
      },
    ],
    rhythm: {
      eyebrow: 'Ritmi javor',
      title: 'Progresin e shihni çdo javë',
      items: [
        { t: 'Matim', p: 'Masim gjithçka që ka rëndësi.' },
        { t: 'Përmirësim', p: 'Përmirësojmë vazhdimisht, mbi bazën e rezultateve reale.' },
        { t: 'Komunikim', p: 'Komunikojmë hapur, që ta dini gjithmonë ku qëndroni.' },
      ],
    },
    cta: {
      title: 'Gati për *fazën e parë?*',
      p: 'Zbulimi është i shpejtë. Na dërgoni faqen tuaj të internetit dhe objektivat, dhe ne vazhdojmë nga aty.',
      primary: 'Filloni një projekt',
    },
  },

  about: {
    hero: {
      eyebrow: 'Rreth nesh',
      title: 'Marketing më i zgjuar, më i thjeshtë dhe më *njerëzor*',
      lead: 'Grow Base u krijua me një qëllim: ta bëjë marketingun më të zgjuar, më të thjeshtë dhe më njerëzor.',
    },
    story: {
      title: 'Një ekip i vogël që bën punë të vërtetë',
      p: [
        'Jemi një ekip i vogël profesionistësh me përvojë në markë, dizajn, reklamim dhe zhvillim web. Nuk besojmë në hierarki të ndërlikuara apo procese të zhurmshme; besojmë në punën e vërtetë që sjell rezultate të vërteta.',
        'Me qendër në Tiranë dhe me klientë në të gjithë botën, i japim vlerë transparencës, konsistencës dhe partneriteteve afatgjata.',
      ],
      facts: [
        { k: 'Me qendër në', v: 'Tiranë, Shqipëri' },
        { k: 'Punojmë me', v: 'Klientë në të gjithë botën' },
        { k: 'Ekipi', v: 'Profesionistë me përvojë' },
        { k: 'Disiplinat', v: 'Markë, dizajn, reklamim, zhvillim web' },
      ],
    },
    principles: {
      eyebrow: 'Filozofia jonë',
      title: 'Tri bindje me të cilat punojmë',
      items: [
        { n: 'I', t: 'Qartësia mposht kompleksitetin', p: 'Një mesazh i qartë, një strukturë e thjeshtë dhe një plan i fokusuar kalojnë çdo ndërlikim të zgjuar, çdo herë.' },
        { n: 'II', t: 'Kreativiteti duhet të kthejë investimin', p: 'Na pëlqejnë idetë e guximshme — dhe i masim. Puna kreative e fiton vendin e vet kur lëviz numra realë.' },
        { n: 'III', t: 'Progresi vjen nga përmirësime të vogla e të qëndrueshme', p: 'Sjellim ndryshime çdo javë në vend që të presim momente të mëdha, dhe e lëmë progresin e vazhdueshëm të shumëfishohet.' },
      ],
    },
    values: {
      title: 'Çfarë vlerësojmë',
      items: [
        { t: 'Transparenca', p: 'Komunikim i hapur dhe raportim i ndershëm, gjithmonë.' },
        { t: 'Konsistenca', p: 'I njëjti standard pune, javë pas jave.' },
        { t: 'Partneritetet afatgjata', p: 'Rritemi kur rriteni ju — kjo është e vetmja matje që qëndron.' },
      ],
    },
    gallery: {
      eyebrow: 'Shënim galerie',
      title: 'Pse mjeshtrat e vjetër?',
      lead: 'Pikturat në këtë faqe janë kryevepra në pronë publike, të zgjedhura për atë që na mësojnë në heshtje për zanatin tonë.',
      items: [
        {
          set: 'lorrain-arch',
          alt: 'Skena e portit nga Claude Lorrain: anije e lartë, kullë prej guri dhe dielli i ulët mbi ujin e qetë.',
          t: '*Porti me nisjen e Mbretëreshës së Shebës*',
          credit: 'Claude Lorrain, 1648 · Galeria Kombëtare, Londër',
          p: 'Një port me diellin e ulët mbi detin e hapur, mallra që ngarkohen, një anije gati për t’u nisur. Çdo nisje meriton një drejtim kaq të qartë.',
        },
        {
          set: 'lemoyne-arch',
          alt: 'Tavani i Lemoyne: figura që ngjiten nëpër re të ndritura drejt një qielli blu.',
          t: '*Apoteoza e Herkulit*',
          credit: 'François Lemoyne, përfunduar më 1736 · Salla e Herkulit, Versajë',
          p: 'Në tavanin e Versajës, Lemoyne e hap qemerin drejt qiellit dhe e lë një hero të ngjitet mes perëndive. Rritja, e pikturuar si ngjitje.',
        },
      ],
      outro: 'Kompozim, dritë, durim: mjeshtrat e vjetër e kuptonin atë që praktikojmë ne çdo ditë.',
    },
    cta: {
      title: 'Le të ndërtojmë diçka *të qëndrueshme.*',
      p: 'Na tregoni për biznesin tuaj dhe për ku dëshironi ta çoni.',
      primary: 'Filloni një projekt',
    },
  },

  contact: {
    hero: {
      eyebrow: 'Kontakt',
      title: 'Le të flasim për *projektin tuaj*',
      lead:
        'Do të na pëlqente të dëgjonim për projektin tuaj. Pavarësisht nëse po nisni një markë të re, po zgjeroni një biznes ekzistues, ose thjesht po eksploroni mundësi, ekipi ynë është gati të ndihmojë. Na dërgoni një mesazh të shkurtër me faqen tuaj të internetit dhe objektivat, dhe do t’ju përgjigjemi me vlerësime të personalizuara dhe një plan të qartë.',
    },
    details: {
      title: 'Na kontaktoni drejtpërdrejt',
      email: 'Email',
      phone: 'Telefon',
      location: 'Vendndodhja',
      follow: 'Na ndiqni',
      address: 'Bulevardi Dëshmorët e Kombit',
      city: 'Tiranë, Shqipëri',
      map: 'Hape në hartë',
    },
    form: {
      title: 'Na dërgoni një mesazh',
      required: 'Fushat e shënuara me * janë të detyrueshme',
      name: 'Emri juaj',
      email: 'Adresa e email-it',
      website: 'Faqja juaj e internetit',
      websiteHint: 'Opsionale — na ndihmon të përgatisim vlerësime të dobishme.',
      goals: 'Objektivat tuaja',
      goalsPlaceholder: 'Çfarë dëshironi të arrini?',
      consent: 'Pajtohem që Grow Base t’i përdorë këto të dhëna për t’iu përgjigjur kërkesës sime, siç përshkruhet në [Politikën e Privatësisë](@privacy).',
      submit: 'Dërgo mesazhin',
      sending: 'Duke dërguar…',
      errorRequired: 'Ju lutemi plotësoni këtë fushë.',
      errorEmail: 'Ju lutemi shkruani një adresë email-i të vlefshme.',
      errorConsent: 'Ju lutemi shënoni kutinë që të mund t’ju përgjigjemi.',
      errorSend: 'Ndodhi një gabim. Provoni përsëri, ose na shkruani te info@growbase.agency.',
      successTitle: 'Faleminderit — mesazhi u mor',
      successText: 'Do ta shqyrtojmë faqen dhe objektivat tuaja dhe do t’ju kthejmë përgjigje me vlerësime të personalizuara dhe një plan të qartë.',
    },
  },

  thanks: {
    eyebrow: 'Mesazhi u mor',
    title: 'Faleminderit *shumë.*',
    p: 'Mesazhi juaj po i drejtohet ekipit tonë. Do ta shqyrtojmë faqen dhe objektivat tuaja dhe do t’ju përgjigjemi me vlerësime të personalizuara dhe një plan të qartë.',
    back: 'Kthehu te kryefaqja',
    explore: 'Shihni procesin tonë',
  },

  notFound: {
    eyebrow: 'Gabim 404',
    title: 'Kjo faqe ka *lundruar larg.*',
    p: 'Nuk e gjetëm faqen që kërkonit. Mund të jetë zhvendosur, ose lidhja mund të ketë një gabim shkrimi.',
    back: 'Kthehu te kryefaqja',
  },

  legal: {
    tocLabel: 'Në këtë faqe',
    updatedLabel: 'Përditësuar së fundi',
    updated: '17 nëntor 2026',
    privacy: {
      eyebrow: 'Ligjore',
      title: 'Politika e Privatësisë',
      lead: 'Mbledhim shumë pak të dhëna personale, i përdorim vetëm për të folur me ju dhe nuk i shesim kurrë. Kjo faqe shpjegon detajet.',
      sections: [
        {
          id: 'controller',
          h: 'Kush jemi',
          blocks: [
            'Kjo faqe interneti, growbase.agency, administrohet nga **Grow Base** (“Grow Base”, “ne”), një studio marketingu me adresë Bulevardi Dëshmorët e Kombit, Tiranë, Shqipëri. Ne jemi kontrolluesi i të dhënave personale që përshkruhen në këtë politikë.',
            'Për çdo çështje që lidhet me privatësinë, shkruani te [info@growbase.agency](mailto:info@growbase.agency) ose telefononi në +355 69 829 8980.',
            'Të dhënat personale i përpunojmë në përputhje me Ligjin nr. 124/2024 “Për mbrojtjen e të dhënave personale” të Shqipërisë dhe, për vizitorët në Bashkimin Evropian dhe Zonën Ekonomike Evropiane, me Rregulloren e Përgjithshme për Mbrojtjen e të Dhënave (GDPR, Rregullorja (BE) 2016/679).',
          ],
        },
        {
          id: 'data',
          h: 'Çfarë mbledhim',
          blocks: [
            'Mbledhjen e të dhënave e mbajmë në minimum. Kjo faqe interneti nuk ka llogari përdoruesish, as gjurmues reklamash, as cookies analitike.',
            [
              '**Formulari i kontaktit** — emri juaj, adresa e email-it, faqja e internetit (opsionale), mesazhi që shkruani dhe koha kur e dërguat.',
              '**Komunikimi i drejtpërdrejtë** — çdo gjë që na dërgoni me email, telefon ose rrjete sociale, si të dhënat e kontaktit dhe informacioni për projektin.',
              '**Të dhëna teknike** — kur vizitoni faqen, ofruesi ynë i hostimit përpunon automatikisht adresën tuaj IP, llojin e shfletuesit, pajisjen, faqet e kërkuara dhe kohën e kërkesës në regjistrat e serverit, për siguri dhe për shërbimin e faqes.',
            ],
          ],
        },
        {
          id: 'purposes',
          h: 'Pse i përdorim dhe mbi çfarë baze',
          blocks: [
            [
              'Për t’iu përgjigjur kërkesës suaj dhe, nëse e kërkoni, për të përgatitur një propozim — e nevojshme për të ndërmarrë hapa me kërkesën tuaj përpara lidhjes së një kontrate (GDPR, neni 6(1)(b)), si dhe interesi ynë legjitim për t’iu përgjigjur atyre që na kontaktojnë (neni 6(1)(f)).',
              'Për ta mbajtur faqen të sigurt dhe për të parandaluar spamin e abuzimin — interesi ynë legjitim (neni 6(1)(f)).',
              'Për të përmbushur detyrimet ligjore, si rregullat e kontabilitetit dhe të taksave nëse bëheni klient (neni 6(1)(c)).',
            ],
            'Aty ku mbështetemi te pëlqimi juaj, mund ta tërhiqni në çdo kohë pa cenuar përpunimin e mëparshëm. Nuk i shesim të dhënat personale dhe nuk i përdorim për vendimmarrje të automatizuar apo profilizim.',
          ],
        },
        {
          id: 'recipients',
          h: 'Kush i merr',
          blocks: [
            'Të dhënat personale i ndajmë vetëm me ofrues që na ndihmojnë të administrojmë faqen dhe biznesin tonë, nën kontrata që i detyrojnë t’i mbrojnë ato:',
            [
              '**Hostimi dhe trajtimi i formularit** — Netlify, Inc., që strehon këtë faqe interneti dhe ruan dërgesat e formularit të kontaktit në emër tonë.',
              '**Email dhe mjete biznesi** — ofruesit që përdorim për të dërguar e marrë email, për të menaxhuar projektet dhe për të mbajtur regjistrat.',
              '**Këshilltarë profesionistë dhe autoritete** — kur e kërkon ligji, ose për të mbrojtur të drejtat tona ligjore.',
            ],
            'Disa ofrues ndodhen jashtë Shqipërisë, përfshirë Shtetet e Bashkuara. Kur të dhënat transferohen ndërkombëtarisht, mbështetemi në garanci të përshtatshme si vendimet e përshtatshmërisë, klauzolat standarde kontraktore ose mekanizma të barasvlershëm.',
          ],
        },
        {
          id: 'retention',
          h: 'Sa kohë i ruajmë',
          blocks: [
            'Kërkesat i ruajmë vetëm për aq kohë sa duhet për t’u përgjigjur dhe për ndjekje — normalisht jo më gjatë se 24 muaj pas kontaktit tonë të fundit. Nëse punojmë bashkë, regjistrat e projektit dhe të faturimit i ruajmë për aq kohë sa kërkon legjislacioni i kontabilitetit dhe i taksave. Regjistrat e serverit ruhen nga ofruesi ynë i hostimit vetëm për një periudhë të shkurtër.',
          ],
        },
        {
          id: 'rights',
          h: 'Të drejtat tuaja',
          blocks: [
            'Sipas ligjit, keni të drejtë të:',
            [
              'qaseni te të dhënat personale që mbajmë për ju;',
              'kërkoni korrigjimin e të dhënave të pasakta;',
              'kërkoni fshirjen e të dhënave tuaja;',
              'kufizoni mënyrën si i përpunojmë ato;',
              'merrni të dhënat tuaja në format të bartshëm;',
              'kundërshtoni përpunimin e bazuar në interesat tona legjitime; dhe',
              'tërhiqni pëlqimin në çdo kohë.',
            ],
            'Për të ushtruar cilëndo nga këto të drejta, shkruani te [info@growbase.agency](mailto:info@growbase.agency). Do t’ju përgjigjemi brenda një muaji. Nëse nuk jeni të kënaqur me përgjigjen tonë, mund të ankoheni te Komisioneri për të Drejtën e Informimit dhe Mbrojtjen e të Dhënave Personale në Shqipëri ([idp.al](https://idp.al)) ose te autoriteti i mbrojtjes së të dhënave në vendin tuaj në BE/ZEE.',
          ],
        },
        {
          id: 'security',
          h: 'Siguria',
          blocks: [
            'Të gjithë faqen e shërbejmë përmes HTTPS, e kufizojmë qasjen te të dhënat personale vetëm për ata që kanë nevojë dhe zgjedhim ofrues me reputacion. Asnjë sistem nuk është plotësisht i sigurt, ndaj ju lutemi shmangni dërgimin e informacionit të ndjeshëm — si fjalëkalime ose të dhëna pagese — përmes formularit të kontaktit.',
          ],
        },
        {
          id: 'children',
          h: 'Fëmijët',
          blocks: ['Shërbimet tona janë për biznese. Kjo faqe interneti nuk i drejtohet fëmijëve dhe ne nuk mbledhim me dijeni të dhëna të tyre.'],
        },
        {
          id: 'links',
          h: 'Lidhje me faqe të tjera',
          blocks: ['Kjo faqe lidhet me profilet tona në Instagram dhe LinkedIn. Ato platforma kanë politikat e tyre të privatësisë dhe ne nuk i kontrollojmë.'],
        },
        {
          id: 'changes',
          h: 'Ndryshimet në këtë politikë',
          blocks: ['Mund ta përditësojmë këtë politikë kur ndryshojnë praktikat tona ose ligji. Data në krye të faqes tregon kur është rishikuar së fundi.'],
        },
      ],
    },
    cookies: {
      eyebrow: 'Ligjore',
      title: 'Njoftimi për Cookies',
      lead: 'Kjo faqe interneti nuk vendos cookies dhe nuk përdor gjurmues të palëve të treta — ndaj nuk ka asnjë banner cookies për ta mbyllur.',
      sections: [
        {
          id: 'short',
          h: 'Shkurt',
          blocks: ['growbase.agency nuk përdor cookies për analitikë, reklamim apo profilizim, dhe nuk ngarkon gjurmues të palëve të treta. Për këtë arsye, nuk shfaqim banner cookies.'],
        },
        {
          id: 'what',
          h: 'Çfarë janë cookies',
          blocks: ['Cookies janë skedarë të vegjël teksti që faqet e internetit i ruajnë në pajisjen tuaj. Teknologji të ngjashme, si ruajtja lokale (local storage), funksionojnë në mënyra të ngjashme.'],
        },
        {
          id: 'use',
          h: 'Çfarë përdor kjo faqe',
          blocks: [
            'Ne nuk vendosim asnjë cookie. Skriptet e kësaj faqeje kontrollojnë vetëm menynë për celular, animacionet dhe formularin e kontaktit, dhe nuk ruajnë asgjë në pajisjen tuaj.',
            'Shkronjat tona ruhen në serverin tonë, ndaj kur vizitoni faqen nuk dërgohen kërkesa te shërbime shkronjash të palëve të treta.',
          ],
        },
        {
          id: 'links',
          h: 'Lidhje dhe përmbajtje të ngulitura',
          blocks: ['Lidhemi me Instagram dhe LinkedIn, por nuk ngulitim përmbajtjen e tyre, ndaj ato nuk mund të vendosin cookies përmes kësaj faqeje. Nëse ndiqni ato lidhje, zbatohen rregullat e tyre për cookies.'],
        },
        {
          id: 'change',
          h: 'Nëse kjo ndryshon',
          blocks: ['Nëse ndonjëherë shtojmë analitikë, reklamim ose teknologji të tjera jo thelbësore, fillimisht do të kërkojmë pëlqimin tuaj përmes një zgjedhjeje të qartë dhe do ta përditësojmë këtë njoftim.'],
        },
        {
          id: 'manage',
          h: 'Menaxhimi i cookies dhe pyetje',
          blocks: [
            'Mund t’i bllokoni ose t’i fshini cookies në cilësimet e shfletuesit tuaj në çdo kohë. Nëse keni pyetje për këtë njoftim, shkruani te [info@growbase.agency](mailto:info@growbase.agency). Më shumë për mënyrën si i trajtojmë të dhënat personale gjeni te [Politika e Privatësisë](@privacy).',
          ],
        },
      ],
    },
    terms: {
      eyebrow: 'Ligjore',
      title: 'Kushtet e Përdorimit dhe Njoftimi Ligjor',
      lead: 'Rregullat praktike për përdorimin e kësaj faqeje, kush e administron dhe nga vijnë imazhet tona.',
      sections: [
        {
          id: 'notice',
          h: 'Njoftimi ligjor',
          blocks: [
            'Kjo faqe interneti administrohet nga **Grow Base**, një studio marketingu.',
            ['Adresa: Bulevardi Dëshmorët e Kombit, Tiranë, Shqipëri', 'Email: [info@growbase.agency](mailto:info@growbase.agency)', 'Telefon: +355 69 829 8980'],
          ],
        },
        {
          id: 'use',
          h: 'Përdorimi i kësaj faqeje',
          blocks: ['Duke e përdorur këtë faqe, pranoni këto kushte. Faqja ofron informacion të përgjithshëm për shërbimet tona. Ju lutemi përdoreni ligjërisht dhe mos u përpiqni ta ndërprisni, ta testoni për cenueshmëri ose ta abuzoni formularin e kontaktit (për shembull, për të dërguar spam).'],
        },
        {
          id: 'services',
          h: 'Shërbimet tona',
          blocks: ['Informacioni në këtë faqe nuk përbën ofertë detyruese. Puna me Grow Base rregullohet nga një marrëveshje ose propozim i veçantë me shkrim që përcakton fushëveprimin, tarifat dhe afatet.'],
        },
        {
          id: 'results',
          h: 'Pa garanci rezultatesh',
          blocks: ['Performanca e marketingut varet nga shumë faktorë jashtë kontrollit tonë, përfshirë kushtet e tregut, buxhetet, përshtatjen produkt-treg dhe ndryshimet e platformave. Shembujt dhe përshkrimet në këtë faqe ilustrojnë qasjen tonë dhe nuk premtojnë ndonjë rezultat të caktuar.'],
        },
        {
          id: 'ip',
          h: 'Prona intelektuale',
          blocks: ['Emri Grow Base, logoja, dizajni, teksti dhe kodi i kësaj faqeje i përkasin Grow Base ose licencuesve të saj dhe mbrohen nga e drejta e autorit dhe ligje të tjera. Mund ta shihni faqen dhe të ndani lidhje drejt saj, por nuk mund ta kopjoni ose ripërdorni përmbajtjen apo markën tonë pa leje me shkrim.'],
        },
        {
          id: 'credits',
          h: 'Kreditet e artit dhe të shkronjave',
          blocks: [
            'Pikturat në këtë faqe janë vepra në pronë publike, të shfaqura përmes riprodhimeve në pronë publike të strehuara në Wikimedia Commons:',
            [
              '*Porti me nisjen e Mbretëreshës së Shebës* — Claude Lorrain, 1648. Galeria Kombëtare, Londër.',
              '*Apoteoza e Herkulit* (tavan) — François Lemoyne, përfunduar më 1736. Salla e Herkulit, Pallati i Versajës.',
            ],
            'Shkronjat janë Tinos, një shoqëruese metrikisht e përputhshme me Times New Roman, e përdorur sipas Licencës SIL Open Font 1.1.',
          ],
        },
        {
          id: 'liability',
          h: 'Përgjegjësia dhe lidhjet e jashtme',
          blocks: ['Kujdesemi që kjo faqe të jetë e saktë dhe e disponueshme, por ajo ofrohet “siç është”. Në masën maksimale të lejuar nga ligji, Grow Base nuk mban përgjegjësi për humbje që rrjedhin nga përdorimi i faqes ose mbështetja te përmbajtja e saj, dhe nuk jemi përgjegjës për përmbajtjen e faqeve të palëve të treta me të cilat lidhemi. Asgjë këtu nuk kufizon përgjegjësinë që nuk mund të kufizohet me ligj.'],
        },
        {
          id: 'law',
          h: 'E drejta në fuqi',
          blocks: ['Këto kushte rregullohen nga ligjet e Republikës së Shqipërisë dhe gjykatat e Tiranës kanë juridiksion, pa cenuar të drejtat e detyrueshme që mund të keni si konsumator në vendin tuaj të banimit.'],
        },
        {
          id: 'contact',
          h: 'Ndryshimet dhe kontakti',
          blocks: ['Mund t’i përditësojmë këto kushte herë pas here; data në krye tregon rishikimin e fundit. Pyetje? Shkruani te [info@growbase.agency](mailto:info@growbase.agency).'],
        },
      ],
    },
  },
};
