function getArmor(bipedPart) {
    dewRcon.send('Player.Armor.' + bipedPart);
    return dewRcon.lastMessage;
}
function getColor(detailType) {
    dewRcon.send('Player.Colors.' + detailType);
    return dewRcon.lastMessage;
}
function getSetColor(detailType) {
    getColor(detailType);
    function setTextColor(){
        $('#Colors').append(
            '<a id="' + detailType + 'Color" style="color: ' + dewRcon.lastMessage + '">' + detailType + 'Color</a>'
        );
    }
    setTimeout(setTextColor, 1000);
}
function setArmor(bipedPart, armorType) {
    dewRcon.send('Player.Armor.' + bipedPart + ' ' + armorType);
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
}
function addTable(bipedPart) {
    checkArmor(bipedPart);
    var CLASS = '.armor' + bipedPart;
    $(CLASS).attr('onmouseover', 'setArmor($(this).siblings("th").first().attr("value"), $(this).attr("value"))');
    $(CLASS).attr('onclick', 'delTable("' + bipedPart + '")');
}
function delTable(bipedPart) {
    checkArmor(bipedPart);
    var CLASS = '.armor' + bipedPart;
        $(CLASS).removeAttr('onmouseover', '')
        $(CLASS).removeAttr('onclick', '')
}
var armorTypes1D = [
    "air_assault", "ballista", "chameleon", "cyclops", "demo", "dutch", "gladiator",
    "gungnir", "halberd", "hammerhead", "hoplite", "juggernaut", "mac",
    "mercenary", "nihard", "omni", "oracle", "orbital", "renegade", "scanner",
    "shark", "silverback", "spectrum", "stealth", "strider", "widow_maker",
    "Air Assault", "Ballista", "Chameleon", "Cyclops", "Demo", "Dutch", "Gladiator",
    "Gungnir", "Halberd", "Hammerhead", "Hoplite", "Juggernaut", "Mac",
    "Mercenary", "Ni-Hard", "Omni", "Oracle", "Orbital", "Renegade", "Scanner",
    "Shark", "Silverback", "Spectrum", "Stealth", "Strider", "Widow Maker"
];
var createGroupedArray = function(arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}
var armorTypes2D = createGroupedArray(armorTypes1D, 13);

function creteTable(bipedPart) {
    var firstID = "#" + bipedPart + "First";
    var lastID = "#" + bipedPart + "Last";
    $(firstID).append(
        '<th value="' + bipedPart + '" rowspan="2"><a onclick="addTable(' + "'" + bipedPart + "'" + ')" class="SideButtons">' + bipedPart + '</a></th>'
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

function checkArmor(bipedPart) {
    clearColor(bipedPart);
    dewRcon.send("Player.Armor." + bipedPart);
    dewRcon.dewWebSocket.onmessage = function(message) {
        //console.log(message.data);
        for (var i = 0; i < armorTypes2D[0].length; i++) {
            if (armorTypes2D[0][i] == message.data) {
                //CLASS = "." + armorTypesLower[i];
                var CLASS = ".armor" + bipedPart + "." + armorTypes2D[0][i];
                while ($(CLASS).attr('style') != 'color: blue') {
                    $(CLASS).attr('style', 'color: blue');
                }
            }
            /* else {
             console.log(
             "NOPE"
             );
             }*/
        }
    }
}
function clearColor(bipedPart){
    for (var i = 0; i < armorTypes2D[0].length; i++) {
        var CLASS = ".armor" + bipedPart;
        $(CLASS).attr('style', '');
    }
}