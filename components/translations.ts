// ─── Preklady (i18n) ───────────────────────────────────────────────────────────
// SK je zdrojový jazyk a zároveň typový vzor. EN/DE/PL musia mať rovnakú štruktúru
// (TypeScript to kontroluje cez Record<Locale, Translation>).
//
// Pozn.: vlastné mená (členovia tímu, autori recenzií), telefónne čísla, e-maily,
// adresa a otváracie hodiny (čas) zostávajú v komponentoch a neprekladajú sa.

export type Locale = "sk" | "en" | "de" | "pl";

export const LOCALES: Locale[] = ["sk", "en", "de", "pl"];

export const LOCALE_LABELS: Record<Locale, string> = {
  sk: "SK",
  en: "EN",
  de: "DE",
  pl: "PL",
};

export const LOCALE_NAMES: Record<Locale, string> = {
  sk: "Slovenčina",
  en: "English",
  de: "Deutsch",
  pl: "Polski",
};

const sk = {
  nav: {
    oNas: "O nás",
    sluzby: "Právne služby",
    kontakt: "Kontakt",
    referencie: "Referencie",
    cta: "Konzultácia",
    menuOffice: "Kancelária",
    menuCity: "Banská Bystrica, SR",
    menuOpen: "Otvoriť menu",
    menuClose: "Zavrieť menu",
    navAria: "Hlavná navigácia",
  },
  hero: {
    eyebrow: "Advokátska kancelária",
    title1: "Vaše práva.",
    title2: "Naša",
    titleAccent: "priorita.",
    paragraph:
      "Už viac ako 25 rokov poskytujeme právne služby jednotlivcom, podnikateľom a obchodným spoločnostiam. Spájame odborné znalosti, rodinnú tradíciu a individuálny prístup ku každému klientovi.",
    ctaPrimary: "Dohodnúť konzultáciu",
    ctaSecondary: "Naše služby",
    statYears: "Rokov praxe",
    statClients: "Spokojných klientov",
    brandTag: "mukera.sk — advokát",
    location: "Banská Bystrica, Slovenská republika",
  },
  about: {
    kicker: "O kancelárii",
    title1: "Právne riešenia",
    title2: "postavené na",
    titleAccent: "skúsenostiach.",
    para1:
      "Viac ako 25 rokov pomáhame klientom chrániť a presadzovať ich práva a záujmy. Poskytujeme právne služby založené na dôvere, diskrétnosti a dôslednej ochrane záujmov našich klientov.",
    para2:
      "Naša advokátska kancelária stavia na dlhoročných skúsenostiach, odbornosti a individuálnom prístupe ku každému klientovi. Každému prípadu venujeme osobitnú pozornosť a hľadáme riešenia, ktoré prinášajú právnu istotu aj v najnáročnejších životných situáciách.",
    values: [
      {
        title: "Individuálny prístup",
        desc: "Každý prípad posudzujeme samostatne a navrhujeme riešenia zodpovedajúce konkrétnej situácii klienta.",
      },
      {
        title: "Viac ako 25 rokov skúseností",
        desc: "Máme dlhoročnú prax a odborné znalosti v oblasti trestného, obchodného, občianskeho, rodinného a pracovného práva.",
      },
      {
        title: "Komplexné právne služby",
        desc: "Poskytujeme komplexné právne služby zahŕňajúce právne poradenstvo, prípravu právnych dokumentov a zastupovanie klientov pred súdmi a orgánmi verejnej moci.",
      },
    ],
    statYears: "Rokov praxe",
    statClients: "Spokojných klientov",
    caption: "Justitia — Symbol spravodlivosti",
  },
  services: {
    kicker: "Oblasti praxe",
    title: "Komplexné právne riešenia",
    titleAccent: "pre vaše potreby.",
    badge: "Oblasť praxe",
    ctaText: "Máte otázku k tejto oblasti? Radi vám poskytneme nezáväznú konzultáciu.",
    ctaButton: "Dohodnúť konzultáciu",
    close: "Zavrieť",
    more: "Zistiť viac",
    items: [
      {
        title: "Trestné právo",
        intro:
          "Obhajoba, zastupovanie poškodeného a právna pomoc vo všetkých štádiách trestného konania.",
        detail: [
          "Obhajoba vo všetkých štádiách trestného konania.",
          "Zastupovanie poškodeného a uplatnenie nároku na náhradu škody v trestnom (adhéznom) konaní.",
          "Právne poradenstvo v trestných veciach.",
          "Podávanie trestných oznámení, riadnych a mimoriadnych opravných prostriedkov a ďalších procesných návrhov a žiadostí.",
        ],
      },
      {
        title: "Obchodné právo",
        intro:
          "Právne poradenstvo pre podnikateľov a obchodné spoločnosti vrátane vymáhania pohľadávok a zastupovania v obchodných sporoch.",
        detail: [
          "Zakladanie a zmeny v obchodných spoločnostiach vrátane zápisov do obchodného registra.",
          "Príprava a revízia obchodných zmlúv.",
          "Vymáhanie pohľadávok — mimosúdne aj súdne vrátane zastupovania v exekučnom konaní.",
          "Právne poradenstvo pri fúziách, akvizíciách a prevode obchodných podielov.",
          "Zastupovanie v obchodných sporoch pred súdmi.",
        ],
      },
      {
        title: "Občianske právo",
        intro:
          "Ochrana práv, riešenie sporov a zastupovanie v občianskoprávnych veciach.",
        detail: [
          "Príprava a revízia občianskoprávnych zmlúv (kúpna zmluva, darovacia zmluva, zmluva o dielo a ďalšie).",
          "Dedičské konania a majetkové vysporiadania.",
          "Náhrada škody a uplatňovanie nárokov zo zodpovednosti za škodu.",
          "Vlastnícke a susedské spory.",
          "Ochrana osobnosti, náhrada nemajetkovej ujmy a ochrana pred neoprávneným zásahom.",
          "Zastupovanie v občianskoprávnych sporoch pred súdmi.",
        ],
      },
      {
        title: "Rodinné právo",
        intro:
          "Rozvody, rodičovské práva, výživné a majetkové vyporiadanie.",
        detail: [
          "Zastupovanie v konaní o rozvod manželstva a o úpravu výkonu rodičovských práv a povinností.",
          "Určenie a vymáhanie výživného na deti, manžela a rozvedeného manžela.",
          "Nahradenie súhlasu rodičov súdom.",
          "Vyporiadanie bezpodielového spoluvlastníctva manželov po rozvode, zrušenie/zúženie BSM za trvania manželstva.",
          "Určenie a zapretie otcovstva, osvojenie a poručníctvo.",
        ],
      },
      {
        title: "Pracovné právo",
        intro:
          "Právne poradenstvo a zastupovanie v pracovnoprávnych vzťahoch a sporoch.",
        detail: [
          "Príprava a revízia pracovných zmlúv a interných predpisov zamestnávateľa.",
          "Skončenie pracovného pomeru a náhrada mzdy.",
          "Diskriminácia a ochrana práv zamestnancov.",
          "Právne poradenstvo pre zamestnávateľov a zamestnancov v pracovnoprávnych vzťahoch.",
          "Zastupovanie v pracovnoprávnych sporoch pred súdmi.",
        ],
      },
      {
        title: "Nehnuteľnosti a zmluvy",
        intro:
          "Príprava zmlúv, prevody nehnuteľností a zastupovanie pri prevodoch nehnuteľností.",
        detail: [
          "Príprava a revízia kúpnych zmlúv, darovacích zmlúv, nájomných zmlúv a ďalších zmlúv.",
          "Právne preverenie nehnuteľností pred kúpou (due diligence).",
          "Záložné právo, vecné bremená a iné práva k cudzej veci.",
          "Zrušenie a vyporiadanie podielového spoluvlastníctva.",
          "Zastupovanie v katastrálnom konaní.",
          "Právne poradenstvo pri developerských projektoch a správe bytových domov.",
        ],
      },
    ],
  },
  reviews: {
    kicker: "Referencie",
    title: "Dôvera, ktorá",
    titleAccent: "hovorí za všetko.",
    subtitle: "Skutočné ohlasy klientov, ktorých sme mali tú česť zastupovať.",
    footer: "Recenzie našich klientov z Google",
    prev: "Predchádzajúca recenzia",
    next: "Nasledujúca recenzia",
    ratingLabel: "Hodnotenie 5 z 5 hviezdičiek",
    carouselLabel: "Recenzie klientov",
    gotoLabel: "Zobraziť recenziu",
    of: "z",
    items: [
      "Chcem sa podeliť o skvelú skúsenosť so službami pána právnika Múkeru. Pomohol mi so založením, resp. prevzatím už existujúcej s.r.o, pripravil všetky potrebné dokumenty, vysvetlil celý proces. Všetko išlo hladko, rýchlo a bezproblémovo.",
      "Maximálna spokojnosť. Profesionálny, skúsený a veľmi ochotný právnik, ktorý sa naozaj venuje klientovi. Komunikácia bola rýchla a jasná, výsledok nad moje očakávania. Ak hľadáte spoľahlivého právnika, určite odporúčam.",
      "Moja skúsenosť bola pozitívna a nebol žiadny problém. So službami som bol nadmieru spokojný a môžem doporučiť pána advokáta.",
      "Veľmi milý a ústretový pán advokát. Po stretnutí s ním som získala úplne iný pohľad na náš problém. Veľmi pekne mu za to ďakujem.",
      "Chcem sa srdečne poďakovať a zároveň odporučiť právnika JUDr. Petra Múkeru, s ktorým som mal tú česť spolupracovať. Bol som nadmieru spokojný – jeho prístup bol profesionálny, rýchly a mimoriadne ústretový.",
      "Môžem len odporučiť. Pán JUDr. Peter Múkera ml. mi všetko dopodrobna vysvetlil, ako mám postupovať. Jeho právna pomoc mi veľmi pomohla, oceňujem aj ľudský prístup. Ďakujem.",
      "Vynikajúci pán advokát. Doporučujem využiť jeho profesionálne právne služby.",
      "Ďakujem za poradu a ochotný prístup v riešení mojej otázky.",
      "Môžem len odporučiť. Veľká spokojnosť po všetkých stránkach.",
      "Profesionalita, príjemné a ľudské vystupovanie, dobrá komunikácia, rozhodne odporúčam.",
      "Poradil správne a načas, úplna spokojnosť.",
    ],
  },
  faq: {
    kicker: "FAQ",
    title1: "Otázky, ktoré sa nás",
    title2: "pýtate",
    titleAccent: "najčastejšie.",
    ctaText: "Nenašli ste odpoveď na svoju otázku?",
    ctaLink: "Napíšte nám priamo",
    items: [
      {
        q: "Ako prebieha úvodná konzultácia?",
        a: "Na prvom stretnutí si podrobne vypočujeme váš problém, zanalyzujeme dostupné dokumenty a navrhneme reálne právne kroky. Úvodná konzultácia nám slúži na zhodnotenie šancí na úspech.",
      },
      {
        q: "Aké sú náklady na právne zastúpenie?",
        a: "Odmena je vždy stanovená transparentne vopred – buď ako hodinová sadzba, paušálna odmena, alebo podielová odmena v závislosti od povahy prípadu a dohody s klientom.",
      },
      {
        q: "Zastupujete klientov aj mimo Banskej Bystrice?",
        a: "Áno, napriek tomu, že naše sídlo je v Banskej Bystrici, poskytujeme právne služby a zastupujeme klientov pred súdmi a úradmi na celom území Slovenskej republiky.",
      },
      {
        q: "Čo si mám priniesť na prvé stretnutie?",
        a: "Prineste si so sebou všetky relevantné zmluvy, rozhodnutia úradov, korešpondenciu (aj e-mailovú) a akékoľvek iné podklady, ktoré s vaším prípadom priamo súvisia.",
      },
    ],
  },
  contact: {
    teamKicker: "Advokátsky tím",
    teamTitle: "Náš skúsený",
    teamTitleAccent: "advokátsky tím",
    teamRole: "Advokát",
    kicker: "Spojte sa s nami",
    title1: "Sme tu, aby sme",
    title2: "chránili",
    titleAccent: "vaše záujmy.",
    labelAddress: "Adresa",
    labelEmail: "E-mail",
    labelPhone: "Telefón",
    formKicker: "Kontaktný formulár",
    fName: "Meno a priezvisko",
    fEmail: "E-mailová adresa",
    fPhone: "Telefón (voliteľné)",
    fMessage: "Správa",
    phName: "Ján Novák",
    phEmail: "jan@novak.sk",
    phPhone: "+421 9XX XXX XXX",
    phMessage: "Popíšte stručne svoju situáciu...",
    errName: "Zadajte meno (min. 2 znaky)",
    errEmail: "Zadajte platnú e-mailovú adresu",
    errMessage: "Správa musí mať aspoň 10 znakov",
    sendIdle: "Odoslať správu",
    sendLoading: "Odosielam...",
    sendSuccess: "Správa odoslaná ✓",
    sendError: "Správu sa nepodarilo odoslať. Skúste neskôr alebo napíšte priamo na e-mail.",
    mapKicker: "Kde nás nájdete",
    directions: "Získať trasu",
    mapTitle: "Poloha kancelárie",
    hoursDay: "Pondelok – Piatok",
  },
  footer: {
    rights: "Všetky práva vyhradené.",
    gdpr: "Ochrana osobných údajov",
    webdesign: "Webdesign by SB Design",
  },
};

