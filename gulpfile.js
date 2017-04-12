var gulp = require('gulp');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var imgmin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
// **.css **.js index.html  压缩／校验／合并
gulp.task('default', function () {
    // 匹配规则
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], {restore: true});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});
// **.{png,jpg,gif,ico}  只压缩修改的所有图片,已压缩过的图片不再处理
gulp.task('img', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(cache(imgmin({
            optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            progressive: true,  //无损压缩jpg图片
            use: [pngquant()]   //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('dist/img'));
});