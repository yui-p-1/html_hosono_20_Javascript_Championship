import margedata from '../json/marge.json' assert {type: 'json'};
console.log(margedata);//Object

let elm4 = document.getElementsByClassName("result_4")[0];
// JSON 文字列に変換して表示
elm4.textContent = Object.keys(margedata);

// console.log(margedata["JP"]); // これは使える！

// 表を作成する。Arrayであることが必要なので変換する。

const margedataArr = Object.values(margedata);
console.log(margedataArr);//Array

for (let i = 0; i < margedataArr.length; i++) {
var pickup = Object.keys(margedataArr[i]);
};

const tablelist = document.getElementById("tablelist");
const tr = document.createElement("tr");
tablelist.appendChild(tr);
// 1行の中を生成
const objArray = pickup;
objArray.forEach((kkk) => {
  const th = document.createElement("th");
  th.textContent = kkk;
  tr.appendChild(th);
}); 

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


// Excelに保存する
  document.getElementById('dl-xlsx').addEventListener('click', function () {
    var wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    };
  
    var workbook = {SheetNames: [], Sheets: {}};
  
    document.querySelectorAll('table.content-table').forEach(function (currentValue, index) {
      // sheet_to_workbook()の実装を参考に記述
      var n = currentValue.getAttribute('data-sheet-name');
      if (!n) {
        n = 'Sheet' + index;
      }
      workbook.SheetNames.push(n);
      workbook.Sheets[n] = XLSX.utils.table_to_sheet(currentValue, wopts);
    });
  
    var wbout = XLSX.write(workbook, wopts);
  
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }
  
    saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), 'test.xlsx');
  }, false);


//出典:【JavaScript】配列/オブジェクトの形とデータ取得の方法
// https://webdrawer.net/javascript/array-object.html

// // 出典:Object の値を抽出して配列で返してくれるメソッド - JavaScript Object.values
// // https://www.mitomex.blog/js-object-values/

//出典:【javascript】連想配列をテーブルできれいに表示する方法
// https://gxy-life.com/2PC/PC/PC20211011.html

// 出典:HTMLのTableをExcelに出力するJavaScript
// https://qiita.com/tomgoodsun/items/0107e5d778b803935fc0

// // 時間があったらチャレンジする！！
// // 出典:Excelの表データをホームページ上で表示する
// // https://blog.19manabu.net/20170909/excel%E3%81%AE%E8%A1%A8%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8%E4%B8%8A%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B/