export type Translation = typeof sk;

const en: Translation = {
  nav: {
    oNas: "About",
    sluzby: "Legal services",
    kontakt: "Contact",
    referencie: "References",
    cta: "Consultation",
    menuOffice: "Office",
    menuCity: "Banská Bystrica, SR",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navAria: "Main navigation",
  },
  hero: {
    eyebrow: "Law firm",
    title1: "Your rights.",
    title2: "Our",
    titleAccent: "priority.",
    paragraph:
      "For more than 25 years we have provided legal services to individuals, entrepreneurs and companies. We combine professional expertise, family tradition and an individual approach to every client.",
    ctaPrimary: "Arrange a consultation",
    ctaSecondary: "Our services",
    statYears: "Years of practice",
    statClients: "Satisfied clients",
    brandTag: "mukera.sk — lawyer",
    location: "Banská Bystrica, Slovak Republic",
  },
  about: {
    kicker: "About the firm",
    title1: "Legal solutions",
    title2: "built on",
    titleAccent: "experience.",
    para1:
      "For over 25 years we have helped clients protect and assert their rights and interests. We provide legal services built on trust, discretion and the diligent protection of our clients' interests.",
    para2:
      "Our law firm is built on years of experience, professional expertise and an individual approach to every client. We give each case our dedicated attention and seek solutions that provide legal certainty even in the most demanding life situations.",
    values: [
      {
        title: "Individual approach",
        desc: "We assess every case separately and propose solutions tailored to the client's specific situation.",
      },
      {
        title: "More than 25 years of experience",
        desc: "We have long-standing practice and expertise in criminal, commercial, civil, family and labour law.",
      },
      {
        title: "Comprehensive legal services",
        desc: "We provide comprehensive legal services including legal advice, the preparation of legal documents and the representation of clients before courts and public authorities.",
      },
    ],
    statYears: "Years of practice",
    statClients: "Satisfied clients",
    caption: "Justitia — Symbol of justice",
  },
  services: {
    kicker: "Areas of practice",
    title: "Comprehensive legal solutions",
    titleAccent: "for your needs.",
    badge: "Area of practice",
    ctaText: "Have a question about this area? We'll gladly provide a non-binding consultation.",
    ctaButton: "Arrange a consultation",
    close: "Close",
    more: "Learn more",
    items: [
      {
        title: "Criminal law",
        intro:
          "Defence, representation of the injured party and legal assistance at all stages of criminal proceedings.",
        detail: [
          "Defence at all stages of criminal proceedings.",
          "Representation of the injured party and claims for damages in the related (adhesion) proceedings.",
          "Legal advice in criminal matters.",
          "Filing criminal complaints, ordinary and extraordinary remedies and other procedural motions and requests.",
        ],
      },
      {
        title: "Commercial law",
        intro:
          "Legal advice for entrepreneurs and companies, including debt recovery and representation in commercial disputes.",
        detail: [
          "Formation and changes of companies, including entries in the commercial register.",
          "Drafting and review of commercial contracts.",
          "Debt recovery — out of court and judicial, including representation in enforcement proceedings.",
          "Legal advice on mergers, acquisitions and transfers of business shares.",
          "Representation in commercial disputes before the courts.",
        ],
      },
      {
        title: "Civil law",
        intro:
          "Protection of rights, dispute resolution and representation in civil law matters.",
        detail: [
          "Drafting and review of civil law contracts (purchase, donation, work contract and others).",
          "Inheritance proceedings and property settlements.",
          "Compensation for damage and asserting claims arising from liability for damage.",
          "Ownership and neighbour disputes.",
          "Protection of personality, compensation for non-pecuniary harm and protection against unlawful interference.",
          "Representation in civil disputes before the courts.",
        ],
      },
      {
        title: "Family law",
        intro:
          "Divorce, parental rights, maintenance and property settlement between spouses.",
        detail: [
          "Representation in divorce proceedings and in the regulation of parental rights and duties.",
          "Determining and enforcing maintenance for children, a spouse and a divorced spouse.",
          "Substituting parental consent by the court.",
          "Settlement of marital community property after divorce, cancellation or reduction of community property during marriage.",
          "Establishing and contesting paternity, adoption and guardianship.",
        ],
      },
      {
        title: "Labour law",
        intro:
          "Legal advice and representation in employment relationships and disputes.",
        detail: [
          "Drafting and review of employment contracts and the employer's internal regulations.",
          "Termination of employment and compensation of wages.",
          "Discrimination and protection of employees' rights.",
          "Legal advice for employers and employees in employment relationships.",
          "Representation in employment disputes before the courts.",
        ],
      },
      {
        title: "Real estate & contracts",
        intro:
          "Drafting contracts, real estate transfers and representation in property transfers.",
        detail: [
          "Drafting and review of purchase contracts, donation contracts, lease contracts and other contracts.",
          "Legal due diligence of real estate before purchase.",
          "Liens, easements and other rights to the property of others.",
          "Dissolution and settlement of co-ownership in shares.",
          "Representation in cadastral proceedings.",
          "Legal advice on development projects and the administration of residential buildings.",
        ],
      },
    ],
  },
  reviews: {
    kicker: "References",
    title: "Trust that",
    titleAccent: "speaks for itself.",
    subtitle: "Genuine feedback from clients we have had the honour to represent.",
    footer: "Reviews from our clients on Google",
    prev: "Previous review",
    next: "Next review",
    ratingLabel: "Rating 5 out of 5 stars",
    carouselLabel: "Client reviews",
    gotoLabel: "Show review",
    of: "of",
    items: [
      "I'd like to share my excellent experience with the services of Mr. Múkera. He helped me set up — or rather take over — an existing limited company, prepared all the necessary documents and explained the entire process. Everything went smoothly, quickly and without any problems.",
      "Maximum satisfaction. A professional, experienced and very helpful lawyer who truly dedicates himself to the client. Communication was fast and clear, the result exceeded my expectations. If you are looking for a reliable lawyer, I definitely recommend him.",
      "My experience was positive and there was no problem at all. I was extremely satisfied with the services and can recommend the lawyer.",
      "A very kind and accommodating lawyer. After meeting him I gained a completely different perspective on our problem. I thank him very much for that.",
      "I would like to sincerely thank and also recommend the lawyer JUDr. Peter Múkera, with whom I had the honour to cooperate. I was extremely satisfied – his approach was professional, fast and exceptionally accommodating.",
      "I can only recommend him. Mr. JUDr. Peter Múkera Jr. explained everything to me in detail, how to proceed. His legal assistance helped me a great deal, and I also appreciate his human approach. Thank you.",
      "An excellent lawyer. I recommend making use of his professional legal services.",
      "Thank you for the advice and the helpful approach in resolving my question.",
      "I can only recommend. Great satisfaction in every respect.",
      "Professionalism, a pleasant and human manner, good communication — I definitely recommend.",
      "He advised correctly and on time — complete satisfaction.",
    ],
  },
  faq: {
    kicker: "FAQ",
    title1: "Questions you",
    title2: "ask us",
    titleAccent: "most often.",
    ctaText: "Didn't find the answer to your question?",
    ctaLink: "Write to us directly",
    items: [
      {
        q: "How does the initial consultation work?",
        a: "At the first meeting we listen to your problem in detail, analyse the available documents and propose realistic legal steps. The initial consultation helps us assess the chances of success.",
      },
      {
        q: "What are the costs of legal representation?",
        a: "The fee is always set transparently in advance – either as an hourly rate, a flat fee, or a contingency fee depending on the nature of the case and the agreement with the client.",
      },
      {
        q: "Do you represent clients outside Banská Bystrica as well?",
        a: "Yes. Although our office is in Banská Bystrica, we provide legal services and represent clients before courts and authorities throughout the Slovak Republic.",
      },
      {
        q: "What should I bring to the first meeting?",
        a: "Bring all relevant contracts, decisions of authorities, correspondence (including e-mails) and any other documents directly related to your case.",
      },
    ],
  },
  contact: {
    teamKicker: "Our legal team",
    teamTitle: "Our experienced",
    teamTitleAccent: "legal team",
    teamRole: "Lawyer",
    kicker: "Get in touch",
    title1: "We are here to",
    title2: "protect",
    titleAccent: "your interests.",
    labelAddress: "Address",
    labelEmail: "E-mail",
    labelPhone: "Phone",
    formKicker: "Contact form",
    fName: "Full name",
    fEmail: "E-mail address",
    fPhone: "Phone (optional)",
    fMessage: "Message",
    phName: "John Smith",
    phEmail: "john@example.com",
    phPhone: "+421 9XX XXX XXX",
    phMessage: "Briefly describe your situation...",
    errName: "Enter your name (min. 2 characters)",
    errEmail: "Enter a valid e-mail address",
    errMessage: "The message must be at least 10 characters long",
    sendIdle: "Send message",
    sendLoading: "Sending...",
    sendSuccess: "Message sent ✓",
    sendError: "The message could not be sent. Please try again later or write to us directly by e-mail.",
    mapKicker: "Where to find us",
    directions: "Get directions",
    mapTitle: "Office location",
    hoursDay: "Monday – Friday",
  },
  footer: {
    rights: "All rights reserved.",
    gdpr: "Privacy policy",
    webdesign: "Webdesign by SB Design",
  },
};

