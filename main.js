
let data = {
  "filter": {
    "series": "seriesA,seriesB,seriesC,seriesD",
    "rules": [
      {
        "express": "",
        "field": ""
      }
    ]
  },
  "encoding": {
    "x": {
      "field": "country",

      "band": true
    },
    "y": {
      "field": "sales",
      "type": "Linear"
    },
    "size": {
      "field": "country",
      "range": [
        10,
        30
      ]
    },
    "tooltips": {
      "field": "cases"
    },
    "shape": {
      "field": ""
    },
    "angle": {
      "field": "sales"
    },
    "stack": false,
    "radial": false
  },
  "series": [
    {
      "name": "seriesA",
      "charttype": "Line",
      "style": {},
      "data": [
        {
          "country": "US",
          "downloads": 10,
          "sales": 211110.682638109698,
          "expenses": 1380.5286353797196,
          "active": "false"
        },
        {
          "country": "Germany",
          "downloads": 7429,
          "sales": 211720.244111853545,
          "expenses": 2819.490334882582,
          "active": "false"
        },
        {
          "country": "UK",
          "downloads": 1616,
          "sales": 171111.725374596032,
          "expenses": 3774.1947931859045,
          "active": "false"
        },
        {
          "country": "Japan",
          "downloads": 18643,
          "sales": 211331.63710148669,
          "expenses": 2424.9636513659702,
          "active": "false"
        },
        {
          "country": "Italy",
          "downloads": 19949,
          "sales": 911111.989879079592,
          "expenses": 2983.639492172271,
          "active": "false"
        },
        {
          "country": "Greece",
          "downloads": 13505,
          "sales": 411226.896624379556,
          "expenses": 2264.6904213831076,
          "active": "false"
        }
      ]
    },
    {
      "name": "seriesB",
      "charttype": "Bar",
      "data": [
        {
          "country": "US",
          "downloads": 80000,
          "sales": 19142.08042154179,
          "expenses": 2724.6397434553837,
          "active": "true"
        },
        {
          "country": "Germany",
          "downloads": 11540,
          "sales": 9780.104103590214,
          "expenses": 334.7053658699783,
          "active": "true"
        },
        {
          "country": "UK",
          "downloads": 12215,
          "sales": 4831.6539016051975,
          "expenses": 251.1643115886275,
          "active": "true"
        },
        {
          "country": "Japan",
          "downloads": 15327,
          "sales": 6740.375719832419,
          "expenses": 4974.962122643194,
          "active": "true"
        },
        {
          "country": "Italy",
          "downloads": 19767,
          "sales": 4287.620232395823,
          "expenses": 2074.331648946357,
          "active": "true"
        },
        {
          "country": "Greece",
          "downloads": 58,
          "sales": 4202.873874843627,
          "expenses": 487.29429967201423,
          "active": "true"
        }
      ]
    },
    {
      "name": "seriesE",
      "charttype": "Bar",
      "data": [
        {
          "country": "US",
          "downloads": 80000,
          "sales": 19142.08042154179,
          "expenses": 2724.6397434553837,
          "active": "true"
        },
        {
          "country": "Germany",
          "downloads": 11540,
          "sales": 9780.104103590214,
          "expenses": 334.7053658699783,
          "active": "true"
        },
        {
          "country": "UK",
          "downloads": 12215,
          "sales": 4831.6539016051975,
          "expenses": 251.1643115886275,
          "active": "true"
        },
        {
          "country": "Japan",
          "downloads": 15327,
          "sales": 6740.375719832419,
          "expenses": 4974.962122643194,
          "active": "true"
        },
        {
          "country": "Italy",
          "downloads": 19767,
          "sales": 4287.620232395823,
          "expenses": 2074.331648946357,
          "active": "true"
        },
        {
          "country": "Greece",
          "downloads": 58,
          "sales": 4202.873874843627,
          "expenses": 487.29429967201423,
          "active": "true"
        }
      ]
    },
    {
      "charttype": "Scatter",
      "name": "seriesC",
      "data": [
        {
          "country": "US",
          "downloads": 5157,
          "sales": 3327.682638109698,
          "expenses": 8380.52863537972,
          "active": "false"
        },
        {
          "country": "Germany",
          "downloads": 7429,
          "sales": 2397.244111853545,
          "expenses": 2819.490334882582,
          "active": "false"
        },
        {
          "country": "UK",
          "downloads": 1616,
          "sales": 9627.725374596032,
          "expenses": 3774.1947931859045,
          "active": "false"
        },
        {
          "country": "Japan",
          "downloads": 18643,
          "sales": 4531.63710148669,
          "expenses": 2424.9636513659702,
          "active": "false"
        },
        {
          "country": "Italy",
          "downloads": 19949,
          "sales": 9927.989879079592,
          "expenses": 2983.639492172271,
          "active": "false"
        },
        {
          "country": "Greece",
          "downloads": 13505,
          "sales": 526.8966243795559,
          "expenses": 2264.6904213831076,
          "active": "false"
        }
      ]
    },
    {
      "name": "seriesD",
      "charttype": "Bar",
      "data": [
        {
          "country": "US",
          "downloads": 3157,
          "sales": 7327.682638109698,
          "expenses": 1380.5286353797196,
          "active": "false"
        },
        {
          "country": "Germany",
          "downloads": 7429,
          "sales": 2397.244111853545,
          "expenses": 2819.490334882582,
          "active": "false"
        },
        {
          "country": "UK",
          "downloads": 1616,
          "sales": 9627.725374596032,
          "expenses": 3774.1947931859045,
          "active": "false"
        },
        {
          "country": "Japan",
          "downloads": 18643,
          "sales": 4531.63710148669,
          "expenses": 2424.9636513659702,
          "active": "false"
        },
        {
          "country": "Italy",
          "downloads": 19949,
          "sales": 9927.989879079592,
          "expenses": 2983.639492172271,
          "active": "false"
        },
        {
          "country": "Greece",
          "downloads": 13505,
          "sales": 526.8966243795559,
          "expenses": 2264.6904213831076,
          "active": "false"
        }
      ]
    }
  ]
};
document.addEventListener('DOMContentLoaded', function () {
  var calculate_button = document.querySelector('#calculate_button');
  var chartcontainer = document.querySelector('#chart');


  var editor_left = ace.edit("chartmodel_layout");
  editor_left.setTheme("ace/theme/tomorrow");
  editor_left.session.setMode("ace/mode/javascript");
  editor_left.renderer.setOption('showLineNumbers', true);
  editor_left.setValue(JSON.stringify(data, null, 4));
  calculate_button.onclick = function (event) {
    var obj = editor_left.getValue();
    chartcontainer.innerHTML = '';
    let dataModel = new android.test.DataModel(JSON.parse(obj));
    var chartlayout = new android.test.ChartLayout(null);
    chartlayout.attachElement(document.getElementById("chart"), dataModel);
  };
  let dataModel = new android.test.DataModel(data);
  var chartlayout = new android.test.ChartLayout(null);
  chartlayout.attachElement(document.getElementById("chart"), dataModel);
});