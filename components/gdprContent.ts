// ─── Obsah stránky Ochrana osobných údajov + Cookies ───────────────────────────
// DRAFT pripravený na mieru webu (kontaktný formulár Web3Forms -> office@mukera.sk,
// Google Mapy po súhlase, jazyk v localStorage).
// IČO (48 411 124) a číslo zápisu v SAK (7155) sú doplnené.
// Právne znenie nech advokát pred ostrým spustením ešte skontroluje.

import type { Locale } from "./translations";

export interface GdprSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  note?: string;
}

export interface GdprDoc {
  title: string;
  updated: string;
  intro: string;
  sections: GdprSection[];
  backHome: string;
}

const sk: GdprDoc = {
  title: "Ochrana osobných údajov a cookies",
  updated: "Posledná aktualizácia: jún 2026",
  intro:
    "Tieto zásady vysvetľujú, ako advokátska kancelária JUDr. Peter Múkera spracúva osobné údaje návštevníkov tejto webovej stránky a aké technológie (cookies a podobné) používa. Spracúvanie prebieha v súlade s Nariadením (EÚ) 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.",
  sections: [
    {
      heading: "Prevádzkovateľ",
      paragraphs: [
        "Prevádzkovateľom je advokátska kancelária JUDr. Peter Múkera, so sídlom Československej armády 1007/25, 974 01 Banská Bystrica, IČO: 48 411 124, zapísaná v zozname advokátov Slovenskej advokátskej komory pod č. 7155.",
        "Kontakt vo veciach ochrany osobných údajov: e-mail office@mukera.sk, tel. +421 904 808 234.",
      ],
    },
    {
      heading: "Aké údaje spracúvame",
      paragraphs: ["Pri použití kontaktného formulára spracúvame údaje, ktoré nám sami poskytnete:"],
      items: [
        "meno a priezvisko,",
        "e-mailová adresa,",
        "telefónne číslo (nepovinné),",
        "obsah vašej správy.",
      ],
      note: "Nepoužívame analytické ani reklamné nástroje na sledovanie a nevytvárame profily návštevníkov.",
    },
    {
      heading: "Účel a právny základ",
      paragraphs: [
        "Údaje z formulára spracúvame výlučne na účel vybavenia vášho dopytu a odpovede naň, prípadne na vykonanie krokov pred uzavretím zmluvy o poskytovaní právnych služieb.",
        "Právnym základom je vykonanie predzmluvných opatrení na vašu žiadosť (čl. 6 ods. 1 písm. b GDPR), resp. náš oprávnený záujem odpovedať na dopyt (čl. 6 ods. 1 písm. f GDPR).",
      ],
    },
    {
      heading: "Príjemcovia a sprostredkovatelia",
      paragraphs: ["Na prevádzku webu a doručovanie správ využívame týchto poskytovateľov:"],
      items: [
        "Web3Forms – spracovanie a doručenie odoslaného formulára na náš e-mail,",
        "Vercel Inc. – hosting webovej stránky,",
        "Webglobe, s.r.o. – e-mailové služby (schránka office@mukera.sk),",
        "Google Ireland Ltd. – zobrazenie mapy (len po vašom súhlase).",
      ],
      note: "Niektorí poskytovatelia (Web3Forms, Vercel, Google) môžu spracúvať údaje aj mimo EÚ; prenos je zabezpečený štandardnými zmluvnými doložkami EÚ.",
    },
    {
      heading: "Doba uchovávania",
      paragraphs: [
        "Údaje z dopytu uchovávame len po dobu nevyhnutnú na jeho vybavenie a na prípadné nadviazanie spolupráce, najviac však počas trvania príslušných premlčacích a archivačných lehôt podľa osobitných predpisov. Následne ich vymažeme.",
      ],
    },
    {
      heading: "Vaše práva",
      paragraphs: ["Ako dotknutá osoba máte právo:"],
      items: [
        "na prístup k svojim údajom a ich opravu,",
        "na výmaz („právo byť zabudnutý“) a obmedzenie spracúvania,",
        "na prenosnosť údajov,",
        "namietať proti spracúvaniu,",
        "kedykoľvek odvolať udelený súhlas,",
        "podať sťažnosť na Úrad na ochranu osobných údajov SR (dataprotection.gov.sk).",
      ],
      note: "Svoje práva si môžete uplatniť na e-maile office@mukera.sk.",
    },
    {
      heading: "Cookies a podobné technológie",
      paragraphs: [
        "Nevyhnutné / funkčné: do vášho prehliadača (localStorage) ukladáme iba vašu voľbu jazyka a voľbu súhlasu s cookies. Sú nutné pre fungovanie stránky a nevyžadujú súhlas.",
        "Tretie strany (po súhlase): mapa Google Maps. Mapa sa načíta až po tom, ako udelíte súhlas v cookie lište; vtedy môže spoločnosť Google nastaviť vlastné cookies. Bez súhlasu sa mapa nenačíta.",
        "Súhlas môžete kedykoľvek zmeniť alebo odvolať vymazaním údajov tejto stránky v prehliadači, prípadne nás kontaktujte. Cookies viete spravovať aj v nastaveniach svojho prehliadača.",
      ],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        "V prípade akýchkoľvek otázok týkajúcich sa ochrany osobných údajov nás kontaktujte na e-maile office@mukera.sk alebo na adrese sídla kancelárie.",
      ],
    },
  ],
  backHome: "Späť na hlavnú stránku",
};

