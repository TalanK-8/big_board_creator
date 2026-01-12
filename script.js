//Player data

const players = [
    {id: "player-1", name: "Rueben Bain Jr.", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "275", stats: "113tcks   19.5sacks   33tfls", photo: "images/players/RuebenBain.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-2", name: "Caleb Downs", unit: "defense", position: "S", height: "6' 0\"", weight: "205", stats: "256tcks   10pd   6ints", photo: "images/players/CalebDowns.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-3", name: "Fernando Mendoza", unit: "offense", position: "QB", height: "6' 5\"", weight: "225", stats: "68.5cmp%   7884yds   66tds   22ints", photo: "images/players/FernandoMendoza.jpg", logo: "images/logos/IndianaLogo.png"},
    {id: "player-4", name: "David Bailey", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "250", stats: "163tcks   29sacks   42tfls", photo: "images/players/DavidBailey.jpg", logo: "images/logos/TexasTechLogo.png"},
    {id: "player-5", name: "Peter Woods", unit: "defense", position: "IDL", height: "6' 3\"", weight: "315", stats: "82tcks   5sacks   14.5tfls", photo: "images/players/PeterWoods.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-6", name: "Francis Mauigoa", unit: "offense", position: "OT", height: "6' 6\"", weight: "315", stats: "42gs   8sa   0.5pres%", photo: "images/players/FrancisMauigoa.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-7", name: "Jeremiyah Love", unit: "offense", position: "RB", height: "6' 0\"", weight: "214", stats: "6.7ypc   3476yds   42tds", photo: "images/players/JeremiyahLove.jpg", logo: "images/logos/NotreDameLogo.png"},
    {id: "player-8", name: "Jordyn Tyson", unit: "offense", position: "WR", height: "6' 2\"", weight: "200", stats: "158recs   2282yds   22tds", photo: "images/players/JordynTyson.jpg", logo: "images/logos/ArizonaStateLogo.png"},
    {id: "player-9", name: "Carnell Tate", unit: "offense", position: "WR", height: "6' 3\"", weight: "195", stats: "121recs   1872yds   14tds", photo: "images/players/CarnellTate.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-10", name: "Makai Lemon", unit: "offense", position: "WR", height: "5' 11\"", weight: "195", stats: "137recs   2008yds   14tds", photo: "images/players/MakaiLemon.jpg", logo: "images/logos/USCLogo.png"},
    {id: "player-11", name: "Spencer Fano", unit: "offense", position: "OT", height: "6' 6\"", weight: "302", stats: "35gs   3sa   0.6pres%", photo: "images/players/SpencerFano.jpg", logo: "images/logos/UtahLogo.png"},
    {id: "player-12", name: "Kenyon Sadiq", unit: "offense", position: "TE", height: "6' 3\"", weight: "245", stats: "75recs   863yds   11tds", photo: "images/players/KenyonSadiq.jpg", logo: "images/logos/OregonLogo.png"},
    {id: "player-13", name: "Sonny Styles", unit: "defense", position: "LB", height: "6' 4\"", weight: "243", stats: "244tcks   22.5tfl   9sacks", photo: "images/players/SonnyStyles.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-14", name: "Mansoor Delane", unit: "defense", position: "CB", height: "6' 0\"", weight: "190", stats: "191tcks   27pd   8ints", photo: "images/players/MansoorDelane.jpg", logo: "images/logos/LSULogo.png"},
    {id: "player-15", name: "Jermod McCoy", unit: "defense", position: "CB", height: "6' 0\"", weight: "193", stats: "75tcks   14pd   6ints", photo: "images/players/JermodMcCoy.jpg", logo: "images/logos/TennesseeLogo.png"},
    {id: "player-16", name: "Keldric Faulk", unit: "defense", position: "EDGE", height: "6' 6\"", weight: "285", stats: "109tcks   10sacks   19.5tfls", photo: "images/players/KeldricFaulk.jpg", logo: "images/logos/AuburnLogo.png"},
    {id: "player-17", name: "Arvell Reese", unit: "defense", position: "LB", height: "6' 4\"", weight: "243", stats: "112tcks   13.5tfls   7sacks", photo: "images/players/ArvellReese.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-18", name: "CJ Allen", unit: "defense", position: "LB", height: "6' 1\"", weight: "235", stats: "205tcks   13.5tfls   4.5sacks", photo: "images/players/CJAllen.jpg", logo: "images/logos/GeorgiaLogo.png"},
    {id: "player-19", name: "Olaivavega Ioane", unit: "offense", position: "OG", height: "6' 4\"", weight: "330", stats: "32gs   2sa   1.0pres%", photo: "images/players/OlaivavegaIoane.jpg", logo: "images/logos/PennStateLogo.png"},
    {id: "player-20", name: "Chris Bell", unit: "offense", position: "WR", height: "6' 2\"", weight: "220", stats: "151recs   2166yds   12tds", photo: "images/players/ChrisBell.jpg", logo: "images/logos/LouisvilleLogo.png"},
    {id: "player-21", name: "KC Concepcion", unit: "offense", position: "WR", height: "5' 11\"", weight: "190", stats: "185recs   2218yds   25tds", photo: "images/players/KCConcepcion.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-22", name: "Caleb Lomu", unit: "offense", position: "OT", height: "6' 6\"", weight: "304", stats: "24gs   2sa   2.1pres%", photo: "images/players/CalebLomu.jpg", logo: "images/logos/UtahLogo.png"},
    {id: "player-23", name: "Avieon Terrell", unit: "defense", position: "CB", height: "5' 11\"", weight: "180", stats: "125tcks   25pd   3ints", photo: "images/players/AvieonTerrell.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-24", name: "Caleb Banks", unit: "defense", position: "IDL", height: "6' 6\"", weight: "330", stats: "48tcks   6.5sacks   10.5tfls", photo: "images/players/CalebBanks.jpg", logo: "images/logos/FloridaLogo.png"},
    {id: "player-25", name: "Cashius Howell", unit: "defense", position: "EDGE", height: "6' 2\"", weight: "248", stats: "127tcks   27sacks   35.5tfls", photo: "images/players/CashiusHowell.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-26", name: "Emmanuel Pregnon", unit: "offense", position: "OG", height: "6' 5\"", weight: "318", stats: "37gs   2sa   1.06pres%", photo: "images/players/EmmanuelPregnon.jpg", logo: "images/logos/OregonLogo.png"},
    {id: "player-27", name: "TJ Parker", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "265", stats: "126tcks   21.5sacks   41.5tfls", photo: "images/players/TJParker.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-28", name: "Ty Simpson", unit: "offense", position: "QB", height: "6' 2\"", weight: "208", stats: "64.5cmp%   3984yds   28tds   5ints", photo: "images/players/TySimpson.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-29", name: "Kadyn Proctor", unit: "offense", position: "OT", height: "6' 7\"", weight: "366", stats: "38gs   16sa   3.18pres%", photo: "images/players/KadynProctor.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-30", name: "Ja'Kobi Lane", unit: "offense", position: "WR", height: "6' 4\"", weight: "200", stats: "99recs   1364yds   18tds", photo: "images/players/JaKobiLane.jpg", logo: "images/logos/USCLogo.png"},
    {id: "player-31", name: "Denzel Boston", unit: "offense", position: "WR", height: "6' 4\"", weight: "209", stats: "132recs   1781yds   20tds", photo: "images/players/DenzelBoston.jpg", logo: "images/logos/WashingtonLogo.png"},
    {id: "player-32", name: "Jakobe Thomas", unit: "defense", position: "S", height: "6' 2\"", weight: "200", stats: "199tcks   16pd   9ints", photo: "images/players/JakobeThomas.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-33", name: "Kayden McDonald", unit: "defense", position: "IDL", height: "6' 3\"", weight: "326", stats: "85tcks   3sacks   11tfls", photo: "images/players/KaydenMcDonald.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-34", name: "Colton Hood", unit: "defense", position: "CB", height: "6' 0\"", weight: "195", stats: "77tcks   14pd   3ints", photo: "images/players/ColtonHood.jpg", logo: "images/logos/TennesseeLogo.png"},
    {id: "player-35", name: "Brandon Cisse", unit: "defense", position: "CB", height: "6' 0\"", weight: "190", stats: "65tcks   10pd   2ints", photo: "images/players/BrandonCisse.jpg", logo: "images/logos/SouthCarolinaLogo.png"},
    {id: "player-36", name: "Anthony Hill Jr.", unit: "defense", position: "LB", height: "6' 3\"", weight: "238", stats: "249tcks   31.5tfls   17sacks   3ints", photo: "images/players/AnthonyHill.jpg", logo: "images/logos/TexasLogo.png"},
    {id: "player-37", name: "Chris Brazzell II", unit: "offense", position: "WR", height: "6' 5\"", weight: "200", stats: "136recs   2072yds   16tds", photo: "images/players/ChrisBrazzell.jpg", logo: "images/logos/TennesseeLogo.png"},
    {id: "player-38", name: "Isaiah World", unit: "offense", position: "OT", height: "6' 8\"", weight: "318", stats: "49gs   15sa   2.18pres%", photo: "images/players/IsaiahWorld.jpg", logo: "images/logos/OregonLogo.png"},
    {id: "player-39", name: "Jake Slaughter", unit: "offense", position: "C", height: "6' 4\"", weight: "303", stats: "33gs   4sa   1.5pres%", photo: "images/players/JakeSlaughter.jpg", logo: "images/logos/FloridaLogo.png"},
    {id: "player-40", name: "Romello Height", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "240", stats: "111tcks   16.5sacks   27tfls", photo: "images/players/RomelloHeight.jpg", logo: "images/logos/TexasTechLogo.png"},
    {id: "player-41", name: "Christen Miller", unit: "defense", position: "IDL", height: "6' 4\"", weight: "305", stats: "64tcks   4sacks   11.5tfls", photo: "images/players/ChristenMiller.jpg", logo: "images/logos/GeorgiaLogo.png"},
    {id: "player-42", name: "Connor Lew", unit: "offense", position: "C", height: "6' 3\"", weight: "300", stats: "25gs   3sa   0.5pres%", photo: "images/players/ConnorLew.jpg", logo: "images/logos/AuburnLogo.png"},
    {id: "player-43", name: "Jonah Coleman", unit: "offense", position: "RB", height: "5' 9\"", weight: "228", stats: "5.5ypc   3892yds   37tds", photo: "images/players/JonahColeman.jpg", logo: "images/logos/WashingtonLogo.png"},
    {id: "player-44", name: "Germie Bernard", unit: "offense", position: "WR", height: "6' 1\"", weight: "204", stats: "155recs   2203yds   13tds", photo: "images/players/GermieBernard.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-45", name: "Kamari Ramsey", unit: "defense", position: "S", height: "6' 0\"", weight: "205", stats: "132tcks   11pd   2ints", photo: "images/players/KamariRamsey.jpg", logo: "images/logos/USCLogo.png"},
    {id: "player-46", name: "Dontay Corleone", unit: "defense", position: "IDL", height: "6' 1\"", weight: "335", stats: "123tcks   9.5sacks   17tfls", photo: "images/players/DontayCorleone.jpg", logo: "images/logos/CincinnatiLogo.png"},
    {id: "player-47", name: "Antonio Williams", unit: "offense", position: "WR", height: "5' 11\"", weight: "190", stats: "207recs   2320yds   21tds", photo: "images/players/AntonioWilliams.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-48", name: "AJ Haulcy", unit: "defense", position: "S", height: "6' 0\"", weight: "222", stats: "346tcks   17pd   10ints", photo: "images/players/AJHaulcy.jpg", logo: "images/logos/LSULogo.png"},
    {id: "player-49", name: "Dani Dennis-Sutton", unit: "defense", position: "EDGE", height: "6' 5\"", weight: "265", stats: "127tcks   23.5sacks   34.5tfls", photo: "images/players/DaniDennisSutton.jpg", logo: "images/logos/PennStateLogo.png"},
    {id: "player-50", name: "R Mason Thomas", unit: "defense", position: "EDGE", height: "6' 2\"", weight: "249", stats: "65tcks   17sacks   25.5tfls", photo: "images/players/RMasonThomas.jpg", logo: "images/logos/OklahomaLogo.png"},
    {id: "player-51", name: "Joshua Josephs", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "240", stats: "104tcks   9.5sacks   22tfls", photo: "images/players/JoshuaJosephs.jpg", logo: "images/logos/TennesseeLogo.png"},
    {id: "player-52", name: "Dillon Thieneman", unit: "defense", position: "S", height: "6' 0\"", weight: "205", stats: "293tcks   13pds   8ints", photo: "images/players/DillonThieneman.jpg", logo: "images/logos/OregonLogo.png"},
    {id: "player-53", name: "Garrett Nussmeier", unit: "offense", position: "QB", height: "6' 1\"", weight: "205", stats: "64cmp%   7699yds   52tds   24ints", photo: "images/players/GarrettNussmeier.jpg", logo: "images/logos/LSULogo.png"},
    {id: "player-54", name: "LT Overton", unit: "defense", position: "EDGE", height: "6' 5\"", weight: "278", stats: "132tcks   7sacks   12tfls", photo: "images/players/LTOverton.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-55", name: "Gennings Dunker", unit: "offense", position: "OT", height: "6' 5\"", weight: "315", stats: "40gs   10sa   3.8pres%", photo: "images/players/GenningsDunker.jpg", logo: "images/logos/IowaLogo.png"},
    {id: "player-56", name: "Taurean York", unit: "defense", position: "LB", height: "5' 10\"", weight: "227", stats: "229tcks   25.5tfls   6.5sacks", photo: "images/players/TaureanYork.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-57", name: "Michael Taaffe", unit: "defense", position: "S", height: "6' 0\"", weight: "189", stats: "221tcks   14pd   7ints", photo: "images/players/MichaelTaaffe.jpg", logo: "images/logos/TexasLogo.png"},
    {id: "player-58", name: "Elijah Sarratt", unit: "offense", position: "WR", height: "6' 2\"", weight: "209", stats: "232recs   3575yds   42tds", photo: "images/players/ElijahSarratt.jpg", logo: "images/logos/IndianaLogo.png"},
    {id: "player-59", name: "Darrell Jackson Jr.", unit: "defense", position: "IDL", height: "6' 5\"", weight: "337", stats: "129tcks   7.5sacks   12tfls", photo: "images/players/DarrellJackson.jpg", logo: "images/logos/FloridaStateLogo.png"},
    {id: "player-60", name: "Deontae Lawson", unit: "defense", position: "LB", height: "6' 2\"", weight: "228", stats: "283tcks   19tfls   6.5sacks", photo: "images/players/DeontaeLawson.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-61", name: "Daylen Everette", unit: "defense", position: "CB", height: "6' 1\"", weight: "190", stats: "149tcks   17pd   5ints", photo: "images/players/DaylenEverette.jpg", logo: "images/logos/GeorgiaLogo.png"},
    {id: "player-62", name: "Will Lee III", unit: "defense", position: "CB", height: "6' 1\"", weight: "189", stats: "134tcks   24pd   4ints", photo: "images/players/WillLee.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-63", name: "Eli Stowers", unit: "offense", position: "TE", height: "6' 4\"", weight: "235", stats: "146recs   1773yds   11tds", photo: "images/players/EliStowers.jpg", logo: "images/logos/VanderbiltLogo.png"},
    {id: "player-64", name: "Jaeden Roberts", unit: "offense", position: "OG", height: "6' 5\"", weight: "327", stats: "24gs   2sa   0pres%", photo: "images/players/JaedenRoberts.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-65", name: "Joe Royer", unit: "offense", position: "TE", height: "6' 5\"", weight: "250", stats: "83recs   962yds   7tds", photo: "images/players/JoeRoyer.jpg", logo: "images/logos/CincinnatiLogo.png"},
    {id: "player-66", name: "Keith Abney II", unit: "defense", position: "CB", height: "6' 0\"", weight: "190", stats: "98tcks   21pd   6ints", photo: "images/players/KeithAbney.jpg", logo: "images/logos/ArizonaStateLogo.png"},
    {id: "player-67", name: "Keionte Scott", unit: "defense", position: "CB", height: "6' 0\"", weight: "192", stats: "174tcks   13pd   3ints", photo: "images/players/KeionteScott.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-68", name: "Zakee Wheatley", unit: "defense", position: "S", height: "6' 2\"", weight: "200", stats: "222tcks   6pd   6ints", photo: "images/players/ZakeeWheatley.jpg", logo: "images/logos/PennStateLogo.png"},
    {id: "player-69", name: "Brian Parker II", unit: "offense", position: "OG", height: "6' 5\"", weight: "300", stats: "33gs   4sa   4.2pres%", photo: "images/players/BrianParker.jpg", logo: "images/logos/DukeLogo.png"},
    {id: "player-70", name: "Domonique Orange", unit: "defense", position: "IDL", height: "6' 4\"", weight: "325", stats: "66tcks   1sack   7tfls", photo: "images/players/DomoniqueOrange.jpg", logo: "images/logos/IowaStateLogo.png"},
    {id: "player-71", name: "Julian Neal", unit: "defense", position: "CB", height: "6' 2\"", weight: "200", stats: "99tcks   17pd   4ints", photo: "images/players/JulianNeal.jpg", logo: "images/logos/ArkansasLogo.png"},
    {id: "player-72", name: "Malik Muhammad", unit: "defense", position: "CB", height: "6' 0\"", weight: "188", stats: "98tcks   16pd   3ints", photo: "images/players/MalikMuhammad.jpg", logo: "images/logos/TexasLogo.png"},
    {id: "player-73", name: "Malachi Fields", unit: "offense", position: "WR", height: "6' 4\"", weight: "223", stats: "165recs   2479yds   16tds", photo: "images/players/MalachiFields.jpg", logo: "images/logos/NotreDameLogo.png"},
    {id: "player-74", name: "Carson Beck", unit: "offense", position: "QB", height: "6' 4\"", weight: "220", stats: "69.7cmp%   11493yds   87tds   31ints", photo: "images/players/CarsonBeck.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-75", name: "Zion Young", unit: "defense", position: "EDGE", height: "6' 5\"", weight: "262", stats: "131tcks   11.5sacks   28.5tfls", photo: "images/players/ZionYoung.jpg", logo: "images/logos/MissouriLogo.png"},
    {id: "player-76", name: "Jake Golday", unit: "defense", position: "LB", height: "6' 4\"", weight: "240", stats: "163tcks   13tfls   5sacks", photo: "images/players/JakeGolday.jpg", logo: "images/logos/CincinnatiLogo.png"},
    {id: "player-77", name: "Caleb Tiernan", unit: "offense", position: "OT", height: "6' 7\"", weight: "325", stats: "43gs   9sa   3pres%", photo: "images/players/CalebTiernan.jpg", logo: "images/logos/NorthwesternLogo.png"},
    {id: "player-78", name: "Austin Barber", unit: "offense", position: "OT", height: "6' 6\"", weight: "314", stats: "38gs   10sa   4.25pres%", photo: "images/players/AustinBarber.jpg", logo: "images/logos/FloridaLogo.png"},
    {id: "player-79", name: "Skyler Bell", unit: "offense", position: "WR", height: "6' 0\"", weight: "185", stats: "220recs   2893yds   24tds", photo: "images/players/SkylerBell.jpg", logo: "images/logos/UConnLogo.png"},
    {id: "player-80", name: "Drew Shelton", unit: "offense", position: "OT", height: "6' 5\"", weight: "305", stats: "34gs   3sa   5.5pres%", photo: "images/players/DrewShelton.jpg", logo: "images/logos/PennStateLogo.png"},
    {id: "player-81", name: "Chandler Rivers", unit: "defense", position: "CB", height: "5' 10\"", weight: "185", stats: "223tcks   29pd   7ints", photo: "images/players/ChandlerRivers.jpg", logo: "images/logos/DukeLogo.png"},
    {id: "player-82", name: "Emmett Johnson", unit: "offense", position: "RB", height: "5' 11\"", weight: "200", stats: "5.4ypc   3162yds   20tds", photo: "images/players/EmmettJohnson.jpg", logo: "images/logos/NebraskaLogo.png"},
    {id: "player-83", name: "Nicholas Singleton", unit: "offense", position: "RB", height: "6' 0\"", weight: "224", stats: "5.6ypc   4448yds   54tds", photo: "images/players/NicholasSingleton.jpg", logo: "images/logos/PennStateLogo.png"},
    {id: "player-84", name: "Cade Klubnik", unit: "offense", position: "QB", height: "6' 2\"", weight: "210", stats: "64cmp%   10123yds   73tds   24ints", photo: "images/players/CadeKlubnik.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-85", name: "Genesis Smith", unit: "defense", position: "S", height: "6' 2\"", weight: "202", stats: "165tcks   14pd   5ints", photo: "images/players/GenesisSmith.jpg", logo: "images/logos/ArizonaLogo.png"},
    {id: "player-86", name: "Anthony Lucas", unit: "defense", position: "EDGE", height: "6' 5\"", weight: "285", stats: "73tcks   3sacks   8tfls", photo: "images/players/AnthonyLucas.jpg", logo: "images/logos/USCLogo.png"},
    {id: "player-87", name: "Diego Pavia", unit: "offense", position: "QB", height: "5' 11\"", weight: "207", stats: "62.2cmp%   10255yds   88tds   27ints", photo: "images/players/DiegoPavia.jpg", logo: "images/logos/VanderbiltLogo.png"},
    {id: "player-88", name: "Gabe Jacas", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "275", stats: "183tcks   27sacks   35.5tfls", photo: "images/players/GabeJacas.jpg", logo: "images/logos/IllinoisLogo.png"},
    {id: "player-89", name: "Harold Perkins Jr.", unit: "defense", position: "LB", height: "6' 1\"", weight: "222", stats: "220tcks   35.5tfls   17sacks", photo: "images/players/HaroldPerkins.jpg", logo: "images/logos/LSULogo.png"},
    {id: "player-90", name: "Kaytron Allen", unit: "offense", position: "RB", height: "5' 11\"", weight: "217", stats: "5.4ypc   4670yds   43tds", photo: "images/players/KaytronAllen.jpg", logo: "images/logos/PennStateLogo.png"},
    {id: "player-91", name: "Jack Endries", unit: "offense", position: "TE", height: "6' 4\"", weight: "240", stats: "124recs   1377yds   7tds", photo: "images/players/JackEndries.jpg", logo: "images/logos/TexasLogo.png"},
    {id: "player-92", name: "Tyreak Sapp", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "272", stats: "125tcks   10sacks   21.5tfls", photo: "images/players/TyreakSapp.jpg", logo: "images/logos/FloridaLogo.png"},
    {id: "player-93", name: "Deion Burks", unit: "offense", position: "WR", height: "5' 9\"", weight: "188", stats: "151recs   1669yds   14tds", photo: "images/players/DeionBurks.jpg", logo: "images/logos/OklahomaLogo.png"},
    {id: "player-94", name: "Emmanuel McNeil-Warren", unit: "defense", position: "S", height: "6' 2\"", weight: "202", stats: "212tcks   13pd   5ints", photo: "images/players/EmmanuelMcNeilWarren.jpg", logo: "images/logos/ToledoLogo.png"},
    {id: "player-95", name: "Bishop Fitzgerald", unit: "defense", position: "S", height: "5' 11\"", weight: "205", stats: "148tcks   14pd   10ints", photo: "images/players/BishopFitzgerald.jpg", logo: "images/logos/USCLogo.png"},
    {id: "player-96", name: "Mikail Kamara", unit: "defense", position: "EDGE", height: "6' 1\"", weight: "265", stats: "144tcks   23.5sacks   45tfls", photo: "images/players/MikailKamara.jpg", logo: "images/logos/IndianaLogo.png"},
    {id: "player-97", name: "Domani Jackson", unit: "defense", position: "CB", height: "6' 1\"", weight: "196", stats: "123tcks   12pd   2ints", photo: "images/players/DomaniJackson.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-98", name: "Chris Johnson", unit: "defense", position: "CB", height: "6' 0\"", weight: "185", stats: "148tcks   11pd   6ints", photo: "images/players/ChrisJohnson.jpg", logo: "images/logos/SanDiegoStateLogo.png"},
    {id: "player-99", name: "Zachariah Branch", unit: "offense", position: "WR", height: "5' 10\"", weight: "180", stats: "159recs   1634yds   9tds", photo: "images/players/ZachariahBranch.jpg", logo: "images/logos/GeorgiaLogo.png"},
    {id: "player-100", name: "Jalon Kilgore", unit: "defense", position: "S", height: "6' 1\"", weight: "211", stats: "178tcks   21pd   8ints", photo: "images/players/JalonKilgore.jpg", logo: "images/logos/SouthCarolinaLogo.png"},
    {id: "player-101", name: "Jaishawn Barham", unit: "defense", position: "LB", height: "6' 3\"", weight: "243", stats: "193tcks   23tfls   12sacks", photo: "images/players/JaishawnBarham.jpg", logo: "images/logos/MichiganLogo.png"},
    {id: "player-102", name: "Tacario Davis", unit: "defense", position: "CB", height: "6' 4\"", weight: "200", stats: "95tcks   26pd   3ints", photo: "images/players/TacarioDavis.jpg", logo: "images/logos/WashingtonLogo.png"},
    {id: "player-103", name: "Bryce Lance", unit: "offense", position: "WR", height: "6' 3\"", weight: "209", stats: "127recs   2139yds   25tds", photo: "images/players/BryceLance.jpg", logo: "images/logos/NorthDakotaStateLogo.png"},
    {id: "player-104", name: "Chase Bisontis", unit: "offense", position: "OG", height: "6' 5\"", weight: "315", stats: "33gs   5sa   3.3pres%", photo: "images/players/ChaseBisontis.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-105", name: "Parker Brailsford", unit: "offense", position: "C", height: "6' 2\"", weight: "290", stats: "40gs   1sa   3.22pres%", photo: "images/players/ParkerBrailsford.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-106", name: "Jadarian Price", unit: "offense", position: "RB", height: "5' 11\"", weight: "209", stats: "6ypc   1854yds   24tds", photo: "images/players/JadarianPrice.jpg", logo: "images/logos/NotreDameLogo.png"},
    {id: "player-107", name: "Blake Miller", unit: "offense", position: "OT", height: "6' 6\"", weight: "315", stats: "54gs   8sa   0.6pres%", photo: "images/players/BlakeMiller.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-108", name: "Akheem Mesidor", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "280", stats: "205tcks   33.5sacks   50.5tfls", photo: "images/players/AkheemMesidor.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-109", name: "Michael Trigg", unit: "offense", position: "TE", height: "6' 4\"", weight: "240", stats: "108recs   1419yds   14tds", photo: "images/players/MichaelTrigg.jpg", logo: "images/logos/BaylorLogo.png"},
    {id: "player-110", name: "Jude Bowry", unit: "offense", position: "OT", height: "6' 5\"", weight: "311", stats: "23gs   2sa   N/A", photo: "images/players/JudeBowry.jpg", logo: "images/logos/BostonCollegeLogo.png"},
    {id: "player-111", name: "Demond Claiborne", unit: "offense", position: "RB", height: "5' 10\"", weight: "195", stats: "4.7ypc   3023yds   28tds", photo: "images/players/DemondClaiborne.jpg", logo: "images/logos/WakeForestLogo.png"},
    {id: "player-112", name: "Keylan Rutledge", unit: "offense", position: "OG", height: "6' 4\"", weight: "320", stats: "42gs   7sa   1.25pres%", photo: "images/players/KeylanRutledge.jpg", logo: "images/logos/GeorgiaTechLogo.png"},
    {id: "player-113", name: "JC Davis", unit: "offense", position: "OT", height: "6' 5\"", weight: "320", stats: "49gs   8sacks   3.6pres%", photo: "images/players/JCDavis.jpg", logo: "images/logos/IllinoisLogo.png"},
    {id: "player-114", name: "Justin Joly", unit: "offense", position: "TE", height: "6' 3\"", weight: "251", stats: "166recs   1978yds   15tds", photo: "images/players/JustinJoly.jpg", logo: "images/logos/NCStateLogo.png"},
    {id: "player-115", name: "Logan Jones", unit: "offense", position: "C", height: "6' 3\"", weight: "302", stats: "50gs   4sa   1.5pres%", photo: "images/players/LoganJones.jpg", logo: "images/logos/IowaLogo.png"},
    {id: "player-116", name: "Eric Rivers", unit: "offense", position: "WR", height: "5' 11\"", weight: "180", stats: "140recs   2173yds   16tds", photo: "images/players/EricRivers.jpg", logo: "images/logos/GeorgiaTechLogo.png"},
    {id: "player-117", name: "Ar'maj Reed-Adams", unit: "offense", position: "OG", height: "6' 5\"", weight: "325", stats: "40gs   3sa   0pres%", photo: "images/players/ArmajReedAdams.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-118", name: "Mike Washington Jr.", unit: "offense", position: "RB", height: "6' 2\"", weight: "223", stats: "5ypc   3384yds   29tds", photo: "images/players/MikeWashington.jpg", logo: "images/logos/ArkansasLogo.png"},
    {id: "player-119", name: "Nic Anderson", unit: "offense", position: "WR", height: "6' 4\"", weight: "208", stats: "50recs   904yds   12tds", photo: "images/players/NicAnderson.jpg", logo: "images/logos/LSULogo.png"},
    {id: "player-120", name: "Derrick Moore", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "260", stats: "95tcks   21sacks   24.5tfls", photo: "images/players/DerrickMoore.jpg", logo: "images/logos/MichiganLogo.png"},
    {id: "player-121", name: "Skyler Gill-Howard", unit: "defense", position: "IDL", height: "6' 1\"", weight: "290", stats: "88tcks   6.5sacks   14.5tfls", photo: "images/players/SkylerGillHoward.jpg", logo: "images/logos/TexasTechLogo.png"},
    {id: "player-122", name: "Chase Roberts", unit: "offense", position: "WR", height: "6' 4\"", weight: "210", stats: "170recs   2586yds   18tds", photo: "images/players/ChaseRoberts.jpg", logo: "images/logos/BYULogo.png"},
    {id: "player-123", name: "Tim Keenan III", unit: "defense", position: "IDL", height: "6' 2\"", weight: "320", stats: "95tcks   5.5sacks   12.5tfls", photo: "images/players/TimKeenan.jpg", logo: "images/logos/AlabamaLogo.png"},
    {id: "player-124", name: "DeMonte Capehart", unit: "defense", position: "IDL", height: "6' 5\"", weight: "315", stats: "72tcks   3sacks   13.5tfls", photo: "images/players/DeMonteCapehart.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-125", name: "Drew Allar", unit: "offense", position: "QB", height: "6' 5\"", weight: "235", stats: "63.2cmp%   7402yds   61tds   13ints", photo: "images/players/DrewAllar.jpg", logo: "images/logos/PennStateLogo.png"},
    {id: "player-126", name: "Kage Casey", unit: "offense", position: "OT", height: "6' 5\"", weight: "316", stats: "41gs   7sa   3.2pres%", photo: "images/players/KageCasey.jpg", logo: "images/logos/BoiseStateLogo.png"},
    {id: "player-127", name: "Malachi Lawrence", unit: "defense", position: "EDGE", height: "6' 4\"", weight: "250", stats: "72tcks   20sacks   28tfls", photo: "images/players/MalachiLawrence.jpg", logo: "images/logos/UCFLogo.png"},
    {id: "player-128", name: "Jalen Stroman", unit: "defense", position: "S", height: "6' 1\"", weight: "199", stats: "149tcks   7pd   1int", photo: "images/players/JalenStroman.jpg", logo: "images/logos/NotreDameLogo.png"},
    {id: "player-129", name: "Max Iheanachor", unit: "offense", position: "OT", height: "6' 6\"", weight: "330", stats: "32gs   0sa   3.09pres%", photo: "images/players/MaxIheanachor.jpg", logo: "images/logos/ArizonaStateLogo.png"},
    {id: "player-130", name: "Jacob Rodriguez", unit: "defense", position: "LB", height: "6' 1\"", weight: "230", stats: "317tcks   25.5tfls   6sacks", photo: "images/players/JacobRodriguez.jpg", logo: "images/logos/TexasTechLogo.png"},
    {id: "player-131", name: "J'Mari Taylor", unit: "offense", position: "RB", height: "5' 9\"", weight: "204", stats: "5.1ypc   3812yds   47tds", photo: "images/players/JMariTaylor.jpg", logo: "images/logos/VirginiaLogo.png"},
    {id: "player-132", name: "Tanner Koziol", unit: "offense", position: "TE", height: "6' 7\"", weight: "240", stats: "237recs   2234yds   24tds", photo: "images/players/TannerKoziol.jpg", logo: "images/logos/HoustonLogo.png"},
    {id: "player-133", name: "Kevin Coleman Jr.", unit: "offense", position: "WR", height: "5' 11\"", weight: "180", stats: "199recs   2536yds   12tds", photo: "images/players/KevinColeman.jpg", logo: "images/logos/MissouriLogo.png"},
    {id: "player-134", name: "Kyle Louis", unit: "defense", position: "LB", height: "6' 1\"", weight: "220", stats: "201tcks   25.5tfls   10sacks", photo: "images/players/KyleLouis.jpg", logo: "images/logos/PittLogo.png"},
    {id: "player-135", name: "Davison Igbinosun", unit: "defense", position: "CB", height: "6' 2\"", weight: "195", stats: "192tcks   25pd   4ints", photo: "images/players/DavisonIgbinosun.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-136", name: "Ted Hurst", unit: "offense", position: "WR", height: "6' 3\"", weight: "185", stats: "127recs   1965yds   15tds", photo: "images/players/TedHurst.jpg", logo: "images/logos/GeorgiaStateLogo.png"},
    {id: "player-137", name: "Connor Tollison", unit: "offense", position: "C", height: "6' 4\"", weight: "285", stats: "47gs   8sa   N/A", photo: "images/players/ConnorTollison.jpg", logo: "images/logos/MissouriLogo.png"},
    {id: "player-138", name: "Aaron Graves", unit: "defense", position: "IDL", height: "6' 5\"", weight: "295", stats: "122tcks   16.5sacks   25tfls", photo: "images/players/AaronGraves.jpg", logo: "images/logos/IowaLogo.png"},
    {id: "player-139", name: "Albert Regis", unit: "defense", position: "IDL", height: "6' 1\"", weight: "317", stats: "116tcks   3.5sacks   11tfls", photo: "images/players/AlbertRegis.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-140", name: "Aaron Anderson", unit: "offense", position: "WR", height: "5' 8\"", weight: "188", stats: "106recs   1341yds   5tds", photo: "images/players/AaronAnderson.jpg", logo: "images/logos/LSULogo.png"},
    {id: "player-141", name: "Lee Hunter", unit: "defense", position: "IDL", height: "6' 4\"", weight: "325", stats: "172tcks   7.5sacks   32tfls", photo: "images/players/LeeHunter.jpg", logo: "images/logos/TexasTechLogo.png"},
    {id: "player-142", name: "Lewis Bond", unit: "offense", position: "WR", height: "5' 11\"", weight: "190", stats: "213recs   2385yds   11tds", photo: "images/players/LewisBond.jpg", logo: "images/logos/BostonCollegeLogo.png"},
    {id: "player-143", name: "Josiah Trotter", unit: "defense", position: "LB", height: "6' 2\"", weight: "237", stats: "176tcks   17tfls   2.5sacks", photo: "images/players/JosiahTrotter.jpg", logo: "images/logos/MissouriLogo.png"},
    {id: "player-144", name: "Caden Curry", unit: "defense", position: "EDGE", height: "6' 3\"", weight: "260", stats: "111tcks   15.5sacks   25tfls", photo: "images/players/CadenCurry.jpg", logo: "images/logos/OhioStateLogo.png"},
    {id: "player-145", name: "Devin Moore", unit: "defense", position: "CB", height: "6' 3\"", weight: "198", stats: "64tcks   8pd   5ints", photo: "images/players/DevinMoore.jpg", logo: "images/logos/FloridaLogo.png"},
    {id: "player-146", name: "Trinidad Chambliss", unit: "offense", position: "QB", height: "6' 0\"", weight: "200", stats: "66.1cmp%  3937yds   22tds   3ints", photo: "images/players/TrinidadChambliss.jpg", logo: "images/logos/OleMissLogo.png"},
    {id: "player-147", name: "Treydan Stukes", unit: "defense", position: "CB", height: "6' 2\"", weight: "195", stats: "207tcks   26pd   7ints", photo: "images/players/TreydanStukes.jpg", logo: "images/logos/ArizonaLogo.png"},
    {id: "player-148", name: "Eli Raridon", unit: "offense", position: "TE", height: "6' 7\"", weight: "251", stats: "48recs   623yds   3tds", photo: "images/players/EliRaridon.jpg", logo: "images/logos/NotreDameLogo.png"},
    {id: "player-149", name: "Zane Durant", unit: "defense", position: "IDL", height: "6' 1\"", weight: "294", stats: "89tcks   10sacks   22tfls", photo: "images/players/ZaneDurant.jpg", logo: "images/logos/PennStateLogo.png"},
    {id: "player-150", name: "Lander Barton", unit: "defense", position: "LB", height: "6' 5\"", weight: "236", stats: "207tcks   17tfls   8sacks", photo: "images/players/LanderBarton.jpg", logo: "images/logos/UtahLogo.png"},
    {id: "player-151", name: "Oscar Delp", unit: "offense", position: "TE", height: "6' 5\"", weight: "245", stats: "70recs   854yds   9tds", photo: "images/players/OscarDelp.jpg", logo: "images/logos/GeorgiaLogo.png"},
    {id: "player-152", name: "CJ Daniels", unit: "offense", position: "WR", height: "6' 2\"", weight: "205", stats: "194recs   2929yds   28tds", photo: "images/players/CJDaniels.jpg", logo: "images/logos/MiamiLogo.png"},
    {id: "player-153", name: "Zxavian Harris", unit: "defense", position: "IDL", height: "6' 7\"", weight: "320", stats: "123tcks   5.5sacks   17.5tfls", photo: "images/players/ZxavianHarris.jpg", logo: "images/logos/OleMissLogo.png"},
    {id: "player-154", name: "Red Murdock", unit: "defense", position: "LB", height: "6' 3\"", weight: "240", stats: "364tcks   39.5tfls   9sacks", photo: "images/players/RedMurdock.jpg", logo: "images/logos/BuffaloLogo.png"},
    {id: "player-155", name: "Chris Adams", unit: "offense", position: "OG", height: "6' 5\"", weight: "277", stats: "39gs   6sa   N/A", photo: "images/players/ChrisAdams.jpg", logo: "images/logos/MemphisLogo.png"},
    {id: "player-156", name: "Matt Gulbin", unit: "offense", position: "C", height: "6' 4\"", weight: "312", stats: "35gs   1sa   N/A", photo: "images/players/MattGulbin.jpg", logo: "images/logos/MichiganStateLogo.png"},
    {id: "player-157", name: "Hezekiah Masses", unit: "defense", position: "CB", height: "6' 1\"", weight: "185", stats: "152tcks   24pd   7ints", photo: "images/players/HezekiahMasses.jpg", logo: "images/logos/CalLogo.png"},
    {id: "player-158", name: "Brenen Thompson", unit: "offense", position: "WR", height: "5' 9\"", weight: "170", stats: "84recs   1557yds   10tds", photo: "images/players/BrenenThompson.jpg", logo: "images/logos/MississippiStateLogo.png"},
    {id: "player-159", name: "Patrick Payton", unit: "defense", position: "EDGE", height: "6' 6\"", weight: "255", stats: "144tcks   17sacks   36.5tfls", photo: "images/players/PatrickPayton.jpg", logo: "images/logos/LSULogo.png"},
    {id: "player-160", name: "Aamil Wagner", unit: "offense", position: "OT", height: "6' 6\"", weight: "296", stats: "28gs   3sa   1.68pres%", photo: "images/players/AamilWagner.jpg", logo: "images/logos/NotreDameLogo.png"},
    {id: "player-161", name: "DJ Campbell", unit: "offense", position: "OG", height: "6' 3\"", weight: "321", stats: "42gs   10sa   4.1pres%", photo: "images/players/DJCampbell.jpg", logo: "images/logos/TexasLogo.png"},
    {id: "player-162", name: "Charles Demmings", unit: "defense", position: "CB", height: "6' 1\"", weight: "190", stats: "64tcks   26pd   8ints", photo: "images/players/CharlesDemmings.jpg", logo: "images/logos/StephenFAustinLogo.png"},
    {id: "player-163", name: "Bud Clark", unit: "defense", position: "S", height: "6' 2\"", weight: "185", stats: "215tcks   20pd   15ints", photo: "images/players/BudClark.jpg", logo: "images/logos/TCULogo.png"},
    {id: "player-164", name: "Fa'alili Fa'amoe", unit: "offense", position: "OT", height: "6' 5\"", weight: "317", stats: "36gs   8sa   N/A", photo: "images/players/FaaliliFaamoe.jpg", logo: "images/logos/WakeForestLogo.png"},
    {id: "player-165", name: "Dametrious Crownover", unit: "offense", position: "OT", height: "6' 7\"", weight: "336", stats: "27gs   3sa   4.9pres%", photo: "images/players/DametriousCrownover.jpg", logo: "images/logos/TexasA&MLogo.png"},
    {id: "player-166", name: "Arion Carter", unit: "defense", position: "LB", height: "6' 1\"", weight: "235", stats: "161tcks  13.5tfls   1.5sacks", photo: "images/players/ArionCarter.jpg", logo: "images/logos/TennesseeLogo.png"},
    {id: "player-167", name: "Max Llewellyn", unit: "defense", position: "EDGE", height: "6' 5\"", weight: "263", stats: "64tcks   14.5sacks   20.5tfls", photo: "images/players/MaxLlewellyn.jpg", logo: "images/logos/IowaLogo.png"},
    {id: "player-168", name: "Logan Fano", unit: "defense", position: "EDGE", height: "6' 5\"", weight: "249", stats: "93tcks   10.5sacks   18tfls", photo: "images/players/LoganFano.jpg", logo: "images/logos/UtahLogo.png"},
    {id: "player-169", name: "Devon Marshall", unit: "defense", position: "CB", height: "5' 11\"", weight: "200", stats: "143tcks   35pd   4ints", photo: "images/players/DevonMarshall.jpg", logo: "images/logos/NCStateLogo.png"},
    {id: "player-170", name: "Josh Cameron", unit: "offense", position: "WR", height: "6' 1\"", weight: "224", stats: "170recs   2236yds   19tds", photo: "images/players/JoshCameron.jpg", logo: "images/logos/BaylorLogo.png"},
    {id: "player-171", name: "Dae'Quan Wright", unit: "offense", position: "TE", height: "6' 4\"", weight: "255", stats: "113recs   1603yds   9tds", photo: "images/players/DaeQuanWright.jpg", logo: "images/logos/OleMissLogo.png"},
    {id: "player-172", name: "Adam Randall", unit: "offense", position: "RB", height: "6' 2\"", weight: "230", stats: "5ypc   1645yds   15tds", photo: "images/players/AdamRandall.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-173", name: "Marlin Klein", unit: "offense", position: "TE", height: "6' 6\"", weight: "250", stats: "38recs   364yds   1td", photo: "images/players/MarlinKlein.jpg", logo: "images/logos/MichiganLogo.png"},
    {id: "player-174", name: "VJ Payne", unit: "defense", position: "S", height: "6' 3\"", weight: "208", stats: "207tcks   9pd   4ints", photo: "images/players/VJPayne.jpg", logo: "images/logos/KansasStateLogo.png"},
    {id: "player-175", name: "John Michael Gyllenborg", unit: "offense", position: "TE", height: "6' 5\"", weight: "250", stats: "80recs   1023yds   7tds", photo: "images/players/JohnMichaelGyllenborg.jpg", logo: "images/logos/WyomingLogo.png"},
    {id: "player-176", name: "Tristan Leigh", unit: "offense", position: "OT", height: "6' 6\"", weight: "310", stats: "33gs   N/A   N/A", photo: "images/players/TristanLeigh.jpg", logo: "images/logos/ClemsonLogo.png"},
    {id: "player-177", name: "Eric McAlister", unit: "offense", position: "WR", height: "6' 3\"", weight: "205", stats: "169recs   3084yds   24tds", photo: "images/players/EricMcAlister.jpg", logo: "images/logos/TCULogo.png"},
    {id: "player-178", name: "Keyron Crawford", unit: "defense", position: "EDGE", height: "6' 4\"", weight: "255", stats: "116tcks   11.5sacks   24tfls", photo: "images/players/KeyronCrawford.jpg", logo: "images/logos/AuburnLogo.png"},
    {id: "player-179", name: "Taylen Green", unit: "offense", position: "QB", height: "6' 6\"", weight: "224", stats: "60.1cmp%   9662yds   59tds   35ints", photo: "images/players/TaylenGreen.jpg", logo: "images/logos/ArkansasLogo.png"},
    {id: "player-180", name: "Trey Zuhn III", unit: "offense", position: "OT", height: "6' 6\"", weight: "319", stats: "49gs   7sa   2.1pres%", photo: "images/players/TreyZuhn.jpg", logo: "images/logos/TexasA&MLogo.png"}
];

