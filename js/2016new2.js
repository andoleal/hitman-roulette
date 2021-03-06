// top of the history_past stack is the most recently displayed result
var history_past = [];
var redo_stack = [];

var suitStarts = [
  "Red Carpet",
  "Palace Garden",
  "Pile-Driver Barge",
  "Attic",
  "Undercover at IAGO Auction",
  "Main Square",
  "ICA Safe House",
  "Harbor",
  "Sapienza Ruins",
  "Main Square Tower",
  "Church Morgue",
  "City gates",
  "Promenade",
  "Bazaar Entrance",
  "Lamp Store Rooftop",
  "School Alley",
  "Consulate Parking Garage",
  "Consulate plaza",
  "Riverside Landing",
  "47's Suite",
  "West Bridge",
  "Old Orchard",
  "Southern Farm Perimeter",
  "Water Tower",
  "Infiltrating Along the Mountain Path",
  "Riverside Landing",
  "The Beach",
  "Undercover gear near helipad",
  "Event Entrance",
  "Dolphin Fountain",
  "Marina",
  "Stands",
  "Village Bus Stop",
  "Village Hostel",
  "Shaman's Hut",
  "Village Bar",
  "Main Street",
  "Train",
  "Boat",
  "Skywalk",
  "Taxi",
  "Chawls",
  "Whittleton Creek",
  "Harbor",
  "Chapel",
  "Keep",
  "Bank Entrance",
  "Steel Bridge",
  "Outside Chawl",
  "Resort Pier",
  "Shark Hut",
  "Resort Pool",
  "Atrium Lobby",
  "Main Road",
  "Behind Mansion",
  "Main Road (family meeting)",
  "Behind Mansion (family meeting)",
  "Radio Tower",
  "Bus Stop",
  "Train Station",
  "River-side Walkway",
  "Balcony"
];

var disguiseExits = ["Ambulance", "Trash Truck"];

var koExits = ["Merchant's Car", "Rico's Car", "Local's Car", "Roadwork Gate"];

var generic = {
  kills: [
    "Firearm",
    "Melee Weapon (Small)",
    "Melee Weapon (Large)",
    "Accident",
    "Explosion",
    "Poison"
  ],
  firearms: [
    "Pistol",
    "Silenced Pistol",
    "Sniper Rifle",
    "Explosive (Weapon)",
    "Assault Rifle",
    "SMG",
    "Loud Shotgun"
  ],
  accidents: [
    "Drowning",
    "Falling Object",
    "Fall",
    "Fire",
    "Electricity",
    "Explosion (Accident)"
  ],
  // HITMAN 2016
  unlocks: [
	"Jaeger 7 Sniper Rifle (loud)",
	"ICA Silverballer Pistol",
	"TAC-SMG (loud)",
	"HWK21 Covert Pistol",
	"ICA Remote Explosive",
	"ICA Proximity Explosive",
	"Napoleon Blownaparte",
	"Enram HV Shotgun",
	"Proximity Explosive Duck",
	"Jaeger 7 Covert Sniper Rifle",
	"The Iconator (explosive)",
	"Combat Knife",
	"Remote Explosive Duck",
	"Proximity CX Demo Block",
	"Janbiya (melee)",
	"Nna Obara's Machete",
	"ICA Explosive Phone",
	"Krugermeier Pistol",
	"RS-15 Assault Rifle",
	"Remote CX Demo Block",
	"Custom 5mm Pistol",
	"Shuriken",
	"Concealable Knife",
	"Sieger 300 Sniper Rifle",
	"Masamune (katana)",
	"Striker Pistol",
	"TAC-SMG Covert"
  ],
  // HITMAN 2
  unlocks2: [
	"Fragmentation Grenade",
	"Shashka A33 H",
	"Sacrificial Knife",
	"Bartoli 12G Short H",
	"Druzhina 34",
	"Rude Ruby",
	"Broadsword",
	"Measuring Tape",
	"Explosive Pen",
	"Fishing Line",
	"Ice Pick",
	"Piton (melee)",
	"Quickdraw"
  ]
};

var showstopper = {
  missionTitle: "The Showstopper",
  map: "https://www.hitmaps.com/games/hitman/paris/the-showstopper/professional",
  melee: [
    "Screwdriver",
    "Letter Opener",
    "Scissors",
    "Kitchen Knife",
    "Fiber Wire",
    "Fire Axe",
    "Battle Axe",
    "Saber",
    "Hatchet"
  ],
  meleeLocations: {
    Screwdriver: "Floor 1<br>- Outside of the dressing area<br>- Outside of the museum room<br>- In the room with the reporter and the Battle Axe<br>- Near the catwalk entrances<br>- Outside near the wall against IAGO entrance<br>- In the shed near the dressing area<br>- At the Novikov and Decker meeting spot<br>Floor 2<br>- Against Sheik's suite<br>- Against the fireworks detonator (over the catwalk)<br>Floor 3<br>- Near Dalia's office<br>- At the Attic starting location",
    Letter_Opener: "Floor 2<br>- Where Dalia and Victor come in case of 'Code 17'<br>- Sheik's suite<br>- In the room where one of the hoarders starts<br>- In the room next to the speedboat key room<br>Floor 3<br>- Dalia's office",
    Scissors: "Basement<br>- Security room<br>Floor 1<br>- 3 of them in the dressing area<br>- In the room against the bathroom with IAGO invitation<br>Floor 2<br>- In the second room in the Sheik's suite<br>Floor 3<br>- Dalia's bathroom<br>- Outside Dalia's office, on the balcony",
    Kitchen_Knife: "Basement<br>- In the kitchen<br>- In the canteen<br>Floor 1<br>- In the kitchen and behind the bar<br>- In front of the shed near the dressing area<br>Floor 2<br>- Where the blue waiters are cooking sushi or whatever",
    Fiber_Wire: "",
    Fire_Axe: "Basement<br>- Near the basement entrance that's close to the kitchen<br>- In the locker room<br>- In the hallway outside of the locker room<br>Floor 1<br>- In the corner near the end of the catwalk<br>- Near the entrance to the kitchen<br>- In the shed outside of the dressing area<br>- Near the fireworks detonator<br>- In the opposite corner of the previous one<br>- Outside of the room where one of the hoarders starts<br>Floor 3<br>- In the attic, outside of the room with Vampire Magician disguise",
    Battle_Axe: "Floor 1<br>- In the room with the reporter<br>- In a display case in the museum<br>- In the dressing area",
    Saber: "Floor 1<br>- In one of the display cases in the museum<br>- In the dressing area",
    Hatchet: "Floor 1<br>- Outside in the side garden against the museum<br>- Near the shed near IAGO entrance"
  },
  targetList: ["Viktor Novikov", "Dalia Margolis"],
  contractTargets: [
    "Fashion designer Sebastian Sato",
    "Model Helmut Kruger",
    "FSB agent Max Decker",
    "Sheik Salman Al-Ghazali",
    "Reporter - Liza McKenzie",
    "Dalia's secretary - Hailey Brennan",
    "Viktor's bodyguard - Kurt Donovan",
    "Dalia's assistant - Sophus Fatale"
  ],
  entry: [
    "Red Carpet",
    "Palace Garden",
    "Pile-Driver Barge",
    "Attic",
    "Undercover in Kitchen",
    "Undercover in Locker Room",
    "Undercover at IAGO Auction",
    "Undercover in AV Center",
    "Undercover in Dressing Area"
  ],
  exit: ["Front Gates", "Kitchen", "Helicopter", "Speedboat"],
  disguises: [
    "47 in his Suit",
    "Auction Staff",
    "Chef",
    "CICADA Bodyguard",
    "Event Crew",
    "Palace Staff",
    "Security Guard",
    "Stylist",
    "Helmut Kruger",
    "Sheikh",
    "Vampire Magician"
  ]
};

