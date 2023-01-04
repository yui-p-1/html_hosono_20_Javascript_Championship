// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
    from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.14.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbozVfg_k4EqKEs38-zF9zdEagcXvk-y4",
    authDomain: "fir-demo-fd918.firebaseapp.com",
    projectId: "fir-demo-fd918",
    storageBucket: "fir-demo-fd918.appspot.com",
    messagingSenderId: "72528433443",
    appId: "1:72528433443:web:ac7b0280aecaa4973efc96"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app); // Realtime DB に接続
  const dbRef = ref(db, "database"); // Realtime D内の database を使う

import data_1 from '../json/data_1.json' assert {type: 'json'};
    console.log(data_1);

import data_2 from '../json/data_2.json' assert {type: 'json'};
    console.log(data_2);

// ここで手動操作が必要。改善したい。
// 改善点１："Sheet1": [ と ] を取り除かなければいけない。data_1、data_2の両方

// 紐づけKey
let nameText = document.getElementById('nameText');
nameText.value = '';
let msg = document.getElementById('msg');

let checkButton = document.getElementById('checkButton');
checkButton.addEventListener('click', butotnClick);


let RRR
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
    
    var RRR = mergeDeeply(a, b); //Object

    console.log(RRR);
        
    // 表示用要素取得
    let elm = document.getElementsByClassName("result_3")[0];

    // JSON 文字列に変換して表示
    elm.textContent = JSON.stringify(RRR);

    let elm4 = document.getElementsByClassName("result_4")[0];
    
    elm4.textContent = Object.keys(RRR);

    var elm4_r1 = Object.keys(RRR);
    var elm4_r1 = elm4.textContent;
    var elm4_r2 = elm4_r1.replace(/,/g, "<br>");
    var elm4_r3 = '<p>' + elm4_r2 + '</p>';

    var textbox_element = document.getElementById('result_10');
    var div = document.createElement('div');
    div.id = 'result_10';
    div.innerHTML = elm4_r3; //html要素に変換
    console.log(div);

    textbox_element.appendChild(div);



// // 予備：Keyリスト表示
//     const keyList = document.getElementById("keyList");
//     console.log(keyList);

//     const td = document.createElement("td");
//     keyList.appendChild(td);
//     // 1行の中を生成
//     const objArray = Object.keys(RRR);
//     objArray.forEach((kkk) => {
//       const tr = document.createElement("tr");
//       tr.textContent = kkk;
//       td.appendChild(tr);
//     }); 
// // 予備：Keyリスト表示



    // クリックでFireBaseに保存
    const data_json_3 = JSON.stringify(RRR); //Json文字列に
    $("#Save_3").on("click", function () {
        const savedata_3 = data_json_3;
        const inputdata_3 = push(dbRef);
        set(inputdata_3, savedata_3);

    });
 
    document.getElementById('dllnk_3').addEventListener('click', (event) => {
        const json = JSON.stringify(RRR);
        const blob = new Blob([json], { type: 'application/json' });
        event.currentTarget.href = window.URL.createObjectURL(blob);
    });
    
    return RRR
};



// console.log(RRR);
// functionの外でResultを使いたい．．．．


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
