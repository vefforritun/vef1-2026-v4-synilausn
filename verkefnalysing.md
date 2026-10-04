# Vefforritun 1, 2026: Verkefni 4, Spurningaleikur

Útgáfa 0.1.

## Markmið

- Setja upp JavaScript forrit sem tengist HTML og CSS.
- Vinna með fylki (e. arrays) og hluti (e. objects).
- Nota lykkjur og/eða fylkjaaðferðir til að vinna með gögn.
- Skipta JavaScript forriti upp í einingar (ES modules).
- Forrita á móti DOM, _Document Object Model_, og nota atburði (events).
- Setja upp `eslint`.

## Lýsing

Útfæra skal einfaldan spurningaleik í vafra. Notandi fær fjórar spurningar (valdar af handahófi úr safni spurninga) svarar þeim einni í einu og fær að lokum yfirlit yfir svör sín og rétt svör.

Spurningar eru gefnar sem fylki af hlutum í `src/lib/questions.js`, þær eru fengnar úr [is-trivia-questions](https://github.com/sveinn-steinarsson/is-trivia-questions). Ykkur er frjálst að búa til ykkar eigin spurningar svo lengi sem þær eru formaðar eins.

Hver spurning er hlutur með:

- `category`, flokkur spurningar, t.d. `Tónlist`.
- `question`, spurningin sjálf.
- `answer`, rétt svar.

## Virkni

1. Þegar síða er opnuð er sýnd fyrirsögnin „Spurningaleikur!“, tölfræði og takki með textanum „Byrja“.
2. Tölfræði sýnir:
   - Fjöldi spilaðra leikja: X
   - Fjöldi réttra svara: Y
   - Fjöldi rangra svara: Z
   - Þar sem `X`, `Y` og `Z` eru tölur sem uppfærast eftir því sem leikir eru spilaðir og settar rétt inn í viðmót á hverjum tímapunkti.
3. Þegar ýtt er á „Byrja“ eru fjórar spurningar valdar af handahófi, engin spurning má koma oftar en einu sinni í sama leik. Aðeins fyrsta spurningin er sýnd ásamt flokki hennar og stöðu, t.d. „Spurning 1 af 4“.
4. Notandi slær svar inn í textareit.
5. Þegar ýtt er á „Næsta“ (eða `Enter`) er svarið geymt í minni, textareitur tæmdur og næsta spurning sýnd ef ekki seinasta spurning.
6. Þegar öllum spurningum hefur verið svarað er lokaskjár sýndur.
7. Lokaskjár sýnir „Rétt svör: X af 4“ og síðan hverja spurningu í þeirri röð sem hún var spurð, svar notanda og rétt svar. Ef notandi svaraði engu skal sýna „Ekkert svar“. Rétt og röng svör eru merkt sérstaklega.
8. Á lokaskjá er takki „Spila aftur“ sem fer aftur á upphafsskjá með uppfærðri tölfræði.

Svar telst rétt ef það er eins og rétta svarið þegar bil í byrjun og enda eru hunsuð og ekki er gerður greinarmunur á há- og lágstöfum, t.d. er `" rammstein "` rétt svar við `"Rammstein"`.

Tölfræði þarf aðeins að geyma á meðan síðan er opin, hún ætti að núllstillast þegar síða er opnuð aftur eða endurhlaðin.

## Grunnur

Gefinn er grunnur:

- Inni í `src` möppu eru:
  - `index.html` með allri HTML uppsetningu, skjáirnir þrír eru `section` element með klösunum `start`, `question` og `results`.
  - `styles.css` með öllu útliti úr sýnilausn.
  - `scripts.js` með stöðu leiks og grunn að flæði.
  - `lib/questions.js` með spurningum sem fylki af hlutum.
  - `lib/quiz.js` með grunn og skjölun fyrir leikinn.
  - `lib/ui.js` með grunn og skjölun fyrir viðmót.
  - `lib/elements.js` með hjálparföllum sem má nota.
- `.gitignore` skrá sem hunsar viðeigandi skrár og möppur.
- `package.json` skrá með NPM scripts og dependency á Parcel.

Ekki þarf að breyta neinu í `index.html` eða `styles.css`. Í `index.html` eru athugasemdir um hvernig sjá má alla skjái.

Skjölun notar [`jsdoc`](https://jsdoc.app/).

### Uppsetning á grunn

Til að byrja að vinna verkefnið er hægt að sækja það frá GitHub:

```bash
# Inni í möppu sem á að geyma verkefnið
git clone https://github.com/vefforritun/vef1-2026-v4.git
# eða ef ssh uppsett
git clone git@github.com:vefforritun/vef1-2026-v4.git

# Förum inn í möppu
cd vef1-2026-v4

# Sækjum öll dependency með NPM
npm install

# Keyrum NPM script fyrir development
npm run dev
```

Áður en skilað er þarf að breyta remote í þitt eigið repo:

```bash
git remote remove origin
git remote add origin <slóð á þitt GitHub repo>
```

## Takmarkanir

Ekki skal nota `innerHTML`, búa skal til element með `document.createElement` (eða `el` hjálparfallinu) og setja texta með `textContent`.

Aðskiljið virkni leiks frá viðmóti í `lib/quiz.js` og `lib/ui.js`, sjá athugasemdir í skjölum.

Skipta skal forritinu upp í einingar, ES modules, með því að nota `export` og `import`. Í gefnum grunn eru notaðar einingar en bæta þarf við svo að virki rétt.

## eslint

Setja skal upp [eslint](https://eslint.org/) með `npm init @eslint/config@latest` og bæta við `lint` script í `package.json` sem keyrir eslint á `src` möppu:

```text
"lint": "eslint src"
```

Þegar skipunin `npm run lint` er keyrð eiga **engar villur** að koma fram.

## GitHub og Netlify uppsetning

Setja skal verkefnið upp á GitHub og skila með slóð á repo.

Tengja skal GitHub við Netlify þannig að hver breyting í GitHub keyri inn nýja útgáfu á Netlify.

Gefið er `.gitignore` skjal sem verður að nota, við viljum ekki að þær skrár og möppur sem eru tilgreindar þar fari inn á GitHub.

## Mat

- 10% — Verkefni er skipt upp í einingar (modules).
  - 3% — Föll útfærð í modules
  - 3% — import / export sett upp og notað
  - 4% — Viðmót og lógík aðskilin (ui.js og quiz.js).
- 10% — Uppsetning á virkni í main.js
  - 5% — Rétt byrjunarstaða á stöðu sett
  - 5% — Takkar og form fundið og tengt
- 10% — Forsíða, staða birt og takki til að byrja leik
  - 6% — Staða birt
  - 4% — Takki til að byrja leik tengdur og virkar
- 30% — Spurningaskjár og skipt á milli spurninga
  - 5% — Spurningar valdar af handahófi úr safni spurninga
  - 10% — Spurning birt með númeri, flokk og svarformi
  - 10% — Hnappur til að svara, svar geymt og næsta spurning birt
  - 5% — Hætt að birta spurningar þegar búið að svara öllum
- 20% — Lokaskjár með niðurstöðum
  - 5% — Niðurstöður birtar rétt og tölfræði uppfærð
  - 10% — Hver spurning sýnd með flokk, spurningu, réttu svari og svari notanda
  - 5% — Takki til að fara aftur á forsíðu
- 10% — eslint uppsett og engar villur
  - 2% — eslint uppsett
  - 8% — Engar eslint villur, draga niður 0,5-1 per villu, samt fer eftir fjölda
- 10% — Verkefni sett upp GitHub og á Netlify
  - 5% — Sett á GitHub
  - 5% — Sett á Netlify

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 5. október 2026.

## Skil

Skila skal í Canvas, seinasta lagi fyrir lok dags fimmtudaginn 22. október 2026.

Skilaboð skulu innihalda bæði:

- Slóð á GitHub repo fyrir verkefnið. Dæmatímakennurum skal hafa verið boðið í repo, notendanöfn þeirra eru:
  - `AsdisVal`
  - `kristinfrida`
  - `osk`
- Slóð á verkefni keyrandi á Netlify, sett sem athugasemd við skil á Canvas.

Athugið að það er **ekki nóg** að eingöngu setja athugasemd, skila þarf verkefni sérstaklega. Verkefnum sem ekki er skilað fá ekki einkunn.

## Aðstoð

Leyfilegt er að ræða, og vinna saman að verkefni en **skrifið ykkar eigin lausn**. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.

Ekki er heimilt að nota stór mállíkön til að vinna verkefni í námskeiðinu, [sjá nánar um notkun](https://github.com/vefforritun/vef1-2026/blob/main/mallikon.md).

## Verkefni og einkunn

Sett verða fyrir fimm minni verkefni sem gilda 3% hvert, samtals 15% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 5%, samtals 10% af lokaeinkunn.

---

Nýjustu útgáfu af verkefni má [nálgast á GitHub](https://github.com/vefforritun/vef1-2026-v4).

## Útgáfusaga

| Útgáfa | Lýsing        |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
