/* Cattivissimo Impostor — word bank
   Ogni categoria contiene "gruppi": ogni gruppo raccoglie parole logicamente affini.
   La parola dei giocatori e quella degli impostori vengono pescate dallo stesso gruppo,
   così l'impostore riceve sempre un termine coerente col contesto (Leone / Tigre).

   Un elemento è:
     - una stringa      -> uguale in tutte le lingue (nomi propri)
     - un array [it,en,fr,es] -> tradotto
   L'ordine delle lingue è sempre: it, en, fr, es. */

var LANGS = ['it', 'en', 'fr', 'es'];

var WORDBANK = {

  /* ================= CALCIO ================= */
  football: {
    base: [
      ['Juventus', 'Inter', 'Milan', 'Napoli', 'Roma', 'Lazio', 'Atalanta', 'Fiorentina'],
      ['Real Madrid', ['Barcellona', 'Barcelona', 'Barcelone', 'Barcelona'], 'Atlético Madrid',
       ['Siviglia', 'Sevilla', 'Séville', 'Sevilla'], 'Valencia', 'Villarreal', 'Athletic Bilbao', 'Real Sociedad'],
      ['Manchester United', 'Manchester City', 'Liverpool', 'Chelsea', 'Arsenal', 'Tottenham', 'Newcastle', 'Aston Villa'],
      [['Bayern Monaco', 'Bayern Munich', 'Bayern Munich', 'Bayern Múnich'], 'Borussia Dortmund',
       ['RB Lipsia', 'RB Leipzig', 'RB Leipzig', 'RB Leipzig'], 'Bayer Leverkusen', 'Schalke 04', 'Wolfsburg',
       ['Eintracht Francoforte', 'Eintracht Frankfurt', 'Eintracht Francfort', 'Eintracht Fráncfort'],
       ['Werder Brema', 'Werder Bremen', 'Werder Brême', 'Werder Bremen']],
      ['Paris Saint-Germain', ['Marsiglia', 'Marseille', 'Marseille', 'Marsella'],
       ['Lione', 'Lyon', 'Lyon', 'Lyon'], 'Monaco', ['Lilla', 'Lille', 'Lille', 'Lille'],
       ['Nizza', 'Nice', 'Nice', 'Niza'], 'Rennes', 'Saint-Étienne'],
      ['Ajax', 'PSV Eindhoven', 'Feyenoord', 'AZ Alkmaar', 'Twente', 'Utrecht', 'Vitesse', 'Heerenveen'],
      ['Gianluigi Buffon', 'Iker Casillas', 'Manuel Neuer', 'David De Gea', 'Thibaut Courtois',
       'Marc-André ter Stegen', 'Alisson Becker', 'Ederson', 'Jan Oblak', 'Petr Čech', 'Edwin van der Sar', 'Keylor Navas'],
      ['Sergio Ramos', 'Gerard Piqué', 'Giorgio Chiellini', 'Leonardo Bonucci', 'Virgil van Dijk',
       'Nemanja Vidić', 'Rio Ferdinand', 'Thiago Silva', 'Marcelo', 'Dani Alves', 'Philipp Lahm',
       'Mats Hummels', 'Jérôme Boateng', 'Vincent Kompany', 'Carles Puyol', 'Maicon'],
      ['Xavi', 'Andrés Iniesta', 'Andrea Pirlo', 'Luka Modrić', 'Toni Kroos', 'Sergio Busquets',
       'Kevin De Bruyne', 'Steven Gerrard', 'Frank Lampard', 'Paul Scholes', 'Paul Pogba',
       "N'Golo Kanté", 'Marco Verratti', 'Xabi Alonso', 'Ivan Rakitić', 'Jude Bellingham'],
      ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Kylian Mbappé', 'Erling Haaland',
       'Robert Lewandowski', 'Karim Benzema', 'Luis Suárez', 'Zlatan Ibrahimović', 'Sergio Agüero',
       'Didier Drogba', 'Thierry Henry', 'Wayne Rooney', "Samuel Eto'o", 'Mohamed Salah', 'Harry Kane'],
      ['Diego Armando Maradona', 'Pelé', 'Johan Cruyff', 'Franz Beckenbauer', 'Marco van Basten',
       'Ronaldo', 'Ronaldinho', 'Zinédine Zidane', 'Luís Figo', 'Kaká', 'Andriy Shevchenko',
       'Pavel Nedvěd', 'Rivaldo', 'Romário', 'Michel Platini', 'George Best'],
      ['Pep Guardiola', 'José Mourinho', 'Carlo Ancelotti', 'Alex Ferguson', 'Jürgen Klopp',
       'Diego Simeone', 'Antonio Conte', 'Arrigo Sacchi', 'Arsène Wenger', 'Fabio Capello',
       'Marcello Lippi', 'Johan Cruyff']
    ],
    it: [
      ['Torino', 'Genoa', 'Sampdoria', 'Udinese', 'Bologna', 'Cagliari', 'Sassuolo', 'Verona',
       'Empoli', 'Lecce', 'Parma', 'Monza', 'Como', 'Venezia', 'Palermo', 'Brescia'],
      ['Ciro Immobile', 'Mauro Icardi', 'Gonzalo Higuaín', 'Luca Toni', 'Zlatan Ibrahimović',
       'Edinson Cavani', 'Antonio Di Natale', 'David Trezeguet', 'Francesco Totti', 'Victor Osimhen',
       'Lautaro Martínez', 'Fabio Quagliarella', 'Cristiano Ronaldo'],
      ['Franco Baresi', 'Dino Zoff', 'Paolo Rossi', 'Gigi Riva', 'Giacinto Facchetti', 'Roberto Baggio',
       'Alessandro Del Piero', 'Paolo Maldini', 'Fabio Cannavaro', 'Alessandro Nesta', 'Christian Vieri',
       'Filippo Inzaghi', 'Gennaro Gattuso', 'Daniele De Rossi', 'Marco Tardelli', 'Gianluca Vialli'],
      ['Gianluigi Donnarumma', 'Nicolò Barella', 'Jorginho', 'Federico Chiesa', 'Lorenzo Insigne',
       'Alessandro Bastoni', 'Manuel Locatelli', 'Domenico Berardi', 'Gianluca Scamacca',
       'Giacomo Raspadori', 'Federico Dimarco', 'Sandro Tonali']
    ],
    en: [
      ['Everton', 'West Ham', 'Leicester City', 'Leeds United', 'Southampton', 'Crystal Palace',
       'Wolverhampton', 'Brighton', 'Fulham', 'Nottingham Forest', 'Brentford', 'Bournemouth'],
      ['Thierry Henry', 'Ruud van Nistelrooy', 'Didier Drogba', 'Cristiano Ronaldo', 'Robin van Persie',
       'Luis Suárez', 'Sergio Agüero', 'Harry Kane', 'Mohamed Salah', 'Jamie Vardy',
       'Pierre-Emerick Aubameyang', 'Sadio Mané', 'Son Heung-min', 'Erling Haaland'],
      ['David Beckham', 'Alan Shearer', 'Michael Owen', 'Wayne Rooney', 'John Terry', 'Ashley Cole',
       'Frank Lampard', 'Steven Gerrard', 'Paul Scholes', 'Rio Ferdinand', 'Gary Neville',
       'Bobby Charlton', 'Gary Lineker', 'Peter Shilton'],
      ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka', 'Phil Foden', 'Declan Rice', 'Jordan Pickford',
       'Kyle Walker', 'Marcus Rashford', 'Cole Palmer', 'John Stones', 'Trent Alexander-Arnold', 'Jack Grealish']
    ],
    fr: [
      ['Nantes', 'Bordeaux', 'Montpellier', 'Strasbourg', 'Toulouse', 'Lens', 'Reims', 'Brest',
       'Angers', 'Auxerre', 'Le Havre', 'Metz'],
      ['Zlatan Ibrahimović', 'Edinson Cavani', 'Kylian Mbappé', 'Wissam Ben Yedder', 'Alexandre Lacazette',
       'Radamel Falcao', 'Bafétimbi Gomis', 'André-Pierre Gignac', 'Nenê', 'Pierre-Emerick Aubameyang'],
      ['Michel Platini', 'Zinédine Zidane', 'Thierry Henry', 'David Trezeguet', 'Didier Deschamps',
       'Laurent Blanc', 'Fabien Barthez', 'Patrick Vieira', 'Claude Makélélé', 'Jean-Pierre Papin',
       'Éric Cantona', 'Marcel Desailly', 'Lilian Thuram', 'Just Fontaine'],
      ['Kylian Mbappé', 'Antoine Griezmann', "N'Golo Kanté", 'Paul Pogba', 'Hugo Lloris', 'Olivier Giroud',
       'Raphaël Varane', 'Theo Hernández', 'Aurélien Tchouaméni', 'Eduardo Camavinga',
       'Ousmane Dembélé', 'Mike Maignan']
    ],
    es: [
      ['Real Betis', 'Celta de Vigo', 'Espanyol', 'Getafe', 'Osasuna', 'Rayo Vallecano', 'Mallorca',
       'Granada', 'Levante', 'Deportivo La Coruña', 'Alavés', 'Girona'],
      ['Lionel Messi', 'Cristiano Ronaldo', 'Luis Suárez', 'Karim Benzema', 'Diego Forlán', 'David Villa',
       'Radamel Falcao', 'Robert Lewandowski', 'Antoine Griezmann', 'Iago Aspas', 'Raúl', 'Samuel Etoo'],
      ['Raúl', 'Iker Casillas', 'Xavi', 'Andrés Iniesta', 'Fernando Torres', 'David Villa',
       'Emilio Butragueño', 'Fernando Hierro', 'Pep Guardiola', 'Sergio Busquets', 'Carles Puyol', 'Míchel'],
      ['Rodri', 'Pedri', 'Gavi', 'Lamine Yamal', 'Nico Williams', 'Álvaro Morata', 'Unai Simón',
       'Dani Carvajal', 'Fabián Ruiz', 'Ferran Torres', 'Dani Olmo', 'Mikel Merino']
    ]
  },

  /* ================= CITTÀ ================= */
  cities: {
    base: [
      [['Roma', 'Rome', 'Rome', 'Roma'], ['Parigi', 'Paris', 'Paris', 'París'], 'Madrid',
       ['Londra', 'London', 'Londres', 'Londres'], ['Berlino', 'Berlin', 'Berlin', 'Berlín'],
       ['Lisbona', 'Lisbon', 'Lisbonne', 'Lisboa'], ['Vienna', 'Vienna', 'Vienne', 'Viena'],
       'Amsterdam', ['Bruxelles', 'Brussels', 'Bruxelles', 'Bruselas'],
       ['Dublino', 'Dublin', 'Dublin', 'Dublín'], ['Berna', 'Bern', 'Berne', 'Berna'],
       ['Lussemburgo', 'Luxembourg', 'Luxembourg', 'Luxemburgo']],
      [['Stoccolma', 'Stockholm', 'Stockholm', 'Estocolmo'], 'Oslo',
       ['Copenaghen', 'Copenhagen', 'Copenhague', 'Copenhague'], 'Helsinki',
       ['Reykjavík', 'Reykjavík', 'Reykjavík', 'Reikiavik'], 'Tallinn', 'Riga',
       ['Vilnius', 'Vilnius', 'Vilnius', 'Vilna']],
      [['Varsavia', 'Warsaw', 'Varsovie', 'Varsovia'], ['Praga', 'Prague', 'Prague', 'Praga'],
       ['Budapest', 'Budapest', 'Budapest', 'Budapest'], ['Bucarest', 'Bucharest', 'Bucarest', 'Bucarest'],
       ['Sofia', 'Sofia', 'Sofia', 'Sofía'], ['Bratislava', 'Bratislava', 'Bratislava', 'Bratislava'],
       ['Lubiana', 'Ljubljana', 'Ljubljana', 'Liubliana'], ['Zagabria', 'Zagreb', 'Zagreb', 'Zagreb'],
       ['Belgrado', 'Belgrade', 'Belgrade', 'Belgrado'], ['Kiev', 'Kyiv', 'Kiev', 'Kiev'],
       ['Mosca', 'Moscow', 'Moscou', 'Moscú'], ['Atene', 'Athens', 'Athènes', 'Atenas'],
       ['Tirana', 'Tirana', 'Tirana', 'Tirana'], ['Sarajevo', 'Sarajevo', 'Sarajevo', 'Sarajevo']],
      [['Tokyo', 'Tokyo', 'Tokyo', 'Tokio'], ['Pechino', 'Beijing', 'Pékin', 'Pekín'],
       ['Nuova Delhi', 'New Delhi', 'New Delhi', 'Nueva Delhi'], ['Seul', 'Seoul', 'Séoul', 'Seúl'],
       'Bangkok', ['Hanoi', 'Hanoi', 'Hanoï', 'Hanói'], 'Jakarta', 'Kuala Lumpur', 'Manila',
       'Islamabad', ['Singapore', 'Singapore', 'Singapour', 'Singapur'],
       ['Riad', 'Riyadh', 'Riyad', 'Riad'], ['Abu Dhabi', 'Abu Dhabi', 'Abu Dhabi', 'Abu Dabi'],
       'Doha', 'Ankara'],
      [['Washington', 'Washington', 'Washington', 'Washington'], 'Ottawa',
       ['Città del Messico', 'Mexico City', 'Mexico', 'Ciudad de México'],
       ['Brasilia', 'Brasília', 'Brasilia', 'Brasilia'], 'Buenos Aires',
       ['Santiago del Cile', 'Santiago', 'Santiago du Chili', 'Santiago de Chile'], 'Lima',
       ['Bogotà', 'Bogotá', 'Bogota', 'Bogotá'], 'Montevideo',
       ["L'Avana", 'Havana', 'La Havane', 'La Habana'], 'Caracas', 'Quito'],
      [['Il Cairo', 'Cairo', 'Le Caire', 'El Cairo'], ['Rabat', 'Rabat', 'Rabat', 'Rabat'],
       ['Tunisi', 'Tunis', 'Tunis', 'Túnez'], ['Algeri', 'Algiers', 'Alger', 'Argel'], 'Nairobi',
       ['Pretoria', 'Pretoria', 'Pretoria', 'Pretoria'], 'Abuja',
       ['Addis Abeba', 'Addis Ababa', 'Addis-Abeba', 'Adís Abeba'], 'Accra',
       ['Canberra', 'Canberra', 'Canberra', 'Canberra'], 'Wellington'],
      ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami', 'Toronto',
       ['Shanghai', 'Shanghai', 'Shanghai', 'Shanghái'], 'Hong Kong',
       ['Mumbai', 'Mumbai', 'Bombay', 'Bombay'], ['San Paolo', 'São Paulo', 'São Paulo', 'São Paulo'],
       'Rio de Janeiro', ['Sydney', 'Sydney', 'Sydney', 'Sídney'], 'Melbourne',
       ['Dubai', 'Dubai', 'Dubaï', 'Dubái'], ['Istanbul', 'Istanbul', 'Istanbul', 'Estambul'], 'Osaka']
    ],
    it: [
      [['Torino', 'Turin', 'Turin', 'Turín'], ['Milano', 'Milan', 'Milan', 'Milán'],
       ['Genova', 'Genoa', 'Gênes', 'Génova'], 'Aosta', 'Novara', 'Alessandria', 'Asti', 'Cuneo',
       'Varese', 'Como', 'Bergamo', 'Brescia', 'Pavia', 'Monza', 'Savona', 'La Spezia', 'Imperia'],
      [['Venezia', 'Venice', 'Venise', 'Venecia'], ['Verona', 'Verona', 'Vérone', 'Verona'],
       ['Padova', 'Padua', 'Padoue', 'Padua'], 'Vicenza', 'Treviso',
       ['Trieste', 'Trieste', 'Trieste', 'Trieste'], 'Trento', 'Bolzano', 'Udine', 'Belluno',
       'Rovigo', 'Pordenone', 'Gorizia'],
      [['Bologna', 'Bologna', 'Bologne', 'Bolonia'], ['Firenze', 'Florence', 'Florence', 'Florencia'],
       'Modena', 'Parma', 'Reggio Emilia', 'Ferrara', 'Ravenna', 'Rimini', 'Forlì', 'Piacenza',
       ['Pisa', 'Pisa', 'Pise', 'Pisa'], 'Livorno', ['Siena', 'Siena', 'Sienne', 'Siena'], 'Lucca',
       'Arezzo', 'Prato', ['Perugia', 'Perugia', 'Pérouse', 'Perugia'], 'Ancona', 'Pesaro'],
      [['Napoli', 'Naples', 'Naples', 'Nápoles'], ['Bari', 'Bari', 'Bari', 'Bari'],
       ['Palermo', 'Palermo', 'Palerme', 'Palermo'], ['Catania', 'Catania', 'Catane', 'Catania'],
       ['Messina', 'Messina', 'Messine', 'Mesina'], 'Salerno', 'Taranto', 'Lecce', 'Reggio Calabria',
       'Cosenza', 'Foggia', ['Cagliari', 'Cagliari', 'Cagliari', 'Cagliari'], 'Sassari',
       ['Siracusa', 'Syracuse', 'Syracuse', 'Siracusa'], 'Trapani', 'Agrigento', 'Caserta',
       'Potenza', 'Matera', 'Pescara', "L'Aquila", 'Campobasso', 'Catanzaro', 'Brindisi']
    ],
    en: [
      ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds', 'Sheffield', 'Newcastle',
       'Nottingham', 'Leicester', 'Southampton', 'Brighton', 'Bristol', 'Coventry', 'Norwich', 'Plymouth'],
      ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Cardiff', 'Swansea', 'Belfast', 'Inverness'],
      ['Oxford', 'Cambridge', 'York', 'Bath', 'Canterbury', 'Durham', 'Winchester', 'Salisbury', 'Chester']
    ],
    fr: [
      ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg',
       'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Toulon', 'Grenoble', 'Le Havre'],
      ['Dijon', 'Angers', 'Nîmes', 'Clermont-Ferrand', 'Aix-en-Provence', 'Brest', 'Limoges',
       'Tours', 'Amiens', 'Perpignan', 'Metz', 'Besançon', 'Orléans', 'Rouen', 'Caen', 'Nancy'],
      ['Avignon', 'Ajaccio', 'Bastia', 'Biarritz', 'Annecy', 'Chambéry', 'La Rochelle', 'Deauville',
       'Colmar', 'Carcassonne']
    ],
    es: [
      ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Bilbao',
       'Alicante', 'Valladolid', 'Vigo', 'Granada', 'Córdoba', 'Gijón'],
      ['Salamanca', 'Santander', 'Pamplona', 'Toledo', 'Cádiz', 'San Sebastián', 'Burgos', 'León',
       'Oviedo', 'Santiago de Compostela', 'Segovia', 'Ávila', 'Cuenca', 'Logroño'],
      ['Palma de Mallorca', 'Las Palmas', 'Santa Cruz de Tenerife', 'Ibiza', 'Marbella', 'Benidorm',
       'Tarragona', 'Girona', 'Lleida', 'Huelva', 'Almería', 'Jaén']
    ]
  },

  /* ================= ANIMALI ================= */
  animals: {
    base: [
      [['Leone', 'Lion', 'Lion', 'León'], ['Tigre', 'Tiger', 'Tigre', 'Tigre'],
       ['Leopardo', 'Leopard', 'Léopard', 'Leopardo'], ['Ghepardo', 'Cheetah', 'Guépard', 'Guepardo'],
       ['Giaguaro', 'Jaguar', 'Jaguar', 'Jaguar'], ['Lince', 'Lynx', 'Lynx', 'Lince'],
       ['Puma', 'Puma', 'Puma', 'Puma'], ['Gatto', 'Cat', 'Chat', 'Gato']],
      [['Cane', 'Dog', 'Chien', 'Perro'], ['Lupo', 'Wolf', 'Loup', 'Lobo'],
       ['Volpe', 'Fox', 'Renard', 'Zorro'], ['Sciacallo', 'Jackal', 'Chacal', 'Chacal'],
       ['Coyote', 'Coyote', 'Coyote', 'Coyote'], ['Iena', 'Hyena', 'Hyène', 'Hiena'],
       ['Dingo', 'Dingo', 'Dingo', 'Dingo']],
      [['Mucca', 'Cow', 'Vache', 'Vaca'], ['Maiale', 'Pig', 'Cochon', 'Cerdo'],
       ['Pecora', 'Sheep', 'Mouton', 'Oveja'], ['Capra', 'Goat', 'Chèvre', 'Cabra'],
       ['Cavallo', 'Horse', 'Cheval', 'Caballo'], ['Asino', 'Donkey', 'Âne', 'Burro'],
       ['Gallina', 'Hen', 'Poule', 'Gallina'], ['Coniglio', 'Rabbit', 'Lapin', 'Conejo'],
       ['Oca', 'Goose', 'Oie', 'Ganso'], ['Anatra', 'Duck', 'Canard', 'Pato'],
       ['Tacchino', 'Turkey', 'Dinde', 'Pavo']],
      [['Elefante', 'Elephant', 'Éléphant', 'Elefante'], ['Giraffa', 'Giraffe', 'Girafe', 'Jirafa'],
       ['Zebra', 'Zebra', 'Zèbre', 'Cebra'], ['Rinoceronte', 'Rhinoceros', 'Rhinocéros', 'Rinoceronte'],
       ['Ippopotamo', 'Hippopotamus', 'Hippopotame', 'Hipopótamo'], ['Gnu', 'Wildebeest', 'Gnou', 'Ñu'],
       ['Antilope', 'Antelope', 'Antilope', 'Antílope'], ['Struzzo', 'Ostrich', 'Autruche', 'Avestruz'],
       ['Facocero', 'Warthog', 'Phacochère', 'Facóquero']],
      [['Aquila', 'Eagle', 'Aigle', 'Águila'], ['Gufo', 'Owl', 'Hibou', 'Búho'],
       ['Pappagallo', 'Parrot', 'Perroquet', 'Loro'], ['Pinguino', 'Penguin', 'Manchot', 'Pingüino'],
       ['Cigno', 'Swan', 'Cygne', 'Cisne'], ['Colomba', 'Dove', 'Colombe', 'Paloma'],
       ['Corvo', 'Crow', 'Corbeau', 'Cuervo'], ['Fenicottero', 'Flamingo', 'Flamant rose', 'Flamenco'],
       ['Tucano', 'Toucan', 'Toucan', 'Tucán'], ['Pellicano', 'Pelican', 'Pélican', 'Pelícano'],
       ['Rondine', 'Swallow', 'Hirondelle', 'Golondrina'], ['Falco', 'Hawk', 'Faucon', 'Halcón']],
      [['Squalo', 'Shark', 'Requin', 'Tiburón'], ['Delfino', 'Dolphin', 'Dauphin', 'Delfín'],
       ['Balena', 'Whale', 'Baleine', 'Ballena'], ['Polpo', 'Octopus', 'Pieuvre', 'Pulpo'],
       ['Granchio', 'Crab', 'Crabe', 'Cangrejo'], ['Medusa', 'Jellyfish', 'Méduse', 'Medusa'],
       ['Tartaruga', 'Turtle', 'Tortue', 'Tortuga'], ['Foca', 'Seal', 'Phoque', 'Foca'],
       ['Orca', 'Orca', 'Orque', 'Orca'], ['Salmone', 'Salmon', 'Saumon', 'Salmón'],
       ['Stella marina', 'Starfish', 'Étoile de mer', 'Estrella de mar'],
       ['Cavalluccio marino', 'Seahorse', 'Hippocampe', 'Caballito de mar']],
      [['Serpente', 'Snake', 'Serpent', 'Serpiente'], ['Coccodrillo', 'Crocodile', 'Crocodile', 'Cocodrilo'],
       ['Lucertola', 'Lizard', 'Lézard', 'Lagarto'], ['Camaleonte', 'Chameleon', 'Caméléon', 'Camaleón'],
       ['Rana', 'Frog', 'Grenouille', 'Rana'], ['Iguana', 'Iguana', 'Iguane', 'Iguana'],
       ['Cobra', 'Cobra', 'Cobra', 'Cobra'], ['Pitone', 'Python', 'Python', 'Pitón'],
       ['Rospo', 'Toad', 'Crapaud', 'Sapo'], ['Alligatore', 'Alligator', 'Alligator', 'Caimán']],
      [['Ape', 'Bee', 'Abeille', 'Abeja'], ['Formica', 'Ant', 'Fourmi', 'Hormiga'],
       ['Farfalla', 'Butterfly', 'Papillon', 'Mariposa'], ['Ragno', 'Spider', 'Araignée', 'Araña'],
       ['Zanzara', 'Mosquito', 'Moustique', 'Mosquito'], ['Scarabeo', 'Beetle', 'Scarabée', 'Escarabajo'],
       ['Libellula', 'Dragonfly', 'Libellule', 'Libélula'],
       ['Cavalletta', 'Grasshopper', 'Sauterelle', 'Saltamontes'],
       ['Coccinella', 'Ladybug', 'Coccinelle', 'Mariquita'], ['Vespa', 'Wasp', 'Guêpe', 'Avispa'],
       ['Scorpione', 'Scorpion', 'Scorpion', 'Escorpión'], ['Mosca', 'Fly', 'Mouche', 'Mosca']],
      [['Orso', 'Bear', 'Ours', 'Oso'], ['Cervo', 'Deer', 'Cerf', 'Ciervo'],
       ['Cinghiale', 'Wild boar', 'Sanglier', 'Jabalí'], ['Scoiattolo', 'Squirrel', 'Écureuil', 'Ardilla'],
       ['Riccio', 'Hedgehog', 'Hérisson', 'Erizo'], ['Tasso', 'Badger', 'Blaireau', 'Tejón'],
       ['Castoro', 'Beaver', 'Castor', 'Castor'], ['Lontra', 'Otter', 'Loutre', 'Nutria'],
       ['Alce', 'Moose', 'Élan', 'Alce'], ['Lepre', 'Hare', 'Lièvre', 'Liebre'],
       ['Talpa', 'Mole', 'Taupe', 'Topo'], ['Stambecco', 'Ibex', 'Bouquetin', 'Íbice']],
      [['Canguro', 'Kangaroo', 'Kangourou', 'Canguro'], ['Koala', 'Koala', 'Koala', 'Koala'],
       ['Panda', 'Panda', 'Panda', 'Panda'], ['Scimmia', 'Monkey', 'Singe', 'Mono'],
       ['Gorilla', 'Gorilla', 'Gorille', 'Gorila'], ['Orango', 'Orangutan', 'Orang-outan', 'Orangután'],
       ['Bradipo', 'Sloth', 'Paresseux', 'Perezoso'], ['Lama', 'Llama', 'Lama', 'Llama'],
       ['Cammello', 'Camel', 'Chameau', 'Camello'], ['Suricato', 'Meerkat', 'Suricate', 'Suricato'],
       ['Armadillo', 'Armadillo', 'Tatou', 'Armadillo'], ['Procione', 'Raccoon', 'Raton laveur', 'Mapache']],
      [['Topo', 'Mouse', 'Souris', 'Ratón'], ['Ratto', 'Rat', 'Rat', 'Rata'],
       ['Criceto', 'Hamster', 'Hamster', 'Hámster'], ['Cavia', 'Guinea pig', "Cochon d'Inde", 'Cobaya'],
       ['Marmotta', 'Marmot', 'Marmotte', 'Marmota'], ['Pipistrello', 'Bat', 'Chauve-souris', 'Murciélago'],
       ['Furetto', 'Ferret', 'Furet', 'Hurón']]
    ],
    it: [], en: [], fr: [], es: []
  },

  /* ================= SPORT ================= */
  sports: {
    base: [
      ['Michael Jordan', 'LeBron James', 'Kobe Bryant', 'Stephen Curry', "Shaquille O'Neal",
       'Tim Duncan', 'Kevin Durant', 'Dirk Nowitzki'],
      ['Michael Schumacher', 'Lewis Hamilton', 'Max Verstappen', 'Sebastian Vettel', 'Fernando Alonso',
       'Kimi Räikkönen', 'Ayrton Senna', 'Alain Prost', 'Jenson Button', 'Nico Rosberg',
       'Charles Leclerc', 'Daniel Ricciardo', 'Felipe Massa', 'Mark Webber', 'Carlos Sainz',
       'Lando Norris', 'George Russell'],
      ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Andy Murray', 'Serena Williams',
       'Maria Sharapova', 'Stan Wawrinka', 'Juan Martín del Potro', 'Carlos Alcaraz', 'Jannik Sinner',
       'Simona Halep', 'Naomi Osaka'],
      ['Michael Phelps', 'Usain Bolt', 'Katie Ledecky', 'Simone Biles', 'Caeleb Dressel',
       'Adam Peaty', 'Ian Thorpe', 'Mo Farah', 'Allyson Felix', 'Ryan Lochte',
       'Alexander Popov', 'Sun Yang'],
      ['Muhammad Ali', 'Mike Tyson', 'Floyd Mayweather', 'Manny Pacquiao', 'Conor McGregor',
       'Tyson Fury', 'Óscar De La Hoya']
    ],
    it: [
      ['Ivan Zaytsev', 'Simone Giannelli', 'Osmany Juantorena', 'Simone Anzani',
       'Alessandro Michieletto', 'Daniele Lavia', 'Paola Egonu', 'Miriam Sylla',
       'Andrea Lucchetta', 'Andrea Giani', 'Lorenzo Bernardi', 'Samuele Papi'],
      ['Valentino Rossi', 'Alberto Tomba', 'Federica Pellegrini', 'Gianmarco Tamberi',
       'Marcell Jacobs', 'Gregorio Paltrinieri', 'Jannik Sinner', 'Matteo Berrettini',
       'Valentina Vezzali', 'Sofia Goggia', 'Tania Cagnotto', 'Marco Pantani', 'Francesco Moser',
       'Deborah Compagnoni']
    ],
    en: [
      ['Andy Murray', 'Lewis Hamilton', 'Mo Farah', 'Jessica Ennis-Hill', 'Chris Hoy',
       'Bradley Wiggins', 'Adam Peaty', 'Daley Thompson', 'Anthony Joshua', 'Tom Daley',
       'Chris Froome', 'Steve Redgrave'],
      ['Ronnie O\u2019Sullivan', 'Phil Taylor', 'Ben Stokes', 'Joe Root', 'Owen Farrell',
       'Jonny Wilkinson', 'Martin Johnson', 'Katarina Johnson-Thompson']
    ],
    fr: [
      ['Earvin Ngapeth', 'Benjamin Toniutti', 'Antoine Brizard', 'Trévor Clévenot', 'Jean Patry',
       'Nicolas Le Goff', 'Barthélémy Chinenyeze'],
      ['Teddy Riner', 'Tony Parker', 'Renaud Lavillenie', 'Martin Fourcade', 'Marie-José Pérec',
       'Laure Manaudou', 'Alain Bernard', 'Amélie Mauresmo', 'Yannick Noah', 'Jeannie Longo',
       'Thierry Dusautoir', 'Léon Marchand']
    ],
    es: [
      ['Rafael Nadal', 'Pau Gasol', 'Marc Gasol', 'Fernando Alonso', 'Miguel Indurain',
       'Alberto Contador', 'Mireia Belmonte', 'Carolina Marín', 'Ruth Beitia', 'Ricky Rubio',
       'Juan Carlos Ferrero', 'Marc Márquez'],
      ['Jordi Alba', 'Guillermo Falasca', 'Rafael Pascual', 'Ibán Pérez', 'Manu Ginóbili',
       'Juan Carlos Navarro', 'Sergio Llull', 'José Manuel Calderón']
    ]
  }
};

/* Restituisce l'etichetta di un elemento nella lingua richiesta. */
function wordLabel(item, lang) {
  if (typeof item === 'string') return item;
  var i = LANGS.indexOf(lang);
  if (i < 0) i = 1;
  return item[i] || item[1] || item[0];
}

/* Pesca una coppia (parola giocatori, parola impostori) dallo stesso gruppo. */
function pickWordPair(category, nation) {
  var cat = WORDBANK[category] || WORDBANK.animals;
  var pool = (cat.base || []).concat(cat[nation] || []);
  pool = pool.filter(function (g) { return g && g.length >= 2; });
  var group = pool[Math.floor(Math.random() * pool.length)];
  var a = Math.floor(Math.random() * group.length);
  var b = Math.floor(Math.random() * (group.length - 1));
  if (b >= a) b++;
  return { main: group[a], decoy: group[b] };
}

if (typeof module !== 'undefined') module.exports = { WORDBANK: WORDBANK, pickWordPair: pickWordPair, wordLabel: wordLabel };