var hh = {
  missionTitle: "Holiday Hoarders",
  map: showstopper.map,
  melee: [
    "Screwdriver",
    "Letter Opener",
    "Scissors",
    "Kitchen Knife",
    "Fiber Wire",
    "Fire Axe",
    "Battle Axe",
    "Saber",
    "Hatchet",
    "Holiday Fireaxe",
    "Shuriken",
    "Circumcision Knife"
  ],
  meleeLocations: showstopper.meleeLocations,
  targetList: ['Harry "Smokey" Bagnato', 'Marv "Slick" Gonif'],
  contractTargets: showstopper.contractTargets,
  entry: [
    "Red Carpet",
    "Palace Garden",
    "Pile-Driver Barge",
    "Attic",
    "Undercover in Kitchen",
    "Undercover in Locker Room",
    "Undercover at IAGO Auction",
    "Undercover in AV Center",
    "Undercover in Dressing Area"
  ],
  exit: ["Front Gates", "Kitchen", "Helicopter", "Speedboat", "Chimney"],
  disguises: [
    "47 in his Suit",
    "Auction Staff",
    "Chef",
    "CICADA Bodyguard",
    "Event Crew",
    "Palace Staff",
    "Security Guard",
    "Stylist",
    "Helmut Kruger",
    "Sheikh",
    "Vampire Magician"
  ]
};

var wot = {
  missionTitle: "World of Tomorrow",
  map: "https://www.hitmaps.com/games/hitman/sapienza/world-of-tomorrow/professional",
  melee: [
    "Battle Axe",
    "Old Axe",
    "Katana",
    "Fire Axe",
    "Saber",
    "Amputation Knife",
    "Circumcision Knife",
    "Combat Knife",
    "Hatchet",
    "Kitchen Knife",
    "Letter Opener",
    "Screwdriver",
    "Fiber Wire"
  ],
  meleeLocations: {
	Battle_Axe: "- In the ruins",
    Old_Axe: "- In the shed behind the church",
    Katana: "- Near the safe in the attic",
    Fire_Axe: "Field lab<br>- Near the camera recordings, in the building<br>- Behind the first lab building<br>Mansion<br>- Near both of the lab entrances in the mansion<br>- Near the piano on the 1st floor, go through the door near the fire poker<br><br>- In the room with camera recordings above the ice cream shop",
    Saber: "- Up the guarded stairs near the ice cream shop<br>- In the mansion near the grammophone",
    Amputation_Knife: "- Near Plague Doctor suit",
    Circumcision_Knife: "- Near Plague Doctor suit",
    Combat_Knife: "- In the lab area, between the lab building and the other building<br>- Brother Akram's apartment kitchen",
    Hatchet: "- In the building for gardeners",
    Kitchen_Knife: "- In the morgue<br>- Mansion staff locker room<br>- On the second floor of the apartment against the hairdresser's shop<br>- Mansion kitchen<br>- ICA safehouse<br>- In the ice cream shop",
    Letter_Opener: "- Francesca's office desk",
    Screwdriver: "- 2 of them in the lab cave, near the building with the virus<br>- In the tunnel where Francesca meets the detective, in the room with a lot of sinks<br>- In the shed behind the church<br>- Near the grave of Caruso's mother<br>- In the building for gardeners<br>- In the room with camera recordings, near 'mansion security' start<br>- Same as above, but against the door of that room",
    Fiber_Wire: ""
  },
  targetList: ["Silvio Caruso", "Francesca De Santis"],
  contractTargets: [
    "Butler Terenzio Endrizzi",
    "Golf coach Roberto Vargas",
    "Chef Marcello Ray",
    "Green plumber - Luigi Saltatore",
    "Dr. Oscar Lafayette",
    "Bohemian - Torres Piombo",
    "Private investigator - Sal Falcone",
    "Scientist with dongle - Viana Buccho",
    "Undertaker - Fabio Pavione",
    "Red plumber - Mario Saltatore"
  ],
  entry: [
    "Main Square",
    "ICA Safe House",
    "Harbor",
    "Sapienza Ruins",
    "Main Square Tower",
    "Church Morgue",
    "Undercover in Mansion Kitchen",
    "Undercover in Field Lab",
    "Undercover in Mansion Garden",
    "Undercover as Security Staff"
  ],
  exit: ["Car", "Speedboat (Pier)", "Plane", "Speedboat (Ruins)"],
  disguises: [
    "47 in his Suit",
    "Biolab Security",
    "Bodyguard",
    "Bohemian",
    "Butler",
    "Church Staff",
    "Cyclist",
    "Delivery Man",
    "Dr. Oscar Lafayette",
    "Gardener",
    "Green Plumber",
    "Hazmat Suit",
    "Housekeeper",
    "Kitchen Assistant",
    "Lab Technician",
    "Mansion Chef",
    "Mansion Security",
    "Mansion Staff",
    "Plague Doctor",
    "Priest",
    "Private Detective",
    "Red Plumber",
    "Roberto Vargas",
    "Store Clerk",
    "Street Performer",
    "Waiter"
  ]
};

var icon = {
  missionTitle: "The Icon",
  map: "https://www.hitmaps.com/games/hitman/sapienza/the-icon/standard",
  melee: [
    "Battle Axe",
    "Cleaver",
    "Fire Axe",
    "Knife",
    "Screwdriver",
    "Fiber Wire"
  ],
  meleeLocations: {
	Battle_Axe: "- Bosco's RV",
    Cleaver: "- Ice cream shop building, second floor",
    Fire_Axe: "- In the room with camera recordings above the ice cream shop",
    Knife: "- Rocco! Get down here!",
    Screwdriver: "- Set crew stand near Bosco's RV<br>- In the shop behind the above mentioned stand",
    Fiber_Wire: ""
  },
  targetList: ["Dino Bosco"],
  contractTargets: [
    "Tech crew member near city gates Palmiro Russo",
    "Merchandise salesman Enrico Nucci",
    "Bosco's agent Sophia Wilde",
    "Guard in the tower Giuseppe Monaldo",
    "SFX crew member indoors Amaranto 'Tony' Mazzi"
  ],
  entry: ["City gates"],
  exit: ["Town Gate", "Bosco's Car"],
  disguises: [
    "47 in his Suit",
    "Kitchen Assistant",
    "Movie Crew",
    "Security Officer",
    "SFX Crew"
  ]
};

var landslide = {
  missionTitle: "Landslide",
  map: "https://www.hitmaps.com/games/hitman/sapienza/landslide/standard",
  melee: [
    "Fiber Wire",
    "Screwdriver",
    "Scissors",
    "Old Axe",
    "Kitchen Knife",
    "Saber",
    "Folding Knife",
    "Fire Axe",
    "Letter Opener",
    "Cleaver"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Screwdriver: "- Next to the fireworks<br>- Near the stage on one of the boxes<br>- In the dead end alley near the private detective's bench<br>- In the shop against the butcher's<br>- In the apartment close to the church where Abiatti's schedule is",
    Scissors: "- In the morgue<br>- In the farther shop up the wall to the right from the start<br>- In the shop against the butcher's<br>- In a shop against the back entrance of the city tower building<br>- ICA safehouse<br>- In the room up the stairs next to the ice cream shop",
    Old_Axe: "- Enter the sewers from the beach and turn right on the first intersection<br>- At the city gates",
    Kitchen_Knife: "- On the second floor of the apartment against the hairdresser's<br>- On the second floor of the ice cream shop building",
    Saber: "- In the room where you can meet with Abiatti as a lawer",
    Folding_Knife: "- In the room where you can meet with Abiatti as a lawer",
    Fire_Axe: "- In the room with camera recordings in the ice cream shop building",
    Letter_Opener: "- In the back room of the farther shop up the wall to the right from the start<br>- In the room where you can meet with Abiatti as a lawer",
    Cleaver: "- In the back of the closer shop up the wall to the right from the start<br>- The butcher's refrigerator"
  },
  targetList: ["Marco Abiatti"],
  contractTargets: [
    "Photographer Marcello Folliero",
    "Woman working at Abiatti's stand Alberta Arcuri",
    "Padre Francesco",
    "Red plumber - Mario Fratelli",
    "Green plumber - Luigi Fratelli",
    "Singer Cristina - Dionisi",
    "Abiatti's technician - Roberto Mulo",
    "Baker - Dario Bronzo",
    "Renzo 'Not Rocco' Forte",
    "Lawyer - Salvatore Bravuomo",
    "Bohemian - Silvestro Pugliesi"
  ],
  entry: ["Promenade"],
  exit: ["Town Gate", "Speedboat", "Merchant's Car"],
  disguises: [
    "47 in his Suit",
    "Stage Crew",
    "Security",
    "Bodyguard",
    "Photographer",
    "Waiter",
    "Church Staff",
    "Priest",
    "Gardener",
    "Green Plumber",
    "Red Plumber",
    "Kitchen Assistant",
    "Salvatore Bravuomo",
    "Bohemian"
  ]
};