const positionsByUnit = {
    offense: ["QB", "RB", "WR", "TE", "OT", "OG", "C"],
    defense: ["EDGE", "IDL", "LB", "CB", "S"],
    special: ["K", "P", "LS"]
};

let selectedUnit = "offense";
let selectedPosition = null;
let searchQuery = "";
const placedPlayers = new Set();
const playerNotes = {};

const savedNotes = localStorage.getItem("playerNotes");
if (savedNotes) {
    Object.assign(playerNotes, JSON.parse(savedNotes));
}


function handleSearch(value) {
    searchQuery = value.toLowerCase();
    renderSidebarPlayers(selectedUnit, selectedPosition);
}

function selectUnit(unit) {
    selectedUnit = unit;
    selectedPosition = null;

    const positionContainer = document.getElementById("position-buttons");
    positionContainer.innerHTML = "";

    if (unit !== "all") {
        positionsByUnit[unit].forEach(pos => {
            const btn = document.createElement("button");
            btn.innerText = pos;
            btn.onclick = () => selectPosition(pos);
            positionContainer.appendChild(btn);
        });
    }

    renderSidebarPlayers(unit);
}

function selectPosition(position) {
    selectedPosition = position;
    renderSidebarPlayers(selectedUnit, position);
}

function renderSidebarPlayers(filterUnit = null, filterPosition = null) {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    players.forEach(p => {
        if (placedPlayers.has(p.id)) return;
        if (filterUnit && filterUnit !== "all" && p.unit !== filterUnit) return;
        if (filterPosition && p.position !== filterPosition) return;
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery)) return;

        const card = document.createElement("div");
        card.className = "player-card";
        card.draggable = true;
        card.id = p.id;
        card.ondragstart = drag;

        card.innerHTML = `
            <img src="${p.photo}" class="player-photo">
            <img src="${p.logo}" class="school_logo">
            <div class="player-info">
                <h3 class="player-name">${p.name}</h3>
                <p>${p.height} | ${p.weight} lbs</p>
                <p>${p.stats}</p>
            </div>
        `;

        playerList.appendChild(card);
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const card = ev.target.closest(".player-card");
    const playerId = card.dataset.playerId || card.id;
    ev.dataTransfer.setData("text/plain", playerId);
}

