/* Cattivissimo Impostor — vocabolario.

   COME FUNZIONA L'ACCOPPIAMENTO
   I gruppi sono volutamente STRETTI (non "animali della savana" ma "grandi
   erbivori africani") e volutamente SOVRAPPOSTI: la stessa parola compare in
   più gruppi. La parola dell'impostore viene pescata dall'unione dei gruppi
   che contengono la parola dei giocatori, quindi:
     - resta sempre pertinente, perché ogni gruppo è stretto;
     - cambia quasi ogni volta, perché i gruppi possibili sono tanti.
   Esempio: "Leone" sta fra i felini grandi e fra i predatori della savana,
   quindi il suo compagno può essere Tigre, Ghepardo, Leopardo, Iena, Puma,
   Giaguaro o Sciacallo — mai "Ippopotamo".

   FORMATO
     - stringa             -> uguale in tutte le lingue (nomi propri)
     - W(it, en, fr, es)   -> tradotto, sempre in quest'ordine */

var LANGS = ['it', 'en', 'fr', 'es'];

function W(it, en, fr, es) { return [it, en, fr, es]; }

var WORDBANK = {

  /* ============================== ANIMALI ============================== */
  animals: {
    base: [
      /* felini */
      [W('Leone','Lion','Lion','León'), W('Tigre','Tiger','Tigre','Tigre'), W('Leopardo','Leopard','Léopard','Leopardo'),
       W('Ghepardo','Cheetah','Guépard','Guepardo'), W('Giaguaro','Jaguar','Jaguar','Jaguar'), W('Puma','Cougar','Puma','Puma')],
      [W('Gatto','Cat','Chat','Gato'), W('Lince','Lynx','Lynx','Lince'), W('Puma','Cougar','Puma','Puma'),
       W('Ghepardo','Cheetah','Guépard','Guepardo')],
      /* canidi */
      [W('Cane','Dog','Chien','Perro'), W('Lupo','Wolf','Loup','Lobo'), W('Volpe','Fox','Renard','Zorro'),
       W('Sciacallo','Jackal','Chacal','Chacal'), W('Coyote','Coyote','Coyote','Coyote'), W('Dingo','Dingo','Dingo','Dingo')],
      /* fattoria */
      [W('Mucca','Cow','Vache','Vaca'), W('Maiale','Pig','Cochon','Cerdo'), W('Pecora','Sheep','Mouton','Oveja'),
       W('Capra','Goat','Chèvre','Cabra'), W('Cavallo','Horse','Cheval','Caballo'), W('Asino','Donkey','Âne','Burro')],
      [W('Gallina','Hen','Poule','Gallina'), W('Gallo','Rooster','Coq','Gallo'), W('Oca','Goose','Oie','Ganso'),
       W('Anatra','Duck','Canard','Pato'), W('Tacchino','Turkey','Dinde','Pavo')],
      /* animali di casa */
      [W('Cane','Dog','Chien','Perro'), W('Gatto','Cat','Chat','Gato'), W('Coniglio','Rabbit','Lapin','Conejo'),
       W('Criceto','Hamster','Hamster','Hámster'), W('Cavia','Guinea pig',"Cochon d'Inde",'Cobaya'),
       W('Furetto','Ferret','Furet','Hurón'), W('Pappagallo','Parrot','Perroquet','Loro')],
      /* savana, in insiemi stretti */
      [W('Elefante','Elephant','Éléphant','Elefante'), W('Rinoceronte','Rhinoceros','Rhinocéros','Rinoceronte'),
       W('Ippopotamo','Hippopotamus','Hippopotame','Hipopótamo'), W('Bufalo','Buffalo','Buffle','Búfalo'),
       W('Giraffa','Giraffe','Girafe','Jirafa')],
      [W('Zebra','Zebra','Zèbre','Cebra'), W('Gnu','Wildebeest','Gnou','Ñu'), W('Antilope','Antelope','Antilope','Antílope'),
       W('Gazzella','Gazelle','Gazelle','Gacela'), W('Giraffa','Giraffe','Girafe','Jirafa')],
      [W('Leone','Lion','Lion','León'), W('Ghepardo','Cheetah','Guépard','Guepardo'),
       W('Leopardo','Leopard','Léopard','Leopardo'), W('Iena','Hyena','Hyène','Hiena'),
       W('Sciacallo','Jackal','Chacal','Chacal')],
      /* uccelli, per famiglie */
      [W('Aquila','Eagle','Aigle','Águila'), W('Falco','Hawk','Faucon','Halcón'), W('Gufo','Owl','Hibou','Búho'),
       W('Civetta','Little owl','Chouette','Lechuza'), W('Avvoltoio','Vulture','Vautour','Buitre')],
      [W('Cigno','Swan','Cygne','Cisne'), W('Anatra','Duck','Canard','Pato'), W('Oca','Goose','Oie','Ganso'),
       W('Pellicano','Pelican','Pélican','Pelícano'), W('Fenicottero','Flamingo','Flamant rose','Flamenco'),
       W('Airone','Heron','Héron','Garza')],
      [W('Pappagallo','Parrot','Perroquet','Loro'), W('Tucano','Toucan','Toucan','Tucán'),
       W('Fenicottero','Flamingo','Flamant rose','Flamenco'), W('Pavone','Peacock','Paon','Pavo real'),
       W('Colibrì','Hummingbird','Colibri','Colibrí')],
      [W('Struzzo','Ostrich','Autruche','Avestruz'), W('Pinguino','Penguin','Manchot','Pingüino'),
       W('Emù','Emu','Émeu','Emú'), W('Kiwi','Kiwi','Kiwi','Kiwi')],
      [W('Piccione','Pigeon','Pigeon','Paloma'), W('Colomba','Dove','Colombe','Paloma blanca'),
       W('Passero','Sparrow','Moineau','Gorrión'), W('Corvo','Crow','Corbeau','Cuervo'),
       W('Gabbiano','Seagull','Mouette','Gaviota'), W('Rondine','Swallow','Hirondelle','Golondrina')],
      /* mare */
      [W('Squalo','Shark','Requin','Tiburón'), W('Orca','Orca','Orque','Orca'),
       W('Barracuda','Barracuda','Barracuda','Barracuda'), W('Tonno','Tuna','Thon','Atún'),
       W('Pesce spada','Swordfish','Espadon','Pez espada')],
      [W('Delfino','Dolphin','Dauphin','Delfín'), W('Balena','Whale','Baleine','Ballena'), W('Orca','Orca','Orque','Orca'),
       W('Foca','Seal','Phoque','Foca'), W('Tricheco','Walrus','Morse','Morsa')],
      [W('Polpo','Octopus','Pieuvre','Pulpo'), W('Calamaro','Squid','Calmar','Calamar'),
       W('Granchio','Crab','Crabe','Cangrejo'), W('Medusa','Jellyfish','Méduse','Medusa'),
       W('Stella marina','Starfish','Étoile de mer','Estrella de mar'), W('Aragosta','Lobster','Homard','Langosta')],
      /* rettili e anfibi */
      [W('Coccodrillo','Crocodile','Crocodile','Cocodrilo'), W('Alligatore','Alligator','Alligator','Caimán'),
       W('Pitone','Python','Python','Pitón'), W('Anaconda','Anaconda','Anaconda','Anaconda'),
       W('Varano','Monitor lizard','Varan','Varano')],
      [W('Serpente','Snake','Serpent','Serpiente'), W('Cobra','Cobra','Cobra','Cobra'), W('Pitone','Python','Python','Pitón'),
       W('Vipera','Viper','Vipère','Víbora'), W('Anaconda','Anaconda','Anaconda','Anaconda')],
      [W('Lucertola','Lizard','Lézard','Lagarto'), W('Camaleonte','Chameleon','Caméléon','Camaleón'),
       W('Geco','Gecko','Gecko','Geco'), W('Iguana','Iguana','Iguane','Iguana')],
      [W('Rana','Frog','Grenouille','Rana'), W('Rospo','Toad','Crapaud','Sapo'),
       W('Salamandra','Salamander','Salamandre','Salamandra'), W('Tritone','Newt','Triton','Tritón')],
      /* insetti e piccoli invertebrati */
      [W('Ape','Bee','Abeille','Abeja'), W('Vespa','Wasp','Guêpe','Avispa'), W('Formica','Ant','Fourmi','Hormiga'),
       W('Termite','Termite','Termite','Termita')],
      [W('Farfalla','Butterfly','Papillon','Mariposa'), W('Libellula','Dragonfly','Libellule','Libélula'),
       W('Zanzara','Mosquito','Moustique','Mosquito'), W('Mosca','Fly','Mouche','Mosca'), W('Ape','Bee','Abeille','Abeja')],
      [W('Ragno','Spider','Araignée','Araña'), W('Scorpione','Scorpion','Scorpion','Escorpión'),
       W('Scarabeo','Beetle','Scarabée','Escarabajo'), W('Coccinella','Ladybug','Coccinelle','Mariquita'),
       W('Cavalletta','Grasshopper','Sauterelle','Saltamontes'), W('Lumaca','Snail','Escargot','Caracol')],
      /* bosco e montagna */
      [W('Cervo','Deer','Cerf','Ciervo'), W('Cinghiale','Wild boar','Sanglier','Jabalí'), W('Volpe','Fox','Renard','Zorro'),
       W('Tasso','Badger','Blaireau','Tejón'), W('Riccio','Hedgehog','Hérisson','Erizo'),
       W('Lepre','Hare','Lièvre','Liebre'), W('Scoiattolo','Squirrel','Écureuil','Ardilla')],
      [W('Stambecco','Ibex','Bouquetin','Íbice'), W('Camoscio','Chamois','Chamois','Rebeco'),
       W('Marmotta','Marmot','Marmotte','Marmota'), W('Aquila','Eagle','Aigle','Águila'), W('Orso','Bear','Ours','Oso')],
      [W('Topo','Mouse','Souris','Ratón'), W('Ratto','Rat','Rat','Rata'), W('Scoiattolo','Squirrel','Écureuil','Ardilla'),
       W('Criceto','Hamster','Hamster','Hámster'), W('Marmotta','Marmot','Marmotte','Marmota'),
       W('Castoro','Beaver','Castor','Castor')],
      [W('Castoro','Beaver','Castor','Castor'), W('Lontra','Otter','Loutre','Nutria'), W('Rana','Frog','Grenouille','Rana'),
       W('Salmone','Salmon','Saumon','Salmón'), W('Trota','Trout','Truite','Trucha')],
      /* primati */
      [W('Scimmia','Monkey','Singe','Mono'), W('Gorilla','Gorilla','Gorille','Gorila'),
       W('Orango','Orangutan','Orang-outan','Orangután'), W('Scimpanzé','Chimpanzee','Chimpanzé','Chimpancé'),
       W('Babbuino','Baboon','Babouin','Babuino'), W('Lemure','Lemur','Lémurien','Lémur')],
      /* per continente e clima */
      [W('Canguro','Kangaroo','Kangourou','Canguro'), W('Koala','Koala','Koala','Koala'),
       W('Ornitorinco','Platypus','Ornithorynque','Ornitorrinco'), W('Emù','Emu','Émeu','Emú'),
       W('Dingo','Dingo','Dingo','Dingo'), W('Wombat','Wombat','Wombat','Wómbat')],
      [W('Orso polare','Polar bear','Ours polaire','Oso polar'), W('Pinguino','Penguin','Manchot','Pingüino'),
       W('Foca','Seal','Phoque','Foca'), W('Tricheco','Walrus','Morse','Morsa'),
       W('Renna','Reindeer','Renne','Reno'), W('Volpe artica','Arctic fox','Renard polaire','Zorro ártico')],
      [W('Cammello','Camel','Chameau','Camello'), W('Dromedario','Dromedary','Dromadaire','Dromedario'),
       W('Scorpione','Scorpion','Scorpion','Escorpión'), W('Suricato','Meerkat','Suricate','Suricato'),
       W('Fennec','Fennec fox','Fennec','Fénec')],
      [W('Panda','Panda','Panda','Panda'), W('Tigre','Tiger','Tigre','Tigre'),
       W('Orango','Orangutan','Orang-outan','Orangután'), W('Elefante','Elephant','Éléphant','Elefante'),
       W('Cobra','Cobra','Cobra','Cobra')],
      [W('Bradipo','Sloth','Paresseux','Perezoso'), W('Tartaruga','Turtle','Tortue','Tortuga'),
       W('Lumaca','Snail','Escargot','Caracol'), W('Koala','Koala','Koala','Koala')],
      [W('Lama','Llama','Lama','Llama'), W('Alpaca','Alpaca','Alpaga','Alpaca'), W('Condor','Condor','Condor','Cóndor'),
       W('Giaguaro','Jaguar','Jaguar','Jaguar'), W('Bradipo','Sloth','Paresseux','Perezoso'),
       W('Tucano','Toucan','Toucan','Tucán'), W('Armadillo','Armadillo','Tatou','Armadillo')],
      [W('Procione','Raccoon','Raton laveur','Mapache'), W('Puzzola','Skunk','Mouffette','Mofeta'),
       W('Opossum','Opossum','Opossum','Zarigüeya'), W('Alce','Moose','Élan','Alce'),
       W('Orso','Bear','Ours','Oso'), W('Castoro','Beaver','Castor','Castor')],
      [W('Pipistrello','Bat','Chauve-souris','Murciélago'), W('Talpa','Mole','Taupe','Topo'),
       W('Riccio','Hedgehog','Hérisson','Erizo'), W('Gufo','Owl','Hibou','Búho')]
    ],
    it: [], en: [], fr: [], es: []
  },

  /* ============================== CITTÀ ============================== */
  cities: {
    base: [
      [W('Stoccolma','Stockholm','Stockholm','Estocolmo'), 'Oslo', W('Copenaghen','Copenhagen','Copenhague','Copenhague'),
       'Helsinki', W('Reykjavík','Reykjavík','Reykjavík','Reikiavik')],
      ['Tallinn', 'Riga', W('Vilnius','Vilnius','Vilnius','Vilna'), 'Helsinki'],
      [W('Vienna','Vienna','Vienne','Viena'), W('Praga','Prague','Prague','Praga'), 'Budapest', 'Bratislava',
       W('Berlino','Berlin','Berlin','Berlín'), W('Varsavia','Warsaw','Varsovie','Varsovia'),
       W('Lubiana','Ljubljana','Ljubljana','Liubliana')],
      [W('Belgrado','Belgrade','Belgrade','Belgrado'), W('Zagabria','Zagreb','Zagreb','Zagreb'), 'Sarajevo', 'Skopje',
       'Tirana', W('Sofia','Sofia','Sofia','Sofía'), W('Bucarest','Bucharest','Bucarest','Bucarest'), 'Podgorica'],
      [W('Roma','Rome','Rome','Roma'), 'Madrid', W('Lisbona','Lisbon','Lisbonne','Lisboa'),
       W('Atene','Athens','Athènes','Atenas'), 'Nicosia', 'La Valletta', 'Tirana'],
      [W('Parigi','Paris','Paris','París'), W('Londra','London','Londres','Londres'),
       W('Bruxelles','Brussels','Bruxelles','Bruselas'), 'Amsterdam', W('Dublino','Dublin','Dublin','Dublín'),
       W('Lussemburgo','Luxembourg','Luxembourg','Luxemburgo'), W('Berna','Bern','Berne','Berna')],
      [W('Mosca','Moscow','Moscou','Moscú'), W('Kiev','Kyiv','Kiev','Kiev'), 'Minsk',
       W('Varsavia','Warsaw','Varsovie','Varsovia'), W('Bucarest','Bucharest','Bucarest','Bucarest')],
      [W('Tokyo','Tokyo','Tokyo','Tokio'), W('Pechino','Beijing','Pékin','Pekín'), W('Seul','Seoul','Séoul','Seúl'),
       W('Nuova Delhi','New Delhi','New Delhi','Nueva Delhi'), 'Bangkok', W('Hanoi','Hanoi','Hanoï','Hanói'),
       'Jakarta', 'Manila'],
      [W('Riad','Riyadh','Riyad','Riad'), W('Abu Dhabi','Abu Dhabi','Abu Dhabi','Abu Dabi'), 'Doha',
       'Kuwait City', 'Manama', W('Mascate','Muscat','Mascate','Mascate')],
      [W('Washington','Washington','Washington','Washington'), 'Ottawa',
       W('Città del Messico','Mexico City','Mexico','Ciudad de México')],
      [W('Brasilia','Brasília','Brasilia','Brasilia'), 'Buenos Aires', 'Lima',
       W('Santiago del Cile','Santiago','Santiago du Chili','Santiago de Chile'),
       W('Bogotà','Bogotá','Bogota','Bogotá'), 'Montevideo', 'Quito', 'Caracas'],
      [W('Il Cairo','Cairo','Le Caire','El Cairo'), 'Rabat', W('Tunisi','Tunis','Tunis','Túnez'),
       W('Algeri','Algiers','Alger','Argel'), 'Nairobi', 'Pretoria', 'Abuja',
       W('Addis Abeba','Addis Ababa','Addis-Abeba','Adís Abeba'), 'Accra'],
      ['Canberra', 'Wellington', W('Sydney','Sydney','Sydney','Sídney'), 'Melbourne', 'Auckland'],
      ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami', 'Boston', 'Las Vegas', 'Seattle'],
      [W('Shanghai','Shanghai','Shanghai','Shanghái'), 'Hong Kong', W('Mumbai','Mumbai','Bombay','Bombay'),
       'Osaka', W('Singapore','Singapore','Singapour','Singapur'), 'Kuala Lumpur',
       W('Pechino','Beijing','Pékin','Pekín'), W('Tokyo','Tokyo','Tokyo','Tokio')],
      [W('Barcellona','Barcelona','Barcelone','Barcelona'), W('Venezia','Venice','Venise','Venecia'),
       W('Praga','Prague','Prague','Praga'), 'Amsterdam', W('Vienna','Vienna','Vienne','Viena'),
       W('Lisbona','Lisbon','Lisbonne','Lisboa'), W('Istanbul','Istanbul','Istanbul','Estambul'),
       W('Parigi','Paris','Paris','París')],
      [W('Dubai','Dubai','Dubaï','Dubái'), W('Abu Dhabi','Abu Dhabi','Abu Dhabi','Abu Dabi'), 'Doha',
       W('Istanbul','Istanbul','Istanbul','Estambul')],
      [W('San Paolo','São Paulo','São Paulo','São Paulo'), 'Rio de Janeiro', 'Buenos Aires', 'Lima',
       W('Bogotà','Bogotá','Bogota','Bogotá')]
    ],
    it: [
      [W('Torino','Turin','Turin','Turín'), 'Novara', 'Alessandria', 'Asti', 'Cuneo',
       W('Genova','Genoa','Gênes','Génova'), 'Savona', 'La Spezia', 'Imperia'],
      [W('Milano','Milan','Milan','Milán'), 'Bergamo', 'Brescia', 'Como', 'Varese', 'Pavia', 'Monza', 'Cremona', 'Mantova'],
      [W('Venezia','Venice','Venise','Venecia'), W('Verona','Verona','Vérone','Verona'),
       W('Padova','Padua','Padoue','Padua'), 'Vicenza', 'Treviso', 'Rovigo', 'Belluno'],
      [W('Trieste','Trieste','Trieste','Trieste'), 'Udine', 'Pordenone', 'Gorizia', 'Trento', 'Bolzano'],
      [W('Bologna','Bologna','Bologne','Bolonia'), 'Modena', 'Parma', 'Reggio Emilia', 'Ferrara', 'Ravenna',
       'Rimini', 'Forlì', 'Piacenza'],
      [W('Firenze','Florence','Florence','Florencia'), W('Pisa','Pisa','Pise','Pisa'), 'Livorno',
       W('Siena','Siena','Sienne','Siena'), 'Lucca', 'Arezzo', 'Prato', 'Grosseto', 'Pistoia'],
      [W('Roma','Rome','Rome','Roma'), 'Viterbo', 'Latina', 'Frosinone', 'Rieti',
       W('Perugia','Perugia','Pérouse','Perugia'), 'Terni'],
      ['Ancona', 'Pesaro', 'Macerata', 'Ascoli Piceno', "L'Aquila", 'Pescara', 'Chieti', 'Teramo', 'Campobasso'],
      [W('Napoli','Naples','Naples','Nápoles'), 'Salerno', 'Caserta', 'Avellino', 'Benevento'],
      ['Bari', 'Lecce', 'Taranto', 'Foggia', 'Brindisi', 'Barletta'],
      ['Reggio Calabria', 'Cosenza', 'Catanzaro', 'Crotone', 'Vibo Valentia', 'Potenza', 'Matera'],
      [W('Palermo','Palermo','Palerme','Palermo'), W('Catania','Catania','Catane','Catania'),
       W('Messina','Messina','Messine','Mesina'), W('Siracusa','Syracuse','Syracuse','Siracusa'),
       'Trapani', 'Agrigento', 'Ragusa', 'Caltanissetta', 'Enna'],
      [W('Cagliari','Cagliari','Cagliari','Cagliari'), 'Sassari', 'Nuoro', 'Oristano'],
      [W('Roma','Rome','Rome','Roma'), W('Milano','Milan','Milan','Milán'), W('Napoli','Naples','Naples','Nápoles'),
       W('Torino','Turin','Turin','Turín'), W('Palermo','Palermo','Palerme','Palermo'),
       W('Genova','Genoa','Gênes','Génova'), W('Bologna','Bologna','Bologne','Bolonia'),
       W('Firenze','Florence','Florence','Florencia')],
      [W('Firenze','Florence','Florence','Florencia'), W('Venezia','Venice','Venise','Venecia'),
       W('Siena','Siena','Sienne','Siena'), W('Pisa','Pisa','Pise','Pisa'), W('Verona','Verona','Vérone','Verona'),
       'Ravenna', 'Assisi', 'Urbino'],
      ['Rimini', 'Riccione', 'Sorrento', 'Positano', 'Taormina', 'Portofino', 'Alghero', 'Gallipoli']
    ],
    en: [
      ['London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds', 'Sheffield', 'Bristol', 'Newcastle'],
      ['Oxford', 'Cambridge', 'York', 'Bath', 'Canterbury', 'Durham', 'Winchester', 'Salisbury'],
      ['Glasgow', 'Edinburgh', 'Aberdeen', 'Dundee', 'Inverness'],
      ['Cardiff', 'Swansea', 'Newport', 'Bangor'],
      ['Belfast', 'Londonderry', 'Dublin', 'Galway'],
      ['Brighton', 'Blackpool', 'Bournemouth', 'Margate', 'Scarborough'],
      ['Nottingham', 'Leicester', 'Coventry', 'Derby', 'Stoke-on-Trent', 'Wolverhampton'],
      ['Southampton', 'Portsmouth', 'Plymouth', 'Exeter', 'Norwich', 'Ipswich']
    ],
    fr: [
      ['Paris', 'Versailles', 'Créteil', 'Nanterre', 'Saint-Denis'],
      ['Marseille', 'Toulon', 'Nice', 'Aix-en-Provence', 'Avignon', 'Cannes'],
      ['Lyon', 'Grenoble', 'Saint-Étienne', 'Annecy', 'Chambéry', 'Valence'],
      ['Bordeaux', 'Toulouse', 'Montpellier', 'Perpignan', 'Nîmes', 'Biarritz', 'Pau'],
      ['Nantes', 'Rennes', 'Brest', 'Saint-Malo', 'Quimper', 'Lorient'],
      ['Lille', 'Amiens', 'Calais', 'Dunkerque', 'Roubaix', 'Arras'],
      ['Strasbourg', 'Metz', 'Nancy', 'Colmar', 'Mulhouse', 'Besançon', 'Dijon'],
      ['Rouen', 'Le Havre', 'Caen', 'Deauville', 'Cherbourg'],
      ['Tours', 'Orléans', 'Limoges', 'Poitiers', 'La Rochelle', 'Angers', 'Le Mans'],
      ['Ajaccio', 'Bastia', 'Porto-Vecchio', 'Calvi']
    ],
    es: [
      ['Madrid', 'Toledo', 'Segovia', 'Ávila', 'Guadalajara', 'Cuenca'],
      ['Barcelona', 'Tarragona', 'Girona', 'Lleida', 'Sitges'],
      ['Valencia', 'Alicante', 'Castellón', 'Benidorm', 'Elche'],
      ['Sevilla', 'Córdoba', 'Granada', 'Málaga', 'Cádiz', 'Huelva', 'Jaén', 'Almería', 'Marbella'],
      ['Bilbao', 'San Sebastián', 'Vitoria', 'Pamplona', 'Logroño', 'Santander'],
      ['A Coruña', 'Vigo', 'Santiago de Compostela', 'Ourense', 'Pontevedra', 'Lugo'],
      ['Zaragoza', 'Huesca', 'Teruel', 'Valladolid', 'Burgos', 'Salamanca', 'León', 'Zamora'],
      ['Palma de Mallorca', 'Ibiza', 'Mahón', 'Las Palmas', 'Santa Cruz de Tenerife'],
      ['Oviedo', 'Gijón', 'Avilés', 'Murcia', 'Cartagena', 'Badajoz', 'Cáceres', 'Mérida']
    ]
  },

  /* ============================== CALCIO ============================== */
  football: {
    base: [
      ['Juventus', 'Inter', 'Milan', 'Napoli', 'Roma', 'Lazio'],
      ['Atalanta', 'Fiorentina', 'Torino', 'Udinese', 'Sassuolo', 'Bologna', 'Sampdoria', 'Genoa'],
      ['Real Madrid', W('Barcellona','Barcelona','Barcelone','Barcelona'), 'Atlético Madrid',
       W('Siviglia','Sevilla','Séville','Sevilla'), 'Valencia', 'Villarreal', 'Athletic Bilbao', 'Real Sociedad'],
      ['Manchester United', 'Manchester City', 'Liverpool', 'Chelsea', 'Arsenal', 'Tottenham', 'Newcastle', 'Everton'],
      [W('Bayern Monaco','Bayern Munich','Bayern Munich','Bayern Múnich'), 'Borussia Dortmund',
       W('RB Lipsia','RB Leipzig','RB Leipzig','RB Leipzig'), 'Bayer Leverkusen', 'Schalke 04',
       W('Eintracht Francoforte','Eintracht Frankfurt','Eintracht Francfort','Eintracht Fráncfort'),
       W('Werder Brema','Werder Bremen','Werder Brême','Werder Bremen')],
      ['Paris Saint-Germain', W('Marsiglia','Marseille','Marseille','Marsella'), W('Lione','Lyon','Lyon','Lyon'),
       'Monaco', W('Lilla','Lille','Lille','Lille'), W('Nizza','Nice','Nice','Niza'), 'Rennes', 'Saint-Étienne'],
      ['Ajax', 'PSV Eindhoven', 'Feyenoord', 'AZ Alkmaar', 'Twente', 'Utrecht'],
      ['Benfica', 'Porto', W('Sporting Lisbona','Sporting CP','Sporting Portugal','Sporting de Lisboa'), 'Braga'],
      /* portieri */
      ['Gianluigi Buffon', 'Iker Casillas', 'Manuel Neuer', 'Petr Čech', 'Edwin van der Sar', 'Oliver Kahn'],
      ['David De Gea', 'Thibaut Courtois', 'Marc-André ter Stegen', 'Alisson Becker', 'Ederson', 'Jan Oblak', 'Keylor Navas'],
      /* difensori */
      ['Sergio Ramos', 'Gerard Piqué', 'Carles Puyol', 'Giorgio Chiellini', 'Leonardo Bonucci', 'Alessandro Nesta'],
      ['Virgil van Dijk', 'Nemanja Vidić', 'Rio Ferdinand', 'Thiago Silva', 'Mats Hummels', 'Vincent Kompany'],
      ['Marcelo', 'Dani Alves', 'Philipp Lahm', 'Maicon', 'Cafu', 'Roberto Carlos', 'Ashley Cole'],
      ['Trent Alexander-Arnold', 'Theo Hernández', 'Achraf Hakimi', 'João Cancelo', 'Alphonso Davies'],
      /* centrocampisti */
      ['Andrea Pirlo', 'Xavi', 'Andrés Iniesta', 'Luka Modrić', 'Toni Kroos', 'Sergio Busquets', 'Xabi Alonso'],
      ['Steven Gerrard', 'Frank Lampard', 'Paul Scholes', 'Patrick Vieira', 'Paul Pogba', "N'Golo Kanté",
       'Kevin De Bruyne', 'Jude Bellingham'],
      /* attaccanti */
      ['Lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Kylian Mbappé', 'Ronaldinho', 'Ronaldo'],
      ['Erling Haaland', 'Robert Lewandowski', 'Zlatan Ibrahimović', 'Luis Suárez', 'Edinson Cavani',
       'Ruud van Nistelrooy', 'Filippo Inzaghi', 'Christian Vieri', 'Luca Toni'],
      ['Thierry Henry', 'Arjen Robben', 'Franck Ribéry', 'Mohamed Salah', 'Sadio Mané', 'Raheem Sterling',
       'Lorenzo Insigne', 'Federico Chiesa'],
      ['Karim Benzema', 'Sergio Agüero', 'Didier Drogba', 'Wayne Rooney', "Samuel Eto'o", 'Harry Kane', 'Alan Shearer'],
      /* leggende */
      ['Diego Armando Maradona', 'Pelé', 'Johan Cruyff', 'Franz Beckenbauer', 'Michel Platini',
       'Alfredo Di Stéfano', 'George Best'],
      ['Roberto Baggio', 'Francesco Totti', 'Alessandro Del Piero', 'Zinédine Zidane', 'Juan Román Riquelme',
       'Ronaldinho', 'Rui Costa', 'Gianfranco Zola'],
      ['Marco van Basten', 'Ronaldo', 'Luís Figo', 'Kaká', 'Andriy Shevchenko', 'Pavel Nedvěd', 'Rivaldo', 'Romário'],
      /* allenatori */
      ['Pep Guardiola', 'José Mourinho', 'Carlo Ancelotti', 'Alex Ferguson', 'Jürgen Klopp', 'Arsène Wenger'],
      ['Diego Simeone', 'Antonio Conte', 'Arrigo Sacchi', 'Fabio Capello', 'Marcello Lippi', 'Massimiliano Allegri']
    ],
    it: [
      ['Genoa', 'Udinese', 'Torino', 'Sampdoria', 'Bologna', 'Cagliari', 'Sassuolo', 'Verona', 'Empoli', 'Lecce'],
      ['Parma', 'Monza', 'Como', 'Venezia', 'Palermo', 'Brescia', 'Perugia', 'Bari'],
      ['Ciro Immobile', 'Mauro Icardi', 'Gonzalo Higuaín', 'Luca Toni', 'Antonio Di Natale', 'Fabio Quagliarella',
       'Victor Osimhen', 'Lautaro Martínez'],
      ['Franco Baresi', 'Paolo Maldini', 'Fabio Cannavaro', 'Alessandro Nesta', 'Giacinto Facchetti', 'Gaetano Scirea'],
      ['Dino Zoff', 'Gianluigi Buffon', 'Walter Zenga', 'Gianluigi Donnarumma'],
      ['Paolo Rossi', 'Gigi Riva', 'Roberto Baggio', 'Alessandro Del Piero', 'Francesco Totti', 'Christian Vieri',
       'Filippo Inzaghi', 'Marco Tardelli', 'Gianluca Vialli'],
      ['Nicolò Barella', 'Jorginho', 'Marco Verratti', 'Sandro Tonali', 'Manuel Locatelli', 'Daniele De Rossi',
       'Gennaro Gattuso', 'Andrea Pirlo'],
      ['Federico Chiesa', 'Lorenzo Insigne', 'Domenico Berardi', 'Gianluca Scamacca', 'Giacomo Raspadori',
       'Federico Dimarco', 'Alessandro Bastoni']
    ],
    en: [
      ['Leicester City', 'Leeds United', 'Southampton', 'Crystal Palace', 'Wolverhampton', 'Brighton',
       'Fulham', 'Nottingham Forest', 'Brentford', 'Bournemouth', 'West Ham'],
      ['Thierry Henry', 'Ruud van Nistelrooy', 'Didier Drogba', 'Robin van Persie', 'Sergio Agüero',
       'Harry Kane', 'Mohamed Salah', 'Jamie Vardy', 'Erling Haaland', 'Son Heung-min'],
      ['David Beckham', 'Alan Shearer', 'Michael Owen', 'Wayne Rooney', 'Bobby Charlton', 'Gary Lineker'],
      ['John Terry', 'Ashley Cole', 'Rio Ferdinand', 'Gary Neville', 'Peter Shilton', 'Sol Campbell'],
      ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka', 'Phil Foden', 'Declan Rice', 'Cole Palmer',
       'Marcus Rashford', 'Jack Grealish'],
      ['Jordan Pickford', 'Kyle Walker', 'John Stones', 'Trent Alexander-Arnold', 'Luke Shaw', 'Harry Maguire']
    ],
    fr: [
      ['Nantes', 'Bordeaux', 'Montpellier', 'Strasbourg', 'Toulouse', 'Lens', 'Reims', 'Brest', 'Angers', 'Auxerre'],
      ['Michel Platini', 'Zinédine Zidane', 'Thierry Henry', 'Just Fontaine', 'Raymond Kopa', 'Éric Cantona'],
      ['Didier Deschamps', 'Laurent Blanc', 'Fabien Barthez', 'Marcel Desailly', 'Lilian Thuram', 'Bixente Lizarazu'],
      ['David Trezeguet', 'Jean-Pierre Papin', 'Olivier Giroud', 'Karim Benzema', 'Wissam Ben Yedder',
       'Alexandre Lacazette', 'André-Pierre Gignac'],
      ['Kylian Mbappé', 'Antoine Griezmann', "N'Golo Kanté", 'Paul Pogba', 'Hugo Lloris', 'Raphaël Varane'],
      ['Aurélien Tchouaméni', 'Eduardo Camavinga', 'Ousmane Dembélé', 'Mike Maignan', 'Theo Hernández', 'Jules Koundé']
    ],
    es: [
      ['Real Betis', 'Celta de Vigo', 'Espanyol', 'Getafe', 'Osasuna', 'Rayo Vallecano', 'Mallorca',
       'Granada', 'Levante', 'Deportivo La Coruña', 'Alavés', 'Girona'],
      ['Raúl', 'Iker Casillas', 'Fernando Hierro', 'Emilio Butragueño', 'Míchel', 'Fernando Morientes'],
      ['Xavi', 'Andrés Iniesta', 'Carles Puyol', 'Sergio Busquets', 'Pep Guardiola', 'Gerard Piqué'],
      ['David Villa', 'Fernando Torres', 'Álvaro Morata', 'Diego Costa', 'Iago Aspas', 'Fernando Llorente'],
      ['Rodri', 'Pedri', 'Gavi', 'Lamine Yamal', 'Nico Williams', 'Dani Olmo', 'Mikel Merino', 'Fabián Ruiz'],
      ['Unai Simón', 'Dani Carvajal', 'Sergio Ramos', 'Jordi Alba', 'César Azpilicueta', 'Aymeric Laporte']
    ]
  },

  /* ============================== SPORT ============================== */
  sports: {
    base: [
      ['Michael Jordan', 'Kobe Bryant', 'LeBron James', "Shaquille O'Neal", 'Tim Duncan', 'Magic Johnson', 'Larry Bird'],
      ['LeBron James', 'Stephen Curry', 'Kevin Durant', 'Giannis Antetokounmpo', 'Nikola Jokić',
       'Luka Dončić', 'James Harden'],
      ['Ayrton Senna', 'Alain Prost', 'Michael Schumacher', 'Niki Lauda', 'Juan Manuel Fangio', 'Nigel Mansell'],
      ['Lewis Hamilton', 'Max Verstappen', 'Sebastian Vettel', 'Fernando Alonso', 'Kimi Räikkönen',
       'Jenson Button', 'Nico Rosberg'],
      ['Charles Leclerc', 'Lando Norris', 'George Russell', 'Carlos Sainz', 'Daniel Ricciardo',
       'Felipe Massa', 'Mark Webber'],
      ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Andy Murray', 'Pete Sampras', 'André Agassi'],
      ['Carlos Alcaraz', 'Jannik Sinner', 'Daniil Medvedev', 'Alexander Zverev', 'Stefanos Tsitsipas',
       'Stan Wawrinka', 'Juan Martín del Potro'],
      ['Serena Williams', 'Venus Williams', 'Maria Sharapova', 'Simona Halep', 'Naomi Osaka', 'Iga Świątek'],
      ['Michael Phelps', 'Katie Ledecky', 'Caeleb Dressel', 'Adam Peaty', 'Ian Thorpe', 'Alexander Popov'],
      ['Usain Bolt', 'Justin Gatlin', 'Asafa Powell', 'Marcell Jacobs', 'Carl Lewis', 'Allyson Felix'],
      ['Simone Biles', 'Nadia Comăneci', 'Katie Ledecky', 'Allyson Felix', 'Michael Phelps', 'Usain Bolt'],
      ['Muhammad Ali', 'Mike Tyson', 'Floyd Mayweather', 'Manny Pacquiao', 'Tyson Fury', 'Anthony Joshua',
       'Óscar De La Hoya'],
      ['Valentino Rossi', 'Marc Márquez', 'Jorge Lorenzo', 'Casey Stoner', 'Giacomo Agostini'],
      ['Eddy Merckx', 'Miguel Indurain', 'Marco Pantani', 'Alberto Contador', 'Chris Froome', 'Tadej Pogačar']
    ],
    it: [
      ['Ivan Zaytsev', 'Simone Giannelli', 'Osmany Juantorena', 'Simone Anzani', 'Alessandro Michieletto', 'Daniele Lavia'],
      ['Andrea Lucchetta', 'Andrea Giani', 'Lorenzo Bernardi', 'Samuele Papi', 'Julio Velasco'],
      ['Paola Egonu', 'Miriam Sylla', 'Alessia Orro', 'Anna Danesi', 'Monica De Gennaro'],
      ['Valentino Rossi', 'Alberto Tomba', 'Sofia Goggia', 'Deborah Compagnoni', 'Federica Brignone'],
      ['Federica Pellegrini', 'Gregorio Paltrinieri', 'Tania Cagnotto', 'Massimiliano Rosolino', 'Filippo Magnini'],
      ['Gianmarco Tamberi', 'Marcell Jacobs', 'Pietro Mennea', 'Valentina Vezzali', 'Sara Simeoni'],
      ['Jannik Sinner', 'Matteo Berrettini', 'Adriano Panatta', 'Lorenzo Musetti', 'Sara Errani'],
      ['Marco Pantani', 'Francesco Moser', 'Fausto Coppi', 'Gino Bartali', 'Vincenzo Nibali']
    ],
    en: [
      ['Andy Murray', 'Tim Henman', 'Emma Raducanu', 'Virginia Wade'],
      ['Mo Farah', 'Jessica Ennis-Hill', 'Daley Thompson', 'Sebastian Coe', 'Linford Christie'],
      ['Chris Hoy', 'Bradley Wiggins', 'Chris Froome', 'Mark Cavendish', 'Geraint Thomas'],
      ['Adam Peaty', 'Tom Daley', 'Rebecca Adlington', 'Duncan Goodhew'],
      ['Anthony Joshua', 'Tyson Fury', 'Lennox Lewis', 'Ricky Hatton', 'Naseem Hamed'],
      ["Ronnie O'Sullivan", 'Phil Taylor', 'Steve Davis', 'Stephen Hendry'],
      ['Ben Stokes', 'Joe Root', 'Ian Botham', 'Andrew Flintoff', 'Alastair Cook'],
      ['Jonny Wilkinson', 'Martin Johnson', 'Owen Farrell', 'Lawrence Dallaglio']
    ],
    fr: [
      ['Earvin Ngapeth', 'Benjamin Toniutti', 'Antoine Brizard', 'Trévor Clévenot', 'Jean Patry', 'Nicolas Le Goff'],
      ['Teddy Riner', 'David Douillet', 'Clarisse Agbegnenou', 'Lucie Décosse'],
      ['Tony Parker', 'Boris Diaw', 'Rudy Gobert', 'Victor Wembanyama', 'Nicolas Batum'],
      ['Renaud Lavillenie', 'Marie-José Pérec', 'Christine Arron', 'Kevin Mayer'],
      ['Martin Fourcade', 'Jean-Claude Killy', 'Luc Alphand', 'Alexis Pinturault'],
      ['Laure Manaudou', 'Alain Bernard', 'Léon Marchand', 'Camille Lacourt'],
      ['Yannick Noah', 'Amélie Mauresmo', 'Jo-Wilfried Tsonga', 'Gaël Monfils', 'Marion Bartoli'],
      ['Jeannie Longo', 'Bernard Hinault', 'Laurent Jalabert', 'Richard Virenque', 'Thibaut Pinot']
    ],
    es: [
      ['Rafael Nadal', 'Juan Carlos Ferrero', 'Carlos Alcaraz', 'Arantxa Sánchez Vicario', 'Garbiñe Muguruza'],
      ['Pau Gasol', 'Marc Gasol', 'Juan Carlos Navarro', 'Ricky Rubio', 'Sergio Llull'],
      ['Fernando Alonso', 'Carlos Sainz', 'Marc Márquez', 'Jorge Lorenzo', 'Dani Pedrosa'],
      ['Miguel Indurain', 'Alberto Contador', 'Alejandro Valverde', 'Pedro Delgado', 'Federico Bahamontes'],
      ['Mireia Belmonte', 'Carolina Marín', 'Ruth Beitia', 'Lydia Valentín', 'Sandra Sánchez'],
      ['Rafael Pascual', 'Guillermo Falasca', 'Ibán Pérez', 'Manuel Sevillano']
    ]
  }
};