const en: GdprDoc = {
  title: "Privacy & cookie policy",
  updated: "Last updated: June 2026",
  intro:
    "This policy explains how the law firm JUDr. Peter Múkera processes the personal data of visitors to this website and what technologies (cookies and similar) it uses. Processing is carried out in accordance with Regulation (EU) 2016/679 (GDPR) and Act No. 18/2018 Coll. on the protection of personal data.",
  sections: [
    {
      heading: "Controller",
      paragraphs: [
        "The controller is the law firm JUDr. Peter Múkera, with its registered office at Československej armády 1007/25, 974 01 Banská Bystrica, Slovakia, Company ID (IČO): 48 411 124, registered in the list of lawyers of the Slovak Bar Association under no. 7155.",
        "Contact for data protection matters: e-mail office@mukera.sk, tel. +421 904 808 234.",
      ],
    },
    {
      heading: "What data we process",
      paragraphs: ["When you use the contact form, we process the data you provide to us:"],
      items: [
        "name and surname,",
        "e-mail address,",
        "phone number (optional),",
        "the content of your message.",
      ],
      note: "We do not use analytics or advertising tracking tools and we do not create visitor profiles.",
    },
    {
      heading: "Purpose and legal basis",
      paragraphs: [
        "We process the form data solely to handle and respond to your enquiry, or to take steps prior to entering into a contract for the provision of legal services.",
        "The legal basis is taking pre-contractual steps at your request (Art. 6(1)(b) GDPR), or our legitimate interest in responding to the enquiry (Art. 6(1)(f) GDPR).",
      ],
    },
    {
      heading: "Recipients and processors",
      paragraphs: ["To operate the website and deliver messages we use the following providers:"],
      items: [
        "Web3Forms – processing and delivery of the submitted form to our e-mail,",
        "Vercel Inc. – website hosting,",
        "Webglobe, s.r.o. – e-mail services (the office@mukera.sk mailbox),",
        "Google Ireland Ltd. – displaying the map (only with your consent).",
      ],
      note: "Some providers (Web3Forms, Vercel, Google) may process data outside the EU; the transfer is secured by the EU Standard Contractual Clauses.",
    },
    {
      heading: "Retention period",
      paragraphs: [
        "We keep enquiry data only for as long as necessary to handle it and to potentially establish cooperation, and at most for the duration of the relevant limitation and archiving periods under specific regulations. We then delete it.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: ["As a data subject, you have the right:"],
      items: [
        "to access and rectify your data,",
        "to erasure (the “right to be forgotten”) and restriction of processing,",
        "to data portability,",
        "to object to processing,",
        "to withdraw your consent at any time,",
        "to lodge a complaint with the Office for Personal Data Protection of the Slovak Republic (dataprotection.gov.sk).",
      ],
      note: "You can exercise your rights by e-mail at office@mukera.sk.",
    },
    {
      heading: "Cookies and similar technologies",
      paragraphs: [
        "Necessary / functional: we store only your language choice and your cookie-consent choice in your browser (localStorage). These are required for the site to work and do not require consent.",
        "Third parties (after consent): the Google Maps map. The map loads only after you give consent in the cookie banner; Google may then set its own cookies. Without consent, the map does not load.",
        "You can change or withdraw your consent at any time by clearing this site’s data in your browser, or by contacting us. You can also manage cookies in your browser settings.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "If you have any questions regarding the protection of personal data, contact us by e-mail at office@mukera.sk or at the firm’s registered address.",
      ],
    },
  ],
  backHome: "Back to home",
};

const de: GdprDoc = {
  title: "Datenschutz & Cookie-Richtlinie",
  updated: "Zuletzt aktualisiert: Juni 2026",
  intro:
    "Diese Richtlinie erläutert, wie die Anwaltskanzlei JUDr. Peter Múkera die personenbezogenen Daten der Besucher dieser Website verarbeitet und welche Technologien (Cookies und Ähnliches) sie verwendet. Die Verarbeitung erfolgt im Einklang mit der Verordnung (EU) 2016/679 (DSGVO) und dem Gesetz Nr. 18/2018 Slg. über den Schutz personenbezogener Daten.",
  sections: [
    {
      heading: "Verantwortlicher",
      paragraphs: [
        "Verantwortlicher ist die Anwaltskanzlei JUDr. Peter Múkera mit Sitz in Československej armády 1007/25, 974 01 Banská Bystrica, Slowakei, ID-Nr. (IČO): 48 411 124, eingetragen in der Liste der Rechtsanwälte der Slowakischen Anwaltskammer unter Nr. 7155.",
        "Kontakt in Datenschutzangelegenheiten: E-Mail office@mukera.sk, Tel. +421 904 808 234.",
      ],
    },
    {
      heading: "Welche Daten wir verarbeiten",
      paragraphs: ["Bei Nutzung des Kontaktformulars verarbeiten wir die von Ihnen angegebenen Daten:"],
      items: [
        "Vor- und Nachname,",
        "E-Mail-Adresse,",
        "Telefonnummer (optional),",
        "den Inhalt Ihrer Nachricht.",
      ],
      note: "Wir verwenden keine Analyse- oder Werbe-Tracking-Tools und erstellen keine Besucherprofile.",
    },
    {
      heading: "Zweck und Rechtsgrundlage",
      paragraphs: [
        "Wir verarbeiten die Formulardaten ausschließlich zur Bearbeitung und Beantwortung Ihrer Anfrage bzw. zur Durchführung von Schritten vor Abschluss eines Vertrags über die Erbringung von Rechtsdienstleistungen.",
        "Rechtsgrundlage ist die Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage hin (Art. 6 Abs. 1 lit. b DSGVO) bzw. unser berechtigtes Interesse, die Anfrage zu beantworten (Art. 6 Abs. 1 lit. f DSGVO).",
      ],
    },
    {
      heading: "Empfänger und Auftragsverarbeiter",
      paragraphs: ["Für den Betrieb der Website und die Zustellung von Nachrichten nutzen wir folgende Anbieter:"],
      items: [
        "Web3Forms – Verarbeitung und Zustellung des gesendeten Formulars an unsere E-Mail,",
        "Vercel Inc. – Hosting der Website,",
        "Webglobe, s.r.o. – E-Mail-Dienste (Postfach office@mukera.sk),",
        "Google Ireland Ltd. – Anzeige der Karte (nur mit Ihrer Einwilligung).",
      ],
      note: "Einige Anbieter (Web3Forms, Vercel, Google) können Daten auch außerhalb der EU verarbeiten; die Übermittlung ist durch die EU-Standardvertragsklauseln abgesichert.",
    },
    {
      heading: "Speicherdauer",
      paragraphs: [
        "Anfragedaten speichern wir nur so lange, wie es zur Bearbeitung und zur möglichen Aufnahme einer Zusammenarbeit erforderlich ist, höchstens jedoch für die Dauer der einschlägigen Verjährungs- und Aufbewahrungsfristen nach besonderen Vorschriften. Danach löschen wir sie.",
      ],
    },
    {
      heading: "Ihre Rechte",
      paragraphs: ["Als betroffene Person haben Sie das Recht:"],
      items: [
        "auf Auskunft über Ihre Daten und deren Berichtigung,",
        "auf Löschung („Recht auf Vergessenwerden“) und Einschränkung der Verarbeitung,",
        "auf Datenübertragbarkeit,",
        "der Verarbeitung zu widersprechen,",
        "eine erteilte Einwilligung jederzeit zu widerrufen,",
        "eine Beschwerde beim Amt für den Schutz personenbezogener Daten der Slowakischen Republik einzureichen (dataprotection.gov.sk).",
      ],
      note: "Ihre Rechte können Sie per E-Mail an office@mukera.sk geltend machen.",
    },
    {
      heading: "Cookies und ähnliche Technologien",
      paragraphs: [
        "Notwendig / funktional: In Ihrem Browser (localStorage) speichern wir lediglich Ihre Sprachauswahl und Ihre Cookie-Einwilligung. Sie sind für das Funktionieren der Website erforderlich und bedürfen keiner Einwilligung.",
        "Drittanbieter (nach Einwilligung): die Google-Maps-Karte. Die Karte wird erst geladen, nachdem Sie im Cookie-Banner eingewilligt haben; Google kann dann eigene Cookies setzen. Ohne Einwilligung wird die Karte nicht geladen.",
        "Ihre Einwilligung können Sie jederzeit ändern oder widerrufen, indem Sie die Daten dieser Website in Ihrem Browser löschen, oder indem Sie uns kontaktieren. Cookies können Sie auch in den Einstellungen Ihres Browsers verwalten.",
      ],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        "Bei Fragen zum Schutz personenbezogener Daten kontaktieren Sie uns per E-Mail an office@mukera.sk oder an der Sitzadresse der Kanzlei.",
      ],
    },
  ],
  backHome: "Zurück zur Startseite",
};

