
function getArmor(bodyPiece){
    dewRcon.send('Player.Armor.' + bodyPiece);
}
function getColor(colorType){
    dewRcon.send('Player.Colors.' + colorType);
    document.getElementById('HoloColor').jscolor.fromString(dewRcon.lastMessage)
}

function setArmor(bodyPiece, armorType){
    dewRcon.send('Player.Armor.' + bodyPiece + ' ' + armorType);
}
function setColor(bodyPiece, colorHex){
    dewRcon.send('Player.Colors.' + bodyPiece + ' ' + colorHex);
}

function getAll(){
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
