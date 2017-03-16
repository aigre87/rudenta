Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
function getRandom(min, max) {
  return min + Math.random() * (max - min);
}


// Define variable colors    
function setRandomGradient($items, colorsArray){
    $items.each(function() {
        
        // First random color
        var rand1 = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        // Second random color
        var rand2 = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        
        var grad = $(this);
        
        // Convert Hex color to RGB
        function convertHex(hex,opacity){
            hex = hex.replace('#','');
            r = parseInt(hex.substring(0,2), 16);
            g = parseInt(hex.substring(2,4), 16);
            b = parseInt(hex.substring(4,6), 16);
            
            // Add Opacity to RGB to obtain RGBA
            result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
            return result;
        }
        
        // Gradient rules
        grad.css('background-color', convertHex(rand1,40) );
        grad.css("background-image", "-webkit-gradient(linear, left top, left bottom, color-stop(0%,"+ convertHex(rand1,40) +"), color-stop(100%,"+ convertHex(rand2,40) +"))");
        grad.css("background-image", "-webkit-linear-gradient(top,  "+ convertHex(rand1,40) +" 0%,"+ convertHex(rand2,40) +" 100%)");
        grad.css("background-image", "-o-linear-gradient(top, "+ convertHex(rand1,40) +" 0%,"+ convertHex(rand2,40) +" 100%)");
        grad.css("background-image", "-ms-linear-gradient(top, "+ convertHex(rand1,40) +" 0%,"+ convertHex(rand2,40) +" 100%)");
        grad.css("background-image", "linear-gradient(to bottom, "+ convertHex(rand1,40) +" 0%,"+ convertHex(rand2,40) +" 100%)");
        grad.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+ convertHex(rand1,40) +"', endColorstr='"+ convertHex(rand2,40) +"',GradientType=0 )");
        
    });
}



/*functions END*/


var xhr,
    myGlobalForHomepageMainSlider = false,
    myGlobalisMobileDevice = false,
    isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

window.mobileAndTabletcheck = function() {
  myGlobalisMobileDevice = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) myGlobalisMobileDevice = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return myGlobalisMobileDevice;
};
mobileAndTabletcheck();
if( myGlobalisMobileDevice ){
    $("html").attr("id", "mobile");
}
function setFooterPadding(){
    var h = $("footer").outerHeight();
    $("#mainWrapper").css({"padding-bottom": h});
}



