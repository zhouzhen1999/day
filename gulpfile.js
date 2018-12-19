let gulp = require("gulp");
let sass = require("gulp-sass");
let server = require("gulp-webserver");
let datas = require("./src/mock/data.json");
let url = require("url");
let path = require("path");
let fs = require("fs");

//编译scss
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});



gulp.task("devServer", function() {
        return gulp.src("src")
            .pipe(server({
                port: 9009,
                open: true,
                middleware: function(req, res, next) {
                    let pathname = url.parse(req.url).pathname;
                    if (pathname == "/api/list") {
                        res.end(JSON.stringify({ "code": 0, data: list }))
                    } else if (pathname == "/favicon.ico") {
                        return
                    } else {
                        pathname = pathname == "/" ? "index.html" : pathname;
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    }
                }
            }))
    })
    //监听sass
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"))
})