/* ------------------------------------------------------------------ */

function wordLabel(item, lang) {
  if (typeof item === 'string') return item;
  var i = LANGS.indexOf(lang);
  if (i < 0) i = 1;
  return item[i] || item[1] || item[0];
}

/* chiave stabile di una parola, indipendente dalla lingua */
function wordKey(item) { return typeof item === 'string' ? item : item[1]; }

/* Indice "parola -> tutti i possibili compagni", costruito unendo i gruppi
   che contengono quella parola. */
function buildIndex(category, nation) {
  var cat = WORDBANK[category] || WORDBANK.animals;
  var groups = (cat.base || []).concat(cat[nation] || []);
  groups = groups.filter(function (g) { return g && g.length >= 2; });
  var index = {};
  groups.forEach(function (g) {
    g.forEach(function (item) {
      var k = wordKey(item);
      if (!index[k]) index[k] = { item: item, mates: {} };
      g.forEach(function (other) {
        var ok = wordKey(other);
        if (ok !== k) index[k].mates[ok] = other;
      });
    });
  });
  return index;
}

/* Pesca la coppia (parola dei giocatori, parola degli impostori).
   "recent" elenca le ultime parole uscite nella stanza: vengono escluse
   così lo stesso termine non si ripete a giri ravvicinati. */
function pickWordPair(category, nation, recent) {
  var index = buildIndex(category, nation);
  var keys = Object.keys(index).filter(function (k) {
    return Object.keys(index[k].mates).length > 0;
  });
  if (!keys.length) return null;

  var avoid = {};
  (recent || []).forEach(function (k) { avoid[k] = true; });
  var pool = keys.filter(function (k) { return !avoid[k]; });
  if (!pool.length) pool = keys;

  var mainKey = pool[Math.floor(Math.random() * pool.length)];
  var entry = index[mainKey];
  var mateKeys = Object.keys(entry.mates);
  var decoyKey = mateKeys[Math.floor(Math.random() * mateKeys.length)];

  return { main: entry.item, decoy: entry.mates[decoyKey], key: mainKey };
}

if (typeof module !== 'undefined') {
  module.exports = {
    WORDBANK: WORDBANK, pickWordPair: pickWordPair,
    wordLabel: wordLabel, buildIndex: buildIndex, wordKey: wordKey
  };
}
