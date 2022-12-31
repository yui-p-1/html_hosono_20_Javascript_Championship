import Result from "../js/script_2.js";
console.log(Result);

/*
 * JSONデータ格納用
 */
var margedata = null;
 
/*
 * データを整形してテーブル表示
 */
function showTable(){
    // 表示用tableタグを生成
    var tag = "<table>";
    tag += "<tr><th>code</th><th>name_en</th><th>capital_en</th><th>lat</th><th>lon</th></tr>";
    for(var i=0; i<margedata.length; i++){
        tag += "<tr>";
        tag += "<td>" + margedata[i].country_code + "</td>";    
        tag += "<td>" + margedata[i].name_en + "</td>";
        tag += "<td>" + margedata[i].capital_en + "</td>";
        tag += "<td>" + margedata[i].lat + "</td>";
        tag += "<td>" + margedata[i].lon + "</td>";
        tag += "</tr>";
    }
    tag += "</table>";
    // HTMLファイルに生成したtableタグを設定（ここで表示される）
    document.getElementById("contents_3").innerHTML = tag;
}
 
/*
 * 起動時の処理
 */
window.onload = function(){
    // XMLHttpRequestオブジェクトを作成
    var margetable = new XMLHttpRequest();
    // JOSNデータファイルを開く
    margetable.open("GET", "./json/marge.json", true);
    // データファイル取得完了後の処理
    margetable.onload = function(){
        margedata = JSON.parse(this.responseText);   // JSONデータとしてdataに読み込む
        showTable();                            // テーブルに整形して表示
        console.log(margedata);
    }
    // リクエストを送信
    margetable.send(null);
    console.log(margetable);

};



// 出典:Excelの表データをホームページ上で表示する
// https://blog.19manabu.net/20170909/excel%E3%81%AE%E8%A1%A8%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8%E4%B8%8A%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B/

