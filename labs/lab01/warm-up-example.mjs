/**
 * 
 *  create a function that, given an array of strings, for each string computes and prints a new one
    composed by the first two and last two characters. If the word is shorter than two characters, the function
    will print an empty string. Otherwise, if the word is two characters long, the function prints the same
    character twice. 
 */
const fn = function (arr) {
  let ret = [];
  arr.forEach((element) => {
    console.log(element.length);
    if (element.length > 2) {
      let str = element.substr(0, 2) + element.substr(element.length - 2, 2);
      ret.push(str);
    } else if (element.length == 2) {
      let str = element.substr(0, 2) + element.substr(0, 2);
      ret.push(str);
    } else {
      ret.push("");
    }
  });
  return ret;
};

let x = ["spring", "it", "cat", "a"];
let y = fn(x);

console.log(y);