function dropIntoRound(ev) {
    ev.preventDefault();

    const playerId = ev.dataTransfer.getData("text/plain");

    let card =
        document.getElementById(playerId) ||
        document.querySelector(`.player-card[data-player-id="${playerId}"]`);

    if (!card) return;

    card.setAttribute("data-player-id", playerId);
    card.draggable = true;
    card.ondragstart = drag;

    placedPlayers.add(playerId);

    if (!card.querySelector(".remove-btn")) {
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.innerText = "X";

        removeBtn.onclick = () => {
            const boardCard = document.querySelector(
                `.rank-list .player-card[data-player-id="${playerId}"]`
            );
            if (!boardCard) return;

            boardCard.remove();
            placedPlayers.delete(playerId);

            renderSidebarPlayers(selectedUnit, selectedPosition);
            updateRanks();
        };

        card.appendChild(removeBtn);
    }

    const roundList = ev.currentTarget;
    const afterElement = getDragAfterElement(roundList, ev.clientY);

    if (afterElement == null) {
        roundList.appendChild(card);
    } else {
        roundList.insertBefore(card, afterElement);
    }

    updateRanks();
    if (selectedPosition) selectPosition(selectedPosition);
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".player-card")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY}).element;
}

function updateRanks() {
    const allRounds = document.querySelectorAll(".round");
    const boardData = {};

    allRounds.forEach(round => {
        const roundNumber = round.dataset.round;
        const playerIds = [...round.querySelectorAll(".player-card")].map(card =>
            card.dataset.playerId || card.id
        );
        boardData[roundNumber] = playerIds;
    });

    localStorage.setItem("bigBoardData", JSON.stringify(boardData));

    document.querySelectorAll(".rank-list .player-card").forEach((player, index) => {
        let rank = player.querySelector(".rank-number");
        if (!rank) {
            rank = document.createElement("span");
            rank.className = "rank-number";
            player.prepend(rank);
        }
        rank.innerText = index + 1;
    });
}