var agc = {
  missionTitle: "A Gilded Cage",
  map: "https://www.hitmaps.com/games/hitman/marrakesh/a-gilded-cage/professional",
  melee: [
    "Battle Axe",
    "Fire Axe",
    "Saber",
    "Scissors",
    "Screwdriver",
    "Kitchen Knife",
    "Cleaver",
    "Letter Opener",
    "Fiber Wire"
  ],
  meleeLocations: {
	Battle_Axe: "- In the shop against the pipe you use to climb to rooftops<br>- Climb around the headmaster's building",
    Fire_Axe: "- Consulate garage, near the tunnel entrance",
    Saber: "- In the shop that has a tunnel entrance behind it<br>- Zaydan's office",
    Scissors: "- In the building on the right to the consulate entrance<br>- At the carpet stands at the bazaar<br>- In the utility room close to where the printing crew starts",
    Screwdriver: "- Consulate garage utility room<br>- In the consulate garage near the consulate entrance<br>- Consulate camera recordings room<br>- Consulate security building near the entrance<br>- In the utility room near the snail stand starting location<br>- Near the room with bazaar gates start/exit<br>- Near the wire plug next to the headmaster's building<br>- In the school where you can peek on the prisoner and in the room above it",
    Kitchen_Knife: "- Consulate kitchen and it's back room<br>- Vendors in the centre of the bazaar have some on their stands<br>- Snail stand starting location",
    Cleaver: "- On the stand next to the snail stand starting location<br>- Consulate kitchen<br>- At the bazaar stands close to the rooftops building",
    Letter_Opener: "- In the consulate room that is next to Claus's office",
    Fiber_Wire: ""
  },
  targetList: ["Claus Hugo Strandberg", "Reza Zaydan"],
  contractTargets: [
    "Printing crew member Ashraf Raghib Mustafa",
    "Cameraman Jeff Baker",
    "School headmaster Shahin Abdul-Barr Maalouf",
    "Masseur Konny Engström",
    "Elite soldier in the tunnel Jawwaad Reza",
    "Consulate intern Hektor Lindberg",
    "Fortune teller Zaki Diab",
    "Protester Shuaib Aly",
    "Woman on lamp store roof Hilda Berg"
  ],
  entry: [
    "Bazaar Entrance",
    "Undercover at the Snail Stand",
    "Undercover on the West Bazaar Rooftop",
    "Undercover in the Courtyard Club",
    "Undercover in Zaydan's Compound",
    "Lamp Store Rooftop",
    "Undercover in the Consulate",
    "School Alley",
    "Consulate Parking Garage"
  ],
  exit: ["Bazaar Gates", "Armored Vehicle", "Car in the Garage"],
  disguises: [
    "47 in his Suit",
    "Bodyguard",
    "Cameraman",
    "Consulate Intern",
    "Consulate Janitor",
    "Consulate Security",
    "Elite Soldier",
    "Food Vendor",
    "Fortune Teller",
    "Handyman",
    "Headmaster",
    "Local Printing Crew",
    "Masseur",
    "Military Officer",
    "Soldier",
    "Prisoner",
    "Shopkeeper",
    "Waiter"
  ]
};

var ahbos = {
  missionTitle: "A House Built on Sand",
  map: "https://www.hitmaps.com/games/hitman/marrakesh/a-house-built-on-sand/standard",
  melee: [
    "Battle Axe",
    "Cleaver",
    "Folding Knife",
    "Kitchen Knife",
    "Scissors",
    "Screwdriver",
    "Fiber Wire"
  ],
  meleeLocations: {
	Battle_Axe: "- In the shop against the pipe you use to climb to rooftops<br>- Climb around the headmaster's building",
    Cleaver: "- On the stand next to the snail stand starting location<br>- At the bazaar stands close to the rooftops building",
    Folding_Knife: "- Against the tunnel entrance",
    Kitchen_Knife: "- In shisha cafe behind the bar<br>- On the stand to the right from the consulate plaza starting location<br>- Vendors in the centre of the bazaar have some on their stands<br>- Snail stand starting location",
    Scissors: "- Where the printing crew starts<br>- At the carpet stands at the bazaar<br>- Where you can poison Zaydan's food",
    Screwdriver: "- Shisha cafe utility room<br>- Utility room near the radio you trigger to make the waiter deliver the food to Zaydan<br>- Near bazaar gates, as if you start in Gilded Cage and head right",
    Fiber_Wire: ""
  },
  targetList: ["Matthieu Mendola", "Kong Tuo-Kwang"],
  contractTargets: [
    "Shopkeeper by the well Yousef Shitrit",
    "Guitarist Jalal al Din Muti Said",
    "Fortune teller Zaki Diab",
    "Vomiting bodyguard Hussein Guirguis",
    "Waiter at the meeting spot Ahmed Aziz",
    "Bartender Jewel Bourgeois"
  ],
  entry: ["Consulate plaza"],
  exit: ["Bazaar Gates", "Truck", "Door near the Well", "Door by the Street"],
  disguises: [
    "47 in his Suit",
    "Bodyguard",
    "Food Vendor",
    "Fortune Teller",
    "Handyman",
    "Soldier",
    "Shopkeeper",
    "Waiter"
  ]
};

var c27 = {
  missionTitle: "Club 27",
  map: "https://www.hitmaps.com/games/hitman/bangkok/club-27/professional",
  melee: [
    "Kitchen Knife",
    "Screwdriver",
    "Fire Axe",
    "Cleaver",
    "Hatchet",
    "Letter Opener",
    "Katana",
    "Fiber Wire",
    "Sapper's Axe"
  ],
  meleeLocations: {
	Kitchen_Knife: "- 2 of them in the kitchen<br>- At the bar in the lobby<br>- In the guarded room where the drummer is<br>- In the recording crew suite above the security room<br>- In the recording crew suite against the stairs<br>- 2 in the recording studio kitchen",
    Screwdriver: "- Basement 'passage' behind the fire extinguisher<br>- Basement hallway near the locker room<br>- Near the exterminator in the hotel<br>- Recording studio, near both of the stairs up<br>- Recording studio, near the guitar amplifier",
    Fire_Axe: "Basement<br>- Linen room<br>- Near the stairs next to the locker room<br>Floor 1<br>- The room next to the kitchen storage<br>- Outside of the room with the ventilation system<br>Floor 2<br>- In the security room<br>- By the stairs next to the security room<br>Floor 3<br>- Outside of 47's suite<br>- By the stairs next to the Cross' party room<br>Floor 4<br>- Near both of the queen suites' entrances",
    Cleaver: "- In the kitchen, right behind you when you start there",
    Hatchet: "- Near the sleeping guard behind the hotel",
    Letter_Opener: "- 47's suite bedroom<br>- Recording studio office",
    Katana: "- Top floor, near Jordan Cross' guitar",
    Fiber_Wire: "",
    Sappers_Axe: "- In the basement near the stairs closest to the kitchen"
  },
  targetList: ["Jordan Cross", "Ken Morgan"],
  contractTargets: [
    "Cross' Manager Dexy Barat",
    "Producer Wes Liston",
    "Guitarist Heidi Santoro",
    "Guest residing in room 208 Toby Hicks",
    "Former sitcom star Jackie Carrington",
    "Drummer Abel De Silva",
    "Hotel manager Mrs. Mookjai",
    "Chef Tharn Srisai",
    "Man passed out in Jackie's room Julian",
    "Stalker Benjamin Bertam",
    "Ken's bodyguard Otis Kaplan"
  ],
  entry: [
    "Riverside Landing",
    "47's Suite",
    "Undercover in the Restaurant Kitchen",
    "Undercover in the Linen Room",
    "Undercover by the Security Shed",
    "Undercover at the Himmapan Bar",
    "Undercover in the Side Garden",
    "Undercover in the 2nd Floor Hallway"
  ],
  exit: ["Boat", "Tuk-tuk", "Tunnel"],
  disguises: [
    "47 in his Suit",
    "Drummer",
    "Exterminator",
    "Groundskeeper",
    "Hotel Security",
    "Hotel Staff",
    "Jordan Cross' Bodyguard",
    "Kitchen Staff",
    "Ken Morgan's Bodyguard",
    "Recording Crew",
    "Stalker",
    "Waiter"
  ]
};

