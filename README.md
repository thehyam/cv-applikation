# cv-applikation
Denna applikation konsumerar ett API som gör det möjligt att ha ett dynamiskt cv. Denna applikation är ett Gulp Projekt. 

## Publicerat
Det färdiga projektet är publicerat här: 
http://studenter.miun.se/~emha1904/DT173-webbutveckling-III/projekt-final/pub/index.html

## Buggar
OBS! Det blir ett syntax fel i main.js längst ner. Där Sorcemap blir okommenterat, denna måste ändras för att applikationen ska fungera. Till det så ligger även app_records.js i pub mappen och är refererat till den mappen, då den har ett syntaxfel och läses ej ut ordentligt i main.js

## Gulp packages
Detta momement använder ett flertal stödpaket till Gulp (självklart är gulp också inkluderat). Detta är de paketen som används till mitt projekt:

### gulp
För att kunna automatisera arbetsprocessen inom projektet.

### Gulp htmlmin
Minifierar HTML-koden

### gulp-clean-css
För att minifiera min CSS, här försvinner b.la. kommentarer och onödigt mellanrum samt intednering.

### gulp-concat
Detta gulp paket används för att kunna konkatenera js-filer från mitt src projekt till min pub-mapp.

### gulp-concat-css
Detta gulp paket används för att kunna konkatenera css-filer från mitt src projekt till min pub-mapp.

### gulp-uglify-es
För att minifiera min js, här försvinner b.la. kommentarer och onödigt mellanrum samt intednering.

### browser-sync
Denna funktion tillåter användaren att köra en live preview

### Autoprefixers
Denna edition lägger eller tar bort vendor prefixes (eg.-webkit).

### gulp-imagemin
Denna funktion används för att komprimera bilder

### gulp-sourcemaps
Denna expansion används för att se vartifrån en ursprungsfil kommer ifrån.

### Gulp Sass
Används för att omvandla SCSS-kod till CSS-kod.

### Node Sass
Expansion för att Gulp Sass.

### Babel
Det här är en funktion för ecmascript, som ger stöd för javascript i olika webbläsare. Det är för ge en större användarbarhet.

## sytemet
I filen gulpfile.js så återfinns både konstanter och funktioner. Efter att alla dependencies har installerats så anges dessa som konstanta variabler i tidigare nämnd fil. Detta görs i en const-veriabel, där jag kräver de installerade dependencies. Speciellt för detta är gulp dependencies, där jag även skickar med argument (src, dest, watch, series, parallel ) som tillåter mig att bla skicka de jag skapar i src mappen till en pub-mapp, detta görs automatiskt och parallelt under en seriell-funktion.

Utöver dessa konstanter så finns då funktionerna. Främst är detta en sökfunktion som anger vilken typ av filer det är (t.ex. html eller css osv). Sedan finns funktioner som kopierar de filer som skapas i src-mappen och sedan kopieras över till pub. Till JS och CSS-filerna finns det ytterligare funktioner som konkatierar och miniferierar filerna.

Sedan så sätts en watcher som 'lyssnar' på ifall det sker en förändring i någon utav filerna som angavs i searchpaths (sökvägen).

Sluligen sätts en default task som är en serie som då kör alla de angivna funktionerna parallellt (kopierar över filerna med eventuella förändringar från src-mappen till pub-mappen)

## Klona detta projekt
För att klona detta projekt så används kommandot: $ git clone https://github.com/thehyam/cv-applikation