function optionSelect($element){
    if( myGlobalisMobileDevice ){ return false; }
    var $s = $element.find("select");
    $('select').selectric({
        disableOnMobile: false
    });
    var $ss = $s.closest(".selectric-wrapper").find(".selectric-scroll")
    $ss.niceScroll({
        cursorcolor: '#1bbee8',
        cursorwidth: '5px',
        cursorborderradius: '2px',
        cursorborder: '0px solid #1bbee8',
        background: 'transparent',
        scrollspeed: 70,
        mousescrollstep: 50,
        railoffset: {top: 0, right: 0, left: 0, bottom: 0},
        cursoropacitymin: 1,
        cursoropacitymax: 1,
        horizrailenabled: false,
        zindex: 2,
        nativeparentscrolling: true,
        autohidemode: false
    });
};
function customizeRadiobox($element){
    var $rBox = $element.find("input[type='radio']");
    if( !$rBox.length > 0 ){return false;}
    $rBox.each(function(){
        $(this).wrap("<span class='custom-radiobox' />").after('<span class="box"><span class="dot"></span></span>');
    });
}
function customizeCheckbox( $element ){
    var $cBox = $element.find("input[type='checkbox']");
    if( !$cBox.length > 0 ){return false;}
    $cBox.each(function(){
        $(this).wrap("<span class='custom-checkbox' />").after('<span class="box"><span class="tick"></span></span>');
    });
};
function HPblueLinksBlock(){
    var mas=[];
    $(".blueBlockLinks>a").each(function(){
        mas.push($(this).outerHeight());
    });
    var maxH = mas.max();
    $(".blueBlockLinks>a").css({ height : maxH });
}
function HPmainSlider(){
    if( !$("#hp_slider").length > 0 ){ return false }
    var $block = $("#hp_slider"),
        $slides = $block.find(".slide"),
        slidesCount = $slides.length,
        cur,
        aniTime = 0.5,
        aniDist = 500;

    function initSlider(){
        TweenMax.set($('body'), {perspective:500});
        cur = ($slides.filter(".current").length>0 ? $slides.filter(".current").index() : 0 );
        if( cur === 0 ){
          nextCurIndex = cur+1;
          prevIndex = cur-1;
        }else if( cur === slidesCount-1 ){
          nextCurIndex = 0;
          prevIndex = slidesCount-2;
        }else if( cur !== 0 ){
          nextCurIndex = cur+1;
          prevIndex = cur-1;
        }
        var random1 = getRandom(-5, 5);
            random2 = getRandom(-5, 5);
            random3 = getRandom(-5, 5);

        TweenMax.set( $slides, { transformOrigin:'50% 50%', autoAlpha: 0, z :1 });
        TweenMax.set( $slides.eq(cur), { rotation: random1, zIndex : 2, className:"+=current", autoAlpha: 1, x:0 });
        TweenMax.set( $slides.eq(cur).find(".desc"), { rotation: -random1});
        TweenMax.set( $slides.eq(nextCurIndex), { rotation: random2, x: aniDist, scale: 0.5, zIndex: 1, autoAlpha: 1 });
        TweenMax.set( $slides.eq(prevIndex), { rotation: random3, x: -aniDist, scale: 0.5, zIndex:1, autoAlpha: 1 });
    }
    initSlider();

    function slide(dir){
        curIndex = $slides.filter(".current").index();
        var nextIndex,
            prevIndex,
            newIndex;

        if((dir === "right") && (curIndex !== slidesCount-1)){
          nextIndex = curIndex+1;
          prevIndex = curIndex-1;
          newShowIndex = curIndex+2;
        }else if((dir === "right") && (curIndex === slidesCount-1)){
          nextIndex = 0;
          prevIndex = slidesCount-2;
          newShowIndex = 1;
        }else if((dir === "left") && (curIndex !== 0)){
          nextIndex = curIndex-1;
          prevIndex = curIndex+1;
          newShowIndex = curIndex-2;
          if( curIndex === slidesCount-1 ){
            nextIndex = slidesCount-2;
            prevIndex = 0;
            newShowIndex = slidesCount-3;
          }
        }else if((dir === "left") && (curIndex === 0)){
          nextIndex = slidesCount-1;
          prevIndex = curIndex+1;
          newShowIndex = slidesCount-2;
        }

        var random1 = getRandom(-5, 5);
            random2 = getRandom(-5, 5);
            random3 = getRandom(-5, 5);
            random4 = getRandom(-5, 5);

        var xFrom;
        if( (dir === "right") ){
            xFrom = aniDist;
        }else{
            xFrom = -aniDist;
        }

        if( newShowIndex > slidesCount-1 ){
            newShowIndex = 0;
        }
        if( newShowIndex < 0 ){
            newShowIndex = slidesCount-1;
        }
        $slides.removeClass("curIndex nextIndex prevIndex newShowIndex") ;
        $slides.eq(curIndex).addClass("curIndex");
        $slides.eq(nextIndex).addClass("nextIndex");
        $slides.eq(prevIndex).addClass("prevIndex");
        $slides.eq(newShowIndex).addClass("newShowIndex");

        TweenMax.to( $slides.eq(curIndex), aniTime , { rotation: random1, x: -xFrom, z:1, scale: 0.5, zIndex: 1 });
        TweenMax.to( $slides.eq(nextIndex), aniTime , { rotation: random2, x: 0, z:1, scale: 1, zIndex: 2 });
        TweenMax.set( $slides.eq(nextIndex).find(".desc"), { rotation: -random2, z:1});
        TweenMax.to( $slides.eq(prevIndex), aniTime , { rotation: random3, x: -xFrom*1.2, autoAlpha: 0, z:1, scale: 0.3, zIndex: 0 });
        TweenMax.fromTo( $slides.eq(newShowIndex), aniTime , { rotation: random4, scale: 0.3, z:1, autoAlpha: 0, x: xFrom*1.2  }, { rotation :random4, z:1, scale: 0.5, autoAlpha: 1, x: xFrom } );


        $slides.removeClass("current start");
        $slides.eq(nextIndex).addClass("current");
    };

    var $la = $block.find(".left-arrow");
        $la.on("click", function(){
            slide("left");
        });

    var $ra = $block.find(".right-arrow");
        $ra.on("click", function(){
          slide("right");
        });

    var hamSlider = new Hammer($block[0], {
        touchAction: "auto"
    });
    hamSlider.on('swipeleft', function(ev) {
        slide("right");
    });
    hamSlider.on('swiperight', function(ev) {
        slide("left");
    });
}
function initBottomMenu(){
    if( !$("#bottomMenu .menuItem").length > 0 ){ return false;}

    $("#bottomMenu .menuItem.left").wrapAll("<div class='w-1d6col menuLc'></div>");
    $("#bottomMenu .menuItem.middle").wrapAll("<div class='w-1d6col menuMc'></div>");
    $("#bottomMenu .menuItem.right").wrapAll("<div class='w-1d4col menuRc'></div>");

    setFooterPadding();
}
function pagenationHelper(){
    $('.pagenation .navHelper').each(function(){
        var thismax = parseInt($(this).data("max"));
        $(this).inputmask("numeric", {
            min: 1,
            max: thismax
        });
    });
    $(".pagenation .centerTextBlock").on("click", function(){
        var $tb = $(this),
            $hb = $(this).next(".navHelper"),
            $pag = $(this).closest(".pagenation");
        $tb.hide();
        $hb.show();
        $pag.addClass("active");
        $hb.focus();
    });
    $('.pagenation .navHelper').on('keyup', function (e) {
        if (e.keyCode == 13 && $(this).val().length !== 0 ) {
            if( $(this).hasClass("noHref") ){
                $(this).blur();
                var $pag = $(this).closest(".pagenation");
                    $slider = $pag.prev(".defaultSlider"),
                    sliderOT = $slider.offset().top-80,
                    $slides = $slider.find(".slide"),
                    slidesL = $slides.length,
                    $curSlide = $slider.find(".slide.current"),
                    curIndex = $curSlide.index(),
                    nextCurIndex = $(this).val()-1;

                $slides.removeClass("current");
                $slides.eq(nextCurIndex).addClass("current");
                $pag.find(".centerTextBlock .cur .page").text(nextCurIndex+1);
                $pag.find(".prev").removeClass("disabled");
                $pag.find(".next").removeClass("disabled");
                if( nextCurIndex == 0 ){
                    $pag.find(".prev").addClass("disabled");
                }
                if( nextCurIndex == slidesL-1 ){
                    $pag.find(".next").addClass("disabled");
                }

                $(".pagenation.active .navHelper").hide();
                $(".pagenation.active .centerTextBlock").show();
                $(".pagenation.active").removeClass("active");
                $slider.css({ "height" : $slides.eq(nextCurIndex).outerHeight() });
                TweenLite.to(window, 0.4, { ease: Sine.easeInOut, scrollTo: sliderOT});
            }else{
                $(this).blur();
                var currentLocation = window.location.pathname;
                window.location.href = currentLocation+"?PAGEN_1="+$(this).val();    
            }
        }
    });
    $("body").on("click", function(event) {
        if (($(".pagenation.active").length > 0) && ($(event.target).closest(".pagenation").length < 1) ) {
            $(".pagenation.active .navHelper").hide();
            $(".pagenation.active .centerTextBlock").show();
            $(".pagenation.active").removeClass("active");
        }
    });
}
function HPinitSovetiBlock(){
    if( !$(".homepage .sovetiBlock .item").length > 0 ){ return false;}
    var $items = $(".homepage .sovetiBlock .item"),
        cols = 3,
        itemsL = $items.length,
        countB = Math.ceil(itemsL/cols),
        countL = Math.floor(itemsL/cols);

    for(var i = 0, k = 0; i < cols; i++ ) {
        if( i < itemsL%cols ) {
            $items.slice(k, k+countB).wrapAll("<div class='w-1col'></div>");
            k = k+countB;
        } else {
            $items.slice(k, k+countL).wrapAll("<div class='w-1col'></div>");
            k = k+countL;
        }
    }
}

