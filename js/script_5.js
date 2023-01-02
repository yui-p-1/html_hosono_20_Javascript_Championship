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
      // map.startMap(47.6149, -122.1941, "load", 10); //The place is Bellevue.
  
      //----------------------------------------------------
      //3. Add Pushpin
    //   map.pin( lat, lon, "color", [drag:true|false], [click:true|false], [hover:true|false], [visible:true|false] );
      //----------------------------------------------------
      let pin = map.pin(47.6149, -122.1941, "#ff0000");

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

map.infobox(47.6149, -122.1941, "Title", "Description");


// -------------------------------------------------------------------

// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="utf-8">
// <title>Map&amp;Geolocation</title>
// <style>
// body {
//   margin: 0;
//   padding: 0;
// }
// </style>
// </head>
// <body>

// <!-- MapArea -->
// <div id="view"></div>
// <div id="myMap"></div>
// <!-- /MapArea -->

// <!-- jQuery&GoogleMapsAPI -->
// <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
// <!-- /jQuery&GoogleMapsAPI -->

// <script src='https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=Ao_ESbWpabVG64QS8J4pi7vN8DnUljBna8ybzNBaq_37M55BnIEfrvbOXMdKyGYpAo_ESbWpabVG64QS8J4pi7vN8DnUljBna8ybzNBaq_37M55BnIEfrvbOXMdKyGYp' async defer></script>
// <script src="./js/BmapQuery.js"></script>

// <script>
//   //****************************************************************************************
//   // BingMaps&BmapQuery
//   //****************************************************************************************
//   //Init
//   let map;
//   function GetMap(){
//       //------------------------------------------------------------------------
//       //1. Instance
//       //------------------------------------------------------------------------
//       map = new Bmap("#myMap");
  
//       //------------------------------------------------------------------------
//       //2. Display Map
//       //------------------------------------------------------------------------
//       // map.startMap(47.6149, -122.1941, "load", 10); //The place is Bellevue.
  
//       //----------------------------------------------------
//       //3. Add Pushpin
//       // map.pin( lat, lon, "color", [drag:true|false], [click:true|false], [hover:true|false], [visible:true|false] );
//       //----------------------------------------------------
//       let pin = map.pin(47.6149, -122.1941, "#ff0000");

     
  
//   }
//   </script>

// <!-- javascript -->
// <script>
// //1．位置情報の取得に成功した時の処理
// function mapsInit(position) {
//     //lat=緯度、lon=経度 を取得
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;
//     console.log(`緯度:${lat} 経度:${lon}`);
//     console.log(position.coords);
//     map.startMap(lat, lon, "load", 10);

// };

// //2． 位置情報の取得に失敗した場合の処理
// function mapsError(error) {
//   let e = "";
//   if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
//     e = "位置情報が許可されてません";
//   }
//   if (error.code == 2) { //2＝現在地を特定できない
//     e = "現在位置を特定できません";
//   }
//   if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
//     e = "位置情報を取得する前にタイムアウトになりました";
//   }
//   alert("エラー：" + e);
// };

// //3.位置情報取得オプション
// var set ={
//   enableHighAccuracy: true, //より高精度な位置を求める
//   maximumAge: 20000,        //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
//   timeout: 10000            //10秒以内に現在地情報を取得できなければ、処理を終了
// };

// //Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition
// navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);

// map.infobox(47.6149, -122.1941, "Title", "Description");

// </script>

// </body>
// </html>
