function addTable(bipedPart) {
    if (bipedPart == "Arms") {
        $('.armorArms').attr('onmouseover', 'setArmor($(this).siblings("th").first().attr("value"), $(this).attr("value"))')
        $('.armorArms').attr('onclick', 'delTable("Arms")')
    } else if (bipedPart == "Chest") {
        $('.armorChest').attr('onmouseover', 'setArmor($(this).siblings("th").first().attr("value"), $(this).attr("value"))')
        $('.armorChest').attr('onclick', 'delTable("Chest")')
    } else if (bipedPart == "Helmet") {
        $('.armorHelmet').attr('onmouseover', 'setArmor($(this).siblings("th").first().attr("value"), $(this).attr("value"))')
        $('.armorHelmet').attr('onclick', 'delTable("Helmet")')
    } else if (bipedPart == "Legs") {
        $('.armorLegs').attr('onmouseover', 'setArmor($(this).siblings("th").first().attr("value"), $(this).attr("value"))')
        $('.armorLegs').attr('onclick', 'delTable("Legs")')
    } else if (bipedPart == "Shoulders") {
        $('.armorShoulders').attr('onmouseover', 'setArmor($(this).siblings("th").first().attr("value"), $(this).attr("value"))')
        $('.armorShoulders').attr('onclick', 'delTable("Shoulders")')
    } else {
    }
}
function delTable(bipedPart) {
    if (bipedPart == "Arms") {
        $('.armorArms').removeAttr('onmouseover', '')
        $('.armorArms').removeAttr('onclick', '')
    } else if (bipedPart == "Chest") {
        $('.armorChest').removeAttr('onmouseover', '')
        $('.armorChest').removeAttr('onclick', '')
    } else if (bipedPart == "Helmet") {
        $('.armorHelmet').removeAttr('onmouseover', '')
        $('.armorHelmet').removeAttr('onclick', '')
    } else if (bipedPart == "Legs") {
        $('.armorLegs').removeAttr('onmouseover', '')
        $('.armorLegs').removeAttr('onclick', '')
    } else if (bipedPart == "Shoulders") {
        $('.armorShoulders').removeAttr('onmouseover', '')
        $('.armorShoulders').removeAttr('onclick', '')
    } else {
    }
}
function getArmor(bipedPart) {
    dewRcon.send('Player.Armor.' + bipedPart);
}
function getColor(colorType) {
    dewRcon.send('Player.Colors.' + colorType);
    document.getElementById('HoloColor').jscolor.fromString(dewRcon.lastMessage);
}

function setArmor(bipedPart, armorType) {
    dewRcon.send('Player.Armor.' + bipedPart + ' ' + armorType);
}
function setColor(bipedPart, colorHex) {
    dewRcon.send('Player.Colors.' + bipedPart + ' ' + colorHex);
}

function getAll() {
    function initialize() {
        getArmor('Arms');
        getArmor('Chest');
        getArmor('Helmet');
        getArmor('Legs');
        getArmor('Shoulders');

        getColor('Holo');
        document.getElementById('HoloColor').jscolor.fromString(dewRcon.lastMessage);
        function HoloColor() {
            var cw = Raphael.colorwheel($('#HoloColor .colorwheel')[0], 150);
            cw.input($('#HoloColor input')[0]);
        }

        getColor('Lights');
        document.getElementById('LightsColor').jscolor.fromString(dewRcon.lastMessage);
        function LightsColor() {
            var cw = Raphael.colorwheel($('#LightsColor .colorwheel')[0], 150);
            cw.input($('#LightsColor input')[0]);
        }

        getColor('Primary');
        document.getElementById('PrimaryColor').jscolor.fromString(dewRcon.lastMessage);
        function PrimaryColor() {
            var cw = Raphael.colorwheel($('#PrimaryColor .colorwheel')[0], 150);
            cw.input($('#PrimaryColor input')[0]);
        }

        getColor('Secondary');
        document.getElementById('SecondaryColor').jscolor.fromString(dewRcon.lastMessage);
        function SecondaryColor() {
            var cw = Raphael.colorwheel($('#SecondaryColor .colorwheel')[0], 150);
            cw.input($('#SecondaryColor input')[0]);
        }

        getColor('Visor');
        document.getElementById('VisorColor').jscolor.fromString(dewRcon.lastMessage);
        function VisorColor() {
            var cw = Raphael.colorwheel($('#VisorColor .colorwheel')[0], 150);
            cw.input($('#VisorColor input')[0]);
        }
    }

    setTimeout(initialize, 3000);
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

/*
 function createTable() {
 for (var i = 0; i < armorTypesLowerFirst.length; i++) {
 $('#ArmsFirst').append(
 '<td class="armorArms" value="' + armorTypesLowerFirst[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperFirst[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerLast.length; i++) {
 $('#ArmsLast').append(
 '<td class="armorArms" value="' + armorTypesLowerLast[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperLast[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerFirst.length; i++) {
 $('#ChestFirst').append(
 '<td class="armorChest" value="' + armorTypesLowerFirst[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperFirst[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerLast.length; i++) {
 $('#ChestLast').append(
 '<td class="armorChest" value="' + armorTypesLowerLast[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperLast[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerFirst.length; i++) {
 $('#HelmetFirst').append(
 '<td class="armorHelmet" value="' + armorTypesLowerFirst[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperFirst[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerLast.length; i++) {
 $('#HelmetLast').append(
 '<td class="armorHelmet" value="' + armorTypesLowerLast[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperLast[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerFirst.length; i++) {
 $('#LegsFirst').append(
 '<td class="armorLegs" value="' + armorTypesLowerFirst[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperFirst[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerLast.length; i++) {
 $('#LegsLast').append(
 '<td class="armorLegs" value="' + armorTypesLowerLast[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperLast[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerFirst.length; i++) {
 $('#ShouldersFirst').append(
 '<td class="armorShoulders" value="' + armorTypesLowerFirst[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperFirst[i] + '</button></td>'
 )
 }
 for (var i = 0; i < armorTypesLowerLast.length; i++) {
 $('#ShouldersLast').append(
 '<td class="armorShoulders" value="' + armorTypesLowerLast[i] + '"><button style="display: block; width: 100%;">' + armorTypesUpperLast[i] + '</button></td>'
 )
 }
 }*/

function creteTable(bipedPart) {
    var defautID = "#" + bipedPart + "First"
    $(defautID).append(
        '<th value="' + bipedPart + '" rowspan="2"><a onclick="addTable(' + "'" + bipedPart + "'" + ')" class="SideButtons">' + bipedPart + '</a></th>'
    for (var i = 0; i < armorTypesLowerFirst.length; i++) {
        $(defautID).append(
            '<td class="armor' + bipedPart + '" value="' + armorTypesLowerFirst[i] + '">' + armorTypesUpperFirst[i] + '</td>'
        );
    }
    var defautID = "#" + bipedPart + "Last"
    $(defautID).append('<th value="' + bipedPart + '" style="display: none"></th>');

    for (var i = 0; i < armorTypesLowerLast.length; i++) {
        $(defautID).append(
            '<td class="armor' + bipedPart + '" value="' + armorTypesLowerLast[i] + '">' + armorTypesUpperLast[i] + '</td>'
        );
    }
}

function createFullTable() {
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
