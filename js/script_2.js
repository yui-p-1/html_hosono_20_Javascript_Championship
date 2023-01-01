import data_1 from '../json/data_1.json' assert {type: 'json'};
    console.log(data_1);

import data_2 from '../json/data_2.json' assert {type: 'json'};
    console.log(data_2);

// ここで手動操作が必要。改善したい。
// 改善点１："Sheet1": [ と ] を取り除かなければいけない。data_1、data_2の両方


// 紐づけKey
function butotnClick(){
    msg.innerText = '紐づけKeyは' + nameText.value + 'です';
    
    const key = nameText.value

    var data1_r1 = data_1.reduce( (rslt, entry) =>
    (rslt[entry[key]] = entry, rslt), {});
    console.log( data1_r1 );

    var data2_r1 = data_2.reduce( (rslt, entry) =>
    (rslt[entry[key]] = entry, rslt), {});
    console.log( data2_r1 );

    const a = data1_r1;
    const b = data2_r1;

    const try1 = Object.assign(a, b);
    console.log("try1=");
    console.log(try1);

    return { try1
    };

};
  
  let nameText = document.getElementById('nameText');
  nameText.value = '';
  let msg = document.getElementById('msg');
  
  let checkButton = document.getElementById('checkButton');
  checkButton.addEventListener('click', butotnClick);

  const Result = butotnClick().try1;

  export default Result;

    // function mergeDeeply(target, source, opts) {
    //     const isObject = obj => obj && typeof obj === 'object' && !Array.isArray(obj);
    //     const isConcatArray = opts && opts.concatArray;
    //     let result = Object.assign({}, target);
    //     if (isObject(target) && isObject(source)) {
    //         for (const [sourceKey, sourceValue] of Object.entries(source)) {
    //             const targetValue = target[sourceKey];
    //             if (isConcatArray && Array.isArray(sourceValue) && Array.isArray(targetValue)) {
    //                 result[sourceKey] = targetValue.concat(...sourceValue);
    //             }
    //             else if (isObject(sourceValue) && target.hasOwnProperty(sourceKey)) {
    //                 result[sourceKey] = mergeDeeply(targetValue, sourceValue, opts);
    //             }
    //             else {
    //                 Object.assign(result, {[sourceKey]: sourceValue});
    //             }
    //         }
    //     }
    //     return result;
    // }

    //     const adeep = data1_r1;
    //     const bdeep = data2_r1;

    // const deepResult = mergeDeeply(adeep, bdeep, {concatArray: true});

    // console.log('deepResult=');
    // console.log(deepResult);

    // export default deepResult;

    // const ArrayResult = Object.entries(Result);
    // console.log(ArrayResult);
    
document.getElementById('dllnk_3').addEventListener('click', (event) => {
    // JSON ファイルを表す Blob オブジェクトを生成
    const json = JSON.stringify(Result);
    console.log(json);
    const blob = new Blob([json], { type: 'application/json' });
    // const blob = new Blob([Result], { type: 'application/json' });
   
    // a 要素の href 属性に Object URL を セット
    event.currentTarget.href = window.URL.createObjectURL(blob);
    // event.currentTarget.href = window.URL.createObjectURL(json);
  });


       // 表示用要素取得
    //    let elm = document.getElementsByClassName("result_3")[0];

       // JSON 文字列に変換して表示
    //    elm.textContent = JSON.stringify(Result);


// 出典:配列（内はJSON）同士を条件によって結合したい
// https://teratail.com/questions/295412

// 出典:JavaScriptでオブジェクトをマージ（結合）する方法、JSONのマージをする方法
// https://qiita.com/riversun/items/60307d58f9b2f461082a

// 出典:javascript オブジェクトを配列化する
// https://mebee.info/2021/01/04/post-19151/

// 出典:javascript オブジェクトをhtml上に表示する
// https://mebee.info/2020/09/24/post-18484/

// 出典:テキストボックスの値をJavaScriptを使って取得・設定する
// https://www.javadrive.jp/javascript/form/index1.html
