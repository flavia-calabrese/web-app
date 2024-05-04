'use strict'
const scores = [20, -5, -1, 100, -3, 30, 50];
const betterScores = [];

// elimino gli score negativi //
for(let s of scores){
    if (s >= 0)
        betterScores.push(s)
}
let NN = scores.length - betterScores.length;

// elimino i due score più bassi tra quelli rimasti //

/** 
//min 
let minScore = Math.min(...betterScore);
let index = betterScore.indexOf(minScore);
betterScore.splice(index, 1);

minScore = Math.min(...betterScore);
index = betterScore.indexOf(minScore);
betterScore.splice(index, 1);

*/

// Versione con SORT
betterScores.sort((a,b) => a-b);
betterScores.shift();
betterScores.shift();


// Add NN+2 new scores, at the end of the array, 
// with a value equal to the (rounded) average of the existing scores.

let average = 0;
for (const s of betterScores){
    average +=s;
}
average = average/betterScores.length;

// mi serve la media attotondata
average = Math.round(average);

for (let i=0; i< NN+2; i++){
    betterScores.push(average);
}



console.log(NN);
console.log(average);
console.log(betterScores);
