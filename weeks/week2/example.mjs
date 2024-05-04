//'use strict';  i moduli ES funzionano di default in strict mode

// CommonJS -> un modo per importare librerie (standard per node)
// const dayjs = require('dayjs');  // equivalente di import in altri linguaggi

// ES module (standard per js)
import dayjs from 'dayjs';

// ATTENZIONE: la conversione automatica da node a ES non sempre funziona (in questo caso funziona)

let oggi = dayjs();
console.log(oggi.format('YYYY-MM-DD'));




