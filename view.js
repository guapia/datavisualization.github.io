var android;
(function (android) {
    var test;
    (function (test) {
        class Debug {
            static assert(flg = false, log) {
                if (!flg) {
                    let err = new Error();
                    throw log + "\n" + err.stack;
                }
            }
            static log(log) {
                console.log(log);
            }
        }
        test.Debug = Debug;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class Utility {
            static max(arr) {
                var vs = [];
                for (let v of arr) {
                    if (!isNaN(v) && v != null) {
                        vs.push(v);
                    }
                }
                return Math.max.apply(this, vs);
            }
            static min(arr) {
                var vs = [];
                for (let v of arr) {
                    if (!isNaN(v) && v != null) {
                        vs.push(v);
                    }
                }
                return Math.min.apply(this, vs);
            }
            static iskey(key) {
                return key !== undefined && key !== null && typeof (key) == 'string' && key[0] != '_';
            }
            static checkArrayType(arr) {
                test.Debug.assert(arr != null);
                test.Debug.assert(arr.length > 0);
                let type = typeof arr[0];
                for (let v of arr) {
                    if (type != typeof v) {
                        return false;
                    }
                }
                return true;
            }
            static getType(v) {
                let datatype = null;
                if (v instanceof Array) {
                    test.Debug.assert(v != null);
                    test.Debug.assert(v.length > 0);
                    datatype = test.DataType.Array;
                    if (Utility.checkArrayType(v)) {
                        return Utility.getType(v[0]);
                    }
                }
                else if (typeof v == 'number') {
                    datatype = test.DataType.Number;
                }
                else if (typeof v == 'string') {
                    datatype = test.DataType.String;
                }
                else if (typeof v == 'boolean') {
                    datatype = test.DataType.Boolean;
                }
                else {
                    test.Debug.assert(true, "Value can't be Object except Array");
                }
                return datatype;
            }
            static mergeScale(scaleA, scaleB) {
                let scale = null;
                if (scaleA.id == scaleB.id) {
                    if (scaleA instanceof test.OrdinalScale && scaleB instanceof test.OrdinalScale) {
                        let domainunions = _.union(scaleA.domains, scaleB.domains);
                        if (scaleA.domains.length / domainunions.length > 0.5 && scaleB.domains.length / domainunions.length > 0.5) {
                            scale = scaleA.clone();
                            scale.domain(domainunions);
                        }
                    }
                    else if (scaleA instanceof test.LinearScale && scaleB instanceof test.LinearScale) {
                        let min = Math.min(scaleA.min, scaleB.min);
                        let max = Math.max(scaleA.max, scaleB.max);
                        let rate1 = Math.abs(max - min) / (Math.abs(scaleA.max - scaleA.min));
                        let rate2 = Math.abs(max - min) / (Math.abs(scaleB.max - scaleB.min));
                        console.log("Linear range rate1 = " + rate1 + " , rate2 = " + rate2);
                        if (rate1 < 5 && rate2 < 5) {
                            scale = scaleA.clone();
                            scale.domain([min, max]);
                        }
                    }
                    else if (scaleA instanceof test.LogScale && scaleB instanceof test.LogScale) {
                        if (scaleA.logBase == scaleB.logBase) {
                            scale = scaleA.clone();
                            scale.domain([Math.min(scaleA.min, scaleB.min), Math.max(scaleA.max, scaleB.max)]);
                        }
                    }
                }
                return scale;
            }
        }
        test.Utility = Utility;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        class ColorUtils {
            // ["#FFFFF0", "#FFFFE0", "#FFFF00 ", "#FFFAFA", "#FFFAF0", "#FFFACD", "#FFF8DC ", "#FFF68F", "#FFF5EE", "#FFF0F5", "#FFEFDB ", "#FFEFD5", "#FFEC8B", "#FFEBCD", "#FFE7BA ", "#FFE4E1", "#FFE4C4", "#FFE4B5", "#FFE1FF ", "#FFDEAD", "#FFDAB9", "#FFD700", "#FFD39B ", "#FFC1C1", "#FFC125", "#FFC0CB", "#FFBBFF ", "#FFB90F", "#FFB6C1", "#FFB5C5", "#FFAEB9 ", "#FFA54F", "#FFA500", "#FFA07A", "#FF8C69 ", "#FF8C00", "#FF83FA", "#FF82AB", "#FF8247 ", "#FF7F50", "#FF7F24", "#FF7F00", "#FF7256 ", "#FF6EB4", "#FF6A6A", "#FF69B4", "#FF6347 ", "#FF4500", "#FF4040", "#FF3E96", "#FF34B3 ", "#FF3030", "#FF1493", "#FF00FF", "#FF0000 ", "#FDF5E6", "#FCFCFC", "#FAFAFA", "#FAFAD2 ", "#FAF0E6", "#FAEBD7", "#FA8072", "#F8F8FF ", "#F7F7F7", "#F5FFFA", "#F5F5F5", "#F5F5DC ", "#F5DEB3", "#F4F4F4", "#F4A460", "#F2F2F2 ", "#F0FFFF", "#F0FFF0", "#F0F8FF", "#F0F0F0 ", "#F0E68C", "#F08080", "#EEEEE0", "#EEEED1 ", "#EEEE00", "#EEE9E9", "#EEE9BF", "#EEE8CD ", "#EEE8AA", "#EEE685", "#EEE5DE", "#EEE0E5 ", "#EEDFCC", "#EEDC82", "#EED8AE", "#EED5D2 ", "#EED5B7", "#EED2EE", "#EECFA1", "#EECBAD ", "#EEC900", "#EEC591", "#EEB4B4", "#EEB422 ", "#EEAEEE", "#EEAD0E", "#EEA9B8", "#EEA2AD ", "#EE9A49", "#EE9A00", "#EE9572", "#EE82EE ", "#EE8262", "#EE7AE9", "#EE799F", "#EE7942 ", "#EE7621", "#EE7600", "#EE6AA7", "#EE6A50 ", "#EE6363", "#EE5C42", "#EE4000", "#EE3B3B ", "#EE3A8C", "#EE30A7", "#EE2C2C", "#EE1289 ", "#EE00EE", "#EE0000", "#EDEDED", "#EBEBEB ", "#EAEAEA", "#E9967A", "#E8E8E8", "#E6E6FA ", "#E5E5E5", "#E3E3E3", "#E0FFFF", "#E0EEEE ", "#E0EEE0", "#E0E0E0", "#E066FF", "#DEDEDE ", "#DEB887", "#DDA0DD", "#DCDCDC", "#DC143C ", "#DBDBDB", "#DB7093", "#DAA520", "#DA70D6 ", "#D9D9D9", "#D8BFD8", "#D6D6D6", "#D4D4D4 ", "#D3D3D3", "#D2B48C", "#D2691E", "#D1EEEE ", "#D1D1D1", "#D15FEE", "#D02090", "#CFCFCF ", "#CDCDC1", "#CDCDB4", "#CDCD00", "#CDC9C9 ", "#CDC9A5", "#CDC8B1", "#CDC673", "#CDC5BF ", "#CDC1C5", "#CDC0B0", "#CDBE70", "#CDBA96 ", "#CDB7B5", "#CDB79E", "#CDB5CD", "#CDB38B ", "#CDAF95", "#CDAD00", "#CDAA7D", "#CD9B9B ", "#CD9B1D", "#CD96CD", "#CD950C", "#CD919E ", "#CD8C95", "#CD853F", "#CD8500", "#CD8162 ", "#CD7054", "#CD69C9", "#CD6889", "#CD6839 ", "#CD661D", "#CD6600", "#CD6090", "#CD5C5C ", "#CD5B45", "#CD5555", "#CD4F39", "#CD3700 ", "#CD3333", "#CD3278", "#CD2990", "#CD2626 ", "#CD1076", "#CD00CD", "#CD0000", "#CCCCCC ", "#CAFF70", "#CAE1FF", "#C9C9C9", "#C7C7C7 ", "#C71585", "#C6E2FF", "#C67171", "#C5C1AA ", "#C4C4C4", "#C2C2C2", "#C1FFC1", "#C1CDCD ", "#C1CDC1", "#C1C1C1", "#C0FF3E", "#BFEFFF ", "#BFBFBF", "#BF3EFF", "#BEBEBE", "#BDBDBD ", "#BDB76B", "#BCEE68", "#BCD2EE", "#BC8F8F ", "#BBFFFF", "#BABABA", "#BA55D3", "#B9D3EE ", "#B8B8B8", "#B8860B", "#B7B7B7", "#B5B5B5 ", "#B4EEB4", "#B4CDCD", "#B452CD", "#B3EE3A ", "#B3B3B3", "#B2DFEE", "#B23AEE", "#B22222 ", "#B0E2FF", "#B0E0E6", "#B0C4DE", "#B0B0B0 ", "#B03060", "#AEEEEE", "#ADFF2F", "#ADD8E6 ", "#ADADAD", "#ABABAB", "#AB82FF", "#AAAAAA ", "#A9A9A9", "#A8A8A8", "#A6A6A6", "#A52A2A ", "#A4D3EE", "#A3A3A3", "#A2CD5A", "#A2B5CD ", "#A1A1A1", "#A0522D", "#A020F0", "#9FB6CD ", "#9F79EE", "#9E9E9E", "#9C9C9C", "#9BCD9B ", "#9B30FF", "#9AFF9A", "#9ACD32", "#9AC0CD ", "#9A32CD", "#999999", "#9932CC", "#98FB98 ", "#98F5FF", "#97FFFF", "#96CDCD", "#969696 ", "#949494", "#9400D3", "#9370DB", "#919191 ", "#912CEE", "#90EE90", "#8FBC8F", "#8F8F8F ", "#8EE5EE", "#8E8E8E", "#8E8E38", "#8E388E ", "#8DEEEE", "#8DB6CD", "#8C8C8C", "#8B8B83 ", "#8B8B7A", "#8B8B00", "#8B8989", "#8B8970 ", "#8B8878", "#8B8682", "#8B864E", "#8B8386 ", "#8B8378", "#8B814C", "#8B7E66", "#8B7D7B ", "#8B7D6B", "#8B7B8B", "#8B795E", "#8B7765 ", "#8B7500", "#8B7355", "#8B6969", "#8B6914 ", "#8B668B", "#8B6508", "#8B636C", "#8B5F65 ", "#8B5A2B", "#8B5A00", "#8B5742", "#8B4C39 ", "#8B4789", "#8B475D", "#8B4726", "#8B4513 ", "#8B4500", "#8B3E2F", "#8B3A62", "#8B3A3A ", "#8B3626", "#8B2500", "#8B2323", "#8B2252 ", "#8B1C62", "#8B1A1A", "#8B0A50", "#8B008B ", "#8B0000", "#8A8A8A", "#8A2BE2", "#8968CD ", "#87CEFF", "#87CEFA", "#87CEEB", "#878787 ", "#858585", "#848484", "#8470FF", "#838B8B ", "#838B83", "#836FFF", "#828282", "#7FFFD4 ", "#7FFF00", "#7F7F7F", "#7EC0EE", "#7D9EC0 ", "#7D7D7D", "#7D26CD", "#7CFC00", "#7CCD7C ", "#7B68EE", "#7AC5CD", "#7A8B8B", "#7A7A7A ", "#7A67EE", "#7A378B", "#79CDCD", "#787878 ", "#778899", "#76EEC6", "#76EE00", "#757575 ", "#737373", "#71C671", "#7171C6", "#708090 ", "#707070", "#6E8B3D", "#6E7B8B", "#6E6E6E ", "#6CA6CD", "#6C7B8B", "#6B8E23", "#6B6B6B ", "#6A5ACD", "#698B69", "#698B22", "#696969 ", "#6959CD", "#68838B", "#68228B", "#66CDAA ", "#66CD00", "#668B8B", "#666666", "#6495ED ", "#63B8FF", "#636363", "#616161", "#607B8B ", "#5F9EA0", "#5E5E5E", "#5D478B", "#5CACEE ", "#5C5C5C", "#5B5B5B", "#595959", "#575757 ", "#556B2F", "#555555", "#551A8B", "#54FF9F ", "#548B54", "#545454", "#53868B", "#528B8B ", "#525252", "#515151", "#4F94CD", "#4F4F4F ", "#4EEE94", "#4D4D4D", "#4B0082", "#4A708B ", "#4A4A4A", "#48D1CC", "#4876FF", "#483D8B ", "#474747", "#473C8B", "#4682B4", "#458B74 ", "#458B00", "#454545", "#43CD80", "#436EEE ", "#424242", "#4169E1", "#40E0D0", "#404040 ", "#3D3D3D", "#3CB371", "#3B3B3B", "#3A5FCD ", "#388E8E", "#383838", "#36648B", "#363636 ", "#333333", "#32CD32", "#303030", "#2F4F4F ", "#2E8B57", "#2E2E2E", "#2B2B2B", "#292929 ", "#282828", "#27408B", "#262626", "#242424 ", "#228B22", "#218868", "#212121", "#20B2AA ", "#1F1F1F", "#1E90FF", "#1E1E1E", "#1C86EE ", "#1C1C1C", "#1A1A1A", "#191970", "#1874CD ", "#171717", "#141414", "#121212", "#104E8B ", "#0F0F0F", "#0D0D0D", "#0A0A0A", "#080808 ", "#050505", "#030303", "#00FFFF", "#00FF7F ", "#00FF00", "#00FA9A", "#00F5FF", "#00EEEE ", "#00EE76", "#00EE00", "#00E5EE", "#00CED1 ", "#00CDCD", "#00CD66", "#00CD00", "#00C5CD ", "#00BFFF", "#00B2EE", "#009ACD", "#008B8B ", "#008B45", "#008B00", "#00868B", "#00688B ", "#006400", "#0000FF", "#0000EE", "#0000CD ", "#0000AA", "#00008B", "#000080"];
            static nextColor() {
                return ColorUtils.Color[ColorUtils._colorindex++ % ColorUtils.Color.length];
            }
            static indexColor(index) {
                return ColorUtils.Color[index % ColorUtils.Color.length];
            }
            static gradientColor(startColor, endColor, step) {
                let startRGB = ColorUtils.colorRgb(startColor); //转换为rgb数组模式
                let startR = startRGB[0];
                let startG = startRGB[1];
                let startB = startRGB[2];
                let endRGB = ColorUtils.colorRgb(endColor);
                let endR = endRGB[0];
                let endG = endRGB[1];
                let endB = endRGB[2];
                let sR = (endR - startR) / step; //总差值
                let sG = (endG - startG) / step;
                let sB = (endB - startB) / step;
                var colorArr = [];
                for (var i = 0; i < step; i++) {
                    //计算每一步的hex值 
                    var hex = ColorUtils.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
                    colorArr.push(hex);
                }
                return colorArr;
            }
            static getColor(startColor, endColor, value, start, end) {
                let startRGB = ColorUtils.colorRgb(startColor); //转换为rgb数组模式
                let startR = startRGB[0];
                let startG = startRGB[1];
                let startB = startRGB[2];
                let endRGB = ColorUtils.colorRgb(endColor);
                let endR = endRGB[0];
                let endG = endRGB[1];
                let endB = endRGB[2];
                let sR = (endR - startR) / (end - start); //总差值
                let sG = (endG - startG) / (end - start);
                let sB = (endB - startB) / (end - start);
                var hex = ColorUtils.colorHex('rgb(' + parseInt((sR * value + startR)) + ',' + parseInt((sG * value + startG)) + ',' + parseInt((sB * value + startB)) + ')');
                return hex;
            }
            static colorRgb(sColor) {
                var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                var sColor = sColor.toLowerCase();
                if (sColor && reg.test(sColor)) {
                    if (sColor.length === 4) {
                        var sColorNew = "#";
                        for (var i = 1; i < 4; i += 1) {
                            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                        }
                        sColor = sColorNew;
                    }
                    //处理六位的颜色值
                    var sColorChange = [];
                    for (var i = 1; i < 7; i += 2) {
                        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                    }
                    return sColorChange;
                }
                else {
                    return sColor;
                }
            }
            // 将rgb表示方式转换为hex表示方式
            static colorHex(rgb) {
                let _thiss = rgb;
                var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                if (/^(rgb|RGB)/.test(_thiss)) {
                    var aColor = _thiss.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
                    var strHex = "#";
                    for (var i = 0; i < aColor.length; i++) {
                        let hex = Number(aColor[i]).toString(16);
                        hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
                        if (hex === "0") {
                            hex += hex;
                        }
                        strHex += hex;
                    }
                    if (strHex.length !== 7) {
                        strHex = _thiss;
                    }
                    return strHex;
                }
                else if (reg.test(_thiss)) {
                    var aNum = _thiss.replace(/#/, "").split("");
                    if (aNum.length === 6) {
                        return _thiss;
                    }
                    else if (aNum.length === 3) {
                        var numHex = "#";
                        for (var i = 0; i < aNum.length; i += 1) {
                            numHex += (aNum[i] + aNum[i]);
                        }
                        return numHex;
                    }
                }
                else {
                    return _thiss;
                }
            }
        }
        ColorUtils._colorindex = -1;
        ColorUtils.Color = ['rgb(251, 118, 123)', 'rgb(129, 227, 238)', '#88bde6', '#fbb258', '#90cd97', '#f6aac9', '#bfa554', '#bc99c7', '#eddd46', '#f07e6e', '#8c8c8c'];
        test.ColorUtils = ColorUtils;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Point = android.graphics.Point;
        class RotateRect {
            constructor(centerx, centery, width, height, angle) {
                this.angle = angle;
                this.centerx = centerx;
                this.centery = centery;
                this.width = width;
                this.height = height;
                this.points = [new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point(), new Point()];
                let lt = this.points[0];
                let rt = this.points[1];
                let rb = this.points[2];
                let lb = this.points[3];
                let ct = this.points[4];
                let cb = this.points[5];
                let cl = this.points[6];
                let cr = this.points[7];
                cr.x = this.centerx + Math.cos(this.angle) * this.width / 2;
                cr.y = this.centery + Math.sin(this.angle) * this.width / 2;
                cl.x = 2 * this.centerx - cr.x;
                cl.y = 2 * this.centery - cr.y;
                rt.x = cr.x + Math.sin(this.angle) * this.height / 2;
                rt.y = cr.y - Math.cos(this.angle) * this.height / 2;
                rb.x = 2 * cr.x - rt.x;
                rb.y = 2 * cr.y - rt.y;
                lb.x = cl.x - Math.sin(this.angle) * this.height / 2;
                lb.y = cl.y + Math.cos(this.angle) * this.height / 2;
                lt.x = 2 * cl.x - lb.x;
                lt.y = 2 * cl.y - lb.y;
                cb.x = (lb.x + rb.x) / 2;
                cb.y = (lb.y + rb.y) / 2;
                ct.x = (lt.x + rt.x) / 2;
                ct.y = (lt.y + rt.y) / 2;
                let center = this.points[8];
                center.x = this.centerx;
                center.y = this.centery;
            }
            get raidius() {
                return Math.sqrt(Math.pow(this.center.x - this.leftTop.x, 2) + Math.pow(this.center.y - this.leftTop.y, 2));
            }
            offset(x, y, angle) {
                for (var i = 0; i < this.points.length; ++i) {
                    var pt = this.points[i];
                    pt.x += x * Math.cos(angle);
                    pt.y += y * Math.sin(angle);
                }
            }
            get leftTop() {
                return this.points[0];
            }
            get rightTop() {
                return this.points[1];
            }
            get leftBottom() {
                return this.points[3];
            }
            get rightBottom() {
                return this.points[2];
            }
            get centerTop() {
                return this.points[4];
            }
            get centerBottom() {
                return this.points[5];
            }
            get center() {
                return this.points[8];
            }
            get startPoint() {
                return new Point(this.centerx, this.centery);
            }
        }
        test.RotateRect = RotateRect;
        class RotateLine {
            constructor(cx, cy, leftwidth, rightwidth, angle) {
                this._cx = cx;
                this._cy = cy;
                this._leftwidth = leftwidth;
                this._rightwidth = rightwidth;
                this._angle = angle;
                this.endPoint = new Point();
                this.endPoint.x = cx + Math.sin(this._angle) * rightwidth;
                this.endPoint.y = cy - Math.cos(this._angle) * rightwidth;
                this.startPoint = new Point();
                this.startPoint.x = cx - Math.sin(this._angle) * leftwidth;
                this.startPoint.y = cy + Math.cos(this._angle) * leftwidth;
            }
        }
        test.RotateLine = RotateLine;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        let AnimationType;
        (function (AnimationType) {
            AnimationType[AnimationType["Width"] = 0] = "Width";
            AnimationType[AnimationType["Height"] = 1] = "Height";
            AnimationType[AnimationType["Size"] = 2] = "Size";
            AnimationType[AnimationType["Radius"] = 3] = "Radius";
            AnimationType[AnimationType["Sweep"] = 4] = "Sweep";
            AnimationType[AnimationType["Alpha"] = 5] = "Alpha";
        })(AnimationType = test.AnimationType || (test.AnimationType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        let Agg;
        (function (Agg) {
            Agg[Agg["SUM"] = 0] = "SUM";
            Agg[Agg["AVERAGE"] = 1] = "AVERAGE";
            Agg[Agg["COUNT"] = 2] = "COUNT";
            Agg[Agg["NONE"] = 3] = "NONE";
        })(Agg = test.Agg || (test.Agg = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        let Order;
        (function (Order) {
            Order[Order["Desc"] = 0] = "Desc";
            Order[Order["Asc"] = 1] = "Asc";
            Order[Order["None"] = 2] = "None";
        })(Order = test.Order || (test.Order = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        let ScaleType;
        (function (ScaleType) {
            ScaleType[ScaleType["Linear"] = 0] = "Linear";
            ScaleType[ScaleType["Log"] = 1] = "Log";
            ScaleType[ScaleType["Ordinal"] = 2] = "Ordinal";
        })(ScaleType = test.ScaleType || (test.ScaleType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        let DataType;
        (function (DataType) {
            DataType[DataType["Number"] = 0] = "Number";
            DataType[DataType["String"] = 1] = "String";
            DataType[DataType["Object"] = 2] = "Object";
            DataType[DataType["Array"] = 3] = "Array";
            DataType[DataType["Boolean"] = 4] = "Boolean";
            DataType[DataType["Date"] = 5] = "Date";
        })(DataType = test.DataType || (test.DataType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        let ChartType;
        (function (ChartType) {
            ChartType[ChartType["Bar"] = 0] = "Bar";
            ChartType[ChartType["Line"] = 1] = "Line";
            ChartType[ChartType["Scatter"] = 2] = "Scatter";
            ChartType[ChartType["Area"] = 3] = "Area";
            // RadialBar,
            // RadialLine,
            // RadialScatter,
            // RadiaArea,
            ChartType[ChartType["Pie"] = 4] = "Pie";
            ChartType[ChartType["Sunburst"] = 5] = "Sunburst";
            ChartType[ChartType["TreeMap"] = 6] = "TreeMap";
            ChartType[ChartType["Radar"] = 7] = "Radar";
            ChartType[ChartType["Candlestick"] = 8] = "Candlestick";
        })(ChartType = test.ChartType || (test.ChartType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        let AxisType;
        (function (AxisType) {
            AxisType[AxisType["X"] = 0] = "X";
            AxisType[AxisType["Y"] = 1] = "Y";
        })(AxisType = test.AxisType || (test.AxisType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class Value {
            constructor(v, scaleType) {
                this.__val = v;
                if (v instanceof Array) {
                    this.__isMultiple = true;
                }
                else {
                    this.__isMultiple = false;
                }
                this.__scaleType = scaleType;
                this.__dataType = test.Utility.getType(v);
            }
            get scaleType() {
                return this.__scaleType;
            }
            get dataType() {
                return this.__dataType;
            }
            /**
             * for what ?
             * array value for high low open close?
             */
            get isMultiple() {
                return this.__isMultiple;
            }
            get value() {
                return this.__val;
            }
        }
        test.Value = Value;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
/// <reference path="../enum/Agg.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var Util = android.graphics.Util;
        'use strict';
        class Field {
            constructor(bind, name) {
                this.aggregate = Util.asEnum(bind.aggregate, test.Agg, true);
                if (this.aggregate == null) {
                    this.aggregate = test.Agg.NONE;
                }
                this.bind = bind.field;
                this.type = Util.asEnum(bind.type, test.ScaleType, true);
                if (this.type == null) {
                    this.type = test.ScaleType.Ordinal;
                }
                this.logBase = bind.logBase;
                this.name = name;
                this.range = bind.range;
                this.band = bind.band;
            }
            equals(field) {
                // return this.aggregate == field.aggregate
                // && this.bind == field.bind
                // && this.name == field.name
                // && this.type == field.type
                // && this.logBase == field.logBase
                // && this.range == field.range;
                return _.isEqual(this, field);
            }
        }
        test.Field = Field;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class Filter {
            constructor(series, rules) {
                this.series = series.split(',');
                if (rules != null && rules instanceof Array) {
                    this.rules = [];
                    for (let rule of rules) {
                        this.rules.push(new Rule(rule.field, rule.express));
                    }
                }
            }
            equals(field) {
                return _.isEqual(this, field);
            }
        }
        test.Filter = Filter;
        class Rule {
            constructor(filed, express) {
                this.filed = filed;
                this.express = express;
            }
        }
        test.Rule = Rule;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="./Field.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        class Encoding {
            constructor(encoding) {
                this._stack = false;
                this._radial = false;
                if (encoding.x) {
                    this.x = new test.Field(encoding.x, 'x');
                }
                if (encoding.y) {
                    this.y = new test.Field(encoding.y, 'y');
                }
                if (encoding.color) {
                    this.color = new test.Field(encoding.color, 'color');
                }
                if (encoding.shape) {
                    this.shape = new test.Field(encoding.shape, 'shape');
                }
                if (encoding.size) {
                    this.size = new test.Field(encoding.size, 'size');
                }
                if (encoding.group) {
                    this.group = new test.Field(encoding.group, 'group');
                }
                if (encoding.values && encoding.values instanceof Array) {
                    this.values = [];
                    for (var i = 0; i < encoding.values.length; ++i) {
                        var value = encoding.values[i];
                        this.values.push(new test.Field(value, value.name));
                    }
                }
                if (encoding.stack != null) {
                    this._stack = encoding.stack;
                }
                if (encoding.radial != null) {
                    this._radial = encoding.radial;
                }
            }
        }
        test.Encoding = Encoding;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class TransForm {
        }
        test.TransForm = TransForm;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Util = android.graphics.Util;
        class Series {
            constructor(encoding, series, index) {
                this.__points = [];
                this.__chartType = test.ChartType.Bar;
                this.enable = true;
                test.Debug.assert(encoding != null);
                test.Debug.assert(series != null);
                test.Debug.assert(series.data instanceof Array, "Series must be Array");
                this.__data = series.data;
                this.__name = series.name;
                this.__index = index;
                this.__chartType = Util.asEnum(series.charttype, test.ChartType);
                this.__encoding = encoding;
                this.__pairs = [];
                for (let key in this.__encoding) {
                    if (test.Utility.iskey(key)) {
                        let filed = this.__encoding[key];
                        let scale = this.__createScale(filed);
                        this.__pairs.push({ filed: filed, scale: scale });
                    }
                }
                for (let item of this.__data) {
                    this.__points.push(this.__analyseItem(this.__pairs, item));
                }
                for (let pair of this.__pairs) {
                    let filed = pair.filed;
                    let scale = pair.scale;
                    if (filed.name != 'x' && filed.name != 'y' && filed.range != null && filed.range.length > 0) {
                        if (scale instanceof test.LinearScale) {
                            scale.range(filed.range);
                        }
                        else if (scale instanceof test.LogScale) {
                            scale.range(filed.range);
                        }
                        else if (scale instanceof test.OrdinalScale) {
                            if (filed.band === true) {
                                scale.rangeBounds(filed.range);
                            }
                            else {
                                scale.range(filed.range);
                            }
                        }
                    }
                }
            }
            __analyseItem(pairs, item) {
                test.Debug.assert(item != null);
                test.Debug.assert(typeof item == 'object');
                let values = {};
                test.Debug.assert(!(item instanceof Array));
                for (let pair of pairs) {
                    let filed = pair.filed;
                    let scale = pair.scale;
                    if (scale instanceof test.LinearScale) {
                        let max = test.Utility.max([item[filed.bind], scale.max]);
                        let min = test.Utility.min([item[filed.bind], scale.min]);
                        scale.domain([min, max]);
                    }
                    else if (scale instanceof test.LogScale) {
                        let max = test.Utility.max([item[filed.bind], scale.max]);
                        let min = test.Utility.min([item[filed.bind], scale.min]);
                        scale.domain([min, max]);
                    }
                    else if (scale instanceof test.OrdinalScale) {
                        scale.domains.push(item[filed.bind]);
                    }
                    let value = new test.Value(item[filed.bind], filed.type);
                    values[filed.name] = value;
                }
                return values;
            }
            _refresh() {
                for (let pair of this.__pairs) {
                    pair.scale.domain([]);
                }
                for (let pt of this.__points) {
                    for (let pair of this.__pairs) {
                        let filed = pair.filed;
                        let scale = pair.scale;
                        if (scale instanceof test.LinearScale) {
                            let value = pt[filed.name];
                            let max = test.Utility.max(value.isMultiple ? value.value.concat([scale.max]) : [value.value, scale.max]);
                            let min = test.Utility.min(value.isMultiple ? value.value.concat([scale.min]) : [value.value, scale.min]);
                            scale.domain([min, max]);
                        }
                        else if (scale instanceof test.LogScale) {
                            let value = pt[filed.name];
                            let max = test.Utility.max(value.isMultiple ? value.value.concat([scale.max]) : [value.value, scale.max]);
                            let min = test.Utility.min(value.isMultiple ? value.value.concat([scale.min]) : [value.value, scale.min]);
                            scale.domain([min, max]);
                        }
                        else if (scale instanceof test.OrdinalScale) {
                            let value = pt[filed.name];
                            if (value.isMultiple) {
                                for (let v of value.value) {
                                    scale.domains.push(v);
                                }
                            }
                            else {
                                scale.domains.push(value.value);
                            }
                        }
                    }
                }
            }
            __createScale(filed) {
                test.Debug.assert(filed != null);
                let scale = null;
                switch (filed.type) {
                    case test.ScaleType.Linear:
                        scale = new test.LinearScale(filed.name);
                        break;
                    case test.ScaleType.Ordinal:
                        scale = new test.OrdinalScale(filed.name);
                        break;
                    case test.ScaleType.Log:
                        scale = new test.LogScale(filed.logBase, filed.name);
                        break;
                    default:
                        test.Debug.assert(false, filed.type + " ScaleType has not been implement!");
                        break;
                }
                return scale;
            }
            get data() {
                return this.__data;
            }
            get name() {
                return this.__name;
            }
            get scalePairs() {
                return this.__pairs;
            }
            get points() {
                return this.__points;
            }
            get size() {
                return this.__points.length;
            }
            get chartType() {
                return this.__chartType;
            }
            get index() {
                return this.__index;
            }
            getScale(name) {
                let index = _.findIndex(this.__pairs, function (item) {
                    return item.filed.name == name;
                });
                if (index >= 0) {
                    return this.__pairs[index].scale;
                }
                return null;
            }
            clone() {
                let series = _.cloneDeep(this);
                return series;
            }
        }
        test.Series = Series;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class DataModel {
            constructor(data) {
                this.__chartTypes = [];
                this._data = data;
                this.__encoding = this._analyseEncoding(this._data.encoding);
                this._analyseFilter(data.filter);
                this.refresh();
            }
            _analyseEncoding(encode) {
                return new test.Encoding(encode);
            }
            get chartTypes() {
                return this.__chartTypes;
            }
            _analyseSeries(series_data, encoding) {
                this._series = [];
                this._allSeries = [];
                for (let i = 0; i < series_data.length; ++i) {
                    let seriesitem = series_data[i];
                    let ser = new test.Series(encoding, seriesitem, i);
                    if (this.__filter != null && this.__filter.series.indexOf(seriesitem.name) > -1) {
                        ser.enable = true;
                        this._series.push(ser);
                        if (this.__chartTypes.indexOf(ser.chartType) < 0) {
                            this.__chartTypes.push(ser.chartType);
                        }
                    }
                    else {
                        ser.enable = false;
                    }
                    this._allSeries.push(ser);
                }
            }
            refresh() {
                this._analyseSeries(this._data.series, this.__encoding);
                this._createLayoutScales(this.encoding);
            }
            _analyseFilter(filter) {
                if (filter != null) {
                    this.__filter = new test.Filter(filter.series, filter.rules);
                }
            }
            _createLayoutScales(encoding) {
                this.__scalePairs = [];
                if (this._series.length > 1) {
                    this._stack(test.ChartType.Bar);
                    this._stack(test.ChartType.Line);
                    this._stack(test.ChartType.Area);
                    this._stack(test.ChartType.Scatter);
                    for (let i = 0; i < this._series.length - 1; ++i) {
                        let series = this._series[i];
                        let next_series = this._series[i + 1];
                        for (let pairA of series.scalePairs) {
                            for (let pairB of next_series.scalePairs) {
                                if (pairA.filed.equals(pairB.filed)) {
                                    let filed = pairA.filed;
                                    let infoA = this.__getScaleInfobyname(pairA.filed.name, series.name);
                                    let infoB = this.__getScaleInfobyname(pairB.filed.name, next_series.name);
                                    if (infoA == null && infoB == null) {
                                        let scale = test.Utility.mergeScale(pairA.scale, pairB.scale);
                                        if (scale != null) {
                                            this.__scalePairs.push({ series: [series.name, next_series.name], filed: filed, scale: scale });
                                        }
                                        else {
                                            this.__scalePairs.push({ series: [series.name], filed: pairA.filed, scale: pairA.scale });
                                            this.__scalePairs.push({ series: [next_series.name], filed: pairB.filed, scale: pairB.scale });
                                        }
                                    }
                                    else if (infoA == null && infoB != null) {
                                        let scale = test.Utility.mergeScale(pairA.scale, infoB.scale);
                                        if (scale != null) {
                                            infoB.scale = scale;
                                            infoB.series.push(series.name);
                                        }
                                    }
                                    else if (infoA != null && infoB == null) {
                                        let scale = test.Utility.mergeScale(pairB.scale, infoA.scale);
                                        if (scale != null) {
                                            infoA.scale = scale;
                                            infoA.series.push(next_series.name);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for (let ser of this._series) {
                        for (let pair of ser.scalePairs) {
                            let scale = this._getScaleByName(pair.filed.name, ser.name);
                            if (scale != null) {
                                pair.scale = scale;
                            }
                        }
                    }
                }
                else if (this._series.length == 1) {
                    for (let pair of this._series[0].scalePairs) {
                        this.__scalePairs.push({ series: [this._series[0].name], filed: pair.filed, scale: pair.scale.clone() });
                    }
                }
            }
            _stack(chartType) {
                if (this.encoding._stack) {
                    let negative = {};
                    let positive = {};
                    for (let i = 0; i < this.series.length; ++i) {
                        let serA = this.series[i];
                        if (serA.chartType === chartType) {
                            this._setSeriesStack(serA, positive, negative);
                        }
                    }
                }
            }
            __getScaleInfobyname(filedname, seriesname) {
                let info = _.find(this.__scalePairs, (item) => {
                    return item.series.indexOf(seriesname) >= 0 && filedname == item.filed.name;
                });
                return info;
            }
            _getScaleByName(filedname, seriesname) {
                return _.result(_.find(this.__scalePairs, (item) => {
                    return item.series.indexOf(seriesname) >= 0 && filedname == item.filed.name;
                }), "scale");
            }
            _setSeriesStack(series, pos, neg) {
                let scaleX_A = series.getScale('x');
                if (scaleX_A instanceof test.OrdinalScale) {
                    for (let pt of series.points) {
                        let negvalue = neg[pt.x.value];
                        let posvalue = pos[pt.x.value];
                        if (negvalue == null) {
                            negvalue = 0;
                            neg[pt.x.value] = 0;
                        }
                        if (posvalue == null) {
                            posvalue = 0;
                            pos[pt.x.value] = 0;
                        }
                        let isNeg = pt.y.value < 0;
                        let startY = isNeg ? negvalue : posvalue;
                        let endY = startY + pt.y.value;
                        isNeg ? neg[pt.x.value] = endY : pos[pt.x.value] = endY;
                        // targetPoint.y = new Value([startY, endY], targetPoint.y.scaleType);
                        // seriesB.points[index] = targetPoint;
                        pt.y = new test.Value([startY, endY], pt.y.scaleType);
                    }
                }
                series._refresh();
            }
            getSeriesByType(charttype) {
                let series = _.filter(this._series, (ser) => { return ser.chartType === charttype; });
                return series;
            }
            get series() {
                return this._series;
            }
            get allSeries() {
                return this._allSeries;
            }
            get encoding() {
                return this.__encoding;
            }
            get filter() {
                return this.__filter;
            }
            get scalePairs() {
                return this.__scalePairs;
            }
        }
        test.DataModel = DataModel;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.d.ts" />
/// <reference path="../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        class Scale {
            constructor(id) {
                this.__bound = false;
                this.__domains = [];
                this.ranges = [];
                this.id = id;
                this._order = test.Order.None;
            }
            set id(value) {
                this.__id = value;
            }
            get id() {
                return this.__id;
            }
            domain(domains) {
                this.__domains = domains;
                return this;
            }
            range(ranges) {
                this.ranges = ranges;
                return this.refresh();
            }
            rangeBounds(ranges) {
                return this;
            }
            refresh() {
                return this;
            }
            getScaleValue(value) {
                return 0;
            }
            get startPosition() {
                return this.__start;
            }
            get endPosition() {
                return this.__end;
            }
            get order() {
                return this._order;
            }
            set order(value) {
                this._order = value;
            }
            equal(value) {
                if (value != null) {
                    return this.id == value.id;
                }
                return false;
            }
            clone() {
                return _.cloneDeep(this);
            }
        }
        test.Scale = Scale;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class LinearScale extends test.Scale {
            constructor(id) {
                super(id);
            }
            get max() {
                return this._max;
            }
            get min() {
                return this._min;
            }
            domain(domains) {
                super.domain(domains);
                this._min = this.__domains[0];
                this._max = this.__domains[1];
                return this;
            }
            refresh() {
                if (this.order === test.Order.Asc) {
                    this.__start = this.ranges[0];
                    this.__end = this.ranges[1];
                }
                else if (this.order === test.Order.Desc) {
                    this.__start = this.ranges[1];
                    this.__end = this.ranges[0];
                }
                else {
                    this.__start = this.ranges[0];
                    this.__end = this.ranges[1];
                }
                this._min = this.__domains[0];
                this._max = this.__domains[1];
                return this;
            }
            range(ranges) {
                this.ranges = ranges;
                return (this.refresh(), this);
            }
            getScaleValue(v) {
                let value;
                if (this._max == this._min) {
                    value = (this.__end - this.__start) / 2 + this.__start;
                }
                else {
                    value = (this.__end - this.__start) / (this._max - this._min) * (v - this._min) + this.__start;
                }
                return value;
            }
            equal(value) {
                if (value != null) {
                    return value.id == this.id && value.max == this.max && value.min == this.min;
                }
                return false;
            }
        }
        test.LinearScale = LinearScale;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        class OrdinalScale extends test.Scale {
            constructor(id) {
                super(id);
            }
            refresh() {
                if (this.order === test.Order.Asc) {
                    this.__domains.sort(function (a, b) {
                        return a - b;
                    });
                }
                else if (this.order === test.Order.Desc) {
                    this.__domains.sort(function (a, b) {
                        return b - a;
                    });
                }
                test.Debug.assert(this.ranges != null, "");
                test.Debug.assert(this.ranges.length == 2);
                if (this.ranges.length == 2) {
                    this.__start = this.ranges[0];
                    this.__end = this.ranges[1];
                }
                return this;
            }
            get max() {
                return this.ranges.length - 1;
            }
            get min() {
                return 0;
            }
            get domains() {
                return this.__domains;
            }
            range(ranges) {
                this.ranges = ranges;
                this.__bound = false;
                return (this.refresh(), this);
            }
            rangeBounds(ranges) {
                this.ranges = ranges;
                this.__bound = true;
                return (this.refresh(), this);
            }
            domain(domains) {
                this.__domains = domains;
                return this;
            }
            getScaleValue(v) {
                var index = this.__domains.indexOf(v);
                var value = 0;
                if (this.__bound) {
                    value = (index + 0.5) * (this.__end - this.__start) / (this.domains.length) + this.__start;
                }
                else {
                    value = index * (this.__end - this.__start) / (this.domains.length - 1) + this.__start;
                }
                return value;
            }
        }
        test.OrdinalScale = OrdinalScale;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        class LogScale extends test.Scale {
            constructor(logbase, id) {
                super(id);
                this._ticksize = 6;
                this._logBase = logbase;
            }
            domain(domains) {
                super.domain(domains);
                this._min = this.__domains[0];
                this._max = this.__domains[1];
                return this;
            }
            get logBase() {
                return this._logBase;
            }
            set tickSize(value) {
                this._ticksize = value;
            }
            get max() {
                return this._max;
            }
            get min() {
                return this._min;
            }
            refresh() {
                if (this.order === test.Order.Asc) {
                    this.__start = this.ranges[0];
                    this.__end = this.ranges[1];
                }
                else if (this.order === test.Order.Desc) {
                    this.__start = this.ranges[1];
                    this.__end = this.ranges[0];
                }
                else {
                    this.__start = this.ranges[0];
                    this.__end = this.ranges[1];
                }
                this._min = this.__domains[0];
                this._max = this.__domains[1];
                if (this._logBase > 0) {
                    var base = this._logBase;
                    var k = Math.log(base);
                    var imax = Math.ceil(Math.log(this._max) / k);
                    this._max = Math.pow(base, imax);
                    var imin = Math.floor(Math.log(this._min) / k);
                    this._min = Math.pow(base, imin);
                    if (this._min <= 0 || isNaN(this._min)) {
                        this._min = 1;
                    }
                    if (this._max < this._min) {
                        this._max = this._min + 1;
                    }
                }
                return this;
            }
            range(ranges) {
                this.ranges = ranges;
                return (this.refresh(), this);
            }
            get ticks() {
                var ticks = new Array(this._ticksize);
                for (var i = 0; i <= this._ticksize; ++i) {
                    ticks[i] = i * this._niceTick;
                }
                return ticks;
            }
            getScaleValue(v) {
                if (v < this._min) {
                    v = this._min;
                }
                var maxl = Math.log(this._max / this._min);
                var value = Math.log(v / this._min) / maxl * (this.__end - this.__start) + this.__start;
                return value;
            }
        }
        test.LogScale = LogScale;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
// /// <reference path="../base.d.ts" />
// namespace android.test {
//         export class ColorScale extends OrdinalScale {
//             private __colorranges:string[];
//             constructor(id?: any) {
//                 super(id);
//                 this.__colorranges =[];
//             }
//             get domains(): any[] {
//                 return this.__domains;
//             }
//             range(ranges: any[]) {
//                 if(ranges.length > 1){
//                     this.__colorranges =ColorUtils.gradientColor(ranges[0],ranges[ranges.length-1],this.__domains.length);
//                 }
//                 return super.range([0,this.__colorranges.length-1]);
//             }
//              rangeBounds(ranges: any[]) {
//                 if(ranges.length > 1){
//                     this.__colorranges =ColorUtils.gradientColor(ranges[0],ranges[ranges.length-1],this.__domains.length);
//                 }
//                 return super.range([0,this.__colorranges.length-1]);
//             }
//             getScaleValue(v: any):any {
//                 var index = this.__domains.indexOf(v);
//                 return this.__colorranges[index];
//             }
//         }
//     } 
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        let ElementType;
        (function (ElementType) {
            ElementType[ElementType["Shape"] = 0] = "Shape";
            ElementType[ElementType["Series"] = 1] = "Series";
            ElementType[ElementType["Axis"] = 2] = "Axis";
            ElementType[ElementType["SeriesLegend"] = 3] = "SeriesLegend";
            ElementType[ElementType["ScaleLegend"] = 4] = "ScaleLegend";
        })(ElementType = test.ElementType || (test.ElementType = {}));
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        class Animation {
            constructor() {
                this.duration = 0;
                this.isAniamtionEnd = true;
                this.ease = new test.AnimationEase();
                this.start = 0;
                this.isAniamtionEnd = true;
                this.duration = 0;
                this.type = test.AnimationType.Size;
            }
            scale(now, target) {
                console.log("ease " + ((now - this.start) / this.duration));
                return target * this.ease.ease((now - this.start) / this.duration);
            }
        }
        test.Animation = Animation;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        class AnimationEase {
            ease(t) {
                return t;
            }
        }
        test.AnimationEase = AnimationEase;
        class BounceAnimationEase extends AnimationEase {
            ease(t) {
                var b1 = 4 / 11, b2 = 6 / 11, b3 = 8 / 11, b4 = 3 / 4, b5 = 9 / 11, b6 = 10 / 11, b7 = 15 / 16, b8 = 21 / 22, b9 = 63 / 64, b0 = 1 / b1 / b1;
                return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
            }
        }
        test.BounceAnimationEase = BounceAnimationEase;
        class SinAnimationEase extends AnimationEase {
            ease(t) {
                var pi = Math.PI, halfPi = pi / 2;
                return Math.sin(t * halfPi);
            }
        }
        test.SinAnimationEase = SinAnimationEase;
        class QuadAnimationEase extends AnimationEase {
            ease(t) {
                return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
            }
        }
        test.QuadAnimationEase = QuadAnimationEase;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var View = android.view.View;
        var LinearLayout = android.widget.LinearLayout;
        var MeasureSpec = android.view.MeasureSpec;
        var Size = android.graphics.Size;
        var Rect = android.graphics.Rect;
        var Default = android.device.Default;
        var LayoutParams = android.view.LayoutParams;
        var Point = android.graphics.Point;
        var MotionEvent = android.view.event.MotionEvent;
        class SeriesLegend extends LinearLayout {
            constructor(shape) {
                super(null);
                this.__shape = shape;
            }
            set series(value) {
                this._series = value;
                this.__loadItems();
            }
            get series() {
                return this._series;
            }
            __loadItems() {
                this.removeAllViews();
                let colorArray = [];
                for (let i = 0; i < this.series.length; ++i) {
                    let item = new LegendItem();
                    item.series = this.series[i];
                    if (this.__shape == 'bar') {
                        item.icon = new BarIcon();
                    }
                    else if (this.__shape == 'scatter') {
                        item.icon = new CircleIcon();
                    }
                    if (item.series.enable) {
                        item.icon.color = test.ColorUtils.indexColor(i);
                    }
                    else {
                        item.icon.color = 'gray';
                    }
                    this.children.push(item);
                }
            }
        }
        test.SeriesLegend = SeriesLegend;
        const PADDING = 5;
        class LegendItem extends View {
            constructor() {
                super(null);
                this.font = Default.font;
                this.font.fontColor = 'black';
            }
            onMeasure(width, height, canvas) {
                let w = width.getMeasureValue();
                let h = height.getMeasureValue();
                let size = new Size(0, 0);
                size = canvas.measureString(this.series.name, this.font);
                this.__fontRect = new Rect(0, 0, size.width, size.height);
                let iconsize = size.height * 2;
                this.__iconRect = new Rect(0, 0, iconsize, size.height);
                size.width = size.width + PADDING * 3 + iconsize;
                this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                return size;
            }
            onLayout(l, t, r, b, canvas) {
                super.onLayout(l, t, r, b, canvas);
                this.__fontRect.translate(l, t);
                this.__iconRect.translate(l + PADDING + this.__fontRect.width, t);
            }
            onDraw(canvas) {
                canvas.drawText(this.series.name, this.__fontRect.startPoint, this.font);
                this.icon.draw(this.__iconRect, canvas);
            }
            onMouseEvent(event) {
                if (event.action == MotionEvent.ACTION_CLICK) {
                    console.log("event ");
                    window['EventHandler'](new Point(event.x, event.y), test.ElementType.SeriesLegend, { 'series': this.series.name, 'enable': this.series.enable });
                    return true;
                }
                return false;
            }
        }
        class Icon {
        }
        class BarIcon extends Icon {
            draw(rect, canvas) {
                canvas.drawRect(rect.startPoint, rect.endPoint, true, this.color);
            }
        }
        class CircleIcon extends Icon {
            draw(rect, canvas) {
                canvas.drawArc(rect, 0, 2 * 180, this.color);
            }
        }
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Rect = android.graphics.Rect;
        class Shape {
            constructor() {
                this.priority = Shape.PRIORITY;
                this.rect = new Rect(0, 0, 0, 0);
            }
            set style(value) {
                this._style = value;
            }
            get style() {
                return this._style;
            }
            draw(canvas) {
                this.onDraw(canvas, this.rect);
            }
        }
        Shape.PRIORITY = 10000;
        test.Shape = Shape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class Label extends test.Shape {
            constructor(text, cx, cy, w, h, angle) {
                super();
                this.text = text;
                this.labelrect = new test.RotateRect(cx, cy, w, h, (angle == null || isNaN(angle)) ? 0 : angle);
                this._xs = [];
                this._ys = [];
                for (let i = 0; i < 4 && i < this.labelrect.points.length; ++i) {
                    this._xs[i] = this.labelrect.points[i].x;
                    this._ys[i] = this.labelrect.points[i].y;
                }
            }
            onDraw(canvas, rect) {
                canvas.drawPolygon(this._xs, this._ys, this._style.background);
                canvas.drawText(this.text, this.labelrect.leftTop, this._style.font);
            }
            refresh() {
            }
        }
        test.Label = Label;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class PlotShape extends test.Shape {
            draw(canvas) {
                super.draw(canvas);
                if (this.label != null) {
                    this.label.onDraw(canvas, this.rect);
                }
            }
            refresh() {
                console.log(" *** you, this function is not been implemented yet!!! ");
            }
        }
        test.PlotShape = PlotShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class BarShape extends test.PlotShape {
            constructor(x, y, w, h, style, strokeStyle) {
                super();
                this.rect.left = x;
                this.rect.right = x + w;
                this.rect.top = y;
                this.rect.bottom = y + h;
                this._style = style;
                if (style == null) {
                    this._style = Default.style;
                }
                this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    this._strokeStyle = Default.strokestyle;
                }
                if (this.rect.height < 0) {
                    let top = this.rect.bottom;
                    let bottom = this.rect.top;
                    this.rect.top = top;
                    this.rect.bottom = bottom;
                }
            }
            onDraw(canvas, rect) {
                canvas.drawRect(this.rect.startPoint, this.rect.endPoint, true, this._style.background);
            }
        }
        test.BarShape = BarShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class RadialBarShape extends test.PlotShape {
            constructor(cx, cy, innerRadius, radius, startAngle, sweep, style, strokeStyle) {
                super();
                this.rect.left = cx - radius;
                this.rect.right = cx + radius;
                this.rect.top = cy - radius;
                this.rect.bottom = cy + radius;
                this._cx = cx;
                this._cy = cy;
                this._innerRadius = innerRadius;
                this._radius = radius;
                this._startAngle = startAngle;
                this._sweep = sweep;
                this._style = style;
                if (style == null) {
                    this._style = Default.style;
                }
                this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    this._strokeStyle = Default.strokestyle;
                }
                if (this._sweep < 0) {
                    this._startAngle = this._startAngle + this._sweep;
                    this._sweep = this._sweep * -1;
                }
            }
            onDraw(canvas, rect) {
                canvas.drawDonut(this._cx, this._cy, this._radius, this._innerRadius, this._startAngle, this._sweep, this._style.background);
            }
        }
        test.RadialBarShape = RadialBarShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class ScatterShape extends test.PlotShape {
            constructor(x, y, w, h, style, strokeStyle) {
                super();
                this.rect.left = x;
                this.rect.right = x + w;
                this.rect.top = y;
                this.rect.bottom = y + h;
                this._style = style;
                if (style == null) {
                    this._style = Default.style;
                }
                this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    this._strokeStyle = Default.strokestyle;
                }
                if (this.rect.height < 0) {
                    let top = this.rect.bottom;
                    let bottom = this.rect.top;
                    this.rect.top = top;
                    this.rect.bottom = bottom;
                }
                this.priority = test.Shape.PRIORITY + 2;
            }
            onDraw(canvas, rect) {
                canvas.drawArc(this.rect, 0, 2 * 180, this.style.background);
            }
        }
        test.ScatterShape = ScatterShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class LinesShape extends test.PlotShape {
            constructor(xs, ys, style, strokeStyle) {
                super();
                this.priority = test.Shape.PRIORITY + 1;
                this.__xs = xs;
                this.__ys = ys;
                this._style = style;
                if (style == null) {
                    this._style = Default.style;
                }
                this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    this._strokeStyle = Default.strokestyle;
                }
            }
            get strokeStyle() {
                return this._strokeStyle;
            }
            set strokeStyle(value) {
                this._strokeStyle = value;
            }
            onDraw(canvas, rect) {
                // canvas.drawRect(this.rect.startPoint,this.rect.endPoint,true,this._style.background);
                canvas.drawLines(this.__xs, this.__ys, this._strokeStyle);
            }
        }
        test.LinesShape = LinesShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class AreaShape extends test.PlotShape {
            constructor(xs, ys, style, strokeStyle) {
                super();
                this.priority = test.Shape.PRIORITY + 1;
                this.__xs = xs;
                this.__ys = ys;
                this._style = style;
                if (style == null) {
                    this._style = Default.style;
                }
                this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    this._strokeStyle = Default.strokestyle;
                }
            }
            get strokeStyle() {
                return this._strokeStyle;
            }
            set strokeStyle(value) {
                this._strokeStyle = value;
            }
            onDraw(canvas, rect) {
                // canvas.drawRect(this.rect.startPoint,this.rect.endPoint,true,this._style.background);
                canvas.drawPolygon(this.__xs, this.__ys, this.style.background);
            }
        }
        test.AreaShape = AreaShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        var Point = android.graphics.Point;
        class AxisLineShape extends test.Shape {
            constructor(x, y, ex, ey, strokeStyle) {
                super();
                this.startPoint = new Point(x, y);
                this.endPoint = new Point(ex, ey);
                this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    this._strokeStyle = Default.strokestyle;
                }
            }
            onDraw(canvas, rect) {
                canvas.drawLine(this.startPoint, this.endPoint, this._strokeStyle);
            }
            refresh() { }
        }
        test.AxisLineShape = AxisLineShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        /**
         * BaseLayout
         */
        class BaseLayout {
            constructor() {
                this.__shapelist = [];
            }
            convert(...args) {
                throw 'fuck Error';
            }
            get shapeList() {
                return this.__shapelist;
            }
        }
        test.BaseLayout = BaseLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class CartesianLayout extends test.BaseLayout {
            constructor() {
                super();
                this.barStyle = Default.style;
                this.lineStyle = Default.strokestyle;
                this._locationCache = [];
                this._stack = false;
                this._rect = null;
            }
            convert(serieslist, encoding, rect) {
                this.__shapelist.length = 0;
                this._serieslist = [];
                for (let ser of serieslist) {
                    this._serieslist.push(ser.clone());
                }
                this._encoding = encoding;
                this._locationCache = [];
                this.__scalePairs = [];
                this._stack = encoding._stack;
                this._rect = rect;
                this.__analyseScales();
                for (let i = 0; i < this._serieslist.length; ++i) {
                    this._layoutSeries(this._serieslist[i], i);
                }
                return this.__shapelist;
            }
            __analyseScales() {
                this._createLayoutScales(this._encoding);
                for (let ser of this._serieslist) {
                    for (let scalepair of ser.scalePairs) {
                        let filed = scalepair.filed;
                        let scale = scalepair.scale;
                        if (filed.name == 'x') {
                            if (scale instanceof test.OrdinalScale) {
                                if (filed.band === true) {
                                    scale.rangeBounds([this._rect.left, this._rect.right]);
                                }
                                else {
                                    scale.range([this._rect.left, this._rect.right]);
                                }
                            }
                            else {
                                scale.range([this._rect.left, this._rect.right]);
                            }
                        }
                        else if (filed.name == 'y') {
                            if (scale instanceof test.OrdinalScale) {
                                if (filed.band === true) {
                                    scale.rangeBounds([this._rect.bottom, this._rect.top]);
                                }
                                else {
                                    scale.range([this._rect.bottom, this._rect.top]);
                                }
                            }
                            else {
                                let ticker = test.LinearTicks.create(scale);
                                scale = ticker.niceScale();
                                scale.range([this._rect.bottom, this._rect.top]);
                            }
                        }
                    }
                }
            }
            _createLayoutScales(encoding) {
                if (this._serieslist.length > 1) {
                    for (let i = 0; i < this._serieslist.length; ++i) {
                        let series = this._serieslist[i];
                        for (let pair of series.scalePairs) {
                            let filed = pair.filed;
                            let hasadded = false;
                            for (let p of this.__scalePairs) {
                                if (!p.filed.equals(filed) || !p.scale.equal(pair.scale)) {
                                    continue;
                                }
                                else {
                                    hasadded = true;
                                    p.series.push(series.name);
                                    break;
                                }
                            }
                            if (!hasadded) {
                                this.__scalePairs.push({ series: [series.name], filed: filed, scale: pair.scale });
                            }
                        }
                    }
                }
                else if (this._serieslist.length == 1) {
                    // this.__scalePairs = this._serieslist[0].scalePairs;
                    let series = this._serieslist[0];
                    // this.__scalePairs.push({series:[series.name], filed: series.filed, scale: pair.scale });
                    for (let pair of series.scalePairs) {
                        this.__scalePairs.push({ series: [series.name], filed: pair.filed, scale: pair.scale });
                    }
                }
            }
            get maxSeriesSize() {
                let xscale = this._getScale('x');
                if (xscale instanceof test.OrdinalScale) {
                    return xscale.domains.length;
                }
                else {
                    return test.Utility.max(this._serieslist.map((ser, index, array) => { return ser.size; }));
                }
            }
            get scalePairs() {
                return this.__scalePairs;
            }
            _getScale(name) {
                let index = _.findIndex(this.__scalePairs, function (item) {
                    return item.filed.name == name;
                });
                return this.__scalePairs[index].scale;
            }
        }
        test.CartesianLayout = CartesianLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Style = android.graphics.Style;
        var Default = android.device.Default;
        class BarLayout extends test.CartesianLayout {
            get barWidth() {
                return this._rect.width / this.maxSeriesSize / (this._stack ? 1 : this._serieslist.length) * 0.9;
            }
            _layoutSeries(series, index) {
                let size = this._serieslist.length;
                let xScale = series.getScale('x');
                let yScale = series.getScale('y');
                let colorScale = series.getScale('color');
                let colorArray = [];
                if (colorScale instanceof test.OrdinalScale) {
                    colorScale = colorScale.clone();
                    colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                    colorScale.range([0, colorScale.domains.length - 1]);
                }
                let defaultcolor = test.ColorUtils.indexColor(series.index);
                for (let pt of series.points) {
                    if (pt != null) {
                        let xvalue = pt.x;
                        let yvalue = pt.y;
                        let colorvalue = pt.color;
                        let shape = pt.shape;
                        let size = pt.size;
                        let x = xScale.getScaleValue(xvalue.value) + (this._stack ? 0 : ((index - (this._serieslist.length - 1) / 2) * this.barWidth));
                        let y0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? 0 : yScale.min);
                        let y1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                        let ytop = yScale.getScaleValue(y1);
                        let color = defaultcolor;
                        if (colorScale instanceof test.OrdinalScale) {
                            let colorindex = colorScale.getScaleValue(colorvalue.value);
                            color = colorArray[colorindex];
                        }
                        else if (colorScale instanceof test.LinearScale) {
                            color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorvalue.value, colorScale.min, colorScale.max);
                        }
                        let ybottom = yScale.getScaleValue(y0);
                        if (y0 == 0) {
                            console.log(yScale);
                            console.log("y0 " + y0 + " yBottom " + ybottom);
                        }
                        let xleft = x - this.barWidth / 2;
                        let xright = x + this.barWidth / 2;
                        let barShape = new test.BarShape(xleft, ytop, xright - xleft, ybottom - ytop);
                        barShape.style = new Style("gray", Default.font, Default.strokestyle);
                        if (color != null) {
                            barShape.style.background = color;
                        }
                        else {
                            barShape.style.background = defaultcolor;
                        }
                        this.__shapelist.push(barShape);
                    }
                }
            }
        }
        test.BarLayout = BarLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class ScatterLayout extends test.CartesianLayout {
            get barWidth() {
                return this._rect.width / this.maxSeriesSize / (this._stack ? 1 : this._serieslist.length) * 0.9;
            }
            _layoutSeries(series, index) {
                let size = this._serieslist.length;
                let xScale = series.getScale('x');
                let yScale = series.getScale('y');
                let colorScale = series.getScale('color');
                let sizeScale = series.getScale('size');
                let defaultcolor = test.ColorUtils.indexColor(series.index);
                let colorArray = [];
                if (colorScale instanceof test.OrdinalScale) {
                    colorScale = colorScale.clone();
                    colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                    colorScale.range([0, colorScale.domains.length - 1]);
                }
                let defaultsize = 10;
                for (let pt of series.points) {
                    if (pt != null) {
                        let xvalue = pt.x;
                        let yvalue = pt.y;
                        let colorValue = pt.color;
                        let shapeValue = pt.shape;
                        let sizeValue = pt.size;
                        let x = xScale.getScaleValue(xvalue.value);
                        let y = yScale.getScaleValue(yvalue.isMultiple ? yvalue.value[1] : yvalue.value);
                        let s = sizeScale.getScaleValue(sizeValue.value);
                        if (isNaN(s) || s == null || s <= 0) {
                            s = defaultsize;
                        }
                        let color = defaultcolor;
                        if (colorScale instanceof test.OrdinalScale) {
                            let colorindex = colorScale.getScaleValue(colorValue.value);
                            color = colorArray[colorindex];
                        }
                        else if (colorScale instanceof test.LinearScale) {
                            color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorValue.value, colorScale.min, colorScale.max);
                        }
                        let scatterShape = new test.ScatterShape(x - s / 2, y - s / 2, s, s, Default.style);
                        if (color != null) {
                            scatterShape.style.background = color;
                        }
                        else {
                            scatterShape.style.background = defaultcolor;
                        }
                        this.__shapelist.push(scatterShape);
                    }
                }
            }
            _layoutLine() {
            }
        }
        test.ScatterLayout = ScatterLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class RadialCartesianLayout extends test.BaseLayout {
            constructor() {
                super();
                this.barStyle = Default.style;
                this.lineStyle = Default.strokestyle;
                this._locationCache = [];
                this._stack = false;
            }
            convert(serieslist, encoding, cx, cy, innerRadius, radius, startAngle, endAngle) {
                this.__shapelist.length = 0;
                this._serieslist = [];
                for (let ser of serieslist) {
                    this._serieslist.push(ser.clone());
                }
                this._encoding = encoding;
                this._locationCache = [];
                this.__scalePairs = [];
                this._stack = encoding._stack;
                this._cx = cx;
                this._cy = cy;
                this._innerRadius = innerRadius;
                this._radius = radius;
                this._startAngle = startAngle;
                this._endAngle = endAngle;
                this.__analyseScales();
                for (let i = 0; i < this._serieslist.length; ++i) {
                    this._layoutSeries(this._serieslist[i], i);
                }
                return this.__shapelist;
            }
            __analyseScales() {
                this._createLayoutScales(this._encoding);
                for (let ser of this._serieslist) {
                    for (let scalepair of ser.scalePairs) {
                        let filed = scalepair.filed;
                        let scale = scalepair.scale;
                        if (filed.name == 'x') {
                            if (scale instanceof test.OrdinalScale) {
                                if (filed.band === true) {
                                    scale.rangeBounds([this._innerRadius, this._radius]);
                                }
                                else {
                                    scale.range([this._innerRadius, this._radius]);
                                }
                            }
                            else {
                                scale.range([this._innerRadius, this._radius]);
                            }
                        }
                        else if (filed.name == 'y') {
                            if (scale instanceof test.OrdinalScale) {
                                if (filed.band === true) {
                                    scale.rangeBounds([this._startAngle, this._endAngle]);
                                }
                                else {
                                    scale.range([this._startAngle, this._endAngle]);
                                }
                            }
                            else {
                                let ticker = test.LinearTicks.create(scale);
                                scale = ticker.niceScale();
                                scale.range([this._startAngle, this._endAngle]);
                            }
                        }
                    }
                }
            }
            _createLayoutScales(encoding) {
                if (this._serieslist.length > 1) {
                    for (let i = 0; i < this._serieslist.length; ++i) {
                        let series = this._serieslist[i];
                        for (let pair of series.scalePairs) {
                            let filed = pair.filed;
                            let hasadded = false;
                            for (let p of this.__scalePairs) {
                                if (!p.filed.equals(filed) || !p.scale.equal(pair.scale)) {
                                    continue;
                                }
                                else {
                                    hasadded = true;
                                    p.series.push(series.name);
                                    break;
                                }
                            }
                            if (!hasadded) {
                                this.__scalePairs.push({ series: [series.name], filed: filed, scale: pair.scale });
                            }
                        }
                    }
                }
                else if (this._serieslist.length == 1) {
                    // this.__scalePairs = this._serieslist[0].scalePairs;
                    let series = this._serieslist[0];
                    // this.__scalePairs.push({series:[series.name], filed: series.filed, scale: pair.scale });
                    for (let pair of series.scalePairs) {
                        this.__scalePairs.push({ series: [series.name], filed: pair.filed, scale: pair.scale });
                    }
                }
            }
            get maxSeriesSize() {
                let xscale = this._getScale('x');
                if (xscale instanceof test.OrdinalScale) {
                    return xscale.domains.length;
                }
                else {
                    return test.Utility.max(this._serieslist.map((ser, index, array) => { return ser.size; }));
                }
            }
            // protected _preAnalyseSeries() {
            //     for (let ser of this._serieslist) {
            //         for (let pt of ser.points) {
            //             let xvalue = pt.x;
            //             let index = _.findIndex(this._locationCache, 'key', xvalue.value);
            //             if (index > 0) {
            //                 if (this._locationCache[index] != null) {
            //                     this._locationCache[index].points.push(pt);
            //                 } else {
            //                     this._locationCache.push({ key: xvalue.value, points: [pt] });
            //                 }
            //             }
            //         }
            //     }
            // }
            get scalePairs() {
                return this.__scalePairs;
            }
            _getScale(name) {
                let index = _.findIndex(this.__scalePairs, function (item) {
                    return item.filed.name == name;
                });
                return this.__scalePairs[index].scale;
            }
        }
        test.RadialCartesianLayout = RadialCartesianLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Style = android.graphics.Style;
        var Default = android.device.Default;
        class RadialBarLayout extends test.RadialCartesianLayout {
            get barWidth() {
                return (this._radius - this._innerRadius) / this.maxSeriesSize / (this._stack ? 1 : this._serieslist.length) * 0.9;
            }
            _layoutSeries(series, index) {
                let size = this._serieslist.length;
                let xScale = series.getScale('x');
                let yScale = series.getScale('y');
                let colorScale = series.getScale('color');
                let colorArray = [];
                if (colorScale instanceof test.OrdinalScale) {
                    colorScale = colorScale.clone();
                    colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                    colorScale.range([0, colorScale.domains.length - 1]);
                }
                let defaultcolor = test.ColorUtils.indexColor(series.index);
                for (let pt of series.points) {
                    if (pt != null) {
                        let xvalue = pt.x;
                        let yvalue = pt.y;
                        let colorvalue = pt.color;
                        let shape = pt.shape;
                        let size = pt.size;
                        let x = xScale.getScaleValue(xvalue.value) + (this._stack ? 0 : ((index - (this._serieslist.length - 1) / 2) * this.barWidth));
                        let y0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? 0 : yScale.min);
                        let y1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                        let yEndAngle = yScale.getScaleValue(y1);
                        let color = defaultcolor;
                        if (colorScale instanceof test.OrdinalScale) {
                            let colorindex = colorScale.getScaleValue(colorvalue.value);
                            color = colorArray[colorindex];
                        }
                        else if (colorScale instanceof test.LinearScale) {
                            color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorvalue.value, colorScale.min, colorScale.max);
                        }
                        let yStartAngle = yScale.getScaleValue(y0);
                        let xInnerRadius = x - this.barWidth / 2;
                        let xOutterRadius = x + this.barWidth / 2;
                        // let barShape:BarShape = new BarShape(xleft,yEndAngle,xright-xleft,ybottom-yEndAngle);
                        let barShape = new test.RadialBarShape(this._cx, this._cy, xInnerRadius, xOutterRadius, yStartAngle, yEndAngle - yStartAngle);
                        barShape.style = new Style("gray", Default.font, Default.strokestyle);
                        if (color != null) {
                            barShape.style.background = color;
                        }
                        else {
                            barShape.style.background = defaultcolor;
                        }
                        this.__shapelist.push(barShape);
                    }
                }
            }
        }
        test.RadialBarLayout = RadialBarLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class RadialLineLayout extends test.RadialCartesianLayout {
            _layoutSeries(series, index) {
                let size = this._serieslist.length;
                let xScale = series.getScale('x');
                let yScale = series.getScale('y');
                let colorScale = series.getScale('color');
                let xs = [];
                let ys = [];
                for (let pt of series.points) {
                    if (pt != null) {
                        console.log(pt);
                        let xvalue = pt.x;
                        let yvalue = pt.y;
                        let colorvalue = pt.color;
                        let shape = pt.shape;
                        let size = pt.size;
                        let radius = xScale.getScaleValue(xvalue.value);
                        let angle = yScale.getScaleValue(yvalue.isMultiple ? yvalue.value[1] : yvalue.value);
                        let x = this._cx + Math.cos(angle) * radius;
                        let y = this._cy + Math.sin(angle) * radius;
                        xs.push(x);
                        ys.push(y);
                    }
                }
                let linesShape = new test.LinesShape(xs, ys, null, Default.strokestyle);
                linesShape.strokeStyle.strokeColor = test.ColorUtils.indexColor(series.index);
                this.__shapelist.push(linesShape);
            }
            _layoutLine() {
            }
        }
        test.RadialLineLayout = RadialLineLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class RadialAreaLayout extends test.RadialCartesianLayout {
            _layoutSeries(series, index) {
                let size = this._serieslist.length;
                let xScale = series.getScale('x');
                let yScale = series.getScale('y');
                let colorScale = series.getScale('color');
                let xs = [];
                let ys = [];
                for (let pt of series.points) {
                    if (pt != null) {
                        console.log(pt);
                        let xvalue = pt.x;
                        let yvalue = pt.y;
                        let colorvalue = pt.color;
                        let shape = pt.shape;
                        let size = pt.size;
                        let radius = xScale.getScaleValue(xvalue.value);
                        let angleValue0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? 0 : yScale.min);
                        let angleValue1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                        let angle0 = yScale.getScaleValue(angleValue0);
                        let angle1 = yScale.getScaleValue(angleValue1);
                        let color = colorScale.getScaleValue(colorvalue.value);
                        let x0 = this._cx + Math.cos(angle0) * radius;
                        let y0 = this._cy + Math.sin(angle0) * radius;
                        let x = this._cx + Math.cos(angle1) * radius;
                        let y = this._cy + Math.sin(angle1) * radius;
                        xs.push(x);
                        ys.push(y);
                        xs.unshift(x0);
                        ys.unshift(y0);
                    }
                }
                let linesShape = new test.AreaShape(xs, ys, null, Default.strokestyle);
                linesShape.style.background = test.ColorUtils.indexColor(series.index);
                this.__shapelist.push(linesShape);
            }
            _layoutLine() {
            }
        }
        test.RadialAreaLayout = RadialAreaLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class RadialScatterLayout extends test.RadialCartesianLayout {
            get barWidth() {
                return (this._radius - this._innerRadius) / this.maxSeriesSize / (this._stack ? 1 : this._serieslist.length) * 0.9;
            }
            _layoutSeries(series, index) {
                let size = this._serieslist.length;
                let xScale = series.getScale('x');
                let yScale = series.getScale('y');
                let colorScale = series.getScale('color');
                let sizeScale = series.getScale('size');
                let defaultcolor = test.ColorUtils.indexColor(series.index);
                let colorArray = [];
                if (colorScale instanceof test.OrdinalScale) {
                    colorScale = colorScale.clone();
                    colorArray = test.ColorUtils.gradientColor(colorScale.startPosition, colorScale.endPosition, colorScale.domains.length);
                    colorScale.range([0, colorScale.domains.length - 1]);
                }
                let defaultsize = 10;
                for (let pt of series.points) {
                    if (pt != null) {
                        let xvalue = pt.x;
                        let yvalue = pt.y;
                        let colorValue = pt.color;
                        let shapeValue = pt.shape;
                        let sizeValue = pt.size;
                        let radius = xScale.getScaleValue(xvalue.value);
                        let angle = yScale.getScaleValue(yvalue.isMultiple ? yvalue.value[1] : yvalue.value);
                        let s = sizeScale.getScaleValue(sizeValue.value);
                        if (isNaN(s) || s == null || s <= 0) {
                            s = defaultsize;
                        }
                        console.log("radius " + radius + " angle " + angle);
                        let color = defaultcolor;
                        if (colorScale instanceof test.OrdinalScale) {
                            let colorindex = colorScale.getScaleValue(colorValue.value);
                            color = colorArray[colorindex];
                        }
                        else if (colorScale instanceof test.LinearScale) {
                            color = test.ColorUtils.getColor(colorScale.startPosition, colorScale.endPosition, colorValue.value, colorScale.min, colorScale.max);
                        }
                        let x = this._cx + Math.cos(angle) * radius;
                        let y = this._cy + Math.sin(angle) * radius;
                        let scatterShape = new test.ScatterShape(x - s / 2, y - s / 2, s, s, Default.style);
                        if (color != null) {
                            scatterShape.style.background = color;
                        }
                        else {
                            scatterShape.style.background = defaultcolor;
                        }
                        this.__shapelist.push(scatterShape);
                    }
                }
            }
            _layoutLine() {
            }
        }
        test.RadialScatterLayout = RadialScatterLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class LineLayout extends test.CartesianLayout {
            _layoutSeries(series, index) {
                let size = this._serieslist.length;
                let xScale = series.getScale('x');
                let yScale = series.getScale('y');
                // let colorScale:Scale = series.getScale('color');
                let xs = [];
                let ys = [];
                let defaultcolor = test.ColorUtils.indexColor(series.index);
                for (let pt of series.points) {
                    if (pt != null) {
                        console.log(pt);
                        let xvalue = pt.x;
                        let yvalue = pt.y;
                        let colorvalue = pt.color;
                        let shape = pt.shape;
                        let size = pt.size;
                        let x = xScale.getScaleValue(xvalue.value);
                        let y = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                        y = yScale.getScaleValue(y);
                        // let color = colorScale.getScaleValue(colorvalue.value);
                        xs.push(x);
                        ys.push(y);
                    }
                }
                let linesShape = new test.LinesShape(xs, ys, null, Default.strokestyle);
                linesShape.strokeStyle.strokeColor = test.ColorUtils.indexColor(series.index);
                this.__shapelist.push(linesShape);
            }
            _layoutLine() {
            }
        }
        test.LineLayout = LineLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class AreaLayout extends test.CartesianLayout {
            _layoutSeries(series, index) {
                let size = this._serieslist.length;
                let xScale = series.getScale('x');
                let yScale = series.getScale('y');
                let colorScale = series.getScale('color');
                let xs = [];
                let ys = [];
                for (let pt of series.points) {
                    if (pt != null) {
                        console.log(pt);
                        let xvalue = pt.x;
                        let yvalue = pt.y;
                        let colorvalue = pt.color;
                        let shape = pt.shape;
                        let size = pt.size;
                        let x = xScale.getScaleValue(xvalue.value);
                        let y0 = yvalue.isMultiple ? yvalue.value[0] : (yScale.min < 0 ? 0 : yScale.min);
                        let y1 = yvalue.isMultiple ? yvalue.value[1] : yvalue.value;
                        y0 = yScale.getScaleValue(y0);
                        y1 = yScale.getScaleValue(y1);
                        let color = colorScale.getScaleValue(colorvalue.value);
                        xs.push(x);
                        ys.push(y0);
                        xs.unshift(x);
                        ys.unshift(y1);
                    }
                }
                let linesShape = new test.AreaShape(xs, ys, null, Default.strokestyle);
                linesShape.style.background = test.ColorUtils.indexColor(series.index);
                this.__shapelist.push(linesShape);
            }
            _layoutLine() {
            }
        }
        test.AreaLayout = AreaLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        const e10 = Math.sqrt(50);
        const e5 = Math.sqrt(10);
        const e2 = Math.sqrt(2);
        class Ticks {
            constructor(scale) {
                this._scale = scale;
                this._ticks = [];
            }
            static create(scale, start, end) {
                return null;
            }
            _createTicks(start, stop, count) {
                var reverse = stop < start, i = -1, n, ticks, step;
                if (reverse)
                    n = start, start = stop, stop = n;
                if ((step = this._tickIncrement(start, stop, count)) === 0 || !isFinite(step))
                    return [];
                if (step > 0) {
                    start = Math.ceil(start / step);
                    stop = Math.floor(stop / step);
                    ticks = new Array(n = Math.ceil(stop - start + 1));
                    while (++i < n)
                        ticks[i] = (start + i) * step;
                }
                else {
                    start = Math.floor(start * step);
                    stop = Math.ceil(stop * step);
                    ticks = new Array(n = Math.ceil(start - stop + 1));
                    while (++i < n)
                        ticks[i] = (start - i) / step;
                }
                if (reverse)
                    ticks.reverse();
                return ticks;
            }
            _tickIncrement(start, stop, count) {
                let step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
                return power >= 0
                    ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
                    : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
            }
            _tickStep(start, stop, count) {
                let step0 = Math.abs(stop - start) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
                if (error >= e10)
                    step1 *= 10;
                else if (error >= e5)
                    step1 *= 5;
                else if (error >= e2)
                    step1 *= 2;
                return stop < start ? -step1 : step1;
            }
        }
        test.Ticks = Ticks;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class LinearTicks extends test.Ticks {
            static create(scale) {
                test.Debug.assert(scale instanceof test.LinearScale, " scale must be LinearScale");
                return new LinearTicks(scale);
            }
            createTicks(count) {
                // let step:number, start:number,stop:number;
                // step = this._tickIncrement(this._start, this._end, count);
                // if (step > 0) {
                //     start = Math.floor(this._start/step) * step;
                //     stop = Math.floor(this._end/step) * step;
                //     step = this._tickIncrement(start,stop,count);
                // }else if(step < 0){
                //     start = Math.ceil(start * step) / step;
                //     stop = Math.floor(stop * step) / step;
                //     step = this._tickIncrement(start, stop, count);
                // }
                if (count == null || isNaN(count)) {
                    count = 10;
                }
                this._ticks = this._createTicks(this._scale.max, this._scale.min, count);
                return this._ticks;
            }
            niceScale() {
                let scale = this._scale;
                let step = this._tickStep(scale.min, scale.max, 10);
                let niceMin = scale.min === 0 ? 0 : (Math.floor(scale.min / step)) * step;
                let niceMax = (Math.floor(scale.max / step) + 1) * step;
                scale.domain([niceMin, niceMax]).refresh();
                return scale;
            }
        }
        test.LinearTicks = LinearTicks;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class LogTicks extends test.Ticks {
            static create(scale) {
                test.Debug.assert(scale instanceof test.LogScale, " scale must be LinearScale");
                return new LogTicks(scale);
            }
            createTicks(count) {
                if (count == null || isNaN(count)) {
                    count = 10;
                }
                this._ticks = this._createTicks(this._scale.max, this._scale.min, count);
                return this._ticks;
            }
        }
        test.LogTicks = LogTicks;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        class OrdinalTicks extends test.Ticks {
            static create(scale) {
                test.Debug.assert(scale instanceof test.OrdinalScale, " scale must be OrdinalScale");
                return new OrdinalTicks(scale);
            }
            createTicks(count) {
                if (count == null || isNaN(count)) {
                    count = 10;
                }
                // this._ticks = this._createTicks(this._scale.max,this._scale.min,count);
                this._ticks = this._scale.domains;
                return this._ticks;
            }
        }
        test.OrdinalTicks = OrdinalTicks;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var Default = android.device.Default;
        class AxisShape extends test.Shape {
            constructor() {
                super();
                this._major = Default.strokestyle.clone();
                this._minor = Default.strokestyle.clone();
                this._lableFont = Default.font.clone();
            }
            onDraw(canvas, rect) {
                canvas.save();
                // canvas.clip(rect);
                let xs = [];
                let ys = [];
                let pts = this._lableRect.points;
                for (var j = 0; j < 4; ++j) {
                    xs.push(pts[j].x);
                    ys.push(pts[j].y);
                }
                // canvas.drawPolygon(xs,ys,"blue");
                // this._lableFont.fontColor ='red';
                canvas.drawLine(this._majorTick.startPoint, this._majorTick.endPoint, this._major);
                canvas.drawText(this._label, this._lableRect.leftTop, this._lableFont, this._lableRect.leftTop, this._lableRect.angle * 180 / Math.PI);
                canvas.drawLine(this._minorTick.startPoint, this._minorTick.endPoint, this._minor);
                canvas.restore();
            }
            refresh() {
            }
        }
        test.AxisShape = AxisShape;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
const LABEL_PADDING = 4;
const MAJOR_TICK_HEIGHT = 6;
const MINOR_TICK_HEIGHT = 4;
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var View = android.view.View;
        var Default = android.device.Default;
        class BaseAxis extends View {
            constructor(context) {
                super(context);
                this._majorTickHeight = MAJOR_TICK_HEIGHT;
                this._minorTickHeight = MINOR_TICK_HEIGHT;
                this._ticks = [];
                this._titleFont = Default.font;
                this._labelFont = Default.font;
                this._majorStyle = Default.strokestyle;
                this._minorStyle = Default.strokestyle;
                this._near = true;
                this._labelFont.fontColor = "#262626";
                this._series = [];
            }
            set title(value) {
                this._title = value;
            }
            get title() {
                return this._title;
            }
            set majorStyle(value) {
                this._majorStyle = value;
            }
            get majorStyle() {
                return this._majorStyle;
            }
            set minorStyle(value) {
                this._minorStyle = value;
            }
            get minorStyle() {
                return this._minorStyle;
            }
            set lineStyle(value) {
                this._lineStyle = value;
            }
            get lineStyle() {
                return this._lineStyle;
            }
            set titleFont(value) {
                this._titleFont = value.clone();
            }
            get titleFont() {
                return this._titleFont;
            }
            set labelFont(value) {
                this._labelFont = value.clone();
            }
            get labelFont() {
                return this._labelFont;
            }
            set max(value) {
                this._max = value;
            }
            set min(value) {
                this._min = value;
            }
            get max() {
                return this._max;
            }
            get min() {
                return this._min;
            }
            get series() {
                return this._series;
            }
            set series(s) {
                this._series = s;
            }
            set scale(value) {
                if (value != null && !value.equal(this._scale)) {
                    this._scale = value;
                    console.log("set scale " + value);
                    this._ticks = this._createTicks();
                }
                else if (value == null) {
                    this._scale = null;
                    this._ticks = [];
                }
            }
            get scale() {
                return this._scale;
            }
            set reversed(value) {
                this._reversed = value;
            }
            get reversed() {
                return this._reversed;
            }
            set type(value) {
                this._axisType = value;
            }
            get type() {
                return this._axisType;
            }
            set near(value) {
                this._near = value;
            }
            get near() {
                return this._near;
            }
            onMeasure(width, height, canvas) {
                return super.onMeasure(width, height, canvas);
            }
            onLayout(l, t, r, b, canvas) {
                super.onLayout(l, t, r, b, canvas);
            }
            onDraw(canvas) {
                super.onDraw(canvas);
            }
            _format(val) {
                return val + "";
            }
        }
        test.BaseAxis = BaseAxis;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var MeasureSpec = android.view.MeasureSpec;
        var Size = android.graphics.Size;
        var Gravity = android.graphics.Gravity;
        var LayoutParams = android.view.LayoutParams;
        var Point = android.graphics.Point;
        class LineAxis extends test.BaseAxis {
            constructor(context) {
                super(context);
            }
            set near(value) {
                this._near = value;
                if (value) {
                    if (this.type == test.AxisType.X) {
                        this.gravity = Gravity.Bottom;
                    }
                    else if (this.type == test.AxisType.Y) {
                        this.gravity = Gravity.Left;
                    }
                }
                else {
                    if (this.type == test.AxisType.X) {
                        this.gravity = Gravity.Top;
                    }
                    else if (this.type == test.AxisType.Y) {
                        this.gravity = Gravity.Right;
                    }
                }
            }
            get near() {
                return this._near;
            }
            _createTicks() {
                let ticks = [];
                if (this.scale instanceof test.LinearScale) {
                    ticks = test.LinearTicks.create(this.scale).createTicks(10);
                }
                else if (this.scale instanceof test.LogScale) {
                    ticks = test.LogTicks.create(this.scale).createTicks(10);
                }
                else if (this.scale instanceof test.OrdinalScale) {
                    ticks = test.OrdinalTicks.create(this.scale).createTicks();
                }
                // else if(this.scale instanceof Timescale)
                return ticks;
            }
            _layoutXAxis(canvas) {
                let ticks = this._ticks;
                this._children = [];
                for (let i = 0; ticks && i < ticks.length; ++i) {
                    let value = ticks[i];
                    let nextValue = i >= ticks.length ? null : ticks[i + 1];
                    let tickheight = Math.max(this._majorTickHeight, this._minorTickHeight);
                    let label = this._format(value);
                    let labelSize = canvas.measureString(label, this.labelFont);
                    let x = this.scale.getScaleValue(value);
                    let y = this.layoutInfo.innerrect.top;
                    let nx = NaN;
                    let ny = NaN;
                    if (nextValue != null) {
                        nx = this.scale.getScaleValue(nextValue);
                        ny = y;
                    }
                    let labelX = x;
                    let labelY = y + tickheight + LABEL_PADDING + labelSize.height / 2;
                    let shape = new test.AxisShape();
                    shape._lableRect = new test.RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                    shape._majorTick = new test.RotateLine(x, y, this._majorTickHeight, 0, 0);
                    shape._label = label;
                    shape._lableFont = this._labelFont;
                    shape._major = this.majorStyle;
                    shape._minor = this.minorStyle;
                    let minorx = NaN;
                    if (!isNaN(nx)) {
                        minorx = (x + nx) / 2;
                    }
                    shape._minorTick = new test.RotateLine(minorx, y, this._minorTickHeight, 0, 0);
                    this._children.push(shape);
                }
            }
            _layoutYAxis(canvas) {
                let ticks = this._ticks;
                this._children = [];
                for (let i = 0; ticks && i < ticks.length; ++i) {
                    let value = ticks[i];
                    let nextValue = i >= ticks.length ? null : ticks[i + 1];
                    let tickheight = Math.max(this._majorTickHeight, this._minorTickHeight);
                    let label = this._format(value);
                    let labelSize = canvas.measureString(label, this.labelFont);
                    let y = this.scale.getScaleValue(value);
                    let x = this.layoutInfo.innerrect.right;
                    if (!this.near) {
                        x = this.layoutInfo.innerrect.left;
                    }
                    let nx = NaN;
                    let ny = NaN;
                    if (nextValue != null) {
                        ny = this.scale.getScaleValue(nextValue);
                        nx = x;
                    }
                    let labelX = x - labelSize.width / 2 - LABEL_PADDING - tickheight;
                    let labelY = y;
                    if (!this.near) {
                        labelX = x + labelSize.width / 2 + LABEL_PADDING + tickheight;
                    }
                    let shape = new test.AxisShape();
                    shape._lableRect = new test.RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                    shape._majorTick = new test.RotateLine(x, y, this._majorTickHeight, 0, this.near ? Math.PI / 2 : -Math.PI / 2);
                    shape._label = label;
                    shape._lableFont = this.labelFont;
                    shape._major = this.majorStyle;
                    shape._minor = this.minorStyle;
                    let minory = NaN;
                    if (!isNaN(ny)) {
                        minory = (y + ny) / 2;
                    }
                    shape._minorTick = new test.RotateLine(x, minory, this._minorTickHeight, 0, this.near ? Math.PI / 2 : -Math.PI / 2);
                    this._children.push(shape);
                }
            }
            onMeasure(width, height, canvas) {
                let size = null;
                if (this._axisType == test.AxisType.X) {
                    size = new Size(width.value, this._measureX(canvas));
                    this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                    return size;
                }
                else if (this._axisType == test.AxisType.Y) {
                    size = new Size(this._measureY(canvas), height.value);
                    this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                    return size;
                }
                else {
                    return super.onMeasure(width, height, canvas);
                }
            }
            _measureX(canvas) {
                let titleSize = canvas.measureString(this.title, this.titleFont);
                let tickHeght = Math.max(this._majorTickHeight, this._minorTickHeight);
                let labelSize = new Size(0, 0);
                let ticks = this._ticks;
                for (let t of ticks) {
                    let sz = canvas.measureString(this._format(t), this.labelFont);
                    labelSize.width = Math.max(sz.width, labelSize.width);
                    labelSize.height = Math.max(sz.height, labelSize.height);
                }
                return labelSize.height + titleSize.height + tickHeght;
            }
            _measureY(canvas) {
                let titleSize = canvas.measureString(this.title, this.titleFont);
                let tickHeght = Math.max(this._majorTickHeight, this._minorTickHeight);
                let labelSize = new Size(0, 0);
                let ticks = this._ticks;
                for (let t of ticks) {
                    let sz = canvas.measureString(this._format(t), this.labelFont);
                    labelSize.width = Math.max(sz.width, labelSize.width);
                    labelSize.height = Math.max(sz.height, labelSize.height);
                }
                return labelSize.width + titleSize.height + tickHeght;
            }
            onLayout(l, t, r, b, canvas) {
                super.onLayout(l, t, r, b, canvas);
                if (this.scale != null) {
                    if (this._axisType === test.AxisType.X) {
                        this._layoutXAxis(canvas);
                    }
                    else if (this._axisType == test.AxisType.Y) {
                        this._layoutYAxis(canvas);
                    }
                }
            }
            onDraw(canvas) {
                super.onDraw(canvas);
                this._drawLine(canvas);
                if (this._children != null) {
                    for (let shape of this._children) {
                        shape.draw(canvas);
                    }
                }
            }
            _drawLine(canvas) {
                let rect = this.layoutInfo.innerrect;
                if (this._axisType == test.AxisType.X) {
                    if (this._near) {
                        canvas.drawLine(new Point(rect.left, rect.top), new Point(rect.right, rect.top), this.lineStyle);
                    }
                    else {
                        canvas.drawLine(new Point(rect.left, rect.bottom), new Point(rect.right, rect.bottom), this.lineStyle);
                    }
                }
                else if (this._axisType == test.AxisType.Y) {
                    if (this._near) {
                        canvas.drawLine(new Point(rect.right, rect.top), new Point(rect.right, rect.bottom), this.lineStyle);
                    }
                    else {
                        canvas.drawLine(new Point(rect.left, rect.top), new Point(rect.left, rect.bottom), this.lineStyle);
                    }
                }
            }
        }
        test.LineAxis = LineAxis;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var MeasureSpec = android.view.MeasureSpec;
        var Size = android.graphics.Size;
        var Gravity = android.graphics.Gravity;
        var LayoutParams = android.view.LayoutParams;
        var Point = android.graphics.Point;
        var Default = android.device.Default;
        class RadialLineAxis extends test.BaseAxis {
            constructor(context) {
                super(context);
                this.__innerRadius = 0;
                this.__startAngle = 0;
                this.__sweep = 0;
                this.__radius = 0;
                this.__cx = 0;
                this.__cy = 0;
                this.__innerRadius = 0;
                this._lineStyle = Default.strokestyle;
            }
            set near(value) {
                this._near = value;
                if (value) {
                    if (this.type == test.AxisType.X) {
                        this.gravity = Gravity.Bottom;
                    }
                    else if (this.type == test.AxisType.Y) {
                        this.gravity = Gravity.Left;
                    }
                }
                else {
                    if (this.type == test.AxisType.X) {
                        this.gravity = Gravity.Top;
                    }
                    else if (this.type == test.AxisType.Y) {
                        this.gravity = Gravity.Right;
                    }
                }
            }
            get near() {
                return this._near;
            }
            get _cx() {
                return this.__cx;
            }
            get _cy() {
                return this.__cy;
            }
            set _cx(value) {
                this.__cx = value;
            }
            set _cy(value) {
                this.__cy = value;
            }
            get _radius() {
                return this.__radius;
            }
            set _radius(value) {
                this.__radius = value;
            }
            set _innerRadius(value) {
                this.__innerRadius = value;
            }
            get _innerRadius() {
                return this.__innerRadius;
            }
            set _startAngle(value) {
                this.__startAngle = value;
            }
            get _startAngle() {
                return this.__startAngle;
            }
            set _sweep(value) {
                this.__sweep = value;
            }
            get _sweep() {
                return this.__sweep;
            }
            _createTicks() {
                let ticks = [];
                if (this.scale instanceof test.LinearScale) {
                    ticks = test.LinearTicks.create(this.scale).createTicks(10);
                }
                else if (this.scale instanceof test.LogScale) {
                    ticks = test.LogTicks.create(this.scale).createTicks(10);
                }
                else if (this.scale instanceof test.OrdinalScale) {
                    ticks = test.OrdinalTicks.create(this.scale).createTicks();
                }
                // else if(this.scale instanceof Timescale)
                return ticks;
            }
            _layoutXAxis(canvas) {
                let ticks = this._ticks;
                this._children = [];
                for (let i = 0; ticks && i < ticks.length; ++i) {
                    let value = ticks[i];
                    let nextValue = i >= ticks.length ? null : ticks[i + 1];
                    let tickheight = Math.max(this._majorTickHeight, this._minorTickHeight);
                    let label = this._format(value);
                    let labelSize = canvas.measureString(label, this.labelFont);
                    let radius = this.scale.getScaleValue(value);
                    let x = this._cx + Math.cos(this._startAngle) * radius;
                    let y = this._cy + Math.sin(this._startAngle) * radius;
                    let nx = NaN;
                    let ny = NaN;
                    if (nextValue != null) {
                        let nextRadius = this.scale.getScaleValue(nextValue);
                        nx = this._cx + Math.cos(this._startAngle) * nextRadius;
                        ny = this._cy + Math.sin(this._startAngle) * nextRadius;
                    }
                    let labelx = x + (Math.sin(this._startAngle) * (tickheight + LABEL_PADDING + labelSize.height / 2));
                    let labely = y - (Math.cos(this._startAngle) * (tickheight + LABEL_PADDING + labelSize.height / 2));
                    let labelX = x;
                    let labelY = y + tickheight + LABEL_PADDING + labelSize.height / 2;
                    let shape = new test.AxisShape();
                    shape._lableRect = new test.RotateRect(labelX, labelY, labelSize.width, labelSize.height, 0);
                    shape._majorTick = new test.RotateLine(x, y, this._majorTickHeight, 0, this._startAngle);
                    shape._label = label;
                    shape._lableFont = this._labelFont;
                    shape._major = this.majorStyle;
                    shape._minor = this.minorStyle;
                    let minorx = NaN;
                    let minory = NaN;
                    let minorRadius = NaN;
                    if (!isNaN(nx)) {
                        minorRadius = this.scale.getScaleValue((value + nextValue) / 2);
                        minorx = this._cx + Math.cos(this._startAngle) * minorRadius;
                        minory = this._cy + Math.sin(this._startAngle) * minorRadius;
                    }
                    shape._minorTick = new test.RotateLine(minorx, minory, this._minorTickHeight, 0, this._startAngle);
                    this._children.push(shape);
                }
            }
            _layoutYAxis(canvas) {
                let ticks = this._ticks;
                this._children = [];
                for (let i = 0; ticks && i < ticks.length; ++i) {
                    let value = ticks[i];
                    let nextValue = i >= ticks.length ? null : ticks[i + 1];
                    let tickheight = Math.max(this._majorTickHeight, this._minorTickHeight);
                    let label = this._format(value);
                    let labelSize = canvas.measureString(label, this.labelFont);
                    let angle = this.scale.getScaleValue(value);
                    let x = this._cx + Math.cos(angle) * this._radius;
                    let y = this._cy + Math.sin(angle) * this._radius;
                    let nx = NaN;
                    let ny = NaN;
                    if (nextValue != null) {
                        let nAngle = this.scale.getScaleValue(nextValue);
                        nx = this._cx + Math.cos(nAngle) * this._radius;
                        ny = this._cy + Math.sin(nAngle) * this._radius;
                    }
                    let lableX = this._cx + Math.cos(angle) * (this._radius + tickheight + LABEL_PADDING + labelSize.height / 2);
                    let lableY = this._cy + Math.sin(angle) * (this._radius + tickheight + LABEL_PADDING + labelSize.height / 2);
                    let shape = new test.AxisShape();
                    shape._lableRect = new test.RotateRect(lableX, lableY, labelSize.width, labelSize.height, 0);
                    shape._majorTick = new test.RotateLine(x, y, this._majorTickHeight, 0, angle - Math.PI / 2);
                    shape._label = label;
                    shape._lableFont = this.labelFont;
                    shape._major = this.majorStyle;
                    shape._minor = this.minorStyle;
                    let minory = NaN;
                    let minorx = NaN;
                    let minorAngle = NaN;
                    if (!isNaN(ny)) {
                        minorAngle = this.scale.getScaleValue((nextValue + value) / 2);
                        minorx = this._cx + Math.cos(minorAngle) * this._radius;
                        minory = this._cy + Math.sin(minorAngle) * this._radius;
                    }
                    shape._minorTick = new test.RotateLine(minorx, minory, this._minorTickHeight, 0, minorAngle - Math.PI / 2);
                    this._children.push(shape);
                }
            }
            onMeasure(width, height, canvas) {
                let size = null;
                if (this._axisType == test.AxisType.X) {
                    size = new Size(width.value, this._measureX(canvas));
                    this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                    return size;
                }
                else if (this._axisType == test.AxisType.Y) {
                    size = new Size(this._measureY(canvas), height.value);
                    this.setMeasuredDimension(new MeasureSpec(size.width, LayoutParams.EXACTLY), new MeasureSpec(size.height, LayoutParams.EXACTLY));
                    return size;
                }
                else {
                    return super.onMeasure(width, height, canvas);
                }
            }
            _measureX(canvas) {
                let titleSize = canvas.measureString(this.title, this.titleFont);
                let tickHeght = Math.max(this._majorTickHeight, this._minorTickHeight);
                let labelSize = new Size(0, 0);
                let ticks = this._ticks;
                for (let t of ticks) {
                    let sz = canvas.measureString(this._format(t), this.labelFont);
                    labelSize.width = Math.max(sz.width, labelSize.width);
                    labelSize.height = Math.max(sz.height, labelSize.height);
                }
                return labelSize.height + titleSize.height + tickHeght;
            }
            _measureY(canvas) {
                let titleSize = canvas.measureString(this.title, this.titleFont);
                let tickHeght = Math.max(this._majorTickHeight, this._minorTickHeight);
                let labelSize = new Size(0, 0);
                let ticks = this._ticks;
                for (let t of ticks) {
                    let sz = canvas.measureString(this._format(t), this.labelFont);
                    labelSize.width = Math.max(sz.width, labelSize.width);
                    labelSize.height = Math.max(sz.height, labelSize.height);
                }
                return labelSize.width + titleSize.height + tickHeght;
            }
            onLayout(l, t, r, b, canvas) {
                super.onLayout(l, t, r, b, canvas);
                if (this.scale != null) {
                    if (this._axisType === test.AxisType.X) {
                        this._layoutXAxis(canvas);
                    }
                    else if (this._axisType == test.AxisType.Y) {
                        this._layoutYAxis(canvas);
                    }
                }
            }
            onDraw(canvas) {
                super.onDraw(canvas);
                this._drawLine(canvas);
                if (this._children != null) {
                    for (let shape of this._children) {
                        shape.draw(canvas);
                    }
                }
            }
            _drawLine(canvas) {
                let rect = this.layoutInfo.innerrect;
                if (this._axisType == test.AxisType.X) {
                    let endx = this._cx + Math.cos(this.__startAngle) * this._radius;
                    let endy = this._cy + Math.sin(this.__startAngle) * this._radius;
                    let sx = this._cx + Math.cos(this.__startAngle) *
                        this.__innerRadius * this._radius;
                    let sy = this._cy + Math.sin(this.__startAngle) * this._innerRadius * this._radius;
                    canvas.drawLine(new Point(sx, sy), new Point(endx, endy), this.lineStyle);
                }
                else if (this._axisType == test.AxisType.Y) {
                    canvas.drawDonut(this._cx, this._cy, this._radius, this._radius - this.lineStyle.strokeWidth, this._startAngle / Math.PI * 180, this._sweep * 180 / Math.PI, this.lineStyle.strokeColor);
                }
            }
        }
        test.RadialLineAxis = RadialLineAxis;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var View = android.view.View;
        class BasePlot extends View {
            get layout() {
                return null;
            }
        }
        test.BasePlot = BasePlot;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var Rect = android.graphics.Rect;
        var Default = android.device.Default;
        class CartesianPlot extends test.BasePlot {
            constructor(context, datamodel) {
                super(context);
                this.__shapeList = [];
                this._datamodel = datamodel;
                this._layouts = [];
                this.__scalePairs = [];
                this._animation = new test.Animation();
                this._animation.duration = 500;
                this._animation.ease = new test.BounceAnimationEase();
                this._animation.isAniamtionEnd = true;
            }
            onMeasure(width, height, canvas) {
                return super.onMeasure(width, height, canvas);
            }
            onLayout(l, t, r, b, canvas) {
                this.__shapeList = [];
                this.__scalePairs = [];
                this._layouts.length = 0;
                let isradial = this._datamodel.encoding._radial;
                for (let type of this._datamodel.chartTypes) {
                    switch (type) {
                        case test.ChartType.Bar:
                            if (isradial) {
                                let barlayout = new test.RadialBarLayout();
                                let cx = (l + r) / 2;
                                let cy = (b + t) / 2;
                                let radius = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                let innerRadius = 0;
                                let startAngle = test.StartAngle;
                                let endAngle = Math.PI * 2 + startAngle;
                                barlayout.convert(this._datamodel.getSeriesByType(test.ChartType.Bar), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                this.__shapeList = this.__shapeList.concat(barlayout.shapeList);
                                this._layouts.push(barlayout);
                            }
                            else {
                                let barlayout = new test.BarLayout();
                                barlayout.convert(this._datamodel.getSeriesByType(test.ChartType.Bar), this._datamodel.encoding, new Rect(l, t, r, b));
                                this.__shapeList = this.__shapeList.concat(barlayout.shapeList);
                                this._layouts.push(barlayout);
                            }
                            break;
                        case test.ChartType.Line:
                            if (isradial) {
                                let linelayout = new test.RadialLineLayout();
                                let cx = (l + r) / 2;
                                let cy = (b + t) / 2;
                                let radius = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                let innerRadius = 0;
                                let startAngle = test.StartAngle;
                                let endAngle = Math.PI * 2 + startAngle;
                                linelayout.convert(this._datamodel.getSeriesByType(test.ChartType.Line), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                this.__shapeList = this.__shapeList.concat(linelayout.shapeList);
                                this._layouts.push(linelayout);
                            }
                            else {
                                let linelayout = new test.LineLayout();
                                linelayout.convert(this._datamodel.getSeriesByType(test.ChartType.Line), this._datamodel.encoding, new Rect(l, t, r, b));
                                this.__shapeList = this.__shapeList.concat(linelayout.shapeList);
                                this._layouts.push(linelayout);
                            }
                            break;
                        case test.ChartType.Scatter:
                            if (isradial) {
                                let scatterlayout = new test.RadialScatterLayout();
                                let cx = (l + r) / 2;
                                let cy = (b + t) / 2;
                                let radius = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                let innerRadius = 0;
                                let startAngle = test.StartAngle;
                                let endAngle = Math.PI * 2 + startAngle;
                                scatterlayout.convert(this._datamodel.getSeriesByType(test.ChartType.Scatter), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                this.__shapeList = this.__shapeList.concat(scatterlayout.shapeList);
                                this._layouts.push(scatterlayout);
                            }
                            else {
                                let scatterLayout = new test.ScatterLayout();
                                scatterLayout.convert(this._datamodel.getSeriesByType(test.ChartType.Scatter), this._datamodel.encoding, new Rect(l, t, r, b));
                                this.__shapeList = this.__shapeList.concat(scatterLayout.shapeList);
                                this._layouts.push(scatterLayout);
                            }
                            break;
                        case test.ChartType.Area:
                            if (isradial) {
                                let arealayout = new test.RadialAreaLayout();
                                let cx = (l + r) / 2;
                                let cy = (b + t) / 2;
                                let radius = ((r - l) < (b - t) ? (r - l) : (b - t)) / 2;
                                let innerRadius = 0;
                                let startAngle = test.StartAngle;
                                let endAngle = Math.PI * 2 + startAngle;
                                arealayout.convert(this._datamodel.getSeriesByType(test.ChartType.Area), this._datamodel.encoding, cx, cy, innerRadius, radius, startAngle, endAngle);
                                this.__shapeList = this.__shapeList.concat(arealayout.shapeList);
                                this._layouts.push(arealayout);
                            }
                            else {
                                let arealayout = new test.AreaLayout();
                                arealayout.convert(this._datamodel.getSeriesByType(test.ChartType.Area), this._datamodel.encoding, new Rect(l, t, r, b));
                                this.__shapeList = this.__shapeList.concat(arealayout.shapeList);
                                this._layouts.push(arealayout);
                            }
                            break;
                    }
                }
                this.__shapeList.sort((a, b) => {
                    return a.priority - b.priority;
                });
                if (this.layouts.length > 1) {
                    for (let i = 0; i < this._layouts.length; ++i) {
                        let scalesPairs = this.layouts[i].scalePairs;
                        for (let pair of scalesPairs) {
                            let result = _.find(this.scalePairs, (p) => {
                                return p.filed.equals(pair.filed) && p.scale.equal(pair.scale);
                            });
                            if (result == null) {
                                this.__scalePairs.push({ series: [].concat(pair.series), filed: pair.filed, scale: pair.scale });
                            }
                            else {
                                result.series = result.series.concat(pair.series);
                            }
                        }
                    }
                }
                else if (this._layouts.length === 1) {
                    this.__scalePairs = this._layouts[0].scalePairs;
                }
                if (!this._datamodel.encoding._radial) {
                    this._layoutLine(l, r);
                }
                super.onLayout(l, t, r, b, canvas);
            }
            _layoutLine(l, r) {
                let ys = [];
                for (let layout of this.layouts) {
                    for (let pair of layout.scalePairs) {
                        if (pair.filed.name == 'y') {
                            let y = pair.scale.getScaleValue(0);
                            if (ys.indexOf(y) < 0) {
                                ys.push(y);
                                let axisline = new test.AxisLineShape(l, y, r, y, Default.strokestyle);
                                this.__shapeList.push(axisline);
                            }
                        }
                    }
                }
            }
            /**
             * merage the scales which is  x / y
             */
            __merageScale() {
            }
            onDraw(canvas) {
                super.onDraw(canvas);
                for (let shape of this.__shapeList) {
                    shape.draw(canvas);
                }
            }
            get layouts() {
                return this._layouts;
            }
            get scalePairs() {
                return this.__scalePairs;
            }
            _animate() {
                if (!this._animation.isAniamtionEnd) {
                    window.requestAnimationFrame(this._animate.bind(this));
                }
            }
        }
        test.CartesianPlot = CartesianPlot;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var MeasureSpec = android.view.MeasureSpec;
        var Size = android.graphics.Size;
        var LayoutParams = android.view.LayoutParams;
        var FrameLayout = android.widget.FrameLayout;
        var Gravity = android.graphics.Gravity;
        test.StartAngle = Math.PI;
        class CartesianChart extends FrameLayout {
            constructor(context, option, chartType) {
                super(context);
                this._option = option;
                this._chartType = chartType;
                this._axisList = [];
            }
            set option(value) {
                this._option = value;
            }
            get option() {
                return this._option;
            }
            set chartType(value) {
                if (value != null && value != this._chartType) {
                    this._chartType = value;
                }
            }
            get chartType() {
                return this._chartType;
            }
            set datamodel(value) {
                this._dataModel = value;
                if (this._dataModel.encoding._radial) {
                    this._loadRadialView();
                }
                else {
                    this._loadView();
                }
            }
            get datamodel() {
                return this._dataModel;
            }
            _loadView() {
                for (let pair of this.datamodel.scalePairs) {
                    if (pair.filed.name == 'y') {
                        let axisY = new test.LineAxis(this.getContext());
                        axisY.type = test.AxisType.Y;
                        axisY.layoutParams.height = LayoutParams.MATCH_PARENT;
                        axisY.layoutParams.width = 100;
                        axisY.near = true;
                        axisY.series = [].concat(pair.series);
                        this._axisList.push(axisY);
                        this.addView(axisY);
                    }
                }
                if (this._axisList.length > 1) {
                    this._axisList[this._axisList.length - 1].near = false;
                }
                let plot = new test.CartesianPlot(this.getContext(), this.datamodel);
                plot.layoutParams.width = LayoutParams.MATCH_PARENT;
                plot.layoutParams.height = LayoutParams.MATCH_PARENT;
                this._plot = plot;
                this.addView(plot);
                let axisX = new test.LineAxis(this.getContext());
                axisX.type = test.AxisType.X;
                axisX.layoutParams.width = LayoutParams.MATCH_PARENT;
                axisX.layoutParams.height = 100;
                axisX.near = true;
                this._axisList.push(axisX);
                this.addView(axisX);
            }
            _loadRadialView() {
                for (let pair of this.datamodel.scalePairs) {
                    if (pair.filed.name == 'y') {
                        let axisY = new test.RadialLineAxis(this.getContext());
                        axisY.type = test.AxisType.Y;
                        axisY.layoutParams.height = LayoutParams.MATCH_PARENT;
                        axisY.layoutParams.width = LayoutParams.MATCH_PARENT;
                        axisY.near = true;
                        axisY.series = [].concat(pair.series);
                        this._axisList.push(axisY);
                        this.addView(axisY);
                    }
                }
                if (this._axisList.length > 1) {
                    this._axisList[this._axisList.length - 1].near = false;
                }
                let plot = new test.CartesianPlot(this.getContext(), this.datamodel);
                plot.layoutParams.width = LayoutParams.MATCH_PARENT;
                plot.layoutParams.height = LayoutParams.MATCH_PARENT;
                this._plot = plot;
                this.addView(plot);
                let axisX = new test.RadialLineAxis(this.getContext());
                axisX.type = test.AxisType.X;
                axisX.gravity = Gravity.Center;
                axisX.layoutParams.width = LayoutParams.MATCH_PARENT;
                axisX.layoutParams.height = LayoutParams.MATCH_PARENT;
                axisX.near = true;
                this._axisList.push(axisX);
                this.addView(axisX);
            }
            onMeasure(width, height, canvas) {
                // return super.onMeasure(width,height,canvas);
                let maxsize = new Size(0, 0);
                if (this.datamodel.encoding._radial) {
                    let offset = 0;
                    for (let axis of this._axisList) {
                        let size = axis.onMeasure(width, height, canvas);
                        if (axis.type == test.AxisType.Y) {
                            offset = size.width;
                        }
                    }
                    let w = width.getMeasureValue();
                    let h = height.getMeasureValue();
                    let radius = w < h ? w / 2 : h / 2;
                    radius = radius - offset;
                    let startAngle = test.StartAngle;
                    let sweep = Math.PI * 2;
                    for (let view of this.children) {
                        let size = new Size(0, 0);
                        if (view instanceof test.BaseAxis) {
                            if (view.type == test.AxisType.Y) {
                                size = view.onMeasure(new MeasureSpec(width.getMeasureValue(), LayoutParams.EXACTLY), new MeasureSpec(height.getMeasureValue(), LayoutParams.EXACTLY), canvas);
                            }
                            else if (view.type == test.AxisType.X) {
                                view.onMeasure(width, height, canvas);
                            }
                            view._innerRadius = 0;
                            view._startAngle = startAngle;
                            view._sweep = sweep;
                            view._radius = radius;
                        }
                        else if (view instanceof test.BasePlot) {
                            view.layoutParams.margin.marginLeft = offset;
                            view.layoutParams.margin.marginTop = offset;
                            view.layoutParams.margin.marginRight = offset;
                            view.layoutParams.margin.marginBottom = offset;
                            view.onMeasure(width, height, canvas);
                        }
                    }
                }
                else {
                    let loff = 0, toff = 0, roff = 0, boff = 0;
                    for (let axis of this._axisList) {
                        let size = axis.onMeasure(width, height, canvas);
                        if (axis.type == test.AxisType.X) {
                            if (axis.near) {
                                boff = size.height;
                            }
                            else {
                                toff = size.height;
                            }
                        }
                        else if (axis.type == test.AxisType.Y) {
                            if (axis.near) {
                                loff = size.width;
                            }
                            else {
                                roff = size.width;
                            }
                        }
                    }
                    for (let view of this.children) {
                        let size = new Size(0, 0);
                        if (view instanceof test.BaseAxis) {
                            if (view.type == test.AxisType.X) {
                                view.layoutParams.margin.marginLeft = loff;
                                view.layoutParams.margin.marginRight = roff;
                                size = view.onMeasure(new MeasureSpec(width.getMeasureValue() - loff - roff, width.mode), height, canvas);
                            }
                            else if (view.type == test.AxisType.Y) {
                                if (view.near) {
                                    view.layoutParams.margin.marginTop = toff;
                                    view.layoutParams.margin.marginBottom = boff;
                                    size = view.onMeasure(width, new MeasureSpec(height.getMeasureValue() - toff - boff, LayoutParams.EXACTLY), canvas);
                                }
                                else {
                                    view.layoutParams.margin.marginTop = toff;
                                    view.layoutParams.margin.marginRight = 0;
                                    size = view.onMeasure(width, new MeasureSpec(height.getMeasureValue() - toff - boff, LayoutParams.EXACTLY), canvas);
                                }
                            }
                        }
                        else if (view instanceof test.BasePlot) {
                            view.layoutParams.margin.marginLeft = loff;
                            view.layoutParams.margin.marginRight = roff;
                            view.layoutParams.margin.marginTop = toff;
                            view.layoutParams.margin.marginBottom = boff;
                            size = view.onMeasure(width, height, canvas);
                        }
                        else {
                            size = view.onMeasure(width, height, canvas);
                        }
                        if (size.width > maxsize.width) {
                            maxsize.width = size.width;
                        }
                        if (size.height > maxsize.height) {
                            maxsize.height = size.height;
                        }
                    }
                }
                return super.onMeasure(width, height, canvas);
            }
            onLayout(l, t, r, b, canvas) {
                this.layoutInfo.reset(l, t, r, b, this.padding, 0);
                for (let axis of this._axisList) {
                    axis.scale = null;
                }
                // super.onLayout(l, t, r, b, canvas); 
                this.layoutItem(this.plot, l, t, r, b, canvas);
                for (let axis of this._axisList) {
                    if (axis instanceof test.BaseAxis) {
                        if (axis instanceof test.RadialLineAxis) {
                            axis._cx = (l + r) / 2;
                            axis._cy = (t + b) / 2;
                        }
                        if (axis.type === test.AxisType.X) {
                            for (let pair of this.plot.scalePairs) {
                                if (pair.filed.name == 'x') {
                                    axis.scale = pair.scale;
                                }
                            }
                        }
                        else {
                            for (let pair of this.plot.scalePairs) {
                                if (pair.filed.name == 'y' && _.xor(pair.series, axis.series).length == 0) {
                                    axis.scale = pair.scale;
                                }
                            }
                        }
                    }
                    this.layoutItem(axis, l, r, t, b, canvas);
                }
            }
            get plot() {
                for (let plot of this.children) {
                    if (plot instanceof test.CartesianPlot) {
                        return plot;
                    }
                }
            }
            dispatchDraw(canvas) {
                super.dispatchDraw(canvas);
            }
        }
        test.CartesianChart = CartesianChart;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        var Padding = android.graphics.Padding;
        var Gravity = android.graphics.Gravity;
        var Canvas = android.graphics.Canvas;
        var MeasureSpec = android.view.MeasureSpec;
        var LayoutParams = android.view.LayoutParams;
        var MotionEvent = android.view.event.MotionEvent;
        var FrameLayout = android.widget.FrameLayout;
        var RenderType = android.graphics.RenderType;
        var Device = android.device.Device;
        var Orientation = android.graphics.Orientation;
        class ChartLayout extends FrameLayout {
            constructor(context) {
                super(context);
                this.clip = false;
                let EventHandler = (pt, types, info) => {
                    console.log(" " + pt.toString() + ", type " + types + " , info " + info);
                    if (types == test.ElementType.SeriesLegend) {
                        let series = this._dataModel.filter.series;
                        let index = series.indexOf(info.series);
                        if (info.enable) {
                            if (index > -1) {
                                this._dataModel.filter.series.splice(index, 1);
                            }
                        }
                        else {
                            if (index < 0) {
                                this._dataModel.filter.series.push(info.series);
                            }
                        }
                        this._dataModel.refresh();
                        this.setChart();
                    }
                };
                window['EventHandler'] = EventHandler;
            }
            attachElement(element, datamodel) {
                this.element = element;
                this.element.ontouchstart = this.ontouch.bind(this);
                this.element.ontouchmove = this.ontouch.bind(this);
                this.element.ontouchend = this.ontouch.bind(this);
                this.element.ontouchcancel = this.ontouch.bind(this);
                this.element.onmousedown = this.ontouch.bind(this);
                this.element.onmousemove = this.ontouch.bind(this);
                this.element.onmouseup = this.ontouch.bind(this);
                this.element.onmouseout = this.ontouch.bind(this);
                this.element.onmouseover = this.ontouch.bind(this);
                this.element.onclick = this.ontouch.bind(this);
                this.layoutParams.width = element.clientWidth;
                this.layoutParams.height = element.clientHeight;
                this.padding = new Padding(20);
                Device.width = element.clientWidth;
                Device.height = element.clientHeight;
                this._canvas = new Canvas(element, RenderType.Canvas);
                this._l = 0;
                this._t = 0;
                this._w = element.clientWidth;
                this._h = element.clientHeight;
                this._dataModel = datamodel;
                this.setChart();
            }
            setChart() {
                this.removeAllViews();
                this._chart = new test.CartesianChart(null, null, test.ChartType.Bar);
                this._chart.layoutParams.width = LayoutParams.MATCH_PARENT;
                this._chart.layoutParams.height = LayoutParams.MATCH_PARENT;
                // this._chart.datamodel = datamodel;
                this._chart.datamodel = this._dataModel;
                if (this._dataModel.allSeries.length > 1) {
                    this._horizontallegend = new test.SeriesLegend('bar');
                    this._horizontallegend.series = this._dataModel.allSeries;
                    // .map((ser: Series, index: number, arr: Series[]) => {
                    //     return ser.name;
                    // })
                }
                else if (this._dataModel.series.length == 1) {
                    // this._horizontallegend.series = datamodel._getScaleByName('color',datamodel.series[0].name);
                }
                if (this._horizontallegend != null) {
                    this._horizontallegend.setOrientation(Orientation.Horizontal);
                    this._horizontallegend.layoutParams.width = LayoutParams.WRAP_CONTENT;
                    this._horizontallegend.layoutParams.height = 30;
                    this._horizontallegend.gravity = Gravity.Top;
                    this._chart.layoutParams.margin.marginTop = 30;
                }
                this._chart.gravity = Gravity.Bottom;
                this.addView(this._chart, 0);
                this.addView(this._horizontallegend, 1);
            }
            ontouch(event) {
                event.preventDefault();
                event.stopPropagation();
                var event = event || window.event;
                var str = '';
                let mevent = new MotionEvent(0, 0, 0);
                switch (event.type) {
                    case "touchstart":
                        // str= "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                        mevent = new MotionEvent(event.touches[0].clientX, event.touches[0].clientY, MotionEvent.ACTION_DOWN);
                        break;
                    case "touchend":
                        mevent = new MotionEvent(event.changedTouches[0].clientX, event.changedTouches[0].clientY, MotionEvent.ACTION_UP);
                        break;
                    case "touchcancel":
                        mevent = new MotionEvent(event.changedTouches[0].clientX, event.changedTouches[0].clientY, MotionEvent.ACTION_CANCEL);
                        break;
                    case "touchmove":
                        mevent = new MotionEvent(event.touches[0].clientX, event.touches[0].clientY, MotionEvent.ACTION_MOVE);
                        break;
                    case 'mousedown':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_DOWN);
                        break;
                    case 'mousemove':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_MOVE);
                        break;
                    case 'mouseup':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_UP);
                        break;
                    case 'mouseout':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_OUT);
                        break;
                    case 'mouseover':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_MOUSE_OVER);
                        break;
                    case 'click':
                        mevent = new MotionEvent(event.clientX, event.clientY, MotionEvent.ACTION_CLICK);
                        break;
                }
                mevent.element = this.element;
                // getElementRect(e: Element): Rect {
                //     var rc = e.getBoundingClientRect();
                //     return new Rect(rc.left + pageXOffset, rc.top + pageYOffset, rc.width, rc.height);
                // }
                var elementrect = this.element.getBoundingClientRect();
                mevent.x = mevent.x - elementrect.left;
                mevent.y = mevent.y - elementrect.top;
                this.sendEvent(mevent);
            }
            sendEvent(event) {
                if (event.action >= MotionEvent.ACTION_MOUSE_DOWN) {
                    this.dispatchMouseEvent(event);
                }
                else {
                    this.dispatchTouchEvent(event);
                }
            }
            dispatchDraw(canvas) {
                super.dispatchDraw(canvas);
                var rect = this.layoutInfo.outterrect;
                canvas.drawRect(rect.startPoint, rect.endPoint, false, 'black');
            }
            onMeasure(width, height, canvas) {
                return super.onMeasure(width, height, canvas);
            }
            onLayout(l, t, r, b, canvas) {
                super.onLayout(l, t, r, b, canvas);
                // this.layoutInfo.reset(l,t,r,b,this._padding,0);
                // this.layoutItem(this._horizontallegend,l,t,r,b,canvas);
                // this.layoutItem(this._chart,l,t+this._horizontallegend.height,r,b,canvas);
            }
            oninvalidate() {
                super.oninvalidate();
                this._canvas.begin();
                this.dispatchDraw(this._canvas);
                this._canvas.end();
            }
            requestLayout() {
                var width = new MeasureSpec(this._w, LayoutParams.MATCH_PARENT);
                var height = new MeasureSpec(this._h, LayoutParams.MATCH_PARENT);
                this._canvas.begin();
                var size = this.onMeasure(width, height, this._canvas);
                this.onLayout(this._l, this._t, this._l + size.width, this._t + size.height, this._canvas);
                this._canvas.end();
                this.oninvalidate();
            }
            addView(view, index) {
                super.addView(view, index);
                return 0;
            }
        }
        test.ChartLayout = ChartLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
var android;
(function (android) {
    var test;
    (function (test) {
        class EventHandler {
        }
        test.EventHandler = EventHandler;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));
/// <reference path="../../base.d.ts" />
var android;
(function (android) {
    var test;
    (function (test) {
        'use strict';
        var LinearLayout = android.widget.LinearLayout;
        class LegendLayout extends LinearLayout {
        }
        test.LegendLayout = LegendLayout;
    })(test = android.test || (android.test = {}));
})(android || (android = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy91dGlsL0RlYnVnLnRzIiwic3JjL3V0aWwvVXRpbGl0eS50cyIsInNyYy91dGlsL0NvbG9yVXRpbHMudHMiLCJzcmMvdXRpbC9Sb3RhdGVkUmVjdC50cyIsInNyYy9tb2RlbC9lbnVtL0FuaW1hdGlvblR5cGUudHMiLCJzcmMvbW9kZWwvZW51bS9BZ2cudHMiLCJzcmMvbW9kZWwvZW51bS9PcmRlci50cyIsInNyYy9tb2RlbC9lbnVtL1NjYWxlVHlwZS50cyIsInNyYy9tb2RlbC9lbnVtL0RhdGFUeXBlLnRzIiwic3JjL21vZGVsL2VudW0vQ2hhcnRUeXBlLnRzIiwic3JjL21vZGVsL2VudW0vQXhpc1R5cGUudHMiLCJzcmMvbW9kZWwvY2FydGVzaWFuL1ZhbHVlLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9GaWVsZC50cyIsInNyYy9tb2RlbC9jYXJ0ZXNpYW4vRmlsdGVyLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9FbmNvZGluZy50cyIsInNyYy9tb2RlbC9jYXJ0ZXNpYW4vVHJhbnNGb3JtLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9TZXJpZXMudHMiLCJzcmMvbW9kZWwvY2FydGVzaWFuL0RhdGFNb2RlbC50cyIsInNyYy9zY2FsZS9JU2NhbGUudHMiLCJzcmMvc2NhbGUvU2NhbGUudHMiLCJzcmMvc2NhbGUvTGluZWFyU2NhbGUudHMiLCJzcmMvc2NhbGUvT3JkaW5hbFNjYWxlLnRzIiwic3JjL3NjYWxlL0xvZ1NjYWxlLnRzIiwic3JjL3NjYWxlL0NvbG9yU2NhbGUudHMiLCJzcmMvdmlldy9FbGVtZW50VHlwZS50cyIsInNyYy92aWV3L2FuaW1hdGlvbi9BbmltYXRpb24udHMiLCJzcmMvdmlldy9hbmltYXRpb24vQW5pbWF0aW9uRWFzZS50cyIsInNyYy92aWV3L2xlZ2VuZC9MZWdlbmQudHMiLCJzcmMvdmlldy9zaGFwZS9TaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL0xhYmxlLnRzIiwic3JjL3ZpZXcvc2hhcGUvUGxvdFNoYXBlLnRzIiwic3JjL3ZpZXcvc2hhcGUvQmFyU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9SYWRpYWxCYXJTaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL1NjYXR0ZXJTaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL0xpbmVzU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9BcmVhU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9BeGlzTGluZVNoYXBlLnRzIiwic3JjL3ZpZXcvbGF5b3V0L0Jhc2VMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvQ2FydGVzaWFuTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L0JhckxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9TY2F0dGVyTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L1JhZGlhbENhcnRlc2lhbkxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9SYWRpYWxCYXJMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvUmFkaWFsTGluZUxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9SYWRpYWxBcmVhTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L1JhZGlhbFNjYXR0ZXJMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvTGluZUxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9BcmVhTGF5b3V0LnRzIiwic3JjL3ZpZXcvYXhpcy90aWNrcy9UaWNrcy50cyIsInNyYy92aWV3L2F4aXMvdGlja3MvTGluZWFyVGlja3MudHMiLCJzcmMvdmlldy9heGlzL3RpY2tzL0xvZ1RpY2tzLnRzIiwic3JjL3ZpZXcvYXhpcy90aWNrcy9PcmRpbmFsVGlja3MudHMiLCJzcmMvdmlldy9heGlzL3NoYXBlL0F4aXNTaGFwZS50cyIsInNyYy92aWV3L2F4aXMvQmFzZUF4aXMudHMiLCJzcmMvdmlldy9heGlzL0xpbmVBeGlzLnRzIiwic3JjL3ZpZXcvYXhpcy9SYWRpYWxMaW5lQXhpcy50cyIsInNyYy92aWV3L3Bsb3QvQmFzZVBsb3QudHMiLCJzcmMvdmlldy9wbG90L0NhcnRlc2lhblBsb3QudHMiLCJzcmMvdmlldy9jaGFydC9jYXJ0ZXNpYW4vQ2FydGVzaWFuQ2hhcnQudHMiLCJzcmMvdmlldy9jaGFydC9DaGFydExheW91dC50cyIsInNyYy91dGlsL0V2ZW50SGFuZGxlci50cyIsInNyYy92aWV3L2xlZ2VuZC9MZWdlbmRMYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxPQUFPLENBWWhCO0FBWkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxJQUFJLENBWXJCO0lBWmlCLFdBQUEsSUFBSTtRQUNsQjtZQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBWSxLQUFLLEVBQUMsR0FBVztnQkFDdkMsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO29CQUNMLElBQUksR0FBRyxHQUFTLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQzVCLE1BQU0sR0FBRyxHQUFDLElBQUksR0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUM3QixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBTztnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7U0FDSjtRQVZZLFVBQUssUUFVakIsQ0FBQTtJQUNMLENBQUMsRUFaaUIsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBWXJCO0FBQUQsQ0FBQyxFQVpTLE9BQU8sS0FBUCxPQUFPLFFBWWhCO0FDWkQsSUFBVSxPQUFPLENBeUZoQjtBQXpGRCxXQUFVLE9BQU87SUFBQyxJQUFBLElBQUksQ0F5RnJCO0lBekZpQixXQUFBLElBQUk7UUFDbEIsWUFBWSxDQUFDO1FBQ2I7WUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQWE7Z0JBQ3BCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDWixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFD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QyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRTVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3JELEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDckQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDckQsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUVyRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFD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RyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUM5QixJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBQSxXQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMzQixJQUFJLEdBQUcsR0FBVyxLQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDN0csSUFBSSxHQUFHLEdBQVcsS0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzdHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFFbkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDM0Is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QUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQztTQUVKO1FBcE1ZLGdCQUFXLGNBb012QixDQUFBO0lBQ0wsQ0FBQyxFQS9OaUIsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBK05yQjtBQUFELENBQUMsRUEvTlMsT0FBTyxLQUFQLE9BQU8sUUErTmhCO0FDak9ELElBQVUsT0FBTyxDQUloQjtBQUpELFdBQVUsT0FBTztJQUFDLElBQUEsSUFBSSxDQUlyQjtJQUppQixXQUFBLElBQUk7UUFDbEI7U0FFQztRQUZZLGlCQUFZLGVBRXhCLENBQUE7SUFDTCxDQUFDLEVBSmlCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQUlyQjtBQUFELENBQUMsRUFKUyxPQUFPLEtBQVAsT0FBTyxRQUloQjtBQ0pELHdDQUF3QztBQUV4QyxJQUFVLE9BQU8sQ0FRaEI7QUFSRCxXQUFVLE9BQU87SUFBQyxJQUFBLElBQUksQ0FRckI7SUFSaUIsV0FBQSxJQUFJO1FBRWxCLFlBQVksQ0FBQztRQUViLElBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ2xELGtCQUEwQixTQUFRLFlBQVk7U0FFN0M7UUFGWSxpQkFBWSxlQUV4QixDQUFBO0lBQ0wsQ0FBQyxFQVJpQixJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFRckI7QUFBRCxDQUFDLEVBUlMsT0FBTyxLQUFQLE9BQU8sUUFRaEIiLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgZXhwb3J0IGNsYXNzIERlYnVne1xuICAgICAgICBzdGF0aWMgYXNzZXJ0KGZsZzpib29sZWFuPWZhbHNlLGxvZz86c3RyaW5nKXtcbiAgICAgICAgICAgIGlmKCFmbGcpe1xuICAgICAgICAgICAgICAgIGxldCBlcnI6RXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBsb2crXCJcXG5cIitlcnIuc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGxvZyhsb2c6YW55KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvZyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwibmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBVdGlsaXR5IHtcbiAgICAgICAgc3RhdGljIG1heChhcnI6IG51bWJlcltdKSB7XG4gICAgICAgICAgICB2YXIgdnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTih2KSAmJiB2ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdnMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkodGhpcywgdnMpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBtaW4oYXJyOiBudW1iZXJbXSkge1xuICAgICAgICAgICAgdmFyIHZzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFycikge1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4odikgJiYgdiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZzLnB1c2godik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluLmFwcGx5KHRoaXMsIHZzKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgaXNrZXkoa2V5OiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgIT09IHVuZGVmaW5lZCAmJiBrZXkgIT09IG51bGwgJiYgdHlwZW9mIChrZXkpID09ICdzdHJpbmcnICYmIGtleVswXSAhPSAnXyc7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY2hlY2tBcnJheVR5cGUoYXJyOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KGFyciAhPSBudWxsKTtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChhcnIubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHR5cGVvZiBhcnJbMF07XG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFycikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlICE9IHR5cGVvZiB2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSh2OiBhbnkpOiBEYXRhVHlwZSB7XG4gICAgICAgICAgICBsZXQgZGF0YXR5cGU6IERhdGFUeXBlID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh2IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBEZWJ1Zy5hc3NlcnQodiAhPSBudWxsKTtcbiAgICAgICAgICAgICAgICBEZWJ1Zy5hc3NlcnQodi5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICBkYXRhdHlwZSA9IERhdGFUeXBlLkFycmF5O1xuICAgICAgICAgICAgICAgIGlmIChVdGlsaXR5LmNoZWNrQXJyYXlUeXBlKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlsaXR5LmdldFR5cGUodlswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGF0eXBlID0gRGF0YVR5cGUuTnVtYmVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGF0eXBlID0gRGF0YVR5cGUuU3RyaW5nO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBkYXRhdHlwZSA9IERhdGFUeXBlLkJvb2xlYW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIERlYnVnLmFzc2VydCh0cnVlLCBcIlZhbHVlIGNhbid0IGJlIE9iamVjdCBleGNlcHQgQXJyYXlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YXR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIG1lcmdlU2NhbGUoc2NhbGVBOiBTY2FsZSwgc2NhbGVCOiBTY2FsZSkge1xuICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoc2NhbGVBLmlkID09IHNjYWxlQi5pZCkge1xuICAgICAgICAgICAgICAgIGlmIChzY2FsZUEgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUgJiYgc2NhbGVCIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkb21haW51bmlvbnM6c3RyaW5nW10gPSBfLnVuaW9uKHNjYWxlQS5kb21haW5zLCBzY2FsZUIuZG9tYWlucyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNjYWxlQS5kb21haW5zLmxlbmd0aCAvZG9tYWludW5pb25zLmxlbmd0aCA+MC41ICYmIHNjYWxlQi5kb21haW5zLmxlbmd0aC9kb21haW51bmlvbnMubGVuZ3RoID4gMC41KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gc2NhbGVBLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW4oZG9tYWludW5pb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGVBIGluc3RhbmNlb2YgTGluZWFyU2NhbGUgJiYgc2NhbGVCIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWluOm51bWJlciA9IE1hdGgubWluKHNjYWxlQS5taW4sIHNjYWxlQi5taW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4Om51bWJlciA9IE1hdGgubWF4KHNjYWxlQS5tYXgsIHNjYWxlQi5tYXgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmF0ZTEgOm51bWJlciA9TWF0aC5hYnMobWF4LW1pbikvKE1hdGguYWJzKHNjYWxlQS5tYXgtc2NhbGVBLm1pbikpIDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhdGUyIDpudW1iZXIgPU1hdGguYWJzKG1heC1taW4pLyhNYXRoLmFicyhzY2FsZUIubWF4LXNjYWxlQi5taW4pKSA7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxpbmVhciByYW5nZSByYXRlMSA9IFwiICsgcmF0ZTEgICtcIiAsIHJhdGUyID0gXCIgKyByYXRlMik7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJhdGUxPDUgJiYgcmF0ZTIgPCA1KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gc2NhbGVBLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW4oW21pbiwgbWF4XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlQSBpbnN0YW5jZW9mIExvZ1NjYWxlICYmIHNjYWxlQiBpbnN0YW5jZW9mIExvZ1NjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNjYWxlQS5sb2dCYXNlID09IHNjYWxlQi5sb2dCYXNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gc2NhbGVBLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW4oW01hdGgubWluKHNjYWxlQS5taW4sIHNjYWxlQi5taW4pLCBNYXRoLm1heChzY2FsZUEubWF4LCBzY2FsZUIubWF4KV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwibmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgZXhwb3J0IGNsYXNzIENvbG9yVXRpbHMge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfY29sb3JpbmRleDpudW1iZXIgPSAtMTtcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb2xvciA6c3RyaW5nW109XG4gICAgICAgIFsncmdiKDI1MSwgMTE4LCAxMjMpJywncmdiKDEyOSwgMjI3LCAyMzgpJywnIzg4YmRlNicsICcjZmJiMjU4JywgJyM5MGNkOTcnLCAnI2Y2YWFjOScsICcjYmZhNTU0JywgJyNiYzk5YzcnLCAnI2VkZGQ0NicsICcjZjA3ZTZlJywgJyM4YzhjOGMnXTtcbiAgICAgICAgLy8gW1wiI0ZGRkZGMFwiLCBcIiNGRkZGRTBcIiwgXCIjRkZGRjAwIFwiLCBcIiNGRkZBRkFcIiwgXCIjRkZGQUYwXCIsIFwiI0ZGRkFDRFwiLCBcIiNGRkY4REMgXCIsIFwiI0ZGRjY4RlwiLCBcIiNGRkY1RUVcIiwgXCIjRkZGMEY1XCIsIFwiI0ZGRUZEQiBcIiwgXCIjRkZFRkQ1XCIsIFwiI0ZGRUM4QlwiLCBcIiNGRkVCQ0RcIiwgXCIjRkZFN0JBIFwiLCBcIiNGRkU0RTFcIiwgXCIjRkZFNEM0XCIsIFwiI0ZGRTRCNVwiLCBcIiNGRkUxRkYgXCIsIFwiI0ZGREVBRFwiLCBcIiNGRkRBQjlcIiwgXCIjRkZENzAwXCIsIFwiI0ZGRDM5QiBcIiwgXCIjRkZDMUMxXCIsIFwiI0ZGQzEyNVwiLCBcIiNGRkMwQ0JcIiwgXCIjRkZCQkZGIFwiLCBcIiNGRkI5MEZcIiwgXCIjRkZCNkMxXCIsIFwiI0ZGQjVDNVwiLCBcIiNGRkFFQjkgXCIsIFwiI0ZGQTU0RlwiLCBcIiNGRkE1MDBcIiwgXCIjRkZBMDdBXCIsIFwiI0ZGOEM2OSBcIiwgXCIjRkY4QzAwXCIsIFwiI0ZGODNGQVwiLCBcIiNGRjgyQUJcIiwgXCIjRkY4MjQ3IFwiLCBcIiNGRjdGNTBcIiwgXCIjRkY3RjI0XCIsIFwiI0ZGN0YwMFwiLCBcIiNGRjcyNTYgXCIsIFwiI0ZGNkVCNFwiLCBcIiNGRjZBNkFcIiwgXCIjRkY2OUI0XCIsIFwiI0ZGNjM0NyBcIiwgXCIjRkY0NTAwXCIsIFwiI0ZGNDA0MFwiLCBcIiNGRjNFOTZcIiwgXCIjRkYzNEIzIFwiLCBcIiNGRjMwMzBcIiwgXCIjRkYxNDkzXCIsIFwiI0ZGMDBGRlwiLCBcIiNGRjAwMDAgXCIsIFwiI0ZERjVFNlwiLCBcIiNGQ0ZDRkNcIiwgXCIjRkFGQUZBXCIsIFwiI0ZBRkFEMiBcIiwgXCIjRkFGMEU2XCIsIFwiI0ZBRUJEN1wiLCBcIiNGQTgwNzJcIiwgXCIjRjhGOEZGIFwiLCBcIiNGN0Y3RjdcIiwgXCIjRjVGRkZBXCIsIFwiI0Y1RjVGNVwiLCBcIiNGNUY1REMgXCIsIFwiI0Y1REVCM1wiLCBcIiNGNEY0RjRcIiwgXCIjRjRBNDYwXCIsIFwiI0YyRjJGMiBcIiwgXCIjRjBGRkZGXCIsIFwiI0YwRkZGMFwiLCBcIiNGMEY4RkZcIiwgXCIjRjBGMEYwIFwiLCBcIiNGMEU2OENcIiwgXCIjRjA4MDgwXCIsIFwiI0VFRUVFMFwiLCBcIiNFRUVFRDEgXCIsIFwiI0VFRUUwMFwiLCBcIiNFRUU5RTlcIiwgXCIjRUVFOUJGXCIsIFwiI0VFRThDRCBcIiwgXCIjRUVFOEFBXCIsIFwiI0VFRTY4NVwiLCBcIiNFRUU1REVcIiwgXCIjRUVFMEU1IFwiLCBcIiNFRURGQ0NcIiwgXCIjRUVEQzgyXCIsIFwiI0VFRDhBRVwiLCBcIiNFRUQ1RDIgXCIsIFwiI0VFRDVCN1wiLCBcIiNFRUQyRUVcIiwgXCIjRUVDRkExXCIsIFwiI0VFQ0JBRCBcIiwgXCIjRUVDOTAwXCIsIFwiI0VFQzU5MVwiLCBcIiNFRUI0QjRcIiwgXCIjRUVCNDIyIFwiLCBcIiNFRUFFRUVcIiwgXCIjRUVBRDBFXCIsIFwiI0VFQTlCOFwiLCBcIiNFRUEyQUQgXCIsIFwiI0VFOUE0OVwiLCBcIiNFRTlBMDBcIiwgXCIjRUU5NTcyXCIsIFwiI0VFODJFRSBcIiwgXCIjRUU4MjYyXCIsIFwiI0VFN0FFOVwiLCBcIiNFRTc5OUZcIiwgXCIjRUU3OTQyIFwiLCBcIiNFRTc2MjFcIiwgXCIjRUU3NjAwXCIsIFwiI0VFNkFBN1wiLCBcIiNFRTZBNTAgXCIsIFwiI0VFNjM2M1wiLCBcIiNFRTVDNDJcIiwgXCIjRUU0MDAwXCIsIFwiI0VFM0IzQiBcIiwgXCIjRUUzQThDXCIsIFwiI0VFMzBBN1wiLCBcIiNFRTJDMkNcIiwgXCIjRUUxMjg5IFwiLCBcIiNFRTAwRUVcIiwgXCIjRUUwMDAwXCIsIFwiI0VERURFRFwiLCBcIiNFQkVCRUIgXCIsIFwiI0VBRUFFQVwiLCBcIiNFOTk2N0FcIiwgXCIjRThFOEU4XCIsIFwiI0U2RTZGQSBcIiwgXCIjRTVFNUU1XCIsIFwiI0UzRTNFM1wiLCBcIiNFMEZGRkZcIiwgXCIjRTBFRUVFIFwiLCBcIiNFMEVFRTBcIiwgXCIjRTBFMEUwXCIsIFwiI0UwNjZGRlwiLCBcIiNERURFREUgXCIsIFwiI0RFQjg4N1wiLCBcIiNEREEwRERcIiwgXCIjRENEQ0RDXCIsIFwiI0RDMTQzQyBcIiwgXCIjREJEQkRCXCIsIFwiI0RCNzA5M1wiLCBcIiNEQUE1MjBcIiwgXCIjREE3MEQ2IFwiLCBcIiNEOUQ5RDlcIiwgXCIjRDhCRkQ4XCIsIFwiI0Q2RDZENlwiLCBcIiNENEQ0RDQgXCIsIFwiI0QzRDNEM1wiLCBcIiNEMkI0OENcIiwgXCIjRDI2OTFFXCIsIFwiI0QxRUVFRSBcIiwgXCIjRDFEMUQxXCIsIFwiI0QxNUZFRVwiLCBcIiNEMDIwOTBcIiwgXCIjQ0ZDRkNGIFwiLCBcIiNDRENEQzFcIiwgXCIjQ0RDREI0XCIsIFwiI0NEQ0QwMFwiLCBcIiNDREM5QzkgXCIsIFwiI0NEQzlBNVwiLCBcIiNDREM4QjFcIiwgXCIjQ0RDNjczXCIsIFwiI0NEQzVCRiBcIiwgXCIjQ0RDMUM1XCIsIFwiI0NEQzBCMFwiLCBcIiNDREJFNzBcIiwgXCIjQ0RCQTk2IFwiLCBcIiNDREI3QjVcIiwgXCIjQ0RCNzlFXCIsIFwiI0NEQjVDRFwiLCBcIiNDREIzOEIgXCIsIFwiI0NEQUY5NVwiLCBcIiNDREFEMDBcIiwgXCIjQ0RBQTdEXCIsIFwiI0NEOUI5QiBcIiwgXCIjQ0Q5QjFEXCIsIFwiI0NEOTZDRFwiLCBcIiNDRDk1MENcIiwgXCIjQ0Q5MTlFIFwiLCBcIiNDRDhDOTVcIiwgXCIjQ0Q4NTNGXCIsIFwiI0NEODUwMFwiLCBcIiNDRDgxNjIgXCIsIFwiI0NENzA1NFwiLCBcIiNDRDY5QzlcIiwgXCIjQ0Q2ODg5XCIsIFwiI0NENjgzOSBcIiwgXCIjQ0Q2NjFEXCIsIFwiI0NENjYwMFwiLCBcIiNDRDYwOTBcIiwgXCIjQ0Q1QzVDIFwiLCBcIiNDRDVCNDVcIiwgXCIjQ0Q1NTU1XCIsIFwiI0NENEYzOVwiLCBcIiNDRDM3MDAgXCIsIFwiI0NEMzMzM1wiLCBcIiNDRDMyNzhcIiwgXCIjQ0QyOTkwXCIsIFwiI0NEMjYyNiBcIiwgXCIjQ0QxMDc2XCIsIFwiI0NEMDBDRFwiLCBcIiNDRDAwMDBcIiwgXCIjQ0NDQ0NDIFwiLCBcIiNDQUZGNzBcIiwgXCIjQ0FFMUZGXCIsIFwiI0M5QzlDOVwiLCBcIiNDN0M3QzcgXCIsIFwiI0M3MTU4NVwiLCBcIiNDNkUyRkZcIiwgXCIjQzY3MTcxXCIsIFwiI0M1QzFBQSBcIiwgXCIjQzRDNEM0XCIsIFwiI0MyQzJDMlwiLCBcIiNDMUZGQzFcIiwgXCIjQzFDRENEIFwiLCBcIiNDMUNEQzFcIiwgXCIjQzFDMUMxXCIsIFwiI0MwRkYzRVwiLCBcIiNCRkVGRkYgXCIsIFwiI0JGQkZCRlwiLCBcIiNCRjNFRkZcIiwgXCIjQkVCRUJFXCIsIFwiI0JEQkRCRCBcIiwgXCIjQkRCNzZCXCIsIFwiI0JDRUU2OFwiLCBcIiNCQ0QyRUVcIiwgXCIjQkM4RjhGIFwiLCBcIiNCQkZGRkZcIiwgXCIjQkFCQUJBXCIsIFwiI0JBNTVEM1wiLCBcIiNCOUQzRUUgXCIsIFwiI0I4QjhCOFwiLCBcIiNCODg2MEJcIiwgXCIjQjdCN0I3XCIsIFwiI0I1QjVCNSBcIiwgXCIjQjRFRUI0XCIsIFwiI0I0Q0RDRFwiLCBcIiNCNDUyQ0RcIiwgXCIjQjNFRTNBIFwiLCBcIiNCM0IzQjNcIiwgXCIjQjJERkVFXCIsIFwiI0IyM0FFRVwiLCBcIiNCMjIyMjIgXCIsIFwiI0IwRTJGRlwiLCBcIiNCMEUwRTZcIiwgXCIjQjBDNERFXCIsIFwiI0IwQjBCMCBcIiwgXCIjQjAzMDYwXCIsIFwiI0FFRUVFRVwiLCBcIiNBREZGMkZcIiwgXCIjQUREOEU2IFwiLCBcIiNBREFEQURcIiwgXCIjQUJBQkFCXCIsIFwiI0FCODJGRlwiLCBcIiNBQUFBQUEgXCIsIFwiI0E5QTlBOVwiLCBcIiNBOEE4QThcIiwgXCIjQTZBNkE2XCIsIFwiI0E1MkEyQSBcIiwgXCIjQTREM0VFXCIsIFwiI0EzQTNBM1wiLCBcIiNBMkNENUFcIiwgXCIjQTJCNUNEIFwiLCBcIiNBMUExQTFcIiwgXCIjQTA1MjJEXCIsIFwiI0EwMjBGMFwiLCBcIiM5RkI2Q0QgXCIsIFwiIzlGNzlFRVwiLCBcIiM5RTlFOUVcIiwgXCIjOUM5QzlDXCIsIFwiIzlCQ0Q5QiBcIiwgXCIjOUIzMEZGXCIsIFwiIzlBRkY5QVwiLCBcIiM5QUNEMzJcIiwgXCIjOUFDMENEIFwiLCBcIiM5QTMyQ0RcIiwgXCIjOTk5OTk5XCIsIFwiIzk5MzJDQ1wiLCBcIiM5OEZCOTggXCIsIFwiIzk4RjVGRlwiLCBcIiM5N0ZGRkZcIiwgXCIjOTZDRENEXCIsIFwiIzk2OTY5NiBcIiwgXCIjOTQ5NDk0XCIsIFwiIzk0MDBEM1wiLCBcIiM5MzcwREJcIiwgXCIjOTE5MTkxIFwiLCBcIiM5MTJDRUVcIiwgXCIjOTBFRTkwXCIsIFwiIzhGQkM4RlwiLCBcIiM4RjhGOEYgXCIsIFwiIzhFRTVFRVwiLCBcIiM4RThFOEVcIiwgXCIjOEU4RTM4XCIsIFwiIzhFMzg4RSBcIiwgXCIjOERFRUVFXCIsIFwiIzhEQjZDRFwiLCBcIiM4QzhDOENcIiwgXCIjOEI4QjgzIFwiLCBcIiM4QjhCN0FcIiwgXCIjOEI4QjAwXCIsIFwiIzhCODk4OVwiLCBcIiM4Qjg5NzAgXCIsIFwiIzhCODg3OFwiLCBcIiM4Qjg2ODJcIiwgXCIjOEI4NjRFXCIsIFwiIzhCODM4NiBcIiwgXCIjOEI4Mzc4XCIsIFwiIzhCODE0Q1wiLCBcIiM4QjdFNjZcIiwgXCIjOEI3RDdCIFwiLCBcIiM4QjdENkJcIiwgXCIjOEI3QjhCXCIsIFwiIzhCNzk1RVwiLCBcIiM4Qjc3NjUgXCIsIFwiIzhCNzUwMFwiLCBcIiM4QjczNTVcIiwgXCIjOEI2OTY5XCIsIFwiIzhCNjkxNCBcIiwgXCIjOEI2NjhCXCIsIFwiIzhCNjUwOFwiLCBcIiM4QjYzNkNcIiwgXCIjOEI1RjY1IFwiLCBcIiM4QjVBMkJcIiwgXCIjOEI1QTAwXCIsIFwiIzhCNTc0MlwiLCBcIiM4QjRDMzkgXCIsIFwiIzhCNDc4OVwiLCBcIiM4QjQ3NURcIiwgXCIjOEI0NzI2XCIsIFwiIzhCNDUxMyBcIiwgXCIjOEI0NTAwXCIsIFwiIzhCM0UyRlwiLCBcIiM4QjNBNjJcIiwgXCIjOEIzQTNBIFwiLCBcIiM4QjM2MjZcIiwgXCIjOEIyNTAwXCIsIFwiIzhCMjMyM1wiLCBcIiM4QjIyNTIgXCIsIFwiIzhCMUM2MlwiLCBcIiM4QjFBMUFcIiwgXCIjOEIwQTUwXCIsIFwiIzhCMDA4QiBcIiwgXCIjOEIwMDAwXCIsIFwiIzhBOEE4QVwiLCBcIiM4QTJCRTJcIiwgXCIjODk2OENEIFwiLCBcIiM4N0NFRkZcIiwgXCIjODdDRUZBXCIsIFwiIzg3Q0VFQlwiLCBcIiM4Nzg3ODcgXCIsIFwiIzg1ODU4NVwiLCBcIiM4NDg0ODRcIiwgXCIjODQ3MEZGXCIsIFwiIzgzOEI4QiBcIiwgXCIjODM4QjgzXCIsIFwiIzgzNkZGRlwiLCBcIiM4MjgyODJcIiwgXCIjN0ZGRkQ0IFwiLCBcIiM3RkZGMDBcIiwgXCIjN0Y3RjdGXCIsIFwiIzdFQzBFRVwiLCBcIiM3RDlFQzAgXCIsIFwiIzdEN0Q3RFwiLCBcIiM3RDI2Q0RcIiwgXCIjN0NGQzAwXCIsIFwiIzdDQ0Q3QyBcIiwgXCIjN0I2OEVFXCIsIFwiIzdBQzVDRFwiLCBcIiM3QThCOEJcIiwgXCIjN0E3QTdBIFwiLCBcIiM3QTY3RUVcIiwgXCIjN0EzNzhCXCIsIFwiIzc5Q0RDRFwiLCBcIiM3ODc4NzggXCIsIFwiIzc3ODg5OVwiLCBcIiM3NkVFQzZcIiwgXCIjNzZFRTAwXCIsIFwiIzc1NzU3NSBcIiwgXCIjNzM3MzczXCIsIFwiIzcxQzY3MVwiLCBcIiM3MTcxQzZcIiwgXCIjNzA4MDkwIFwiLCBcIiM3MDcwNzBcIiwgXCIjNkU4QjNEXCIsIFwiIzZFN0I4QlwiLCBcIiM2RTZFNkUgXCIsIFwiIzZDQTZDRFwiLCBcIiM2QzdCOEJcIiwgXCIjNkI4RTIzXCIsIFwiIzZCNkI2QiBcIiwgXCIjNkE1QUNEXCIsIFwiIzY5OEI2OVwiLCBcIiM2OThCMjJcIiwgXCIjNjk2OTY5IFwiLCBcIiM2OTU5Q0RcIiwgXCIjNjg4MzhCXCIsIFwiIzY4MjI4QlwiLCBcIiM2NkNEQUEgXCIsIFwiIzY2Q0QwMFwiLCBcIiM2NjhCOEJcIiwgXCIjNjY2NjY2XCIsIFwiIzY0OTVFRCBcIiwgXCIjNjNCOEZGXCIsIFwiIzYzNjM2M1wiLCBcIiM2MTYxNjFcIiwgXCIjNjA3QjhCIFwiLCBcIiM1RjlFQTBcIiwgXCIjNUU1RTVFXCIsIFwiIzVENDc4QlwiLCBcIiM1Q0FDRUUgXCIsIFwiIzVDNUM1Q1wiLCBcIiM1QjVCNUJcIiwgXCIjNTk1OTU5XCIsIFwiIzU3NTc1NyBcIiwgXCIjNTU2QjJGXCIsIFwiIzU1NTU1NVwiLCBcIiM1NTFBOEJcIiwgXCIjNTRGRjlGIFwiLCBcIiM1NDhCNTRcIiwgXCIjNTQ1NDU0XCIsIFwiIzUzODY4QlwiLCBcIiM1MjhCOEIgXCIsIFwiIzUyNTI1MlwiLCBcIiM1MTUxNTFcIiwgXCIjNEY5NENEXCIsIFwiIzRGNEY0RiBcIiwgXCIjNEVFRTk0XCIsIFwiIzRENEQ0RFwiLCBcIiM0QjAwODJcIiwgXCIjNEE3MDhCIFwiLCBcIiM0QTRBNEFcIiwgXCIjNDhEMUNDXCIsIFwiIzQ4NzZGRlwiLCBcIiM0ODNEOEIgXCIsIFwiIzQ3NDc0N1wiLCBcIiM0NzNDOEJcIiwgXCIjNDY4MkI0XCIsIFwiIzQ1OEI3NCBcIiwgXCIjNDU4QjAwXCIsIFwiIzQ1NDU0NVwiLCBcIiM0M0NEODBcIiwgXCIjNDM2RUVFIFwiLCBcIiM0MjQyNDJcIiwgXCIjNDE2OUUxXCIsIFwiIzQwRTBEMFwiLCBcIiM0MDQwNDAgXCIsIFwiIzNEM0QzRFwiLCBcIiMzQ0IzNzFcIiwgXCIjM0IzQjNCXCIsIFwiIzNBNUZDRCBcIiwgXCIjMzg4RThFXCIsIFwiIzM4MzgzOFwiLCBcIiMzNjY0OEJcIiwgXCIjMzYzNjM2IFwiLCBcIiMzMzMzMzNcIiwgXCIjMzJDRDMyXCIsIFwiIzMwMzAzMFwiLCBcIiMyRjRGNEYgXCIsIFwiIzJFOEI1N1wiLCBcIiMyRTJFMkVcIiwgXCIjMkIyQjJCXCIsIFwiIzI5MjkyOSBcIiwgXCIjMjgyODI4XCIsIFwiIzI3NDA4QlwiLCBcIiMyNjI2MjZcIiwgXCIjMjQyNDI0IFwiLCBcIiMyMjhCMjJcIiwgXCIjMjE4ODY4XCIsIFwiIzIxMjEyMVwiLCBcIiMyMEIyQUEgXCIsIFwiIzFGMUYxRlwiLCBcIiMxRTkwRkZcIiwgXCIjMUUxRTFFXCIsIFwiIzFDODZFRSBcIiwgXCIjMUMxQzFDXCIsIFwiIzFBMUExQVwiLCBcIiMxOTE5NzBcIiwgXCIjMTg3NENEIFwiLCBcIiMxNzE3MTdcIiwgXCIjMTQxNDE0XCIsIFwiIzEyMTIxMlwiLCBcIiMxMDRFOEIgXCIsIFwiIzBGMEYwRlwiLCBcIiMwRDBEMERcIiwgXCIjMEEwQTBBXCIsIFwiIzA4MDgwOCBcIiwgXCIjMDUwNTA1XCIsIFwiIzAzMDMwM1wiLCBcIiMwMEZGRkZcIiwgXCIjMDBGRjdGIFwiLCBcIiMwMEZGMDBcIiwgXCIjMDBGQTlBXCIsIFwiIzAwRjVGRlwiLCBcIiMwMEVFRUUgXCIsIFwiIzAwRUU3NlwiLCBcIiMwMEVFMDBcIiwgXCIjMDBFNUVFXCIsIFwiIzAwQ0VEMSBcIiwgXCIjMDBDRENEXCIsIFwiIzAwQ0Q2NlwiLCBcIiMwMENEMDBcIiwgXCIjMDBDNUNEIFwiLCBcIiMwMEJGRkZcIiwgXCIjMDBCMkVFXCIsIFwiIzAwOUFDRFwiLCBcIiMwMDhCOEIgXCIsIFwiIzAwOEI0NVwiLCBcIiMwMDhCMDBcIiwgXCIjMDA4NjhCXCIsIFwiIzAwNjg4QiBcIiwgXCIjMDA2NDAwXCIsIFwiIzAwMDBGRlwiLCBcIiMwMDAwRUVcIiwgXCIjMDAwMENEIFwiLCBcIiMwMDAwQUFcIiwgXCIjMDAwMDhCXCIsIFwiIzAwMDA4MFwiXTtcbiAgICAgICAgcHVibGljIHN0YXRpYyBuZXh0Q29sb3IoKTpzdHJpbmd7XG4gICAgICAgICAgICByZXR1cm4gQ29sb3JVdGlscy5Db2xvcltDb2xvclV0aWxzLl9jb2xvcmluZGV4KyslQ29sb3JVdGlscy5Db2xvci5sZW5ndGggXTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc3RhdGljIGluZGV4Q29sb3IoaW5kZXg6bnVtYmVyKXtcbiAgICAgICAgICAgIHJldHVybiBDb2xvclV0aWxzLkNvbG9yW2luZGV4JUNvbG9yVXRpbHMuQ29sb3IubGVuZ3RoIF07XG4gICAgICAgIH1cblxuICAgICAgIHN0YXRpYyBncmFkaWVudENvbG9yKHN0YXJ0Q29sb3I6IHN0cmluZywgZW5kQ29sb3I6IHN0cmluZywgc3RlcDpudW1iZXIpIHtcbiAgICAgICAgICAgIGxldCBzdGFydFJHQiA9IENvbG9yVXRpbHMuY29sb3JSZ2Ioc3RhcnRDb2xvcik7Ly/ovazmjaLkuLpyZ2LmlbDnu4TmqKHlvI9cbiAgICAgICAgICAgIGxldCBzdGFydFIgPSBzdGFydFJHQlswXTtcbiAgICAgICAgICAgIGxldCBzdGFydEcgPSBzdGFydFJHQlsxXTtcbiAgICAgICAgICAgIGxldCBzdGFydEIgPSBzdGFydFJHQlsyXTtcblxuICAgICAgICAgICAgbGV0IGVuZFJHQiA9IENvbG9yVXRpbHMuY29sb3JSZ2IoZW5kQ29sb3IpO1xuICAgICAgICAgICAgbGV0IGVuZFIgPSBlbmRSR0JbMF07XG4gICAgICAgICAgICBsZXQgZW5kRyA9IGVuZFJHQlsxXTtcbiAgICAgICAgICAgIGxldCBlbmRCID0gZW5kUkdCWzJdO1xuXG4gICAgICAgICAgICBsZXQgc1IgPSAoZW5kUiAtIHN0YXJ0UikgLyBzdGVwOy8v5oC75beu5YC8XG4gICAgICAgICAgICBsZXQgc0cgPSAoZW5kRyAtIHN0YXJ0RykgLyBzdGVwO1xuICAgICAgICAgICAgbGV0IHNCID0gKGVuZEIgLSBzdGFydEIpIC8gc3RlcDtcblxuICAgICAgICAgICAgdmFyIGNvbG9yQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ZXA7IGkrKykge1xuICAgICAgICAgICAgICAgIC8v6K6h566X5q+P5LiA5q2l55qEaGV45YC8IFxuICAgICAgICAgICAgICAgIHZhciBoZXggPSBDb2xvclV0aWxzLmNvbG9ySGV4KCdyZ2IoJyArIHBhcnNlSW50KChzUiAqIGkgKyBzdGFydFIpKSArICcsJyArIHBhcnNlSW50KChzRyAqIGkgKyBzdGFydEcpKSArICcsJyArIHBhcnNlSW50KChzQiAqIGkgKyBzdGFydEIpKSArICcpJyk7XG4gICAgICAgICAgICAgICAgY29sb3JBcnIucHVzaChoZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbG9yQXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGdldENvbG9yKHN0YXJ0Q29sb3I6c3RyaW5nLCBlbmRDb2xvcjpzdHJpbmcsdmFsdWU6bnVtYmVyLHN0YXJ0Om51bWJlcixlbmQ6bnVtYmVyKTpzdHJpbmd7XG4gICAgICAgICAgICBsZXQgc3RhcnRSR0IgPSBDb2xvclV0aWxzLmNvbG9yUmdiKHN0YXJ0Q29sb3IpOy8v6L2s5o2i5Li6cmdi5pWw57uE5qih5byPXG4gICAgICAgICAgICBsZXQgc3RhcnRSID0gc3RhcnRSR0JbMF07XG4gICAgICAgICAgICBsZXQgc3RhcnRHID0gc3RhcnRSR0JbMV07XG4gICAgICAgICAgICBsZXQgc3RhcnRCID0gc3RhcnRSR0JbMl07XG5cbiAgICAgICAgICAgIGxldCBlbmRSR0IgPSBDb2xvclV0aWxzLmNvbG9yUmdiKGVuZENvbG9yKTtcbiAgICAgICAgICAgIGxldCBlbmRSID0gZW5kUkdCWzBdO1xuICAgICAgICAgICAgbGV0IGVuZEcgPSBlbmRSR0JbMV07XG4gICAgICAgICAgICBsZXQgZW5kQiA9IGVuZFJHQlsyXTtcblxuICAgICAgICAgICAgbGV0IHNSID0gKGVuZFIgLSBzdGFydFIpIC8gKGVuZC1zdGFydCk7Ly/mgLvlt67lgLxcbiAgICAgICAgICAgIGxldCBzRyA9IChlbmRHIC0gc3RhcnRHKSAvIChlbmQtc3RhcnQpO1xuICAgICAgICAgICAgbGV0IHNCID0gKGVuZEIgLSBzdGFydEIpIC8gKGVuZC1zdGFydCk7XG4gICAgICAgICAgICB2YXIgaGV4ID0gQ29sb3JVdGlscy5jb2xvckhleCgncmdiKCcgKyBwYXJzZUludCgoc1IgKiB2YWx1ZSArIHN0YXJ0UikpICsgJywnICsgcGFyc2VJbnQoKHNHICogdmFsdWUgKyBzdGFydEcpKSArICcsJyArIHBhcnNlSW50KChzQiAqIHZhbHVlICsgc3RhcnRCKSkgKyAnKScpO1xuICAgICAgICAgICAgcmV0dXJuIGhleDtcbiAgICAgICAgfVxuXG5cbiAgICAgIHN0YXRpYyAgY29sb3JSZ2Ioc0NvbG9yOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciByZWcgPSAvXiMoWzAtOWEtZkEtZl17M318WzAtOWEtZkEtZl17Nn0pJC87XG4gICAgICAgICAgICB2YXIgc0NvbG9yID0gc0NvbG9yLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoc0NvbG9yICYmIHJlZy50ZXN0KHNDb2xvcikpIHtcbiAgICAgICAgICAgICAgICBpZiAoc0NvbG9yLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc0NvbG9yTmV3ID0gXCIjXCI7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzQ29sb3JOZXcgKz0gc0NvbG9yLnNsaWNlKGksIGkgKyAxKS5jb25jYXQoc0NvbG9yLnNsaWNlKGksIGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc0NvbG9yID0gc0NvbG9yTmV3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+WkhOeQhuWFreS9jeeahOminOiJsuWAvFxuICAgICAgICAgICAgICAgIHZhciBzQ29sb3JDaGFuZ2UgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDc7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICBzQ29sb3JDaGFuZ2UucHVzaChwYXJzZUludChcIjB4XCIgKyBzQ29sb3Iuc2xpY2UoaSwgaSArIDIpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzQ29sb3JDaGFuZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBzQ29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlsIZyZ2LooajnpLrmlrnlvI/ovazmjaLkuLpoZXjooajnpLrmlrnlvI9cbiAgICAgIHN0YXRpYyAgY29sb3JIZXgocmdiOiBhbnkpIHtcbiAgICAgICAgICAgIGxldCBfdGhpc3M6IGFueSA9IHJnYjtcbiAgICAgICAgICAgIHZhciByZWcgPSAvXiMoWzAtOWEtZkEtZl17M318WzAtOWEtZkEtZl17Nn0pJC87XG4gICAgICAgICAgICBpZiAoL14ocmdifFJHQikvLnRlc3QoX3RoaXNzKSkge1xuICAgICAgICAgICAgICAgIHZhciBhQ29sb3IgPSBfdGhpc3MucmVwbGFjZSgvKD86KHwpfHJnYnxSR0IpKi9nLCBcIlwiKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgdmFyIHN0ckhleCA9IFwiI1wiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYUNvbG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBoZXg6IGFueSA9IE51bWJlcihhQ29sb3JbaV0pLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICAgICAgaGV4ID0gaGV4IDwgMTAgPyAwICsgJycgKyBoZXggOiBoZXg7Ly8g5L+d6K+B5q+P5Liqcmdi55qE5YC85Li6MuS9jVxuICAgICAgICAgICAgICAgICAgICBpZiAoaGV4ID09PSBcIjBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGV4ICs9IGhleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHJIZXggKz0gaGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RySGV4Lmxlbmd0aCAhPT0gNykge1xuICAgICAgICAgICAgICAgICAgICBzdHJIZXggPSBfdGhpc3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJIZXg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlZy50ZXN0KF90aGlzcykpIHtcbiAgICAgICAgICAgICAgICB2YXIgYU51bSA9IF90aGlzcy5yZXBsYWNlKC8jLywgXCJcIikuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICAgICAgaWYgKGFOdW0ubGVuZ3RoID09PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpc3M7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhTnVtLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtSGV4ID0gXCIjXCI7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYU51bS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtSGV4ICs9IChhTnVtW2ldICsgYU51bVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bUhleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIFxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgZXhwb3J0IGNsYXNzIFJvdGF0ZVJlY3Qge1xuICAgICAgICBwdWJsaWMgYW5nbGU6IG51bWJlcjtcbiAgICAgICAgcHVibGljIGNlbnRlcng6IG51bWJlcjtcbiAgICAgICAgcHVibGljIGNlbnRlcnk6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcbiAgICAgICAgcHVibGljIHBvaW50czogUG9pbnRbXTtcbiAgICAgICAgY29uc3RydWN0b3IoY2VudGVyeDogbnVtYmVyLCBjZW50ZXJ5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBhbmdsZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcnggPSBjZW50ZXJ4O1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJ5ID0gY2VudGVyeTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5wb2ludHMgPSBbbmV3IFBvaW50KCksIG5ldyBQb2ludCgpLCBuZXcgUG9pbnQoKSwgbmV3IFBvaW50KCksIG5ldyBQb2ludCgpLCBuZXcgUG9pbnQoKSwgbmV3IFBvaW50KCksIG5ldyBQb2ludCgpLCBuZXcgUG9pbnQoKV07XG4gICAgICAgICAgICBsZXQgbHQgPSB0aGlzLnBvaW50c1swXTtcbiAgICAgICAgICAgIGxldCBydCA9IHRoaXMucG9pbnRzWzFdO1xuICAgICAgICAgICAgbGV0IHJiID0gdGhpcy5wb2ludHNbMl07XG4gICAgICAgICAgICBsZXQgbGIgPSB0aGlzLnBvaW50c1szXTtcbiAgICAgICAgICAgIGxldCBjdCA9IHRoaXMucG9pbnRzWzRdO1xuICAgICAgICAgICAgbGV0IGNiID0gdGhpcy5wb2ludHNbNV07XG5cbiAgICAgICAgICAgIGxldCBjbCA9IHRoaXMucG9pbnRzWzZdO1xuICAgICAgICAgICAgbGV0IGNyID0gdGhpcy5wb2ludHNbN107XG5cbiAgICAgICAgICAgIGNyLnggPSB0aGlzLmNlbnRlcnggKyBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMud2lkdGggLyAyO1xuICAgICAgICAgICAgY3IueSA9IHRoaXMuY2VudGVyeSArIE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy53aWR0aCAvIDI7XG5cbiAgICAgICAgICAgIGNsLnggPSAyICogdGhpcy5jZW50ZXJ4IC0gY3IueDtcbiAgICAgICAgICAgIGNsLnkgPSAyICogdGhpcy5jZW50ZXJ5IC0gY3IueTtcblxuICAgICAgICAgICAgcnQueCA9IGNyLnggKyBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIHJ0LnkgPSBjci55IC0gTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLmhlaWdodCAvIDI7XG4gICAgICAgICAgICByYi54ID0gMiAqIGNyLnggLSBydC54O1xuICAgICAgICAgICAgcmIueSA9IDIgKiBjci55IC0gcnQueTtcblxuICAgICAgICAgICAgbGIueCA9IGNsLnggLSBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIGxiLnkgPSBjbC55ICsgTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLmhlaWdodCAvIDI7XG5cbiAgICAgICAgICAgIGx0LnggPSAyICogY2wueCAtIGxiLng7XG4gICAgICAgICAgICBsdC55ID0gMiAqIGNsLnkgLSBsYi55O1xuXG4gICAgICAgICAgICBjYi54ID0gKGxiLnggKyByYi54KS8yO1xuICAgICAgICAgICAgY2IueSA9IChsYi55ICsgcmIueSkvMjtcbiAgICAgICAgICAgIGN0LnggPSAobHQueCArIHJ0LngpLzI7XG4gICAgICAgICAgICBjdC55ID0obHQueSArIHJ0LnkpLzI7XG5cbiAgICAgICAgICAgIGxldCBjZW50ZXIgPSB0aGlzLnBvaW50c1s4XTtcbiAgICAgICAgICAgIGNlbnRlci54ID0gdGhpcy5jZW50ZXJ4O1xuICAgICAgICAgICAgY2VudGVyLnkgPSB0aGlzLmNlbnRlcnk7XG5cblxuICAgICAgICB9XG4gICAgICAgIGdldCByYWlkaXVzKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuY2VudGVyLnggLSB0aGlzLmxlZnRUb3AueCwgMikgKyBNYXRoLnBvdyh0aGlzLmNlbnRlci55IC0gdGhpcy5sZWZ0VG9wLnksIDIpKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgb2Zmc2V0KHg6IG51bWJlciwgeTogbnVtYmVyLCBhbmdsZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB0OiBQb2ludCA9IHRoaXMucG9pbnRzW2ldO1xuICAgICAgICAgICAgICAgIHB0LnggKz0geCAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgICAgICBwdC55ICs9IHkgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGxlZnRUb3AoKTogUG9pbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGdldCByaWdodFRvcCgpOiBQb2ludCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHNbMV07XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGxlZnRCb3R0b20oKTogUG9pbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzWzNdO1xuICAgICAgICB9XG4gICAgICAgIGdldCByaWdodEJvdHRvbSgpOiBQb2ludCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHNbMl07XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgY2VudGVyVG9wKCk6IFBvaW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50c1s0XTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgY2VudGVyQm90dG9tKCk6IFBvaW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50c1s1XTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgY2VudGVyKCk6IFBvaW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50c1s4XTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgc3RhcnRQb2ludCgpOiBQb2ludCB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMuY2VudGVyeCwgdGhpcy5jZW50ZXJ5KTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIFJvdGF0ZUxpbmUge1xuICAgICAgICBwdWJsaWMgc3RhcnRQb2ludDogUG9pbnQ7XG4gICAgICAgIHB1YmxpYyBlbmRQb2ludDogUG9pbnQ7XG4gICAgICAgIHByaXZhdGUgX2FuZ2xlOiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2N4OiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2N5OiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2xlZnR3aWR0aDogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9yaWdodHdpZHRoOiBudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIGxlZnR3aWR0aDogbnVtYmVyLCByaWdodHdpZHRoOiBudW1iZXIsIGFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N4ID0gY3g7XG4gICAgICAgICAgICB0aGlzLl9jeSA9IGN5O1xuICAgICAgICAgICAgdGhpcy5fbGVmdHdpZHRoID0gbGVmdHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5fcmlnaHR3aWR0aCA9IHJpZ2h0d2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9hbmdsZSA9IGFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5lbmRQb2ludCA9IG5ldyBQb2ludCgpO1xuICAgICAgICAgICAgdGhpcy5lbmRQb2ludC54ID0gY3ggKyBNYXRoLnNpbih0aGlzLl9hbmdsZSkgKiByaWdodHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5lbmRQb2ludC55ID0gY3kgLSBNYXRoLmNvcyh0aGlzLl9hbmdsZSkgKiByaWdodHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5zdGFydFBvaW50ID0gbmV3IFBvaW50KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9pbnQueCA9IGN4IC0gTWF0aC5zaW4odGhpcy5fYW5nbGUpICogbGVmdHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5zdGFydFBvaW50LnkgPSBjeSArIE1hdGguY29zKHRoaXMuX2FuZ2xlKSAqIGxlZnR3aWR0aDtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGVudW0gQW5pbWF0aW9uVHlwZXtcbiAgICAgICAgV2lkdGgsXG4gICAgICAgIEhlaWdodCxcbiAgICAgICAgU2l6ZSxcbiAgICAgICAgUmFkaXVzLFxuICAgICAgICBTd2VlcCxcbiAgICAgICAgQWxwaGFcbiAgICB9XG59IiwiXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgZW51bSBBZ2cge1xuICAgICAgICBTVU0sXG4gICAgICAgIEFWRVJBR0UsXG4gICAgICAgIENPVU5ULFxuICAgICAgICBOT05FXG4gICAgfVxuICAgXG59IiwiXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgZW51bSBPcmRlciB7XG4gICAgICAgIERlc2MsXG4gICAgICAgIEFzYyxcbiAgICAgICAgTm9uZVxuICAgIH1cbiAgIFxufSIsIlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGVudW0gU2NhbGVUeXBlIHtcbiAgICAgICAgTGluZWFyLFxuICAgICAgICBMb2csXG4gICAgICAgIE9yZGluYWxcblxuICAgIH1cbiAgICBcbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgIGV4cG9ydCBlbnVtIERhdGFUeXBle1xuICAgICAgICBOdW1iZXIsXG4gICAgICAgIFN0cmluZyxcbiAgICAgICAgT2JqZWN0LFxuICAgICAgICBBcnJheSxcbiAgICAgICAgQm9vbGVhbixcbiAgICAgICAgRGF0ZSAgIFxuICAgIH1cbn0iLCJcblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBlbnVtIENoYXJ0VHlwZSB7XG4gICAgICAgIEJhcixcbiAgICAgICAgTGluZSxcbiAgICAgICAgU2NhdHRlcixcbiAgICAgICAgQXJlYSxcbiAgICAgICAgLy8gUmFkaWFsQmFyLFxuICAgICAgICAvLyBSYWRpYWxMaW5lLFxuICAgICAgICAvLyBSYWRpYWxTY2F0dGVyLFxuICAgICAgICAvLyBSYWRpYUFyZWEsXG4gICAgICAgIFBpZSxcbiAgICAgICAgU3VuYnVyc3QsXG4gICAgICAgIFRyZWVNYXAsXG4gICAgICAgIFJhZGFyLFxuICAgICAgICBDYW5kbGVzdGlja1xuICAgIH1cbiAgIFxufSIsIlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGVudW0gQXhpc1R5cGUge1xuICAgICAgICBYLFxuICAgICAgICBZXG4gICAgfVxuICAgIFxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBleHBvcnQgY2xhc3MgVmFsdWUge1xuICAgICAgICBfX3ByZVZhbDogYW55O1xuICAgICAgICBfX3ZhbDogYW55O1xuICAgICAgICBfX2RhdGFUeXBlOiBEYXRhVHlwZTtcbiAgICAgICAgX19uZXh0VmFsOiBhbnk7XG4gICAgICAgIF9fc2NhbGVUeXBlOiBTY2FsZVR5cGU7XG4gICAgICAgIF9faXNNdWx0aXBsZTogYm9vbGVhbjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih2OiBhbnksIHNjYWxlVHlwZTogU2NhbGVUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9fdmFsID0gdjtcbiAgICAgICAgICAgIGlmKHYgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2lzTXVsdGlwbGU9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9faXNNdWx0aXBsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fX3NjYWxlVHlwZSA9IHNjYWxlVHlwZTtcbiAgICAgICAgICAgIHRoaXMuX19kYXRhVHlwZSA9IFV0aWxpdHkuZ2V0VHlwZSh2KTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBnZXQgc2NhbGVUeXBlKCk6IFNjYWxlVHlwZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NjYWxlVHlwZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgZGF0YVR5cGUoKTogRGF0YVR5cGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19kYXRhVHlwZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogZm9yIHdoYXQgP1xuICAgICAgICAgKiBhcnJheSB2YWx1ZSBmb3IgaGlnaCBsb3cgb3BlbiBjbG9zZT9cbiAgICAgICAgICovXG4gICAgICAgIGdldCBpc011bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pc011bHRpcGxlO1xuICAgICAgICB9XG4gICAgICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX192YWw7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9lbnVtL0FnZy50c1wiIC8+XG5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgaW1wb3J0IFV0aWwgPSBhbmRyb2lkLmdyYXBoaWNzLlV0aWw7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBGaWVsZCB7XG4gICAgICAgIHB1YmxpYyBhZ2dyZWdhdGU6IEFnZztcbiAgICAgICAgcHVibGljIGJpbmQ6IHN0cmluZztcbiAgICAgICAgcHVibGljIG5hbWU6c3RyaW5nO1xuICAgICAgICBwdWJsaWMgdHlwZTpTY2FsZVR5cGU7XG4gICAgICAgIHB1YmxpYyBsb2dCYXNlOm51bWJlcjtcbiAgICAgICAgcHVibGljIHJhbmdlOmFueVtdO1xuICAgICAgICBwdWJsaWMgYmFuZDpib29sZWFuO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGJpbmQ6IGFueSxuYW1lOnN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5hZ2dyZWdhdGUgPSBVdGlsLmFzRW51bShiaW5kLmFnZ3JlZ2F0ZSxBZ2csdHJ1ZSk7XG4gICAgICAgICAgICBpZih0aGlzLmFnZ3JlZ2F0ZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFnZ3JlZ2F0ZSA9IEFnZy5OT05FO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5iaW5kID0gYmluZC5maWVsZDtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IFV0aWwuYXNFbnVtKGJpbmQudHlwZSxTY2FsZVR5cGUsdHJ1ZSk7XG4gICAgICAgICAgICBpZih0aGlzLnR5cGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gU2NhbGVUeXBlLk9yZGluYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvZ0Jhc2UgPWJpbmQubG9nQmFzZTtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB0aGlzLnJhbmdlID0gYmluZC5yYW5nZTtcbiAgICAgICAgICAgIHRoaXMuYmFuZCA9IGJpbmQuYmFuZDtcbiAgICAgICAgfVxuICAgICAgICBlcXVhbHMoZmllbGQ6RmllbGQpOmJvb2xlYW57XG4gICAgICAgICAgICAvLyByZXR1cm4gdGhpcy5hZ2dyZWdhdGUgPT0gZmllbGQuYWdncmVnYXRlXG4gICAgICAgICAgICAvLyAmJiB0aGlzLmJpbmQgPT0gZmllbGQuYmluZFxuICAgICAgICAgICAgLy8gJiYgdGhpcy5uYW1lID09IGZpZWxkLm5hbWVcbiAgICAgICAgICAgIC8vICYmIHRoaXMudHlwZSA9PSBmaWVsZC50eXBlXG4gICAgICAgICAgICAvLyAmJiB0aGlzLmxvZ0Jhc2UgPT0gZmllbGQubG9nQmFzZVxuICAgICAgICAgICAgLy8gJiYgdGhpcy5yYW5nZSA9PSBmaWVsZC5yYW5nZTtcbiAgICAgICAgICAgIHJldHVybiBfLmlzRXF1YWwodGhpcyxmaWVsZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxuXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIGltcG9ydCBVdGlsID0gYW5kcm9pZC5ncmFwaGljcy5VdGlsO1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgY2xhc3MgRmlsdGVyIHtcbiAgICAgICAgcHVibGljIHNlcmllczogc3RyaW5nW107XG4gICAgICAgIHB1YmxpYyBydWxlczogUnVsZVtdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHNlcmllczogc3RyaW5nLCBydWxlczogYW55KSB7XG4gICAgICAgICAgICB0aGlzLnNlcmllcyA9IHNlcmllcy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgaWYgKHJ1bGVzICE9IG51bGwgJiYgcnVsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHRoaXMucnVsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBydWxlIG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVsZXMucHVzaChuZXcgUnVsZShydWxlLmZpZWxkLCBydWxlLmV4cHJlc3MpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlcXVhbHMoZmllbGQ6IEZpZWxkKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gXy5pc0VxdWFsKHRoaXMsIGZpZWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgUnVsZSB7XG4gICAgICAgIHB1YmxpYyBleHByZXNzOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBmaWxlZDogc3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3RvcihmaWxlZDogc3RyaW5nLCBleHByZXNzOiBzdHJpbmcpIHtcblxuICAgICAgICAgICAgdGhpcy5maWxlZCA9IGZpbGVkO1xuICAgICAgICAgICAgdGhpcy5leHByZXNzID0gZXhwcmVzcztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0ZpZWxkLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgXG4gICAgZXhwb3J0IGNsYXNzIEVuY29kaW5nIHtcbiAgICAgICAgcHVibGljIHg6IEZpZWxkO1xuICAgICAgICBwdWJsaWMgeTogRmllbGQ7XG4gICAgICAgIHB1YmxpYyBjb2xvcjogRmllbGQ7XG4gICAgICAgIHB1YmxpYyBzaXplOiBGaWVsZDtcbiAgICAgICAgcHVibGljIHNoYXBlOiBGaWVsZDtcbiAgICAgICAgcHVibGljIGdyb3VwOiBGaWVsZDtcbiAgICAgICAgcHVibGljIHZhbHVlczpGaWVsZFtdO1xuICAgICAgICBwdWJsaWMgX3N0YWNrOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgcHVibGljIF9yYWRpYWw6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBjb25zdHJ1Y3RvcihlbmNvZGluZzogYW55KSB7XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmcueCkge1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IG5ldyBGaWVsZChlbmNvZGluZy54LCAneCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVuY29kaW5nLnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSBuZXcgRmllbGQoZW5jb2RpbmcueSwgJ3knKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbmNvZGluZy5jb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3IgPSBuZXcgRmllbGQoZW5jb2RpbmcuY29sb3IsICdjb2xvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVuY29kaW5nLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZSA9IG5ldyBGaWVsZChlbmNvZGluZy5zaGFwZSwgJ3NoYXBlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW5jb2Rpbmcuc2l6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IG5ldyBGaWVsZChlbmNvZGluZy5zaXplLCAnc2l6ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVuY29kaW5nLmdyb3VwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cCA9IG5ldyBGaWVsZChlbmNvZGluZy5ncm91cCwgJ2dyb3VwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmcudmFsdWVzICYmIGVuY29kaW5nLnZhbHVlcyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcyA9W107XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8ZW5jb2RpbmcudmFsdWVzLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZW5jb2RpbmcudmFsdWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKG5ldyBGaWVsZCh2YWx1ZSx2YWx1ZS5uYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZW5jb2Rpbmcuc3RhY2sgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhY2sgPSBlbmNvZGluZy5zdGFjayA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihlbmNvZGluZy5yYWRpYWwgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmFkaWFsID0gZW5jb2RpbmcucmFkaWFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgY2xhc3MgVHJhbnNGb3Jte1xuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBVdGlsID0gYW5kcm9pZC5ncmFwaGljcy5VdGlsO1xuICAgIGV4cG9ydCBjbGFzcyBTZXJpZXMge1xuICAgICAgICBwcml2YXRlIF9fbmFtZTogc3RyaW5nO1xuICAgICAgICBwcml2YXRlIF9faW5kZXg6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9fZGF0YTogYW55W107XG4gICAgICAgIHByaXZhdGUgX19lbmNvZGluZzogRW5jb2Rpbmc7XG4gICAgICAgIHByaXZhdGUgX19wYWlyczogeyBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W107XG4gICAgICAgIHByaXZhdGUgX19wb2ludHM6IGFueVtdID0gW107XG4gICAgICAgIHByaXZhdGUgX19jaGFydFR5cGU6IENoYXJ0VHlwZSA9IENoYXJ0VHlwZS5CYXI7XG4gICAgICAgIHB1YmxpYyBlbmFibGU6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgY29uc3RydWN0b3IoZW5jb2Rpbmc6IEVuY29kaW5nLCBzZXJpZXM6IGFueSxpbmRleDpudW1iZXIpIHtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChlbmNvZGluZyAhPSBudWxsKTtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChzZXJpZXMgIT0gbnVsbCk7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoc2VyaWVzLmRhdGEgaW5zdGFuY2VvZiBBcnJheSwgXCJTZXJpZXMgbXVzdCBiZSBBcnJheVwiKTtcbiAgICAgICAgICAgIHRoaXMuX19kYXRhID0gc2VyaWVzLmRhdGE7XG4gICAgICAgICAgICB0aGlzLl9fbmFtZSA9IHNlcmllcy5uYW1lO1xuICAgICAgICAgICAgdGhpcy5fX2luZGV4PSBpbmRleDtcbiAgICAgICAgICAgIHRoaXMuX19jaGFydFR5cGUgPSBVdGlsLmFzRW51bShzZXJpZXMuY2hhcnR0eXBlLCBDaGFydFR5cGUpO1xuICAgICAgICAgICAgdGhpcy5fX2VuY29kaW5nID0gZW5jb2Rpbmc7XG4gICAgICAgICAgICB0aGlzLl9fcGFpcnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fZW5jb2RpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoVXRpbGl0eS5pc2tleShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlZDogRmllbGQgPSB0aGlzLl9fZW5jb2Rpbmdba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IHRoaXMuX19jcmVhdGVTY2FsZShmaWxlZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19wYWlycy5wdXNoKHsgZmlsZWQ6IGZpbGVkLCBzY2FsZTogc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLl9fZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb2ludHMucHVzaCh0aGlzLl9fYW5hbHlzZUl0ZW0odGhpcy5fX3BhaXJzLCBpdGVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMuX19wYWlycykge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlZDogRmllbGQgPSBwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgIGxldCBzY2FsZTogU2NhbGUgPSBwYWlyLnNjYWxlO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlZC5uYW1lICE9ICd4JyAmJiBmaWxlZC5uYW1lICE9ICd5JyAmJiBmaWxlZC5yYW5nZSAhPSBudWxsICYmIGZpbGVkLnJhbmdlLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2UoZmlsZWQucmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlIGluc3RhbmNlb2YgTG9nU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKGZpbGVkLnJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVkLmJhbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZUJvdW5kcyhmaWxlZC5yYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKGZpbGVkLnJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9fYW5hbHlzZUl0ZW0ocGFpcnM6IHsgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdLCBpdGVtOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KGl0ZW0gIT0gbnVsbCk7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQodHlwZW9mIGl0ZW0gPT0gJ29iamVjdCcpO1xuICAgICAgICAgICAgbGV0IHZhbHVlcyA9IHt9O1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KCEoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSk7XG4gICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHBhaXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGVkOiBGaWVsZCA9IHBhaXIuZmlsZWQ7XG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IHBhaXIuc2NhbGU7XG4gICAgICAgICAgICAgICAgaWYgKHNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heDogbnVtYmVyID0gVXRpbGl0eS5tYXgoW2l0ZW1bZmlsZWQuYmluZF0sIHNjYWxlLm1heF0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWluOiBudW1iZXIgPSBVdGlsaXR5Lm1pbihbaXRlbVtmaWxlZC5iaW5kXSwgc2NhbGUubWluXSk7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbihbbWluLCBtYXhdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlIGluc3RhbmNlb2YgTG9nU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heDogbnVtYmVyID0gVXRpbGl0eS5tYXgoW2l0ZW1bZmlsZWQuYmluZF0sIHNjYWxlLm1heF0pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWluOiBudW1iZXIgPSBVdGlsaXR5Lm1pbihbaXRlbVtmaWxlZC5iaW5kXSwgc2NhbGUubWluXSk7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbihbbWluLCBtYXhdKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWlucy5wdXNoKGl0ZW1bZmlsZWQuYmluZF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogVmFsdWUgPSBuZXcgVmFsdWUoaXRlbVtmaWxlZC5iaW5kXSwgZmlsZWQudHlwZSk7XG4gICAgICAgICAgICAgICAgdmFsdWVzW2ZpbGVkLm5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIF9yZWZyZXNoKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiB0aGlzLl9fcGFpcnMpIHtcbiAgICAgICAgICAgICAgICBwYWlyLnNjYWxlLmRvbWFpbihbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBwdCBvZiB0aGlzLl9fcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiB0aGlzLl9fcGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVkOiBGaWVsZCA9IHBhaXIuZmlsZWQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZTogU2NhbGUgPSBwYWlyLnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHRbZmlsZWQubmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWF4OiBudW1iZXIgPSBVdGlsaXR5Lm1heCh2YWx1ZS5pc011bHRpcGxlID8gdmFsdWUudmFsdWUuY29uY2F0KFtzY2FsZS5tYXhdKSA6IFt2YWx1ZS52YWx1ZSwgc2NhbGUubWF4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluOiBudW1iZXIgPSBVdGlsaXR5Lm1pbih2YWx1ZS5pc011bHRpcGxlID8gdmFsdWUudmFsdWUuY29uY2F0KFtzY2FsZS5taW5dKSA6IFt2YWx1ZS52YWx1ZSwgc2NhbGUubWluXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW4oW21pbiwgbWF4XSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGUgaW5zdGFuY2VvZiBMb2dTY2FsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwdFtmaWxlZC5uYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXg6IG51bWJlciA9IFV0aWxpdHkubWF4KHZhbHVlLmlzTXVsdGlwbGUgPyB2YWx1ZS52YWx1ZS5jb25jYXQoW3NjYWxlLm1heF0pIDogW3ZhbHVlLnZhbHVlLCBzY2FsZS5tYXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW46IG51bWJlciA9IFV0aWxpdHkubWluKHZhbHVlLmlzTXVsdGlwbGUgPyB2YWx1ZS52YWx1ZS5jb25jYXQoW3NjYWxlLm1pbl0pIDogW3ZhbHVlLnZhbHVlLCBzY2FsZS5taW5dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbihbbWluLCBtYXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHRbZmlsZWQubmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHYgb2YgdmFsdWUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWlucy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWlucy5wdXNoKHZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX19jcmVhdGVTY2FsZShmaWxlZDogRmllbGQpOiBTY2FsZSB7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoZmlsZWQgIT0gbnVsbCk7XG4gICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gbnVsbDtcbiAgICAgICAgICAgIHN3aXRjaCAoZmlsZWQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgU2NhbGVUeXBlLkxpbmVhcjpcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBuZXcgTGluZWFyU2NhbGUoZmlsZWQubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU2NhbGVUeXBlLk9yZGluYWw6XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlID0gbmV3IE9yZGluYWxTY2FsZShmaWxlZC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTY2FsZVR5cGUuTG9nOlxuICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IG5ldyBMb2dTY2FsZShmaWxlZC5sb2dCYXNlLCBmaWxlZC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgRGVidWcuYXNzZXJ0KGZhbHNlLCBmaWxlZC50eXBlICsgXCIgU2NhbGVUeXBlIGhhcyBub3QgYmVlbiBpbXBsZW1lbnQhXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0IGRhdGEoKTogYW55W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG5hbWUoKTpzdHJpbmd7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX25hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc2NhbGVQYWlycygpOiB7IGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3BhaXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHBvaW50cygpOiBhbnlbXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3BvaW50cztcbiAgICAgICAgfVxuICAgICAgICBnZXQgc2l6ZSgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb2ludHMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGdldCBjaGFydFR5cGUoKTogQ2hhcnRUeXBlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fY2hhcnRUeXBlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBnZXQgaW5kZXgoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2luZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0U2NhbGUobmFtZTogc3RyaW5nKTogU2NhbGUge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5fX3BhaXJzLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmZpbGVkLm5hbWUgPT0gbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoaW5kZXggPj0gMCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3BhaXJzW2luZGV4XS5zY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNsb25lKCk6IFNlcmllcyB7XG4gICAgICAgICAgICBsZXQgc2VyaWVzID0gXy5jbG9uZURlZXAodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gc2VyaWVzO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgY2xhc3MgRGF0YU1vZGVsIHtcblxuICAgICAgICBwcml2YXRlIF9fZW5jb2Rpbmc6IEVuY29kaW5nO1xuICAgICAgICBwcml2YXRlIF9fZmlsdGVyOiBGaWx0ZXI7XG4gICAgICAgIHByaXZhdGUgX2RhdGE6YW55O1xuICAgICAgICBcbiAgICAgICAgcHJpdmF0ZSBfc2VyaWVzOiBTZXJpZXNbXTtcbiAgICAgICAgcHJpdmF0ZSBfYWxsU2VyaWVzOlNlcmllc1tdO1xuICAgICAgICBwcml2YXRlIF9fY2hhcnRUeXBlczogQ2hhcnRUeXBlW10gPSBbXTtcbiAgICAgICAgcHJvdGVjdGVkIF9fc2NhbGVQYWlyczogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W107XG4gICAgICAgIHByaXZhdGUgX2FuYWx5c2VFbmNvZGluZyhlbmNvZGU6IGFueSk6IEVuY29kaW5nIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRW5jb2RpbmcoZW5jb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXQgY2hhcnRUeXBlcygpOiBDaGFydFR5cGVbXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2NoYXJ0VHlwZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9hbmFseXNlU2VyaWVzKHNlcmllc19kYXRhOiBhbnksIGVuY29kaW5nOiBFbmNvZGluZyk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5fc2VyaWVzID1bXTtcbiAgICAgICAgICAgIHRoaXMuX2FsbFNlcmllcyA9W107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcmllc19kYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlcmllc2l0ZW0gPSBzZXJpZXNfZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VyOiBTZXJpZXMgPSBuZXcgU2VyaWVzKGVuY29kaW5nLCBzZXJpZXNpdGVtLCBpKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9fZmlsdGVyICE9IG51bGwgJiYgdGhpcy5fX2ZpbHRlci5zZXJpZXMuaW5kZXhPZihzZXJpZXNpdGVtLm5hbWUpPi0xKXtcbiAgICAgICAgICAgICAgICAgICAgc2VyLmVuYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nlcmllcy5wdXNoKHNlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fY2hhcnRUeXBlcy5pbmRleE9mKHNlci5jaGFydFR5cGUpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2NoYXJ0VHlwZXMucHVzaChzZXIuY2hhcnRUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBzZXIuZW5hYmxlID1mYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsU2VyaWVzLnB1c2goc2VyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcblxuICAgICAgICAgICAgdGhpcy5fX2VuY29kaW5nID0gdGhpcy5fYW5hbHlzZUVuY29kaW5nKHRoaXMuX2RhdGEuZW5jb2RpbmcpO1xuICAgICAgICAgICAgdGhpcy5fYW5hbHlzZUZpbHRlcihkYXRhLmZpbHRlcik7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyByZWZyZXNoKCl7XG4gICAgICAgICAgICB0aGlzLl9hbmFseXNlU2VyaWVzKHRoaXMuX2RhdGEuc2VyaWVzLCB0aGlzLl9fZW5jb2RpbmcpO1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlTGF5b3V0U2NhbGVzKHRoaXMuZW5jb2RpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYW5hbHlzZUZpbHRlcihmaWx0ZXI6IGFueSkge1xuICAgICAgICAgICAgaWYgKGZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2ZpbHRlciA9IG5ldyBGaWx0ZXIoIGZpbHRlci5zZXJpZXMsZmlsdGVyLnJ1bGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZUxheW91dFNjYWxlcyhlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXJpZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrKENoYXJ0VHlwZS5CYXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrKENoYXJ0VHlwZS5MaW5lKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFjayhDaGFydFR5cGUuQXJlYSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhY2soQ2hhcnRUeXBlLlNjYXR0ZXIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VyaWVzLmxlbmd0aCAtIDE7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBTZXJpZXMgPSB0aGlzLl9zZXJpZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0X3NlcmllczogU2VyaWVzID0gdGhpcy5fc2VyaWVzW2kgKyAxXTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyQSBvZiBzZXJpZXMuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpckIgb2YgbmV4dF9zZXJpZXMuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYWlyQS5maWxlZC5lcXVhbHMocGFpckIuZmlsZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlZCA9IHBhaXJBLmZpbGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mb0E6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfSA9IHRoaXMuX19nZXRTY2FsZUluZm9ieW5hbWUocGFpckEuZmlsZWQubmFtZSwgc2VyaWVzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mb0I6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfSA9IHRoaXMuX19nZXRTY2FsZUluZm9ieW5hbWUocGFpckIuZmlsZWQubmFtZSwgbmV4dF9zZXJpZXMubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm9BID09IG51bGwgJiYgaW5mb0IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gVXRpbGl0eS5tZXJnZVNjYWxlKHBhaXJBLnNjYWxlLCBwYWlyQi5zY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFtzZXJpZXMubmFtZSwgbmV4dF9zZXJpZXMubmFtZV0sIGZpbGVkOiBmaWxlZCwgc2NhbGU6IHNjYWxlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWVdLCBmaWxlZDogcGFpckEuZmlsZWQsIHNjYWxlOiBwYWlyQS5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbbmV4dF9zZXJpZXMubmFtZV0sIGZpbGVkOiBwYWlyQi5maWxlZCwgc2NhbGU6IHBhaXJCLnNjYWxlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZm9BID09IG51bGwgJiYgaW5mb0IgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gVXRpbGl0eS5tZXJnZVNjYWxlKHBhaXJBLnNjYWxlLCBpbmZvQi5zY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9CLnNjYWxlID0gc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb0Iuc2VyaWVzLnB1c2goc2VyaWVzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZm9BICE9IG51bGwgJiYgaW5mb0IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gVXRpbGl0eS5tZXJnZVNjYWxlKHBhaXJCLnNjYWxlLCBpbmZvQS5zY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9BLnNjYWxlID0gc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb0Euc2VyaWVzLnB1c2gobmV4dF9zZXJpZXMubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2VyIG9mIHRoaXMuX3Nlcmllcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHNlci5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLl9nZXRTY2FsZUJ5TmFtZShwYWlyLmZpbGVkLm5hbWUsIHNlci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFpci5zY2FsZSA9IHNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Nlcmllcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgdGhpcy5fc2VyaWVzWzBdLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMucHVzaCh7IHNlcmllczogW3RoaXMuX3Nlcmllc1swXS5uYW1lXSwgZmlsZWQ6IHBhaXIuZmlsZWQsIHNjYWxlOiBwYWlyLnNjYWxlLmNsb25lKCkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX3N0YWNrKGNoYXJ0VHlwZTogQ2hhcnRUeXBlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmNvZGluZy5fc3RhY2spIHtcbiAgICAgICAgICAgICAgICBsZXQgbmVnYXRpdmU6IGFueSA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCBwb3NpdGl2ZTogYW55ID0ge307XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJBID0gdGhpcy5zZXJpZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJBLmNoYXJ0VHlwZSA9PT0gY2hhcnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRTZXJpZXNTdGFjayhzZXJBLCBwb3NpdGl2ZSwgbmVnYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfX2dldFNjYWxlSW5mb2J5bmFtZShmaWxlZG5hbWU6IHN0cmluZywgc2VyaWVzbmFtZTogc3RyaW5nKTogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9IHtcbiAgICAgICAgICAgIGxldCBpbmZvOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH0gPSBfLmZpbmQodGhpcy5fX3NjYWxlUGFpcnMsIChpdGVtOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zZXJpZXMuaW5kZXhPZihzZXJpZXNuYW1lKSA+PSAwICYmIGZpbGVkbmFtZSA9PSBpdGVtLmZpbGVkLm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIF9nZXRTY2FsZUJ5TmFtZShmaWxlZG5hbWU6IHN0cmluZywgc2VyaWVzbmFtZTogc3RyaW5nKTogU2NhbGUge1xuICAgICAgICAgICAgcmV0dXJuIF8ucmVzdWx0KF8uZmluZCh0aGlzLl9fc2NhbGVQYWlycywgKGl0ZW06IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnNlcmllcy5pbmRleE9mKHNlcmllc25hbWUpID49IDAgJiYgZmlsZWRuYW1lID09IGl0ZW0uZmlsZWQubmFtZTtcbiAgICAgICAgICAgIH0pLCBcInNjYWxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc2V0U2VyaWVzU3RhY2soc2VyaWVzOiBTZXJpZXMsIHBvczogYW55LCBuZWc6IGFueSkge1xuICAgICAgICAgICAgbGV0IHNjYWxlWF9BOiBTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuXG4gICAgICAgICAgICBpZiAoc2NhbGVYX0EgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWd2YWx1ZTogbnVtYmVyID0gbmVnW3B0LngudmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zdmFsdWU6IG51bWJlciA9IHBvc1twdC54LnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ3ZhbHVlID09IG51bGwpIHsgbmVndmFsdWUgPSAwOyBuZWdbcHQueC52YWx1ZV0gPSAwOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3N2YWx1ZSA9PSBudWxsKSB7IHBvc3ZhbHVlID0gMDsgcG9zW3B0LngudmFsdWVdID0gMDsgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc05lZzogYm9vbGVhbiA9IHB0LnkudmFsdWUgPCAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRZOiBudW1iZXIgPSBpc05lZyA/IG5lZ3ZhbHVlIDogcG9zdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRZOiBudW1iZXIgPSBzdGFydFkgKyBwdC55LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpc05lZyA/IG5lZ1twdC54LnZhbHVlXSA9IGVuZFkgOiBwb3NbcHQueC52YWx1ZV0gPSBlbmRZO1xuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXRQb2ludC55ID0gbmV3IFZhbHVlKFtzdGFydFksIGVuZFldLCB0YXJnZXRQb2ludC55LnNjYWxlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlcmllc0IucG9pbnRzW2luZGV4XSA9IHRhcmdldFBvaW50O1xuICAgICAgICAgICAgICAgICAgICBwdC55ID0gbmV3IFZhbHVlKFtzdGFydFksIGVuZFldLCBwdC55LnNjYWxlVHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VyaWVzLl9yZWZyZXNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTZXJpZXNCeVR5cGUoY2hhcnR0eXBlOiBDaGFydFR5cGUpOiBTZXJpZXNbXSB7XG4gICAgICAgICAgICBsZXQgc2VyaWVzOiBTZXJpZXNbXSA9IF8uZmlsdGVyKHRoaXMuX3NlcmllcywgKHNlcikgPT4geyByZXR1cm4gc2VyLmNoYXJ0VHlwZSA9PT0gY2hhcnR0eXBlOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBzZXJpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc2VyaWVzKCk6IFNlcmllc1tdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXM7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGFsbFNlcmllcygpOlNlcmllc1tde1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FsbFNlcmllcztcbiAgICAgICAgfVxuICAgICAgICBnZXQgZW5jb2RpbmcoKTogRW5jb2Rpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbmNvZGluZztcbiAgICAgICAgfVxuICAgICAgICBnZXQgZmlsdGVyKCk6RmlsdGVye1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19maWx0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc2NhbGVQYWlycygpOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NjYWxlUGFpcnM7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVNjYWxlIHtcbiAgICAgICAgZG9tYWluKGRvbWFpbnM6IGFueVtdKTogSVNjYWxlO1xuICAgICAgICByZWZyZXNoKCk6IElTY2FsZTtcbiAgICAgICAgcmFuZ2UocmFuZ2VzOiBhbnlbXSk6IElTY2FsZTtcbiAgICAgICAgcmFuZ2VCb3VuZHMocmFuZ2VzOiBhbnlbXSk6IElTY2FsZTtcbiAgICAgICAgZ2V0U2NhbGVWYWx1ZSh2YWx1ZTogYW55KTtcbiAgICAgICAgb3JkZXI6IE9yZGVyO1xuICAgICAgICBtYXg6IG51bWJlcjtcbiAgICAgICAgbWluOiBudW1iZXI7XG4gICAgICAgIGNsb25lKCk6SVNjYWxlO1xuICAgICAgICAgZXF1YWwodmFsdWU6SVNjYWxlKTtcbiAgICAgICAgICAgIFxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU2NhbGUgaW1wbGVtZW50cyBJU2NhbGUge1xuICAgICAgICBwcml2YXRlIF9faWQ6IHN0cmluZztcbiAgICAgICAgcHJvdGVjdGVkIF9fc3RhcnQ6IGFueTtcbiAgICAgICAgcHJvdGVjdGVkIF9fZW5kOiBhbnk7XG4gICAgICAgIHByb3RlY3RlZCBfX2JvdW5kOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByb3RlY3RlZCBfb3JkZXI6IE9yZGVyO1xuICAgICAgICByZWFkb25seSBtYXg6IG51bWJlcjtcbiAgICAgICAgcmVhZG9ubHkgbWluOiBudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKGlkPzogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLl9vcmRlciA9IE9yZGVyLk5vbmU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByb3RlY3RlZCBfX2RvbWFpbnM6IGFueVtdID0gW107XG4gICAgICAgIHByb3RlY3RlZCByYW5nZXM6IGFueVtdID0gW107XG5cbiAgICAgICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX19pZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pZDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZG9tYWluKGRvbWFpbnM6IGFueVtdKTogSVNjYWxlIHtcbiAgICAgICAgICAgIHRoaXMuX19kb21haW5zID0gZG9tYWlucztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyByYW5nZShyYW5nZXM6IGFueVtdKSB7XG4gICAgICAgICAgICB0aGlzLnJhbmdlcyA9IHJhbmdlcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgICByYW5nZUJvdW5kcyhyYW5nZXM6IGFueVtdKTogSVNjYWxlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCgpOiBJU2NhbGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTY2FsZVZhbHVlKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc3RhcnRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGVuZFBvc2l0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbmQ7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG9yZGVyKCk6IE9yZGVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcmRlcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgb3JkZXIodmFsdWU6IE9yZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcmRlciA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBlcXVhbCh2YWx1ZTogU2NhbGUpIHtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlkID09IHZhbHVlLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBjbG9uZSgpOiBTY2FsZXtcbiAgICAgICAgICAgIHJldHVybiBfLmNsb25lRGVlcCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnXG4gICAgZXhwb3J0IGNsYXNzIExpbmVhclNjYWxlIGV4dGVuZHMgU2NhbGUge1xuICAgICAgICBwcm90ZWN0ZWQgX21heDogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX21pbjogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgbmljZU1heFZhbHVlOiBudW1iZXI7XG5cbiAgICAgICAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0cnVjdG9yKGlkPzogYW55KSB7XG4gICAgICAgICAgICBzdXBlcihpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb21haW4oZG9tYWluczphbnlbXSl7XG4gICAgICAgICAgICBzdXBlci5kb21haW4oZG9tYWlucyk7XG4gICAgICAgICAgICB0aGlzLl9taW4gPSB0aGlzLl9fZG9tYWluc1swXTtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IHRoaXMuX19kb21haW5zWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZWZyZXNoKCk6IElTY2FsZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gT3JkZXIuQXNjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0ID0gdGhpcy5yYW5nZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fX2VuZCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBPcmRlci5EZXNjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0ID0gdGhpcy5yYW5nZXNbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5fX2VuZCA9IHRoaXMucmFuZ2VzWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc3RhcnQgPSB0aGlzLnJhbmdlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW5kID0gdGhpcy5yYW5nZXNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9taW4gPSB0aGlzLl9fZG9tYWluc1swXTtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IHRoaXMuX19kb21haW5zWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2UocmFuZ2VzOiBhbnlbXSkge1xuICAgICAgICAgICAgdGhpcy5yYW5nZXMgPSByYW5nZXM7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMucmVmcmVzaCgpLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFNjYWxlVmFsdWUodjogYW55KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4ID09IHRoaXMuX21pbikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKHRoaXMuX19lbmQgLSB0aGlzLl9fc3RhcnQpIC8gMiArIHRoaXMuX19zdGFydDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAodGhpcy5fX2VuZCAtIHRoaXMuX19zdGFydCkgLyAodGhpcy5fbWF4IC0gdGhpcy5fbWluKSAqICh2IC0gdGhpcy5fbWluKSArIHRoaXMuX19zdGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgXG5cbiAgICAgICAgcHVibGljIGVxdWFsKHZhbHVlOiBTY2FsZSkge1xuICAgICAgICAgICAgaWYodmFsdWUgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmlkID09IHRoaXMuaWQgJiYgdmFsdWUubWF4ID09IHRoaXMubWF4ICYmIHZhbHVlLm1pbiA9PSB0aGlzLm1pbiA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gICAgICAgICAgICBcbiAgICAvLyAgICBwdWJsaWMgY2xvbmUoKTpMaW5lYXJTY2FsZXtcbiAgICAvLyAgICAgICAgbGV0IHNjYWxlID0gIG5ldyBMaW5lYXJTY2FsZSh0aGlzLmlkKTtcbiAgICAvLyAgICAgICAgbGV0IGRvbWFpbnM6YW55W10gPVtdO1xuICAgIC8vICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX19kb21haW5zLmxlbmd0aDsgKytpKXtcbiAgICAvLyAgICAgICAgICAgICBkb21haW5zLnB1c2godGhpcy5fX2RvbWFpbnNbaV0pO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgLy8gbGV0IHJhbmdlcyA6YW55W10gPVtdO1xuICAgIC8vICAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmFuZ2VzLmxlbmd0aDsgKytpKXtcbiAgICAvLyAgICAgICAgIC8vICAgICByYW5nZXMucHVzaCh0aGlzLnJhbmdlc1tpXSk7XG4gICAgLy8gICAgICAgICAvLyB9XG4gICAgLy8gICAgICAgIHNjYWxlLmRvbWFpbihkb21haW5zKTsvLy5yYW5nZShyYW5nZXMpLnJlZnJlc2goKTtcbiAgICAvLyAgICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIC8vICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcblxuXG4gICAgZXhwb3J0IGNsYXNzIE9yZGluYWxTY2FsZSBleHRlbmRzIFNjYWxlIHtcblxuICAgICAgICBjb25zdHJ1Y3RvcihpZD86IGFueSkge1xuICAgICAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2goKTogSVNjYWxlIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IE9yZGVyLkFzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19kb21haW5zLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gT3JkZXIuRGVzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19kb21haW5zLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiIC0gYTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERlYnVnLmFzc2VydCh0aGlzLnJhbmdlcyAhPSBudWxsLCBcIlwiKTtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydCh0aGlzLnJhbmdlcy5sZW5ndGggPT0gMik7XG4gICAgICAgICAgICBpZiAodGhpcy5yYW5nZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc3RhcnQgPSB0aGlzLnJhbmdlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW5kID0gdGhpcy5yYW5nZXNbMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlcy5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGRvbWFpbnMoKTogYW55W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19kb21haW5zO1xuICAgICAgICB9XG5cbiAgICAgICAgcmFuZ2UocmFuZ2VzOiBhbnlbXSkge1xuICAgICAgICAgICAgdGhpcy5yYW5nZXMgPSByYW5nZXM7XG4gICAgICAgICAgICB0aGlzLl9fYm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5yZWZyZXNoKCksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJhbmdlQm91bmRzKHJhbmdlczogYW55W10pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gcmFuZ2VzO1xuICAgICAgICAgICAgdGhpcy5fX2JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5yZWZyZXNoKCksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBkb21haW4oZG9tYWluczogYW55W10pOiBJU2NhbGUge1xuICAgICAgICAgICAgdGhpcy5fX2RvbWFpbnMgPSBkb21haW5zO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0U2NhbGVWYWx1ZSh2OiBhbnkpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX19kb21haW5zLmluZGV4T2Yodik7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19ib3VuZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4ICsgMC41KSAqICh0aGlzLl9fZW5kIC0gdGhpcy5fX3N0YXJ0KSAvICh0aGlzLmRvbWFpbnMubGVuZ3RoKSArIHRoaXMuX19zdGFydDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBpbmRleCAqICh0aGlzLl9fZW5kIC0gdGhpcy5fX3N0YXJ0KSAvICh0aGlzLmRvbWFpbnMubGVuZ3RoLTEpICsgdGhpcy5fX3N0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHVibGljIGNsb25lKCk6T3JkaW5hbFNjYWxle1xuICAgICAgICAvLyAgICAgbGV0IHNjYWxlID0gIG5ldyBPcmRpbmFsU2NhbGUodGhpcy5pZCk7XG4gICAgICAgIC8vICAgICBsZXQgZG9tYWluczphbnlbXSA9W107XG4gICAgICAgIC8vICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX19kb21haW5zLmxlbmd0aDsgKytpKXtcbiAgICAgICAgLy8gICAgICAgICAgZG9tYWlucy5wdXNoKHRoaXMuX19kb21haW5zW2ldKTtcbiAgICAgICAgLy8gICAgICB9XG4gICAgICAgIC8vICAgICAvLyAgbGV0IHJhbmdlcyA6YW55W10gPVtdO1xuICAgICAgICAvLyAgICAgLy8gIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhbmdlcy5sZW5ndGg7ICsraSl7XG4gICAgICAgIC8vICAgICAvLyAgICAgIHJhbmdlcy5wdXNoKHRoaXMucmFuZ2VzW2ldKTtcbiAgICAgICAgLy8gICAgIC8vICB9XG4gICAgICAgIC8vICAgICBzY2FsZS5kb21haW4oZG9tYWlucyk7Ly8ucmFuZ2UocmFuZ2VzKS5yZWZyZXNoKCk7XG4gICAgICAgIC8vICAgICByZXR1cm4gc2NhbGU7XG4gICAgICAgIC8vIH1cblxuICAgIH1cblxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcblxuXG4gICAgZXhwb3J0IGNsYXNzIExvZ1NjYWxlIGV4dGVuZHMgU2NhbGUge1xuXG4gICAgICAgIHByb3RlY3RlZCBfbWF4OiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfbWluOiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfbmljZVRpY2s6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9uaWNlTWF4VmFsdWU6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfdGlja3NpemU6bnVtYmVyID0gNjtcblxuICAgICAgICBwcm90ZWN0ZWQgX2xvZ0Jhc2U6IG51bWJlcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihsb2diYXNlOiBudW1iZXIsIGlkPzogYW55KSB7XG4gICAgICAgICAgICBzdXBlcihpZCk7XG4gICAgICAgICAgICB0aGlzLl9sb2dCYXNlID0gbG9nYmFzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9tYWluKGRvbWFpbnM6YW55W10pe1xuICAgICAgICAgICAgc3VwZXIuZG9tYWluKGRvbWFpbnMpO1xuICAgICAgICAgICAgdGhpcy5fbWluID0gdGhpcy5fX2RvbWFpbnNbMF07XG4gICAgICAgICAgICB0aGlzLl9tYXggPSB0aGlzLl9fZG9tYWluc1sxXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGdldCBsb2dCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9nQmFzZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdGlja1NpemUodmFsdWU6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3RpY2tzaXplID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCgpOiBJU2NhbGUge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IE9yZGVyLkFzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGFydCA9IHRoaXMucmFuZ2VzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19lbmQgPSB0aGlzLnJhbmdlc1sxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gT3JkZXIuRGVzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGFydCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19lbmQgPSB0aGlzLnJhbmdlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0ID0gdGhpcy5yYW5nZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fX2VuZCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9taW4gPSB0aGlzLl9fZG9tYWluc1swXTtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IHRoaXMuX19kb21haW5zWzFdO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xvZ0Jhc2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2UgPSB0aGlzLl9sb2dCYXNlO1xuICAgICAgICAgICAgICAgIHZhciBrID0gTWF0aC5sb2coYmFzZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW1heCA9IE1hdGguY2VpbChNYXRoLmxvZyh0aGlzLl9tYXgpIC8gayk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4ID0gTWF0aC5wb3coYmFzZSwgaW1heCk7XG4gICAgICAgICAgICAgICAgdmFyIGltaW4gPSBNYXRoLmZsb29yKE1hdGgubG9nKHRoaXMuX21pbikgLyBrKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW4gPSBNYXRoLnBvdyhiYXNlLCBpbWluKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9taW4gPD0gMCB8fCBpc05hTih0aGlzLl9taW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21pbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXggPCB0aGlzLl9taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5fbWluICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJhbmdlKHJhbmdlczogYW55W10pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gcmFuZ2VzO1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnJlZnJlc2goKSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdGlja3MoKTogYW55W10ge1xuICAgICAgICAgICAgdmFyIHRpY2tzOiBhbnlbXSA9IG5ldyBBcnJheSh0aGlzLl90aWNrc2l6ZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSB0aGlzLl90aWNrc2l6ZTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGlja3NbaV0gPSBpICogdGhpcy5fbmljZVRpY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGlja3M7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTY2FsZVZhbHVlKHY6IGFueSkge1xuICAgICAgICAgICAgaWYgKHYgPCB0aGlzLl9taW4pIHtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5fbWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1heGwgPSBNYXRoLmxvZyh0aGlzLl9tYXggLyB0aGlzLl9taW4pO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gTWF0aC5sb2codiAvIHRoaXMuX21pbikgLyBtYXhsICogKHRoaXMuX19lbmQgLSB0aGlzLl9fc3RhcnQpICsgdGhpcy5fX3N0YXJ0O1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1YmxpYyBjbG9uZSgpOkxvZ1NjYWxle1xuICAgICAgICAvLyAgICAgRGVidWcuYXNzZXJ0KGZhbHNlLFwiTG9nU2NhbGUgY2xvbmUgaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkICBcIik7XG4gICAgICAgIC8vICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG5cbn0iLCIvLyAvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYmFzZS5kLnRzXCIgLz5cbi8vIG5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIFxuICAgIFxuLy8gICAgICAgICBleHBvcnQgY2xhc3MgQ29sb3JTY2FsZSBleHRlbmRzIE9yZGluYWxTY2FsZSB7XG4vLyAgICAgICAgICAgICBwcml2YXRlIF9fY29sb3JyYW5nZXM6c3RyaW5nW107XG5cbi8vICAgICAgICAgICAgIGNvbnN0cnVjdG9yKGlkPzogYW55KSB7XG4vLyAgICAgICAgICAgICAgICAgc3VwZXIoaWQpO1xuLy8gICAgICAgICAgICAgICAgIHRoaXMuX19jb2xvcnJhbmdlcyA9W107XG5cbi8vICAgICAgICAgICAgIH1cbiAgICAgICAgIFxuLy8gICAgICAgICAgICAgZ2V0IGRvbWFpbnMoKTogYW55W10ge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZG9tYWlucztcbi8vICAgICAgICAgICAgIH1cbiAgICBcbi8vICAgICAgICAgICAgIHJhbmdlKHJhbmdlczogYW55W10pIHtcbi8vICAgICAgICAgICAgICAgICBpZihyYW5nZXMubGVuZ3RoID4gMSl7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19jb2xvcnJhbmdlcyA9Q29sb3JVdGlscy5ncmFkaWVudENvbG9yKHJhbmdlc1swXSxyYW5nZXNbcmFuZ2VzLmxlbmd0aC0xXSx0aGlzLl9fZG9tYWlucy5sZW5ndGgpO1xuXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5yYW5nZShbMCx0aGlzLl9fY29sb3JyYW5nZXMubGVuZ3RoLTFdKTtcblxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgIHJhbmdlQm91bmRzKHJhbmdlczogYW55W10pIHtcbi8vICAgICAgICAgICAgICAgICBpZihyYW5nZXMubGVuZ3RoID4gMSl7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19jb2xvcnJhbmdlcyA9Q29sb3JVdGlscy5ncmFkaWVudENvbG9yKHJhbmdlc1swXSxyYW5nZXNbcmFuZ2VzLmxlbmd0aC0xXSx0aGlzLl9fZG9tYWlucy5sZW5ndGgpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIucmFuZ2UoWzAsdGhpcy5fX2NvbG9ycmFuZ2VzLmxlbmd0aC0xXSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBnZXRTY2FsZVZhbHVlKHY6IGFueSk6YW55IHtcbi8vICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9fZG9tYWlucy5pbmRleE9mKHYpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fY29sb3JyYW5nZXNbaW5kZXhdO1xuLy8gICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgXG4vLyAgICAgICAgIH1cbiAgICBcbi8vICAgICB9IiwibmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGVudW0gRWxlbWVudFR5cGV7XG4gICAgICAgIFNoYXBlLFxuICAgICAgICBTZXJpZXMsXG4gICAgICAgIEF4aXMsXG4gICAgICAgIFNlcmllc0xlZ2VuZCxcbiAgICAgICAgU2NhbGVMZWdlbmRcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIGV4cG9ydCBjbGFzcyBBbmltYXRpb24ge1xuICAgICAgICBkdXJhdGlvbjogbnVtYmVyID0gMDtcbiAgICAgICAgaXNBbmlhbXRpb25FbmQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBzdGFydDogbnVtYmVyO1xuICAgICAgICBlYXNlOkFuaW1hdGlvbkVhc2U7XG4gICAgICAgIHR5cGU6QW5pbWF0aW9uVHlwZTtcbiAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgICAgIHRoaXMuZWFzZSA9bmV3IEFuaW1hdGlvbkVhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5pc0FuaWFtdGlvbkVuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0wO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gQW5pbWF0aW9uVHlwZS5TaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NhbGUobm93OiBudW1iZXIsIHRhcmdldDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZWFzZSBcIiArKCAobm93IC0gdGhpcy5zdGFydCkvdGhpcy5kdXJhdGlvbikpO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldCAqIHRoaXMuZWFzZS5lYXNlKChub3cgLSB0aGlzLnN0YXJ0KSAvIHRoaXMuZHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuXG4gICAgZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkVhc2Uge1xuICAgICAgICBwdWJsaWMgZWFzZSh0OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEJvdW5jZUFuaW1hdGlvbkVhc2UgZXh0ZW5kcyBBbmltYXRpb25FYXNlIHtcblxuICAgICAgICBwdWJsaWMgZWFzZSh0OiBudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBiMSA9IDQgLyAxMSxcbiAgICAgICAgICAgICAgICBiMiA9IDYgLyAxMSxcbiAgICAgICAgICAgICAgICBiMyA9IDggLyAxMSxcbiAgICAgICAgICAgICAgICBiNCA9IDMgLyA0LFxuICAgICAgICAgICAgICAgIGI1ID0gOSAvIDExLFxuICAgICAgICAgICAgICAgIGI2ID0gMTAgLyAxMSxcbiAgICAgICAgICAgICAgICBiNyA9IDE1IC8gMTYsXG4gICAgICAgICAgICAgICAgYjggPSAyMSAvIDIyLFxuICAgICAgICAgICAgICAgIGI5ID0gNjMgLyA2NCxcbiAgICAgICAgICAgICAgICBiMCA9IDEgLyBiMSAvIGIxO1xuICAgICAgICAgICAgcmV0dXJuICh0ID0gK3QpIDwgYjEgPyBiMCAqIHQgKiB0IDogdCA8IGIzID8gYjAgKiAodCAtPSBiMikgKiB0ICsgYjQgOiB0IDwgYjYgPyBiMCAqICh0IC09IGI1KSAqIHQgKyBiNyA6IGIwICogKHQgLT0gYjgpICogdCArIGI5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFNpbkFuaW1hdGlvbkVhc2UgZXh0ZW5kcyBBbmltYXRpb25FYXNlIHtcbiAgICAgICAgcHVibGljIGVhc2UodDogbnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgcGkgPSBNYXRoLlBJLFxuICAgICAgICAgICAgICAgIGhhbGZQaSA9IHBpIC8gMjtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbih0ICogaGFsZlBpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgUXVhZEFuaW1hdGlvbkVhc2UgZXh0ZW5kcyBBbmltYXRpb25FYXNlIHtcbiAgICAgICAgcHVibGljIGVhc2UodDogbnVtYmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKCh0ICo9IDIpIDw9IDEgPyB0ICogdCA6IC0tdCAqICgyIC0gdCkgKyAxKSAvIDI7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IExpbmVhckxheW91dCA9IGFuZHJvaWQud2lkZ2V0LkxpbmVhckxheW91dDtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG5cbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG5cbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgT3JpZW50YXRpb24gPSBhbmRyb2lkLmdyYXBoaWNzLk9yaWVudGF0aW9uO1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGltcG9ydCBWaWV3R3JvdXAgPSBhbmRyb2lkLnZpZXcuVmlld0dyb3VwO1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuXG4gICAgZXhwb3J0IGNsYXNzIFNlcmllc0xlZ2VuZCBleHRlbmRzIExpbmVhckxheW91dCB7XG5cbiAgICAgICAgcHJpdmF0ZSBfc2VyaWVzOiBTZXJpZXNbXTtcbiAgICAgICAgcHJpdmF0ZSBfX3NoYXBlOiBzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKHNoYXBlPzogJ2JhcicgfCAnc2NhdHRlcicpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlID0gc2hhcGU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IHNlcmllcyh2YWx1ZTogU2VyaWVzW10pIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcmllcyA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fX2xvYWRJdGVtcygpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgc2VyaWVzKCk6IFNlcmllc1tdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9fbG9hZEl0ZW1zKCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxWaWV3cygpO1xuXG4gICAgICAgICAgICBsZXQgY29sb3JBcnJheTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtOiBMZWdlbmRJdGVtID0gbmV3IExlZ2VuZEl0ZW0oKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNlcmllcyA9IHRoaXMuc2VyaWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fc2hhcGUgPT0gJ2JhcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uID0gbmV3IEJhckljb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX19zaGFwZSA9PSAnc2NhdHRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uID0gbmV3IENpcmNsZUljb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5zZXJpZXMuZW5hYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uLmNvbG9yID0gQ29sb3JVdGlscy5pbmRleENvbG9yKGkpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmljb24uY29sb3IgPSAnZ3JheSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGNvbnN0IFBBRERJTkc6IG51bWJlciA9IDU7XG4gICAgY2xhc3MgTGVnZW5kSXRlbSBleHRlbmRzIFZpZXcge1xuXG4gICAgICAgIHB1YmxpYyBzZXJpZXM6IFNlcmllcztcbiAgICAgICAgcHVibGljIGljb246IEljb247XG4gICAgICAgIHB1YmxpYyBmb250OiBGb250XG4gICAgICAgIHByaXZhdGUgX19mb250UmVjdDogUmVjdDtcbiAgICAgICAgcHJpdmF0ZSBfX2ljb25SZWN0OiBSZWN0O1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5mb250ID0gRGVmYXVsdC5mb250O1xuICAgICAgICAgICAgdGhpcy5mb250LmZvbnRDb2xvciA9ICdibGFjayc7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgbGV0IHc6IG51bWJlciA9IHdpZHRoLmdldE1lYXN1cmVWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IGg6IG51bWJlciA9IGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICBzaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy5zZXJpZXMubmFtZSwgdGhpcy5mb250KTtcbiAgICAgICAgICAgIHRoaXMuX19mb250UmVjdCA9IG5ldyBSZWN0KDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIGxldCBpY29uc2l6ZSA9IHNpemUuaGVpZ2h0ICogMjtcbiAgICAgICAgICAgIHRoaXMuX19pY29uUmVjdCA9IG5ldyBSZWN0KDAsIDAsIGljb25zaXplLCBzaXplLmhlaWdodCk7XG4gICAgICAgICAgICBzaXplLndpZHRoID0gc2l6ZS53aWR0aCArIFBBRERJTkcgKiAzICsgaWNvbnNpemU7XG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9fZm9udFJlY3QudHJhbnNsYXRlKGwsIHQpO1xuICAgICAgICAgICAgdGhpcy5fX2ljb25SZWN0LnRyYW5zbGF0ZShsICsgUEFERElORyArIHRoaXMuX19mb250UmVjdC53aWR0aCwgdCk7XG4gICAgICAgIH1cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1RleHQodGhpcy5zZXJpZXMubmFtZSwgdGhpcy5fX2ZvbnRSZWN0LnN0YXJ0UG9pbnQsIHRoaXMuZm9udCk7XG4gICAgICAgICAgICB0aGlzLmljb24uZHJhdyh0aGlzLl9faWNvblJlY3QsIGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgb25Nb3VzZUV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmFjdGlvbiA9PSBNb3Rpb25FdmVudC5BQ1RJT05fQ0xJQ0spIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50IFwiKTtcbiAgICAgICAgICAgICAgICB3aW5kb3dbJ0V2ZW50SGFuZGxlciddKG5ldyBQb2ludChldmVudC54LCBldmVudC55KSwgRWxlbWVudFR5cGUuU2VyaWVzTGVnZW5kLCB7ICdzZXJpZXMnOiB0aGlzLnNlcmllcy5uYW1lLCAnZW5hYmxlJzogdGhpcy5zZXJpZXMuZW5hYmxlIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFic3RyYWN0IGNsYXNzIEljb24ge1xuICAgICAgICBjb2xvcjogc3RyaW5nO1xuICAgICAgICBhYnN0cmFjdCBkcmF3KHJlY3Q6IFJlY3QsIGNhbnZhczogQ2FudmFzKTogdm9pZDtcbiAgICB9XG4gICAgY2xhc3MgQmFySWNvbiBleHRlbmRzIEljb24ge1xuXG4gICAgICAgIGRyYXcocmVjdDogUmVjdCwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3UmVjdChyZWN0LnN0YXJ0UG9pbnQsIHJlY3QuZW5kUG9pbnQsIHRydWUsIHRoaXMuY29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsYXNzIENpcmNsZUljb24gZXh0ZW5kcyBJY29uIHtcblxuICAgICAgICBkcmF3KHJlY3Q6IFJlY3QsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0FyYyhyZWN0LCAwLCAyICogMTgwLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaGFwZSB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIFBSSU9SSVRZIDpudW1iZXI9IDEwMDAwO1xuICAgICAgICBwdWJsaWMgcmVjdDpSZWN0O1xuXG5cbiAgICAgICAgcHVibGljIHByaW9yaXR5Om51bWJlcj0gU2hhcGUuUFJJT1JJVFk7XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgYW5pbWF0aW9uOkFuaW1hdGlvbjtcblxuICAgICAgICBwcm90ZWN0ZWQgX3N0eWxlIDpTdHlsZTtcbiAgICAgICAgICAgIFxuICAgICAgICBwdWJsaWMgc2V0IHN0eWxlKHZhbHVlOlN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBzdHlsZSgpOlN0eWxle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIF9zdHJva2VTdHlsZTpTdHJva2VTdHlsZTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgdGhpcy5yZWN0ID0gbmV3IFJlY3QoMCwwLDAsMCk7XG4gICAgICAgIH1cblxuICAgICAgICBkcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7IFxuICAgICAgICAgICAgdGhpcy5vbkRyYXcoY2FudmFzLHRoaXMucmVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBvbkRyYXcoY2FudmFzOiBDYW52YXMscmVjdDpSZWN0KTogdm9pZDtcblxuICAgICAgICBhYnN0cmFjdCByZWZyZXNoKCk6IHZvaWQ7XG5cbiAgICB9XG59IiwibmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRm9udCA9IGFuZHJvaWQuZ3JhcGhpY3MuRm9udDtcbiAgICBleHBvcnQgY2xhc3MgTGFiZWwgZXh0ZW5kcyBTaGFwZSB7XG5cbiAgICAgICAgcHVibGljIHRleHQ6IHN0cmluZztcbiAgICAgICAgcHVibGljIGxhYmVscmVjdDogUm90YXRlUmVjdDtcbiAgICAgICAgcHVibGljIF9zdHlsZTogU3R5bGU7XG4gICAgICAgIHByaXZhdGUgX3hzOiBudW1iZXJbXTtcbiAgICAgICAgcHJpdmF0ZSBfeXM6IG51bWJlcltdO1xuICAgICAgICBjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcsIGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyLCBhbmdsZTogbnVtYmVyKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgICAgIHRoaXMubGFiZWxyZWN0ID0gbmV3IFJvdGF0ZVJlY3QoY3gsIGN5LCB3LCBoLCAoYW5nbGUgPT0gbnVsbCB8fCBpc05hTihhbmdsZSkpID8gMCA6IGFuZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuX3hzID1bXTtcbiAgICAgICAgICAgIHRoaXMuX3lzPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNCAmJiBpIDwgdGhpcy5sYWJlbHJlY3QucG9pbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feHNbaV0gPSB0aGlzLmxhYmVscmVjdC5wb2ludHNbaV0ueDtcbiAgICAgICAgICAgICAgICB0aGlzLl95c1tpXSA9IHRoaXMubGFiZWxyZWN0LnBvaW50c1tpXS55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzLCByZWN0OiBSZWN0KTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1BvbHlnb24odGhpcy5feHMsdGhpcy5feXMsdGhpcy5fc3R5bGUuYmFja2dyb3VuZCk7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1RleHQodGhpcy50ZXh0LCB0aGlzLmxhYmVscmVjdC5sZWZ0VG9wLCB0aGlzLl9zdHlsZS5mb250KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2goKTogdm9pZCB7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsb3RTaGFwZSBleHRlbmRzIFNoYXBlIHtcbiAgICAgICAgcHVibGljIGxhYmVsOiBMYWJlbDtcbiAgICAgICAgZHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuZHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMubGFiZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWwub25EcmF3KGNhbnZhcywgdGhpcy5yZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2goKTogdm9pZCB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiAqKiogeW91LCB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBiZWVuIGltcGxlbWVudGVkIHlldCEhISBcIik7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgQmFyU2hhcGUgZXh0ZW5kcyBQbG90U2hhcGUge1xuICAgICAgICBcbiAgICAgICAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIsdzpudW1iZXIsaDpudW1iZXIsc3R5bGU/OlN0eWxlLHN0cm9rZVN0eWxlPzpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5yZWN0LmxlZnQgPXg7XG4gICAgICAgICAgICB0aGlzLnJlY3QucmlnaHQgPXggK3c7XG4gICAgICAgICAgICB0aGlzLnJlY3QudG9wID0geTtcbiAgICAgICAgICAgIHRoaXMucmVjdC5ib3R0b20gPXkraDtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gc3R5bGU7XG4gICAgICAgICAgICBpZihzdHlsZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZSA9IERlZmF1bHQuc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9c3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICBpZihzdHJva2VTdHlsZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnJlY3QuaGVpZ2h0IDwgMCl7XG4gICAgICAgICAgICAgICAgbGV0IHRvcCA9IHRoaXMucmVjdC5ib3R0b207XG4gICAgICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMucmVjdC50b3A7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWN0LnRvcCAgPSB0b3A7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWN0LmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcywgcmVjdDogUmVjdCk6IHZvaWQge1xuICAgICAgICAgICAgY2FudmFzLmRyYXdSZWN0KHRoaXMucmVjdC5zdGFydFBvaW50LHRoaXMucmVjdC5lbmRQb2ludCx0cnVlLHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFJhZGlhbEJhclNoYXBlIGV4dGVuZHMgUGxvdFNoYXBlIHtcbiAgICAgICAgcHJvdGVjdGVkIF9jeDpudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfY3k6bnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX2lubmVyUmFkaXVzOm51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9yYWRpdXM6bnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX3N0YXJ0QW5nbGU6bnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX3N3ZWVwOm51bWJlcjtcbiAgICAgICAgY29uc3RydWN0b3IoY3g6bnVtYmVyLGN5Om51bWJlcixpbm5lclJhZGl1czpudW1iZXIscmFkaXVzOm51bWJlcixzdGFydEFuZ2xlOm51bWJlcixzd2VlcDpudW1iZXIsc3R5bGU/OlN0eWxlLHN0cm9rZVN0eWxlPzpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5yZWN0LmxlZnQgPWN4LXJhZGl1cztcbiAgICAgICAgICAgIHRoaXMucmVjdC5yaWdodCA9Y3ggK3JhZGl1cztcbiAgICAgICAgICAgIHRoaXMucmVjdC50b3AgPSBjeS1yYWRpdXM7XG4gICAgICAgICAgICB0aGlzLnJlY3QuYm90dG9tID1jeStyYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9jeCA9IGN4O1xuICAgICAgICAgICAgdGhpcy5fY3kgPSBjeTtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyUmFkaXVzID0gaW5uZXJSYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICAgICAgICAgIHRoaXMuX3N3ZWVwID0gc3dlZXA7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgaWYoc3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPXN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgaWYoc3Ryb2tlU3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5fc3dlZXAgPCAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gdGhpcy5fc3RhcnRBbmdsZSArIHRoaXMuX3N3ZWVwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N3ZWVwID0gdGhpcy5fc3dlZXAgKi0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzLCByZWN0OiBSZWN0KTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0RvbnV0KHRoaXMuX2N4LHRoaXMuX2N5LHRoaXMuX3JhZGl1cyx0aGlzLl9pbm5lclJhZGl1cyx0aGlzLl9zdGFydEFuZ2xlLHRoaXMuX3N3ZWVwLHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFNjYXR0ZXJTaGFwZSBleHRlbmRzIFBsb3RTaGFwZSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcix3Om51bWJlcixoOm51bWJlcixzdHlsZT86U3R5bGUsc3Ryb2tlU3R5bGU/OlN0cm9rZVN0eWxlKXtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnJlY3QubGVmdCA9eDtcbiAgICAgICAgICAgIHRoaXMucmVjdC5yaWdodCA9eCArdztcbiAgICAgICAgICAgIHRoaXMucmVjdC50b3AgPSB5O1xuICAgICAgICAgICAgdGhpcy5yZWN0LmJvdHRvbSA9eStoO1xuICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgIGlmKHN0eWxlID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gRGVmYXVsdC5zdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID1zdHJva2VTdHlsZTtcbiAgICAgICAgICAgIGlmKHN0cm9rZVN0eWxlID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucmVjdC5oZWlnaHQgPCAwKXtcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gdGhpcy5yZWN0LmJvdHRvbTtcbiAgICAgICAgICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5yZWN0LnRvcDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3QudG9wICA9IHRvcDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3QuYm90dG9tID0gYm90dG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IFNoYXBlLlBSSU9SSVRZICsyO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzLCByZWN0OiBSZWN0KTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0FyYyh0aGlzLnJlY3QsMCwyKjE4MCAsdGhpcy5zdHlsZS5iYWNrZ3JvdW5kKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgTGluZXNTaGFwZSBleHRlbmRzIFBsb3RTaGFwZSB7XG4gICAgICAgIHByaXZhdGUgX194czpudW1iZXJbXTtcbiAgICAgICAgcHJpdmF0ZSBfX3lzOm51bWJlcltdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhzOm51bWJlcltdLHlzOm51bWJlcltdLHN0eWxlPzpTdHlsZSxzdHJva2VTdHlsZT86U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBTaGFwZS5QUklPUklUWSArMTtcbiAgICAgICAgICAgIHRoaXMuX194cyA9IHhzO1xuICAgICAgICAgICAgdGhpcy5fX3lzID0geXM7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgaWYoc3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPXN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgaWYoc3Ryb2tlU3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgZ2V0IHN0cm9rZVN0eWxlKCk6U3Ryb2tlU3R5bGV7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlU3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHN0cm9rZVN0eWxlKHZhbHVlOlN0cm9rZVN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMsIHJlY3Q6IFJlY3QpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY2FudmFzLmRyYXdSZWN0KHRoaXMucmVjdC5zdGFydFBvaW50LHRoaXMucmVjdC5lbmRQb2ludCx0cnVlLHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lcyh0aGlzLl9feHMsdGhpcy5fX3lzLHRoaXMuX3N0cm9rZVN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgQXJlYVNoYXBlIGV4dGVuZHMgUGxvdFNoYXBlIHtcbiAgICAgICAgcHJpdmF0ZSBfX3hzOm51bWJlcltdO1xuICAgICAgICBwcml2YXRlIF9feXM6bnVtYmVyW107XG5cbiAgICAgICAgY29uc3RydWN0b3IoeHM6bnVtYmVyW10seXM6bnVtYmVyW10sc3R5bGU/OlN0eWxlLHN0cm9rZVN0eWxlPzpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IFNoYXBlLlBSSU9SSVRZICsxO1xuICAgICAgICAgICAgdGhpcy5fX3hzID0geHM7XG4gICAgICAgICAgICB0aGlzLl9feXMgPSB5cztcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gc3R5bGU7XG4gICAgICAgICAgICBpZihzdHlsZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZSA9IERlZmF1bHQuc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9c3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICBpZihzdHJva2VTdHlsZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBnZXQgc3Ryb2tlU3R5bGUoKTpTdHJva2VTdHlsZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJva2VTdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgc3Ryb2tlU3R5bGUodmFsdWU6U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcywgcmVjdDogUmVjdCk6IHZvaWQge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjYW52YXMuZHJhd1JlY3QodGhpcy5yZWN0LnN0YXJ0UG9pbnQsdGhpcy5yZWN0LmVuZFBvaW50LHRydWUsdGhpcy5fc3R5bGUuYmFja2dyb3VuZCk7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1BvbHlnb24odGhpcy5fX3hzLHRoaXMuX195cyx0aGlzLnN0eWxlLmJhY2tncm91bmQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld1N0YXRlID0gYW5kcm9pZC52aWV3LlZpZXdTdGF0ZTtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgZXhwb3J0IGNsYXNzIEF4aXNMaW5lU2hhcGUgZXh0ZW5kcyBTaGFwZSB7XG4gICAgICAgIHByaXZhdGUgc3RhcnRQb2ludDogUG9pbnQ7XG4gICAgICAgIHByaXZhdGUgZW5kUG9pbnQ6IFBvaW50O1xuICAgICAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZXg6IG51bWJlciwgZXk6IG51bWJlciwgc3Ryb2tlU3R5bGU/OiBTdHJva2VTdHlsZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRQb2ludCA9IG5ldyBQb2ludCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMuZW5kUG9pbnQgPSBuZXcgUG9pbnQoZXgsIGV5KTtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gc3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICBpZiAoc3Ryb2tlU3R5bGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcywgcmVjdDogUmVjdCk6IHZvaWQge1xuICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKHRoaXMuc3RhcnRQb2ludCwgdGhpcy5lbmRQb2ludCxcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHJlZnJlc2goKSB7IH1cbiAgICB9XG59XG4iLCJuYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDsgICAgXG4gICAgLyoqXG4gICAgICogQmFzZUxheW91dFxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBCYXNlTGF5b3V0e1xuICAgICAgICBwcm90ZWN0ZWQgX19zaGFwZWxpc3QgOlNoYXBlW10gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGNvbnZlcnQoLi4uYXJncyk6U2hhcGVbXXtcbiAgICAgICAgICAgIHRocm93ICdmdWNrIEVycm9yJztcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IHNoYXBlTGlzdCgpOlNoYXBlW117XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NoYXBlbGlzdDtcbiAgICAgICAgfVxuICAgICAgICByZWFkb25seSBzY2FsZVBhaXJzIDogeyAgc2VyaWVzOnN0cmluZ1tdLGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXTsgICAgICAgICAgICBcbiAgICB9XG5cblxuICAgICAgICBcbiAgXG4gICBcbiAgICBcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2FydGVzaWFuTGF5b3V0IGV4dGVuZHMgQmFzZUxheW91dCB7XG4gICAgICAgIHB1YmxpYyBiYXJTdHlsZTogU3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICBwdWJsaWMgbGluZVN0eWxlOiBTdHJva2VTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgIHByb3RlY3RlZCBfX3NjYWxlUGFpcnM6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdO1xuICAgICAgICBwcm90ZWN0ZWQgX2xvY2F0aW9uQ2FjaGU6IHsga2V5OiBzdHJpbmcgfCBudW1iZXIsIHBvaW50czogYW55W10gfVtdID0gW107XG4gICAgICAgIHByb3RlY3RlZCBfc2VyaWVzbGlzdDogU2VyaWVzW107XG4gICAgICAgIHByb3RlY3RlZCBfc3RhY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgcHJvdGVjdGVkIF9yZWN0OiBSZWN0ID0gbnVsbDtcbiAgICAgICAgcHJvdGVjdGVkIF9lbmNvZGluZzogRW5jb2Rpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnZlcnQoc2VyaWVzbGlzdDogU2VyaWVzW10sIGVuY29kaW5nOiBFbmNvZGluZywgcmVjdDogUmVjdCk6IFNoYXBlW10ge1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5fc2VyaWVzbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgc2VyIG9mIHNlcmllc2xpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZXNsaXN0LnB1c2goc2VyLmNsb25lKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uQ2FjaGUgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzID0gW107XG4gICAgICAgICAgICB0aGlzLl9zdGFjayA9IGVuY29kaW5nLl9zdGFjaztcbiAgICAgICAgICAgIHRoaXMuX3JlY3QgPSByZWN0O1xuICAgICAgICAgICAgdGhpcy5fX2FuYWx5c2VTY2FsZXMoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dFNlcmllcyh0aGlzLl9zZXJpZXNsaXN0W2ldLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2hhcGVsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfX2FuYWx5c2VTY2FsZXMoKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVMYXlvdXRTY2FsZXModGhpcy5fZW5jb2RpbmcpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBzZXIgb2YgdGhpcy5fc2VyaWVzbGlzdCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNjYWxlcGFpciBvZiBzZXIuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gc2NhbGVwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gc2NhbGVwYWlyLnNjYWxlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5uYW1lID09ICd4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVkLmJhbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2VCb3VuZHMoW3RoaXMuX3JlY3QubGVmdCwgdGhpcy5fcmVjdC5yaWdodF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9yZWN0LmxlZnQsIHRoaXMuX3JlY3QucmlnaHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9yZWN0LmxlZnQsIHRoaXMuX3JlY3QucmlnaHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlZC5uYW1lID09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVkLmJhbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2VCb3VuZHMoW3RoaXMuX3JlY3QuYm90dG9tLCB0aGlzLl9yZWN0LnRvcF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9yZWN0LmJvdHRvbSwgdGhpcy5fcmVjdC50b3BdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aWNrZXI6IExpbmVhclRpY2tzID0gTGluZWFyVGlja3MuY3JlYXRlKHNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHRpY2tlci5uaWNlU2NhbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShbdGhpcy5fcmVjdC5ib3R0b20sIHRoaXMuX3JlY3QudG9wXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jcmVhdGVMYXlvdXRTY2FsZXMoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2VyaWVzbGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXM6IFNlcmllcyA9IHRoaXMuX3Nlcmllc2xpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2Ygc2VyaWVzLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlZDogRmllbGQgPSBwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc2FkZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwIG9mIHRoaXMuX19zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwLmZpbGVkLmVxdWFscyhmaWxlZCkgfHwgIXAuc2NhbGUuZXF1YWwocGFpci5zY2FsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzYWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLnNlcmllcy5wdXNoKHNlcmllcy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNhZGRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFtzZXJpZXMubmFtZV0sIGZpbGVkOiBmaWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9fc2NhbGVQYWlycyA9IHRoaXMuX3Nlcmllc2xpc3RbMF0uc2NhbGVQYWlycztcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBTZXJpZXMgPSB0aGlzLl9zZXJpZXNsaXN0WzBdO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goe3Nlcmllczpbc2VyaWVzLm5hbWVdLCBmaWxlZDogc2VyaWVzLmZpbGVkLCBzY2FsZTogcGFpci5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHNlcmllcy5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFtzZXJpZXMubmFtZV0sIGZpbGVkOiBwYWlyLmZpbGVkLCBzY2FsZTogcGFpci5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbWF4U2VyaWVzU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IHhzY2FsZSA9IHRoaXMuX2dldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBpZiAoeHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHhzY2FsZS5kb21haW5zLmxlbmd0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxpdHkubWF4KHRoaXMuX3Nlcmllc2xpc3QubWFwKChzZXI6IFNlcmllcywgaW5kZXg6IG51bWJlciwgYXJyYXk6IFNlcmllc1tdKSA9PiB7IHJldHVybiBzZXIuc2l6ZTsgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfbGF5b3V0U2VyaWVzKHNlcmllczogU2VyaWVzLCBpbmRleDogbnVtYmVyKTogdm9pZDtcblxuXG4gICAgICAgIGdldCBzY2FsZVBhaXJzKCk6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2NhbGVQYWlycztcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9nZXRTY2FsZShuYW1lOiBzdHJpbmcpOiBTY2FsZSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLl9fc2NhbGVQYWlycywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5maWxlZC5uYW1lID09IG5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2NhbGVQYWlyc1tpbmRleF0uc2NhbGU7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIEJhckxheW91dCBleHRlbmRzIENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgZ2V0IGJhcldpZHRoKCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Qud2lkdGgvdGhpcy5tYXhTZXJpZXNTaXplLyh0aGlzLl9zdGFjaz8xOnRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoKSAqMC45O1xuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0U2VyaWVzKHNlcmllczpTZXJpZXMsaW5kZXg6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCB4U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGxldCB5U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3knKTtcbiAgICAgICAgICAgIGxldCBjb2xvclNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdjb2xvcicpO1xuICAgICAgICAgICAgbGV0IGNvbG9yQXJyYXk6c3RyaW5nW109W107XG4gICAgICAgICAgICBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKXtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlID0gY29sb3JTY2FsZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBDb2xvclV0aWxzLmdyYWRpZW50Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sKDxPcmRpbmFsU2NhbGU+Y29sb3JTY2FsZSkuZG9tYWlucy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbG9yU2NhbGUucmFuZ2UoWzAsKDxPcmRpbmFsU2NhbGU+Y29sb3JTY2FsZSkuZG9tYWlucy5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlZmF1bHRjb2xvcjpzdHJpbmcgPUNvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgZm9yKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKXtcbiAgICAgICAgICAgICAgICBpZiggcHQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4dmFsdWUgOlZhbHVlPSBwdC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeXZhbHVlIDpWYWx1ZT0gcHQueTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9ydmFsdWUgOlZhbHVlID0gcHQuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFwZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA6VmFsdWU9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSArKHRoaXMuX3N0YWNrID8wOigoaW5kZXggLSAodGhpcy5fc2VyaWVzbGlzdC5sZW5ndGgtMSkvMikgKiB0aGlzLmJhcldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5MCA9IHl2YWx1ZS5pc011bHRpcGxlPyB5dmFsdWUudmFsdWVbMF06KHlTY2FsZS5taW48MD8wOnlTY2FsZS5taW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTEgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl0b3A6bnVtYmVyID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeTEpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgOnN0cmluZyA9IGRlZmF1bHRjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JpbmRleCA9IGNvbG9yU2NhbGUuZ2V0U2NhbGVWYWx1ZShjb2xvcnZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGNvbG9yQXJyYXlbY29sb3JpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9yVXRpbHMuZ2V0Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sY29sb3J2YWx1ZS52YWx1ZSxjb2xvclNjYWxlLm1pbixjb2xvclNjYWxlLm1heCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHlib3R0b20gOm51bWJlciA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoeTAgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh5U2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5MCBcIiArIHkwICsgXCIgeUJvdHRvbSBcIiArIHlib3R0b20pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHhsZWZ0IDpudW1iZXIgPSB4LSAgdGhpcy5iYXJXaWR0aC8yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHJpZ2h0IDpudW1iZXIgPSB4ICt0aGlzLmJhcldpZHRoLzI7XG4gICAgICAgICAgICAgICAgICAgIGxldCBiYXJTaGFwZTpCYXJTaGFwZSA9IG5ldyBCYXJTaGFwZSh4bGVmdCx5dG9wLHhyaWdodC14bGVmdCx5Ym90dG9tLXl0b3ApO1xuICAgICAgICAgICAgICAgICAgICBiYXJTaGFwZS5zdHlsZSA9IG5ldyBTdHlsZShcImdyYXlcIixEZWZhdWx0LmZvbnQsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFyU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhclNoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKGJhclNoYXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFNjYXR0ZXJMYXlvdXQgZXh0ZW5kcyBDYXJ0ZXNpYW5MYXlvdXR7XG4gICAgICAgIGdldCBiYXJXaWR0aCgpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWN0LndpZHRoL3RoaXMubWF4U2VyaWVzU2l6ZS8odGhpcy5fc3RhY2s/MTp0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCkgKjAuOTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6U2VyaWVzLGluZGV4Om51bWJlcik6dm9pZHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgeFNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgnY29sb3InKTtcbiAgICAgICAgICAgIGxldCBzaXplU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3NpemUnKTtcbiAgICAgICAgICAgIGxldCBkZWZhdWx0Y29sb3I6c3RyaW5nID1Db2xvclV0aWxzLmluZGV4Q29sb3Ioc2VyaWVzLmluZGV4KTtcbiAgICAgICAgICAgIGxldCBjb2xvckFycmF5OnN0cmluZ1tdPVtdO1xuICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZSA9IGNvbG9yU2NhbGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBjb2xvckFycmF5ID0gQ29sb3JVdGlscy5ncmFkaWVudENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlLnJhbmdlKFswLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZWZhdWx0c2l6ZTpudW1iZXIgPSAxMDtcbiAgICAgICAgICAgIGZvcihsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cyl7XG4gICAgICAgICAgICAgICAgaWYoIHB0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvclZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGVWYWx1ZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZVZhbHVlIDpWYWx1ZT0gcHQuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSB4U2NhbGUuZ2V0U2NhbGVWYWx1ZSh4dmFsdWUudmFsdWUpIDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHk6bnVtYmVyID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeXZhbHVlLmlzTXVsdGlwbGU/eXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzIDpudW1iZXIgPSBzaXplU2NhbGUuZ2V0U2NhbGVWYWx1ZShzaXplVmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZihpc05hTihzKSB8fCBzID09IG51bGwgfHwgcyA8PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IGRlZmF1bHRzaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IGRlZmF1bHRjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JpbmRleCA9IGNvbG9yU2NhbGUuZ2V0U2NhbGVWYWx1ZShjb2xvclZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGNvbG9yQXJyYXlbY29sb3JpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9yVXRpbHMuZ2V0Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sY29sb3JWYWx1ZS52YWx1ZSxjb2xvclNjYWxlLm1pbixjb2xvclNjYWxlLm1heCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYXR0ZXJTaGFwZSA6U2NhdHRlclNoYXBlID0gbmV3IFNjYXR0ZXJTaGFwZSh4LXMvMix5LXMvMixzLHMsRGVmYXVsdC5zdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlclNoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlclNoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKHNjYXR0ZXJTaGFwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0TGluZSgpe1xuICAgICAgICB9ICAgICAgICAgICAgXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJhZGlhbENhcnRlc2lhbkxheW91dCBleHRlbmRzIEJhc2VMYXlvdXQge1xuICAgICAgICBwdWJsaWMgYmFyU3R5bGU6IFN0eWxlID0gRGVmYXVsdC5zdHlsZTtcbiAgICAgICAgcHVibGljIGxpbmVTdHlsZTogU3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICBwcm90ZWN0ZWQgX19zY2FsZVBhaXJzOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXTtcbiAgICAgICAgcHJvdGVjdGVkIF9sb2NhdGlvbkNhY2hlOiB7IGtleTogc3RyaW5nIHwgbnVtYmVyLCBwb2ludHM6IGFueVtdIH1bXSA9IFtdO1xuICAgICAgICBwcm90ZWN0ZWQgX3Nlcmllc2xpc3Q6IFNlcmllc1tdO1xuICAgICAgICBwcm90ZWN0ZWQgX3N0YWNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByb3RlY3RlZCBfZW5jb2Rpbmc6IEVuY29kaW5nO1xuICAgICAgICBwcm90ZWN0ZWQgX2N4OiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfY3k6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9pbm5lclJhZGl1czogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX3JhZGl1czogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX3N0YXJ0QW5nbGU6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9lbmRBbmdsZTogbnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udmVydChzZXJpZXNsaXN0OiBTZXJpZXNbXSwgZW5jb2Rpbmc6IEVuY29kaW5nLCBjeDogbnVtYmVyLCBjeTogbnVtYmVyLCBpbm5lclJhZGl1czogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgc3RhcnRBbmdsZTogbnVtYmVyLCBlbmRBbmdsZTogbnVtYmVyKTogU2hhcGVbXSB7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9zZXJpZXNsaXN0ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBzZXIgb2Ygc2VyaWVzbGlzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nlcmllc2xpc3QucHVzaChzZXIuY2xvbmUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lbmNvZGluZyA9IGVuY29kaW5nO1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25DYWNoZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3N0YWNrID0gZW5jb2RpbmcuX3N0YWNrO1xuICAgICAgICAgICAgdGhpcy5fY3ggPSBjeDtcbiAgICAgICAgICAgIHRoaXMuX2N5ID0gY3k7XG4gICAgICAgICAgICB0aGlzLl9pbm5lclJhZGl1cyA9IGlubmVyUmFkaXVzO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRBbmdsZSA9IHN0YXJ0QW5nbGU7XG4gICAgICAgICAgICB0aGlzLl9lbmRBbmdsZSA9IGVuZEFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5fX2FuYWx5c2VTY2FsZXMoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dFNlcmllcyh0aGlzLl9zZXJpZXNsaXN0W2ldLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2hhcGVsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfX2FuYWx5c2VTY2FsZXMoKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVMYXlvdXRTY2FsZXModGhpcy5fZW5jb2RpbmcpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBzZXIgb2YgdGhpcy5fc2VyaWVzbGlzdCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNjYWxlcGFpciBvZiBzZXIuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gc2NhbGVwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gc2NhbGVwYWlyLnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZWQubmFtZSA9PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5iYW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlQm91bmRzKFt0aGlzLl9pbm5lclJhZGl1cywgdGhpcy5fcmFkaXVzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2UoW3RoaXMuX2lubmVyUmFkaXVzLCB0aGlzLl9yYWRpdXNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9pbm5lclJhZGl1cywgdGhpcy5fcmFkaXVzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZWQubmFtZSA9PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5iYW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlQm91bmRzKFt0aGlzLl9zdGFydEFuZ2xlLCB0aGlzLl9lbmRBbmdsZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9zdGFydEFuZ2xlLCB0aGlzLl9lbmRBbmdsZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpY2tlcjogTGluZWFyVGlja3MgPSBMaW5lYXJUaWNrcy5jcmVhdGUoc2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gdGlja2VyLm5pY2VTY2FsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9zdGFydEFuZ2xlLCB0aGlzLl9lbmRBbmdsZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlTGF5b3V0U2NhbGVzKGVuY29kaW5nOiBFbmNvZGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBTZXJpZXMgPSB0aGlzLl9zZXJpZXNsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHNlcmllcy5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gcGFpci5maWxlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNhZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLl9fc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcC5maWxlZC5lcXVhbHMoZmlsZWQpIHx8ICFwLnNjYWxlLmVxdWFsKHBhaXIuc2NhbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2FkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5zZXJpZXMucHVzaChzZXJpZXMubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzYWRkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWVdLCBmaWxlZDogZmlsZWQsIHNjYWxlOiBwYWlyLnNjYWxlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fX3NjYWxlUGFpcnMgPSB0aGlzLl9zZXJpZXNsaXN0WzBdLnNjYWxlUGFpcnM7XG4gICAgICAgICAgICAgICAgbGV0IHNlcmllczogU2VyaWVzID0gdGhpcy5fc2VyaWVzbGlzdFswXTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHtzZXJpZXM6W3Nlcmllcy5uYW1lXSwgZmlsZWQ6IHNlcmllcy5maWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiBzZXJpZXMuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWVdLCBmaWxlZDogcGFpci5maWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG1heFNlcmllc1NpemUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGxldCB4c2NhbGUgPSB0aGlzLl9nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgaWYgKHhzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4c2NhbGUuZG9tYWlucy5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsaXR5Lm1heCh0aGlzLl9zZXJpZXNsaXN0Lm1hcCgoc2VyOiBTZXJpZXMsIGluZGV4OiBudW1iZXIsIGFycmF5OiBTZXJpZXNbXSkgPT4geyByZXR1cm4gc2VyLnNpemU7IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2xheW91dFNlcmllcyhzZXJpZXM6IFNlcmllcywgaW5kZXg6IG51bWJlcik6IHZvaWQ7XG5cbiAgICAgICAgLy8gcHJvdGVjdGVkIF9wcmVBbmFseXNlU2VyaWVzKCkge1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgc2VyIG9mIHRoaXMuX3Nlcmllc2xpc3QpIHtcbiAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBwdCBvZiBzZXIucG9pbnRzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCB4dmFsdWUgPSBwdC54O1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLl9sb2NhdGlvbkNhY2hlLCAna2V5JywgeHZhbHVlLnZhbHVlKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvY2F0aW9uQ2FjaGVbaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbkNhY2hlW2luZGV4XS5wb2ludHMucHVzaChwdCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uQ2FjaGUucHVzaCh7IGtleTogeHZhbHVlLnZhbHVlLCBwb2ludHM6IFtwdF0gfSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgZ2V0IHNjYWxlUGFpcnMoKTogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zY2FsZVBhaXJzO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX2dldFNjYWxlKG5hbWU6IHN0cmluZyk6IFNjYWxlIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KHRoaXMuX19zY2FsZVBhaXJzLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmZpbGVkLm5hbWUgPT0gbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zY2FsZVBhaXJzW2luZGV4XS5zY2FsZTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsQmFyTGF5b3V0IGV4dGVuZHMgUmFkaWFsQ2FydGVzaWFuTGF5b3V0e1xuICAgICAgICBnZXQgYmFyV2lkdGgoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX3JhZGl1cy10aGlzLl9pbm5lclJhZGl1cykvdGhpcy5tYXhTZXJpZXNTaXplLyh0aGlzLl9zdGFjaz8xOnRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoKSAqMC45O1xuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0U2VyaWVzKHNlcmllczpTZXJpZXMsaW5kZXg6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCB4U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGxldCB5U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3knKTtcbiAgICAgICAgICAgIGxldCBjb2xvclNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdjb2xvcicpO1xuICAgICAgICAgICAgbGV0IGNvbG9yQXJyYXk6c3RyaW5nW109W107XG4gICAgICAgICAgICBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKXtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlID0gY29sb3JTY2FsZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBDb2xvclV0aWxzLmdyYWRpZW50Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sKDxPcmRpbmFsU2NhbGU+Y29sb3JTY2FsZSkuZG9tYWlucy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbG9yU2NhbGUucmFuZ2UoWzAsKDxPcmRpbmFsU2NhbGU+Y29sb3JTY2FsZSkuZG9tYWlucy5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlZmF1bHRjb2xvcjpzdHJpbmcgPUNvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgZm9yKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKXtcbiAgICAgICAgICAgICAgICBpZiggcHQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4dmFsdWUgOlZhbHVlPSBwdC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeXZhbHVlIDpWYWx1ZT0gcHQueTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9ydmFsdWUgOlZhbHVlID0gcHQuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFwZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA6VmFsdWU9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSArKHRoaXMuX3N0YWNrID8wOigoaW5kZXggLSAodGhpcy5fc2VyaWVzbGlzdC5sZW5ndGgtMSkvMikgKiB0aGlzLmJhcldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5MCA9IHl2YWx1ZS5pc011bHRpcGxlPyB5dmFsdWUudmFsdWVbMF06KHlTY2FsZS5taW48MD8wOnlTY2FsZS5taW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTEgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHlFbmRBbmdsZTpudW1iZXIgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZSh5MSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA6c3RyaW5nID0gZGVmYXVsdGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcmluZGV4ID0gY29sb3JTY2FsZS5nZXRTY2FsZVZhbHVlKGNvbG9ydmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gY29sb3JBcnJheVtjb2xvcmluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JVdGlscy5nZXRDb2xvcihjb2xvclNjYWxlLnN0YXJ0UG9zaXRpb24sY29sb3JTY2FsZS5lbmRQb3NpdGlvbixjb2xvcnZhbHVlLnZhbHVlLGNvbG9yU2NhbGUubWluLGNvbG9yU2NhbGUubWF4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgeVN0YXJ0QW5nbGUgOm51bWJlciA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkwKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhJbm5lclJhZGl1cyA6bnVtYmVyID0geC0gIHRoaXMuYmFyV2lkdGgvMjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhPdXR0ZXJSYWRpdXMgOm51bWJlciA9IHggK3RoaXMuYmFyV2lkdGgvMjtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGJhclNoYXBlOkJhclNoYXBlID0gbmV3IEJhclNoYXBlKHhsZWZ0LHlFbmRBbmdsZSx4cmlnaHQteGxlZnQseWJvdHRvbS15RW5kQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmFyU2hhcGUgOlJhZGlhbEJhclNoYXBlID0gbmV3IFJhZGlhbEJhclNoYXBlKHRoaXMuX2N4LHRoaXMuX2N5LHhJbm5lclJhZGl1cyx4T3V0dGVyUmFkaXVzLHlTdGFydEFuZ2xlLHlFbmRBbmdsZS15U3RhcnRBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIGJhclNoYXBlLnN0eWxlID0gbmV3IFN0eWxlKFwiZ3JheVwiLERlZmF1bHQuZm9udCxEZWZhdWx0LnN0cm9rZXN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sb3IgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFyU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IGRlZmF1bHRjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2goYmFyU2hhcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsTGluZUxheW91dCBleHRlbmRzIFJhZGlhbENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRTZXJpZXMoc2VyaWVzOlNlcmllcyxpbmRleDpudW1iZXIpOnZvaWR7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgbGV0IHlTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneScpO1xuICAgICAgICAgICAgbGV0IGNvbG9yU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgeHM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgeXM6bnVtYmVyW109W107XG4gICAgICAgICAgICBmb3IobGV0IHB0IG9mIHNlcmllcy5wb2ludHMpe1xuICAgICAgICAgICAgICAgIGlmKCBwdCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcnZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgOlZhbHVlPSBwdC5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCByYWRpdXM6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSA7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZ2xlID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeXZhbHVlLmlzTXVsdGlwbGU/IHl2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy5fY3kgKyBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIHhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHlzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxpbmVzU2hhcGU6TGluZXNTaGFwZSA9IG5ldyBMaW5lc1NoYXBlKHhzLHlzLG51bGwsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgICAgICBsaW5lc1NoYXBlLnN0cm9rZVN0eWxlLnN0cm9rZUNvbG9yID0gQ29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2gobGluZXNTaGFwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKXtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsQXJlYUxheW91dCBleHRlbmRzIFJhZGlhbENhcnRlc2lhbkxheW91dCB7XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0U2VyaWVzKHNlcmllczogU2VyaWVzLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTogU2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGxldCB5U2NhbGU6IFNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTogU2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgeHM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBsZXQgeXM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHB0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlOiBWYWx1ZSA9IHB0Lng7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5dmFsdWU6IFZhbHVlID0gcHQueTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9ydmFsdWU6IFZhbHVlID0gcHQuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFwZTogVmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemU6IFZhbHVlID0gcHQuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSB4U2NhbGUuZ2V0U2NhbGVWYWx1ZSh4dmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGVWYWx1ZTAgPSB5dmFsdWUuaXNNdWx0aXBsZSA/IHl2YWx1ZS52YWx1ZVswXSA6ICh5U2NhbGUubWluIDwgMCA/IDAgOiB5U2NhbGUubWluKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZ2xlVmFsdWUxID0geXZhbHVlLmlzTXVsdGlwbGUgPyB5dmFsdWUudmFsdWVbMV0gOiB5dmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZTAgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZShhbmdsZVZhbHVlMCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZTEgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZShhbmdsZVZhbHVlMSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IGNvbG9yU2NhbGUuZ2V0U2NhbGVWYWx1ZShjb2xvcnZhbHVlLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeDAgPSB0aGlzLl9jeCArIE1hdGguY29zKGFuZ2xlMCkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5MCA9IHRoaXMuX2N5ICsgTWF0aC5zaW4oYW5nbGUwKSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9jeCArIE1hdGguY29zKGFuZ2xlMSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy5fY3kgKyBNYXRoLnNpbihhbmdsZTEpICogcmFkaXVzO1xuXG4gICAgICAgICAgICAgICAgICAgIHhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHlzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgICAgIHhzLnVuc2hpZnQoeDApO1xuICAgICAgICAgICAgICAgICAgICB5cy51bnNoaWZ0KHkwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGluZXNTaGFwZTogQXJlYVNoYXBlID0gbmV3IEFyZWFTaGFwZSh4cywgeXMsIG51bGwsIERlZmF1bHQuc3Ryb2tlc3R5bGUpO1xuICAgICAgICAgICAgbGluZXNTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gQ29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2gobGluZXNTaGFwZSk7XG5cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKSB7XG5cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsU2NhdHRlckxheW91dCBleHRlbmRzIFJhZGlhbENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgZ2V0IGJhcldpZHRoKCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9yYWRpdXMtdGhpcy5faW5uZXJSYWRpdXMpL3RoaXMubWF4U2VyaWVzU2l6ZS8odGhpcy5fc3RhY2s/MTp0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCkgKjAuOTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6U2VyaWVzLGluZGV4Om51bWJlcik6dm9pZHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgeFNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgnY29sb3InKTtcbiAgICAgICAgICAgIGxldCBzaXplU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3NpemUnKTtcbiAgICAgICAgICAgIGxldCBkZWZhdWx0Y29sb3I6c3RyaW5nID1Db2xvclV0aWxzLmluZGV4Q29sb3Ioc2VyaWVzLmluZGV4KTtcbiAgICAgICAgICAgIGxldCBjb2xvckFycmF5OnN0cmluZ1tdPVtdO1xuICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZSA9IGNvbG9yU2NhbGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBjb2xvckFycmF5ID0gQ29sb3JVdGlscy5ncmFkaWVudENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlLnJhbmdlKFswLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZWZhdWx0c2l6ZTpudW1iZXIgPSAxMDtcbiAgICAgICAgICAgIGZvcihsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cyl7XG4gICAgICAgICAgICAgICAgaWYoIHB0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvclZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGVWYWx1ZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZVZhbHVlIDpWYWx1ZT0gcHQuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOm51bWJlciA9IHhTY2FsZS5nZXRTY2FsZVZhbHVlKHh2YWx1ZS52YWx1ZSkgO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGU6bnVtYmVyID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeXZhbHVlLmlzTXVsdGlwbGU/eXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzIDpudW1iZXIgPSBzaXplU2NhbGUuZ2V0U2NhbGVWYWx1ZShzaXplVmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZihpc05hTihzKSB8fCBzID09IG51bGwgfHwgcyA8PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IGRlZmF1bHRzaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmFkaXVzIFwiICsgcmFkaXVzICtcIiBhbmdsZSBcIiArIGFuZ2xlICk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yaW5kZXggPSBjb2xvclNjYWxlLmdldFNjYWxlVmFsdWUoY29sb3JWYWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBjb2xvckFycmF5W2NvbG9yaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvclV0aWxzLmdldENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLGNvbG9yVmFsdWUudmFsdWUsY29sb3JTY2FsZS5taW4sY29sb3JTY2FsZS5tYXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy5fY3kgKyBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2F0dGVyU2hhcGUgOlNjYXR0ZXJTaGFwZSA9IG5ldyBTY2F0dGVyU2hhcGUoeC1zLzIseS1zLzIscyxzLERlZmF1bHQuc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2xvciAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gZGVmYXVsdGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZWxpc3QucHVzaChzY2F0dGVyU2hhcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKXtcbiAgICAgICAgfSAgICAgICAgICAgIFxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgTGluZUxheW91dCBleHRlbmRzIENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRTZXJpZXMoc2VyaWVzOlNlcmllcyxpbmRleDpudW1iZXIpOnZvaWR7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgbGV0IHlTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneScpO1xuICAgICAgICAgICAgLy8gbGV0IGNvbG9yU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgeHM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgeXM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgZGVmYXVsdGNvbG9yOnN0cmluZyA9Q29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICBmb3IobGV0IHB0IG9mIHNlcmllcy5wb2ludHMpe1xuICAgICAgICAgICAgICAgIGlmKCBwdCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcnZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgOlZhbHVlPSBwdC5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4Om51bWJlciA9IHhTY2FsZS5nZXRTY2FsZVZhbHVlKHh2YWx1ZS52YWx1ZSkgO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0geXZhbHVlLmlzTXVsdGlwbGU/IHl2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgeSA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY29sb3IgPSBjb2xvclNjYWxlLmdldFNjYWxlVmFsdWUoY29sb3J2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHlzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxpbmVzU2hhcGU6TGluZXNTaGFwZSA9IG5ldyBMaW5lc1NoYXBlKHhzLHlzLG51bGwsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgICAgICBsaW5lc1NoYXBlLnN0cm9rZVN0eWxlLnN0cm9rZUNvbG9yID0gQ29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2gobGluZXNTaGFwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKXtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGV4cG9ydCBjbGFzcyBBcmVhTGF5b3V0IGV4dGVuZHMgQ2FydGVzaWFuTGF5b3V0e1xuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6U2VyaWVzLGluZGV4Om51bWJlcik6dm9pZHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgeFNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgnY29sb3InKTtcbiAgICAgICAgICAgIGxldCB4czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIGxldCB5czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIGZvcihsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cyl7XG4gICAgICAgICAgICAgICAgaWYoIHB0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4dmFsdWUgOlZhbHVlPSBwdC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeXZhbHVlIDpWYWx1ZT0gcHQueTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9ydmFsdWUgOlZhbHVlID0gcHQuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFwZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA6VmFsdWU9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSA7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5MCA9IHl2YWx1ZS5pc011bHRpcGxlPyB5dmFsdWUudmFsdWVbMF06KHlTY2FsZS5taW48MD8wOnlTY2FsZS5taW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTEgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB5MCA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkwKTtcbiAgICAgICAgICAgICAgICAgICAgeTEgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZSh5MSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IGNvbG9yU2NhbGUuZ2V0U2NhbGVWYWx1ZShjb2xvcnZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgeHMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgeXMucHVzaCh5MCk7XG4gICAgICAgICAgICAgICAgICAgIHhzLnVuc2hpZnQoeCk7XG4gICAgICAgICAgICAgICAgICAgIHlzLnVuc2hpZnQoeTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsaW5lc1NoYXBlOkFyZWFTaGFwZSA9IG5ldyBBcmVhU2hhcGUoeHMseXMsbnVsbCxEZWZhdWx0LnN0cm9rZXN0eWxlKTtcbiAgICAgICAgICAgIGxpbmVzU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IENvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKGxpbmVzU2hhcGUpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRMaW5lKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGNvbnN0IGUxMDogbnVtYmVyID0gTWF0aC5zcXJ0KDUwKTtcbiAgICBjb25zdCBlNTogbnVtYmVyID0gTWF0aC5zcXJ0KDEwKTtcbiAgICBjb25zdCBlMjogbnVtYmVyID0gTWF0aC5zcXJ0KDIpO1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUaWNrcyB7XG4gICAgICAgIHByb3RlY3RlZCBfc2NhbGU6IFNjYWxlO1xuICAgICAgICBwcm90ZWN0ZWQgX3RpY2tzOiBhbnlbXTtcbiAgICAgICAgY29uc3RydWN0b3Ioc2NhbGU6IFNjYWxlKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xuXG4gICAgICAgICAgICB0aGlzLl90aWNrcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGNyZWF0ZShzY2FsZTogU2NhbGUsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKTogVGlja3Mge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBjcmVhdGVUaWNrcyhjb3VudD86bnVtYmVyKTogdm9pZDtcblxuICAgICAgICBwcm90ZWN0ZWQgX2NyZWF0ZVRpY2tzKHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlciwgY291bnQ6IG51bWJlcikge1xuXG4gICAgICAgICAgICB2YXIgcmV2ZXJzZSA9IHN0b3AgPCBzdGFydCxcbiAgICAgICAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgICAgICAgbixcbiAgICAgICAgICAgICAgICB0aWNrcyxcbiAgICAgICAgICAgICAgICBzdGVwO1xuXG4gICAgICAgICAgICBpZiAocmV2ZXJzZSkgbiA9IHN0YXJ0LCBzdGFydCA9IHN0b3AsIHN0b3AgPSBuO1xuXG4gICAgICAgICAgICBpZiAoKHN0ZXAgPSB0aGlzLl90aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCkpID09PSAwIHx8ICFpc0Zpbml0ZShzdGVwKSkgcmV0dXJuIFtdO1xuXG4gICAgICAgICAgICBpZiAoc3RlcCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IE1hdGguY2VpbChzdGFydCAvIHN0ZXApO1xuICAgICAgICAgICAgICAgIHN0b3AgPSBNYXRoLmZsb29yKHN0b3AgLyBzdGVwKTtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IG5ldyBBcnJheShuID0gTWF0aC5jZWlsKHN0b3AgLSBzdGFydCArIDEpKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKytpIDwgbikgdGlja3NbaV0gPSAoc3RhcnQgKyBpKSAqIHN0ZXA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5mbG9vcihzdGFydCAqIHN0ZXApO1xuICAgICAgICAgICAgICAgIHN0b3AgPSBNYXRoLmNlaWwoc3RvcCAqIHN0ZXApO1xuICAgICAgICAgICAgICAgIHRpY2tzID0gbmV3IEFycmF5KG4gPSBNYXRoLmNlaWwoc3RhcnQgLSBzdG9wICsgMSkpO1xuICAgICAgICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB0aWNrc1tpXSA9IChzdGFydCAtIGkpIC8gc3RlcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJldmVyc2UpIHRpY2tzLnJldmVyc2UoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRpY2tzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIF90aWNrSW5jcmVtZW50KHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlciwgY291bnQ6IG51bWJlcikge1xuICAgICAgICAgICAgbGV0IHN0ZXA6IG51bWJlciA9IChzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgICAgICAgICAgIHBvd2VyOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgubG9nKHN0ZXApIC8gTWF0aC5MTjEwKSxcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVtYmVyID0gc3RlcCAvIE1hdGgucG93KDEwLCBwb3dlcik7XG4gICAgICAgICAgICByZXR1cm4gcG93ZXIgPj0gMFxuICAgICAgICAgICAgICAgID8gKGVycm9yID49IGUxMCA/IDEwIDogZXJyb3IgPj0gZTUgPyA1IDogZXJyb3IgPj0gZTIgPyAyIDogMSkgKiBNYXRoLnBvdygxMCwgcG93ZXIpXG4gICAgICAgICAgICAgICAgOiAtTWF0aC5wb3coMTAsIC1wb3dlcikgLyAoZXJyb3IgPj0gZTEwID8gMTAgOiBlcnJvciA+PSBlNSA/IDUgOiBlcnJvciA+PSBlMiA/IDIgOiAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyAgX3RpY2tTdGVwKHN0YXJ0OiBudW1iZXIsIHN0b3A6IG51bWJlciwgY291bnQ6IG51bWJlcikge1xuICAgICAgICAgICAgbGV0IHN0ZXAwOiBudW1iZXIgPSBNYXRoLmFicyhzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgICAgICAgICAgIHN0ZXAxOiBudW1iZXIgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyhzdGVwMCkgLyBNYXRoLkxOMTApKSxcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVtYmVyID0gc3RlcDAgLyBzdGVwMTtcbiAgICAgICAgICAgIGlmIChlcnJvciA+PSBlMTApIHN0ZXAxICo9IDEwO1xuICAgICAgICAgICAgZWxzZSBpZiAoZXJyb3IgPj0gZTUpIHN0ZXAxICo9IDU7XG4gICAgICAgICAgICBlbHNlIGlmIChlcnJvciA+PSBlMikgc3RlcDEgKj0gMjtcbiAgICAgICAgICAgIHJldHVybiBzdG9wIDwgc3RhcnQgPyAtc3RlcDEgOiBzdGVwMTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGNsYXNzIExpbmVhclRpY2tzIGV4dGVuZHMgVGlja3Mge1xuICAgICAgICBzdGF0aWMgY3JlYXRlKHNjYWxlOiBTY2FsZSkge1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KHNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUsIFwiIHNjYWxlIG11c3QgYmUgTGluZWFyU2NhbGVcIik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVhclRpY2tzKHNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVUaWNrcyhjb3VudD86IG51bWJlcikge1xuICAgICAgICAgICAgLy8gbGV0IHN0ZXA6bnVtYmVyLCBzdGFydDpudW1iZXIsc3RvcDpudW1iZXI7XG4gICAgICAgICAgICAvLyBzdGVwID0gdGhpcy5fdGlja0luY3JlbWVudCh0aGlzLl9zdGFydCwgdGhpcy5fZW5kLCBjb3VudCk7XG4gICAgICAgICAgICAvLyBpZiAoc3RlcCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBzdGFydCA9IE1hdGguZmxvb3IodGhpcy5fc3RhcnQvc3RlcCkgKiBzdGVwO1xuICAgICAgICAgICAgLy8gICAgIHN0b3AgPSBNYXRoLmZsb29yKHRoaXMuX2VuZC9zdGVwKSAqIHN0ZXA7XG4gICAgICAgICAgICAvLyAgICAgc3RlcCA9IHRoaXMuX3RpY2tJbmNyZW1lbnQoc3RhcnQsc3RvcCxjb3VudCk7XG4gICAgICAgICAgICAvLyB9ZWxzZSBpZihzdGVwIDwgMCl7XG4gICAgICAgICAgICAvLyAgICAgc3RhcnQgPSBNYXRoLmNlaWwoc3RhcnQgKiBzdGVwKSAvIHN0ZXA7XG4gICAgICAgICAgICAvLyAgICAgc3RvcCA9IE1hdGguZmxvb3Ioc3RvcCAqIHN0ZXApIC8gc3RlcDtcbiAgICAgICAgICAgIC8vICAgICBzdGVwID0gdGhpcy5fdGlja0luY3JlbWVudChzdGFydCwgc3RvcCwgY291bnQpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaWYoY291bnQgPT0gbnVsbCB8fCBpc05hTihjb3VudCkpe1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90aWNrcyA9IHRoaXMuX2NyZWF0ZVRpY2tzKHRoaXMuX3NjYWxlLm1heCx0aGlzLl9zY2FsZS5taW4sY291bnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpY2tzO1xuICAgICAgICB9XG4gICAgICAgIG5pY2VTY2FsZSgpOkxpbmVhclNjYWxle1xuICAgICAgICAgICAgbGV0IHNjYWxlID0gPExpbmVhclNjYWxlPnRoaXMuX3NjYWxlO1xuICAgICAgICAgICAgbGV0IHN0ZXAgOm51bWJlcj0gdGhpcy5fdGlja1N0ZXAoc2NhbGUubWluLHNjYWxlLm1heCwxMCk7XG4gICAgICAgICAgICBsZXQgbmljZU1pbiA6bnVtYmVyID0gc2NhbGUubWluPT09MD8wOihNYXRoLmZsb29yKHNjYWxlLm1pbi9zdGVwKSkqc3RlcDtcbiAgICAgICAgICAgIGxldCBuaWNlTWF4IDpudW1iZXIgPSAoTWF0aC5mbG9vcihzY2FsZS5tYXgvc3RlcCkrMSkqc3RlcDtcbiAgICAgICAgICAgIHNjYWxlLmRvbWFpbihbbmljZU1pbixuaWNlTWF4XSkucmVmcmVzaCgpO1xuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGNsYXNzIExvZ1RpY2tzIGV4dGVuZHMgVGlja3Mge1xuICAgICAgICBzdGF0aWMgY3JlYXRlKHNjYWxlOiBTY2FsZSkge1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KHNjYWxlIGluc3RhbmNlb2YgTG9nU2NhbGUsIFwiIHNjYWxlIG11c3QgYmUgTGluZWFyU2NhbGVcIik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IExvZ1RpY2tzKHNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVUaWNrcyhjb3VudD86IG51bWJlcikge1xuXG4gICAgICAgICAgICBpZihjb3VudCA9PSBudWxsIHx8IGlzTmFOKGNvdW50KSl7XG4gICAgICAgICAgICAgICAgY291bnQgPSAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RpY2tzID0gdGhpcy5fY3JlYXRlVGlja3ModGhpcy5fc2NhbGUubWF4LHRoaXMuX3NjYWxlLm1pbixjb3VudCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGlja3M7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgY2xhc3MgT3JkaW5hbFRpY2tzIGV4dGVuZHMgVGlja3Mge1xuICAgICAgICBzdGF0aWMgY3JlYXRlKHNjYWxlOiBTY2FsZSkge1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlLCBcIiBzY2FsZSBtdXN0IGJlIE9yZGluYWxTY2FsZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3JkaW5hbFRpY2tzKHNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVUaWNrcyhjb3VudD86IG51bWJlcikge1xuXG4gICAgICAgICAgICBpZihjb3VudCA9PSBudWxsIHx8IGlzTmFOKGNvdW50KSl7XG4gICAgICAgICAgICAgICAgY291bnQgPSAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMuX3RpY2tzID0gdGhpcy5fY3JlYXRlVGlja3ModGhpcy5fc2NhbGUubWF4LHRoaXMuX3NjYWxlLm1pbixjb3VudCk7XG4gICAgICAgICAgICB0aGlzLl90aWNrcyA9ICg8T3JkaW5hbFNjYWxlPnRoaXMuX3NjYWxlKS5kb21haW5zO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpY2tzO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgaW1wb3J0IEZvbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkZvbnQ7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgZXhwb3J0IGNsYXNzIEF4aXNTaGFwZSBleHRlbmRzIFNoYXBlIHtcblxuICAgICAgICBwdWJsaWMgX2xhYmVsOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBfbWFqb3I6IFN0cm9rZVN0eWxlO1xuICAgICAgICBwdWJsaWMgX21pbm9yOiBTdHJva2VTdHlsZTtcbiAgICAgICAgcHVibGljIF9sYWJsZVJlY3Q6IFJvdGF0ZVJlY3Q7XG4gICAgICAgIHB1YmxpYyBfbGFibGVGb250OiBGb250O1xuICAgICAgICBwdWJsaWMgX21ham9yVGljazogUm90YXRlTGluZTtcbiAgICAgICAgcHVibGljIF9taW5vclRpY2s6IFJvdGF0ZUxpbmU7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5fbWFqb3IgPSBEZWZhdWx0LnN0cm9rZXN0eWxlLmNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLl9taW5vciA9IERlZmF1bHQuc3Ryb2tlc3R5bGUuY2xvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2xhYmxlRm9udCA9IERlZmF1bHQuZm9udC5jbG9uZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMsIHJlY3Q6IFJlY3QpOiB2b2lkIHtcbiAgICAgICAgICAgIGNhbnZhcy5zYXZlKCk7XG4gICAgICAgICAgICAvLyBjYW52YXMuY2xpcChyZWN0KTtcbiAgICAgICAgICAgIGxldCB4czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIGxldCB5czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIGxldCBwdHM6UG9pbnRbXSA9IHRoaXMuX2xhYmxlUmVjdC5wb2ludHM7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7ICsraikge1xuICAgICAgICAgICAgICAgIHhzLnB1c2gocHRzW2pdLngpO1xuICAgICAgICAgICAgICAgIHlzLnB1c2gocHRzW2pdLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2FudmFzLmRyYXdQb2x5Z29uKHhzLHlzLFwiYmx1ZVwiKTtcbiAgICAgICAgICAgIC8vIHRoaXMuX2xhYmxlRm9udC5mb250Q29sb3IgPSdyZWQnO1xuICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKHRoaXMuX21ham9yVGljay5zdGFydFBvaW50LCB0aGlzLl9tYWpvclRpY2suZW5kUG9pbnQsIHRoaXMuX21ham9yKTtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3VGV4dCh0aGlzLl9sYWJlbCwgdGhpcy5fbGFibGVSZWN0LmxlZnRUb3AsdGhpcy5fbGFibGVGb250LHRoaXMuX2xhYmxlUmVjdC5sZWZ0VG9wLHRoaXMuX2xhYmxlUmVjdC5hbmdsZSAqIDE4MCAvTWF0aC5QSSk7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0xpbmUodGhpcy5fbWlub3JUaWNrLnN0YXJ0UG9pbnQsIHRoaXMuX21pbm9yVGljay5lbmRQb2ludCwgdGhpcy5fbWlub3IpO1xuXG4gICAgICAgICAgICBjYW52YXMucmVzdG9yZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCgpOiB2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbmNvbnN0IExBQkVMX1BBRERJTkcgOm51bWJlciA9IDQ7XG5jb25zdCBNQUpPUl9USUNLX0hFSUdIVDpudW1iZXIgPSA2O1xuY29uc3QgTUlOT1JfVElDS19IRUlHSFQ6bnVtYmVyID0gNDtcbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgJ3VzZSBzdHJpY3QnOyAgICAgICAgXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDb250ZXh0ID0gYW5kcm9pZC5hcHAuQ29udGV4dDtcbiAgICBpbXBvcnQgRm9udCA9IGFuZHJvaWQuZ3JhcGhpY3MuRm9udDtcblxuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGU9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgaW1wb3J0IEdyYXZpdHkgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYXZpdHk7XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUF4aXMgZXh0ZW5kcyBWaWV3e1xuICAgICAgICBcbiAgICAgICAgcHJpdmF0ZSBfc2NhbGU6U2NhbGU7XG4gICAgICAgIHByaXZhdGUgX21heDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX21pbjpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3JldmVyc2VkOmJvb2xlYW47XG4gICAgICAgIHByaXZhdGUgX3NlcmllczpzdHJpbmdbXTtcbiAgICAgICAgcHJvdGVjdGVkIF9jaGlsZHJlbjpTaGFwZVtdO1xuICAgICAgICBwcm90ZWN0ZWQgX21ham9yVGlja0hlaWdodDpudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfbWlub3JUaWNrSGVpZ2h0Om51bWJlclxuICAgICAgICBwcm90ZWN0ZWQgX2F4aXNUeXBlOkF4aXNUeXBlO1xuICAgICAgICBwcm90ZWN0ZWQgX3RpY2tzOmFueVtdO1xuICAgIFxuICAgICAgICBwcm90ZWN0ZWQgX3RpdGxlOnN0cmluZztcbiAgICAgICAgcHJvdGVjdGVkIF90aXRsZUZvbnQ6Rm9udDtcbiAgICAgICAgcHJvdGVjdGVkIF9sYWJlbEZvbnQ6Rm9udDtcbiAgICAgICAgcHJvdGVjdGVkIF9tYWpvclN0eWxlOlN0cm9rZVN0eWxlO1xuICAgICAgICBwcm90ZWN0ZWQgX21pbm9yU3R5bGU6U3Ryb2tlU3R5bGU7XG4gICAgICAgIHByb3RlY3RlZCBfbGluZVN0eWxlOlN0cm9rZVN0eWxlO1xuICAgICAgICBwcm90ZWN0ZWQgX25lYXI6Ym9vbGVhbjtcbiAgICAgICAgY29uc3RydWN0b3IoY29udGV4dDpDb250ZXh0KXtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5fbWFqb3JUaWNrSGVpZ2h0ID0gTUFKT1JfVElDS19IRUlHSFQ7XG4gICAgICAgICAgICB0aGlzLl9taW5vclRpY2tIZWlnaHQgPSBNSU5PUl9USUNLX0hFSUdIVDtcbiAgICAgICAgICAgIHRoaXMuX3RpY2tzID0gW107XG4gICAgICAgICAgICB0aGlzLl90aXRsZUZvbnQgPSBEZWZhdWx0LmZvbnQ7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbEZvbnQgPSBEZWZhdWx0LmZvbnQ7XG4gICAgICAgICAgICB0aGlzLl9tYWpvclN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgICAgIHRoaXMuX21pbm9yU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgdGhpcy5fbmVhciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbEZvbnQuZm9udENvbG9yID0gXCIjMjYyNjI2XCI7XG4gICAgICAgICAgICB0aGlzLl9zZXJpZXM9W107XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfY3JlYXRlVGlja3MoKSA6YW55W107XG4gICAgICAgICAgICBcblxuICAgICAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLl90aXRsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgdGl0bGUoKTpzdHJpbmd7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IG1ham9yU3R5bGUodmFsdWU6U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgdGhpcy5fbWFqb3JTdHlsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgbWFqb3JTdHlsZSgpOlN0cm9rZVN0eWxle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21ham9yU3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IG1pbm9yU3R5bGUodmFsdWU6U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgdGhpcy5fbWlub3JTdHlsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgbWlub3JTdHlsZSgpOlN0cm9rZVN0eWxle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21pbm9yU3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNldCBsaW5lU3R5bGUodmFsdWU6U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgdGhpcy5fbGluZVN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBsaW5lU3R5bGUoKTpTdHJva2VTdHlsZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saW5lU3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IHRpdGxlRm9udCh2YWx1ZSA6Rm9udCl7XG4gICAgICAgICAgICB0aGlzLl90aXRsZUZvbnQgPSB2YWx1ZS5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgZ2V0IHRpdGxlRm9udCgpOkZvbnR7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGl0bGVGb250O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldCBsYWJlbEZvbnQodmFsdWUgOkZvbnQpe1xuICAgICAgICAgICAgdGhpcy5fbGFiZWxGb250ID0gdmFsdWUuY2xvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIGdldCBsYWJlbEZvbnQoKTpGb250e1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsRm9udDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIHNldCBtYXgodmFsdWU6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzZXQgbWluKHZhbHVlOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9taW4gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IG1heCgpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBtaW4oKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgc2VyaWVzKCk6c3RyaW5nW117XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzZXQgc2VyaWVzKHM6c3RyaW5nW10pe1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlcmllcyA9cztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXQgc2NhbGUodmFsdWU6U2NhbGUpe1xuICAgICAgICAgICAgaWYodmFsdWUgIT0gbnVsbCAmJiAhdmFsdWUuZXF1YWwodGhpcy5fc2NhbGUpKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0IHNjYWxlIFwiKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGlja3MgPSB0aGlzLl9jcmVhdGVUaWNrcygpO1xuICAgICAgICAgICAgfWVsc2UgaWYodmFsdWUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NhbGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpY2tzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBzY2FsZSgpOlNjYWxle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzZXQgcmV2ZXJzZWQodmFsdWU6Ym9vbGVhbil7XG4gICAgICAgICAgICB0aGlzLl9yZXZlcnNlZCA9dmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCByZXZlcnNlZCgpOmJvb2xlYW57XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6QXhpc1R5cGUpe1xuICAgICAgICAgICAgdGhpcy5fYXhpc1R5cGUgPXZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgdHlwZSgpOkF4aXNUeXBle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2F4aXNUeXBlO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHB1YmxpYyBzZXQgbmVhcih2YWx1ZSA6Ym9vbGVhbil7XG4gICAgICAgICAgICB0aGlzLl9uZWFyID0gdmFsdWU7XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgZ2V0IG5lYXIoKTpib29sZWFue1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25lYXI7XG4gICAgICAgIH1cblxuICAgICAgICBhYnN0cmFjdCBfbGF5b3V0WEF4aXMoY2FudmFzOkNhbnZhcyk6dm9pZDtcbiAgICAgICAgYWJzdHJhY3QgX2xheW91dFlBeGlzKGNhbnZhczpDYW52YXMpOnZvaWQ7XG5cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemV7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIub25NZWFzdXJlKHdpZHRoLGhlaWdodCxjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsdCxyLGIsY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWR7XG4gICAgICAgICAgICBzdXBlci5vbkRyYXcoY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICBfZm9ybWF0KHZhbDphbnkpe1xuICAgICAgICAgICAgcmV0dXJuIHZhbCtcIlwiO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBNZWFzdXJlU3BlYyA9IGFuZHJvaWQudmlldy5NZWFzdXJlU3BlYztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBHcmF2aXR5ID0gYW5kcm9pZC5ncmFwaGljcy5HcmF2aXR5O1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgZXhwb3J0IGNsYXNzIExpbmVBeGlzIGV4dGVuZHMgQmFzZUF4aXMge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IG5lYXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX25lYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBHcmF2aXR5LkJvdHRvbTsgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gR3Jhdml0eS5MZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IEdyYXZpdHkuVG9wO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gR3Jhdml0eS5SaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbmVhcigpOmJvb2xlYW57XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBfY3JlYXRlVGlja3MoKTogYW55W10ge1xuICAgICAgICAgICAgbGV0IHRpY2tzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSkge1xuICAgICAgICAgICAgICAgIHRpY2tzID0gTGluZWFyVGlja3MuY3JlYXRlKHRoaXMuc2NhbGUpLmNyZWF0ZVRpY2tzKDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZSBpbnN0YW5jZW9mIExvZ1NjYWxlKSB7XG4gICAgICAgICAgICAgICAgdGlja3MgPSBMb2dUaWNrcy5jcmVhdGUodGhpcy5zY2FsZSkuY3JlYXRlVGlja3MoMTApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgdGlja3MgPSBPcmRpbmFsVGlja3MuY3JlYXRlKHRoaXMuc2NhbGUpLmNyZWF0ZVRpY2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlbHNlIGlmKHRoaXMuc2NhbGUgaW5zdGFuY2VvZiBUaW1lc2NhbGUpXG5cbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcbiAgICAgICAgfVxuICAgICAgICBfbGF5b3V0WEF4aXMoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB0aWNrcyA9IHRoaXMuX3RpY2tzO1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyB0aWNrcyAmJiBpIDwgdGlja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IHRpY2tzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0VmFsdWU6IG51bWJlciA9IGkgPj0gdGlja3MubGVuZ3RoID8gbnVsbCA6IHRpY2tzW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBsZXQgdGlja2hlaWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCB0aGlzLl9taW5vclRpY2tIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9IHRoaXMuX2Zvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZTogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKGxhYmVsLCB0aGlzLmxhYmVsRm9udCk7XG4gICAgICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3QudG9wO1xuICAgICAgICAgICAgICAgIGxldCBueDogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGxldCBueTogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBueCA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBueSA9IHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBsYWJlbFg6IG51bWJlciA9IHg7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWTogbnVtYmVyID0geSArIHRpY2toZWlnaHQgKyBMQUJFTF9QQURESU5HICsgbGFiZWxTaXplLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgbGV0IHNoYXBlOiBBeGlzU2hhcGUgPSBuZXcgQXhpc1NoYXBlKCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmxlUmVjdCA9IG5ldyBSb3RhdGVSZWN0KGxhYmVsWCwgbGFiZWxZLCBsYWJlbFNpemUud2lkdGgsIGxhYmVsU2l6ZS5oZWlnaHQsIDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2hhcGUuX21ham9yVGljayA9IG5ldyBSb3RhdGVMaW5lKHgsIHksIHRoaXMuX21ham9yVGlja0hlaWdodCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmxlRm9udCA9IHRoaXMuX2xhYmVsRm9udDtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWFqb3IgPSB0aGlzLm1ham9yU3R5bGU7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21pbm9yID0gdGhpcy5taW5vclN0eWxlO1xuICAgICAgICAgICAgICAgIGxldCBtaW5vcnggPSBOYU47XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihueCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWlub3J4ID0gKHggKyBueCkgLyAyO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoYXBlLl9taW5vclRpY2sgPSBuZXcgUm90YXRlTGluZShtaW5vcngsIHksIHRoaXMuX21pbm9yVGlja0hlaWdodCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfbGF5b3V0WUF4aXMoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB0aWNrcyA9IHRoaXMuX3RpY2tzO1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyB0aWNrcyAmJiBpIDwgdGlja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IHRpY2tzW2ldO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5leHRWYWx1ZTogbnVtYmVyID0gaSA+PSB0aWNrcy5sZW5ndGggPyBudWxsIDogdGlja3NbaSArIDFdO1xuICAgICAgICAgICAgICAgIGxldCB0aWNraGVpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLl9tYWpvclRpY2tIZWlnaHQsIHRoaXMuX21pbm9yVGlja0hlaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5fZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxTaXplOiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcobGFiZWwsIHRoaXMubGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gdGhpcy5sYXlvdXRJbmZvLmlubmVycmVjdC5yaWdodDtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5uZWFyKXtcbiAgICAgICAgICAgICAgICAgICAgeCA9IHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3QubGVmdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG54OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgbGV0IG55OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG55ID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG54ID0geDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWDogbnVtYmVyID0geCAtIGxhYmVsU2l6ZS53aWR0aC8yIC0gTEFCRUxfUEFERElORyAtIHRpY2toZWlnaHQ7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWTogbnVtYmVyID0geSA7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMubmVhcil7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsWCA9IHggICsgbGFiZWxTaXplLndpZHRoLzIgKyBMQUJFTF9QQURESU5HICsgdGlja2hlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHNoYXBlOiBBeGlzU2hhcGUgPSBuZXcgQXhpc1NoYXBlKCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmxlUmVjdCA9IG5ldyBSb3RhdGVSZWN0KGxhYmVsWCwgbGFiZWxZLCBsYWJlbFNpemUud2lkdGgsIGxhYmVsU2l6ZS5oZWlnaHQsIDApO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9tYWpvclRpY2sgPSBuZXcgUm90YXRlTGluZSh4LCB5LCAgdGhpcy5fbWFqb3JUaWNrSGVpZ2h0LDAsIHRoaXMubmVhciA/IE1hdGguUEkgLyAyOi1NYXRoLlBJLzIpO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJsZUZvbnQgPSB0aGlzLmxhYmVsRm9udDtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWFqb3IgPSB0aGlzLm1ham9yU3R5bGU7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21pbm9yID0gdGhpcy5taW5vclN0eWxlO1xuICAgICAgICAgICAgICAgIGxldCBtaW5vcnkgPSBOYU47XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihueSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWlub3J5ID0gKHkgKyBueSkgLyAyO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoYXBlLl9taW5vclRpY2sgPSBuZXcgUm90YXRlTGluZSh4LCBtaW5vcnksIHRoaXMuX21pbm9yVGlja0hlaWdodCwwLCB0aGlzLm5lYXIgPyBNYXRoLlBJIC8gMjotTWF0aC5QSS8yKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9uTWVhc3VyZSh3aWR0aDogTWVhc3VyZVNwZWMsIGhlaWdodDogTWVhc3VyZVNwZWMsIGNhbnZhczogQ2FudmFzKTogU2l6ZSB7XG4gICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgU2l6ZSh3aWR0aC52YWx1ZSwgdGhpcy5fbWVhc3VyZVgoY2FudmFzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZWFzdXJlZERpbWVuc2lvbihuZXcgTWVhc3VyZVNwZWMoc2l6ZS53aWR0aCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpLCBuZXcgTWVhc3VyZVNwZWMoc2l6ZS5oZWlnaHQsIExheW91dFBhcmFtcy5FWEFDVExZKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IFNpemUodGhpcy5fbWVhc3VyZVkoY2FudmFzKSwgaGVpZ2h0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbWVhc3VyZVgoY2FudmFzOiBDYW52YXMpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IHRpdGxlU2l6ZTogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMudGl0bGUsIHRoaXMudGl0bGVGb250KTtcbiAgICAgICAgICAgIGxldCB0aWNrSGVnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMuX21ham9yVGlja0hlaWdodCwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgIGxldCBsYWJlbFNpemU6IFNpemUgPSBuZXcgU2l6ZSgwLCAwKTtcbiAgICAgICAgICAgIGxldCB0aWNrczogYW55W10gPSB0aGlzLl90aWNrcztcbiAgICAgICAgICAgIGZvciAobGV0IHQgb2YgdGlja3MpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3o6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyh0aGlzLl9mb3JtYXQodCksIHRoaXMubGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICBsYWJlbFNpemUud2lkdGggPSBNYXRoLm1heChzei53aWR0aCwgbGFiZWxTaXplLndpZHRoKTtcbiAgICAgICAgICAgICAgICBsYWJlbFNpemUuaGVpZ2h0ID0gTWF0aC5tYXgoc3ouaGVpZ2h0LCBsYWJlbFNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsYWJlbFNpemUuaGVpZ2h0ICsgdGl0bGVTaXplLmhlaWdodCArIHRpY2tIZWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBfbWVhc3VyZVkoY2FudmFzOiBDYW52YXMpOiBudW1iZXIge1xuXG4gICAgICAgICAgICBsZXQgdGl0bGVTaXplOiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy50aXRsZSwgdGhpcy50aXRsZUZvbnQpO1xuICAgICAgICAgICAgbGV0IHRpY2tIZWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCB0aGlzLl9taW5vclRpY2tIZWlnaHQpO1xuICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZTogU2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgbGV0IHRpY2tzOiBhbnlbXSA9IHRoaXMuX3RpY2tzO1xuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiB0aWNrcykge1xuICAgICAgICAgICAgICAgIGxldCBzejogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMuX2Zvcm1hdCh0KSwgdGhpcy5sYWJlbEZvbnQpO1xuICAgICAgICAgICAgICAgIGxhYmVsU2l6ZS53aWR0aCA9IE1hdGgubWF4KHN6LndpZHRoLCBsYWJlbFNpemUud2lkdGgpO1xuICAgICAgICAgICAgICAgIGxhYmVsU2l6ZS5oZWlnaHQgPSBNYXRoLm1heChzei5oZWlnaHQsIGxhYmVsU2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsU2l6ZS53aWR0aCArIHRpdGxlU2l6ZS5oZWlnaHQgKyB0aWNrSGVnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkxheW91dChsLCB0LCByLCBiLCBjYW52YXMpO1xuICAgICAgICAgICAgaWYodGhpcy5zY2FsZSAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXhpc1R5cGUgPT09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0WEF4aXMoY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0WUF4aXMoY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uRHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5fZHJhd0xpbmUoY2FudmFzKTtcbiAgICAgICAgICAgIGlmKHRoaXMuX2NoaWxkcmVuICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNoYXBlIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLmRyYXcoY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfZHJhd0xpbmUoY2FudmFzOkNhbnZhcykgOnZvaWR7XG4gICAgICAgICAgICBsZXQgcmVjdDpSZWN0ID0gdGhpcy5sYXlvdXRJbmZvLmlubmVycmVjdDtcbiAgICAgICAgICAgIGlmKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlgpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX25lYXIpe1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuZHJhd0xpbmUobmV3IFBvaW50KHJlY3QubGVmdCxyZWN0LnRvcCksbmV3IFBvaW50KHJlY3QucmlnaHQscmVjdC50b3ApLHRoaXMubGluZVN0eWxlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKG5ldyBQb2ludChyZWN0LmxlZnQscmVjdC5ib3R0b20pLG5ldyBQb2ludChyZWN0LnJpZ2h0LHJlY3QuYm90dG9tKSx0aGlzLmxpbmVTdHlsZSk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5ZKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9uZWFyKXtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKG5ldyBQb2ludChyZWN0LnJpZ2h0LHJlY3QudG9wKSxuZXcgUG9pbnQocmVjdC5yaWdodCxyZWN0LmJvdHRvbSksdGhpcy5saW5lU3R5bGUpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuZHJhd0xpbmUobmV3IFBvaW50KHJlY3QubGVmdCxyZWN0LnRvcCksbmV3IFBvaW50KHJlY3QubGVmdCxyZWN0LmJvdHRvbSksdGhpcy5saW5lU3R5bGUpOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBNZWFzdXJlU3BlYyA9IGFuZHJvaWQudmlldy5NZWFzdXJlU3BlYztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBHcmF2aXR5ID0gYW5kcm9pZC5ncmFwaGljcy5HcmF2aXR5O1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGV4cG9ydCBjbGFzcyBSYWRpYWxMaW5lQXhpcyBleHRlbmRzIEJhc2VBeGlzIHtcbiAgICAgICAgcHJpdmF0ZSBfX2lubmVyUmFkaXVzOiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF9fc3RhcnRBbmdsZTogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfX3N3ZWVwOiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF9fcmFkaXVzOiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF9fY3g6IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgX19jeTogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCkge1xuICAgICAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLl9faW5uZXJSYWRpdXMgPSAwO1xuICAgICAgICAgICAgdGhpcy5fbGluZVN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBuZWFyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLl9uZWFyID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gR3Jhdml0eS5Cb3R0b207XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBHcmF2aXR5LkxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gR3Jhdml0eS5Ub3A7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBHcmF2aXR5LlJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBuZWFyKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25lYXI7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgX2N4KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2N4O1xuICAgICAgICB9XG4gICAgICAgIGdldCBfY3koKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fY3k7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IF9jeCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9fY3ggPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgX2N5KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX19jeSA9IHZhbHVlO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXQgX3JhZGl1cygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yYWRpdXM7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgX3JhZGl1cyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9fcmFkaXVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IF9pbm5lclJhZGl1cyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9faW5uZXJSYWRpdXMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgX2lubmVyUmFkaXVzKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2lubmVyUmFkaXVzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IF9zdGFydEFuZ2xlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX19zdGFydEFuZ2xlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IF9zdGFydEFuZ2xlKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXJ0QW5nbGU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgX3N3ZWVwKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX19zd2VlcCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBfc3dlZXAoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc3dlZXA7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgcHJvdGVjdGVkIF9jcmVhdGVUaWNrcygpOiBhbnlbXSB7XG4gICAgICAgICAgICBsZXQgdGlja3M6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlKSB7XG4gICAgICAgICAgICAgICAgdGlja3MgPSBMaW5lYXJUaWNrcy5jcmVhdGUodGhpcy5zY2FsZSkuY3JlYXRlVGlja3MoMTApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlIGluc3RhbmNlb2YgTG9nU2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IExvZ1RpY2tzLmNyZWF0ZSh0aGlzLnNjYWxlKS5jcmVhdGVUaWNrcygxMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IE9yZGluYWxUaWNrcy5jcmVhdGUodGhpcy5zY2FsZSkuY3JlYXRlVGlja3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGVsc2UgaWYodGhpcy5zY2FsZSBpbnN0YW5jZW9mIFRpbWVzY2FsZSlcblxuICAgICAgICAgICAgcmV0dXJuIHRpY2tzO1xuICAgICAgICB9XG4gICAgICAgIF9sYXlvdXRYQXhpcyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHRpY2tzID0gdGhpcy5fdGlja3M7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IHRpY2tzICYmIGkgPCB0aWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gdGlja3NbaV07XG4gICAgICAgICAgICAgICAgbGV0IG5leHRWYWx1ZTogbnVtYmVyID0gaSA+PSB0aWNrcy5sZW5ndGggPyBudWxsIDogdGlja3NbaSArIDFdO1xuICAgICAgICAgICAgICAgIGxldCB0aWNraGVpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLl9tYWpvclRpY2tIZWlnaHQsIHRoaXMuX21pbm9yVGlja0hlaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5fZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxTaXplOiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcobGFiZWwsIHRoaXMubGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSB0aGlzLl9jeCArIE1hdGguY29zKHRoaXMuX3N0YXJ0QW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSB0aGlzLl9jeSArIE1hdGguc2luKHRoaXMuX3N0YXJ0QW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgICAgIGxldCBueDogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGxldCBueTogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dFJhZGl1cyA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBueCA9IHRoaXMuX2N4ICsgTWF0aC5jb3ModGhpcy5fc3RhcnRBbmdsZSkgKiBuZXh0UmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBueSA9IHRoaXMuX2N5ICsgTWF0aC5zaW4odGhpcy5fc3RhcnRBbmdsZSkgKiBuZXh0UmFkaXVzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBsYWJlbHggPSB4ICsgKE1hdGguc2luKHRoaXMuX3N0YXJ0QW5nbGUpICogKHRpY2toZWlnaHQgKyBMQUJFTF9QQURESU5HICsgbGFiZWxTaXplLmhlaWdodCAvIDIpKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWx5ID0geSAtIChNYXRoLmNvcyh0aGlzLl9zdGFydEFuZ2xlKSAqICh0aWNraGVpZ2h0ICsgTEFCRUxfUEFERElORyArIGxhYmVsU2l6ZS5oZWlnaHQgLyAyKSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxYOiBudW1iZXIgPSB4O1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFk6IG51bWJlciA9IHkgKyB0aWNraGVpZ2h0ICsgTEFCRUxfUEFERElORyArIGxhYmVsU2l6ZS5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgICAgIGxldCBzaGFwZTogQXhpc1NoYXBlID0gbmV3IEF4aXNTaGFwZSgpO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJsZVJlY3QgPSBuZXcgUm90YXRlUmVjdChsYWJlbFgsIGxhYmVsWSwgbGFiZWxTaXplLndpZHRoLCBsYWJlbFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWFqb3JUaWNrID0gbmV3IFJvdGF0ZUxpbmUoeCwgeSwgdGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCAwLCB0aGlzLl9zdGFydEFuZ2xlKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFibGVGb250ID0gdGhpcy5fbGFiZWxGb250O1xuICAgICAgICAgICAgICAgIHNoYXBlLl9tYWpvciA9IHRoaXMubWFqb3JTdHlsZTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWlub3IgPSB0aGlzLm1pbm9yU3R5bGU7XG4gICAgICAgICAgICAgICAgbGV0IG1pbm9yeCA9IE5hTjtcbiAgICAgICAgICAgICAgICBsZXQgbWlub3J5ID0gTmFOO1xuXG4gICAgICAgICAgICAgICAgbGV0IG1pbm9yUmFkaXVzOiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihueCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBtaW5vclJhZGl1cyA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZSgodmFsdWUgKyBuZXh0VmFsdWUpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIG1pbm9yeCA9IHRoaXMuX2N4ICsgTWF0aC5jb3ModGhpcy5fc3RhcnRBbmdsZSkgKiBtaW5vclJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbWlub3J5ID0gdGhpcy5fY3kgKyBNYXRoLnNpbih0aGlzLl9zdGFydEFuZ2xlKSAqIG1pbm9yUmFkaXVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaGFwZS5fbWlub3JUaWNrID0gbmV3IFJvdGF0ZUxpbmUobWlub3J4LCBtaW5vcnksIHRoaXMuX21pbm9yVGlja0hlaWdodCwgMCwgdGhpcy5fc3RhcnRBbmdsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfbGF5b3V0WUF4aXMoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB0aWNrcyA9IHRoaXMuX3RpY2tzO1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyB0aWNrcyAmJiBpIDwgdGlja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IHRpY2tzW2ldO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5leHRWYWx1ZTogbnVtYmVyID0gaSA+PSB0aWNrcy5sZW5ndGggPyBudWxsIDogdGlja3NbaSArIDFdO1xuICAgICAgICAgICAgICAgIGxldCB0aWNraGVpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLl9tYWpvclRpY2tIZWlnaHQsIHRoaXMuX21pbm9yVGlja0hlaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5fZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxTaXplOiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcobGFiZWwsIHRoaXMubGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICBsZXQgYW5nbGU6IG51bWJlciA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhhbmdsZSkgKiB0aGlzLl9yYWRpdXM7XG4gICAgICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IHRoaXMuX2N5ICsgTWF0aC5zaW4oYW5nbGUpICogdGhpcy5fcmFkaXVzO1xuXG4gICAgICAgICAgICAgICAgbGV0IG54OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgbGV0IG55OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuQW5nbGUgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbnggPSB0aGlzLl9jeCArIE1hdGguY29zKG5BbmdsZSkgKiB0aGlzLl9yYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIG55ID0gdGhpcy5fY3kgKyBNYXRoLnNpbihuQW5nbGUpICogdGhpcy5fcmFkaXVzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBsYWJsZVggPSB0aGlzLl9jeCArIE1hdGguY29zKGFuZ2xlKSAqICh0aGlzLl9yYWRpdXMgKyB0aWNraGVpZ2h0ICsgTEFCRUxfUEFERElORyArIGxhYmVsU2l6ZS5oZWlnaHQgLyAyKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFibGVZID0gdGhpcy5fY3kgKyBNYXRoLnNpbihhbmdsZSkgKiAodGhpcy5fcmFkaXVzICsgdGlja2hlaWdodCArIExBQkVMX1BBRERJTkcgKyBsYWJlbFNpemUuaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2hhcGU6IEF4aXNTaGFwZSA9IG5ldyBBeGlzU2hhcGUoKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFibGVSZWN0ID0gbmV3IFJvdGF0ZVJlY3QobGFibGVYLCBsYWJsZVksIGxhYmVsU2l6ZS53aWR0aCwgbGFiZWxTaXplLmhlaWdodCwgMCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21ham9yVGljayA9IG5ldyBSb3RhdGVMaW5lKHgsIHksIHRoaXMuX21ham9yVGlja0hlaWdodCwgMCwgYW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmxlRm9udCA9IHRoaXMubGFiZWxGb250O1xuICAgICAgICAgICAgICAgIHNoYXBlLl9tYWpvciA9IHRoaXMubWFqb3JTdHlsZTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWlub3IgPSB0aGlzLm1pbm9yU3R5bGU7XG4gICAgICAgICAgICAgICAgbGV0IG1pbm9yeTogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGxldCBtaW5vcng6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBsZXQgbWlub3JBbmdsZTogbnVtYmVyID0gTmFOO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihueSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWlub3JBbmdsZSA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZSgobmV4dFZhbHVlICsgdmFsdWUpIC8gMik7XG4gICAgICAgICAgICAgICAgICAgIG1pbm9yeCA9IHRoaXMuX2N4ICsgTWF0aC5jb3MobWlub3JBbmdsZSkgKiB0aGlzLl9yYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIG1pbm9yeSA9IHRoaXMuX2N5ICsgTWF0aC5zaW4obWlub3JBbmdsZSkgKiB0aGlzLl9yYWRpdXM7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hhcGUuX21pbm9yVGljayA9IG5ldyBSb3RhdGVMaW5lKG1pbm9yeCwgbWlub3J5LCB0aGlzLl9taW5vclRpY2tIZWlnaHQsIDAsIG1pbm9yQW5nbGUgLSBNYXRoLlBJIC8gMik7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgbGV0IHNpemU6IFNpemUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IFNpemUod2lkdGgudmFsdWUsIHRoaXMuX21lYXN1cmVYKGNhbnZhcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVhc3VyZWREaW1lbnNpb24obmV3IE1lYXN1cmVTcGVjKHNpemUud2lkdGgsIExheW91dFBhcmFtcy5FWEFDVExZKSwgbmV3IE1lYXN1cmVTcGVjKHNpemUuaGVpZ2h0LCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBTaXplKHRoaXMuX21lYXN1cmVZKGNhbnZhcyksIGhlaWdodC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZWFzdXJlZERpbWVuc2lvbihuZXcgTWVhc3VyZVNwZWMoc2l6ZS53aWR0aCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpLCBuZXcgTWVhc3VyZVNwZWMoc2l6ZS5oZWlnaHQsIExheW91dFBhcmFtcy5FWEFDVExZKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX21lYXN1cmVYKGNhbnZhczogQ2FudmFzKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGxldCB0aXRsZVNpemU6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyh0aGlzLnRpdGxlLCB0aGlzLnRpdGxlRm9udCk7XG4gICAgICAgICAgICBsZXQgdGlja0hlZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLl9tYWpvclRpY2tIZWlnaHQsIHRoaXMuX21pbm9yVGlja0hlaWdodCk7XG4gICAgICAgICAgICBsZXQgbGFiZWxTaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICBsZXQgdGlja3M6IGFueVtdID0gdGhpcy5fdGlja3M7XG4gICAgICAgICAgICBmb3IgKGxldCB0IG9mIHRpY2tzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN6OiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy5fZm9ybWF0KHQpLCB0aGlzLmxhYmVsRm9udCk7XG4gICAgICAgICAgICAgICAgbGFiZWxTaXplLndpZHRoID0gTWF0aC5tYXgoc3oud2lkdGgsIGxhYmVsU2l6ZS53aWR0aCk7XG4gICAgICAgICAgICAgICAgbGFiZWxTaXplLmhlaWdodCA9IE1hdGgubWF4KHN6LmhlaWdodCwgbGFiZWxTaXplLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGFiZWxTaXplLmhlaWdodCArIHRpdGxlU2l6ZS5oZWlnaHQgKyB0aWNrSGVnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgX21lYXN1cmVZKGNhbnZhczogQ2FudmFzKTogbnVtYmVyIHtcblxuICAgICAgICAgICAgbGV0IHRpdGxlU2l6ZTogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMudGl0bGUsIHRoaXMudGl0bGVGb250KTtcbiAgICAgICAgICAgIGxldCB0aWNrSGVnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMuX21ham9yVGlja0hlaWdodCwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgIGxldCBsYWJlbFNpemU6IFNpemUgPSBuZXcgU2l6ZSgwLCAwKTtcbiAgICAgICAgICAgIGxldCB0aWNrczogYW55W10gPSB0aGlzLl90aWNrcztcbiAgICAgICAgICAgIGZvciAobGV0IHQgb2YgdGlja3MpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3o6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyh0aGlzLl9mb3JtYXQodCksIHRoaXMubGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICBsYWJlbFNpemUud2lkdGggPSBNYXRoLm1heChzei53aWR0aCwgbGFiZWxTaXplLndpZHRoKTtcbiAgICAgICAgICAgICAgICBsYWJlbFNpemUuaGVpZ2h0ID0gTWF0aC5tYXgoc3ouaGVpZ2h0LCBsYWJlbFNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsYWJlbFNpemUud2lkdGggKyB0aXRsZVNpemUuaGVpZ2h0ICsgdGlja0hlZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgb25MYXlvdXQobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25MYXlvdXQobCwgdCwgciwgYiwgY2FudmFzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXhpc1R5cGUgPT09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0WEF4aXMoY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0WUF4aXMoY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uRHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5fZHJhd0xpbmUoY2FudmFzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2hhcGUgb2YgdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuZHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9kcmF3TGluZShjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHJlY3Q6IFJlY3QgPSB0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0O1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICBsZXQgZW5keDogbnVtYmVyID0gdGhpcy5fY3ggKyBNYXRoLmNvcyh0aGlzLl9fc3RhcnRBbmdsZSkgKiB0aGlzLl9yYWRpdXM7XG4gICAgICAgICAgICAgICAgbGV0IGVuZHk6IG51bWJlciA9IHRoaXMuX2N5ICsgTWF0aC5zaW4odGhpcy5fX3N0YXJ0QW5nbGUpICogdGhpcy5fcmFkaXVzO1xuICAgICAgICAgICAgICAgIGxldCBzeDogbnVtYmVyID0gdGhpcy5fY3ggKyBNYXRoLmNvcyh0aGlzLl9fc3RhcnRBbmdsZSkgKlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW5uZXJSYWRpdXMgKiB0aGlzLl9yYWRpdXM7XG4gICAgICAgICAgICAgICAgbGV0IHN5OiBudW1iZXIgPSB0aGlzLl9jeSArIE1hdGguc2luKHRoaXMuX19zdGFydEFuZ2xlKSAqIHRoaXMuX2lubmVyUmFkaXVzICogdGhpcy5fcmFkaXVzO1xuICAgICAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZShuZXcgUG9pbnQoc3gsIHN5KSwgbmV3IFBvaW50KGVuZHgsIGVuZHkpLCB0aGlzLmxpbmVTdHlsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICBjYW52YXMuZHJhd0RvbnV0KHRoaXMuX2N4LCB0aGlzLl9jeSwgdGhpcy5fcmFkaXVzLCB0aGlzLl9yYWRpdXMgLSB0aGlzLmxpbmVTdHlsZS5zdHJva2VXaWR0aCwgdGhpcy5fc3RhcnRBbmdsZSAvIE1hdGguUEkgKiAxODAsIHRoaXMuX3N3ZWVwICogMTgwIC8gTWF0aC5QSSwgdGhpcy5saW5lU3R5bGUuc3Ryb2tlQ29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGV4cG9ydCBjbGFzcyBCYXNlUGxvdCBleHRlbmRzIFZpZXd7XG4gICAgICAgIHByb3RlY3RlZCBfYW5pbWF0aW9uOkFuaW1hdGlvbjtcbiAgICAgICAgXG4gICAgICAgIGdldCBsYXlvdXQoKTpCYXNlTGF5b3V0e1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIGltcG9ydCBDb250ZXh0ID0gYW5kcm9pZC5hcHAuQ29udGV4dDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGV4cG9ydCBjbGFzcyBDYXJ0ZXNpYW5QbG90IGV4dGVuZHMgQmFzZVBsb3Qge1xuXG4gICAgICAgIHByaXZhdGUgX19zaGFwZUxpc3Q6IFNoYXBlW10gPSBbXTtcbiAgICAgICAgcHJpdmF0ZSBfbGF5b3V0czogQmFzZUxheW91dFtdO1xuICAgICAgICBwcm90ZWN0ZWQgX19zY2FsZVBhaXJzOiB7XG4gICAgICAgICAgICBzZXJpZXM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGVcbiAgICAgICAgfVtdO1xuICAgICAgICBwcml2YXRlIF9kYXRhbW9kZWw6IERhdGFNb2RlbDtcbiAgICAgICAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCwgZGF0YW1vZGVsOiBEYXRhTW9kZWwpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuXG4gICAgICAgICAgICB0aGlzLl9kYXRhbW9kZWwgPSBkYXRhbW9kZWw7XG5cbiAgICAgICAgICAgIHRoaXMuX2xheW91dHMgPSBbXVxuICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbj0gbmV3IEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmR1cmF0aW9uID0gNTAwO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmVhc2UgPSBuZXcgQm91bmNlQW5pbWF0aW9uRWFzZSgpO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmlzQW5pYW10aW9uRW5kID0gdHJ1ZTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzID0gW107XG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICBsZXQgaXNyYWRpYWw6IGJvb2xlYW4gPSB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcuX3JhZGlhbDtcbiAgICAgICAgICAgIGZvciAobGV0IHR5cGUgb2YgdGhpcy5fZGF0YW1vZGVsLmNoYXJ0VHlwZXMpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuQmFyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzcmFkaWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhcmxheW91dDogUmFkaWFsQmFyTGF5b3V0ID0gbmV3IFJhZGlhbEJhckxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjeDogbnVtYmVyID0gKGwgKyByKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN5OiBudW1iZXIgPSAoYiArIHQpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSAoKHIgLSBsKSA8IChiIC0gdCkgPyAociAtIGwpIDogKGIgLSB0KSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbm5lclJhZGl1czogbnVtYmVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRBbmdsZTogbnVtYmVyID0gU3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kQW5nbGU6IG51bWJlciA9IE1hdGguUEkgKiAyKyBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhcmxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLkJhciksIHRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZywgY3gsIGN5LCBpbm5lclJhZGl1cywgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlTGlzdCA9IHRoaXMuX19zaGFwZUxpc3QuY29uY2F0KGJhcmxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChiYXJsYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFybGF5b3V0OiBCYXJMYXlvdXQgPSBuZXcgQmFyTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFybGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuQmFyKSwgdGhpcy5fZGF0YW1vZGVsLmVuY29kaW5nLCBuZXcgUmVjdChsLCB0LCByLCBiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlTGlzdCA9IHRoaXMuX19zaGFwZUxpc3QuY29uY2F0KGJhcmxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChiYXJsYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLkxpbmU6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNyYWRpYWwpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lbGF5b3V0OiBSYWRpYWxMaW5lTGF5b3V0ID0gbmV3IFJhZGlhbExpbmVMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3g6IG51bWJlciA9IChsICsgcikgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjeTogbnVtYmVyID0gKGIgKyB0KSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGl1czogbnVtYmVyID0gKChyIC0gbCkgPCAoYiAtIHQpID8gKHIgLSBsKSA6IChiIC0gdCkpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5uZXJSYWRpdXM6IG51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0QW5nbGU6IG51bWJlciA9IFN0YXJ0QW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZEFuZ2xlOiBudW1iZXIgPSBNYXRoLlBJICogMisgc3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lbGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuTGluZSksIHRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZywgY3gsIGN5LCBpbm5lclJhZGl1cywgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlTGlzdCA9IHRoaXMuX19zaGFwZUxpc3QuY29uY2F0KGxpbmVsYXlvdXQuc2hhcGVMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLnB1c2gobGluZWxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZWxheW91dDogTGluZUxheW91dCA9IG5ldyBMaW5lTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZWxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLkxpbmUpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIG5ldyBSZWN0KGwsIHQsIHIsIGIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQobGluZWxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChsaW5lbGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5TY2F0dGVyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzcmFkaWFsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhdHRlcmxheW91dDogUmFkaWFsU2NhdHRlckxheW91dCA9IG5ldyBSYWRpYWxTY2F0dGVyTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN4OiBudW1iZXIgPSAobCArIHIpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3k6IG51bWJlciA9IChiICsgdCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpdXM6IG51bWJlciA9ICgociAtIGwpIDwgKGIgLSB0KSA/IChyIC0gbCkgOiAoYiAtIHQpKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyUmFkaXVzOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlOiBudW1iZXIgPSBTdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmRBbmdsZTogbnVtYmVyID0gTWF0aC5QSSAqIDIrIHN0YXJ0QW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlcmxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLlNjYXR0ZXIpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIGN4LCBjeSwgaW5uZXJSYWRpdXMsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSB0aGlzLl9fc2hhcGVMaXN0LmNvbmNhdChzY2F0dGVybGF5b3V0LnNoYXBlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0cy5wdXNoKHNjYXR0ZXJsYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhdHRlckxheW91dDogU2NhdHRlckxheW91dCA9IG5ldyBTY2F0dGVyTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlckxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLlNjYXR0ZXIpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIG5ldyBSZWN0KGwsIHQsIHIsIGIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoc2NhdHRlckxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChzY2F0dGVyTGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIENoYXJ0VHlwZS5BcmVhOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzcmFkaWFsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJlYWxheW91dDogUmFkaWFsQXJlYUxheW91dCA9IG5ldyBSYWRpYWxBcmVhTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN4OiBudW1iZXIgPSAobCArIHIpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3k6IG51bWJlciA9IChiICsgdCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpdXM6IG51bWJlciA9ICgociAtIGwpIDwgKGIgLSB0KSA/IChyIC0gbCkgOiAoYiAtIHQpKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyUmFkaXVzOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlOiBudW1iZXIgPSBTdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmRBbmdsZTogbnVtYmVyID0gTWF0aC5QSSAqIDIgKyBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFsYXlvdXQuY29udmVydCh0aGlzLl9kYXRhbW9kZWwuZ2V0U2VyaWVzQnlUeXBlKENoYXJ0VHlwZS5BcmVhKSwgdGhpcy5fZGF0YW1vZGVsLmVuY29kaW5nLCBjeCwgY3ksIGlubmVyUmFkaXVzLCByYWRpdXMsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoYXJlYWxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChhcmVhbGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZWFsYXlvdXQ6IEFyZWFMYXlvdXQgPSBuZXcgQXJlYUxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFsYXlvdXQuY29udmVydCh0aGlzLl9kYXRhbW9kZWwuZ2V0U2VyaWVzQnlUeXBlKENoYXJ0VHlwZS5BcmVhKSwgdGhpcy5fZGF0YW1vZGVsLmVuY29kaW5nLCBuZXcgUmVjdChsLCB0LCByLCBiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlTGlzdCA9IHRoaXMuX19zaGFwZUxpc3QuY29uY2F0KGFyZWFsYXlvdXQuc2hhcGVMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLnB1c2goYXJlYWxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0LnNvcnQoKGE6IFNoYXBlLCBiOiBTaGFwZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xheW91dHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlc1BhaXJzID0gdGhpcy5sYXlvdXRzW2ldLnNjYWxlUGFpcnM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2Ygc2NhbGVzUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBfLmZpbmQodGhpcy5zY2FsZVBhaXJzLCAocDogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuZmlsZWQuZXF1YWxzKHBhaXIuZmlsZWQpICYmIHAuc2NhbGUuZXF1YWwocGFpci5zY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFtdLmNvbmNhdChwYWlyLnNlcmllcyksIGZpbGVkOiBwYWlyLmZpbGVkLCBzY2FsZTogcGFpci5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNlcmllcyA9IHJlc3VsdC5zZXJpZXMuY29uY2F0KHBhaXIuc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXlvdXRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzID0gdGhpcy5fbGF5b3V0c1swXS5zY2FsZVBhaXJzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIXRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZy5fcmFkaWFsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRMaW5lKGwsIHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VwZXIub25MYXlvdXQobCwgdCwgciwgYiwgY2FudmFzKTtcblxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0TGluZShsOiBudW1iZXIsIHI6IG51bWJlcikge1xuICAgICAgICAgICAgbGV0IHlzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgbGF5b3V0IG9mIHRoaXMubGF5b3V0cykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgbGF5b3V0LnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSBwYWlyLnNjYWxlLmdldFNjYWxlVmFsdWUoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeXMuaW5kZXhPZih5KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5cy5wdXNoKHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBheGlzbGluZTogQXhpc0xpbmVTaGFwZSA9IG5ldyBBeGlzTGluZVNoYXBlKGwsIHksIHIsIHksIERlZmF1bHQuc3Ryb2tlc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QucHVzaChheGlzbGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogbWVyYWdlIHRoZSBzY2FsZXMgd2hpY2ggaXMgIHggLyB5IFxuICAgICAgICAgKi9cbiAgICAgICAgcHJpdmF0ZSBfX21lcmFnZVNjYWxlKCkge1xuXG4gICAgICAgIH1cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkRyYXcoY2FudmFzKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc2hhcGUgb2YgdGhpcy5fX3NoYXBlTGlzdCkge1xuICAgICAgICAgICAgICAgIHNoYXBlLmRyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZXQgbGF5b3V0cygpOiBCYXNlTGF5b3V0W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xheW91dHM7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHNjYWxlUGFpcnMoKTogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zY2FsZVBhaXJzO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX2FuaW1hdGUoKXtcbiAgICAgICAgICAgIGlmICghdGhpcy5fYW5pbWF0aW9uLmlzQW5pYW10aW9uRW5kKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXdHcm91cCA9IGFuZHJvaWQudmlldy5WaWV3R3JvdXA7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG4gICAgaW1wb3J0IExheW91dFBhcmFtcyA9IGFuZHJvaWQudmlldy5MYXlvdXRQYXJhbXM7XG4gICAgaW1wb3J0IEZyYW1lTGF5b3V0ID0gYW5kcm9pZC53aWRnZXQuRnJhbWVMYXlvdXQ7XG4gICAgaW1wb3J0IEdyYXZpdHkgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYXZpdHk7XG4gICAgZXhwb3J0IGNvbnN0IFN0YXJ0QW5nbGU6bnVtYmVyID0gTWF0aC5QSTtcbiAgICBleHBvcnQgY2xhc3MgQ2FydGVzaWFuQ2hhcnQgZXh0ZW5kcyBGcmFtZUxheW91dCB7XG5cbiAgICAgICAgcHJpdmF0ZSBfZGF0YU1vZGVsOiBEYXRhTW9kZWw7XG4gICAgICAgIHByaXZhdGUgX2NoYXJ0VHlwZTogQ2hhcnRUeXBlO1xuICAgICAgICBwcml2YXRlIF9vcHRpb246IGFueTtcbiAgICAgICAgcHJpdmF0ZSBfYXhpc0xpc3Q6IEJhc2VBeGlzW107XG4gICAgICAgIHByaXZhdGUgX3Bsb3Q6IEJhc2VQbG90O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbnRleHQsIG9wdGlvbj86IGFueSwgY2hhcnRUeXBlPzogQ2hhcnRUeXBlKSB7XG4gICAgICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbiA9IG9wdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0VHlwZSA9IGNoYXJ0VHlwZTtcbiAgICAgICAgICAgIHRoaXMuX2F4aXNMaXN0ID0gW107XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG9wdGlvbih2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb24gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgb3B0aW9uKCk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHNldCBjaGFydFR5cGUodmFsdWU6IENoYXJ0VHlwZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT0gdGhpcy5fY2hhcnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhcnRUeXBlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGNoYXJ0VHlwZSgpOiBDaGFydFR5cGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoYXJ0VHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBkYXRhbW9kZWwodmFsdWU6IERhdGFNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gdmFsdWU7XG4gICAgICAgICAgICBpZih0aGlzLl9kYXRhTW9kZWwuZW5jb2RpbmcuX3JhZGlhbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFJhZGlhbFZpZXcoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRWaWV3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGRhdGFtb2RlbCgpOiBEYXRhTW9kZWwge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFNb2RlbDtcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9sb2FkVmlldygpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgdGhpcy5kYXRhbW9kZWwuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgIGlmIChwYWlyLmZpbGVkLm5hbWUgPT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBheGlzWTogTGluZUF4aXMgPSBuZXcgTGluZUF4aXModGhpcy5nZXRDb250ZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS50eXBlID0gQXhpc1R5cGUuWTtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kubGF5b3V0UGFyYW1zLmhlaWdodCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICAgICAgICAgIGF4aXNZLmxheW91dFBhcmFtcy53aWR0aCA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kubmVhciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGF4aXNZLnNlcmllcyA9IFtdLmNvbmNhdChwYWlyLnNlcmllcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F4aXNMaXN0LnB1c2goYXhpc1kpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFZpZXcoYXhpc1kpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9heGlzTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3RbdGhpcy5fYXhpc0xpc3QubGVuZ3RoIC0gMV0ubmVhciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBsb3Q6IEJhc2VQbG90ID0gbmV3IENhcnRlc2lhblBsb3QodGhpcy5nZXRDb250ZXh0KCksIHRoaXMuZGF0YW1vZGVsKTtcbiAgICAgICAgICAgIHBsb3QubGF5b3V0UGFyYW1zLndpZHRoID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIHBsb3QubGF5b3V0UGFyYW1zLmhlaWdodCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICB0aGlzLl9wbG90ID0gcGxvdDtcbiAgICAgICAgICAgIHRoaXMuYWRkVmlldyhwbG90KTtcbiAgICAgICAgICAgIGxldCBheGlzWDogTGluZUF4aXMgPSBuZXcgTGluZUF4aXModGhpcy5nZXRDb250ZXh0KCkpO1xuICAgICAgICAgICAgYXhpc1gudHlwZSA9IEF4aXNUeXBlLlg7XG4gICAgICAgICAgICBheGlzWC5sYXlvdXRQYXJhbXMud2lkdGggPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgYXhpc1gubGF5b3V0UGFyYW1zLmhlaWdodCA9IDEwMDtcbiAgICAgICAgICAgIGF4aXNYLm5lYXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3QucHVzaChheGlzWCk7XG4gICAgICAgICAgICB0aGlzLmFkZFZpZXcoYXhpc1gpO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX2xvYWRSYWRpYWxWaWV3KCkge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiB0aGlzLmRhdGFtb2RlbC5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNZOiBSYWRpYWxMaW5lQXhpcyA9IG5ldyBSYWRpYWxMaW5lQXhpcyh0aGlzLmdldENvbnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGF4aXNZLnR5cGUgPSBBeGlzVHlwZS5ZO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kubGF5b3V0UGFyYW1zLndpZHRoID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kubmVhciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGF4aXNZLnNlcmllcyA9IFtdLmNvbmNhdChwYWlyLnNlcmllcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F4aXNMaXN0LnB1c2goYXhpc1kpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFZpZXcoYXhpc1kpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9heGlzTGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3RbdGhpcy5fYXhpc0xpc3QubGVuZ3RoIC0gMV0ubmVhciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBsb3Q6IEJhc2VQbG90ID0gbmV3IENhcnRlc2lhblBsb3QodGhpcy5nZXRDb250ZXh0KCksIHRoaXMuZGF0YW1vZGVsKTtcbiAgICAgICAgICAgIHBsb3QubGF5b3V0UGFyYW1zLndpZHRoID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIHBsb3QubGF5b3V0UGFyYW1zLmhlaWdodCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICB0aGlzLl9wbG90ID0gcGxvdDtcbiAgICAgICAgICAgIHRoaXMuYWRkVmlldyhwbG90KTtcbiAgICAgICAgICAgIGxldCBheGlzWDogUmFkaWFsTGluZUF4aXMgPSBuZXcgUmFkaWFsTGluZUF4aXModGhpcy5nZXRDb250ZXh0KCkpO1xuICAgICAgICAgICAgYXhpc1gudHlwZSA9IEF4aXNUeXBlLlg7XG4gICAgICAgICAgICBheGlzWC5ncmF2aXR5ID0gR3Jhdml0eS5DZW50ZXI7XG4gICAgICAgICAgICBheGlzWC5sYXlvdXRQYXJhbXMud2lkdGggPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgYXhpc1gubGF5b3V0UGFyYW1zLmhlaWdodCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICBheGlzWC5uZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2F4aXNMaXN0LnB1c2goYXhpc1gpO1xuICAgICAgICAgICAgdGhpcy5hZGRWaWV3KGF4aXNYKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTWVhc3VyZSh3aWR0aDogTWVhc3VyZVNwZWMsIGhlaWdodDogTWVhc3VyZVNwZWMsIGNhbnZhczogQ2FudmFzKTogU2l6ZSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gc3VwZXIub25NZWFzdXJlKHdpZHRoLGhlaWdodCxjYW52YXMpO1xuICAgICAgICAgICAgbGV0IG1heHNpemU6IFNpemUgPSBuZXcgU2l6ZSgwLCAwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFtb2RlbC5lbmNvZGluZy5fcmFkaWFsKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBheGlzIG9mIHRoaXMuX2F4aXNMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gYXhpcy5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBzaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCB3IDpudW1iZXIgPSB3aWR0aC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICBsZXQgaCA6bnVtYmVyID0gaGVpZ2h0LmdldE1lYXN1cmVWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGxldCByYWRpdXM6bnVtYmVyID0gdzxoP3cvMjpoLzIgO1xuICAgICAgICAgICAgICAgIHJhZGl1cyA9IHJhZGl1cyAtIG9mZnNldDtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRBbmdsZTpudW1iZXIgPSBTdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgIGxldCBzd2VlcDpudW1iZXIgPSBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2aWV3IG9mIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemU6IFNpemUgPSBuZXcgU2l6ZSgwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXcgaW5zdGFuY2VvZiBCYXNlQXhpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXcudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHZpZXcub25NZWFzdXJlKG5ldyBNZWFzdXJlU3BlYyh3aWR0aC5nZXRNZWFzdXJlVmFsdWUoKSwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpLCBuZXcgTWVhc3VyZVNwZWMoaGVpZ2h0LmdldE1lYXN1cmVWYWx1ZSgpLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih2aWV3LnR5cGUgPT0gQXhpc1R5cGUuWCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICg8UmFkaWFsTGluZUF4aXM+dmlldykuX2lubmVyUmFkaXVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8UmFkaWFsTGluZUF4aXM+dmlldykuX3N0YXJ0QW5nbGUgPSBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgKDxSYWRpYWxMaW5lQXhpcz52aWV3KS5fc3dlZXAgPSBzd2VlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8UmFkaWFsTGluZUF4aXM+dmlldykuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpZXcgaW5zdGFuY2VvZiBCYXNlUGxvdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpbkxlZnQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luVG9wID0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblJpZ2h0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpbkJvdHRvbSA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBsb2ZmID0gMCwgdG9mZiA9IDAsIHJvZmYgPSAwLCBib2ZmID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBheGlzIG9mIHRoaXMuX2F4aXNMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gYXhpcy5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMudHlwZSA9PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcy5uZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9mZiA9IHNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2ZmID0gc2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXhpcy50eXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChheGlzLm5lYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2ZmID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9mZiA9IHNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdmlldyBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3IGluc3RhbmNlb2YgQmFzZUF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3LnR5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5MZWZ0ID0gbG9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luUmlnaHQgPSByb2ZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZShuZXcgTWVhc3VyZVNwZWMod2lkdGguZ2V0TWVhc3VyZVZhbHVlKCkgLSBsb2ZmIC0gcm9mZiwgd2lkdGgubW9kZSksIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlldy50eXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlldy5uZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5Ub3AgPSB0b2ZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luQm90dG9tID0gYm9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHZpZXcub25NZWFzdXJlKHdpZHRoLCBuZXcgTWVhc3VyZVNwZWMoaGVpZ2h0LmdldE1lYXN1cmVWYWx1ZSgpIC0gdG9mZiAtIGJvZmYsIExheW91dFBhcmFtcy5FWEFDVExZKSwgY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luVG9wID0gdG9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblJpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHZpZXcub25NZWFzdXJlKHdpZHRoLCBuZXcgTWVhc3VyZVNwZWMoaGVpZ2h0LmdldE1lYXN1cmVWYWx1ZSgpIC0gdG9mZiAtIGJvZmYsIExheW91dFBhcmFtcy5FWEFDVExZKSwgY2FudmFzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3IGluc3RhbmNlb2YgQmFzZVBsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5MZWZ0ID0gbG9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5SaWdodCA9IHJvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luVG9wID0gdG9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5Cb3R0b20gPSBib2ZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHZpZXcub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gdmlldy5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZS53aWR0aCA+IG1heHNpemUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heHNpemUud2lkdGggPSBzaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXplLmhlaWdodCA+IG1heHNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhzaXplLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICB9XG5cblxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmxheW91dEluZm8ucmVzZXQobCwgdCwgciwgYiwgdGhpcy5wYWRkaW5nLCAwKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgYXhpcyBvZiB0aGlzLl9heGlzTGlzdCkge1xuICAgICAgICAgICAgICAgIGF4aXMuc2NhbGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc3VwZXIub25MYXlvdXQobCwgdCwgciwgYiwgY2FudmFzKTsgXG4gICAgICAgICAgICB0aGlzLmxheW91dEl0ZW0odGhpcy5wbG90LCBsLCB0LCByLCBiLCBjYW52YXMpO1xuXG5cbiAgICAgICAgICAgIGZvciAobGV0IGF4aXMgb2YgdGhpcy5fYXhpc0xpc3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyBpbnN0YW5jZW9mIEJhc2VBeGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGF4aXMgaW5zdGFuY2VvZiBSYWRpYWxMaW5lQXhpcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBheGlzLl9jeCA9IChsICtyKS8yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXhpcy5fY3kgPSAodCtiKS8yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChheGlzLnR5cGUgPT09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgdGhpcy5wbG90LnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFpci5maWxlZC5uYW1lID09ICd4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBheGlzLnNjYWxlID0gcGFpci5zY2FsZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgdGhpcy5wbG90LnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFpci5maWxlZC5uYW1lID09ICd5JyAmJiBfLnhvcihwYWlyLnNlcmllcywgYXhpcy5zZXJpZXMpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF4aXMuc2NhbGUgPSBwYWlyLnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dEl0ZW0oYXhpcywgbCwgciwgdCwgYiwgY2FudmFzKTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBwbG90KCk6IENhcnRlc2lhblBsb3Qge1xuICAgICAgICAgICAgZm9yIChsZXQgcGxvdCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsb3QgaW5zdGFuY2VvZiBDYXJ0ZXNpYW5QbG90KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwbG90O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBkaXNwYXRjaERyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmRpc3BhdGNoRHJhdyhjYW52YXMpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwiXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIGltcG9ydCBQYWRkaW5nID0gYW5kcm9pZC5ncmFwaGljcy5QYWRkaW5nO1xuICAgIGltcG9ydCBBbGlnbiA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ247XG4gICAgaW1wb3J0IEdyYXZpdHkgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYXZpdHk7XG5cblxuICAgIGltcG9ydCBBbGlnbkVsbWVudCA9IGFuZHJvaWQuZ3JhcGhpY3MuQWxpZ25FbG1lbnQ7XG4gICAgaW1wb3J0IE1hcmdpbiA9IGFuZHJvaWQuZ3JhcGhpY3MuTWFyZ2luO1xuXG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3R3JvdXAgPSBhbmRyb2lkLnZpZXcuVmlld0dyb3VwO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG5cbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGltcG9ydCBNZWFzdXJlU3BlYyA9IGFuZHJvaWQudmlldy5NZWFzdXJlU3BlYztcbiAgICBpbXBvcnQgTGF5b3V0UGFyYW1zID0gYW5kcm9pZC52aWV3LkxheW91dFBhcmFtcztcbiAgICBpbXBvcnQgTW90aW9uRXZlbnQgPSBhbmRyb2lkLnZpZXcuZXZlbnQuTW90aW9uRXZlbnQ7XG4gICAgaW1wb3J0IEZyYW1lTGF5b3V0ID0gYW5kcm9pZC53aWRnZXQuRnJhbWVMYXlvdXQ7XG4gICAgaW1wb3J0IExpbmVhZXJMYXlvdXQgPSBhbmRyb2lkLndpZGdldC5MaW5lYXJMYXlvdXQ7XG5cbiAgICBpbXBvcnQgUmVuZGVyVHlwZSA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVuZGVyVHlwZTtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG4gICAgaW1wb3J0IERldmljZSA9IGFuZHJvaWQuZGV2aWNlLkRldmljZTtcbiAgICBpbXBvcnQgT3JpZW50YXRpb24gPSBhbmRyb2lkLmdyYXBoaWNzLk9yaWVudGF0aW9uO1xuXG4gICAgZXhwb3J0IGNsYXNzIENoYXJ0TGF5b3V0IGV4dGVuZHMgRnJhbWVMYXlvdXQge1xuICAgICAgICBwcml2YXRlIF93OiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2g6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfbDogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF90OiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX2NoYXJ0OiBDYXJ0ZXNpYW5DaGFydDtcbiAgICAgICAgcHJpdmF0ZSBfaG9yaXpvbnRhbGxlZ2VuZDogU2VyaWVzTGVnZW5kO1xuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgICAgICBwcml2YXRlIF9kYXRhTW9kZWw6IERhdGFNb2RlbDtcbiAgICAgICAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCkge1xuICAgICAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLmNsaXAgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBFdmVudEhhbmRsZXIgPSAocHQ6IFBvaW50LCB0eXBlczogRWxlbWVudFR5cGUsIGluZm86IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIFwiICsgcHQudG9TdHJpbmcoKSArIFwiLCB0eXBlIFwiICsgdHlwZXMgKyBcIiAsIGluZm8gXCIgKyBpbmZvKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZXMgPT0gRWxlbWVudFR5cGUuU2VyaWVzTGVnZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXM6IHN0cmluZ1tdID0gdGhpcy5fZGF0YU1vZGVsLmZpbHRlci5zZXJpZXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gc2VyaWVzLmluZGV4T2YoaW5mby5zZXJpZXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5lbmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsLmZpbHRlci5zZXJpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpbmRleCA8IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5maWx0ZXIuc2VyaWVzLnB1c2goaW5mby5zZXJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2hhcnQoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvd1snRXZlbnRIYW5kbGVyJ10gPSBFdmVudEhhbmRsZXI7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICBcbiAgICAgICAgYXR0YWNoRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgZGF0YW1vZGVsOiBEYXRhTW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbnRvdWNoc3RhcnQgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbnRvdWNobW92ZSA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9udG91Y2hlbmQgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbnRvdWNoY2FuY2VsID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub25tb3VzZWRvd24gPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNlbW92ZSA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9ubW91c2V1cCA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9ubW91c2VvdXQgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNlb3ZlciA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9uY2xpY2sgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0UGFyYW1zLndpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0UGFyYW1zLmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5wYWRkaW5nID0gbmV3IFBhZGRpbmcoMjApO1xuICAgICAgICAgICAgRGV2aWNlLndpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIERldmljZS5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcyA9IG5ldyBDYW52YXMoZWxlbWVudCwgUmVuZGVyVHlwZS5DYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5fbCA9IDA7XG4gICAgICAgICAgICB0aGlzLl90ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3cgPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgdGhpcy5faCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gZGF0YW1vZGVsO1xuICAgICAgICAgICAgdGhpcy5zZXRDaGFydCgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBzZXRDaGFydCgpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsVmlld3MoKTtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0ID0gbmV3IENhcnRlc2lhbkNoYXJ0KG51bGwsIG51bGwsIENoYXJ0VHlwZS5CYXIpO1xuICAgICAgICAgICAgdGhpcy5fY2hhcnQubGF5b3V0UGFyYW1zLndpZHRoID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0LmxheW91dFBhcmFtcy5oZWlnaHQgPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgLy8gdGhpcy5fY2hhcnQuZGF0YW1vZGVsID0gZGF0YW1vZGVsO1xuICAgICAgICAgICAgdGhpcy5fY2hhcnQuZGF0YW1vZGVsID0gdGhpcy5fZGF0YU1vZGVsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFNb2RlbC5hbGxTZXJpZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQgPSBuZXcgU2VyaWVzTGVnZW5kKCdiYXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3Jpem9udGFsbGVnZW5kLnNlcmllcyA9IHRoaXMuX2RhdGFNb2RlbC5hbGxTZXJpZXM7XG4gICAgICAgICAgICAgICAgLy8gLm1hcCgoc2VyOiBTZXJpZXMsIGluZGV4OiBudW1iZXIsIGFycjogU2VyaWVzW10pID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIHNlci5uYW1lO1xuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFNb2RlbC5zZXJpZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9ob3Jpem9udGFsbGVnZW5kLnNlcmllcyA9IGRhdGFtb2RlbC5fZ2V0U2NhbGVCeU5hbWUoJ2NvbG9yJyxkYXRhbW9kZWwuc2VyaWVzWzBdLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2hvcml6b250YWxsZWdlbmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQuc2V0T3JpZW50YXRpb24oT3JpZW50YXRpb24uSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faG9yaXpvbnRhbGxlZ2VuZC5sYXlvdXRQYXJhbXMud2lkdGggPSBMYXlvdXRQYXJhbXMuV1JBUF9DT05URU5UO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQubGF5b3V0UGFyYW1zLmhlaWdodCA9IDMwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQuZ3Jhdml0eSA9IEdyYXZpdHkuVG9wO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJ0LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luVG9wID0gMzA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jaGFydC5ncmF2aXR5ID0gR3Jhdml0eS5Cb3R0b207XG4gICAgICAgICAgICB0aGlzLmFkZFZpZXcodGhpcy5fY2hhcnQsIDApO1xuICAgICAgICAgICAgdGhpcy5hZGRWaWV3KHRoaXMuX2hvcml6b250YWxsZWdlbmQsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBvbnRvdWNoKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgICAgIGxldCBtZXZlbnQ6IE1vdGlvbkV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KDAsIDAsIDApO1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoc3RhcnRcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RyPSBcIlRvdWNoIHN0YXJ0ZWQgKFwiICsgZXZlbnQudG91Y2hlc1swXS5jbGllbnRYICsgXCIsXCIgKyBldmVudC50b3VjaGVzWzBdLmNsaWVudFkgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fRE9XTik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGVuZFwiOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX1VQKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoY2FuY2VsXCI6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fQ0FOQ0VMKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNobW92ZVwiOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLCBldmVudC50b3VjaGVzWzBdLmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1ZFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9ET1dOKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9NT1ZFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfVVApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT1VUKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdmVyJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9PVkVSKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX0NMSUNLKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldmVudC5lbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgICAgICAgICAgLy8gZ2V0RWxlbWVudFJlY3QoZTogRWxlbWVudCk6IFJlY3Qge1xuICAgICAgICAgICAgLy8gICAgIHZhciByYyA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIG5ldyBSZWN0KHJjLmxlZnQgKyBwYWdlWE9mZnNldCwgcmMudG9wICsgcGFnZVlPZmZzZXQsIHJjLndpZHRoLCByYy5oZWlnaHQpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdmFyIGVsZW1lbnRyZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbWV2ZW50LnggPSBtZXZlbnQueCAtIGVsZW1lbnRyZWN0LmxlZnQ7XG4gICAgICAgICAgICBtZXZlbnQueSA9IG1ldmVudC55IC0gZWxlbWVudHJlY3QudG9wO1xuICAgICAgICAgICAgdGhpcy5zZW5kRXZlbnQobWV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2VuZEV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCkge1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQuYWN0aW9uID49IE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9ET1dOKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoVG91Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZGlzcGF0Y2hEcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kaXNwYXRjaERyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5sYXlvdXRJbmZvLm91dHRlcnJlY3Q7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1JlY3QocmVjdC5zdGFydFBvaW50LCByZWN0LmVuZFBvaW50LCBmYWxzZSwgJ2JsYWNrJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkxheW91dChsLCB0LCByLCBiLCBjYW52YXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5sYXlvdXRJbmZvLnJlc2V0KGwsdCxyLGIsdGhpcy5fcGFkZGluZywwKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5b3V0SXRlbSh0aGlzLl9ob3Jpem9udGFsbGVnZW5kLGwsdCxyLGIsY2FudmFzKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5b3V0SXRlbSh0aGlzLl9jaGFydCxsLHQrdGhpcy5faG9yaXpvbnRhbGxlZ2VuZC5oZWlnaHQscixiLGNhbnZhcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgb25pbnZhbGlkYXRlKCkge1xuICAgICAgICAgICAgc3VwZXIub25pbnZhbGlkYXRlKCk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuYmVnaW4oKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hEcmF3KHRoaXMuX2NhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuZW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVxdWVzdExheW91dCgpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aDogTWVhc3VyZVNwZWMgPSBuZXcgTWVhc3VyZVNwZWModGhpcy5fdywgTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0OiBNZWFzdXJlU3BlYyA9IG5ldyBNZWFzdXJlU3BlYyh0aGlzLl9oLCBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5iZWdpbigpO1xuICAgICAgICAgICAgdmFyIHNpemU6IFNpemUgPSB0aGlzLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCB0aGlzLl9jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5vbkxheW91dCh0aGlzLl9sLCB0aGlzLl90LCB0aGlzLl9sICsgc2l6ZS53aWR0aCwgdGhpcy5fdCArIHNpemUuaGVpZ2h0LCB0aGlzLl9jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmVuZCgpO1xuICAgICAgICAgICAgdGhpcy5vbmludmFsaWRhdGUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFkZFZpZXcodmlldzogVmlldywgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgICAgIHN1cGVyLmFkZFZpZXcodmlldywgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgIGV4cG9ydCBjbGFzcyBFdmVudEhhbmRsZXJ7XG4gICAgICAgIFxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gIGFuZHJvaWQudmlldy5WaWV3R3JvdXA7XG4gICAgaW1wb3J0IExpbmVhckxheW91dCA9IGFuZHJvaWQud2lkZ2V0LkxpbmVhckxheW91dDtcbiAgICBleHBvcnQgY2xhc3MgTGVnZW5kTGF5b3V0IGV4dGVuZHMgTGluZWFyTGF5b3V0e1xuICAgICAgICAgICAgXG4gICAgfVxufSJdfQ==
