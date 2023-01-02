//  ****************************************************************************************
  // BingMaps&BmapQuery
  //****************************************************************************************
  //Init
  let map;
  function GetMap(){
      //------------------------------------------------------------------------
      //1. Instance
      //------------------------------------------------------------------------
      map = new Bmap("#myMap");
  
      //------------------------------------------------------------------------
      //2. Display Map
      //------------------------------------------------------------------------
      map.startMap(35.4779136, 139.6211712, "load", 10); //The place is Bellevue.

  
      //----------------------------------------------------
      //3. Add Pushpin
      // map.pin( lat, lon, "color", [drag:true|false], [click:true|false], [hover:true|false], [visible:true|false] );
      //----------------------------------------------------
      map.pin(35.4779136, 139.6211712, "#ff0000");

      map.infobox(35.4779136, 139.6211712, "Title", "Description");

  }

//1．位置情報の取得に成功した時の処理
function mapsInit(position) {
    //lat=緯度、lon=経度 を取得
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`緯度:${lat} 経度:${lon}`);
    console.log(position.coords);
    map.startMap(lat, lon, "load", 10);

};

//2． 位置情報の取得に失敗した場合の処理
function mapsError(error) {
  let e = "";
  if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
    e = "位置情報が許可されてません";
  }
  if (error.code == 2) { //2＝現在地を特定できない
    e = "現在位置を特定できません";
  }
  if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
    e = "位置情報を取得する前にタイムアウトになりました";
  }
  alert("エラー：" + e);
};

//3.位置情報取得オプション
var set ={
  enableHighAccuracy: true, //より高精度な位置を求める
  maximumAge: 20000,        //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
  timeout: 10000            //10秒以内に現在地情報を取得できなければ、処理を終了
};

//Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition
navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);

// 出典:
// https://mapapi.org/indexb.php