const pl: GdprDoc = {
  title: "Ochrona danych osobowych i pliki cookies",
  updated: "Ostatnia aktualizacja: czerwiec 2026",
  intro:
    "Niniejsza polityka wyjaśnia, w jaki sposób kancelaria adwokacka JUDr. Peter Múkera przetwarza dane osobowe odwiedzających tę stronę internetową oraz jakie technologie (pliki cookies i podobne) wykorzystuje. Przetwarzanie odbywa się zgodnie z Rozporządzeniem (UE) 2016/679 (RODO) oraz ustawą nr 18/2018 Dz.U. o ochronie danych osobowych.",
  sections: [
    {
      heading: "Administrator",
      paragraphs: [
        "Administratorem jest kancelaria adwokacka JUDr. Peter Múkera z siedzibą przy Československej armády 1007/25, 974 01 Banská Bystrica, Słowacja, IČO: 48 411 124, wpisana na listę adwokatów Słowackiej Izby Adwokackiej pod nr 7155.",
        "Kontakt w sprawach ochrony danych: e-mail office@mukera.sk, tel. +421 904 808 234.",
      ],
    },
    {
      heading: "Jakie dane przetwarzamy",
      paragraphs: ["Korzystając z formularza kontaktowego, przetwarzamy dane, które nam podajesz:"],
      items: [
        "imię i nazwisko,",
        "adres e-mail,",
        "numer telefonu (opcjonalnie),",
        "treść Twojej wiadomości.",
      ],
      note: "Nie używamy narzędzi analitycznych ani reklamowych do śledzenia i nie tworzymy profili odwiedzających.",
    },
    {
      heading: "Cel i podstawa prawna",
      paragraphs: [
        "Dane z formularza przetwarzamy wyłącznie w celu obsługi i udzielenia odpowiedzi na Twoje zapytanie lub podjęcia działań przed zawarciem umowy o świadczenie usług prawnych.",
        "Podstawą prawną jest podjęcie działań przed zawarciem umowy na Twoje żądanie (art. 6 ust. 1 lit. b RODO) lub nasz prawnie uzasadniony interes polegający na udzieleniu odpowiedzi (art. 6 ust. 1 lit. f RODO).",
      ],
    },
    {
      heading: "Odbiorcy i podmioty przetwarzające",
      paragraphs: ["Do obsługi strony i dostarczania wiadomości korzystamy z następujących dostawców:"],
      items: [
        "Web3Forms – przetwarzanie i dostarczenie wysłanego formularza na nasz e-mail,",
        "Vercel Inc. – hosting strony internetowej,",
        "Webglobe, s.r.o. – usługi e-mail (skrzynka office@mukera.sk),",
        "Google Ireland Ltd. – wyświetlanie mapy (wyłącznie za Twoją zgodą).",
      ],
      note: "Niektórzy dostawcy (Web3Forms, Vercel, Google) mogą przetwarzać dane także poza UE; transfer jest zabezpieczony standardowymi klauzulami umownymi UE.",
    },
    {
      heading: "Okres przechowywania",
      paragraphs: [
        "Dane z zapytania przechowujemy tylko przez czas niezbędny do jego obsługi i ewentualnego nawiązania współpracy, jednak nie dłużej niż przez okres odpowiednich terminów przedawnienia i archiwizacji wynikających z przepisów szczególnych. Następnie je usuwamy.",
      ],
    },
    {
      heading: "Twoje prawa",
      paragraphs: ["Jako osoba, której dane dotyczą, masz prawo:"],
      items: [
        "dostępu do swoich danych i ich sprostowania,",
        "do usunięcia („prawo do bycia zapomnianym”) i ograniczenia przetwarzania,",
        "do przenoszenia danych,",
        "do wniesienia sprzeciwu wobec przetwarzania,",
        "do wycofania zgody w dowolnym momencie,",
        "do wniesienia skargi do Urzędu Ochrony Danych Osobowych Republiki Słowackiej (dataprotection.gov.sk).",
      ],
      note: "Swoje prawa możesz zrealizować pod adresem e-mail office@mukera.sk.",
    },
    {
      heading: "Pliki cookies i podobne technologie",
      paragraphs: [
        "Niezbędne / funkcjonalne: w Twojej przeglądarce (localStorage) zapisujemy jedynie wybór języka oraz wybór zgody na cookies. Są one niezbędne do działania strony i nie wymagają zgody.",
        "Podmioty trzecie (po wyrażeniu zgody): mapa Google Maps. Mapa ładuje się dopiero po wyrażeniu zgody w banerze cookies; Google może wówczas ustawić własne pliki cookies. Bez zgody mapa się nie ładuje.",
        "Zgodę możesz w dowolnym momencie zmienić lub wycofać, usuwając dane tej strony w przeglądarce, albo kontaktując się z nami. Plikami cookies możesz też zarządzać w ustawieniach przeglądarki.",
      ],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        "W razie jakichkolwiek pytań dotyczących ochrony danych osobowych skontaktuj się z nami pod adresem e-mail office@mukera.sk lub pod adresem siedziby kancelarii.",
      ],
    },
  ],
  backHome: "Powrót na stronę główną",
};

export const GDPR_CONTENT: Record<Locale, GdprDoc> = { sk, en, de, pl };
