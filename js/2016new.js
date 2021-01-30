//Creates the object that will be used as a source for the mission objectives
function createContainerObject() {
	container = {};
	
	var missionIndex = document.getElementById("missionselect");
	var mission_name = missionIndex.options[missionIndex.selectedIndex].value;
	
	//The Vector is missing due to way too many workarounds for dribbleondo to get that mission working properly.
	var season1 = [showstopper,hh,wot,agc,icon,landslide,ahbos,c27,ff,si,ts,ta,pz];
  var season2 = [nc,tfl,ths,cag,al,tas,gh,eots,iog,tlr,ast,abp];
  var season3 = [ototw,ditf,apred];
	
	var randomMissionList = [];

	if(mission_name === "S1")
	{
		randomMissionList = season1;
		mission_name = "RANDOM";
	}
	else if(mission_name === "S2")
	{
		randomMissionList = season2;
		mission_name = "RANDOM";
	}
	else if(mission_name === "S3")
	{
		randomMissionList = season3;
		mission_name = "RANDOM";
	}
	else
		randomMissionList = randomMissionList.concat(season1).concat(season2).concat(season3);
	
	for (var prop in generic)
		if (generic.hasOwnProperty(prop))
			container[prop] = generic[prop];
	
	if(mission_name === "RANDOM")
		var current_mission = randomMissionList[Math.floor(Math.random()*randomMissionList.length)];
	else
		var current_mission = mission_names_map[mission_name];
	
	for (var prop in current_mission)
		if(current_mission.hasOwnProperty(prop))
			container[prop] = current_mission[prop];
	
	// Create a copy to avoid modifying the originals
	container.disguises = current_mission.disguises.slice()
	
	return container
};

//Randomizes extra variables for the result
function createExtrasList(exit, targets) {
	if(!document.getElementById("restrictions").checked)
		return [];
		
	var extras = [];
	
	if (Math.random() < 0.12
		&& document.getElementById("disguise").checked == 0
		&& !disguiseExits.includes(exit))
		extras.push("Never change into a new disguise.");

	if (Math.random() < 0.20
		&& document.getElementById("disguise").checked == 0
		&& !koExits.includes(exit))
		extras.push("Do not kill or subdue non-targets.");
	
	if (Math.random() < 0.18) 
		extras.push("Do not throw items as distractions.");
	
	if (Math.random() < 0.1 && targets.length > 1)
	{
		extras.push("Kill the targets in the given order.");
		shuffle(targets);
	}

	if (Math.random() < 0.25)
		extras.push("Do not use firearms as distractions or to destroy objects.");

	if (Math.random() < 0.12)
		extras.push("Do not climb.");

	if (Math.random() < 0.05)
		extras.push("Do not crouch.");
	
	return extras;
};

//Returns the list of weapons/accidents from which the kill methods are pulled
function createWeaponList(container) {
	var kills = []
	
	for( var kill_type in killTypesMap )
		if (document.getElementById(kill_type).checked)
		{
			var toadd = container[killTypesMap[kill_type]].slice();
			if(toadd.length > 7)
			{
				shuffle(toadd);
				toadd = toadd.slice(0, 6);
			}
			kills = kills.concat(toadd);
		}
	
	var no_weapons_selected = !(kills.length > 0);
	if (no_weapons_selected)
		for(var i = 0; i < 5; ++i)
			kills.push("No weapons selected!");
	
	// Randomize weapons
	shuffle(kills);
	
	// add Soders-specific kill if relevant. Tried to do the same for Bradley Paine, with no luck =/
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	if (mode == "MAIN" && container.missionTitle === "Situs Inversus" && !(no_weapons_selected)) 
		kills[1] = container.sodersKills[Math.floor(Math.random()*container.sodersKills.length)];
	
	return kills;
};

//Create the disguise list
//reads the "entry" field in mission_information
function createDisguiseList(container, mission_information) {
  var disguises = [];
  // Remove "Ninja" and "47 in his Suit" from potential disguises
  // when starting in an undercover location
  // The first disguise in the list is always the non-undercover one
  var undercover_start = suitStarts.indexOf(mission_information.entry) === -1;
  if (undercover_start) container.disguises.splice(0, 1);

  //copy the disguise list, add  " as " to every element, then shuffle it
  if (document.getElementById("disguise").checked)
    disguises = container.disguises.slice().map(function(e) {
      return " as " + e;
    });
  else disguises = ["", "", "", "", ""];

  shuffle(disguises);
  return disguises;
}