function dropBackToSidebar(ev) {
    ev.preventDefault();

    const playerId = ev.dataTransfer.getData("text/plain");

    if (!placedPlayers.has(playerId)) return;

    const boardCard = document.querySelector(
        `.rank-list .player-card[data-player-id="${playerId}"]`) ||
        document.getElementById(playerId);

    if (!boardCard) return;

    boardCard.remove();
    placedPlayers.delete(playerId);

    renderSidebarPlayers(selectedUnit, selectedPosition);
    updateRanks();
}

function hideSideBarPlayer(playerId) {
    const sidebarCard = document.getElementById(playerId);
    if (sidebarCard) sidebarCard.style.display = "none";
}

function showPlayerModal(player) {
    const modal = document.getElementById("player-modal");
    const profileCard = modal.querySelector(".profile-card");
    const notesArea = document.getElementById("player-notes");
    const saveBtn = document.getElementById("save-notes");

    profileCard.innerHTML = `
        <img src="${player.photo}" class="player-photo">
        <img src="${player.logo}" class="school_logo">
        <div class="player-info">
            <h3>${player.name}</h3>
            <p>${player.height} | ${player.weight} lbs</p>
            <p>${player.stats}</p>
        </div>
    `;

    notesArea.value = playerNotes[player.id] || "";

    saveBtn.onclick = () => {
        playerNotes[player.id] = notesArea.value;
        localStorage.setItem("playerNotes", JSON.stringify(playerNotes));
    };

    modal.style.display = "flex";
}

