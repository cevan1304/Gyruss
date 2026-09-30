GYRUSS / AURORA — GitHub Pages v8 / Google TOP 50
================================================

Táto verzia zachováva finálnu päťlevelovú hru v7, intro, GAME OVER,
outro s hudbou a súhrn výsledkov. Pridáva spoločný rebríček v Google Sheets.

1. DOKONČENIE NASTAVENIA GOOGLE
Pri overení dodanej /exec adresy služba presmerovala návštevníka na
prihlásenie Google. Verejné čítanie ani živý zápis preto zatiaľ nie sú overené.

V projekte Apps Script otvor:
Deploy / Nasadiť → Manage deployments / Spravovať nasadenia → ceruzka.
Web app / Webová aplikácia musí mať:
- Execute as / Spustiť ako: Me / Ja (vlastník tabuľky).
- Who has access / Kto má prístup: Anyone / Ktokoľvek.
  Nevyberaj možnosť vyžadujúcu účet Google.
Potom nasadenie potvrď. Ak Google vyžaduje novú verziu, zvoľ New version.

Ak ešte nebola spustená funkcia setupLeaderboard, spusti ju raz v editore
a povoľ prístup skriptu k svojej tabuľke. Existujúce výsledky sa tým nemažú.

Otvoriť /exec adresu v anonymnom okne bez prihlásenia musí zobraziť
GYRUSS TOP 50 a „Leaderboard service is ready.“. Ak sa zobrazí prihlásenie,
prístup ešte nie je nastavený správne. Ak sa objaví „Leaderboard setup is
incomplete.“, skontroluj oprávnenia a hlavičky v prvom liste tabuľky:
RANK | PILOT | BEST SCORE | LEVEL | UPDATED.

Tabuľka môže zostať súkromná. Hráči pristupujú k webovej aplikácii,
ktorá používa oprávnenia vlastníka tabuľky; nepotrebujú editovať tabuľku.

Súbor leaderboard-config.js už obsahuje tvoju dodanú /exec adresu.
Ak vytvoríš nové nasadenie s inou adresou, nahraď v tomto súbore iba URL.
Používaj produkčnú adresu /exec, nie testovaciu /dev.
Gyruss_Google_Leaderboard.gs je kópia pripraveného serverového kódu pre
referenciu. Ak už je tento kód nasadený, nemusíš ho znovu vkladať.
Kód povoľuje herný web s pôvodom https://cevan1304.github.io.

2. NAHRATIE HRY NA GITHUB PAGES
- Rozbaľ ZIP a do cevan1304/Gyruss nahraj jeho OBSAH: index.html,
  campaign.html, outro.html, leaderboard-config.js, assets/, .nojekyll
  a README.txt. Kópiu .gs môžeš ponechať aj v repozitári.
- index.html musí byť v koreňovom priečinku repozitára. ZIP samotný
  nenahrávaj ako hru. Priečinok assets obsahuje potrebné obrázky a hudbu.
- Settings → Pages → Deploy from a branch → main → / (root) → Save.
- Otvor adresu potvrdenú v Settings → Pages. Očakávaná adresa je
  https://cevan1304.github.io/Gyruss/; tento balík nepotvrdzuje publikovanie.

3. AKO SA UKLADAJÚ VÝSLEDKY
- Po smrti, zlyhaní alebo prejdení celej kampane sa odošle celkové skóre:
  body dokončených levelov plus aktuálny pokus. Súhrn a filmové obrazovky
  pokračujú bez čakania na Google.
- Jeden pilot má jeden najlepší výsledok, rovnaké meno bez ohľadu na
  veľkosť písmen je rovnaký pilot. Spoločná tabuľka uchováva TOP 50.
- Slabší pokus nenahradí vyšší rekord. Skóre mimo TOP 50 sa v spoločnej
  tabuľke neuchová. Hra si zároveň zachováva vlastné lokálne TOP 50.
- Pri výpadku sa neodoslané najlepšie výsledky uložia na zariadení.
  Fronta uchováva najlepších 50 neodoslaných výsledkov, po jednom na pilota.
  Pri ďalšom otvorení online hry, obnovení spojenia alebo RETRY SYNC sa
  odošlú znova. Vymazanie dát stránky odstráni lokálnu zálohu aj frontu.
- Shared TOP 50 znamená tabuľku načítanú z Google Sheets. Last synced
  TOP 50 znamená poslednú načítanú kópiu pri výpadku. Local TOP 50 znamená
  výsledky iba z tohto prehliadača. Neodoslaný výsledok sa nevydáva za
  potvrdený zápis do spoločnej tabuľky.
- REFRESH aktualizuje tabuľku. RETRY SYNC skúsi obnoviť spojenie a zápis.
- Ak je localStorage blokované, lokálne výsledky a fronta zostanú iba
  počas aktuálnej relácie; upozornenie je zobrazené v rebríčku.
- Historické výsledky zo starej v7 sa automaticky neposielajú do Google.
  Lokálna tabuľka z v7 ostáva zachovaná; zdieľajú sa nové ukončené pokusy.
- Otvorenie cez file:// alebo localhost slúži na lokálny test hry.
  Spoločný rebríček je nastavený pre uvedenú HTTPS doménu GitHub Pages.
- V hre ani v repozitári nie sú potrebné heslá ani Google prístupové tokeny.

4. OVERENIE PO PUBLIKOVANÍ
- V anonymnom okne otvor hru, START → meno pilota → TOP 50.
  Pätička musí uvádzať Shared TOP 50 · Google Sheets.
- Odohratý pokus ukonči a skontroluj jeho meno/skóre v tabuľke Google.
- Na inom zariadení alebo v inom prehliadači otvor TOP 50 a REFRESH.
  Rovnaký výsledok sa musí zobraziť aj tam.
- Ak služba neodpovedá, hra pokračuje a výsledok čaká na synchronizáciu.

5. OVLÁDANIE
Hra funguje iba na šírku. Fullscreen prepína celú obrazovku.
START → meno pilota → intro / Skip intro → kampaň.
Klávesnica: šípky = pohyb, medzerník = streľba, A = Auto, W = zbraň,
Shift = štít, P = pauza. Mobil: tlačidlá na obrazovke.
Po smrti nasleduje GAME OVER, po piatom leveli outro. Potom súhrn a po
20 sekundách alebo tlačidlom TOP 50 rebríček. Back to results vráti súhrn.

OVERENIE BALÍKA
Automatizované testy preverujú klienta a pripravený Apps Script s modelom
tabuľky: dva zariadenia, uloženie a vyšší/nižší rekord, frontu pri výpadku,
obnovenie po opätovnom otvorení, bezpečné správy a pôvodné koncové obrazovky.
Živý zápis do tvojej tabuľky ešte vyžaduje verejný prístup k nasadeniu.

Oficiálne návody:
https://developers.google.com/apps-script/guides/web
https://developers.google.com/apps-script/guides/html/communication
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