function HPinitDoctorsBlock(){
    if( !$(".homepage .doctors-list .col").length > 0 ){ return false;}
    var $block = $(".homepage .doctors-list"),
    $cols = $block.find(".col"),
    colsL = $cols.length,
    $overFlows = $block.find(".itemOverflow"),
    $links = $block.find(".item");


    for(var i = 0; i < colsL; i+=4) {
      $cols.slice(i, i+4).wrapAll("<div class='row clear'></div>");
    }
    TweenLite.set( $links, { zIndex:0 });

    var gradColors = ["#f0f1f3","#95edd4","#d7efe2", "#b8c2ba", "#edf4d5"];

    setRandomGradient($links, gradColors);

    function initIcons(){
        $overFlows.each(function(i , el){
            var $overflow = $(this),
                $col = $overflow.closest(".col"),
                $link = $col.find(".item"),
                $iw = $link.find(".iw");
                thisInitRotate = getRandom(-7 , 7);

            TweenMax.set( $overflow, { rotation: thisInitRotate , left: "76px", top: "76px",  x: "-50%", y:"-50%", transformOrigin: "50% 50%", zIndex:1});
            var tl = new TimelineMax({
                paused: true,
            });
//zIndex: 4, width: "380px", left: 0, top: 0, height: $iw.outerHeight(), x: "0%", y: "0%"
            tl.fromTo( $overflow, 0.12, 
              {rotation: thisInitRotate, left: "76px", top: "76px", x: "-50%", y:"-50%", transformOrigin: "50% 50%", zIndex:1},
              { rotation : 0, ease:Circ.easeIn })
                .to( $overflow, 0.12, { "border-width" : 0, ease:Circ.easeIn })
                .fromTo($link, 0.01, {zIndex: 0}, { zIndex: 3 })
                .to( $link, 0.12, { width: "380px", height: $iw.outerHeight(), className:'+=complete', ease:Power0.easeNone });

            $overflow.add($link).on("mouseenter",function(e){
                tl.pause().play();
                $col.addClass("hover");
            }).on("mouseleave",function(){
                tl.pause().reverse();
                $col.removeClass("hover");
            });
        });

    }
    initIcons();
    $(".homepage .doctors-list").css({visibility:"visible"});
}


