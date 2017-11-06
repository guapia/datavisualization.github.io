
let data = {
    "filter": {
        "series": "seriesA,seriesB,seriesC,seriesD,seriesE",
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
                20
            ]
        },
        "text":{
            "field":"country"
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
                    "sales": 211110.6826381097,
                    "expenses": 1380.5286353797196,
                    "active": "false"
                },
                {
                    "country": "Germany",
                    "downloads": 7429,
                    "sales": 211720.24411185354,
                    "expenses": 2819.490334882582,
                    "active": "false"
                },
                {
                    "country": "UK",
                    "downloads": 1616,
                    "sales": 171111.72537459602,
                    "expenses": 3774.1947931859045,
                    "active": "false"
                },
                {
                    "country": "Japan",
                    "downloads": 18643,
                    "sales": 211331.6371014867,
                    "expenses": 2424.9636513659702,
                    "active": "false"
                },
                {
                    "country": "Italy",
                    "downloads": 19949,
                    "sales": 911111.9898790796,
                    "expenses": 2983.639492172271,
                    "active": "false"
                },
                {
                    "country": "Greece",
                    "downloads": 13505,
                    "sales": 411226.89662437956,
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
                    "sales": -9780.104103590214,
                    "expenses": 334.7053658699783,
                    "active": "true"
                },
                {
                    "country": "UK",
                    "downloads": 12215,
                    "sales": -4831.6539016051975,
                    "expenses": 251.1643115886275,
                    "active": "true"
                },
                {
                    "country": "Japan",
                    "downloads": 15327,
                    "sales": -6740.375719832419,
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
        },
        {
            "name": "seriesE",
            "charttype": "Area",
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
        }
    ]
};

let data1 = {
    "filter": {
        "series": "seriesB,seriesD",
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
        //   "x": {
        //     "field": "expenses",

        //     "type":"Linear"
        // },
        "y": {
            "field": "sales",
            "type": "Linear"
        },
        "size": {
            "field": "country",
            "range": [
                10,
                20
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
                    "sales": 211110.6826381097,
                    "expenses": 1380.5286353797196,
                    "active": "false"
                },
                {
                    "country": "Germany",
                    "downloads": 7429,
                    "sales": 211720.24411185354,
                    "expenses": 2819.490334882582,
                    "active": "false"
                },
                {
                    "country": "UK",
                    "downloads": 1616,
                    "sales": 171111.72537459602,
                    "expenses": 3774.1947931859045,
                    "active": "false"
                },
                {
                    "country": "Japan",
                    "downloads": 18643,
                    "sales": 211331.6371014867,
                    "expenses": 2424.9636513659702,
                    "active": "false"
                },
                {
                    "country": "Italy",
                    "downloads": 19949,
                    "sales": 911111.9898790796,
                    "expenses": 2983.639492172271,
                    "active": "false"
                },
                {
                    "country": "Greece",
                    "downloads": 13505,
                    "sales": 411226.89662437956,
                    "expenses": 2264.6904213831076,
                    "active": "false"
                }
            ]
        },
        {
            "name": "seriesB",
            "charttype": "Line",
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
            "charttype": "Area",
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
            "charttype": "Area",
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
        }
    ]
};

for (let i = 0; i < 3000; ++i) {
    for (let ser of data1.series) {
        ser.data.push(
            {
                "country": "label" + i,
                "downloads": Math.random() * 30000,
                "sales": Math.random() * 30000,
                "expenses": Math.random() * 30000,
                "active": Math.random() * 10 > 5 ? "true" : "false"
            }
        );
    }
}