var ff = {
  missionTitle: "Freedom Fighters",
  map: "https://www.hitmaps.com/games/hitman/colorado/freedom-fighters/professional",
  melee: ["Cleaver", "Kitchen Knife", "Screwdriver", "Fiber Wire"],
  meleeLocations: {
	Cleaver: "- Field kitchen",
	Kitchen_Knife: "- Field kitchen",
	Screwdriver: "- 2 of them behind the greenhouse<br>- In Ezra's shed<br>- Near the repaired van<br>- Outside of the premises, near the garage area",
	Fiber_Wire: ""
  },
  targetList: ["Sean Rose", "Penelope Graves", "Ezra Berg", "Maya Parvati"],
  contractTargets: [
    "Explosives specialist Quince Elliot",
    "Militia cook Robert Powell",
    "Point man Lloyd Burgess",
    "Militia technician Milton Geiger",
    "Sleeping militia soldier Mario Thompson",
    "Militia spec ops in the barn Liam Butler",
    "Drill instructor Albert Knarr"
  ],
  entry: [
    "Undercover in the Garage",
    "West Bridge",
    "Undercover by the Greenhouse",
    "Undercover on the Demolition Range",
    "Old Orchard",
    "Southern Farm Perimeter",
    "Undercover in the Farmhouse",
    "Water Tower"
  ],
  exit: ["Bridge", "Quad Bike", "River", "Front Gate", "Tornado Shelter"],
  disguises: [
    "47 in his Suit",
    "Explosives Specialist",
    "Hacker",
    "Militia Cook",
    "Militia Elite",
    "Militia Spec Ops",
    "Militia Soldier",
    "Militia Technician",
    "Point Man",
    "Scarecrow"
  ]
};

var si = {
  missionTitle: "Situs Inversus",
  map: "https://www.hitmaps.com/games/hitman/hokkaido/situs-inversus/professional",
  melee: [
    "Fiber Wire",
    "Scalpel",
    "Kitchen Knife",
    "Cleaver",
    "Katana",
    "Screwdriver",
    "Fire Axe"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Scalpel: "- In the morgue near the heart room",
    Kitchen_Knife: "- In the kitchen<br>- Where you can serve sushi to Yuki",
    Cleaver: "- Where you can serve sushi to Yuki",
    Katana: "- Yuki's suite",
    Screwdriver: "- Morgue storage room<br>- Outside. You could see it from the window against the director's office",
    Fire_Axe: "- The hallway from the morgue to the garage"
  },
  targetList: ["Yuki Yamazaki", "Erich Soders"],
  contractTargets: [
    "Showering resort staff member Lowell Aucoin",
    "Dancing master Toshimi 'Sandā no ashi' Kaneko",
    "Stetson man Amos Dexter",
    "The director Akira Nakamura",
    "Facial surgery patient Jason Portman",
    "Yoga instructor J. Brooke",
    "Head surgeon Nicholas Laurent",
    "Helicopter pilot Nails",
    "Nurse in the operating room Kimiho Ookawa",
    "The curator Katashi Ito",
    "Smoking handyman Tomiyuki Fujihara"
  ],
  entry: [
    "Tobias Rieper's Suite",
    "Spa",
    "Infiltrating Along the Mountain Path",
    "Restaurant",
    "Undercover in the Staff Quarters",
    "Undercover in the Kitchen",
    "Undercover in the Garden",
    "Morgue",
    "Undercover in the Operating Theater"
  ],
  exit: ["Helicopter", "Snowmobile", "Hiking Route", "Cable Car"],
  sodersKills: [
    "Throw the Heart into the Trash Can",
    "Shoot the Heart",
    "Electrocution",
    "Pistol",
    "Large Firearm",
    "Explosion",
    "Poison the Stem Cells",
    "Fail the Surgery",
    "Make the Surgeon Fail the Surgery",
    "Robot Arms"
  ],
  disguises: [
    "Ninja",
    "47 in his Suit",
    "Baseball Player",
    "Bodyguard",
    "Chef",
    "Chief Surgeon",
    "Doctor",
    "Handyman",
    "Helicopter Pilot",
    "Hospital Director",
    "Morgue Doctor",
    "Motorcyclist",
    "Patient",
    "Resort Security",
    "Resort Staff",
    "Surgeon",
    "VIP Patient (Dexter)",
    "VIP Patient (Portman)",
    "Yoga Instructor"
  ]
};

var ts = {
  missionTitle: "The Source",
  map: "https://www.hitmaps.com/games/hitman/bangkok/the-source/standard",
  melee: [
    "Kitchen Knife",
    "Screwdriver",
    "Fire Axe",
    "Cleaver",
    "Hatchet",
    "Letter Opener",
    "Katana",
    "Fiber Wire",
    "Sapper's Axe"
  ],
  meleeLocations: c27.meleeLocations,
  targetList: ["Oybek Nabazov", "Sister Yulduz"],
  contractTargets: [
    "Waiter outside the exhibition Robert Egg",
    "Cult bodyguard Akram",
    "Defecting cultist Jeff",
    "Manipulative cultist Rebecca",
    "Man with a beige hat in the exhibition Charles Slaughter",
    "Former sitcom star Jackie Carrington",
    "Man passed out in Jackie's room Julian",
    "Man with a yellow jumper tied around his waist Sam Harrison",
    "Female Hotel Staff in the globe room Vipada Ahunai",
    "Cultist in the top floor Robert Uppey Jr",
    "Security Guard on the pier A-Wut"
  ],
  entry: ["Hotel Front Terrace"],
  exit: ["Boat", "Tunnel"],
  disguises: [
    "47 in his Suit",
    "Exterminator",
    "Groundskeeper",
    "Hotel Security",
    "Hotel Staff",
    "Cult Bodyguard",
    "Kitchen Staff",
    "Waiter",
    "Cult Member"
  ]
};

var ta = {
  missionTitle: "The Author",
  map: "https://www.hitmaps.com/games/hitman/sapienza/the-author/standard",
  melee: [
    "Fire Axe",
    "Kitchen Knife",
    "Screwdriver",
    "Fiber Wire"
  ],
  meleeLocations: {
    Fire_Axe: "- The room with camera recordings above the ice cream shop",
    Kitchen_Knife: "- In the back of the first shop up the wall (above the start)<br>- The second floor apartment in the building against the hairdresser's<br>- Brother Akram's apartment kitchen<br>- The butcher's shop<br>- In the ice cream shop",
    Screwdriver: "- In the church basement<br>- In the morgue<br>- The room with camera recordings above the ice cream shop",
    Fiber_Wire: ""
  },
  targetList: ["Craig Black", "Brother Akram"],
  contractTargets: [],
  entry: ["Portico"],
  exit: ["Town Gate"],
  disguises: [
    "47 in his Suit",
    "Waiter",
    "Craig Black",
    "Brother Akram",
    "The Superfan",
    "Bodyguard"
  ]
};

var pz = {
  missionTitle: "Patient Zero",
  map: "https://www.hitmaps.com/games/hitman/hokkaido/patient-zero/standard",
  melee: [
    "Fiber Wire",
    "Scalpel",
    "Scissors",
    "Kitchen Knife",
    "Cleaver",
    "Katana",
    "Fire Axe"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Scalpel: "- The room against the entrance from the helipad<br>- Hallway, near the room with hazmat suits<br>- Where Owen Cage starts",
    Scissors: "- In the morgue near the camera recordings room<br>- On the top floor in the room near the stairs that's next to hazmat suits",
    Kitchen_Knife: "- In the kitchen<br>- Where you can serve sushi to Yuki",
    Cleaver: "- Where you can serve sushi to Yuki<br>- Near the morgue starting location",
    Katana: "- Yuki's suite",
    Fire_Axe: "- In the hallway from the staff rooms to the morgue"
  },
  targetList: ["Owen Cage", "Klaus Liebleid"],
  contractTargets: [],
  entry: ["Infiltrating below the helipad"],
  exit: ["Snowmobile", "Hiking Route", "Cable Car"],
  disguises: [
    "47 in his Suit",
    "Bodyguard",
    "Chef",
    "Bio Suit",
    "Handyman",
    "Helicopter Pilot",
    "Hospital Director",
    "Morgue Doctor",
    "VIP Patient",
    "Patient",
    "Resort Security",
    "Resort Staff",
    "Surgeon",
    "VIP Patient (Dexter)",
    "Yoga Instructor"
  ]
};

