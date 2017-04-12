/**
 * 获取url上所有的参数组
 * @return { Array }
 * @value { 未做加密解密处理 }
 */
function GetUrlParms() {
    var args = {};
    var query = location.search.substring(1); //获取查询串
    var pairs = query.split("&"); //在逗号处断开
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); //查找name=value
        if (pos == -1){continue} //如果没有找到就跳过
        var argname = pairs[i].substring(0, pos); //提取name
        var value = pairs[i].substring(pos + 1); //提取value
        args[argname] = value; //存为属性
    }
    return args;
}
/**
 * 获取url上特定的一个参数值 未做加密解密处理
 * @param name
 * @returns {*}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null){return r[2]}else {return null}
}