let data2 = {
    "filter": {
        "series": "seriesB,seriesD",
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
        //   "x": {
        //     "field": "expenses",

        //     "type":"Linear"
        // },
        "y": {
            "field": "sales",
            "type": "Linear"
        },
        "size": {
            "field": "country",
            "range": [
                10,
                20
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
        "stack": true,
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
                    "sales": 211110.6826381097,
                    "expenses": 1380.5286353797196,
                    "active": "false"
                },
                {
                    "country": "Germany",
                    "downloads": 7429,
                    "sales": 211720.24411185354,
                    "expenses": 2819.490334882582,
                    "active": "false"
                },
                {
                    "country": "UK",
                    "downloads": 1616,
                    "sales": 171111.72537459602,
                    "expenses": 3774.1947931859045,
                    "active": "false"
                },
                {
                    "country": "Japan",
                    "downloads": 18643,
                    "sales": 211331.6371014867,
                    "expenses": 2424.9636513659702,
                    "active": "false"
                },
                {
                    "country": "Italy",
                    "downloads": 19949,
                    "sales": 911111.9898790796,
                    "expenses": 2983.639492172271,
                    "active": "false"
                },
                {
                    "country": "Greece",
                    "downloads": 13505,
                    "sales": 411226.89662437956,
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
        }
    ]
};


let data3 = {
    "filter": {
        "series": "seriesB,seriesD",
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
        //   "x": {
        //     "field": "expenses",

        //     "type":"Linear"
        // },
        "y": {
            "field": "sales",
            "type": "Linear"
        },
        "size": {
            "field": "country",
            "range": [
                10,
                20
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
        "stack": true,
        "radial": true
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
                    "sales": 211110.6826381097,
                    "expenses": 1380.5286353797196,
                    "active": "false"
                },
                {
                    "country": "Germany",
                    "downloads": 7429,
                    "sales": 211720.24411185354,
                    "expenses": 2819.490334882582,
                    "active": "false"
                },
                {
                    "country": "UK",
                    "downloads": 1616,
                    "sales": 171111.72537459602,
                    "expenses": 3774.1947931859045,
                    "active": "false"
                },
                {
                    "country": "Japan",
                    "downloads": 18643,
                    "sales": 211331.6371014867,
                    "expenses": 2424.9636513659702,
                    "active": "false"
                },
                {
                    "country": "Italy",
                    "downloads": 19949,
                    "sales": 911111.9898790796,
                    "expenses": 2983.639492172271,
                    "active": "false"
                },
                {
                    "country": "Greece",
                    "downloads": 13505,
                    "sales": 411226.89662437956,
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
        }
    ]
};

let data4 = {
    "filter": {
        "series": "seriesA,seriesB,seriesD,seriesE,seriesC",
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
                20
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
            "charttype": "Area",
            "style": {},
            "data": [
                {
                    "country": "US",
                    "downloads": 10,
                    "sales": 2111110.6826381097,
                    "expenses": 1380.5286353797196,
                    "active": "false"
                },
                {
                    "country": "Germany",
                    "downloads": 7429,
                    "sales": 21120.24411185354,
                    "expenses": 2819.490334882582,
                    "active": "false"
                },
                {
                    "country": "UK",
                    "downloads": 1616,
                    "sales": 17111.72537459602,
                    "expenses": 3774.1947931859045,
                    "active": "false"
                },
                {
                    "country": "Japan",
                    "downloads": 18643,
                    "sales": 21131.6371014867,
                    "expenses": 2424.9636513659702,
                    "active": "false"
                },
                {
                    "country": "Italy",
                    "downloads": 19949,
                    "sales": 91111.9898790796,
                    "expenses": 2983.639492172271,
                    "active": "false"
                },
                {
                    "country": "Greece",
                    "downloads": 13505,
                    "sales": 41226.89662437956,
                    "expenses": 2264.6904213831076,
                    "active": "false"
                },
                {
                    "country": "label0",
                    "downloads": -22825.522348338513,
                    "sales": -11022.02893738935,
                    "expenses": -27875.99602713148,
                    "active": "false"
                },
                {
                    "country": "label1",
                    "downloads": -5565.406638829182,
                    "sales": 6547.3121912255365,
                    "expenses": -4692.6259505409425,
                    "active": "false"
                },
                {
                    "country": "label2",
                    "downloads": -23008.28421415607,
                    "sales": 4077.0877901082135,
                    "expenses": -19605.875627057972,
                    "active": "false"
                },
                {
                    "country": "label3",
                    "downloads": -10148.278061910025,
                    "sales": -10733.24439046798,
                    "expenses": -18628.869964880814,
                    "active": "false"
                },
                {
                    "country": "label4",
                    "downloads": -7885.800549637398,
                    "sales": 5705.433810110771,
                    "expenses": -24772.074627079986,
                    "active": "false"
                },
                {
                    "country": "label5",
                    "downloads": -24692.4573639128,
                    "sales": 24786.174804253933,
                    "expenses": -220.61452107142497,
                    "active": "false"
                },
                {
                    "country": "label6",
                    "downloads": -19879.772247784837,
                    "sales": -696.9293185543202,
                    "expenses": -11310.21684208708,
                    "active": "false"
                },
                {
                    "country": "label7",
                    "downloads": -26691.00310092073,
                    "sales": -25154.105561681317,
                    "expenses": -2230.404873164902,
                    "active": "false"
                },
                {
                    "country": "label8",
                    "downloads": -22561.27658254173,
                    "sales": -4051.197385719143,
                    "expenses": -26961.86813459286,
                    "active": "false"
                },
                {
                    "country": "label9",
                    "downloads": -28785.514904103275,
                    "sales": -27215.761692549346,
                    "expenses": -25385.518809805726,
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
                },
                {
                    "country": "label0",
                    "downloads": -16699.328631763794,
                    "sales": -23974.392214036594,
                    "expenses": -10230.781670175933,
                    "active": "false"
                },
                {
                    "country": "label1",
                    "downloads": -17283.14864313846,
                    "sales": -25850.0714490187,
                    "expenses": -22563.880235206896,
                    "active": "false"
                },
                {
                    "country": "label2",
                    "downloads": -3105.274840754666,
                    "sales": -81.49621949233409,
                    "expenses": -18652.78817100803,
                    "active": "false"
                },
                {
                    "country": "label3",
                    "downloads": -4152.676719218238,
                    "sales": 10308.748014543264,
                    "expenses": -6424.272576471905,
                    "active": "false"
                },
                {
                    "country": "label4",
                    "downloads": -29018.47630507524,
                    "sales": 23992.743957144718,
                    "expenses": -11293.043215658514,
                    "active": "false"
                },
                {
                    "country": "label5",
                    "downloads": -4988.760321852435,
                    "sales": 12254.023506180092,
                    "expenses": -17023.21407892425,
                    "active": "false"
                },
                {
                    "country": "label6",
                    "downloads": -2701.915220203133,
                    "sales": -24249.225623101476,
                    "expenses": -18979.153895909403,
                    "active": "false"
                },
                {
                    "country": "label7",
                    "downloads": -16435.163783076303,
                    "sales": 24017.366018327528,
                    "expenses": -29233.244727771053,
                    "active": "false"
                },
                {
                    "country": "label8",
                    "downloads": -1541.2126438922446,
                    "sales": -19164.08528771052,
                    "expenses": -5948.192254715652,
                    "active": "false"
                },
                {
                    "country": "label9",
                    "downloads": -324.8259999142045,
                    "sales": -3980.9206825202305,
                    "expenses": -1061.5716385397534,
                    "active": "false"
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
                },
                {
                    "country": "label0",
                    "downloads": -21649.222910862423,
                    "sales": 8546.287215832683,
                    "expenses": -3442.162955090182,
                    "active": "false"
                },
                {
                    "country": "label1",
                    "downloads": -17420.189832625547,
                    "sales": -5157.573378361722,
                    "expenses": -23207.077641613985,
                    "active": "false"
                },
                {
                    "country": "label2",
                    "downloads": -28651.477480063757,
                    "sales": -20952.521272667203,
                    "expenses": -29865.808368898295,
                    "active": "false"
                },
                {
                    "country": "label3",
                    "downloads": -17488.06547960045,
                    "sales": -6781.551161530128,
                    "expenses": -12709.197892841932,
                    "active": "false"
                },
                {
                    "country": "label4",
                    "downloads": -4154.452382517995,
                    "sales": -8847.30816136485,
                    "expenses": -6695.87465031481,
                    "active": "false"
                },
                {
                    "country": "label5",
                    "downloads": -5603.081577048266,
                    "sales": 24176.70046354752,
                    "expenses": -26779.492922099227,
                    "active": "false"
                },
                {
                    "country": "label6",
                    "downloads": -3296.3941228046756,
                    "sales": 23848.682233282645,
                    "expenses": -5830.493364089233,
                    "active": "false"
                },
                {
                    "country": "label7",
                    "downloads": -18470.95410183813,
                    "sales": -5470.129396619077,
                    "expenses": -23671.119755146097,
                    "active": "false"
                },
                {
                    "country": "label8",
                    "downloads": -11985.332108887136,
                    "sales": -27371.15937834505,
                    "expenses": -17721.22519248963,
                    "active": "false"
                },
                {
                    "country": "label9",
                    "downloads": -18148.77304203833,
                    "sales": -28118.54093706069,
                    "expenses": -27627.20862570765,
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
                },
                {
                    "country": "label0",
                    "downloads": -13225.076857834605,
                    "sales": 24396.97065027263,
                    "expenses": -25181.418318582433,
                    "active": "false"
                },
                {
                    "country": "label1",
                    "downloads": -11081.176501989403,
                    "sales": -24317.46699114566,
                    "expenses": -25433.94238179501,
                    "active": "false"
                },
                {
                    "country": "label2",
                    "downloads": -6397.521771928518,
                    "sales": -5812.359697489326,
                    "expenses": -19224.40900123457,
                    "active": "false"
                },
                {
                    "country": "label3",
                    "downloads": -19618.51756039187,
                    "sales": 24922.077998359004,
                    "expenses": -27060.930881439443,
                    "active": "false"
                },
                {
                    "country": "label4",
                    "downloads": -3399.401382369007,
                    "sales": -2031.0105709756376,
                    "expenses": -13643.717035329668,
                    "active": "false"
                },
                {
                    "country": "label5",
                    "downloads": -21353.15703509352,
                    "sales": 1351.556283179831,
                    "expenses": -21921.995728383263,
                    "active": "false"
                },
                {
                    "country": "label6",
                    "downloads": -15637.323308996478,
                    "sales": -25592.145427955784,
                    "expenses": -2759.9446745757473,
                    "active": "false"
                },
                {
                    "country": "label7",
                    "downloads": -11666.388440993658,
                    "sales": -13755.192061193686,
                    "expenses": -17448.458505604187,
                    "active": "false"
                },
                {
                    "country": "label8",
                    "downloads": -8608.141623828096,
                    "sales": -3438.7886803202928,
                    "expenses": -23309.58858709486,
                    "active": "false"
                },
                {
                    "country": "label9",
                    "downloads": -15788.835601853683,
                    "sales": 27866.595097669266,
                    "expenses": -17536.87301174473,
                    "active": "false"
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
                },
                {
                    "country": "label0",
                    "downloads": -1788.759233825652,
                    "sales": -26396.053598087532,
                    "expenses": -7110.993843353983,
                    "active": "false"
                },
                {
                    "country": "label1",
                    "downloads": -3554.0335073314177,
                    "sales": -2595.0563264915518,
                    "expenses": -12577.372425561418,
                    "active": "false"
                },
                {
                    "country": "label2",
                    "downloads": -28952.599423073094,
                    "sales": -19471.85137584433,
                    "expenses": -1615.868521112185,
                    "active": "false"
                },
                {
                    "country": "label3",
                    "downloads": -5136.106577834025,
                    "sales": 26540.717187218095,
                    "expenses": -15610.980926515755,
                    "active": "false"
                },
                {
                    "country": "label4",
                    "downloads": -21479.101926629017,
                    "sales": -21875.538830070844,
                    "expenses": -15003.051461087418,
                    "active": "false"
                },
                {
                    "country": "label5",
                    "downloads": -26588.08311741087,
                    "sales": 25311.84397255757,
                    "expenses": -11699.107027536651,
                    "active": "false"
                },
                {
                    "country": "label6",
                    "downloads": -21851.993963643225,
                    "sales": 22252.167745563733,
                    "expenses": -19091.542058050894,
                    "active": "false"
                },
                {
                    "country": "label7",
                    "downloads": -27167.3247222013,
                    "sales": -26172.46231363323,
                    "expenses": -1601.508771452178,
                    "active": "false"
                },
                {
                    "country": "label8",
                    "downloads": -13360.662777960788,
                    "sales": -7629.586446552492,
                    "expenses": -14097.022026228067,
                    "active": "false"
                },
                {
                    "country": "label9",
                    "downloads": -10756.819142604827,
                    "sales": -15218.861076242298,
                    "expenses": -15802.988427892706,
                    "active": "false"
                }
            ]
        }
    ]
};


// for (let i = 0; i < 10; ++i) {
//     for (let ser of data4.series) {
//         ser.data.push(
//             {
//                 "country": "label" + i,
//                 "downloads": -Math.random() * 30000,
//                 "sales": Math.random() * 30000 * (Math.random() * 10 > 5 ? 1 : -1),
//                 "expenses": -Math.random() * 30000,
//                 "active": -Math.random() * 10 > 5 ? "true" : "false"
//             }
//         );
//     }
// }

let data5 = {
    "filter": {
        "series": "seriesA,seriesB",
        "rules": [
            {
                "express": "",
                "field": ""
            }
        ]
    },
    "encoding": {

        "x": {
            "field": "x",

            "type": "Linear"
        },
        "y": {
            "field": "y",
            "type": "Linear"
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

            ]
        },
        {
            "name": "seriesB",
            "charttype": "Line",
            "style": {},
            "data": [

            ]
        }
    ]
};

for (let i = 0; i < 100; i += 0.1) {
    data5.series[0].data.push(
        {
            "x": i,
            'y': Math.sin(i)
        }
    );
    // data5.series[1].data.push(
    //     {
    //         "x": i*2,
    //         'y': Math.cos(i)*2
    //     }
    // );

}

for (let i = -1; i < 1; i += 0.01) {
    data5.series[1].data.push(
        {
            "x": i * 50 + 50,
            'y': Math.atan(i)*100
        }
    );
    // data5.series[1].data.push(
    //     {
    //         "x": i*2,
    //         'y': Math.cos(i)*2
    //     }
    // );

}