function loadBoard() {
    const savedData = localStorage.getItem("bigBoardData");
    if (!savedData) return;

    const boardData = JSON.parse(savedData);

    Object.keys(boardData).forEach(roundNumber => {
        const roundDiv = document.querySelector(`.round[data-round="${roundNumber}"] .rank-list`);
        if (!roundDiv) return;

        boardData[roundNumber].forEach(playerId => {
            const player = players.find(p => p.id === playerId);
            if (!player) return;

            const card = document.createElement("div");
            card.className = "player-card";
            card.draggable = true;
            card.dataset.playerId = player.id;
            card.ondragstart = drag;

            card.innerHTML = `
                <img src="${player.photo}" class="player-photo">
                <img src="${player.logo}" class="school_logo">
                <div class="player-info">
                    <h3 class="player-name">${player.name}</h3>
                    <p>${player.height} | ${player.weight} lbs</p>
                    <p>${player.stats}</p>
                </div>
            `;

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.innerText = "X";
            removeBtn.onclick = () => {
                card.remove();
                placedPlayers.delete(player.id);
                updateRanks();
                renderSidebarPlayers(selectedUnit, selectedPosition);
            };
            card.appendChild(removeBtn);

            roundDiv.appendChild(card);
            placedPlayers.add(player.id);
        });
    });

    updateRanks();
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("player-modal");
    const closeBtn = document.getElementById("modal-close");

    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    modal.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});

loadBoard();
selectUnit("all");

document.addEventListener("click", (e) => {
    const name = e.target.closest(".player-name");
    if (!name) return;

    const card = name.closest(".player-card");
    if (!card) return;

    const playerId = card.dataset.playerId || card.id;
    if (!playerId) return;

    const player = players.find(p => p.id === playerId);
    if (!player) return;

    showPlayerModal(player);
});