function contactsmap(){
    if( $("footer #contactsMap").length == 0 ){ return false; }
    ymaps.ready(init);
    function init () {
        var myMap = new ymaps.Map("contactsMap", {
                center: [55.787811, 37.519467],
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });
            myMap.behaviors.disable('scrollZoom');

        // Создаем геообъект с типом геометрии "Точка".
            myGeoObject = new ymaps.GeoObject({
            });

        myMap.geoObjects.add(new ymaps.Placemark([55.787811, 37.519467], {
                balloonContent: 'цвет <strong>голубой</strong>',
                iconCaption: 'проезд Березовой Рощи, 8'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));
    }
}
function hpVideoRow(){
    var myPlayer;
    function customVideoPlayer(){
    if( !$('#companyVideo').length > 0 ){ return false;}
        var options = {
            "controls": true,
            "autoplay": false,
            "preload": "auto",
            "fluid": true,
        }
        videojs(document.getElementById('companyVideo'), options, function() {

        }).ready(function(event){
            myPlayer = this;
            var previousTime = 0;
            var currentTime = 0;
            myPlayer.on('timeupdate', function() {
                previousTime = currentTime;
                currentTime = myPlayer.currentTime();
            });
            myPlayer.on('seeking', function() {
                // setTimeout(function(){
                //     myPlayer.controlBar.progressControl.seekBar.update();
                // }, 100)
            });
        });
    }
    customVideoPlayer();
    function showVideo(){
        var videoEl = $(".videoPopup");
        $.magnificPopup.open({
            items: {
                src: videoEl,
                type: 'inline'
            },
            removalDelay: 500, //delay removal by X to allow out-animation
            closeBtnInside: true,
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = "mfp-zoom-in";
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    }
    $(".hpVideoRow .videoPlayButton").on("click", function(){
        showVideo();
        myPlayer.play();
    });
}
function zoomGalleryPopup(){
    if( !$('.zoom-gallery').length > 0 ){ return false; }
    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            // titleSrc: function(item) {
            //     return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            // }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });
}
function detailDoctorInit(){
    if( !$(".doctor-detail .topBlock").length > 0 ){ return false; }
    var classes = ["pink","dBlue","lBlue","green","yellow", "fio"];
    var cl = classes[Math.floor(Math.random()*classes.length)];
    $(".doctor-detail .topBlock").addClass(cl);
}
function HPrecallsBlock(){
    if( !$(".homepage .recallsBlock .item").length > 0 ){ return false;}

    var $block = $(".homepage .recallsBlock"),
        $itemsW = $block.find(".items"),
        $slides = $block.find(".item"),
        slidesCount = $slides.length,
        cur;

        if( $slides.filter(".current").length == 0 ){
            $slides.eq(0).addClass("current");
            cur = 0;
        }else{
            cur = $slides.filter(".current").index();
        }
        TweenMax.set( $itemsW, { height: $slides.eq(cur).outerHeight() });
        TweenMax.set( $slides.filter(".current"), { autoAlpha:1, "z-index": 2 });

        if( $slides.length == 0){ return false; }

        function slide(dir, index){
            cur = $slides.filter(".current").index();
            var nextCur;
            if((dir === "right") && (cur !== slidesCount-1)){
              nextCur = cur+1;
            }else if((dir === "right") && (cur === slidesCount-1)){
              nextCur = 0;
            }else if((dir === "left") && (cur !== 0)){
              nextCur = cur-1;
            }else if((dir === "left") && (cur === 0)){
              nextCur = slidesCount-1;
            }else{
            nextCur = index;
            if(nextCur > cur){
                var dir = "right";
            }else if(nextCur < cur){
                var dir = "left";
            }else{
                return false;
            }
            }

            TweenMax.to( $slides.eq(cur), 0.4, { autoAlpha:0 , onComplete: function(){$slides.eq(cur).css({"z-index": 1})} });
            TweenMax.to( $slides.eq(nextCur), 0.4, { autoAlpha:1 , onComplete: function(){$slides.eq(nextCur).css({"z-index": 2})} });
            TweenMax.to( $itemsW, 0.35, { height: $slides.eq(nextCur).outerHeight() });
            
            $slides.removeClass("current");
            $slides.eq(nextCur).addClass("current");
        };

        var $ra = $block.find(".shownext");
        $ra.on("click", function(){
            slide("right");
        });
}


function createSlider($block, $items){
    var itemsL = $items.length;
    if( itemsL == 0 ){ return false; }

    $items.wrapAll("<div class='defaultSlider'></div>");
    var slideL = 0;
    for(var i = 0; i < itemsL ; i+=5) {
        if( i == 0 ){
            $items.slice(i, i+5).wrapAll("<div class='slide current'></div>");
        }else{
            $items.slice(i, i+5).wrapAll("<div class='slide'></div>");
        }
        
        slideL++;
    }
    var pagHtml = '<div class="pagenation js clear">\
                        <div class="prev js disabled"><a name="but">Назад</a></div>\
                        <div class="td center">\
                            <div class="centerTextBlock"><span class="cur">Страница <span class="page">1</span></span><span class="all"> из '+slideL+'</span></div>\
                            <input type="text" data-min="1" data-max="'+slideL+'" class="navHelper noHref" style="text-align: right;">\
                        </div>\
                        <div class="next js"><a name="but">Дальше</a></div>\
                    </div>';
    $block.append(pagHtml);

    var $slider = $items.closest(".defaultSlider"),
        sliderOT = $slider.offset().top-80,
        $pag = $slider.next(".pagenation"),
        $slides = $slider.find(".slide"),
        slidesL = $slides.length,
        $nextBut = $pag.find(".next"),
        $prevBut = $pag.find(".prev");

    $slider.css({ "height" : $slider.find(".slide.current").outerHeight() });
    setTimeout(function(){
        $slider.css({ "height" : $slider.find(".slide.current").outerHeight() });
    }, 200);

    $nextBut.on("click", function(){
        if( $nextBut.hasClass("disabled") ){return false;}

        var $curSlide = $slider.find(".slide.current"),
            curIndex = $curSlide.index(),
            nextIndex = curIndex+1;

        $prevBut.removeClass("disabled");
        if( nextIndex == slidesL-1 ){
            $nextBut.addClass("disabled");
        }
        $slides.removeClass("current");
        $slides.eq(nextIndex).addClass("current");
        $pag.find(".centerTextBlock .cur .page").text(nextIndex+1);
        $slider.css({ "height" : $slides.eq(nextIndex).outerHeight() });
        TweenLite.to(window, 0.4, { ease: Sine.easeInOut, scrollTo: $slider.offset().top-80});
    });
    $prevBut.on("click", function(){
        if( $prevBut.hasClass("disabled") ){return false;}

        var $curSlide = $slider.find(".slide.current"),
            curIndex = $curSlide.index(),
            nextIndex = curIndex-1;

        $nextBut.removeClass("disabled");
        if( nextIndex == 0 ){
            $prevBut.addClass("disabled");
        }
        $slides.removeClass("current");
        $slides.eq(nextIndex).addClass("current");
        $pag.find(".centerTextBlock .cur .page").text(nextIndex+1);
        $slider.css({ "height" : $slides.eq(nextIndex).outerHeight() });
        TweenLite.to(window, 0.4, { ease: Sine.easeInOut, scrollTo: $slider.offset().top-80});
    });
}

function doctorDetail(){
    if( $(".doctor-detail").length == 0 ){ return false; }
    createSlider( $(".doctor-detail .recalls-list"), $(".doctor-detail .recalls-list .recall-item") );
}

function doctorsListInit(){
    if( !$("#doctors-list").length > 0 ){ return false;}
    var $items = $("#doctors-list .item"),
    itemsL = $items.length;
    for(var i = 0; i <= itemsL; i+=3) {
        var $item1 = $items.eq(i),
            $item2 = $items.eq(i+1),
            $item3 = $items.eq(i+2),
            maxRowH = [];

        if( $item1.length > 0 ){ maxRowH.push($item1.outerHeight()); }
        if( $item2.length > 0 ){ maxRowH.push($item2.outerHeight()); }
        if( $item3.length > 0 ){ maxRowH.push($item3.outerHeight()); }
        var maxH = maxRowH.max();
        //console.log(maxH);
        $item1
        .add($item2)
        .add($item3)
            .css({height : maxH})
            .wrapAll("<div class='row clear'>");
    }
}

function recallsListInit(){
    $(".filterHidden .filter").each(function(){
        var $this = $(this),
            classList = $(this)[0].className.split(' ').join(" "),
            clearclassList = classList.replace('filter','').replace(' ',''),
            mySelect = "<select class='"+clearclassList+"'>";
            //console.log(clearclassList);

            $this.find("a").each(function(){
                var $thisa = $(this);
                if( $thisa.hasClass("active") ){
                    mySelect+="<option selected='selected'>"+$thisa.text()+"</option>";
                }else{
                    mySelect+="<option>"+$thisa.text()+"</option>";
                }
            });
        mySelect+="</select>";
        $(".filtesBlock").append(mySelect);
            
        if( $("html#mobile").length > 0 ){
            var $select = $('.filtesBlock select');
            $select.on("change", function(){
                var index = $(this).find("option:selected").index();
                linkHref = $(".filterHidden .filter."+clearclassList+" a:eq("+index+")").attr("href");
                window.location.href = linkHref;
            });
        }else{
            var selectric = $('select.'+clearclassList+'').selectric();
            selectric.on("selectric-change", function(event, element, selectric){
                var index = $(element).find("option:selected").index();
                linkHref = $(".filterHidden .filter."+clearclassList+" a:eq("+index+")").attr("href");
                window.location.href = linkHref;
            });
        }
    });

    /*FORM writeRewiev*/
    $(".writeReviewBlock .defaultButton").on("click", function(e){
        e.preventDefault();

        var $writeReviewForm = $(".writeReviewForm");
        $.magnificPopup.open({
            items: {
                src: $writeReviewForm,
                type: 'inline'
            },
            removalDelay: 500, //delay removal by X to allow out-animation
            closeBtnInside: true,
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = "mfp-zoom-in";
                }
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    });
        
}

function servicesDetail(){
    if( !$("body.services-detail").length > 0 ){ return false; }
    createSlider( $(".servicesDetailPage .recalls-list"), $(".servicesDetailPage .recalls-list .recall-item") );
    function menuScrollAnimation(){
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave',
            }
        });
        var $navBlock = $(".w-1col .nav"),
            scrollDur = $(".w-2col").outerHeight() - $navBlock.outerHeight();

        new ScrollMagic.Scene({triggerElement: $(".topBlock"), duration: scrollDur, offset: -30})
        .setPin($navBlock)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);

        $("*[data-ar]").each(function(i){
            var $thisAr = $(this),
                thisArAttr = $thisAr.attr("data-ar"),
                $thisLink = $("*[data-link='"+thisArAttr+"']"),
                $thisLinkLi = $("*[data-link='"+thisArAttr+"']").closest("li"),
                curDur = null;

                if( $("*[data-ar]:eq("+(i+1)+")").length > 0 ){
                    curDur = $("*[data-ar]:eq("+(i+1)+")").offset().top - $thisAr.offset().top;
                }
                
                new ScrollMagic.Scene({triggerElement: $thisAr, duration: curDur, offset: -30})
                .setClassToggle( $thisLinkLi , "active") // add class toggle
                //.addIndicators() // add indicators (requires plugin)
                .addTo(controller);
        });
    }
    menuScrollAnimation();

    $("*[data-link]").on("click", function(e){
        e.preventDefault();
        var $link = $(this),
            linkAttr = $link.attr("data-link"),
            $ar = $("*[data-ar='"+linkAttr+"']");
            
        if ( $ar.length > 0 ){
            var arSC = $ar.offset().top;
            TweenLite.to(window, 0.5, { ease: Sine.easeInOut, scrollTo: arSC});
        }
    });
}
function docNoteBlock_maxHeight(){
    var maxH = 0;
    var $b = $(".articles.section .docNoteBlock a.w-1col");
    if( $b.length == 0 ){ return false; }
    $b.css({"height": ""});
    $b.each(function(){
        $(this).outerHeight() > maxH ? maxH = $(this).outerHeight() : maxH = maxH;
    });
    $b.css({"height": maxH});
}