let data6 ={
    "filter": {
        "series": "seriesB,seriesC,seriesD,seriesE",
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
            "band": false
        },
        "y": {
            "field": "sales",
            "type": "Linear"
        },
        "size": {
            "field": "country",
            "range": [
                10,
                20
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
        "stack": true,
        "radial": false
    },
    "series": [
        {
            "name": "seriesA",
            "charttype": "Area",
            "style": {},
            "data": [
                {
                    "country": "US",
                    "downloads": 10,
                    "sales": 211110.6826381097,
                    "expenses": 1380.5286353797196,
                    "active": "false"
                },
                {
                    "country": "Germany",
                    "downloads": 7429,
                    "sales": 211720.24411185354,
                    "expenses": 2819.490334882582,
                    "active": "false"
                },
                {
                    "country": "UK",
                    "downloads": 1616,
                    "sales": 171111.72537459602,
                    "expenses": 3774.1947931859045,
                    "active": "false"
                },
                {
                    "country": "Japan",
                    "downloads": 18643,
                    "sales": 211331.6371014867,
                    "expenses": 2424.9636513659702,
                    "active": "false"
                },
                {
                    "country": "Italy",
                    "downloads": 19949,
                    "sales": 911111.9898790796,
                    "expenses": 2983.639492172271,
                    "active": "false"
                },
                {
                    "country": "Greece",
                    "downloads": 13505,
                    "sales": 411226.89662437956,
                    "expenses": 2264.6904213831076,
                    "active": "false"
                }
            ]
        },
        {
            "name": "seriesB",
            "charttype": "Area",
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
            "name": "seriesC",
            "charttype": "Area",
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
            "charttype": "Area",
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
        },
        {
            "name": "seriesE",
            "charttype": "Area",
            "data": [
                {
                    "country": "US",
                    "downloads": 80000,
                    "sales": -19142.08042154179,
                    "expenses": 2724.6397434553837,
                    "active": "true"
                },
                {
                    "country": "Germany",
                    "downloads": 11540,
                    "sales": -9780.104103590214,
                    "expenses": 334.7053658699783,
                    "active": "true"
                },
                {
                    "country": "UK",
                    "downloads": 12215,
                    "sales": -4831.6539016051975,
                    "expenses": 251.1643115886275,
                    "active": "true"
                },
                {
                    "country": "Japan",
                    "downloads": 15327,
                    "sales": -6740.375719832419,
                    "expenses": 4974.962122643194,
                    "active": "true"
                },
                {
                    "country": "Italy",
                    "downloads": 19767,
                    "sales": -4287.620232395823,
                    "expenses": 2074.331648946357,
                    "active": "true"
                },
                {
                    "country": "Greece",
                    "downloads": 58,
                    "sales": -4202.873874843627,
                    "expenses": 487.29429967201423,
                    "active": "true"
                }
            ]
        }
    ]
};

let data7 = {
    "filter": {
        "series": "seriesA,seriesB",
        "rules": [
            {
                "express": "",
                "field": ""
            }
        ]
    },
    "encoding": {
        "x": {
            "field": "x",
            "type":"Linear"
        },
        "y": {
            "field": "y1",
            "type": "Linear"
        },
        "size": {
            "field": "y2",
            "range": [
                10,
                20
            ]
        },
        "tooltips": {
            "field": ""
        },
        "shape": {
            "field": ""
        },
        "angle": {
            "field": ""
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
                    "x": 0,
                    "y1": 0,
                    "y2": 0
                },
                {
                    "x": 0.05,
                    "y1": 9.970875480466564,
                    "y2": 0.374070783904161
                },
                {
                    "x": 0.1,
                    "y1": 19.867099080807296,
                    "y2": 0.6403455684902917
                },
                {
                    "x": 0.15000000000000002,
                    "y1": 29.664307787965235,
                    "y2": 0.7403355811738389
                },
                {
                    "x": 0.2,
                    "y1": 39.338507584941766,
                    "y2": 0.6582130687325534
                },
                {
                    "x": 0.25,
                    "y1": 48.866131582811924,
                    "y2": 0.4225198507639226
                },
                {
                    "x": 0.3,
                    "y1": 58.224096795210016,
                    "y2": 0.09717049325623693
                },
                {
                    "x": 0.35,
                    "y1": 67.38985942015022,
                    "y2": -0.23557395460170785
                },
                {
                    "x": 0.39999999999999997,
                    "y1": 76.34146849845101,
                    "y2": -0.4956939815318046
                },
                {
                    "x": 0.44999999999999996,
                    "y1": 85.05761782274313,
                    "y2": -0.6244589226250737
                },
                {
                    "x": 0.49999999999999994,
                    "y1": 93.51769597604023,
                    "y2": -0.5974487808110651
                },
                {
                    "x": 0.5499999999999999,
                    "y1": 101.7018343841319,
                    "y2": -0.4287270104914709
                },
                {
                    "x": 0.6,
                    "y1": 109.59095327159889,
                    "y2": -0.16559687376529922
                },
                {
                    "x": 0.65,
                    "y1": 117.16680541704075,
                    "y2": 0.12434406056688276
                },
                {
                    "x": 0.7000000000000001,
                    "y1": 124.41201760912749,
                    "y2": 0.3703765049775511
                },
                {
                    "x": 0.7500000000000001,
                    "y1": 131.3101297113237,
                    "y2": 0.5157418620347674
                },
                {
                    "x": 0.8000000000000002,
                    "y1": 137.8456312495711,
                    "y2": 0.5305493323378596
                },
                {
                    "x": 0.8500000000000002,
                    "y1": 144.00399544383416,
                    "y2": 0.4176213984390486
                },
                {
                    "x": 0.9000000000000002,
                    "y1": 149.7717106111957,
                    "y2": 0.2102226783950922
                },
                {
                    "x": 0.9500000000000003,
                    "y1": 155.13630887512178,
                    "y2": -0.037388287033443206
                },
                {
                    "x": 1.0000000000000002,
                    "y1": 160.08639212257293,
                    "y2": -0.26397238662826406
                },
                {
                    "x": 1.0500000000000003,
                    "y1": 164.61165515780883,
                    "y2": -0.4163109966575877
                },
                {
                    "x": 1.1000000000000003,
                    "y1": 168.7029060089963,
                    "y2": -0.46155532804141763
                },
                {
                    "x": 1.1500000000000004,
                    "y1": 172.35208335106452,
                    "y2": -0.39409696088385215
                },
                {
                    "x": 1.2000000000000004,
                    "y1": 175.5522710156429,
                    "y2": -0.23558196880925028
                },
                {
                    "x": 1.2500000000000004,
                    "y1": 178.29770956634238,
                    "y2": -0.028399642814633294
                },
                {
                    "x": 1.3000000000000005,
                    "y1": 180.58380492508456,
                    "y2": 0.17547714168763254
                },
                {
                    "x": 1.3500000000000005,
                    "y1": 182.40713404262596,
                    "y2": 0.3274016012504931
                },
                {
                    "x": 1.4000000000000006,
                    "y1": 183.76544761384514,
                    "y2": 0.39353684373259384
                },
                {
                    "x": 1.4500000000000006,
                    "y1": 184.65766984574663,
                    "y2": 0.3622341158283924
                },
                {
                    "x": 1.5000000000000007,
                    "y1": 185.0838952934597,
                    "y2": 0.24573938027553174
                },
                {
                    "x": 1.5500000000000007,
                    "y1": 185.0453827867651,
                    "y2": 0.07609627966566027
                },
                {
                    "x": 1.6000000000000008,
                    "y1": 184.5445464768399,
                    "y2": -0.10349063923442338
                },
                {
                    "x": 1.6500000000000008,
                    "y1": 183.58494403996346,
                    "y2": -0.24954339531983682
                },
                {
                    "x": 1.7000000000000008,
                    "y1": 182.171262081847,
                    "y2": -0.32873251485390237
                },
                {
                    "x": 1.7500000000000009,
                    "y1": 180.30929879303173,
                    "y2": -0.3253611416722647
                },
                {
                    "x": 1.800000000000001,
                    "y1": 178.00594391241725,
                    "y2": -0.24426290351158939
                },
                {
                    "x": 1.850000000000001,
                    "y1": 175.26915606242696,
                    "y2": -0.10864346051794613
                },
                {
                    "x": 1.900000000000001,
                    "y1": 172.1079375255697,
                    "y2": 0.046370932366047266
                },
                {
                    "x": 1.950000000000001,
                    "y1": 168.53230653820393,
                    "y2": 0.18272400690869345
                },
                {
                    "x": 2.000000000000001,
                    "y1": 164.55326718313827,
                    "y2": 0.26868303092624235
                },
                {
                    "x": 2.0500000000000007,
                    "y1": 160.18277696829702,
                    "y2": 0.2861272054388598
                },
                {
                    "x": 2.1000000000000005,
                    "y1": 155.43371218402794,
                    "y2": 0.23422191274436996
                },
                {
                    "x": 2.1500000000000004,
                    "y1": 150.31983113671924,
                    "y2": 0.12877546645475718
                },
                {
                    "x": 2.2,
                    "y1": 144.85573536121504,
                    "y2": -0.002357075932514894
                },
                {
                    "x": 2.25,
                    "y1": 139.05682891905764,
                    "y2": -0.12652992600352442
                },
                {
                    "x": 2.3,
                    "y1": 132.93927589383773,
                    "y2": -0.21435559596853024
                },
                {
                    "x": 2.3499999999999996,
                    "y1": 126.51995619888255,
                    "y2": -0.24658133882043748
                },
                {
                    "x": 2.3999999999999995,
                    "y1": 119.81641981615746,
                    "y2": -0.21820396885546314
                },
                {
                    "x": 2.4499999999999993,
                    "y1": 112.84683958858358,
                    "y2": -0.13897266243374848
                },
                {
                    "x": 2.499999999999999,
                    "y1": 105.62996269098079,
                    "y2": -0.030335529020684118
                },
                {
                    "x": 2.549999999999999,
                    "y1": 98.1850609075235,
                    "y2": 0.08026561880991728
                },
                {
                    "x": 2.5999999999999988,
                    "y1": 90.53187984594202,
                    "y2": 0.16625713744195367
                },
                {
                    "x": 2.6499999999999986,
                    "y1": 82.6905872207097,
                    "y2": 0.20825292763470202
                },
                {
                    "x": 2.6999999999999984,
                    "y1": 74.681720339125,
                    "y2": 0.1983449159640329
                },
                {
                    "x": 2.7499999999999982,
                    "y1": 66.52613292552016,
                    "y2": 0.14143645357934115
                },
                {
                    "x": 2.799999999999998,
                    "y1": 58.24494141980986,
                    "y2": 0.05344363592874654
                },
                {
                    "x": 2.849999999999998,
                    "y1": 49.85947088722632,
                    "y2": -0.04305210012441619
                },
                {
                    "x": 2.8999999999999977,
                    "y1": 41.39120067637753,
                    "y2": -0.12453503312691055
                },
                {
                    "x": 2.9499999999999975,
                    "y1": 32.8617099627099,
                    "y2": -0.17223037416821776
                },
                {
                    "x": 2.9999999999999973,
                    "y1": 24.29262331405969,
                    "y2": -0.1763677236124438
                },
                {
                    "x": 3.049999999999997,
                    "y1": 15.705556414240181,
                    "y2": -0.13808095046344246
                },
                {
                    "x": 3.099999999999997,
                    "y1": 7.122062079539073,
                    "y2": -0.06860493725564357
                },
                {
                    "x": 3.149999999999997,
                    "y1": -1.436423298404669,
                    "y2": 0.013906677248379065
                },
                {
                    "x": 3.1999999999999966,
                    "y1": -9.948632751606429,
                    "y2": 0.08906490149763224
                },
                {
                    "x": 3.2499999999999964,
                    "y1": -18.39352104693814,
                    "y2": 0.13923552461107766
                },
                {
                    "x": 3.2999999999999963,
                    "y1": -26.75031618220704,
                    "y2": 0.15362638508992751
                },
                {
                    "x": 3.349999999999996,
                    "y1": -34.99856994246341,
                    "y2": 0.1305373180044835
                },
                {
                    "x": 3.399999999999996,
                    "y1": -43.11820739486023,
                    "y2": 0.07732375169255973
                },
                {
                    "x": 3.4499999999999957,
                    "y1": -51.08957520364788,
                    "y2": 0.008194175530151756
                },
                {
                    "x": 3.4999999999999956,
                    "y1": -58.89348865042627,
                    "y2": -0.059525592796382594
                },
                {
                    "x": 3.5499999999999954,
                    "y1": -66.51127724858621,
                    "y2": -0.10969223296591626
                },
                {
                    "x": 3.599999999999995,
                    "y1": -73.92482884493953,
                    "y2": -0.13115195346866096
                },
                {
                    "x": 3.649999999999995,
                    "y1": -81.11663210585215,
                    "y2": -0.12016736132469305
                },
                {
                    "x": 3.699999999999995,
                    "y1": -88.06981728974473,
                    "y2": -0.0809504900030578
                },
                {
                    "x": 3.7499999999999947,
                    "y1": -94.76819521259769,
                    "y2": -0.02426674268817996
                },
                {
                    "x": 3.7999999999999945,
                    "y1": -101.19629431807994,
                    "y2": 0.035461951278823685
                },
                {
                    "x": 3.8499999999999943,
                    "y1": -107.33939576909876,
                    "y2": 0.08378806969927981
                },
                {
                    "x": 3.899999999999994,
                    "y1": -113.18356648292857,
                    "y2": 0.10969847502634564
                },
                {
                    "x": 3.949999999999994,
                    "y1": -118.71569003760492,
                    "y2": 0.10808345687330202
                },
                {
                    "x": 3.999999999999994,
                    "y1": -123.92349538295058,
                    "y2": 0.08067208049344513
                },
                {
                    "x": 4.049999999999994,
                    "y1": -128.79558329542132,
                    "y2": 0.03528471843037395
                },
                {
                    "x": 4.099999999999993,
                    "y1": -133.3214505219008,
                    "y2": -0.01633621918032508
                },
                {
                    "x": 4.149999999999993,
                    "y1": -137.4915115636238,
                    "y2": -0.06152869154582367
                },
                {
                    "x": 4.199999999999993,
                    "y1": -141.29711805754982,
                    "y2": -0.08978716413971172
                },
                {
                    "x": 4.249999999999993,
                    "y1": -144.73057571872698,
                    "y2": -0.09517245417439307
                },
                {
                    "x": 4.299999999999993,
                    "y1": -147.7851588134626,
                    "y2": -0.07751086428189154
                },
                {
                    "x": 4.3499999999999925,
                    "y1": -150.45512213944176,
                    "y2": -0.042154579531826074
                },
                {
                    "x": 4.399999999999992,
                    "y1": -152.73571049528286,
                    "y2": 0.0015691433686117308
                },
                {
                    "x": 4.449999999999992,
                    "y1": -154.62316562838367,
                    "y2": 0.04278478303054652
                },
                {
                    "x": 4.499999999999992,
                    "y1": -156.11473065626822,
                    "y2": 0.07174765733027955
                },
                {
                    "x": 4.549999999999992,
                    "y1": -157.2086519629851,
                    "y2": 0.08212164358050038
                },
                {
                    "x": 4.599999999999992,
                    "y1": -157.90417857840993,
                    "y2": 0.07232980561437716
                },
                {
                    "x": 4.6499999999999915,
                    "y1": -158.20155905455783,
                    "y2": 0.04569980322157867
                },
                {
                    "x": 4.699999999999991,
                    "y1": -158.1020358591969,
                    "y2": 0.00942805215086353
                },
                {
                    "x": 4.749999999999991,
                    "y1": -157.60783731315854,
                    "y2": -0.027331775547243205
                },
                {
                    "x": 4.799999999999991,
                    "y1": -156.72216710374764,
                    "y2": -0.055755592384263024
                },
                {
                    "x": 4.849999999999991,
                    "y1": -155.4491914125529,
                    "y2": -0.06944530337913604
                },
                {
                    "x": 4.899999999999991,
                    "y1": -153.79402370172937,
                    "y2": -0.06584218963192509
                },
                {
                    "x": 4.94999999999999,
                    "y1": -151.762707208458,
                    "y2": -0.04665221572209103
                },
                {
                    "x": 4.99999999999999,
                    "y1": -149.36219520276674,
                    "y2": -0.017229631604192507
                },
                {
                    "x": 5.04999999999999,
                    "y1": -146.60032906921387,
                    "y2": 0.01488276103522718
                },
                {
                    "x": 5.09999999999999,
                    "y1": -143.48581427807207,
                    "y2": 0.04186608852194002
                },
                {
                    "x": 5.14999999999999,
                    "y1": -140.02819431659694,
                    "y2": 0.057510703691427204
                },
                {
                    "x": 5.1999999999999895,
                    "y1": -136.2378226557144,
                    "y2": 0.05862428930067245
                },
                {
                    "x": 5.249999999999989,
                    "y1": -132.12583283199183,
                    "y2": 0.045648940205875566
                },
                {
                    "x": 5.299999999999989,
                    "y1": -127.70410672907371,
                    "y2": 0.02237807371318913
                },
                {
                    "x": 5.349999999999989,
                    "y1": -122.98524114684119,
                    "y2": -0.00511515848406872
                },
                {
                    "x": 5.399999999999989,
                    "y1": -117.98251275039456,
                    "y2": -0.030042963633139057
                },
                {
                    "x": 5.449999999999989,
                    "y1": -112.70984149454954,
                    "y2": -0.046562755446707994
                },
                {
                    "x": 5.4999999999999885,
                    "y1": -107.18175262286891,
                    "y2": -0.0511297679705266
                },
                {
                    "x": 5.549999999999988,
                    "y1": -101.41333734332252,
                    "y2": -0.04323360469674106
                },
                {
                    "x": 5.599999999999988,
                    "y1": -95.42021228546537,
                    "y2": -0.025372439279325407
                },
                {
                    "x": 5.649999999999988,
                    "y1": -89.21847784654712,
                    "y2": -0.002308224357073474
                },
                {
                    "x": 5.699999999999988,
                    "y1": -82.82467553620702,
                    "y2": 0.02018372324547555
                },
                {
                    "x": 5.749999999999988,
                    "y1": -76.25574443136473,
                    "y2": 0.03674675272892605
                },
                {
                    "x": 5.799999999999987,
                    "y1": -69.52897685458464,
                    "y2": 0.04370484016283422
                },
                {
                    "x": 5.849999999999987,
                    "y1": -62.66197339056738,
                    "y2": 0.03986066157098977
                },
                {
                    "x": 5.899999999999987,
                    "y1": -55.67259735650494,
                    "y2": 0.026661344047886962
                },
                {
                    "x": 5.949999999999987,
                    "y1": -48.578928842822904,
                    "y2": 0.007723052881271458
                },
                {
                    "x": 5.999999999999987,
                    "y1": -41.39921844132673,
                    "y2": -0.012140501785648667
                },
                {
                    "x": 6.0499999999999865,
                    "y1": -34.151840777966385,
                    "y2": -0.028128869620922127
                },
                {
                    "x": 6.099999999999986,
                    "y1": -26.855247967337274,
                    "y2": -0.03660343873821106
                },
                {
                    "x": 6.149999999999986,
                    "y1": -19.52792310564702,
                    "y2": -0.035901853968063245
                },
                {
                    "x": 6.199999999999986,
                    "y1": -12.188333918199412,
                    "y2": -0.026639600647013154
                },
                {
                    "x": 6.249999999999986,
                    "y1": -4.854886676481603,
                    "y2": -0.011451566154445404
                },
                {
                    "x": 6.299999999999986,
                    "y1": 2.454119501307033,
                    "y2": 0.005737238161033827
                },
                {
                    "x": 6.349999999999985,
                    "y1": 9.720537853972303,
                    "y2": 0.02071424275386302
                },
                {
                    "x": 6.399999999999985,
                    "y1": 16.926418574775894,
                    "y2": 0.0300018312275069
                },
                {
                    "x": 6.449999999999985,
                    "y1": 24.05405269417313,
                    "y2": 0.03165403581044663
                },
                {
                    "x": 6.499999999999985,
                    "y1": 31.08601514171858,
                    "y2": 0.02564770164782495
                },
                {
                    "x": 6.549999999999985,
                    "y1": 38.00520688360156,
                    "y2": 0.013794253369182509
                },
                {
                    "x": 6.5999999999999845,
                    "y1": 44.79489603510006,
                    "y2": -0.0007834325268450549
                },
                {
                    "x": 6.649999999999984,
                    "y1": 51.43875785030634,
                    "y2": -0.014462602951142654
                },
                {
                    "x": 6.699999999999984,
                    "y1": 57.9209134947706,
                    "y2": -0.024012292706172077
                },
                {
                    "x": 6.749999999999984,
                    "y1": 64.22596751022172,
                    "y2": -0.027347708159776708
                },
                {
                    "x": 6.799999999999984,
                    "y1": 70.33904388424645,
                    "y2": -0.023973426313996585
                },
                {
                    "x": 6.849999999999984,
                    "y1": 76.24582064172938,
                    "y2": -0.015024484293655103
                },
                {
                    "x": 6.8999999999999835,
                    "y1": 81.93256287896652,
                    "y2": -0.0029151335680725685
                },
                {
                    "x": 6.949999999999983,
                    "y1": 87.38615416565145,
                    "y2": 0.009301518619948126
                },
                {
                    "x": 6.999999999999983,
                    "y1": 92.59412624438596,
                    "y2": 0.01869557891036792
                },
                {
                    "x": 7.049999999999983,
                    "y1": 97.54468696197343,
                    "y2": 0.02315577356673873
                },
                {
                    "x": 7.099999999999983,
                    "y1": 102.22674637150014,
                    "y2": 0.021854961764977032
                },
                {
                    "x": 7.149999999999983,
                    "y1": 106.6299409490866,
                    "y2": 0.015385524777062506
                },
                {
                    "x": 7.199999999999982,
                    "y1": 110.74465587418268,
                    "y2": 0.005548319291802322
                },
                {
                    "x": 7.249999999999982,
                    "y1": 114.56204532737577,
                    "y2": -0.0051373847852366145
                },
                {
                    "x": 7.299999999999982,
                    "y1": 118.07405076486593,
                    "y2": -0.014072053668243916
                },
                {
                    "x": 7.349999999999982,
                    "y1": 121.27341713402267,
                    "y2": -0.0192021312486428
                },
                {
                    "x": 7.399999999999982,
                    "y1": 124.15370699976211,
                    "y2": -0.01948503171827487
                },
                {
                    "x": 7.4499999999999815,
                    "y1": 126.7093125568559,
                    "y2": -0.015089428468482956
                },
                {
                    "x": 7.499999999999981,
                    "y1": 128.935465508691,
                    "y2": -0.007295799959352526
                },
                {
                    "x": 7.549999999999981,
                    "y1": 130.82824479843057,
                    "y2": 0.001864339533430157
                },
                {
                    "x": 7.599999999999981,
                    "y1": 132.3845821839622,
                    "y2": 0.010131411832863152
                },
                {
                    "x": 7.649999999999981,
                    "y1": 133.60226565345442,
                    "y2": 0.015569839513529134
                },
                {
                    "x": 7.699999999999981,
                    "y1": 134.47994068375343,
                    "y2": 0.017015620431554603
                },
                {
                    "x": 7.7499999999999805,
                    "y1": 135.01710934923432,
                    "y2": 0.01431735906441321
                },
                {
                    "x": 7.79999999999998,
                    "y1": 135.21412729405426,
                    "y2": 0.00832312511292361
                },
                {
                    "x": 7.84999999999998,
                    "y1": 135.07219858603298,
                    "y2": 0.000628681560013082
                },
                {
                    "x": 7.89999999999998,
                    "y1": 134.59336847558708,
                    "y2": -0.0068410055925047526
                },
                {
                    "x": 7.94999999999998,
                    "y1": 133.78051408826698,
                    "y2": -0.012308658608378422
                },
                {
                    "x": 7.99999999999998,
                    "y1": 132.63733308446547,
                    "y2": -0.014562964544696338
                },
                {
                    "x": 8.04999999999998,
                    "y1": 131.16833032478178,
                    "y2": -0.013220960514313653
                },
                {
                    "x": 8.09999999999998,
                    "y1": 129.3788025843177,
                    "y2": -0.008779315693737185
                },
                {
                    "x": 8.14999999999998,
                    "y1": 127.27482136384266,
                    "y2": -0.002452528817557071
                },
                {
                    "x": 8.199999999999982,
                    "y1": 124.86321385028297,
                    "y2": 0.004152831150199645
                },
                {
                    "x": 8.249999999999982,
                    "y1": 122.15154208335363,
                    "y2": 0.009441858284629208
                },
                {
                    "x": 8.299999999999983,
                    "y1": 119.14808038935307,
                    "y2": 0.012212560539131567
                },
                {
                    "x": 8.349999999999984,
                    "y1": 115.86179114716617,
                    "y2": 0.011924453382805355
                },
                {
                    "x": 8.399999999999984,
                    "y1": 112.30229895536608,
                    "y2": 0.008795689414953095
                },
                {
                    "x": 8.449999999999985,
                    "y1": 108.4798632729584,
                    "y2": 0.0037138335763697117
                },
                {
                    "x": 8.499999999999986,
                    "y1": 104.40534960976348,
                    "y2": -0.0020092670628933792
                },
                {
                    "x": 8.549999999999986,
                    "y1": 100.09019934568023,
                    "y2": -0.006972231296220818
                },
                {
                    "x": 8.599999999999987,
                    "y1": 95.54639826110524,
                    "y2": -0.010024000346791542
                },
                {
                    "x": 8.649999999999988,
                    "y1": 90.78644386359282,
                    "y2": -0.010527192373575257
                },
                {
                    "x": 8.699999999999989,
                    "y1": 85.82331159842614,
                    "y2": -0.008485639034152278
                },
                {
                    "x": 8.74999999999999,
                    "y1": 80.67042003312129,
                    "y2": -0.004512195836528059
                },
                {
                    "x": 8.79999999999999,
                    "y1": 75.34159510800269,
                    "y2": 0.0003476775957213205
                },
                {
                    "x": 8.84999999999999,
                    "y1": 69.851033546862,
                    "y2": 0.0048872983674967604
                },
                {
                    "x": 8.899999999999991,
                    "y1": 64.21326552334428,
                    "y2": 0.00803550252397479
                },
                {
                    "x": 8.949999999999992,
                    "y1": 58.44311668008717,
                    "y2": 0.009106471809854445
                },
                {
                    "x": 8.999999999999993,
                    "y1": 52.555669598774095,
                    "y2": 0.007945124672911327
                },
                {
                    "x": 9.049999999999994,
                    "y1": 46.56622482014389,
                    "y2": 0.004938358372825233
                },
                {
                    "x": 9.099999999999994,
                    "y1": 40.490261513631424,
                    "y2": 0.0008959933590488478
                },
                {
                    "x": 9.149999999999995,
                    "y1": 34.34339789669167,
                    "y2": -0.003163723532686918
                },
                {
                    "x": 9.199999999999996,
                    "y1": 28.141351503986424,
                    "y2": -0.006268051920234353
                },
                {
                    "x": 9.249999999999996,
                    "y1": 21.899899406488608,
                    "y2": -0.007720412042735244
                },
                {
                    "x": 9.299999999999997,
                    "y1": 15.634838480185307,
                    "y2": -0.007253677082133407
                },
                {
                    "x": 9.349999999999998,
                    "y1": 9.361945823439347,
                    "y2": -0.005073178517883485
                },
                {
                    "x": 9.399999999999999,
                    "y1": 3.096939421203735,
                    "y2": -0.001784507814055615
                },
                {
                    "x": 9.45,
                    "y1": -3.1445608468234902,
                    "y2": 0.0017709827732839882
                },
                {
                    "x": 9.5,
                    "y1": -9.347071758360359,
                    "y2": 0.004729097679886781
                },
                {
                    "x": 9.55,
                    "y1": -15.495284766850896,
                    "y2": 0.006410800085063029
                },
                {
                    "x": 9.600000000000001,
                    "y1": -21.574103393560698,
                    "y2": 0.006475742676352429
                },
                {
                    "x": 9.650000000000002,
                    "y1": -27.568679903120934,
                    "y2": 0.004987228537605864
                },
                {
                    "x": 9.700000000000003,
                    "y1": -33.46445117442509,
                    "y2": 0.002377370161372157
                },
                {
                    "x": 9.750000000000004,
                    "y1": -39.24717368123322,
                    "y2": -0.0006743451051092516
                },
                {
                    "x": 9.800000000000004,
                    "y1": -44.90295749949108,
                    "y2": -0.0034157885929112326
                },
                {
                    "x": 9.850000000000005,
                    "y1": -50.41829926121809,
                    "y2": -0.005205792284244229
                },
                {
                    "x": 9.900000000000006,
                    "y1": -55.780113977850654,
                    "y2": -0.005662232488996387
                },
                {
                    "x": 9.950000000000006,
                    "y1": -60.97576565913798,
                    "y2": -0.004740876317277401
                },
                {
                    "x": 10.000000000000007,
                    "y1": -65.99309665706653,
                    "y2": -0.00272949188156405
                },
                {
                    "x": 10.050000000000008,
                    "y1": -70.82045566782767,
                    "y2": -0.0001627648796766837
                },
                {
                    "x": 10.100000000000009,
                    "y1": -75.44672432853129,
                    "y2": 0.0023177471970664376
                },
                {
                    "x": 10.15000000000001,
                    "y1": -79.86134234919658,
                    "y2": 0.0041224157938375494
                },
                {
                    "x": 10.20000000000001,
                    "y1": -84.05433112450847,
                    "y2": 0.004852165458797869
                },
                {
                    "x": 10.25000000000001,
                    "y1": -88.01631577390496,
                    "y2": 0.004384718915063078
                },
                {
                    "x": 10.300000000000011,
                    "y1": -91.73854556274549,
                    "y2": 0.0028903705711641114
                },
                {
                    "x": 10.350000000000012,
                    "y1": -95.21291266159267,
                    "y2": 0.000776949238379408
                },
                {
                    "x": 10.400000000000013,
                    "y1": -98.43196920500755,
                    "y2": -0.0014194005649653216
                },
                {
                    "x": 10.450000000000014,
                    "y1": -101.38894261570212,
                    "y2": -0.0031688293643560746
                },
                {
                    "x": 10.500000000000014,
                    "y1": -104.07774916439745,
                    "y2": -0.004074321405934254
                },
                {
                    "x": 10.550000000000015,
                    "y1": -106.49300574029546,
                    "y2": -0.003960261645326499
                },
                {
                    "x": 10.600000000000016,
                    "y1": -108.63003981166814,
                    "y2": -0.002903680058286785
                },
                {
                    "x": 10.650000000000016,
                    "y1": -110.4848975606952,
                    "y2": -0.001203489061371548
                },
                {
                    "x": 10.700000000000017,
                    "y1": -112.05435018132336,
                    "y2": 0.000701897300087614
                },
                {
                    "x": 10.750000000000018,
                    "y1": -113.33589833356753,
                    "y2": 0.0023463230220700463
                },
                {
                    "x": 10.800000000000018,
                    "y1": -114.32777475231585,
                    "y2": 0.0033488406390647985
                },
                {
                    "x": 10.85000000000002,
                    "y1": -115.02894501332197,
                    "y2": 0.0035007541805342993
                },
                {
                    "x": 10.90000000000002,
                    "y1": -115.43910646366109,
                    "y2": 0.0028071800736226998
                },
                {
                    "x": 10.95000000000002,
                    "y1": -115.55868532847792,
                    "y2": 0.0014753945194637948
                },
                {
                    "x": 11.000000000000021,
                    "y1": -115.38883201035429,
                    "y2": -0.0001446477705280772
                },
                {
                    "x": 11.050000000000022,
                    "y1": -114.93141460205891,
                    "y2": -0.0016510510643625127
                },
                {
                    "x": 11.100000000000023,
                    "y1": -114.18901063780599,
                    "y2": -0.0026887254330075967
                },
                {
                    "x": 11.150000000000023,
                    "y1": -113.16489711242473,
                    "y2": -0.003032112349527628
                },
                {
                    "x": 11.200000000000024,
                    "y1": -111.86303880202577,
                    "y2": -0.0026328659625735706
                },
                {
                    "x": 11.250000000000025,
                    "y1": -110.28807492382808,
                    "y2": -0.0016227843039802927
                },
                {
                    "x": 11.300000000000026,
                    "y1": -108.44530417677302,
                    "y2": -0.00027347118735711584
                },
                {
                    "x": 11.350000000000026,
                    "y1": -106.34066820839207,
                    "y2": 0.0010755040126432859
                },
                {
                    "x": 11.400000000000027,
                    "y1": -103.98073355710154,
                    "y2": 0.0021012138122564502
                },
                {
                    "x": 11.450000000000028,
                    "y1": -101.37267212266268,
                    "y2": 0.002573869656356791
                },
                {
                    "x": 11.500000000000028,
                    "y1": -98.52424022096156,
                    "y2": 0.0024072907403803238
                },
                {
                    "x": 11.55000000000003,
                    "y1": -95.44375628252156,
                    "y2": 0.001672531817657202
                },
                {
                    "x": 11.60000000000003,
                    "y1": -92.1400772572549,
                    "y2": 0.0005732042596211265
                },
                {
                    "x": 11.65000000000003,
                    "y1": -88.62257379088126,
                    "y2": -0.000609733263598525
                },
                {
                    "x": 11.700000000000031,
                    "y1": -84.90110424118595,
                    "y2": -0.0015890084155485136
                },
                {
                    "x": 11.750000000000032,
                    "y1": -80.98598760484964,
                    "y2": -0.0021401159631406668
                },
                {
                    "x": 11.800000000000033,
                    "y1": -76.88797542795152,
                    "y2": -0.002152003025412771
                },
                {
                    "x": 11.850000000000033,
                    "y1": -72.61822277542426,
                    "y2": -0.0016481219392040548
                },
                {
                    "x": 11.900000000000034,
                    "y1": -68.1882583367147,
                    "y2": -0.0007742558849837073
                },
                {
                    "x": 11.950000000000035,
                    "y1": -63.60995374667938,
                    "y2": 0.00024234767668751225
                },
                {
                    "x": 12.000000000000036,
                    "y1": -58.89549220230952,
                    "y2": 0.001151352989331038
                },
                {
                    "x": 12.050000000000036,
                    "y1": -54.057336457240105,
                    "y2": 0.001740392280464416
                },
                {
                    "x": 12.100000000000037,
                    "y1": -49.10819627714259,
                    "y2": 0.0018840547759037165
                },
                {
                    "x": 12.150000000000038,
                    "y1": -44.060995440034695,
                    "y2": 0.001569669031293553
                },
                {
                    "x": 12.200000000000038,
                    "y1": -38.92883836625899,
                    "y2": 0.0008948381073251282
                },
                {
                    "x": 12.250000000000039,
                    "y1": -33.72497646338427,
                    "y2": 0.00003869529648818452
                },
                {
                    "x": 12.30000000000004,
                    "y1": -28.462774271572236,
                    "y2": -0.0007849565706909476
                },
                {
                    "x": 12.35000000000004,
                    "y1": -23.155675495022745,
                    "y2": -0.001380520265856513
                },
                {
                    "x": 12.400000000000041,
                    "y1": -17.81716900496975,
                    "y2": -0.0016165421402831407
                },
                {
                    "x": 12.450000000000042,
                    "y1": -12.46075489934418,
                    "y2": -0.0014540537409986052
                },
                {
                    "x": 12.500000000000043,
                    "y1": -7.099910703654134,
                    "y2": -0.0009513902820189484
                },
                {
                    "x": 12.550000000000043,
                    "y1": -1.7480577968580393,
                    "y2": -0.00024547966849160674
                },
                {
                    "x": 12.600000000000044,
                    "y1": 3.581471854973748,
                    "y2": 0.0004847709836489836
                },
                {
                    "x": 12.650000000000045,
                    "y1": 8.875468575595727,
                    "y2": 0.0010633529688367565
                },
                {
                    "x": 12.700000000000045,
                    "y1": 14.120877385889534,
                    "y2": 0.0013591510276778256
                },
                {
                    "x": 12.750000000000046,
                    "y1": 19.304829862872918,
                    "y2": 0.0013151427929297826
                },
                {
                    "x": 12.800000000000047,
                    "y1": 24.41467537351922,
                    "y2": 0.0009584363616930259
                },
                {
                    "x": 12.850000000000048,
                    "y1": 29.43801160843751,
                    "y2": 0.00038967753984303963
                },
                {
                    "x": 12.900000000000048,
                    "y1": 34.362714342587225,
                    "y2": -0.0002446311881425075
                },
                {
                    "x": 12.950000000000049,
                    "y1": 39.17696635249633,
                    "y2": -0.0007894397346900548
                },
                {
                    "x": 13.00000000000005,
                    "y1": 43.86928542191224,
                    "y2": -0.001118686191306137
                },
                {
                    "x": 13.05000000000005,
                    "y1": 48.42855137043258,
                    "y2": -0.0011640622139980968
                },
                {
                    "x": 13.100000000000051,
                    "y1": 52.8440320424313,
                    "y2": -0.0009285493308665941
                },
                {
                    "x": 13.150000000000052,
                    "y1": 57.10540819650721,
                    "y2": -0.00048222831773329304
                },
                {
                    "x": 13.200000000000053,
                    "y1": 61.20279723872806,
                    "y2": 0.00005777057221806312
                },
                {
                    "x": 13.250000000000053,
                    "y1": 65.12677574611594,
                    "y2": 0.0005576031604719075
                },
                {
                    "x": 13.300000000000054,
                    "y1": 68.86840073011136,
                    "y2": 0.000899568717947507
                },
                {
                    "x": 13.350000000000055,
                    "y1": 72.41922959315232,
                    "y2": 0.0010095001332562378
                },
                {
                    "x": 13.400000000000055,
                    "y1": 75.7713387350062,
                    "y2": 0.0008723963211632119
                },
                {
                    "x": 13.450000000000056,
                    "y1": 78.91734076908226,
                    "y2": 0.0005331279134769577
                },
                {
                    "x": 13.500000000000057,
                    "y1": 81.85040031262616,
                    "y2": 0.0000827752749396813
                },
                {
                    "x": 13.550000000000058,
                    "y1": 84.56424831844208,
                    "y2": -0.0003654297641840365
                },
                {
                    "x": 13.600000000000058,
                    "y1": 87.05319491959466,
                    "y2": -0.0007042918893436715
                },
                {
                    "x": 13.650000000000059,
                    "y1": 89.31214076240268,
                    "y2": -0.0008580204001369126
                },
                {
                    "x": 13.70000000000006,
                    "y1": 91.33658680693718,
                    "y2": -0.0007988418436233668
                },
                {
                    "x": 13.75000000000006,
                    "y1": 93.12264257817172,
                    "y2": -0.0005513071357801465
                },
                {
                    "x": 13.800000000000061,
                    "y1": 94.66703285488848,
                    "y2": -0.0001838621953487497
                },
                {
                    "x": 13.850000000000062,
                    "y1": 95.96710278741307,
                    "y2": 0.00020967875820504807
                },
                {
                    "x": 13.900000000000063,
                    "y1": 97.02082143922293,
                    "y2": 0.0005338295068643146
                },
                {
                    "x": 13.950000000000063,
                    "y1": 97.82678375143794,
                    "y2": 0.0007143727295268072
                },
                {
                    "x": 14.000000000000064,
                    "y1": 98.38421093314894,
                    "y2": 0.0007150902938918237
                },
                {
                    "x": 14.050000000000065,
                    "y1": 98.69294928445987,
                    "y2": 0.0005445806162667483
                },
                {
                    "x": 14.100000000000065,
                    "y1": 98.75346746300191,
                    "y2": 0.0002520144762893123
                },
                {
                    "x": 14.150000000000066,
                    "y1": 98.56685220851564,
                    "y2": -0.00008661517975777359
                },
                {
                    "x": 14.200000000000067,
                    "y1": 98.13480254387704,
                    "y2": -0.00038799404342830697
                },
                {
                    "x": 14.250000000000068,
                    "y1": 97.45962247466156,
                    "y2": -0.0005817889134464713
                },
                {
                    "x": 14.300000000000068,
                    "y1": 96.54421221298107,
                    "y2": -0.0006268523315946248
                },
                {
                    "x": 14.350000000000069,
                    "y1": 95.39205795489033,
                    "y2": -0.0005196498574121016
                },
                {
                    "x": 14.40000000000007,
                    "y1": 94.00722024412812,
                    "y2": -0.00029327180288851035
                },
                {
                    "x": 14.45000000000007,
                    "y1": 92.39432095832773,
                    "y2": -0.000007725218658644229
                },
                {
                    "x": 14.500000000000071,
                    "y1": 90.55852895709558,
                    "y2": 0.00026574450767191665
                },
                {
                    "x": 14.550000000000072,
                    "y1": 88.50554443450369,
                    "y2": 0.0004622578605784857
                },
                {
                    "x": 14.600000000000072,
                    "y1": 86.24158202156832,
                    "y2": 0.0005385228517832987
                },
                {
                    "x": 14.650000000000073,
                    "y1": 83.77335268718453,
                    "y2": 0.0004821462636978624
                },
                {
                    "x": 14.700000000000074,
                    "y1": 81.10804448874687,
                    "y2": 0.00031309362846562857
                },
                {
                    "x": 14.750000000000075,
                    "y1": 78.25330222630735,
                    "y2": 0.00007733133506148982
                },
                {
                    "x": 14.800000000000075,
                    "y1": 75.2172060565928,
                    "y2": -0.00016544577717077737
                },
                {
                    "x": 14.850000000000076,
                    "y1": 72.00824912552301,
                    "y2": -0.0003567748765625443
                },
                {
                    "x": 14.900000000000077,
                    "y1": 68.63531428003213,
                    "y2": -0.0004533610250164845
                },
                {
                    "x": 14.950000000000077,
                    "y1": 65.10764992199334,
                    "y2": -0.0004367022168631143
                },
                {
                    "x": 15.000000000000078,
                    "y1": 61.43484506887761,
                    "y2": -0.00031630958385172426
                },
                {
                    "x": 15.050000000000079,
                    "y1": 57.626803687438965,
                    "y2": -0.00012606421830265975
                },
                {
                    "x": 15.10000000000008,
                    "y1": 53.69371836820366,
                    "y2": 0.00008508247984679402
                },
                {
                    "x": 15.15000000000008,
                    "y1": 49.64604340985125,
                    "y2": 0.0002655627304074963
                },
                {
                    "x": 15.200000000000081,
                    "y1": 45.49446738370534,
                    "y2": 0.00037366527517582686
                },
                {
                    "x": 15.250000000000082,
                    "y1": 41.24988524950166,
                    "y2": 0.0003870403232928339
                },
                {
                    "x": 15.300000000000082,
                    "y1": 36.92337009436682,
                    "y2": 0.0003071058096944567
                },
                {
                    "x": 15.350000000000083,
                    "y1": 32.52614456752525,
                    "y2": 0.0001575487765569894
                },
                {
                    "x": 15.400000000000084,
                    "y1": 28.069552083649526,
                    "y2": -0.000022431369506756006
                },
                {
                    "x": 15.450000000000085,
                    "y1": 23.56502786798475,
                    "y2": -0.0001882637220273563
                },
                {
                    "x": 15.500000000000085,
                    "y1": 19.024069916407946,
                    "y2": -0.0003009380977405645
                },
                {
                    "x": 15.550000000000086,
                    "y1": 14.458209943431223,
                    "y2": -0.000336072854583756
                },
                {
                    "x": 15.600000000000087,
                    "y1": 9.87898439082364,
                    "y2": -0.0002890384018036745
                },
                {
                    "x": 15.650000000000087,
                    "y1": 5.297905569012496,
                    "y2": -0.0001751022026751201
                },
                {
                    "x": 15.700000000000088,
                    "y1": 0.7264330027330904,
                    "y2": -0.00002480336092537433
                },
                {
                    "x": 15.750000000000089,
                    "y1": -3.824054948470919,
                    "y2": 0.00012410323157352067
                },
                {
                    "x": 15.80000000000009,
                    "y1": -8.342289125333652,
                    "y2": 0.00023603731450354805
                },
                {
                    "x": 15.85000000000009,
                    "y1": -12.817137191184445,
                    "y2": 0.00028600509695896737
                },
                {
                    "x": 15.900000000000091,
                    "y1": -17.237630774514052,
                    "y2": 0.00026506644983743363
                },
                {
                    "x": 15.950000000000092,
                    "y1": -21.592992066340322,
                    "y2": 0.00018169222179133788
                },
                {
                    "x": 16.000000000000092,
                    "y1": -25.87265980861307,
                    "y2": 0.00005888717904296602
                },
                {
                    "x": 16.050000000000093,
                    "y1": -30.066314611738147,
                    "y2": -0.00007202615125750835
                },
                {
                    "x": 16.100000000000094,
                    "y1": -34.16390354128618,
                    "y2": -0.00017931173979496528
                },
                {
                    "x": 16.150000000000095,
                    "y1": -38.155663916077195,
                    "y2": -0.00023843781080769337
                },
                {
                    "x": 16.200000000000095,
                    "y1": -42.03214626209177,
                    "y2": -0.00023759838090617
                },
                {
                    "x": 16.250000000000096,
                    "y1": -45.78423636904621,
                    "y2": -0.0001799189611637115
                },
                {
                    "x": 16.300000000000097,
                    "y1": -49.403176398977656,
                    "y2": -0.00008198009380642432
                },
                {
                    "x": 16.350000000000097,
                    "y1": -52.88058499880671,
                    "y2": 0.00003080823062020366
                },
                {
                    "x": 16.400000000000098,
                    "y1": -56.20847637157459,
                    "y2": 0.00013072032910217893
                },
                {
                    "x": 16.4500000000001,
                    "y1": -59.37927826388038,
                    "y2": 0.00019446527796387672
                },
                {
                    "x": 16.5000000000001,
                    "y1": -62.385848829964594,
                    "y2": 0.00020854646216686163
                },
                {
                    "x": 16.5500000000001,
                    "y1": -65.22149233589086,
                    "y2": 0.00017201498389042853
                },
                {
                    "x": 16.6000000000001,
                    "y1": -67.87997367035804,
                    "y2": 0.00009608486878844659
                },
                {
                    "x": 16.6500000000001,
                    "y1": -70.35553163182591,
                    "y2": 8.552412787555593e-7
                },
                {
                    "x": 16.700000000000102,
                    "y1": -72.64289096484644,
                    "y2": -0.00008993472681185069
                },
                {
                    "x": 16.750000000000103,
                    "y1": -74.73727312175451,
                    "y2": -0.00015476648889376705
                },
                {
                    "x": 16.800000000000104,
                    "y1": -76.63440572917708,
                    "y2": -0.00017938535135140398
                },
                {
                    "x": 16.850000000000104,
                    "y1": -78.330530742159,
                    "y2": -0.00015985877752138183
                },
                {
                    "x": 16.900000000000105,
                    "y1": -79.82241127207025,
                    "y2": -0.00010301441739786435
                },
                {
                    "x": 16.950000000000106,
                    "y1": -81.10733707784259,
                    "y2": -0.00002428079126469402
                },
                {
                    "x": 17.000000000000107,
                    "y1": -82.18312871347753,
                    "y2": 0.00005642575946288881
                },
                {
                    "x": 17.050000000000107,
                    "y1": -83.04814032816078,
                    "y2": 0.00011968790767630386
                },
                {
                    "x": 17.100000000000108,
                    "y1": -83.70126111870427,
                    "y2": 0.00015121150141095808
                },
                {
                    "x": 17.15000000000011,
                    "y1": -84.14191543740725,
                    "y2": 0.00014499771622246679
                },
                {
                    "x": 17.20000000000011,
                    "y1": -84.3700615617729,
                    "y2": 0.00010437460275432264
                },
                {
                    "x": 17.25000000000011,
                    "y1": -84.38618913582948,
                    "y2": 0.00004074547607202119
                },
                {
                    "x": 17.30000000000011,
                    "y1": -84.19131529607694,
                    "y2": -0.00002953486735020961
                },
                {
                    "x": 17.35000000000011,
                    "y1": -83.78697949830216,
                    "y2": -0.00008931696603195867
                },
                {
                    "x": 17.400000000000112,
                    "y1": -83.17523706467303,
                    "y2": -0.00012480102195182104
                },
                {
                    "x": 17.450000000000113,
                    "y1": -82.35865147362239,
                    "y2": -0.00012867720003122496
                },
                {
                    "x": 17.500000000000114,
                    "y1": -81.34028541806379,
                    "y2": -0.00010155907963829461
                },
                {
                    "x": 17.550000000000114,
                    "y1": -80.1236906604313,
                    "y2": -0.000051450334522441964
                },
                {
                    "x": 17.600000000000115,
                    "y1": -78.7128967159021,
                    "y2": 0.000008531761691553504
                },
                {
                    "x": 17.650000000000116,
                    "y1": -77.11239839793122,
                    "y2": 0.00006354599722377251
                },
                {
                    "x": 17.700000000000117,
                    "y1": -75.32714226290331,
                    "y2": 0.00010066427800791939
                },
                {
                    "x": 17.750000000000117,
                    "y1": -73.36251199327256,
                    "y2": 0.0001118733028625671
                },
                {
                    "x": 17.800000000000118,
                    "y1": -71.22431276102,
                    "y2": 0.00009575324636587985
                },
                {
                    "x": 17.85000000000012,
                    "y1": -68.91875461559664,
                    "y2": 0.00005749609671884658
                },
                {
                    "x": 17.90000000000012,
                    "y1": -66.45243494273967,
                    "y2": 0.000007340234503770044
                },
                {
                    "x": 17.95000000000012,
                    "y1": -63.83232004263889,
                    "y2": -0.0000421267457846023
                },
                {
                    "x": 18.00000000000012,
                    "y1": -61.065725877891076,
                    "y2": -0.00007909607185561693
                },
                {
                    "x": 18.05000000000012,
                    "y1": -58.16029804350244,
                    "y2": -0.00009532682398541285
                },
                {
                    "x": 18.100000000000122,
                    "y1": -55.12399101288414,
                    "y2": -0.00008794480070729048
                },
                {
                    "x": 18.150000000000123,
                    "y1": -51.96504671532547,
                    "y2": -0.000059868863216153664
                },
                {
                    "x": 18.200000000000124,
                    "y1": -48.69197250182442,
                    "y2": -0.00001882963051041206
                },
                {
                    "x": 18.250000000000124,
                    "y1": -45.31351855739956,
                    "y2": 0.000024715898989245703
                },
                {
                    "x": 18.300000000000125,
                    "y1": -41.83865481910176,
                    "y2": 0.000060220714538830105
                },
                {
                    "x": 18.350000000000126,
                    "y1": -38.27654745988329,
                    "y2": 0.00007957713193293757
                },
                {
                    "x": 18.400000000000126,
                    "y1": -34.63653499926813,
                    "y2": 0.00007893880154487879
                },
                {
                    "x": 18.450000000000127,
                    "y1": -30.928104102395054,
                    "y2": 0.00005943369469521746
                },
                {
                    "x": 18.500000000000128,
                    "y1": -27.160865129477628,
                    "y2": 0.00002665146740657092
                },
                {
                    "x": 18.55000000000013,
                    "y1": -23.344527498039334,
                    "y2": -0.000010912299283556865
                },
                {
                    "x": 18.60000000000013,
                    "y1": -19.488874920438995,
                    "y2": -0.00004403166065803798
                },
                {
                    "x": 18.65000000000013,
                    "y1": -15.603740579201677,
                    "y2": -0.00006499461496361937
                },
                {
                    "x": 18.70000000000013,
                    "y1": -11.698982302513773,
                    "y2": -0.00006937551676646292
                },
                {
                    "x": 18.75000000000013,
                    "y1": -7.784457801929682,
                    "y2": -0.00005693429668765746
                },
                {
                    "x": 18.800000000000132,
                    "y1": -3.870000033872464,
                    "y2": -0.00003146980093518886
                },
                {
                    "x": 18.850000000000133,
                    "y1": 0.034607254105711874,
                    "y2": 2.8663074813484514e-7
                },
                {
                    "x": 18.900000000000134,
                    "y1": 3.9196537321033427,
                    "y2": 0.00003042566372981989
                },
                {
                    "x": 18.950000000000134,
                    "y1": 7.775526392402169,
                    "y2": 0.000051810910590630405
                },
                {
                    "x": 19.000000000000135,
                    "y1": 11.592733091521254,
                    "y2": 0.0000597496814958979
                },
                {
                    "x": 19.050000000000136,
                    "y1": 15.361925672757712,
                    "y2": 0.000052997231173727365
                },
                {
                    "x": 19.100000000000136,
                    "y1": 19.07392261351227,
                    "y2": 0.000033886592047736303
                },
                {
                    "x": 19.150000000000137,
                    "y1": 22.719731143163415,
                    "y2": 0.000007595557206057935
                },
                {
                    "x": 19.200000000000138,
                    "y1": 26.29056877884776,
                    "y2": -0.00001923162119678646
                },
                {
                    "x": 19.25000000000014,
                    "y1": 29.77788422822179,
                    "y2": -0.000040146382516777576
                },
                {
                    "x": 19.30000000000014,
                    "y1": 33.17337761011617,
                    "y2": -0.00005043009571082951
                },
                {
                    "x": 19.35000000000014,
                    "y1": 36.469019945943835,
                    "y2": -0.00004813932750219573
                },
                {
                    "x": 19.40000000000014,
                    "y1": 39.657071876780606,
                    "y2": -0.00003443575130808915
                },
                {
                    "x": 19.45000000000014,
                    "y1": 42.730101563197536,
                    "y2": -0.000013156605384865836
                },
                {
                    "x": 19.500000000000142,
                    "y1": 45.68100172718094,
                    "y2": 0.000010234428859970647
                },
                {
                    "x": 19.550000000000143,
                    "y1": 48.50300579782306,
                    "y2": 0.00003003455193520369
                },
                {
                    "x": 19.600000000000144,
                    "y1": 51.1897031248975,
                    "y2": 0.00004167875543678245
                },
                {
                    "x": 19.650000000000144,
                    "y1": 53.73505322694295,
                    "y2": 0.00004277719196909923
                },
                {
                    "x": 19.700000000000145,
                    "y1": 56.13339904305721,
                    "y2": 0.00003358121951944557
                },
                {
                    "x": 19.750000000000146,
                    "y1": 58.37947916024862,
                    "y2": 0.000016794413379515313
                },
                {
                    "x": 19.800000000000146,
                    "y1": 60.46843899089201,
                    "y2": -0.000003194264428245804
                },
                {
                    "x": 19.850000000000147,
                    "y1": 62.395840877588114,
                    "y2": -0.000021443377666259747
                },
                {
                    "x": 19.900000000000148,
                    "y1": 64.15767310551891,
                    "y2": -0.00003366893764300817
                },
                {
                    "x": 19.95000000000015,
                    "y1": 65.75035780522187,
                    "y2": -0.00003723792379162211
                }
            ]
        }
    ]
};


let data8 = {
    "filter": {
        "series": "seriesA",
        "rules": [
            {
                "express": "",
                "field": ""
            }
        ]
    },
    "encoding": {

        "x": {
            "field": "date"
        },
        "y": {
            "field": "value",
            "type": "Linear"
        },

        "stack": false,
        "radial": false
    },
    "series": [
        {
            "name": "seriesA",
            "charttype": "Area",
            "style": {},
            "data": [

            ]
        }
    ]
};
var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
for(let i = 0; i < 20000; ++i){
    var now = new Date(base += oneDay);    
    data8.series[0].data.push({
        "date":[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        'value':Math.round((Math.random() - 0.5) * 20 +( i===0?0: data8.series[0].data[i - 1].value))
    })
}
