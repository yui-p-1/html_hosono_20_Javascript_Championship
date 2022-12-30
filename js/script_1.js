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
    var elem = document.getElementById('result');
    var html = elem.innerHTML;
    html += '<h3>' + name + '</h3>';
    html += '<pre>' + content + '</pre>';
    elem.innerHTML = html;

      // console.log(content);
      const data_json = JSON.parse( content );
      console.log(data_json);

  // クリックでFireBaseに保存
  $("#Save").on("click", function () {
    
    const savedata = data_json;

    console.log(savedata);

    const inputdata = push(dbRef);
    // console.log("newPostRef: ", newbookRef);
    set(inputdata, savedata);

  });

  // クリックでFireBase削除
  $("#all-delete").on("click", function () {
    remove(dbRef);
    location.reload();
  }); 

}
   
  document.getElementById('import-excel').addEventListener('change', function (evt) {
    var files = evt.target.files;
    var i, f;
    for (i = 0, f = files[i]; i != files.length; ++i) {
      var er = new ExcelJs.Reader(f, function (e, xlsx) {
        renderResult(xlsx.getFile().name, JSON.stringify(xlsx.toJson(), null, 2));
      });
    }
  }, false);


  