var nc = {
  missionTitle: "Nightcall",
  map: "https://www.hitmaps.com/games/hitman2/hawkes-bay/nightcall/professional",
  melee: [
    "Fiber Wire",
    "Folding Knife",
    "Scissors",
    "Kitchen Knife",
    "Cleaver",
    "Katana",
    "Screwdriver"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Folding_Knife: "- First floor, near the house back door<br>- In the panic room",
    Scissors: "- First floor bathroom",
    Kitchen_Knife: "- In the kitchen",
    Cleaver: "- In the kitchen",
    Katana: "- In the panic room",
    Screwdriver: "- Swimming pool, near the house door<br>- In the wall of the destroyed building near the truck with fuel cans"
  },
  targetList: ["Alma Reynard"],
  contractTargets: [],
  entry: ["Office", "Boat", "Beach"],
  exit: ["Boat"],
  disguises: [
    "47 in his Suit",
    "Bodyguard",
	"47 in his Suit",
    "Bodyguard"
  ]
};

var tfl = {
  missionTitle: "The Finish Line",
  map: "https://www.hitmaps.com/games/hitman2/miami/finish-line/professional",
  melee: [
    "Fiber Wire",
    "Amputation Knife",
    "Battleaxe",
    "Cleaver",
    "Kitchen Knife",
    "Scissors",
    "Screwdriver",
    "Starfish",
    "Fire Axe",
    "Old Axe"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Amputation_Knife: "- In the medical",
    Battleaxe: "- In the room next to the helipad",
    Cleaver: "- Food vendors near the stands<br>- Food tents near the speedboat key building<br>- Drivers' lounge kitchen",
    Kitchen_Knife: "- Standalone food vendor near the stands<br>- Drivers' lounge kitchen and its back room<br>- Kronstadt starting locations room<br>- Kronstadt building, near the window you can use to climb the pipe to the Knox' laptop",
    Scissors: "- Past the entrance check point, tent on the right<br>- Podium dressing room<br>- Drivers' lounge, room next to the security room<br>- Kronstadt building, room next to the lab (not shooting range)<br>- Robert Knox' office<br>- Small room next to the air conditioner room",
    Screwdriver: "- The room near the Car Park agency pickup<br>- The room on the left if you start at Podium<br>- Near the fire hydrant on the road near medical<br>- Inside the Kronstadt pit, where there's a guy outside<br>- Aeon pit garage<br>- Sotteraneo pit garage<br>- Behind the Thwack lounge<br>- In the room that connects the expo and the aquarium<br>- Keycard locked room by the expo entrance<br>- The room right outside of the Kronstadt starting room<br>- The room below Robert Knox' laptop<br>- Kronstadt lab (not the shooting range)<br>- Press skybox, next to the stairs that's closer to the gates entrance<br>- The other skybox",
    Starfish: "- In the aquarium, on the right side from the entrance",
    Fire_Axe: "- Take the stairs down at the stands<br>- Near the entrance security station hallway<br>- The garage behind the expo",
    Old_Axe: "- Behind the building near the medical, close to the ambulance exit"
  },
  targetList: ["Robert Knox", "Sierra Knox"],
  contractTargets: [
	"Press skybox guard Jorge Padilla",
	"Roaming Kronstadt mechanic Alex Wiesenhauer",
	"Entrance overpass race marshal Dwain Neil",
	"Robert Knox' bodyguard Brendon Fulton",
	"Helipad bench bodyguard Sam Williams",
	"Robert Knox' assistant Antoine Mack",
	"Kowoon driver Moses Lee",
	"Blackmailer Albert Noah",
	"Kronstadt lounge waiter Ernesto Nedina",
	"Kronstadt mechanic in medical Thierry Durand",
	"Medic Chip Ellsworth",
	"Far overpass race marshal Dennis Elliot",
	"Florida Man Nicholas Velmorres",
	"Military officer Edward \"Ted\" Mendez",
	"Trucks parking guard Olivier Quintero",
	"Detained race marshal Baltazar Morrison",
	"Thwack lounge barista Anne Washington",
	"Thwack lounge waiter Freddie Bradford",
	"The host of the race Maxwell Rutter",
	"Drivers' lounge Kronstadt mechanic Rafferty Butler",
	"Kronstadt mechanic Samuel Kahn",
	"Security station guard Michael Kane",
	"Aeon mechanic Alonso Ricardo Villareba",
	"Kowoon mechanic Wu Yang"
  ],
  entry: [
    "Event Entrance",
    "Dolphin Fountain",
    "Marina",
    "Stands",
    "Food Stand",
    "Overpass",
    "Driver's Lounge",
    "Podium",
    "Medical Area",
    "Kronstadt Bayside Center",
    "Kowoon Pit"
  ],
  exit: ["Helicopter", "Main Gate", "Sewer", "Speedboat", "Ambulance"],
  disguises: [
    "47 in his Suit",
    "Aeon Driver",
    "Aeon Mechanic",
    "Event Crew",
    "Event Security",
    "Florida Man",
    "Food Vendor",
    "Journalist",
    "Kitchen Staff",
    "Kowoon Driver",
    "Kowoon Mechanic",
    "Kronstadt Engineer",
    "Kronstadt Researcher",
    "Kronstadt Security",
    "Mascot",
    "Medic",
    "Moses Lee",
    "Pale Rider",
    "Photographer",
    "Race Coordinator",
    "Race Marshall",
    "Sheik",
    "Sotteraneo Mechanic",
    "Street Musician",
    "Ted Mendez",
    "Thwack Driver",
    "Waiter",
    "Blue Seed Driver",
    "Kronstadt Driver",
    "Kronstadt Mechanic"
  ]
};

var ths = {
  missionTitle: "Three-headed Serpent",
  map: "https://www.hitmaps.com/games/hitman2/santa-fortuna/three-headed-serpent/professional",
  melee: [
    "Fiber Wire",
    "Screwdriver",
    "Kitchen Knife",
    "Cleaver",
    "Scissors",
    "Letter Opener",
    "Machete"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Screwdriver: "- 2 of them in the submarine cave<br>- If you start at the mansion basement and go through the door on the right, and then into the room on the right<br>- Construction site, in the building against the crane<br>- On the second floor of the building at the construction site<br>- In front of Jorge's hut<br>- In the shed near the Jorge's hut<br>- On the second floors of the buildings that are against the statue",
    Kitchen_Knife: "- Near the hippo pool<br>- In the room with camera recordings in the submarine cave<br>- Mansion's kitchen<br>- Near mansion basement starting location<br>- In the building against the building with music<br>- Lake village middle back building<br>- Delgado's mansion open air kitchen<br>- Delgado's mansion first floor bar",
    Cleaver: "- Delgado's mansion kitchen refrigerator room<br>- Small building down the road from the statue",
    Scissors: "- Storage cave near the submarine cave<br>- The building on the right from the bus stop start<br>- The building near the helipad<br>- The building against Martinez' house where you can buy glue<br>- Delgado's wife bathroom, mansion second floor",
    Letter_Opener: "- Martinez' office desk",
    Machete: "- In the coca plants between the coca lab and the cave entrance"
  },
  targetList: ["Rico Delgado", "Andrea Martinez", "Jorge Franco"],
  contractTargets: [
	"Submarine guard Vulcano Baez Zelaya",
	"Submarine cameras guard Livio Vigil Dominiquez",
	"Submarine storage cave worker Tom E. Sheckley",
	"Jorge's hut guy Dioscoro Avalos Posada",
	"Hippo Whisperer Dan Buckman",
	"Wine cellar maid Jules Prieto Gamez",
	"Vanisher (Delgado's mansion basement)",
	"Delgado's basement limping guard Javier Valenzuela Pedroza",
	"Kitchen chef Day Nava Mercado",
	"Hector Delgado",
	"Catalina Delgado",
	"Delgado's expo room guard Piperion Puente Alaniz",
	"Grieving man Aldano Ruelas Pabon",
	"Man in the lake warehouse Barbelo Salgado Ulibarri",
	"Injured submarine engineer Mateo Luna Covarrubias",
	"Martinez' house second floor soldier Ceferino Franco Cervantez",
	"Martinez' assistant Paola Bravo Magana",
	"Tourist with a camera Susan M. Delong",
	"Hippie Torres Piombo"
  ],
  entry: [
    "Village Bus Stop",
    "Village Hostel",
    "Shaman's Hut",
    "Village Bar",
    "Construction Site",
    "Coca Fields",
    "Submarine Cave",
    "Mansions Basement"
  ],
  exit: [
    "Rico's Car",
    "Helicopter",
    "Speedboat",
    "Local's Car",
    "Scooter",
    "Bus"
  ],
  disguises: [
    "47 in his Suit",
    "Drummer",
    "Hippo Whisperer",
    "Shaman",
    "Submarine Crew",
    "Submarine Engineer",
    "Tattoo Artist",
    "Coca Field Worker",
    "Construction Worker",
    "Mansion Staff",
    "Mansion Guard",
    "Coca Field Guard",
    "Elite Guard",
    "Street Soldier",
    "Hippie",
    "Barman",
    "Gardener",
    "Chef",
    "Drug Lab Worker"
  ]
};

