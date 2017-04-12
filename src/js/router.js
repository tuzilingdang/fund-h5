/**
 * 一个极简前端路由实现
 * @constructor
 */
function Router() {
    this.routes = {};
    this.currentUrl = '';
}
Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function(){};
};
Router.prototype.refresh = function() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]?this.routes[this.currentUrl]():(this.routes['／']?this.routes['／']():'');
};
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
};
window.Router = new Router();
window.Router.init();
/**
 * 路由方法调用
 */
Router.route('/', function() {
    // todo
});