const de: Translation = {
  nav: {
    oNas: "Über uns",
    sluzby: "Leistungen",
    kontakt: "Kontakt",
    referencie: "Referenzen",
    cta: "Beratung",
    menuOffice: "Kanzlei",
    menuCity: "Banská Bystrica, SR",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    navAria: "Hauptnavigation",
  },
  hero: {
    eyebrow: "Anwaltskanzlei",
    title1: "Ihre Rechte.",
    title2: "Unsere",
    titleAccent: "Priorität.",
    paragraph:
      "Seit mehr als 25 Jahren erbringen wir Rechtsdienstleistungen für Privatpersonen, Unternehmer und Gesellschaften. Wir verbinden fachliche Kompetenz, Familientradition und einen individuellen Zugang zu jedem Mandanten.",
    ctaPrimary: "Beratung vereinbaren",
    ctaSecondary: "Unsere Leistungen",
    statYears: "Jahre Praxis",
    statClients: "Zufriedene Mandanten",
    brandTag: "mukera.sk — Rechtsanwalt",
    location: "Banská Bystrica, Slowakische Republik",
  },
  about: {
    kicker: "Über die Kanzlei",
    title1: "Rechtslösungen, die",
    title2: "auf",
    titleAccent: "Erfahrung beruhen.",
    para1:
      "Seit über 25 Jahren helfen wir unseren Mandanten, ihre Rechte und Interessen zu schützen und durchzusetzen. Wir bieten Rechtsdienstleistungen, die auf Vertrauen, Diskretion und dem konsequenten Schutz der Interessen unserer Mandanten beruhen.",
    para2:
      "Unsere Anwaltskanzlei baut auf langjähriger Erfahrung, fachlicher Kompetenz und einem individuellen Zugang zu jedem Mandanten. Jedem Fall widmen wir besondere Aufmerksamkeit und suchen Lösungen, die auch in den schwierigsten Lebenssituationen Rechtssicherheit schaffen.",
    values: [
      {
        title: "Individueller Zugang",
        desc: "Jeden Fall beurteilen wir gesondert und schlagen Lösungen vor, die der konkreten Situation des Mandanten entsprechen.",
      },
      {
        title: "Mehr als 25 Jahre Erfahrung",
        desc: "Wir verfügen über langjährige Praxis und Fachwissen im Straf-, Handels-, Zivil-, Familien- und Arbeitsrecht.",
      },
      {
        title: "Umfassende Rechtsdienstleistungen",
        desc: "Wir bieten umfassende Rechtsdienstleistungen, einschließlich Rechtsberatung, Erstellung von Rechtsdokumenten und Vertretung der Mandanten vor Gerichten und Behörden.",
      },
    ],
    statYears: "Jahre Praxis",
    statClients: "Zufriedene Mandanten",
    caption: "Justitia — Symbol der Gerechtigkeit",
  },
  services: {
    kicker: "Tätigkeitsbereiche",
    title: "Umfassende Rechtslösungen",
    titleAccent: "für Ihre Bedürfnisse.",
    badge: "Tätigkeitsbereich",
    ctaText: "Haben Sie eine Frage zu diesem Bereich? Gerne bieten wir Ihnen eine unverbindliche Beratung.",
    ctaButton: "Beratung vereinbaren",
    close: "Schließen",
    more: "Mehr erfahren",
    items: [
      {
        title: "Strafrecht",
        intro:
          "Verteidigung, Vertretung des Geschädigten und rechtlicher Beistand in allen Phasen des Strafverfahrens.",
        detail: [
          "Verteidigung in allen Phasen des Strafverfahrens.",
          "Vertretung des Geschädigten und Geltendmachung von Schadenersatz im Adhäsionsverfahren.",
          "Rechtsberatung in Strafsachen.",
          "Erstattung von Strafanzeigen, Einlegung ordentlicher und außerordentlicher Rechtsmittel sowie sonstiger Verfahrensanträge und -gesuche.",
        ],
      },
      {
        title: "Handelsrecht",
        intro:
          "Rechtsberatung für Unternehmer und Gesellschaften, einschließlich Forderungseinzug und Vertretung in Handelsstreitigkeiten.",
        detail: [
          "Gründung und Änderungen von Handelsgesellschaften einschließlich Eintragungen ins Handelsregister.",
          "Erstellung und Prüfung von Handelsverträgen.",
          "Forderungseinzug — außergerichtlich und gerichtlich, einschließlich Vertretung im Vollstreckungsverfahren.",
          "Rechtsberatung bei Fusionen, Übernahmen und der Übertragung von Geschäftsanteilen.",
          "Vertretung in Handelsstreitigkeiten vor Gericht.",
        ],
      },
      {
        title: "Zivilrecht",
        intro:
          "Schutz von Rechten, Streitbeilegung und Vertretung in zivilrechtlichen Angelegenheiten.",
        detail: [
          "Erstellung und Prüfung zivilrechtlicher Verträge (Kaufvertrag, Schenkungsvertrag, Werkvertrag und weitere).",
          "Erbschaftsverfahren und Vermögensauseinandersetzungen.",
          "Schadenersatz und Geltendmachung von Ansprüchen aus der Haftung für Schäden.",
          "Eigentums- und Nachbarschaftsstreitigkeiten.",
          "Persönlichkeitsschutz, Ersatz immateriellen Schadens und Schutz vor unbefugten Eingriffen.",
          "Vertretung in zivilrechtlichen Streitigkeiten vor Gericht.",
        ],
      },
      {
        title: "Familienrecht",
        intro:
          "Scheidung, elterliche Rechte, Unterhalt und Vermögensauseinandersetzung der Ehegatten.",
        detail: [
          "Vertretung im Scheidungsverfahren und bei der Regelung der elterlichen Rechte und Pflichten.",
          "Festsetzung und Durchsetzung von Unterhalt für Kinder, den Ehegatten und den geschiedenen Ehegatten.",
          "Ersetzung der elterlichen Zustimmung durch das Gericht.",
          "Auseinandersetzung des ehelichen Gütergemeinschaftsvermögens nach der Scheidung, Aufhebung oder Einschränkung der Gütergemeinschaft während der Ehe.",
          "Feststellung und Anfechtung der Vaterschaft, Adoption und Vormundschaft.",
        ],
      },
      {
        title: "Arbeitsrecht",
        intro:
          "Rechtsberatung und Vertretung in arbeitsrechtlichen Beziehungen und Streitigkeiten.",
        detail: [
          "Erstellung und Prüfung von Arbeitsverträgen und internen Vorschriften des Arbeitgebers.",
          "Beendigung des Arbeitsverhältnisses und Lohnersatz.",
          "Diskriminierung und Schutz der Arbeitnehmerrechte.",
          "Rechtsberatung für Arbeitgeber und Arbeitnehmer in arbeitsrechtlichen Beziehungen.",
          "Vertretung in arbeitsrechtlichen Streitigkeiten vor Gericht.",
        ],
      },
      {
        title: "Immobilien & Verträge",
        intro:
          "Erstellung von Verträgen, Immobilienübertragungen und Vertretung bei Immobilienübertragungen.",
        detail: [
          "Erstellung und Prüfung von Kaufverträgen, Schenkungsverträgen, Mietverträgen und weiteren Verträgen.",
          "Rechtliche Prüfung von Immobilien vor dem Kauf (Due Diligence).",
          "Pfandrecht, Dienstbarkeiten und sonstige Rechte an fremden Sachen.",
          "Aufhebung und Auseinandersetzung des Miteigentums nach Bruchteilen.",
          "Vertretung im Katasterverfahren.",
          "Rechtsberatung bei Bauträgerprojekten und der Verwaltung von Wohngebäuden.",
        ],
      },
    ],
  },
  reviews: {
    kicker: "Referenzen",
    title: "Vertrauen, das",
    titleAccent: "für sich spricht.",
    subtitle: "Echte Rückmeldungen von Mandanten, die wir vertreten durften.",
    footer: "Bewertungen unserer Mandanten von Google",
    prev: "Vorherige Bewertung",
    next: "Nächste Bewertung",
    ratingLabel: "Bewertung 5 von 5 Sternen",
    carouselLabel: "Mandantenbewertungen",
    gotoLabel: "Bewertung anzeigen",
    of: "von",
    items: [
      "Ich möchte meine ausgezeichnete Erfahrung mit den Dienstleistungen von Herrn Múkera teilen. Er half mir bei der Gründung bzw. Übernahme einer bestehenden GmbH, bereitete alle erforderlichen Unterlagen vor und erklärte den gesamten Ablauf. Alles verlief reibungslos, schnell und problemlos.",
      "Maximale Zufriedenheit. Ein professioneller, erfahrener und sehr hilfsbereiter Anwalt, der sich wirklich um den Mandanten kümmert. Die Kommunikation war schnell und klar, das Ergebnis übertraf meine Erwartungen. Wenn Sie einen zuverlässigen Anwalt suchen, kann ich ihn nur empfehlen.",
      "Meine Erfahrung war positiv und es gab keinerlei Probleme. Mit den Dienstleistungen war ich überaus zufrieden und kann den Anwalt empfehlen.",
      "Ein sehr netter und entgegenkommender Anwalt. Nach dem Treffen mit ihm hatte ich eine völlig andere Sicht auf unser Problem. Dafür danke ich ihm herzlich.",
      "Ich möchte dem Anwalt JUDr. Peter Múkera, mit dem ich zusammenarbeiten durfte, herzlich danken und ihn zugleich empfehlen. Ich war überaus zufrieden – sein Vorgehen war professionell, schnell und außerordentlich entgegenkommend.",
      "Ich kann ihn nur empfehlen. Herr JUDr. Peter Múkera jun. hat mir alles ausführlich erklärt, wie ich vorgehen soll. Seine rechtliche Hilfe hat mir sehr geholfen, ich schätze auch den menschlichen Umgang. Danke.",
      "Ein ausgezeichneter Anwalt. Ich empfehle, seine professionellen Rechtsdienstleistungen in Anspruch zu nehmen.",
      "Danke für die Beratung und den hilfsbereiten Umgang bei der Lösung meiner Frage.",
      "Ich kann ihn nur empfehlen. Große Zufriedenheit in jeder Hinsicht.",
      "Professionalität, ein angenehmes und menschliches Auftreten, gute Kommunikation – ich empfehle ihn auf jeden Fall.",
      "Er hat richtig und rechtzeitig beraten – völlige Zufriedenheit.",
    ],
  },
  faq: {
    kicker: "FAQ",
    title1: "Fragen, die Sie uns",
    title2: "am häufigsten",
    titleAccent: "stellen.",
    ctaText: "Haben Sie keine Antwort auf Ihre Frage gefunden?",
    ctaLink: "Schreiben Sie uns direkt",
    items: [
      {
        q: "Wie läuft die Erstberatung ab?",
        a: "Beim ersten Treffen hören wir uns Ihr Anliegen ausführlich an, analysieren die verfügbaren Unterlagen und schlagen realistische rechtliche Schritte vor. Die Erstberatung dient uns zur Einschätzung der Erfolgsaussichten.",
      },
      {
        q: "Wie hoch sind die Kosten der rechtlichen Vertretung?",
        a: "Das Honorar wird stets transparent im Voraus festgelegt – entweder als Stundensatz, Pauschalhonorar oder Erfolgshonorar, je nach Art des Falls und Vereinbarung mit dem Mandanten.",
      },
      {
        q: "Vertreten Sie Mandanten auch außerhalb von Banská Bystrica?",
        a: "Ja. Obwohl sich unser Sitz in Banská Bystrica befindet, erbringen wir Rechtsdienstleistungen und vertreten Mandanten vor Gerichten und Behörden im gesamten Gebiet der Slowakischen Republik.",
      },
      {
        q: "Was soll ich zum ersten Treffen mitbringen?",
        a: "Bringen Sie alle relevanten Verträge, Behördenbescheide, Korrespondenz (auch E-Mails) und alle weiteren Unterlagen mit, die unmittelbar mit Ihrem Fall zusammenhängen.",
      },
    ],
  },
  contact: {
    teamKicker: "Anwaltsteam",
    teamTitle: "Unser erfahrenes",
    teamTitleAccent: "Anwaltsteam",
    teamRole: "Rechtsanwalt",
    kicker: "Kontaktieren Sie uns",
    title1: "Wir sind da, um",
    title2: "Ihre Interessen",
    titleAccent: "zu schützen.",
    labelAddress: "Adresse",
    labelEmail: "E-Mail",
    labelPhone: "Telefon",
    formKicker: "Kontaktformular",
    fName: "Vor- und Nachname",
    fEmail: "E-Mail-Adresse",
    fPhone: "Telefon (optional)",
    fMessage: "Nachricht",
    phName: "Max Mustermann",
    phEmail: "max@beispiel.de",
    phPhone: "+421 9XX XXX XXX",
    phMessage: "Beschreiben Sie kurz Ihre Situation...",
    errName: "Geben Sie Ihren Namen ein (mind. 2 Zeichen)",
    errEmail: "Geben Sie eine gültige E-Mail-Adresse ein",
    errMessage: "Die Nachricht muss mindestens 10 Zeichen lang sein",
    sendIdle: "Nachricht senden",
    sendLoading: "Senden...",
    sendSuccess: "Nachricht gesendet ✓",
    sendError: "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt per E-Mail.",
    mapKicker: "So finden Sie uns",
    directions: "Route berechnen",
    mapTitle: "Standort der Kanzlei",
    hoursDay: "Montag – Freitag",
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    gdpr: "Datenschutz",
    webdesign: "Webdesign by SB Design",
  },
};

