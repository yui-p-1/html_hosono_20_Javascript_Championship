window.addEventListener('load', () => {
  const f = document.getElementById('file_7');
  f.addEventListener('change', evt => {
    let input = evt.target;
    if (input.files.length == 0) {
      console.log('No file selected');
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const pre = document.getElementById('result_7');
      pre.innerHTML = reader.result;

      var mmmdata = JSON.parse(reader.result) ;
      console.log(mmmdata);

    };
   
    reader.readAsText(file);
    });
    
  });

  var ttt = document.getElementById('result_7').innerHTML;
  var ddd = Array.from(ttt);
  console.log(ddd);



// 散布図データ
// import margedata from '../json/plot.json' assert {type: 'json'};

const margedata = [
     {x:1, y:4},{x:2, y:3},{x:3, y:4},{x:4, y:5},{x:5, y:6},{x:6, y:5},{x:7, y:7},{x:8, y:6},{x:9, y:8},{x:10, y:7}
  ];
  
  
  // 回帰直線の傾きと切片を求める
  var sx = 0;
  var sy = 0;
  var sxy = 0;
  var sxsq = 0;
  var xmean;
  var ymean;
  var alpha;
  var beta;
  var n;
  
  margedata.forEach(function(val) {
    sx += val.x;
    sy += val.y;
    sxy += val.x * val.y;
    sxsq += Math.pow(val.x,2);
  });

  // console.log(margedata);
  
  n = margedata.length;
  xmean = sx/n;
  ymean = sy/n;
  beta  = ((n*sxy) - (sx*sy))/((n*sxsq)-(Math.pow(sx,2))); // 傾き
  alpha = ymean - (beta * xmean); // 切片

  // console.log(xmean);
  
  
  // 回帰式より、回帰直線描画用データを作成
  var regressionLinePlot = [];
  margedata.forEach(function(val) {
    regressionLinePlot.push({'x': val.x, 'y': alpha + beta*val.x});
  });
  
  
  // 散布図と回帰直線を描画
  window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myChart = new Chart(ctx, {
      type: 'scatter',
      data: plotData,
      options: options
    });
  };
  
  
  // 描画データ
  var plotData = {
    datasets: [
      { // 散布図
        type: 'scatter',
        label: 'scatter',
        data: margedata,
        borderColor : 'rgba(100,120,255,1)',            // プロットの線の色
        backgroundColor: 'rgba(130,160,255,1)',         // 凡例の背景色
        pointBackgroundColor: 'rgba(100,120,255,1)',    // 点の色
        fill: false                                     // 線とＸ軸で囲まれた範囲の描画
      },
      { // 回帰直線
        type: 'scatter',
        label: 'Regression line',
        data: regressionLinePlot,              // 始点と終点のデータ（座標）
        borderColor : 'rgba(20,100,20,1)',     // 線の色
        backgroundColor: 'rgba(70,100,70,1)',  // 凡例の背景色
        borderWidth : 2,                       // 線幅
        pointRadius: 0.5,                      // 点の形状の半径（0にすると点を描画しない）
        tension: 0,                            // 線を直線にする
        showLine: true,                        // 線を描画
        fill: false                            // 線とＸ軸で囲まれた範囲の描画
      }
    ],
  };

  // チャレンジ
  var options = {
    responsive: true,
    title:{ display:true,
        text:'Chart sample'
    },
    // scales: {
    //     xAxes: [{ display: true,
    //         scaleLabel: { display: true, labelString: '時刻' },
    //         type: "time",
    //         time: {
    //             unit: "hour",
    //             displayFormats:{ hour: 'HH:mm' },
    //             min: new moment().hour(5).minute(0).second(0).millisecond(0),
    //             max: new moment().hour(17).minute(0).second(0).millisecond(0),
    //         },
    //     }],
    //     yAxes: [{ display: true,
    //         scaleLabel: { display: true, labelString: 'Value' },
    //         ticks: { min: 0, max: 100, stepSize: 20 }
    //     }]
    // },
    tooltips: {
        titleFontSize: 18,
        bodyFontSize: 18,
        callbacks: {
            title: function (tooltipItem, data){
                return "First";
            },
            label: function (tooltipItem, data){
                return "Label + 工事中";
            }
        }
    },
    legend:{    /* 凡例クリックが伝播しないようにする。*/
         onClick: function(){ return false; },
    },
};






// 出典:Chart.jsで回帰直線を描画
// https://qiita.com/saka212/items/f51282765b289c0f0d46

// 出典:Chart.jsツールチップカスタマイズ
// https://oboe2uran.hatenablog.com/entry/2018/02/08/232053

// 出典:JavaScriptでグラフ描画入門！全８個のライブラリをコード付きで一挙に解説！
// https://paiza.hatenablog.com/entry/2016/06/07/JavaScript%E3%81%A7%E3%82%B0%E3%83%A9%E3%83%95%E6%8F%8F%E7%94%BB%E5%85%A5%E9%96%80%EF%BC%81%E5%85%A8%EF%BC%98%E5%80%8B%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%82%92%E3%82%B3%E3%83%BC