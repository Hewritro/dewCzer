var armorTypes1D = [ // All armor in game names and capitalized names use by this.
    "air_assault", "ballista", "chameleon", "cyclops", "demo", "dutch", "gladiator",
    "gungnir", "halberd", "hammerhead", "hoplite", "juggernaut", "mac",
    "mercenary", "nihard", "omni", "oracle", "orbital", "renegade", "scanner",
    "shark", "silverback", "spectrum", "stealth", "strider", "widow_maker",
    "Air Assault", "Ballista", "Chameleon", "Cyclops", "Demo", "Dutch", "Gladiator",
    "Gungnir", "Halberd", "Hammerhead", "Hoplite", "Juggernaut", "Mac",
    "Mercenary", "Ni-Hard", "Omni", "Oracle", "Orbital", "Renegade", "Scanner",
    "Shark", "Silverback", "Spectrum", "Stealth", "Strider", "Widow Maker"
];
function getArmor(bipedPart) { // Specifies the armor equipped currently.
    dewRcon.send('Player.Armor.' + bipedPart); // Isn't used may rewrite
    return dewRcon.lastMessage;
}
function getColor(detailType) { // Specifies the color equipped currently.
    dewRcon.send('Player.Colors.' + detailType); // Isn't used may rewrite
    return dewRcon.lastMessage;
}
function setArmor(bipedPart, armorType) { // Sets the armor to be equipped as specified.
    dewRcon.send('Player.Armor.' + bipedPart + ' ' + armorType);
}
function clearSelected(bipedPart) { // Clears the table for the biped part as specified.
    for (var i = 0; i < armorTypes2D.length; i++) { // Loops through the first array.
        for (var j = 0; j < armorTypes2D[i].length; j++) { // Loops through an array inside the first array.
            var CLASS = ".armor" + bipedPart; // Sets what class the use.
            $(CLASS).removeAttr('style'); // Removes the style attribute.
        }
    }
}
function checkArmor(bipedPart) { // Checks what armor is equipped and sets the text color on the table.
    clearSelected(bipedPart); // Clears the table for the biped part as specified.
    dewRcon.send("Player.Armor." + bipedPart); // Gets the armor.
    dewRcon.dewWebSocket.onmessage = function(message) {
        for (var i = 0; i < armorTypes2D.length; i++) { // Clears the table for the biped part as specified.
            for (var j = 0; j < armorTypes2D[i].length; j++) { // Loops through the first array.
                if (message.data == armorTypes2D[i][j]) { // Compares the response from the game to the array of names.
                    var CLASS = ".armor" + bipedPart + "." + armorTypes2D[i][j]; // Sets what class the use.
                    while ($(CLASS).attr('style') != 'color: blue') { // Checks if the style attribute doesn't contains the color blue.
                        $(CLASS).attr('style', 'color: blue'); // Sets the style attribute for the color blue.
                    }
                }
            }
        }
    }
}
function setDynamicAttrutes(bipedPart) { // Dynamically sets the attributes of the table with the specified biped part.
    checkArmor(bipedPart); // Checks what armor is equipped and sets the text color on the table.
    var CLASS = '.armor' + bipedPart; // Sets what class the use.
    $(CLASS).attr('onmouseover', 'setArmor($(this).siblings("th").first().attr("value"), $(this).attr("value"))'); // Sets the onmouseover attribute.
    $(CLASS).attr('onclick', 'removeDynamicAttrutes("' + bipedPart + '")'); // Sets the onclick attribute.
}
function removeDynamicAttrutes(bipedPart) { // Dynamically removes the attributes of the table with the specified biped part.
    checkArmor(bipedPart); // Checks what armor is equipped and sets the text color on the table.
    var CLASS = '.armor' + bipedPart; // Sets what class the use.
        $(CLASS).removeAttr('onmouseover'); // Removes the onclick attribute.
        $(CLASS).removeAttr('onclick'); // Removes the onclick attribute.
}
var createGroupedArray = function(arr, chunkSize) { // Not sure how it works got it from http://www.frontcoded.com/splitting-javascript-array-into-chunks.html
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
};
var armorTypes2D = createGroupedArray(armorTypes1D, 13); // Makes a 2D array, I think.
function creteTable(bipedPart) {
    var firstID = "#" + bipedPart + "First";
    var lastID = "#" + bipedPart + "Last";
    $(firstID).append(
        '<th value="' + bipedPart + '" rowspan="2"><a onclick="setDynamicAttrutes(' + "'" + bipedPart + "'" + ')" class="SideButtons">' + bipedPart + '</a></th>'
    );
    for (var i = 0; i < armorTypes2D[0].length; i++) {
        $(firstID).append(
            '<td class="armor' + bipedPart + ' ' + armorTypes2D[0][i] + '" value="' + armorTypes2D[0][i] + '">' + armorTypes2D[2][i] + '</td>'
        );
    }
    $(lastID).append('<th value="' + bipedPart + '" style="display: none"></th>');

    for (var i = 0; i < armorTypes2D[1].length; i++) {
        $(lastID).append(
            '<td class="armor' + bipedPart + ' ' + armorTypes2D[1][i] + '" value="' + armorTypes2D[1][i] + '">' + armorTypes2D[3][i] + '</td>'
        );
    }
}
function fillTable() {
    var Arms = '<tr id="title"></tr><tr id="ArmsFirst"></tr><tr id="ArmsLast"></tr>'
    var Chest = '<tr id="ChestFirst"></tr><tr id="ChestLast"></tr>'
    var Helmet = '<tr id="HelmetFirst"></tr><tr id="HelmetLast"></tr>'
    var Legs = '<tr id="LegsFirst"></tr><tr id="LegsLast"></tr>'
    var Shoulders = '<tr id="ShouldersFirst"></tr><tr id="ShouldersLast"></tr>'

    $('#table').append(Arms + Chest + Helmet + Legs + Shoulders);

    $('#title').append('<th colspan="14">Armor</th>');

    creteTable("Arms");
    creteTable("Chest");
    creteTable("Helmet");
    creteTable("Legs");
    creteTable("Shoulders");
}

/*
 function getSetColor(detailType) {
 getColor(detailType);
 function setTextColor() {
 $('#Colors').append(
 '<a id="' + detailType + 'Color" style="color: ' + dewRcon.lastMessage + '">' + detailType + 'Color</a>'
 );
 }
 setTimeout(setTextColor, 1000);
 }
 function setColor(bipedPart, colorHex) {
 dewRcon.send('Player.Colors.' + bipedPart + ' ' + colorHex);

 var ID = '#' + bipedPart + 'Color';
 $(ID).attr('style', 'color: ' + getColor(bipedPart));
 }
 function getAll() {
 function initialize() {
 getArmor('Arms');
 getArmor('Chest');
 getArmor('Helmet');
 getArmor('Legs');
 getArmor('Shoulders');
 getColor('Holo');
 getColor('Lights');
 getColor('Primary');
 getColor('Secondary');
 getColor('Visor');
 }
 //'<tbody><tr><th id="Colors"></th><td>Primary Color<input type="color" id="myColor" value="#ff0080"></td><td>Primary Color<input type="color" id="myColor" value="#ff0080"></td></tr></tbody>'
 setTimeout(initialize, 3000);
 }*/