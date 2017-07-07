import Vue from 'vue'

var toString = Object.prototype.toString;
function isType(type){
	return function(el){
		return Object.prototype.toString.call(el) === '[object '+type+']'
	}
}
var isArray = isType('Array')
var isObject = isType('Object')
var isFunction = isType('Function')
var isString = isType('String')
var isNumber = isType('Number');
var isBoolean = isType('Boolean');

var isUndefined = function(obj){
	return typeof obj === 'undefined'
}
exports.isArray = isArray
exports.isObject = isObject
exports.isFunction = isFunction
exports.isString = isString
exports.isUndefined = isUndefined
exports.isNumber = isNumber
exports.isBoolean = isBoolean

function isEmptyObject(obj){
	return Object.keys(obj).length === 0
}
exports.isEmptyObject = isEmptyObject

function mergeDeep(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                    mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
}

exports.merge = mergeDeep


var copy = function(target) {
    return JSON.parse(JSON.stringify(target))
}

exports.copy = copy


/**
 * 获取环境信息
 * @return {Object} 环境信息对象
 */
function getEnv() {
    var nav = window.navigator;
    var env = {
        "iphone":false
        ,"ipad":false
        ,"android":false
        ,"pc":false
        ,"ios":false
        ,"ver":"0"
    };

    var ua = nav.userAgent;
    var android = ua.match(/(Android)\s+([\d.]+)/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    if (ipad) {
        env.ipad = ipad[1] && true || false;
        env.ver = ipad[2] && ipad[2].replace(/-/g,".") || "";
        env.ios = true;
    } else if (iphone) {
        env.iphone = iphone[1] && true || false;
        env.ver = iphone[2] && iphone[2].replace(/-/g,".") || "";
        env.ios = true;
    } else if (android) {
        env.android = android[1] && true || false;
        env.ver = android[2];
    } else {
        env.pc = true;
    }

    return env;
}

var ENV = getEnv();

exports.env = ENV;

// cookie写操作，过期时间单位(s)
exports.setCookie = function(name, value, config){
    config = exports.merge({
        path: '/'
    }, config || {})
    var defVal = {
        path: '/'
    }
    var cookie = [name + '=' + value]
    Object.keys(config).forEach(function(key) {
        if (key === 'expires' && config.expires) {
            return cookie.push('expires=' + new Date(+new Date() + config.expires * 24 * 3600 * 1000).toGMTString())
        }
        cookie.push(key + '=' + (config[key] || defVal[key] || ''))
    })
    return document.cookie = cookie.join(';')
}

exports.getCookie = function(name){
    return document.cookie.replace(new RegExp('.*(?:^|; )' + name + '=([^;]*).*|.*'), '$1')
}

exports.removeCookie = function(name, path){
    path = path || '/'
    // expires=Thu, 01 Jan 1970 00:00:00 GMT
    var value = exports.getCookie(name)
    if(value){
        return document.cookie = name + '=' + value + '; expires=' + 'Thu, 01 Jan 1970 00:00:00 GMT; path=' + path
    }
}
