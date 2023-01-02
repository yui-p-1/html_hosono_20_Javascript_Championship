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

  // Excelを読み込む
 (function (window, document) {
    window.ExcelJs = {};
    ExcelJs.File = function (_file, _workbook) {
      var that = this;
      var file = _file;
      var workbook = _workbook;
  
      return {
        getFile: function () {
          return file;
        },
        getWorkbook: function () {
          return workbook;
        },
        toJson: function () {
          var result = {};
          workbook.SheetNames.forEach(function(sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if(roa.length > 0){
              result[sheetName] = roa;
            }
          });
          return result;
        },
        toCsv: function () {
          var result = [];
          workbook.SheetNames.forEach(function(sheetName) {
            var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
            if(csv.length > 0){
              result.push('SHEET: ' + sheetName);
              result.push('');
              result.push(csv);
            }
          });
          return result.join("\n");
        },
        toFormulae() {
          var result = [];
          workbook.SheetNames.forEach(function(sheetName) {
            var formulae = XLSX.utils.get_formulae(workbook.Sheets[sheetName]);
            if(formulae.length > 0){
              result.push('SHEET: ' + sheetName);
              result.push('');
              result.push(formulae.join("\n"));
            }
          });
          return result.join("\n");
        }
      };
    };
  
    ExcelJs.Reader = function (_file, onload) {
      var that = this;
  
      var file = _file;
      var reader = new FileReader();
  
      reader.onload = function(e) {
        var data = e.target.result;
  
        // データが多いとString.fromCharCode()でMaximum call stack size exceededエラーとなるので、
        // 別途関数で処理をする。
        //var arr = String.fromCharCode.apply(null, new Uint8Array(data));
        var arr = handleCodePoints(new Uint8Array(data));
  
        if (typeof onload == 'function') {
          onload(e, new ExcelJs.File(file, XLSX.read(btoa(arr), {type: 'base64'})));
        }
      };
      reader.readAsArrayBuffer(file);
    };
  })(window, window.document);
  
  // see: https://github.com/mathiasbynens/String.fromCodePoint/issues/1
  function handleCodePoints(array) {
    var CHUNK_SIZE = 0x8000; // arbitrary number here, not too small, not too big
    var index = 0;
    var length = array.length;
    var result = '';
    var slice;
    while (index < length) {
      slice = array.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return result;
  }
  
  function renderResult(name, content) {
    var elem = document.getElementById('result_1');
    var html = elem.innerHTML;
    html += '<h3>' + name + '</h3>';
    html += '<pre>' + content + '</pre>';
    elem.innerHTML = html;

      // console.log(content);
      const data_json = JSON.parse( content );
      // console.log(data_json);

  // クリックでFireBaseに保存
  $("#Save").on("click", function () {
    
    const savedata = data_json;

    // console.log(savedata);

    const inputdata = push(dbRef);
    // console.log("newPostRef: ", newbookRef);
    set(inputdata, savedata);

  });


  document.getElementById('dllnk').addEventListener('click', (event) => {
    // JSON ファイルを表す Blob オブジェクトを生成
    const json = JSON.stringify(data_json);
    const blob = new Blob([json], { type: 'application/json' });
   
    // a 要素の href 属性に Object URL を セット
    event.currentTarget.href = window.URL.createObjectURL(blob);
  });

  };
  
   document.getElementById('import-excel').addEventListener('change', function (evt) {
    var files = evt.target.files;
    var i, f;
    for (i = 0, f = files[i]; i != files.length; ++i) {
      var er = new ExcelJs.Reader(f, function (e, xlsx) {
        renderResult(xlsx.getFile().name, JSON.stringify(xlsx.toJson(), null, 2));
      });
    }
  }, false);

  // ファイル2用----------------------------------

  function renderResult_2(name_2, content_2) {
    var elem_2 = document.getElementById('result_2');
    var html_2 = elem_2.innerHTML;
    html_2 += '<h3>' + name_2 + '</h3>';
    html_2 += '<pre>' + content_2 + '</pre>';
    elem_2.innerHTML = html_2;

      const data_json_2 = JSON.parse( content_2 );

  // クリックでFireBaseに保存
  $("#Save").on("click", function () {
    const savedata_2 = data_json_2;
    const inputdata_2 = push(dbRef);
    set(inputdata_2, savedata_2);

  });

  document.getElementById('dllnk_2').addEventListener('click', (event) => {
    // JSON ファイルを表す Blob オブジェクトを生成
    const json_2 = JSON.stringify(data_json_2);
    const blob_2 = new Blob([json_2], { type: 'application/json' });
   
    // a 要素の href 属性に Object URL を セット
    event.currentTarget.href = window.URL.createObjectURL(blob_2);
  });


  };

  document.getElementById('import-excel_2').addEventListener('change', function (evt) {
    var files_2 = evt.target.files;
    var i, f;
    for (i = 0, f = files_2[i]; i != files_2.length; ++i) {
      var er = new ExcelJs.Reader(f, function (e, xlsx) {
        renderResult_2(xlsx.getFile().name, JSON.stringify(xlsx.toJson(), null, 2));
      });
    }
  }, false);


  // クリックでFirebaseからデータ取得
  $("#getdata").on("click", function () {
    // チャレンジ
    onChildAdded(dbRef, function(data) {
      
      const firekey = data.key
      const firedata = data.val();
      
      console.log(firekey);
      console.log(firedata);

      // 表示用要素取得
      var elm_4 = document.getElementsByClassName("result_1")[0];
      var html_4 = elm_4.innerHTML;

      html_4 += firekey;
      html_4 += JSON.stringify(firedata);
      elm_4.innerHTML = html_4;

});
  });


  // クリックでFirebase削除
  $("#all-delete").on("click", function () {
    remove(dbRef);
    location.reload();
  });

  
// 時間があったらチャレンジ
// 出典： [ツール] ブラウザでJSONをフォーマット（整形）できるツールを作りました
// https://dev.classmethod.jp/articles/release-json-formatter-on-web-app/