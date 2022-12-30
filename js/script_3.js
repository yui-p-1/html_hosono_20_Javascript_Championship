import result2 from "../js/script_2.js";
console.log(result2);

/*
 * JSONデータ格納用
 */
var data2 = null;
 
/*
 * データを整形してテーブル表示
 */
function showTable(){
    // 表示用tableタグを生成
    var tag = "<table>";
    tag += "<tr><th>code</th><th>name_en</th><th>capital_en</th><th>lat</th><th>lon</th></tr>";
    for(var i=0; i<data2.length; i++){
        tag += "<tr>";
        tag += "<td>" + data2[i].country_code + "</td>";    
        tag += "<td>" + data2[i].name_en + "</td>";
        tag += "<td>" + data2[i].capital_en + "</td>";
        tag += "<td>" + data2[i].lat + "</td>";
        tag += "<td>" + data2[i].lon + "</td>";
        tag += "</tr>";
    }
    tag += "</table>";
    // HTMLファイルに生成したtableタグを設定（ここで表示される）
    document.getElementById("contents").innerHTML = tag;
}
 
/*
 * 起動時の処理
 */
window.onload = function(){
    // XMLHttpRequestオブジェクトを作成
    var country = new XMLHttpRequest();
    // JOSNデータファイルを開く
    country.open("GET", "./json/country.json", true);
    // データファイル取得完了後の処理
    country.onload = function(){
        data2 = JSON.parse(this.responseText);   // JSONデータとしてdataに読み込む
        showTable();                            // テーブルに整形して表示
        // console.log(data2);
    }
    // リクエストを送信
    country.send(null);

};



// 出典:Excelの表データをホームページ上で表示する
// https://blog.19manabu.net/20170909/excel%E3%81%AE%E8%A1%A8%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E3%83%9B%E3%83%BC%E3%83%A0%E3%83%9A%E3%83%BC%E3%82%B8%E4%B8%8A%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B/