const pl: Translation = {
  nav: {
    oNas: "O nas",
    sluzby: "Usługi prawne",
    kontakt: "Kontakt",
    referencie: "Referencje",
    cta: "Konsultacja",
    menuOffice: "Kancelaria",
    menuCity: "Banská Bystrica, SR",
    menuOpen: "Otwórz menu",
    menuClose: "Zamknij menu",
    navAria: "Nawigacja główna",
  },
  hero: {
    eyebrow: "Kancelaria adwokacka",
    title1: "Twoje prawa.",
    title2: "Nasz",
    titleAccent: "priorytet.",
    paragraph:
      "Od ponad 25 lat świadczymy usługi prawne osobom fizycznym, przedsiębiorcom i spółkom handlowym. Łączymy wiedzę fachową, rodzinną tradycję i indywidualne podejście do każdego klienta.",
    ctaPrimary: "Umów konsultację",
    ctaSecondary: "Nasze usługi",
    statYears: "Lat praktyki",
    statClients: "Zadowolonych klientów",
    brandTag: "mukera.sk — adwokat",
    location: "Banská Bystrica, Republika Słowacka",
  },
  about: {
    kicker: "O kancelarii",
    title1: "Rozwiązania prawne",
    title2: "oparte na",
    titleAccent: "doświadczeniu.",
    para1:
      "Od ponad 25 lat pomagamy klientom chronić i dochodzić ich praw oraz interesów. Świadczymy usługi prawne oparte na zaufaniu, dyskrecji i konsekwentnej ochronie interesów naszych klientów.",
    para2:
      "Nasza kancelaria opiera się na wieloletnim doświadczeniu, fachowości i indywidualnym podejściu do każdego klienta. Każdej sprawie poświęcamy szczególną uwagę i poszukujemy rozwiązań, które zapewniają pewność prawną nawet w najtrudniejszych sytuacjach życiowych.",
    values: [
      {
        title: "Indywidualne podejście",
        desc: "Każdą sprawę oceniamy odrębnie i proponujemy rozwiązania odpowiadające konkretnej sytuacji klienta.",
      },
      {
        title: "Ponad 25 lat doświadczenia",
        desc: "Mamy wieloletnią praktykę i wiedzę specjalistyczną w zakresie prawa karnego, handlowego, cywilnego, rodzinnego i pracy.",
      },
      {
        title: "Kompleksowe usługi prawne",
        desc: "Świadczymy kompleksowe usługi prawne obejmujące doradztwo prawne, przygotowanie dokumentów prawnych oraz reprezentowanie klientów przed sądami i organami władzy publicznej.",
      },
    ],
    statYears: "Lat praktyki",
    statClients: "Zadowolonych klientów",
    caption: "Justitia — Symbol sprawiedliwości",
  },
  services: {
    kicker: "Obszary praktyki",
    title: "Kompleksowe rozwiązania prawne",
    titleAccent: "dla Twoich potrzeb.",
    badge: "Obszar praktyki",
    ctaText: "Masz pytanie dotyczące tego obszaru? Chętnie udzielimy niezobowiązującej konsultacji.",
    ctaButton: "Umów konsultację",
    close: "Zamknij",
    more: "Dowiedz się więcej",
    items: [
      {
        title: "Prawo karne",
        intro:
          "Obrona, reprezentowanie pokrzywdzonego i pomoc prawna na wszystkich etapach postępowania karnego.",
        detail: [
          "Obrona na wszystkich etapach postępowania karnego.",
          "Reprezentowanie pokrzywdzonego i dochodzenie roszczeń o naprawienie szkody w postępowaniu adhezyjnym.",
          "Doradztwo prawne w sprawach karnych.",
          "Składanie zawiadomień o przestępstwie, zwyczajnych i nadzwyczajnych środków odwoławczych oraz innych wniosków i pism procesowych.",
        ],
      },
      {
        title: "Prawo handlowe",
        intro:
          "Doradztwo prawne dla przedsiębiorców i spółek handlowych, w tym windykacja należności i reprezentowanie w sporach handlowych.",
        detail: [
          "Zakładanie i zmiany w spółkach handlowych, w tym wpisy do rejestru handlowego.",
          "Przygotowywanie i weryfikacja umów handlowych.",
          "Windykacja należności — pozasądowa i sądowa, w tym reprezentowanie w postępowaniu egzekucyjnym.",
          "Doradztwo prawne przy fuzjach, przejęciach i zbyciu udziałów.",
          "Reprezentowanie w sporach handlowych przed sądami.",
        ],
      },
      {
        title: "Prawo cywilne",
        intro:
          "Ochrona praw, rozwiązywanie sporów i reprezentowanie w sprawach cywilnych.",
        detail: [
          "Przygotowywanie i weryfikacja umów cywilnoprawnych (umowa sprzedaży, umowa darowizny, umowa o dzieło i inne).",
          "Postępowania spadkowe i podział majątku.",
          "Odszkodowania i dochodzenie roszczeń z tytułu odpowiedzialności za szkodę.",
          "Spory o własność i spory sąsiedzkie.",
          "Ochrona dóbr osobistych, zadośćuczynienie za krzywdę i ochrona przed bezprawnym naruszeniem.",
          "Reprezentowanie w sporach cywilnych przed sądami.",
        ],
      },
      {
        title: "Prawo rodzinne",
        intro:
          "Rozwody, prawa rodzicielskie, alimenty i podział majątku małżonków.",
        detail: [
          "Reprezentowanie w sprawach o rozwód oraz o uregulowanie wykonywania władzy rodzicielskiej.",
          "Ustalanie i dochodzenie alimentów na dzieci, małżonka i rozwiedzionego małżonka.",
          "Zastąpienie zgody rodziców orzeczeniem sądu.",
          "Podział majątku wspólnego małżonków po rozwodzie, zniesienie lub ograniczenie wspólności majątkowej w trakcie trwania małżeństwa.",
          "Ustalenie i zaprzeczenie ojcostwa, przysposobienie i opieka.",
        ],
      },
      {
        title: "Prawo pracy",
        intro:
          "Doradztwo prawne i reprezentowanie w stosunkach pracy i sporach pracowniczych.",
        detail: [
          "Przygotowywanie i weryfikacja umów o pracę oraz wewnętrznych przepisów pracodawcy.",
          "Rozwiązanie stosunku pracy i wynagrodzenie zastępcze.",
          "Dyskryminacja i ochrona praw pracowników.",
          "Doradztwo prawne dla pracodawców i pracowników w stosunkach pracy.",
          "Reprezentowanie w sporach pracowniczych przed sądami.",
        ],
      },
      {
        title: "Nieruchomości i umowy",
        intro:
          "Przygotowywanie umów, przeniesienia własności nieruchomości i reprezentowanie przy obrocie nieruchomościami.",
        detail: [
          "Przygotowywanie i weryfikacja umów sprzedaży, darowizny, najmu i innych umów.",
          "Prawne sprawdzenie nieruchomości przed zakupem (due diligence).",
          "Zastaw, służebności i inne prawa do rzeczy cudzej.",
          "Zniesienie i podział współwłasności w częściach ułamkowych.",
          "Reprezentowanie w postępowaniu wieczystoksięgowym.",
          "Doradztwo prawne przy projektach deweloperskich i zarządzaniu budynkami mieszkalnymi.",
        ],
      },
    ],
  },
  reviews: {
    kicker: "Referencje",
    title: "Zaufanie, które",
    titleAccent: "mówi samo za siebie.",
    subtitle: "Prawdziwe opinie klientów, których mieliśmy zaszczyt reprezentować.",
    footer: "Opinie naszych klientów z Google",
    prev: "Poprzednia opinia",
    next: "Następna opinia",
    ratingLabel: "Ocena 5 na 5 gwiazdek",
    carouselLabel: "Opinie klientów",
    gotoLabel: "Pokaż opinię",
    of: "z",
    items: [
      "Chcę podzielić się znakomitym doświadczeniem z usługami pana mecenasa Múkery. Pomógł mi w założeniu, a właściwie przejęciu istniejącej spółki z o.o., przygotował wszystkie potrzebne dokumenty i wyjaśnił cały proces. Wszystko przebiegło sprawnie, szybko i bezproblemowo.",
      "Maksymalne zadowolenie. Profesjonalny, doświadczony i bardzo pomocny prawnik, który naprawdę poświęca się klientowi. Komunikacja była szybka i jasna, a wynik przeszedł moje oczekiwania. Jeśli szukacie rzetelnego prawnika, zdecydowanie polecam.",
      "Moje doświadczenie było pozytywne i nie było żadnego problemu. Z usług byłem niezwykle zadowolony i mogę polecić pana adwokata.",
      "Bardzo miły i życzliwy pan adwokat. Po spotkaniu z nim zyskałam zupełnie inne spojrzenie na nasz problem. Bardzo mu za to dziękuję.",
      "Chcę serdecznie podziękować, a zarazem polecić prawnika JUDr. Petra Múkerę, z którym miałem zaszczyt współpracować. Byłem niezwykle zadowolony – jego podejście było profesjonalne, szybkie i wyjątkowo życzliwe.",
      "Mogę tylko polecić. Pan JUDr. Peter Múkera jr. wszystko mi szczegółowo wyjaśnił, jak mam postępować. Jego pomoc prawna bardzo mi pomogła, doceniam też ludzkie podejście. Dziękuję.",
      "Wyśmienity pan adwokat. Polecam skorzystać z jego profesjonalnych usług prawnych.",
      "Dziękuję za poradę i życzliwe podejście do rozwiązania mojej sprawy.",
      "Mogę tylko polecić. Wielkie zadowolenie pod każdym względem.",
      "Profesjonalizm, miłe i ludzkie podejście, dobra komunikacja, zdecydowanie polecam.",
      "Doradził prawidłowo i na czas – pełne zadowolenie.",
    ],
  },
  faq: {
    kicker: "FAQ",
    title1: "Pytania, które",
    title2: "zadajecie nam",
    titleAccent: "najczęściej.",
    ctaText: "Nie znalazłeś odpowiedzi na swoje pytanie?",
    ctaLink: "Napisz do nas bezpośrednio",
    items: [
      {
        q: "Jak przebiega wstępna konsultacja?",
        a: "Na pierwszym spotkaniu szczegółowo wysłuchujemy Twojego problemu, analizujemy dostępne dokumenty i proponujemy realne kroki prawne. Wstępna konsultacja służy nam do oceny szans na powodzenie.",
      },
      {
        q: "Jakie są koszty zastępstwa prawnego?",
        a: "Wynagrodzenie jest zawsze ustalane w sposób przejrzysty z góry – jako stawka godzinowa, wynagrodzenie ryczałtowe lub wynagrodzenie prowizyjne, w zależności od charakteru sprawy i ustaleń z klientem.",
      },
      {
        q: "Czy reprezentujecie klientów także poza Bańską Bystrzycą?",
        a: "Tak. Mimo że nasza siedziba znajduje się w Bańskiej Bystrzycy, świadczymy usługi prawne i reprezentujemy klientów przed sądami i urzędami na terenie całej Republiki Słowackiej.",
      },
      {
        q: "Co powinienem przynieść na pierwsze spotkanie?",
        a: "Proszę przynieść wszystkie istotne umowy, decyzje urzędów, korespondencję (również e-mailową) oraz wszelkie inne dokumenty bezpośrednio związane z Twoją sprawą.",
      },
    ],
  },
  contact: {
    teamKicker: "Zespół adwokacki",
    teamTitle: "Nasz doświadczony",
    teamTitleAccent: "zespół adwokacki",
    teamRole: "Adwokat",
    kicker: "Skontaktuj się z nami",
    title1: "Jesteśmy po to, by",
    title2: "chronić",
    titleAccent: "Twoje interesy.",
    labelAddress: "Adres",
    labelEmail: "E-mail",
    labelPhone: "Telefon",
    formKicker: "Formularz kontaktowy",
    fName: "Imię i nazwisko",
    fEmail: "Adres e-mail",
    fPhone: "Telefon (opcjonalnie)",
    fMessage: "Wiadomość",
    phName: "Jan Kowalski",
    phEmail: "jan@przyklad.pl",
    phPhone: "+421 9XX XXX XXX",
    phMessage: "Opisz krótko swoją sytuację...",
    errName: "Podaj imię (min. 2 znaki)",
    errEmail: "Podaj prawidłowy adres e-mail",
    errMessage: "Wiadomość musi mieć co najmniej 10 znaków",
    sendIdle: "Wyślij wiadomość",
    sendLoading: "Wysyłanie...",
    sendSuccess: "Wiadomość wysłana ✓",
    sendError: "Nie udało się wysłać wiadomości. Spróbuj później lub napisz bezpośrednio na e-mail.",
    mapKicker: "Gdzie nas znaleźć",
    directions: "Wyznacz trasę",
    mapTitle: "Lokalizacja kancelarii",
    hoursDay: "Poniedziałek – Piątek",
  },
  footer: {
    rights: "Wszelkie prawa zastrzeżone.",
    gdpr: "Ochrona danych osobowych",
    webdesign: "Webdesign by SB Design",
  },
};

export const translations: Record<Locale, Translation> = { sk, en, de, pl };
