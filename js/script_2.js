function mergeDeeply(target, source, opts) {
    const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
    const isConcatArray = opts && opts.concatArray;
    let result = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        for (const [sourceKey, sourceValue] of Object.entries(source)) {
            const targetValue = target[sourceKey];
            if (isConcatArray && Array.isArray(sourceValue) && Array.isArray(targetValue)) {
                result[sourceKey] = targetValue.concat(...sourceValue);
            }
            else if (isObject(sourceValue) && target.hasOwnProperty(sourceKey)) {
                result[sourceKey] = mergeDeeply(targetValue, sourceValue, opts);
            }
            else {
                Object.assign(result, {[sourceKey]: sourceValue});
            }
        }
    }
    return result;
}

import data1 from '../json/data_1.json' assert {type: 'json'};

// console.log(data1);

import data2 from '../json/data_2.json' assert {type: 'json'};

// console.log(data2);

const a = data1;
const b = data2;

const result2 = mergeDeeply(a, b);

console.log('result2=');
console.log(result2);

export default result2;


document.getElementById('dllnk_2').addEventListener('click', (event) => {
    // JSON ファイルを表す Blob オブジェクトを生成
    const json = JSON.stringify(result2);
    const blob = new Blob([json], { type: 'application/json' });
   
    // a 要素の href 属性に Object URL を セット
    event.currentTarget.href = window.URL.createObjectURL(blob);
  });




// 出典:JavaScriptでオブジェクトをマージ（結合）する方法、JSONのマージをする方法
// https://qiita.com/riversun/items/60307d58f9b2f461082a