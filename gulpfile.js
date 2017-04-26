/**
 * @Date:   2017-04-16T22:29:13+08:00
 * @Last modified time: 2017-04-21T06:26:01+08:00
 */



// 获取 gulp
var gulp = require('gulp'),
// 获取 gulp-ruby-sass 模块
 sass = require('gulp-ruby-sass'),
compass   = require('gulp-compass');
//var del = require("del"); // 文件清除

// 编译sass
// 在命令行输入 gulp sass 启动此任务
gulp.task('sass', function() {
    return sass('./src/sass/')
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('./src/css/my/'))
});

// 1. 清除css文件夹
// gulp.task("css_clear", function() {
//     del([  "src/css/*.css"+"src/css/*.map"])
// })

gulp.task('compass',function(){
   return gulp.src('src/sass/*.scss')
        .pipe(compass({
            sourcemap: true,
            time: true,
      css: 'src/css/my/',
      sass: 'src/sass/',
      style: 'compact'
        }))
        .pipe(gulp.dest('src/css/my/'));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 images 任务
    //   gulp.watch('./src/sass/*.scss', ['css_clear','compass',])
    gulp.watch('./src/sass/*.scss', ['compass'])
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 sass 任务和 auto 任务
gulp.task('default', ['compass','auto'])
