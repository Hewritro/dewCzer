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
    var CLASS = '.armor' + bipedPart;
    $(CLASS).attr('onmouseover', 'setArmor($(this).siblings("th").first().attr("value"), $(this).attr("value"))');
    $(CLASS).attr('onclick', 'delTable("' + bipedPart + '")');
}
function delTable(bipedPart) {
    var CLASS = '.armor' + bipedPart;
        $(CLASS).removeAttr('onmouseover', '')
        $(CLASS).removeAttr('onclick', '')
}
var armorTypesLowerFirst = [
    "air_assault", "ballista", "chameleon", "cyclops", "demo", "dutch", "gladiator",
    "gungnir", "halberd", "hammerhead", "hoplite", "juggernaut", "mac"
];
var armorTypesUpperFirst = [
    "Air Assault", "Ballista", "Chameleon", "Cyclops", "Demo", "Dutch", "Gladiator",
    "Gungnir", "Halberd", "Hammerhead", "Hoplite", "Juggernaut", "Mac"
];
var armorTypesLowerLast = [
    "mercenary", "nihard", "omni", "oracle", "orbital", "renegade", "scanner",
    "shark", "silverback", "spectrum", "stealth", "strider", "widow_maker"
];
var armorTypesUpperLast = [
    "Mercenary", "Ni-Hard", "Omni", "Oracle", "Orbital", "Renegade", "Scanner",
    "Shark", "Silverback", "Spectrum", "Stealth", "Strider", "Widow Maker"
];
var armorTypesLwr = armorTypesLowerFirst + "," + armorTypesLowerLast, armorTypesUpper = armorTypesUpperFirst + "," + armorTypesUpperLast;
var armorTypesLower = armorTypesLwr.split(",");



function creteTable(bipedPart) {
    var firstID = "#" + bipedPart + "First"
    var lastID = "#" + bipedPart + "Last"
    $(firstID).append(
        '<th value="' + bipedPart + '" rowspan="2"><a onclick="addTable(' + "'" + bipedPart + "'" + ')" class="SideButtons">' + bipedPart + '</a></th>'
    );
    for (var i = 0; i < armorTypesLowerFirst.length; i++) {
        $(firstID).append(
            '<td class="armor' + bipedPart + ' ' + armorTypesLowerFirst[i] + '" value="' + armorTypesLowerFirst[i] + '">' + armorTypesUpperFirst[i] + '</td>'
        );
    }
    $(lastID).append('<th value="' + bipedPart + '" style="display: none"></th>');

    for (var i = 0; i < armorTypesLowerLast.length; i++) {
        $(lastID).append(
            '<td class="armor' + bipedPart + ' ' + armorTypesLowerLast[i] + '" value="' + armorTypesLowerLast[i] + '">' + armorTypesUpperLast[i] + '</td>'
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

    creteTable("Arms")
    creteTable("Chest")
    creteTable("Helmet")
    creteTable("Legs")
    creteTable("Shoulders")
}
