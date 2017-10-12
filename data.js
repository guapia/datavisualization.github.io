
let data = {
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

for (let i = 0; i < 100; ++i) {
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
        "series": "seriesB,seriesD,seriesE,seriesC",
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


for (let i = 0; i < 10; ++i) {
    for (let ser of data4.series) {
        ser.data.push(
            {
                "country": "label" + i,
                "downloads": -Math.random() * 30000,
                "sales": Math.random() * 30000 * (Math.random() * 10 > 5 ? 1 : -1),
                "expenses": -Math.random() * 30000,
                "active": -Math.random() * 10 > 5 ? "true" : "false"
            }
        );
    }
}

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

        "stack": true,
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

for (let i = 0; i < 100; i+=0.1) {
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

for (let i = -1; i < 1; i+=0.01) {
    data5.series[1].data.push(
        {
            "x": i*50+50,
            'y': Math.atan(i)
        }
    );
    // data5.series[1].data.push(
    //     {
    //         "x": i*2,
    //         'y': Math.cos(i)*2
    //     }
    // );

}