var cag = {
  missionTitle: "Chasing a Ghost",
  map: "https://www.hitmaps.com/games/hitman2/mumbai/chasing-a-ghost/professional",
  melee: [
    "Fiber Wire",
    "Beak Axe",
    "Old Axe",
    "Scissors",
    "Amputation Knife",
    "Screwdriver",
    "Barber Razor",
    "Cleaver",
    "Folding Knife",
    "Letter Opener",
    "Kitchen Knife",
    "Saber",
    "Fire Axe"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Beak_Axe: "- Hard to explain, use <a href=\"https://hitmaps.com/games/hitman2/mumbai/chasing-a-ghost/professional\" target=\"_blank\">hitmaps.com</a>",
    Old_Axe: "- Near metal forge starting location",
    Scissors: "- The tailor's shop<br>- Vanya's private train car<br>- Rangan's tower dressing room, the photoshoot starting location",
    Amputation_Knife: "- In the train car that's near the meditation pond",
    Screwdriver: "- In a container behind the train yard<br>- The train car closest to the laundry<br>- Chawls first floor apartment<br>- Near the stairs from Rangan's tower to its back yard<br>- In the center of the slums, near Tuk-Tuk exit<br>- 2 of them on the skywalk that's near the chawls, on the border of the map<br>- Rangan's tower first floor<br>- On the second floor of Rangan's tower where the security room is, near the elevator shaft<br>- On the movie set, near the fan<br>- Rangan's tower keycard locked floor, against the water cooler",
    Barber_Razor: "- In the trainyard in the train car in the corner of the 'public' area<br>- Chawls first floor apartment<br>- Chawls starting location bathroom<br>- Rangan's tower bathroom up the stairs from the movie set",
    Cleaver: "- In the train car with a bar<br>- Chawls second floor apartment<br>- Rangan's tower top (empty) floor",
    Folding_Knife: "- Chawls second floor apartment<br>- The roof of the laundry office building",
    Letter_Opener: "- Laundry office building first floor",
    Kitchen_Knife: "- In the bakery in the slums (crowded)<br>- Rangan's tower canteen (the room near the photoshoot start)",
    Saber: "- In Rangan's tower on the movie set floor",
    Fire_Axe: "- On the second floor of Rangan's tower where the security room is, near the elevator shaft<br>- In Rangan's tower on the stairs near the keycard locked floor<br>- Rangan's tower top (empty) floor"
  },
  targetList: ["The Maelstrom", "Dawood Rangan", "Vanya Shah"],
  contractTargets: [
	"Rangan's tower first floor movie crew member Zara Purohit",
	"Dawood's bodyguard Dinesh Ray",
	"Rangan's tower top floor couch bodyguard Loftur",
	"Rangan's tower painter Babu Raav",
	"Rangan's tower movie star Sukanya Devarukhkar",
	"Rangan's tower security room guard Chandan Gill",
	"Heart of darkness thug in the room Vimal Sanjay",
	"Maelstrom's flag appointment Neha",
	"The Kashmirian (the assassin)",
	"The barber Bhavin Sagar",
	"The tailor Bharath Chilamkurthy",
	"Vanya's private train car maid Kiara Das",
	"Vanya's roof guard Vivaan Dhar",
	"Vanya's meditation pond watcher Aditi Bakshi",
	"Vanya's private room guard Hari Chopra"
  ],
  entry: [
    "Main Street",
    "Train",
    "Boat",
    "Skywalk",
    "Taxi",
    "Chawls",
    "Laundry",
    "Barge",
    "Slums",
    "Metal Forge",
    "Photo Shoot",
    "Hill",
    "Train Yard"
  ],
  exit: ["Boat", "Street", "Taxi", "Train", "Crows' Hideout"],
  disguises: [
    "47 in his Suit",
    "Local Security",
    "Food Vendor",
    "Thug",
    "Elite Thug",
    "Metal Worker",
    "Tailor",
    "Queen's Guard",
    "Vanya's Servant",
    "Queen's Bodyguard",
    "Laundry Worker",
    "Laundry Foreman",
    "Dancer",
    "Holy Man",
    "Lead Actor",
    "Kashmirian",
    "Barber",
    "Bollywood Crew",
    "Bollywood Bodyguard",
    "Painter"
  ]
};

var al = {
  missionTitle: "Another Life",
  map: "https://www.hitmaps.com/games/hitman2/whittleton-creek/another-life/professional",
  melee: [
    "Fiber Wire",
    "Beak Axe",
    "Kitchen Knife",
    "Screwdriver",
    "Scissors",
    "Letter Opener",
    "Fire Axe",
    "Hatchet"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Beak_Axe: "- In the basement of the locked house with 2 garbage guys in the yard",
    Kitchen_Knife: "- BBQ party house kitchen<br>- 2 of them in the Janus' house kitchen",
    Screwdriver: "- Janus' house garage<br>- In a tree against the cop sleeping on a bench<br>- James Batty's backyard, near the boat",
    Scissors: "- The second floor of the house with the robe for Janus, against the attic ladder",
    Letter_Opener: "- The attic of the house with the robe for Janus",
    Fire_Axe: "- James Batty's backyard, close to the construction site border",
    Hatchet: "- In a mole hole in the bushes to the right from the construction site"
  },
  targetList: ["Janus", "Nolan Cassidy"],
  contractTargets: [
	"The politician Charles Blake III",
	"Cassidy's bodyguard Frank Bateson",
	"Cassidy's house second floor guard Lance Gerken",
	"Cassidy's house yard guard Keven Body",
	"Desinfected house owner James Batty",
	"The exterminator Jose Alvares",
	"Far construction site worker Jared Hawkins",
	"The binoculars guy Grant Brie",
	"The nurse Nelson Lafayette",
	"Janus' diary reader Kennith Hemmer",
	"The postman Dale Anderson",
	"Janus' bodyguard Gunther Mueller",
	"Janus' house basement guard Billy Diemer",
	"Janus' house second floor guard Louis Mogensen",
	"Construction near suburb sign worker Gabriel Burlison",
	"Muffin delivery van girl Lissy Arlington",
	"Survaillance house yard guard Cornell Meier",
	"The jogger Amelia Garros",
	"BBQ party house kitchen guy Donn Cervantez",
	"Garbage guy in the yard of a closed house Hollis Mack",
	"BBQ party house second floor guy Jed West",
	"Amanda Brie (starts near the binoculars guy)"
  ],
  entry: [
    "Whittleton Creek",
    "Construction Area",
    "Fumigation",
    "Garbage Removal",
    "Suburb Sign",
    "BBQ Party"
  ],
  exit: [
    "Bus",
    "Raft",
    "Sewer",
    "Construction Van",
    "Trash Truck",
    "Roadwork Gate"
  ],
  disguises: [
    "47 in his Suit",
    "Exterminator",
    "Politician",
    "Real Estate Broker",
    "Nurse",
    "Arkian Robe",
    "Janus' Bodyguard",
    "Cassidy Bodyguard",
    "Police Deputy",
    "Construction Crew",
    "Politician's Assistant",
    "Server",
    "Garbage Man",
    "Spencer 'The Hammer' Green",
    "BBQ Owner",
    "Mailman",
    "Gunther Mueller",
    "Gardener",
    "James Batty",
    "Plumber",
    "Sheriff Masterson"
  ]
};

