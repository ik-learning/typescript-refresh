// tsc types.ts
var n = 1;
n = 4;
var a = 1;
a = '111';
var isWinter = false;
var names = ["Jon", "Rickon", "Arya"];
var notJustNames = ["Jon", "Rickon", "Arya", 5];
var Starks;
(function (Starks) {
    Starks[Starks["Jon"] = 0] = "Jon";
    Starks[Starks["Bran"] = 1] = "Bran";
    Starks[Starks["Eddard"] = 2] = "Eddard";
    Starks[Starks["Catlyn"] = 3] = "Catlyn";
})(Starks || (Starks = {}));
;
var cat = Starks.Catlyn;
function getName() {
    return "some text";
}
function log() {
    console.log("Winder is coming");
}
