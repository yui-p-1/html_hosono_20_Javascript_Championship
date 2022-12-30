import data1 from '../json/data_1.json' assert {type: 'json'};

// console.log(data1);

import data2 from '../json/data_2.json' assert {type: 'json'};

// console.log(data2);

const a = data1;
const b = data2;

const result1 = Object.assign(a, b);
console.log(result1);



// const a = {
//     familyName: '織田',
//     firstName: '吉法師', 
//     address: '尾張', 
//     sex: '男',
//     details: {
//         character: {favoriteTactics: '奇襲', favoriteWord: '天下布武', favoritePlace: '京'},
//         ownedCastle: ['清洲城']
//     }
// };

// const b = {
//     familyName: '織田',
//     firstName: '信長',
//     details: {
//         character: {favoriteTactics: '鉄砲活用'},
//         ownedCastle: ['岐阜城', '安土城']
//     }
// };

// const result1 = Object.assign(a, b);

// console.log('result1=');
// console.log(result1);



// 出典:JavaScriptでオブジェクトをマージ（結合）する方法、JSONのマージをする方法
// https://qiita.com/riversun/items/60307d58f9b2f461082a