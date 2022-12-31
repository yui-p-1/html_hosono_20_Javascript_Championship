import data1 from '../json/data.json' assert {type: 'json'};
    console.log(data1);

import data2 from '../json/marge.json' assert {type: 'json'};
    console.log(data2);

    var data1_r1 = data1.reduce( (rslt, entry) =>
    (rslt[entry.country_code] = entry, rslt), {});
    console.log( data1_r1 );

    var data2_r1 = data2.reduce( (rslt, entry) =>
    (rslt[entry.country_code] = entry, rslt), {});
    console.log( data2_r1 );

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

        const a = data1_r1;
        const b = data2_r1;

    const Result = mergeDeeply(a, b, {concatArray: true});

    console.log('Result=');
    console.log(Result);

    export default Result;

    const ArrayResult = Object.entries(Result);
    console.log(ArrayResult);
    
document.getElementById('dllnk_2').addEventListener('click', (event) => {
    // JSON ファイルを表す Blob オブジェクトを生成
    const json = JSON.stringify(Result);
    const blob = new Blob([json], { type: 'application/json' });
    // const blob = new Blob([Result], { type: 'application/json' });
   
    // a 要素の href 属性に Object URL を セット
    event.currentTarget.href = window.URL.createObjectURL(blob);
  });

// 出典:配列（内はJSON）同士を条件によって結合したい
// https://teratail.com/questions/295412

// 出典:JavaScriptでオブジェクトをマージ（結合）する方法、JSONのマージをする方法
// https://qiita.com/riversun/items/60307d58f9b2f461082a

// 出典:javascript オブジェクトを配列化する
// https://mebee.info/2021/01/04/post-19151/
