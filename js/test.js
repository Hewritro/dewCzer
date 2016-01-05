
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


function checkArmor(bipedPart, armorType) {

    for (var i = 0; i < armorTypesLower.length; i++) {
        if (armorTypesLower[i] == armorType) {
            //CLASS = "." + armorTypesLower[i];
            var CLASS = ".armor" + bipedPart + "." + armorTypesLower[i];
            $(CLASS).attr('style', 'color: blue')
        }/* else {
            console.log(
                "NOPE"
            );
        }*/
    }
}

function test(bipedPart) {
    getArmor(bipedPart);
    setTimeout(getArmor(bipedPart), 1000);
    setTimeout(checkArmor(bipedPart, getArmor(bipedPart)), 2000);
}