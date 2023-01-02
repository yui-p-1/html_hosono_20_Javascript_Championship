import margedata from '../json/marge.json' assert {type: 'json'};
console.log(margedata);//Object

let elm4 = document.getElementsByClassName("result_4")[0];
// JSON 文字列に変換して表示
elm4.textContent = Object.keys(margedata);

// console.log(margedata["JP"]); // これは使える！


// 他の例だったらエラー出るかも。margedataがObjectか、配列かでif文のほうがBetter？要確認
const margedataArr = Object.values(margedata);
console.log(margedataArr);//Array

// 表を作成

const datatable = document.getElementById("datatable");
margedataArr.forEach((eachdata) => {  // 配列の中のオブジェクトの数だけ処理を繰り返す
    const tr = document.createElement("tr");  
    datatable.appendChild(tr); // 表の中にN個の「tr」（行）ができる
    // 1行の中を生成
    const objArray = Object.entries(eachdata);  // オブジェクトを配列に
    objArray.forEach((arr) => { // No, name, age, gradeの4回繰り返す
      const td = document.createElement("td");
      td.textContent = arr[1];  // arr[1]はvalueの部分
      tr.appendChild(td);

    });
  });

  console.log(datatable);


//出典:【JavaScript】配列/オブジェクトの形とデータ取得の方法
// https://webdrawer.net/javascript/array-object.html

// // 出典:Object の値を抽出して配列で返してくれるメソッド - JavaScript Object.values
// // https://www.mitomex.blog/js-object-values/

//出典:【javascript】連想配列をテーブルできれいに表示する方法
// https://gxy-life.com/2PC/PC/PC20211011.html

// // 時間があったらチャレンジする！！
// // 出典:Excelの表データをホームページ上で表示する
// // https://blog.19manabu.net/20170909/excel%E3%81%AE%E8%A1%A8%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8%E4%B8%8A%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B/


