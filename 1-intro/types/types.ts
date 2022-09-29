// tsc types.ts
var n: Number = 1;

n = 4;

let a: any = 1;

a = '111';

var isWinter: boolean = false

var names: string[] = ["Jon", "Rickon", "Arya"]
var notJustNames: any[] = ["Jon", "Rickon", "Arya", 5]

enum Starks { Jon, Bran, Eddard, Catlyn };

var cat: Starks = Starks.Catlyn;

function getName() : string {
  return "some text"
}