//Chooses targets and kill methods
function createTargetList(container) {
	var targets = [];
	
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	if (mode == "CONTRACTS") {
		var el = document.getElementById("min_targets");
		var min_targets = parseInt(el.options[el.selectedIndex].value);
		el = document.getElementById("max_targets");
		var max_targets = parseInt(el.options[el.selectedIndex].value);
		
		if(max_targets < min_targets)
		{
			el.selectedIndex = 5 - min_targets;
			max_targets = min_targets;
		}
		
		var num_targets = Math.floor(Math.random() * (max_targets-min_targets+1) + min_targets);
		
		if (document.getElementById("main_in_contracts").checked)
			container.contractTargets = container.contractTargets.concat(container.targetList);
		
		shuffle(container.contractTargets);
		targets = container.contractTargets.slice(0, num_targets);
	}
	else if (mode == "ELUSIVE")
		targets = ["Elusive Target"];
	else {
		// Copy the missions' target list
		if (container.numberOfTargets == undefined)
			targets = container.targetList.slice();
		else
		{
			targets = container.targetList.slice();
			shuffle(targets);
			targets = targets.slice(0, container.numberOfTargets);
		}
	}
	
	return targets;
};

//Adds properties from the container object to the result object
function containerToResult(container) {
	var result = {};
	result.missionTitle = container.missionTitle;
	result.entry = container.entry[Math.floor(Math.random()*container.entry.length)];
	result.exit = container.exit[Math.floor(Math.random()*container.exit.length)];
	result.melee = container.melee;
	result.meleeLocations = container.meleeLocations;
	result.map = container.map;
	return result;
};

//Makes text appear
function writeEverything(result) {
	var maplink = "";
	if(result.map != undefined && result.map != "")
		maplink = " <span style=\"font-size:11px\">(<a href=" + result.map + " target=\"_blank\">map</a>)</span>"
	
	document.getElementById("chosenmission").innerHTML = result.missionTitle + maplink;
	document.getElementById("start").innerHTML =
		"<p class='bluetext'>Start</p>: " + result.entry;
	
	var MAX_TARGETS = 5, MAX_EXTRAS = 6;
	
	var meleeLocations = "";
	
	// Write to the HTML elements from the results object
	for(var i = 0; i < MAX_TARGETS; ++i){ // kills
		if(i < result.targets.length)
		{
			if(result.weapons[i] == undefined)
				result.weapons[i] = result.weapons[0]
			
			document.getElementById("kill" + (i+1)).innerHTML = 
				"<p class='redtext'>" + result.targets[i]
				+ "</p>: " + result.weapons[i] + result.disguises[i];
			
			if(result.melee.includes(result.weapons[i]))
			{
				var str = result.meleeLocations[result.weapons[i].replace(" ", "_").replace("'", "")];
				if(str != undefined && str.length > 3)
					meleeLocations = meleeLocations + result.weapons[i] + "<br>" + str + "<br><br>";
			}
		}
		else
			document.getElementById("kill" + (i+1)).innerHTML = "";
	}
	
	if(result.targets.length < 1)
		document.getElementById("kill1").innerHTML = "No targets available for this mode";
	
	shuffle(result.extras);
	for(var i = 0; i < MAX_EXTRAS; ++i){ // extras
		if(i < result.extras.length)
			document.getElementById("extra" + (i+1)).innerHTML = result.extras[i];
		else 
			document.getElementById("extra" + (i+1)).innerHTML = "";
	}
	document.getElementById("exit").innerHTML =
		"<p class='bluetext'>Exit</p>: " + result.exit;
	
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	if (result.missionTitle == "Freedom Fighters" && mode == "MAIN")
		document.getElementById("info").innerHTML =
			"To gain access to the exits, recreate the mission in Contracts mode.<br><br>";
	else
		document.getElementById("info").innerHTML = "";
	
	if(meleeLocations.length > 3)
	{
		var el_info = document.getElementById("info");
		el_info.innerHTML = el_info.innerHTML + "<details><summary>Melee locations (click to show)</summary><br>"+ meleeLocations +"</details><br>";
	}
};

