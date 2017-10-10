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
        var Rect = android.graphics.Rect;
        class Shape extends View {
            constructor() {
                super(null);
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
            onDraw(canvas) {
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
            onDraw(canvas) {
                canvas.drawArc(this.rect, 0, 2 * 180, this.style.background);
            }
            onMouseEvent(event) {
                console.log("shape ==== " + event.toString());
                switch (event.action) {
                    case MotionEvent.ACTION_CLICK:
                        let animation = new ScatterAnimation();
                        animation.duration = 500;
                        animation.from = 0.5;
                        animation.to = 1;
                        this.startAnimation(animation);
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
            constructor() {
                super();
                this.ease = new android.view.animation.BounceAnimationEase();
            }
            applyTransformation(interpolatedTime, canvas, view) {
                if (view instanceof ScatterShape) {
                    canvas.moveTo(view.rect.left + view.rect.width / 2, view.rect.top + view.rect.height / 2);
                    canvas.scale(this.from + (this.to - this.from) * interpolatedTime, this.from + (this.to - this.from) * interpolatedTime);
                    // console.log("before === Scatter animation " + view.rect.width + " interpolatedTime " +interpolatedTime);
                    // // view.rect.scale(1-(this.from+(this.to-this.from)*interpolatedTime));
                    // view.rect.width = view.rect.width*(this.from+(this.to-this.from)*interpolatedTime);
                    // // view.rect.width = view.rect.width*(this.from+(this.to-this.from)*interpolatedTime);
                    // console.log("Scatter animation " + view.rect.width + " interpolatedTime " +interpolatedTime);
                }
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
            onMouseEvent(event) {
                for (let shape of this.__shapeList) {
                    if (shape != null && shape.rect.contains(event.x, event.y)) {
                        let result = shape.onMouseEvent(event);
                        if (!result) {
                            return result;
                        }
                    }
                }
                return false;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy91dGlsL0RlYnVnLnRzIiwic3JjL3V0aWwvVXRpbGl0eS50cyIsInNyYy91dGlsL0NvbG9yVXRpbHMudHMiLCJzcmMvdXRpbC9Sb3RhdGVkUmVjdC50cyIsInNyYy9tb2RlbC9lbnVtL0FuaW1hdGlvblR5cGUudHMiLCJzcmMvbW9kZWwvZW51bS9BZ2cudHMiLCJzcmMvbW9kZWwvZW51bS9PcmRlci50cyIsInNyYy9tb2RlbC9lbnVtL1NjYWxlVHlwZS50cyIsInNyYy9tb2RlbC9lbnVtL0RhdGFUeXBlLnRzIiwic3JjL21vZGVsL2VudW0vQ2hhcnRUeXBlLnRzIiwic3JjL21vZGVsL2VudW0vQXhpc1R5cGUudHMiLCJzcmMvbW9kZWwvY2FydGVzaWFuL1ZhbHVlLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9GaWVsZC50cyIsInNyYy9tb2RlbC9jYXJ0ZXNpYW4vRmlsdGVyLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9FbmNvZGluZy50cyIsInNyYy9tb2RlbC9jYXJ0ZXNpYW4vVHJhbnNGb3JtLnRzIiwic3JjL21vZGVsL2NhcnRlc2lhbi9TZXJpZXMudHMiLCJzcmMvbW9kZWwvY2FydGVzaWFuL0RhdGFNb2RlbC50cyIsInNyYy9zY2FsZS9JU2NhbGUudHMiLCJzcmMvc2NhbGUvU2NhbGUudHMiLCJzcmMvc2NhbGUvTGluZWFyU2NhbGUudHMiLCJzcmMvc2NhbGUvT3JkaW5hbFNjYWxlLnRzIiwic3JjL3NjYWxlL0xvZ1NjYWxlLnRzIiwic3JjL3NjYWxlL0NvbG9yU2NhbGUudHMiLCJzcmMvdmlldy9FbGVtZW50VHlwZS50cyIsInNyYy92aWV3L2xlZ2VuZC9MZWdlbmQudHMiLCJzcmMvdmlldy9zaGFwZS9TaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL0xhYmxlLnRzIiwic3JjL3ZpZXcvc2hhcGUvUGxvdFNoYXBlLnRzIiwic3JjL3ZpZXcvc2hhcGUvQmFyU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9SYWRpYWxCYXJTaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL1NjYXR0ZXJTaGFwZS50cyIsInNyYy92aWV3L3NoYXBlL0xpbmVzU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9BcmVhU2hhcGUudHMiLCJzcmMvdmlldy9zaGFwZS9BeGlzTGluZVNoYXBlLnRzIiwic3JjL3ZpZXcvbGF5b3V0L0Jhc2VMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvQ2FydGVzaWFuTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L0JhckxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9TY2F0dGVyTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L1JhZGlhbENhcnRlc2lhbkxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9SYWRpYWxCYXJMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvUmFkaWFsTGluZUxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9SYWRpYWxBcmVhTGF5b3V0LnRzIiwic3JjL3ZpZXcvbGF5b3V0L1JhZGlhbFNjYXR0ZXJMYXlvdXQudHMiLCJzcmMvdmlldy9sYXlvdXQvTGluZUxheW91dC50cyIsInNyYy92aWV3L2xheW91dC9BcmVhTGF5b3V0LnRzIiwic3JjL3ZpZXcvYXhpcy90aWNrcy9UaWNrcy50cyIsInNyYy92aWV3L2F4aXMvdGlja3MvTGluZWFyVGlja3MudHMiLCJzcmMvdmlldy9heGlzL3RpY2tzL0xvZ1RpY2tzLnRzIiwic3JjL3ZpZXcvYXhpcy90aWNrcy9PcmRpbmFsVGlja3MudHMiLCJzcmMvdmlldy9heGlzL3NoYXBlL0F4aXNTaGFwZS50cyIsInNyYy92aWV3L2F4aXMvQmFzZUF4aXMudHMiLCJzcmMvdmlldy9heGlzL0xpbmVBeGlzLnRzIiwic3JjL3ZpZXcvYXhpcy9SYWRpYWxMaW5lQXhpcy50cyIsInNyYy92aWV3L3Bsb3QvQmFzZVBsb3QudHMiLCJzcmMvdmlldy9wbG90L0NhcnRlc2lhblBsb3QudHMiLCJzcmMvdmlldy9jaGFydC9jYXJ0ZXNpYW4vQ2FydGVzaWFuQ2hhcnQudHMiLCJzcmMvdmlldy9jaGFydC9DaGFydExheW91dC50cyIsInNyYy91dGlsL0V2ZW50SGFuZGxlci50cyIsInNyYy92aWV3L2xlZ2VuZC9MZWdlbmRMYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBVSxPQUFPLENBWWhCO0FBWkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxJQUFJLENBWXJCO0lBWmlCLFdBQUEsSUFBSTtRQUNsQjtZQUNJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBWSxLQUFLLEVBQUMsR0FBVztnQkFDdkMsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO29CQUNMLElBQUksR0FBRyxHQUFTLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQzVCLE1BQU0sR0FBRyxHQUFDLElBQUksR0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUM3QixDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBTztnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7U0FDSjtRQVZZLFVBQUssUUFVakIsQ0FBQTtJQUNMLENBQUMsRUFaaUIsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBWXJCO0FBQUQsQ0FBQyxFQVpTLE9BQU8sS0FBUCxPQUFPLFFBWWhCO0FDWkQsdUNBQXVDO0FBRXZDLElBQVUsT0FBTyxDQXlGaEI7QUF6RkQsV0FBVSxPQUFPO0lBQUMsSUFBQSxJQUFJLENBeUZyQjtJQXpGaUIsV0FBQSxJQUFJO1FBQ2xCLFlBQVksQ0FBQztRQUNiO1lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFhO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7Z0JBQ1osR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JB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QU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBRTVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3JELEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDckQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDckQsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUVyRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFB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Q0QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUM5QixJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBQSxXQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMzQixJQUFJLEdBQUcsR0FBVyxLQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDN0csSUFBSSxHQUFHLEdBQVcsS0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzdHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFFbkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs0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RyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksUUFBUSxHQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDOzRCQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFBQyxDQUFDO3dCQUM1RCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDOzRCQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFBQyxDQUFDO3dCQUU1RCxJQUFJLEtBQUssR0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ3BDLElBQUksTUFBTSxHQUFXLEtBQUssR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUNqRCxJQUFJLElBQUksR0FBVyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3ZDLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUN4RCxzRUFBc0U7d0JBQ3RFLHVDQUF1Qzt3QkFDdkMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUEsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JELENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxNQUFNLENBQUMsUUFBUSxFQUFF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S0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQzNELENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDckQsQ0FBQzs0QkFDTCxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ3JELENBQUM7d0JBQ0wsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBQSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dDQUNoQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0NBQ3RCLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0NBQzNELENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDckQsQ0FBQzs0QkFDTCxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNKLElBQUksTUFBTSxHQUFnQixLQUFBLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQ3BELEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFF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b0JBQzdCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO3dCQUNYLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNqRyxDQUFDO29CQUFBLElBQUksQ0FBQSxDQUFDO3dCQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN2RyxDQUFDO2dCQUNMLENBQUM7Z0JBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDbkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7d0JBQ1gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JHLENBQUM7b0JBQUEsSUFBSSxDQUFBLENBQUM7d0JBQ0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ25HLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7U0FFSjtRQXRNWSxhQUFRLFdBc01wQixDQUFBO0lBQ0wsQ0FBQyxFQW5OaUIsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBbU5yQjtBQUFELENBQUMsRUFuTlMsT0FBTyxLQUFQLE9BQU8sUUFtTmhCO0FDck5ELHdDQUF3QztBQUV4QyxJQUFVLE9BQU8sQ0FtUmhCO0FBblJELFdBQVUsT0FBTztJQUFDLElBQUEsSUFBSSxDQW1SckI7SUFuUmlCLFdBQUEsSUFBSTtRQUNsQixZQUFZLENBQUM7UUFFYixJQUFPLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUU5QyxJQUFPLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUdwQyxJQUFPLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUUxQyxJQUFPLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNoRCxJQUFPLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUN0QyxJQUFPLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxvQkFBNEIsU0FBUSxLQUFBLFFBQVE7WUFPeEMsWUFBWSxPQUFnQjtnQkFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQVBYLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO2dCQUMxQixpQkFBWSxHQUFXLENBQUMsQ0FBQztnQkFDekIsWUFBTyxHQUFXLENBQUMsQ0FBQztnQkFDcEIsYUFBUSxHQUFXLENBQUMsQ0FBQztnQkFDckIsU0FBSSxHQUFXLENBQUMsQ0FBQztnQkFDakIsU0FBSSxHQUFXLENBQUMsQ0FBQztnQkFHckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUMxQyxDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsS0FBYztnQkFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQ2xDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNoQyxDQUFDO2dCQUNMLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQy9CLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUNqQyxDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBSSxJQUFJO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7WUFFRCxJQUFJLEdBQUc7Z0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckIsQ0FBQztZQUNELElBQUksR0FBRztnQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixDQUFDO1lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtnQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDdEIsQ0FBQztZQUNELElBQUksR0FBRyxDQUFDLEtBQWE7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLENBQUM7WUFHRCxJQUFJLE9BQU87Z0JBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekIsQ0FBQztZQUVELElBQUksT0FBTyxDQUFDLEtBQWE7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzFCLENBQUM7WUFDRCxJQUFJLFlBQVksQ0FBQyxLQUFhO2dCQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMvQixDQUFDO1lBQ0QsSUFBSSxZQUFZO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzlCLENBQUM7WUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFhO2dCQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSSxXQUFXO2dCQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQzdCLENBQUM7WUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFhO2dCQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDO1lBQ0QsSUFBSSxNQUFNO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7WUFJUyxZQUFZO2dCQUNsQixJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7Z0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBQSxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxLQUFLLEdBQUcsS0FBQSxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxLQUFLLEdBQUcsS0FBQSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3hELENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBQSxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxLQUFLLEdBQUcsS0FBQSxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDMUQsQ0FBQztnQkFDRCwyQ0FBMkM7Z0JBRTNDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUNELFlBQVksQ0FBQyxNQUFjO2dCQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUM3QyxJQUFJLEtBQUssR0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksU0FBUyxHQUFXLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDaEYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxTQUFTLEdBQVMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsRSxJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7b0JBQy9ELElBQUksQ0FBQyxHQUFXLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDO29CQUMvRCxJQUFJLEVBQUUsR0FBVyxHQUFHLENBQUM7b0JBQ3JCLElBQUksRUFBRSxHQUFXLEdBQUcsQ0FBQztvQkFDckIsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNyRCxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUM7d0JBQ3hELEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFDNUQsQ0FBQztvQkFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRyxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVwRyxJQUFJLE1BQU0sR0FBVyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksTUFBTSxHQUFXLENBQUMsR0FBRyxVQUFVLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUMzRSxJQUFJLEtBQUssR0FBYyxJQUFJLEtBQUEsU0FBUyxFQUFFLENBQUM7b0JBQ3ZDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFBLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEYsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUEsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3BGLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNyQixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQ25DLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFDL0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUMvQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7b0JBQ2pCLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztvQkFFakIsSUFBSSxXQUFXLEdBQVcsR0FBRyxDQUFDO29CQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRWIsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNoRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7d0JBQzdELE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztvQkFDakUsQ0FBQztvQkFDRCxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksS0FBQSxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDOUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7WUFDTCxDQUFDO1lBRUQsWUFBWSxDQUFDLE1BQWM7Z0JBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQzdDLElBQUksS0FBSyxHQUFXLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFN0IsSUFBSSxTQUFTLEdBQVcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNoRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxJQUFJLFNBQVMsR0FBUyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ2xFLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVwRCxJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDMUQsSUFBSSxDQUFDLEdBQVcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBRTFELElBQUksRUFBRSxHQUFXLEdBQUcsQ0FBQztvQkFDckIsSUFBSSxFQUFFLEdBQVcsR0FBRyxDQUFDO29CQUNyQixFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ2pELEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDaEQsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNwRCxDQUFDO29CQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUM3RyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRyxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFFN0csSUFBSSxLQUFLLEdBQWMsSUFBSSxLQUFBLFNBQVMsRUFBRSxDQUFDO29CQUN2QyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksS0FBQSxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hGLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFBLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZGLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNyQixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ2xDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFDL0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUMvQixJQUFJLE1BQU0sR0FBVyxHQUFHLENBQUM7b0JBQ3pCLElBQUksTUFBTSxHQUFXLEdBQUcsQ0FBQztvQkFDekIsSUFBSSxVQUFVLEdBQVcsR0FBRyxDQUFDO29CQUU3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2IsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMvRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ3hELE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFFNUQsQ0FBQztvQkFDRCxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksS0FBQSxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN0RyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztZQUNMLENBQUM7WUFFRCxTQUFTLENBQUMsS0FBa0IsRUFBRSxNQUFtQixFQUFFLE1BQWM7Z0JBQzdELElBQUksSUFBSSxHQUFTLElBQUksQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3JELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNqSSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2pJLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbEQsQ0FBQztZQUNMLENBQUM7WUFDUyxTQUFTLENBQUMsTUFBYztnQkFDOUIsSUFBSSxTQUFTLEdBQVMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9FLElBQUksU0FBUyxHQUFTLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxFQUFFLEdBQVMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckUsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7WUFDM0QsQ0FBQztZQUVTLFNBQVMsQ0FBQyxNQUFjO2dCQUU5QixJQUFJLFNBQVMsR0FBUyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxTQUFTLEdBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNsQixJQUFJLEVBQUUsR0FBUyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNyRSxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RELFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0QsQ0FBQztnQkFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztZQUMxRCxDQUFDO1lBRUQsUUFBUSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxNQUFjO2dCQUMvRCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzlCLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDOUIsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxNQUFjO2dCQUNqQixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2QixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBQ08sU0FBUyxDQUFDLE1BQWM7Z0JBQzVCLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDekUsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUN6RSxJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzt3QkFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUN0QyxJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDM0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUUsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdMLENBQUM7WUFDTCxDQUFDO1NBRUo7UUFyUVksbUJBQWMsaUJBcVExQixDQUFBO0lBQ0wsQ0FBQyxFQW5SaUIsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBbVJyQjtBQUFELENBQUMsRUFuUlMsT0FBTyxLQUFQLE9BQU8sUUFtUmhCO0FDclJELHdDQUF3QztBQUN4QyxJQUFVLE9BQU8sQ0FZaEI7QUFaRCxXQUFVLE9BQU87SUFBQyxJQUFBLElBQUksQ0FZckI7SUFaaUIsV0FBQSxJQUFJO1FBQ2xCLFlBQVksQ0FBQztRQUViLElBQU8sU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRTFDLGNBQXNCLFNBQVEsU0FBUztZQUduQyxJQUFJLE1BQU07Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1NBQ0o7UUFOWSxhQUFRLFdBTXBCLENBQUE7SUFDTCxDQUFDLEVBWmlCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQVlyQjtBQUFELENBQUMsRUFaUyxPQUFPLEtBQVAsT0FBTyxRQVloQjtBQ2JELHdDQUF3QztBQUV4QyxJQUFVLE9BQU8sQ0ErTWhCO0FBL01ELFdBQVUsT0FBTztJQUFDLElBQUEsSUFBSSxDQStNckI7SUEvTWlCLFdBQUEsSUFBSTtRQU1sQixJQUFPLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFPLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFPLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFFcEQsSUFBTyxtQkFBbUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztRQUV4RSxtQkFBMkIsU0FBUSxLQUFBLFFBQVE7WUFTdkMsWUFBWSxPQUFnQixFQUFFLFNBQW9CO2dCQUM5QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBUlgsZ0JBQVcsR0FBWSxFQUFFLENBQUM7Z0JBVTlCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUU1QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUUsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO2dCQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7WUFFckQsQ0FBQztZQUdELFNBQVMsQ0FBQyxLQUFrQixFQUFFLE1BQW1CLEVBQUUsTUFBYztnQkFDN0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsUUFBUSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxNQUFjO2dCQUMvRCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsQ0FBQztnQkFFL0IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ3pCLElBQUksUUFBUSxHQUFZLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztvQkFDekQsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUMxQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNYLEtBQUssS0FBQSxTQUFTLENBQUMsR0FBRztnQ0FDZCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29DQUNYLElBQUksU0FBUyxHQUFvQixJQUFJLEtBQUEsZUFBZSxFQUFFLENBQUM7b0NBQ3ZELElBQUksRUFBRSxHQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQ0FDN0IsSUFBSSxFQUFFLEdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUM3QixJQUFJLE1BQU0sR0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUNqRSxJQUFJLFdBQVcsR0FBVyxDQUFDLENBQUM7b0NBQzVCLElBQUksVUFBVSxHQUFXLEtBQUEsVUFBVSxDQUFDO29DQUNwQyxJQUFJLFFBQVEsR0FBVyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRSxVQUFVLENBQUM7b0NBQy9DLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsS0FBQSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztvQ0FDL0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7b0NBQ2hFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUNsQyxDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLElBQUksU0FBUyxHQUFjLElBQUksS0FBQSxTQUFTLEVBQUUsQ0FBQztvQ0FDM0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNsSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQ0FDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ2xDLENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLEtBQUssS0FBQSxTQUFTLENBQUMsSUFBSTtnQ0FDZixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29DQUVYLElBQUksVUFBVSxHQUFxQixJQUFJLEtBQUEsZ0JBQWdCLEVBQUUsQ0FBQztvQ0FDMUQsSUFBSSxFQUFFLEdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUM3QixJQUFJLEVBQUUsR0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQzdCLElBQUksTUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQ2pFLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztvQ0FDNUIsSUFBSSxVQUFVLEdBQVcsS0FBQSxVQUFVLENBQUM7b0NBQ3BDLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFFLFVBQVUsQ0FBQztvQ0FDL0MsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29DQUNqSixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQ0FDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQ25DLENBQUM7Z0NBQ0QsSUFBSSxDQUFDLENBQUM7b0NBQ0YsSUFBSSxVQUFVLEdBQWUsSUFBSSxLQUFBLFVBQVUsRUFBRSxDQUFDO29DQUM5QyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEtBQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3BILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29DQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDbkMsQ0FBQztnQ0FDRCxLQUFLLENBQUM7NEJBQ1YsS0FBSyxLQUFBLFNBQVMsQ0FBQyxPQUFPO2dDQUNsQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29DQUVYLElBQUksYUFBYSxHQUF3QixJQUFJLEtBQUEsbUJBQW1CLEVBQUUsQ0FBQztvQ0FDbkUsSUFBSSxFQUFFLEdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUM3QixJQUFJLEVBQUUsR0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQzdCLElBQUksTUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQ2pFLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztvQ0FDNUIsSUFBSSxVQUFVLEdBQVcsS0FBQSxVQUFVLENBQUM7b0NBQ3BDLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFFLFVBQVUsQ0FBQztvQ0FDL0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29DQUN2SixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQ0FDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0NBQ3RDLENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osSUFBSSxhQUFhLEdBQWtCLElBQUksS0FBQSxhQUFhLEVBQUUsQ0FBQztvQ0FDdkQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUMxSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQ0FDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0NBQ3RDLENBQUM7Z0NBQ0QsS0FBSyxDQUFDOzRCQUNWLEtBQUssS0FBQSxTQUFTLENBQUMsSUFBSTtnQ0FDZixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29DQUVYLElBQUksVUFBVSxHQUFxQixJQUFJLEtBQUEsZ0JBQWdCLEVBQUUsQ0FBQztvQ0FDMUQsSUFBSSxFQUFFLEdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUM3QixJQUFJLEVBQUUsR0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQzdCLElBQUksTUFBTSxHQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQ2pFLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztvQ0FDNUIsSUFBSSxVQUFVLEdBQVcsS0FBQSxVQUFVLENBQUM7b0NBQ3BDLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQ0FDaEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxLQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29DQUNqSixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQ0FDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQ25DLENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osSUFBSSxVQUFVLEdBQWUsSUFBSSxLQUFBLFVBQVUsRUFBRSxDQUFDO29DQUM5QyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEtBQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3BILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29DQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDbkMsQ0FBQztnQ0FDRCxLQUFLLENBQUM7d0JBQ2QsQ0FBQztvQkFDTCxDQUFDO29CQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUSxFQUFFLENBQVE7d0JBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxDQUFBO29CQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQzs0QkFDNUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7NEJBQzdDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0NBQzNCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQW1EO29DQUNyRixNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDbkUsQ0FBQyxDQUFDLENBQUM7Z0NBQ0gsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0NBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQ0FDckcsQ0FBQztnQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDSixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDdEQsQ0FBQzs0QkFFTCxDQUFDO3dCQUNMLENBQUM7b0JBQ0wsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztvQkFDcEQsQ0FBQztvQkFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMzQixDQUFDO29CQUNELEdBQUcsQ0FBQSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDO3dCQUMvQixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZDLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDUyxXQUFXLENBQUMsQ0FBUyxFQUFFLENBQVM7Z0JBQ3RDLElBQUksRUFBRSxHQUFhLEVBQUUsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUN6QixJQUFJLENBQUMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNwQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNYLElBQUksUUFBUSxHQUFrQixJQUFJLEtBQUEsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0NBQ2pGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNwQyxDQUFDO3dCQUNMLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUdELFlBQVksQ0FBQyxLQUFrQjtnQkFDM0IsR0FBRyxDQUFBLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUM7b0JBQy9CLEVBQUUsQ0FBQSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUN0RCxJQUFJLE1BQU0sR0FBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN4QyxFQUFFLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7NEJBQ1IsTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDbEIsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQ0Q7O2VBRUc7WUFDSyxhQUFhO1lBRXJCLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBYztnQkFDakIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsd0NBQXdDO2dCQUN4QywwQkFBMEI7Z0JBQzFCLElBQUk7WUFDUixDQUFDO1lBQ0QsSUFBSSxPQUFPO2dCQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7WUFDRCxJQUFJLFVBQVU7Z0JBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQztTQUNKO1FBbE1ZLGtCQUFhLGdCQWtNekIsQ0FBQTtJQUNMLENBQUMsRUEvTWlCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQStNckI7QUFBRCxDQUFDLEVBL01TLE9BQU8sS0FBUCxPQUFPLFFBK01oQjtBQ2pORCwyQ0FBMkM7QUFFM0MsSUFBVSxPQUFPLENBb1FoQjtBQXBRRCxXQUFVLE9BQU87SUFBQyxJQUFBLElBQUksQ0FvUXJCO0lBcFFpQixXQUFBLElBQUk7UUFDbEIsWUFBWSxDQUFDO1FBRWIsSUFBTyxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFOUMsSUFBTyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFcEMsSUFBTyxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDaEQsSUFBTyxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDaEQsSUFBTyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDN0IsZUFBVSxHQUFVLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDekMsb0JBQTRCLFNBQVEsV0FBVztZQVEzQyxZQUFZLE9BQWdCLEVBQUUsTUFBWSxFQUFFLFNBQXFCO2dCQUM3RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUN4QixDQUFDO1lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBVTtnQkFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDekIsQ0FBQztZQUNELElBQUksTUFBTTtnQkFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO1lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBZ0I7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDNUIsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLFNBQVM7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQztZQUVELElBQUksU0FBUyxDQUFDLEtBQWdCO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztvQkFDakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUMzQixDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDckIsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLFNBQVM7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQztZQUNPLFNBQVM7Z0JBQ2IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN6QixJQUFJLEtBQUssR0FBYSxJQUFJLEtBQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO3dCQUN0RCxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQzt3QkFDdEQsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO3dCQUMvQixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDbEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3hCLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQzNELENBQUM7Z0JBQ0QsSUFBSSxJQUFJLEdBQWEsSUFBSSxLQUFBLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO2dCQUNwRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO2dCQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxLQUFLLEdBQWEsSUFBSSxLQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDdEQsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0JBQ3JELEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFDTyxlQUFlO2dCQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLElBQUksS0FBSyxHQUFtQixJQUFJLEtBQUEsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO3dCQUNsRSxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQzt3QkFDdEQsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQzt3QkFDckQsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ2xCLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUUzRCxDQUFDO2dCQUNELElBQUksSUFBSSxHQUFhLElBQUksS0FBQSxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25CLElBQUksS0FBSyxHQUFtQixJQUFJLEtBQUEsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUMvQixLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO2dCQUNyRCxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDO2dCQUN0RCxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUVELFNBQVMsQ0FBQyxLQUFrQixFQUFFLE1BQW1CLEVBQUUsTUFBYztnQkFDN0QsK0NBQStDO2dCQUMvQyxJQUFJLE9BQU8sR0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLElBQUksTUFBTSxHQUFXLENBQUMsQ0FBQztvQkFDdkIsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDdkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDeEIsQ0FBQztvQkFDTCxDQUFDO29CQUNELElBQUksQ0FBQyxHQUFXLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLEdBQVcsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN6QyxJQUFJLE1BQU0sR0FBVSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBRTtvQkFDakMsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3pCLElBQUksVUFBVSxHQUFVLEtBQUEsVUFBVSxDQUFDO29CQUNuQyxJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7NEJBQ25LLENBQUM7NEJBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQ0FDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUMxQyxDQUFDOzRCQUNnQixJQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzs0QkFDdkIsSUFBSyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7NEJBQy9CLElBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzRCQUNyQixJQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzt3QkFFNUMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQzs0QkFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQzs0QkFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQzs0QkFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQzs0QkFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUMxQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQ1osSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7NEJBQ3ZCLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ0osSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7NEJBQ3ZCLENBQUM7d0JBQ0wsQ0FBQzt3QkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQ0FDWixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs0QkFDdEIsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDSixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs0QkFDdEIsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUM7b0JBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dDQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dDQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUM5RyxDQUFDOzRCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29DQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0NBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7b0NBQzdDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0NBQ3hILENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ0osSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQ0FDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQ0FDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztvQ0FDekMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQ0FFeEgsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7NEJBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7NEJBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7NEJBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7NEJBQzdDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ2pELENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDakQsQ0FBQzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUM3QixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQy9CLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUNqQyxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFHRCxRQUFRLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLE1BQWM7Z0JBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVuRCxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQ0QsdUNBQXVDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUcvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxZQUFZLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsRUFBRSxDQUFBLENBQUMsSUFBSSxZQUFZLEtBQUEsY0FBYyxDQUFDLENBQUEsQ0FBQzs0QkFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7NEJBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO3dCQUN2QixDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dDQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29DQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0NBRTVCLENBQUM7NEJBQ0wsQ0FBQzt3QkFDTCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQ0FDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3hFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQ0FDNUIsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRTlDLENBQUM7WUFHTCxDQUFDO1lBRUQsSUFBSSxJQUFJO2dCQUNKLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBQSxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDO2dCQUNMLENBQUM7WUFDTCxDQUFDO1lBRU0sWUFBWSxDQUFDLE1BQWM7Z0JBQzlCLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsQ0FBQztTQUVKO1FBeFBZLG1CQUFjLGlCQXdQMUIsQ0FBQTtJQUNMLENBQUMsRUFwUWlCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQW9RckI7QUFBRCxDQUFDLEVBcFFTLE9BQU8sS0FBUCxPQUFPLFFBb1FoQjtBQ3JRRCx3Q0FBd0M7QUFDeEMsSUFBVSxPQUFPLENBa09oQjtBQWxPRCxXQUFVLE9BQU87SUFBQyxJQUFBLElBQUksQ0FrT3JCO0lBbE9pQixXQUFBLElBQUk7UUFDbEIsSUFBTyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFFMUMsSUFBTyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFPMUMsSUFBTyxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFNeEMsSUFBTyxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDaEQsSUFBTyxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBSXBELElBQU8sVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBRWhELElBQU8sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3RDLElBQU8sV0FBVyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ2xELElBQU8sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRTFDLGlCQUF5QixTQUFRLFFBQVE7WUFTckMsWUFBWSxPQUFnQjtnQkFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2dCQUNsQixJQUFJLFlBQVksR0FBRyxDQUFDLEVBQVMsRUFBRSxLQUFrQixFQUFFLElBQVM7b0JBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLEdBQUcsS0FBSyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDekUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUEsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLElBQUksTUFBTSxHQUFhLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDckQsSUFBSSxLQUFLLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNkLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ25ELENBQUM7d0JBQ0wsQ0FBQzt3QkFBQSxJQUFJLENBQUEsQ0FBQzs0QkFDRixFQUFFLENBQUEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQ0FDVixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDcEQsQ0FBQzt3QkFDTCxDQUFDO3dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQztnQkFFTCxDQUFDLENBQUE7Z0JBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFlBQVksQ0FBQztZQUMxQyxDQUFDO1lBSUQsYUFBYSxDQUFDLE9BQW9CLEVBQUUsU0FBb0I7Z0JBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUV2QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztnQkFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsaUNBQWlDO2dCQUNqQyxrQ0FBa0M7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsV0FBVyxFQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVwQixDQUFDO1lBRUQsUUFBUTtnQkFDSixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFBLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0JBQzVELHFDQUFxQztnQkFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDeEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLEtBQUEsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO29CQUMxRCx3REFBd0Q7b0JBQ3hELHVCQUF1QjtvQkFDdkIsS0FBSztnQkFDVCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsK0ZBQStGO2dCQUNuRyxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQztvQkFDdEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNoRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNuRCxDQUFDO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsQ0FBQztZQUVPLE9BQU8sQ0FBQyxLQUFLO2dCQUVqQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxLQUFLLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2xDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDYixJQUFJLE1BQU0sR0FBZ0IsSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLEtBQUssWUFBWTt3QkFDYiw0RkFBNEY7d0JBQzVGLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3RHLEtBQUssQ0FBQztvQkFDVixLQUFLLFVBQVU7d0JBQ1gsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDbEgsS0FBSyxDQUFDO29CQUNWLEtBQUssYUFBYTt3QkFDZCxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN0SCxLQUFLLENBQUM7b0JBQ1YsS0FBSyxXQUFXO3dCQUNaLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3RHLEtBQUssQ0FBQztvQkFDVixLQUFLLFdBQVc7d0JBQ1osTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFDdEYsS0FBSyxDQUFDO29CQUNWLEtBQUssV0FBVzt3QkFDWixNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3dCQUN0RixLQUFLLENBQUM7b0JBQ1YsS0FBSyxTQUFTO3dCQUNWLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUNwRixLQUFLLENBQUM7b0JBQ1YsS0FBSyxVQUFVO3dCQUNYLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBQ3JGLEtBQUssQ0FBQztvQkFDVixLQUFLLFdBQVc7d0JBQ1osTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFDdEYsS0FBSyxDQUFDO29CQUNWLEtBQUssT0FBTzt3QkFDUixNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDakYsS0FBSyxDQUFDO2dCQUVkLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUM5QixxQ0FBcUM7Z0JBQ3JDLDBDQUEwQztnQkFDMUMseUZBQXlGO2dCQUN6RixJQUFJO2dCQUNKLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDdkQsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDTSxTQUFTLENBQUMsS0FBa0I7Z0JBRS9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztZQUNMLENBQUM7WUFFTSxZQUFZLENBQUMsTUFBYztnQkFDOUIsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRSxDQUFDO1lBRUQsU0FBUyxDQUFDLEtBQWtCLEVBQUUsTUFBbUIsRUFBRSxNQUFjO2dCQUM3RCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRWxELENBQUM7WUFFRCxRQUFRLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLE1BQWM7Z0JBQy9ELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxrREFBa0Q7Z0JBQ2xELDBEQUEwRDtnQkFDMUQsNkVBQTZFO1lBRWpGLENBQUM7WUFHRCxtQkFBbUI7WUFDbkIsNEJBQTRCO1lBQzVCLDRCQUE0QjtZQUU1Qix1Q0FBdUM7WUFDdkMsMEJBQTBCO1lBQzFCLElBQUk7WUFFSiwyQkFBMkI7WUFDM0Isb0ZBQW9GO1lBQ3BGLHFGQUFxRjtZQUNyRiw0QkFBNEI7WUFDNUIsb0VBQW9FO1lBQ3BFLGtHQUFrRztZQUNsRywwQkFBMEI7WUFDMUIsMkJBQTJCO1lBRTNCLElBQUk7WUFFRyxPQUFPLENBQUMsSUFBVSxFQUFFLEtBQWE7Z0JBRXBDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQztTQUVKO1FBdE1ZLGdCQUFXLGNBc012QixDQUFBO0lBQ0wsQ0FBQyxFQWxPaUIsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBa09yQjtBQUFELENBQUMsRUFsT1MsT0FBTyxLQUFQLE9BQU8sUUFrT2hCO0FDcE9ELElBQVUsT0FBTyxDQUloQjtBQUpELFdBQVUsT0FBTztJQUFDLElBQUEsSUFBSSxDQUlyQjtJQUppQixXQUFBLElBQUk7UUFDbEI7U0FFQztRQUZZLGlCQUFZLGVBRXhCLENBQUE7SUFDTCxDQUFDLEVBSmlCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQUlyQjtBQUFELENBQUMsRUFKUyxPQUFPLEtBQVAsT0FBTyxRQUloQjtBQ0pELHdDQUF3QztBQUV4QyxJQUFVLE9BQU8sQ0FRaEI7QUFSRCxXQUFVLE9BQU87SUFBQyxJQUFBLElBQUksQ0FRckI7SUFSaUIsV0FBQSxJQUFJO1FBRWxCLFlBQVksQ0FBQztRQUViLElBQU8sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ2xELGtCQUEwQixTQUFRLFlBQVk7U0FFN0M7UUFGWSxpQkFBWSxlQUV4QixDQUFBO0lBQ0wsQ0FBQyxFQVJpQixJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUFRckI7QUFBRCxDQUFDLEVBUlMsT0FBTyxLQUFQLE9BQU8sUUFRaEIiLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgZXhwb3J0IGNsYXNzIERlYnVne1xuICAgICAgICBzdGF0aWMgYXNzZXJ0KGZsZzpib29sZWFuPWZhbHNlLGxvZz86c3RyaW5nKXtcbiAgICAgICAgICAgIGlmKCFmbGcpe1xuICAgICAgICAgICAgICAgIGxldCBlcnI6RXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBsb2crXCJcXG5cIitlcnIuc3RhY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGxvZyhsb2c6YW55KXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvZyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBVdGlsaXR5IHtcbiAgICAgICAgc3RhdGljIG1heChhcnI6IG51bWJlcltdKSB7XG4gICAgICAgICAgICB2YXIgdnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgYXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTih2KSAmJiB2ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdnMucHVzaCh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkodGhpcywgdnMpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBtaW4oYXJyOiBudW1iZXJbXSkge1xuICAgICAgICAgICAgdmFyIHZzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFycikge1xuICAgICAgICAgICAgICAgIGlmICghaXNOYU4odikgJiYgdiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZzLnB1c2godik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluLmFwcGx5KHRoaXMsIHZzKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgaXNrZXkoa2V5OiBhbnkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgIT09IHVuZGVmaW5lZCAmJiBrZXkgIT09IG51bGwgJiYgdHlwZW9mIChrZXkpID09ICdzdHJpbmcnICYmIGtleVswXSAhPSAnXyc7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY2hlY2tBcnJheVR5cGUoYXJyOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KGFyciAhPSBudWxsKTtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChhcnIubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHR5cGVvZiBhcnJbMF07XG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIGFycikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlICE9IHR5cGVvZiB2KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZ2V0VHlwZSh2OiBhbnkpOiBEYXRhVHlwZSB7XG4gICAgICAgICAgICBsZXQgZGF0YXR5cGU6IERhdGFUeXBlID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh2IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBEZWJ1Zy5hc3NlcnQodiAhPSBudWxsKTtcbiAgICAgICAgICAgICAgICBEZWJ1Zy5hc3NlcnQodi5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICBkYXRhdHlwZSA9IERhdGFUeXBlLkFycmF5O1xuICAgICAgICAgICAgICAgIGlmIChVdGlsaXR5LmNoZWNrQXJyYXlUeXBlKHYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlsaXR5LmdldFR5cGUodlswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGRhdGF0eXBlID0gRGF0YVR5cGUuTnVtYmVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGRhdGF0eXBlID0gRGF0YVR5cGUuU3RyaW5nO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdiA9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBkYXRhdHlwZSA9IERhdGFUeXBlLkJvb2xlYW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIERlYnVnLmFzc2VydCh0cnVlLCBcIlZhbHVlIGNhbid0IGJlIE9iamVjdCBleGNlcHQgQXJyYXlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YXR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIG1lcmdlU2NhbGUoc2NhbGVBOiBTY2FsZSwgc2NhbGVCOiBTY2FsZSxmb3JjZTpib29sZWFuPWZhbHNlKSB7XG4gICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChzY2FsZUEuaWQgPT0gc2NhbGVCLmlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNjYWxlQSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSAmJiBzY2FsZUIgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRvbWFpbnVuaW9uczpzdHJpbmdbXSA9IF8udW5pb24oc2NhbGVBLmRvbWFpbnMsIHNjYWxlQi5kb21haW5zKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoZm9yY2UgfHwoc2NhbGVBLmRvbWFpbnMubGVuZ3RoIC9kb21haW51bmlvbnMubGVuZ3RoID4wLjUgJiYgc2NhbGVCLmRvbWFpbnMubGVuZ3RoL2RvbWFpbnVuaW9ucy5sZW5ndGggPiAwLjUpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHNjYWxlQS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWluKGRvbWFpbnVuaW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCggc2NhbGVBIGluc3RhbmNlb2YgTGluZWFyU2NhbGUgJiYgc2NhbGVCIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpICl7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1pbjpudW1iZXIgPSBNYXRoLm1pbihzY2FsZUEubWluLCBzY2FsZUIubWluKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1heDpudW1iZXIgPSBNYXRoLm1heChzY2FsZUEubWF4LCBzY2FsZUIubWF4KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhdGUxIDpudW1iZXIgPU1hdGguYWJzKG1heC1taW4pLyhNYXRoLmFicyhzY2FsZUEubWF4LXNjYWxlQS5taW4pKSA7XG4gICAgICAgICAgICAgICAgICAgIGxldCByYXRlMiA6bnVtYmVyID1NYXRoLmFicyhtYXgtbWluKS8oTWF0aC5hYnMoc2NhbGVCLm1heC1zY2FsZUIubWluKSkgO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMaW5lYXIgcmFuZ2UgcmF0ZTEgPSBcIiArIHJhdGUxICArXCIgLCByYXRlMiA9IFwiICsgcmF0ZTIpO1xuICAgICAgICAgICAgICAgICAgICBpZihmb3JjZSB8fChyYXRlMTw1ICYmIHJhdGUyIDwgNSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBzY2FsZUEuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbihbbWluLCBtYXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGVBIGluc3RhbmNlb2YgTG9nU2NhbGUgJiYgc2NhbGVCIGluc3RhbmNlb2YgTG9nU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2NhbGVBLmxvZ0Jhc2UgPT0gc2NhbGVCLmxvZ0Jhc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBzY2FsZUEuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbihbTWF0aC5taW4oc2NhbGVBLm1pbiwgc2NhbGVCLm1pbiksIE1hdGgubWF4KHNjYWxlQS5tYXgsIHNjYWxlQi5tYXgpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBleHBvcnQgY2xhc3MgQ29sb3JVdGlscyB7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9jb2xvcmluZGV4Om51bWJlciA9IC0xO1xuICAgICAgICBwdWJsaWMgc3RhdGljIENvbG9yIDpzdHJpbmdbXT1cbiAgICAgICAgWydyZ2IoMjUxLCAxMTgsIDEyMyknLCdyZ2IoMTI5LCAyMjcsIDIzOCknLCcjODhiZGU2JywgJyNmYmIyNTgnLCAnIzkwY2Q5NycsICcjZjZhYWM5JywgJyNiZmE1NTQnLCAnI2JjOTljNycsICcjZWRkZDQ2JywgJyNmMDdlNmUnLCAnIzhjOGM4YyddO1xuICAgICAgICAvLyBbXCIjRkZGRkYwXCIsIFwiI0ZGRkZFMFwiLCBcIiNGRkZGMDAgXCIsIFwiI0ZGRkFGQVwiLCBcIiNGRkZBRjBcIiwgXCIjRkZGQUNEXCIsIFwiI0ZGRjhEQyBcIiwgXCIjRkZGNjhGXCIsIFwiI0ZGRjVFRVwiLCBcIiNGRkYwRjVcIiwgXCIjRkZFRkRCIFwiLCBcIiNGRkVGRDVcIiwgXCIjRkZFQzhCXCIsIFwiI0ZGRUJDRFwiLCBcIiNGRkU3QkEgXCIsIFwiI0ZGRTRFMVwiLCBcIiNGRkU0QzRcIiwgXCIjRkZFNEI1XCIsIFwiI0ZGRTFGRiBcIiwgXCIjRkZERUFEXCIsIFwiI0ZGREFCOVwiLCBcIiNGRkQ3MDBcIiwgXCIjRkZEMzlCIFwiLCBcIiNGRkMxQzFcIiwgXCIjRkZDMTI1XCIsIFwiI0ZGQzBDQlwiLCBcIiNGRkJCRkYgXCIsIFwiI0ZGQjkwRlwiLCBcIiNGRkI2QzFcIiwgXCIjRkZCNUM1XCIsIFwiI0ZGQUVCOSBcIiwgXCIjRkZBNTRGXCIsIFwiI0ZGQTUwMFwiLCBcIiNGRkEwN0FcIiwgXCIjRkY4QzY5IFwiLCBcIiNGRjhDMDBcIiwgXCIjRkY4M0ZBXCIsIFwiI0ZGODJBQlwiLCBcIiNGRjgyNDcgXCIsIFwiI0ZGN0Y1MFwiLCBcIiNGRjdGMjRcIiwgXCIjRkY3RjAwXCIsIFwiI0ZGNzI1NiBcIiwgXCIjRkY2RUI0XCIsIFwiI0ZGNkE2QVwiLCBcIiNGRjY5QjRcIiwgXCIjRkY2MzQ3IFwiLCBcIiNGRjQ1MDBcIiwgXCIjRkY0MDQwXCIsIFwiI0ZGM0U5NlwiLCBcIiNGRjM0QjMgXCIsIFwiI0ZGMzAzMFwiLCBcIiNGRjE0OTNcIiwgXCIjRkYwMEZGXCIsIFwiI0ZGMDAwMCBcIiwgXCIjRkRGNUU2XCIsIFwiI0ZDRkNGQ1wiLCBcIiNGQUZBRkFcIiwgXCIjRkFGQUQyIFwiLCBcIiNGQUYwRTZcIiwgXCIjRkFFQkQ3XCIsIFwiI0ZBODA3MlwiLCBcIiNGOEY4RkYgXCIsIFwiI0Y3RjdGN1wiLCBcIiNGNUZGRkFcIiwgXCIjRjVGNUY1XCIsIFwiI0Y1RjVEQyBcIiwgXCIjRjVERUIzXCIsIFwiI0Y0RjRGNFwiLCBcIiNGNEE0NjBcIiwgXCIjRjJGMkYyIFwiLCBcIiNGMEZGRkZcIiwgXCIjRjBGRkYwXCIsIFwiI0YwRjhGRlwiLCBcIiNGMEYwRjAgXCIsIFwiI0YwRTY4Q1wiLCBcIiNGMDgwODBcIiwgXCIjRUVFRUUwXCIsIFwiI0VFRUVEMSBcIiwgXCIjRUVFRTAwXCIsIFwiI0VFRTlFOVwiLCBcIiNFRUU5QkZcIiwgXCIjRUVFOENEIFwiLCBcIiNFRUU4QUFcIiwgXCIjRUVFNjg1XCIsIFwiI0VFRTVERVwiLCBcIiNFRUUwRTUgXCIsIFwiI0VFREZDQ1wiLCBcIiNFRURDODJcIiwgXCIjRUVEOEFFXCIsIFwiI0VFRDVEMiBcIiwgXCIjRUVENUI3XCIsIFwiI0VFRDJFRVwiLCBcIiNFRUNGQTFcIiwgXCIjRUVDQkFEIFwiLCBcIiNFRUM5MDBcIiwgXCIjRUVDNTkxXCIsIFwiI0VFQjRCNFwiLCBcIiNFRUI0MjIgXCIsIFwiI0VFQUVFRVwiLCBcIiNFRUFEMEVcIiwgXCIjRUVBOUI4XCIsIFwiI0VFQTJBRCBcIiwgXCIjRUU5QTQ5XCIsIFwiI0VFOUEwMFwiLCBcIiNFRTk1NzJcIiwgXCIjRUU4MkVFIFwiLCBcIiNFRTgyNjJcIiwgXCIjRUU3QUU5XCIsIFwiI0VFNzk5RlwiLCBcIiNFRTc5NDIgXCIsIFwiI0VFNzYyMVwiLCBcIiNFRTc2MDBcIiwgXCIjRUU2QUE3XCIsIFwiI0VFNkE1MCBcIiwgXCIjRUU2MzYzXCIsIFwiI0VFNUM0MlwiLCBcIiNFRTQwMDBcIiwgXCIjRUUzQjNCIFwiLCBcIiNFRTNBOENcIiwgXCIjRUUzMEE3XCIsIFwiI0VFMkMyQ1wiLCBcIiNFRTEyODkgXCIsIFwiI0VFMDBFRVwiLCBcIiNFRTAwMDBcIiwgXCIjRURFREVEXCIsIFwiI0VCRUJFQiBcIiwgXCIjRUFFQUVBXCIsIFwiI0U5OTY3QVwiLCBcIiNFOEU4RThcIiwgXCIjRTZFNkZBIFwiLCBcIiNFNUU1RTVcIiwgXCIjRTNFM0UzXCIsIFwiI0UwRkZGRlwiLCBcIiNFMEVFRUUgXCIsIFwiI0UwRUVFMFwiLCBcIiNFMEUwRTBcIiwgXCIjRTA2NkZGXCIsIFwiI0RFREVERSBcIiwgXCIjREVCODg3XCIsIFwiI0REQTBERFwiLCBcIiNEQ0RDRENcIiwgXCIjREMxNDNDIFwiLCBcIiNEQkRCREJcIiwgXCIjREI3MDkzXCIsIFwiI0RBQTUyMFwiLCBcIiNEQTcwRDYgXCIsIFwiI0Q5RDlEOVwiLCBcIiNEOEJGRDhcIiwgXCIjRDZENkQ2XCIsIFwiI0Q0RDRENCBcIiwgXCIjRDNEM0QzXCIsIFwiI0QyQjQ4Q1wiLCBcIiNEMjY5MUVcIiwgXCIjRDFFRUVFIFwiLCBcIiNEMUQxRDFcIiwgXCIjRDE1RkVFXCIsIFwiI0QwMjA5MFwiLCBcIiNDRkNGQ0YgXCIsIFwiI0NEQ0RDMVwiLCBcIiNDRENEQjRcIiwgXCIjQ0RDRDAwXCIsIFwiI0NEQzlDOSBcIiwgXCIjQ0RDOUE1XCIsIFwiI0NEQzhCMVwiLCBcIiNDREM2NzNcIiwgXCIjQ0RDNUJGIFwiLCBcIiNDREMxQzVcIiwgXCIjQ0RDMEIwXCIsIFwiI0NEQkU3MFwiLCBcIiNDREJBOTYgXCIsIFwiI0NEQjdCNVwiLCBcIiNDREI3OUVcIiwgXCIjQ0RCNUNEXCIsIFwiI0NEQjM4QiBcIiwgXCIjQ0RBRjk1XCIsIFwiI0NEQUQwMFwiLCBcIiNDREFBN0RcIiwgXCIjQ0Q5QjlCIFwiLCBcIiNDRDlCMURcIiwgXCIjQ0Q5NkNEXCIsIFwiI0NEOTUwQ1wiLCBcIiNDRDkxOUUgXCIsIFwiI0NEOEM5NVwiLCBcIiNDRDg1M0ZcIiwgXCIjQ0Q4NTAwXCIsIFwiI0NEODE2MiBcIiwgXCIjQ0Q3MDU0XCIsIFwiI0NENjlDOVwiLCBcIiNDRDY4ODlcIiwgXCIjQ0Q2ODM5IFwiLCBcIiNDRDY2MURcIiwgXCIjQ0Q2NjAwXCIsIFwiI0NENjA5MFwiLCBcIiNDRDVDNUMgXCIsIFwiI0NENUI0NVwiLCBcIiNDRDU1NTVcIiwgXCIjQ0Q0RjM5XCIsIFwiI0NEMzcwMCBcIiwgXCIjQ0QzMzMzXCIsIFwiI0NEMzI3OFwiLCBcIiNDRDI5OTBcIiwgXCIjQ0QyNjI2IFwiLCBcIiNDRDEwNzZcIiwgXCIjQ0QwMENEXCIsIFwiI0NEMDAwMFwiLCBcIiNDQ0NDQ0MgXCIsIFwiI0NBRkY3MFwiLCBcIiNDQUUxRkZcIiwgXCIjQzlDOUM5XCIsIFwiI0M3QzdDNyBcIiwgXCIjQzcxNTg1XCIsIFwiI0M2RTJGRlwiLCBcIiNDNjcxNzFcIiwgXCIjQzVDMUFBIFwiLCBcIiNDNEM0QzRcIiwgXCIjQzJDMkMyXCIsIFwiI0MxRkZDMVwiLCBcIiNDMUNEQ0QgXCIsIFwiI0MxQ0RDMVwiLCBcIiNDMUMxQzFcIiwgXCIjQzBGRjNFXCIsIFwiI0JGRUZGRiBcIiwgXCIjQkZCRkJGXCIsIFwiI0JGM0VGRlwiLCBcIiNCRUJFQkVcIiwgXCIjQkRCREJEIFwiLCBcIiNCREI3NkJcIiwgXCIjQkNFRTY4XCIsIFwiI0JDRDJFRVwiLCBcIiNCQzhGOEYgXCIsIFwiI0JCRkZGRlwiLCBcIiNCQUJBQkFcIiwgXCIjQkE1NUQzXCIsIFwiI0I5RDNFRSBcIiwgXCIjQjhCOEI4XCIsIFwiI0I4ODYwQlwiLCBcIiNCN0I3QjdcIiwgXCIjQjVCNUI1IFwiLCBcIiNCNEVFQjRcIiwgXCIjQjRDRENEXCIsIFwiI0I0NTJDRFwiLCBcIiNCM0VFM0EgXCIsIFwiI0IzQjNCM1wiLCBcIiNCMkRGRUVcIiwgXCIjQjIzQUVFXCIsIFwiI0IyMjIyMiBcIiwgXCIjQjBFMkZGXCIsIFwiI0IwRTBFNlwiLCBcIiNCMEM0REVcIiwgXCIjQjBCMEIwIFwiLCBcIiNCMDMwNjBcIiwgXCIjQUVFRUVFXCIsIFwiI0FERkYyRlwiLCBcIiNBREQ4RTYgXCIsIFwiI0FEQURBRFwiLCBcIiNBQkFCQUJcIiwgXCIjQUI4MkZGXCIsIFwiI0FBQUFBQSBcIiwgXCIjQTlBOUE5XCIsIFwiI0E4QThBOFwiLCBcIiNBNkE2QTZcIiwgXCIjQTUyQTJBIFwiLCBcIiNBNEQzRUVcIiwgXCIjQTNBM0EzXCIsIFwiI0EyQ0Q1QVwiLCBcIiNBMkI1Q0QgXCIsIFwiI0ExQTFBMVwiLCBcIiNBMDUyMkRcIiwgXCIjQTAyMEYwXCIsIFwiIzlGQjZDRCBcIiwgXCIjOUY3OUVFXCIsIFwiIzlFOUU5RVwiLCBcIiM5QzlDOUNcIiwgXCIjOUJDRDlCIFwiLCBcIiM5QjMwRkZcIiwgXCIjOUFGRjlBXCIsIFwiIzlBQ0QzMlwiLCBcIiM5QUMwQ0QgXCIsIFwiIzlBMzJDRFwiLCBcIiM5OTk5OTlcIiwgXCIjOTkzMkNDXCIsIFwiIzk4RkI5OCBcIiwgXCIjOThGNUZGXCIsIFwiIzk3RkZGRlwiLCBcIiM5NkNEQ0RcIiwgXCIjOTY5Njk2IFwiLCBcIiM5NDk0OTRcIiwgXCIjOTQwMEQzXCIsIFwiIzkzNzBEQlwiLCBcIiM5MTkxOTEgXCIsIFwiIzkxMkNFRVwiLCBcIiM5MEVFOTBcIiwgXCIjOEZCQzhGXCIsIFwiIzhGOEY4RiBcIiwgXCIjOEVFNUVFXCIsIFwiIzhFOEU4RVwiLCBcIiM4RThFMzhcIiwgXCIjOEUzODhFIFwiLCBcIiM4REVFRUVcIiwgXCIjOERCNkNEXCIsIFwiIzhDOEM4Q1wiLCBcIiM4QjhCODMgXCIsIFwiIzhCOEI3QVwiLCBcIiM4QjhCMDBcIiwgXCIjOEI4OTg5XCIsIFwiIzhCODk3MCBcIiwgXCIjOEI4ODc4XCIsIFwiIzhCODY4MlwiLCBcIiM4Qjg2NEVcIiwgXCIjOEI4Mzg2IFwiLCBcIiM4QjgzNzhcIiwgXCIjOEI4MTRDXCIsIFwiIzhCN0U2NlwiLCBcIiM4QjdEN0IgXCIsIFwiIzhCN0Q2QlwiLCBcIiM4QjdCOEJcIiwgXCIjOEI3OTVFXCIsIFwiIzhCNzc2NSBcIiwgXCIjOEI3NTAwXCIsIFwiIzhCNzM1NVwiLCBcIiM4QjY5NjlcIiwgXCIjOEI2OTE0IFwiLCBcIiM4QjY2OEJcIiwgXCIjOEI2NTA4XCIsIFwiIzhCNjM2Q1wiLCBcIiM4QjVGNjUgXCIsIFwiIzhCNUEyQlwiLCBcIiM4QjVBMDBcIiwgXCIjOEI1NzQyXCIsIFwiIzhCNEMzOSBcIiwgXCIjOEI0Nzg5XCIsIFwiIzhCNDc1RFwiLCBcIiM4QjQ3MjZcIiwgXCIjOEI0NTEzIFwiLCBcIiM4QjQ1MDBcIiwgXCIjOEIzRTJGXCIsIFwiIzhCM0E2MlwiLCBcIiM4QjNBM0EgXCIsIFwiIzhCMzYyNlwiLCBcIiM4QjI1MDBcIiwgXCIjOEIyMzIzXCIsIFwiIzhCMjI1MiBcIiwgXCIjOEIxQzYyXCIsIFwiIzhCMUExQVwiLCBcIiM4QjBBNTBcIiwgXCIjOEIwMDhCIFwiLCBcIiM4QjAwMDBcIiwgXCIjOEE4QThBXCIsIFwiIzhBMkJFMlwiLCBcIiM4OTY4Q0QgXCIsIFwiIzg3Q0VGRlwiLCBcIiM4N0NFRkFcIiwgXCIjODdDRUVCXCIsIFwiIzg3ODc4NyBcIiwgXCIjODU4NTg1XCIsIFwiIzg0ODQ4NFwiLCBcIiM4NDcwRkZcIiwgXCIjODM4QjhCIFwiLCBcIiM4MzhCODNcIiwgXCIjODM2RkZGXCIsIFwiIzgyODI4MlwiLCBcIiM3RkZGRDQgXCIsIFwiIzdGRkYwMFwiLCBcIiM3RjdGN0ZcIiwgXCIjN0VDMEVFXCIsIFwiIzdEOUVDMCBcIiwgXCIjN0Q3RDdEXCIsIFwiIzdEMjZDRFwiLCBcIiM3Q0ZDMDBcIiwgXCIjN0NDRDdDIFwiLCBcIiM3QjY4RUVcIiwgXCIjN0FDNUNEXCIsIFwiIzdBOEI4QlwiLCBcIiM3QTdBN0EgXCIsIFwiIzdBNjdFRVwiLCBcIiM3QTM3OEJcIiwgXCIjNzlDRENEXCIsIFwiIzc4Nzg3OCBcIiwgXCIjNzc4ODk5XCIsIFwiIzc2RUVDNlwiLCBcIiM3NkVFMDBcIiwgXCIjNzU3NTc1IFwiLCBcIiM3MzczNzNcIiwgXCIjNzFDNjcxXCIsIFwiIzcxNzFDNlwiLCBcIiM3MDgwOTAgXCIsIFwiIzcwNzA3MFwiLCBcIiM2RThCM0RcIiwgXCIjNkU3QjhCXCIsIFwiIzZFNkU2RSBcIiwgXCIjNkNBNkNEXCIsIFwiIzZDN0I4QlwiLCBcIiM2QjhFMjNcIiwgXCIjNkI2QjZCIFwiLCBcIiM2QTVBQ0RcIiwgXCIjNjk4QjY5XCIsIFwiIzY5OEIyMlwiLCBcIiM2OTY5NjkgXCIsIFwiIzY5NTlDRFwiLCBcIiM2ODgzOEJcIiwgXCIjNjgyMjhCXCIsIFwiIzY2Q0RBQSBcIiwgXCIjNjZDRDAwXCIsIFwiIzY2OEI4QlwiLCBcIiM2NjY2NjZcIiwgXCIjNjQ5NUVEIFwiLCBcIiM2M0I4RkZcIiwgXCIjNjM2MzYzXCIsIFwiIzYxNjE2MVwiLCBcIiM2MDdCOEIgXCIsIFwiIzVGOUVBMFwiLCBcIiM1RTVFNUVcIiwgXCIjNUQ0NzhCXCIsIFwiIzVDQUNFRSBcIiwgXCIjNUM1QzVDXCIsIFwiIzVCNUI1QlwiLCBcIiM1OTU5NTlcIiwgXCIjNTc1NzU3IFwiLCBcIiM1NTZCMkZcIiwgXCIjNTU1NTU1XCIsIFwiIzU1MUE4QlwiLCBcIiM1NEZGOUYgXCIsIFwiIzU0OEI1NFwiLCBcIiM1NDU0NTRcIiwgXCIjNTM4NjhCXCIsIFwiIzUyOEI4QiBcIiwgXCIjNTI1MjUyXCIsIFwiIzUxNTE1MVwiLCBcIiM0Rjk0Q0RcIiwgXCIjNEY0RjRGIFwiLCBcIiM0RUVFOTRcIiwgXCIjNEQ0RDREXCIsIFwiIzRCMDA4MlwiLCBcIiM0QTcwOEIgXCIsIFwiIzRBNEE0QVwiLCBcIiM0OEQxQ0NcIiwgXCIjNDg3NkZGXCIsIFwiIzQ4M0Q4QiBcIiwgXCIjNDc0NzQ3XCIsIFwiIzQ3M0M4QlwiLCBcIiM0NjgyQjRcIiwgXCIjNDU4Qjc0IFwiLCBcIiM0NThCMDBcIiwgXCIjNDU0NTQ1XCIsIFwiIzQzQ0Q4MFwiLCBcIiM0MzZFRUUgXCIsIFwiIzQyNDI0MlwiLCBcIiM0MTY5RTFcIiwgXCIjNDBFMEQwXCIsIFwiIzQwNDA0MCBcIiwgXCIjM0QzRDNEXCIsIFwiIzNDQjM3MVwiLCBcIiMzQjNCM0JcIiwgXCIjM0E1RkNEIFwiLCBcIiMzODhFOEVcIiwgXCIjMzgzODM4XCIsIFwiIzM2NjQ4QlwiLCBcIiMzNjM2MzYgXCIsIFwiIzMzMzMzM1wiLCBcIiMzMkNEMzJcIiwgXCIjMzAzMDMwXCIsIFwiIzJGNEY0RiBcIiwgXCIjMkU4QjU3XCIsIFwiIzJFMkUyRVwiLCBcIiMyQjJCMkJcIiwgXCIjMjkyOTI5IFwiLCBcIiMyODI4MjhcIiwgXCIjMjc0MDhCXCIsIFwiIzI2MjYyNlwiLCBcIiMyNDI0MjQgXCIsIFwiIzIyOEIyMlwiLCBcIiMyMTg4NjhcIiwgXCIjMjEyMTIxXCIsIFwiIzIwQjJBQSBcIiwgXCIjMUYxRjFGXCIsIFwiIzFFOTBGRlwiLCBcIiMxRTFFMUVcIiwgXCIjMUM4NkVFIFwiLCBcIiMxQzFDMUNcIiwgXCIjMUExQTFBXCIsIFwiIzE5MTk3MFwiLCBcIiMxODc0Q0QgXCIsIFwiIzE3MTcxN1wiLCBcIiMxNDE0MTRcIiwgXCIjMTIxMjEyXCIsIFwiIzEwNEU4QiBcIiwgXCIjMEYwRjBGXCIsIFwiIzBEMEQwRFwiLCBcIiMwQTBBMEFcIiwgXCIjMDgwODA4IFwiLCBcIiMwNTA1MDVcIiwgXCIjMDMwMzAzXCIsIFwiIzAwRkZGRlwiLCBcIiMwMEZGN0YgXCIsIFwiIzAwRkYwMFwiLCBcIiMwMEZBOUFcIiwgXCIjMDBGNUZGXCIsIFwiIzAwRUVFRSBcIiwgXCIjMDBFRTc2XCIsIFwiIzAwRUUwMFwiLCBcIiMwMEU1RUVcIiwgXCIjMDBDRUQxIFwiLCBcIiMwMENEQ0RcIiwgXCIjMDBDRDY2XCIsIFwiIzAwQ0QwMFwiLCBcIiMwMEM1Q0QgXCIsIFwiIzAwQkZGRlwiLCBcIiMwMEIyRUVcIiwgXCIjMDA5QUNEXCIsIFwiIzAwOEI4QiBcIiwgXCIjMDA4QjQ1XCIsIFwiIzAwOEIwMFwiLCBcIiMwMDg2OEJcIiwgXCIjMDA2ODhCIFwiLCBcIiMwMDY0MDBcIiwgXCIjMDAwMEZGXCIsIFwiIzAwMDBFRVwiLCBcIiMwMDAwQ0QgXCIsIFwiIzAwMDBBQVwiLCBcIiMwMDAwOEJcIiwgXCIjMDAwMDgwXCJdO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG5leHRDb2xvcigpOnN0cmluZ3tcbiAgICAgICAgICAgIHJldHVybiBDb2xvclV0aWxzLkNvbG9yW0NvbG9yVXRpbHMuX2NvbG9yaW5kZXgrKyVDb2xvclV0aWxzLkNvbG9yLmxlbmd0aCBdO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW5kZXhDb2xvcihpbmRleDpudW1iZXIpe1xuICAgICAgICAgICAgcmV0dXJuIENvbG9yVXRpbHMuQ29sb3JbaW5kZXglQ29sb3JVdGlscy5Db2xvci5sZW5ndGggXTtcbiAgICAgICAgfVxuXG4gICAgICAgc3RhdGljIGdyYWRpZW50Q29sb3Ioc3RhcnRDb2xvcjogc3RyaW5nLCBlbmRDb2xvcjogc3RyaW5nLCBzdGVwOm51bWJlcikge1xuICAgICAgICAgICAgbGV0IHN0YXJ0UkdCID0gQ29sb3JVdGlscy5jb2xvclJnYihzdGFydENvbG9yKTsvL+i9rOaNouS4unJnYuaVsOe7hOaooeW8j1xuICAgICAgICAgICAgbGV0IHN0YXJ0UiA9IHN0YXJ0UkdCWzBdO1xuICAgICAgICAgICAgbGV0IHN0YXJ0RyA9IHN0YXJ0UkdCWzFdO1xuICAgICAgICAgICAgbGV0IHN0YXJ0QiA9IHN0YXJ0UkdCWzJdO1xuXG4gICAgICAgICAgICBsZXQgZW5kUkdCID0gQ29sb3JVdGlscy5jb2xvclJnYihlbmRDb2xvcik7XG4gICAgICAgICAgICBsZXQgZW5kUiA9IGVuZFJHQlswXTtcbiAgICAgICAgICAgIGxldCBlbmRHID0gZW5kUkdCWzFdO1xuICAgICAgICAgICAgbGV0IGVuZEIgPSBlbmRSR0JbMl07XG5cbiAgICAgICAgICAgIGxldCBzUiA9IChlbmRSIC0gc3RhcnRSKSAvIHN0ZXA7Ly/mgLvlt67lgLxcbiAgICAgICAgICAgIGxldCBzRyA9IChlbmRHIC0gc3RhcnRHKSAvIHN0ZXA7XG4gICAgICAgICAgICBsZXQgc0IgPSAoZW5kQiAtIHN0YXJ0QikgLyBzdGVwO1xuXG4gICAgICAgICAgICB2YXIgY29sb3JBcnIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RlcDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy/orqHnrpfmr4/kuIDmraXnmoRoZXjlgLwgXG4gICAgICAgICAgICAgICAgdmFyIGhleCA9IENvbG9yVXRpbHMuY29sb3JIZXgoJ3JnYignICsgcGFyc2VJbnQoKHNSICogaSArIHN0YXJ0UikpICsgJywnICsgcGFyc2VJbnQoKHNHICogaSArIHN0YXJ0RykpICsgJywnICsgcGFyc2VJbnQoKHNCICogaSArIHN0YXJ0QikpICsgJyknKTtcbiAgICAgICAgICAgICAgICBjb2xvckFyci5wdXNoKGhleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29sb3JBcnI7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgZ2V0Q29sb3Ioc3RhcnRDb2xvcjpzdHJpbmcsIGVuZENvbG9yOnN0cmluZyx2YWx1ZTpudW1iZXIsc3RhcnQ6bnVtYmVyLGVuZDpudW1iZXIpOnN0cmluZ3tcbiAgICAgICAgICAgIGxldCBzdGFydFJHQiA9IENvbG9yVXRpbHMuY29sb3JSZ2Ioc3RhcnRDb2xvcik7Ly/ovazmjaLkuLpyZ2LmlbDnu4TmqKHlvI9cbiAgICAgICAgICAgIGxldCBzdGFydFIgPSBzdGFydFJHQlswXTtcbiAgICAgICAgICAgIGxldCBzdGFydEcgPSBzdGFydFJHQlsxXTtcbiAgICAgICAgICAgIGxldCBzdGFydEIgPSBzdGFydFJHQlsyXTtcblxuICAgICAgICAgICAgbGV0IGVuZFJHQiA9IENvbG9yVXRpbHMuY29sb3JSZ2IoZW5kQ29sb3IpO1xuICAgICAgICAgICAgbGV0IGVuZFIgPSBlbmRSR0JbMF07XG4gICAgICAgICAgICBsZXQgZW5kRyA9IGVuZFJHQlsxXTtcbiAgICAgICAgICAgIGxldCBlbmRCID0gZW5kUkdCWzJdO1xuXG4gICAgICAgICAgICBsZXQgc1IgPSAoZW5kUiAtIHN0YXJ0UikgLyAoZW5kLXN0YXJ0KTsvL+aAu+W3ruWAvFxuICAgICAgICAgICAgbGV0IHNHID0gKGVuZEcgLSBzdGFydEcpIC8gKGVuZC1zdGFydCk7XG4gICAgICAgICAgICBsZXQgc0IgPSAoZW5kQiAtIHN0YXJ0QikgLyAoZW5kLXN0YXJ0KTtcbiAgICAgICAgICAgIHZhciBoZXggPSBDb2xvclV0aWxzLmNvbG9ySGV4KCdyZ2IoJyArIHBhcnNlSW50KChzUiAqIHZhbHVlICsgc3RhcnRSKSkgKyAnLCcgKyBwYXJzZUludCgoc0cgKiB2YWx1ZSArIHN0YXJ0RykpICsgJywnICsgcGFyc2VJbnQoKHNCICogdmFsdWUgKyBzdGFydEIpKSArICcpJyk7XG4gICAgICAgICAgICByZXR1cm4gaGV4O1xuICAgICAgICB9XG5cblxuICAgICAgc3RhdGljICBjb2xvclJnYihzQ29sb3I6IHN0cmluZykge1xuICAgICAgICAgICAgdmFyIHJlZyA9IC9eIyhbMC05YS1mQS1mXXszfXxbMC05YS1mQS1mXXs2fSkkLztcbiAgICAgICAgICAgIHZhciBzQ29sb3IgPSBzQ29sb3IudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzQ29sb3IgJiYgcmVnLnRlc3Qoc0NvbG9yKSkge1xuICAgICAgICAgICAgICAgIGlmIChzQ29sb3IubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzQ29sb3JOZXcgPSBcIiNcIjtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCA0OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNDb2xvck5ldyArPSBzQ29sb3Iuc2xpY2UoaSwgaSArIDEpLmNvbmNhdChzQ29sb3Iuc2xpY2UoaSwgaSArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzQ29sb3IgPSBzQ29sb3JOZXc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8v5aSE55CG5YWt5L2N55qE6aKc6Imy5YC8XG4gICAgICAgICAgICAgICAgdmFyIHNDb2xvckNoYW5nZSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNzsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNDb2xvckNoYW5nZS5wdXNoKHBhcnNlSW50KFwiMHhcIiArIHNDb2xvci5zbGljZShpLCBpICsgMikpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNDb2xvckNoYW5nZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWwhnJnYuihqOekuuaWueW8j+i9rOaNouS4umhleOihqOekuuaWueW8j1xuICAgICAgc3RhdGljICBjb2xvckhleChyZ2I6IGFueSkge1xuICAgICAgICAgICAgbGV0IF90aGlzczogYW55ID0gcmdiO1xuICAgICAgICAgICAgdmFyIHJlZyA9IC9eIyhbMC05YS1mQS1mXXszfXxbMC05YS1mQS1mXXs2fSkkLztcbiAgICAgICAgICAgIGlmICgvXihyZ2J8UkdCKS8udGVzdChfdGhpc3MpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFDb2xvciA9IF90aGlzcy5yZXBsYWNlKC8oPzoofCl8cmdifFJHQikqL2csIFwiXCIpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc3RySGV4ID0gXCIjXCI7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhQ29sb3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhleDogYW55ID0gTnVtYmVyKGFDb2xvcltpXSkudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgICAgICAgICBoZXggPSBoZXggPCAxMCA/IDAgKyAnJyArIGhleCA6IGhleDsvLyDkv53or4Hmr4/kuKpyZ2LnmoTlgLzkuLoy5L2NXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZXggPT09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZXggKz0gaGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0ckhleCArPSBoZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdHJIZXgubGVuZ3RoICE9PSA3KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ckhleCA9IF90aGlzcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ckhleDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVnLnRlc3QoX3RoaXNzKSkge1xuICAgICAgICAgICAgICAgIHZhciBhTnVtID0gX3RoaXNzLnJlcGxhY2UoLyMvLCBcIlwiKS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoYU51bS5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzcztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFOdW0ubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1IZXggPSBcIiNcIjtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhTnVtLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1IZXggKz0gKGFOdW1baV0gKyBhTnVtW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVtSGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBleHBvcnQgY2xhc3MgUm90YXRlUmVjdCB7XG4gICAgICAgIHB1YmxpYyBhbmdsZTogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgY2VudGVyeDogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgY2VudGVyeTogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgcG9pbnRzOiBQb2ludFtdO1xuICAgICAgICBjb25zdHJ1Y3RvcihjZW50ZXJ4OiBudW1iZXIsIGNlbnRlcnk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgIHRoaXMuY2VudGVyeCA9IGNlbnRlcng7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcnkgPSBjZW50ZXJ5O1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnBvaW50cyA9IFtuZXcgUG9pbnQoKSwgbmV3IFBvaW50KCksIG5ldyBQb2ludCgpLCBuZXcgUG9pbnQoKSwgbmV3IFBvaW50KCksIG5ldyBQb2ludCgpLCBuZXcgUG9pbnQoKSwgbmV3IFBvaW50KCksIG5ldyBQb2ludCgpXTtcbiAgICAgICAgICAgIGxldCBsdCA9IHRoaXMucG9pbnRzWzBdO1xuICAgICAgICAgICAgbGV0IHJ0ID0gdGhpcy5wb2ludHNbMV07XG4gICAgICAgICAgICBsZXQgcmIgPSB0aGlzLnBvaW50c1syXTtcbiAgICAgICAgICAgIGxldCBsYiA9IHRoaXMucG9pbnRzWzNdO1xuICAgICAgICAgICAgbGV0IGN0ID0gdGhpcy5wb2ludHNbNF07XG4gICAgICAgICAgICBsZXQgY2IgPSB0aGlzLnBvaW50c1s1XTtcblxuICAgICAgICAgICAgbGV0IGNsID0gdGhpcy5wb2ludHNbNl07XG4gICAgICAgICAgICBsZXQgY3IgPSB0aGlzLnBvaW50c1s3XTtcblxuICAgICAgICAgICAgY3IueCA9IHRoaXMuY2VudGVyeCArIE1hdGguY29zKHRoaXMuYW5nbGUpICogdGhpcy53aWR0aCAvIDI7XG4gICAgICAgICAgICBjci55ID0gdGhpcy5jZW50ZXJ5ICsgTWF0aC5zaW4odGhpcy5hbmdsZSkgKiB0aGlzLndpZHRoIC8gMjtcblxuICAgICAgICAgICAgY2wueCA9IDIgKiB0aGlzLmNlbnRlcnggLSBjci54O1xuICAgICAgICAgICAgY2wueSA9IDIgKiB0aGlzLmNlbnRlcnkgLSBjci55O1xuXG4gICAgICAgICAgICBydC54ID0gY3IueCArIE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgcnQueSA9IGNyLnkgLSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIHJiLnggPSAyICogY3IueCAtIHJ0Lng7XG4gICAgICAgICAgICByYi55ID0gMiAqIGNyLnkgLSBydC55O1xuXG4gICAgICAgICAgICBsYi54ID0gY2wueCAtIE1hdGguc2luKHRoaXMuYW5nbGUpICogdGhpcy5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgbGIueSA9IGNsLnkgKyBNYXRoLmNvcyh0aGlzLmFuZ2xlKSAqIHRoaXMuaGVpZ2h0IC8gMjtcblxuICAgICAgICAgICAgbHQueCA9IDIgKiBjbC54IC0gbGIueDtcbiAgICAgICAgICAgIGx0LnkgPSAyICogY2wueSAtIGxiLnk7XG5cbiAgICAgICAgICAgIGNiLnggPSAobGIueCArIHJiLngpLzI7XG4gICAgICAgICAgICBjYi55ID0gKGxiLnkgKyByYi55KS8yO1xuICAgICAgICAgICAgY3QueCA9IChsdC54ICsgcnQueCkvMjtcbiAgICAgICAgICAgIGN0LnkgPShsdC55ICsgcnQueSkvMjtcblxuICAgICAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMucG9pbnRzWzhdO1xuICAgICAgICAgICAgY2VudGVyLnggPSB0aGlzLmNlbnRlcng7XG4gICAgICAgICAgICBjZW50ZXIueSA9IHRoaXMuY2VudGVyeTtcblxuXG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHJhaWRpdXMoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5jZW50ZXIueCAtIHRoaXMubGVmdFRvcC54LCAyKSArIE1hdGgucG93KHRoaXMuY2VudGVyLnkgLSB0aGlzLmxlZnRUb3AueSwgMikpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBvZmZzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIsIGFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wb2ludHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHQ6IFBvaW50ID0gdGhpcy5wb2ludHNbaV07XG4gICAgICAgICAgICAgICAgcHQueCArPSB4ICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgICAgIHB0LnkgKz0geSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZXQgbGVmdFRvcCgpOiBQb2ludCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHNbMF07XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHJpZ2h0VG9wKCk6IFBvaW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50c1sxXTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgbGVmdEJvdHRvbSgpOiBQb2ludCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHNbM107XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHJpZ2h0Qm90dG9tKCk6IFBvaW50IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50c1syXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBjZW50ZXJUb3AoKTogUG9pbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzWzRdO1xuICAgICAgICB9XG4gICAgICAgIGdldCBjZW50ZXJCb3R0b20oKTogUG9pbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzWzVdO1xuICAgICAgICB9XG4gICAgICAgIGdldCBjZW50ZXIoKTogUG9pbnQge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzWzhdO1xuICAgICAgICB9XG4gICAgICAgIGdldCBzdGFydFBvaW50KCk6IFBvaW50IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5jZW50ZXJ4LCB0aGlzLmNlbnRlcnkpO1xuICAgICAgICB9XG5cblxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgUm90YXRlTGluZSB7XG4gICAgICAgIHB1YmxpYyBzdGFydFBvaW50OiBQb2ludDtcbiAgICAgICAgcHVibGljIGVuZFBvaW50OiBQb2ludDtcbiAgICAgICAgcHJpdmF0ZSBfYW5nbGU6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfY3g6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfY3k6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfbGVmdHdpZHRoOiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3JpZ2h0d2lkdGg6IG51bWJlcjtcbiAgICAgICAgY29uc3RydWN0b3IoY3g6IG51bWJlciwgY3k6IG51bWJlciwgbGVmdHdpZHRoOiBudW1iZXIsIHJpZ2h0d2lkdGg6IG51bWJlciwgYW5nbGU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fY3ggPSBjeDtcbiAgICAgICAgICAgIHRoaXMuX2N5ID0gY3k7XG4gICAgICAgICAgICB0aGlzLl9sZWZ0d2lkdGggPSBsZWZ0d2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9yaWdodHdpZHRoID0gcmlnaHR3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XG4gICAgICAgICAgICB0aGlzLmVuZFBvaW50ID0gbmV3IFBvaW50KCk7XG4gICAgICAgICAgICB0aGlzLmVuZFBvaW50LnggPSBjeCArIE1hdGguc2luKHRoaXMuX2FuZ2xlKSAqIHJpZ2h0d2lkdGg7XG4gICAgICAgICAgICB0aGlzLmVuZFBvaW50LnkgPSBjeSAtIE1hdGguY29zKHRoaXMuX2FuZ2xlKSAqIHJpZ2h0d2lkdGg7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBuZXcgUG9pbnQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRQb2ludC54ID0gY3ggLSBNYXRoLnNpbih0aGlzLl9hbmdsZSkgKiBsZWZ0d2lkdGg7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9pbnQueSA9IGN5ICsgTWF0aC5jb3ModGhpcy5fYW5nbGUpICogbGVmdHdpZHRoO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwiXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgZW51bSBBbmltYXRpb25UeXBle1xuICAgICAgICBXaWR0aCxcbiAgICAgICAgSGVpZ2h0LFxuICAgICAgICBTaXplLFxuICAgICAgICBSYWRpdXMsXG4gICAgICAgIFN3ZWVwLFxuICAgICAgICBBbHBoYVxuICAgIH1cbn0iLCJcblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBlbnVtIEFnZyB7XG4gICAgICAgIFNVTSxcbiAgICAgICAgQVZFUkFHRSxcbiAgICAgICAgQ09VTlQsXG4gICAgICAgIE5PTkVcbiAgICB9XG4gICBcbn0iLCJcblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBlbnVtIE9yZGVyIHtcbiAgICAgICAgRGVzYyxcbiAgICAgICAgQXNjLFxuICAgICAgICBOb25lXG4gICAgfVxuICAgXG59IiwiXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgZW51bSBTY2FsZVR5cGUge1xuICAgICAgICBMaW5lYXIsXG4gICAgICAgIExvZyxcbiAgICAgICAgT3JkaW5hbFxuXG4gICAgfVxuICAgIFxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgZXhwb3J0IGVudW0gRGF0YVR5cGV7XG4gICAgICAgIE51bWJlcixcbiAgICAgICAgU3RyaW5nLFxuICAgICAgICBPYmplY3QsXG4gICAgICAgIEFycmF5LFxuICAgICAgICBCb29sZWFuLFxuICAgICAgICBEYXRlICAgXG4gICAgfVxufSIsIlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGVudW0gQ2hhcnRUeXBlIHtcbiAgICAgICAgQmFyLFxuICAgICAgICBMaW5lLFxuICAgICAgICBTY2F0dGVyLFxuICAgICAgICBBcmVhLFxuICAgICAgICAvLyBSYWRpYWxCYXIsXG4gICAgICAgIC8vIFJhZGlhbExpbmUsXG4gICAgICAgIC8vIFJhZGlhbFNjYXR0ZXIsXG4gICAgICAgIC8vIFJhZGlhQXJlYSxcbiAgICAgICAgUGllLFxuICAgICAgICBTdW5idXJzdCxcbiAgICAgICAgVHJlZU1hcCxcbiAgICAgICAgUmFkYXIsXG4gICAgICAgIENhbmRsZXN0aWNrXG4gICAgfVxuICAgXG59IiwiXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgZW51bSBBeGlzVHlwZSB7XG4gICAgICAgIFgsXG4gICAgICAgIFlcbiAgICB9XG4gICAgXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGV4cG9ydCBjbGFzcyBWYWx1ZSB7XG4gICAgICAgIF9fcHJlVmFsOiBhbnk7XG4gICAgICAgIF9fdmFsOiBhbnk7XG4gICAgICAgIF9fZGF0YVR5cGU6IERhdGFUeXBlO1xuICAgICAgICBfX25leHRWYWw6IGFueTtcbiAgICAgICAgX19zY2FsZVR5cGU6IFNjYWxlVHlwZTtcbiAgICAgICAgX19pc011bHRpcGxlOiBib29sZWFuO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHY6IGFueSwgc2NhbGVUeXBlOiBTY2FsZVR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX192YWwgPSB2O1xuICAgICAgICAgICAgaWYodiBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgICAgICAgICB0aGlzLl9faXNNdWx0aXBsZT0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX19pc011bHRpcGxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9fc2NhbGVUeXBlID0gc2NhbGVUeXBlO1xuICAgICAgICAgICAgdGhpcy5fX2RhdGFUeXBlID0gVXRpbGl0eS5nZXRUeXBlKHYpO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIGdldCBzY2FsZVR5cGUoKTogU2NhbGVUeXBlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2NhbGVUeXBlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBkYXRhVHlwZSgpOiBEYXRhVHlwZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RhdGFUeXBlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBmb3Igd2hhdCA/XG4gICAgICAgICAqIGFycmF5IHZhbHVlIGZvciBoaWdoIGxvdyBvcGVuIGNsb3NlP1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGlzTXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2lzTXVsdGlwbGU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3ZhbDtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2VudW0vQWdnLnRzXCIgLz5cblxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBpbXBvcnQgVXRpbCA9IGFuZHJvaWQuZ3JhcGhpY3MuVXRpbDtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgZXhwb3J0IGNsYXNzIEZpZWxkIHtcbiAgICAgICAgcHVibGljIGFnZ3JlZ2F0ZTogQWdnO1xuICAgICAgICBwdWJsaWMgYmluZDogc3RyaW5nO1xuICAgICAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XG4gICAgICAgIHB1YmxpYyB0eXBlOlNjYWxlVHlwZTtcbiAgICAgICAgcHVibGljIGxvZ0Jhc2U6bnVtYmVyO1xuICAgICAgICBwdWJsaWMgcmFuZ2U6YW55W107XG4gICAgICAgIHB1YmxpYyBiYW5kOmJvb2xlYW47XG5cbiAgICAgICAgY29uc3RydWN0b3IoYmluZDogYW55LG5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFnZ3JlZ2F0ZSA9IFV0aWwuYXNFbnVtKGJpbmQuYWdncmVnYXRlLEFnZyx0cnVlKTtcbiAgICAgICAgICAgIGlmKHRoaXMuYWdncmVnYXRlID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuYWdncmVnYXRlID0gQWdnLk5PTkU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJpbmQgPSBiaW5kLmZpZWxkO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gVXRpbC5hc0VudW0oYmluZC50eXBlLFNjYWxlVHlwZSx0cnVlKTtcbiAgICAgICAgICAgIGlmKHRoaXMudHlwZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBTY2FsZVR5cGUuT3JkaW5hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9nQmFzZSA9YmluZC5sb2dCYXNlO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMucmFuZ2UgPSBiaW5kLnJhbmdlO1xuICAgICAgICAgICAgdGhpcy5iYW5kID0gYmluZC5iYW5kO1xuICAgICAgICB9XG4gICAgICAgIGVxdWFscyhmaWVsZDpGaWVsZCk6Ym9vbGVhbntcbiAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmFnZ3JlZ2F0ZSA9PSBmaWVsZC5hZ2dyZWdhdGVcbiAgICAgICAgICAgIC8vICYmIHRoaXMuYmluZCA9PSBmaWVsZC5iaW5kXG4gICAgICAgICAgICAvLyAmJiB0aGlzLm5hbWUgPT0gZmllbGQubmFtZVxuICAgICAgICAgICAgLy8gJiYgdGhpcy50eXBlID09IGZpZWxkLnR5cGVcbiAgICAgICAgICAgIC8vICYmIHRoaXMubG9nQmFzZSA9PSBmaWVsZC5sb2dCYXNlXG4gICAgICAgICAgICAvLyAmJiB0aGlzLnJhbmdlID09IGZpZWxkLnJhbmdlO1xuICAgICAgICAgICAgcmV0dXJuIF8uaXNFcXVhbCh0aGlzLGZpZWxkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgaW1wb3J0IFV0aWwgPSBhbmRyb2lkLmdyYXBoaWNzLlV0aWw7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBGaWx0ZXIge1xuICAgICAgICBwdWJsaWMgc2VyaWVzOiBzdHJpbmdbXTtcbiAgICAgICAgcHVibGljIHJ1bGVzOiBSdWxlW107XG5cbiAgICAgICAgY29uc3RydWN0b3Ioc2VyaWVzOiBzdHJpbmcsIHJ1bGVzOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VyaWVzID0gc2VyaWVzLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBpZiAocnVsZXMgIT0gbnVsbCAmJiBydWxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ydWxlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHJ1bGUgb2YgcnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydWxlcy5wdXNoKG5ldyBSdWxlKHJ1bGUuZmllbGQsIHJ1bGUuZXhwcmVzcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVxdWFscyhmaWVsZDogRmllbGQpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBfLmlzRXF1YWwodGhpcywgZmllbGQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4cG9ydCBjbGFzcyBSdWxlIHtcbiAgICAgICAgcHVibGljIGV4cHJlc3M6IHN0cmluZztcbiAgICAgICAgcHVibGljIGZpbGVkOiBzdHJpbmc7XG4gICAgICAgIGNvbnN0cnVjdG9yKGZpbGVkOiBzdHJpbmcsIGV4cHJlc3M6IHN0cmluZykge1xuXG4gICAgICAgICAgICB0aGlzLmZpbGVkID0gZmlsZWQ7XG4gICAgICAgICAgICB0aGlzLmV4cHJlc3MgPSBleHByZXNzO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vRmllbGQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBcbiAgICBleHBvcnQgY2xhc3MgRW5jb2Rpbmcge1xuICAgICAgICBwdWJsaWMgeDogRmllbGQ7XG4gICAgICAgIHB1YmxpYyB5OiBGaWVsZDtcbiAgICAgICAgcHVibGljIGNvbG9yOiBGaWVsZDtcbiAgICAgICAgcHVibGljIHNpemU6IEZpZWxkO1xuICAgICAgICBwdWJsaWMgc2hhcGU6IEZpZWxkO1xuICAgICAgICBwdWJsaWMgZ3JvdXA6IEZpZWxkO1xuICAgICAgICBwdWJsaWMgdmFsdWVzOkZpZWxkW107XG4gICAgICAgIHB1YmxpYyBfc3RhY2s6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBwdWJsaWMgX3JhZGlhbDpib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKGVuY29kaW5nOiBhbnkpIHtcbiAgICAgICAgICAgIGlmIChlbmNvZGluZy54KSB7XG4gICAgICAgICAgICAgICAgdGhpcy54ID0gbmV3IEZpZWxkKGVuY29kaW5nLngsICd4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmcueSkge1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IG5ldyBGaWVsZChlbmNvZGluZy55LCAneScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVuY29kaW5nLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IG5ldyBGaWVsZChlbmNvZGluZy5jb2xvciwgJ2NvbG9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW5jb2Rpbmcuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXBlID0gbmV3IEZpZWxkKGVuY29kaW5nLnNoYXBlLCAnc2hhcGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbmNvZGluZy5zaXplKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gbmV3IEZpZWxkKGVuY29kaW5nLnNpemUsICdzaXplJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZW5jb2RpbmcuZ3JvdXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwID0gbmV3IEZpZWxkKGVuY29kaW5nLmdyb3VwLCAnZ3JvdXAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbmNvZGluZy52YWx1ZXMgJiYgZW5jb2RpbmcudmFsdWVzIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzID1bXTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDxlbmNvZGluZy52YWx1ZXMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBlbmNvZGluZy52YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzLnB1c2gobmV3IEZpZWxkKHZhbHVlLHZhbHVlLm5hbWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihlbmNvZGluZy5zdGFjayAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFjayA9IGVuY29kaW5nLnN0YWNrIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGVuY29kaW5nLnJhZGlhbCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9yYWRpYWwgPSBlbmNvZGluZy5yYWRpYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiXG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBUcmFuc0Zvcm17XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFV0aWwgPSBhbmRyb2lkLmdyYXBoaWNzLlV0aWw7XG4gICAgZXhwb3J0IGNsYXNzIFNlcmllcyB7XG4gICAgICAgIHByaXZhdGUgX19uYW1lOiBzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgX19pbmRleDpudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX19kYXRhOiBhbnlbXTtcbiAgICAgICAgcHJpdmF0ZSBfX2VuY29kaW5nOiBFbmNvZGluZztcbiAgICAgICAgcHJpdmF0ZSBfX3BhaXJzOiB7IGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXTtcbiAgICAgICAgcHJpdmF0ZSBfX3BvaW50czogYW55W10gPSBbXTtcbiAgICAgICAgcHJpdmF0ZSBfX2NoYXJ0VHlwZTogQ2hhcnRUeXBlID0gQ2hhcnRUeXBlLkJhcjtcbiAgICAgICAgcHVibGljIGVuYWJsZTpib29sZWFuID0gdHJ1ZTtcblxuICAgICAgICBjb25zdHJ1Y3RvcihlbmNvZGluZzogRW5jb2RpbmcsIHNlcmllczogYW55LGluZGV4Om51bWJlcikge1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KGVuY29kaW5nICE9IG51bGwpO1xuICAgICAgICAgICAgRGVidWcuYXNzZXJ0KHNlcmllcyAhPSBudWxsKTtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChzZXJpZXMuZGF0YSBpbnN0YW5jZW9mIEFycmF5LCBcIlNlcmllcyBtdXN0IGJlIEFycmF5XCIpO1xuICAgICAgICAgICAgdGhpcy5fX2RhdGEgPSBzZXJpZXMuZGF0YTtcbiAgICAgICAgICAgIHRoaXMuX19uYW1lID0gc2VyaWVzLm5hbWU7XG4gICAgICAgICAgICB0aGlzLl9faW5kZXg9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5fX2NoYXJ0VHlwZSA9IFV0aWwuYXNFbnVtKHNlcmllcy5jaGFydHR5cGUsIENoYXJ0VHlwZSk7XG4gICAgICAgICAgICB0aGlzLl9fZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgICAgICAgICAgIHRoaXMuX19wYWlycyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19lbmNvZGluZykge1xuICAgICAgICAgICAgICAgIGlmIChVdGlsaXR5Lmlza2V5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVkOiBGaWVsZCA9IHRoaXMuX19lbmNvZGluZ1trZXldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gdGhpcy5fX2NyZWF0ZVNjYWxlKGZpbGVkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3BhaXJzLnB1c2goeyBmaWxlZDogZmlsZWQsIHNjYWxlOiBzY2FsZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuX19kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3BvaW50cy5wdXNoKHRoaXMuX19hbmFseXNlSXRlbSh0aGlzLl9fcGFpcnMsIGl0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgdGhpcy5fX3BhaXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZpbGVkOiBGaWVsZCA9IHBhaXIuZmlsZWQ7XG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IHBhaXIuc2NhbGU7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVkLm5hbWUgIT0gJ3gnICYmIGZpbGVkLm5hbWUgIT0gJ3knICYmIGZpbGVkLnJhbmdlICE9IG51bGwgJiYgZmlsZWQucmFuZ2UubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShmaWxlZC5yYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGUgaW5zdGFuY2VvZiBMb2dTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2UoZmlsZWQucmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZWQuYmFuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlQm91bmRzKGZpbGVkLnJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2UoZmlsZWQucmFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX19hbmFseXNlSXRlbShwYWlyczogeyBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W10sIGl0ZW06IGFueSk6IGFueSB7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoaXRlbSAhPSBudWxsKTtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydCh0eXBlb2YgaXRlbSA9PSAnb2JqZWN0Jyk7XG4gICAgICAgICAgICBsZXQgdmFsdWVzID0ge307XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoIShpdGVtIGluc3RhbmNlb2YgQXJyYXkpKTtcbiAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2YgcGFpcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gcGFpci5maWxlZDtcbiAgICAgICAgICAgICAgICBsZXQgc2NhbGU6IFNjYWxlID0gcGFpci5zY2FsZTtcbiAgICAgICAgICAgICAgICBpZiAoc2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4OiBudW1iZXIgPSBVdGlsaXR5Lm1heChbaXRlbVtmaWxlZC5iaW5kXSwgc2NhbGUubWF4XSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW46IG51bWJlciA9IFV0aWxpdHkubWluKFtpdGVtW2ZpbGVkLmJpbmRdLCBzY2FsZS5taW5dKTtcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWluKFttaW4sIG1heF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NhbGUgaW5zdGFuY2VvZiBMb2dTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWF4OiBudW1iZXIgPSBVdGlsaXR5Lm1heChbaXRlbVtmaWxlZC5iaW5kXSwgc2NhbGUubWF4XSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW46IG51bWJlciA9IFV0aWxpdHkubWluKFtpdGVtW2ZpbGVkLmJpbmRdLCBzY2FsZS5taW5dKTtcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWluKFttaW4sIG1heF0pO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW5zLnB1c2goaXRlbVtmaWxlZC5iaW5kXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBWYWx1ZSA9IG5ldyBWYWx1ZShpdGVtW2ZpbGVkLmJpbmRdLCBmaWxlZC50eXBlKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbZmlsZWQubmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgX3JlZnJlc2goKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMuX19wYWlycykge1xuICAgICAgICAgICAgICAgIHBhaXIuc2NhbGUuZG9tYWluKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHB0IG9mIHRoaXMuX19wb2ludHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMuX19wYWlycykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gcGFpci5maWxlZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IHBhaXIuc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwdFtmaWxlZC5uYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXg6IG51bWJlciA9IFV0aWxpdHkubWF4KHZhbHVlLmlzTXVsdGlwbGUgPyB2YWx1ZS52YWx1ZS5jb25jYXQoW3NjYWxlLm1heF0pIDogW3ZhbHVlLnZhbHVlLCBzY2FsZS5tYXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtaW46IG51bWJlciA9IFV0aWxpdHkubWluKHZhbHVlLmlzTXVsdGlwbGUgPyB2YWx1ZS52YWx1ZS5jb25jYXQoW3NjYWxlLm1pbl0pIDogW3ZhbHVlLnZhbHVlLCBzY2FsZS5taW5dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLmRvbWFpbihbbWluLCBtYXhdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY2FsZSBpbnN0YW5jZW9mIExvZ1NjYWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHB0W2ZpbGVkLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1heDogbnVtYmVyID0gVXRpbGl0eS5tYXgodmFsdWUuaXNNdWx0aXBsZSA/IHZhbHVlLnZhbHVlLmNvbmNhdChbc2NhbGUubWF4XSkgOiBbdmFsdWUudmFsdWUsIHNjYWxlLm1heF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1pbjogbnVtYmVyID0gVXRpbGl0eS5taW4odmFsdWUuaXNNdWx0aXBsZSA/IHZhbHVlLnZhbHVlLmNvbmNhdChbc2NhbGUubWluXSkgOiBbdmFsdWUudmFsdWUsIHNjYWxlLm1pbl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUuZG9tYWluKFttaW4sIG1heF0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwdFtmaWxlZC5uYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5pc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiB2YWx1ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW5zLnB1c2godik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5kb21haW5zLnB1c2godmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfX2NyZWF0ZVNjYWxlKGZpbGVkOiBGaWVsZCk6IFNjYWxlIHtcbiAgICAgICAgICAgIERlYnVnLmFzc2VydChmaWxlZCAhPSBudWxsKTtcbiAgICAgICAgICAgIGxldCBzY2FsZTogU2NhbGUgPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoIChmaWxlZC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTY2FsZVR5cGUuTGluZWFyOlxuICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IG5ldyBMaW5lYXJTY2FsZShmaWxlZC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTY2FsZVR5cGUuT3JkaW5hbDpcbiAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBuZXcgT3JkaW5hbFNjYWxlKGZpbGVkLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFNjYWxlVHlwZS5Mb2c6XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlID0gbmV3IExvZ1NjYWxlKGZpbGVkLmxvZ0Jhc2UsIGZpbGVkLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoZmFsc2UsIGZpbGVkLnR5cGUgKyBcIiBTY2FsZVR5cGUgaGFzIG5vdCBiZWVuIGltcGxlbWVudCFcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNjYWxlO1xuICAgICAgICB9XG5cblxuICAgICAgICBnZXQgZGF0YSgpOiBhbnlbXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbmFtZSgpOnN0cmluZ3tcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBzY2FsZVBhaXJzKCk6IHsgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcGFpcnM7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcG9pbnRzKCk6IGFueVtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9pbnRzO1xuICAgICAgICB9XG4gICAgICAgIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3BvaW50cy5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGNoYXJ0VHlwZSgpOiBDaGFydFR5cGUge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19jaGFydFR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGdldCBpbmRleCgpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9faW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTY2FsZShuYW1lOiBzdHJpbmcpOiBTY2FsZSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLl9fcGFpcnMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZmlsZWQubmFtZSA9PSBuYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZihpbmRleCA+PSAwKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcGFpcnNbaW5kZXhdLnNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY2xvbmUoKTogU2VyaWVzIHtcbiAgICAgICAgICAgIGxldCBzZXJpZXMgPSBfLmNsb25lRGVlcCh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBzZXJpZXM7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBEYXRhTW9kZWwge1xuXG4gICAgICAgIHByaXZhdGUgX19lbmNvZGluZzogRW5jb2Rpbmc7XG4gICAgICAgIHByaXZhdGUgX19maWx0ZXI6IEZpbHRlcjtcbiAgICAgICAgcHJpdmF0ZSBfZGF0YTphbnk7XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIF9zZXJpZXM6IFNlcmllc1tdO1xuICAgICAgICBwcml2YXRlIF9hbGxTZXJpZXM6U2VyaWVzW107XG4gICAgICAgIHByaXZhdGUgX19jaGFydFR5cGVzOiBDaGFydFR5cGVbXSA9IFtdO1xuICAgICAgICBwcm90ZWN0ZWQgX19zY2FsZVBhaXJzOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXTtcbiAgICAgICAgcHJpdmF0ZSBfYW5hbHlzZUVuY29kaW5nKGVuY29kZTogYW55KTogRW5jb2Rpbmcge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbmNvZGluZyhlbmNvZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldCBjaGFydFR5cGVzKCk6IENoYXJ0VHlwZVtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fY2hhcnRUeXBlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2FuYWx5c2VTZXJpZXMoc2VyaWVzX2RhdGE6IGFueSwgZW5jb2Rpbmc6IEVuY29kaW5nKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLl9zZXJpZXMgPVtdO1xuICAgICAgICAgICAgdGhpcy5fYWxsU2VyaWVzID1bXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VyaWVzX2RhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzaXRlbSA9IHNlcmllc19kYXRhW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZXI6IFNlcmllcyA9IG5ldyBTZXJpZXMoZW5jb2RpbmcsIHNlcmllc2l0ZW0sIGkpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX19maWx0ZXIgIT0gbnVsbCAmJiB0aGlzLl9fZmlsdGVyLnNlcmllcy5pbmRleE9mKHNlcmllc2l0ZW0ubmFtZSk+LTEpe1xuICAgICAgICAgICAgICAgICAgICBzZXIuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VyaWVzLnB1c2goc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX19jaGFydFR5cGVzLmluZGV4T2Yoc2VyLmNoYXJ0VHlwZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fY2hhcnRUeXBlcy5wdXNoKHNlci5jaGFydFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlci5lbmFibGUgPWZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxTZXJpZXMucHVzaChzZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuXG4gICAgICAgICAgICB0aGlzLl9fZW5jb2RpbmcgPSB0aGlzLl9hbmFseXNlRW5jb2RpbmcodGhpcy5fZGF0YS5lbmNvZGluZyk7XG4gICAgICAgICAgICB0aGlzLl9hbmFseXNlRmlsdGVyKGRhdGEuZmlsdGVyKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHJlZnJlc2goKXtcbiAgICAgICAgICAgIHRoaXMuX2FuYWx5c2VTZXJpZXModGhpcy5fZGF0YS5zZXJpZXMsIHRoaXMuX19lbmNvZGluZyk7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVMYXlvdXRTY2FsZXModGhpcy5lbmNvZGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9hbmFseXNlRmlsdGVyKGZpbHRlcjogYW55KSB7XG4gICAgICAgICAgICBpZiAoZmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZmlsdGVyID0gbmV3IEZpbHRlciggZmlsdGVyLnNlcmllcyxmaWx0ZXIucnVsZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlTGF5b3V0U2NhbGVzKGVuY29kaW5nOiBFbmNvZGluZykge1xuICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3Nlcmllcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhY2soQ2hhcnRUeXBlLkJhcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhY2soQ2hhcnRUeXBlLkxpbmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWNrKENoYXJ0VHlwZS5BcmVhKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFjayhDaGFydFR5cGUuU2NhdHRlcik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zZXJpZXMubGVuZ3RoIC0gMTsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJpZXM6IFNlcmllcyA9IHRoaXMuX3Nlcmllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRfc2VyaWVzOiBTZXJpZXMgPSB0aGlzLl9zZXJpZXNbaSArIDFdO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXJBIG9mIHNlcmllcy5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyQiBvZiBuZXh0X3Nlcmllcy5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXJBLmZpbGVkLmVxdWFscyhwYWlyQi5maWxlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVkID0gcGFpckEuZmlsZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JjZSA6Ym9vbGVhbiA9IHRoaXMuZW5jb2RpbmcuX3N0YWNrICYmIHBhaXJBLmZpbGVkLm5hbWUgPT0neSc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZm9BOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH0gPSB0aGlzLl9fZ2V0U2NhbGVJbmZvYnluYW1lKHBhaXJBLmZpbGVkLm5hbWUsIHNlcmllcy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGluZm9COiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH0gPSB0aGlzLl9fZ2V0U2NhbGVJbmZvYnluYW1lKHBhaXJCLmZpbGVkLm5hbWUsIG5leHRfc2VyaWVzLm5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvQSA9PSBudWxsICYmIGluZm9CID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IFV0aWxpdHkubWVyZ2VTY2FsZShwYWlyQS5zY2FsZSwgcGFpckIuc2NhbGUsZm9yY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWUsIG5leHRfc2VyaWVzLm5hbWVdLCBmaWxlZDogZmlsZWQsIHNjYWxlOiBzY2FsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMucHVzaCh7IHNlcmllczogW3Nlcmllcy5uYW1lXSwgZmlsZWQ6IHBhaXJBLmZpbGVkLCBzY2FsZTogcGFpckEuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMucHVzaCh7IHNlcmllczogW25leHRfc2VyaWVzLm5hbWVdLCBmaWxlZDogcGFpckIuZmlsZWQsIHNjYWxlOiBwYWlyQi5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmZvQSA9PSBudWxsICYmIGluZm9CICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IFV0aWxpdHkubWVyZ2VTY2FsZShwYWlyQS5zY2FsZSwgaW5mb0Iuc2NhbGUsZm9yY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvQi5zY2FsZSA9IHNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9CLnNlcmllcy5wdXNoKHNlcmllcy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmZvQSAhPSBudWxsICYmIGluZm9CID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IFV0aWxpdHkubWVyZ2VTY2FsZShwYWlyQi5zY2FsZSwgaW5mb0Euc2NhbGUsZm9yY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjYWxlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvQS5zY2FsZSA9IHNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9BLnNlcmllcy5wdXNoKG5leHRfc2VyaWVzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IHNlciBvZiB0aGlzLl9zZXJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiBzZXIuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5fZ2V0U2NhbGVCeU5hbWUocGFpci5maWxlZC5uYW1lLCBzZXIubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhaXIuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZXJpZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMuX3Nlcmllc1swXS5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzLnB1c2goeyBzZXJpZXM6IFt0aGlzLl9zZXJpZXNbMF0ubmFtZV0sIGZpbGVkOiBwYWlyLmZpbGVkLCBzY2FsZTogcGFpci5zY2FsZS5jbG9uZSgpIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9zdGFjayhjaGFydFR5cGU6IENoYXJ0VHlwZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW5jb2RpbmcuX3N0YWNrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5lZ2F0aXZlOiBhbnkgPSB7fTtcbiAgICAgICAgICAgICAgICBsZXQgcG9zaXRpdmU6IGFueSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyQSA9IHRoaXMuc2VyaWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VyQS5jaGFydFR5cGUgPT09IGNoYXJ0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0U2VyaWVzU3RhY2soc2VyQSwgcG9zaXRpdmUsIG5lZ2F0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX19nZXRTY2FsZUluZm9ieW5hbWUoZmlsZWRuYW1lOiBzdHJpbmcsIHNlcmllc25hbWU6IHN0cmluZyk6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfSB7XG4gICAgICAgICAgICBsZXQgaW5mbzogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9ID0gXy5maW5kKHRoaXMuX19zY2FsZVBhaXJzLCAoaXRlbTogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc2VyaWVzLmluZGV4T2Yoc2VyaWVzbmFtZSkgPj0gMCAmJiBmaWxlZG5hbWUgPT0gaXRlbS5maWxlZC5uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBfZ2V0U2NhbGVCeU5hbWUoZmlsZWRuYW1lOiBzdHJpbmcsIHNlcmllc25hbWU6IHN0cmluZyk6IFNjYWxlIHtcbiAgICAgICAgICAgIHJldHVybiBfLnJlc3VsdChfLmZpbmQodGhpcy5fX3NjYWxlUGFpcnMsIChpdGVtOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zZXJpZXMuaW5kZXhPZihzZXJpZXNuYW1lKSA+PSAwICYmIGZpbGVkbmFtZSA9PSBpdGVtLmZpbGVkLm5hbWU7XG4gICAgICAgICAgICB9KSwgXCJzY2FsZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3NldFNlcmllc1N0YWNrKHNlcmllczogU2VyaWVzLCBwb3M6IGFueSwgbmVnOiBhbnkpIHtcbiAgICAgICAgICAgIGxldCBzY2FsZVhfQTogU2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcblxuICAgICAgICAgICAgaWYgKHNjYWxlWF9BIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmVndmFsdWU6IG51bWJlciA9IG5lZ1twdC54LnZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc3ZhbHVlOiBudW1iZXIgPSBwb3NbcHQueC52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWd2YWx1ZSA9PSBudWxsKSB7IG5lZ3ZhbHVlID0gMDsgbmVnW3B0LngudmFsdWVdID0gMDsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdmFsdWUgPT0gbnVsbCkgeyBwb3N2YWx1ZSA9IDA7IHBvc1twdC54LnZhbHVlXSA9IDA7IH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgaXNOZWc6IGJvb2xlYW4gPSBwdC55LnZhbHVlIDwgMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0WTogbnVtYmVyID0gaXNOZWcgPyBuZWd2YWx1ZSA6IHBvc3ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kWTogbnVtYmVyID0gc3RhcnRZICsgcHQueS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaXNOZWcgPyBuZWdbcHQueC52YWx1ZV0gPSBlbmRZIDogcG9zW3B0LngudmFsdWVdID0gZW5kWTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0UG9pbnQueSA9IG5ldyBWYWx1ZShbc3RhcnRZLCBlbmRZXSwgdGFyZ2V0UG9pbnQueS5zY2FsZVR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBzZXJpZXNCLnBvaW50c1tpbmRleF0gPSB0YXJnZXRQb2ludDtcbiAgICAgICAgICAgICAgICAgICAgcHQueSA9IG5ldyBWYWx1ZShbc3RhcnRZLCBlbmRZXSwgcHQueS5zY2FsZVR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlcmllcy5fcmVmcmVzaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0U2VyaWVzQnlUeXBlKGNoYXJ0dHlwZTogQ2hhcnRUeXBlKTogU2VyaWVzW10ge1xuICAgICAgICAgICAgbGV0IHNlcmllczogU2VyaWVzW10gPSBfLmZpbHRlcih0aGlzLl9zZXJpZXMsIChzZXIpID0+IHsgcmV0dXJuIHNlci5jaGFydFR5cGUgPT09IGNoYXJ0dHlwZTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2VyaWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHNlcmllcygpOiBTZXJpZXNbXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzO1xuICAgICAgICB9XG4gICAgICAgIGdldCBhbGxTZXJpZXMoKTpTZXJpZXNbXXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbGxTZXJpZXM7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGVuY29kaW5nKCk6IEVuY29kaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZW5jb2Rpbmc7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IGZpbHRlcigpOkZpbHRlcntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZmlsdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHNjYWxlUGFpcnMoKTogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W10ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zY2FsZVBhaXJzO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTY2FsZSB7XG4gICAgICAgIGRvbWFpbihkb21haW5zOiBhbnlbXSk6IElTY2FsZTtcbiAgICAgICAgcmVmcmVzaCgpOiBJU2NhbGU7XG4gICAgICAgIHJhbmdlKHJhbmdlczogYW55W10pOiBJU2NhbGU7XG4gICAgICAgIHJhbmdlQm91bmRzKHJhbmdlczogYW55W10pOiBJU2NhbGU7XG4gICAgICAgIGdldFNjYWxlVmFsdWUodmFsdWU6IGFueSk7XG4gICAgICAgIG9yZGVyOiBPcmRlcjtcbiAgICAgICAgbWF4OiBudW1iZXI7XG4gICAgICAgIG1pbjogbnVtYmVyO1xuICAgICAgICBjbG9uZSgpOklTY2FsZTtcbiAgICAgICAgIGVxdWFsKHZhbHVlOklTY2FsZSk7XG4gICAgICAgICAgICBcbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNjYWxlIGltcGxlbWVudHMgSVNjYWxlIHtcbiAgICAgICAgcHJpdmF0ZSBfX2lkOiBzdHJpbmc7XG4gICAgICAgIHByb3RlY3RlZCBfX3N0YXJ0OiBhbnk7XG4gICAgICAgIHByb3RlY3RlZCBfX2VuZDogYW55O1xuICAgICAgICBwcm90ZWN0ZWQgX19ib3VuZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBwcm90ZWN0ZWQgX29yZGVyOiBPcmRlcjtcbiAgICAgICAgcmVhZG9ubHkgbWF4OiBudW1iZXI7XG4gICAgICAgIHJlYWRvbmx5IG1pbjogbnVtYmVyO1xuICAgICAgICBjb25zdHJ1Y3RvcihpZD86IHN0cmluZykge1xuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICAgICAgdGhpcy5fb3JkZXIgPSBPcmRlci5Ob25lO1xuICAgICAgICB9XG5cblxuICAgICAgICBwcm90ZWN0ZWQgX19kb21haW5zOiBhbnlbXSA9IFtdO1xuICAgICAgICBwcm90ZWN0ZWQgcmFuZ2VzOiBhbnlbXSA9IFtdO1xuXG4gICAgICAgIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9faWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9faWQ7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGRvbWFpbihkb21haW5zOiBhbnlbXSk6IElTY2FsZSB7XG4gICAgICAgICAgICB0aGlzLl9fZG9tYWlucyA9IGRvbWFpbnM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgcmFuZ2UocmFuZ2VzOiBhbnlbXSkge1xuICAgICAgICAgICAgdGhpcy5yYW5nZXMgPSByYW5nZXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2VCb3VuZHMocmFuZ2VzOiBhbnlbXSk6IElTY2FsZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2goKTogSVNjYWxlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0U2NhbGVWYWx1ZSh2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHN0YXJ0UG9zaXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGdldCBlbmRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZW5kO1xuICAgICAgICB9XG4gICAgICAgIGdldCBvcmRlcigpOiBPcmRlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3JkZXI7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG9yZGVyKHZhbHVlOiBPcmRlcikge1xuICAgICAgICAgICAgdGhpcy5fb3JkZXIgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZXF1YWwodmFsdWU6IFNjYWxlKSB7XG4gICAgICAgICAgICBpZih2YWx1ZSAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pZCA9PSB2YWx1ZS5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgY2xvbmUoKTogU2NhbGV7XG4gICAgICAgICAgICByZXR1cm4gXy5jbG9uZURlZXAodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0J1xuICAgIGV4cG9ydCBjbGFzcyBMaW5lYXJTY2FsZSBleHRlbmRzIFNjYWxlIHtcbiAgICAgICAgcHJvdGVjdGVkIF9tYXg6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9taW46IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIG5pY2VNYXhWYWx1ZTogbnVtYmVyO1xuXG4gICAgICAgIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdHJ1Y3RvcihpZD86IGFueSkge1xuICAgICAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tYWluKGRvbWFpbnM6YW55W10pe1xuICAgICAgICAgICAgc3VwZXIuZG9tYWluKGRvbWFpbnMpO1xuICAgICAgICAgICAgdGhpcy5fbWluID0gdGhpcy5fX2RvbWFpbnNbMF07XG4gICAgICAgICAgICB0aGlzLl9tYXggPSB0aGlzLl9fZG9tYWluc1sxXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCgpOiBJU2NhbGUge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXIgPT09IE9yZGVyLkFzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGFydCA9IHRoaXMucmFuZ2VzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19lbmQgPSB0aGlzLnJhbmdlc1sxXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gT3JkZXIuRGVzYykge1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGFydCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19lbmQgPSB0aGlzLnJhbmdlc1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0ID0gdGhpcy5yYW5nZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fX2VuZCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbWluID0gdGhpcy5fX2RvbWFpbnNbMF07XG4gICAgICAgICAgICB0aGlzLl9tYXggPSB0aGlzLl9fZG9tYWluc1sxXTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJhbmdlKHJhbmdlczogYW55W10pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gcmFuZ2VzO1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnJlZnJlc2goKSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRTY2FsZVZhbHVlKHY6IGFueSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuX21heCA9PSB0aGlzLl9taW4pIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICh0aGlzLl9fZW5kIC0gdGhpcy5fX3N0YXJ0KSAvIDIgKyB0aGlzLl9fc3RhcnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKHRoaXMuX19lbmQgLSB0aGlzLl9fc3RhcnQpIC8gKHRoaXMuX21heCAtIHRoaXMuX21pbikgKiAodiAtIHRoaXMuX21pbikgKyB0aGlzLl9fc3RhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIFxuXG4gICAgICAgIHB1YmxpYyBlcXVhbCh2YWx1ZTogU2NhbGUpIHtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5pZCA9PSB0aGlzLmlkICYmIHZhbHVlLm1heCA9PSB0aGlzLm1heCAmJiB2YWx1ZS5taW4gPT0gdGhpcy5taW4gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9ICAgICAgICAgICAgXG4gICAgLy8gICAgcHVibGljIGNsb25lKCk6TGluZWFyU2NhbGV7XG4gICAgLy8gICAgICAgIGxldCBzY2FsZSA9ICBuZXcgTGluZWFyU2NhbGUodGhpcy5pZCk7XG4gICAgLy8gICAgICAgIGxldCBkb21haW5zOmFueVtdID1bXTtcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9fZG9tYWlucy5sZW5ndGg7ICsraSl7XG4gICAgLy8gICAgICAgICAgICAgZG9tYWlucy5wdXNoKHRoaXMuX19kb21haW5zW2ldKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIC8vIGxldCByYW5nZXMgOmFueVtdID1bXTtcbiAgICAvLyAgICAgICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJhbmdlcy5sZW5ndGg7ICsraSl7XG4gICAgLy8gICAgICAgICAvLyAgICAgcmFuZ2VzLnB1c2godGhpcy5yYW5nZXNbaV0pO1xuICAgIC8vICAgICAgICAgLy8gfVxuICAgIC8vICAgICAgICBzY2FsZS5kb21haW4oZG9tYWlucyk7Ly8ucmFuZ2UocmFuZ2VzKS5yZWZyZXNoKCk7XG4gICAgLy8gICAgICAgIHJldHVybiBzY2FsZTtcbiAgICAvLyAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBPcmRpbmFsU2NhbGUgZXh0ZW5kcyBTY2FsZSB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoaWQ/OiBhbnkpIHtcbiAgICAgICAgICAgIHN1cGVyKGlkKTtcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoKCk6IElTY2FsZSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyID09PSBPcmRlci5Bc2MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZG9tYWlucy5zb3J0KGZ1bmN0aW9uIChhOiBhbnksIGI6IGFueSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IE9yZGVyLkRlc2MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZG9tYWlucy5zb3J0KGZ1bmN0aW9uIChhOiBhbnksIGI6IGFueSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYiAtIGE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQodGhpcy5yYW5nZXMgIT0gbnVsbCwgXCJcIik7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQodGhpcy5yYW5nZXMubGVuZ3RoID09IDIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2VzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3N0YXJ0ID0gdGhpcy5yYW5nZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fX2VuZCA9IHRoaXMucmFuZ2VzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgbWluKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBkb21haW5zKCk6IGFueVtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZG9tYWlucztcbiAgICAgICAgfVxuXG4gICAgICAgIHJhbmdlKHJhbmdlczogYW55W10pIHtcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzID0gcmFuZ2VzO1xuICAgICAgICAgICAgdGhpcy5fX2JvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMucmVmcmVzaCgpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByYW5nZUJvdW5kcyhyYW5nZXM6IGFueVtdKSB7XG4gICAgICAgICAgICB0aGlzLnJhbmdlcyA9IHJhbmdlcztcbiAgICAgICAgICAgIHRoaXMuX19ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMucmVmcmVzaCgpLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZG9tYWluKGRvbWFpbnM6IGFueVtdKTogSVNjYWxlIHtcbiAgICAgICAgICAgIHRoaXMuX19kb21haW5zID0gZG9tYWlucztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGdldFNjYWxlVmFsdWUodjogYW55KSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9fZG9tYWlucy5pbmRleE9mKHYpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fYm91bmQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IChpbmRleCArIDAuNSkgKiAodGhpcy5fX2VuZCAtIHRoaXMuX19zdGFydCkgLyAodGhpcy5kb21haW5zLmxlbmd0aCkgKyB0aGlzLl9fc3RhcnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaW5kZXggKiAodGhpcy5fX2VuZCAtIHRoaXMuX19zdGFydCkgLyAodGhpcy5kb21haW5zLmxlbmd0aC0xKSArIHRoaXMuX19zdGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHB1YmxpYyBjbG9uZSgpOk9yZGluYWxTY2FsZXtcbiAgICAgICAgLy8gICAgIGxldCBzY2FsZSA9ICBuZXcgT3JkaW5hbFNjYWxlKHRoaXMuaWQpO1xuICAgICAgICAvLyAgICAgbGV0IGRvbWFpbnM6YW55W10gPVtdO1xuICAgICAgICAvLyAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9fZG9tYWlucy5sZW5ndGg7ICsraSl7XG4gICAgICAgIC8vICAgICAgICAgIGRvbWFpbnMucHVzaCh0aGlzLl9fZG9tYWluc1tpXSk7XG4gICAgICAgIC8vICAgICAgfVxuICAgICAgICAvLyAgICAgLy8gIGxldCByYW5nZXMgOmFueVtdID1bXTtcbiAgICAgICAgLy8gICAgIC8vICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yYW5nZXMubGVuZ3RoOyArK2kpe1xuICAgICAgICAvLyAgICAgLy8gICAgICByYW5nZXMucHVzaCh0aGlzLnJhbmdlc1tpXSk7XG4gICAgICAgIC8vICAgICAvLyAgfVxuICAgICAgICAvLyAgICAgc2NhbGUuZG9tYWluKGRvbWFpbnMpOy8vLnJhbmdlKHJhbmdlcykucmVmcmVzaCgpO1xuICAgICAgICAvLyAgICAgcmV0dXJuIHNjYWxlO1xuICAgICAgICAvLyB9XG5cbiAgICB9XG5cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG5cblxuICAgIGV4cG9ydCBjbGFzcyBMb2dTY2FsZSBleHRlbmRzIFNjYWxlIHtcblxuICAgICAgICBwcm90ZWN0ZWQgX21heDogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX21pbjogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX25pY2VUaWNrOiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfbmljZU1heFZhbHVlOiBudW1iZXI7XG4gICAgICAgIHByaXZhdGUgX3RpY2tzaXplOm51bWJlciA9IDY7XG5cbiAgICAgICAgcHJvdGVjdGVkIF9sb2dCYXNlOiBudW1iZXI7XG5cbiAgICAgICAgY29uc3RydWN0b3IobG9nYmFzZTogbnVtYmVyLCBpZD86IGFueSkge1xuICAgICAgICAgICAgc3VwZXIoaWQpO1xuICAgICAgICAgICAgdGhpcy5fbG9nQmFzZSA9IGxvZ2Jhc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRvbWFpbihkb21haW5zOmFueVtdKXtcbiAgICAgICAgICAgIHN1cGVyLmRvbWFpbihkb21haW5zKTtcbiAgICAgICAgICAgIHRoaXMuX21pbiA9IHRoaXMuX19kb21haW5zWzBdO1xuICAgICAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5fX2RvbWFpbnNbMV07XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBnZXQgbG9nQmFzZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvZ0Jhc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHRpY2tTaXplKHZhbHVlOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl90aWNrc2l6ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2goKTogSVNjYWxlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyID09PSBPcmRlci5Bc2MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc3RhcnQgPSB0aGlzLnJhbmdlc1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW5kID0gdGhpcy5yYW5nZXNbMV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IE9yZGVyLkRlc2MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc3RhcnQgPSB0aGlzLnJhbmdlc1sxXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZW5kID0gdGhpcy5yYW5nZXNbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdGFydCA9IHRoaXMucmFuZ2VzWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19lbmQgPSB0aGlzLnJhbmdlc1sxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbWluID0gdGhpcy5fX2RvbWFpbnNbMF07XG4gICAgICAgICAgICB0aGlzLl9tYXggPSB0aGlzLl9fZG9tYWluc1sxXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2dCYXNlID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBiYXNlID0gdGhpcy5fbG9nQmFzZTtcbiAgICAgICAgICAgICAgICB2YXIgayA9IE1hdGgubG9nKGJhc2UpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGltYXggPSBNYXRoLmNlaWwoTWF0aC5sb2codGhpcy5fbWF4KSAvIGspO1xuICAgICAgICAgICAgICAgIHRoaXMuX21heCA9IE1hdGgucG93KGJhc2UsIGltYXgpO1xuICAgICAgICAgICAgICAgIHZhciBpbWluID0gTWF0aC5mbG9vcihNYXRoLmxvZyh0aGlzLl9taW4pIC8gayk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWluID0gTWF0aC5wb3coYmFzZSwgaW1pbik7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWluIDw9IDAgfHwgaXNOYU4odGhpcy5fbWluKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9taW4gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWF4IDwgdGhpcy5fbWluKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21heCA9IHRoaXMuX21pbiArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICByYW5nZShyYW5nZXM6IGFueVtdKSB7XG4gICAgICAgICAgICB0aGlzLnJhbmdlcyA9IHJhbmdlcztcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5yZWZyZXNoKCksIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHRpY2tzKCk6IGFueVtdIHtcbiAgICAgICAgICAgIHZhciB0aWNrczogYW55W10gPSBuZXcgQXJyYXkodGhpcy5fdGlja3NpemUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gdGhpcy5fdGlja3NpemU7ICsraSkge1xuICAgICAgICAgICAgICAgIHRpY2tzW2ldID0gaSAqIHRoaXMuX25pY2VUaWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRpY2tzO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0U2NhbGVWYWx1ZSh2OiBhbnkpIHtcbiAgICAgICAgICAgIGlmICh2IDwgdGhpcy5fbWluKSB7XG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuX21pbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtYXhsID0gTWF0aC5sb2codGhpcy5fbWF4IC8gdGhpcy5fbWluKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IE1hdGgubG9nKHYgLyB0aGlzLl9taW4pIC8gbWF4bCAqICh0aGlzLl9fZW5kIC0gdGhpcy5fX3N0YXJ0KSArIHRoaXMuX19zdGFydDtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwdWJsaWMgY2xvbmUoKTpMb2dTY2FsZXtcbiAgICAgICAgLy8gICAgIERlYnVnLmFzc2VydChmYWxzZSxcIkxvZ1NjYWxlIGNsb25lIGhhcyBub3QgYmVlbiBpbXBsZW1lbnRlZCAgXCIpO1xuICAgICAgICAvLyAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuXG59IiwiLy8gLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2Jhc2UuZC50c1wiIC8+XG4vLyBuYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBcbiAgICBcbi8vICAgICAgICAgZXhwb3J0IGNsYXNzIENvbG9yU2NhbGUgZXh0ZW5kcyBPcmRpbmFsU2NhbGUge1xuLy8gICAgICAgICAgICAgcHJpdmF0ZSBfX2NvbG9ycmFuZ2VzOnN0cmluZ1tdO1xuXG4vLyAgICAgICAgICAgICBjb25zdHJ1Y3RvcihpZD86IGFueSkge1xuLy8gICAgICAgICAgICAgICAgIHN1cGVyKGlkKTtcbi8vICAgICAgICAgICAgICAgICB0aGlzLl9fY29sb3JyYW5nZXMgPVtdO1xuXG4vLyAgICAgICAgICAgICB9XG4gICAgICAgICBcbi8vICAgICAgICAgICAgIGdldCBkb21haW5zKCk6IGFueVtdIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2RvbWFpbnM7XG4vLyAgICAgICAgICAgICB9XG4gICAgXG4vLyAgICAgICAgICAgICByYW5nZShyYW5nZXM6IGFueVtdKSB7XG4vLyAgICAgICAgICAgICAgICAgaWYocmFuZ2VzLmxlbmd0aCA+IDEpe1xuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9fY29sb3JyYW5nZXMgPUNvbG9yVXRpbHMuZ3JhZGllbnRDb2xvcihyYW5nZXNbMF0scmFuZ2VzW3Jhbmdlcy5sZW5ndGgtMV0sdGhpcy5fX2RvbWFpbnMubGVuZ3RoKTtcblxuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIucmFuZ2UoWzAsdGhpcy5fX2NvbG9ycmFuZ2VzLmxlbmd0aC0xXSk7XG5cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICByYW5nZUJvdW5kcyhyYW5nZXM6IGFueVtdKSB7XG4vLyAgICAgICAgICAgICAgICAgaWYocmFuZ2VzLmxlbmd0aCA+IDEpe1xuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9fY29sb3JyYW5nZXMgPUNvbG9yVXRpbHMuZ3JhZGllbnRDb2xvcihyYW5nZXNbMF0scmFuZ2VzW3Jhbmdlcy5sZW5ndGgtMV0sdGhpcy5fX2RvbWFpbnMubGVuZ3RoKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLnJhbmdlKFswLHRoaXMuX19jb2xvcnJhbmdlcy5sZW5ndGgtMV0pO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgZ2V0U2NhbGVWYWx1ZSh2OiBhbnkpOmFueSB7XG4vLyAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fX2RvbWFpbnMuaW5kZXhPZih2KTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2NvbG9ycmFuZ2VzW2luZGV4XTtcbi8vICAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgIFxuLy8gICAgICAgICB9XG4gICAgXG4vLyAgICAgfSIsIm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBlbnVtIEVsZW1lbnRUeXBle1xuICAgICAgICBTaGFwZSxcbiAgICAgICAgU2VyaWVzLFxuICAgICAgICBBeGlzLFxuICAgICAgICBTZXJpZXNMZWdlbmQsXG4gICAgICAgIFNjYWxlTGVnZW5kXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBMaW5lYXJMYXlvdXQgPSBhbmRyb2lkLndpZGdldC5MaW5lYXJMYXlvdXQ7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuXG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuXG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgaW1wb3J0IE9yaWVudGF0aW9uID0gYW5kcm9pZC5ncmFwaGljcy5PcmllbnRhdGlvbjtcbiAgICBpbXBvcnQgTGF5b3V0UGFyYW1zID0gYW5kcm9pZC52aWV3LkxheW91dFBhcmFtcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgRm9udCA9IGFuZHJvaWQuZ3JhcGhpY3MuRm9udDtcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGltcG9ydCBNb3Rpb25FdmVudCA9IGFuZHJvaWQudmlldy5ldmVudC5Nb3Rpb25FdmVudDtcblxuICAgIGV4cG9ydCBjbGFzcyBTZXJpZXNMZWdlbmQgZXh0ZW5kcyBMaW5lYXJMYXlvdXQge1xuXG4gICAgICAgIHByaXZhdGUgX3NlcmllczogU2VyaWVzW107XG4gICAgICAgIHByaXZhdGUgX19zaGFwZTogc3RyaW5nO1xuICAgICAgICBjb25zdHJ1Y3RvcihzaGFwZT86ICdiYXInIHwgJ3NjYXR0ZXInKSB7XG4gICAgICAgICAgICBzdXBlcihudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX19zaGFwZSA9IHNoYXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldCBzZXJpZXModmFsdWU6IFNlcmllc1tdKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXJpZXMgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX19sb2FkSXRlbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IHNlcmllcygpOiBTZXJpZXNbXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VyaWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfX2xvYWRJdGVtcygpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsVmlld3MoKTtcblxuICAgICAgICAgICAgbGV0IGNvbG9yQXJyYXk6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXJpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogTGVnZW5kSXRlbSA9IG5ldyBMZWdlbmRJdGVtKCk7XG4gICAgICAgICAgICAgICAgaXRlbS5zZXJpZXMgPSB0aGlzLnNlcmllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3NoYXBlID09ICdiYXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaWNvbiA9IG5ldyBCYXJJY29uKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fc2hhcGUgPT0gJ3NjYXR0ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaWNvbiA9IG5ldyBDaXJjbGVJY29uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uc2VyaWVzLmVuYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaWNvbi5jb2xvciA9IENvbG9yVXRpbHMuaW5kZXhDb2xvcihpKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pY29uLmNvbG9yID0gJ2dyYXknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBjb25zdCBQQURESU5HOiBudW1iZXIgPSA1O1xuICAgIGNsYXNzIExlZ2VuZEl0ZW0gZXh0ZW5kcyBWaWV3IHtcblxuICAgICAgICBwdWJsaWMgc2VyaWVzOiBTZXJpZXM7XG4gICAgICAgIHB1YmxpYyBpY29uOiBJY29uO1xuICAgICAgICBwdWJsaWMgZm9udDogRm9udFxuICAgICAgICBwcml2YXRlIF9fZm9udFJlY3Q6IFJlY3Q7XG4gICAgICAgIHByaXZhdGUgX19pY29uUmVjdDogUmVjdDtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcihudWxsKTtcbiAgICAgICAgICAgIHRoaXMuZm9udCA9IERlZmF1bHQuZm9udDtcbiAgICAgICAgICAgIHRoaXMuZm9udC5mb250Q29sb3IgPSAnYmxhY2snO1xuICAgICAgICB9XG5cbiAgICAgICAgb25NZWFzdXJlKHdpZHRoOiBNZWFzdXJlU3BlYywgaGVpZ2h0OiBNZWFzdXJlU3BlYywgY2FudmFzOiBDYW52YXMpOiBTaXplIHtcbiAgICAgICAgICAgIGxldCB3OiBudW1iZXIgPSB3aWR0aC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgIGxldCBoOiBudW1iZXIgPSBoZWlnaHQuZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgc2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMuc2VyaWVzLm5hbWUsIHRoaXMuZm9udCk7XG4gICAgICAgICAgICB0aGlzLl9fZm9udFJlY3QgPSBuZXcgUmVjdCgwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG4gICAgICAgICAgICBsZXQgaWNvbnNpemUgPSBzaXplLmhlaWdodCAqIDI7XG4gICAgICAgICAgICB0aGlzLl9faWNvblJlY3QgPSBuZXcgUmVjdCgwLCAwLCBpY29uc2l6ZSwgc2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgc2l6ZS53aWR0aCA9IHNpemUud2lkdGggKyBQQURESU5HICogMyArIGljb25zaXplO1xuICAgICAgICAgICAgdGhpcy5zZXRNZWFzdXJlZERpbWVuc2lvbihuZXcgTWVhc3VyZVNwZWMoc2l6ZS53aWR0aCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpLCBuZXcgTWVhc3VyZVNwZWMoc2l6ZS5oZWlnaHQsIExheW91dFBhcmFtcy5FWEFDVExZKSk7XG4gICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkxheW91dChsLCB0LCByLCBiLCBjYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5fX2ZvbnRSZWN0LnRyYW5zbGF0ZShsLCB0KTtcbiAgICAgICAgICAgIHRoaXMuX19pY29uUmVjdC50cmFuc2xhdGUobCArIFBBRERJTkcgKyB0aGlzLl9fZm9udFJlY3Qud2lkdGgsIHQpO1xuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgY2FudmFzLmRyYXdUZXh0KHRoaXMuc2VyaWVzLm5hbWUsIHRoaXMuX19mb250UmVjdC5zdGFydFBvaW50LCB0aGlzLmZvbnQpO1xuICAgICAgICAgICAgdGhpcy5pY29uLmRyYXcodGhpcy5fX2ljb25SZWN0LCBjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIG9uTW91c2VFdmVudChldmVudDogTW90aW9uRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgICAgIGlmIChldmVudC5hY3Rpb24gPT0gTW90aW9uRXZlbnQuQUNUSU9OX0NMSUNLKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJldmVudCBcIik7XG4gICAgICAgICAgICAgICAgd2luZG93WydFdmVudEhhbmRsZXInXShuZXcgUG9pbnQoZXZlbnQueCwgZXZlbnQueSksIEVsZW1lbnRUeXBlLlNlcmllc0xlZ2VuZCwgeyAnc2VyaWVzJzogdGhpcy5zZXJpZXMubmFtZSwgJ2VuYWJsZSc6IHRoaXMuc2VyaWVzLmVuYWJsZSB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhYnN0cmFjdCBjbGFzcyBJY29uIHtcbiAgICAgICAgY29sb3I6IHN0cmluZztcbiAgICAgICAgYWJzdHJhY3QgZHJhdyhyZWN0OiBSZWN0LCBjYW52YXM6IENhbnZhcyk6IHZvaWQ7XG4gICAgfVxuICAgIGNsYXNzIEJhckljb24gZXh0ZW5kcyBJY29uIHtcblxuICAgICAgICBkcmF3KHJlY3Q6IFJlY3QsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1JlY3QocmVjdC5zdGFydFBvaW50LCByZWN0LmVuZFBvaW50LCB0cnVlLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGFzcyBDaXJjbGVJY29uIGV4dGVuZHMgSWNvbiB7XG5cbiAgICAgICAgZHJhdyhyZWN0OiBSZWN0LCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgY2FudmFzLmRyYXdBcmMocmVjdCwgMCwgMiAqIDE4MCwgdGhpcy5jb2xvcik7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRm9udCA9IGFuZHJvaWQuZ3JhcGhpY3MuRm9udDtcbiAgICBpbXBvcnQgQW5pbWF0aW9uID0gYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5BbmltYXRpb247XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaGFwZSBleHRlbmRzIFZpZXd7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIFBSSU9SSVRZIDpudW1iZXI9IDEwMDAwO1xuICAgICAgICBwdWJsaWMgcmVjdDpSZWN0O1xuXG5cbiAgICAgICAgcHVibGljIHByaW9yaXR5Om51bWJlcj0gU2hhcGUuUFJJT1JJVFk7XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgYW5pbWF0aW9uOkFuaW1hdGlvbjtcblxuICAgICAgICBwcm90ZWN0ZWQgX3N0eWxlIDpTdHlsZTtcbiAgICAgICAgICAgIFxuICAgICAgICBwdWJsaWMgc2V0IHN0eWxlKHZhbHVlOlN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBzdHlsZSgpOlN0eWxle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIF9zdHJva2VTdHlsZTpTdHJva2VTdHlsZTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgc3VwZXIobnVsbCk7XG4gICAgICAgICAgICB0aGlzLnJlY3QgPSBuZXcgUmVjdCgwLDAsMCwwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHsgXG4gICAgICAgICAgICB0aGlzLm9uRHJhdyhjYW52YXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3Qgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZDtcblxuICAgICAgICBhYnN0cmFjdCByZWZyZXNoKCk6IHZvaWQ7XG5cbiAgICAgICAgb25Nb3VzZUV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCk6IGJvb2xlYW57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNoYXBlID09PT0gXCIrZXZlbnQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgIH1cbn0iLCJuYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuICAgIGV4cG9ydCBjbGFzcyBMYWJlbCBleHRlbmRzIFNoYXBlIHtcblxuICAgICAgICBwdWJsaWMgdGV4dDogc3RyaW5nO1xuICAgICAgICBwdWJsaWMgbGFiZWxyZWN0OiBSb3RhdGVSZWN0O1xuICAgICAgICBwdWJsaWMgX3N0eWxlOiBTdHlsZTtcbiAgICAgICAgcHJpdmF0ZSBfeHM6IG51bWJlcltdO1xuICAgICAgICBwcml2YXRlIF95czogbnVtYmVyW107XG4gICAgICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgY3g6IG51bWJlciwgY3k6IG51bWJlciwgdzogbnVtYmVyLCBoOiBudW1iZXIsIGFuZ2xlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5sYWJlbHJlY3QgPSBuZXcgUm90YXRlUmVjdChjeCwgY3ksIHcsIGgsIChhbmdsZSA9PSBudWxsIHx8IGlzTmFOKGFuZ2xlKSkgPyAwIDogYW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5feHMgPVtdO1xuICAgICAgICAgICAgdGhpcy5feXM9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0ICYmIGkgPCB0aGlzLmxhYmVscmVjdC5wb2ludHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94c1tpXSA9IHRoaXMubGFiZWxyZWN0LnBvaW50c1tpXS54O1xuICAgICAgICAgICAgICAgIHRoaXMuX3lzW2ldID0gdGhpcy5sYWJlbHJlY3QucG9pbnRzW2ldLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3UG9seWdvbih0aGlzLl94cyx0aGlzLl95cyx0aGlzLl9zdHlsZS5iYWNrZ3JvdW5kKTtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3VGV4dCh0aGlzLnRleHQsIHRoaXMubGFiZWxyZWN0LmxlZnRUb3AsIHRoaXMuX3N0eWxlLmZvbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxvdFNoYXBlIGV4dGVuZHMgU2hhcGUge1xuICAgICAgICBwdWJsaWMgbGFiZWw6IExhYmVsO1xuICAgICAgICBkcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5sYWJlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5sYWJlbC5vbkRyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2goKTogdm9pZCB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiAqKiogeW91LCB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBiZWVuIGltcGxlbWVudGVkIHlldCEhISBcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgQmFyU2hhcGUgZXh0ZW5kcyBQbG90U2hhcGUge1xuICAgICAgICBcbiAgICAgICAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIsdzpudW1iZXIsaDpudW1iZXIsc3R5bGU/OlN0eWxlLHN0cm9rZVN0eWxlPzpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5yZWN0LmxlZnQgPXg7XG4gICAgICAgICAgICB0aGlzLnJlY3QucmlnaHQgPXggK3c7XG4gICAgICAgICAgICB0aGlzLnJlY3QudG9wID0geTtcbiAgICAgICAgICAgIHRoaXMucmVjdC5ib3R0b20gPXkraDtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gc3R5bGU7XG4gICAgICAgICAgICBpZihzdHlsZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZSA9IERlZmF1bHQuc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9c3Ryb2tlU3R5bGU7XG4gICAgICAgICAgICBpZihzdHJva2VTdHlsZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0aGlzLnJlY3QuaGVpZ2h0IDwgMCl7XG4gICAgICAgICAgICAgICAgbGV0IHRvcCA9IHRoaXMucmVjdC5ib3R0b207XG4gICAgICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMucmVjdC50b3A7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWN0LnRvcCAgPSB0b3A7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWN0LmJvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgY2FudmFzLmRyYXdSZWN0KHRoaXMucmVjdC5zdGFydFBvaW50LHRoaXMucmVjdC5lbmRQb2ludCx0cnVlLHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFJhZGlhbEJhclNoYXBlIGV4dGVuZHMgUGxvdFNoYXBlIHtcbiAgICAgICAgcHJvdGVjdGVkIF9jeDpudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfY3k6bnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX2lubmVyUmFkaXVzOm51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9yYWRpdXM6bnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX3N0YXJ0QW5nbGU6bnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX3N3ZWVwOm51bWJlcjtcbiAgICAgICAgY29uc3RydWN0b3IoY3g6bnVtYmVyLGN5Om51bWJlcixpbm5lclJhZGl1czpudW1iZXIscmFkaXVzOm51bWJlcixzdGFydEFuZ2xlOm51bWJlcixzd2VlcDpudW1iZXIsc3R5bGU/OlN0eWxlLHN0cm9rZVN0eWxlPzpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgdGhpcy5yZWN0LmxlZnQgPWN4LXJhZGl1cztcbiAgICAgICAgICAgIHRoaXMucmVjdC5yaWdodCA9Y3ggK3JhZGl1cztcbiAgICAgICAgICAgIHRoaXMucmVjdC50b3AgPSBjeS1yYWRpdXM7XG4gICAgICAgICAgICB0aGlzLnJlY3QuYm90dG9tID1jeStyYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9jeCA9IGN4O1xuICAgICAgICAgICAgdGhpcy5fY3kgPSBjeTtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyUmFkaXVzID0gaW5uZXJSYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICAgICAgICAgIHRoaXMuX3N3ZWVwID0gc3dlZXA7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgaWYoc3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPXN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgaWYoc3Ryb2tlU3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5fc3dlZXAgPCAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gdGhpcy5fc3RhcnRBbmdsZSArIHRoaXMuX3N3ZWVwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N3ZWVwID0gdGhpcy5fc3dlZXAgKi0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0RvbnV0KHRoaXMuX2N4LHRoaXMuX2N5LHRoaXMuX3JhZGl1cyx0aGlzLl9pbm5lclJhZGl1cyx0aGlzLl9zdGFydEFuZ2xlLHRoaXMuX3N3ZWVwLHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuICAgIGltcG9ydCBBbmltYXRpb24gPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLkFuaW1hdGlvbjtcbiAgICBpbXBvcnQgU2NhbGVBbmltYXRpb24gPSBhbmRyb2lkLnZpZXcuYW5pbWF0aW9uLlNjYWxlQW5pbWF0aW9uO1xuICAgIGV4cG9ydCBjbGFzcyBTY2F0dGVyU2hhcGUgZXh0ZW5kcyBQbG90U2hhcGUge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgc3R5bGU/OiBTdHlsZSwgc3Ryb2tlU3R5bGU/OiBTdHJva2VTdHlsZSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVjdC5sZWZ0ID0geDtcbiAgICAgICAgICAgIHRoaXMucmVjdC5yaWdodCA9IHggKyB3O1xuICAgICAgICAgICAgdGhpcy5yZWN0LnRvcCA9IHk7XG4gICAgICAgICAgICB0aGlzLnJlY3QuYm90dG9tID0geSArIGg7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgaWYgKHN0eWxlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZSA9IERlZmF1bHQuc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IHN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgaWYgKHN0cm9rZVN0eWxlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5yZWN0LmhlaWdodCA8IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gdGhpcy5yZWN0LmJvdHRvbTtcbiAgICAgICAgICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5yZWN0LnRvcDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3QudG9wID0gdG9wO1xuICAgICAgICAgICAgICAgIHRoaXMucmVjdC5ib3R0b20gPSBib3R0b207XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gU2hhcGUuUFJJT1JJVFkgKyAyO1xuXG4gICAgICAgIH1cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0FyYyh0aGlzLnJlY3QsIDAsIDIgKiAxODAsIHRoaXMuc3R5bGUuYmFja2dyb3VuZCk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1vdXNlRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNoYXBlID09PT0gXCIgKyBldmVudC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fQ0xJQ0s6XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb246IFNjYXR0ZXJBbmltYXRpb24gPSBuZXcgU2NhdHRlckFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24uZHVyYXRpb24gPSA1MDA7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcm9tID0gMC41O1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb24udG8gPTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBbmltYXRpb24oYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfTU9WRTpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT1VUOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgY2xhc3MgU2NhdHRlckFuaW1hdGlvbiBleHRlbmRzIEFuaW1hdGlvbntcbiAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmVhc2UgPSBuZXcgYW5kcm9pZC52aWV3LmFuaW1hdGlvbi5Cb3VuY2VBbmltYXRpb25FYXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVRyYW5zZm9ybWF0aW9uKGludGVycG9sYXRlZFRpbWU6bnVtYmVyLCBjYW52YXM6Q2FudmFzLHZpZXc6Vmlldykge1xuICAgICAgICAgICAgaWYodmlldyBpbnN0YW5jZW9mIFNjYXR0ZXJTaGFwZSl7XG4gICAgICAgICAgICAgICAgY2FudmFzLm1vdmVUbyh2aWV3LnJlY3QubGVmdCt2aWV3LnJlY3Qud2lkdGgvMix2aWV3LnJlY3QudG9wK3ZpZXcucmVjdC5oZWlnaHQvMik7XG4gICAgICAgICAgICAgICAgY2FudmFzLnNjYWxlKHRoaXMuZnJvbSArICh0aGlzLnRvLXRoaXMuZnJvbSkgKiBpbnRlcnBvbGF0ZWRUaW1lLHRoaXMuZnJvbSArICh0aGlzLnRvLXRoaXMuZnJvbSkgKiBpbnRlcnBvbGF0ZWRUaW1lKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImJlZm9yZSA9PT0gU2NhdHRlciBhbmltYXRpb24gXCIgKyB2aWV3LnJlY3Qud2lkdGggKyBcIiBpbnRlcnBvbGF0ZWRUaW1lIFwiICtpbnRlcnBvbGF0ZWRUaW1lKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyAvLyB2aWV3LnJlY3Quc2NhbGUoMS0odGhpcy5mcm9tKyh0aGlzLnRvLXRoaXMuZnJvbSkqaW50ZXJwb2xhdGVkVGltZSkpO1xuICAgICAgICAgICAgICAgIC8vIHZpZXcucmVjdC53aWR0aCA9IHZpZXcucmVjdC53aWR0aCoodGhpcy5mcm9tKyh0aGlzLnRvLXRoaXMuZnJvbSkqaW50ZXJwb2xhdGVkVGltZSk7XG4gICAgICAgICAgICAgICAgLy8gLy8gdmlldy5yZWN0LndpZHRoID0gdmlldy5yZWN0LndpZHRoKih0aGlzLmZyb20rKHRoaXMudG8tdGhpcy5mcm9tKSppbnRlcnBvbGF0ZWRUaW1lKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlNjYXR0ZXIgYW5pbWF0aW9uIFwiICsgdmlldy5yZWN0LndpZHRoICsgXCIgaW50ZXJwb2xhdGVkVGltZSBcIiAraW50ZXJwb2xhdGVkVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIExpbmVzU2hhcGUgZXh0ZW5kcyBQbG90U2hhcGUge1xuICAgICAgICBwcml2YXRlIF9feHM6bnVtYmVyW107XG4gICAgICAgIHByaXZhdGUgX195czpudW1iZXJbXTtcblxuICAgICAgICBjb25zdHJ1Y3Rvcih4czpudW1iZXJbXSx5czpudW1iZXJbXSxzdHlsZT86U3R5bGUsc3Ryb2tlU3R5bGU/OlN0cm9rZVN0eWxlKXtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnByaW9yaXR5ID0gU2hhcGUuUFJJT1JJVFkgKzE7XG4gICAgICAgICAgICB0aGlzLl9feHMgPSB4cztcbiAgICAgICAgICAgIHRoaXMuX195cyA9IHlzO1xuICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgIGlmKHN0eWxlID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gRGVmYXVsdC5zdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID1zdHJva2VTdHlsZTtcbiAgICAgICAgICAgIGlmKHN0cm9rZVN0eWxlID09IG51bGwpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIGdldCBzdHJva2VTdHlsZSgpOlN0cm9rZVN0eWxle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cm9rZVN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIHNldCBzdHJva2VTdHlsZSh2YWx1ZTpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNhbnZhcy5kcmF3UmVjdCh0aGlzLnJlY3Quc3RhcnRQb2ludCx0aGlzLnJlY3QuZW5kUG9pbnQsdHJ1ZSx0aGlzLl9zdHlsZS5iYWNrZ3JvdW5kKTtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZXModGhpcy5fX3hzLHRoaXMuX195cyx0aGlzLl9zdHJva2VTdHlsZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBWaWV3U3RhdGUgPSBhbmRyb2lkLnZpZXcuVmlld1N0YXRlO1xuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIEFyZWFTaGFwZSBleHRlbmRzIFBsb3RTaGFwZSB7XG4gICAgICAgIHByaXZhdGUgX194czpudW1iZXJbXTtcbiAgICAgICAgcHJpdmF0ZSBfX3lzOm51bWJlcltdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHhzOm51bWJlcltdLHlzOm51bWJlcltdLHN0eWxlPzpTdHlsZSxzdHJva2VTdHlsZT86U3Ryb2tlU3R5bGUpe1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMucHJpb3JpdHkgPSBTaGFwZS5QUklPUklUWSArMTtcbiAgICAgICAgICAgIHRoaXMuX194cyA9IHhzO1xuICAgICAgICAgICAgdGhpcy5fX3lzID0geXM7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgaWYoc3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBEZWZhdWx0LnN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPXN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgaWYoc3Ryb2tlU3R5bGUgPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgZ2V0IHN0cm9rZVN0eWxlKCk6U3Ryb2tlU3R5bGV7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlU3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHN0cm9rZVN0eWxlKHZhbHVlOlN0cm9rZVN0eWxlKXtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY2FudmFzLmRyYXdSZWN0KHRoaXMucmVjdC5zdGFydFBvaW50LHRoaXMucmVjdC5lbmRQb2ludCx0cnVlLHRoaXMuX3N0eWxlLmJhY2tncm91bmQpO1xuICAgICAgICAgICAgY2FudmFzLmRyYXdQb2x5Z29uKHRoaXMuX194cyx0aGlzLl9feXMsdGhpcy5zdHlsZS5iYWNrZ3JvdW5kKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgUG9pbnQgPSBhbmRyb2lkLmdyYXBoaWNzLlBvaW50O1xuICAgIGV4cG9ydCBjbGFzcyBBeGlzTGluZVNoYXBlIGV4dGVuZHMgU2hhcGUge1xuICAgICAgICBwcml2YXRlIHN0YXJ0UG9pbnQ6IFBvaW50O1xuICAgICAgICBwcml2YXRlIGVuZFBvaW50OiBQb2ludDtcbiAgICAgICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGV4OiBudW1iZXIsIGV5OiBudW1iZXIsIHN0cm9rZVN0eWxlPzogU3Ryb2tlU3R5bGUpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9pbnQgPSBuZXcgUG9pbnQoeCwgeSk7XG4gICAgICAgICAgICB0aGlzLmVuZFBvaW50ID0gbmV3IFBvaW50KGV4LCBleSk7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IHN0cm9rZVN0eWxlO1xuICAgICAgICAgICAgaWYgKHN0cm9rZVN0eWxlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBvbkRyYXcoY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZSh0aGlzLnN0YXJ0UG9pbnQsIHRoaXMuZW5kUG9pbnQsXG4gICAgICAgICAgICAgICAgdGhpcy5fc3Ryb2tlU3R5bGUpO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyByZWZyZXNoKCkgeyB9XG4gICAgfVxufVxuIiwibmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7ICAgIFxuICAgIC8qKlxuICAgICAqIEJhc2VMYXlvdXRcbiAgICAgKi9cbiAgICBleHBvcnQgY2xhc3MgQmFzZUxheW91dHtcbiAgICAgICAgcHJvdGVjdGVkIF9fc2hhcGVsaXN0IDpTaGFwZVtdID0gW107XG4gICAgICAgIFxuICAgICAgICBjb252ZXJ0KC4uLmFyZ3MpOlNoYXBlW117XG4gICAgICAgICAgICB0aHJvdyAnZnVjayBFcnJvcic7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBzaGFwZUxpc3QoKTpTaGFwZVtde1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zaGFwZWxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgcmVhZG9ubHkgc2NhbGVQYWlycyA6IHsgIHNlcmllczpzdHJpbmdbXSxmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W107ICAgICAgICAgICAgXG4gICAgfVxuXG5cbiAgICAgICAgXG4gIFxuICAgXG4gICAgXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBSZWN0ID0gYW5kcm9pZC5ncmFwaGljcy5SZWN0O1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGltcG9ydCBTdHJva2VTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3Ryb2tlU3R5bGU7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhcnRlc2lhbkxheW91dCBleHRlbmRzIEJhc2VMYXlvdXQge1xuICAgICAgICBwdWJsaWMgYmFyU3R5bGU6IFN0eWxlID0gRGVmYXVsdC5zdHlsZTtcbiAgICAgICAgcHVibGljIGxpbmVTdHlsZTogU3Ryb2tlU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICBwcm90ZWN0ZWQgX19zY2FsZVBhaXJzOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXTtcbiAgICAgICAgcHJvdGVjdGVkIF9sb2NhdGlvbkNhY2hlOiB7IGtleTogc3RyaW5nIHwgbnVtYmVyLCBwb2ludHM6IGFueVtdIH1bXSA9IFtdO1xuICAgICAgICBwcm90ZWN0ZWQgX3Nlcmllc2xpc3Q6IFNlcmllc1tdO1xuICAgICAgICBwcm90ZWN0ZWQgX3N0YWNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByb3RlY3RlZCBfcmVjdDogUmVjdCA9IG51bGw7XG4gICAgICAgIHByb3RlY3RlZCBfZW5jb2Rpbmc6IEVuY29kaW5nO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBjb252ZXJ0KHNlcmllc2xpc3Q6IFNlcmllc1tdLCBlbmNvZGluZzogRW5jb2RpbmcsIHJlY3Q6IFJlY3QpOiBTaGFwZVtdIHtcbiAgICAgICAgICAgIHRoaXMuX19zaGFwZWxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3Nlcmllc2xpc3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHNlciBvZiBzZXJpZXNsaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VyaWVzbGlzdC5wdXNoKHNlci5jbG9uZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VuY29kaW5nID0gZW5jb2Rpbmc7XG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbkNhY2hlID0gW107XG4gICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc3RhY2sgPSBlbmNvZGluZy5fc3RhY2s7XG4gICAgICAgICAgICB0aGlzLl9yZWN0ID0gcmVjdDtcbiAgICAgICAgICAgIHRoaXMuX19hbmFseXNlU2NhbGVzKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRTZXJpZXModGhpcy5fc2VyaWVzbGlzdFtpXSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NoYXBlbGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX19hbmFseXNlU2NhbGVzKCkge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlTGF5b3V0U2NhbGVzKHRoaXMuX2VuY29kaW5nKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc2VyIG9mIHRoaXMuX3Nlcmllc2xpc3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzY2FsZXBhaXIgb2Ygc2VyLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVkOiBGaWVsZCA9IHNjYWxlcGFpci5maWxlZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IHNjYWxlcGFpci5zY2FsZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZWQubmFtZSA9PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5iYW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlQm91bmRzKFt0aGlzLl9yZWN0LmxlZnQsIHRoaXMuX3JlY3QucmlnaHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShbdGhpcy5fcmVjdC5sZWZ0LCB0aGlzLl9yZWN0LnJpZ2h0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShbdGhpcy5fcmVjdC5sZWZ0LCB0aGlzLl9yZWN0LnJpZ2h0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZWQubmFtZSA9PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlZC5iYW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlQm91bmRzKFt0aGlzLl9yZWN0LmJvdHRvbSwgdGhpcy5fcmVjdC50b3BdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShbdGhpcy5fcmVjdC5ib3R0b20sIHRoaXMuX3JlY3QudG9wXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGlja2VyOiBMaW5lYXJUaWNrcyA9IExpbmVhclRpY2tzLmNyZWF0ZShzY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSB0aWNrZXIubmljZVNjYWxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUucmFuZ2UoW3RoaXMuX3JlY3QuYm90dG9tLCB0aGlzLl9yZWN0LnRvcF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlTGF5b3V0U2NhbGVzKGVuY29kaW5nOiBFbmNvZGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBTZXJpZXMgPSB0aGlzLl9zZXJpZXNsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHNlcmllcy5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZWQ6IEZpZWxkID0gcGFpci5maWxlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNhZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcCBvZiB0aGlzLl9fc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcC5maWxlZC5lcXVhbHMoZmlsZWQpIHx8ICFwLnNjYWxlLmVxdWFsKHBhaXIuc2NhbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2FkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5zZXJpZXMucHVzaChzZXJpZXMubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzYWRkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWVdLCBmaWxlZDogZmlsZWQsIHNjYWxlOiBwYWlyLnNjYWxlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fX3NjYWxlUGFpcnMgPSB0aGlzLl9zZXJpZXNsaXN0WzBdLnNjYWxlUGFpcnM7XG4gICAgICAgICAgICAgICAgbGV0IHNlcmllczogU2VyaWVzID0gdGhpcy5fc2VyaWVzbGlzdFswXTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHtzZXJpZXM6W3Nlcmllcy5uYW1lXSwgZmlsZWQ6IHNlcmllcy5maWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiBzZXJpZXMuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbc2VyaWVzLm5hbWVdLCBmaWxlZDogcGFpci5maWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG1heFNlcmllc1NpemUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGxldCB4c2NhbGUgPSB0aGlzLl9nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgaWYgKHhzY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4c2NhbGUuZG9tYWlucy5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsaXR5Lm1heCh0aGlzLl9zZXJpZXNsaXN0Lm1hcCgoc2VyOiBTZXJpZXMsIGluZGV4OiBudW1iZXIsIGFycmF5OiBTZXJpZXNbXSkgPT4geyByZXR1cm4gc2VyLnNpemU7IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2xheW91dFNlcmllcyhzZXJpZXM6IFNlcmllcywgaW5kZXg6IG51bWJlcik6IHZvaWQ7XG5cblxuICAgICAgICBnZXQgc2NhbGVQYWlycygpOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NjYWxlUGFpcnM7XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfZ2V0U2NhbGUobmFtZTogc3RyaW5nKTogU2NhbGUge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5fX3NjYWxlUGFpcnMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZmlsZWQubmFtZSA9PSBuYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NjYWxlUGFpcnNbaW5kZXhdLnNjYWxlO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGV4cG9ydCBjbGFzcyBCYXJMYXlvdXQgZXh0ZW5kcyBDYXJ0ZXNpYW5MYXlvdXR7XG4gICAgICAgIGdldCBiYXJXaWR0aCgpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWN0LndpZHRoL3RoaXMubWF4U2VyaWVzU2l6ZS8odGhpcy5fc3RhY2s/MTp0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCkgKjAuOTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6U2VyaWVzLGluZGV4Om51bWJlcik6dm9pZHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgeFNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgnY29sb3InKTtcbiAgICAgICAgICAgIGxldCBjb2xvckFycmF5OnN0cmluZ1tdPVtdO1xuICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZSA9IGNvbG9yU2NhbGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBjb2xvckFycmF5ID0gQ29sb3JVdGlscy5ncmFkaWVudENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlLnJhbmdlKFswLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZWZhdWx0Y29sb3I6c3RyaW5nID1Db2xvclV0aWxzLmluZGV4Q29sb3Ioc2VyaWVzLmluZGV4KTtcbiAgICAgICAgICAgIGZvcihsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cyl7XG4gICAgICAgICAgICAgICAgaWYoIHB0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcnZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgOlZhbHVlPSBwdC5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4Om51bWJlciA9IHhTY2FsZS5nZXRTY2FsZVZhbHVlKHh2YWx1ZS52YWx1ZSkgKyh0aGlzLl9zdGFjayA/MDooKGluZGV4IC0gKHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoLTEpLzIpICogdGhpcy5iYXJXaWR0aCkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTAgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzBdOih5U2NhbGUubWluPDA/MDp5U2NhbGUubWluKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkxID0geXZhbHVlLmlzTXVsdGlwbGU/IHl2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5dG9wOm51bWJlciA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHkxKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yIDpzdHJpbmcgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yaW5kZXggPSBjb2xvclNjYWxlLmdldFNjYWxlVmFsdWUoY29sb3J2YWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBjb2xvckFycmF5W2NvbG9yaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvclV0aWxzLmdldENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLGNvbG9ydmFsdWUudmFsdWUsY29sb3JTY2FsZS5taW4sY29sb3JTY2FsZS5tYXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCB5Ym90dG9tIDpudW1iZXIgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZSh5MCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHkwID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coeVNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieTAgXCIgKyB5MCArIFwiIHlCb3R0b20gXCIgKyB5Ym90dG9tKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCB4bGVmdCA6bnVtYmVyID0geC0gIHRoaXMuYmFyV2lkdGgvMjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhyaWdodCA6bnVtYmVyID0geCArdGhpcy5iYXJXaWR0aC8yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmFyU2hhcGU6QmFyU2hhcGUgPSBuZXcgQmFyU2hhcGUoeGxlZnQseXRvcCx4cmlnaHQteGxlZnQseWJvdHRvbS15dG9wKTtcbiAgICAgICAgICAgICAgICAgICAgYmFyU2hhcGUuc3R5bGUgPSBuZXcgU3R5bGUoXCJncmF5XCIsRGVmYXVsdC5mb250LERlZmF1bHQuc3Ryb2tlc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2xvciAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhclNoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gZGVmYXVsdGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZWxpc3QucHVzaChiYXJTaGFwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU3R5bGU7XG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGV4cG9ydCBjbGFzcyBTY2F0dGVyTGF5b3V0IGV4dGVuZHMgQ2FydGVzaWFuTGF5b3V0e1xuICAgICAgICBnZXQgYmFyV2lkdGgoKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjdC53aWR0aC90aGlzLm1heFNlcmllc1NpemUvKHRoaXMuX3N0YWNrPzE6dGhpcy5fc2VyaWVzbGlzdC5sZW5ndGgpICowLjk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRTZXJpZXMoc2VyaWVzOlNlcmllcyxpbmRleDpudW1iZXIpOnZvaWR7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgbGV0IHlTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneScpO1xuICAgICAgICAgICAgbGV0IGNvbG9yU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgc2l6ZVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdzaXplJyk7XG4gICAgICAgICAgICBsZXQgZGVmYXVsdGNvbG9yOnN0cmluZyA9Q29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICBsZXQgY29sb3JBcnJheTpzdHJpbmdbXT1bXTtcbiAgICAgICAgICAgIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpe1xuICAgICAgICAgICAgICAgIGNvbG9yU2NhbGUgPSBjb2xvclNjYWxlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgY29sb3JBcnJheSA9IENvbG9yVXRpbHMuZ3JhZGllbnRDb2xvcihjb2xvclNjYWxlLnN0YXJ0UG9zaXRpb24sY29sb3JTY2FsZS5lbmRQb3NpdGlvbiwoPE9yZGluYWxTY2FsZT5jb2xvclNjYWxlKS5kb21haW5zLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZS5yYW5nZShbMCwoPE9yZGluYWxTY2FsZT5jb2xvclNjYWxlKS5kb21haW5zLmxlbmd0aC0xXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGVmYXVsdHNpemU6bnVtYmVyID0gMTA7XG4gICAgICAgICAgICBmb3IobGV0IHB0IG9mIHNlcmllcy5wb2ludHMpe1xuICAgICAgICAgICAgICAgIGlmKCBwdCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHh2YWx1ZSA6VmFsdWU9IHB0Lng7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5dmFsdWUgOlZhbHVlPSBwdC55O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JWYWx1ZSA6VmFsdWUgPSBwdC5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNoYXBlVmFsdWU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemVWYWx1ZSA6VmFsdWU9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHg6bnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKSA7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5Om51bWJlciA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHl2YWx1ZS5pc011bHRpcGxlP3l2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcyA6bnVtYmVyID0gc2l6ZVNjYWxlLmdldFNjYWxlVmFsdWUoc2l6ZVZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNOYU4ocykgfHwgcyA9PSBudWxsIHx8IHMgPD0wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBkZWZhdWx0c2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yaW5kZXggPSBjb2xvclNjYWxlLmdldFNjYWxlVmFsdWUoY29sb3JWYWx1ZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBjb2xvckFycmF5W2NvbG9yaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgPSBDb2xvclV0aWxzLmdldENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLGNvbG9yVmFsdWUudmFsdWUsY29sb3JTY2FsZS5taW4sY29sb3JTY2FsZS5tYXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2F0dGVyU2hhcGUgOlNjYXR0ZXJTaGFwZSA9IG5ldyBTY2F0dGVyU2hhcGUoeC1zLzIseS1zLzIscyxzLERlZmF1bHQuc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2xvciAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYXR0ZXJTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gZGVmYXVsdGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZWxpc3QucHVzaChzY2F0dGVyU2hhcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKXtcbiAgICAgICAgfSAgICAgICAgICAgIFxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBpbXBvcnQgU3Ryb2tlU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0cm9rZVN0eWxlO1xuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSYWRpYWxDYXJ0ZXNpYW5MYXlvdXQgZXh0ZW5kcyBCYXNlTGF5b3V0IHtcbiAgICAgICAgcHVibGljIGJhclN0eWxlOiBTdHlsZSA9IERlZmF1bHQuc3R5bGU7XG4gICAgICAgIHB1YmxpYyBsaW5lU3R5bGU6IFN0cm9rZVN0eWxlID0gRGVmYXVsdC5zdHJva2VzdHlsZTtcbiAgICAgICAgcHJvdGVjdGVkIF9fc2NhbGVQYWlyczogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9W107XG4gICAgICAgIHByb3RlY3RlZCBfbG9jYXRpb25DYWNoZTogeyBrZXk6IHN0cmluZyB8IG51bWJlciwgcG9pbnRzOiBhbnlbXSB9W10gPSBbXTtcbiAgICAgICAgcHJvdGVjdGVkIF9zZXJpZXNsaXN0OiBTZXJpZXNbXTtcbiAgICAgICAgcHJvdGVjdGVkIF9zdGFjazogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBwcm90ZWN0ZWQgX2VuY29kaW5nOiBFbmNvZGluZztcbiAgICAgICAgcHJvdGVjdGVkIF9jeDogbnVtYmVyO1xuICAgICAgICBwcm90ZWN0ZWQgX2N5OiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfaW5uZXJSYWRpdXM6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9yYWRpdXM6IG51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9zdGFydEFuZ2xlOiBudW1iZXI7XG4gICAgICAgIHByb3RlY3RlZCBfZW5kQW5nbGU6IG51bWJlcjtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnZlcnQoc2VyaWVzbGlzdDogU2VyaWVzW10sIGVuY29kaW5nOiBFbmNvZGluZywgY3g6IG51bWJlciwgY3k6IG51bWJlciwgaW5uZXJSYWRpdXM6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIHN0YXJ0QW5nbGU6IG51bWJlciwgZW5kQW5nbGU6IG51bWJlcik6IFNoYXBlW10ge1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdGhpcy5fc2VyaWVzbGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgc2VyIG9mIHNlcmllc2xpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJpZXNsaXN0LnB1c2goc2VyLmNsb25lKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZW5jb2RpbmcgPSBlbmNvZGluZztcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uQ2FjaGUgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzID0gW107XG4gICAgICAgICAgICB0aGlzLl9zdGFjayA9IGVuY29kaW5nLl9zdGFjaztcbiAgICAgICAgICAgIHRoaXMuX2N4ID0gY3g7XG4gICAgICAgICAgICB0aGlzLl9jeSA9IGN5O1xuICAgICAgICAgICAgdGhpcy5faW5uZXJSYWRpdXMgPSBpbm5lclJhZGl1cztcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0QW5nbGUgPSBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5fZW5kQW5nbGUgPSBlbmRBbmdsZTtcbiAgICAgICAgICAgIHRoaXMuX19hbmFseXNlU2NhbGVzKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRTZXJpZXModGhpcy5fc2VyaWVzbGlzdFtpXSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NoYXBlbGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX19hbmFseXNlU2NhbGVzKCkge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlTGF5b3V0U2NhbGVzKHRoaXMuX2VuY29kaW5nKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc2VyIG9mIHRoaXMuX3Nlcmllc2xpc3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzY2FsZXBhaXIgb2Ygc2VyLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVkOiBGaWVsZCA9IHNjYWxlcGFpci5maWxlZDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlOiBTY2FsZSA9IHNjYWxlcGFpci5zY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVkLm5hbWUgPT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZWQuYmFuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZUJvdW5kcyhbdGhpcy5faW5uZXJSYWRpdXMsIHRoaXMuX3JhZGl1c10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLnJhbmdlKFt0aGlzLl9pbm5lclJhZGl1cywgdGhpcy5fcmFkaXVzXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShbdGhpcy5faW5uZXJSYWRpdXMsIHRoaXMuX3JhZGl1c10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVkLm5hbWUgPT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZWQuYmFuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZUJvdW5kcyhbdGhpcy5fc3RhcnRBbmdsZSwgdGhpcy5fZW5kQW5nbGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShbdGhpcy5fc3RhcnRBbmdsZSwgdGhpcy5fZW5kQW5nbGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aWNrZXI6IExpbmVhclRpY2tzID0gTGluZWFyVGlja3MuY3JlYXRlKHNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHRpY2tlci5uaWNlU2NhbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZS5yYW5nZShbdGhpcy5fc3RhcnRBbmdsZSwgdGhpcy5fZW5kQW5nbGVdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZUxheW91dFNjYWxlcyhlbmNvZGluZzogRW5jb2RpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcmllczogU2VyaWVzID0gdGhpcy5fc2VyaWVzbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiBzZXJpZXMuc2NhbGVQYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVkOiBGaWVsZCA9IHBhaXIuZmlsZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzYWRkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHAgb2YgdGhpcy5fX3NjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXAuZmlsZWQuZXF1YWxzKGZpbGVkKSB8fCAhcC5zY2FsZS5lcXVhbChwYWlyLnNjYWxlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNhZGRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuc2VyaWVzLnB1c2goc2VyaWVzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc2FkZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMucHVzaCh7IHNlcmllczogW3Nlcmllcy5uYW1lXSwgZmlsZWQ6IGZpbGVkLCBzY2FsZTogcGFpci5zY2FsZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VyaWVzbGlzdC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuX19zY2FsZVBhaXJzID0gdGhpcy5fc2VyaWVzbGlzdFswXS5zY2FsZVBhaXJzO1xuICAgICAgICAgICAgICAgIGxldCBzZXJpZXM6IFNlcmllcyA9IHRoaXMuX3Nlcmllc2xpc3RbMF07XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fX3NjYWxlUGFpcnMucHVzaCh7c2VyaWVzOltzZXJpZXMubmFtZV0sIGZpbGVkOiBzZXJpZXMuZmlsZWQsIHNjYWxlOiBwYWlyLnNjYWxlIH0pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhaXIgb2Ygc2VyaWVzLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMucHVzaCh7IHNlcmllczogW3Nlcmllcy5uYW1lXSwgZmlsZWQ6IHBhaXIuZmlsZWQsIHNjYWxlOiBwYWlyLnNjYWxlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBtYXhTZXJpZXNTaXplKCk6IG51bWJlciB7XG4gICAgICAgICAgICBsZXQgeHNjYWxlID0gdGhpcy5fZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGlmICh4c2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geHNjYWxlLmRvbWFpbnMubGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbGl0eS5tYXgodGhpcy5fc2VyaWVzbGlzdC5tYXAoKHNlcjogU2VyaWVzLCBpbmRleDogbnVtYmVyLCBhcnJheTogU2VyaWVzW10pID0+IHsgcmV0dXJuIHNlci5zaXplOyB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9sYXlvdXRTZXJpZXMoc2VyaWVzOiBTZXJpZXMsIGluZGV4OiBudW1iZXIpOiB2b2lkO1xuXG4gICAgICAgIC8vIHByb3RlY3RlZCBfcHJlQW5hbHlzZVNlcmllcygpIHtcbiAgICAgICAgLy8gICAgIGZvciAobGV0IHNlciBvZiB0aGlzLl9zZXJpZXNsaXN0KSB7XG4gICAgICAgIC8vICAgICAgICAgZm9yIChsZXQgcHQgb2Ygc2VyLnBvaW50cykge1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgeHZhbHVlID0gcHQueDtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGluZGV4ID0gXy5maW5kSW5kZXgodGhpcy5fbG9jYXRpb25DYWNoZSwgJ2tleScsIHh2YWx1ZS52YWx1ZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sb2NhdGlvbkNhY2hlW2luZGV4XSAhPSBudWxsKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25DYWNoZVtpbmRleF0ucG9pbnRzLnB1c2gocHQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbkNhY2hlLnB1c2goeyBrZXk6IHh2YWx1ZS52YWx1ZSwgcG9pbnRzOiBbcHRdIH0pO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIGdldCBzY2FsZVBhaXJzKCk6IHsgc2VyaWVzOiBzdHJpbmdbXSwgZmlsZWQ6IEZpZWxkLCBzY2FsZTogU2NhbGUgfVtdIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2NhbGVQYWlycztcbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9nZXRTY2FsZShuYW1lOiBzdHJpbmcpOiBTY2FsZSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBfLmZpbmRJbmRleCh0aGlzLl9fc2NhbGVQYWlycywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5maWxlZC5uYW1lID09IG5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2NhbGVQYWlyc1tpbmRleF0uc2NhbGU7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFJhZGlhbEJhckxheW91dCBleHRlbmRzIFJhZGlhbENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgZ2V0IGJhcldpZHRoKCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9yYWRpdXMtdGhpcy5faW5uZXJSYWRpdXMpL3RoaXMubWF4U2VyaWVzU2l6ZS8odGhpcy5fc3RhY2s/MTp0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aCkgKjAuOTtcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6U2VyaWVzLGluZGV4Om51bWJlcik6dm9pZHtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5fc2VyaWVzbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgeFNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd5Jyk7XG4gICAgICAgICAgICBsZXQgY29sb3JTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgnY29sb3InKTtcbiAgICAgICAgICAgIGxldCBjb2xvckFycmF5OnN0cmluZ1tdPVtdO1xuICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZSA9IGNvbG9yU2NhbGUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBjb2xvckFycmF5ID0gQ29sb3JVdGlscy5ncmFkaWVudENvbG9yKGNvbG9yU2NhbGUuc3RhcnRQb3NpdGlvbixjb2xvclNjYWxlLmVuZFBvc2l0aW9uLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlLnJhbmdlKFswLCg8T3JkaW5hbFNjYWxlPmNvbG9yU2NhbGUpLmRvbWFpbnMubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkZWZhdWx0Y29sb3I6c3RyaW5nID1Db2xvclV0aWxzLmluZGV4Q29sb3Ioc2VyaWVzLmluZGV4KTtcbiAgICAgICAgICAgIGZvcihsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cyl7XG4gICAgICAgICAgICAgICAgaWYoIHB0ICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcnZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgOlZhbHVlPSBwdC5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4Om51bWJlciA9IHhTY2FsZS5nZXRTY2FsZVZhbHVlKHh2YWx1ZS52YWx1ZSkgKyh0aGlzLl9zdGFjayA/MDooKGluZGV4IC0gKHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoLTEpLzIpICogdGhpcy5iYXJXaWR0aCkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTAgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzBdOih5U2NhbGUubWluPDA/MDp5U2NhbGUubWluKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkxID0geXZhbHVlLmlzTXVsdGlwbGU/IHl2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5RW5kQW5nbGU6bnVtYmVyID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeTEpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgOnN0cmluZyA9IGRlZmF1bHRjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JpbmRleCA9IGNvbG9yU2NhbGUuZ2V0U2NhbGVWYWx1ZShjb2xvcnZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IGNvbG9yQXJyYXlbY29sb3JpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA9IENvbG9yVXRpbHMuZ2V0Q29sb3IoY29sb3JTY2FsZS5zdGFydFBvc2l0aW9uLGNvbG9yU2NhbGUuZW5kUG9zaXRpb24sY29sb3J2YWx1ZS52YWx1ZSxjb2xvclNjYWxlLm1pbixjb2xvclNjYWxlLm1heCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHlTdGFydEFuZ2xlIDpudW1iZXIgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZSh5MCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4SW5uZXJSYWRpdXMgOm51bWJlciA9IHgtICB0aGlzLmJhcldpZHRoLzI7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4T3V0dGVyUmFkaXVzIDpudW1iZXIgPSB4ICt0aGlzLmJhcldpZHRoLzI7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBiYXJTaGFwZTpCYXJTaGFwZSA9IG5ldyBCYXJTaGFwZSh4bGVmdCx5RW5kQW5nbGUseHJpZ2h0LXhsZWZ0LHlib3R0b20teUVuZEFuZ2xlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhclNoYXBlIDpSYWRpYWxCYXJTaGFwZSA9IG5ldyBSYWRpYWxCYXJTaGFwZSh0aGlzLl9jeCx0aGlzLl9jeSx4SW5uZXJSYWRpdXMseE91dHRlclJhZGl1cyx5U3RhcnRBbmdsZSx5RW5kQW5nbGUteVN0YXJ0QW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICBiYXJTaGFwZS5zdHlsZSA9IG5ldyBTdHlsZShcImdyYXlcIixEZWZhdWx0LmZvbnQsRGVmYXVsdC5zdHJva2VzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbG9yICE9IG51bGwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFyU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhclNoYXBlLnN0eWxlLmJhY2tncm91bmQgPSBkZWZhdWx0Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKGJhclNoYXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFJhZGlhbExpbmVMYXlvdXQgZXh0ZW5kcyBSYWRpYWxDYXJ0ZXNpYW5MYXlvdXR7XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0U2VyaWVzKHNlcmllczpTZXJpZXMsaW5kZXg6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCB4U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGxldCB5U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3knKTtcbiAgICAgICAgICAgIGxldCBjb2xvclNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdjb2xvcicpO1xuICAgICAgICAgICAgbGV0IHhzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IHlzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgZm9yKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKXtcbiAgICAgICAgICAgICAgICBpZiggcHQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHB0KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHh2YWx1ZSA6VmFsdWU9IHB0Lng7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5dmFsdWUgOlZhbHVlPSBwdC55O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3J2YWx1ZSA6VmFsdWUgPSBwdC5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNoYXBlOlZhbHVlID0gcHQuc2hhcGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplIDpWYWx1ZT0gcHQuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOm51bWJlciA9IHhTY2FsZS5nZXRTY2FsZVZhbHVlKHh2YWx1ZS52YWx1ZSkgO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZSA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHl2YWx1ZS5pc011bHRpcGxlPyB5dmFsdWUudmFsdWVbMV06eXZhbHVlLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMuX2N4ICsgTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMuX2N5ICsgTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICB4cy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICB5cy5wdXNoKHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsaW5lc1NoYXBlOkxpbmVzU2hhcGUgPSBuZXcgTGluZXNTaGFwZSh4cyx5cyxudWxsLERlZmF1bHQuc3Ryb2tlc3R5bGUpO1xuICAgICAgICAgICAgbGluZXNTaGFwZS5zdHJva2VTdHlsZS5zdHJva2VDb2xvciA9IENvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKGxpbmVzU2hhcGUpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRMaW5lKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFJhZGlhbEFyZWFMYXlvdXQgZXh0ZW5kcyBSYWRpYWxDYXJ0ZXNpYW5MYXlvdXQge1xuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dFNlcmllcyhzZXJpZXM6IFNlcmllcywgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCB4U2NhbGU6IFNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCd4Jyk7XG4gICAgICAgICAgICBsZXQgeVNjYWxlOiBTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneScpO1xuICAgICAgICAgICAgbGV0IGNvbG9yU2NhbGU6IFNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdjb2xvcicpO1xuICAgICAgICAgICAgbGV0IHhzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgbGV0IHlzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgcHQgb2Ygc2VyaWVzLnBvaW50cykge1xuICAgICAgICAgICAgICAgIGlmIChwdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHB0KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHh2YWx1ZTogVmFsdWUgPSBwdC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeXZhbHVlOiBWYWx1ZSA9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcnZhbHVlOiBWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGU6IFZhbHVlID0gcHQuc2hhcGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOiBWYWx1ZSA9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGl1czogbnVtYmVyID0geFNjYWxlLmdldFNjYWxlVmFsdWUoeHZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZ2xlVmFsdWUwID0geXZhbHVlLmlzTXVsdGlwbGUgPyB5dmFsdWUudmFsdWVbMF0gOiAoeVNjYWxlLm1pbiA8IDAgPyAwIDogeVNjYWxlLm1pbik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmdsZVZhbHVlMSA9IHl2YWx1ZS5pc011bHRpcGxlID8geXZhbHVlLnZhbHVlWzFdIDogeXZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGUwID0geVNjYWxlLmdldFNjYWxlVmFsdWUoYW5nbGVWYWx1ZTApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW5nbGUxID0geVNjYWxlLmdldFNjYWxlVmFsdWUoYW5nbGVWYWx1ZTEpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBjb2xvclNjYWxlLmdldFNjYWxlVmFsdWUoY29sb3J2YWx1ZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHgwID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhhbmdsZTApICogcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTAgPSB0aGlzLl9jeSArIE1hdGguc2luKGFuZ2xlMCkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhhbmdsZTEpICogcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMuX2N5ICsgTWF0aC5zaW4oYW5nbGUxKSAqIHJhZGl1cztcblxuICAgICAgICAgICAgICAgICAgICB4cy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICB5cy5wdXNoKHkpO1xuICAgICAgICAgICAgICAgICAgICB4cy51bnNoaWZ0KHgwKTtcbiAgICAgICAgICAgICAgICAgICAgeXMudW5zaGlmdCh5MCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxpbmVzU2hhcGU6IEFyZWFTaGFwZSA9IG5ldyBBcmVhU2hhcGUoeHMsIHlzLCBudWxsLCBEZWZhdWx0LnN0cm9rZXN0eWxlKTtcbiAgICAgICAgICAgIGxpbmVzU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IENvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKGxpbmVzU2hhcGUpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRMaW5lKCkge1xuXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFJhZGlhbFNjYXR0ZXJMYXlvdXQgZXh0ZW5kcyBSYWRpYWxDYXJ0ZXNpYW5MYXlvdXR7XG4gICAgICAgIGdldCBiYXJXaWR0aCgpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fcmFkaXVzLXRoaXMuX2lubmVyUmFkaXVzKS90aGlzLm1heFNlcmllc1NpemUvKHRoaXMuX3N0YWNrPzE6dGhpcy5fc2VyaWVzbGlzdC5sZW5ndGgpICowLjk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRTZXJpZXMoc2VyaWVzOlNlcmllcyxpbmRleDpudW1iZXIpOnZvaWR7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgbGV0IHlTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneScpO1xuICAgICAgICAgICAgbGV0IGNvbG9yU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgc2l6ZVNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdzaXplJyk7XG4gICAgICAgICAgICBsZXQgZGVmYXVsdGNvbG9yOnN0cmluZyA9Q29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICBsZXQgY29sb3JBcnJheTpzdHJpbmdbXT1bXTtcbiAgICAgICAgICAgIGlmKGNvbG9yU2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpe1xuICAgICAgICAgICAgICAgIGNvbG9yU2NhbGUgPSBjb2xvclNjYWxlLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgY29sb3JBcnJheSA9IENvbG9yVXRpbHMuZ3JhZGllbnRDb2xvcihjb2xvclNjYWxlLnN0YXJ0UG9zaXRpb24sY29sb3JTY2FsZS5lbmRQb3NpdGlvbiwoPE9yZGluYWxTY2FsZT5jb2xvclNjYWxlKS5kb21haW5zLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZS5yYW5nZShbMCwoPE9yZGluYWxTY2FsZT5jb2xvclNjYWxlKS5kb21haW5zLmxlbmd0aC0xXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZGVmYXVsdHNpemU6bnVtYmVyID0gMTA7XG4gICAgICAgICAgICBmb3IobGV0IHB0IG9mIHNlcmllcy5wb2ludHMpe1xuICAgICAgICAgICAgICAgIGlmKCBwdCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHh2YWx1ZSA6VmFsdWU9IHB0Lng7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5dmFsdWUgOlZhbHVlPSBwdC55O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3JWYWx1ZSA6VmFsdWUgPSBwdC5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNoYXBlVmFsdWU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemVWYWx1ZSA6VmFsdWU9IHB0LnNpemU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGl1czpudW1iZXIgPSB4U2NhbGUuZ2V0U2NhbGVWYWx1ZSh4dmFsdWUudmFsdWUpIDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuZ2xlOm51bWJlciA9IHlTY2FsZS5nZXRTY2FsZVZhbHVlKHl2YWx1ZS5pc011bHRpcGxlP3l2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcyA6bnVtYmVyID0gc2l6ZVNjYWxlLmdldFNjYWxlVmFsdWUoc2l6ZVZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNOYU4ocykgfHwgcyA9PSBudWxsIHx8IHMgPD0wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBkZWZhdWx0c2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJhZGl1cyBcIiArIHJhZGl1cyArXCIgYW5nbGUgXCIgKyBhbmdsZSApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gZGVmYXVsdGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBpZihjb2xvclNjYWxlIGluc3RhbmNlb2YgT3JkaW5hbFNjYWxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcmluZGV4ID0gY29sb3JTY2FsZS5nZXRTY2FsZVZhbHVlKGNvbG9yVmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gY29sb3JBcnJheVtjb2xvcmluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY29sb3JTY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yID0gQ29sb3JVdGlscy5nZXRDb2xvcihjb2xvclNjYWxlLnN0YXJ0UG9zaXRpb24sY29sb3JTY2FsZS5lbmRQb3NpdGlvbixjb2xvclZhbHVlLnZhbHVlLGNvbG9yU2NhbGUubWluLGNvbG9yU2NhbGUubWF4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMuX2N4ICsgTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMuX2N5ICsgTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhdHRlclNoYXBlIDpTY2F0dGVyU2hhcGUgPSBuZXcgU2NhdHRlclNoYXBlKHgtcy8yLHktcy8yLHMscyxEZWZhdWx0LnN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sb3IgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyU2hhcGUuc3R5bGUuYmFja2dyb3VuZCA9IGRlZmF1bHRjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2goc2NhdHRlclNoYXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRMaW5lKCl7XG4gICAgICAgIH0gICAgICAgICAgICBcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG5cbiAgICAndXNlIHN0cmljdCc7XG4gICAgaW1wb3J0IFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHlsZTtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIExpbmVMYXlvdXQgZXh0ZW5kcyBDYXJ0ZXNpYW5MYXlvdXR7XG4gICAgICAgIHByb3RlY3RlZCBfbGF5b3V0U2VyaWVzKHNlcmllczpTZXJpZXMsaW5kZXg6bnVtYmVyKTp2b2lke1xuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLl9zZXJpZXNsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGxldCB4U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3gnKTtcbiAgICAgICAgICAgIGxldCB5U2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ3knKTtcbiAgICAgICAgICAgIC8vIGxldCBjb2xvclNjYWxlOlNjYWxlID0gc2VyaWVzLmdldFNjYWxlKCdjb2xvcicpO1xuICAgICAgICAgICAgbGV0IHhzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IHlzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IGRlZmF1bHRjb2xvcjpzdHJpbmcgPUNvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgZm9yKGxldCBwdCBvZiBzZXJpZXMucG9pbnRzKXtcbiAgICAgICAgICAgICAgICBpZiggcHQgIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHB0KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHh2YWx1ZSA6VmFsdWU9IHB0Lng7XG4gICAgICAgICAgICAgICAgICAgIGxldCB5dmFsdWUgOlZhbHVlPSBwdC55O1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sb3J2YWx1ZSA6VmFsdWUgPSBwdC5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNoYXBlOlZhbHVlID0gcHQuc2hhcGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplIDpWYWx1ZT0gcHQuc2l6ZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeDpudW1iZXIgPSB4U2NhbGUuZ2V0U2NhbGVWYWx1ZSh4dmFsdWUudmFsdWUpIDtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IHl2YWx1ZS5pc011bHRpcGxlPyB5dmFsdWUudmFsdWVbMV06eXZhbHVlLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHkgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZSh5KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGNvbG9yID0gY29sb3JTY2FsZS5nZXRTY2FsZVZhbHVlKGNvbG9ydmFsdWUudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB4cy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICB5cy5wdXNoKHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsaW5lc1NoYXBlOkxpbmVzU2hhcGUgPSBuZXcgTGluZXNTaGFwZSh4cyx5cyxudWxsLERlZmF1bHQuc3Ryb2tlc3R5bGUpO1xuICAgICAgICAgICAgbGluZXNTaGFwZS5zdHJva2VTdHlsZS5zdHJva2VDb2xvciA9IENvbG9yVXRpbHMuaW5kZXhDb2xvcihzZXJpZXMuaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5fX3NoYXBlbGlzdC5wdXNoKGxpbmVzU2hhcGUpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRMaW5lKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcblxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgU3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlN0eWxlO1xuICAgIGltcG9ydCBEZWZhdWx0ID0gYW5kcm9pZC5kZXZpY2UuRGVmYXVsdDtcbiAgICBleHBvcnQgY2xhc3MgQXJlYUxheW91dCBleHRlbmRzIENhcnRlc2lhbkxheW91dHtcbiAgICAgICAgcHJvdGVjdGVkIF9sYXlvdXRTZXJpZXMoc2VyaWVzOlNlcmllcyxpbmRleDpudW1iZXIpOnZvaWR7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX3Nlcmllc2xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IHhTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneCcpO1xuICAgICAgICAgICAgbGV0IHlTY2FsZTpTY2FsZSA9IHNlcmllcy5nZXRTY2FsZSgneScpO1xuICAgICAgICAgICAgbGV0IGNvbG9yU2NhbGU6U2NhbGUgPSBzZXJpZXMuZ2V0U2NhbGUoJ2NvbG9yJyk7XG4gICAgICAgICAgICBsZXQgeHM6bnVtYmVyW109W107XG4gICAgICAgICAgICBsZXQgeXM6bnVtYmVyW109W107XG4gICAgICAgICAgICBmb3IobGV0IHB0IG9mIHNlcmllcy5wb2ludHMpe1xuICAgICAgICAgICAgICAgIGlmKCBwdCAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeHZhbHVlIDpWYWx1ZT0gcHQueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHl2YWx1ZSA6VmFsdWU9IHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xvcnZhbHVlIDpWYWx1ZSA9IHB0LmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hhcGU6VmFsdWUgPSBwdC5zaGFwZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgOlZhbHVlPSBwdC5zaXplO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB4Om51bWJlciA9IHhTY2FsZS5nZXRTY2FsZVZhbHVlKHh2YWx1ZS52YWx1ZSkgO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeTAgPSB5dmFsdWUuaXNNdWx0aXBsZT8geXZhbHVlLnZhbHVlWzBdOih5U2NhbGUubWluPDA/MDp5U2NhbGUubWluKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkxID0geXZhbHVlLmlzTXVsdGlwbGU/IHl2YWx1ZS52YWx1ZVsxXTp5dmFsdWUudmFsdWU7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgeTAgPSB5U2NhbGUuZ2V0U2NhbGVWYWx1ZSh5MCk7XG4gICAgICAgICAgICAgICAgICAgIHkxID0geVNjYWxlLmdldFNjYWxlVmFsdWUoeTEpO1xuICAgICAgICAgICAgICAgICAgICB4cy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICB5cy5wdXNoKHkwKTtcbiAgICAgICAgICAgICAgICAgICAgeHMudW5zaGlmdCh4KTtcbiAgICAgICAgICAgICAgICAgICAgeXMudW5zaGlmdCh5MSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxpbmVzU2hhcGU6QXJlYVNoYXBlID0gbmV3IEFyZWFTaGFwZSh4cyx5cyxudWxsLERlZmF1bHQuc3Ryb2tlc3R5bGUpO1xuICAgICAgICAgICAgbGluZXNTaGFwZS5zdHlsZS5iYWNrZ3JvdW5kID0gQ29sb3JVdGlscy5pbmRleENvbG9yKHNlcmllcy5pbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9fc2hhcGVsaXN0LnB1c2gobGluZXNTaGFwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUoKXtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgY29uc3QgZTEwOiBudW1iZXIgPSBNYXRoLnNxcnQoNTApO1xuICAgIGNvbnN0IGU1OiBudW1iZXIgPSBNYXRoLnNxcnQoMTApO1xuICAgIGNvbnN0IGUyOiBudW1iZXIgPSBNYXRoLnNxcnQoMik7XG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRpY2tzIHtcbiAgICAgICAgcHJvdGVjdGVkIF9zY2FsZTogU2NhbGU7XG4gICAgICAgIHByb3RlY3RlZCBfdGlja3M6IGFueVtdO1xuICAgICAgICBjb25zdHJ1Y3RvcihzY2FsZTogU2NhbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XG5cbiAgICAgICAgICAgIHRoaXMuX3RpY2tzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY3JlYXRlKHNjYWxlOiBTY2FsZSwgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBUaWNrcyB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IGNyZWF0ZVRpY2tzKGNvdW50PzpudW1iZXIpOiB2b2lkO1xuXG4gICAgICAgIHByb3RlY3RlZCBfY3JlYXRlVGlja3Moc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjb3VudDogbnVtYmVyKSB7XG5cbiAgICAgICAgICAgIHZhciByZXZlcnNlID0gc3RvcCA8IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGkgPSAtMSxcbiAgICAgICAgICAgICAgICBuLFxuICAgICAgICAgICAgICAgIHRpY2tzLFxuICAgICAgICAgICAgICAgIHN0ZXA7XG5cbiAgICAgICAgICAgIGlmIChyZXZlcnNlKSBuID0gc3RhcnQsIHN0YXJ0ID0gc3RvcCwgc3RvcCA9IG47XG5cbiAgICAgICAgICAgIGlmICgoc3RlcCA9IHRoaXMuX3RpY2tJbmNyZW1lbnQoc3RhcnQsIHN0b3AsIGNvdW50KSkgPT09IDAgfHwgIWlzRmluaXRlKHN0ZXApKSByZXR1cm4gW107XG5cbiAgICAgICAgICAgIGlmIChzdGVwID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5jZWlsKHN0YXJ0IC8gc3RlcCk7XG4gICAgICAgICAgICAgICAgc3RvcCA9IE1hdGguZmxvb3Ioc3RvcCAvIHN0ZXApO1xuICAgICAgICAgICAgICAgIHRpY2tzID0gbmV3IEFycmF5KG4gPSBNYXRoLmNlaWwoc3RvcCAtIHN0YXJ0ICsgMSkpO1xuICAgICAgICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB0aWNrc1tpXSA9IChzdGFydCArIGkpICogc3RlcDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBNYXRoLmZsb29yKHN0YXJ0ICogc3RlcCk7XG4gICAgICAgICAgICAgICAgc3RvcCA9IE1hdGguY2VpbChzdG9wICogc3RlcCk7XG4gICAgICAgICAgICAgICAgdGlja3MgPSBuZXcgQXJyYXkobiA9IE1hdGguY2VpbChzdGFydCAtIHN0b3AgKyAxKSk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsraSA8IG4pIHRpY2tzW2ldID0gKHN0YXJ0IC0gaSkgLyBzdGVwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmV2ZXJzZSkgdGlja3MucmV2ZXJzZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGlja3M7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgX3RpY2tJbmNyZW1lbnQoc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjb3VudDogbnVtYmVyKSB7XG4gICAgICAgICAgICBsZXQgc3RlcDogbnVtYmVyID0gKHN0b3AgLSBzdGFydCkgLyBNYXRoLm1heCgwLCBjb3VudCksXG4gICAgICAgICAgICAgICAgcG93ZXI6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5sb2coc3RlcCkgLyBNYXRoLkxOMTApLFxuICAgICAgICAgICAgICAgIGVycm9yOiBudW1iZXIgPSBzdGVwIC8gTWF0aC5wb3coMTAsIHBvd2VyKTtcbiAgICAgICAgICAgIHJldHVybiBwb3dlciA+PSAwXG4gICAgICAgICAgICAgICAgPyAoZXJyb3IgPj0gZTEwID8gMTAgOiBlcnJvciA+PSBlNSA/IDUgOiBlcnJvciA+PSBlMiA/IDIgOiAxKSAqIE1hdGgucG93KDEwLCBwb3dlcilcbiAgICAgICAgICAgICAgICA6IC1NYXRoLnBvdygxMCwgLXBvd2VyKSAvIChlcnJvciA+PSBlMTAgPyAxMCA6IGVycm9yID49IGU1ID8gNSA6IGVycm9yID49IGUyID8gMiA6IDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljICBfdGlja1N0ZXAoc3RhcnQ6IG51bWJlciwgc3RvcDogbnVtYmVyLCBjb3VudDogbnVtYmVyKSB7XG4gICAgICAgICAgICBsZXQgc3RlcDA6IG51bWJlciA9IE1hdGguYWJzKHN0b3AgLSBzdGFydCkgLyBNYXRoLm1heCgwLCBjb3VudCksXG4gICAgICAgICAgICAgICAgc3RlcDE6IG51bWJlciA9IE1hdGgucG93KDEwLCBNYXRoLmZsb29yKE1hdGgubG9nKHN0ZXAwKSAvIE1hdGguTE4xMCkpLFxuICAgICAgICAgICAgICAgIGVycm9yOiBudW1iZXIgPSBzdGVwMCAvIHN0ZXAxO1xuICAgICAgICAgICAgaWYgKGVycm9yID49IGUxMCkgc3RlcDEgKj0gMTA7XG4gICAgICAgICAgICBlbHNlIGlmIChlcnJvciA+PSBlNSkgc3RlcDEgKj0gNTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGVycm9yID49IGUyKSBzdGVwMSAqPSAyO1xuICAgICAgICAgICAgcmV0dXJuIHN0b3AgPCBzdGFydCA/IC1zdGVwMSA6IHN0ZXAxO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgY2xhc3MgTGluZWFyVGlja3MgZXh0ZW5kcyBUaWNrcyB7XG4gICAgICAgIHN0YXRpYyBjcmVhdGUoc2NhbGU6IFNjYWxlKSB7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoc2NhbGUgaW5zdGFuY2VvZiBMaW5lYXJTY2FsZSwgXCIgc2NhbGUgbXVzdCBiZSBMaW5lYXJTY2FsZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGluZWFyVGlja3Moc2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZVRpY2tzKGNvdW50PzogbnVtYmVyKSB7XG4gICAgICAgICAgICAvLyBsZXQgc3RlcDpudW1iZXIsIHN0YXJ0Om51bWJlcixzdG9wOm51bWJlcjtcbiAgICAgICAgICAgIC8vIHN0ZXAgPSB0aGlzLl90aWNrSW5jcmVtZW50KHRoaXMuX3N0YXJ0LCB0aGlzLl9lbmQsIGNvdW50KTtcbiAgICAgICAgICAgIC8vIGlmIChzdGVwID4gMCkge1xuICAgICAgICAgICAgLy8gICAgIHN0YXJ0ID0gTWF0aC5mbG9vcih0aGlzLl9zdGFydC9zdGVwKSAqIHN0ZXA7XG4gICAgICAgICAgICAvLyAgICAgc3RvcCA9IE1hdGguZmxvb3IodGhpcy5fZW5kL3N0ZXApICogc3RlcDtcbiAgICAgICAgICAgIC8vICAgICBzdGVwID0gdGhpcy5fdGlja0luY3JlbWVudChzdGFydCxzdG9wLGNvdW50KTtcbiAgICAgICAgICAgIC8vIH1lbHNlIGlmKHN0ZXAgPCAwKXtcbiAgICAgICAgICAgIC8vICAgICBzdGFydCA9IE1hdGguY2VpbChzdGFydCAqIHN0ZXApIC8gc3RlcDtcbiAgICAgICAgICAgIC8vICAgICBzdG9wID0gTWF0aC5mbG9vcihzdG9wICogc3RlcCkgLyBzdGVwO1xuICAgICAgICAgICAgLy8gICAgIHN0ZXAgPSB0aGlzLl90aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBpZihjb3VudCA9PSBudWxsIHx8IGlzTmFOKGNvdW50KSl7XG4gICAgICAgICAgICAgICAgY291bnQgPSAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RpY2tzID0gdGhpcy5fY3JlYXRlVGlja3ModGhpcy5fc2NhbGUubWF4LHRoaXMuX3NjYWxlLm1pbixjb3VudCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGlja3M7XG4gICAgICAgIH1cbiAgICAgICAgbmljZVNjYWxlKCk6TGluZWFyU2NhbGV7XG4gICAgICAgICAgICBsZXQgc2NhbGUgPSA8TGluZWFyU2NhbGU+dGhpcy5fc2NhbGU7XG4gICAgICAgICAgICBsZXQgc3RlcCA6bnVtYmVyPSB0aGlzLl90aWNrU3RlcChzY2FsZS5taW4sc2NhbGUubWF4LDEwKTtcbiAgICAgICAgICAgIGxldCBuaWNlTWluIDpudW1iZXIgPSBzY2FsZS5taW49PT0wPzA6KE1hdGguZmxvb3Ioc2NhbGUubWluL3N0ZXApKSpzdGVwO1xuICAgICAgICAgICAgbGV0IG5pY2VNYXggOm51bWJlciA9IChNYXRoLmZsb29yKHNjYWxlLm1heC9zdGVwKSsxKSpzdGVwO1xuICAgICAgICAgICAgc2NhbGUuZG9tYWluKFtuaWNlTWluLG5pY2VNYXhdKS5yZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4gc2NhbGU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBleHBvcnQgY2xhc3MgTG9nVGlja3MgZXh0ZW5kcyBUaWNrcyB7XG4gICAgICAgIHN0YXRpYyBjcmVhdGUoc2NhbGU6IFNjYWxlKSB7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoc2NhbGUgaW5zdGFuY2VvZiBMb2dTY2FsZSwgXCIgc2NhbGUgbXVzdCBiZSBMaW5lYXJTY2FsZVwiKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTG9nVGlja3Moc2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZVRpY2tzKGNvdW50PzogbnVtYmVyKSB7XG5cbiAgICAgICAgICAgIGlmKGNvdW50ID09IG51bGwgfHwgaXNOYU4oY291bnQpKXtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGlja3MgPSB0aGlzLl9jcmVhdGVUaWNrcyh0aGlzLl9zY2FsZS5tYXgsdGhpcy5fc2NhbGUubWluLGNvdW50KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aWNrcztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9iYXNlLmQudHNcIiAvPlxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGV4cG9ydCBjbGFzcyBPcmRpbmFsVGlja3MgZXh0ZW5kcyBUaWNrcyB7XG4gICAgICAgIHN0YXRpYyBjcmVhdGUoc2NhbGU6IFNjYWxlKSB7XG4gICAgICAgICAgICBEZWJ1Zy5hc3NlcnQoc2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUsIFwiIHNjYWxlIG11c3QgYmUgT3JkaW5hbFNjYWxlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcmRpbmFsVGlja3Moc2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZVRpY2tzKGNvdW50PzogbnVtYmVyKSB7XG5cbiAgICAgICAgICAgIGlmKGNvdW50ID09IG51bGwgfHwgaXNOYU4oY291bnQpKXtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhpcy5fdGlja3MgPSB0aGlzLl9jcmVhdGVUaWNrcyh0aGlzLl9zY2FsZS5tYXgsdGhpcy5fc2NhbGUubWluLGNvdW50KTtcbiAgICAgICAgICAgIHRoaXMuX3RpY2tzID0gKDxPcmRpbmFsU2NhbGU+dGhpcy5fc2NhbGUpLmRvbWFpbnM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGlja3M7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgaW1wb3J0IFZpZXcgPSBhbmRyb2lkLnZpZXcuVmlldztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFZpZXdTdGF0ZSA9IGFuZHJvaWQudmlldy5WaWV3U3RhdGU7XG4gICAgaW1wb3J0IFN0cm9rZVN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgRm9udCA9IGFuZHJvaWQuZ3JhcGhpY3MuRm9udDtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBleHBvcnQgY2xhc3MgQXhpc1NoYXBlIGV4dGVuZHMgU2hhcGUge1xuXG4gICAgICAgIHB1YmxpYyBfbGFiZWw6IHN0cmluZztcbiAgICAgICAgcHVibGljIF9tYWpvcjogU3Ryb2tlU3R5bGU7XG4gICAgICAgIHB1YmxpYyBfbWlub3I6IFN0cm9rZVN0eWxlO1xuICAgICAgICBwdWJsaWMgX2xhYmxlUmVjdDogUm90YXRlUmVjdDtcbiAgICAgICAgcHVibGljIF9sYWJsZUZvbnQ6IEZvbnQ7XG4gICAgICAgIHB1YmxpYyBfbWFqb3JUaWNrOiBSb3RhdGVMaW5lO1xuICAgICAgICBwdWJsaWMgX21pbm9yVGljazogUm90YXRlTGluZTtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9tYWpvciA9IERlZmF1bHQuc3Ryb2tlc3R5bGUuY2xvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuX21pbm9yID0gRGVmYXVsdC5zdHJva2VzdHlsZS5jbG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5fbGFibGVGb250ID0gRGVmYXVsdC5mb250LmNsb25lKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgY2FudmFzLnNhdmUoKTtcbiAgICAgICAgICAgIC8vIGNhbnZhcy5jbGlwKHJlY3QpO1xuICAgICAgICAgICAgbGV0IHhzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IHlzOm51bWJlcltdPVtdO1xuICAgICAgICAgICAgbGV0IHB0czpQb2ludFtdID0gdGhpcy5fbGFibGVSZWN0LnBvaW50cztcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgKytqKSB7XG4gICAgICAgICAgICAgICAgeHMucHVzaChwdHNbal0ueCk7XG4gICAgICAgICAgICAgICAgeXMucHVzaChwdHNbal0ueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjYW52YXMuZHJhd1BvbHlnb24oeHMseXMsXCJibHVlXCIpO1xuICAgICAgICAgICAgLy8gdGhpcy5fbGFibGVGb250LmZvbnRDb2xvciA9J3JlZCc7XG4gICAgICAgICAgICBjYW52YXMuZHJhd0xpbmUodGhpcy5fbWFqb3JUaWNrLnN0YXJ0UG9pbnQsIHRoaXMuX21ham9yVGljay5lbmRQb2ludCwgdGhpcy5fbWFqb3IpO1xuICAgICAgICAgICAgY2FudmFzLmRyYXdUZXh0KHRoaXMuX2xhYmVsLCB0aGlzLl9sYWJsZVJlY3QubGVmdFRvcCx0aGlzLl9sYWJsZUZvbnQsdGhpcy5fbGFibGVSZWN0LmxlZnRUb3AsdGhpcy5fbGFibGVSZWN0LmFuZ2xlICogMTgwIC9NYXRoLlBJKTtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZSh0aGlzLl9taW5vclRpY2suc3RhcnRQb2ludCwgdGhpcy5fbWlub3JUaWNrLmVuZFBvaW50LCB0aGlzLl9taW5vcik7XG5cbiAgICAgICAgICAgIGNhbnZhcy5yZXN0b3JlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZWZyZXNoKCk6IHZvaWQge1xuXG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxuY29uc3QgTEFCRUxfUEFERElORyA6bnVtYmVyID0gNDtcbmNvbnN0IE1BSk9SX1RJQ0tfSEVJR0hUOm51bWJlciA9IDY7XG5jb25zdCBNSU5PUl9USUNLX0hFSUdIVDpudW1iZXIgPSA0O1xubmFtZXNwYWNlIGFuZHJvaWQudGVzdHtcbiAgICAndXNlIHN0cmljdCc7ICAgICAgICBcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIGltcG9ydCBNZWFzdXJlU3BlYyA9IGFuZHJvaWQudmlldy5NZWFzdXJlU3BlYztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuICAgIGltcG9ydCBGb250ID0gYW5kcm9pZC5ncmFwaGljcy5Gb250O1xuXG4gICAgaW1wb3J0IERlZmF1bHQgPSBhbmRyb2lkLmRldmljZS5EZWZhdWx0O1xuICAgIGltcG9ydCBTdHJva2VTdHlsZT0gYW5kcm9pZC5ncmFwaGljcy5TdHJva2VTdHlsZTtcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlQXhpcyBleHRlbmRzIFZpZXd7XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIF9zY2FsZTpTY2FsZTtcbiAgICAgICAgcHJpdmF0ZSBfbWF4Om51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfbWluOm51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBfcmV2ZXJzZWQ6Ym9vbGVhbjtcbiAgICAgICAgcHJpdmF0ZSBfc2VyaWVzOnN0cmluZ1tdO1xuICAgICAgICBwcm90ZWN0ZWQgX2NoaWxkcmVuOlNoYXBlW107XG4gICAgICAgIHByb3RlY3RlZCBfbWFqb3JUaWNrSGVpZ2h0Om51bWJlcjtcbiAgICAgICAgcHJvdGVjdGVkIF9taW5vclRpY2tIZWlnaHQ6bnVtYmVyXG4gICAgICAgIHByb3RlY3RlZCBfYXhpc1R5cGU6QXhpc1R5cGU7XG4gICAgICAgIHByb3RlY3RlZCBfdGlja3M6YW55W107XG4gICAgXG4gICAgICAgIHByb3RlY3RlZCBfdGl0bGU6c3RyaW5nO1xuICAgICAgICBwcm90ZWN0ZWQgX3RpdGxlRm9udDpGb250O1xuICAgICAgICBwcm90ZWN0ZWQgX2xhYmVsRm9udDpGb250O1xuICAgICAgICBwcm90ZWN0ZWQgX21ham9yU3R5bGU6U3Ryb2tlU3R5bGU7XG4gICAgICAgIHByb3RlY3RlZCBfbWlub3JTdHlsZTpTdHJva2VTdHlsZTtcbiAgICAgICAgcHJvdGVjdGVkIF9saW5lU3R5bGU6U3Ryb2tlU3R5bGU7XG4gICAgICAgIHByb3RlY3RlZCBfbmVhcjpib29sZWFuO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OkNvbnRleHQpe1xuICAgICAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLl9tYWpvclRpY2tIZWlnaHQgPSBNQUpPUl9USUNLX0hFSUdIVDtcbiAgICAgICAgICAgIHRoaXMuX21pbm9yVGlja0hlaWdodCA9IE1JTk9SX1RJQ0tfSEVJR0hUO1xuICAgICAgICAgICAgdGhpcy5fdGlja3MgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlRm9udCA9IERlZmF1bHQuZm9udDtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsRm9udCA9IERlZmF1bHQuZm9udDtcbiAgICAgICAgICAgIHRoaXMuX21ham9yU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICAgICAgdGhpcy5fbWlub3JTdHlsZSA9IERlZmF1bHQuc3Ryb2tlc3R5bGU7XG4gICAgICAgICAgICB0aGlzLl9uZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsRm9udC5mb250Q29sb3IgPSBcIiMyNjI2MjZcIjtcbiAgICAgICAgICAgIHRoaXMuX3Nlcmllcz1bXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9jcmVhdGVUaWNrcygpIDphbnlbXTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgIHB1YmxpYyBzZXQgdGl0bGUodmFsdWU6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCB0aXRsZSgpOnN0cmluZ3tcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aXRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXQgbWFqb3JTdHlsZSh2YWx1ZTpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICB0aGlzLl9tYWpvclN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBtYWpvclN0eWxlKCk6U3Ryb2tlU3R5bGV7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFqb3JTdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXQgbWlub3JTdHlsZSh2YWx1ZTpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICB0aGlzLl9taW5vclN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBtaW5vclN0eWxlKCk6U3Ryb2tlU3R5bGV7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWlub3JTdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2V0IGxpbmVTdHlsZSh2YWx1ZTpTdHJva2VTdHlsZSl7XG4gICAgICAgICAgICB0aGlzLl9saW5lU3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IGxpbmVTdHlsZSgpOlN0cm9rZVN0eWxle1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVTdHlsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXQgdGl0bGVGb250KHZhbHVlIDpGb250KXtcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlRm9udCA9IHZhbHVlLmNsb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBnZXQgdGl0bGVGb250KCk6Rm9udHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aXRsZUZvbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0IGxhYmVsRm9udCh2YWx1ZSA6Rm9udCl7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbEZvbnQgPSB2YWx1ZS5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgZ2V0IGxhYmVsRm9udCgpOkZvbnR7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWxGb250O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgc2V0IG1heCh2YWx1ZTpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fbWF4ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNldCBtaW4odmFsdWU6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX21pbiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyBnZXQgbWF4KCk6bnVtYmVye1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IG1pbigpOm51bWJlcntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9taW47XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCBzZXJpZXMoKTpzdHJpbmdbXXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpZXM7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNldCBzZXJpZXMoczpzdHJpbmdbXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VyaWVzID1zO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldCBzY2FsZSh2YWx1ZTpTY2FsZSl7XG4gICAgICAgICAgICBpZih2YWx1ZSAhPSBudWxsICYmICF2YWx1ZS5lcXVhbCh0aGlzLl9zY2FsZSkpe1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjYWxlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZXQgc2NhbGUgXCIrIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90aWNrcyA9IHRoaXMuX2NyZWF0ZVRpY2tzKCk7XG4gICAgICAgICAgICB9ZWxzZSBpZih2YWx1ZSA9PSBudWxsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2FsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGlja3MgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IHNjYWxlKCk6U2NhbGV7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIHNldCByZXZlcnNlZCh2YWx1ZTpib29sZWFuKXtcbiAgICAgICAgICAgIHRoaXMuX3JldmVyc2VkID12YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgZ2V0IHJldmVyc2VkKCk6Ym9vbGVhbntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXZlcnNlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTpBeGlzVHlwZSl7XG4gICAgICAgICAgICB0aGlzLl9heGlzVHlwZSA9dmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGdldCB0eXBlKCk6QXhpc1R5cGV7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXhpc1R5cGU7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgcHVibGljIHNldCBuZWFyKHZhbHVlIDpib29sZWFuKXtcbiAgICAgICAgICAgIHRoaXMuX25lYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBnZXQgbmVhcigpOmJvb2xlYW57XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFic3RyYWN0IF9sYXlvdXRYQXhpcyhjYW52YXM6Q2FudmFzKTp2b2lkO1xuICAgICAgICBhYnN0cmFjdCBfbGF5b3V0WUF4aXMoY2FudmFzOkNhbnZhcyk6dm9pZDtcblxuXG4gICAgICAgIG9uTWVhc3VyZSh3aWR0aDogTWVhc3VyZVNwZWMsIGhlaWdodDogTWVhc3VyZVNwZWMsIGNhbnZhczogQ2FudmFzKTogU2l6ZXtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbk1lYXN1cmUod2lkdGgsaGVpZ2h0LGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lke1xuICAgICAgICAgICAgc3VwZXIub25MYXlvdXQobCx0LHIsYixjYW52YXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25EcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZHtcbiAgICAgICAgICAgIHN1cGVyLm9uRHJhdyhjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIF9mb3JtYXQodmFsOmFueSl7XG4gICAgICAgICAgICByZXR1cm4gdmFsK1wiXCI7XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IEdyYXZpdHkgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYXZpdHk7XG4gICAgaW1wb3J0IEZvbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkZvbnQ7XG4gICAgaW1wb3J0IExheW91dFBhcmFtcyA9IGFuZHJvaWQudmlldy5MYXlvdXRQYXJhbXM7XG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBleHBvcnQgY2xhc3MgTGluZUF4aXMgZXh0ZW5kcyBCYXNlQXhpcyB7XG5cbiAgICAgICAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCkge1xuICAgICAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgbmVhcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5fbmVhciA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IEdyYXZpdHkuQm90dG9tOyAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBHcmF2aXR5LkxlZnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gR3Jhdml0eS5Ub3A7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBHcmF2aXR5LlJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBuZWFyKCk6Ym9vbGVhbntcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZWFyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIF9jcmVhdGVUaWNrcygpOiBhbnlbXSB7XG4gICAgICAgICAgICBsZXQgdGlja3M6IG51bWJlcltdID0gW107XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FsZSBpbnN0YW5jZW9mIExpbmVhclNjYWxlKSB7XG4gICAgICAgICAgICAgICAgdGlja3MgPSBMaW5lYXJUaWNrcy5jcmVhdGUodGhpcy5zY2FsZSkuY3JlYXRlVGlja3MoMTApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlIGluc3RhbmNlb2YgTG9nU2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IExvZ1RpY2tzLmNyZWF0ZSh0aGlzLnNjYWxlKS5jcmVhdGVUaWNrcygxMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGUgaW5zdGFuY2VvZiBPcmRpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IE9yZGluYWxUaWNrcy5jcmVhdGUodGhpcy5zY2FsZSkuY3JlYXRlVGlja3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGVsc2UgaWYodGhpcy5zY2FsZSBpbnN0YW5jZW9mIFRpbWVzY2FsZSlcblxuICAgICAgICAgICAgcmV0dXJuIHRpY2tzO1xuICAgICAgICB9XG4gICAgICAgIF9sYXlvdXRYQXhpcyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHRpY2tzID0gdGhpcy5fdGlja3M7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IHRpY2tzICYmIGkgPCB0aWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gdGlja3NbaV07XG4gICAgICAgICAgICAgICAgbGV0IG5leHRWYWx1ZTogbnVtYmVyID0gaSA+PSB0aWNrcy5sZW5ndGggPyBudWxsIDogdGlja3NbaSArIDFdO1xuICAgICAgICAgICAgICAgIGxldCB0aWNraGVpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLl9tYWpvclRpY2tIZWlnaHQsIHRoaXMuX21pbm9yVGlja0hlaWdodCk7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5fZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxTaXplOiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcobGFiZWwsIHRoaXMubGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gdGhpcy5sYXlvdXRJbmZvLmlubmVycmVjdC50b3A7XG4gICAgICAgICAgICAgICAgbGV0IG54OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgbGV0IG55OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG54ID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG55ID0geTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWDogbnVtYmVyID0geDtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxZOiBudW1iZXIgPSB5ICsgdGlja2hlaWdodCArIExBQkVMX1BBRERJTkcgKyBsYWJlbFNpemUuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgICAgICBsZXQgc2hhcGU6IEF4aXNTaGFwZSA9IG5ldyBBeGlzU2hhcGUoKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFibGVSZWN0ID0gbmV3IFJvdGF0ZVJlY3QobGFiZWxYLCBsYWJlbFksIGxhYmVsU2l6ZS53aWR0aCwgbGFiZWxTaXplLmhlaWdodCwgMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWFqb3JUaWNrID0gbmV3IFJvdGF0ZUxpbmUoeCwgeSwgdGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCAwLCAwKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFibGVGb250ID0gdGhpcy5fbGFiZWxGb250O1xuICAgICAgICAgICAgICAgIHNoYXBlLl9tYWpvciA9IHRoaXMubWFqb3JTdHlsZTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWlub3IgPSB0aGlzLm1pbm9yU3R5bGU7XG4gICAgICAgICAgICAgICAgbGV0IG1pbm9yeCA9IE5hTjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG54KSkge1xuICAgICAgICAgICAgICAgICAgICBtaW5vcnggPSAoeCArIG54KSAvIDI7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hhcGUuX21pbm9yVGljayA9IG5ldyBSb3RhdGVMaW5lKG1pbm9yeCwgeSwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0LCAwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF9sYXlvdXRZQXhpcyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHRpY2tzID0gdGhpcy5fdGlja3M7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IHRpY2tzICYmIGkgPCB0aWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gdGlja3NbaV07XG5cbiAgICAgICAgICAgICAgICBsZXQgbmV4dFZhbHVlOiBudW1iZXIgPSBpID49IHRpY2tzLmxlbmd0aCA/IG51bGwgOiB0aWNrc1tpICsgMV07XG4gICAgICAgICAgICAgICAgbGV0IHRpY2toZWlnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMuX21ham9yVGlja0hlaWdodCwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLl9mb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFNpemU6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyhsYWJlbCwgdGhpcy5sYWJlbEZvbnQpO1xuICAgICAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSB0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0LnJpZ2h0O1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLm5lYXIpe1xuICAgICAgICAgICAgICAgICAgICB4ID0gdGhpcy5sYXlvdXRJbmZvLmlubmVycmVjdC5sZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbng6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBsZXQgbnk6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbnkgPSB0aGlzLnNjYWxlLmdldFNjYWxlVmFsdWUobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbnggPSB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxYOiBudW1iZXIgPSB4IC0gbGFiZWxTaXplLndpZHRoLzIgLSBMQUJFTF9QQURESU5HIC0gdGlja2hlaWdodDtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxZOiBudW1iZXIgPSB5IDtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5uZWFyKXtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxYID0geCAgKyBsYWJlbFNpemUud2lkdGgvMiArIExBQkVMX1BBRERJTkcgKyB0aWNraGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgc2hhcGU6IEF4aXNTaGFwZSA9IG5ldyBBeGlzU2hhcGUoKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFibGVSZWN0ID0gbmV3IFJvdGF0ZVJlY3QobGFiZWxYLCBsYWJlbFksIGxhYmVsU2l6ZS53aWR0aCwgbGFiZWxTaXplLmhlaWdodCwgMCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21ham9yVGljayA9IG5ldyBSb3RhdGVMaW5lKHgsIHksICB0aGlzLl9tYWpvclRpY2tIZWlnaHQsMCwgdGhpcy5uZWFyID8gTWF0aC5QSSAvIDI6LU1hdGguUEkvMik7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmxlRm9udCA9IHRoaXMubGFiZWxGb250O1xuICAgICAgICAgICAgICAgIHNoYXBlLl9tYWpvciA9IHRoaXMubWFqb3JTdHlsZTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWlub3IgPSB0aGlzLm1pbm9yU3R5bGU7XG4gICAgICAgICAgICAgICAgbGV0IG1pbm9yeSA9IE5hTjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG55KSkge1xuICAgICAgICAgICAgICAgICAgICBtaW5vcnkgPSAoeSArIG55KSAvIDI7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hhcGUuX21pbm9yVGljayA9IG5ldyBSb3RhdGVMaW5lKHgsIG1pbm9yeSwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0LDAsIHRoaXMubmVhciA/IE1hdGguUEkgLyAyOi1NYXRoLlBJLzIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb25NZWFzdXJlKHdpZHRoOiBNZWFzdXJlU3BlYywgaGVpZ2h0OiBNZWFzdXJlU3BlYywgY2FudmFzOiBDYW52YXMpOiBTaXplIHtcbiAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9heGlzVHlwZSA9PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBTaXplKHdpZHRoLnZhbHVlLCB0aGlzLl9tZWFzdXJlWChjYW52YXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgU2l6ZSh0aGlzLl9tZWFzdXJlWShjYW52YXMpLCBoZWlnaHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWVhc3VyZWREaW1lbnNpb24obmV3IE1lYXN1cmVTcGVjKHNpemUud2lkdGgsIExheW91dFBhcmFtcy5FWEFDVExZKSwgbmV3IE1lYXN1cmVTcGVjKHNpemUuaGVpZ2h0LCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaXplO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvdGVjdGVkIF9tZWFzdXJlWChjYW52YXM6IENhbnZhcyk6IG51bWJlciB7XG4gICAgICAgICAgICBsZXQgdGl0bGVTaXplOiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy50aXRsZSwgdGhpcy50aXRsZUZvbnQpO1xuICAgICAgICAgICAgbGV0IHRpY2tIZWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCB0aGlzLl9taW5vclRpY2tIZWlnaHQpO1xuICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZTogU2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgbGV0IHRpY2tzOiBhbnlbXSA9IHRoaXMuX3RpY2tzO1xuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiB0aWNrcykge1xuICAgICAgICAgICAgICAgIGxldCBzejogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMuX2Zvcm1hdCh0KSwgdGhpcy5sYWJlbEZvbnQpO1xuICAgICAgICAgICAgICAgIGxhYmVsU2l6ZS53aWR0aCA9IE1hdGgubWF4KHN6LndpZHRoLCBsYWJlbFNpemUud2lkdGgpO1xuICAgICAgICAgICAgICAgIGxhYmVsU2l6ZS5oZWlnaHQgPSBNYXRoLm1heChzei5oZWlnaHQsIGxhYmVsU2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsU2l6ZS5oZWlnaHQgKyB0aXRsZVNpemUuaGVpZ2h0ICsgdGlja0hlZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIF9tZWFzdXJlWShjYW52YXM6IENhbnZhcyk6IG51bWJlciB7XG5cbiAgICAgICAgICAgIGxldCB0aXRsZVNpemU6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyh0aGlzLnRpdGxlLCB0aGlzLnRpdGxlRm9udCk7XG4gICAgICAgICAgICBsZXQgdGlja0hlZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLl9tYWpvclRpY2tIZWlnaHQsIHRoaXMuX21pbm9yVGlja0hlaWdodCk7XG4gICAgICAgICAgICBsZXQgbGFiZWxTaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICBsZXQgdGlja3M6IGFueVtdID0gdGhpcy5fdGlja3M7XG4gICAgICAgICAgICBmb3IgKGxldCB0IG9mIHRpY2tzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN6OiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy5fZm9ybWF0KHQpLCB0aGlzLmxhYmVsRm9udCk7XG4gICAgICAgICAgICAgICAgbGFiZWxTaXplLndpZHRoID0gTWF0aC5tYXgoc3oud2lkdGgsIGxhYmVsU2l6ZS53aWR0aCk7XG4gICAgICAgICAgICAgICAgbGFiZWxTaXplLmhlaWdodCA9IE1hdGgubWF4KHN6LmhlaWdodCwgbGFiZWxTaXplLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGFiZWxTaXplLndpZHRoICsgdGl0bGVTaXplLmhlaWdodCArIHRpY2tIZWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7XG4gICAgICAgICAgICBpZih0aGlzLnNjYWxlICE9IG51bGwpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9heGlzVHlwZSA9PT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRYQXhpcyhjYW52YXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRZQXhpcyhjYW52YXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25EcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3TGluZShjYW52YXMpO1xuICAgICAgICAgICAgaWYodGhpcy5fY2hpbGRyZW4gIT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2hhcGUgb2YgdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuZHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcml2YXRlIF9kcmF3TGluZShjYW52YXM6Q2FudmFzKSA6dm9pZHtcbiAgICAgICAgICAgIGxldCByZWN0OlJlY3QgPSB0aGlzLmxheW91dEluZm8uaW5uZXJyZWN0O1xuICAgICAgICAgICAgaWYodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fbmVhcil7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZShuZXcgUG9pbnQocmVjdC5sZWZ0LHJlY3QudG9wKSxuZXcgUG9pbnQocmVjdC5yaWdodCxyZWN0LnRvcCksdGhpcy5saW5lU3R5bGUpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuZHJhd0xpbmUobmV3IFBvaW50KHJlY3QubGVmdCxyZWN0LmJvdHRvbSksbmV3IFBvaW50KHJlY3QucmlnaHQscmVjdC5ib3R0b20pLHRoaXMubGluZVN0eWxlKTsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlkpe1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX25lYXIpe1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuZHJhd0xpbmUobmV3IFBvaW50KHJlY3QucmlnaHQscmVjdC50b3ApLG5ldyBQb2ludChyZWN0LnJpZ2h0LHJlY3QuYm90dG9tKSx0aGlzLmxpbmVTdHlsZSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy5kcmF3TGluZShuZXcgUG9pbnQocmVjdC5sZWZ0LHJlY3QudG9wKSxuZXcgUG9pbnQocmVjdC5sZWZ0LHJlY3QuYm90dG9tKSx0aGlzLmxpbmVTdHlsZSk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IE1lYXN1cmVTcGVjID0gYW5kcm9pZC52aWV3Lk1lYXN1cmVTcGVjO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgU2l6ZSA9IGFuZHJvaWQuZ3JhcGhpY3MuU2l6ZTtcbiAgICBpbXBvcnQgQ29udGV4dCA9IGFuZHJvaWQuYXBwLkNvbnRleHQ7XG4gICAgaW1wb3J0IFJlY3QgPSBhbmRyb2lkLmdyYXBoaWNzLlJlY3Q7XG4gICAgaW1wb3J0IEdyYXZpdHkgPSBhbmRyb2lkLmdyYXBoaWNzLkdyYXZpdHk7XG4gICAgaW1wb3J0IEZvbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkZvbnQ7XG4gICAgaW1wb3J0IExheW91dFBhcmFtcyA9IGFuZHJvaWQudmlldy5MYXlvdXRQYXJhbXM7XG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgZXhwb3J0IGNsYXNzIFJhZGlhbExpbmVBeGlzIGV4dGVuZHMgQmFzZUF4aXMge1xuICAgICAgICBwcml2YXRlIF9faW5uZXJSYWRpdXM6IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgX19zdGFydEFuZ2xlOiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF9fc3dlZXA6IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgX19yYWRpdXM6IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgX19jeDogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfX2N5OiBudW1iZXIgPSAwO1xuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBDb250ZXh0KSB7XG4gICAgICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuX19pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgICAgICB0aGlzLl9saW5lU3R5bGUgPSBEZWZhdWx0LnN0cm9rZXN0eWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IG5lYXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX25lYXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBHcmF2aXR5LkJvdHRvbTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IEdyYXZpdHkuTGVmdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYXZpdHkgPSBHcmF2aXR5LlRvcDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3Jhdml0eSA9IEdyYXZpdHkuUmlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IG5lYXIoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmVhcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBfY3goKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fY3g7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IF9jeSgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19jeTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgX2N4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX19jeCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHNldCBfY3kodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fX2N5ID0gdmFsdWU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGdldCBfcmFkaXVzKCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3JhZGl1cztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBfcmFkaXVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX19yYWRpdXMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgX2lubmVyUmFkaXVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX19pbm5lclJhZGl1cyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBfaW5uZXJSYWRpdXMoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9faW5uZXJSYWRpdXM7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgX3N0YXJ0QW5nbGUodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fX3N0YXJ0QW5nbGUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgX3N0YXJ0QW5nbGUoKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc3RhcnRBbmdsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBfc3dlZXAodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgdGhpcy5fX3N3ZWVwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0IF9zd2VlcCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zd2VlcDtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICBwcm90ZWN0ZWQgX2NyZWF0ZVRpY2tzKCk6IGFueVtdIHtcbiAgICAgICAgICAgIGxldCB0aWNrczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYWxlIGluc3RhbmNlb2YgTGluZWFyU2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IExpbmVhclRpY2tzLmNyZWF0ZSh0aGlzLnNjYWxlKS5jcmVhdGVUaWNrcygxMCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGUgaW5zdGFuY2VvZiBMb2dTY2FsZSkge1xuICAgICAgICAgICAgICAgIHRpY2tzID0gTG9nVGlja3MuY3JlYXRlKHRoaXMuc2NhbGUpLmNyZWF0ZVRpY2tzKDEwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZSBpbnN0YW5jZW9mIE9yZGluYWxTY2FsZSkge1xuICAgICAgICAgICAgICAgIHRpY2tzID0gT3JkaW5hbFRpY2tzLmNyZWF0ZSh0aGlzLnNjYWxlKS5jcmVhdGVUaWNrcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZWxzZSBpZih0aGlzLnNjYWxlIGluc3RhbmNlb2YgVGltZXNjYWxlKVxuXG4gICAgICAgICAgICByZXR1cm4gdGlja3M7XG4gICAgICAgIH1cbiAgICAgICAgX2xheW91dFhBeGlzKGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgdGlja3MgPSB0aGlzLl90aWNrcztcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgdGlja3MgJiYgaSA8IHRpY2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSB0aWNrc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFZhbHVlOiBudW1iZXIgPSBpID49IHRpY2tzLmxlbmd0aCA/IG51bGwgOiB0aWNrc1tpICsgMV07XG4gICAgICAgICAgICAgICAgbGV0IHRpY2toZWlnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMuX21ham9yVGlja0hlaWdodCwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLl9mb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFNpemU6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyhsYWJlbCwgdGhpcy5sYWJlbEZvbnQpO1xuICAgICAgICAgICAgICAgIGxldCByYWRpdXM6IG51bWJlciA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IHRoaXMuX2N4ICsgTWF0aC5jb3ModGhpcy5fc3RhcnRBbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgbGV0IHk6IG51bWJlciA9IHRoaXMuX2N5ICsgTWF0aC5zaW4odGhpcy5fc3RhcnRBbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICAgICAgbGV0IG54OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgbGV0IG55OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0UmFkaXVzID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG54ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyh0aGlzLl9zdGFydEFuZ2xlKSAqIG5leHRSYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgIG55ID0gdGhpcy5fY3kgKyBNYXRoLnNpbih0aGlzLl9zdGFydEFuZ2xlKSAqIG5leHRSYWRpdXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGxhYmVseCA9IHggKyAoTWF0aC5zaW4odGhpcy5fc3RhcnRBbmdsZSkgKiAodGlja2hlaWdodCArIExBQkVMX1BBRERJTkcgKyBsYWJlbFNpemUuaGVpZ2h0IC8gMikpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbHkgPSB5IC0gKE1hdGguY29zKHRoaXMuX3N0YXJ0QW5nbGUpICogKHRpY2toZWlnaHQgKyBMQUJFTF9QQURESU5HICsgbGFiZWxTaXplLmhlaWdodCAvIDIpKTtcblxuICAgICAgICAgICAgICAgIGxldCBsYWJlbFg6IG51bWJlciA9IHg7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsWTogbnVtYmVyID0geSArIHRpY2toZWlnaHQgKyBMQUJFTF9QQURESU5HICsgbGFiZWxTaXplLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgbGV0IHNoYXBlOiBBeGlzU2hhcGUgPSBuZXcgQXhpc1NoYXBlKCk7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2xhYmxlUmVjdCA9IG5ldyBSb3RhdGVSZWN0KGxhYmVsWCwgbGFiZWxZLCBsYWJlbFNpemUud2lkdGgsIGxhYmVsU2l6ZS5oZWlnaHQsIDApO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9tYWpvclRpY2sgPSBuZXcgUm90YXRlTGluZSh4LCB5LCB0aGlzLl9tYWpvclRpY2tIZWlnaHQsIDAsIHRoaXMuX3N0YXJ0QW5nbGUpO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJsZUZvbnQgPSB0aGlzLl9sYWJlbEZvbnQ7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21ham9yID0gdGhpcy5tYWpvclN0eWxlO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9taW5vciA9IHRoaXMubWlub3JTdHlsZTtcbiAgICAgICAgICAgICAgICBsZXQgbWlub3J4ID0gTmFOO1xuICAgICAgICAgICAgICAgIGxldCBtaW5vcnkgPSBOYU47XG5cbiAgICAgICAgICAgICAgICBsZXQgbWlub3JSYWRpdXM6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG54KSkge1xuXG4gICAgICAgICAgICAgICAgICAgIG1pbm9yUmFkaXVzID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKCh2YWx1ZSArIG5leHRWYWx1ZSkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgbWlub3J4ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyh0aGlzLl9zdGFydEFuZ2xlKSAqIG1pbm9yUmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICBtaW5vcnkgPSB0aGlzLl9jeSArIE1hdGguc2luKHRoaXMuX3N0YXJ0QW5nbGUpICogbWlub3JSYWRpdXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoYXBlLl9taW5vclRpY2sgPSBuZXcgUm90YXRlTGluZShtaW5vcngsIG1pbm9yeSwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0LCAwLCB0aGlzLl9zdGFydEFuZ2xlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF9sYXlvdXRZQXhpcyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgbGV0IHRpY2tzID0gdGhpcy5fdGlja3M7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IHRpY2tzICYmIGkgPCB0aWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogbnVtYmVyID0gdGlja3NbaV07XG5cbiAgICAgICAgICAgICAgICBsZXQgbmV4dFZhbHVlOiBudW1iZXIgPSBpID49IHRpY2tzLmxlbmd0aCA/IG51bGwgOiB0aWNrc1tpICsgMV07XG4gICAgICAgICAgICAgICAgbGV0IHRpY2toZWlnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMuX21ham9yVGlja0hlaWdodCwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLl9mb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFNpemU6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyhsYWJlbCwgdGhpcy5sYWJlbEZvbnQpO1xuICAgICAgICAgICAgICAgIGxldCBhbmdsZTogbnVtYmVyID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKHZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSB0aGlzLl9jeCArIE1hdGguY29zKGFuZ2xlKSAqIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gdGhpcy5fY3kgKyBNYXRoLnNpbihhbmdsZSkgKiB0aGlzLl9yYWRpdXM7XG5cbiAgICAgICAgICAgICAgICBsZXQgbng6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBsZXQgbnk6IG51bWJlciA9IE5hTjtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5BbmdsZSA9IHRoaXMuc2NhbGUuZ2V0U2NhbGVWYWx1ZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBueCA9IHRoaXMuX2N4ICsgTWF0aC5jb3MobkFuZ2xlKSAqIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbnkgPSB0aGlzLl9jeSArIE1hdGguc2luKG5BbmdsZSkgKiB0aGlzLl9yYWRpdXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGxhYmxlWCA9IHRoaXMuX2N4ICsgTWF0aC5jb3MoYW5nbGUpICogKHRoaXMuX3JhZGl1cyArIHRpY2toZWlnaHQgKyBMQUJFTF9QQURESU5HICsgbGFiZWxTaXplLmhlaWdodCAvIDIpO1xuICAgICAgICAgICAgICAgIGxldCBsYWJsZVkgPSB0aGlzLl9jeSArIE1hdGguc2luKGFuZ2xlKSAqICh0aGlzLl9yYWRpdXMgKyB0aWNraGVpZ2h0ICsgTEFCRUxfUEFERElORyArIGxhYmVsU2l6ZS5oZWlnaHQgLyAyKTtcblxuICAgICAgICAgICAgICAgIGxldCBzaGFwZTogQXhpc1NoYXBlID0gbmV3IEF4aXNTaGFwZSgpO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9sYWJsZVJlY3QgPSBuZXcgUm90YXRlUmVjdChsYWJsZVgsIGxhYmxlWSwgbGFiZWxTaXplLndpZHRoLCBsYWJlbFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbWFqb3JUaWNrID0gbmV3IFJvdGF0ZUxpbmUoeCwgeSwgdGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCAwLCBhbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgICAgICBzaGFwZS5fbGFibGVGb250ID0gdGhpcy5sYWJlbEZvbnQ7XG4gICAgICAgICAgICAgICAgc2hhcGUuX21ham9yID0gdGhpcy5tYWpvclN0eWxlO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9taW5vciA9IHRoaXMubWlub3JTdHlsZTtcbiAgICAgICAgICAgICAgICBsZXQgbWlub3J5OiBudW1iZXIgPSBOYU47XG4gICAgICAgICAgICAgICAgbGV0IG1pbm9yeDogbnVtYmVyID0gTmFOO1xuICAgICAgICAgICAgICAgIGxldCBtaW5vckFuZ2xlOiBudW1iZXIgPSBOYU47XG5cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKG55KSkge1xuICAgICAgICAgICAgICAgICAgICBtaW5vckFuZ2xlID0gdGhpcy5zY2FsZS5nZXRTY2FsZVZhbHVlKChuZXh0VmFsdWUgKyB2YWx1ZSkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgbWlub3J4ID0gdGhpcy5fY3ggKyBNYXRoLmNvcyhtaW5vckFuZ2xlKSAqIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgbWlub3J5ID0gdGhpcy5fY3kgKyBNYXRoLnNpbihtaW5vckFuZ2xlKSAqIHRoaXMuX3JhZGl1cztcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaGFwZS5fbWlub3JUaWNrID0gbmV3IFJvdGF0ZUxpbmUobWlub3J4LCBtaW5vcnksIHRoaXMuX21pbm9yVGlja0hlaWdodCwgMCwgbWlub3JBbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9uTWVhc3VyZSh3aWR0aDogTWVhc3VyZVNwZWMsIGhlaWdodDogTWVhc3VyZVNwZWMsIGNhbnZhczogQ2FudmFzKTogU2l6ZSB7XG4gICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgU2l6ZSh3aWR0aC52YWx1ZSwgdGhpcy5fbWVhc3VyZVgoY2FudmFzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNZWFzdXJlZERpbWVuc2lvbihuZXcgTWVhc3VyZVNwZWMoc2l6ZS53aWR0aCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpLCBuZXcgTWVhc3VyZVNwZWMoc2l6ZS5oZWlnaHQsIExheW91dFBhcmFtcy5FWEFDVExZKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2F4aXNUeXBlID09IEF4aXNUeXBlLlkpIHtcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IFNpemUodGhpcy5fbWVhc3VyZVkoY2FudmFzKSwgaGVpZ2h0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lYXN1cmVkRGltZW5zaW9uKG5ldyBNZWFzdXJlU3BlYyhzaXplLndpZHRoLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIG5ldyBNZWFzdXJlU3BlYyhzaXplLmhlaWdodCwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByb3RlY3RlZCBfbWVhc3VyZVgoY2FudmFzOiBDYW52YXMpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IHRpdGxlU2l6ZTogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMudGl0bGUsIHRoaXMudGl0bGVGb250KTtcbiAgICAgICAgICAgIGxldCB0aWNrSGVnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMuX21ham9yVGlja0hlaWdodCwgdGhpcy5fbWlub3JUaWNrSGVpZ2h0KTtcbiAgICAgICAgICAgIGxldCBsYWJlbFNpemU6IFNpemUgPSBuZXcgU2l6ZSgwLCAwKTtcbiAgICAgICAgICAgIGxldCB0aWNrczogYW55W10gPSB0aGlzLl90aWNrcztcbiAgICAgICAgICAgIGZvciAobGV0IHQgb2YgdGlja3MpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3o6IFNpemUgPSBjYW52YXMubWVhc3VyZVN0cmluZyh0aGlzLl9mb3JtYXQodCksIHRoaXMubGFiZWxGb250KTtcbiAgICAgICAgICAgICAgICBsYWJlbFNpemUud2lkdGggPSBNYXRoLm1heChzei53aWR0aCwgbGFiZWxTaXplLndpZHRoKTtcbiAgICAgICAgICAgICAgICBsYWJlbFNpemUuaGVpZ2h0ID0gTWF0aC5tYXgoc3ouaGVpZ2h0LCBsYWJlbFNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsYWJlbFNpemUuaGVpZ2h0ICsgdGl0bGVTaXplLmhlaWdodCArIHRpY2tIZWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBfbWVhc3VyZVkoY2FudmFzOiBDYW52YXMpOiBudW1iZXIge1xuXG4gICAgICAgICAgICBsZXQgdGl0bGVTaXplOiBTaXplID0gY2FudmFzLm1lYXN1cmVTdHJpbmcodGhpcy50aXRsZSwgdGhpcy50aXRsZUZvbnQpO1xuICAgICAgICAgICAgbGV0IHRpY2tIZWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5fbWFqb3JUaWNrSGVpZ2h0LCB0aGlzLl9taW5vclRpY2tIZWlnaHQpO1xuICAgICAgICAgICAgbGV0IGxhYmVsU2l6ZTogU2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgbGV0IHRpY2tzOiBhbnlbXSA9IHRoaXMuX3RpY2tzO1xuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiB0aWNrcykge1xuICAgICAgICAgICAgICAgIGxldCBzejogU2l6ZSA9IGNhbnZhcy5tZWFzdXJlU3RyaW5nKHRoaXMuX2Zvcm1hdCh0KSwgdGhpcy5sYWJlbEZvbnQpO1xuICAgICAgICAgICAgICAgIGxhYmVsU2l6ZS53aWR0aCA9IE1hdGgubWF4KHN6LndpZHRoLCBsYWJlbFNpemUud2lkdGgpO1xuICAgICAgICAgICAgICAgIGxhYmVsU2l6ZS5oZWlnaHQgPSBNYXRoLm1heChzei5oZWlnaHQsIGxhYmVsU2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsU2l6ZS53aWR0aCArIHRpdGxlU2l6ZS5oZWlnaHQgKyB0aWNrSGVnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkxheW91dChsLCB0LCByLCBiLCBjYW52YXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9heGlzVHlwZSA9PT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRYQXhpcyhjYW52YXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRZQXhpcyhjYW52YXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25EcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3TGluZShjYW52YXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzaGFwZSBvZiB0aGlzLl9jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZS5kcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX2RyYXdMaW5lKGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgcmVjdDogUmVjdCA9IHRoaXMubGF5b3V0SW5mby5pbm5lcnJlY3Q7XG4gICAgICAgICAgICBpZiAodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgIGxldCBlbmR4OiBudW1iZXIgPSB0aGlzLl9jeCArIE1hdGguY29zKHRoaXMuX19zdGFydEFuZ2xlKSAqIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgICAgICBsZXQgZW5keTogbnVtYmVyID0gdGhpcy5fY3kgKyBNYXRoLnNpbih0aGlzLl9fc3RhcnRBbmdsZSkgKiB0aGlzLl9yYWRpdXM7XG4gICAgICAgICAgICAgICAgbGV0IHN4OiBudW1iZXIgPSB0aGlzLl9jeCArIE1hdGguY29zKHRoaXMuX19zdGFydEFuZ2xlKSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbm5lclJhZGl1cyAqIHRoaXMuX3JhZGl1cztcbiAgICAgICAgICAgICAgICBsZXQgc3k6IG51bWJlciA9IHRoaXMuX2N5ICsgTWF0aC5zaW4odGhpcy5fX3N0YXJ0QW5nbGUpICogdGhpcy5faW5uZXJSYWRpdXMgKiB0aGlzLl9yYWRpdXM7XG4gICAgICAgICAgICAgICAgY2FudmFzLmRyYXdMaW5lKG5ldyBQb2ludChzeCwgc3kpLCBuZXcgUG9pbnQoZW5keCwgZW5keSksIHRoaXMubGluZVN0eWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYXhpc1R5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgIGNhbnZhcy5kcmF3RG9udXQodGhpcy5fY3gsIHRoaXMuX2N5LCB0aGlzLl9yYWRpdXMsIHRoaXMuX3JhZGl1cyAtIHRoaXMubGluZVN0eWxlLnN0cm9rZVdpZHRoLCB0aGlzLl9zdGFydEFuZ2xlIC8gTWF0aC5QSSAqIDE4MCwgdGhpcy5fc3dlZXAgKiAxODAgLyBNYXRoLlBJLCB0aGlzLmxpbmVTdHlsZS5zdHJva2VDb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBWaWV3ID0gYW5kcm9pZC52aWV3LlZpZXc7XG4gICAgaW1wb3J0IFZpZXdHcm91cCA9IGFuZHJvaWQudmlldy5WaWV3R3JvdXA7XG4gICAgaW1wb3J0IEFuaW1hdGlvbiA9IGFuZHJvaWQudmlldy5hbmltYXRpb24uQW5pbWF0aW9uO1xuICAgIGV4cG9ydCBjbGFzcyBCYXNlUGxvdCBleHRlbmRzIFZpZXdHcm91cHtcbiAgICAgICAgcHJvdGVjdGVkIF9hbmltYXRpb246QW5pbWF0aW9uO1xuICAgICAgICBcbiAgICAgICAgZ2V0IGxheW91dCgpOkJhc2VMYXlvdXR7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vYmFzZS5kLnRzXCIgLz5cblxubmFtZXNwYWNlIGFuZHJvaWQudGVzdCB7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuICAgIGltcG9ydCBNZWFzdXJlU3BlYyA9IGFuZHJvaWQudmlldy5NZWFzdXJlU3BlYztcbiAgICBpbXBvcnQgQ2FudmFzID0gYW5kcm9pZC5ncmFwaGljcy5DYW52YXM7XG4gICAgaW1wb3J0IFNpemUgPSBhbmRyb2lkLmdyYXBoaWNzLlNpemU7XG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgUmVjdCA9IGFuZHJvaWQuZ3JhcGhpY3MuUmVjdDtcbiAgICBpbXBvcnQgRGVmYXVsdCA9IGFuZHJvaWQuZGV2aWNlLkRlZmF1bHQ7XG4gICAgaW1wb3J0IEFuaW1hdGlvbiA9IGFuZHJvaWQudmlldy5hbmltYXRpb24uQW5pbWF0aW9uO1xuICAgIGltcG9ydCBNb3Rpb25FdmVudCA9IGFuZHJvaWQudmlldy5ldmVudC5Nb3Rpb25FdmVudDtcbiAgICBpbXBvcnQgQm91bmNlQW5pbWF0aW9uRWFzZSA9IGFuZHJvaWQudmlldy5hbmltYXRpb24uQm91bmNlQW5pbWF0aW9uRWFzZTtcbiAgICBcbiAgICBleHBvcnQgY2xhc3MgQ2FydGVzaWFuUGxvdCBleHRlbmRzIEJhc2VQbG90IHtcblxuICAgICAgICBwcml2YXRlIF9fc2hhcGVMaXN0OiBTaGFwZVtdID0gW107XG4gICAgICAgIHByaXZhdGUgX2xheW91dHM6IEJhc2VMYXlvdXRbXTtcbiAgICAgICAgcHJvdGVjdGVkIF9fc2NhbGVQYWlyczoge1xuICAgICAgICAgICAgc2VyaWVzOiBzdHJpbmdbXSxcbiAgICAgICAgICAgIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlXG4gICAgICAgIH1bXTtcbiAgICAgICAgcHJpdmF0ZSBfZGF0YW1vZGVsOiBEYXRhTW9kZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbnRleHQsIGRhdGFtb2RlbDogRGF0YU1vZGVsKSB7XG4gICAgICAgICAgICBzdXBlcihjb250ZXh0KTtcblxuICAgICAgICAgICAgdGhpcy5fZGF0YW1vZGVsID0gZGF0YW1vZGVsO1xuXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXRzID0gW11cbiAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzID0gW107XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb249IG5ldyBBbmltYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5kdXJhdGlvbiA9IDUwMDtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbi5lYXNlID0gbmV3IEJvdW5jZUFuaW1hdGlvbkVhc2UoKTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIG9uTGF5b3V0KGw6IG51bWJlciwgdDogbnVtYmVyLCByOiBudW1iZXIsIGI6IG51bWJlciwgY2FudmFzOiBDYW52YXMpOiB2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLm9uTGF5b3V0KGwsdCxyLGIsY2FudmFzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5pc2xheW91dENoYW5nZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsVmlld3MoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5fX3NjYWxlUGFpcnMgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IGlzcmFkaWFsOiBib29sZWFuID0gdGhpcy5fZGF0YW1vZGVsLmVuY29kaW5nLl9yYWRpYWw7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdHlwZSBvZiB0aGlzLl9kYXRhbW9kZWwuY2hhcnRUeXBlcykge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLkJhcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNyYWRpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhcmxheW91dDogUmFkaWFsQmFyTGF5b3V0ID0gbmV3IFJhZGlhbEJhckxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3g6IG51bWJlciA9IChsICsgcikgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3k6IG51bWJlciA9IChiICsgdCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSAoKHIgLSBsKSA8IChiIC0gdCkgPyAociAtIGwpIDogKGIgLSB0KSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5uZXJSYWRpdXM6IG51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlOiBudW1iZXIgPSBTdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kQW5nbGU6IG51bWJlciA9IE1hdGguUEkgKiAyKyBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXJsYXlvdXQuY29udmVydCh0aGlzLl9kYXRhbW9kZWwuZ2V0U2VyaWVzQnlUeXBlKENoYXJ0VHlwZS5CYXIpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIGN4LCBjeSwgaW5uZXJSYWRpdXMsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoYmFybGF5b3V0LnNoYXBlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChiYXJsYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYXJsYXlvdXQ6IEJhckxheW91dCA9IG5ldyBCYXJMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFybGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuQmFyKSwgdGhpcy5fZGF0YW1vZGVsLmVuY29kaW5nLCBuZXcgUmVjdChsLCB0LCByLCBiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSB0aGlzLl9fc2hhcGVMaXN0LmNvbmNhdChiYXJsYXlvdXQuc2hhcGVMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0cy5wdXNoKGJhcmxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuTGluZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNyYWRpYWwpIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVsYXlvdXQ6IFJhZGlhbExpbmVMYXlvdXQgPSBuZXcgUmFkaWFsTGluZUxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3g6IG51bWJlciA9IChsICsgcikgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3k6IG51bWJlciA9IChiICsgdCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSAoKHIgLSBsKSA8IChiIC0gdCkgPyAociAtIGwpIDogKGIgLSB0KSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5uZXJSYWRpdXM6IG51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlOiBudW1iZXIgPSBTdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kQW5nbGU6IG51bWJlciA9IE1hdGguUEkgKiAyKyBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lbGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuTGluZSksIHRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZywgY3gsIGN5LCBpbm5lclJhZGl1cywgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3QgPSB0aGlzLl9fc2hhcGVMaXN0LmNvbmNhdChsaW5lbGF5b3V0LnNoYXBlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dHMucHVzaChsaW5lbGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lbGF5b3V0OiBMaW5lTGF5b3V0ID0gbmV3IExpbmVMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZWxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLkxpbmUpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIG5ldyBSZWN0KGwsIHQsIHIsIGIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3NoYXBlTGlzdCA9IHRoaXMuX19zaGFwZUxpc3QuY29uY2F0KGxpbmVsYXlvdXQuc2hhcGVMaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0cy5wdXNoKGxpbmVsYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQ2hhcnRUeXBlLlNjYXR0ZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzcmFkaWFsKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2F0dGVybGF5b3V0OiBSYWRpYWxTY2F0dGVyTGF5b3V0ID0gbmV3IFJhZGlhbFNjYXR0ZXJMYXlvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN4OiBudW1iZXIgPSAobCArIHIpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN5OiBudW1iZXIgPSAoYiArIHQpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGl1czogbnVtYmVyID0gKChyIC0gbCkgPCAoYiAtIHQpID8gKHIgLSBsKSA6IChiIC0gdCkpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlubmVyUmFkaXVzOiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRBbmdsZTogbnVtYmVyID0gU3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVuZEFuZ2xlOiBudW1iZXIgPSBNYXRoLlBJICogMisgc3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhdHRlcmxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLlNjYXR0ZXIpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIGN4LCBjeSwgaW5uZXJSYWRpdXMsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoc2NhdHRlcmxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLnB1c2goc2NhdHRlcmxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYXR0ZXJMYXlvdXQ6IFNjYXR0ZXJMYXlvdXQgPSBuZXcgU2NhdHRlckxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2F0dGVyTGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuU2NhdHRlciksIHRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZywgbmV3IFJlY3QobCwgdCwgciwgYikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoc2NhdHRlckxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLnB1c2goc2NhdHRlckxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBDaGFydFR5cGUuQXJlYTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNyYWRpYWwpIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZWFsYXlvdXQ6IFJhZGlhbEFyZWFMYXlvdXQgPSBuZXcgUmFkaWFsQXJlYUxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3g6IG51bWJlciA9IChsICsgcikgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3k6IG51bWJlciA9IChiICsgdCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOiBudW1iZXIgPSAoKHIgLSBsKSA8IChiIC0gdCkgPyAociAtIGwpIDogKGIgLSB0KSkgLyAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5uZXJSYWRpdXM6IG51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydEFuZ2xlOiBudW1iZXIgPSBTdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kQW5nbGU6IG51bWJlciA9IE1hdGguUEkgKiAyICsgc3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYWxheW91dC5jb252ZXJ0KHRoaXMuX2RhdGFtb2RlbC5nZXRTZXJpZXNCeVR5cGUoQ2hhcnRUeXBlLkFyZWEpLCB0aGlzLl9kYXRhbW9kZWwuZW5jb2RpbmcsIGN4LCBjeSwgaW5uZXJSYWRpdXMsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoYXJlYWxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLnB1c2goYXJlYWxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyZWFsYXlvdXQ6IEFyZWFMYXlvdXQgPSBuZXcgQXJlYUxheW91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmVhbGF5b3V0LmNvbnZlcnQodGhpcy5fZGF0YW1vZGVsLmdldFNlcmllc0J5VHlwZShDaGFydFR5cGUuQXJlYSksIHRoaXMuX2RhdGFtb2RlbC5lbmNvZGluZywgbmV3IFJlY3QobCwgdCwgciwgYikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0ID0gdGhpcy5fX3NoYXBlTGlzdC5jb25jYXQoYXJlYWxheW91dC5zaGFwZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRzLnB1c2goYXJlYWxheW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX19zaGFwZUxpc3Quc29ydCgoYTogU2hhcGUsIGI6IFNoYXBlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxheW91dHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xheW91dHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZXNQYWlycyA9IHRoaXMubGF5b3V0c1tpXS5zY2FsZVBhaXJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiBzY2FsZXNQYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBfLmZpbmQodGhpcy5zY2FsZVBhaXJzLCAocDogeyBzZXJpZXM6IHN0cmluZ1tdLCBmaWxlZDogRmllbGQsIHNjYWxlOiBTY2FsZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwLmZpbGVkLmVxdWFscyhwYWlyLmZpbGVkKSAmJiBwLnNjYWxlLmVxdWFsKHBhaXIuc2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2NhbGVQYWlycy5wdXNoKHsgc2VyaWVzOiBbXS5jb25jYXQocGFpci5zZXJpZXMpLCBmaWxlZDogcGFpci5maWxlZCwgc2NhbGU6IHBhaXIuc2NhbGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNlcmllcyA9IHJlc3VsdC5zZXJpZXMuY29uY2F0KHBhaXIuc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xheW91dHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zY2FsZVBhaXJzID0gdGhpcy5fbGF5b3V0c1swXS5zY2FsZVBhaXJzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighdGhpcy5fZGF0YW1vZGVsLmVuY29kaW5nLl9yYWRpYWwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXRMaW5lKGwsIHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IobGV0IHNoYXBlIG9mIHRoaXMuX19zaGFwZUxpc3Qpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFZpZXdXaXRoT3V0UmVMYXlvdXQoc2hhcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm90ZWN0ZWQgX2xheW91dExpbmUobDogbnVtYmVyLCByOiBudW1iZXIpIHtcbiAgICAgICAgICAgIGxldCB5czogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGxheW91dCBvZiB0aGlzLmxheW91dHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIGxheW91dC5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWlyLmZpbGVkLm5hbWUgPT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgeTogbnVtYmVyID0gcGFpci5zY2FsZS5nZXRTY2FsZVZhbHVlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHlzLmluZGV4T2YoeSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeXMucHVzaCh5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc2xpbmU6IEF4aXNMaW5lU2hhcGUgPSBuZXcgQXhpc0xpbmVTaGFwZShsLCB5LCByLCB5LCBEZWZhdWx0LnN0cm9rZXN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc2hhcGVMaXN0LnB1c2goYXhpc2xpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBvbk1vdXNlRXZlbnQoZXZlbnQ6IE1vdGlvbkV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgICAgICBmb3IobGV0IHNoYXBlIG9mIHRoaXMuX19zaGFwZUxpc3Qpe1xuICAgICAgICAgICAgICAgIGlmKHNoYXBlICE9IG51bGwgJiYgc2hhcGUucmVjdC5jb250YWlucyhldmVudC54LGV2ZW50LnkpKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICBzaGFwZS5vbk1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZighcmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG1lcmFnZSB0aGUgc2NhbGVzIHdoaWNoIGlzICB4IC8geSBcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgX19tZXJhZ2VTY2FsZSgpIHtcblxuICAgICAgICB9XG4gICAgICAgIG9uRHJhdyhjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgc3VwZXIub25EcmF3KGNhbnZhcyk7XG4gICAgICAgICAgICAvLyBmb3IgKGxldCBzaGFwZSBvZiB0aGlzLl9fc2hhcGVMaXN0KSB7XG4gICAgICAgICAgICAvLyAgICAgc2hhcGUuZHJhdyhjYW52YXMpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICAgIGdldCBsYXlvdXRzKCk6IEJhc2VMYXlvdXRbXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5b3V0cztcbiAgICAgICAgfVxuICAgICAgICBnZXQgc2NhbGVQYWlycygpOiB7IHNlcmllczogc3RyaW5nW10sIGZpbGVkOiBGaWVsZCwgc2NhbGU6IFNjYWxlIH1bXSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NjYWxlUGFpcnM7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2Jhc2UuZC50c1wiIC8+XG5cbm5hbWVzcGFjZSBhbmRyb2lkLnRlc3Qge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IENhbnZhcyA9IGFuZHJvaWQuZ3JhcGhpY3MuQ2FudmFzO1xuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDb250ZXh0ID0gYW5kcm9pZC5hcHAuQ29udGV4dDtcbiAgICBpbXBvcnQgTGF5b3V0UGFyYW1zID0gYW5kcm9pZC52aWV3LkxheW91dFBhcmFtcztcbiAgICBpbXBvcnQgRnJhbWVMYXlvdXQgPSBhbmRyb2lkLndpZGdldC5GcmFtZUxheW91dDtcbiAgICBpbXBvcnQgR3Jhdml0eSA9IGFuZHJvaWQuZ3JhcGhpY3MuR3Jhdml0eTtcbiAgICBleHBvcnQgY29uc3QgU3RhcnRBbmdsZTpudW1iZXIgPSBNYXRoLlBJO1xuICAgIGV4cG9ydCBjbGFzcyBDYXJ0ZXNpYW5DaGFydCBleHRlbmRzIEZyYW1lTGF5b3V0IHtcblxuICAgICAgICBwcml2YXRlIF9kYXRhTW9kZWw6IERhdGFNb2RlbDtcbiAgICAgICAgcHJpdmF0ZSBfY2hhcnRUeXBlOiBDaGFydFR5cGU7XG4gICAgICAgIHByaXZhdGUgX29wdGlvbjogYW55O1xuICAgICAgICBwcml2YXRlIF9heGlzTGlzdDogQmFzZUF4aXNbXTtcbiAgICAgICAgcHJpdmF0ZSBfcGxvdDogQmFzZVBsb3Q7XG5cbiAgICAgICAgY29uc3RydWN0b3IoY29udGV4dDogQ29udGV4dCwgb3B0aW9uPzogYW55LCBjaGFydFR5cGU/OiBDaGFydFR5cGUpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9uID0gb3B0aW9uO1xuICAgICAgICAgICAgdGhpcy5fY2hhcnRUeXBlID0gY2hhcnRUeXBlO1xuICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3QgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgb3B0aW9uKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGdldCBvcHRpb24oKTogYW55IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGNoYXJ0VHlwZSh2YWx1ZTogQ2hhcnRUeXBlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPSB0aGlzLl9jaGFydFR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFydFR5cGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZXQgY2hhcnRUeXBlKCk6IENoYXJ0VHlwZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhcnRUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IGRhdGFtb2RlbCh2YWx1ZTogRGF0YU1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmKHRoaXMuX2RhdGFNb2RlbC5lbmNvZGluZy5fcmFkaWFsKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUmFkaWFsVmlldygpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZFZpZXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZXQgZGF0YW1vZGVsKCk6IERhdGFNb2RlbCB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YU1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGUgX2xvYWRWaWV3KCkge1xuICAgICAgICAgICAgZm9yIChsZXQgcGFpciBvZiB0aGlzLmRhdGFtb2RlbC5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF4aXNZOiBMaW5lQXhpcyA9IG5ldyBMaW5lQXhpcyh0aGlzLmdldENvbnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGF4aXNZLnR5cGUgPSBBeGlzVHlwZS5ZO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kubGF5b3V0UGFyYW1zLndpZHRoID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5uZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kuc2VyaWVzID0gW10uY29uY2F0KHBhaXIuc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3QucHVzaChheGlzWSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVmlldyhheGlzWSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9heGlzTGlzdFt0aGlzLl9heGlzTGlzdC5sZW5ndGggLSAxXS5uZWFyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGxvdDogQmFzZVBsb3QgPSBuZXcgQ2FydGVzaWFuUGxvdCh0aGlzLmdldENvbnRleHQoKSwgdGhpcy5kYXRhbW9kZWwpO1xuICAgICAgICAgICAgcGxvdC5sYXlvdXRQYXJhbXMud2lkdGggPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgcGxvdC5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIHRoaXMuX3Bsb3QgPSBwbG90O1xuICAgICAgICAgICAgdGhpcy5hZGRWaWV3KHBsb3QpO1xuICAgICAgICAgICAgbGV0IGF4aXNYOiBMaW5lQXhpcyA9IG5ldyBMaW5lQXhpcyh0aGlzLmdldENvbnRleHQoKSk7XG4gICAgICAgICAgICBheGlzWC50eXBlID0gQXhpc1R5cGUuWDtcbiAgICAgICAgICAgIGF4aXNYLmxheW91dFBhcmFtcy53aWR0aCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICBheGlzWC5sYXlvdXRQYXJhbXMuaGVpZ2h0ID0gMTAwO1xuICAgICAgICAgICAgYXhpc1gubmVhciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9heGlzTGlzdC5wdXNoKGF4aXNYKTtcbiAgICAgICAgICAgIHRoaXMuYWRkVmlldyhheGlzWCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfbG9hZFJhZGlhbFZpZXcoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMuZGF0YW1vZGVsLnNjYWxlUGFpcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFpci5maWxlZC5uYW1lID09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXhpc1k6IFJhZGlhbExpbmVBeGlzID0gbmV3IFJhZGlhbExpbmVBeGlzKHRoaXMuZ2V0Q29udGV4dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kudHlwZSA9IEF4aXNUeXBlLlk7XG4gICAgICAgICAgICAgICAgICAgIGF4aXNZLmxheW91dFBhcmFtcy5oZWlnaHQgPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5sYXlvdXRQYXJhbXMud2lkdGggPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgICAgICAgICBheGlzWS5uZWFyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYXhpc1kuc2VyaWVzID0gW10uY29uY2F0KHBhaXIuc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXhpc0xpc3QucHVzaChheGlzWSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVmlldyhheGlzWSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2F4aXNMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9heGlzTGlzdFt0aGlzLl9heGlzTGlzdC5sZW5ndGggLSAxXS5uZWFyID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbG90OiBCYXNlUGxvdCA9IG5ldyBDYXJ0ZXNpYW5QbG90KHRoaXMuZ2V0Q29udGV4dCgpLCB0aGlzLmRhdGFtb2RlbCk7XG4gICAgICAgICAgICBwbG90LmxheW91dFBhcmFtcy53aWR0aCA9IExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQ7XG4gICAgICAgICAgICBwbG90LmxheW91dFBhcmFtcy5oZWlnaHQgPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgdGhpcy5fcGxvdCA9IHBsb3Q7XG4gICAgICAgICAgICB0aGlzLmFkZFZpZXcocGxvdCk7XG4gICAgICAgICAgICBsZXQgYXhpc1g6IFJhZGlhbExpbmVBeGlzID0gbmV3IFJhZGlhbExpbmVBeGlzKHRoaXMuZ2V0Q29udGV4dCgpKTtcbiAgICAgICAgICAgIGF4aXNYLnR5cGUgPSBBeGlzVHlwZS5YO1xuICAgICAgICAgICAgYXhpc1guZ3Jhdml0eSA9IEdyYXZpdHkuQ2VudGVyO1xuICAgICAgICAgICAgYXhpc1gubGF5b3V0UGFyYW1zLndpZHRoID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIGF4aXNYLmxheW91dFBhcmFtcy5oZWlnaHQgPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgYXhpc1gubmVhciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9heGlzTGlzdC5wdXNoKGF4aXNYKTtcbiAgICAgICAgICAgIHRoaXMuYWRkVmlldyhheGlzWCk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgLy8gcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCxoZWlnaHQsY2FudmFzKTtcbiAgICAgICAgICAgIGxldCBtYXhzaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhbW9kZWwuZW5jb2RpbmcuX3JhZGlhbCkge1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYXhpcyBvZiB0aGlzLl9heGlzTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IGF4aXMub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChheGlzLnR5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgdyA6bnVtYmVyID0gd2lkdGguZ2V0TWVhc3VyZVZhbHVlKCk7XG4gICAgICAgICAgICAgICAgbGV0IGggOm51bWJlciA9IGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICBsZXQgcmFkaXVzOm51bWJlciA9IHc8aD93LzI6aC8yIDtcbiAgICAgICAgICAgICAgICByYWRpdXMgPSByYWRpdXMgLSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0QW5nbGU6bnVtYmVyID0gU3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICBsZXQgc3dlZXA6bnVtYmVyID0gTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdmlldyBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaXplOiBTaXplID0gbmV3IFNpemUoMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3IGluc3RhbmNlb2YgQmFzZUF4aXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3LnR5cGUgPT0gQXhpc1R5cGUuWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZShuZXcgTWVhc3VyZVNwZWMod2lkdGguZ2V0TWVhc3VyZVZhbHVlKCksIExheW91dFBhcmFtcy5FWEFDVExZKSwgbmV3IE1lYXN1cmVTcGVjKGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKSwgTGF5b3V0UGFyYW1zLkVYQUNUTFkpLCBjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYodmlldy50eXBlID09IEF4aXNUeXBlLlgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAoPFJhZGlhbExpbmVBeGlzPnZpZXcpLl9pbm5lclJhZGl1cyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAoPFJhZGlhbExpbmVBeGlzPnZpZXcpLl9zdGFydEFuZ2xlID0gc3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICg8UmFkaWFsTGluZUF4aXM+dmlldykuX3N3ZWVwID0gc3dlZXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAoPFJhZGlhbExpbmVBeGlzPnZpZXcpLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3IGluc3RhbmNlb2YgQmFzZVBsb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5MZWZ0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblRvcCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5SaWdodCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5Cb3R0b20gPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3Lm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9mZiA9IDAsIHRvZmYgPSAwLCByb2ZmID0gMCwgYm9mZiA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYXhpcyBvZiB0aGlzLl9heGlzTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IGF4aXMub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChheGlzLnR5cGUgPT0gQXhpc1R5cGUuWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF4aXMubmVhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZmYgPSBzaXplLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9mZiA9IHNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF4aXMudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcy5uZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9mZiA9IHNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvZmYgPSBzaXplLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IHZpZXcgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZTogU2l6ZSA9IG5ldyBTaXplKDAsIDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIEJhc2VBeGlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlldy50eXBlID09IEF4aXNUeXBlLlgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luTGVmdCA9IGxvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblJpZ2h0ID0gcm9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplID0gdmlldy5vbk1lYXN1cmUobmV3IE1lYXN1cmVTcGVjKHdpZHRoLmdldE1lYXN1cmVWYWx1ZSgpIC0gbG9mZiAtIHJvZmYsIHdpZHRoLm1vZGUpLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpZXcudHlwZSA9PSBBeGlzVHlwZS5ZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXcubmVhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luVG9wID0gdG9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpbkJvdHRvbSA9IGJvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZSh3aWR0aCwgbmV3IE1lYXN1cmVTcGVjKGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKSAtIHRvZmYgLSBib2ZmLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblRvcCA9IHRvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5Cb3R0b20gPSBib2ZmOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGF5b3V0UGFyYW1zLm1hcmdpbi5tYXJnaW5SaWdodCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZSh3aWR0aCwgbmV3IE1lYXN1cmVTcGVjKGhlaWdodC5nZXRNZWFzdXJlVmFsdWUoKSAtIHRvZmYgLSBib2ZmLCBMYXlvdXRQYXJhbXMuRVhBQ1RMWSksIGNhbnZhcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlldyBpbnN0YW5jZW9mIEJhc2VQbG90KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luTGVmdCA9IGxvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luUmlnaHQgPSByb2ZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5sYXlvdXRQYXJhbXMubWFyZ2luLm1hcmdpblRvcCA9IHRvZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luQm90dG9tID0gYm9mZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3Lm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHZpZXcub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIGNhbnZhcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUud2lkdGggPiBtYXhzaXplLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhzaXplLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZS5oZWlnaHQgPiBtYXhzaXplLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4c2l6ZS5oZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdXBlci5vbk1lYXN1cmUod2lkdGgsIGhlaWdodCwgY2FudmFzKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgb25MYXlvdXQobDogbnVtYmVyLCB0OiBudW1iZXIsIHI6IG51bWJlciwgYjogbnVtYmVyLCBjYW52YXM6IENhbnZhcyk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXRJbmZvLnJlc2V0KGwsIHQsIHIsIGIsIHRoaXMucGFkZGluZywgMCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGF4aXMgb2YgdGhpcy5fYXhpc0xpc3QpIHtcbiAgICAgICAgICAgICAgICBheGlzLnNjYWxlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN1cGVyLm9uTGF5b3V0KGwsIHQsIHIsIGIsIGNhbnZhcyk7IFxuICAgICAgICAgICAgdGhpcy5sYXlvdXRJdGVtKHRoaXMucGxvdCwgbCwgdCwgciwgYiwgY2FudmFzKTtcblxuXG4gICAgICAgICAgICBmb3IgKGxldCBheGlzIG9mIHRoaXMuX2F4aXNMaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGF4aXMgaW5zdGFuY2VvZiBCYXNlQXhpcykge1xuICAgICAgICAgICAgICAgICAgICBpZihheGlzIGluc3RhbmNlb2YgUmFkaWFsTGluZUF4aXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXhpcy5fY3ggPSAobCArcikvMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF4aXMuX2N5ID0gKHQrYikvMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXhpcy50eXBlID09PSBBeGlzVHlwZS5YKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMucGxvdC5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXhpcy5zY2FsZSA9IHBhaXIuc2NhbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwYWlyIG9mIHRoaXMucGxvdC5zY2FsZVBhaXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhaXIuZmlsZWQubmFtZSA9PSAneScgJiYgXy54b3IocGFpci5zZXJpZXMsIGF4aXMuc2VyaWVzKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBheGlzLnNjYWxlID0gcGFpci5zY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRJdGVtKGF4aXMsIGwsIHIsIHQsIGIsIGNhbnZhcyk7XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICBnZXQgcGxvdCgpOiBDYXJ0ZXNpYW5QbG90IHtcbiAgICAgICAgICAgIGZvciAobGV0IHBsb3Qgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChwbG90IGluc3RhbmNlb2YgQ2FydGVzaWFuUGxvdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxvdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZGlzcGF0Y2hEcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kaXNwYXRjaERyYXcoY2FudmFzKTtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2Jhc2UuZC50c1wiIC8+XG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0IHtcbiAgICBpbXBvcnQgUGFkZGluZyA9IGFuZHJvaWQuZ3JhcGhpY3MuUGFkZGluZztcbiAgICBpbXBvcnQgQWxpZ24gPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduO1xuICAgIGltcG9ydCBHcmF2aXR5ID0gYW5kcm9pZC5ncmFwaGljcy5HcmF2aXR5O1xuXG5cbiAgICBpbXBvcnQgQWxpZ25FbG1lbnQgPSBhbmRyb2lkLmdyYXBoaWNzLkFsaWduRWxtZW50O1xuICAgIGltcG9ydCBNYXJnaW4gPSBhbmRyb2lkLmdyYXBoaWNzLk1hcmdpbjtcblxuICAgIGltcG9ydCBTaXplID0gYW5kcm9pZC5ncmFwaGljcy5TaXplO1xuICAgIGltcG9ydCBDYW52YXMgPSBhbmRyb2lkLmdyYXBoaWNzLkNhbnZhcztcbiAgICBpbXBvcnQgVmlld0dyb3VwID0gYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgVmlldyA9IGFuZHJvaWQudmlldy5WaWV3O1xuXG4gICAgaW1wb3J0IFBvaW50ID0gYW5kcm9pZC5ncmFwaGljcy5Qb2ludDtcbiAgICBpbXBvcnQgTWVhc3VyZVNwZWMgPSBhbmRyb2lkLnZpZXcuTWVhc3VyZVNwZWM7XG4gICAgaW1wb3J0IExheW91dFBhcmFtcyA9IGFuZHJvaWQudmlldy5MYXlvdXRQYXJhbXM7XG4gICAgaW1wb3J0IE1vdGlvbkV2ZW50ID0gYW5kcm9pZC52aWV3LmV2ZW50Lk1vdGlvbkV2ZW50O1xuICAgIGltcG9ydCBGcmFtZUxheW91dCA9IGFuZHJvaWQud2lkZ2V0LkZyYW1lTGF5b3V0O1xuICAgIGltcG9ydCBMaW5lYWVyTGF5b3V0ID0gYW5kcm9pZC53aWRnZXQuTGluZWFyTGF5b3V0O1xuXG4gICAgaW1wb3J0IFJlbmRlclR5cGUgPSBhbmRyb2lkLmdyYXBoaWNzLlJlbmRlclR5cGU7XG4gICAgaW1wb3J0IENvbnRleHQgPSBhbmRyb2lkLmFwcC5Db250ZXh0O1xuICAgIGltcG9ydCBEZXZpY2UgPSBhbmRyb2lkLmRldmljZS5EZXZpY2U7XG4gICAgaW1wb3J0IE9yaWVudGF0aW9uID0gYW5kcm9pZC5ncmFwaGljcy5PcmllbnRhdGlvbjtcbiAgICBpbXBvcnQgUm9vdFZpZXcgPSBhbmRyb2lkLndpZGdldC5Sb290VmlldztcblxuICAgIGV4cG9ydCBjbGFzcyBDaGFydExheW91dCBleHRlbmRzIFJvb3RWaWV3IHtcbiAgICAgICAgLy8gcHJpdmF0ZSBfdzogbnVtYmVyO1xuICAgICAgICAvLyBwcml2YXRlIF9oOiBudW1iZXI7XG4gICAgICAgIC8vIHByaXZhdGUgX2w6IG51bWJlcjtcbiAgICAgICAgLy8gcHJpdmF0ZSBfdDogbnVtYmVyO1xuICAgICAgICBwcml2YXRlIF9jaGFydDogQ2FydGVzaWFuQ2hhcnQ7XG4gICAgICAgIHByaXZhdGUgX2hvcml6b250YWxsZWdlbmQ6IFNlcmllc0xlZ2VuZDtcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAgICAgcHJpdmF0ZSBfZGF0YU1vZGVsOiBEYXRhTW9kZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbnRleHQpIHtcbiAgICAgICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5jbGlwID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgRXZlbnRIYW5kbGVyID0gKHB0OiBQb2ludCwgdHlwZXM6IEVsZW1lbnRUeXBlLCBpbmZvOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiBcIiArIHB0LnRvU3RyaW5nKCkgKyBcIiwgdHlwZSBcIiArIHR5cGVzICsgXCIgLCBpbmZvIFwiICsgaW5mbyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVzID09IEVsZW1lbnRUeXBlLlNlcmllc0xlZ2VuZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VyaWVzOiBzdHJpbmdbXSA9IHRoaXMuX2RhdGFNb2RlbC5maWx0ZXIuc2VyaWVzO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHNlcmllcy5pbmRleE9mKGluZm8uc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFNb2RlbC5maWx0ZXIuc2VyaWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPCAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwuZmlsdGVyLnNlcmllcy5wdXNoKGluZm8uc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhTW9kZWwucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENoYXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3dbJ0V2ZW50SGFuZGxlciddID0gRXZlbnRIYW5kbGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgXG4gICAgICAgIGF0dGFjaEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGRhdGFtb2RlbDogRGF0YU1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaHN0YXJ0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaG1vdmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbnRvdWNoZW5kID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub250b3VjaGNhbmNlbCA9IHRoaXMub250b3VjaC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9ubW91c2Vkb3duID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub25tb3VzZW1vdmUgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNldXAgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbm1vdXNlb3V0ID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub25tb3VzZW92ZXIgPSB0aGlzLm9udG91Y2guYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbmNsaWNrID0gdGhpcy5vbnRvdWNoLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmxheW91dFBhcmFtcy53aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB0aGlzLmxheW91dFBhcmFtcy5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIERldmljZS53aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICBEZXZpY2UuaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFJlbmRlcihuZXcgQ2FudmFzKGVsZW1lbnQsIFJlbmRlclR5cGUuQ2FudmFzKSk7XG4gICAgICAgICAgICAvLyB0aGlzLl9sID0gMDtcbiAgICAgICAgICAgIC8vIHRoaXMuX3QgPSAwO1xuICAgICAgICAgICAgLy8gdGhpcy5fdyA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgICAgICAgICAvLyB0aGlzLl9oID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNldEluZm8oMCwwLGVsZW1lbnQuY2xpZW50V2lkdGgsZWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5wYWRkaW5nID0gbmV3IFBhZGRpbmcoMjApOyAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5fZGF0YU1vZGVsID0gZGF0YW1vZGVsO1xuICAgICAgICAgICAgdGhpcy5zZXRDaGFydCgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBzZXRDaGFydCgpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsVmlld3MoKTtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0ID0gbmV3IENhcnRlc2lhbkNoYXJ0KG51bGwsIG51bGwsIENoYXJ0VHlwZS5CYXIpO1xuICAgICAgICAgICAgdGhpcy5fY2hhcnQubGF5b3V0UGFyYW1zLndpZHRoID0gTGF5b3V0UGFyYW1zLk1BVENIX1BBUkVOVDtcbiAgICAgICAgICAgIHRoaXMuX2NoYXJ0LmxheW91dFBhcmFtcy5oZWlnaHQgPSBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UO1xuICAgICAgICAgICAgLy8gdGhpcy5fY2hhcnQuZGF0YW1vZGVsID0gZGF0YW1vZGVsO1xuICAgICAgICAgICAgdGhpcy5fY2hhcnQuZGF0YW1vZGVsID0gdGhpcy5fZGF0YU1vZGVsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFNb2RlbC5hbGxTZXJpZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQgPSBuZXcgU2VyaWVzTGVnZW5kKCdiYXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3Jpem9udGFsbGVnZW5kLnNlcmllcyA9IHRoaXMuX2RhdGFNb2RlbC5hbGxTZXJpZXM7XG4gICAgICAgICAgICAgICAgLy8gLm1hcCgoc2VyOiBTZXJpZXMsIGluZGV4OiBudW1iZXIsIGFycjogU2VyaWVzW10pID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIHNlci5uYW1lO1xuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGFNb2RlbC5zZXJpZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9ob3Jpem9udGFsbGVnZW5kLnNlcmllcyA9IGRhdGFtb2RlbC5fZ2V0U2NhbGVCeU5hbWUoJ2NvbG9yJyxkYXRhbW9kZWwuc2VyaWVzWzBdLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2hvcml6b250YWxsZWdlbmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQuc2V0T3JpZW50YXRpb24oT3JpZW50YXRpb24uSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faG9yaXpvbnRhbGxlZ2VuZC5sYXlvdXRQYXJhbXMud2lkdGggPSBMYXlvdXRQYXJhbXMuV1JBUF9DT05URU5UO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQubGF5b3V0UGFyYW1zLmhlaWdodCA9IDMwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2hvcml6b250YWxsZWdlbmQuZ3Jhdml0eSA9IEdyYXZpdHkuVG9wO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYXJ0LmxheW91dFBhcmFtcy5tYXJnaW4ubWFyZ2luVG9wID0gMzA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jaGFydC5ncmF2aXR5ID0gR3Jhdml0eS5Cb3R0b207XG4gICAgICAgICAgICB0aGlzLmFkZFZpZXcodGhpcy5fY2hhcnQsIDApO1xuICAgICAgICAgICAgdGhpcy5hZGRWaWV3KHRoaXMuX2hvcml6b250YWxsZWdlbmQsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBvbnRvdWNoKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgICAgIGxldCBtZXZlbnQ6IE1vdGlvbkV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KDAsIDAsIDApO1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoc3RhcnRcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RyPSBcIlRvdWNoIHN0YXJ0ZWQgKFwiICsgZXZlbnQudG91Y2hlc1swXS5jbGllbnRYICsgXCIsXCIgKyBldmVudC50b3VjaGVzWzBdLmNsaWVudFkgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQudG91Y2hlc1swXS5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fRE9XTik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGVuZFwiOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX1VQKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNoY2FuY2VsXCI6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYLCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fQ0FOQ0VMKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRvdWNobW92ZVwiOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLCBldmVudC50b3VjaGVzWzBdLmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1ZFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9ET1dOKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9NT1ZFKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfVVApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICAgICAgICAgICAgICAgIG1ldmVudCA9IG5ldyBNb3Rpb25FdmVudChldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZLCBNb3Rpb25FdmVudC5BQ1RJT05fTU9VU0VfT1VUKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbW91c2VvdmVyJzpcbiAgICAgICAgICAgICAgICAgICAgbWV2ZW50ID0gbmV3IE1vdGlvbkV2ZW50KGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9PVkVSKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICAgICAgICAgICAgICBtZXZlbnQgPSBuZXcgTW90aW9uRXZlbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgTW90aW9uRXZlbnQuQUNUSU9OX0NMSUNLKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1ldmVudC5lbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgICAgICAgICAgLy8gZ2V0RWxlbWVudFJlY3QoZTogRWxlbWVudCk6IFJlY3Qge1xuICAgICAgICAgICAgLy8gICAgIHZhciByYyA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIG5ldyBSZWN0KHJjLmxlZnQgKyBwYWdlWE9mZnNldCwgcmMudG9wICsgcGFnZVlPZmZzZXQsIHJjLndpZHRoLCByYy5oZWlnaHQpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdmFyIGVsZW1lbnRyZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbWV2ZW50LnggPSBtZXZlbnQueCAtIGVsZW1lbnRyZWN0LmxlZnQ7XG4gICAgICAgICAgICBtZXZlbnQueSA9IG1ldmVudC55IC0gZWxlbWVudHJlY3QudG9wO1xuICAgICAgICAgICAgdGhpcy5zZW5kRXZlbnQobWV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2VuZEV2ZW50KGV2ZW50OiBNb3Rpb25FdmVudCkge1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQuYWN0aW9uID49IE1vdGlvbkV2ZW50LkFDVElPTl9NT1VTRV9ET1dOKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1vdXNlRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoVG91Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZGlzcGF0Y2hEcmF3KGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kaXNwYXRjaERyYXcoY2FudmFzKTtcbiAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5sYXlvdXRJbmZvLm91dHRlcnJlY3Q7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1JlY3QocmVjdC5zdGFydFBvaW50LCByZWN0LmVuZFBvaW50LCBmYWxzZSwgJ2JsYWNrJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk1lYXN1cmUod2lkdGg6IE1lYXN1cmVTcGVjLCBoZWlnaHQ6IE1lYXN1cmVTcGVjLCBjYW52YXM6IENhbnZhcyk6IFNpemUge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLm9uTWVhc3VyZSh3aWR0aCwgaGVpZ2h0LCBjYW52YXMpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBvbkxheW91dChsOiBudW1iZXIsIHQ6IG51bWJlciwgcjogbnVtYmVyLCBiOiBudW1iZXIsIGNhbnZhczogQ2FudmFzKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5vbkxheW91dChsLCB0LCByLCBiLCBjYW52YXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5sYXlvdXRJbmZvLnJlc2V0KGwsdCxyLGIsdGhpcy5fcGFkZGluZywwKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5b3V0SXRlbSh0aGlzLl9ob3Jpem9udGFsbGVnZW5kLGwsdCxyLGIsY2FudmFzKTtcbiAgICAgICAgICAgIC8vIHRoaXMubGF5b3V0SXRlbSh0aGlzLl9jaGFydCxsLHQrdGhpcy5faG9yaXpvbnRhbGxlZ2VuZC5oZWlnaHQscixiLGNhbnZhcyk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gb25pbnZhbGlkYXRlKCkge1xuICAgICAgICAvLyAgICAgc3VwZXIub25pbnZhbGlkYXRlKCk7XG4gICAgICAgIC8vICAgICB0aGlzLl9jYW52YXMuYmVnaW4oKTtcblxuICAgICAgICAvLyAgICAgdGhpcy5kaXNwYXRjaERyYXcodGhpcy5fY2FudmFzKTtcbiAgICAgICAgLy8gICAgIHRoaXMuX2NhbnZhcy5lbmQoKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIHB1YmxpYyByZXF1ZXN0TGF5b3V0KCkge1xuICAgICAgICAvLyAgICAgdmFyIHdpZHRoOiBNZWFzdXJlU3BlYyA9IG5ldyBNZWFzdXJlU3BlYyh0aGlzLl93LCBMYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UKTtcbiAgICAgICAgLy8gICAgIHZhciBoZWlnaHQ6IE1lYXN1cmVTcGVjID0gbmV3IE1lYXN1cmVTcGVjKHRoaXMuX2gsIExheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQpO1xuICAgICAgICAvLyAgICAgdGhpcy5fY2FudmFzLmJlZ2luKCk7XG4gICAgICAgIC8vICAgICB2YXIgc2l6ZTogU2l6ZSA9IHRoaXMub25NZWFzdXJlKHdpZHRoLCBoZWlnaHQsIHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIC8vICAgICB0aGlzLm9uTGF5b3V0KHRoaXMuX2wsIHRoaXMuX3QsIHRoaXMuX2wgKyBzaXplLndpZHRoLCB0aGlzLl90ICsgc2l6ZS5oZWlnaHQsIHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIC8vICAgICB0aGlzLl9jYW52YXMuZW5kKCk7XG4gICAgICAgIC8vICAgICB0aGlzLm9uaW52YWxpZGF0ZSgpO1xuXG4gICAgICAgIC8vIH1cblxuICAgICAgICBwdWJsaWMgYWRkVmlldyh2aWV3OiBWaWV3LCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICAgICAgc3VwZXIuYWRkVmlldyh2aWV3LCBpbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgfVxufSIsIm5hbWVzcGFjZSBhbmRyb2lkLnRlc3R7XG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50SGFuZGxlcntcbiAgICAgICAgXG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9iYXNlLmQudHNcIiAvPlxuXG5uYW1lc3BhY2UgYW5kcm9pZC50ZXN0e1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGltcG9ydCBWaWV3R3JvdXAgPSAgYW5kcm9pZC52aWV3LlZpZXdHcm91cDtcbiAgICBpbXBvcnQgTGluZWFyTGF5b3V0ID0gYW5kcm9pZC53aWRnZXQuTGluZWFyTGF5b3V0O1xuICAgIGV4cG9ydCBjbGFzcyBMZWdlbmRMYXlvdXQgZXh0ZW5kcyBMaW5lYXJMYXlvdXR7XG4gICAgICAgICAgICBcbiAgICB9XG59Il19
