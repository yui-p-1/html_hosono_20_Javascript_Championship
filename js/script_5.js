const maArr = [{"COUNTRY_CODE":"AL","NAME_EN":"ALBANIA","CAPITAL_EN":"TIRANA","LAT":"41.3274082","LON":"19.8193172"},{"COUNTRY_CODE":"AG","NAME_EN":"ANTIGUA AND BARBUDA","CAPITAL_EN":"ST. JOHN'S","LAT":"17.1181446","LON":"-61.8339573"},{"COUNTRY_CODE":"BJ","NAME_EN":"BENIN","CAPITAL_EN":"PORTO-NOVO","LAT":"6.4726571","LON":"2.6420373"},{"COUNTRY_CODE":"BF","NAME_EN":"BURKINA FASO","CAPITAL_EN":"OUAGADOUGOU","LAT":"12.3680826","LON":"-1.527066"},{"COUNTRY_CODE":"BH","NAME_EN":"BAHRAIN","CAPITAL_EN":"MANAMA","LAT":"26.2334989","LON":"50.5720162"},{"COUNTRY_CODE":"BA","NAME_EN":"BOSNIA AND HERZEGOVINA","CAPITAL_EN":"SARAJEVO","LAT":"43.8589239","LON":"18.4334395"}]
    
var map = null, infobox, dataLayer;
 function GetMap() 
 {
     map = new Microsoft.Maps.Map(document.getElementById("myMap"),
       {
           credentials: "Bing Mpas Key",
           center: new Microsoft.Maps.Location(35, 140)});
   dataLayer = new Microsoft.Maps.EntityCollection();
   map.entities.push(dataLayer);
   map.setView({ zoom: 1 });
 var infoboxLayer = new Microsoft.Maps.EntityCollection();
   map.entities.push(infoboxLayer);
   infobox = new Microsoft.Maps.Infobox();
   infoboxLayer.push(infobox);
   AddData();
 };

   pin = new Array(maArr.length)
   function AddData() {
   for (let i = 0; i < maArr.length; i++) {          
     pin[i] = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(maArr[i].LAT, maArr[i].LON));
     pin[i].Title = maArr[i].NAME_EN;
     pin[i].Description = JSON.stringify(maArr[i]);
     console.log(pin[i]);
     Microsoft.Maps.Events.addHandler(pin[i], 'click', displayInfobox);
     dataLayer.push(pin[i]);
   };
   };

   console.log(maArr[0]);

 function displayInfobox(e) {
     if (e.targetType == 'pushpin') {
         infobox.setLocation(e.target.getLocation());
                 
         infobox.setOptions({
             visible: true,
             title: e.target.Title,
             description: e.target.Description
         });
     }
 }


// Create Bing Maps with multiple pushpin and infobox
// https://www.fourthbottle.com/2016/04/create-bing-maps-with-multiple-pushpin-infobox.html


// //****************************************************************************************
// // BingMaps&BmapQuery
// //****************************************************************************************
// //Init
//   let map;
//   function GetMap(){
//       //------------------------------------------------------------------------
//       //1. Instance
//       //------------------------------------------------------------------------
//       map = new Bmap("#myMap");
  
//       //------------------------------------------------------------------------
//       //2. Display Map
//       //------------------------------------------------------------------------
//       map.startMap(35.4779136, 139.6211712, "load", 10); //The place is Bellevue.

  
//       //----------------------------------------------------
//       //3. Add Pushpin
//       // map.pin( lat, lon, "color", [drag:true|false], [click:true|false], [hover:true|false], [visible:true|false] );
//       //----------------------------------------------------
//       map.pin(35.4779136, 139.6211712, "#ff0000");

//       map.infobox(35.4779136, 139.6211712, "Title", "Description_1");
//   }


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

// 出典:
// https://mapapi.org/indexb.php