function writeLoadout(result) {
	var maplink = "";
	if(result.map != undefined)
		maplink = " <span style=\"font-size:11px\">(<a href=" + result.map + " target=\"_blank\">map</a>)</span>"
	
	document.getElementById("chosenmission").innerHTML = result.missionTitle + maplink;
	document.getElementById("start").innerHTML =
		"<p class='bluetext'>Start</p>: " + result.entry;
	
	shuffle(_loadout.slot);
	shuffle(_loadout.weapon);
	shuffle(_loadout.smuggle);
	
	var smuggle_inx = 0;
	while(_loadout.slot[0] == _loadout.smuggle[smuggle_inx]
			|| _loadout.slot[1] == _loadout.smuggle[smuggle_inx])
			smuggle_inx++;
	
	document.getElementById("kill1").innerHTML = "<p class='redtext'>Slot 1:</p> " + _loadout.slot[0];
	document.getElementById("kill2").innerHTML = "<p class='redtext'>Slot 2:</p> " + (_loadout.slot[0] == _loadout.slot[1] ? _loadout.slot[2] : _loadout.slot[1]);
	document.getElementById("kill3").innerHTML = "<p class='redtext'>Weapon:</p> " + _loadout.weapon[0];
	document.getElementById("kill4").innerHTML = "<p class='bluetext'>Smuggle:</p> " + _loadout.smuggle[smuggle_inx];
};

function generate_result(loadout) {
	if(loadout == undefined)
		loadout = false;
	
	const current_mission = createContainerObject();
	
	var roulette = containerToResult(current_mission);
	
	if(!loadout)
	{
		roulette.targets = createTargetList(current_mission);
		roulette.extras = createExtrasList(roulette.exit, roulette.targets);
		roulette.weapons = createWeaponList(current_mission);
		roulette.disguises = createDisguiseList(current_mission, roulette);
	}
	
	return roulette;
};

//All the things that should happen when you make it go
function button_MakeItGo(){
	var section = document.getElementById('resultsection');
	if (section.style.display == "none")
		section.style.display = "";
	
	var result = generate_result();
	writeEverything(result);
	history_push(result);
}

function button_MakeItGoLoadout(){
	var section = document.getElementById('resultsection');
	if (section.style.display == "none")
		section.style.display = "";
	
	var result = generate_result(true);
	writeLoadout(result);
	//history_push(result);
}

//adds x to the history stack for a maximum of 20 most recent runs
function history_push(x) {
  redo_stack = [];
  history_past.push(x);
  if (history_past.length > 20) history_past.shift();

  //history exists, enable undo_nappi
  if (history_past.length > 1)
    document.getElementById("undo_nappi").disabled = false;
  // disable redo_nappi
  document.getElementById("redo_nappi").disabled = true;
}

// undo and redo functions, affect global state
function history_undo() {
  if (history_past.length < 2) return;

  //add the currently displayed result to the redo stack
  redo_stack.push(history_past.pop());
  var previous = history_past[history_past.length - 1];
  writeEverything(previous);

  // enable redo_nappi
  document.getElementById("redo_nappi").disabled = false;
  //history exists, enable undo_nappi
  if (history_past.length < 2)
    document.getElementById("undo_nappi").disabled = true;
}

function history_redo() {
  if (redo_stack.length < 1) return;

  history_past.push(redo_stack.pop());
  var previous = history_past[history_past.length - 1];
  writeEverything(previous);

  //history exists, enable undo_nappi
  if (history_past.length > 1)
    document.getElementById("undo_nappi").disabled = false;
  // disable redo_nappi
  if (redo_stack.length < 1)
    document.getElementById("redo_nappi").disabled = true;
}

//Displays/hides the options
function showFilters() {
  var section = document.getElementById("filters");
  var nappi = document.getElementById("filterbutton");
  if (section.style.display !== "none") {
    section.style.display = "none";
    nappi.innerHTML = "Show options";
  } else {
    section.style.display = "block";
    nappi.innerHTML = "Hide options";
  }
}

//Shuffles an array
function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
