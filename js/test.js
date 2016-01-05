
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


function checkArmor(bipedPart) {
    dewRcon.send("Player.Armor." + bipedPart);
    dewRcon.dewWebSocket.onmessage = function(message) {
        //console.log(message.data);
        for (var i = 0; i < armorTypesLower.length; i++) {
            if (armorTypesLower[i] == message.data) {
                //CLASS = "." + armorTypesLower[i];
                var CLASS = ".armor" + bipedPart + "." + armorTypesLower[i];
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