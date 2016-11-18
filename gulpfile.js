"use strict"

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),        // Наблюдение за изменениями файлов
    prefixer    = require('gulp-autoprefixer'), // Автоматически добавляет вендорные префиксы к CSS свойствам
    uglify      = require('gulp-uglify'),       // Сжимать наш JS
    concat      = require('gulp-concat'),       // Подключаем gulp-concat (для конкатенации файлов)
    rigger      = require('gulp-rigger'),       // Позволяет импортировать один файл в другой простой конструкцией
    sass        = require('gulp-sass'),         // для компиляции нашего SCSS кода
    sourcemaps  = require('gulp-sourcemaps'),   // Для генерации css sourscemaps, помогает нам при отладке кода
    cssmin      = require('gulp-minify-css'),   // Сжатие CSS кода
    imagemin    = require('gulp-imagemin'),     // Сжатие картинок
    pngquant    = require('imagemin-pngquant'), // Сжатие картинок | работа с PNG
    rename      = require('gulp-rename'),       // Подключаем библиотеку для переименования файлов
    cache       = require('gulp-cache'),        // Подключаем библиотеку кеширования
    sftp        = require('gulp-sftp'),
    spritesmith = require('gulp.spritesmith'),
    plumber     = require('gulp-plumber');      // Ловим ошибки, чтобы не прервался watch


// пути
var path = {
    build: {
        js:            'local/templates/rudenta/js/',
        styles:        'local/templates/rudenta/css/',
        images:        'local/templates/rudenta/images/',
        fonts:         'local/templates/rudenta/fonts/',
        libs:          'local/templates/rudenta/libs/'
    },
    src: {
        js:            'src/js/*.js',
        styles:        'src/styles/*.+(sass|scss|css)',
        images:        'src/images/**/*.*',
        sprite:        'src/sprite/*.*',
        spriteTemplate:'src/sass.template.mustache',
        fonts:         'src/fonts/**/*.*',
        stylesPartials:'src/styles/partials/'
    },
    watch: {
        sprite:        'src/sprite/*.*',
        js:            'src/js/*.js',
        styles:        'src/styles/*.+(sass|scss|css)',
        images:        'src/images/**/*.*',
        fonts:         'src/fonts/**/*.*'
    }
};
// javascript
gulp.task('js:build', function () {
    gulp.src([path.src.js])
        .pipe(plumber())
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(sourcemaps.write())
        .pipe(concat('main.min.js' , {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(plumber.stop())
        .pipe(sftp({
          host: 'p10210.cpanel.relevate.ru',
          user: 'p10210',
          pass: 'CHgGUti7uz',
          remotePath: '/home/p10210/public_html/local/templates/rudenta/js/'
        }));
});
//libs
gulp.task('libs:build', function() {
    gulp.src([ // Берем все необходимые библиотеки
        'src/libs/jquery/dist/jquery.min.js', // Берем jQuery
        'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js', // Берем Magnific Popup
        'src/libs/gsap/src/minified/TweenMax.min.js',
        'src/libs/jquery-selectric/public/jquery.selectric.js',
        'src/libs/smoothscroll-for-websites/SmoothScroll.js',
        'src/libs/jquery.nicescroll/dist/jquery.nicescroll.min.js',
        'src/libs/all.js',
        'src/libs/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
        'src/libs/scrollmagic/scrollmagic/minified/plugins/jquery.ScrollMagic.min.js',
        'src/libs/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
        'src/libs/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
        ])
        .pipe(plumber())
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('local/templates/rudenta/libs/')) // Выгружаем в папку app/js
        .pipe(sftp({
          host: 'p10210.cpanel.relevate.ru',
          user: 'p10210',
          pass: 'CHgGUti7uz',
          remotePath: '/home/p10210/public_html/local/templates/rudenta/libs/'
        }));
});
// move custom fonts to build
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// imagesss
gulp.task('image:build', function () {
    gulp.src(path.src.images)
        .pipe(plumber())
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.images))
        .pipe(sftp({
          host: 'p10210.cpanel.relevate.ru',
          user: 'p10210',
          pass: 'CHgGUti7uz',
          remotePath: '/home/p10210/public_html/local/templates/rudenta/images/'
        }));
});
// styles
gulp.task('styles:build', function () {
    gulp.src(path.src.styles)               // Выберем наш .sass|scss
        .pipe(plumber())
        .pipe(sourcemaps.init())            // То же самое что и с js
        .pipe(sass())                       // Скомпилируем
        .pipe(prefixer(['last 15 versions', 'IE 8'], { cascade: true }))                   // Добавим вендорные префиксы
        .pipe(concat('template_styles.min.css'))
        .pipe(cssmin())
        .pipe(sourcemaps.write())           // Пропишем карты
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.styles)) // И в build
        .pipe(sftp({
          host: 'p10210.cpanel.relevate.ru',
          user: 'p10210',
          pass: 'CHgGUti7uz',
          remotePath: '/home/p10210/public_html/local/templates/rudenta/css/'
        }));
});
gulp.task('sprite:build', function() {
    var spriteData =
        gulp.src(path.src.sprite)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 4,
                cssTemplate: path.src.spriteTemplate,
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));
    spriteData.img.pipe(gulp.dest(path.build.images));
    spriteData.css.pipe(gulp.dest('src/styles/other'));
    spriteData.img.pipe(sftp({
          host: 'p10210.cpanel.relevate.ru',
          user: 'p10210',
          pass: 'CHgGUti7uz',
          remotePath: '/home/p10210/public_html/local/templates/rudenta/images/'
        }));
});
gulp.task('build', [
    'libs:build',
    'sprite:build',
    'js:build',
    'fonts:build',
    'image:build',
    'styles:build'
]);

gulp.task('watch', function(){
    gulp.watch(path.watch.js,     ['js:build']);
    gulp.watch(path.watch.styles, ['styles:build']);
    gulp.watch(path.watch.images, ['image:build']);
    gulp.watch(path.watch.fonts,  ['fonts:build']);
    gulp.watch(path.watch.sprite, ['sprite:build']);
});

gulp.task('default', ['build', 'watch']);