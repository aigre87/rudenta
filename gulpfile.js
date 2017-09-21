"use strict"

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rigger      = require('gulp-rigger'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssmin      = require('gulp-minify-css'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    rename      = require('gulp-rename'),
    cache       = require('gulp-cache'),
    sftp        = require('gulp-sftp'),
    ftp         = require('gulp-ftp'),
    gutil       = require('gulp-util'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite   = require('gulp-svg-sprite'),
    //svgSprites  = require('gulp-svg-sprites'),
    svgmin      = require('gulp-svgmin'),
    cheerio     = require('gulp-cheerio'),
    replace     = require('gulp-replace'),
    plumber     = require('gulp-plumber');


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
        js:                 'src/js/*.js',
        styles:             'src/styles/*.+(sass|scss|css)',
        images:             'src/images/**/*.*',
        svg:                'src/svgIcons/*.svg',
        sprite:             'src/sprite/*.*',
        spriteTemplate:     'src/sass.template.mustache',
        svgSpriteTemplate:  'src/_sprite_template.scss',
        fonts:              'src/fonts/**/*.*',
        stylesPartials:     'src/styles/partials/'
    },
    watch: {
        sprite:        'src/sprite/*.*',
        svg:           'src/svgIcons/*.svg',
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
        .pipe(concat('main.min.js' , {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(plumber.stop())
        .pipe(sftp({
          host: 'p10298.cpanel.relevate.ru',
          user: 'p10298',
          pass: 'Ez3}&JC+lDJX',
          timeout: 50000,
          remotePath: '/home/p10298/www/local/templates/rudenta/js/'
        }))
        .pipe(gutil.noop());
});
//libs
gulp.task('libs:build', function() {
    gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'src/libs/gsap/src/minified/TweenMax.min.js',
        'src/libs/gsap/src/minified/plugins/ColorPropsPlugin.min.js',
        'src/libs/gsap/src/minified/plugins/ScrollToPlugin.min.js',
        'src/libs/jquery-selectric/public/jquery.selectric.js',
        'src/libs/smoothscroll-for-websites/SmoothScroll.js',
        'src/libs/jquery.nicescroll/dist/jquery.nicescroll.min.js',
        'src/libs/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
        'src/libs/shufflejs/dist/shuffle.min.js',
        'src/libs/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js',
        'src/libs/jquery.inputmask/dist/inputmask/inputmask.extensions.js',
        'src/libs/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions.js',
        'src/libs/svg4everybody/dist/svg4everybody.min.js',
        'src/libs/hammerjs/hammer.min.js',
        'src/libs/video.js/dist/video.min.js',
        'src/libs/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
        'src/libs/scrollmagic/scrollmagic/minified/plugins/jquery.ScrollMagic.min.js',
        'src/libs/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
        'src/libs/owl.carousel/dist/owl.carousel.min.js',
        'src/libs/Snap.svg/dist/snap.svg-min.js',
        'src/libs/all.js'
        //'src/libs/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
        ])
        .pipe(plumber())
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('local/templates/rudenta/libs/'))
        .pipe(sftp({
          host: 'p10298.cpanel.relevate.ru',
          user: 'p10298',
          pass: 'Ez3}&JC+lDJX',
          timeout: 50000,
          remotePath: '/home/p10298/www/local/templates/rudenta/libs/'
        }))
        .pipe(gutil.noop());
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
          host: 'p10298.cpanel.relevate.ru',
          user: 'p10298',
          pass: 'Ez3}&JC+lDJX',
          timeout: 50000,
          remotePath: '/home/p10298/www/local/templates/rudenta/images/'
        }))
        .pipe(gutil.noop());
        
});
// styles
gulp.task('styles:build', function () {
    gulp.src(path.src.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefixer(['last 15 versions', 'IE 8'], { cascade: true }))
        .pipe(concat('template_styles.min.css'))
        .pipe(cssmin())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.styles))
        .pipe(sftp({
          host: 'p10298.cpanel.relevate.ru',
          user: 'p10298',
          pass: 'Ez3}&JC+lDJX',
          timeout: 50000,
          remotePath: '/home/p10298/www/local/templates/rudenta/css/'
        }))
        .pipe(gutil.noop());
});

/*svg*/
gulp.task('svgSprite:build', function () {
    return gulp.src(path.src.svg)
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg",
                }
            }
        })) 
        .pipe(gulp.dest(path.build.images))
        .pipe(sftp({
            host: 'p10298.cpanel.relevate.ru',
            user: 'p10298',
            pass: 'Ez3}&JC+lDJX',
            timeout: 50000,
            remotePath: '/home/p10298/www/local/templates/rudenta/images/'
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
        host: 'p10298.cpanel.relevate.ru',
        user: 'p10298',
        pass: 'Ez3}&JC+lDJX',
        timeout: 50000,
        remotePath: '/home/p10298/www/local/templates/rudenta/images/'
    }))
    spriteData.img.pipe(gutil.noop());
});
gulp.task('build', [
    'libs:build',
    'sprite:build',
    'svgSprite:build',
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
    gulp.watch(path.watch.svg, ['svgSprite:build']);
});

gulp.task('default', ['build', 'watch']);