var tas = {
  missionTitle: "The Ark Society",
  map: "https://www.hitmaps.com/games/hitman2/isle-of-sgail/ark-society/professional",
  melee: [
    "Fiber Wire",
    "Battle Axe",
    "Saber",
    "Old Axe",
    "Screwdriver",
    "Sapper's Axe",
    "Cleaver",
    "Scalpel",
    "Viking Axe",
    "Scissors"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Battle_Axe: "- Chapel, second floor<br>- The top floor (the suite)",
    Saber: "- Where you disable the necklace alarm, go to the other side of the balcony and out the door<br>- The second floor of the keep",
    Old_Axe: "- The room up the stairs from the expo floor (the floor below the conclave)",
    Screwdriver: "- In the room against the initiation door, go through the door next to the bathroom door<br>- In the room where Master of Ceremonies is<br>- In the morgue<br>- The room with camera recordings above the warehouse<br>- Expo floor, outside the room with camera recordings (near the keycard door)",
    Sappers_Axe: "- The top floor (the suite)",
    Cleaver: "- In the kitchen",
    Scalpel: "- In the morgue",
    Viking_Axe: "- Reception area, in the room with Entertainer disguise<br>- Keep, the floor where the butler is",
    Scissors: "- Where you disable the necklace alarm, go to the other side of the balcony, out the door, turn right and go through the door ahead"
  },
  targetList: ["Zoe Washington", "Sophia Washington"],
  contractTargets: [
	"Ceremony area initiate Dennis Bertrand",
	"Zoe's bodyguard Aaron Barlow",
	"Master of ceremonies Axel Phenniger",
	"Morgue doctor Muriel Mortensen",
	"Blake Nathaniel",
	"Necklace alarm guy Darrel E. Granger",
	"Butler Constantin",
	"The Constant",
	"Architect Marek Sinclair",
	"Jebediah Block"
  ],
  entry: [
    "Harbor",
    "Chapel",
    "Keep",
    "Reception Area",
    "Kitchens",
    "Warehouse",
    "Gallery",
    "Architects' Lounge"
  ],
  exit: ["Rooftop", "Helicopter", "Boat", "Warehouse", "Castle Wall"],
  disguises: [
    "47 in his Suit",
    "Initiate",
    "Ark Member",
    "Architect",
    "Jebediah Block",
    "Burial Robes",
    "Knight",
    "Event Staff",
    "Chef",
    "Custodian",
    "Raider",
    "Elite Guard",
    "Blake Nathaniel",
    "Entertainer",
    "Butler",
    "Castle Staff",
    "Master of Ceremonies"
  ]
};

var gh = {
  missionTitle: "Golden Handshake",
  map: "https://hitmaps.com/games/hitman2/new-york/golden-handshake/professional",
  melee: [
    "Screwdriver",
    "Letter Opener",
    "Fire Axe",
    "Kitchen Knife",
    "Fiber Wire",
    "Scissors",
    "Tanto",
	"Antique Curved Knife",
	"Burial Dagger",
	"Hobby Knife"
  ],
  meleeLocations: {
	Fiber_Wire: "",
    Screwdriver: "Basement:<br>- Guarded room of deposit boxes<br>- The server room in IT<br>Floor 1<br>- In the locked hallway to the right from the entrance<br>- In the corner behind Ruby Red<br>Floor 3<br>- Near the guarded stairs to the CEO floor",
    Letter_Opener: "",
    Kitchen_Knife: "",
    Fire_Axe: "",
    Tanto: "",
    Scissors: "",
	Antique_Curved_Knife: "",
	Burial_Dagger: "",
	Hobby_Knife: ""
  },
  targetList: ["Athena Savalas"],
  contractTargets: [
    "Head Of Accounts Fabian Mann",
    "Head Of Security Mateo Perez",
	"Investment Banker that does cocaine Jimmie Gladwin",
	"CEO office Security Guard Dudley Claypool",
	"Second floor bank teller Curt Reinhardt",
	"Terminated banker Logan Jackson",
	"Roaming bank employee Kaye Zahn",
	"Second floor waiting area client Laree Parrish",
	"Lobby guard Frank Winkelman",
	"Lobby guard Denzil Keyes"
  ],
  entry: [
    "Bank Entrance",
	"Undercover in Deposit Box Room",
    "Undercover at First Floor Mezzanine",
    "Undercover on Investment Floor",
	"Undercover in Audit Hall",
    "Undercover in the Garage"
  ],
  exit: ["Bank Entrance", "Fire Exit", "Money Transferring Truck", "CEO's Exit"],
  disguises: [
    "47 in his Suit",
    "Investment Banker",
	"Fired Banker",
    "Bank Teller",
    "Bodyguard",
	"Job Candidate",
	"IT guy",
    "Janitor",
    "Security Guard",
    "Bank Robber"
  ]
};

var eots = {
  missionTitle: "Embrace of the Serpent",
  map: ths.map,
  melee: ths.melee,
  meleeLocations: ths.meleeLocations,
  targetList: ["Blair Reddington"],
  contractTargets: [],
  entry: [
    "Steel Bridge",
    "Village Hostel",
    "Village Bar",
    "Construction Site",
    "Coca Fields",
    "Submarine Cave",
    "Mansions Basement"
  ],
  exit: ths.exit,
  disguises: ths.disguises
};

var iog = {
  missionTitle: "Illusions of Grandeur",
  map: cag.map,
  meleeLocations: cag.meleeLocations,
  melee: cag.melee,
  targetList: ["Basil Carnaby"],
  contractTargets: [],
  entry: cag.entry,
  exit: ["Boat", "Street", "Taxi", "Train", "Crows' Hideout"],
  disguises: cag.disguises
};

var tlr = {
  missionTitle: "The Last Resort",
  map: "https://www.hitmaps.com/games/hitman2/haven-island/the-last-resort/professional",
  melee: [
    "Kitchen Knife",
    "Screwdriver",
    "Fire Axe",
    "Cleaver",
    "Hatchet",
    "Letter Opener",
    "Fiber Wire",
    "Starfish"
  ],
  meleeLocations: {
    Fiber_Wire: "",
      Screwdriver: "",
      Letter_Opener: "",
      Kitchen_Knife: "",
      Fire_Axe: "",
      Cleaver: "",
      Hatchet: "",
      Starfish: ""
    },
  targetList: ["Tyson Williams", "Steven Bradley", "Ljudmilla Vetrova"],
  contractTargets: [
    "Shark Hut Staff - Bana Malhotra",
    "Ljudmilla's Bodyguard - Cooper Gilliam",
    "Steven Bradley's Bodyguard - Larry Cox",
    "Tyson William's Bodyguard - Mike Thompson",
    "Womanising Guard at Tiki Hut - Bharat Kurian",
    "Villa Guard Sitting at the Red Light TV - Mike Osmond",
    "Long Haired Man at Restaraunt - Liam Young",
    "Tech Crew - James Firth",
    "Private Villa Butler - Carl Lewis",
    "Daring Shark Pool Man - Mathew Parker",
    "The Thief - Leah Cooper",
    "The New Tech Crew Guy - Luo Shoushan"
  ],
  entry: [
    "Resort Pier",
    "Shark Hut",
    "Resort Pool",
    "Undercover in the Resort Gym",
    "Undercover in the Private Villa Pier",
    "Undercover in the Restaurant's Kitchen"
  ],
  exit: ["Black Boat", "White Speedboat", "Seaplane"],
  disguises: [
    "47 in his Suit",
    "Dr. Singh",
    "Villa Guard",
    "Resort Guard",
    "Bodyguard",
    "Resort Staff",
    "Gas Suit",
    "Tech Crew",
    "Waiter",
    "Ljudmilla's Bodyguard",
    "Steven Bradley's Bodyguard",
    "Tyson William's Bodyguard"
  ]
};

var ast = {
  missionTitle: "A Silver Tongue",
  map: tfl.map,
  melee: tfl.melee,
  meleeLocations: tfl.meleeLocations,
  targetList: ["Ajit Krish"],
  contractTargets: [],
  entry: tfl.entry,
  exit: tfl.exit,
  disguises: tfl.disguises
};

var abp = {
  missionTitle: "A Bitter Pill",
  map: al.map,
  meleeLocations: al.meleeLocations,
  melee: al.melee,
  targetList: ["Galen Vholes"],
  contractTargets: [],
  entry: al.entry,
  exit: al.exit,
  disguises: al.disguises
};


