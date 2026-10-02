GYRUSS / AURORA — GitHub v9 Optimized
=====================================

Tento balík zodpovedá optimalizovanej HTML verzii v9. Obsahuje všetkých
5 levelov, pôvodné intro/outro, opravu iPhone ovládania a Google TOP 50.
Médiá sú rozdelené na menšie samostatné súbory pre GitHub Pages.

AKTUALIZÁCIA Z PREDCHÁDZAJÚCEJ GITHUB VERZIE v8
1. Rozbaľ ZIP na počítači.
2. V repozitári cevan1304/Gyruss nahraď tieto súbory v koreňovom priečinku:
   index.html
   campaign.html
   outro.html
   README.txt (nový návod)
3. Nahraj celý priečinok assets z tohto balíka do existujúceho assets.
   Nahraď všetkých 34 obrázkov .webp a pridaj všetkých 7 nových skladieb .m4a.
   Zachovaj názvy súborov aj priečinka assets.
4. Ponechaj existujúci leaderboard-config.js s tvojou fungujúcou adresou
   Google Apps Script. Backend ani Google tabuľku nemusíš znova nastavovať.
5. Súbory touch-controls.css, .nojekyll a Gyruss_Google_Leaderboard.gs
   majú rovnaký obsah ako v8 a netreba ich aktualizovať. Ak ešte nemáš
   touch-controls.css z opravy iPhone, pridaj ho z tohto balíka.
6. Po dokončení publikovania GitHub Pages obnov stránku hry.
   Odkazy na herné časti a médiá majú označenie ?v=9, aby prehliadač načítal
   nové súbory. Na počítači môžeš použiť Ctrl+F5, na mobile obnov stránku.

Nahraj ROZBALENÝ OBSAH, nie ZIP ako samotnú hru. index.html patrí priamo
do koreňa repozitára, nie do vnoreného priečinka Gyruss_GitHub_v9_Optimized.
Najprv nahraj assets, potom HTML, aby nové stránky mali dostupné médiá.
Ak rozhranie umožní jeden spoločný commit, nahraj všetky zmeny naraz.

STARÉ MP3 SÚBORY
Nová verzia ich už nepoužíva. Môžu zostať na GitHube; na hranie sa nenačítajú.
Po overení v9 ich môžeš odstrániť, ak ich nepoužíva iná ponechaná verzia hry:
   assets/intro-music-4530068365.mp3
   assets/level-1-music-2e20e41bd6.mp3
   assets/level-2-music-c21c2c0f02.mp3
   assets/level-3-music-f110edf132.mp3
   assets/level-4-music-a4865790e9.mp3
   assets/level-5-music-a8fcfe737c.mp3
   assets/outro-music-3dc20cb770.mp3

NOVÉ NASADENIE
Pri úplne novom repozitári nahraj celý obsah balíka vrátane .nojekyll,
touch-controls.css a leaderboard-config.js. Nastavený Google backend
očakáva pôvod https://cevan1304.github.io.
Použi vstupný index.html; campaign.html a outro.html sú vnútorné časti.

ČO SA ZMENILO V HRE
- Fyzika a kadencia streľby sú rovnaké pri 15/30/60/120 FPS.
- Zásahy sa vyhodnocujú podľa skutočnej vzdialenosti na obrazovke.
- Štít má krátku ochranu pred súbežnými zásahmi a nedopĺňa sa automaticky.
- Náročnosť levelov rastie plynulejšie a nepriateľské salvy sú rozložené v čase.
- Blízke bonusové planétky sa ľahšie zbierajú; bonus stále padá po 10 zostreloch.
- Efekty a aktualizácie obrazovky zaťažujú zariadenie menej.
- Obrázky sú menšie, hudba je stereo AAC-LC vo formáte .m4a.

Google ukladanie používa existujúce nastavenie. Úprava stránky nemaže
Google rebríček ani lokálne rekordy v prehliadači. Pri výpadku spojenia
ostáva lokálna záloha a fronta neodoslaných výsledkov.
Priamy test na fyzickom iPhone ani publikovanie repozitára nie sú súčasťou
prípravy tohto ZIP-u.