function articlesDetail(){
    if( $(".articlesDetailPage").length == 0 ){ return false; }
    function printPage(){
        $(".printVersion").on("click", function(e){
            e.preventDefault();
            $("html").attr("id" , "printVersion");
            $("#mainWrapper").css({"padding-bottom": ""});
        });
        $(".printButton").on("click", function(e){
            e.preventDefault();
            window.print();
        });
        $(".disablePrintVersion").on("click", function(e){
            e.preventDefault();
            $("html").attr("id" , "");
            setFooterPadding();
        });
    };
    printPage();
}


$(document).ready(function(){
    svg4everybody({});
/*recalls*/
    recallsListInit();
/*recalls END*/
/*GLOBAL*/
    optionSelect( $("#content") );
    customizeCheckbox( $("#content") );
    customizeRadiobox( $("#content") );
	initBottomMenu();
	contactsmap();
    zoomGalleryPopup();
    docNoteBlock_maxHeight();
/*END GLOBAL*/
/*homepage*/
    HPblueLinksBlock();
    HPinitSovetiBlock();
    HPrecallsBlock();
    hpVideoRow();
    HPmainSlider();
/*END homepage*/
/*doctor*/
    detailDoctorInit();
    doctorDetail();
/*doctor END*/
/*servicesDetail*/
    servicesDetail();
/*servicesDetail END*/
/*articles*/
    articlesDetail();
/*END articles*/
/*GLOBAL*/
    pagenationHelper();
/*END GLOBAL*/
});
window.onload = function() {
/*homepage*/
    HPinitDoctorsBlock();
/*END homepage*/
/*doctors*/
    doctorsListInit();
/*doctors END*/
}