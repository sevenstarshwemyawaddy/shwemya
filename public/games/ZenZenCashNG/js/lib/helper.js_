//autonomous lib
if (typeof nge === 'undefined')
    nge = {};

if (!nge.Lib)
    nge.Lib = {};

nge.Lib.Helper = {
    /**
     * check each type with 'is' function
     * @param {mixed} variable
     * @returns {Boolean}
     *
     * types = "String|Number|Boolean|Array|Object|Function|RegExp|Date|Error
     *
     * @example nge.Lib.Helper.typeCheck.isArray([1,2,3]) //true
     * @example nge.Lib.Helper.typeCheck.isBoolean('asd') //false
     */
    typeCheck: (function () {
        function is(type, obj) {
            var cls = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && cls === type;
        }

        var i, checkers = {},
            types = "String|Number|Boolean|Array|Object|Function|RegExp|Date|Error".split("|");

        for (i = types.length; i--; )
            checkers["is" + types[i]] = (function (type) {
                return function (obj) {
                    return is(type, obj);
                };
            })(types[i]);

        return checkers;
    })(),

    /**
     *
     * @param {mixed} variable
     * @param {String} type Variable type, optional
     * @param {Object} con Constructor class, optional
     * @param {type} noError No console error flag, optional
     * @returns {undefined}
     */
    validate: function (variable, type, con, noError) {
        var ch = nge.Lib.Helper.typeCheck;

        var msg = function () {
            if (!noError)
                console.error.apply(this, arguments);
        };

        //check incomingVariables at first
        if (
            (type && !ch.isString(type)) ||
            (type && !ch["is" + type]) ||
            (typeof noError !== 'undefined' && !ch.isBoolean(noError))
            )
        {
            msg('validate call error, ', arguments);
            return false;
        }

        //type check
        if (type && !ch["is" + type](variable)) {
            msg('Type error:', variable, 'is not a ' + type);
            return false;
        }

        //instance check
        if (typeof con !== 'undefined' && !(variable instanceof con)) {
            msg('Constructor error:', variable, 'is not a instance of', con);
            return false;
        }

        return true;
    },
    /**
     * Convert an image
     * to a base64 url
     * @param  {Image}   img object
     * @param  {String}   [outputFormat=image/png]
     */
    convertImgToBase64: function (img, outputFormat) {
        if (!this.validate(img, false, Image) || !this.validate(outputFormat, 'String'))
            return;

        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        canvas = null;
        return dataURL;
    },
    /**
     * rowsToColumns
     * @param {Array} rows
     * @returns {Array}
     */
    rowsToColumns: function (rows) {
        var columns = [];
        for (var k in rows) {
            var row = rows[k];
            for (var k1 in row) {
                var el = row[k1];
                if (!columns[k1])
                    columns[k1] = [];
                columns[k1][k] = el;
            }
        }

        return columns;
    },
    /**
     * возврашает массив со всеми возможными комбинациями
     * @param {Object} arr
     * @param {Boolean} permuteFlag
     * @returns {Object}
     */
    arrayAllCombinations: function (arr, permuteFlag) {
        var result = [];
        var cCount = arr.length;
        var col_zn = Math.pow(2, cCount) - 1;

        for (var i = 1; i <= col_zn; i++) {
            var dlina_i_bin = nge.Lib.Helper.decbin(i);
            var zap_str = nge.Lib.Helper.str_pad(dlina_i_bin, cCount, "0", 'STR_PAD_LEFT');
            var zap_dop = nge.Lib.Helper.strrev(zap_str);
            var dooh = [];

            for (var j = 0; j < cCount; j++)
                dooh.push(zap_dop[j]);

            var d = 0;
            var a = [];

            for (var k in dooh) {
                var v = +dooh[k];

                if (v === 1)
                    a.push(arr[d]);

                d++;
            }

            if (permuteFlag && a.length > 1)
                result = nge.Lib.Helper.mergeArrs(
                    result,
                    nge.Lib.Helper.permute(a, true)
                    );
            else
                result.push(a);
        }

        return result;
    },
    /**
     * возврашает массив со всеми возможными перестановками
     * @param {Object} arr
     * @returns {Object}
     */
    permute: function (arr) {
        var prev, curr, el, i;
        var len = arr.length;
        function make(arr, el) {
            var i, i_m, item;
            var len = arr.length;
            var res = [];
            for (i = len; i >= 0; i--) {
                res.push(
                    ([]).concat(
                    arr.slice(0, i),
                    [el],
                    arr.slice(i, i_m)
                    )
                    );
            }

            return res;
        }

        curr = [[arr[0]]];
        for (i = 1; i < len; i++) {
            el = arr[i];
            prev = curr;
            curr = [];
            prev.forEach(function (item) {
                curr = curr.concat(
                    make(item, el)
                    );
            });
        }

        return curr;
    },
    /**
     * php function
     * @param {Number} number
     * @returns {String}
     */
    decbin: function (number) {
        //    input by: pilus
        //    input by: nord_ua
        //   example 1: decbin(12);
        //   returns 1: '1100'
        //   example 2: decbin(26);
        //   returns 2: '11010'
        //   example 3: decbin('26');
        //   returns 3: '11010'

        if (!nge.Lib.Helper.validate(number, 'Number'))
            return;

        if (number < 0)
            number = 0xFFFFFFFF + number + 1;

        return parseInt(number, 10).toString(2);
    },
    /**
     * php function
     * @param {String} string
     * @returns {String}
     */
    strrev: function (string) {
        string = string + '';
        var grapheme_extend =
            /(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]+)/g;
        string = string.replace(grapheme_extend, '$2$1'); // Temporarily reverse
        return string.split('')
            .reverse()
            .join('');
    },
    /**
     * php function
     * @param {String} input
     * @param {Number} pad_length
     * @param {String} pad_string
     * @param {String} pad_type
     * @returns {Object}
     */
    str_pad: function (input, pad_length, pad_string, pad_type) {
        var half = '', pad_to_go;
        var str_pad_repeater = function (s, len) {
            var collect = '', i;
            while (collect.length < len)
                collect += s;
            collect = collect.substr(0, len);
            return collect;
        };
        if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
            pad_type = 'STR_PAD_RIGHT';
        }
        pad_to_go = pad_length - input.length;
        if (pad_to_go > 0) {
            if (pad_type === 'STR_PAD_LEFT') {
                input = str_pad_repeater(pad_string, pad_to_go) + input;
            } else if (pad_type === 'STR_PAD_RIGHT') {
                input = input + str_pad_repeater(pad_string, pad_to_go);
            } else if (pad_type === 'STR_PAD_BOTH') {
                half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
                input = half + input + half;
                input = input.substr(0, pad_length);
            }
        }

        return input;
    },
    /**
     * lead degree zero
     * @param {Number} num
     * @param {Number} count
     * @returns {String}
     */
    LdgZero: function (num, count) {
        var numZeropad = num + '';
        while (numZeropad.length < count) {
            numZeropad = "0" + numZeropad;
        }
        return numZeropad;
    },
    /**
     * deprecated
     * Наследование
     * @param {Object} Child
     * @param {Object} Parent
     * @returns {Boolean}
     */
    extend: function (Child, Parent) {
        var F = function () {
        };
        F.prototype = Parent.prototype;
        Child.prototype = new F;
        Child.prototype.constructor = Child;
        Child.superclass = Parent.prototype;
        return true;
    },
    /**
     * merge two objects
     * @param {Object} obj1
     * @param {Object} obj2
     * @param {Object} newObj optional base object
     * @returns {Object}
     */
    mergeObjs: function (obj1, obj2, newObj) {
        var newObj = (newObj) ? newObj : nge.Lib.Helper.jsObjClone(obj1);
        for (var k in obj2) {
            newObj[k] = obj2[k];
        }
        return newObj;
    },
    /**
     * merge two objects Recursive
     * @param {Object} obj1
     * @param {Object} obj2
     * @returns {Object}
     */
    mergeObjsRecursive: function (obj1, obj2) {
        var newObj = nge.Lib.Helper.jsObjClone(obj1);
        for (var k in obj2) {
            if (typeof obj2[k] === 'object' && typeof obj1[k] === 'object')
                newObj[k] = nge.Lib.Helper.mergeObjsRecursive(obj1[k], obj2[k]);
            else
                newObj[k] = obj2[k];
        }
        return newObj;
    },
    /**
     * merge two arrays
     * @param {Object} a
     * @param {Object} b
     * @returns {Object}
     */
    mergeArrs: function (a, b) {
        var c = a.concat(b.filter(function (item) {
            return a.indexOf(item) < 0;
        }));
        return c;
    },
    /**
     * find all uniq elements in 2 arrays
     * @param {Array} a
     * @param {Array} b
     * @returns {Array}
     */
    arraysUniqElements: function (a, b) {
        var tempObj = {};

        var parseArr = function (ar) {
            for (var i = 0; i < ar.length; i++) {
                if (!tempObj[ar[i]])
                    tempObj[ar[i]] = 1;
                else
                    tempObj[ar[i]]++;
            }
        };

        parseArr(a);
        parseArr(b);

        var result = [];

        for (var k in tempObj)
            if (tempObj[k] === 1)
                result.push(k);

        return result;
    },
    /**
     * определяет окончание для чисел
     * @param {Number} number
     * @param {Array} titles
     * @returns {String}
     * Пример: number+' д'+ Lib.Helper.numberEnd(number, ['ень', 'ня', 'ней']);
     * 13 // 13 дней
     */
    numberEnd: function (number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]];
    },
    /**
     * Проверка на существование урла
     * @param {String} url
     * @returns {Boolean}
     */
    urlExists: function (url) {
        var http = new XMLHttpRequest;
        http.open("HEAD", url, false);
        http.send();
        return http.status === 200;
    },
    /**
     * Рекурсивное задание значения одного из ключей обьекта
     * @param {mixed} key  val1.val2.val3 || [val1, val2, val3]
     * @param {mixed} value
     * @param {Object} obj  {val1:{val2:{val3:...}}}
     * @returns {Boolean}
     */
    recursiveSet: function (key, value, obj) {
        if (typeof key === 'string')
            key = key.split(".");
        var k = key.shift();
        if (key.length > 0) {
            if (!obj[k])
                obj[k] = {};
            nge.Lib.Helper.recursiveSet(key, value, obj[k]);
        } else {
            obj[k] = value;
        }
        return true;
    },
    /**
     * Рекурсивное получение значения одного из ключей обьекта
     * @param {mixed} key  val1.val2.val3 || [val1, val2, val3]
     * @param {Object} obj  {val1:{val2:{val3:...}}}
     * @param {mixed} defaultResult
     * @returns {mixed}
     */
    recursiveGet: function (key, obj, defaultResult) {
        //defaultResult by default is undefined

        if (obj === undefined)
            return defaultResult;

        var value = obj;
        if (typeof key === 'string')
            key = key.split(".");

        for (var k in key) {
            var k1 = key[k];
            if (typeof value[k1] === 'undefined')
                return defaultResult;
            value = value[k1];
        }

        return value;
    },
    /**
     * Рекурсивное удаление значения одного из ключей обьекта
     * @param {mixed} key  val1.val2.val3 || [val1, val2, val3]
     * @param {Object} obj  {val1:{val2:{val3:...}}}
     * @returns {mixed}
     */
    recursiveDelete: function (key, obj) {
        var value = obj;
        if (typeof key === 'string')
            key = key.split(".");
        for (var k = 0; k < key.length; k++) {
            var k1 = key[k];
            if (typeof value[k1] === 'undefined')
                return false;
            if (k === (key.length - 1))
                delete(value[k1]);
            else
                value = value[k1];
        }
        return true;
    },
    /**
     * parseDate
     * @param {String} s '2014-09-15 23:12:00';
     * @returns {Date}
     */
    parseDate: function (s) {
        var re = /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/;
        var m = re.exec(s);
        return m ? new Date(m[1], m[2] - 1, m[3], m[4], m[5], m[6]) : null;
    },
    /**
     * Конвертация из GMT в локальную тайм зону браузера
     * @param {Date} date
     * @returns {Date}
     */
    localizeDate: function (date) {
        var local_date = new Date;
        date.setHours(date.getHours() - local_date.getTimezoneOffset() / 60);
        return date;
    },
    /**
     * capitaliseFirstLetter
     * @param {String} string
     * @returns {String}
     */
    capitaliseFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    /**
     * capitaliseFirstLetter
     * @param {String} string
     * @returns {String}
     */
    lowerFirstLetter: function (string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    },
    /**
     * htmlDecode
     * @param {String} input
     * @returns {String}
     */
    htmlDecode: function (input) {
        var e = document.createElement("div");
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    },
    /**
     * get Random Int (max included)
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * 
     * @param {Number} num
     * @param {Number} min
     * @param {Number} max
     * @returns {Number}
     */
    intMakeBetween: function (num, min, max) {
        return Math.max.apply(Math, [min, Math.min.apply(Math, [max, num])]);
    },
    /**
     * #deprecated
     * @returns {unresolved}
     */
    getWindowName: function () {
        return window.location.hash.substring(1).split("?")[0];
    },
    /**
     * Определение размера обьекта
     *
     * @param {Object} obj
     * @returns {Number}
     */
    getObjSize: function (obj) {
        return Object.keys(obj).length;
    },
    /**
     * Получение гет параметра по имени/ всех гет параметров
     *
     * @param {string} name - имя праметра(необязательный параметр)
     * @returns {Object}
     */
    parseGetParams: function (name) {
        var $_GET = {};
        //var _GET = window.location.hash.substring(1).split("?");
        var _GET = window.location.href.substring(1).split("?");
        if (_GET[1]) {
            var __GET = _GET[1].split("&");
            for (var i = 0; i < __GET.length; i++) {
                var getVar = __GET[i].split("=");
                $_GET[getVar[0]] = typeof getVar[1] === "undefined" ? "" : getVar[1];
            }
        }

        if (!name)
            return $_GET;

        return $_GET[name];
    },
    /**
     * Поиск и замена по строке
     *
     * @param {String} needle
     * @param {String} replacement
     * @param {String} haystack
     * @returns {String}
     */
    strReplace: function (needle, replacement, haystack) {
        var temp = haystack.split(needle);
        return temp.join(replacement);
    },
    /**
     * Принудительная задержка
     *
     * @param {Number} ms
     * @returns {Boolean}
     */
    sleep: function (ms) {
        ms += (new Date).getTime();
        while (new Date < ms) {
        }
        return true;
    },
    /**
     * Клонирование обьекта
     *
     * @param {Object} o
     * @returns {Object}
     */
    jsObjClone: function (o) {
        if (!o || "object" !== typeof o)
            return o;

        var c = "function" === typeof o.pop ? [] : {};
        var p, v;

        if (o.hasOwnProperty) // var a = function(){}; a.prototype = Object.create(null); b = new a(); b.hasOwnProperty //undefined
            for (p in o) {
                if (o.hasOwnProperty(p)) {
                    v = o[p];

                    if (p === "imageSrc")
                        c[p] = v;
                    else if (v && "object" === typeof v)
                        c[p] = nge.Lib.Helper.jsObjClone(v);
                    else
                        c[p] = v;
                }
            }

        return c;
    },
    /**
     * Установка куков
     *
     * @param {String} c_name
     * @param {mixed} value
     * @param {Number} exdays
     * @returns {Boolean}
     */
    setCookie: function (c_name, value, exdays) {
        var exdate = new Date;
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + (exdays === null ? "" : "; expires=" +
            exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
        return true;
    },
    /**
     * Получение куки по заданному имени
     *
     * @param {String} name
     * @returns {mixed}
     */
    getCookie: function (name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
            ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    /**
     * удаление куков
     * @param {String} name
     * @param {String} path
     * @param {String} domain
     * @returns {Boolean}
     */
    deleteCookie: function (name, path, domain) {
        if (this.getCookie(name)) {
            document.cookie = name + "=" + (path ? ";path=" + path : "") +
                (domain ? ";domain=" + domain : "") +
                ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
        return true;
    },
    /**
     * Определение браузера
     *
     * @returns {String}
     */
    browserDetect: function () {
        var ua = navigator.userAgent;
        var tem;
        var uam = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(uam[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (uam[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem !== null)
                return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        var bd = uam[2] ? [uam[1], uam[2]] : [navigator.appName, navigator.appVersion, '-?'];
        var tem = ua.match(/version\/(\d+)/i);
        if (tem !== null)
            bd.splice(1, 1, tem[1]);
        //return M.join(' ');
        return bd[0];
    },
    /**
     * Определение OS
     *
     * @returns {String}
     */
    osDetect: function () {
        var OSName = "Unknown OS";

        if (navigator.appVersion.indexOf("Win") !== -1)
            OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac") !== -1)
            OSName = "MacOS";
        if (navigator.appVersion.indexOf("X11") !== -1)
            OSName = "UNIX";
        if (navigator.appVersion.indexOf("Linux") !== -1)
            OSName = "Linux";

        return OSName;
    },

    /**
     * Определение OS и ее версии
     *
     * @returns {Object} //{os: os, version: osVersion}
     */
    getOsAndVersion: function () {
        var unknown = '-';
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;

        // system
        var os = unknown;
        var clientStrings = [
            {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
            {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
            {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
            {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
            {s: 'Windows Vista', r: /Windows NT 6.0/},
            {s: 'Windows Server 2003', r: /Windows NT 5.2/},
            {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
            {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
            {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
            {s: 'Windows 98', r: /(Windows 98|Win98)/},
            {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
            {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s: 'Windows CE', r: /Windows CE/},
            {s: 'Windows 3.11', r: /Win16/},
            {s: 'Android', r: /Android/},
            {s: 'Open BSD', r: /OpenBSD/},
            {s: 'Sun OS', r: /SunOS/},
            {s: 'Linux', r: /(Linux|X11)/},
            {s: 'iOS', r: /(iPhone|iPad|iPod)/},
            {s: 'Mac OS X', r: /Mac OS X/},
            {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s: 'QNX', r: /QNX/},
            {s: 'UNIX', r: /UNIX/},
            {s: 'BeOS', r: /BeOS/},
            {s: 'OS/2', r: /OS\/2/},
            {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (1[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        return {os: os, version: osVersion};
    },
    /**
     * Определение кол-ва вхождений элемента в массив
     * @param {Array} arr
     * @param {String} pattern
     * @returns {Number}
     */
    occur: function (arr, pattern) {
        var str = "#" + arr.join("#,#") + "#";
        pattern = "#" + pattern + "#";
        var pos = str.indexOf(pattern);
        for (var count = 0; pos !== - 1; count++)
            pos = str.indexOf(pattern, pos + pattern.length);
        return count;
    },
    /**
     * Create RGB object from hex
     * @param {String} hex
     * @returns {Object}
     */
    hexToRgb: function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 0, g: 0, b: 0};
    },
    /**
     * creation image with current color
     * @param {Number} w  width
     * @param {Number} h  height
     * @param {Number} r  0-255
     * @param {Number} g  0-255
     * @param {Number} b  0-255
     * @param {Number} a  0-255
     * @param {Boolean} returnBase64Only
     * @returns {Image}
     */
    createPng: function (w, h, r, g, b, a, returnBase64Only) {
        if (!a) //undefined or null alpha. We do not need textures with 0 aplha
            a = 255;

        var imageData = new Array();
        function Color(r, g, b, a)
        {
            this.red = parseInt(r) % 256;
            this.green = parseInt(g) % 256;
            this.blue = parseInt(b) % 256;
            this.alpha = parseInt(a) % 256;
            return this;
        }

        var color = new Color(r, g, b, a);
        var newColor = String.fromCharCode(color.red, color.green, color.blue, color.alpha);
        var base64 = "data:image/png;base64," + btoa(nge.generatePng(w, h, newColor));

        if (returnBase64Only)
            return base64;

        var img = new Image();
        img.src = base64;
        return img;
    },
    /**
     * creation image 1*1px with current color
     * @param {Number} r  0-255
     * @param {Number} g  0-255
     * @param {Number} b  0-255
     * @param {Number} a  0-255
     * @param {Boolean} returnBase64Only
     * @returns {Image}
     */
    create1PxPng: function (r, g, b, a, returnBase64Only) {
        return nge.Lib.Helper.createPng(1, 1, r, g, b, a, returnBase64Only);
    },
    /*
     * расчет длины отрезка по двум его точкам
     *
     * @param {Object} point1
     * @param {Object} point1
     * @return {Number}
     */
    getLengthBy2Points: function (point1, point2)
    {
        return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) +
            (point2.y - point1.y) * (point2.y - point1.y));
    },
    /*
     * расчет угла по 3-м точкам, вершина - точка2, результат в радианах
     *
     * @param {Object} point1
     * @param {Object} point2
     * @param {Object} point3
     * @return {Number}
     */
    getAngleBy3Points: function (point1, point2, point3)
    {
        var angle = 0;
        var c = nge.Lib.Helper.getLengthBy2Points(point1, point3);
        var a = nge.Lib.Helper.getLengthBy2Points(point1, point2);
        var b = nge.Lib.Helper.getLengthBy2Points(point2, point3);
        if (a !== 0 && b !== 0) {
            var cornerRcos = (a * a + b * b - c * c) / (2 * a * b);
            angle = Math.acos(cornerRcos);
        }

        return angle;
    },
    /**
     * angle radian factor
     * @type Number
     */
    _arFactor: (Math.PI / 180),
    /*
     * получение угла в радианах из угла в градусах
     *
     * @param {Number} angle
     * @return {Number}
     */
    get_radian: function (angle)
    {
        return (angle * nge.Lib.Helper._arFactor);
    },
    /*
     * получение угла в градусах из угла в радианах
     *
     * @param {Number} radian
     * @return {Number}
     */
    get_angle: function (radian)
    {
        return (radian / nge.Lib.Helper._arFactor);
    },
    /**
     *
     * @param {Object} fromObj
     * @param {Object} toObj
     * @returns {Object}
     */
    objectApply: function (fromObj, toObj) {
        for (var k in toObj) {
            var paramTo = toObj[k];
            if (!fromObj[k]) {
                fromObj[k] = paramTo;
            } else if (typeof paramTo === "array" || typeof paramTo === "object") {
                fromObj[k] = nge.Lib.Helper.objectApply(fromObj[k], toObj[k]);
            } else {
                if (toObj[k] !== fromObj[k]) {
                    fromObj[k] = paramTo;
                }
            }
        }

        return fromObj;
    },
    /**
     * check Arrays Partial Entry
     * @param {Object} main
     * @param {Object} partial
     * @returns {Boolean}
     */
    chkArraysPartialEntry: function (main, partial) {
        if (!main || !partial)
            return false;

        main = main.sort();
        partial = partial.sort();

        var kPartial = partial.length - 1;

        for (var i = main.length - 1; i >= 0; i--) {
            if (JSON.stringify(main[i]) === JSON.stringify(partial[kPartial]))
                kPartial--;

            if (kPartial === -1)
                return true;
        }

        return false;
    },
    /**
     * encodeQueryData
     *
     * Usage:
     * var data = { 'first name': 'George', 'last name': 'Jetson', 'age': 110 };
     * var querystring = nge.Lib.Helper.encodeQueryData(data);
     *
     * @param {Object} data
     * @returns {String}
     */
    encodeQueryData: function (data)
    {
        var ret = [];
        for (var d in data)
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        return ret.join("&");
    },
    /**
     * mobileCheck
     * @returns {Boolean}
     */
    mobileCheck: function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
    /**
     * mobileAndTabletCheck
     * @returns {Boolean}
     */
    mobileAndTabletCheck: function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
    /**
     * apply var or array of vars to function
     * @param {Mixed} vars
     * @param {Function} callback
     * @returns {Boolean}
     */
    varOrArrOfVarsChk: function (vars, callback) {
        if (Object.prototype.toString.call(vars) === '[object Array]') {
            for (var i = 0; i < vars.length; i++) {
                callback(vars[i]);
            }

            return false;
        }

        callback(vars);
        return true;
    },
    /**
     * arguments {oblect} (ClassInstance, functionName, param1, param2, ...)
     * needs {Object} obj._logicBlocks;
     * creates {Object} obj._logicBlocksInstances;
     * @returns {Array|nge.Lib.Helper.do.results}
     */
    logicBlocksDo: function () {
        var params = Array.prototype.slice.call(arguments);
        var entity = params.shift();
        var funcName = params.shift();

        //if no instances we will create them
        if (!entity._logicBlocksInstances) {
            entity._logicBlocksInstances = {};
            for (var k in entity._logicBlocks) {
                var name = entity._logicBlocks[k];
                var nameCap = nge.Lib.Helper.capitaliseFirstLetter(name);
                entity._logicBlocksInstances[name] = entity.getInstance(nameCap);
            }
        }

        var results = [];
        //game
        for (var name in entity._logicBlocksInstances) {
            if (entity._logicBlocksInstances[name][funcName]) {
                var res = entity._logicBlocksInstances[name][funcName].apply(this, params);
                results.push(res);
            }
        }

        return results;
    },
    /**
     * find key in object for searching element in function
     * @param {Object} obj
     * @param {Function} func
     * @returns {string|Boolean} element key or boolean
     */
    objFind: function (obj, func) {
        for (var k in obj) {
            var res = func(obj[k], k, obj);
            if (res)
                return k;
        }

        return false;
    },
    /**
     * find element in object
     * @param {Object} obj
     * @param {Function} func
     * @returns {string|Boolean} element key or boolean
     */
    objFindEl: function (obj, func) {
        var k = nge.Lib.Helper.objFind(obj, func);

        if (k)
            return obj[k];

        return undefined;
    },
    /**
     * функция для сложного рекурсивного поска по обьектам
     * @param {mixed} key  val1.val2.val3 || [val1, val2, val3]
     * @param {mixed} value
     * @param {String} childrenKeyName
     * @param {Object} parent
     * @param {Boolean} incompleteCompliance
     * @param {Boolean} findOne
     * @param {Boolean} eject
     * @returns {mixed}
     */
    customRecursiveFind: function (key, value, childrenKeyName, parent, incompleteCompliance, findOne, eject) {
        if(!findOne)
            var arr = [];

        var simpleKey = key.indexOf('.')===-1 ? true : false;

        var removeEmpty = function (arr) {
            var filtered = arr.filter(function (elem) {
                return elem !== undefined && elem !== null;
            });

            return filtered;
        };

        var f = function (els, n) {
            var k, el, elVBK;

            for (k = 0; k < els.length; k++) {
                el = els[k];
                elVBK = (simpleKey) ? el[key] : nge.Lib.Helper.recursiveGet(key, el); //value by key

                if (
                        elVBK === value ||
                        (incompleteCompliance && typeof elVBK !== "undefined" && elVBK && elVBK.indexOf(value) !== -1)
                    ) {
                    if (eject)
                        delete els[k];

                    if (findOne)
                        return el;
                    else
                        arr.push(el);
                }

                if (el[childrenKeyName] && el[childrenKeyName].length > 0)
                {
                    var res = f(el[childrenKeyName], n);

                    if (res){
                        if (eject)
                            el[childrenKeyName] = removeEmpty(el[childrenKeyName]);

                        if (findOne)
                            return res;
                    }
                }
            }

            return false;
        };

        return f([parent], value) || ((findOne) ? false : arr);
    },

    /**
     * checkSuffix('asdasdasd_button', '_button'))
     * @param {String} str
     * @param {String} suffix
     * @returns {Boolean}
     */
    checkSuffix: function (str, suffix) {
        var match = str.match(suffix + "$");

        if (match && match[0])
            return match[0] === suffix;

        return false;
    },
    /**
     * get Suffix
     * @param {String} str   //'asdasdasd_button'
     * @returns {String} //'_button'
     */
    getSuffix: function (str) {
        var array = str.split('_');
        return (array.length > 1) ? array[(array.length - 1)] : false;
    },
    /**
     * up chances of object to be getted by garbage collector
     * @param {Object} obj
     * @param {Boolean} phaserObjectFlag
     * @returns {undefined}
     */
    objectDelete: function (obj, phaserObjectFlag) {
        if (phaserObjectFlag) {
            obj.destroy(true);
            obj.game = false;
        }

        obj = null;
        //delete obj;
        return null;
    },
    /**
     * waitForWebfontsLoading
     * @param {Object} fonts  //array of fonts names
     * @param {Function} callback
     * @returns {undefined}
     */
    waitForWebfonts: function (fonts, callback) {
        var waitForFont = function (font) {
            var deferred = $.Deferred();
            var node = document.createElement('span');
            node.innerHTML = 'giItT1WQy@!-/#';
            node.style.position = 'absolute';
            node.style.left = '-10000px';
            node.style.top = '-10000px';
            node.style.fontSize = '300px';
            node.style.fontFamily = 'sans-serif';
            node.style.fontVariant = 'normal';
            node.style.fontStyle = 'normal';
            node.style.fontWeight = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            var beforewidth = node.offsetWidth;
            node.style.fontFamily = font;

            var condition = function () {
                if (!node)
                    return true;

                if (node.offsetWidth === beforewidth)
                    return false;

                node.parentNode.removeChild(node);
                node = null;
                return true;
            };

            var checkerCallback = function () {
                deferred.resolve(font);
            };

            nge.Lib.Checker.delay(condition, checkerCallback, 500, 20, true);
            return deferred;
        };

        var promises = [];
        for (var i = 0; i < fonts.length; i++) {
            promises.push(waitForFont(fonts[i]));
        }

        $.when.apply($, promises).then(function () {
            callback();
        });
    },
    /**
     * check is Font Available //at first call function generates and makes first call
     * @param {String} fontFamily  //array of fonts names
     * @returns {Boolean}
     */
    isFontAvailable: (function () {

        var generateFunction = function () {
            var width;
            var body = document.body;

            var container = document.createElement('span');
            container.innerHTML = Array(100).join('wi');
            container.style.cssText = [
                'position:absolute',
                'width:auto',
                'font-size:128px',
                'left:-99999px'
            ].join(' !important;');

            var getWidth = function (fontFamily) {
                container.style.fontFamily = fontFamily;

                body.appendChild(container);
                width = container.clientWidth;
                body.removeChild(container);

                return width;
            };

            // Pre compute the widths of monospace, serif & sans-serif
            // to improve performance.
            var monoWidth = getWidth('monospace');
            var serifWidth = getWidth('serif');
            var sansWidth = getWidth('sans-serif');

            var checked = [];

            return function (font) {
                if (checked.indexOf(font) !== -1)
                    return true;

                var res = monoWidth !== getWidth(font + ',monospace') ||
                    sansWidth !== getWidth(font + ',sans-serif') ||
                    serifWidth !== getWidth(font + ',serif');

                if (res)
                    checked.push(font);

                return res;
            };
        };

        if (document.body)
            return generateFunction();
        else
            document.addEventListener("DOMContentLoaded", function () {
                nge.Lib.Helper.isFontAvailable = generateFunction();
            });

    })(),
    /**
     *
     * @param {String} filename
     * @param {String} filetype
     * @param {Function} callback
     * @returns {undefined}
     */
    loadJsCssFile: function (filename, filetype, callback) {
        if (filetype === "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        } else if (filetype === "css") { //if filename is an external CSS file
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }

        if (fileref && callback)
            fileref.onload = fileref.onreadystatechange = callback;


        if (typeof fileref !== "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
    },
    /**
     * get max document Z index
     * @returns {Number}
     */
    getMaxZIndex: function () {
        return Math.max.apply(null,
            $.map($('body *'), function (e, n) {
                if ($(e).css('position') !== 'static')
                    return parseInt($(e).css('z-index')) || 1;
            }));
    },
    /**
     * makes objects key reactive
     * @param {Object} obj
     * @param {String} key
     * @param {Function} callback
     * @returns {Boolean}
     */
    makeReactive: function (obj, key, callback) {
        var targetObject = obj;
        var descriptor = Object.getOwnPropertyDescriptor(targetObject, key);

        while (!descriptor && targetObject.__proto__) {
            targetObject = targetObject.__proto__;
            var descriptorTemp = Object.getOwnPropertyDescriptor(targetObject, key);

            if (descriptorTemp && (descriptorTemp.value || descriptorTemp.set || descriptorTemp.get))
                descriptor = descriptorTemp;
        }

        if (!descriptor)  // bad descriptors and its IOS mobile
            return false;

        var setter = descriptor.set;

        descriptor.set = function (v) {
            if (setter)
                setter.call(obj, v);

            callback.call(obj, v);
        };

        Object.defineProperty(obj, key, descriptor);
        return true;
    },
    /**
     * check if value is number
     * @param {mixed} n
     * @returns {Boolean}
     */
    isNumeric: function (n) {
        if (n.match(/^-{0,1}\d+$/)) {
            return true;
        } else if (n.match(/^-{0,1}\d+\.\d+$/)) {
            return true;
        }

        return false;
    },
    /**
     * check if text is JSON
     * @param {String} text
     * @returns {Boolean}
     */
    isTextJson: function (text) {
        try {
            JSON.parse(text);
        } catch (e) {
            return false;
        }
        return true;
    },
    isBase64: function (str) {
        if (str === '' || str.trim() === '') {
            return false;
        }

        if (str.indexOf('data:image') === 0) {
            return true;
        }

        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    }
};
