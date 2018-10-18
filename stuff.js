let array = [{
  key: 'unique',
  question: 'Whats your first name',
  answer: ['Alex', 'Kiki', 'Jenny']
},
{
  key: 'unique',
  question: 'Whats your last name',
  answer: ['Pedersen', 'Miguel', 'Cerveza']
},
{
  key: 'unique',
  question: 'Whats your height',
  answer: [167, 194, 179]
}
]

let array1=[[], [], [], [], [], []];

for (let index = 0; index < array.length; index++) {
  for (let j = 0; j < array[index].answer.length; j++) {
    array1[j].push(array[index].answer[j])
    
    // console.log(`${j}: ${array[index].answer[j]}`)
  }
}


console.log(array1);


// const map1 = array[0].answer.map(x => {
//   let index = array[0].answer.indexOf(x);
//   for (let i = 1; i < array.length; i++) {
//     console.log();
//     return [x, array[i].answer[index]]
//   }
// }
// );

// console.log(map1);