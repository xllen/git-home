var gulp = require("gulp");

//less编译 合并 压缩
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");

gulp.task("style",function () {
	gulp.src(["src/css/*.less","!src/css/_*.less"])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.reload({
			stream:true
		}));
}); 

//js合并 压缩 混淆
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
gulp.task("scripts",function () {
	gulp.src("src/js/*.js")
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.reload({
			stream:true
		}));
});

//html压缩
var htmlmin = require("gulp-htmlmin");
gulp.task("html",function () {
	gulp.src("src/*.html")
		.pipe(htmlmin({
			removeComments: true,//清除HTML注释
        	collapseWhitespace: true//压缩HTML
		}))
		.pipe(gulp.dest("dist"))
		.pipe(browserSync.reload({
			stream:true
		}));
});

//图片复制
gulp.task("images",function () {
	gulp.src("src/img/*.*")
		.pipe(gulp.dest("dist/img"))
		.pipe(browserSync.reload({
			stream:true
		}));
});

//创建本地服务器 
var browserSync = require("browser-sync");
gulp.task("serve",function () {
	browserSync.init({
		server: {
			baseDir:['./dist']
	}}, function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch("src/css/*.less",['style']);
	gulp.watch("src/js/*.js",['scripts']);
	gulp.watch("src/*.html",['html']);
	gulp.watch("src/img/*.*",['images']);

});