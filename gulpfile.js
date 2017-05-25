var gulp = require('gulp');
var minify = require('gulp-minify');
var sass = require('gulp-sass'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    cleanCss = require('gulp-clean-css'),
    sequence = require('gulp-sequence'),
    watch = require('gulp-watch');

var revCollector = require('gulp-rev-collector');

gulp.task('clean', function() {
    return gulp.src('build/*')
        .pipe(clean());
});

gulp.task('css', function() {
    return gulp.src('app/**/*.css')
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(gulp.dest('build'))
        .pipe(rev.manifest({
            base: 'build',
            merge: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
    return gulp.src('app/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('build'))
        .pipe(rev.manifest({
            base: 'build',
            merge: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('rev', function() {
    return gulp.src(['rev-manifest.json', 'app/**/*.html'])
        .pipe(revCollector({
            replaceReved:true,
        }))
        .pipe(gulp.dest('build'));
})

gulp.task('default', function(cb) {
    sequence('clean', ['js', 'css'], 'rev')(cb);
});