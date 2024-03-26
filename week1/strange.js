/* Strange JS behaviors and where to find (some of) them */
'use strict';

const type = typeof NaN;
console.log('NaN is a ' + type); // false -> non è uguale a niente, neanche a se stesso 
console.log(`NaN === NaN? ${NaN === NaN}\n`); // false, per lo stesso motivo di prima 

console.log(`NaN == NaN? ${NaN == NaN}`); // false
console.log(`null == undefined? ${null == undefined}\n`); // true, con l'uguaglianza non stretta, sono entrambi una variante di null

console.log(`null == false? ${null == false}`); // false
console.log(`'' == false? ${'' == false}`); // true
console.log(`3 == true? ${3 == true}`); // false, con la doppia uguaglianza il booleano viene trasformato in 1/0, in questo caso a 1
console.log(`0 == -0? ${0 == -0}\n`); // true

console.log(`true + true = ${true + true}`); // false, risulta 2, con la doppia uguaglianza il booleano viene trasformato in 1/0, in questo caso a 1
console.log(`true !== 1? ${true !== 1}\n`); // true, si stratta di una stretta (dis)uguaglianza, non avviane alcuna conversione 

console.log(`5 + '10' = ${5 + '10'}`); // '510'
console.log(`'5' - 1 = ${'5' - 1}\n`); // 4

console.log(`1 < 2 < 3? ${1 < 2 < 3}`); // true
console.log(`3 > 2 > 1? ${3 > 2 > 1}\n`); // false -> 3 > 2 --> 1 -> 1 > 1 --> false

console.log(`0.2 + 0.1 === 0.3? ${0.2 + 0.1 === 0.3}\n`); // false -> conversione dei floating point, non si ottiene mai il numero esatto
console.log('b' + 'a' + (+ 'a') + 'a'); //  b a NaN a --> l'operatore () può essere applicato ai soli numeri 