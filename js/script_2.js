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
    tag += "<tr><th>No</th><th>Code</th><th>Country-Name</th></tr>";
    for(var i=0; i<data2.length; i++){
        tag += "<tr>";
        tag += "<td>" + data2[i].countryNo + "</td>";    // country-Noを取得
        tag += "<td>" + data2[i].countryCode + "</td>";       // country-codeを取得
        tag += "<td>" + data2[i].countryName + "</td>";       // country-nameを取得
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





// const a = {
//     familyName: '織田',
//     firstName: '吉法師', 
//     address: '尾張', 
//     sex: '男',
//     details: {
//         character: {favoriteTactics: '奇襲', favoriteWord: '天下布武', favoritePlace: '京'},
//         ownedCastle: ['清洲城']
//     }
// };

// const b = {
//     familyName: '織田',
//     firstName: '信長',
//     details: {
//         character: {favoriteTactics: '鉄砲活用'},
//         ownedCastle: ['岐阜城', '安土城']
//     }
// };

// const result1 = Object.assign(a, b);

// console.log('result1=');
// console.log(result1);



// 出典:JavaScriptでオブジェクトをマージ（結合）する方法、JSONのマージをする方法
// https://qiita.com/riversun/items/60307d58f9b2f461082a