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
/// <reference path="./../base.d.ts" />
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
            static mergeScale(scaleA, scaleB, force = false) {
                let scale = null;
                if (scaleA.id == scaleB.id) {
                    if (scaleA instanceof test.OrdinalScale && scaleB instanceof test.OrdinalScale) {
                        let domainunions = _.union(scaleA.domains, scaleB.domains);
                        if (force || (scaleA.domains.length / domainunions.length > 0.5 && scaleB.domains.length / domainunions.length > 0.5)) {
                            scale = scaleA.clone();
                            scale.domain(domainunions);
                        }
                    }
                    else if ((scaleA instanceof test.LinearScale && scaleB instanceof test.LinearScale)) {
                        let min = Math.min(scaleA.min, scaleB.min);
                        let max = Math.max(scaleA.max, scaleB.max);
                        let rate1 = Math.abs(max - min) / (Math.abs(scaleA.max - scaleA.min));
                        let rate2 = Math.abs(max - min) / (Math.abs(scaleB.max - scaleB.min));
                        console.log("Linear range rate1 = " + rate1 + " , rate2 = " + rate2);
                        if (force || (rate1 < 5 && rate2 < 5)) {
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
                                    let force = this.encoding._stack && pairA.filed.name == 'y';
                                    let infoA = this.__getScaleInfobyname(pairA.filed.name, series.name);
                                    let infoB = this.__getScaleInfobyname(pairB.filed.name, next_series.name);
                                    if (infoA == null && infoB == null) {
                                        let scale = test.Utility.mergeScale(pairA.scale, pairB.scale, force);
                                        if (scale != null) {
                                            this.__scalePairs.push({ series: [series.name, next_series.name], filed: filed, scale: scale });
                                        }
                                        else {
                                            this.__scalePairs.push({ series: [series.name], filed: pairA.filed, scale: pairA.scale });
                                            this.__scalePairs.push({ series: [next_series.name], filed: pairB.filed, scale: pairB.scale });
                                        }
                                    }
                                    else if (infoA == null && infoB != null) {
                                        let scale = test.Utility.mergeScale(pairA.scale, infoB.scale, force);
                                        if (scale != null) {
                                            infoB.scale = scale;
                                            infoB.series.push(series.name);
                                        }
                                    }
                                    else if (infoA != null && infoB == null) {
                                        let scale = test.Utility.mergeScale(pairB.scale, infoA.scale, force);
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
        var View = android.view.View;
        class Shape extends View {
            constructor() {
                super(null);
                this.priority = Shape.PRIORITY;
            }
            set style(value) {
                this._style = value;
            }
            get style() {
                return this._style;
            }
            draw(canvas) {
                this.onDraw(canvas);
            }
            onMouseEvent(event) {
                console.log("shape ==== " + event.toString());
                return true;
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
            onDraw(canvas) {
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
                // if (this.label != null) {
                //     this.label.onDraw(canvas);
                // }
            }
            refresh() {
                // console.log(" *** you, this function is not been implemented yet!!! ");
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
        var Animation = android.view.animation.Animation;
        class BarShape extends test.PlotShape {
            constructor(x, y, w, h, style, strokeStyle) {
                super();
                let top = y;
                let left = x;
                let height = h;
                let width = w;
                if (height < 0) {
                    top = top + height;
                    height = Math.abs(height);
                }
                this.layoutInfo.reset(left, top, left + width, top + height, this.padding, 0);
                this._oldLayoutInfo = this.layoutInfo.clone();
                this._style = style;
                if (style == null) {
                    this._style = Default.style;
                }
                this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    this._strokeStyle = Default.strokestyle;
                }
            }
            onDraw(canvas) {
                canvas.drawRect(this.layoutInfo.innerrect.startPoint, this.layoutInfo.innerrect.endPoint, true, this._style.background);
            }
        }
        test.BarShape = BarShape;
        class BarAnimation extends Animation {
            constructor(rect) {
                super();
                this.ease = new android.view.animation.BounceAnimationEase();
            }
            applyTransformation(interpolatedTime, canvas, view) {
                if (view instanceof BarShape) {
                    let scale = this.from + (this.to - this.from) * interpolatedTime;
                    let rect = this.rect.clone();
                    scale = scale - 1;
                    // view.layoutInfo.innerrect.left = this.rect.left - (scale * view.layoutInfo.innerrect.width / 2);
                    view.layoutInfo.innerrect.top = this.rect.top - (scale * view.layoutInfo.innerrect.height);
                    // view.layoutInfo.innerrect.width = this.rect.width + (scale * view.layoutInfo.innerrect.width);
                    view.layoutInfo.innerrect.height = this.rect.height + (scale * view.layoutInfo.innerrect.height);
                    console.log("Bar height  " + view.layoutInfo.innerrect.width + " rect.height " + rect.height + " scale " + scale);
                }
            }
            onStartAniamtion(canvas, view) {
                console.log("onStartAniamtion ");
                this.rect = view.layoutInfo.innerrect.clone();
            }
            onEndAnimation(canvas, view) {
                // view.layoutInfo.innerrect = this.rect;
                console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
            }
        }
        test.BarAnimation = BarAnimation;
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
                this.layoutInfo.reset(cx - radius, cy - radius, cx + radius, cy + radius, this.padding, 0);
                this._oldLayoutInfo = this.layoutInfo.clone();
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
            onDraw(canvas) {
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
        var MotionEvent = android.view.event.MotionEvent;
        var Animation = android.view.animation.Animation;
        class ScatterShape extends test.PlotShape {
            constructor(x, y, w, h, style, strokeStyle) {
                super();
                let top = y;
                let left = x;
                let height = h;
                let width = w;
                if (height < 0) {
                    top = top + height;
                    height = Math.abs(height);
                }
                this.layoutInfo.reset(left, top, left + width, top + height, this.padding, 0);
                this._oldLayoutInfo = this.layoutInfo.clone();
                this._style = style;
                if (style == null) {
                    this._style = Default.style;
                }
                this._strokeStyle = strokeStyle;
                if (strokeStyle == null) {
                    this._strokeStyle = Default.strokestyle;
                }
                // if (this.rect.height < 0) {
                //     let top = this.rect.bottom;
                //     let bottom = this.rect.top;
                //     this.rect.top = top;
                //     this.rect.bottom = bottom;
                // }
                this.priority = test.Shape.PRIORITY + 2;
            }
            onDraw(canvas) {
                canvas.drawArc(this.layoutInfo.innerrect, 0, 2 * 180, this.style.background);
            }
            onMouseEvent(event) {
                console.log("shape ==== " + event.toString());
                switch (event.action) {
                    case MotionEvent.ACTION_MOUSE_ON:
                        let animation = new ScatterAnimation(this.layoutInfo.innerrect);
                        animation.duration = 400;
                        animation.from = 1;
                        animation.to = 1.2;
                        animation.fillAfter = true;
                        this.startAnimation(animation);
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        let animation_out = new ScatterAnimation(this.layoutInfo.innerrect);
                        animation_out.duration = 200;
                        animation_out.from = 1.2;
                        animation_out.to = 1;
                        animation_out.fillAfter = false;
                        this.startAnimation(animation_out);
                        break;
                    case MotionEvent.ACTION_MOUSE_MOVE:
                        break;
                    case MotionEvent.ACTION_MOUSE_OUT:
                        break;
                }
                return true;
            }
        }
        test.ScatterShape = ScatterShape;
        class ScatterAnimation extends Animation {
            constructor(rect) {
                super();
                this.ease = new android.view.animation.BounceAnimationEase();
            }
            applyTransformation(interpolatedTime, canvas, view) {
                if (view instanceof ScatterShape) {
                    let scale = this.from + (this.to - this.from) * interpolatedTime;
                    // let dx :number=-view.layoutInfo.innerrect.left;
                    // let dy :number=-view.layoutInfo.innerrect.top;
                    // canvas.translate(dx,dy);
                    // canvas.scale(scale,scale);
                    // canvas.translate(view.layoutInfo.innerrect.width,view.layoutInfo.innerrect.height);
                    let rect = this.rect.clone();
                    scale = scale - 1;
                    view.layoutInfo.innerrect.left = this.rect.left - (scale * view.layoutInfo.innerrect.width / 2);
                    view.layoutInfo.innerrect.top = this.rect.top - (scale * view.layoutInfo.innerrect.height / 2);
                    view.layoutInfo.innerrect.width = this.rect.width + (scale * view.layoutInfo.innerrect.width);
                    view.layoutInfo.innerrect.height = this.rect.height + (scale * view.layoutInfo.innerrect.height);
                    console.log("scatter width  " + view.layoutInfo.innerrect.width + " rect.width " + rect.width + " scale " + scale);
                }
            }
            onStartAniamtion(canvas, view) {
                console.log("onStartAniamtion ");
                this.rect = view.layoutInfo.innerrect.clone();
            }
            onEndAnimation(canvas, view) {
                // view.layoutInfo.innerrect = this.rect;
                console.log("onAnimationEnd " + view.layoutInfo.innerrect.width + "  ");
            }
        }
        test.ScatterAnimation = ScatterAnimation;
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
            onDraw(canvas) {
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
            onDraw(canvas) {
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
            onDraw(canvas) {
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
            onDraw(canvas) {
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
        var ViewGroup = android.view.ViewGroup;
        class BasePlot extends ViewGroup {
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
        var Animation = android.view.animation.Animation;
        var BounceAnimationEase = android.view.animation.BounceAnimationEase;
        class CartesianPlot extends test.BasePlot {
            constructor(context, datamodel) {
                super(context);
                this.__shapeList = [];
                this._datamodel = datamodel;
                this._layouts = [];
                this.__scalePairs = [];
                this._animation = new Animation();
                this._animation.duration = 500;
                this._animation.ease = new BounceAnimationEase();
            }
            onMeasure(width, height, canvas) {
                return super.onMeasure(width, height, canvas);
            }
            onLayout(l, t, r, b, canvas) {
                super.onLayout(l, t, r, b, canvas);
                if (this.islayoutChanged) {
                    this.removeAllViews();
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
                    for (let shape of this.__shapeList) {
                        this.addViewWithOutReLayout(shape);
                    }
                }
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
            beginChartAnimation() {
                for (let i = 0; i < this.children.length; ++i) {
                    let shape = this.children[i];
                    if (shape instanceof test.ScatterShape) {
                        setTimeout(() => {
                            let animation = new test.ScatterAnimation(null);
                            animation.duration = 1000;
                            animation.from = 0.2;
                            animation.to = 1;
                            animation.fillAfter = false;
                            shape.startAnimation(animation);
                        }, 100 * i);
                    }
                    else if (shape instanceof test.BarShape) {
                        // BarAnimation
                        setTimeout(() => {
                            let animation = new test.BarAnimation(null);
                            animation.duration = 2000;
                            animation.from = 0.3;
                            animation.to = 1;
                            animation.fillAfter = false;
                            shape.startAnimation(animation);
                        }, 100 * i);
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
                // for (let shape of this.__shapeList) {
                //     shape.draw(canvas);
                // }
            }
            get layouts() {
                return this._layouts;
            }
            get scalePairs() {
                return this.__scalePairs;
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
            beginChartAnimation() {
                this.plot.beginChartAnimation();
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
                                    view.layoutParams.margin.marginBottom = boff;
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
        var LayoutParams = android.view.LayoutParams;
        var MotionEvent = android.view.event.MotionEvent;
        var RenderType = android.graphics.RenderType;
        var Device = android.device.Device;
        var Orientation = android.graphics.Orientation;
        var RootView = android.widget.RootView;
        class ChartLayout extends RootView {
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
                Device.width = element.clientWidth;
                Device.height = element.clientHeight;
                this.attachRender(new Canvas(element, RenderType.Canvas));
                // this._l = 0;
                // this._t = 0;
                // this._w = element.clientWidth;
                // this._h = element.clientHeight;
                this.setInfo(0, 0, element.clientWidth, element.clientHeight);
                this.padding = new Padding(20);
                this._dataModel = datamodel;
                this.setChart();
            }
            beginChartAnimation() {
                this._chart.beginChartAnimation();
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
            // oninvalidate() {
            //     super.oninvalidate();
            //     this._canvas.begin();
            //     this.dispatchDraw(this._canvas);
            //     this._canvas.end();
            // }
            // public requestLayout() {
            //     var width: MeasureSpec = new MeasureSpec(this._w, LayoutParams.MATCH_PARENT);
            //     var height: MeasureSpec = new MeasureSpec(this._h, LayoutParams.MATCH_PARENT);
            //     this._canvas.begin();
            //     var size: Size = this.onMeasure(width, height, this._canvas);
            //     this.onLayout(this._l, this._t, this._l + size.width, this._t + size.height, this._canvas);
            //     this._canvas.end();
            //     this.oninvalidate();
            // }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy91dGlsL0RlYnVnLnRzIiwic3JjL3V0aWwvVXRpbGl0eS50cyIsInNyYy91dGlsL0NvbG9yVXRpbHMudHMiLCJzcmMvdXRpbC9Sb3RhdGVkUmVjdC50cyIsInNyYy9tb2RlbC9lbnVtL0FuaW1hdGlvblR5cGUudHMiLCJzcmMvbW9kZWwvZW51bS9BZ2cudHMiLCJzcmMvbW9kZWwvZW51bS9PcmRlci50cyIsInNyYy9tb2RlbC9lbnVtL1NjYWxlVHlwZS50cyIsInNyYy9tb2RlbC9lbnVtL0RhdGFUeXBlLnRzIiwic3JjL21vZGVsL2VudW0vQ2hhcnRUeXBlLnRzIiwic3JjL21vZGVsL2VudW0vQXhpc1R5cGUudHMiLCJzcmMvbW9kZWwvY2FydGVzaWFuL1ZhbHVlLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9GaWVsZC50cyIsInNyYy9tb2RlbC9jYXJ0ZXNpYW4vRmlsdGVyLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9FbmNvZGluZy50cyIsInNyYy9tb2RlbC9jYXJ0ZXNpYW4vVHJhbnNGb3JtLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9TZXJpZXMudHMiLCJzcmMvbW9kZWwvY2FydGVzaWFuL0RhdGFNb2RlbC50cyIsInNyYy9zY2FsZS9JU2NhbGUudHMiLCJzcmMvc2NhbGUvU2NhbGUudHMiLCJzcmMvc2NhbGUvTGluZWFyU2NhbGUudHMiLCJzcmMvc2NhbGUvT3JkaW5hbFNjYWxlLnRzIiwic3JjL3NjYWxlL0xvZ1NjYWxlLnRzIiwic3JjL3NjYWxlL0NvbG9yU2NhbGUudHMiLCJzcmMvdmlldy9FbGVtZW50VHlwZS50cyIsInNyYy92aWV3L2xlZ2VuZC9MZWdlbmQudHMiLCJzcmMvdmlldy9zaGFwZS9TaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL0xhYmxlLnRzIiwic3JjL3ZpZXcvc2hhcGUvUGxvdFNoYXBlLnRzIiwic3JjL3ZpZXcvc2hhcGUvQmFyU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9SYWRpYWxCYXJTaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL1NjYXR0ZXJTaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL0xpbmVzU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9BcmVhU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9BeGlzTGluZVNoYXBlLnRzIiwic3JjL3ZpZXcvbGF5b3V0L0Jhc2VMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvQ2FydGVzaWFuTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L0JhckxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9TY2F0dGVyTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L1JhZGlhbENhcnRlc2lhbkxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9SYWRpYWxCYXJMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvUmFkaWFsTGluZUxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9SYWRpYWxBcmVhTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L1JhZGlhbFNjYXR0ZXJMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvTGluZUxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9BcmVhTGF5b3V0LnRzIiwic3JjL3ZpZXcvYXhpcy90aWNrcy9UaWNrcy50cyIsInNyYy92aWV3L2F4aXMvdGlja3MvTGluZWFyVGlja3MudHMiLCJzcmMvdmlldy9heGlzL3RpY2tzL0xvZ1RpY2tzLnRzIiwic3JjL3ZpZXcvYXhpcy90aWNrcy9PcmRpbmFsVGlja3MudHMiLCJzcmMvdmlldy9heGlzL3NoYXBlL0F4aXNTaGFwZS50cyIsInNyYy92aWV3L2F4aXMvQmFzZUF4aXMudHMiLCJzcmMvdmlldy9heGlzL0xpbmVBeGlzLnRzIiwic3JjL3ZpZXcvYXhpcy9SYWRpYWxMaW5lQXhpcy50cyIsInNyYy92aWV3L3Bsb3QvQmFzZVBsb3QudHMiLCJzcmMvdmlldy9wbG90L0NhcnRlc2lhblBsb3QudHMiLCJzcmMvdmlldy9jaGFydC9jYXJ0ZXNpYW4vQ2FydGVzaWFuQ2hhcnQudHMiLCJzcmMvdmlldy9jaGFydC9DaGFydExheW91dC50cyIsInNyYy91dGlsL0V2ZW50SGFuZGxlci50cyIsInNyYy92aWV3L2xlZ2VuZC9MZWdlbmRMYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxPQUFPLENBWWhCO0FBWkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxJQUFJLENBWXJCO0lBWmlCLFdBQUEsSUFBSTtRQUNsQjtZQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBWSxLQUFLLEVBQUMsR0FBVztnQkFDdkMsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO29CQUNMLElBQUksR0FBRyxHQUFTLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQzVCLE1BQU0sR0FBRyxHQUFDLElBQUksR0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUM3QixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBTztnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7U0FDSjtRQVZZLFVBQUssUUFVakIsQ0FBQTtJQUNMLENBQUMsRUFaaUIsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBWXJCO0FBQUQsQ0FBQyxFQVpTLE9BQU8sS0FBUCxPQUFPLFFBWWhCO0FDWkQsdUNBQXVDO0FBRXZDLElBQVUsT0FBTyxDQXlGaEI7QUF6RkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxJQUFJLENBeUZyQjtJQXpGaUIsV0FBQSxJQUFJO1FBQ2xCLFlBQVksQ0FBQztRQUNiO1lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFhO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ1osR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JB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QU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRTVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3JELEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDckQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDckQsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUVyRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFB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Q0QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUM5QixJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBQSxXQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMzQixJQUFJLEdBQUcsR0FBVyxLQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDN0csSUFBSSxHQUFHLEdBQVcsS0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzdHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFFbkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0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RyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksUUFBUSxHQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDOzRCQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFBQyxDQUFDO3dCQUM1RCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDOzRCQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFBQyxDQUFDO3dCQUU1RCxJQUFJLEtBQUssR0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ3BDLElBQUksTUFBTSxHQUFXLEtBQUssR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUNqRCxJQUFJLElBQUksR0FBVyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3ZDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUN4RCxzRUFBc0U7d0JBQ3RFLHVDQUF1Qzt3QkFDdkMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUEsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JELENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxNQUFNLENBQUMsUUFBUSxFQUFF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WUFBWSxDQUFDO1FBRWIsSUFBTyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDbEQsa0JBQTBCLFNBQVEsWUFBWTtTQUU3QztRQUZZLGlCQUFZLGVBRXhCLENBQUE7SUFDTCxDQUFDLEVBUmlCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQVFyQjtBQUFELENBQUMsRUFSUyxPQUFPLEtBQVAsT0FBTyxRQVFoQiIsImZpbGUiOiJ2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICBleHBvcnQgY2xhc3MgRGVidWd7XG4gICAgICAgIHN0YXRpYyBhc3NlcnQoZmxnOmJvb2xlYW49ZmFsc2UsbG9nPzpzdHJpbmcpe1xuICAgICAgICAgICAgaWYoIWZsZyl7XG4gICAgICAgICAgICAgICAgbGV0IGVycjpFcnJvciA9IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgICAgIHRocm93IGxvZytcIlxcblwiK2Vyci5zdGFjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgbG9nKGxvZzphbnkpe1xuICAgICAgICAgICAgY29uc29sZS5sb2cobG9nKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGNsYXNzIFV0aWxpdHkge1xuICAgICAgICBzdGF0aWMgbWF4KGFycjogbnVtYmVyW10pIHtcbiAgICAgICAgICAgIHZhciB2cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgdiBvZiBhcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHYpICYmIHYgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB2cy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heC5hcHBseSh0aGlzLCB2cyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIG1pbihhcnI6IG51bWJlcltdKSB7XG4gICAgICAgICAgICB2YXIgdnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTih2KSAmJiB2ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdnMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5taW4uYXBwbHkodGhpcywgdnMpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBpc2tleShrZXk6IGFueSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSAhPT0gdW5kZWZpbmVkICYmIGtleSAhPT0gbnVsbCAmJiB0eXBlb2YgKGtleSkgPT0gJ3N0cmluZycgJiYga2V5WzBdICE9ICdfJztcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBjaGVja0FycmF5VHlwZShhcnI6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoYXJyICE9IG51bGwpO1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KGFyci5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZW9mIGFyclswXTtcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgIT0gdHlwZW9mIHYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBnZXRUeXBlKHY6IGFueSk6IERhdGFUeXBlIHtcbiAgICAgICAgICAgIGxldCBkYXRhdHlwZTogRGF0YVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIERlYnVnLmFzc2VydCh2ICE9IG51bGwpO1xuICAgICAgICAgICAgICAgIERlYnVnLmFzc2VydCh2Lmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgIGRhdGF0eXBlID0gRGF0YVR5cGUuQXJyYXk7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWxpdHkuY2hlY2tBcnJheVR5cGUodikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxpdHkuZ2V0VHlwZSh2WzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgZGF0YXR5cGUgPSBEYXRhVHlwZS5OdW1iZXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0YXR5cGUgPSBEYXRhVHlwZS5TdHJpbmc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ID09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIGRhdGF0eXBlID0gRGF0YVR5cGUuQm9vbGVhbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgRGVidWcuYXNzZXJ0KHRydWUsIFwiVmFsdWUgY2FuJ3QgYmUgT2JqZWN0IGV4Y2VwdCBBcnJheVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhdHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbWVyZ2VTY2FsZShzY2FsZUE6IFNjYWxlLCBzY2FsZUI6IFNjYWxlLGZvcmNlOmJvb2xlYW49ZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCBzY2FsZTogU2NhbGUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHNjYWxlQS5pZCA9PSBzY2FsZUIuaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NhbGVBIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlICYmIHNjYWxlQiBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZG9tYWludW5pb25zOnN0cmluZ1tdID0gXy51bmlvbihzY2FsZUEuZG9tYWlucywgc2NhbGVCLmRvbWFpbnMpO1xuICAgICAgICAgICAgICAgICAgICBpZihmb3JjZSB8fChzY2FsZUEuZG9tYWlucy5sZW5ndGggL2RvbWFpbnVuaW9ucy5sZW5ndGggPjAuNSAmJiBzY2FsZUIuZG9tYWlucy5sZW5ndGgvZG9tYWludW5pb25zLmxlbmd0aCA+IDAuNSkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gc2NhbGVBLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW4oZG9tYWludW5pb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKCBzY2FsZUEgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSAmJiBzY2FsZUIgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSkgKXtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbWluOm51bWJlciA9IE1hdGgubWluKHNjYWxlQS5taW4sIHNjYWxlQi5taW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4Om51bWJlciA9IE1hdGgubWF4KHNjYWxlQS5tYXgsIHNjYWxlQi5tYXgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmF0ZTEgOm51bWJlciA9TWF0aC5hYnMobWF4LW1pbikvKE1hdGguYWJzKHNjYWxlQS5tYXgtc2NhbGVBLm1pbikpIDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhdGUyIDpudW1iZXIgPU1hdGguYWJzKG1heC1taW4pLyhNYXRoLmFicyhzY2FsZUIubWF4LXNjYWxlQi5taW4pKSA7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxpbmVhciByYW5nZSByYXRlMSA9IFwiICsgcmF0ZTEgICtcIiAsIHJhdGUyID0gXCIgKyByYXRlMik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGZvcmNlIHx8KHJhdGUxPDUgJiYgcmF0ZTIgPCA1KSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHNjYWxlQS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWluKFttaW4sIG1heF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY2FsZUEgaW5zdGFuY2VvZiBMb2dTY2FsZSAmJiBzY2FsZUIgaW5zdGFuY2VvZiBMb2dTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihzY2FsZUEubG9nQmFzZSA9PSBzY2FsZUIubG9nQmFzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHNjYWxlQS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWluKFtNYXRoLm1pbihzY2FsZUEubWluLCBzY2FsZUIubWluKSwgTWF0aC5tYXgoc2NhbGVBLm1heCwgc2NhbGVCLm1heCldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIGV4cG9ydCBjbGFzcyBDb2xvclV0aWxzIHtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2NvbG9yaW5kZXg6bnVtYmVyID0gLTE7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sb3IgOnN0cmluZ1tdPVxuICAgICAgICBbJ3JnYigyNTEsIDExOCwgMTIzKScsJ3JnYigxMjksIDIyNywgMjM4KScsJyM4OGJkZTYnLCAnI2ZiYjI1OCcsICcjOTBjZDk3JywgJyNmNmFhYzknLCAnI2JmYTU1NCcsICcjYmM5OWM3JywgJyNlZGRkNDYnLCAnI2YwN2U2ZScsICcjOGM4YzhjJ107XG4gICAgICAgIC8vIFtcIiNGRkZGRjBcIiwgXCIjRkZGRkUwXCIsIFwiI0ZGRkYwMCBcIiwgXCIjRkZGQUZBXCIsIFwiI0ZGRkFGMFwiLCBcIiNGRkZBQ0RcIiwgXCIjRkZGOERDIFwiLCBcIiNGRkY2OEZcIiwgXCIjRkZGNUVFXCIsIFwiI0ZGRjBGNVwiLCBcIiNGRkVGREIgXCIsIFwiI0ZGRUZENVwiLCBcIiNGRkVDOEJcIiwgXCIjRkZFQkNEXCIsIFwiI0ZGRTdCQSBcIiwgXCIjRkZFNEUxXCIsIFwiI0ZGRTRDNFwiLCBcIiNGRkU0QjVcIiwgXCIjRkZFMUZGIFwiLCBcIiNGRkRFQURcIiwgXCIjRkZEQUI5XCIsIFwiI0ZGRDcwMFwiLCBcIiNGRkQzOUIgXCIsIFwiI0ZGQzFDMVwiLCBcIiNGRkMxMjVcIiwgXCIjRkZDMENCXCIsIFwiI0ZGQkJGRiBcIiwgXCIjRkZCOTBGXCIsIFwiI0ZGQjZDMVwiLCBcIiNGRkI1QzVcIiwgXCIjRkZBRUI5IFwiLCBcIiNGRkE1NEZcIiwgXCIjRkZBNTAwXCIsIFwiI0ZGQTA3QVwiLCBcIiNGRjhDNjkgXCIsIFwiI0ZGOEMwMFwiLCBcIiNGRjgzRkFcIiwgXCIjRkY4MkFCXCIsIFwiI0ZGODI0NyBcIiwgXCIjRkY3RjUwXCIsIFwiI0ZGN0YyNFwiLCBcIiNGRjdGMDBcIiwgXCIjRkY3MjU2IFwiLCBcIiNGRjZFQjRcIiwgXCIjRkY2QTZBXCIsIFwiI0ZGNjlCNFwiLCBcIiNGRjYzNDcgXCIsIFwiI0ZGNDUwMFwiLCBcIiNGRjQwNDBcIiwgXCIjRkYzRTk2XCIsIFwiI0ZGMzRCMyBcIiwgXCIjRkYzMDMwXCIsIFwiI0ZGMTQ5M1wiLCBcIiNGRjAwRkZcIiwgXCIjRkYwMDAwIFwiLCBcIiNGREY1RTZcIiwgXCIjRkNGQ0ZDXCIsIFwiI0ZBRkFGQVwiLCBcIiNGQUZBRDIgXCIsIFwiI0ZBRjBFNlwiLCBcIiNGQUVCRDdcIiwgXCIjRkE4MDcyXCIsIFwiI0Y4RjhGRiBcIiwgXCIjRjdGN0Y3XCIsIFwiI0Y1RkZGQVwiLCBcIiNGNUY1RjVcIiwgXCIjRjVGNURDIFwiLCBcIiNGNURFQjNcIiwgXCIjRjRGNEY0XCIsIFwiI0Y0QTQ2MFwiLCBcIiNGMkYyRjIgXCIsIFwiI0YwRkZGRlwiLCBcIiNGMEZGRjBcIiwgXCIjRjBGOEZGXCIsIFwiI0YwRjBGMCBcIiwgXCIjRjBFNjhDXCIsIFwiI0YwODA4MFwiLCBcIiNFRUVFRTBcIiwgXCIjRUVFRUQxIFwiLCBcIiNFRUVFMDBcIiwgXCIjRUVFOUU5XCIsIFwiI0VFRTlCRlwiLCBcIiNFRUU4Q0QgXCIsIFwiI0VFRThBQVwiLCBcIiNFRUU2ODVcIiwgXCIjRUVFNURFXCIsIFwiI0VFRTBFNSBcIiwgXCIjRUVERkNDXCIsIFwiI0VFREM4MlwiLCBcIiNFRUQ4QUVcIiwgXCIjRUVENUQyIFwiLCBcIiNFRUQ1QjdcIiwgXCIjRUVEMkVFXCIsIFwiI0VFQ0ZBMVwiLCBcIiNFRUNCQUQgXCIsIFwiI0VFQzkwMFwiLCBcIiNFRUM1OTFcIiwgXCIjRUVCNEI0XCIsIFwiI0VFQjQyMiBcIiwgXCIjRUVBRUVFXCIsIFwiI0VFQUQwRVwiLCBcIiNFRUE5QjhcIiwgXCIjRUVBMkFEIFwiLCBcIiNFRTlBNDlcIiwgXCIjRUU5QTAwXCIsIFwiI0VFOTU3MlwiLCBcIiNFRTgyRUUgXCIsIFwiI0VFODI2MlwiLCBcIiNFRTdBRTlcIiwgXCIjRUU3OTlGXCIsIFwiI0VFNzk0MiBcIiwgXCIjRUU3NjIxXCIsIFwiI0VFNzYwMFwiLCBcIiNFRTZBQTdcIiwgXCIjRUU2QTUwIFwiLCBcIiNFRTYzNjNcIiwgXCIjRUU1QzQyXCIsIFwiI0VFNDAwMFwiLCBcIiNFRTNCM0IgXCIsIFwiI0VFM0E4Q1wiLCBcIiNFRTMwQTdcIiwgXCIjRUUyQzJDXCIsIFwiI0VFMTI4OSBcIiwgXCIjRUUwMEVFXCIsIFwiI0VFMDAwMFwiLCBcIiNFREVERURcIiwgXCIjRUJFQkVCIFwiLCBcIiNFQUVBRUFcIiwgXCIjRTk5NjdBXCIsIFwiI0U4RThFOFwiLCBcIiNFNkU2RkEgXCIsIFwiI0U1RTVFNVwiLCBcIiNFM0UzRTNcIiwgXCIjRTBGRkZGXCIsIFwiI0UwRUVFRSBcIiwgXCIjRTBFRUUwXCIsIFwiI0UwRTBFMFwiLCBcIiNFMDY2RkZcIiwgXCIjREVERURFIFwiLCBcIiNERUI4ODdcIiwgXCIjRERBMEREXCIsIFwiI0RDRENEQ1wiLCBcIiNEQzE0M0MgXCIsIFwiI0RCREJEQlwiLCBcIiNEQjcwOTNcIiwgXCIjREFBNTIwXCIsIFwiI0RBNzBENiBcIiwgXCIjRDlEOUQ5XCIsIFwiI0Q4QkZEOFwiLCBcIiNENkQ2RDZcIiwgXCIjRDRENEQ0IFwiLCBcIiNEM0QzRDNcIiwgXCIjRDJCNDhDXCIsIFwiI0QyNjkxRVwiLCBcIiNEMUVFRUUgXCIsIFwiI0QxRDFEMVwiLCBcIiNEMTVGRUVcIiwgXCIjRDAyMDkwXCIsIFwiI0NGQ0ZDRiBcIiwgXCIjQ0RDREMxXCIsIFwiI0NEQ0RCNFwiLCBcIiNDRENEMDBcIiwgXCIjQ0RDOUM5IFwiLCBcIiNDREM5QTVcIiwgXCIjQ0RDOEIxXCIsIFwiI0NEQzY3M1wiLCBcIiNDREM1QkYgXCIsIFwiI0NEQzFDNVwiLCBcIiNDREMwQjBcIiwgXCIjQ0RCRTcwXCIsIFwiI0NEQkE5NiBcIiwgXCIjQ0RCN0I1XCIsIFwiI0NEQjc5RVwiLCBcIiNDREI1Q0RcIiwgXCIjQ0RCMzhCIFwiLCBcIiNDREFGOTVcIiwgXCIjQ0RBRDAwXCIsIFwiI0NEQUE3RFwiLCBcIiNDRDlCOUIgXCIsIFwiI0NEOUIxRFwiLCBcIiNDRDk2Q0RcIiwgXCIjQ0Q5NTBDXCIsIFwiI0NEOTE5RSBcIiwgXCIjQ0Q4Qzk1XCIsIFwiI0NEODUzRlwiLCBcIiNDRDg1MDBcIiwgXCIjQ0Q4MTYyIFwiLCBcIiNDRDcwNTRcIiwgXCIjQ0Q2OUM5XCIsIFwiI0NENjg4OVwiLCBcIiNDRDY4MzkgXCIsIFwiI0NENjYxRFwiLCBcIiNDRDY2MDBcIiwgXCIjQ0Q2MDkwXCIsIFwiI0NENUM1QyBcIiwgXCIjQ0Q1QjQ1XCIsIFwiI0NENTU1NVwiLCBcIiNDRDRGMzlcIiwgXCIjQ0QzNzAwIFwiLCBcIiNDRDMzMzNcIiwgXCIjQ0QzMjc4XCIsIFwiI0NEMjk5MFwiLCBcIiNDRDI2MjYgXCIsIFwiI0NEMTA3NlwiLCBcIiNDRDAwQ0RcIiwgXCIjQ0QwMDAwXCIsIFwiI0NDQ0NDQyBcIiwgXCIjQ0FGRjcwXCIsIFwiI0NBRTFGRlwiLCBcIiNDOUM5QzlcIiwgXCIjQzdDN0M3IFwiLCBcIiNDNzE1ODVcIiwgXCIjQzZFMkZGXCIsIFwiI0M2NzE3MVwiLCBcIiNDNUMxQUEgXCIsIFwiI0M0QzRDNFwiLCBcIiNDMkMyQzJcIiwgXCIjQzFGRkMxXCIsIFwiI0MxQ0RDRCBcIiwgXCIjQzFDREMxXCIsIFwiI0MxQzFDMVwiLCBcIiNDMEZGM0VcIiwgXCIjQkZFRkZGIFwiLCBcIiNCRkJGQkZcIiwgXCIjQkYzRUZGXCIsIFwiI0JFQkVCRVwiLCBcIiNCREJEQkQgXCIsIFwiI0JEQjc2QlwiLCBcIiNCQ0VFNjhcIiwgXCIjQkNEMkVFXCIsIFwiI0JDOEY4RiBcIiwgXCIjQkJGRkZGXCIsIFwiI0JBQkFCQVwiLCBcIiNCQTU1RDNcIiwgXCIjQjlEM0VFIFwiLCBcIiNCOEI4QjhcIiwgXCIjQjg4NjBCXCIsIFwiI0I3QjdCN1wiLCBcIiNCNUI1QjUgXCIsIFwiI0I0RUVCNFwiLCBcIiNCNENEQ0RcIiwgXCIjQjQ1MkNEXCIsIFwiI0IzRUUzQSBcIiwgXCIjQjNCM0IzXCIsIFwiI0IyREZFRVwiLCBcIiNCMjNBRUVcIiwgXCIjQjIyMjIyIFwiLCBcIiNCMEUyRkZcIiwgXCIjQjBFMEU2XCIsIFwiI0IwQzRERVwiLCBcIiNCMEIwQjAgXCIsIFwiI0IwMzA2MFwiLCBcIiNBRUVFRUVcIiwgXCIjQURGRjJGXCIsIFwiI0FERDhFNiBcIiwgXCIjQURBREFEXCIsIFwiI0FCQUJBQlwiLCBcIiNBQjgyRkZcIiwgXCIjQUFBQUFBIFwiLCBcIiNBOUE5QTlcIiwgXCIjQThBOEE4XCIsIFwiI0E2QTZBNlwiLCBcIiNBNTJBMkEgXCIsIFwiI0E0RDNFRVwiLCBcIiNBM0EzQTNcIiwgXCIjQTJDRDVBXCIsIFwiI0EyQjVDRCBcIiwgXCIjQTFBMUExXCIsIFwiI0EwNTIyRFwiLCBcIiNBMDIwRjBcIiwgXCIjOUZCNkNEIFwiLCBcIiM5Rjc5RUVcIiwgXCIjOUU5RTlFXCIsIFwiIzlDOUM5Q1wiLCBcIiM5QkNEOUIgXCIsIFwiIzlCMzBGRlwiLCBcIiM5QUZGOUFcIiwgXCIjOUFDRDMyXCIsIFwiIzlBQzBDRCBcIiwgXCIjOUEzMkNEXCIsIFwiIzk5OTk5OVwiLCBcIiM5OTMyQ0NcIiwgXCIjOThGQjk4IFwiLCBcIiM5OEY1RkZcIiwgXCIjOTdGRkZGXCIsIFwiIzk2Q0RDRFwiLCBcIiM5Njk2OTYgXCIsIFwiIzk0OTQ5NFwiLCBcIiM5NDAwRDNcIiwgXCIjOTM3MERCXCIsIFwiIzkxOTE5MSBcIiwgXCIjOTEyQ0VFXCIsIFwiIzkwRUU5MFwiLCBcIiM4RkJDOEZcIiwgXCIjOEY4RjhGIFwiLCBcIiM4RUU1RUVcIiwgXCIjOEU4RThFXCIsIFwiIzhFOEUzOFwiLCBcIiM4RTM4OEUgXCIsIFwiIzhERUVFRVwiLCBcIiM4REI2Q0RcIiwgXCIjOEM4QzhDXCIsIFwiIzhCOEI4MyBcIiwgXCIjOEI4QjdBXCIsIFwiIzhCOEIwMFwiLCBcIiM4Qjg5ODlcIiwgXCIjOEI4OTcwIFwiLCBcIiM4Qjg4NzhcIiwgXCIjOEI4NjgyXCIsIFwiIzhCODY0RVwiLCBcIiM4QjgzODYgXCIsIFwiIzhCODM3OFwiLCBcIiM4QjgxNENcIiwgXCIjOEI3RTY2XCIsIFwiIzhCN0Q3QiBcIiwgXCIjOEI3RDZCXCIsIFwiIzhCN0I4QlwiLCBcIiM4Qjc5NUVcIiwgXCIjOEI3NzY1IFwiLCBcIiM4Qjc1MDBcIiwgXCIjOEI3MzU1XCIsIFwiIzhCNjk2OVwiLCBcIiM4QjY5MTQgXCIsIFwiIzhCNjY4QlwiLCBcIiM4QjY1MDhcIiwgXCIjOEI2MzZDXCIsIFwiIzhCNUY2NSBcIiwgXCIjOEI1QTJCXCIsIFwiIzhCNUEwMFwiLCBcIiM4QjU3NDJcIiwgXCIjOEI0QzM5IFwiLCBcIiM4QjQ3ODlcIiwgXCIjOEI0NzVEXCIsIFwiIzhCNDcyNlwiLCBcIiM4QjQ1MTMgXCIsIFwiIzhCNDUwMFwiLCBcIiM4QjNFMkZcIiwgXCIjOEIzQTYyXCIsIFwiIzhCM0EzQSBcIiwgXCIjOEIzNjI2XCIsIFwiIzhCMjUwMFwiLCBcIiM4QjIzMjNcIiwgXCIjOEIyMjUyIFwiLCBcIiM4QjFDNjJcIiwgXCIjOEIxQTFBXCIsIFwiIzhCMEE1MFwiLCBcIiM4QjAwOEIgXCIsIFwiIzhCMDAwMFwiLCBcIiM4QThBOEFcIiwgXCIjOEEyQkUyXCIsIFwiIzg5NjhDRCBcIiwgXCIjODdDRUZGXCIsIFwiIzg3Q0VGQVwiLCBcIiM4N0NFRUJcIiwgXCIjODc4Nzg3IFwiLCBcIiM4NTg1ODVcIiwgXCIjODQ4NDg0XCIsIFwiIzg0NzBGRlwiLCBcIiM4MzhCOEIgXCIsIFwiIzgzOEI4M1wiLCBcIiM4MzZGRkZcIiwgXCIjODI4MjgyXCIsIFwiIzdGRkZENCBcIiwgXCIjN0ZGRjAwXCIsIFwiIzdGN0Y3RlwiLCBcIiM3RUMwRUVcIiwgXCIjN0Q5RUMwIFwiLCBcIiM3RDdEN0RcIiwgXCIjN0QyNkNEXCIsIFwiIzdDRkMwMFwiLCBcIiM3Q0NEN0MgXCIsIFwiIzdCNjhFRVwiLCBcIiM3QUM1Q0RcIiwgXCIjN0E4QjhCXCIsIFwiIzdBN0E3QSBcIiwgXCIjN0E2N0VFXCIsIFwiIzdBMzc4QlwiLCBcIiM3OUNEQ0RcIiwgXCIjNzg3ODc4IFwiLCBcIiM3Nzg4OTlcIiwgXCIjNzZFRUM2XCIsIFwiIzc2RUUwMFwiLCBcIiM3NTc1NzUgXCIsIFwiIzczNzM3M1wiLCBcIiM3MUM2NzFcIiwgXCIjNzE3MUM2XCIsIFwiIzcwODA5MCBcIiwgXCIjNzA3MDcwXCIsIFwiIzZFOEIzRFwiLCBcIiM2RTdCOEJcIiwgXCIjNkU2RTZFIFwiLCBcIiM2Q0E2Q0RcIiwgXCIjNkM3QjhCXCIsIFwiIzZCOEUyM1wiLCBcIiM2QjZCNkIgXCIsIFwiIzZBNUFDRFwiLCBcIiM2OThCNjlcIiwgXCIjNjk4QjIyXCIsIFwiIzY5Njk2OSBcIiwgXCIjNjk1OUNEXCIsIFwiIzY4ODM4QlwiLCBcIiM2ODIyOEJcIiwgXCIjNjZDREFBIFwiLCBcIiM2NkNEMDBcIiwgXCIjNjY4QjhCXCIsIFwiIzY2NjY2NlwiLCBcIiM2NDk1RUQgXCIsIFwiIzYzQjhGRlwiLCBcIiM2MzYzNjNcIiwgXCIjNjE2MTYxXCIsIFwiIzYwN0I4QiBcIiwgXCIjNUY5RUEwXCIsIFwiIzVFNUU1RVwiLCBcIiM1RDQ3OEJcIiwgXCIjNUNBQ0VFIFwiLCBcIiM1QzVDNUNcIiwgXCIjNUI1QjVCXCIsIFwiIzU5NTk1OVwiLCBcIiM1NzU3NTcgXCIsIFwiIzU1NkIyRlwiLCBcIiM1NTU1NTVcIiwgXCIjNTUxQThCXCIsIFwiIzU0RkY5RiBcIiwgXCIjNTQ4QjU0XCIsIFwiIzU0NTQ1NFwiLCBcIiM1Mzg2OEJcIiwgXCIjNTI4QjhCIFwiLCBcIiM1MjUyNTJcIiwgXCIjNTE1MTUxXCIsIFwiIzRGOTRDRFwiLCBcIiM0RjRGNEYgXCIsIFwiIzRFRUU5NFwiLCBcIiM0RDRENERcIiwgXCIjNEIwMDgyXCIsIFwiIzRBNzA4QiBcIiwgXCIjNEE0QTRBXCIsIFwiIzQ4RDFDQ1wiLCBcIiM0ODc2RkZcIiwgXCIjNDgzRDhCIFwiLCBcIiM0NzQ3NDdcIiwgXCIjNDczQzhCXCIsIFwiIzQ2ODJCNFwiLCBcIiM0NThCNzQgXCIsIFwiIzQ1OEIwMFwiLCBcIiM0NTQ1NDVcIiwgXCIjNDNDRDgwXCIsIFwiIzQzNkVFRSBcIiwgXCIjNDI0MjQyXCIsIFwiIzQxNjlFMVwiLCBcIiM0MEUwRDBcIiwgXCIjNDA0MDQwIFwiLCBcIiMzRDNEM0RcIiwgXCIjM0NCMzcxXCIsIFwiIzNCM0IzQlwiLCBcIiMzQTVGQ0QgXCIsIFwiIzM4OEU4RVwiLCBcIiMzODM4MzhcIiwgXCIjMzY2NDhCXCIsIFwiIzM2MzYzNiBcIiwgXCIjMzMzMzMzXCIsIFwiIzMyQ0QzMlwiLCBcIiMzMDMwMzBcIiwgXCIjMkY0RjRGIFwiLCBcIiMyRThCNTdcIiwgXCIjMkUyRTJFXCIsIFwiIzJCMkIyQlwiLCBcIiMyOTI5MjkgXCIsIFwiIzI4MjgyOFwiLCBcIiMyNzQwOEJcIiwgXCIjMjYyNjI2XCIsIFwiIzI0MjQyNCBcIiwgXCIjMjI4QjIyXCIsIFwiIzIxODg2OFwiLCBcIiMyMTIxMjFcIiwgXCIjMjBCMkFBIFwiLCBcIiMxRjFGMUZcIiwgXCIjMUU5MEZGXCIsIFwiIzFFMUUxRVwiLCBcIiMxQzg2RUUgXCIsIFwiIzFDMUMxQ1wiLCBcIiMxQTFBMUFcIiwgXCIjMTkxOTcwXCIsIFwiIzE4NzRDRCBcIiwgXCIjMTcxNzE3XCIsIFwiIzE0MTQxNFwiLCBcIiMxMjEyMTJcIiwgXCIjMTA0RThCIFwiLCBcIiMwRjBGMEZcIiwgXCIjMEQwRDBEXCIsIFwiIzBBMEEwQVwiLCBcIiMwODA4MDggXCIsIFwiIzA1MDUwNVwiLCBcIiMwMzAzMDNcIiwgXCIjMDBGRkZGXCIsIFwiIzAwRkY3RiBcIiwgXCIjMDBGRjAwXCIsIFwiIzAwRkE5QVwiLCBcIiMwMEY1RkZcIiwgXCIjMDBFRUVFIFwiLCBcIiMwMEVFNzZcIiwgXCIjMDBFRTAwXCIsIFwiIzAwRTVFRVwiLCBcIiMwMENFRDEgXCIsIFwiIzAwQ0RDRFwiLCBcIiMwMENENjZcIiwgXCIjMDBDRDAwXCIsIFwiIzAwQzVDRCBcIiwgXCIjMDBCRkZGXCIsIFwiIzAwQjJFRVwiLCBcIiMwMDlBQ0RcIiwgXCIjMDA4QjhCIFwiLCBcIiMwMDhCNDVcIiwgXCIjMDA4QjAwXCIsIFwiIzAwODY4QlwiLCBcIiMwMDY4OEIgXCIsIFwiIzAwNjQwMFwiLCBcIiMwMDAwRkZcIiwgXCIjMDAwMEVFXCIsIFwiIzAwMDBDRCBcIiwgXCIjMDAwMEFBXCIsIFwiIzAwMDA4QlwiLCBcIiMwMDAwODBcIl07XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgbmV4dENvbG9yKCk6c3RyaW5ne1xuICAgICAgICAgICAgcmV0dXJuIENvbG9yVXRpbHMuQ29sb3JbQ29sb3JVdGlscy5fY29sb3JpbmRleCsrJUNvbG9yVXRpbHMuQ29sb3IubGVuZ3RoIF07XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHN0YXRpYyBpbmRleENvbG9yKGluZGV4Om51bWJlcil7XG4gICAgICAgICAgICByZXR1cm4gQ29sb3JVdGlscy5Db2xvcltpbmRleCVDb2xvclV0aWxzLkNvbG9yLmxlbmd0aCBdO1xuICAgICAgICB9XG5cbiAgICAgICBzdGF0aWMgZ3JhZGllbnRDb2xvcihzdGFydENvbG9yOiBzdHJpbmcsIGVuZENvbG9yOiBzdHJpbmcsIHN0ZXA6bnVtYmVyKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnRSR0IgPSBDb2xvclV0aWxzLmNvbG9yUmdiKHN0YXJ0Q29sb3IpOy8v6L2s5o2i5Li6cmdi5pWw57uE5qih5byPXG4gICAgICAgICAgICBsZXQgc3RhcnRSID0gc3RhcnRSR0JbMF07XG4gICAgICAgICAgICBsZXQgc3RhcnRHID0gc3RhcnRSR0JbMV07XG4gICAgICAgICAgICBsZXQgc3RhcnRCID0gc3RhcnRSR0JbMl07XG5cbiAgICAgICAgICAgIGxldCBlbmRSR0IgPSBDb2xvclV0aWxzLmNvbG9yUmdiKGVuZENvbG9yKTtcbiAgICAgICAgICAgIGxldCBlbmRSID0gZW5kUkdCWzBdO1xuICAgICAgICAgICAgbGV0IGVuZEcgPSBlbmRSR0JbMV07XG4gICAgICAgICAgICBsZXQgZW5kQiA9IGVuZFJHQlsyXTtcblxuICAgICAgICAgICAgbGV0IHNSID0gKGVuZFIgLSBzdGFydFIpIC8gc3RlcDsvL+aAu+W3ruWAvFxuICAgICAgICAgICAgbGV0IHNHID0gKGVuZEcgLSBzdGFydEcpIC8gc3RlcDtcbiAgICAgICAgICAgIGxldCBzQiA9IChlbmRCIC0gc3RhcnRCKSAvIHN0ZXA7XG5cbiAgICAgICAgICAgIHZhciBjb2xvckFyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGVwOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvL+iuoeeul+avj+S4gOatpeeahGhleOWAvCBcbiAgICAgICAgICAgICAgICB2YXIgaGV4ID0gQ29sb3JVdGlscy5jb2xvckhleCgncmdiKCcgKyBwYXJzZUludCgoc1IgKiBpICsgc3RhcnRSKSkgKyAnLCcgKyBwYXJzZUludCgoc0cgKiBpICsgc3RhcnRHKSkgKyAnLCcgKyBwYXJzZUludCgoc0IgKiBpICsgc3RhcnRCKSkgKyAnKScpO1xuICAgICAgICAgICAgICAgIGNvbG9yQXJyLnB1c2goaGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb2xvckFycjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBnZXRDb2xvcihzdGFydENvbG9yOnN0cmluZywgZW5kQ29sb3I6c3RyaW5nLHZhbHVlOm51bWJlcixzdGFydDpudW1iZXIsZW5kOm51bWJlcik6c3RyaW5ne1xuICAgICAgICAgICAgbGV0IHN0YXJ0UkdCID0gQ29sb3JVdGlscy5jb2xvclJnYihzdGFydENvbG9yKTsvL+i9rOaNouS4unJnYuaVsOe7hOaooeW8j1xuICAgICAgICAgICAgbGV0IHN0YXJ0UiA9IHN0YXJ0UkdCWzBdO1xuICAgICAgICAgICAgbGV0IHN0YXJ0RyA9IHN0YXJ0UkdCWzFdO1xuICAgICAgICAgICAgbGV0IHN0YXJ0QiA9IHN0YXJ0UkdCWzJdO1xuXG4gICAgICAgICAgICBsZXQgZW5kUkdCID0gQ29sb3JVdGlscy5jb2xvclJnYihlbmRDb2xvcik7XG4gICAgICAgICAgICBsZXQgZW5kUiA9IGVuZFJHQlswXTtcbiAgICAgICAgICAgIGxldCBlbmRHID0gZW5kUkdCWzFdO1xuICAgICAgICAgICAgbGV0IGVuZEIgPSBlbmRSR0JbMl07XG5cbiAgICAgICAgICAgIGxldCBzUiA9IChlbmRSIC0gc3RhcnRSKSAvIChlbmQtc3RhcnQpOy8v5oC75beu5YC8XG4gICAgICAgICAgICBsZXQgc0cgPSAoZW5kRyAtIHN0YXJ0RykgLyAoZW5kLXN0YXJ0KTtcbiAgICAgICAgICAgIGxldCBzQiA9IChlbmRCIC0gc3RhcnRCKSAvIChlbmQtc3RhcnQpO1xuICAgICAgICAgICAgdmFyIGhleCA9IENvbG9yVXRpbHMuY29sb3JIZXgoJ3JnYignICsgcGFyc2VJbnQoKHNSICogdmFsdWUgKyBzdGFydFIpKSArICcsJyArIHBhcnNlSW50KChzRyAqIHZhbHVlICsgc3RhcnRHKSkgKyAnLCcgKyBwYXJzZUludCgoc0IgKiB2YWx1ZSArIHN0YXJ0QikpICsgJyknKTtcbiAgICAgICAgICAgIHJldHVybiBoZXg7XG4gICAgICAgIH1cblxuXG4gICAgICBzdGF0aWMgIGNvbG9yUmdiKHNDb2xvcjogc3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgcmVnID0gL14jKFswLTlhLWZBLWZdezN9fFswLTlhLWZBLWZdezZ9KSQvO1xuICAgICAgICAgICAgdmFyIHNDb2xvciA9IHNDb2xvci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHNDb2xvciAmJiByZWcudGVzdChzQ29sb3IpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNDb2xvci5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNDb2xvck5ldyA9IFwiI1wiO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc0NvbG9yTmV3ICs9IHNDb2xvci5zbGljZShpLCBpICsgMSkuY29uY2F0KHNDb2xvci5zbGljZShpLCBpICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNDb2xvciA9IHNDb2xvck5ldztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/lpITnkIblha3kvY3nmoTpopzoibLlgLxcbiAgICAgICAgICAgICAgICB2YXIgc0NvbG9yQ2hhbmdlID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCA3OyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgc0NvbG9yQ2hhbmdlLnB1c2gocGFyc2VJbnQoXCIweFwiICsgc0NvbG9yLnNsaWNlKGksIGkgKyAyKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc0NvbG9yQ2hhbmdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc0NvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5bCGcmdi6KGo56S65pa55byP6L2s5o2i5Li6aGV46KGo56S65pa55byPXG4gICAgICBzdGF0aWMgIGNvbG9ySGV4KHJnYjogYW55KSB7XG4gICAgICAgICAgICBsZXQgX3RoaXNzOiBhbnkgPSByZ2I7XG4gICAgICAgICAgICB2YXIgcmVnID0gL14jKFswLTlhLWZBLWZdezN9fFswLTlhLWZBLWZdezZ9KSQvO1xuICAgICAgICAgICAgaWYgKC9eKHJnYnxSR0IpLy50ZXN0KF90aGlzcykpIHtcbiAgICAgICAgICAgICAgICB2YXIgYUNvbG9yID0gX3RoaXNzLnJlcGxhY2UoLyg/Oih8KXxyZ2J8UkdCKSovZywgXCJcIikuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgIHZhciBzdHJIZXggPSBcIiNcIjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFDb2xvci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGV4OiBhbnkgPSBOdW1iZXIoYUNvbG9yW2ldKS50b1N0cmluZygxNik7XG4gICAgICAgICAgICAgICAgICAgIGhleCA9IGhleCA8IDEwID8gMCArICcnICsgaGV4IDogaGV4Oy8vIOS/neivgeavj+S4qnJnYueahOWAvOS4ujLkvY1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhleCA9PT0gXCIwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhleCArPSBoZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RySGV4ICs9IGhleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0ckhleC5sZW5ndGggIT09IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RySGV4ID0gX3RoaXNzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3RySGV4O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZWcudGVzdChfdGhpc3MpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFOdW0gPSBfdGhpc3MucmVwbGFjZSgvIy8sIFwiXCIpLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgIGlmIChhTnVtLmxlbmd0aCA9PT0gNikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXNzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYU51bS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bUhleCA9IFwiI1wiO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFOdW0ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bUhleCArPSAoYU51bVtpXSArIGFOdW1baV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudW1IZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGV4cG9ydCBjbGFzcyBSb3RhdGVSZWN0IHtcbiAgICAgICAgcHVibGljIGFuZ2xlOiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyBjZW50ZXJ4OiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyBjZW50ZXJ5OiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyB3aWR0aDogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIHB1YmxpYyBwb2ludHM6IFBvaW50W107XG4gICAgICAgIGNvbnN0cnVjdG9yKGNlbnRlcng6IG51bWJlciwgY2VudGVyeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgYW5nbGU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5jZW50ZXJ4ID0gY2VudGVyeDtcbiAgICAgICAgICAgIHRoaXMuY2VudGVyeSA9IGNlbnRlcnk7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMucG9pbnRzID0gW25ldyBQb2ludCgpLCBuZXcgUG9pbnQoKSwgbmV3IFBvaW50KCksIG5ldyBQb2ludCgpLCBuZXcgUG9pbnQoKSwgbmV3IFBvaW50KCksIG5ldyBQb2ludCgpLCBuZXcgUG9pbnQoKSwgbmV3IFBvaW50KCldO1xuICAgICAgICAgICAgbGV0IGx0ID0gdGhpcy5wb2ludHNbMF07XG4gICAgICAgICAgICBsZXQgcnQgPSB0aGlzLnBvaW50c1sxXTtcbiAgICAgICAgICAgIGxldCByYiA9IHRoaXMucG9pbnRzWzJdO1xuICAgICAgICAgICAgbGV0IGxiID0gdGhpcy5wb2ludHNbM107XG4gICAgICAgICAgICBsZXQgY3QgPSB0aGlzLnBvaW50c1s0XTtcbiAgICAgICAgICAgIGxldCBjYiA9IHRoaXMucG9pbnRzWzVdO1xuXG4gICAgICAgICAgICBsZXQgY2wgPSB0aGlzLnBvaW50c1s2XTtcbiAgICAgICAgICAgIGxldCBjciA9IHRoaXMucG9pbnRzWzddO1xuXG4gICAgICAgICAgICBjci54ID0gdGhpcy5jZW50ZXJ4ICsgTWF0aC5jb3ModGhpcy5hbmdsZSkgKiB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgICAgIGNyLnkgPSB0aGlzLmNlbnRlcnkgKyBNYXRoLnNpbih0aGlzLmFuZ2xlKSAqIHRoaXMud2lkdGggLyAyO1xuXG4gICAgICAgICAgICBjbC54ID0gMiAqIHRoaXMuY2VudGVyeCAtIGNyLng7XG4gICAgICAgICAgICBjbC55ID0gMiAqIHRoaXMuY2VudGVyeSAtIGNyLnk7XG5cbiAgICAgICAgICAgIHJ0LnggPSBjci54ICsgTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLmhlaWdodCAvIDI7XG4gICAgICAgICAgICBydC55ID0gY3IueSAtIE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgcmIueCA9IDIgKiBjci54IC0gcnQueDtcbiAgICAgICAgICAgIHJiLnkgPSAyICogY3IueSAtIHJ0Lnk7XG5cbiAgICAgICAgICAgIGxiLnggPSBjbC54IC0gTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLmhlaWdodCAvIDI7XG4gICAgICAgICAgICBsYi55ID0gY2wueSArIE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy5oZWlnaHQgLyAyO1xuXG4gICAgICAgICAgICBsdC54ID0gMiAqIGNsLnggLSBsYi54O1xuICAgICAgICAgICAgbHQueSA9IDIgKiBjbC55IC0gbGIueTtcblxuICAgICAgICAgICAgY2IueCA9IChsYi54ICsgcmIueCkvMjtcbiAgICAgICAgICAgIGNiLnkgPSAobGIueSArIHJiLnkpLzI7XG4gICAgICAgICAgICBjdC54ID0gKGx0LnggKyBydC54KS8yO1xuICAgICAgICAgICAgY3QueSA9KGx0LnkgKyBydC55KS8yO1xuXG4gICAgICAgICAgICBsZXQgY2VudGVyID0gdGhpcy5wb2ludHNbOF07XG4gICAgICAgICAgICBjZW50ZXIueCA9IHRoaXMuY2VudGVyeDtcbiAgICAgICAgICAgIGNlbnRlci55ID0gdGhpcy5jZW50ZXJ5O1xuXG5cbiAgICAgICAgfVxuICAgICAgICBnZXQgcmFpZGl1cygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmNlbnRlci54IC0gdGhpcy5sZWZ0VG9wLngsIDIpICsgTWF0aC5wb3codGhpcy5jZW50ZXIueSAtIHRoaXMubGVmdFRvcC55LCAyKSk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIG9mZnNldCh4OiBudW1iZXIsIHk6IG51bWJlciwgYW5nbGU6IG51bWJlcikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBvaW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBwdDogUG9pbnQgPSB0aGlzLnBvaW50c1tpXTtcbiAgICAgICAgICAgICAgICBwdC54ICs9IHggKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgICAgICAgICAgcHQueSArPSB5ICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdldCBsZWZ0VG9wKCk6IFBvaW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50c1swXTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgcmlnaHRUb3AoKTogUG9pbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzWzFdO1xuICAgICAgICB9XG4gICAgICAgIGdldCBsZWZ0Qm90dG9tKCk6IFBvaW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50c1szXTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgcmlnaHRCb3R0b20oKTogUG9pbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzWzJdO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGNlbnRlclRvcCgpOiBQb2ludCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHNbNF07XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGNlbnRlckJvdHRvbSgpOiBQb2ludCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHNbNV07XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGNlbnRlcigpOiBQb2ludCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHNbOF07XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHN0YXJ0UG9pbnQoKTogUG9pbnQge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLmNlbnRlcngsIHRoaXMuY2VudGVyeSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuICAgIGV4cG9ydCBjbGFzcyBSb3RhdGVMaW5lIHtcbiAgICAgICAgcHVibGljIHN0YXJ0UG9pbnQ6IFBvaW50O1xuICAgICAgICBwdWJsaWMgZW5kUG9pbnQ6IFBvaW50O1xuICAgICAgICBwcml2YXRlIF9hbmdsZTogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9jeDogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9jeTogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9sZWZ0d2lkdGg6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfcmlnaHR3aWR0aDogbnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcihjeDogbnVtYmVyLCBjeTogbnVtYmVyLCBsZWZ0d2lkdGg6IG51bWJlciwgcmlnaHR3aWR0aDogbnVtYmVyLCBhbmdsZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jeCA9IGN4O1xuICAgICAgICAgICAgdGhpcy5fY3kgPSBjeTtcbiAgICAgICAgICAgIHRoaXMuX2xlZnR3aWR0aCA9IGxlZnR3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0d2lkdGggPSByaWdodHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgIHRoaXMuZW5kUG9pbnQgPSBuZXcgUG9pbnQoKTtcbiAgICAgICAgICAgIHRoaXMuZW5kUG9pbnQueCA9IGN4ICsgTWF0aC5zaW4odGhpcy5fYW5nbGUpICogcmlnaHR3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuZW5kUG9pbnQueSA9IGN5IC0gTWF0aC5jb3ModGhpcy5fYW5nbGUpICogcmlnaHR3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRQb2ludCA9IG5ldyBQb2ludCgpO1xuICAgICAgICAgICAgdGhpcy5zdGFydFBvaW50LnggPSBjeCAtIE1hdGguc2luKHRoaXMuX2FuZ2xlKSAqIGxlZnR3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRQb2ludC55ID0gY3kgKyBNYXRoLmNvcyh0aGlzLl9hbmdsZSkgKiBsZWZ0d2lkdGg7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJcbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBlbnVtIEFuaW1hdGlvblR5cGV7XG4gICAgICAgIFdpZHRoLFxuICAgICAgICBIZWlnaHQsXG4gICAgICAgIFNpemUsXG4gICAgICAgIFJhZGl1cyxcbiAgICAgICAgU3dlZXAsXG4gICAgICAgIEFscGhhXG4gICAgfVxufSIsIlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGVudW0gQWdnIHtcbiAgICAgICAgU1VNLFxuICAgICAgICBBVkVSQUdFLFxuICAgICAgICBDT1VOVCxcbiAgICAgICAgTk9ORVxuICAgIH1cbiAgIFxufSIsIlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGVudW0gT3JkZXIge1xuICAgICAgICBEZXNjLFxuICAgICAgICBBc2MsXG4gICAgICAgIE5vbmVcbiAgICB9XG4gICBcbn0iLCJcblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBlbnVtIFNjYWxlVHlwZSB7XG4gICAgICAgIExpbmVhcixcbiAgICAgICAgTG9nLFxuICAgICAgICBPcmRpbmFsXG5cbiAgICB9XG4gICAgXG59IiwibmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICBleHBvcnQgZW51bSBEYXRhVHlwZXtcbiAgICAgICAgTnVtYmVyLFxuICAgICAgICBTdHJpbmcsXG4gICAgICAgIE9iamVjdCxcbiAgICAgICAgQXJyYXksXG4gICAgICAgIEJvb2xlYW4sXG4gICAgICAgIERhdGUgICBcbiAgICB9XG59IiwiXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgZW51bSBDaGFydFR5cGUge1xuICAgICAgICBCYXIsXG4gICAgICAgIExpbmUsXG4gICAgICAgIFNjYXR0ZXIsXG4gICAgICAgIEFyZWEsXG4gICAgICAgIC8vIFJhZGlhbEJhcixcbiAgICAgICAgLy8gUmFkaWFsTGluZSxcbiAgICAgICAgLy8gUmFkaWFsU2NhdHRlcixcbiAgICAgICAgLy8gUmFkaWFBcmVhLFxuICAgICAgICBQaWUsXG4gICAgICAgIFN1bmJ1cnN0LFxuICAgICAgICBUcmVlTWFwLFxuICAgICAgICBSYWRhcixcbiAgICAgICAgQ2FuZGxlc3RpY2tcbiAgICB9XG4gICBcbn0iLCJcblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBlbnVtIEF4aXNUeXBlIHtcbiAgICAgICAgWCxcbiAgICAgICAgWVxuICAgIH1cbiAgICBcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgZXhwb3J0IGNsYXNzIFZhbHVlIHtcbiAgICAgICAgX19wcmVWYWw6IGFueTtcbiAgICAgICAgX192YWw6IGFueTtcbiAgICAgICAgX19kYXRhVHlwZTogRGF0YVR5cGU7XG4gICAgICAgIF9fbmV4dFZhbDogYW55O1xuICAgICAgICBfX3NjYWxlVHlwZTogU2NhbGVUeXBlO1xuICAgICAgICBfX2lzTXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgICAgICAgY29uc3RydWN0b3IodjogYW55LCBzY2FsZVR5cGU6IFNjYWxlVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5fX3ZhbCA9IHY7XG4gICAgICAgICAgICBpZih2IGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgICAgIHRoaXMuX19pc011bHRpcGxlPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2lzTXVsdGlwbGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX19zY2FsZVR5cGUgPSBzY2FsZVR5cGU7XG4gICAgICAgICAgICB0aGlzLl9fZGF0YVR5cGUgPSBVdGlsaXR5LmdldFR5cGUodik7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgZ2V0IHNjYWxlVHlwZSgpOiBTY2FsZVR5cGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zY2FsZVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGRhdGFUeXBlKCk6IERhdGFUeXBlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZGF0YVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGZvciB3aGF0ID9cbiAgICAgICAgICogYXJyYXkgdmFsdWUgZm9yIGhpZ2ggbG93IG9wZW4gY2xvc2U/XG4gICAgICAgICAqL1xuICAgICAgICBnZXQgaXNNdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9faXNNdWx0aXBsZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fdmFsO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZW51bS9BZ2cudHNcIiAvPlxuXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIGltcG9ydCBVdGlsID0gYW5kcm9pZC5ncmFwaGljcy5VdGlsO1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgY2xhc3MgRmllbGQge1xuICAgICAgICBwdWJsaWMgYWdncmVnYXRlOiBBZ2c7XG4gICAgICAgIHB1YmxpYyBiaW5kOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyBuYW1lOnN0cmluZztcbiAgICAgICAgcHVibGljIHR5cGU6U2NhbGVUeXBlO1xuICAgICAgICBwdWJsaWMgbG9nQmFzZTpudW1iZXI7XG4gICAgICAgIHB1YmxpYyByYW5nZTphbnlbXTtcbiAgICAgICAgcHVibGljIGJhbmQ6Ym9vbGVhbjtcblxuICAgICAgICBjb25zdHJ1Y3RvcihiaW5kOiBhbnksbmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYWdncmVnYXRlID0gVXRpbC5hc0VudW0oYmluZC5hZ2dyZWdhdGUsQWdnLHRydWUpO1xuICAgICAgICAgICAgaWYodGhpcy5hZ2dyZWdhdGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hZ2dyZWdhdGUgPSBBZ2cuTk9ORTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYmluZCA9IGJpbmQuZmllbGQ7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBVdGlsLmFzRW51bShiaW5kLnR5cGUsU2NhbGVUeXBlLHRydWUpO1xuICAgICAgICAgICAgaWYodGhpcy50eXBlID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IFNjYWxlVHlwZS5PcmRpbmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2dCYXNlID1iaW5kLmxvZ0Jhc2U7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5yYW5nZSA9IGJpbmQucmFuZ2U7XG4gICAgICAgICAgICB0aGlzLmJhbmQgPSBiaW5kLmJhbmQ7XG4gICAgICAgIH1cbiAgICAgICAgZXF1YWxzKGZpZWxkOkZpZWxkKTpib29sZWFue1xuICAgICAgICAgICAgLy8gcmV0dXJuIHRoaXMuYWdncmVnYXRlID09IGZpZWxkLmFnZ3JlZ2F0ZVxuICAgICAgICAgICAgLy8gJiYgdGhpcy5iaW5kID09IGZpZWxkLmJpbmRcbiAgICAgICAgICAgIC8vICYmIHRoaXMubmFtZSA9PSBmaWVsZC5uYW1lXG4gICAgICAgICAgICAvLyAmJiB0aGlzLnR5cGUgPT0gZmllbGQudHlwZVxuICAgICAgICAgICAgLy8gJiYgdGhpcy5sb2dCYXNlID09IGZpZWxkLmxvZ0Jhc2VcbiAgICAgICAgICAgIC8vICYmIHRoaXMucmFuZ2UgPT0gZmllbGQucmFuZ2U7XG4gICAgICAgICAgICByZXR1cm4gXy5pc0VxdWFsKHRoaXMsZmllbGQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cblxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBpbXBvcnQgVXRpbCA9IGFuZHJvaWQuZ3JhcGhpY3MuVXRpbDtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGNsYXNzIEZpbHRlciB7XG4gICAgICAgIHB1YmxpYyBzZXJpZXM6IHN0cmluZ1tdO1xuICAgICAgICBwdWJsaWMgcnVsZXM6IFJ1bGVbXTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihzZXJpZXM6IHN0cmluZywgcnVsZXM6IGFueSkge1xuICAgICAgICAgICAgdGhpcy5zZXJpZXMgPSBzZXJpZXMuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGlmIChydWxlcyAhPSBudWxsICYmIHJ1bGVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bGVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bGVzLnB1c2gobmV3IFJ1bGUocnVsZS5maWVsZCwgcnVsZS5leHByZXNzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZXF1YWxzKGZpZWxkOiBGaWVsZCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIF8uaXNFcXVhbCh0aGlzLCBmaWVsZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIFJ1bGUge1xuICAgICAgICBwdWJsaWMgZXhwcmVzczogc3RyaW5nO1xuICAgICAgICBwdWJsaWMgZmlsZWQ6IHN0cmluZztcbiAgICAgICAgY29uc3RydWN0b3IoZmlsZWQ6IHN0cmluZywgZXhwcmVzczogc3RyaW5nKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZmlsZWQgPSBmaWxlZDtcbiAgICAgICAgICAgIHRoaXMuZXhwcmVzcyA9IGV4cHJlc3M7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9GaWVsZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIFxuICAgIGV4cG9ydCBjbGFzcyBFbmNvZGluZyB7XG4gICAgICAgIHB1YmxpYyB4OiBGaWVsZDtcbiAgICAgICAgcHVibGljIHk6IEZpZWxkO1xuICAgICAgICBwdWJsaWMgY29sb3I6IEZpZWxkO1xuICAgICAgICBwdWJsaWMgc2l6ZTogRmllbGQ7XG4gICAgICAgIHB1YmxpYyBzaGFwZTogRmllbGQ7XG4gICAgICAgIHB1YmxpYyBncm91cDogRmllbGQ7XG4gICAgICAgIHB1YmxpYyB2YWx1ZXM6RmllbGRbXTtcbiAgICAgICAgcHVibGljIF9zdGFjazpib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHB1YmxpYyBfcmFkaWFsOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgY29uc3RydWN0b3IoZW5jb2Rpbmc6IGFueSkge1xuICAgICAgICAgICAgaWYgKGVuY29kaW5nLngpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnggPSBuZXcgRmllbGQoZW5jb2RpbmcueCwgJ3gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbmNvZGluZy55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gbmV3IEZpZWxkKGVuY29kaW5nLnksICd5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmcuY29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yID0gbmV3IEZpZWxkKGVuY29kaW5nLmNvbG9yLCAnY29sb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbmNvZGluZy5zaGFwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGUgPSBuZXcgRmllbGQoZW5jb2Rpbmcuc2hhcGUsICdzaGFwZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVuY29kaW5nLnNpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBuZXcgRmllbGQoZW5jb2Rpbmcuc2l6ZSwgJ3NpemUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbmNvZGluZy5ncm91cCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAgPSBuZXcgRmllbGQoZW5jb2RpbmcuZ3JvdXAsICdncm91cCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVuY29kaW5nLnZhbHVlcyAmJiBlbmNvZGluZy52YWx1ZXMgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMgPVtdO1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPGVuY29kaW5nLnZhbHVlcy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGVuY29kaW5nLnZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMucHVzaChuZXcgRmllbGQodmFsdWUsdmFsdWUubmFtZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGVuY29kaW5nLnN0YWNrICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrID0gZW5jb2Rpbmcuc3RhY2sgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZW5jb2RpbmcucmFkaWFsICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3JhZGlhbCA9IGVuY29kaW5nLnJhZGlhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJcblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGNsYXNzIFRyYW5zRm9ybXtcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVXRpbCA9IGFuZHJvaWQuZ3JhcGhpY3MuVXRpbDtcbiAgICBleHBvcnQgY2xhc3MgU2VyaWVzIHtcbiAgICAgICAgcHJpdmF0ZSBfX25hbWU6IHN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBfX2luZGV4Om51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfX2RhdGE6IGFueVtdO1xuICAgICAgICBwcml2YXRlIF9fZW5jb2Rpbmc6IEVuY29kaW5nO1xuICAgICAgICBwcml2YXRlIF9fcGFpcnM6IHsgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdO1xuICAgICAgICBwcml2YXRlIF9fcG9pbnRzOiBhbnlbXSA9IFtdO1xuICAgICAgICBwcml2YXRlIF9fY2hhcnRUeXBlOiBDaGFydFR5cGUgPSBDaGFydFR5cGUuQmFyO1xuICAgICAgICBwdWJsaWMgZW5hYmxlOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKGVuY29kaW5nOiBFbmNvZGluZywgc2VyaWVzOiBhbnksaW5kZXg6bnVtYmVyKSB7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoZW5jb2RpbmcgIT0gbnVsbCk7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoc2VyaWVzICE9IG51bGwpO1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KHNlcmllcy5kYXRhIGluc3RhbmNlb2YgQXJyYXksIFwiU2VyaWVzIG11c3QgYmUgQXJyYXlcIik7XG4gICAgICAgICAgICB0aGlzLl9fZGF0YSA9IHNlcmllcy5kYXRhO1xuICAgICAgICAgICAgdGhpcy5fX25hbWUgPSBzZXJpZXMubmFtZTtcbiAgICAgICAgICAgIHRoaXMuX19pbmRleD0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLl9fY2hhcnRUeXBlID0gVXRpbC5hc0VudW0oc2VyaWVzLmNoYXJ0dHlwZSwgQ2hhcnRUeXBlKTtcbiAgICAgICAgICAgIHRoaXMuX19lbmNvZGluZyA9IGVuY29kaW5nO1xuICAgICAgICAgICAgdGhpcy5fX3BhaXJzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fX2VuY29kaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWxpdHkuaXNrZXkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gdGhpcy5fX2VuY29kaW5nW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZTogU2NhbGUgPSB0aGlzLl9fY3JlYXRlU2NhbGUoZmlsZWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fcGFpcnMucHVzaCh7IGZpbGVkOiBmaWxlZCwgc2NhbGU6IHNjYWxlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5fX2RhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fcG9pbnRzLnB1c2godGhpcy5fX2FuYWx5c2VJdGVtKHRoaXMuX19wYWlycywgaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiB0aGlzLl9fcGFpcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gcGFpci5maWxlZDtcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gcGFpci5zY2FsZTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZWQubmFtZSAhPSAneCcgJiYgZmlsZWQubmFtZSAhPSAneScgJiYgZmlsZWQucmFuZ2UgIT0gbnVsbCAmJiBmaWxlZC5yYW5nZS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKGZpbGVkLnJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY2FsZSBpbnN0YW5jZW9mIExvZ1NjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShmaWxlZC5yYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5iYW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2VCb3VuZHMoZmlsZWQucmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShmaWxlZC5yYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfX2FuYWx5c2VJdGVtKHBhaXJzOiB7IGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXSwgaXRlbTogYW55KTogYW55IHtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChpdGVtICE9IG51bGwpO1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KHR5cGVvZiBpdGVtID09ICdvYmplY3QnKTtcbiAgICAgICAgICAgIGxldCB2YWx1ZXMgPSB7fTtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydCghKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpO1xuICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiBwYWlycykge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlZDogRmllbGQgPSBwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgIGxldCBzY2FsZTogU2NhbGUgPSBwYWlyLnNjYWxlO1xuICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXg6IG51bWJlciA9IFV0aWxpdHkubWF4KFtpdGVtW2ZpbGVkLmJpbmRdLCBzY2FsZS5tYXhdKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pbjogbnVtYmVyID0gVXRpbGl0eS5taW4oW2l0ZW1bZmlsZWQuYmluZF0sIHNjYWxlLm1pbl0pO1xuICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW4oW21pbiwgbWF4XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY2FsZSBpbnN0YW5jZW9mIExvZ1NjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXg6IG51bWJlciA9IFV0aWxpdHkubWF4KFtpdGVtW2ZpbGVkLmJpbmRdLCBzY2FsZS5tYXhdKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pbjogbnVtYmVyID0gVXRpbGl0eS5taW4oW2l0ZW1bZmlsZWQuYmluZF0sIHNjYWxlLm1pbl0pO1xuICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW4oW21pbiwgbWF4XSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbnMucHVzaChpdGVtW2ZpbGVkLmJpbmRdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IFZhbHVlID0gbmV3IFZhbHVlKGl0ZW1bZmlsZWQuYmluZF0sIGZpbGVkLnR5cGUpO1xuICAgICAgICAgICAgICAgIHZhbHVlc1tmaWxlZC5uYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBfcmVmcmVzaCgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgdGhpcy5fX3BhaXJzKSB7XG4gICAgICAgICAgICAgICAgcGFpci5zY2FsZS5kb21haW4oW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgcHQgb2YgdGhpcy5fX3BvaW50cykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgdGhpcy5fX3BhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlZDogRmllbGQgPSBwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gcGFpci5zY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHB0W2ZpbGVkLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1heDogbnVtYmVyID0gVXRpbGl0eS5tYXgodmFsdWUuaXNNdWx0aXBsZSA/IHZhbHVlLnZhbHVlLmNvbmNhdChbc2NhbGUubWF4XSkgOiBbdmFsdWUudmFsdWUsIHNjYWxlLm1heF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbjogbnVtYmVyID0gVXRpbGl0eS5taW4odmFsdWUuaXNNdWx0aXBsZSA/IHZhbHVlLnZhbHVlLmNvbmNhdChbc2NhbGUubWluXSkgOiBbdmFsdWUudmFsdWUsIHNjYWxlLm1pbl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWluKFttaW4sIG1heF0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlIGluc3RhbmNlb2YgTG9nU2NhbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHRbZmlsZWQubmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWF4OiBudW1iZXIgPSBVdGlsaXR5Lm1heCh2YWx1ZS5pc011bHRpcGxlID8gdmFsdWUudmFsdWUuY29uY2F0KFtzY2FsZS5tYXhdKSA6IFt2YWx1ZS52YWx1ZSwgc2NhbGUubWF4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluOiBudW1iZXIgPSBVdGlsaXR5Lm1pbih2YWx1ZS5pc011bHRpcGxlID8gdmFsdWUudmFsdWUuY29uY2F0KFtzY2FsZS5taW5dKSA6IFt2YWx1ZS52YWx1ZSwgc2NhbGUubWluXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW4oW21pbiwgbWF4XSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHB0W2ZpbGVkLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2IG9mIHZhbHVlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbnMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbnMucHVzaCh2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9fY3JlYXRlU2NhbGUoZmlsZWQ6IEZpZWxkKTogU2NhbGUge1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KGZpbGVkICE9IG51bGwpO1xuICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IG51bGw7XG4gICAgICAgICAgICBzd2l0Y2ggKGZpbGVkLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFNjYWxlVHlwZS5MaW5lYXI6XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlID0gbmV3IExpbmVhclNjYWxlKGZpbGVkLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNjYWxlVHlwZS5PcmRpbmFsOlxuICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IG5ldyBPcmRpbmFsU2NhbGUoZmlsZWQubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU2NhbGVUeXBlLkxvZzpcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBuZXcgTG9nU2NhbGUoZmlsZWQubG9nQmFzZSwgZmlsZWQubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIERlYnVnLmFzc2VydChmYWxzZSwgZmlsZWQudHlwZSArIFwiIFNjYWxlVHlwZSBoYXMgbm90IGJlZW4gaW1wbGVtZW50IVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldCBkYXRhKCk6IGFueVtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBuYW1lKCk6c3RyaW5ne1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHNjYWxlUGFpcnMoKTogeyBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wYWlycztcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBwb2ludHMoKTogYW55W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9pbnRzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgY2hhcnRUeXBlKCk6IENoYXJ0VHlwZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2NoYXJ0VHlwZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZ2V0IGluZGV4KCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFNjYWxlKG5hbWU6IHN0cmluZyk6IFNjYWxlIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KHRoaXMuX19wYWlycywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5maWxlZC5uYW1lID09IG5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmKGluZGV4ID49IDApe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wYWlyc1tpbmRleF0uc2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjbG9uZSgpOiBTZXJpZXMge1xuICAgICAgICAgICAgbGV0IHNlcmllcyA9IF8uY2xvbmVEZWVwKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHNlcmllcztcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGNsYXNzIERhdGFNb2RlbCB7XG5cbiAgICAgICAgcHJpdmF0ZSBfX2VuY29kaW5nOiBFbmNvZGluZztcbiAgICAgICAgcHJpdmF0ZSBfX2ZpbHRlcjogRmlsdGVyO1xuICAgICAgICBwcml2YXRlIF9kYXRhOmFueTtcbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgX3NlcmllczogU2VyaWVzW107XG4gICAgICAgIHByaXZhdGUgX2FsbFNlcmllczpTZXJpZXNbXTtcbiAgICAgICAgcHJpdmF0ZSBfX2NoYXJ0VHlwZXM6IENoYXJ0VHlwZVtdID0gW107XG4gICAgICAgIHByb3RlY3RlZCBfX3NjYWxlUGFpcnM6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdO1xuICAgICAgICBwcml2YXRlIF9hbmFseXNlRW5jb2RpbmcoZW5jb2RlOiBhbnkpOiBFbmNvZGluZyB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVuY29kaW5nKGVuY29kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0IGNoYXJ0VHlwZXMoKTogQ2hhcnRUeXBlW10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19jaGFydFR5cGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYW5hbHlzZVNlcmllcyhzZXJpZXNfZGF0YTogYW55LCBlbmNvZGluZzogRW5jb2RpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcmllcyA9W107XG4gICAgICAgICAgICB0aGlzLl9hbGxTZXJpZXMgPVtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXJpZXNfZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBzZXJpZXNpdGVtID0gc2VyaWVzX2RhdGFbaV07XG4gICAgICAgICAgICAgICAgbGV0IHNlcjogU2VyaWVzID0gbmV3IFNlcmllcyhlbmNvZGluZywgc2VyaWVzaXRlbSwgaSk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fX2ZpbHRlciAhPSBudWxsICYmIHRoaXMuX19maWx0ZXIuc2VyaWVzLmluZGV4T2Yoc2VyaWVzaXRlbS5uYW1lKT4tMSl7XG4gICAgICAgICAgICAgICAgICAgIHNlci5lbmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZXMucHVzaChzZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fX2NoYXJ0VHlwZXMuaW5kZXhPZihzZXIuY2hhcnRUeXBlKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19jaGFydFR5cGVzLnB1c2goc2VyLmNoYXJ0VHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VyLmVuYWJsZSA9ZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2FsbFNlcmllcy5wdXNoKHNlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgICAgIHRoaXMuX19lbmNvZGluZyA9IHRoaXMuX2FuYWx5c2VFbmNvZGluZyh0aGlzLl9kYXRhLmVuY29kaW5nKTtcbiAgICAgICAgICAgIHRoaXMuX2FuYWx5c2VGaWx0ZXIoZGF0YS5maWx0ZXIpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgcmVmcmVzaCgpe1xuICAgICAgICAgICAgdGhpcy5fYW5hbHlzZVNlcmllcyh0aGlzLl9kYXRhLnNlcmllcywgdGhpcy5fX2VuY29kaW5nKTtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUxheW91dFNjYWxlcyh0aGlzLmVuY29kaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2FuYWx5c2VGaWx0ZXIoZmlsdGVyOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX19maWx0ZXIgPSBuZXcgRmlsdGVyKCBmaWx0ZXIuc2VyaWVzLGZpbHRlci5ydWxlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jcmVhdGVMYXlvdXRTY2FsZXMoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycyA9IFtdO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fc2VyaWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFjayhDaGFydFR5cGUuQmFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFjayhDaGFydFR5cGUuTGluZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhY2soQ2hhcnRUeXBlLkFyZWEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrKENoYXJ0VHlwZS5TY2F0dGVyKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Nlcmllcy5sZW5ndGggLSAxOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllczogU2VyaWVzID0gdGhpcy5fc2VyaWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dF9zZXJpZXM6IFNlcmllcyA9IHRoaXMuX3Nlcmllc1tpICsgMV07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpckEgb2Ygc2VyaWVzLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXJCIG9mIG5leHRfc2VyaWVzLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFpckEuZmlsZWQuZXF1YWxzKHBhaXJCLmZpbGVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQgPSBwYWlyQS5maWxlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcmNlIDpib29sZWFuID0gdGhpcy5lbmNvZGluZy5fc3RhY2sgJiYgcGFpckEuZmlsZWQubmFtZSA9PSd5JzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mb0E6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfSA9IHRoaXMuX19nZXRTY2FsZUluZm9ieW5hbWUocGFpckEuZmlsZWQubmFtZSwgc2VyaWVzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mb0I6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfSA9IHRoaXMuX19nZXRTY2FsZUluZm9ieW5hbWUocGFpckIuZmlsZWQubmFtZSwgbmV4dF9zZXJpZXMubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm9BID09IG51bGwgJiYgaW5mb0IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gVXRpbGl0eS5tZXJnZVNjYWxlKHBhaXJBLnNjYWxlLCBwYWlyQi5zY2FsZSxmb3JjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFtzZXJpZXMubmFtZSwgbmV4dF9zZXJpZXMubmFtZV0sIGZpbGVkOiBmaWxlZCwgc2NhbGU6IHNjYWxlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWVdLCBmaWxlZDogcGFpckEuZmlsZWQsIHNjYWxlOiBwYWlyQS5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbbmV4dF9zZXJpZXMubmFtZV0sIGZpbGVkOiBwYWlyQi5maWxlZCwgc2NhbGU6IHBhaXJCLnNjYWxlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZm9BID09IG51bGwgJiYgaW5mb0IgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gVXRpbGl0eS5tZXJnZVNjYWxlKHBhaXJBLnNjYWxlLCBpbmZvQi5zY2FsZSxmb3JjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9CLnNjYWxlID0gc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb0Iuc2VyaWVzLnB1c2goc2VyaWVzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZm9BICE9IG51bGwgJiYgaW5mb0IgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gVXRpbGl0eS5tZXJnZVNjYWxlKHBhaXJCLnNjYWxlLCBpbmZvQS5zY2FsZSxmb3JjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9BLnNjYWxlID0gc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb0Euc2VyaWVzLnB1c2gobmV4dF9zZXJpZXMubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2VyIG9mIHRoaXMuX3Nlcmllcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHNlci5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLl9nZXRTY2FsZUJ5TmFtZShwYWlyLmZpbGVkLm5hbWUsIHNlci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFpci5zY2FsZSA9IHNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Nlcmllcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgdGhpcy5fc2VyaWVzWzBdLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMucHVzaCh7IHNlcmllczogW3RoaXMuX3Nlcmllc1swXS5uYW1lXSwgZmlsZWQ6IHBhaXIuZmlsZWQsIHNjYWxlOiBwYWlyLnNjYWxlLmNsb25lKCkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX3N0YWNrKGNoYXJ0VHlwZTogQ2hhcnRUeXBlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmNvZGluZy5fc3RhY2spIHtcbiAgICAgICAgICAgICAgICBsZXQgbmVnYXRpdmU6IGFueSA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCBwb3NpdGl2ZTogYW55ID0ge307XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VyaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJBID0gdGhpcy5zZXJpZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJBLmNoYXJ0VHlwZSA9PT0gY2hhcnRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRTZXJpZXNTdGFjayhzZXJBLCBwb3NpdGl2ZSwgbmVnYXRpdmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfX2dldFNjYWxlSW5mb2J5bmFtZShmaWxlZG5hbWU6IHN0cmluZywgc2VyaWVzbmFtZTogc3RyaW5nKTogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9IHtcbiAgICAgICAgICAgIGxldCBpbmZvOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH0gPSBfLmZpbmQodGhpcy5fX3NjYWxlUGFpcnMsIChpdGVtOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zZXJpZXMuaW5kZXhPZihzZXJpZXNuYW1lKSA+PSAwICYmIGZpbGVkbmFtZSA9PSBpdGVtLmZpbGVkLm5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIF9nZXRTY2FsZUJ5TmFtZShmaWxlZG5hbWU6IHN0cmluZywgc2VyaWVzbmFtZTogc3RyaW5nKTogU2NhbGUge1xuICAgICAgICAgICAgcmV0dXJuIF8ucmVzdWx0KF8uZmluZCh0aGlzLl9fc2NhbGVQYWlycywgKGl0ZW06IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnNlcmllcy5pbmRleE9mKHNlcmllc25hbWUpID49IDAgJiYgZmlsZWRuYW1lID09IGl0ZW0uZmlsZWQubmFtZTtcbiAgICAgICAgICAgIH0pLCBcInNjYWxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc2V0U2VyaWVzU3RhY2soc2VyaWVzOiBTZXJpZXMsIHBvczogYW55LCBuZWc6IGFueSkge1xuICAgICAgICAgICAgbGV0IHNjYWxlWF9BOiBTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuXG4gICAgICAgICAgICBpZiAoc2NhbGVYX0EgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZWd2YWx1ZTogbnVtYmVyID0gbmVnW3B0LngudmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zdmFsdWU6IG51bWJlciA9IHBvc1twdC54LnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ3ZhbHVlID09IG51bGwpIHsgbmVndmFsdWUgPSAwOyBuZWdbcHQueC52YWx1ZV0gPSAwOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3N2YWx1ZSA9PSBudWxsKSB7IHBvc3ZhbHVlID0gMDsgcG9zW3B0LngudmFsdWVdID0gMDsgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc05lZzogYm9vbGVhbiA9IHB0LnkudmFsdWUgPCAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRZOiBudW1iZXIgPSBpc05lZyA/IG5lZ3ZhbHVlIDogcG9zdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRZOiBudW1iZXIgPSBzdGFydFkgKyBwdC55LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpc05lZyA/IG5lZ1twdC54LnZhbHVlXSA9IGVuZFkgOiBwb3NbcHQueC52YWx1ZV0gPSBlbmRZO1xuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXRQb2ludC55ID0gbmV3IFZhbHVlKFtzdGFydFksIGVuZFldLCB0YXJnZXRQb2ludC55LnNjYWxlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlcmllc0IucG9pbnRzW2luZGV4XSA9IHRhcmdldFBvaW50O1xuICAgICAgICAgICAgICAgICAgICBwdC55ID0gbmV3IFZhbHVlKFtzdGFydFksIGVuZFldLCBwdC55LnNjYWxlVHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VyaWVzLl9yZWZyZXNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTZXJpZXNCeVR5cGUoY2hhcnR0eXBlOiBDaGFydFR5cGUpOiBTZXJpZXNbXSB7XG4gICAgICAgICAgICBsZXQgc2VyaWVzOiBTZXJpZXNbXSA9IF8uZmlsdGVyKHRoaXMuX3NlcmllcywgKHNlcikgPT4geyByZXR1cm4gc2VyLmNoYXJ0VHlwZSA9PT0gY2hhcnR0eXBlOyB9KTtcbiAgICAgICAgICAgIHJldHVybiBzZXJpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc2VyaWVzKCk6IFNlcmllc1tdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXM7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGFsbFNlcmllcygpOlNlcmllc1tde1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FsbFNlcmllcztcbiAgICAgICAgfVxuICAgICAgICBnZXQgZW5jb2RpbmcoKTogRW5jb2Rpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbmNvZGluZztcbiAgICAgICAgfVxuICAgICAgICBnZXQgZmlsdGVyKCk6RmlsdGVye1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19maWx0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc2NhbGVQYWlycygpOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NjYWxlUGFpcnM7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVNjYWxlIHtcbiAgICAgICAgZG9tYWluKGRvbWFpbnM6IGFueVtdKTogSVNjYWxlO1xuICAgICAgICByZWZyZXNoKCk6IElTY2FsZTtcbiAgICAgICAgcmFuZ2UocmFuZ2VzOiBhbnlbXSk6IElTY2FsZTtcbiAgICAgICAgcmFuZ2VCb3VuZHMocmFuZ2VzOiBhbnlbXSk6IElTY2FsZTtcbiAgICAgICAgZ2V0U2NhbGVWYWx1ZSh2YWx1ZTogYW55KTtcbiAgICAgICAgb3JkZXI6IE9yZGVyO1xuICAgICAgICBtYXg6IG51bWJlcjtcbiAgICAgICAgbWluOiBudW1iZXI7XG4gICAgICAgIGNsb25lKCk6SVNjYWxlO1xuICAgICAgICAgZXF1YWwodmFsdWU6SVNjYWxlKTtcbiAgICAgICAgICAgIFxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG5cbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU2NhbGUgaW1wbGVtZW50cyBJU2NhbGUge1xuICAgICAgICBwcml2YXRlIF9faWQ6IHN0cmluZztcbiAgICAgICAgcHJvdGVjdGVkIF9fc3RhcnQ6IGFueTtcbiAgICAgICAgcHJvdGVjdGVkIF9fZW5kOiBhbnk7XG4gICAgICAgIHByb3RlY3RlZCBfX2JvdW5kOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByb3RlY3RlZCBfb3JkZXI6IE9yZGVyO1xuICAgICAgICByZWFkb25seSBtYXg6IG51bWJlcjtcbiAgICAgICAgcmVhZG9ubHkgbWluOiBudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKGlkPzogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgICAgICB0aGlzLl9vcmRlciA9IE9yZGVyLk5vbmU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByb3RlY3RlZCBfX2RvbWFpbnM6IGFueVtdID0gW107XG4gICAgICAgIHByb3RlY3RlZCByYW5nZXM6IGFueVtdID0gW107XG5cbiAgICAgICAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX19pZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pZDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZG9tYWluKGRvbWFpbnM6IGFueVtdKTogSVNjYWxlIHtcbiAgICAgICAgICAgIHRoaXMuX19kb21haW5zID0gZG9tYWlucztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyByYW5nZShyYW5nZXM6IGFueVtdKSB7XG4gICAgICAgICAgICB0aGlzLnJhbmdlcyA9IHJhbmdlcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgfVxuICAgICAgICByYW5nZUJvdW5kcyhyYW5nZXM6IGFueVtdKTogSVNjYWxlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCgpOiBJU2NhbGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTY2FsZVZhbHVlKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgc3RhcnRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGVuZFBvc2l0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19lbmQ7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG9yZGVyKCk6IE9yZGVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcmRlcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgb3JkZXIodmFsdWU6IE9yZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vcmRlciA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBlcXVhbCh2YWx1ZTogU2NhbGUpIHtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlkID09IHZhbHVlLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBjbG9uZSgpOiBTY2FsZXtcbiAgICAgICAgICAgIHJldHVybiBfLmNsb25lRGVlcCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnXG4gICAgZXhwb3J0IGNsYXNzIExpbmVhclNjYWxlIGV4dGVuZHMgU2NhbGUge1xuICAgICAgICBwcm90ZWN0ZWQgX21heDogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX21pbjogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgbmljZU1heFZhbHVlOiBudW1iZXI7XG5cbiAgICAgICAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0cnVjdG9yKGlkPzogYW55KSB7XG4gICAgICAgICAgICBzdXBlcihpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBkb21haW4oZG9tYWluczphbnlbXSl7XG4gICAgICAgICAgICBzdXBlci5kb21haW4oZG9tYWlucyk7XG4gICAgICAgICAgICB0aGlzLl9taW4gPSB0aGlzLl9fZG9tYWluc1swXTtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IHRoaXMuX19kb21haW5zWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByZWZyZXNoKCk6IElTY2FsZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlciA9PT0gT3JkZXIuQXNjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0ID0gdGhpcy5yYW5nZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fX2VuZCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBPcmRlci5EZXNjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0ID0gdGhpcy5yYW5nZXNbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5fX2VuZCA9IHRoaXMucmFuZ2VzWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc3RhcnQgPSB0aGlzLnJhbmdlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW5kID0gdGhpcy5yYW5nZXNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9taW4gPSB0aGlzLl9fZG9tYWluc1swXTtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IHRoaXMuX19kb21haW5zWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2UocmFuZ2VzOiBhbnlbXSkge1xuICAgICAgICAgICAgdGhpcy5yYW5nZXMgPSByYW5nZXM7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMucmVmcmVzaCgpLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFNjYWxlVmFsdWUodjogYW55KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4ID09IHRoaXMuX21pbikge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKHRoaXMuX19lbmQgLSB0aGlzLl9fc3RhcnQpIC8gMiArIHRoaXMuX19zdGFydDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAodGhpcy5fX2VuZCAtIHRoaXMuX19zdGFydCkgLyAodGhpcy5fbWF4IC0gdGhpcy5fbWluKSAqICh2IC0gdGhpcy5fbWluKSArIHRoaXMuX19zdGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgXG5cbiAgICAgICAgcHVibGljIGVxdWFsKHZhbHVlOiBTY2FsZSkge1xuICAgICAgICAgICAgaWYodmFsdWUgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmlkID09IHRoaXMuaWQgJiYgdmFsdWUubWF4ID09IHRoaXMubWF4ICYmIHZhbHVlLm1pbiA9PSB0aGlzLm1pbiA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gICAgICAgICAgICBcbiAgICAvLyAgICBwdWJsaWMgY2xvbmUoKTpMaW5lYXJTY2FsZXtcbiAgICAvLyAgICAgICAgbGV0IHNjYWxlID0gIG5ldyBMaW5lYXJTY2FsZSh0aGlzLmlkKTtcbiAgICAvLyAgICAgICAgbGV0IGRvbWFpbnM6YW55W10gPVtdO1xuICAgIC8vICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX19kb21haW5zLmxlbmd0aDsgKytpKXtcbiAgICAvLyAgICAgICAgICAgICBkb21haW5zLnB1c2godGhpcy5fX2RvbWFpbnNbaV0pO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgLy8gbGV0IHJhbmdlcyA6YW55W10gPVtdO1xuICAgIC8vICAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmFuZ2VzLmxlbmd0aDsgKytpKXtcbiAgICAvLyAgICAgICAgIC8vICAgICByYW5nZXMucHVzaCh0aGlzLnJhbmdlc1tpXSk7XG4gICAgLy8gICAgICAgICAvLyB9XG4gICAgLy8gICAgICAgIHNjYWxlLmRvbWFpbihkb21haW5zKTsvLy5yYW5nZShyYW5nZXMpLnJlZnJlc2goKTtcbiAgICAvLyAgICAgICAgcmV0dXJuIHNjYWxlO1xuICAgIC8vICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcblxuXG4gICAgZXhwb3J0IGNsYXNzIE9yZGluYWxTY2FsZSBleHRlbmRzIFNjYWxlIHtcblxuICAgICAgICBjb25zdHJ1Y3RvcihpZD86IGFueSkge1xuICAgICAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2goKTogSVNjYWxlIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IE9yZGVyLkFzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19kb21haW5zLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gT3JkZXIuRGVzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19kb21haW5zLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiIC0gYTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERlYnVnLmFzc2VydCh0aGlzLnJhbmdlcyAhPSBudWxsLCBcIlwiKTtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydCh0aGlzLnJhbmdlcy5sZW5ndGggPT0gMik7XG4gICAgICAgICAgICBpZiAodGhpcy5yYW5nZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc3RhcnQgPSB0aGlzLnJhbmdlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW5kID0gdGhpcy5yYW5nZXNbMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlcy5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGRvbWFpbnMoKTogYW55W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19kb21haW5zO1xuICAgICAgICB9XG5cbiAgICAgICAgcmFuZ2UocmFuZ2VzOiBhbnlbXSkge1xuICAgICAgICAgICAgdGhpcy5yYW5nZXMgPSByYW5nZXM7XG4gICAgICAgICAgICB0aGlzLl9fYm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5yZWZyZXNoKCksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJhbmdlQm91bmRzKHJhbmdlczogYW55W10pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gcmFuZ2VzO1xuICAgICAgICAgICAgdGhpcy5fX2JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5yZWZyZXNoKCksIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBkb21haW4oZG9tYWluczogYW55W10pOiBJU2NhbGUge1xuICAgICAgICAgICAgdGhpcy5fX2RvbWFpbnMgPSBkb21haW5zO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0U2NhbGVWYWx1ZSh2OiBhbnkpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX19kb21haW5zLmluZGV4T2Yodik7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19ib3VuZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKGluZGV4ICsgMC41KSAqICh0aGlzLl9fZW5kIC0gdGhpcy5fX3N0YXJ0KSAvICh0aGlzLmRvbWFpbnMubGVuZ3RoKSArIHRoaXMuX19zdGFydDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBpbmRleCAqICh0aGlzLl9fZW5kIC0gdGhpcy5fX3N0YXJ0KSAvICh0aGlzLmRvbWFpbnMubGVuZ3RoLTEpICsgdGhpcy5fX3N0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHVibGljIGNsb25lKCk6T3JkaW5hbFNjYWxle1xuICAgICAgICAvLyAgICAgbGV0IHNjYWxlID0gIG5ldyBPcmRpbmFsU2NhbGUodGhpcy5pZCk7XG4gICAgICAgIC8vICAgICBsZXQgZG9tYWluczphbnlbXSA9W107XG4gICAgICAgIC8vICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX19kb21haW5zLmxlbmd0aDsgKytpKXtcbiAgICAgICAgLy8gICAgICAgICAgZG9tYWlucy5wdXNoKHRoaXMuX19kb21haW5zW2ldKTtcbiAgICAgICAgLy8gICAgICB9XG4gICAgICAgIC8vICAgICAvLyAgbGV0IHJhbmdlcyA6YW55W10gPVtdO1xuICAgICAgICAvLyAgICAgLy8gIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhbmdlcy5sZW5ndGg7ICsraSl7XG4gICAgICAgIC8vICAgICAvLyAgICAgIHJhbmdlcy5wdXNoKHRoaXMucmFuZ2VzW2ldKTtcbiAgICAgICAgLy8gICAgIC8vICB9XG4gICAgICAgIC8vICAgICBzY2FsZS5kb21haW4oZG9tYWlucyk7Ly8ucmFuZ2UocmFuZ2VzKS5yZWZyZXNoKCk7XG4gICAgICAgIC8vICAgICByZXR1cm4gc2NhbGU7XG4gICAgICAgIC8vIH1cblxuICAgIH1cblxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcblxuXG4gICAgZXhwb3J0IGNsYXNzIExvZ1NjYWxlIGV4dGVuZHMgU2NhbGUge1xuXG4gICAgICAgIHByb3RlY3RlZCBfbWF4OiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfbWluOiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfbmljZVRpY2s6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9uaWNlTWF4VmFsdWU6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfdGlja3NpemU6bnVtYmVyID0gNjtcblxuICAgICAgICBwcm90ZWN0ZWQgX2xvZ0Jhc2U6IG51bWJlcjtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihsb2diYXNlOiBudW1iZXIsIGlkPzogYW55KSB7XG4gICAgICAgICAgICBzdXBlcihpZCk7XG4gICAgICAgICAgICB0aGlzLl9sb2dCYXNlID0gbG9nYmFzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZG9tYWluKGRvbWFpbnM6YW55W10pe1xuICAgICAgICAgICAgc3VwZXIuZG9tYWluKGRvbWFpbnMpO1xuICAgICAgICAgICAgdGhpcy5fbWluID0gdGhpcy5fX2RvbWFpbnNbMF07XG4gICAgICAgICAgICB0aGlzLl9tYXggPSB0aGlzLl9fZG9tYWluc1sxXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGdldCBsb2dCYXNlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9nQmFzZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdGlja1NpemUodmFsdWU6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3RpY2tzaXplID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG1heCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCgpOiBJU2NhbGUge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IE9yZGVyLkFzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGFydCA9IHRoaXMucmFuZ2VzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19lbmQgPSB0aGlzLnJhbmdlc1sxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gT3JkZXIuRGVzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGFydCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19lbmQgPSB0aGlzLnJhbmdlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0ID0gdGhpcy5yYW5nZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fX2VuZCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9taW4gPSB0aGlzLl9fZG9tYWluc1swXTtcbiAgICAgICAgICAgIHRoaXMuX21heCA9IHRoaXMuX19kb21haW5zWzFdO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xvZ0Jhc2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2UgPSB0aGlzLl9sb2dCYXNlO1xuICAgICAgICAgICAgICAgIHZhciBrID0gTWF0aC5sb2coYmFzZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW1heCA9IE1hdGguY2VpbChNYXRoLmxvZyh0aGlzLl9tYXgpIC8gayk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4ID0gTWF0aC5wb3coYmFzZSwgaW1heCk7XG4gICAgICAgICAgICAgICAgdmFyIGltaW4gPSBNYXRoLmZsb29yKE1hdGgubG9nKHRoaXMuX21pbikgLyBrKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9taW4gPSBNYXRoLnBvdyhiYXNlLCBpbWluKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9taW4gPD0gMCB8fCBpc05hTih0aGlzLl9taW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21pbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXggPCB0aGlzLl9taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5fbWluICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJhbmdlKHJhbmdlczogYW55W10pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gcmFuZ2VzO1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnJlZnJlc2goKSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdGlja3MoKTogYW55W10ge1xuICAgICAgICAgICAgdmFyIHRpY2tzOiBhbnlbXSA9IG5ldyBBcnJheSh0aGlzLl90aWNrc2l6ZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSB0aGlzLl90aWNrc2l6ZTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGlja3NbaV0gPSBpICogdGhpcy5fbmljZVRpY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGlja3M7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTY2FsZVZhbHVlKHY6IGFueSkge1xuICAgICAgICAgICAgaWYgKHYgPCB0aGlzLl9taW4pIHtcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5fbWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1heGwgPSBNYXRoLmxvZyh0aGlzLl9tYXggLyB0aGlzLl9taW4pO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gTWF0aC5sb2codiAvIHRoaXMuX21pbikgLyBtYXhsICogKHRoaXMuX19lbmQgLSB0aGlzLl9fc3RhcnQpICsgdGhpcy5fX3N0YXJ0O1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1YmxpYyBjbG9uZSgpOkxvZ1NjYWxle1xuICAgICAgICAvLyAgICAgRGVidWcuYXNzZXJ0KGZhbHNlLFwiTG9nU2NhbGUgY2xvbmUgaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkICBcIik7XG4gICAgICAgIC8vICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG5cbn0iLCIvLyAvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYmFzZS5kLnRzXCIgLz5cbi8vIG5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgIFxuICAgIFxuLy8gICAgICAgICBleHBvcnQgY2xhc3MgQ29sb3JTY2FsZSBleHRlbmRzIE9yZGluYWxTY2FsZSB7XG4vLyAgICAgICAgICAgICBwcml2YXRlIF9fY29sb3JyYW5nZXM6c3RyaW5nW107XG5cbi8vICAgICAgICAgICAgIGNvbnN0cnVjdG9yKGlkPzogYW55KSB7XG4vLyAgICAgICAgICAgICAgICAgc3VwZXIoaWQpO1xuLy8gICAgICAgICAgICAgICAgIHRoaXMuX19jb2xvcnJhbmdlcyA9W107XG5cbi8vICAgICAgICAgICAgIH1cbiAgICAgICAgIFxuLy8gICAgICAgICAgICAgZ2V0IGRvbWFpbnMoKTogYW55W10ge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZG9tYWlucztcbi8vICAgICAgICAgICAgIH1cbiAgICBcbi8vICAgICAgICAgICAgIHJhbmdlKHJhbmdlczogYW55W10pIHtcbi8vICAgICAgICAgICAgICAgICBpZihyYW5nZXMubGVuZ3RoID4gMSl7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19jb2xvcnJhbmdlcyA9Q29sb3JVdGlscy5ncmFkaWVudENvbG9yKHJhbmdlc1swXSxyYW5nZXNbcmFuZ2VzLmxlbmd0aC0xXSx0aGlzLl9fZG9tYWlucy5sZW5ndGgpO1xuXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5yYW5nZShbMCx0aGlzLl9fY29sb3JyYW5nZXMubGVuZ3RoLTFdKTtcblxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgIHJhbmdlQm91bmRzKHJhbmdlczogYW55W10pIHtcbi8vICAgICAgICAgICAgICAgICBpZihyYW5nZXMubGVuZ3RoID4gMSl7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19jb2xvcnJhbmdlcyA9Q29sb3JVdGlscy5ncmFkaWVudENvbG9yKHJhbmdlc1swXSxyYW5nZXNbcmFuZ2VzLmxlbmd0aC0xXSx0aGlzLl9fZG9tYWlucy5sZW5ndGgpO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIucmFuZ2UoWzAsdGhpcy5fX2NvbG9ycmFuZ2VzLmxlbmd0aC0xXSk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBnZXRTY2FsZVZhbHVlKHY6IGFueSk6YW55IHtcbi8vICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9fZG9tYWlucy5pbmRleE9mKHYpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fY29sb3JyYW5nZXNbaW5kZXhdO1xuLy8gICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgICAgXG4vLyAgICAgICAgIH1cbiAgICBcbi8vICAgICB9IiwibmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGVudW0gRWxlbWVudFR5cGV7XG4gICAgICAgIFNoYXBlLFxuICAgICAgICBTZXJpZXMsXG4gICAgICAgIEF4aXMsXG4gICAgICAgIFNlcmllc0xlZ2VuZCxcbiAgICAgICAgU2NhbGVMZWdlbmRcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IExpbmVhckxheW91dCA9IGFuZHJvaWQud2lkZ2V0LkxpbmVhckxheW91dDtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG5cbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG5cbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgT3JpZW50YXRpb24gPSBhbmRyb2lkLmdyYXBoaWNzLk9yaWVudGF0aW9uO1xuICAgIGltcG9ydCBMYXlvdXRQYXJhbXMgPSBhbmRyb2lkLnZpZXcuTGF5b3V0UGFyYW1zO1xuICAgIGltcG9ydCBWaWV3R3JvdXAgPSBhbmRyb2lkLnZpZXcuVmlld0dyb3VwO1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuXG4gICAgZXhwb3J0IGNsYXNzIFNlcmllc0xlZ2VuZCBleHRlbmRzIExpbmVhckxheW91dCB7XG5cbiAgICAgICAgcHJpdmF0ZSBfc2VyaWVzOiBTZXJpZXNbXTtcbiAgICAgICAgcHJpdmF0ZSBfX3NoYXBlOiBzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKHNoYXBlPzogJ2JhcicgfCAnc2NhdHRlcicpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlID0gc2hhcGU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IHNlcmllcyh2YWx1ZTogU2VyaWVzW10pIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcmllcyA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fX2xvYWRJdGVtcygpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgc2VyaWVzKCk6IFNlcmllc1tdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9fbG9hZEl0ZW1zKCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxWaWV3cygpO1xuXG4gICAgICAgICAgICBsZXQgY29sb3JBcnJheTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtOiBMZWdlbmRJdGVtID0gbmV3IExlZ2VuZEl0ZW0oKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNlcmllcyA9IHRoaXMuc2VyaWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fc2hhcGUgPT0gJ2JhcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uID0gbmV3IEJhckljb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX19zaGFwZSA9PSAnc2NhdHRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uID0gbmV3IENpcmNsZUljb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5zZXJpZXMuZW5hYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uLmNvbG9yID0gQ29sb3JVdGlscy5pbmRleENvbG9yKGkpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmljb24uY29sb3IgPSAnZ3JheSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGNvbnN0IFBBRERJTkc6IG51bWJlciA9IDU7XG4gICAgY2xhc3MgTGVnZW5kSXRlbSBleHRlbmRzIFZpZXcge1xuXG4gICAgICAgIHB1YmxpYyBzZXJpZXM6IFNlcmllcztcbiAgICAgICAgcHVibGljIGljb246IEljb247XG4gICAgICAgIHB1YmxpYyBmb250OiBGb250XG4gICAgICAgIHByaXZhdGUgX19mb250UmVjdDogUmVjdDtcbiAgICAgICAgcHJpdmF0ZSBfX2ljb25SZWN0OiBSZWN0O1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5mb250ID0gRGVmYXVsdC5mb250O1xuICAgICAgICAgICAgdGhpcy5mb250LmZvbnRDb2xvciA9ICdibGFjayc7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgbGV0IHc6IG51bWJlciA9IHdpZHRoLmdldE1lYXN1cmVWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IGg6IG51bWJlciA9IGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICBzaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy5zZXJpZXMubmFtZSwgdGhpcy5mb250KTtcbiAgICAgICAgICAgIHRoaXMuX19mb250UmVjdCA9IG5ldyBSZWN0KDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIGxldCBpY29uc2l6ZSA9IHNpemUuaGVpZ2h0ICogMjtcbiAgICAgICAgICAgIHRoaXMuX19pY29uUmVjdCA9IG5ldyBSZWN0KDAsIDAsIGljb25zaXplLCBzaXplLmhlaWdodCk7XG4gICAgICAgICAgICBzaXplLndpZHRoID0gc2l6ZS53aWR0aCArIFBBRERJTkcgKiAzICsgaWNvbnNpemU7XG4gICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICB9XG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9fZm9udFJlY3QudHJhbnNsYXRlKGwsIHQpO1xuICAgICAgICAgICAgdGhpcy5fX2ljb25SZWN0LnRyYW5zbGF0ZShsICsgUEFERElORyArIHRoaXMuX19mb250UmVjdC53aWR0aCwgdCk7XG4gICAgICAgIH1cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1RleHQodGhpcy5zZXJpZXMubmFtZSwgdGhpcy5fX2ZvbnRSZWN0LnN0YXJ0UG9pbnQsIHRoaXMuZm9udCk7XG4gICAgICAgICAgICB0aGlzLmljb24uZHJhdyh0aGlzLl9faWNvblJlY3QsIGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgb25Nb3VzZUV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmFjdGlvbiA9PSBNb3Rpb25FdmVudC5BQ1RJT05fQ0xJQ0spIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2ZW50IFwiKTtcbiAgICAgICAgICAgICAgICB3aW5kb3dbJ0V2ZW50SGFuZGxlciddKG5ldyBQb2ludChldmVudC54LCBldmVudC55KSwgRWxlbWVudFR5cGUuU2VyaWVzTGVnZW5kLCB7ICdzZXJpZXMnOiB0aGlzLnNlcmllcy5uYW1lLCAnZW5hYmxlJzogdGhpcy5zZXJpZXMuZW5hYmxlIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFic3RyYWN0IGNsYXNzIEljb24ge1xuICAgICAgICBjb2xvcjogc3RyaW5nO1xuICAgICAgICBhYnN0cmFjdCBkcmF3KHJlY3Q6IFJlY3QsIGNhbnZhczogQ2FudmFzKTogdm9pZDtcbiAgICB9XG4gICAgY2xhc3MgQmFySWNvbiBleHRlbmRzIEljb24ge1xuXG4gICAgICAgIGRyYXcocmVjdDogUmVjdCwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3UmVjdChyZWN0LnN0YXJ0UG9pbnQsIHJlY3QuZW5kUG9pbnQsIHRydWUsIHRoaXMuY29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsYXNzIENpcmNsZUljb24gZXh0ZW5kcyBJY29uIHtcblxuICAgICAgICBkcmF3KHJlY3Q6IFJlY3QsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0FyYyhyZWN0LCAwLCAyICogMTgwLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBBbmltYXRpb24gPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkFuaW1hdGlvbjtcbiAgICBpbXBvcnQgTW90aW9uRXZlbnQgPSBhbmRyb2lkLnZpZXcuZXZlbnQuTW90aW9uRXZlbnQ7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNoYXBlIGV4dGVuZHMgVmlld3tcbiAgICAgICAgcHVibGljIHN0YXRpYyAgUFJJT1JJVFkgOm51bWJlcj0gMTAwMDA7XG5cbiAgICAgICAgcHVibGljIHByaW9yaXR5Om51bWJlcj0gU2hhcGUuUFJJT1JJVFk7XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgYW5pbWF0aW9uOkFuaW1hdGlvbjtcblxuICAgICAgICBwcm90ZWN0ZWQgX3N0eWxlIDpTdHlsZTtcbiAgICAgICAgICAgIFxuICAgICAgICBwdWJsaWMgc2V0IHN0eWxlKHZhbHVlOlN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBzdHlsZSgpOlN0eWxle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIF9zdHJva2VTdHlsZTpTdHJva2VTdHlsZTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgc3VwZXIobnVsbCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHsgXG4gICAgICAgICAgICB0aGlzLm9uRHJhdyhjYW52YXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3Qgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZDtcblxuICAgICAgICBhYnN0cmFjdCByZWZyZXNoKCk6IHZvaWQ7XG5cbiAgICAgICAgb25Nb3VzZUV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCk6IGJvb2xlYW57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNoYXBlID09PT0gXCIrZXZlbnQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGV4cG9ydCBjbGFzcyBMYWJlbCBleHRlbmRzIFNoYXBlIHtcblxuICAgICAgICBwdWJsaWMgdGV4dDogc3RyaW5nO1xuICAgICAgICBwdWJsaWMgbGFiZWxyZWN0OiBSb3RhdGVSZWN0O1xuICAgICAgICBwdWJsaWMgX3N0eWxlOiBTdHlsZTtcbiAgICAgICAgcHJpdmF0ZSBfeHM6IG51bWJlcltdO1xuICAgICAgICBwcml2YXRlIF95czogbnVtYmVyW107XG4gICAgICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgY3g6IG51bWJlciwgY3k6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIGFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5sYWJlbHJlY3QgPSBuZXcgUm90YXRlUmVjdChjeCwgY3ksIHcsIGgsIChhbmdsZSA9PSBudWxsIHx8IGlzTmFOKGFuZ2xlKSkgPyAwIDogYW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5feHMgPVtdO1xuICAgICAgICAgICAgdGhpcy5feXM9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0ICYmIGkgPCB0aGlzLmxhYmVscmVjdC5wb2ludHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94c1tpXSA9IHRoaXMubGFiZWxyZWN0LnBvaW50c1tpXS54O1xuICAgICAgICAgICAgICAgIHRoaXMuX3lzW2ldID0gdGhpcy5sYWJlbHJlY3QucG9pbnRzW2ldLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3UG9seWdvbih0aGlzLl94cyx0aGlzLl95cyx0aGlzLl9zdHlsZS5iYWNrZ3JvdW5kKTtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3VGV4dCh0aGlzLnRleHQsIHRoaXMubGFiZWxyZWN0LmxlZnRUb3AsIHRoaXMuX3N0eWxlLmZvbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxvdFNoYXBlIGV4dGVuZHMgU2hhcGUge1xuICAgICAgICBwdWJsaWMgbGFiZWw6IExhYmVsO1xuICAgICAgICBkcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5sYWJlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5sYWJlbC5vbkRyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2goKTogdm9pZCB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiAqKiogeW91LCB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBiZWVuIGltcGxlbWVudGVkIHlldCEhISBcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb247XG4gICAgZXhwb3J0IGNsYXNzIEJhclNoYXBlIGV4dGVuZHMgUGxvdFNoYXBlIHtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIHN0eWxlPzogU3R5bGUsIHN0cm9rZVN0eWxlPzogU3Ryb2tlU3R5bGUpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICBsZXQgdG9wOiBudW1iZXIgPSB5O1xuICAgICAgICAgICAgbGV0IGxlZnQ6IG51bWJlciA9IHg7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0OiBudW1iZXIgPSBoO1xuICAgICAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSB3O1xuICAgICAgICAgICAgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSB0b3AgKyBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMoaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGF5b3V0SW5mby5yZXNldChsZWZ0LCB0b3AsIGxlZnQgKyB3aWR0aCwgdG9wICsgaGVpZ2h0LCB0aGlzLnBhZGRpbmcsIDApO1xuICAgICAgICAgICAgdGhpcy5fb2xkTGF5b3V0SW5mbyA9IHRoaXMubGF5b3V0SW5mby5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgIGlmIChzdHlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSBzdHJva2VTdHlsZTtcbiAgICAgICAgICAgIGlmIChzdHJva2VTdHlsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3UmVjdCh0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0LnN0YXJ0UG9pbnQsIHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3QuZW5kUG9pbnQsIHRydWUsIHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgQmFyQW5pbWF0aW9uIGV4dGVuZHMgQW5pbWF0aW9uIHtcbiAgICAgICAgcHJpdmF0ZSByZWN0OiBSZWN0O1xuICAgICAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0KSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5lYXNlID0gbmV3IGFuZHJvaWQudmlldy5hbmltYXRpb24uQm91bmNlQW5pbWF0aW9uRWFzZSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICBhcHBseVRyYW5zZm9ybWF0aW9uKGludGVycG9sYXRlZFRpbWU6IG51bWJlciwgY2FudmFzOiBDYW52YXMsIHZpZXc6IFZpZXcpIHtcbiAgICAgICAgICAgIGlmICh2aWV3IGluc3RhbmNlb2YgQmFyU2hhcGUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBzY2FsZTogbnVtYmVyID0gdGhpcy5mcm9tICsgKHRoaXMudG8gLSB0aGlzLmZyb20pICogaW50ZXJwb2xhdGVkVGltZTtcbiAgICAgICAgICAgICAgICBsZXQgcmVjdDogUmVjdCA9IHRoaXMucmVjdC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHNjYWxlID0gc2NhbGUgLSAxO1xuICAgICAgICAgICAgICAgIC8vIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QubGVmdCA9IHRoaXMucmVjdC5sZWZ0IC0gKHNjYWxlICogdmlldy5sYXlvdXRJbmZvLmlubmVycmVjdC53aWR0aCAvIDIpO1xuICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QudG9wID0gdGhpcy5yZWN0LnRvcCAtIChzY2FsZSAqIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QuaGVpZ2h0ICk7XG4gICAgICAgICAgICAgICAgLy8gdmlldy5sYXlvdXRJbmZvLmlubmVycmVjdC53aWR0aCA9IHRoaXMucmVjdC53aWR0aCArIChzY2FsZSAqIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3Qud2lkdGgpO1xuICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QuaGVpZ2h0ID0gdGhpcy5yZWN0LmhlaWdodCArIChzY2FsZSAqIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhciBoZWlnaHQgIFwiICsgdmlldy5sYXlvdXRJbmZvLmlubmVycmVjdC53aWR0aCArIFwiIHJlY3QuaGVpZ2h0IFwiICsgcmVjdC5oZWlnaHQgKyBcIiBzY2FsZSBcIiArIHNjYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvblN0YXJ0QW5pYW10aW9uKGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KTogdm9pZCB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9uU3RhcnRBbmlhbXRpb24gXCIpO1xuICAgICAgICAgICAgdGhpcy5yZWN0ID0gdmlldy5sYXlvdXRJbmZvLmlubmVycmVjdC5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIG9uRW5kQW5pbWF0aW9uKGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KTogdm9pZCB7XG4gICAgICAgICAgICAvLyB2aWV3LmxheW91dEluZm8uaW5uZXJyZWN0ID0gdGhpcy5yZWN0O1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvbkFuaW1hdGlvbkVuZCBcIiArIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3Qud2lkdGggKyBcIiAgXCIpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld1N0YXRlID0gYW5kcm9pZC52aWV3LlZpZXdTdGF0ZTtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGV4cG9ydCBjbGFzcyBSYWRpYWxCYXJTaGFwZSBleHRlbmRzIFBsb3RTaGFwZSB7XG4gICAgICAgIHByb3RlY3RlZCBfY3g6bnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX2N5Om51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9pbm5lclJhZGl1czpudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfcmFkaXVzOm51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9zdGFydEFuZ2xlOm51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9zd2VlcDpudW1iZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKGN4Om51bWJlcixjeTpudW1iZXIsaW5uZXJSYWRpdXM6bnVtYmVyLHJhZGl1czpudW1iZXIsc3RhcnRBbmdsZTpudW1iZXIsc3dlZXA6bnVtYmVyLHN0eWxlPzpTdHlsZSxzdHJva2VTdHlsZT86U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0SW5mby5yZXNldChjeC1yYWRpdXMsY3ktcmFkaXVzLGN4K3JhZGl1cyxjeStyYWRpdXMsdGhpcy5wYWRkaW5nLDApO1xuICAgICAgICAgICAgdGhpcy5fb2xkTGF5b3V0SW5mbz0gdGhpcy5sYXlvdXRJbmZvLmNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLl9jeCA9IGN4O1xuICAgICAgICAgICAgdGhpcy5fY3kgPSBjeTtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyUmFkaXVzID0gaW5uZXJSYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICAgICAgICAgIHRoaXMuX3N3ZWVwID0gc3dlZXA7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgaWYoc3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPXN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgaWYoc3Ryb2tlU3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5fc3dlZXAgPCAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gdGhpcy5fc3RhcnRBbmdsZSArIHRoaXMuX3N3ZWVwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N3ZWVwID0gdGhpcy5fc3dlZXAgKi0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0RvbnV0KHRoaXMuX2N4LHRoaXMuX2N5LHRoaXMuX3JhZGl1cyx0aGlzLl9pbm5lclJhZGl1cyx0aGlzLl9zdGFydEFuZ2xlLHRoaXMuX3N3ZWVwLHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuICAgIGltcG9ydCBBbmltYXRpb24gPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkFuaW1hdGlvbjtcbiAgICBpbXBvcnQgU2NhbGVBbmltYXRpb24gPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLlNjYWxlQW5pbWF0aW9uO1xuICAgIGV4cG9ydCBjbGFzcyBTY2F0dGVyU2hhcGUgZXh0ZW5kcyBQbG90U2hhcGUge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgc3R5bGU/OiBTdHlsZSwgc3Ryb2tlU3R5bGU/OiBTdHJva2VTdHlsZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAgICAgbGV0IHRvcDogbnVtYmVyID0geTtcbiAgICAgICAgICAgIGxldCBsZWZ0OiBudW1iZXIgPSB4O1xuICAgICAgICAgICAgbGV0IGhlaWdodDogbnVtYmVyID0gaDtcbiAgICAgICAgICAgIGxldCB3aWR0aDogbnVtYmVyID0gdztcbiAgICAgICAgICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgdG9wID0gdG9wICsgaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IE1hdGguYWJzKGhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxheW91dEluZm8ucmVzZXQobGVmdCwgdG9wLCBsZWZ0ICsgd2lkdGgsIHRvcCArIGhlaWdodCwgdGhpcy5wYWRkaW5nLCAwKTtcbiAgICAgICAgICAgIHRoaXMuX29sZExheW91dEluZm8gPSB0aGlzLmxheW91dEluZm8uY2xvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gc3R5bGU7XG4gICAgICAgICAgICBpZiAoc3R5bGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gRGVmYXVsdC5zdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gc3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICBpZiAoc3Ryb2tlU3R5bGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnJlY3QuaGVpZ2h0IDwgMCkge1xuICAgICAgICAgICAgLy8gICAgIGxldCB0b3AgPSB0aGlzLnJlY3QuYm90dG9tO1xuICAgICAgICAgICAgLy8gICAgIGxldCBib3R0b20gPSB0aGlzLnJlY3QudG9wO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucmVjdC50b3AgPSB0b3A7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5yZWN0LmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBTaGFwZS5QUklPUklUWSArIDI7XG5cbiAgICAgICAgfVxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3QXJjKHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3QsIDAsIDIgKiAxODAsIHRoaXMuc3R5bGUuYmFja2dyb3VuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1vdXNlRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNoYXBlID09PT0gXCIgKyBldmVudC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT046XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb246IFNjYXR0ZXJBbmltYXRpb24gPSBuZXcgU2NhdHRlckFuaW1hdGlvbih0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmR1cmF0aW9uID0gNDAwO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJvbSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi50byA9IDEuMjtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmZpbGxBZnRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT1VUOlxuICAgICAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uX291dDogU2NhdHRlckFuaW1hdGlvbiA9IG5ldyBTY2F0dGVyQW5pbWF0aW9uKHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3QpO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25fb3V0LmR1cmF0aW9uID0gMjAwO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25fb3V0LmZyb20gPSAxLjI7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9vdXQudG8gPSAxO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25fb3V0LmZpbGxBZnRlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QW5pbWF0aW9uKGFuaW1hdGlvbl9vdXQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9NT1ZFOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9PVVQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgU2NhdHRlckFuaW1hdGlvbiBleHRlbmRzIEFuaW1hdGlvbiB7XG4gICAgICAgIHByaXZhdGUgcmVjdDogUmVjdDtcbiAgICAgICAgY29uc3RydWN0b3IocmVjdDogUmVjdCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZWFzZSA9IG5ldyBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkJvdW5jZUFuaW1hdGlvbkVhc2UoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgYXBwbHlUcmFuc2Zvcm1hdGlvbihpbnRlcnBvbGF0ZWRUaW1lOiBudW1iZXIsIGNhbnZhczogQ2FudmFzLCB2aWV3OiBWaWV3KSB7XG4gICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIFNjYXR0ZXJTaGFwZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlOiBudW1iZXIgPSB0aGlzLmZyb20gKyAodGhpcy50byAtIHRoaXMuZnJvbSkgKiBpbnRlcnBvbGF0ZWRUaW1lO1xuICAgICAgICAgICAgICAgIC8vIGxldCBkeCA6bnVtYmVyPS12aWV3LmxheW91dEluZm8uaW5uZXJyZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGR5IDpudW1iZXI9LXZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QudG9wO1xuICAgICAgICAgICAgICAgIC8vIGNhbnZhcy50cmFuc2xhdGUoZHgsZHkpO1xuICAgICAgICAgICAgICAgIC8vIGNhbnZhcy5zY2FsZShzY2FsZSxzY2FsZSk7XG4gICAgICAgICAgICAgICAgLy8gY2FudmFzLnRyYW5zbGF0ZSh2aWV3LmxheW91dEluZm8uaW5uZXJyZWN0LndpZHRoLHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmVjdDogUmVjdCA9IHRoaXMucmVjdC5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHNjYWxlID0gc2NhbGUgLSAxO1xuICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QubGVmdCA9IHRoaXMucmVjdC5sZWZ0IC0gKHNjYWxlICogdmlldy5sYXlvdXRJbmZvLmlubmVycmVjdC53aWR0aCAvIDIpO1xuICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QudG9wID0gdGhpcy5yZWN0LnRvcCAtIChzY2FsZSAqIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QuaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICAgICAgdmlldy5sYXlvdXRJbmZvLmlubmVycmVjdC53aWR0aCA9IHRoaXMucmVjdC53aWR0aCArIChzY2FsZSAqIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3Qud2lkdGgpO1xuICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QuaGVpZ2h0ID0gdGhpcy5yZWN0LmhlaWdodCArIChzY2FsZSAqIHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNjYXR0ZXIgd2lkdGggIFwiICsgdmlldy5sYXlvdXRJbmZvLmlubmVycmVjdC53aWR0aCArIFwiIHJlY3Qud2lkdGggXCIgKyByZWN0LndpZHRoICsgXCIgc2NhbGUgXCIgKyBzY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb25TdGFydEFuaWFtdGlvbihjYW52YXM6IENhbnZhcywgdmlldzogVmlldyk6IHZvaWQge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvblN0YXJ0QW5pYW10aW9uIFwiKTtcbiAgICAgICAgICAgIHRoaXMucmVjdCA9IHZpZXcubGF5b3V0SW5mby5pbm5lcnJlY3QuY2xvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICBvbkVuZEFuaW1hdGlvbihjYW52YXM6IENhbnZhcywgdmlldzogVmlldyk6IHZvaWQge1xuICAgICAgICAgICAgLy8gdmlldy5sYXlvdXRJbmZvLmlubmVycmVjdCA9IHRoaXMucmVjdDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25BbmltYXRpb25FbmQgXCIgKyB2aWV3LmxheW91dEluZm8uaW5uZXJyZWN0LndpZHRoICsgXCIgIFwiKTtcblxuICAgICAgICB9XG5cblxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgTGluZXNTaGFwZSBleHRlbmRzIFBsb3RTaGFwZSB7XG4gICAgICAgIHByaXZhdGUgX194czpudW1iZXJbXTtcbiAgICAgICAgcHJpdmF0ZSBfX3lzOm51bWJlcltdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhzOm51bWJlcltdLHlzOm51bWJlcltdLHN0eWxlPzpTdHlsZSxzdHJva2VTdHlsZT86U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBTaGFwZS5QUklPUklUWSArMTtcbiAgICAgICAgICAgIHRoaXMuX194cyA9IHhzO1xuICAgICAgICAgICAgdGhpcy5fX3lzID0geXM7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgaWYoc3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPXN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgaWYoc3Ryb2tlU3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgZ2V0IHN0cm9rZVN0eWxlKCk6U3Ryb2tlU3R5bGV7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlU3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHN0cm9rZVN0eWxlKHZhbHVlOlN0cm9rZVN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY2FudmFzLmRyYXdSZWN0KHRoaXMucmVjdC5zdGFydFBvaW50LHRoaXMucmVjdC5lbmRQb2ludCx0cnVlLHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lcyh0aGlzLl9feHMsdGhpcy5fX3lzLHRoaXMuX3N0cm9rZVN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgQXJlYVNoYXBlIGV4dGVuZHMgUGxvdFNoYXBlIHtcbiAgICAgICAgcHJpdmF0ZSBfX3hzOm51bWJlcltdO1xuICAgICAgICBwcml2YXRlIF9feXM6bnVtYmVyW107XG5cbiAgICAgICAgY29uc3RydWN0b3IoeHM6bnVtYmVyW10seXM6bnVtYmVyW10sc3R5bGU/OlN0eWxlLHN0cm9rZVN0eWxlPzpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5wcmlvcml0eSA9IFNoYXBlLlBSSU9SSVRZICsxO1xuICAgICAgICAgICAgdGhpcy5fX3hzID0geHM7XG4gICAgICAgICAgICB0aGlzLl9feXMgPSB5cztcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gc3R5bGU7XG4gICAgICAgICAgICBpZihzdHlsZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZSA9IERlZmF1bHQuc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9c3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICBpZihzdHJva2VTdHlsZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICBnZXQgc3Ryb2tlU3R5bGUoKTpTdHJva2VTdHlsZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJva2VTdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgc3Ryb2tlU3R5bGUodmFsdWU6U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjYW52YXMuZHJhd1JlY3QodGhpcy5yZWN0LnN0YXJ0UG9pbnQsdGhpcy5yZWN0LmVuZFBvaW50LHRydWUsdGhpcy5fc3R5bGUuYmFja2dyb3VuZCk7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1BvbHlnb24odGhpcy5fX3hzLHRoaXMuX195cyx0aGlzLnN0eWxlLmJhY2tncm91bmQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld1N0YXRlID0gYW5kcm9pZC52aWV3LlZpZXdTdGF0ZTtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGltcG9ydCBQb2ludCA9IGFuZHJvaWQuZ3JhcGhpY3MuUG9pbnQ7XG4gICAgZXhwb3J0IGNsYXNzIEF4aXNMaW5lU2hhcGUgZXh0ZW5kcyBTaGFwZSB7XG4gICAgICAgIHByaXZhdGUgc3RhcnRQb2ludDogUG9pbnQ7XG4gICAgICAgIHByaXZhdGUgZW5kUG9pbnQ6IFBvaW50O1xuICAgICAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZXg6IG51bWJlciwgZXk6IG51bWJlciwgc3Ryb2tlU3R5bGU/OiBTdHJva2VTdHlsZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRQb2ludCA9IG5ldyBQb2ludCh4LCB5KTtcbiAgICAgICAgICAgIHRoaXMuZW5kUG9pbnQgPSBuZXcgUG9pbnQoZXgsIGV5KTtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gc3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICBpZiAoc3Ryb2tlU3R5bGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKHRoaXMuc3RhcnRQb2ludCwgdGhpcy5lbmRQb2ludCxcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHJlZnJlc2goKSB7IH1cbiAgICB9XG59XG4iLCJuYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDsgICAgXG4gICAgLyoqXG4gICAgICogQmFzZUxheW91dFxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBCYXNlTGF5b3V0e1xuICAgICAgICBwcm90ZWN0ZWQgX19zaGFwZWxpc3QgOlNoYXBlW10gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGNvbnZlcnQoLi4uYXJncyk6U2hhcGVbXXtcbiAgICAgICAgICAgIHRocm93ICdmdWNrIEVycm9yJztcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IHNoYXBlTGlzdCgpOlNoYXBlW117XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NoYXBlbGlzdDtcbiAgICAgICAgfVxuICAgICAgICByZWFkb25seSBzY2FsZVBhaXJzIDogeyAgc2VyaWVzOnN0cmluZ1tdLGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXTsgICAgICAgICAgICBcbiAgICB9XG5cblxuICAgICAgICBcbiAgXG4gICBcbiAgICBcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2FydGVzaWFuTGF5b3V0IGV4dGVuZHMgQmFzZUxheW91dCB7XG4gICAgICAgIHB1YmxpYyBiYXJTdHlsZTogU3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICBwdWJsaWMgbGluZVN0eWxlOiBTdHJva2VTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgIHByb3RlY3RlZCBfX3NjYWxlUGFpcnM6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdO1xuICAgICAgICBwcm90ZWN0ZWQgX2xvY2F0aW9uQ2FjaGU6IHsga2V5OiBzdHJpbmcgfCBudW1iZXIsIHBvaW50czogYW55W10gfVtdID0gW107XG4gICAgICAgIHByb3RlY3RlZCBfc2VyaWVzbGlzdDogU2VyaWVzW107XG4gICAgICAgIHByb3RlY3RlZCBfc3RhY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgcHJvdGVjdGVkIF9yZWN0OiBSZWN0ID0gbnVsbDtcbiAgICAgICAgcHJvdGVjdGVkIF9lbmNvZGluZzogRW5jb2Rpbmc7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnZlcnQoc2VyaWVzbGlzdDogU2VyaWVzW10sIGVuY29kaW5nOiBFbmNvZGluZywgcmVjdDogUmVjdCk6IFNoYXBlW10ge1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5fc2VyaWVzbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgc2VyIG9mIHNlcmllc2xpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZXNsaXN0LnB1c2goc2VyLmNsb25lKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uQ2FjaGUgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzID0gW107XG4gICAgICAgICAgICB0aGlzLl9zdGFjayA9IGVuY29kaW5nLl9zdGFjaztcbiAgICAgICAgICAgIHRoaXMuX3JlY3QgPSByZWN0O1xuICAgICAgICAgICAgdGhpcy5fX2FuYWx5c2VTY2FsZXMoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dFNlcmllcyh0aGlzLl9zZXJpZXNsaXN0W2ldLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2hhcGVsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfX2FuYWx5c2VTY2FsZXMoKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVMYXlvdXRTY2FsZXModGhpcy5fZW5jb2RpbmcpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBzZXIgb2YgdGhpcy5fc2VyaWVzbGlzdCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNjYWxlcGFpciBvZiBzZXIuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gc2NhbGVwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gc2NhbGVwYWlyLnNjYWxlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5uYW1lID09ICd4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVkLmJhbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2VCb3VuZHMoW3RoaXMuX3JlY3QubGVmdCwgdGhpcy5fcmVjdC5yaWdodF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9yZWN0LmxlZnQsIHRoaXMuX3JlY3QucmlnaHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9yZWN0LmxlZnQsIHRoaXMuX3JlY3QucmlnaHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlZC5uYW1lID09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVkLmJhbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2VCb3VuZHMoW3RoaXMuX3JlY3QuYm90dG9tLCB0aGlzLl9yZWN0LnRvcF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9yZWN0LmJvdHRvbSwgdGhpcy5fcmVjdC50b3BdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aWNrZXI6IExpbmVhclRpY2tzID0gTGluZWFyVGlja3MuY3JlYXRlKHNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHRpY2tlci5uaWNlU2NhbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShbdGhpcy5fcmVjdC5ib3R0b20sIHRoaXMuX3JlY3QudG9wXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jcmVhdGVMYXlvdXRTY2FsZXMoZW5jb2Rpbmc6IEVuY29kaW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2VyaWVzbGlzdC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXM6IFNlcmllcyA9IHRoaXMuX3Nlcmllc2xpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2Ygc2VyaWVzLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlZDogRmllbGQgPSBwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc2FkZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwIG9mIHRoaXMuX19zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwLmZpbGVkLmVxdWFscyhmaWxlZCkgfHwgIXAuc2NhbGUuZXF1YWwocGFpci5zY2FsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzYWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLnNlcmllcy5wdXNoKHNlcmllcy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNhZGRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFtzZXJpZXMubmFtZV0sIGZpbGVkOiBmaWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9fc2NhbGVQYWlycyA9IHRoaXMuX3Nlcmllc2xpc3RbMF0uc2NhbGVQYWlycztcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBTZXJpZXMgPSB0aGlzLl9zZXJpZXNsaXN0WzBdO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goe3Nlcmllczpbc2VyaWVzLm5hbWVdLCBmaWxlZDogc2VyaWVzLmZpbGVkLCBzY2FsZTogcGFpci5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHNlcmllcy5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFtzZXJpZXMubmFtZV0sIGZpbGVkOiBwYWlyLmZpbGVkLCBzY2FsZTogcGFpci5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbWF4U2VyaWVzU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IHhzY2FsZSA9IHRoaXMuX2dldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBpZiAoeHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHhzY2FsZS5kb21haW5zLmxlbmd0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxpdHkubWF4KHRoaXMuX3Nlcmllc2xpc3QubWFwKChzZXI6IFNlcmllcywgaW5kZXg6IG51bWJlciwgYXJyYXk6IFNlcmllc1tdKSA9PiB7IHJldHVybiBzZXIuc2l6ZTsgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfbGF5b3V0U2VyaWVzKHNlcmllczogU2VyaWVzLCBpbmRleDogbnVtYmVyKTogdm9pZDtcblxuXG4gICAgICAgIGdldCBzY2FsZVBhaXJzKCk6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2NhbGVQYWlycztcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9nZXRTY2FsZShuYW1lOiBzdHJpbmcpOiBTY2FsZSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLl9fc2NhbGVQYWlycywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5maWxlZC5uYW1lID09IG5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2NhbGVQYWlyc1tpbmRleF0uc2NhbGU7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIEJhckxheW91dCBleHRlbmRzIENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgZ2V0IGJhcldpZHRoKCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Qud2lkdGgvdGhpcy5tYXhTZXJpZXNTaXplLyh0aGlzLl9zdGFjaz8xOnRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoKSAqMC45O1xuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0U2VyaWVzKHNlcmllczpTZXJpZXMsaW5kZXg6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCB4U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGxldCB5U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3knKTtcbiAgICAgICAgICAgIGxldCBjb2xvclNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdjb2xvcicpO1xuICAgICAgICAgICAgbGV0IGNvbG9yQXJyYXk6c3RyaW5nW109W107XG4gICAgICAgICAgICBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKXtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlID0gY29sb3JTY2FsZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBDb2xvclV0aWxzLmdyYWRpZW50Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sKDxPcmRpbmFsU2NhbGU+Y29sb3JTY2FsZSkuZG9tYWlucy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbG9yU2NhbGUucmFuZ2UoWzAsKDxPcmRpbmFsU2NhbGU+Y29sb3JTY2FsZSkuZG9tYWlucy5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlZmF1bHRjb2xvcjpzdHJpbmcgPUNvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgZm9yKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKXtcbiAgICAgICAgICAgICAgICBpZiggcHQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4dmFsdWUgOlZhbHVlPSBwdC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeXZhbHVlIDpWYWx1ZT0gcHQueTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9ydmFsdWUgOlZhbHVlID0gcHQuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFwZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA6VmFsdWU9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSArKHRoaXMuX3N0YWNrID8wOigoaW5kZXggLSAodGhpcy5fc2VyaWVzbGlzdC5sZW5ndGgtMSkvMikgKiB0aGlzLmJhcldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5MCA9IHl2YWx1ZS5pc011bHRpcGxlPyB5dmFsdWUudmFsdWVbMF06KHlTY2FsZS5taW48MD8wOnlTY2FsZS5taW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTEgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl0b3A6bnVtYmVyID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeTEpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgOnN0cmluZyA9IGRlZmF1bHRjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JpbmRleCA9IGNvbG9yU2NhbGUuZ2V0U2NhbGVWYWx1ZShjb2xvcnZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGNvbG9yQXJyYXlbY29sb3JpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9yVXRpbHMuZ2V0Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sY29sb3J2YWx1ZS52YWx1ZSxjb2xvclNjYWxlLm1pbixjb2xvclNjYWxlLm1heCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHlib3R0b20gOm51bWJlciA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoeTAgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh5U2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5MCBcIiArIHkwICsgXCIgeUJvdHRvbSBcIiArIHlib3R0b20pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHhsZWZ0IDpudW1iZXIgPSB4LSAgdGhpcy5iYXJXaWR0aC8yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHJpZ2h0IDpudW1iZXIgPSB4ICt0aGlzLmJhcldpZHRoLzI7XG4gICAgICAgICAgICAgICAgICAgIGxldCBiYXJTaGFwZTpCYXJTaGFwZSA9IG5ldyBCYXJTaGFwZSh4bGVmdCx5dG9wLHhyaWdodC14bGVmdCx5Ym90dG9tLXl0b3ApO1xuICAgICAgICAgICAgICAgICAgICBiYXJTaGFwZS5zdHlsZSA9IG5ldyBTdHlsZShcImdyYXlcIixEZWZhdWx0LmZvbnQsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFyU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhclNoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKGJhclNoYXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFNjYXR0ZXJMYXlvdXQgZXh0ZW5kcyBDYXJ0ZXNpYW5MYXlvdXR7XG4gICAgICAgIGdldCBiYXJXaWR0aCgpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWN0LndpZHRoL3RoaXMubWF4U2VyaWVzU2l6ZS8odGhpcy5fc3RhY2s/MTp0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCkgKjAuOTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6U2VyaWVzLGluZGV4Om51bWJlcik6dm9pZHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgeFNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgnY29sb3InKTtcbiAgICAgICAgICAgIGxldCBzaXplU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3NpemUnKTtcbiAgICAgICAgICAgIGxldCBkZWZhdWx0Y29sb3I6c3RyaW5nID1Db2xvclV0aWxzLmluZGV4Q29sb3Ioc2VyaWVzLmluZGV4KTtcbiAgICAgICAgICAgIGxldCBjb2xvckFycmF5OnN0cmluZ1tdPVtdO1xuICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZSA9IGNvbG9yU2NhbGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBjb2xvckFycmF5ID0gQ29sb3JVdGlscy5ncmFkaWVudENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlLnJhbmdlKFswLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZWZhdWx0c2l6ZTpudW1iZXIgPSAxMDtcbiAgICAgICAgICAgIGZvcihsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cyl7XG4gICAgICAgICAgICAgICAgaWYoIHB0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvclZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGVWYWx1ZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZVZhbHVlIDpWYWx1ZT0gcHQuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSB4U2NhbGUuZ2V0U2NhbGVWYWx1ZSh4dmFsdWUudmFsdWUpIDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHk6bnVtYmVyID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeXZhbHVlLmlzTXVsdGlwbGU/eXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzIDpudW1iZXIgPSBzaXplU2NhbGUuZ2V0U2NhbGVWYWx1ZShzaXplVmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZihpc05hTihzKSB8fCBzID09IG51bGwgfHwgcyA8PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IGRlZmF1bHRzaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IGRlZmF1bHRjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JpbmRleCA9IGNvbG9yU2NhbGUuZ2V0U2NhbGVWYWx1ZShjb2xvclZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGNvbG9yQXJyYXlbY29sb3JpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9yVXRpbHMuZ2V0Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sY29sb3JWYWx1ZS52YWx1ZSxjb2xvclNjYWxlLm1pbixjb2xvclNjYWxlLm1heCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYXR0ZXJTaGFwZSA6U2NhdHRlclNoYXBlID0gbmV3IFNjYXR0ZXJTaGFwZSh4LXMvMix5LXMvMixzLHMsRGVmYXVsdC5zdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlclNoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlclNoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKHNjYXR0ZXJTaGFwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0TGluZSgpe1xuICAgICAgICB9ICAgICAgICAgICAgXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJhZGlhbENhcnRlc2lhbkxheW91dCBleHRlbmRzIEJhc2VMYXlvdXQge1xuICAgICAgICBwdWJsaWMgYmFyU3R5bGU6IFN0eWxlID0gRGVmYXVsdC5zdHlsZTtcbiAgICAgICAgcHVibGljIGxpbmVTdHlsZTogU3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICBwcm90ZWN0ZWQgX19zY2FsZVBhaXJzOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXTtcbiAgICAgICAgcHJvdGVjdGVkIF9sb2NhdGlvbkNhY2hlOiB7IGtleTogc3RyaW5nIHwgbnVtYmVyLCBwb2ludHM6IGFueVtdIH1bXSA9IFtdO1xuICAgICAgICBwcm90ZWN0ZWQgX3Nlcmllc2xpc3Q6IFNlcmllc1tdO1xuICAgICAgICBwcm90ZWN0ZWQgX3N0YWNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByb3RlY3RlZCBfZW5jb2Rpbmc6IEVuY29kaW5nO1xuICAgICAgICBwcm90ZWN0ZWQgX2N4OiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfY3k6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9pbm5lclJhZGl1czogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX3JhZGl1czogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX3N0YXJ0QW5nbGU6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9lbmRBbmdsZTogbnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udmVydChzZXJpZXNsaXN0OiBTZXJpZXNbXSwgZW5jb2Rpbmc6IEVuY29kaW5nLCBjeDogbnVtYmVyLCBjeTogbnVtYmVyLCBpbm5lclJhZGl1czogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgc3RhcnRBbmdsZTogbnVtYmVyLCBlbmRBbmdsZTogbnVtYmVyKTogU2hhcGVbXSB7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9zZXJpZXNsaXN0ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBzZXIgb2Ygc2VyaWVzbGlzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nlcmllc2xpc3QucHVzaChzZXIuY2xvbmUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lbmNvZGluZyA9IGVuY29kaW5nO1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25DYWNoZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3N0YWNrID0gZW5jb2RpbmcuX3N0YWNrO1xuICAgICAgICAgICAgdGhpcy5fY3ggPSBjeDtcbiAgICAgICAgICAgIHRoaXMuX2N5ID0gY3k7XG4gICAgICAgICAgICB0aGlzLl9pbm5lclJhZGl1cyA9IGlubmVyUmFkaXVzO1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRBbmdsZSA9IHN0YXJ0QW5nbGU7XG4gICAgICAgICAgICB0aGlzLl9lbmRBbmdsZSA9IGVuZEFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5fX2FuYWx5c2VTY2FsZXMoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dFNlcmllcyh0aGlzLl9zZXJpZXNsaXN0W2ldLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2hhcGVsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfX2FuYWx5c2VTY2FsZXMoKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVMYXlvdXRTY2FsZXModGhpcy5fZW5jb2RpbmcpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBzZXIgb2YgdGhpcy5fc2VyaWVzbGlzdCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNjYWxlcGFpciBvZiBzZXIuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gc2NhbGVwYWlyLmZpbGVkO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gc2NhbGVwYWlyLnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZWQubmFtZSA9PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5iYW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlQm91bmRzKFt0aGlzLl9pbm5lclJhZGl1cywgdGhpcy5fcmFkaXVzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2UoW3RoaXMuX2lubmVyUmFkaXVzLCB0aGlzLl9yYWRpdXNdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9pbm5lclJhZGl1cywgdGhpcy5fcmFkaXVzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZWQubmFtZSA9PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5iYW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlQm91bmRzKFt0aGlzLl9zdGFydEFuZ2xlLCB0aGlzLl9lbmRBbmdsZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9zdGFydEFuZ2xlLCB0aGlzLl9lbmRBbmdsZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpY2tlcjogTGluZWFyVGlja3MgPSBMaW5lYXJUaWNrcy5jcmVhdGUoc2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gdGlja2VyLm5pY2VTY2FsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9zdGFydEFuZ2xlLCB0aGlzLl9lbmRBbmdsZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlTGF5b3V0U2NhbGVzKGVuY29kaW5nOiBFbmNvZGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBTZXJpZXMgPSB0aGlzLl9zZXJpZXNsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHNlcmllcy5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gcGFpci5maWxlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNhZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLl9fc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcC5maWxlZC5lcXVhbHMoZmlsZWQpIHx8ICFwLnNjYWxlLmVxdWFsKHBhaXIuc2NhbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2FkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5zZXJpZXMucHVzaChzZXJpZXMubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzYWRkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWVdLCBmaWxlZDogZmlsZWQsIHNjYWxlOiBwYWlyLnNjYWxlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fX3NjYWxlUGFpcnMgPSB0aGlzLl9zZXJpZXNsaXN0WzBdLnNjYWxlUGFpcnM7XG4gICAgICAgICAgICAgICAgbGV0IHNlcmllczogU2VyaWVzID0gdGhpcy5fc2VyaWVzbGlzdFswXTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHtzZXJpZXM6W3Nlcmllcy5uYW1lXSwgZmlsZWQ6IHNlcmllcy5maWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiBzZXJpZXMuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWVdLCBmaWxlZDogcGFpci5maWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG1heFNlcmllc1NpemUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGxldCB4c2NhbGUgPSB0aGlzLl9nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgaWYgKHhzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4c2NhbGUuZG9tYWlucy5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsaXR5Lm1heCh0aGlzLl9zZXJpZXNsaXN0Lm1hcCgoc2VyOiBTZXJpZXMsIGluZGV4OiBudW1iZXIsIGFycmF5OiBTZXJpZXNbXSkgPT4geyByZXR1cm4gc2VyLnNpemU7IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2xheW91dFNlcmllcyhzZXJpZXM6IFNlcmllcywgaW5kZXg6IG51bWJlcik6IHZvaWQ7XG5cbiAgICAgICAgLy8gcHJvdGVjdGVkIF9wcmVBbmFseXNlU2VyaWVzKCkge1xuICAgICAgICAvLyAgICAgZm9yIChsZXQgc2VyIG9mIHRoaXMuX3Nlcmllc2xpc3QpIHtcbiAgICAgICAgLy8gICAgICAgICBmb3IgKGxldCBwdCBvZiBzZXIucG9pbnRzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCB4dmFsdWUgPSBwdC54O1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLl9sb2NhdGlvbkNhY2hlLCAna2V5JywgeHZhbHVlLnZhbHVlKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xvY2F0aW9uQ2FjaGVbaW5kZXhdICE9IG51bGwpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbkNhY2hlW2luZGV4XS5wb2ludHMucHVzaChwdCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uQ2FjaGUucHVzaCh7IGtleTogeHZhbHVlLnZhbHVlLCBwb2ludHM6IFtwdF0gfSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgZ2V0IHNjYWxlUGFpcnMoKTogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zY2FsZVBhaXJzO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX2dldFNjYWxlKG5hbWU6IHN0cmluZyk6IFNjYWxlIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IF8uZmluZEluZGV4KHRoaXMuX19zY2FsZVBhaXJzLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmZpbGVkLm5hbWUgPT0gbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zY2FsZVBhaXJzW2luZGV4XS5zY2FsZTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsQmFyTGF5b3V0IGV4dGVuZHMgUmFkaWFsQ2FydGVzaWFuTGF5b3V0e1xuICAgICAgICBnZXQgYmFyV2lkdGgoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX3JhZGl1cy10aGlzLl9pbm5lclJhZGl1cykvdGhpcy5tYXhTZXJpZXNTaXplLyh0aGlzLl9zdGFjaz8xOnRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoKSAqMC45O1xuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0U2VyaWVzKHNlcmllczpTZXJpZXMsaW5kZXg6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCB4U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGxldCB5U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3knKTtcbiAgICAgICAgICAgIGxldCBjb2xvclNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdjb2xvcicpO1xuICAgICAgICAgICAgbGV0IGNvbG9yQXJyYXk6c3RyaW5nW109W107XG4gICAgICAgICAgICBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKXtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlID0gY29sb3JTY2FsZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIGNvbG9yQXJyYXkgPSBDb2xvclV0aWxzLmdyYWRpZW50Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sKDxPcmRpbmFsU2NhbGU+Y29sb3JTY2FsZSkuZG9tYWlucy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbG9yU2NhbGUucmFuZ2UoWzAsKDxPcmRpbmFsU2NhbGU+Y29sb3JTY2FsZSkuZG9tYWlucy5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlZmF1bHRjb2xvcjpzdHJpbmcgPUNvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgZm9yKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKXtcbiAgICAgICAgICAgICAgICBpZiggcHQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4dmFsdWUgOlZhbHVlPSBwdC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeXZhbHVlIDpWYWx1ZT0gcHQueTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9ydmFsdWUgOlZhbHVlID0gcHQuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFwZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA6VmFsdWU9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSArKHRoaXMuX3N0YWNrID8wOigoaW5kZXggLSAodGhpcy5fc2VyaWVzbGlzdC5sZW5ndGgtMSkvMikgKiB0aGlzLmJhcldpZHRoKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5MCA9IHl2YWx1ZS5pc011bHRpcGxlPyB5dmFsdWUudmFsdWVbMF06KHlTY2FsZS5taW48MD8wOnlTY2FsZS5taW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTEgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHlFbmRBbmdsZTpudW1iZXIgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZSh5MSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA6c3RyaW5nID0gZGVmYXVsdGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcmluZGV4ID0gY29sb3JTY2FsZS5nZXRTY2FsZVZhbHVlKGNvbG9ydmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gY29sb3JBcnJheVtjb2xvcmluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JVdGlscy5nZXRDb2xvcihjb2xvclNjYWxlLnN0YXJ0UG9zaXRpb24sY29sb3JTY2FsZS5lbmRQb3NpdGlvbixjb2xvcnZhbHVlLnZhbHVlLGNvbG9yU2NhbGUubWluLGNvbG9yU2NhbGUubWF4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgeVN0YXJ0QW5nbGUgOm51bWJlciA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkwKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhJbm5lclJhZGl1cyA6bnVtYmVyID0geC0gIHRoaXMuYmFyV2lkdGgvMjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhPdXR0ZXJSYWRpdXMgOm51bWJlciA9IHggK3RoaXMuYmFyV2lkdGgvMjtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGJhclNoYXBlOkJhclNoYXBlID0gbmV3IEJhclNoYXBlKHhsZWZ0LHlFbmRBbmdsZSx4cmlnaHQteGxlZnQseWJvdHRvbS15RW5kQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmFyU2hhcGUgOlJhZGlhbEJhclNoYXBlID0gbmV3IFJhZGlhbEJhclNoYXBlKHRoaXMuX2N4LHRoaXMuX2N5LHhJbm5lclJhZGl1cyx4T3V0dGVyUmFkaXVzLHlTdGFydEFuZ2xlLHlFbmRBbmdsZS15U3RhcnRBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIGJhclNoYXBlLnN0eWxlID0gbmV3IFN0eWxlKFwiZ3JheVwiLERlZmF1bHQuZm9udCxEZWZhdWx0LnN0cm9rZXN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sb3IgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFyU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IGRlZmF1bHRjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2goYmFyU2hhcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsTGluZUxheW91dCBleHRlbmRzIFJhZGlhbENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRTZXJpZXMoc2VyaWVzOlNlcmllcyxpbmRleDpudW1iZXIpOnZvaWR7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgbGV0IHlTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneScpO1xuICAgICAgICAgICAgbGV0IGNvbG9yU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgeHM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgeXM6bnVtYmVyW109W107XG4gICAgICAgICAgICBmb3IobGV0IHB0IG9mIHNlcmllcy5wb2ludHMpe1xuICAgICAgICAgICAgICAgIGlmKCBwdCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcnZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgOlZhbHVlPSBwdC5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCByYWRpdXM6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSA7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZ2xlID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeXZhbHVlLmlzTXVsdGlwbGU/IHl2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy5fY3kgKyBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIHhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHlzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxpbmVzU2hhcGU6TGluZXNTaGFwZSA9IG5ldyBMaW5lc1NoYXBlKHhzLHlzLG51bGwsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgICAgICBsaW5lc1NoYXBlLnN0cm9rZVN0eWxlLnN0cm9rZUNvbG9yID0gQ29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2gobGluZXNTaGFwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKXtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsQXJlYUxheW91dCBleHRlbmRzIFJhZGlhbENhcnRlc2lhbkxheW91dCB7XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0U2VyaWVzKHNlcmllczogU2VyaWVzLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTogU2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGxldCB5U2NhbGU6IFNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTogU2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgeHM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBsZXQgeXM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHB0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlOiBWYWx1ZSA9IHB0Lng7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5dmFsdWU6IFZhbHVlID0gcHQueTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9ydmFsdWU6IFZhbHVlID0gcHQuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFwZTogVmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemU6IFZhbHVlID0gcHQuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSB4U2NhbGUuZ2V0U2NhbGVWYWx1ZSh4dmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGVWYWx1ZTAgPSB5dmFsdWUuaXNNdWx0aXBsZSA/IHl2YWx1ZS52YWx1ZVswXSA6ICh5U2NhbGUubWluIDwgMCA/IDAgOiB5U2NhbGUubWluKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZ2xlVmFsdWUxID0geXZhbHVlLmlzTXVsdGlwbGUgPyB5dmFsdWUudmFsdWVbMV0gOiB5dmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZTAgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZShhbmdsZVZhbHVlMCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZTEgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZShhbmdsZVZhbHVlMSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvciA9IGNvbG9yU2NhbGUuZ2V0U2NhbGVWYWx1ZShjb2xvcnZhbHVlLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeDAgPSB0aGlzLl9jeCArIE1hdGguY29zKGFuZ2xlMCkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5MCA9IHRoaXMuX2N5ICsgTWF0aC5zaW4oYW5nbGUwKSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9jeCArIE1hdGguY29zKGFuZ2xlMSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy5fY3kgKyBNYXRoLnNpbihhbmdsZTEpICogcmFkaXVzO1xuXG4gICAgICAgICAgICAgICAgICAgIHhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHlzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgICAgIHhzLnVuc2hpZnQoeDApO1xuICAgICAgICAgICAgICAgICAgICB5cy51bnNoaWZ0KHkwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGluZXNTaGFwZTogQXJlYVNoYXBlID0gbmV3IEFyZWFTaGFwZSh4cywgeXMsIG51bGwsIERlZmF1bHQuc3Ryb2tlc3R5bGUpO1xuICAgICAgICAgICAgbGluZXNTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gQ29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2gobGluZXNTaGFwZSk7XG5cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKSB7XG5cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsU2NhdHRlckxheW91dCBleHRlbmRzIFJhZGlhbENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgZ2V0IGJhcldpZHRoKCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9yYWRpdXMtdGhpcy5faW5uZXJSYWRpdXMpL3RoaXMubWF4U2VyaWVzU2l6ZS8odGhpcy5fc3RhY2s/MTp0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCkgKjAuOTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6U2VyaWVzLGluZGV4Om51bWJlcik6dm9pZHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgeFNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgnY29sb3InKTtcbiAgICAgICAgICAgIGxldCBzaXplU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3NpemUnKTtcbiAgICAgICAgICAgIGxldCBkZWZhdWx0Y29sb3I6c3RyaW5nID1Db2xvclV0aWxzLmluZGV4Q29sb3Ioc2VyaWVzLmluZGV4KTtcbiAgICAgICAgICAgIGxldCBjb2xvckFycmF5OnN0cmluZ1tdPVtdO1xuICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZSA9IGNvbG9yU2NhbGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBjb2xvckFycmF5ID0gQ29sb3JVdGlscy5ncmFkaWVudENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlLnJhbmdlKFswLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZWZhdWx0c2l6ZTpudW1iZXIgPSAxMDtcbiAgICAgICAgICAgIGZvcihsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cyl7XG4gICAgICAgICAgICAgICAgaWYoIHB0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvclZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGVWYWx1ZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZVZhbHVlIDpWYWx1ZT0gcHQuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOm51bWJlciA9IHhTY2FsZS5nZXRTY2FsZVZhbHVlKHh2YWx1ZS52YWx1ZSkgO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGU6bnVtYmVyID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeXZhbHVlLmlzTXVsdGlwbGU/eXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzIDpudW1iZXIgPSBzaXplU2NhbGUuZ2V0U2NhbGVWYWx1ZShzaXplVmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZihpc05hTihzKSB8fCBzID09IG51bGwgfHwgcyA8PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IGRlZmF1bHRzaXplO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmFkaXVzIFwiICsgcmFkaXVzICtcIiBhbmdsZSBcIiArIGFuZ2xlICk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yaW5kZXggPSBjb2xvclNjYWxlLmdldFNjYWxlVmFsdWUoY29sb3JWYWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBjb2xvckFycmF5W2NvbG9yaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvclV0aWxzLmdldENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLGNvbG9yVmFsdWUudmFsdWUsY29sb3JTY2FsZS5taW4sY29sb3JTY2FsZS5tYXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy5fY3kgKyBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2F0dGVyU2hhcGUgOlNjYXR0ZXJTaGFwZSA9IG5ldyBTY2F0dGVyU2hhcGUoeC1zLzIseS1zLzIscyxzLERlZmF1bHQuc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2xvciAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gZGVmYXVsdGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZWxpc3QucHVzaChzY2F0dGVyU2hhcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKXtcbiAgICAgICAgfSAgICAgICAgICAgIFxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgTGluZUxheW91dCBleHRlbmRzIENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRTZXJpZXMoc2VyaWVzOlNlcmllcyxpbmRleDpudW1iZXIpOnZvaWR7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgbGV0IHlTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneScpO1xuICAgICAgICAgICAgLy8gbGV0IGNvbG9yU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgeHM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgeXM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgZGVmYXVsdGNvbG9yOnN0cmluZyA9Q29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICBmb3IobGV0IHB0IG9mIHNlcmllcy5wb2ludHMpe1xuICAgICAgICAgICAgICAgIGlmKCBwdCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcnZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgOlZhbHVlPSBwdC5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4Om51bWJlciA9IHhTY2FsZS5nZXRTY2FsZVZhbHVlKHh2YWx1ZS52YWx1ZSkgO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0geXZhbHVlLmlzTXVsdGlwbGU/IHl2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgeSA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgY29sb3IgPSBjb2xvclNjYWxlLmdldFNjYWxlVmFsdWUoY29sb3J2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHlzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxpbmVzU2hhcGU6TGluZXNTaGFwZSA9IG5ldyBMaW5lc1NoYXBlKHhzLHlzLG51bGwsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgICAgICBsaW5lc1NoYXBlLnN0cm9rZVN0eWxlLnN0cm9rZUNvbG9yID0gQ29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2gobGluZXNTaGFwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKXtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGV4cG9ydCBjbGFzcyBBcmVhTGF5b3V0IGV4dGVuZHMgQ2FydGVzaWFuTGF5b3V0e1xuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6U2VyaWVzLGluZGV4Om51bWJlcik6dm9pZHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgeFNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgnY29sb3InKTtcbiAgICAgICAgICAgIGxldCB4czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIGxldCB5czpudW1iZXJbXT1bXTtcbiAgICAgICAgICAgIGZvcihsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cyl7XG4gICAgICAgICAgICAgICAgaWYoIHB0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwdCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4dmFsdWUgOlZhbHVlPSBwdC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeXZhbHVlIDpWYWx1ZT0gcHQueTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9ydmFsdWUgOlZhbHVlID0gcHQuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFwZTpWYWx1ZSA9IHB0LnNoYXBlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA6VmFsdWU9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSA7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5MCA9IHl2YWx1ZS5pc011bHRpcGxlPyB5dmFsdWUudmFsdWVbMF06KHlTY2FsZS5taW48MD8wOnlTY2FsZS5taW4pO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTEgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzFdOnl2YWx1ZS52YWx1ZTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB5MCA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkwKTtcbiAgICAgICAgICAgICAgICAgICAgeTEgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZSh5MSk7XG4gICAgICAgICAgICAgICAgICAgIHhzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIHlzLnB1c2goeTApO1xuICAgICAgICAgICAgICAgICAgICB4cy51bnNoaWZ0KHgpO1xuICAgICAgICAgICAgICAgICAgICB5cy51bnNoaWZ0KHkxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGluZXNTaGFwZTpBcmVhU2hhcGUgPSBuZXcgQXJlYVNoYXBlKHhzLHlzLG51bGwsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgICAgICBsaW5lc1NoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBDb2xvclV0aWxzLmluZGV4Q29sb3Ioc2VyaWVzLmluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuX19zaGFwZWxpc3QucHVzaChsaW5lc1NoYXBlKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0TGluZSgpe1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBjb25zdCBlMTA6IG51bWJlciA9IE1hdGguc3FydCg1MCk7XG4gICAgY29uc3QgZTU6IG51bWJlciA9IE1hdGguc3FydCgxMCk7XG4gICAgY29uc3QgZTI6IG51bWJlciA9IE1hdGguc3FydCgyKTtcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgVGlja3Mge1xuICAgICAgICBwcm90ZWN0ZWQgX3NjYWxlOiBTY2FsZTtcbiAgICAgICAgcHJvdGVjdGVkIF90aWNrczogYW55W107XG4gICAgICAgIGNvbnN0cnVjdG9yKHNjYWxlOiBTY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcblxuICAgICAgICAgICAgdGhpcy5fdGlja3MgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBjcmVhdGUoc2NhbGU6IFNjYWxlLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcik6IFRpY2tzIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgY3JlYXRlVGlja3MoY291bnQ/Om51bWJlcik6IHZvaWQ7XG5cbiAgICAgICAgcHJvdGVjdGVkIF9jcmVhdGVUaWNrcyhzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIsIGNvdW50OiBudW1iZXIpIHtcblxuICAgICAgICAgICAgdmFyIHJldmVyc2UgPSBzdG9wIDwgc3RhcnQsXG4gICAgICAgICAgICAgICAgaSA9IC0xLFxuICAgICAgICAgICAgICAgIG4sXG4gICAgICAgICAgICAgICAgdGlja3MsXG4gICAgICAgICAgICAgICAgc3RlcDtcblxuICAgICAgICAgICAgaWYgKHJldmVyc2UpIG4gPSBzdGFydCwgc3RhcnQgPSBzdG9wLCBzdG9wID0gbjtcblxuICAgICAgICAgICAgaWYgKChzdGVwID0gdGhpcy5fdGlja0luY3JlbWVudChzdGFydCwgc3RvcCwgY291bnQpKSA9PT0gMCB8fCAhaXNGaW5pdGUoc3RlcCkpIHJldHVybiBbXTtcblxuICAgICAgICAgICAgaWYgKHN0ZXAgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBNYXRoLmNlaWwoc3RhcnQgLyBzdGVwKTtcbiAgICAgICAgICAgICAgICBzdG9wID0gTWF0aC5mbG9vcihzdG9wIC8gc3RlcCk7XG4gICAgICAgICAgICAgICAgdGlja3MgPSBuZXcgQXJyYXkobiA9IE1hdGguY2VpbChzdG9wIC0gc3RhcnQgKyAxKSk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsraSA8IG4pIHRpY2tzW2ldID0gKHN0YXJ0ICsgaSkgKiBzdGVwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IE1hdGguZmxvb3Ioc3RhcnQgKiBzdGVwKTtcbiAgICAgICAgICAgICAgICBzdG9wID0gTWF0aC5jZWlsKHN0b3AgKiBzdGVwKTtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IG5ldyBBcnJheShuID0gTWF0aC5jZWlsKHN0YXJ0IC0gc3RvcCArIDEpKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKytpIDwgbikgdGlja3NbaV0gPSAoc3RhcnQgLSBpKSAvIHN0ZXA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXZlcnNlKSB0aWNrcy5yZXZlcnNlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBfdGlja0luY3JlbWVudChzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIsIGNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgICAgIGxldCBzdGVwOiBudW1iZXIgPSAoc3RvcCAtIHN0YXJ0KSAvIE1hdGgubWF4KDAsIGNvdW50KSxcbiAgICAgICAgICAgICAgICBwb3dlcjogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLmxvZyhzdGVwKSAvIE1hdGguTE4xMCksXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bWJlciA9IHN0ZXAgLyBNYXRoLnBvdygxMCwgcG93ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHBvd2VyID49IDBcbiAgICAgICAgICAgICAgICA/IChlcnJvciA+PSBlMTAgPyAxMCA6IGVycm9yID49IGU1ID8gNSA6IGVycm9yID49IGUyID8gMiA6IDEpICogTWF0aC5wb3coMTAsIHBvd2VyKVxuICAgICAgICAgICAgICAgIDogLU1hdGgucG93KDEwLCAtcG93ZXIpIC8gKGVycm9yID49IGUxMCA/IDEwIDogZXJyb3IgPj0gZTUgPyA1IDogZXJyb3IgPj0gZTIgPyAyIDogMSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgIF90aWNrU3RlcChzdGFydDogbnVtYmVyLCBzdG9wOiBudW1iZXIsIGNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgICAgIGxldCBzdGVwMDogbnVtYmVyID0gTWF0aC5hYnMoc3RvcCAtIHN0YXJ0KSAvIE1hdGgubWF4KDAsIGNvdW50KSxcbiAgICAgICAgICAgICAgICBzdGVwMTogbnVtYmVyID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2coc3RlcDApIC8gTWF0aC5MTjEwKSksXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bWJlciA9IHN0ZXAwIC8gc3RlcDE7XG4gICAgICAgICAgICBpZiAoZXJyb3IgPj0gZTEwKSBzdGVwMSAqPSAxMDtcbiAgICAgICAgICAgIGVsc2UgaWYgKGVycm9yID49IGU1KSBzdGVwMSAqPSA1O1xuICAgICAgICAgICAgZWxzZSBpZiAoZXJyb3IgPj0gZTIpIHN0ZXAxICo9IDI7XG4gICAgICAgICAgICByZXR1cm4gc3RvcCA8IHN0YXJ0ID8gLXN0ZXAxIDogc3RlcDE7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBMaW5lYXJUaWNrcyBleHRlbmRzIFRpY2tzIHtcbiAgICAgICAgc3RhdGljIGNyZWF0ZShzY2FsZTogU2NhbGUpIHtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChzY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlLCBcIiBzY2FsZSBtdXN0IGJlIExpbmVhclNjYWxlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5lYXJUaWNrcyhzY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlVGlja3MoY291bnQ/OiBudW1iZXIpIHtcbiAgICAgICAgICAgIC8vIGxldCBzdGVwOm51bWJlciwgc3RhcnQ6bnVtYmVyLHN0b3A6bnVtYmVyO1xuICAgICAgICAgICAgLy8gc3RlcCA9IHRoaXMuX3RpY2tJbmNyZW1lbnQodGhpcy5fc3RhcnQsIHRoaXMuX2VuZCwgY291bnQpO1xuICAgICAgICAgICAgLy8gaWYgKHN0ZXAgPiAwKSB7XG4gICAgICAgICAgICAvLyAgICAgc3RhcnQgPSBNYXRoLmZsb29yKHRoaXMuX3N0YXJ0L3N0ZXApICogc3RlcDtcbiAgICAgICAgICAgIC8vICAgICBzdG9wID0gTWF0aC5mbG9vcih0aGlzLl9lbmQvc3RlcCkgKiBzdGVwO1xuICAgICAgICAgICAgLy8gICAgIHN0ZXAgPSB0aGlzLl90aWNrSW5jcmVtZW50KHN0YXJ0LHN0b3AsY291bnQpO1xuICAgICAgICAgICAgLy8gfWVsc2UgaWYoc3RlcCA8IDApe1xuICAgICAgICAgICAgLy8gICAgIHN0YXJ0ID0gTWF0aC5jZWlsKHN0YXJ0ICogc3RlcCkgLyBzdGVwO1xuICAgICAgICAgICAgLy8gICAgIHN0b3AgPSBNYXRoLmZsb29yKHN0b3AgKiBzdGVwKSAvIHN0ZXA7XG4gICAgICAgICAgICAvLyAgICAgc3RlcCA9IHRoaXMuX3RpY2tJbmNyZW1lbnQoc3RhcnQsIHN0b3AsIGNvdW50KTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGlmKGNvdW50ID09IG51bGwgfHwgaXNOYU4oY291bnQpKXtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGlja3MgPSB0aGlzLl9jcmVhdGVUaWNrcyh0aGlzLl9zY2FsZS5tYXgsdGhpcy5fc2NhbGUubWluLGNvdW50KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aWNrcztcbiAgICAgICAgfVxuICAgICAgICBuaWNlU2NhbGUoKTpMaW5lYXJTY2FsZXtcbiAgICAgICAgICAgIGxldCBzY2FsZSA9IDxMaW5lYXJTY2FsZT50aGlzLl9zY2FsZTtcbiAgICAgICAgICAgIGxldCBzdGVwIDpudW1iZXI9IHRoaXMuX3RpY2tTdGVwKHNjYWxlLm1pbixzY2FsZS5tYXgsMTApO1xuICAgICAgICAgICAgbGV0IG5pY2VNaW4gOm51bWJlciA9IHNjYWxlLm1pbj09PTA/MDooTWF0aC5mbG9vcihzY2FsZS5taW4vc3RlcCkpKnN0ZXA7XG4gICAgICAgICAgICBsZXQgbmljZU1heCA6bnVtYmVyID0gKE1hdGguZmxvb3Ioc2NhbGUubWF4L3N0ZXApKzEpKnN0ZXA7XG4gICAgICAgICAgICBzY2FsZS5kb21haW4oW25pY2VNaW4sbmljZU1heF0pLnJlZnJlc2goKTtcbiAgICAgICAgICAgIHJldHVybiBzY2FsZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBMb2dUaWNrcyBleHRlbmRzIFRpY2tzIHtcbiAgICAgICAgc3RhdGljIGNyZWF0ZShzY2FsZTogU2NhbGUpIHtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChzY2FsZSBpbnN0YW5jZW9mIExvZ1NjYWxlLCBcIiBzY2FsZSBtdXN0IGJlIExpbmVhclNjYWxlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBMb2dUaWNrcyhzY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlVGlja3MoY291bnQ/OiBudW1iZXIpIHtcblxuICAgICAgICAgICAgaWYoY291bnQgPT0gbnVsbCB8fCBpc05hTihjb3VudCkpe1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90aWNrcyA9IHRoaXMuX2NyZWF0ZVRpY2tzKHRoaXMuX3NjYWxlLm1heCx0aGlzLl9zY2FsZS5taW4sY291bnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpY2tzO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGNsYXNzIE9yZGluYWxUaWNrcyBleHRlbmRzIFRpY2tzIHtcbiAgICAgICAgc3RhdGljIGNyZWF0ZShzY2FsZTogU2NhbGUpIHtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSwgXCIgc2NhbGUgbXVzdCBiZSBPcmRpbmFsU2NhbGVcIik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9yZGluYWxUaWNrcyhzY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlVGlja3MoY291bnQ/OiBudW1iZXIpIHtcblxuICAgICAgICAgICAgaWYoY291bnQgPT0gbnVsbCB8fCBpc05hTihjb3VudCkpe1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGlzLl90aWNrcyA9IHRoaXMuX2NyZWF0ZVRpY2tzKHRoaXMuX3NjYWxlLm1heCx0aGlzLl9zY2FsZS5taW4sY291bnQpO1xuICAgICAgICAgICAgdGhpcy5fdGlja3MgPSAoPE9yZGluYWxTY2FsZT50aGlzLl9zY2FsZSkuZG9tYWlucztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aWNrcztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld1N0YXRlID0gYW5kcm9pZC52aWV3LlZpZXdTdGF0ZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGV4cG9ydCBjbGFzcyBBeGlzU2hhcGUgZXh0ZW5kcyBTaGFwZSB7XG5cbiAgICAgICAgcHVibGljIF9sYWJlbDogc3RyaW5nO1xuICAgICAgICBwdWJsaWMgX21ham9yOiBTdHJva2VTdHlsZTtcbiAgICAgICAgcHVibGljIF9taW5vcjogU3Ryb2tlU3R5bGU7XG4gICAgICAgIHB1YmxpYyBfbGFibGVSZWN0OiBSb3RhdGVSZWN0O1xuICAgICAgICBwdWJsaWMgX2xhYmxlRm9udDogRm9udDtcbiAgICAgICAgcHVibGljIF9tYWpvclRpY2s6IFJvdGF0ZUxpbmU7XG4gICAgICAgIHB1YmxpYyBfbWlub3JUaWNrOiBSb3RhdGVMaW5lO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX21ham9yID0gRGVmYXVsdC5zdHJva2VzdHlsZS5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWlub3IgPSBEZWZhdWx0LnN0cm9rZXN0eWxlLmNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLl9sYWJsZUZvbnQgPSBEZWZhdWx0LmZvbnQuY2xvbmUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuc2F2ZSgpO1xuICAgICAgICAgICAgLy8gY2FudmFzLmNsaXAocmVjdCk7XG4gICAgICAgICAgICBsZXQgeHM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgeXM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgcHRzOlBvaW50W10gPSB0aGlzLl9sYWJsZVJlY3QucG9pbnRzO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyArK2opIHtcbiAgICAgICAgICAgICAgICB4cy5wdXNoKHB0c1tqXS54KTtcbiAgICAgICAgICAgICAgICB5cy5wdXNoKHB0c1tqXS55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNhbnZhcy5kcmF3UG9seWdvbih4cyx5cyxcImJsdWVcIik7XG4gICAgICAgICAgICAvLyB0aGlzLl9sYWJsZUZvbnQuZm9udENvbG9yID0ncmVkJztcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZSh0aGlzLl9tYWpvclRpY2suc3RhcnRQb2ludCwgdGhpcy5fbWFqb3JUaWNrLmVuZFBvaW50LCB0aGlzLl9tYWpvcik7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1RleHQodGhpcy5fbGFiZWwsIHRoaXMuX2xhYmxlUmVjdC5sZWZ0VG9wLHRoaXMuX2xhYmxlRm9udCx0aGlzLl9sYWJsZVJlY3QubGVmdFRvcCx0aGlzLl9sYWJsZVJlY3QuYW5nbGUgKiAxODAgL01hdGguUEkpO1xuICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKHRoaXMuX21pbm9yVGljay5zdGFydFBvaW50LCB0aGlzLl9taW5vclRpY2suZW5kUG9pbnQsIHRoaXMuX21pbm9yKTtcblxuICAgICAgICAgICAgY2FudmFzLnJlc3RvcmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2goKTogdm9pZCB7XG5cbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5jb25zdCBMQUJFTF9QQURESU5HIDpudW1iZXIgPSA0O1xuY29uc3QgTUFKT1JfVElDS19IRUlHSFQ6bnVtYmVyID0gNjtcbmNvbnN0IE1JTk9SX1RJQ0tfSEVJR0hUOm51bWJlciA9IDQ7XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgICd1c2Ugc3RyaWN0JzsgICAgICAgIFxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG4gICAgaW1wb3J0IEZvbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkZvbnQ7XG5cbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBHcmF2aXR5ID0gYW5kcm9pZC5ncmFwaGljcy5HcmF2aXR5O1xuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VBeGlzIGV4dGVuZHMgVmlld3tcbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgX3NjYWxlOlNjYWxlO1xuICAgICAgICBwcml2YXRlIF9tYXg6bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9taW46bnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9yZXZlcnNlZDpib29sZWFuO1xuICAgICAgICBwcml2YXRlIF9zZXJpZXM6c3RyaW5nW107XG4gICAgICAgIHByb3RlY3RlZCBfY2hpbGRyZW46U2hhcGVbXTtcbiAgICAgICAgcHJvdGVjdGVkIF9tYWpvclRpY2tIZWlnaHQ6bnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX21pbm9yVGlja0hlaWdodDpudW1iZXJcbiAgICAgICAgcHJvdGVjdGVkIF9heGlzVHlwZTpBeGlzVHlwZTtcbiAgICAgICAgcHJvdGVjdGVkIF90aWNrczphbnlbXTtcbiAgICBcbiAgICAgICAgcHJvdGVjdGVkIF90aXRsZTpzdHJpbmc7XG4gICAgICAgIHByb3RlY3RlZCBfdGl0bGVGb250OkZvbnQ7XG4gICAgICAgIHByb3RlY3RlZCBfbGFiZWxGb250OkZvbnQ7XG4gICAgICAgIHByb3RlY3RlZCBfbWFqb3JTdHlsZTpTdHJva2VTdHlsZTtcbiAgICAgICAgcHJvdGVjdGVkIF9taW5vclN0eWxlOlN0cm9rZVN0eWxlO1xuICAgICAgICBwcm90ZWN0ZWQgX2xpbmVTdHlsZTpTdHJva2VTdHlsZTtcbiAgICAgICAgcHJvdGVjdGVkIF9uZWFyOmJvb2xlYW47XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6Q29udGV4dCl7XG4gICAgICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuX21ham9yVGlja0hlaWdodCA9IE1BSk9SX1RJQ0tfSEVJR0hUO1xuICAgICAgICAgICAgdGhpcy5fbWlub3JUaWNrSGVpZ2h0ID0gTUlOT1JfVElDS19IRUlHSFQ7XG4gICAgICAgICAgICB0aGlzLl90aWNrcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fdGl0bGVGb250ID0gRGVmYXVsdC5mb250O1xuICAgICAgICAgICAgdGhpcy5fbGFiZWxGb250ID0gRGVmYXVsdC5mb250O1xuICAgICAgICAgICAgdGhpcy5fbWFqb3JTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgICAgICB0aGlzLl9taW5vclN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgICAgIHRoaXMuX25lYXIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fbGFiZWxGb250LmZvbnRDb2xvciA9IFwiIzI2MjYyNlwiO1xuICAgICAgICAgICAgdGhpcy5fc2VyaWVzPVtdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2NyZWF0ZVRpY2tzKCkgOmFueVtdO1xuICAgICAgICAgICAgXG5cbiAgICAgICAgcHVibGljIHNldCB0aXRsZSh2YWx1ZTpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6c3RyaW5ne1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldCBtYWpvclN0eWxlKHZhbHVlOlN0cm9rZVN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX21ham9yU3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IG1ham9yU3R5bGUoKTpTdHJva2VTdHlsZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYWpvclN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldCBtaW5vclN0eWxlKHZhbHVlOlN0cm9rZVN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX21pbm9yU3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IG1pbm9yU3R5bGUoKTpTdHJva2VTdHlsZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9taW5vclN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzZXQgbGluZVN0eWxlKHZhbHVlOlN0cm9rZVN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX2xpbmVTdHlsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgbGluZVN0eWxlKCk6U3Ryb2tlU3R5bGV7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGluZVN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldCB0aXRsZUZvbnQodmFsdWUgOkZvbnQpe1xuICAgICAgICAgICAgdGhpcy5fdGl0bGVGb250ID0gdmFsdWUuY2xvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIGdldCB0aXRsZUZvbnQoKTpGb250e1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpdGxlRm9udDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXQgbGFiZWxGb250KHZhbHVlIDpGb250KXtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsRm9udCA9IHZhbHVlLmNsb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBnZXQgbGFiZWxGb250KCk6Rm9udHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sYWJlbEZvbnQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBzZXQgbWF4KHZhbHVlOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9tYXggPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2V0IG1pbih2YWx1ZTpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fbWluID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBtYXgoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgbWluKCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IHNlcmllcygpOnN0cmluZ1tde1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlcmllcztcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2V0IHNlcmllcyhzOnN0cmluZ1tdKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZXMgPXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IHNjYWxlKHZhbHVlOlNjYWxlKXtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9IG51bGwgJiYgIXZhbHVlLmVxdWFsKHRoaXMuX3NjYWxlKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NhbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldCBzY2FsZSBcIisgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpY2tzID0gdGhpcy5fY3JlYXRlVGlja3MoKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKHZhbHVlID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjYWxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl90aWNrcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgc2NhbGUoKTpTY2FsZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2V0IHJldmVyc2VkKHZhbHVlOmJvb2xlYW4pe1xuICAgICAgICAgICAgdGhpcy5fcmV2ZXJzZWQgPXZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgcmV2ZXJzZWQoKTpib29sZWFue1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JldmVyc2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldCB0eXBlKHZhbHVlOkF4aXNUeXBlKXtcbiAgICAgICAgICAgIHRoaXMuX2F4aXNUeXBlID12YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IHR5cGUoKTpBeGlzVHlwZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9heGlzVHlwZTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICBwdWJsaWMgc2V0IG5lYXIodmFsdWUgOmJvb2xlYW4pe1xuICAgICAgICAgICAgdGhpcy5fbmVhciA9IHZhbHVlO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIGdldCBuZWFyKCk6Ym9vbGVhbntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgX2xheW91dFhBeGlzKGNhbnZhczpDYW52YXMpOnZvaWQ7XG4gICAgICAgIGFic3RyYWN0IF9sYXlvdXRZQXhpcyhjYW52YXM6Q2FudmFzKTp2b2lkO1xuXG5cbiAgICAgICAgb25NZWFzdXJlKHdpZHRoOiBNZWFzdXJlU3BlYywgaGVpZ2h0OiBNZWFzdXJlU3BlYywgY2FudmFzOiBDYW52YXMpOiBTaXple1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCxoZWlnaHQsY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgb25MYXlvdXQobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWR7XG4gICAgICAgICAgICBzdXBlci5vbkxheW91dChsLHQscixiLGNhbnZhcyk7XG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lke1xuICAgICAgICAgICAgc3VwZXIub25EcmF3KGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgX2Zvcm1hdCh2YWw6YW55KXtcbiAgICAgICAgICAgIHJldHVybiB2YWwrXCJcIjtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDb250ZXh0ID0gYW5kcm9pZC5hcHAuQ29udGV4dDtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBpbXBvcnQgRm9udCA9IGFuZHJvaWQuZ3JhcGhpY3MuRm9udDtcbiAgICBpbXBvcnQgTGF5b3V0UGFyYW1zID0gYW5kcm9pZC52aWV3LkxheW91dFBhcmFtcztcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGV4cG9ydCBjbGFzcyBMaW5lQXhpcyBleHRlbmRzIEJhc2VBeGlzIHtcblxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBuZWFyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLl9uZWFyID0gdmFsdWU7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gR3Jhdml0eS5Cb3R0b207ICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IEdyYXZpdHkuTGVmdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBHcmF2aXR5LlRvcDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IEdyYXZpdHkuUmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG5lYXIoKTpib29sZWFue1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25lYXI7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgX2NyZWF0ZVRpY2tzKCk6IGFueVtdIHtcbiAgICAgICAgICAgIGxldCB0aWNrczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IExpbmVhclRpY2tzLmNyZWF0ZSh0aGlzLnNjYWxlKS5jcmVhdGVUaWNrcygxMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGUgaW5zdGFuY2VvZiBMb2dTY2FsZSkge1xuICAgICAgICAgICAgICAgIHRpY2tzID0gTG9nVGlja3MuY3JlYXRlKHRoaXMuc2NhbGUpLmNyZWF0ZVRpY2tzKDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgIHRpY2tzID0gT3JkaW5hbFRpY2tzLmNyZWF0ZSh0aGlzLnNjYWxlKS5jcmVhdGVUaWNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZWxzZSBpZih0aGlzLnNjYWxlIGluc3RhbmNlb2YgVGltZXNjYWxlKVxuXG4gICAgICAgICAgICByZXR1cm4gdGlja3M7XG4gICAgICAgIH1cbiAgICAgICAgX2xheW91dFhBeGlzKGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdGlja3MgPSB0aGlzLl90aWNrcztcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgdGlja3MgJiYgaSA8IHRpY2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSB0aWNrc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFZhbHVlOiBudW1iZXIgPSBpID49IHRpY2tzLmxlbmd0aCA/IG51bGwgOiB0aWNrc1tpICsgMV07XG4gICAgICAgICAgICAgICAgbGV0IHRpY2toZWlnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMuX21ham9yVGlja0hlaWdodCwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLl9mb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFNpemU6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyhsYWJlbCwgdGhpcy5sYWJlbEZvbnQpO1xuICAgICAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSB0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0LnRvcDtcbiAgICAgICAgICAgICAgICBsZXQgbng6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBsZXQgbnk6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbnggPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbnkgPSB5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxYOiBudW1iZXIgPSB4O1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFk6IG51bWJlciA9IHkgKyB0aWNraGVpZ2h0ICsgTEFCRUxfUEFERElORyArIGxhYmVsU2l6ZS5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgICAgIGxldCBzaGFwZTogQXhpc1NoYXBlID0gbmV3IEF4aXNTaGFwZSgpO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJsZVJlY3QgPSBuZXcgUm90YXRlUmVjdChsYWJlbFgsIGxhYmVsWSwgbGFiZWxTaXplLndpZHRoLCBsYWJlbFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNoYXBlLl9tYWpvclRpY2sgPSBuZXcgUm90YXRlTGluZSh4LCB5LCB0aGlzLl9tYWpvclRpY2tIZWlnaHQsIDAsIDApO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJsZUZvbnQgPSB0aGlzLl9sYWJlbEZvbnQ7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21ham9yID0gdGhpcy5tYWpvclN0eWxlO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9taW5vciA9IHRoaXMubWlub3JTdHlsZTtcbiAgICAgICAgICAgICAgICBsZXQgbWlub3J4ID0gTmFOO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obngpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbm9yeCA9ICh4ICsgbngpIC8gMjtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaGFwZS5fbWlub3JUaWNrID0gbmV3IFJvdGF0ZUxpbmUobWlub3J4LCB5LCB0aGlzLl9taW5vclRpY2tIZWlnaHQsIDAsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX2xheW91dFlBeGlzKGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdGlja3MgPSB0aGlzLl90aWNrcztcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgdGlja3MgJiYgaSA8IHRpY2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSB0aWNrc1tpXTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXh0VmFsdWU6IG51bWJlciA9IGkgPj0gdGlja3MubGVuZ3RoID8gbnVsbCA6IHRpY2tzW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBsZXQgdGlja2hlaWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCB0aGlzLl9taW5vclRpY2tIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9IHRoaXMuX2Zvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZTogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKGxhYmVsLCB0aGlzLmxhYmVsRm9udCk7XG4gICAgICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3QucmlnaHQ7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMubmVhcil7XG4gICAgICAgICAgICAgICAgICAgIHggPSB0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBueDogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGxldCBueTogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBueSA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBueCA9IHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBsYWJlbFg6IG51bWJlciA9IHggLSBsYWJlbFNpemUud2lkdGgvMiAtIExBQkVMX1BBRERJTkcgLSB0aWNraGVpZ2h0O1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFk6IG51bWJlciA9IHkgO1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLm5lYXIpe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbFggPSB4ICArIGxhYmVsU2l6ZS53aWR0aC8yICsgTEFCRUxfUEFERElORyArIHRpY2toZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzaGFwZTogQXhpc1NoYXBlID0gbmV3IEF4aXNTaGFwZSgpO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJsZVJlY3QgPSBuZXcgUm90YXRlUmVjdChsYWJlbFgsIGxhYmVsWSwgbGFiZWxTaXplLndpZHRoLCBsYWJlbFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWFqb3JUaWNrID0gbmV3IFJvdGF0ZUxpbmUoeCwgeSwgIHRoaXMuX21ham9yVGlja0hlaWdodCwwLCB0aGlzLm5lYXIgPyBNYXRoLlBJIC8gMjotTWF0aC5QSS8yKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFibGVGb250ID0gdGhpcy5sYWJlbEZvbnQ7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21ham9yID0gdGhpcy5tYWpvclN0eWxlO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9taW5vciA9IHRoaXMubWlub3JTdHlsZTtcbiAgICAgICAgICAgICAgICBsZXQgbWlub3J5ID0gTmFOO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbm9yeSA9ICh5ICsgbnkpIC8gMjtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaGFwZS5fbWlub3JUaWNrID0gbmV3IFJvdGF0ZUxpbmUoeCwgbWlub3J5LCB0aGlzLl9taW5vclRpY2tIZWlnaHQsMCwgdGhpcy5uZWFyID8gTWF0aC5QSSAvIDI6LU1hdGguUEkvMik7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgbGV0IHNpemU6IFNpemUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IFNpemUod2lkdGgudmFsdWUsIHRoaXMuX21lYXN1cmVYKGNhbnZhcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVhc3VyZWREaW1lbnNpb24obmV3IE1lYXN1cmVTcGVjKHNpemUud2lkdGgsIExheW91dFBhcmFtcy5FWEFDVExZKSwgbmV3IE1lYXN1cmVTcGVjKHNpemUuaGVpZ2h0LCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBTaXplKHRoaXMuX21lYXN1cmVZKGNhbnZhcyksIGhlaWdodC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZWFzdXJlZERpbWVuc2lvbihuZXcgTWVhc3VyZVNwZWMoc2l6ZS53aWR0aCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpLCBuZXcgTWVhc3VyZVNwZWMoc2l6ZS5oZWlnaHQsIExheW91dFBhcmFtcy5FWEFDVExZKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX21lYXN1cmVYKGNhbnZhczogQ2FudmFzKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGxldCB0aXRsZVNpemU6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyh0aGlzLnRpdGxlLCB0aGlzLnRpdGxlRm9udCk7XG4gICAgICAgICAgICBsZXQgdGlja0hlZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLl9tYWpvclRpY2tIZWlnaHQsIHRoaXMuX21pbm9yVGlja0hlaWdodCk7XG4gICAgICAgICAgICBsZXQgbGFiZWxTaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICBsZXQgdGlja3M6IGFueVtdID0gdGhpcy5fdGlja3M7XG4gICAgICAgICAgICBmb3IgKGxldCB0IG9mIHRpY2tzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN6OiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy5fZm9ybWF0KHQpLCB0aGlzLmxhYmVsRm9udCk7XG4gICAgICAgICAgICAgICAgbGFiZWxTaXplLndpZHRoID0gTWF0aC5tYXgoc3oud2lkdGgsIGxhYmVsU2l6ZS53aWR0aCk7XG4gICAgICAgICAgICAgICAgbGFiZWxTaXplLmhlaWdodCA9IE1hdGgubWF4KHN6LmhlaWdodCwgbGFiZWxTaXplLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGFiZWxTaXplLmhlaWdodCArIHRpdGxlU2l6ZS5oZWlnaHQgKyB0aWNrSGVnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgX21lYXN1cmVZKGNhbnZhczogQ2FudmFzKTogbnVtYmVyIHtcblxuICAgICAgICAgICAgbGV0IHRpdGxlU2l6ZTogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMudGl0bGUsIHRoaXMudGl0bGVGb250KTtcbiAgICAgICAgICAgIGxldCB0aWNrSGVnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMuX21ham9yVGlja0hlaWdodCwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgIGxldCBsYWJlbFNpemU6IFNpemUgPSBuZXcgU2l6ZSgwLCAwKTtcbiAgICAgICAgICAgIGxldCB0aWNrczogYW55W10gPSB0aGlzLl90aWNrcztcbiAgICAgICAgICAgIGZvciAobGV0IHQgb2YgdGlja3MpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3o6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyh0aGlzLl9mb3JtYXQodCksIHRoaXMubGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICBsYWJlbFNpemUud2lkdGggPSBNYXRoLm1heChzei53aWR0aCwgbGFiZWxTaXplLndpZHRoKTtcbiAgICAgICAgICAgICAgICBsYWJlbFNpemUuaGVpZ2h0ID0gTWF0aC5tYXgoc3ouaGVpZ2h0LCBsYWJlbFNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsYWJlbFNpemUud2lkdGggKyB0aXRsZVNpemUuaGVpZ2h0ICsgdGlja0hlZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgb25MYXlvdXQobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25MYXlvdXQobCwgdCwgciwgYiwgY2FudmFzKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc2NhbGUgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNUeXBlID09PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dFhBeGlzKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dFlBeGlzKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkRyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdMaW5lKGNhbnZhcyk7XG4gICAgICAgICAgICBpZih0aGlzLl9jaGlsZHJlbiAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzaGFwZSBvZiB0aGlzLl9jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZS5kcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX2RyYXdMaW5lKGNhbnZhczpDYW52YXMpIDp2b2lke1xuICAgICAgICAgICAgbGV0IHJlY3Q6UmVjdCA9IHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3Q7XG4gICAgICAgICAgICBpZih0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5YKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9uZWFyKXtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKG5ldyBQb2ludChyZWN0LmxlZnQscmVjdC50b3ApLG5ldyBQb2ludChyZWN0LnJpZ2h0LHJlY3QudG9wKSx0aGlzLmxpbmVTdHlsZSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZShuZXcgUG9pbnQocmVjdC5sZWZ0LHJlY3QuYm90dG9tKSxuZXcgUG9pbnQocmVjdC5yaWdodCxyZWN0LmJvdHRvbSksdGhpcy5saW5lU3R5bGUpOyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWSl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fbmVhcil7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZShuZXcgUG9pbnQocmVjdC5yaWdodCxyZWN0LnRvcCksbmV3IFBvaW50KHJlY3QucmlnaHQscmVjdC5ib3R0b20pLHRoaXMubGluZVN0eWxlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKG5ldyBQb2ludChyZWN0LmxlZnQscmVjdC50b3ApLG5ldyBQb2ludChyZWN0LmxlZnQscmVjdC5ib3R0b20pLHRoaXMubGluZVN0eWxlKTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDb250ZXh0ID0gYW5kcm9pZC5hcHAuQ29udGV4dDtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBpbXBvcnQgRm9udCA9IGFuZHJvaWQuZ3JhcGhpY3MuRm9udDtcbiAgICBpbXBvcnQgTGF5b3V0UGFyYW1zID0gYW5kcm9pZC52aWV3LkxheW91dFBhcmFtcztcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgUmFkaWFsTGluZUF4aXMgZXh0ZW5kcyBCYXNlQXhpcyB7XG4gICAgICAgIHByaXZhdGUgX19pbm5lclJhZGl1czogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfX3N0YXJ0QW5nbGU6IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgX19zd2VlcDogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfX3JhZGl1czogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfX2N4OiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF9fY3k6IG51bWJlciA9IDA7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5fX2lubmVyUmFkaXVzID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2xpbmVTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgbmVhcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fbmVhciA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IEdyYXZpdHkuQm90dG9tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gR3Jhdml0eS5MZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IEdyYXZpdHkuVG9wO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gR3Jhdml0eS5SaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbmVhcigpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IF9jeCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19jeDtcbiAgICAgICAgfVxuICAgICAgICBnZXQgX2N5KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2N5O1xuICAgICAgICB9XG4gICAgICAgIHNldCBfY3godmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fX2N4ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IF9jeSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9fY3kgPSB2YWx1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZ2V0IF9yYWRpdXMoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcmFkaXVzO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IF9yYWRpdXModmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fX3JhZGl1cyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHNldCBfaW5uZXJSYWRpdXModmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fX2lubmVyUmFkaXVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IF9pbm5lclJhZGl1cygpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19pbm5lclJhZGl1cztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBfc3RhcnRBbmdsZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9fc3RhcnRBbmdsZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBfc3RhcnRBbmdsZSgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zdGFydEFuZ2xlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IF9zd2VlcCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9fc3dlZXAgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgX3N3ZWVwKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3N3ZWVwO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIHByb3RlY3RlZCBfY3JlYXRlVGlja3MoKTogYW55W10ge1xuICAgICAgICAgICAgbGV0IHRpY2tzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSkge1xuICAgICAgICAgICAgICAgIHRpY2tzID0gTGluZWFyVGlja3MuY3JlYXRlKHRoaXMuc2NhbGUpLmNyZWF0ZVRpY2tzKDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZSBpbnN0YW5jZW9mIExvZ1NjYWxlKSB7XG4gICAgICAgICAgICAgICAgdGlja3MgPSBMb2dUaWNrcy5jcmVhdGUodGhpcy5zY2FsZSkuY3JlYXRlVGlja3MoMTApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgdGlja3MgPSBPcmRpbmFsVGlja3MuY3JlYXRlKHRoaXMuc2NhbGUpLmNyZWF0ZVRpY2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlbHNlIGlmKHRoaXMuc2NhbGUgaW5zdGFuY2VvZiBUaW1lc2NhbGUpXG5cbiAgICAgICAgICAgIHJldHVybiB0aWNrcztcbiAgICAgICAgfVxuICAgICAgICBfbGF5b3V0WEF4aXMoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCB0aWNrcyA9IHRoaXMuX3RpY2tzO1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyB0aWNrcyAmJiBpIDwgdGlja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU6IG51bWJlciA9IHRpY2tzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0VmFsdWU6IG51bWJlciA9IGkgPj0gdGlja3MubGVuZ3RoID8gbnVsbCA6IHRpY2tzW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBsZXQgdGlja2hlaWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCB0aGlzLl9taW5vclRpY2tIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9IHRoaXMuX2Zvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZTogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKGxhYmVsLCB0aGlzLmxhYmVsRm9udCk7XG4gICAgICAgICAgICAgICAgbGV0IHJhZGl1czogbnVtYmVyID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gdGhpcy5fY3ggKyBNYXRoLmNvcyh0aGlzLl9zdGFydEFuZ2xlKSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gdGhpcy5fY3kgKyBNYXRoLnNpbih0aGlzLl9zdGFydEFuZ2xlKSAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICBsZXQgbng6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBsZXQgbnk6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRSYWRpdXMgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbnggPSB0aGlzLl9jeCArIE1hdGguY29zKHRoaXMuX3N0YXJ0QW5nbGUpICogbmV4dFJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbnkgPSB0aGlzLl9jeSArIE1hdGguc2luKHRoaXMuX3N0YXJ0QW5nbGUpICogbmV4dFJhZGl1cztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgbGFiZWx4ID0geCArIChNYXRoLnNpbih0aGlzLl9zdGFydEFuZ2xlKSAqICh0aWNraGVpZ2h0ICsgTEFCRUxfUEFERElORyArIGxhYmVsU2l6ZS5oZWlnaHQgLyAyKSk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVseSA9IHkgLSAoTWF0aC5jb3ModGhpcy5fc3RhcnRBbmdsZSkgKiAodGlja2hlaWdodCArIExBQkVMX1BBRERJTkcgKyBsYWJlbFNpemUuaGVpZ2h0IC8gMikpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWDogbnVtYmVyID0geDtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxZOiBudW1iZXIgPSB5ICsgdGlja2hlaWdodCArIExBQkVMX1BBRERJTkcgKyBsYWJlbFNpemUuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICBsZXQgc2hhcGU6IEF4aXNTaGFwZSA9IG5ldyBBeGlzU2hhcGUoKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFibGVSZWN0ID0gbmV3IFJvdGF0ZVJlY3QobGFiZWxYLCBsYWJlbFksIGxhYmVsU2l6ZS53aWR0aCwgbGFiZWxTaXplLmhlaWdodCwgMCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21ham9yVGljayA9IG5ldyBSb3RhdGVMaW5lKHgsIHksIHRoaXMuX21ham9yVGlja0hlaWdodCwgMCwgdGhpcy5fc3RhcnRBbmdsZSk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmxlRm9udCA9IHRoaXMuX2xhYmVsRm9udDtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWFqb3IgPSB0aGlzLm1ham9yU3R5bGU7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21pbm9yID0gdGhpcy5taW5vclN0eWxlO1xuICAgICAgICAgICAgICAgIGxldCBtaW5vcnggPSBOYU47XG4gICAgICAgICAgICAgICAgbGV0IG1pbm9yeSA9IE5hTjtcblxuICAgICAgICAgICAgICAgIGxldCBtaW5vclJhZGl1czogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obngpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbWlub3JSYWRpdXMgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUoKHZhbHVlICsgbmV4dFZhbHVlKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICBtaW5vcnggPSB0aGlzLl9jeCArIE1hdGguY29zKHRoaXMuX3N0YXJ0QW5nbGUpICogbWlub3JSYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIG1pbm9yeSA9IHRoaXMuX2N5ICsgTWF0aC5zaW4odGhpcy5fc3RhcnRBbmdsZSkgKiBtaW5vclJhZGl1cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hhcGUuX21pbm9yVGljayA9IG5ldyBSb3RhdGVMaW5lKG1pbm9yeCwgbWlub3J5LCB0aGlzLl9taW5vclRpY2tIZWlnaHQsIDAsIHRoaXMuX3N0YXJ0QW5nbGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX2xheW91dFlBeGlzKGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdGlja3MgPSB0aGlzLl90aWNrcztcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgdGlja3MgJiYgaSA8IHRpY2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSB0aWNrc1tpXTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXh0VmFsdWU6IG51bWJlciA9IGkgPj0gdGlja3MubGVuZ3RoID8gbnVsbCA6IHRpY2tzW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBsZXQgdGlja2hlaWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCB0aGlzLl9taW5vclRpY2tIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9IHRoaXMuX2Zvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZTogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKGxhYmVsLCB0aGlzLmxhYmVsRm9udCk7XG4gICAgICAgICAgICAgICAgbGV0IGFuZ2xlOiBudW1iZXIgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUodmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IHRoaXMuX2N4ICsgTWF0aC5jb3MoYW5nbGUpICogdGhpcy5fcmFkaXVzO1xuICAgICAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSB0aGlzLl9jeSArIE1hdGguc2luKGFuZ2xlKSAqIHRoaXMuX3JhZGl1cztcblxuICAgICAgICAgICAgICAgIGxldCBueDogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGxldCBueTogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbkFuZ2xlID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG54ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhuQW5nbGUpICogdGhpcy5fcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBueSA9IHRoaXMuX2N5ICsgTWF0aC5zaW4obkFuZ2xlKSAqIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgbGFibGVYID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhhbmdsZSkgKiAodGhpcy5fcmFkaXVzICsgdGlja2hlaWdodCArIExBQkVMX1BBRERJTkcgKyBsYWJlbFNpemUuaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmxlWSA9IHRoaXMuX2N5ICsgTWF0aC5zaW4oYW5nbGUpICogKHRoaXMuX3JhZGl1cyArIHRpY2toZWlnaHQgKyBMQUJFTF9QQURESU5HICsgbGFiZWxTaXplLmhlaWdodCAvIDIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNoYXBlOiBBeGlzU2hhcGUgPSBuZXcgQXhpc1NoYXBlKCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmxlUmVjdCA9IG5ldyBSb3RhdGVSZWN0KGxhYmxlWCwgbGFibGVZLCBsYWJlbFNpemUud2lkdGgsIGxhYmVsU2l6ZS5oZWlnaHQsIDApO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9tYWpvclRpY2sgPSBuZXcgUm90YXRlTGluZSh4LCB5LCB0aGlzLl9tYWpvclRpY2tIZWlnaHQsIDAsIGFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJsZUZvbnQgPSB0aGlzLmxhYmVsRm9udDtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWFqb3IgPSB0aGlzLm1ham9yU3R5bGU7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21pbm9yID0gdGhpcy5taW5vclN0eWxlO1xuICAgICAgICAgICAgICAgIGxldCBtaW5vcnk6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBsZXQgbWlub3J4OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgbGV0IG1pbm9yQW5nbGU6IG51bWJlciA9IE5hTjtcblxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4obnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbm9yQW5nbGUgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUoKG5leHRWYWx1ZSArIHZhbHVlKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICBtaW5vcnggPSB0aGlzLl9jeCArIE1hdGguY29zKG1pbm9yQW5nbGUpICogdGhpcy5fcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBtaW5vcnkgPSB0aGlzLl9jeSArIE1hdGguc2luKG1pbm9yQW5nbGUpICogdGhpcy5fcmFkaXVzO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoYXBlLl9taW5vclRpY2sgPSBuZXcgUm90YXRlTGluZShtaW5vcngsIG1pbm9yeSwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0LCAwLCBtaW5vckFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25NZWFzdXJlKHdpZHRoOiBNZWFzdXJlU3BlYywgaGVpZ2h0OiBNZWFzdXJlU3BlYywgY2FudmFzOiBDYW52YXMpOiBTaXplIHtcbiAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBTaXplKHdpZHRoLnZhbHVlLCB0aGlzLl9tZWFzdXJlWChjYW52YXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgU2l6ZSh0aGlzLl9tZWFzdXJlWShjYW52YXMpLCBoZWlnaHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVhc3VyZWREaW1lbnNpb24obmV3IE1lYXN1cmVTcGVjKHNpemUud2lkdGgsIExheW91dFBhcmFtcy5FWEFDVExZKSwgbmV3IE1lYXN1cmVTcGVjKHNpemUuaGVpZ2h0LCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9tZWFzdXJlWChjYW52YXM6IENhbnZhcyk6IG51bWJlciB7XG4gICAgICAgICAgICBsZXQgdGl0bGVTaXplOiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy50aXRsZSwgdGhpcy50aXRsZUZvbnQpO1xuICAgICAgICAgICAgbGV0IHRpY2tIZWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCB0aGlzLl9taW5vclRpY2tIZWlnaHQpO1xuICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZTogU2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgbGV0IHRpY2tzOiBhbnlbXSA9IHRoaXMuX3RpY2tzO1xuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiB0aWNrcykge1xuICAgICAgICAgICAgICAgIGxldCBzejogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMuX2Zvcm1hdCh0KSwgdGhpcy5sYWJlbEZvbnQpO1xuICAgICAgICAgICAgICAgIGxhYmVsU2l6ZS53aWR0aCA9IE1hdGgubWF4KHN6LndpZHRoLCBsYWJlbFNpemUud2lkdGgpO1xuICAgICAgICAgICAgICAgIGxhYmVsU2l6ZS5oZWlnaHQgPSBNYXRoLm1heChzei5oZWlnaHQsIGxhYmVsU2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsU2l6ZS5oZWlnaHQgKyB0aXRsZVNpemUuaGVpZ2h0ICsgdGlja0hlZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIF9tZWFzdXJlWShjYW52YXM6IENhbnZhcyk6IG51bWJlciB7XG5cbiAgICAgICAgICAgIGxldCB0aXRsZVNpemU6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyh0aGlzLnRpdGxlLCB0aGlzLnRpdGxlRm9udCk7XG4gICAgICAgICAgICBsZXQgdGlja0hlZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLl9tYWpvclRpY2tIZWlnaHQsIHRoaXMuX21pbm9yVGlja0hlaWdodCk7XG4gICAgICAgICAgICBsZXQgbGFiZWxTaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICBsZXQgdGlja3M6IGFueVtdID0gdGhpcy5fdGlja3M7XG4gICAgICAgICAgICBmb3IgKGxldCB0IG9mIHRpY2tzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN6OiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy5fZm9ybWF0KHQpLCB0aGlzLmxhYmVsRm9udCk7XG4gICAgICAgICAgICAgICAgbGFiZWxTaXplLndpZHRoID0gTWF0aC5tYXgoc3oud2lkdGgsIGxhYmVsU2l6ZS53aWR0aCk7XG4gICAgICAgICAgICAgICAgbGFiZWxTaXplLmhlaWdodCA9IE1hdGgubWF4KHN6LmhlaWdodCwgbGFiZWxTaXplLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGFiZWxTaXplLndpZHRoICsgdGl0bGVTaXplLmhlaWdodCArIHRpY2tIZWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FsZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNUeXBlID09PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dFhBeGlzKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dFlBeGlzKGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkRyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdMaW5lKGNhbnZhcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHNoYXBlIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLmRyYXcoY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfZHJhd0xpbmUoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGxldCByZWN0OiBSZWN0ID0gdGhpcy5sYXlvdXRJbmZvLmlubmVycmVjdDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVuZHg6IG51bWJlciA9IHRoaXMuX2N4ICsgTWF0aC5jb3ModGhpcy5fX3N0YXJ0QW5nbGUpICogdGhpcy5fcmFkaXVzO1xuICAgICAgICAgICAgICAgIGxldCBlbmR5OiBudW1iZXIgPSB0aGlzLl9jeSArIE1hdGguc2luKHRoaXMuX19zdGFydEFuZ2xlKSAqIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgICAgICBsZXQgc3g6IG51bWJlciA9IHRoaXMuX2N4ICsgTWF0aC5jb3ModGhpcy5fX3N0YXJ0QW5nbGUpICpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2lubmVyUmFkaXVzICogdGhpcy5fcmFkaXVzO1xuICAgICAgICAgICAgICAgIGxldCBzeTogbnVtYmVyID0gdGhpcy5fY3kgKyBNYXRoLnNpbih0aGlzLl9fc3RhcnRBbmdsZSkgKiB0aGlzLl9pbm5lclJhZGl1cyAqIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgICAgICBjYW52YXMuZHJhd0xpbmUobmV3IFBvaW50KHN4LCBzeSksIG5ldyBQb2ludChlbmR4LCBlbmR5KSwgdGhpcy5saW5lU3R5bGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgY2FudmFzLmRyYXdEb251dCh0aGlzLl9jeCwgdGhpcy5fY3ksIHRoaXMuX3JhZGl1cywgdGhpcy5fcmFkaXVzIC0gdGhpcy5saW5lU3R5bGUuc3Ryb2tlV2lkdGgsIHRoaXMuX3N0YXJ0QW5nbGUgLyBNYXRoLlBJICogMTgwLCB0aGlzLl9zd2VlcCAqIDE4MCAvIE1hdGguUEksIHRoaXMubGluZVN0eWxlLnN0cm9rZUNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb247XG4gICAgZXhwb3J0IGNsYXNzIEJhc2VQbG90IGV4dGVuZHMgVmlld0dyb3Vwe1xuICAgICAgICBwcm90ZWN0ZWQgX2FuaW1hdGlvbjpBbmltYXRpb247XG4gICAgICAgIFxuICAgICAgICBnZXQgbGF5b3V0KCk6QmFzZUxheW91dHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb247XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuICAgIGltcG9ydCBCb3VuY2VBbmltYXRpb25FYXNlID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5Cb3VuY2VBbmltYXRpb25FYXNlO1xuXG4gICAgZXhwb3J0IGNsYXNzIENhcnRlc2lhblBsb3QgZXh0ZW5kcyBCYXNlUGxvdCB7XG5cbiAgICAgICAgcHJpdmF0ZSBfX3NoYXBlTGlzdDogU2hhcGVbXSA9IFtdO1xuICAgICAgICBwcml2YXRlIF9sYXlvdXRzOiBCYXNlTGF5b3V0W107XG4gICAgICAgIHByb3RlY3RlZCBfX3NjYWxlUGFpcnM6IHtcbiAgICAgICAgICAgIHNlcmllczogc3RyaW5nW10sXG4gICAgICAgICAgICBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZVxuICAgICAgICB9W107XG4gICAgICAgIHByaXZhdGUgX2RhdGFtb2RlbDogRGF0YU1vZGVsO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBDb250ZXh0LCBkYXRhbW9kZWw6IERhdGFNb2RlbCkge1xuICAgICAgICAgICAgc3VwZXIoY29udGV4dCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2RhdGFtb2RlbCA9IGRhdGFtb2RlbDtcblxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0cyA9IFtdXG4gICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmR1cmF0aW9uID0gNTAwO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLmVhc2UgPSBuZXcgQm91bmNlQW5pbWF0aW9uRWFzZSgpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIG9uTWVhc3VyZSh3aWR0aDogTWVhc3VyZVNwZWMsIGhlaWdodDogTWVhc3VyZVNwZWMsIGNhbnZhczogQ2FudmFzKTogU2l6ZSB7XG4gICAgICAgICAgICByZXR1cm4gc3VwZXIub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgb25MYXlvdXQobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25MYXlvdXQobCwgdCwgciwgYiwgY2FudmFzKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNsYXlvdXRDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxWaWV3cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgaXNyYWRpYWw6IGJvb2xlYW4gPSB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcuX3JhZGlhbDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB0eXBlIG9mIHRoaXMuX2RhdGFtb2RlbC5jaGFydFR5cGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuQmFyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc3JhZGlhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmFybGF5b3V0OiBSYWRpYWxCYXJMYXlvdXQgPSBuZXcgUmFkaWFsQmFyTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjeDogbnVtYmVyID0gKGwgKyByKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjeTogbnVtYmVyID0gKGIgKyB0KSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpdXM6IG51bWJlciA9ICgociAtIGwpIDwgKGIgLSB0KSA/IChyIC0gbCkgOiAoYiAtIHQpKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbm5lclJhZGl1czogbnVtYmVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0QW5nbGU6IG51bWJlciA9IFN0YXJ0QW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmRBbmdsZTogbnVtYmVyID0gTWF0aC5QSSAqIDIgKyBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXJsYXlvdXQuY29udmVydCh0aGlzLl9kYXRhbW9kZWwuZ2V0U2VyaWVzQnlUeXBlKENoYXJ0VHlwZS5CYXIpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIGN4LCBjeSwgaW5uZXJSYWRpdXMsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoYmFybGF5b3V0LnNoYXBlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChiYXJsYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYXJsYXlvdXQ6IEJhckxheW91dCA9IG5ldyBCYXJMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFybGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuQmFyKSwgdGhpcy5fZGF0YW1vZGVsLmVuY29kaW5nLCBuZXcgUmVjdChsLCB0LCByLCBiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSB0aGlzLl9fc2hhcGVMaXN0LmNvbmNhdChiYXJsYXlvdXQuc2hhcGVMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0cy5wdXNoKGJhcmxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuTGluZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNyYWRpYWwpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGluZWxheW91dDogUmFkaWFsTGluZUxheW91dCA9IG5ldyBSYWRpYWxMaW5lTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjeDogbnVtYmVyID0gKGwgKyByKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjeTogbnVtYmVyID0gKGIgKyB0KSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpdXM6IG51bWJlciA9ICgociAtIGwpIDwgKGIgLSB0KSA/IChyIC0gbCkgOiAoYiAtIHQpKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbm5lclJhZGl1czogbnVtYmVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0QW5nbGU6IG51bWJlciA9IFN0YXJ0QW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmRBbmdsZTogbnVtYmVyID0gTWF0aC5QSSAqIDIgKyBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lbGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuTGluZSksIHRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZywgY3gsIGN5LCBpbm5lclJhZGl1cywgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSB0aGlzLl9fc2hhcGVMaXN0LmNvbmNhdChsaW5lbGF5b3V0LnNoYXBlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChsaW5lbGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lbGF5b3V0OiBMaW5lTGF5b3V0ID0gbmV3IExpbmVMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZWxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLkxpbmUpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIG5ldyBSZWN0KGwsIHQsIHIsIGIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlTGlzdCA9IHRoaXMuX19zaGFwZUxpc3QuY29uY2F0KGxpbmVsYXlvdXQuc2hhcGVMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0cy5wdXNoKGxpbmVsYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLlNjYXR0ZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzcmFkaWFsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYXR0ZXJsYXlvdXQ6IFJhZGlhbFNjYXR0ZXJMYXlvdXQgPSBuZXcgUmFkaWFsU2NhdHRlckxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3g6IG51bWJlciA9IChsICsgcikgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3k6IG51bWJlciA9IChiICsgdCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSAoKHIgLSBsKSA8IChiIC0gdCkgPyAociAtIGwpIDogKGIgLSB0KSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5uZXJSYWRpdXM6IG51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlOiBudW1iZXIgPSBTdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kQW5nbGU6IG51bWJlciA9IE1hdGguUEkgKiAyICsgc3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlcmxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLlNjYXR0ZXIpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIGN4LCBjeSwgaW5uZXJSYWRpdXMsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoc2NhdHRlcmxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLnB1c2goc2NhdHRlcmxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYXR0ZXJMYXlvdXQ6IFNjYXR0ZXJMYXlvdXQgPSBuZXcgU2NhdHRlckxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyTGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuU2NhdHRlciksIHRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZywgbmV3IFJlY3QobCwgdCwgciwgYikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoc2NhdHRlckxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLnB1c2goc2NhdHRlckxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuQXJlYTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNyYWRpYWwpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJlYWxheW91dDogUmFkaWFsQXJlYUxheW91dCA9IG5ldyBSYWRpYWxBcmVhTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjeDogbnVtYmVyID0gKGwgKyByKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjeTogbnVtYmVyID0gKGIgKyB0KSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpdXM6IG51bWJlciA9ICgociAtIGwpIDwgKGIgLSB0KSA/IChyIC0gbCkgOiAoYiAtIHQpKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbm5lclJhZGl1czogbnVtYmVyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0QW5nbGU6IG51bWJlciA9IFN0YXJ0QW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbmRBbmdsZTogbnVtYmVyID0gTWF0aC5QSSAqIDIgKyBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhbGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuQXJlYSksIHRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZywgY3gsIGN5LCBpbm5lclJhZGl1cywgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSB0aGlzLl9fc2hhcGVMaXN0LmNvbmNhdChhcmVhbGF5b3V0LnNoYXBlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChhcmVhbGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJlYWxheW91dDogQXJlYUxheW91dCA9IG5ldyBBcmVhTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZWFsYXlvdXQuY29udmVydCh0aGlzLl9kYXRhbW9kZWwuZ2V0U2VyaWVzQnlUeXBlKENoYXJ0VHlwZS5BcmVhKSwgdGhpcy5fZGF0YW1vZGVsLmVuY29kaW5nLCBuZXcgUmVjdChsLCB0LCByLCBiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSB0aGlzLl9fc2hhcGVMaXN0LmNvbmNhdChhcmVhbGF5b3V0LnNoYXBlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChhcmVhbGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlTGlzdC5zb3J0KChhOiBTaGFwZSwgYjogU2hhcGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGF5b3V0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlc1BhaXJzID0gdGhpcy5sYXlvdXRzW2ldLnNjYWxlUGFpcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHNjYWxlc1BhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IF8uZmluZCh0aGlzLnNjYWxlUGFpcnMsIChwOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuZmlsZWQuZXF1YWxzKHBhaXIuZmlsZWQpICYmIHAuc2NhbGUuZXF1YWwocGFpci5zY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFtdLmNvbmNhdChwYWlyLnNlcmllcyksIGZpbGVkOiBwYWlyLmZpbGVkLCBzY2FsZTogcGFpci5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2VyaWVzID0gcmVzdWx0LnNlcmllcy5jb25jYXQocGFpci5zZXJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sYXlvdXRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycyA9IHRoaXMuX2xheW91dHNbMF0uc2NhbGVQYWlycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcuX3JhZGlhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRMaW5lKGwsIHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzaGFwZSBvZiB0aGlzLl9fc2hhcGVMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVmlld1dpdGhPdXRSZUxheW91dChzaGFwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0TGluZShsOiBudW1iZXIsIHI6IG51bWJlcikge1xuICAgICAgICAgICAgbGV0IHlzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgbGF5b3V0IG9mIHRoaXMubGF5b3V0cykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgbGF5b3V0LnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSBwYWlyLnNjYWxlLmdldFNjYWxlVmFsdWUoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeXMuaW5kZXhPZih5KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5cy5wdXNoKHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBheGlzbGluZTogQXhpc0xpbmVTaGFwZSA9IG5ldyBBeGlzTGluZVNoYXBlKGwsIHksIHIsIHksIERlZmF1bHQuc3Ryb2tlc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QucHVzaChheGlzbGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYmVnaW5DaGFydEFuaW1hdGlvbigpIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNoYXBlID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoc2hhcGUgaW5zdGFuY2VvZiBTY2F0dGVyU2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbjogU2NhdHRlckFuaW1hdGlvbiA9IG5ldyBTY2F0dGVyQW5pbWF0aW9uKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmR1cmF0aW9uID0gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcm9tID0gMC4yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnRvID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5maWxsQWZ0ZXIgPSBmYWxzZTsgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGUuc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSwxMDAqaSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoc2hhcGUgaW5zdGFuY2VvZiBCYXJTaGFwZSl7XG4gICAgICAgICAgICAgICAgICAgIC8vIEJhckFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uOiBCYXJBbmltYXRpb24gPSBuZXcgQmFyQW5pbWF0aW9uKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLmR1cmF0aW9uID0gMjAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcm9tID0gMC4zO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLnRvID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5maWxsQWZ0ZXIgPSBmYWxzZTsgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGUuc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSwxMDAqaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG1lcmFnZSB0aGUgc2NhbGVzIHdoaWNoIGlzICB4IC8geSBcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgX19tZXJhZ2VTY2FsZSgpIHtcblxuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25EcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICAvLyBmb3IgKGxldCBzaGFwZSBvZiB0aGlzLl9fc2hhcGVMaXN0KSB7XG4gICAgICAgICAgICAvLyAgICAgc2hhcGUuZHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICAgIGdldCBsYXlvdXRzKCk6IEJhc2VMYXlvdXRbXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0cztcbiAgICAgICAgfVxuICAgICAgICBnZXQgc2NhbGVQYWlycygpOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NjYWxlUGFpcnM7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDb250ZXh0ID0gYW5kcm9pZC5hcHAuQ29udGV4dDtcbiAgICBpbXBvcnQgTGF5b3V0UGFyYW1zID0gYW5kcm9pZC52aWV3LkxheW91dFBhcmFtcztcbiAgICBpbXBvcnQgRnJhbWVMYXlvdXQgPSBhbmRyb2lkLndpZGdldC5GcmFtZUxheW91dDtcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBleHBvcnQgY29uc3QgU3RhcnRBbmdsZTpudW1iZXIgPSBNYXRoLlBJO1xuICAgIGV4cG9ydCBjbGFzcyBDYXJ0ZXNpYW5DaGFydCBleHRlbmRzIEZyYW1lTGF5b3V0IHtcblxuICAgICAgICBwcml2YXRlIF9kYXRhTW9kZWw6IERhdGFNb2RlbDtcbiAgICAgICAgcHJpdmF0ZSBfY2hhcnRUeXBlOiBDaGFydFR5cGU7XG4gICAgICAgIHByaXZhdGUgX29wdGlvbjogYW55O1xuICAgICAgICBwcml2YXRlIF9heGlzTGlzdDogQmFzZUF4aXNbXTtcbiAgICAgICAgcHJpdmF0ZSBfcGxvdDogQmFzZVBsb3Q7XG5cbiAgICAgICAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCwgb3B0aW9uPzogYW55LCBjaGFydFR5cGU/OiBDaGFydFR5cGUpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9uID0gb3B0aW9uO1xuICAgICAgICAgICAgdGhpcy5fY2hhcnRUeXBlID0gY2hhcnRUeXBlO1xuICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3QgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgb3B0aW9uKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBvcHRpb24oKTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGNoYXJ0VHlwZSh2YWx1ZTogQ2hhcnRUeXBlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPSB0aGlzLl9jaGFydFR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFydFR5cGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZXQgY2hhcnRUeXBlKCk6IENoYXJ0VHlwZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhcnRUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGRhdGFtb2RlbCh2YWx1ZTogRGF0YU1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmKHRoaXMuX2RhdGFNb2RlbC5lbmNvZGluZy5fcmFkaWFsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUmFkaWFsVmlldygpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFZpZXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZXQgZGF0YW1vZGVsKCk6IERhdGFNb2RlbCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YU1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX2xvYWRWaWV3KCkge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiB0aGlzLmRhdGFtb2RlbC5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNZOiBMaW5lQXhpcyA9IG5ldyBMaW5lQXhpcyh0aGlzLmdldENvbnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGF4aXNZLnR5cGUgPSBBeGlzVHlwZS5ZO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kubGF5b3V0UGFyYW1zLndpZHRoID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5uZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kuc2VyaWVzID0gW10uY29uY2F0KHBhaXIuc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3QucHVzaChheGlzWSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVmlldyhheGlzWSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9heGlzTGlzdFt0aGlzLl9heGlzTGlzdC5sZW5ndGggLSAxXS5uZWFyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGxvdDogQmFzZVBsb3QgPSBuZXcgQ2FydGVzaWFuUGxvdCh0aGlzLmdldENvbnRleHQoKSwgdGhpcy5kYXRhbW9kZWwpO1xuICAgICAgICAgICAgcGxvdC5sYXlvdXRQYXJhbXMud2lkdGggPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgcGxvdC5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIHRoaXMuX3Bsb3QgPSBwbG90O1xuICAgICAgICAgICAgdGhpcy5hZGRWaWV3KHBsb3QpO1xuICAgICAgICAgICAgbGV0IGF4aXNYOiBMaW5lQXhpcyA9IG5ldyBMaW5lQXhpcyh0aGlzLmdldENvbnRleHQoKSk7XG4gICAgICAgICAgICBheGlzWC50eXBlID0gQXhpc1R5cGUuWDtcbiAgICAgICAgICAgIGF4aXNYLmxheW91dFBhcmFtcy53aWR0aCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICBheGlzWC5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gMTAwO1xuICAgICAgICAgICAgYXhpc1gubmVhciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9heGlzTGlzdC5wdXNoKGF4aXNYKTtcbiAgICAgICAgICAgIHRoaXMuYWRkVmlldyhheGlzWCk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGJlZ2luQ2hhcnRBbmltYXRpb24oKXtcbiAgICAgICAgICAgIHRoaXMucGxvdC5iZWdpbkNoYXJ0QW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfbG9hZFJhZGlhbFZpZXcoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMuZGF0YW1vZGVsLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFpci5maWxlZC5uYW1lID09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc1k6IFJhZGlhbExpbmVBeGlzID0gbmV3IFJhZGlhbExpbmVBeGlzKHRoaXMuZ2V0Q29udGV4dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kudHlwZSA9IEF4aXNUeXBlLlk7XG4gICAgICAgICAgICAgICAgICAgIGF4aXNZLmxheW91dFBhcmFtcy5oZWlnaHQgPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5sYXlvdXRQYXJhbXMud2lkdGggPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5uZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kuc2VyaWVzID0gW10uY29uY2F0KHBhaXIuc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3QucHVzaChheGlzWSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVmlldyhheGlzWSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9heGlzTGlzdFt0aGlzLl9heGlzTGlzdC5sZW5ndGggLSAxXS5uZWFyID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbG90OiBCYXNlUGxvdCA9IG5ldyBDYXJ0ZXNpYW5QbG90KHRoaXMuZ2V0Q29udGV4dCgpLCB0aGlzLmRhdGFtb2RlbCk7XG4gICAgICAgICAgICBwbG90LmxheW91dFBhcmFtcy53aWR0aCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICBwbG90LmxheW91dFBhcmFtcy5oZWlnaHQgPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgdGhpcy5fcGxvdCA9IHBsb3Q7XG4gICAgICAgICAgICB0aGlzLmFkZFZpZXcocGxvdCk7XG4gICAgICAgICAgICBsZXQgYXhpc1g6IFJhZGlhbExpbmVBeGlzID0gbmV3IFJhZGlhbExpbmVBeGlzKHRoaXMuZ2V0Q29udGV4dCgpKTtcbiAgICAgICAgICAgIGF4aXNYLnR5cGUgPSBBeGlzVHlwZS5YO1xuICAgICAgICAgICAgYXhpc1guZ3Jhdml0eSA9IEdyYXZpdHkuQ2VudGVyO1xuICAgICAgICAgICAgYXhpc1gubGF5b3V0UGFyYW1zLndpZHRoID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIGF4aXNYLmxheW91dFBhcmFtcy5oZWlnaHQgPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgYXhpc1gubmVhciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9heGlzTGlzdC5wdXNoKGF4aXNYKTtcbiAgICAgICAgICAgIHRoaXMuYWRkVmlldyhheGlzWCk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgLy8gcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCxoZWlnaHQsY2FudmFzKTtcbiAgICAgICAgICAgIGxldCBtYXhzaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhbW9kZWwuZW5jb2RpbmcuX3JhZGlhbCkge1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYXhpcyBvZiB0aGlzLl9heGlzTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IGF4aXMub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChheGlzLnR5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdyA6bnVtYmVyID0gd2lkdGguZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgICAgICAgICAgbGV0IGggOm51bWJlciA9IGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOm51bWJlciA9IHc8aD93LzI6aC8yIDtcbiAgICAgICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgLSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0QW5nbGU6bnVtYmVyID0gU3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICBsZXQgc3dlZXA6bnVtYmVyID0gTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdmlldyBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3IGluc3RhbmNlb2YgQmFzZUF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3LnR5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZShuZXcgTWVhc3VyZVNwZWMod2lkdGguZ2V0TWVhc3VyZVZhbHVlKCksIExheW91dFBhcmFtcy5FWEFDVExZKSwgbmV3IE1lYXN1cmVTcGVjKGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKSwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpLCBjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodmlldy50eXBlID09IEF4aXNUeXBlLlgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAoPFJhZGlhbExpbmVBeGlzPnZpZXcpLl9pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAoPFJhZGlhbExpbmVBeGlzPnZpZXcpLl9zdGFydEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8UmFkaWFsTGluZUF4aXM+dmlldykuX3N3ZWVwID0gc3dlZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAoPFJhZGlhbExpbmVBeGlzPnZpZXcpLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3IGluc3RhbmNlb2YgQmFzZVBsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5MZWZ0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblRvcCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5SaWdodCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5Cb3R0b20gPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3Lm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9mZiA9IDAsIHRvZmYgPSAwLCByb2ZmID0gMCwgYm9mZiA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYXhpcyBvZiB0aGlzLl9heGlzTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IGF4aXMub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChheGlzLnR5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMubmVhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZmYgPSBzaXplLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9mZiA9IHNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF4aXMudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcy5uZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9mZiA9IHNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvZmYgPSBzaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IHZpZXcgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIEJhc2VBeGlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlldy50eXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luTGVmdCA9IGxvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblJpZ2h0ID0gcm9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gdmlldy5vbk1lYXN1cmUobmV3IE1lYXN1cmVTcGVjKHdpZHRoLmdldE1lYXN1cmVWYWx1ZSgpIC0gbG9mZiAtIHJvZmYsIHdpZHRoLm1vZGUpLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpZXcudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXcubmVhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luVG9wID0gdG9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpbkJvdHRvbSA9IGJvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZSh3aWR0aCwgbmV3IE1lYXN1cmVTcGVjKGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKSAtIHRvZmYgLSBib2ZmLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblRvcCA9IHRvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5Cb3R0b20gPSBib2ZmOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5SaWdodCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZSh3aWR0aCwgbmV3IE1lYXN1cmVTcGVjKGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKSAtIHRvZmYgLSBib2ZmLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIGNhbnZhcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlldyBpbnN0YW5jZW9mIEJhc2VQbG90KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luTGVmdCA9IGxvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luUmlnaHQgPSByb2ZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblRvcCA9IHRvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luQm90dG9tID0gYm9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHZpZXcub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUud2lkdGggPiBtYXhzaXplLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhzaXplLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZS5oZWlnaHQgPiBtYXhzaXplLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4c2l6ZS5oZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgb25MYXlvdXQobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRJbmZvLnJlc2V0KGwsIHQsIHIsIGIsIHRoaXMucGFkZGluZywgMCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGF4aXMgb2YgdGhpcy5fYXhpc0xpc3QpIHtcbiAgICAgICAgICAgICAgICBheGlzLnNjYWxlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7IFxuICAgICAgICAgICAgdGhpcy5sYXlvdXRJdGVtKHRoaXMucGxvdCwgbCwgdCwgciwgYiwgY2FudmFzKTtcblxuXG4gICAgICAgICAgICBmb3IgKGxldCBheGlzIG9mIHRoaXMuX2F4aXNMaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgaW5zdGFuY2VvZiBCYXNlQXhpcykge1xuICAgICAgICAgICAgICAgICAgICBpZihheGlzIGluc3RhbmNlb2YgUmFkaWFsTGluZUF4aXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXhpcy5fY3ggPSAobCArcikvMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4aXMuX2N5ID0gKHQrYikvMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcy50eXBlID09PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMucGxvdC5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXhpcy5zY2FsZSA9IHBhaXIuc2NhbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMucGxvdC5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneScgJiYgXy54b3IocGFpci5zZXJpZXMsIGF4aXMuc2VyaWVzKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBheGlzLnNjYWxlID0gcGFpci5zY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRJdGVtKGF4aXMsIGwsIHIsIHQsIGIsIGNhbnZhcyk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcGxvdCgpOiBDYXJ0ZXNpYW5QbG90IHtcbiAgICAgICAgICAgIGZvciAobGV0IHBsb3Qgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChwbG90IGluc3RhbmNlb2YgQ2FydGVzaWFuUGxvdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxvdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZGlzcGF0Y2hEcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kaXNwYXRjaERyYXcoY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBpbXBvcnQgUGFkZGluZyA9IGFuZHJvaWQuZ3JhcGhpY3MuUGFkZGluZztcbiAgICBpbXBvcnQgQWxpZ24gPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduO1xuICAgIGltcG9ydCBHcmF2aXR5ID0gYW5kcm9pZC5ncmFwaGljcy5HcmF2aXR5O1xuXG5cbiAgICBpbXBvcnQgQWxpZ25FbG1lbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduRWxtZW50O1xuICAgIGltcG9ydCBNYXJnaW4gPSBhbmRyb2lkLmdyYXBoaWNzLk1hcmdpbjtcblxuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuXG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IExheW91dFBhcmFtcyA9IGFuZHJvaWQudmlldy5MYXlvdXRQYXJhbXM7XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuICAgIGltcG9ydCBGcmFtZUxheW91dCA9IGFuZHJvaWQud2lkZ2V0LkZyYW1lTGF5b3V0O1xuICAgIGltcG9ydCBMaW5lYWVyTGF5b3V0ID0gYW5kcm9pZC53aWRnZXQuTGluZWFyTGF5b3V0O1xuXG4gICAgaW1wb3J0IFJlbmRlclR5cGUgPSBhbmRyb2lkLmdyYXBoaWNzLlJlbmRlclR5cGU7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuICAgIGltcG9ydCBEZXZpY2UgPSBhbmRyb2lkLmRldmljZS5EZXZpY2U7XG4gICAgaW1wb3J0IE9yaWVudGF0aW9uID0gYW5kcm9pZC5ncmFwaGljcy5PcmllbnRhdGlvbjtcbiAgICBpbXBvcnQgUm9vdFZpZXcgPSBhbmRyb2lkLndpZGdldC5Sb290VmlldztcblxuICAgIGV4cG9ydCBjbGFzcyBDaGFydExheW91dCBleHRlbmRzIFJvb3RWaWV3IHtcbiAgICAgICAgLy8gcHJpdmF0ZSBfdzogbnVtYmVyO1xuICAgICAgICAvLyBwcml2YXRlIF9oOiBudW1iZXI7XG4gICAgICAgIC8vIHByaXZhdGUgX2w6IG51bWJlcjtcbiAgICAgICAgLy8gcHJpdmF0ZSBfdDogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9jaGFydDogQ2FydGVzaWFuQ2hhcnQ7XG4gICAgICAgIHByaXZhdGUgX2hvcml6b250YWxsZWdlbmQ6IFNlcmllc0xlZ2VuZDtcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBfZGF0YU1vZGVsOiBEYXRhTW9kZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5jbGlwID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgRXZlbnRIYW5kbGVyID0gKHB0OiBQb2ludCwgdHlwZXM6IEVsZW1lbnRUeXBlLCBpbmZvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBcIiArIHB0LnRvU3RyaW5nKCkgKyBcIiwgdHlwZSBcIiArIHR5cGVzICsgXCIgLCBpbmZvIFwiICsgaW5mbyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVzID09IEVsZW1lbnRUeXBlLlNlcmllc0xlZ2VuZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBzdHJpbmdbXSA9IHRoaXMuX2RhdGFNb2RlbC5maWx0ZXIuc2VyaWVzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHNlcmllcy5pbmRleE9mKGluZm8uc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5maWx0ZXIuc2VyaWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPCAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZmlsdGVyLnNlcmllcy5wdXNoKGluZm8uc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENoYXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3dbJ0V2ZW50SGFuZGxlciddID0gRXZlbnRIYW5kbGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgXG4gICAgICAgIGF0dGFjaEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGRhdGFtb2RlbDogRGF0YU1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaHN0YXJ0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaG1vdmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbnRvdWNoZW5kID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaGNhbmNlbCA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9ubW91c2Vkb3duID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub25tb3VzZW1vdmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNldXAgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNlb3V0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub25tb3VzZW92ZXIgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbmNsaWNrID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmxheW91dFBhcmFtcy53aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB0aGlzLmxheW91dFBhcmFtcy5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIERldmljZS53aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBEZXZpY2UuaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFJlbmRlcihuZXcgQ2FudmFzKGVsZW1lbnQsIFJlbmRlclR5cGUuQ2FudmFzKSk7XG4gICAgICAgICAgICAvLyB0aGlzLl9sID0gMDtcbiAgICAgICAgICAgIC8vIHRoaXMuX3QgPSAwO1xuICAgICAgICAgICAgLy8gdGhpcy5fdyA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAvLyB0aGlzLl9oID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNldEluZm8oMCwwLGVsZW1lbnQuY2xpZW50V2lkdGgsZWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5wYWRkaW5nID0gbmV3IFBhZGRpbmcoMjApOyAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gZGF0YW1vZGVsO1xuICAgICAgICAgICAgdGhpcy5zZXRDaGFydCgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYmVnaW5DaGFydEFuaW1hdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5fY2hhcnQuYmVnaW5DaGFydEFuaW1hdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgc2V0Q2hhcnQoKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbFZpZXdzKCk7XG4gICAgICAgICAgICB0aGlzLl9jaGFydCA9IG5ldyBDYXJ0ZXNpYW5DaGFydChudWxsLCBudWxsLCBDaGFydFR5cGUuQmFyKTtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0LmxheW91dFBhcmFtcy53aWR0aCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICB0aGlzLl9jaGFydC5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIC8vIHRoaXMuX2NoYXJ0LmRhdGFtb2RlbCA9IGRhdGFtb2RlbDtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0LmRhdGFtb2RlbCA9IHRoaXMuX2RhdGFNb2RlbDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhTW9kZWwuYWxsU2VyaWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3Jpem9udGFsbGVnZW5kID0gbmV3IFNlcmllc0xlZ2VuZCgnYmFyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5faG9yaXpvbnRhbGxlZ2VuZC5zZXJpZXMgPSB0aGlzLl9kYXRhTW9kZWwuYWxsU2VyaWVzO1xuICAgICAgICAgICAgICAgIC8vIC5tYXAoKHNlcjogU2VyaWVzLCBpbmRleDogbnVtYmVyLCBhcnI6IFNlcmllc1tdKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBzZXIubmFtZTtcbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhTW9kZWwuc2VyaWVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5faG9yaXpvbnRhbGxlZ2VuZC5zZXJpZXMgPSBkYXRhbW9kZWwuX2dldFNjYWxlQnlOYW1lKCdjb2xvcicsZGF0YW1vZGVsLnNlcmllc1swXS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9ob3Jpem9udGFsbGVnZW5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3Jpem9udGFsbGVnZW5kLnNldE9yaWVudGF0aW9uKE9yaWVudGF0aW9uLkhvcml6b250YWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQubGF5b3V0UGFyYW1zLndpZHRoID0gTGF5b3V0UGFyYW1zLldSQVBfQ09OVEVOVDtcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3Jpem9udGFsbGVnZW5kLmxheW91dFBhcmFtcy5oZWlnaHQgPSAzMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3Jpem9udGFsbGVnZW5kLmdyYXZpdHkgPSBHcmF2aXR5LlRvcDtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFydC5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblRvcCA9IDMwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2hhcnQuZ3Jhdml0eSA9IEdyYXZpdHkuQm90dG9tO1xuICAgICAgICAgICAgdGhpcy5hZGRWaWV3KHRoaXMuX2NoYXJ0LCAwKTtcbiAgICAgICAgICAgIHRoaXMuYWRkVmlldyh0aGlzLl9ob3Jpem9udGFsbGVnZW5kLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgb250b3VjaChldmVudCkge1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgICBsZXQgbWV2ZW50OiBNb3Rpb25FdmVudCA9IG5ldyBNb3Rpb25FdmVudCgwLCAwLCAwKTtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaHN0YXJ0XCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIHN0cj0gXCJUb3VjaCBzdGFydGVkIChcIiArIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCArIFwiLFwiICsgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZICsgXCIpXCI7XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC50b3VjaGVzWzBdLmNsaWVudFgsIGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX0RPV04pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidG91Y2hlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgsIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9VUCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGNhbmNlbFwiOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX0NBTkNFTCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaG1vdmVcIjpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9WRSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfRE9XTik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfTU9WRSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX1VQKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdXQnOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX01PVVNFX09VVCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21vdXNlb3Zlcic6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT1ZFUik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9DTElDSyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXZlbnQuZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICAgICAgICAgIC8vIGdldEVsZW1lbnRSZWN0KGU6IEVsZW1lbnQpOiBSZWN0IHtcbiAgICAgICAgICAgIC8vICAgICB2YXIgcmMgPSBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiBuZXcgUmVjdChyYy5sZWZ0ICsgcGFnZVhPZmZzZXQsIHJjLnRvcCArIHBhZ2VZT2Zmc2V0LCByYy53aWR0aCwgcmMuaGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHZhciBlbGVtZW50cmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG1ldmVudC54ID0gbWV2ZW50LnggLSBlbGVtZW50cmVjdC5sZWZ0O1xuICAgICAgICAgICAgbWV2ZW50LnkgPSBtZXZlbnQueSAtIGVsZW1lbnRyZWN0LnRvcDtcbiAgICAgICAgICAgIHRoaXMuc2VuZEV2ZW50KG1ldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNlbmRFdmVudChldmVudDogTW90aW9uRXZlbnQpIHtcblxuICAgICAgICAgICAgaWYgKGV2ZW50LmFjdGlvbiA+PSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfRE9XTikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hNb3VzZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaFRvdWNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGRpc3BhdGNoRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIuZGlzcGF0Y2hEcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICB2YXIgcmVjdCA9IHRoaXMubGF5b3V0SW5mby5vdXR0ZXJyZWN0O1xuICAgICAgICAgICAgY2FudmFzLmRyYXdSZWN0KHJlY3Quc3RhcnRQb2ludCwgcmVjdC5lbmRQb2ludCwgZmFsc2UsICdibGFjaycpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25NZWFzdXJlKHdpZHRoOiBNZWFzdXJlU3BlYywgaGVpZ2h0OiBNZWFzdXJlU3BlYywgY2FudmFzOiBDYW52YXMpOiBTaXplIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgb25MYXlvdXQobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25MYXlvdXQobCwgdCwgciwgYiwgY2FudmFzKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5b3V0SW5mby5yZXNldChsLHQscixiLHRoaXMuX3BhZGRpbmcsMCk7XG4gICAgICAgICAgICAvLyB0aGlzLmxheW91dEl0ZW0odGhpcy5faG9yaXpvbnRhbGxlZ2VuZCxsLHQscixiLGNhbnZhcyk7XG4gICAgICAgICAgICAvLyB0aGlzLmxheW91dEl0ZW0odGhpcy5fY2hhcnQsbCx0K3RoaXMuX2hvcml6b250YWxsZWdlbmQuaGVpZ2h0LHIsYixjYW52YXMpO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIG9uaW52YWxpZGF0ZSgpIHtcbiAgICAgICAgLy8gICAgIHN1cGVyLm9uaW52YWxpZGF0ZSgpO1xuICAgICAgICAvLyAgICAgdGhpcy5fY2FudmFzLmJlZ2luKCk7XG5cbiAgICAgICAgLy8gICAgIHRoaXMuZGlzcGF0Y2hEcmF3KHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIC8vICAgICB0aGlzLl9jYW52YXMuZW5kKCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBwdWJsaWMgcmVxdWVzdExheW91dCgpIHtcbiAgICAgICAgLy8gICAgIHZhciB3aWR0aDogTWVhc3VyZVNwZWMgPSBuZXcgTWVhc3VyZVNwZWModGhpcy5fdywgTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVCk7XG4gICAgICAgIC8vICAgICB2YXIgaGVpZ2h0OiBNZWFzdXJlU3BlYyA9IG5ldyBNZWFzdXJlU3BlYyh0aGlzLl9oLCBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKTtcbiAgICAgICAgLy8gICAgIHRoaXMuX2NhbnZhcy5iZWdpbigpO1xuICAgICAgICAvLyAgICAgdmFyIHNpemU6IFNpemUgPSB0aGlzLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCB0aGlzLl9jYW52YXMpO1xuICAgICAgICAvLyAgICAgdGhpcy5vbkxheW91dCh0aGlzLl9sLCB0aGlzLl90LCB0aGlzLl9sICsgc2l6ZS53aWR0aCwgdGhpcy5fdCArIHNpemUuaGVpZ2h0LCB0aGlzLl9jYW52YXMpO1xuICAgICAgICAvLyAgICAgdGhpcy5fY2FudmFzLmVuZCgpO1xuICAgICAgICAvLyAgICAgdGhpcy5vbmludmFsaWRhdGUoKTtcblxuICAgICAgICAvLyB9XG5cbiAgICAgICAgcHVibGljIGFkZFZpZXcodmlldzogVmlldywgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG5cbiAgICAgICAgICAgIHN1cGVyLmFkZFZpZXcodmlldywgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgIGV4cG9ydCBjbGFzcyBFdmVudEhhbmRsZXJ7XG4gICAgICAgIFxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gIGFuZHJvaWQudmlldy5WaWV3R3JvdXA7XG4gICAgaW1wb3J0IExpbmVhckxheW91dCA9IGFuZHJvaWQud2lkZ2V0LkxpbmVhckxheW91dDtcbiAgICBleHBvcnQgY2xhc3MgTGVnZW5kTGF5b3V0IGV4dGVuZHMgTGluZWFyTGF5b3V0e1xuICAgICAgICAgICAgXG4gICAgfVxufSJdfQ==