var ototw = {
  missionTitle: "On Top Of The World",
  map: "https://www.hitmaps.com/games/hitman3/dubai/on-top-of-the-world/professional",
  melee: [
    "Kitchen Knife",
    "Screwdriver",
    "Cleaver",
    "Fire Axe",
    "Scissors",
    "Folding Knife",
    "Letter Opener",
    "Fiber Wire",
    "Ornate Skimitar"
  ],
  meleeLocations: {},
  targetList: ["Carl Ingram", "Marcus Stuyvesant"],
  contractTargets: [
    "Penthouse guard near guest bedroom Zaheer Pasha",
    "Maintenance staff in ventilation area Yoshi Morita",
    "Famous Chef Roberto Franculitta",
    "Penthouse receptionist In'aam Mahdavi",
    "Art crew member in the control room Michael Tolman",
    "Artist Lucy Phillips",
    "Sheik Omar Al'Ghazali",
    "Kitchen staff member Mobeen Dar",
    "Storage room event staff Lalit Mandal",
    "Penthouse reception assistant Kelly To"
  ],
  entry: [
    "Atrium Lobby",
    "Meeting Room",
    "Art Installtion",
    "Guard Room",
    "Penthouse"
  ],
  exit: ["Parachute", "Atrium Elevator", "Staff Elevator", "Helicopter", "Penthouse Elevator"],
  disguises: [
    "47 in his Suit",
    "Art Crew",
    "Event Security",
    "Event Staff",
    "Famous Chef",
    "Helicopter Pilot",
    "Ingram’s Bodyguard",
    "Kitchen Staff",
    "Maintenance Staff",
    "Penthouse Guard",
    "Penthouse Staff",
    "The Assassin"
  ]
};

var ditf = {
  missionTitle: "Death In The Family",
  map: "https://www.hitmaps.com/games/hitman3/dartmoor/death-in-the-family/professional",
  melee: [
    "Kitchen Knife",
    "Screwdriver",
    "Cleaver",
    "Letter Opener",
    "Saber",
    "Fiber Wire",
    "Barber Razor",
    "Unicorn Horn",
    "Scissors",
    "Garden Fork",
    "Shears",
    "Folding Knife",
    "Hatchet"
  ],
  meleeLocations: {},
  targetList: ["Alexa Carlisle"],
  contractTargets: [
    "Top floor mansion staff member Jake Watts",
    "Flirting maid Annabel Jones",
    "Private investigator Phinas Whitmer",
    "Mansion staff member in the kitchen Theo Willis",
    "Butler Mr. Fernsby",
    "River side mansion guard Samuel Simpson",
    "Gardener near fountain Elliot Knight",
    "Photographer Flynn Sharp",
    "Undertaker Leonard Parsons"
  ],
  entry: [
    "Main Road",
    "Main Road (family meeting)",
    "Garden",
    "Staff Room",
    "Behind Mansion",
    "Behind Mansion (family meeting)",
    "Library",
    "Zachary's Bedroom"
  ],
  exit: ["Motorcycle", "Hearse", "River Bridge", "Boat"],
  disguises: [
    "47 in his Suit",
    "Bodyguard",
    "Mansion Guard",
    "Photographer",
    "Private Investigator",
    "Lawyer",
    "Undertaker",
    "Gardener",
    "Mansion Staff"
  ]
};

var apred = {
  missionTitle: "Apex Predator",
  map: "https://www.hitmaps.com/games/hitman3/berlin/apex-predator/professional",
  melee: [
    "Screwdriver",
    "Fiber Wire",
    "Kitchen Knife",
    "Hobby Knife",
    "Garden Fork",
    "Fire Axe",
    "Old Axe",
    "Battle Axe",
    "Scrap Sword"
  ],
  meleeLocations: {
    Old_Axe: "- At the end of some tubing near the water channels",
    Battle_Axe: "- In the biker hangout<br>- Buried near the pipes (requires shovel)"
  },
  numberOfTargets: 5,
  targetList: [
    "Agent Rhodes", 
    "Agent Swan", 
    "Agent Banner", 
    "Agent Tremaine", 
    "Agent Green", 
    "Agent Thames", 
    "Agent Chamberlin", 
    "Agent Montgomery", 
    "Agent Lowenthal", 
    "Agent Davenport"
  ],
  contractTargets: [],
  entry: [
    "Club Entrance",
    "Projection Bar",
    "Radio Tower",
    "Chill Out",
    "DJ Booth",
    "Biker Hangout"
  ],
  exit: ["Scooter", "Motorcycle", "Tunnel", "Bicycle"],
  disguises: [
    "47 in his Suit",
    "Bartender",
    "Biker",
    "Club Crew",
    "Club Security",
    "Dealer",
    "Delivery Guy",
    "DJ",
    "Florida Man",
    "Rolf Hirschmüller",
    "Technician"
  ]
};

var eoae = {
  missionTitle: "End Of An Era",
  map: "https://www.hitmaps.com/games/hitman3/chongqing/end-of-an-era/professional",
  melee: [
    "Screwdriver",
    "Fiber Wire",
    "Tanto",
    "Letter Opener",
    "Fire Axe",
    "Kitchen Knife",
    "Garden Fork",
    "Scissors",
    "Hobby Knife",
    "Cleaver",
    "Scrap Sword"
  ],
  meleeLocations: {
    Tanto: "- Hush therapy room",
    Garden_Fork: "- Balcony starting location"
  },
  targetList: [
    "Hush",
    "Imogen Royce"
  ],
  contractTargets: [],
  entry: [
    "Train Station",
    "River-side Walkway",
    "Balcony",
    "Restaurant Kitchen",
    "Facility Rooftop",
    "The Block",
    "Facility Locker Room"
  ],
  exit: ["Train Station", "Facility Emergency Exit", "Manhole", "Scooter", "Apartment Safe House"],
  disguises: [
    "47 in his Suit",
    "Block Guard",
    "Dumpling Cook",
    "Facility Analyst",
    "Facility Engineer",
    "Facilty Guard",
    "Facility Security",
    "Homeless Person",
    "Perfect Test Subject",
    "Researcher",
    "The Board Member",
    "Street Guard"
  ]
};

var mission_names_map = {
  TSS: showstopper,
  HH: hh,
  WOT: wot,
  ICON: icon,
  LS: landslide,
  AGC: agc,
  AHBOS: ahbos,
  C27: c27,
  FF: ff,
  SI: si,
  TS: ts,
  TA: ta,
  PZ: pz,
  NC: nc,
  TFL: tfl,
  THS: ths,
  CAG: cag,
  AL: al,
  TAS: tas,
  GH: gh,
  EOTS: eots,
  IOG: iog,
  TLR: tlr,
  AST: ast,
  ABP: abp,
  OTOTW: ototw,
  DITF: ditf,
  APRED: apred,
  EOAE: eoae
};

var killTypesMap = {
  melee: "melee",
  firearm: "firearms",
  accident: "accidents",
  generic: "kills",
  unlocks: "unlocks",
  unlocks2: "unlocks2"
};

var _loadout = {
  slot: [
	"Lockpick",
	"Lockpick",
	"Coins",
	"Coins",
	"Fiber Wire",
	"Remote Explosive Duck",
	"Proximity Explosive Duck",
	"Lethal melee",
	"Non-Lethal melee",
	"Lethal Poison Vial/Pills/Syringe",
	"Emetic Poison Vial/Pills/Syringe",
	"Proximity Taser",
	"Remote Taser",
	"EMP Charge",
	"The Big One",
	"Remote Audio Distraction",
	"Flash Grenade",
	"Fragmentation Grenade",
	"Explosive phone",
	"Electrocution phone",
	"Remote C4 block",
	"< nothing >"
  ],
  weapon: [
    "Silverballer",
	"Silverballer",
	"Silverballer",
    "Krugermeier",
    "Striker / El Matador",
    "SMG",
    "Tranquilizer",
    "Any Loud Pistol",
	"< no weapon >"
  ],
  smuggle: [
    "Lockpick",
	"Coins",
	"Explosive Duck",
	"Lethal melee",
	"Non-Lethal melee",
	"Lethal Poison Vial/Pills",
	"Emetic Poison Vial/Pills",
	"Lethal Poison Syringe",
	"Emetic Poison Syringe",
	"Proximity Taser",
	"Remote Taser",
	"EMP Charge",
	"Sniper Rifle",
	"Shotgun",
	"The Big One",
	"Remote Audio Distraction",
	"Flash Grenade",
	"Fragmentation Grenade",
	"Explosive phone",
	"Electrocution phone",
	"Remote C4 block",
	"Assault Rifle",
	"< nothing >"
  ]
};
