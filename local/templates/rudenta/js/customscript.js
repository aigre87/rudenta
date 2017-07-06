/**
 * Even Heights plugin
 * Author: Glen Cheney
 * Modified: 2016-03-08
 * Sets a collection to all be the same height.
 *
 * Usage:
 *
 * evenHeights([
 *   document.querySelectorAll('.foo'),
 * ]);
 *
 */
window.evenHeights = (function () {
  'use strict';

  function getTallest(elements) {
    var tallest = 0;

    for (var i = elements.length - 1; i >= 0; i--) {
      if (elements[i].offsetHeight > tallest) {
        tallest = elements[i].offsetHeight;
      }
    }

    return tallest;
  }

  function setAllHeights(elements, height) {
    for (var i = elements.length - 1; i >= 0; i--) {
      elements[i].style.height = height;
    }
  }

  /**
   * For groups of elements which should be the same height. Using this method
   * will create far less style recalculations and layouts.
   * @param {ArrayLike.<ArrayLike.<Element>>} groups An array-like collection of
   *     an array-like collection of elements.
   * @return {Array.<number>} An array containing the pixel value of the
   *     tallest element for each group.
   */
  function evenHeights(groups) {
    groups = Array.prototype.slice.call(groups);

    // First, reset the height for every element.
    // This is done first, otherwise we dirty the DOM on each loop!
    groups.forEach(function (elements) {
      setAllHeights(elements, '');
    });

    // Now, measure heights in each group and save the tallest value. Instead of
    // setting the height value for the entire group, save it. If it were set,
    // the next iteration in the loop would have to recalculate styles in the DOM
    var tallests = groups.map(function (elements) {
      return getTallest(elements);
    });

    // Lastly, set them all.
    groups.forEach(function (elements, i) {
      setAllHeights(elements, tallests[i] + 'px');
    });

    return tallests;
  }

  return evenHeights;
})();


Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
function getRandom(min, max) {
  return min + Math.random() * (max - min);
}

function removeHash(string){
    if( window.location.hash.indexOf(string) === -1 ){ return false; }
    if( window.location.hash.indexOf("&") === -1 ){
        window.location.hash = "-";
    }else{
        var hashArr = window.location.hash.split("&"),
            hashArrL = hashArr.length;
        for( var i=0; i < hashArrL; i++){
            if( hashArr[i].indexOf(string) > -1 ){
                hashArr.splice(i, 1);
                if( i === 0 ){
                    hashArr[0] = "#" + hashArr[0];
                }
                if( hashArr.length > 1 ){
                    window.location.hash = hashArr.join("&");
                }else{
                    window.location.hash = hashArr[0];
                }
                return;
            }
        }
    }
}
function addhashValue(string, value){
    //нет хеша
    if( window.location.hash.length == 0 ){
        window.location.hash = string+value;
    //есть хеш
    }else{
        //один хеш
        if( window.location.hash.indexOf("&") === -1 ){
            //нет такого типа хеша
            if( window.location.hash.indexOf(string) === -1 ){
                window.location.hash += ("&"+string+value);
            //есть такой тип хеша
            }else{
                window.location.hash = string+value;
            }
        //множественный хеш
        }else{
            var hashArr = window.location.hash.split("&"),
                hashArrL = hashArr.length;

            var entry = false;
            for( var i=0; i< hashArrL; i++){
                if( hashArr[i].indexOf(string) > -1 ){
                    entry = true;
                    if( i === 0 ){
                        hashArr[i] = "#"+string+value;
                    }else{
                        hashArr[i] = string+value;
                    }
                }
            }
            if( !entry ){
                window.location.hash += ("&"+string+value);
            }else{
                window.location.hash = hashArr.join("&");
            }
        }
    }
}
function getHashValue(string){
    var hashValue = false;
    //один хеш
    if( window.location.hash.indexOf("&") === -1 ){
        hashValue = window.location.hash.replace("#"+string+"", "");
    //множественный хеш
    }else{
        var hashArr = window.location.hash.split("&"),
            hashArrL = hashArr.length;

        for( var i = 0; i < hashArrL; i++ ){
            if( hashArr[i].indexOf(string) > -1 ){
                var finalArr = hashArr[i].split("_"),
                    finalArrL = finalArr.length;
                hashValue = finalArr[finalArrL-1];
            }
        }
    }
    if( hashValue ){
        return hashValue;
    }else{
        console.log("нету такого хеша");
    }
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
    $('select:not(.recallsFilter)').selectric({
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
        sliderInterval,
        cur,
        aniTime = 0.5,
        aniDist = 500;

    function initSlider(){
        TweenMax.set($('#hp_slider'), {perspective:500});
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
            clearInterval(sliderInterval);
            if( !myGlobalisMobileDevice ){
                myIntervalMainSlider();
            }
        });

    var $ra = $block.find(".right-arrow");
        $ra.on("click", function(){
            slide("right");
            clearInterval(sliderInterval);
            if( !myGlobalisMobileDevice ){
                myIntervalMainSlider();
            }
        });

    var hamSlider = new Hammer($block[0], {
        touchAction: "auto"
    });
    hamSlider.on('swipeleft', function(ev) {
        slide("right");
        clearInterval(sliderInterval);
        if( !myGlobalisMobileDevice ){
            myIntervalMainSlider();
        }
    });
    hamSlider.on('swiperight', function(ev) {
        slide("left");
        clearInterval(sliderInterval);
        if( !myGlobalisMobileDevice ){
            myIntervalMainSlider();
        }
    });

    function myIntervalMainSlider(){
        sliderInterval = setInterval(function(){
            slide("right");
        }, 4500);
    }
    myIntervalMainSlider();

    $block.on("mouseenter", function(){
        clearInterval(sliderInterval);
    });
    $block.on("mouseleave", function(){
        clearInterval(sliderInterval);
        myIntervalMainSlider();
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
        var $this = $(this);
        var thismax = parseInt($this.data("max"));
        $this.inputmask("numeric", {
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

                if( curIndex === nextCurIndex ){ return false; }

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
                window.location.hash = "sl_page_"+(nextCurIndex+1);
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
                .to( $link, 0.17, { width: "380px", boxShadow: "0px 28px 80px 0px rgba(56,67,70,0.5)", height: $iw.outerHeight(), className:'+=complete', ease:Power0.easeNone });

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
                center: [55.787718, 37.516960],
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });
            myMap.behaviors.disable('scrollZoom');

        // Создадим пользовательский макет ползунка масштаба.
        var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>\
                <div id='zoom-in' class='btn'><i class='icon-plus'></i>\
                </div><div id='zoom-out' class='btn'><i class='icon-minus'></i></div>\
            </div>", {

            // Переопределяем методы макета, чтобы выполнять дополнительные действия
            // при построении и очистке макета.
            build: function () {
                // Вызываем родительский метод build.
                ZoomLayout.superclass.build.call(this);

                // Привязываем функции-обработчики к контексту и сохраняем ссылки
                // на них, чтобы потом отписаться от событий.
                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                // Начинаем слушать клики на кнопках макета.
                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
                $('#yaPanorama').on('click', function(){
                    $(".contactsMapPanorama-wrapper").css({"z-index": 1});
                    $("#contactsMap").css({"z-index": 0});
                });
            },

            clear: function () {
                // Снимаем обработчики кликов.
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);

                // Вызываем родительский метод clear.
                ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function () {
                var map = this.getData().control.getMap();
                // Генерируем событие, в ответ на которое
                // элемент управления изменит коэффициент масштабирования карты.
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() + 1
                });
                if(  map.getZoom() < 15  ){

                }
            },

            zoomOut: function () {
                var map = this.getData().control.getMap();
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() - 1
                });
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } });
        /*END CUSTOM ZOOM CONTROL BUTTONS*/

        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
        });

        var polyline = new ymaps.Polyline([
            [55.769411, 37.596591], [55.768976, 37.595819], [55.769623, 37.594714], [55.769164, 37.593737], [55.770040, 37.592246], [55.768716, 37.589832]
        ], {
            hintContent: "Путь от метро"
        }, {
            draggable: false,
            strokeColor: '#e4002b',
            strokeWidth: 4,
            opacity: 0.6,
            // Первой цифрой задаем длину штриха. Второй цифрой задаем длину разрыва.
            strokeStyle: '1 0'
        });


        var childmark = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.787793, 37.519344]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Детская стоматология РуДента Kids',
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#darkGreenStretchyIcon',
            // Метку можно перемещать.
            draggable: false
        });

        var parrentmark = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.787134, 37.519773]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Cтоматология РуДента',
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#redStretchyIcon',
            // Метку можно перемещать.
            draggable: false
        });

        // myMap.geoObjects.add(new ymaps.Placemark([55.787793, 37.519344], {
        //         //balloonContent: 'цвет <strong>голубой</strong>',
        //         //iconCaption: 'проезд Березовой Рощи, 8'
        //         properties: {
        //             iconContent: 'Детская стоматология РуДента Kids',
        //         }
        //     }, {
        //         preset: 'islands#darkGreenStretchyIcon',
        // }));

        // myMap.geoObjects.add(new ymaps.Placemark([55.787134, 37.519773], {
        //         properties: {
        //             iconContent: 'Cтоматология РуДента',
        //         }
        //     }, {
        //         preset: 'islands#redStretchyIcon',
        // }));
        myMap.geoObjects
            .add(childmark)
            .add(parrentmark);
            //.add(polyline);

        myMap.controls.add(zoomControl, {
            float: 'none',
            position: {
                right: 30,
                bottom: 50
            }
        });

    }
}
function videoPlay(){
    function customVideoPlayer(){
    if( $('.video-js').length == 0 ){ return false;}
        var options = {
            "controls": true,
            "autoplay": false,
            "preload": "auto",
            "fluid": true,
        }

        vgsPlayer = videojs('vid1', {
          techOrder: ["html5", "flash", "youtube"],
          autoplay: false,
            youtube: { "iv_load_policy": 3 },
          sources: [{
              type: "video/mp4",
              src: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4"
            }]
            //video.attr('poster', 'http://1x1px.me/000000-0.png')
        });

        $("video.video-js").each(function(){
            var $this = $(this);
            var dataDep = $(this).attr("data-dep");

            vgsPlayer = videojs('vid1', {
              techOrder: ["html5", "flash", "youtube"],
              autoplay: false,
                youtube: { "iv_load_policy": 3 },
                sources: [{
                  type: "video/youtube",
                  src: "https://www.youtube.com/watch?v=kkGeOWYOFoA"
                }]
                //video.attr('poster', 'http://1x1px.me/000000-0.png')
            });
            vgsPlayer.ready(function(event){
                var myPlayer = this;
                var previousTime = 0;
                var currentTime = 0;
                myPlayer.volume(0.5);
                myPlayer.on('timeupdate', function() {
                    previousTime = currentTime;
                    currentTime = myPlayer.currentTime();
                });
                myPlayer.on('seeking', function() {
                    // setTimeout(function(){
                    //     myPlayer.controlBar.progressControl.seekBar.update();
                    // }, 100)
                });

                function showVideo(){
                    var videoEl = $(".videoPopup[data-dep='"+dataDep+"']");
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
                $(".videoPlayButton[data-dep='"+dataDep+"']").on("click", function(){
                    showVideo();
                    myPlayer.play();
                });
            });







            // videojs( $this[0], options, function() {

            // }).ready(function(event){
            //     var myPlayer = this;
            //     var previousTime = 0;
            //     var currentTime = 0;
            //     myPlayer.volume(0.5);
            //     myPlayer.on('timeupdate', function() {
            //         previousTime = currentTime;
            //         currentTime = myPlayer.currentTime();
            //     });
            //     myPlayer.on('seeking', function() {
            //         // setTimeout(function(){
            //         //     myPlayer.controlBar.progressControl.seekBar.update();
            //         // }, 100)
            //     });

            //     function showVideo(){
            //         var videoEl = $(".videoPopup[data-dep='"+dataDep+"']");
            //         $.magnificPopup.open({
            //             items: {
            //                 src: videoEl,
            //                 type: 'inline'
            //             },
            //             removalDelay: 500, //delay removal by X to allow out-animation
            //             closeBtnInside: true,
            //             callbacks: {
            //                 beforeOpen: function() {
            //                     this.st.mainClass = "mfp-zoom-in";
            //                 }
            //             },
            //             midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
            //         });
            //     }
            //     $(".videoPlayButton[data-dep='"+dataDep+"']").on("click", function(){
            //         showVideo();
            //         myPlayer.play();
            //     });
            // });
        });



    }
    customVideoPlayer();
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
    if( !$(".doctor-detail .topBlock:not(.colorSet)").length > 0 ){ return false; }
    var classes = ["pink","dBlue","lBlue","green","yellow", "purple"];
    var cl = classes[Math.floor(Math.random()*classes.length)];
    $(".doctor-detail .topBlock").addClass(cl);
}

function recallsBlockSlider(){
    if( !$(".recallsBlockSlider .item").length > 0 ){ return false;}

    var $block = $(".recallsBlockSlider"),
        $itemsW = $block.find(".items"),
        $slides = $block.find(".item"),
        slidesCount = $slides.length,
        cur,
        curClass;

        var object = $('.object');
        var s = Snap('#personSvg');
        var pathM = s.select('.pathM');
        var pathB = s.select('.pathB');
        var pathR = s.select('.pathR');
        var pathL = s.select('.pathL');
        var timerIN;

        if( $slides.filter(".current").length == 0 ){
            $slides.eq(0).addClass("current");
            cur = 0;
        }else{
            cur = $slides.filter(".current").index();
        }
        TweenMax.set( $itemsW, { height: $slides.eq(cur).outerHeight() });
        TweenMax.set( $slides.filter(".current"), { autoAlpha:1, "z-index": 2 });

        if( $slides.filter(".current").hasClass("male") ){
            curClass = "male";
        }else if( $slides.filter(".current").hasClass("female") ){
            curClass = "female";
        }else{
            curClass = "unisex";
        }

        if( $slides.length == 0){ return false; }

        function slide(dir, index){
            cur = $slides.filter(".current").index();
            if( $slides.filter(".current").hasClass("male") ){
                curClass = "male";
            }else if( $slides.filter(".current").hasClass("female") ){
                curClass = "female";
            }else{
                curClass = "unisex";
            }

            var nextCur,
                nextCurClass;
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

            if( $slides.eq(nextCur).hasClass("male") ){
                nextCurClass = "male";
            }else if( $slides.eq(nextCur).hasClass("female") ){
                nextCurClass = "female";
            }else{
                nextCurClass = "unisex";
            }


            if( curClass != nextCurClass ){
                // KUTE.to('.pathM', { path: personSvgJson[nextCurClass]["pathM"], attr: { fill: personSvgJson[nextCurClass]["color"] } }, {delay: 10, duration: 1000, morphIndex:550} ).start();
                // KUTE.to('.pathB', { path: personSvgJson[nextCurClass]["pathB"], attr: { fill: personSvgJson[nextCurClass]["color"] } }, {delay: 20, duration: 1000, morphIndex:550} ).start();
                // KUTE.to('.pathR', { path: personSvgJson[nextCurClass]["pathR"], attr: { fill: personSvgJson[nextCurClass]["color"] } }, {delay: 30, duration: 1000, morphIndex:550} ).start();
                // KUTE.to('.pathL', { path: personSvgJson[nextCurClass]["pathL"], attr: { fill: personSvgJson[nextCurClass]["color"] } }, {delay: 40, duration: 1000, morphIndex:550} ).start();

                //pathM.animate({ 'path' : personSvgJson[nextCurClass]["pathM"], fill:personSvgJson[nextCurClass]["color"] }, 10000, mina.bounce);
                //pathB.animate({ 'path' : personSvgJson[nextCurClass]["pathB"], fill:personSvgJson[nextCurClass]["color"] }, 10000, mina.bounce);
                //pathR.animate({ 'path' : personSvgJson[nextCurClass]["pathR"], fill:personSvgJson[nextCurClass]["color"] }, 10000, mina.bounce);
                //pathL.animate({ 'path' : personSvgJson[nextCurClass]["pathL"], fill:personSvgJson[nextCurClass]["color"] }, 10000, mina.bounce);
                pathM.stop();
                clearTimeout(timerIN);
                TweenMax.to( $('#personSvg'), 0.2, { 
                    autoAlpha:0, 
                    onComplete: function(){
                        pathM.attr({'path' : personSvgJson[nextCurClass]["pathM"], fill:personSvgJson[nextCurClass]["color"] });
                        pathB.attr({'path' : personSvgJson[nextCurClass]["pathB"], fill:personSvgJson[nextCurClass]["color"] });
                        pathR.attr({'path' : personSvgJson[nextCurClass]["pathR"], fill:personSvgJson[nextCurClass]["color"] });
                        pathL.attr({'path' : personSvgJson[nextCurClass]["pathL"], fill:personSvgJson[nextCurClass]["color"] });

                        TweenMax.set($('#personSvg'), { autoAlpha:1 });
                        var len = pathM.getTotalLength();

                        pathM.attr({
                            "path": personSvgJson[nextCurClass]["pathM"],
                            "fill": "#fff",
                            "stroke": personSvgJson[nextCurClass]["color"],
                            "stroke-width": 2,
                            "stroke-dasharray": len + " " + len,
                            "stroke-dashoffset": len
                        }).animate(
                            {"stroke-dashoffset": 0},
                            3000,
                            mina.easeout
                        );
                        timerIN = setTimeout(function(){
                            pathM.animate({ 'fill': personSvgJson[nextCurClass]["color"], "stroke-width": 0 }, 1000 , mina.easeinout);
                        }, 2400);
                    }
                })
            }


            TweenMax.to( $slides.eq(cur), 0.4, { autoAlpha:0 , onComplete: function(){$slides.eq(cur).css({"z-index": 1})} });
            TweenMax.to( $slides.eq(nextCur), 0.4, { autoAlpha:1 , onComplete: function(){$slides.eq(nextCur).css({"z-index": 2})} });
            TweenMax.to( $itemsW, 0.35, { height: $slides.eq(nextCur).outerHeight() });
            
            $slides.removeClass("current");
            $slides.eq(nextCur).addClass("current");
        };

        var $ra = $block.find(".shownext");

        var $raIcon = $ra.find(".icon");
        var tl = new TimelineMax({paused : true});

        tl.to($raIcon, 1.6, {rotation: 360, repeat:-1, repeatDalay: 1, ease: Power0.easeNone});
        
        $ra.on("mouseenter", function(){
            tl.play();
        });
        $ra.on("mouseout", function(){
            tl.pause();
        });

        $ra.on("click", function(){
            slide("right");
        });
}


function createSlider($block, $items){
    var itemsL = $items.length;
    if( itemsL == 0 || itemsL <= 5 ){ return false; }

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
    if( window.location.hash.indexOf("sl_page_") === -1 ){
        $slider.css({ "height" : $slider.find(".slide.current").outerHeight() });
        setTimeout(function(){
            $slider.css({ "height" : $slider.find(".slide.current").outerHeight() });
        }, 200);
    }else{
        var initIndex  = getHashValue("sl_page_")-1;
        $slides.removeClass("current");
        $slides.eq(initIndex).addClass("current");
        $pag.find(".centerTextBlock .cur .page").text(initIndex+1);
        $slider.css({ "height" : $slides.eq(initIndex).outerHeight() });
    }

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
        addhashValue("sl_page_", nextIndex+1);
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
        addhashValue("sl_page_", nextIndex+1);
    });
}

function doctorDetail(){
    if( $(".doctor-detail").length == 0 ){ return false; }
    createSlider( $(".doctor-detail .recalls-list"), $(".doctor-detail .recalls-list .recall-item") );
}

function doctorsListInit(){
    if( $("#doctors-list:not(.owl-carousel)").length > 0 ){ 
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
                //.wrapAll("<div class='row clear'>");
        }
    }
}

function recallsListInit(){
    if( $(".recalls-list-page").length == 0 ){ return false; }

    createSlider( $(".recalls-list-page .recalls-list"), $(".recalls-list-page .recalls-list .recall-item") );
    $(".filterHidden .filter").each(function(){
        var $this = $(this),
            classList = $(this).attr("class").split(' ').join(" "),
            clearclassList = classList.replace('filter','').replace(' ',''),
            mySelect = "<select class='recallsFilter "+clearclassList+"'>";
            //console.log(clearclassList);

            $this.find("a").each(function(){
                var $thisa = $(this);
                    $thisImg = $thisa.prev("img");
                if( $thisImg.length > 0 ){
                    var imgSrc;

                    if( $thisImg.attr('src').trim().length > 0 ){
                        imgSrc = $thisImg.attr('src');
                    }else{
                        imgSrc = '/local/templates/rudenta/images/filterPerson.png';
                    }

                    if( $thisa.hasClass("active") ){
                        mySelect+="<option class='withImg' data-img='"+imgSrc+"' selected='selected'>"+$thisa.text()+"</option>";
                    }else{
                        mySelect+="<option class='withImg' data-img='"+imgSrc+"'>"+$thisa.text()+"</option>";
                    }
                }else{
                    if( $thisa.hasClass("active") ){
                        mySelect+="<option class='all' selected='selected'>"+$thisa.text()+"</option>";
                    }else{
                        mySelect+="<option class='all'>"+$thisa.text()+"</option>";
                    }
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
            if( clearclassList.indexOf("doctors") > -1 ){
                var selectric = $('select.'+clearclassList+'').selectric({
                  optionsItemBuilder: function(itemData, element, index) {

                    if( itemData.element[0].hasAttribute("data-img") ){
                        return '<span class="imgW"><img src="'+itemData.element[0].getAttribute("data-img")+'"></span><span class="text">'+ itemData.text+'</span>';
                    }else{
                        return itemData.text;
                    }
                  }
                });
                selectric.on("selectric-change", function(event, element, selectric){
                    var index = $(element).find("option:selected").index();
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
        }
    });

    /*unlocal-recalls*/
    TweenMax.set($(".unlocal-recalls .unlocal-recalls-4.start"), {opacity: 1});
    var $buttonShowMore = $(".unlocal-recalls .buttonMore");
    var tl = new TimelineMax({paused : true});

    tl.to($buttonShowMore.find(".icon"), 1.6, {rotation: 360, repeat:-1, repeatDalay: 1, ease: Power0.easeNone});
    
    $buttonShowMore.on("mouseenter", function(){
        tl.play();
    });
    $buttonShowMore.on("mouseleave", function(){
        tl.pause();
    });
    
    $buttonShowMore.on("click", function(){
        var $slides = $(".unlocal-recalls .unlocal-recalls-4"),
            slidesL = $slides.length,
            curIndex = $slides.filter(".active, .start").index(),
            nextCur;

        if(curIndex !== slidesL-1){
          nextCur = curIndex+1;
        }else{
          nextCur = 0;
        }
        var $curS = $slides.eq(curIndex),
            $nextS = $slides.eq(nextCur);

        $curS.removeClass("active start");
        $nextS.addClass("active");
        TweenMax.to( $curS , 0.3 , { opacity: 0  });
        TweenMax.to( $nextS , 0.3 , { opacity: 1  });
    });
}

function writeRewievForm(){
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

function servicesList(){
    if( $(".servicesList").length === 0 ){ return false; }

    function goScroll(){
        if( window.location.hash.length === 0 ){ return false; }
        var pageHash = window.location.hash.replace("#", "");

        $(".service").each(function(){
            var $this = $(this);
            var thisIdArray = $this.attr("id").split("_");
            if( thisIdArray[thisIdArray.length-1]  === pageHash ){
                TweenLite.to(window, 0, { ease: Sine.easeInOut, scrollTo: $this.offset().top });
            }
        });
    }
    goScroll();
    $(window).on('hashchange', function() {
      goScroll();
    });

}

function servicesDetail(){
    if( !$("body.services-detail").length > 0 ){ return false; }
    createSlider( $(".servicesDetailPage .recalls-list"), $(".servicesDetailPage .recalls-list .recall-item") );

    if( $("#doctors-list .item").length > 0 ){
        function servDoctorsListBLock(){
          var owl = $("#doctors-list"),
              $LA = $(".doctors.section .arrow.left"),
              $RA = $(".doctors.section .arrow.right");
          if( owl.length == 0 ){return false;}

          function checkArrowsState(ev){
              var index = ev.item.index,
                  count = ev.item.count,
                  size = ev.page.size;

              if( index == 0 ){
                  $LA.addClass("disabled");
              }else{
                  $LA.removeClass("disabled");
              }
              if( index+size == count || count <= 3 ){
                  $RA.addClass("disabled");
              }else{
                  $RA.removeClass("disabled");
              }
          }
          owl.on('initialized.owl.carousel', function(event) {
                checkArrowsState(event);
                var $items = $("#doctors-list .item"),
                itemsL = $items.length,
                maxRowH = [];
                for(var i = 0; i < itemsL; i++) {
                    maxRowH.push($items.eq(i).outerHeight());
                }

                var maxH = maxRowH.max();
                // console.log(maxRowH);
                // console.log(maxH);
                $items.css({height : maxH})
          });
          owl.owlCarousel({
            loop:false,
            items: 3,
            navRewind:false,
            margin: 20,
            nav: true,
            navText: [
              "<i class='fa fa-caret-left'></i>",
              "<i class='fa fa-caret-right'></i>"
            ],
            autoplay: false,
            autoplayHoverPause: false,
            responsive: {
              0: {
                items: 2
              },
              800: {
                items: 3
              }
            }
          });
          owl.on('changed.owl.carousel', function(event) {
              checkArrowsState(event);
          });
          $RA.click(function() {
              owl.trigger('next.owl.carousel');
          });
          $LA.click(function() {
              owl.trigger('prev.owl.carousel');
          });
        }
        servDoctorsListBLock();
    }

    if( $(".tehnology-list .item").length > 0 ){
        function servTehnologyListBLock(){
          var owl = $(".tehnology-list"),
              $LA = $(".tehnology.section .arrow.left"),
              $RA = $(".tehnology.section .arrow.right");
          if( owl.length == 0 ){return false;}

          function checkArrowsState(ev){
              var index = ev.item.index,
                  count = ev.item.count,
                  size = ev.page.size;

              if( index == 0 ){
                  $LA.addClass("disabled");
              }else{
                  $LA.removeClass("disabled");
              }
              if( index+size == count || count <= 3 ){
                  $RA.addClass("disabled");
              }else{
                  $RA.removeClass("disabled");
              }
          }
          owl.on('initialized.owl.carousel', function(event) {
                checkArrowsState(event);
                var $items = $(".tehnology-list .item"),
                itemsL = $items.length,
                maxRowH = [];
                for(var i = 0; i < itemsL; i++) {
                    maxRowH.push($items.eq(i).outerHeight());
                }

                var maxH = maxRowH.max();
                // console.log(maxRowH);
                // console.log(maxH);
                $items.css({height : maxH})
          });
          owl.owlCarousel({
            loop:false,
            items: 5,
            navRewind:false,
            margin: 10,
            nav: true,
            navText: [
              "<i class='fa fa-caret-left'></i>",
              "<i class='fa fa-caret-right'></i>"
            ],
            autoplay: false,
            autoplayHoverPause: false,
            responsive: {
              0: {
                items: 2
              },
              800: {
                items: 5
              }
            }
          });
          owl.on('changed.owl.carousel', function(event) {
              checkArrowsState(event);
          });
          $RA.click(function() {
              owl.trigger('next.owl.carousel');
          });
          $LA.click(function() {
              owl.trigger('prev.owl.carousel');
          });
        }
        servTehnologyListBLock();
    }

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

                .addTo(controller)
                .on("enter leave", function (e) {
                    var $a = $(".ul-nav li.active a");
                    if( $a.length > 0 ){
                        addhashValue("active_secton_", $a.attr("data-link") );
                    }else{
                        removeHash("active_secton_");
                    }
                });
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

    /*init scroll offset*/
    if( window.location.hash.indexOf("active_secton_") > -1 ){
        console.log("scroll!");
        var sectAttr = getHashValue("active_secton_"),
            $ar = $("*[data-ar='"+sectAttr+"']");
        var arSC = $ar.offset().top;
        console.log("sectAttr="+sectAttr);

        TweenLite.to(window, 0, { ease: Sine.easeInOut, scrollTo: arSC});
    }
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
function articlesList(){
    createSlider( $(".articles-listPage .articles-list"), $(".articles-listPage .articles-list .item") );
}
function articlesDetail(){
    if( $(".articlesDetailPage").length == 0 && $(".tehnologyDetailPage").length == 0 ){ return false; }
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
function tehnologypage(){
    if( $("#tehnologyBlock").length == 0 ){return false;}
    var Shuffle = window.shuffle;
    var myelement = document.getElementById('itemsRow');
    // var sizer = element.querySelector('.my-sizer-element');

    // var shuffle = new Shuffle(element, {
    //     itemSelector: '.item',
    //     sizer: '.item',
    //     buffer: 1
    // });


    // ES7 will have Array.prototype.includes.
    function arrayIncludes(array, value) {
      return array.indexOf(value) !== -1;
    }

    // Convert an array-like object to a real array.
    function toArray(thing) {
      return Array.prototype.slice.call(thing);
    }

    var Demo = function (element) {
      //this.shapes = toArray(document.querySelectorAll('.linksBlock button'));
      this.category = toArray( $('.linksBlock .button:not(.reset)') );
      //console.log(this.category);
      this.shuffle = new Shuffle(element, {
        itemSelector: '#itemsRow .item',
        sizer: null,
        //buffer: 1

  // group: Shuffle.ALL_ITEMS, // Initial filter group.
  // speed: 250, // Transition/animation speed (milliseconds).
  // easing: 'ease', // CSS easing function to use.
  // itemSelector: '*', // e.g. '.picture-item'.
  // sizer: null, // Element or selector string. Use an element to determine the size of columns and gutters.
  // gutterWidth: 0, // A static number or function that tells the plugin how wide the gutters between columns are (in pixels).
  // columnWidth: 0, // A static number or function that returns a number which tells the plugin how wide the columns are (in pixels).
  // delimeter: null, // If your group is not json, and is comma delimeted, you could set delimeter to ','.
  // buffer: 0, // Useful for percentage based heights when they might not always be exactly the same (in pixels).
  // columnThreshold: 0.01, // Reading the width of elements isn't precise enough and can cause columns to jump between values.
  // initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method.
  // throttle: throttle, // By default, shuffle will throttle resize events. This can be changed or removed.
  // throttleTime: 300, // How often shuffle can be called on resize (in milliseconds).
  // staggerAmount: 15, // Transition delay offset for each item in milliseconds.
  // staggerAmountMax: 250, // Maximum stagger delay in milliseconds.
  // useTransforms: true, // Whether to use transforms or absolute positioning.
      });

      this.filters = {
        category: [],
      };

      this._bindEventListeners();
    };

    /**
     * Bind event listeners for when the filters change.
     */
    Demo.prototype._bindEventListeners = function () {
      //this._onShapeChange = this._handleShapeChange.bind(this);
      this._onColorChange = this._handleColorChange.bind(this);

      // this.shapes.forEach(function (input) {
      //   input.addEventListener('change', this._onShapeChange);
      // }, this);

      this.category.forEach(function (button) {
        button.addEventListener('click', this._onColorChange);
      }, this);
    };

    /**
     * Get the values of each checked input.
     * @return {Array.<string>}
     */
    // Demo.prototype._getCurrentShapeFilters = function () {
    //   return this.shapes.filter(function (input) {
    //     return input.checked;
    //   }).map(function (input) {
    //     return input.value;
    //   });
    // };

    /**
     * Get the values of each `active` button.
     * @return {Array.<string>}
     */
    Demo.prototype._getCurrentColorFilters = function () {
      return this.category.filter(function (button) {
        return button.classList.contains('active');
      }).map(function (button) {
        return button.getAttribute('data-val');
      });
    };

    /**
     * A shape input check state changed, update the current filters and filte.r
     */
    // Demo.prototype._handleShapeChange = function () {
    //   this.filters.shapes = this._getCurrentShapeFilters();
    //   this.filter();
    // };

    /**
     * A color button was clicked. Update filters and display.
     * @param {Event} evt Click event object.
     */
    Demo.prototype._handleColorChange = function (evt) {
      var button = evt.currentTarget;

      // Treat these buttons like radio buttons where only 1 can be selected.
      if (button.classList.contains('active')) {
        button.classList.remove('active');
        $(".linksBlock .button.reset").addClass("active");
      } else {
        this.category.forEach(function (btn) {
          btn.classList.remove('active');
        });

        button.classList.add('active');
        $(".linksBlock .button.reset").removeClass("active");
      }

      this.filters.category = this._getCurrentColorFilters();
      this.filter();
    };

    /**
     * Filter shuffle based on the current state of filters.
     */
    Demo.prototype.filter = function () {
      if (this.hasActiveFilters()) {
        this.shuffle.filter(this.itemPassesFilters.bind(this));
      } else {
        this.shuffle.filter(Shuffle.ALL_ITEMS);
      }
    };

    /**
     * If any of the arrays in the `filters` property have a length of more than zero,
     * that means there is an active filter.
     * @return {boolean}
     */
    Demo.prototype.hasActiveFilters = function () {
      return Object.keys(this.filters).some(function (key) {
        return this.filters[key].length > 0;
      }, this);
    };

    /**
     * Determine whether an element passes the current filters.
     * @param {Element} element Element to test.
     * @return {boolean} Whether it satisfies all current filters.
     */
    Demo.prototype.itemPassesFilters = fzunction (element) {
      //var shapes = this.filters.shapes;
      var category = this.filters.category;
      //var shape = element.getAttribute('data-shape');

    var cat = element.getAttribute('data-cat');
    var catArray = cat.split(" ");
    var catArrayLength = catArray.length;

    var flag = false;
    for( var i=0; i < catArrayLength; i++ ){
      if (category.length > 0 && arrayIncludes(category, catArray[i])) {
        flag = true;
      }
    }
    if( !flag ){
       return false; 
    }

      // If there are active shape filters and this shape is not in that array.
      // if (shapes.length > 0 && !arrayIncludes(shapes, shape)) {
      //   return false;
      // }

      // If there are active color filters and this color is not in that array.
      // if (category.length > 0 && !arrayIncludes(category, cat)) {
      //   return false;
      // }

      return true;
    };
    //document.addEventListener('DOMContentLoaded', function () {
        evenHeights([
           document.querySelectorAll('#itemsRow .item'),
        ]);
      window.demo = new Demo(myelement);
    //});

    $(".linksBlock .button.reset").on("click", function(){
        $(".linksBlock .button.active:not(.reset)").trigger("click");
    });
}

function salesList(){
    var $items = $(".salesItems .item"),
        $form = $(".recordForm");

    $items.on("click", function(){
        var $this = $(this),
            $thisDetail = $this.find(".detailText");
        $this.addClass("active");
        $.magnificPopup.open({
            items: {
                src: "<div class='defaultPopupContent mfp-with-anim'>"+$thisDetail[0].outerHTML+$form.html()+"</div>",
                type: 'inline'
            },
            removalDelay: 500, //delay removal by X to allow out-animation
            closeBtnInside: true,
            mainClass: 'mfp-with-zoom',
            callbacks: {
                beforeOpen: function() {
                    this.st.mainClass = "mfp-zoom-in defaultPopup salesPopup";
                },
                beforeClose: function() {
                    $this.removeClass("active");
                },
            },
            midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });
    });
}

function changeIconFill($icon, timeMin,timeMax){
    var time = getRandom(timeMin , timeMax);
    var colors = [
            "#822887",
            "#ed107a",
            "#005d97",
            "#1bbee8",
            "#7fb310",
            "#e6b317"
        ],
    colorsL = colors.length;

    flickerAnimate($icon);

    function flickerAnimate(object) {
        TweenMax.to(object, Math.random() * 0.5 + 0.5, {
            fill: colors[Math.floor(Math.random() * (1 + (colorsL-1) - 0) + 0)],
            delay: getRandom(timeMin , timeMax),
            onComplete: flickerAnimate,
            onCompleteParams: [object]
        });
    }
}
function pageAbout(){
    if( $(".aboutPage").length == 0 ){return false;}
    $(".aboutPage .titleBlock .icon").each(function(){
        changeIconFill( $(this), 3, 4 );
    });
    
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
    writeRewievForm();
    videoPlay();
/*END GLOBAL*/
/*homepage*/
    HPblueLinksBlock();
    HPinitSovetiBlock();
    recallsBlockSlider();
    HPmainSlider();
/*END homepage*/
/*page About*/
    pageAbout();
/*END page About*/
/*doctor*/
    detailDoctorInit();
    doctorDetail();
/*doctor END*/
/*teh*/
    tehnologypage();
/*teh end*/
/*servicesList*/
    servicesList();
/*end servicesList*/
/*servicesDetail*/
    servicesDetail();
/*servicesDetail END*/
/*articles*/
    articlesList();
    articlesDetail();
/*END articles*/
/*sales*/
    salesList();
/*end sales*/
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdXN0b21zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV2ZW4gSGVpZ2h0cyBwbHVnaW5cclxuICogQXV0aG9yOiBHbGVuIENoZW5leVxyXG4gKiBNb2RpZmllZDogMjAxNi0wMy0wOFxyXG4gKiBTZXRzIGEgY29sbGVjdGlvbiB0byBhbGwgYmUgdGhlIHNhbWUgaGVpZ2h0LlxyXG4gKlxyXG4gKiBVc2FnZTpcclxuICpcclxuICogZXZlbkhlaWdodHMoW1xyXG4gKiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb28nKSxcclxuICogXSk7XHJcbiAqXHJcbiAqL1xyXG53aW5kb3cuZXZlbkhlaWdodHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgZnVuY3Rpb24gZ2V0VGFsbGVzdChlbGVtZW50cykge1xyXG4gICAgdmFyIHRhbGxlc3QgPSAwO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSBlbGVtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBpZiAoZWxlbWVudHNbaV0ub2Zmc2V0SGVpZ2h0ID4gdGFsbGVzdCkge1xyXG4gICAgICAgIHRhbGxlc3QgPSBlbGVtZW50c1tpXS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGFsbGVzdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNldEFsbEhlaWdodHMoZWxlbWVudHMsIGhlaWdodCkge1xyXG4gICAgZm9yICh2YXIgaSA9IGVsZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGVsZW1lbnRzW2ldLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvciBncm91cHMgb2YgZWxlbWVudHMgd2hpY2ggc2hvdWxkIGJlIHRoZSBzYW1lIGhlaWdodC4gVXNpbmcgdGhpcyBtZXRob2RcclxuICAgKiB3aWxsIGNyZWF0ZSBmYXIgbGVzcyBzdHlsZSByZWNhbGN1bGF0aW9ucyBhbmQgbGF5b3V0cy5cclxuICAgKiBAcGFyYW0ge0FycmF5TGlrZS48QXJyYXlMaWtlLjxFbGVtZW50Pj59IGdyb3VwcyBBbiBhcnJheS1saWtlIGNvbGxlY3Rpb24gb2ZcclxuICAgKiAgICAgYW4gYXJyYXktbGlrZSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzLlxyXG4gICAqIEByZXR1cm4ge0FycmF5LjxudW1iZXI+fSBBbiBhcnJheSBjb250YWluaW5nIHRoZSBwaXhlbCB2YWx1ZSBvZiB0aGVcclxuICAgKiAgICAgdGFsbGVzdCBlbGVtZW50IGZvciBlYWNoIGdyb3VwLlxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGV2ZW5IZWlnaHRzKGdyb3Vwcykge1xyXG4gICAgZ3JvdXBzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZ3JvdXBzKTtcclxuXHJcbiAgICAvLyBGaXJzdCwgcmVzZXQgdGhlIGhlaWdodCBmb3IgZXZlcnkgZWxlbWVudC5cclxuICAgIC8vIFRoaXMgaXMgZG9uZSBmaXJzdCwgb3RoZXJ3aXNlIHdlIGRpcnR5IHRoZSBET00gb24gZWFjaCBsb29wIVxyXG4gICAgZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnRzKSB7XHJcbiAgICAgIHNldEFsbEhlaWdodHMoZWxlbWVudHMsICcnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE5vdywgbWVhc3VyZSBoZWlnaHRzIGluIGVhY2ggZ3JvdXAgYW5kIHNhdmUgdGhlIHRhbGxlc3QgdmFsdWUuIEluc3RlYWQgb2ZcclxuICAgIC8vIHNldHRpbmcgdGhlIGhlaWdodCB2YWx1ZSBmb3IgdGhlIGVudGlyZSBncm91cCwgc2F2ZSBpdC4gSWYgaXQgd2VyZSBzZXQsXHJcbiAgICAvLyB0aGUgbmV4dCBpdGVyYXRpb24gaW4gdGhlIGxvb3Agd291bGQgaGF2ZSB0byByZWNhbGN1bGF0ZSBzdHlsZXMgaW4gdGhlIERPTVxyXG4gICAgdmFyIHRhbGxlc3RzID0gZ3JvdXBzLm1hcChmdW5jdGlvbiAoZWxlbWVudHMpIHtcclxuICAgICAgcmV0dXJuIGdldFRhbGxlc3QoZWxlbWVudHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTGFzdGx5LCBzZXQgdGhlbSBhbGwuXHJcbiAgICBncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudHMsIGkpIHtcclxuICAgICAgc2V0QWxsSGVpZ2h0cyhlbGVtZW50cywgdGFsbGVzdHNbaV0gKyAncHgnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0YWxsZXN0cztcclxuICB9XHJcblxyXG4gIHJldHVybiBldmVuSGVpZ2h0cztcclxufSkoKTtcclxuXHJcblxyXG5BcnJheS5wcm90b3R5cGUubWF4ID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIHRoaXMpO1xyXG59O1xyXG5mdW5jdGlvbiBnZXRSYW5kb20obWluLCBtYXgpIHtcclxuICByZXR1cm4gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVIYXNoKHN0cmluZyl7XHJcbiAgICBpZiggd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZihzdHJpbmcpID09PSAtMSApeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGlmKCB3aW5kb3cubG9jYXRpb24uaGFzaC5pbmRleE9mKFwiJlwiKSA9PT0gLTEgKXtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiLVwiO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgdmFyIGhhc2hBcnIgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdChcIiZcIiksXHJcbiAgICAgICAgICAgIGhhc2hBcnJMID0gaGFzaEFyci5sZW5ndGg7XHJcbiAgICAgICAgZm9yKCB2YXIgaT0wOyBpIDwgaGFzaEFyckw7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCBoYXNoQXJyW2ldLmluZGV4T2Yoc3RyaW5nKSA+IC0xICl7XHJcbiAgICAgICAgICAgICAgICBoYXNoQXJyLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGlmKCBpID09PSAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaEFyclswXSA9IFwiI1wiICsgaGFzaEFyclswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCBoYXNoQXJyLmxlbmd0aCA+IDEgKXtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hBcnIuam9pbihcIiZcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hBcnJbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYWRkaGFzaFZhbHVlKHN0cmluZywgdmFsdWUpe1xyXG4gICAgLy/QvdC10YIg0YXQtdGI0LBcclxuICAgIGlmKCB3aW5kb3cubG9jYXRpb24uaGFzaC5sZW5ndGggPT0gMCApe1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gc3RyaW5nK3ZhbHVlO1xyXG4gICAgLy/QtdGB0YLRjCDRhdC10YhcclxuICAgIH1lbHNle1xyXG4gICAgICAgIC8v0L7QtNC40L0g0YXQtdGIXHJcbiAgICAgICAgaWYoIHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2YoXCImXCIpID09PSAtMSApe1xyXG4gICAgICAgICAgICAvL9C90LXRgiDRgtCw0LrQvtCz0L4g0YLQuNC/0LAg0YXQtdGI0LBcclxuICAgICAgICAgICAgaWYoIHdpbmRvdy5sb2NhdGlvbi5oYXNoLmluZGV4T2Yoc3RyaW5nKSA9PT0gLTEgKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoICs9IChcIiZcIitzdHJpbmcrdmFsdWUpO1xyXG4gICAgICAgICAgICAvL9C10YHRgtGMINGC0LDQutC+0Lkg0YLQuNC/INGF0LXRiNCwXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBzdHJpbmcrdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAvL9C80L3QvtC20LXRgdGC0LLQtdC90L3Ri9C5INGF0LXRiFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2YXIgaGFzaEFyciA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KFwiJlwiKSxcclxuICAgICAgICAgICAgICAgIGhhc2hBcnJMID0gaGFzaEFyci5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yKCB2YXIgaT0wOyBpPCBoYXNoQXJyTDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKCBoYXNoQXJyW2ldLmluZGV4T2Yoc3RyaW5nKSA+IC0xICl7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50cnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBpID09PSAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc2hBcnJbaV0gPSBcIiNcIitzdHJpbmcrdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc2hBcnJbaV0gPSBzdHJpbmcrdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCAhZW50cnkgKXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoICs9IChcIiZcIitzdHJpbmcrdmFsdWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaEFyci5qb2luKFwiJlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRIYXNoVmFsdWUoc3RyaW5nKXtcclxuICAgIHZhciBoYXNoVmFsdWUgPSBmYWxzZTtcclxuICAgIC8v0L7QtNC40L0g0YXQtdGIXHJcbiAgICBpZiggd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZihcIiZcIikgPT09IC0xICl7XHJcbiAgICAgICAgaGFzaFZhbHVlID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIitzdHJpbmcrXCJcIiwgXCJcIik7XHJcbiAgICAvL9C80L3QvtC20LXRgdGC0LLQtdC90L3Ri9C5INGF0LXRiFxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgdmFyIGhhc2hBcnIgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdChcIiZcIiksXHJcbiAgICAgICAgICAgIGhhc2hBcnJMID0gaGFzaEFyci5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciggdmFyIGkgPSAwOyBpIDwgaGFzaEFyckw7IGkrKyApe1xyXG4gICAgICAgICAgICBpZiggaGFzaEFycltpXS5pbmRleE9mKHN0cmluZykgPiAtMSApe1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbmFsQXJyID0gaGFzaEFycltpXS5zcGxpdChcIl9cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgZmluYWxBcnJMID0gZmluYWxBcnIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaGFzaFZhbHVlID0gZmluYWxBcnJbZmluYWxBcnJMLTFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoIGhhc2hWYWx1ZSApe1xyXG4gICAgICAgIHJldHVybiBoYXNoVmFsdWU7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItC90LXRgtGDINGC0LDQutC+0LPQviDRhdC10YjQsFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vIERlZmluZSB2YXJpYWJsZSBjb2xvcnMgICAgXHJcbmZ1bmN0aW9uIHNldFJhbmRvbUdyYWRpZW50KCRpdGVtcywgY29sb3JzQXJyYXkpe1xyXG4gICAgJGl0ZW1zLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gRmlyc3QgcmFuZG9tIGNvbG9yXHJcbiAgICAgICAgdmFyIHJhbmQxID0gY29sb3JzQXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29sb3JzQXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgLy8gU2Vjb25kIHJhbmRvbSBjb2xvclxyXG4gICAgICAgIHZhciByYW5kMiA9IGNvbG9yc0FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9yc0FycmF5Lmxlbmd0aCldO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBncmFkID0gJCh0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBDb252ZXJ0IEhleCBjb2xvciB0byBSR0JcclxuICAgICAgICBmdW5jdGlvbiBjb252ZXJ0SGV4KGhleCxvcGFjaXR5KXtcclxuICAgICAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2UoJyMnLCcnKTtcclxuICAgICAgICAgICAgciA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwyKSwgMTYpO1xyXG4gICAgICAgICAgICBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLDQpLCAxNik7XHJcbiAgICAgICAgICAgIGIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsNiksIDE2KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEFkZCBPcGFjaXR5IHRvIFJHQiB0byBvYnRhaW4gUkdCQVxyXG4gICAgICAgICAgICByZXN1bHQgPSAncmdiYSgnK3IrJywnK2crJywnK2IrJywnK29wYWNpdHkvMTAwKycpJztcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gR3JhZGllbnQgcnVsZXNcclxuICAgICAgICBncmFkLmNzcygnYmFja2dyb3VuZC1jb2xvcicsIGNvbnZlcnRIZXgocmFuZDEsNDApICk7XHJcbiAgICAgICAgZ3JhZC5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIFwiLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwJSxcIisgY29udmVydEhleChyYW5kMSw0MCkgK1wiKSwgY29sb3Itc3RvcCgxMDAlLFwiKyBjb252ZXJ0SGV4KHJhbmQyLDQwKSArXCIpKVwiKTtcclxuICAgICAgICBncmFkLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgXCItd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICBcIisgY29udmVydEhleChyYW5kMSw0MCkgK1wiIDAlLFwiKyBjb252ZXJ0SGV4KHJhbmQyLDQwKSArXCIgMTAwJSlcIik7XHJcbiAgICAgICAgZ3JhZC5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIFwiLW8tbGluZWFyLWdyYWRpZW50KHRvcCwgXCIrIGNvbnZlcnRIZXgocmFuZDEsNDApICtcIiAwJSxcIisgY29udmVydEhleChyYW5kMiw0MCkgK1wiIDEwMCUpXCIpO1xyXG4gICAgICAgIGdyYWQuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCBcIi1tcy1saW5lYXItZ3JhZGllbnQodG9wLCBcIisgY29udmVydEhleChyYW5kMSw0MCkgK1wiIDAlLFwiKyBjb252ZXJ0SGV4KHJhbmQyLDQwKSArXCIgMTAwJSlcIik7XHJcbiAgICAgICAgZ3JhZC5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIFwibGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgXCIrIGNvbnZlcnRIZXgocmFuZDEsNDApICtcIiAwJSxcIisgY29udmVydEhleChyYW5kMiw0MCkgK1wiIDEwMCUpXCIpO1xyXG4gICAgICAgIGdyYWQuY3NzKFwiZmlsdGVyXCIsIFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KCBzdGFydENvbG9yc3RyPSdcIisgY29udmVydEhleChyYW5kMSw0MCkgK1wiJywgZW5kQ29sb3JzdHI9J1wiKyBjb252ZXJ0SGV4KHJhbmQyLDQwKSArXCInLEdyYWRpZW50VHlwZT0wIClcIik7XHJcbiAgICAgICAgXHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vKmZ1bmN0aW9ucyBFTkQqL1xyXG5cclxuXHJcbnZhciB4aHIsXHJcbiAgICBteUdsb2JhbEZvckhvbWVwYWdlTWFpblNsaWRlciA9IGZhbHNlLFxyXG4gICAgbXlHbG9iYWxpc01vYmlsZURldmljZSA9IGZhbHNlLFxyXG4gICAgaXNDaHJvbWUgPSAvQ2hyb21lLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmIC9Hb29nbGUgSW5jLy50ZXN0KG5hdmlnYXRvci52ZW5kb3IpO1xyXG5cclxud2luZG93Lm1vYmlsZUFuZFRhYmxldGNoZWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgbXlHbG9iYWxpc01vYmlsZURldmljZSA9IGZhbHNlO1xyXG4gIChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgY2V8eGRhfHhpaW5vfGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrL2kudGVzdChhKXx8LzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLDQpKSkgbXlHbG9iYWxpc01vYmlsZURldmljZSA9IHRydWU7fSkobmF2aWdhdG9yLnVzZXJBZ2VudHx8bmF2aWdhdG9yLnZlbmRvcnx8d2luZG93Lm9wZXJhKTtcclxuICByZXR1cm4gbXlHbG9iYWxpc01vYmlsZURldmljZTtcclxufTtcclxubW9iaWxlQW5kVGFibGV0Y2hlY2soKTtcclxuaWYoIG15R2xvYmFsaXNNb2JpbGVEZXZpY2UgKXtcclxuICAgICQoXCJodG1sXCIpLmF0dHIoXCJpZFwiLCBcIm1vYmlsZVwiKTtcclxufVxyXG5mdW5jdGlvbiBzZXRGb290ZXJQYWRkaW5nKCl7XHJcbiAgICB2YXIgaCA9ICQoXCJmb290ZXJcIikub3V0ZXJIZWlnaHQoKTtcclxuICAgICQoXCIjbWFpbldyYXBwZXJcIikuY3NzKHtcInBhZGRpbmctYm90dG9tXCI6IGh9KTtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBvcHRpb25TZWxlY3QoJGVsZW1lbnQpe1xyXG4gICAgaWYoIG15R2xvYmFsaXNNb2JpbGVEZXZpY2UgKXsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICB2YXIgJHMgPSAkZWxlbWVudC5maW5kKFwic2VsZWN0XCIpO1xyXG4gICAgJCgnc2VsZWN0Om5vdCgucmVjYWxsc0ZpbHRlciknKS5zZWxlY3RyaWMoe1xyXG4gICAgICAgIGRpc2FibGVPbk1vYmlsZTogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdmFyICRzcyA9ICRzLmNsb3Nlc3QoXCIuc2VsZWN0cmljLXdyYXBwZXJcIikuZmluZChcIi5zZWxlY3RyaWMtc2Nyb2xsXCIpXHJcbiAgICAkc3MubmljZVNjcm9sbCh7XHJcbiAgICAgICAgY3Vyc29yY29sb3I6ICcjMWJiZWU4JyxcclxuICAgICAgICBjdXJzb3J3aWR0aDogJzVweCcsXHJcbiAgICAgICAgY3Vyc29yYm9yZGVycmFkaXVzOiAnMnB4JyxcclxuICAgICAgICBjdXJzb3Jib3JkZXI6ICcwcHggc29saWQgIzFiYmVlOCcsXHJcbiAgICAgICAgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICBzY3JvbGxzcGVlZDogNzAsXHJcbiAgICAgICAgbW91c2VzY3JvbGxzdGVwOiA1MCxcclxuICAgICAgICByYWlsb2Zmc2V0OiB7dG9wOiAwLCByaWdodDogMCwgbGVmdDogMCwgYm90dG9tOiAwfSxcclxuICAgICAgICBjdXJzb3JvcGFjaXR5bWluOiAxLFxyXG4gICAgICAgIGN1cnNvcm9wYWNpdHltYXg6IDEsXHJcbiAgICAgICAgaG9yaXpyYWlsZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgemluZGV4OiAyLFxyXG4gICAgICAgIG5hdGl2ZXBhcmVudHNjcm9sbGluZzogdHJ1ZSxcclxuICAgICAgICBhdXRvaGlkZW1vZGU6IGZhbHNlXHJcbiAgICB9KTtcclxufTtcclxuZnVuY3Rpb24gY3VzdG9taXplUmFkaW9ib3goJGVsZW1lbnQpe1xyXG4gICAgdmFyICRyQm94ID0gJGVsZW1lbnQuZmluZChcImlucHV0W3R5cGU9J3JhZGlvJ11cIik7XHJcbiAgICBpZiggISRyQm94Lmxlbmd0aCA+IDAgKXtyZXR1cm4gZmFsc2U7fVxyXG4gICAgJHJCb3guZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykud3JhcChcIjxzcGFuIGNsYXNzPSdjdXN0b20tcmFkaW9ib3gnIC8+XCIpLmFmdGVyKCc8c3BhbiBjbGFzcz1cImJveFwiPjxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPjwvc3Bhbj4nKTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGN1c3RvbWl6ZUNoZWNrYm94KCAkZWxlbWVudCApe1xyXG4gICAgdmFyICRjQm94ID0gJGVsZW1lbnQuZmluZChcImlucHV0W3R5cGU9J2NoZWNrYm94J11cIik7XHJcbiAgICBpZiggISRjQm94Lmxlbmd0aCA+IDAgKXtyZXR1cm4gZmFsc2U7fVxyXG4gICAgJGNCb3guZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykud3JhcChcIjxzcGFuIGNsYXNzPSdjdXN0b20tY2hlY2tib3gnIC8+XCIpLmFmdGVyKCc8c3BhbiBjbGFzcz1cImJveFwiPjxzcGFuIGNsYXNzPVwidGlja1wiPjwvc3Bhbj48L3NwYW4+Jyk7XHJcbiAgICB9KTtcclxufTtcclxuZnVuY3Rpb24gSFBibHVlTGlua3NCbG9jaygpe1xyXG4gICAgdmFyIG1hcz1bXTtcclxuICAgICQoXCIuYmx1ZUJsb2NrTGlua3M+YVwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbWFzLnB1c2goJCh0aGlzKS5vdXRlckhlaWdodCgpKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIG1heEggPSBtYXMubWF4KCk7XHJcbiAgICAkKFwiLmJsdWVCbG9ja0xpbmtzPmFcIikuY3NzKHsgaGVpZ2h0IDogbWF4SCB9KTtcclxufVxyXG5mdW5jdGlvbiBIUG1haW5TbGlkZXIoKXtcclxuICAgIGlmKCAhJChcIiNocF9zbGlkZXJcIikubGVuZ3RoID4gMCApeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgdmFyICRibG9jayA9ICQoXCIjaHBfc2xpZGVyXCIpLFxyXG4gICAgICAgICRzbGlkZXMgPSAkYmxvY2suZmluZChcIi5zbGlkZVwiKSxcclxuICAgICAgICBzbGlkZXNDb3VudCA9ICRzbGlkZXMubGVuZ3RoLFxyXG4gICAgICAgIHNsaWRlckludGVydmFsLFxyXG4gICAgICAgIGN1cixcclxuICAgICAgICBhbmlUaW1lID0gMC41LFxyXG4gICAgICAgIGFuaURpc3QgPSA1MDA7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFNsaWRlcigpe1xyXG4gICAgICAgIFR3ZWVuTWF4LnNldCgkKCcjaHBfc2xpZGVyJyksIHtwZXJzcGVjdGl2ZTo1MDB9KTtcclxuICAgICAgICBjdXIgPSAoJHNsaWRlcy5maWx0ZXIoXCIuY3VycmVudFwiKS5sZW5ndGg+MCA/ICRzbGlkZXMuZmlsdGVyKFwiLmN1cnJlbnRcIikuaW5kZXgoKSA6IDAgKTtcclxuICAgICAgICBpZiggY3VyID09PSAwICl7XHJcbiAgICAgICAgICBuZXh0Q3VySW5kZXggPSBjdXIrMTtcclxuICAgICAgICAgIHByZXZJbmRleCA9IGN1ci0xO1xyXG4gICAgICAgIH1lbHNlIGlmKCBjdXIgPT09IHNsaWRlc0NvdW50LTEgKXtcclxuICAgICAgICAgIG5leHRDdXJJbmRleCA9IDA7XHJcbiAgICAgICAgICBwcmV2SW5kZXggPSBzbGlkZXNDb3VudC0yO1xyXG4gICAgICAgIH1lbHNlIGlmKCBjdXIgIT09IDAgKXtcclxuICAgICAgICAgIG5leHRDdXJJbmRleCA9IGN1cisxO1xyXG4gICAgICAgICAgcHJldkluZGV4ID0gY3VyLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYW5kb20xID0gZ2V0UmFuZG9tKC01LCA1KTtcclxuICAgICAgICAgICAgcmFuZG9tMiA9IGdldFJhbmRvbSgtNSwgNSk7XHJcbiAgICAgICAgICAgIHJhbmRvbTMgPSBnZXRSYW5kb20oLTUsIDUpO1xyXG5cclxuICAgICAgICBUd2Vlbk1heC5zZXQoICRzbGlkZXMsIHsgdHJhbnNmb3JtT3JpZ2luOic1MCUgNTAlJywgYXV0b0FscGhhOiAwLCB6IDoxIH0pO1xyXG4gICAgICAgIFR3ZWVuTWF4LnNldCggJHNsaWRlcy5lcShjdXIpLCB7IHJvdGF0aW9uOiByYW5kb20xLCB6SW5kZXggOiAyLCBjbGFzc05hbWU6XCIrPWN1cnJlbnRcIiwgYXV0b0FscGhhOiAxLCB4OjAgfSk7XHJcbiAgICAgICAgVHdlZW5NYXguc2V0KCAkc2xpZGVzLmVxKGN1cikuZmluZChcIi5kZXNjXCIpLCB7IHJvdGF0aW9uOiAtcmFuZG9tMX0pO1xyXG4gICAgICAgIFR3ZWVuTWF4LnNldCggJHNsaWRlcy5lcShuZXh0Q3VySW5kZXgpLCB7IHJvdGF0aW9uOiByYW5kb20yLCB4OiBhbmlEaXN0LCBzY2FsZTogMC41LCB6SW5kZXg6IDEsIGF1dG9BbHBoYTogMSB9KTtcclxuICAgICAgICBUd2Vlbk1heC5zZXQoICRzbGlkZXMuZXEocHJldkluZGV4KSwgeyByb3RhdGlvbjogcmFuZG9tMywgeDogLWFuaURpc3QsIHNjYWxlOiAwLjUsIHpJbmRleDoxLCBhdXRvQWxwaGE6IDEgfSk7XHJcbiAgICB9XHJcbiAgICBpbml0U2xpZGVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2xpZGUoZGlyKXtcclxuICAgICAgICBjdXJJbmRleCA9ICRzbGlkZXMuZmlsdGVyKFwiLmN1cnJlbnRcIikuaW5kZXgoKTtcclxuICAgICAgICB2YXIgbmV4dEluZGV4LFxyXG4gICAgICAgICAgICBwcmV2SW5kZXgsXHJcbiAgICAgICAgICAgIG5ld0luZGV4O1xyXG5cclxuICAgICAgICBpZigoZGlyID09PSBcInJpZ2h0XCIpICYmIChjdXJJbmRleCAhPT0gc2xpZGVzQ291bnQtMSkpe1xyXG4gICAgICAgICAgbmV4dEluZGV4ID0gY3VySW5kZXgrMTtcclxuICAgICAgICAgIHByZXZJbmRleCA9IGN1ckluZGV4LTE7XHJcbiAgICAgICAgICBuZXdTaG93SW5kZXggPSBjdXJJbmRleCsyO1xyXG4gICAgICAgIH1lbHNlIGlmKChkaXIgPT09IFwicmlnaHRcIikgJiYgKGN1ckluZGV4ID09PSBzbGlkZXNDb3VudC0xKSl7XHJcbiAgICAgICAgICBuZXh0SW5kZXggPSAwO1xyXG4gICAgICAgICAgcHJldkluZGV4ID0gc2xpZGVzQ291bnQtMjtcclxuICAgICAgICAgIG5ld1Nob3dJbmRleCA9IDE7XHJcbiAgICAgICAgfWVsc2UgaWYoKGRpciA9PT0gXCJsZWZ0XCIpICYmIChjdXJJbmRleCAhPT0gMCkpe1xyXG4gICAgICAgICAgbmV4dEluZGV4ID0gY3VySW5kZXgtMTtcclxuICAgICAgICAgIHByZXZJbmRleCA9IGN1ckluZGV4KzE7XHJcbiAgICAgICAgICBuZXdTaG93SW5kZXggPSBjdXJJbmRleC0yO1xyXG4gICAgICAgICAgaWYoIGN1ckluZGV4ID09PSBzbGlkZXNDb3VudC0xICl7XHJcbiAgICAgICAgICAgIG5leHRJbmRleCA9IHNsaWRlc0NvdW50LTI7XHJcbiAgICAgICAgICAgIHByZXZJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIG5ld1Nob3dJbmRleCA9IHNsaWRlc0NvdW50LTM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYoKGRpciA9PT0gXCJsZWZ0XCIpICYmIChjdXJJbmRleCA9PT0gMCkpe1xyXG4gICAgICAgICAgbmV4dEluZGV4ID0gc2xpZGVzQ291bnQtMTtcclxuICAgICAgICAgIHByZXZJbmRleCA9IGN1ckluZGV4KzE7XHJcbiAgICAgICAgICBuZXdTaG93SW5kZXggPSBzbGlkZXNDb3VudC0yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJhbmRvbTEgPSBnZXRSYW5kb20oLTUsIDUpO1xyXG4gICAgICAgICAgICByYW5kb20yID0gZ2V0UmFuZG9tKC01LCA1KTtcclxuICAgICAgICAgICAgcmFuZG9tMyA9IGdldFJhbmRvbSgtNSwgNSk7XHJcbiAgICAgICAgICAgIHJhbmRvbTQgPSBnZXRSYW5kb20oLTUsIDUpO1xyXG5cclxuICAgICAgICB2YXIgeEZyb207XHJcbiAgICAgICAgaWYoIChkaXIgPT09IFwicmlnaHRcIikgKXtcclxuICAgICAgICAgICAgeEZyb20gPSBhbmlEaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB4RnJvbSA9IC1hbmlEaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIG5ld1Nob3dJbmRleCA+IHNsaWRlc0NvdW50LTEgKXtcclxuICAgICAgICAgICAgbmV3U2hvd0luZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIG5ld1Nob3dJbmRleCA8IDAgKXtcclxuICAgICAgICAgICAgbmV3U2hvd0luZGV4ID0gc2xpZGVzQ291bnQtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHNsaWRlcy5yZW1vdmVDbGFzcyhcImN1ckluZGV4IG5leHRJbmRleCBwcmV2SW5kZXggbmV3U2hvd0luZGV4XCIpIDtcclxuICAgICAgICAkc2xpZGVzLmVxKGN1ckluZGV4KS5hZGRDbGFzcyhcImN1ckluZGV4XCIpO1xyXG4gICAgICAgICRzbGlkZXMuZXEobmV4dEluZGV4KS5hZGRDbGFzcyhcIm5leHRJbmRleFwiKTtcclxuICAgICAgICAkc2xpZGVzLmVxKHByZXZJbmRleCkuYWRkQ2xhc3MoXCJwcmV2SW5kZXhcIik7XHJcbiAgICAgICAgJHNsaWRlcy5lcShuZXdTaG93SW5kZXgpLmFkZENsYXNzKFwibmV3U2hvd0luZGV4XCIpO1xyXG5cclxuICAgICAgICBUd2Vlbk1heC50byggJHNsaWRlcy5lcShjdXJJbmRleCksIGFuaVRpbWUgLCB7IHJvdGF0aW9uOiByYW5kb20xLCB4OiAteEZyb20sIHo6MSwgc2NhbGU6IDAuNSwgekluZGV4OiAxIH0pO1xyXG4gICAgICAgIFR3ZWVuTWF4LnRvKCAkc2xpZGVzLmVxKG5leHRJbmRleCksIGFuaVRpbWUgLCB7IHJvdGF0aW9uOiByYW5kb20yLCB4OiAwLCB6OjEsIHNjYWxlOiAxLCB6SW5kZXg6IDIgfSk7XHJcbiAgICAgICAgVHdlZW5NYXguc2V0KCAkc2xpZGVzLmVxKG5leHRJbmRleCkuZmluZChcIi5kZXNjXCIpLCB7IHJvdGF0aW9uOiAtcmFuZG9tMiwgejoxfSk7XHJcbiAgICAgICAgVHdlZW5NYXgudG8oICRzbGlkZXMuZXEocHJldkluZGV4KSwgYW5pVGltZSAsIHsgcm90YXRpb246IHJhbmRvbTMsIHg6IC14RnJvbSoxLjIsIGF1dG9BbHBoYTogMCwgejoxLCBzY2FsZTogMC4zLCB6SW5kZXg6IDAgfSk7XHJcbiAgICAgICAgVHdlZW5NYXguZnJvbVRvKCAkc2xpZGVzLmVxKG5ld1Nob3dJbmRleCksIGFuaVRpbWUgLCB7IHJvdGF0aW9uOiByYW5kb200LCBzY2FsZTogMC4zLCB6OjEsIGF1dG9BbHBoYTogMCwgeDogeEZyb20qMS4yICB9LCB7IHJvdGF0aW9uIDpyYW5kb200LCB6OjEsIHNjYWxlOiAwLjUsIGF1dG9BbHBoYTogMSwgeDogeEZyb20gfSApO1xyXG5cclxuXHJcbiAgICAgICAgJHNsaWRlcy5yZW1vdmVDbGFzcyhcImN1cnJlbnQgc3RhcnRcIik7XHJcbiAgICAgICAgJHNsaWRlcy5lcShuZXh0SW5kZXgpLmFkZENsYXNzKFwiY3VycmVudFwiKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyICRsYSA9ICRibG9jay5maW5kKFwiLmxlZnQtYXJyb3dcIik7XHJcbiAgICAgICAgJGxhLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2xpZGUoXCJsZWZ0XCIpO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHNsaWRlckludGVydmFsKTtcclxuICAgICAgICAgICAgaWYoICFteUdsb2JhbGlzTW9iaWxlRGV2aWNlICl7XHJcbiAgICAgICAgICAgICAgICBteUludGVydmFsTWFpblNsaWRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgdmFyICRyYSA9ICRibG9jay5maW5kKFwiLnJpZ2h0LWFycm93XCIpO1xyXG4gICAgICAgICRyYS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNsaWRlKFwicmlnaHRcIik7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBpZiggIW15R2xvYmFsaXNNb2JpbGVEZXZpY2UgKXtcclxuICAgICAgICAgICAgICAgIG15SW50ZXJ2YWxNYWluU2xpZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB2YXIgaGFtU2xpZGVyID0gbmV3IEhhbW1lcigkYmxvY2tbMF0sIHtcclxuICAgICAgICB0b3VjaEFjdGlvbjogXCJhdXRvXCJcclxuICAgIH0pO1xyXG4gICAgaGFtU2xpZGVyLm9uKCdzd2lwZWxlZnQnLCBmdW5jdGlvbihldikge1xyXG4gICAgICAgIHNsaWRlKFwicmlnaHRcIik7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgaWYoICFteUdsb2JhbGlzTW9iaWxlRGV2aWNlICl7XHJcbiAgICAgICAgICAgIG15SW50ZXJ2YWxNYWluU2xpZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBoYW1TbGlkZXIub24oJ3N3aXBlcmlnaHQnLCBmdW5jdGlvbihldikge1xyXG4gICAgICAgIHNsaWRlKFwibGVmdFwiKTtcclxuICAgICAgICBjbGVhckludGVydmFsKHNsaWRlckludGVydmFsKTtcclxuICAgICAgICBpZiggIW15R2xvYmFsaXNNb2JpbGVEZXZpY2UgKXtcclxuICAgICAgICAgICAgbXlJbnRlcnZhbE1haW5TbGlkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBteUludGVydmFsTWFpblNsaWRlcigpe1xyXG4gICAgICAgIHNsaWRlckludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2xpZGUoXCJyaWdodFwiKTtcclxuICAgICAgICB9LCA0NTAwKTtcclxuICAgIH1cclxuICAgIG15SW50ZXJ2YWxNYWluU2xpZGVyKCk7XHJcblxyXG4gICAgJGJsb2NrLm9uKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2xpZGVySW50ZXJ2YWwpO1xyXG4gICAgfSk7XHJcbiAgICAkYmxvY2sub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzbGlkZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgbXlJbnRlcnZhbE1haW5TbGlkZXIoKTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGluaXRCb3R0b21NZW51KCl7XHJcbiAgICBpZiggISQoXCIjYm90dG9tTWVudSAubWVudUl0ZW1cIikubGVuZ3RoID4gMCApeyByZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgICQoXCIjYm90dG9tTWVudSAubWVudUl0ZW0ubGVmdFwiKS53cmFwQWxsKFwiPGRpdiBjbGFzcz0ndy0xZDZjb2wgbWVudUxjJz48L2Rpdj5cIik7XHJcbiAgICAkKFwiI2JvdHRvbU1lbnUgLm1lbnVJdGVtLm1pZGRsZVwiKS53cmFwQWxsKFwiPGRpdiBjbGFzcz0ndy0xZDZjb2wgbWVudU1jJz48L2Rpdj5cIik7XHJcbiAgICAkKFwiI2JvdHRvbU1lbnUgLm1lbnVJdGVtLnJpZ2h0XCIpLndyYXBBbGwoXCI8ZGl2IGNsYXNzPSd3LTFkNGNvbCBtZW51UmMnPjwvZGl2PlwiKTtcclxuXHJcbiAgICBzZXRGb290ZXJQYWRkaW5nKCk7XHJcbn1cclxuZnVuY3Rpb24gcGFnZW5hdGlvbkhlbHBlcigpe1xyXG4gICAgJCgnLnBhZ2VuYXRpb24gLm5hdkhlbHBlcicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIHZhciB0aGlzbWF4ID0gcGFyc2VJbnQoJHRoaXMuZGF0YShcIm1heFwiKSk7XHJcbiAgICAgICAgJHRoaXMuaW5wdXRtYXNrKFwibnVtZXJpY1wiLCB7XHJcbiAgICAgICAgICAgIG1pbjogMSxcclxuICAgICAgICAgICAgbWF4OiB0aGlzbWF4XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgICQoXCIucGFnZW5hdGlvbiAuY2VudGVyVGV4dEJsb2NrXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgJHRiID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgJGhiID0gJCh0aGlzKS5uZXh0KFwiLm5hdkhlbHBlclwiKSxcclxuICAgICAgICAgICAgJHBhZyA9ICQodGhpcykuY2xvc2VzdChcIi5wYWdlbmF0aW9uXCIpO1xyXG4gICAgICAgICR0Yi5oaWRlKCk7XHJcbiAgICAgICAgJGhiLnNob3coKTtcclxuICAgICAgICAkcGFnLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICRoYi5mb2N1cygpO1xyXG4gICAgfSk7XHJcbiAgICAkKCcucGFnZW5hdGlvbiAubmF2SGVscGVyJykub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDEzICYmICQodGhpcykudmFsKCkubGVuZ3RoICE9PSAwICkge1xyXG4gICAgICAgICAgICBpZiggJCh0aGlzKS5oYXNDbGFzcyhcIm5vSHJlZlwiKSApe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHBhZyA9ICQodGhpcykuY2xvc2VzdChcIi5wYWdlbmF0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXIgPSAkcGFnLnByZXYoXCIuZGVmYXVsdFNsaWRlclwiKSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJPVCA9ICRzbGlkZXIub2Zmc2V0KCkudG9wLTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICRzbGlkZXMgPSAkc2xpZGVyLmZpbmQoXCIuc2xpZGVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzTCA9ICRzbGlkZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICRjdXJTbGlkZSA9ICRzbGlkZXIuZmluZChcIi5zbGlkZS5jdXJyZW50XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1ckluZGV4ID0gJGN1clNsaWRlLmluZGV4KCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEN1ckluZGV4ID0gJCh0aGlzKS52YWwoKS0xO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCBjdXJJbmRleCA9PT0gbmV4dEN1ckluZGV4ICl7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgICAgICAgICAgICRzbGlkZXMucmVtb3ZlQ2xhc3MoXCJjdXJyZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgJHNsaWRlcy5lcShuZXh0Q3VySW5kZXgpLmFkZENsYXNzKFwiY3VycmVudFwiKTtcclxuICAgICAgICAgICAgICAgICRwYWcuZmluZChcIi5jZW50ZXJUZXh0QmxvY2sgLmN1ciAucGFnZVwiKS50ZXh0KG5leHRDdXJJbmRleCsxKTtcclxuICAgICAgICAgICAgICAgICRwYWcuZmluZChcIi5wcmV2XCIpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICAkcGFnLmZpbmQoXCIubmV4dFwiKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoIG5leHRDdXJJbmRleCA9PSAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhZy5maW5kKFwiLnByZXZcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKCBuZXh0Q3VySW5kZXggPT0gc2xpZGVzTC0xICl7XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhZy5maW5kKFwiLm5leHRcIikuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLnBhZ2VuYXRpb24uYWN0aXZlIC5uYXZIZWxwZXJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5wYWdlbmF0aW9uLmFjdGl2ZSAuY2VudGVyVGV4dEJsb2NrXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICQoXCIucGFnZW5hdGlvbi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVyLmNzcyh7IFwiaGVpZ2h0XCIgOiAkc2xpZGVzLmVxKG5leHRDdXJJbmRleCkub3V0ZXJIZWlnaHQoKSB9KTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byh3aW5kb3csIDAuNCwgeyBlYXNlOiBTaW5lLmVhc2VJbk91dCwgc2Nyb2xsVG86IHNsaWRlck9UfSk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwic2xfcGFnZV9cIisobmV4dEN1ckluZGV4KzEpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYmx1cigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRMb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY3VycmVudExvY2F0aW9uK1wiP1BBR0VOXzE9XCIrJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmICgoJChcIi5wYWdlbmF0aW9uLmFjdGl2ZVwiKS5sZW5ndGggPiAwKSAmJiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIucGFnZW5hdGlvblwiKS5sZW5ndGggPCAxKSApIHtcclxuICAgICAgICAgICAgJChcIi5wYWdlbmF0aW9uLmFjdGl2ZSAubmF2SGVscGVyXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIi5wYWdlbmF0aW9uLmFjdGl2ZSAuY2VudGVyVGV4dEJsb2NrXCIpLnNob3coKTtcclxuICAgICAgICAgICAgJChcIi5wYWdlbmF0aW9uLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBIUGluaXRTb3ZldGlCbG9jaygpe1xyXG4gICAgaWYoICEkKFwiLmhvbWVwYWdlIC5zb3ZldGlCbG9jayAuaXRlbVwiKS5sZW5ndGggPiAwICl7IHJldHVybiBmYWxzZTt9XHJcbiAgICB2YXIgJGl0ZW1zID0gJChcIi5ob21lcGFnZSAuc292ZXRpQmxvY2sgLml0ZW1cIiksXHJcbiAgICAgICAgY29scyA9IDMsXHJcbiAgICAgICAgaXRlbXNMID0gJGl0ZW1zLmxlbmd0aCxcclxuICAgICAgICBjb3VudEIgPSBNYXRoLmNlaWwoaXRlbXNML2NvbHMpLFxyXG4gICAgICAgIGNvdW50TCA9IE1hdGguZmxvb3IoaXRlbXNML2NvbHMpO1xyXG5cclxuICAgIGZvcih2YXIgaSA9IDAsIGsgPSAwOyBpIDwgY29sczsgaSsrICkge1xyXG4gICAgICAgIGlmKCBpIDwgaXRlbXNMJWNvbHMgKSB7XHJcbiAgICAgICAgICAgICRpdGVtcy5zbGljZShrLCBrK2NvdW50Qikud3JhcEFsbChcIjxkaXYgY2xhc3M9J3ctMWNvbCc+PC9kaXY+XCIpO1xyXG4gICAgICAgICAgICBrID0gaytjb3VudEI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGl0ZW1zLnNsaWNlKGssIGsrY291bnRMKS53cmFwQWxsKFwiPGRpdiBjbGFzcz0ndy0xY29sJz48L2Rpdj5cIik7XHJcbiAgICAgICAgICAgIGsgPSBrK2NvdW50TDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEhQaW5pdERvY3RvcnNCbG9jaygpe1xyXG4gICAgaWYoICEkKFwiLmhvbWVwYWdlIC5kb2N0b3JzLWxpc3QgLmNvbFwiKS5sZW5ndGggPiAwICl7IHJldHVybiBmYWxzZTt9XHJcbiAgICB2YXIgJGJsb2NrID0gJChcIi5ob21lcGFnZSAuZG9jdG9ycy1saXN0XCIpLFxyXG4gICAgJGNvbHMgPSAkYmxvY2suZmluZChcIi5jb2xcIiksXHJcbiAgICBjb2xzTCA9ICRjb2xzLmxlbmd0aCxcclxuICAgICRvdmVyRmxvd3MgPSAkYmxvY2suZmluZChcIi5pdGVtT3ZlcmZsb3dcIiksXHJcbiAgICAkbGlua3MgPSAkYmxvY2suZmluZChcIi5pdGVtXCIpO1xyXG5cclxuXHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY29sc0w7IGkrPTQpIHtcclxuICAgICAgJGNvbHMuc2xpY2UoaSwgaSs0KS53cmFwQWxsKFwiPGRpdiBjbGFzcz0ncm93IGNsZWFyJz48L2Rpdj5cIik7XHJcbiAgICB9XHJcbiAgICBUd2VlbkxpdGUuc2V0KCAkbGlua3MsIHsgekluZGV4OjAgfSk7XHJcblxyXG4gICAgdmFyIGdyYWRDb2xvcnMgPSBbXCIjZjBmMWYzXCIsXCIjOTVlZGQ0XCIsXCIjZDdlZmUyXCIsIFwiI2I4YzJiYVwiLCBcIiNlZGY0ZDVcIl07XHJcblxyXG4gICAgc2V0UmFuZG9tR3JhZGllbnQoJGxpbmtzLCBncmFkQ29sb3JzKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0SWNvbnMoKXtcclxuICAgICAgICAkb3ZlckZsb3dzLmVhY2goZnVuY3Rpb24oaSAsIGVsKXtcclxuICAgICAgICAgICAgdmFyICRvdmVyZmxvdyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAkY29sID0gJG92ZXJmbG93LmNsb3Nlc3QoXCIuY29sXCIpLFxyXG4gICAgICAgICAgICAgICAgJGxpbmsgPSAkY29sLmZpbmQoXCIuaXRlbVwiKSxcclxuICAgICAgICAgICAgICAgICRpdyA9ICRsaW5rLmZpbmQoXCIuaXdcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzSW5pdFJvdGF0ZSA9IGdldFJhbmRvbSgtNyAsIDcpO1xyXG5cclxuICAgICAgICAgICAgVHdlZW5NYXguc2V0KCAkb3ZlcmZsb3csIHsgcm90YXRpb246IHRoaXNJbml0Um90YXRlICwgbGVmdDogXCI3NnB4XCIsIHRvcDogXCI3NnB4XCIsICB4OiBcIi01MCVcIiwgeTpcIi01MCVcIiwgdHJhbnNmb3JtT3JpZ2luOiBcIjUwJSA1MCVcIiwgekluZGV4OjF9KTtcclxuICAgICAgICAgICAgdmFyIHRsID0gbmV3IFRpbWVsaW5lTWF4KHtcclxuICAgICAgICAgICAgICAgIHBhdXNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbi8vekluZGV4OiA0LCB3aWR0aDogXCIzODBweFwiLCBsZWZ0OiAwLCB0b3A6IDAsIGhlaWdodDogJGl3Lm91dGVySGVpZ2h0KCksIHg6IFwiMCVcIiwgeTogXCIwJVwiXHJcbiAgICAgICAgICAgIHRsLmZyb21UbyggJG92ZXJmbG93LCAwLjEyLCBcclxuICAgICAgICAgICAgICB7cm90YXRpb246IHRoaXNJbml0Um90YXRlLCBsZWZ0OiBcIjc2cHhcIiwgdG9wOiBcIjc2cHhcIiwgeDogXCItNTAlXCIsIHk6XCItNTAlXCIsIHRyYW5zZm9ybU9yaWdpbjogXCI1MCUgNTAlXCIsIHpJbmRleDoxfSxcclxuICAgICAgICAgICAgICB7IHJvdGF0aW9uIDogMCwgZWFzZTpDaXJjLmVhc2VJbiB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKCAkb3ZlcmZsb3csIDAuMTIsIHsgXCJib3JkZXItd2lkdGhcIiA6IDAsIGVhc2U6Q2lyYy5lYXNlSW4gfSlcclxuICAgICAgICAgICAgICAgIC5mcm9tVG8oJGxpbmssIDAuMDEsIHt6SW5kZXg6IDB9LCB7IHpJbmRleDogMyB9KVxyXG4gICAgICAgICAgICAgICAgLnRvKCAkbGluaywgMC4xNywgeyB3aWR0aDogXCIzODBweFwiLCBib3hTaGFkb3c6IFwiMHB4IDI4cHggODBweCAwcHggcmdiYSg1Niw2Nyw3MCwwLjUpXCIsIGhlaWdodDogJGl3Lm91dGVySGVpZ2h0KCksIGNsYXNzTmFtZTonKz1jb21wbGV0ZScsIGVhc2U6UG93ZXIwLmVhc2VOb25lIH0pO1xyXG5cclxuICAgICAgICAgICAgJG92ZXJmbG93LmFkZCgkbGluaykub24oXCJtb3VzZWVudGVyXCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICB0bC5wYXVzZSgpLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICRjb2wuYWRkQ2xhc3MoXCJob3ZlclwiKTtcclxuICAgICAgICAgICAgfSkub24oXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRsLnBhdXNlKCkucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgJGNvbC5yZW1vdmVDbGFzcyhcImhvdmVyXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBpbml0SWNvbnMoKTtcclxuICAgICQoXCIuaG9tZXBhZ2UgLmRvY3RvcnMtbGlzdFwiKS5jc3Moe3Zpc2liaWxpdHk6XCJ2aXNpYmxlXCJ9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNvbnRhY3RzbWFwKCl7XHJcbiAgICBpZiggJChcImZvb3RlciAjY29udGFjdHNNYXBcIikubGVuZ3RoID09IDAgKXsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICB5bWFwcy5yZWFkeShpbml0KTtcclxuICAgIGZ1bmN0aW9uIGluaXQgKCkge1xyXG4gICAgICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJjb250YWN0c01hcFwiLCB7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXI6IFs1NS43ODc3MTgsIDM3LjUxNjk2MF0sXHJcbiAgICAgICAgICAgICAgICB6b29tOiAxNixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzOiBbXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6ICd5YW5kZXgjc2VhcmNoJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoJ3Njcm9sbFpvb20nKTtcclxuXHJcbiAgICAgICAgLy8g0KHQvtC30LTQsNC00LjQvCDQv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60LjQuSDQvNCw0LrQtdGCINC/0L7Qu9C30YPQvdC60LAg0LzQsNGB0YjRgtCw0LHQsC5cclxuICAgICAgICB2YXIgWm9vbUxheW91dCA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcIjxkaXY+XFxcclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9J3pvb20taW4nIGNsYXNzPSdidG4nPjxpIGNsYXNzPSdpY29uLXBsdXMnPjwvaT5cXFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+PGRpdiBpZD0nem9vbS1vdXQnIGNsYXNzPSdidG4nPjxpIGNsYXNzPSdpY29uLW1pbnVzJz48L2k+PC9kaXY+XFxcclxuICAgICAgICAgICAgPC9kaXY+XCIsIHtcclxuXHJcbiAgICAgICAgICAgIC8vINCf0LXRgNC10L7Qv9GA0LXQtNC10LvRj9C10Lwg0LzQtdGC0L7QtNGLINC80LDQutC10YLQsCwg0YfRgtC+0LHRiyDQstGL0L/QvtC70L3Rj9GC0Ywg0LTQvtC/0L7Qu9C90LjRgtC10LvRjNC90YvQtSDQtNC10LnRgdGC0LLQuNGPXHJcbiAgICAgICAgICAgIC8vINC/0YDQuCDQv9C+0YHRgtGA0L7QtdC90LjQuCDQuCDQvtGH0LjRgdGC0LrQtSDQvNCw0LrQtdGC0LAuXHJcbiAgICAgICAgICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDQktGL0LfRi9Cy0LDQtdC8INGA0L7QtNC40YLQtdC70YzRgdC60LjQuSDQvNC10YLQvtC0IGJ1aWxkLlxyXG4gICAgICAgICAgICAgICAgWm9vbUxheW91dC5zdXBlcmNsYXNzLmJ1aWxkLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0J/RgNC40LLRj9C30YvQstCw0LXQvCDRhNGD0L3QutGG0LjQuC3QvtCx0YDQsNCx0L7RgtGH0LjQutC4INC6INC60L7QvdGC0LXQutGB0YLRgyDQuCDRgdC+0YXRgNCw0L3Rj9C10Lwg0YHRgdGL0LvQutC4XHJcbiAgICAgICAgICAgICAgICAvLyDQvdCwINC90LjRhSwg0YfRgtC+0LHRiyDQv9C+0YLQvtC8INC+0YLQv9C40YHQsNGC0YzRgdGPINC+0YIg0YHQvtCx0YvRgtC40LkuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21JbkNhbGxiYWNrID0geW1hcHMudXRpbC5iaW5kKHRoaXMuem9vbUluLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuem9vbU91dENhbGxiYWNrID0geW1hcHMudXRpbC5iaW5kKHRoaXMuem9vbU91dCwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0J3QsNGH0LjQvdCw0LXQvCDRgdC70YPRiNCw0YLRjCDQutC70LjQutC4INC90LAg0LrQvdC+0L/QutCw0YUg0LzQsNC60LXRgtCwLlxyXG4gICAgICAgICAgICAgICAgJCgnI3pvb20taW4nKS5iaW5kKCdjbGljaycsIHRoaXMuem9vbUluQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgJCgnI3pvb20tb3V0JykuYmluZCgnY2xpY2snLCB0aGlzLnpvb21PdXRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAkKCcjeWFQYW5vcmFtYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5jb250YWN0c01hcFBhbm9yYW1hLXdyYXBwZXJcIikuY3NzKHtcInotaW5kZXhcIjogMX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjY29udGFjdHNNYXBcIikuY3NzKHtcInotaW5kZXhcIjogMH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8g0KHQvdC40LzQsNC10Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDQutC70LjQutC+0LIuXHJcbiAgICAgICAgICAgICAgICAkKCcjem9vbS1pbicpLnVuYmluZCgnY2xpY2snLCB0aGlzLnpvb21JbkNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICQoJyN6b29tLW91dCcpLnVuYmluZCgnY2xpY2snLCB0aGlzLnpvb21PdXRDYWxsYmFjayk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g0JLRi9C30YvQstCw0LXQvCDRgNC+0LTQuNGC0LXQu9GM0YHQutC40Lkg0LzQtdGC0L7QtCBjbGVhci5cclxuICAgICAgICAgICAgICAgIFpvb21MYXlvdXQuc3VwZXJjbGFzcy5jbGVhci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgem9vbUluOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFwID0gdGhpcy5nZXREYXRhKCkuY29udHJvbC5nZXRNYXAoKTtcclxuICAgICAgICAgICAgICAgIC8vINCT0LXQvdC10YDQuNGA0YPQtdC8INGB0L7QsdGL0YLQuNC1LCDQsiDQvtGC0LLQtdGCINC90LAg0LrQvtGC0L7RgNC+0LVcclxuICAgICAgICAgICAgICAgIC8vINGN0LvQtdC80LXQvdGCINGD0L/RgNCw0LLQu9C10L3QuNGPINC40LfQvNC10L3QuNGCINC60L7RjdGE0YTQuNGG0LjQtdC90YIg0LzQsNGB0YjRgtCw0LHQuNGA0L7QstCw0L3QuNGPINC60LDRgNGC0YsuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5maXJlKCd6b29tY2hhbmdlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZFpvb206IG1hcC5nZXRab29tKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Wm9vbTogbWFwLmdldFpvb20oKSArIDFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYoICBtYXAuZ2V0Wm9vbSgpIDwgMTUgICl7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgem9vbU91dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hcCA9IHRoaXMuZ2V0RGF0YSgpLmNvbnRyb2wuZ2V0TWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5maXJlKCd6b29tY2hhbmdlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZFpvb206IG1hcC5nZXRab29tKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Wm9vbTogbWFwLmdldFpvb20oKSAtIDFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgem9vbUNvbnRyb2wgPSBuZXcgeW1hcHMuY29udHJvbC5ab29tQ29udHJvbCh7IG9wdGlvbnM6IHsgbGF5b3V0OiBab29tTGF5b3V0IH0gfSk7XHJcbiAgICAgICAgLypFTkQgQ1VTVE9NIFpPT00gQ09OVFJPTCBCVVRUT05TKi9cclxuXHJcbiAgICAgICAgLy8g0KHQvtC30LTQsNC10Lwg0LPQtdC+0L7QsdGK0LXQutGCINGBINGC0LjQv9C+0Lwg0LPQtdC+0LzQtdGC0YDQuNC4IFwi0KLQvtGH0LrQsFwiLlxyXG4gICAgICAgIG15R2VvT2JqZWN0ID0gbmV3IHltYXBzLkdlb09iamVjdCh7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBwb2x5bGluZSA9IG5ldyB5bWFwcy5Qb2x5bGluZShbXHJcbiAgICAgICAgICAgIFs1NS43Njk0MTEsIDM3LjU5NjU5MV0sIFs1NS43Njg5NzYsIDM3LjU5NTgxOV0sIFs1NS43Njk2MjMsIDM3LjU5NDcxNF0sIFs1NS43NjkxNjQsIDM3LjU5MzczN10sIFs1NS43NzAwNDAsIDM3LjU5MjI0Nl0sIFs1NS43Njg3MTYsIDM3LjU4OTgzMl1cclxuICAgICAgICBdLCB7XHJcbiAgICAgICAgICAgIGhpbnRDb250ZW50OiBcItCf0YPRgtGMINC+0YIg0LzQtdGC0YDQvlwiXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogJyNlNDAwMmInLFxyXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogNCxcclxuICAgICAgICAgICAgb3BhY2l0eTogMC42LFxyXG4gICAgICAgICAgICAvLyDQn9C10YDQstC+0Lkg0YbQuNGE0YDQvtC5INC30LDQtNCw0LXQvCDQtNC70LjQvdGDINGI0YLRgNC40YXQsC4g0JLRgtC+0YDQvtC5INGG0LjRhNGA0L7QuSDQt9Cw0LTQsNC10Lwg0LTQu9C40L3RgyDRgNCw0LfRgNGL0LLQsC5cclxuICAgICAgICAgICAgc3Ryb2tlU3R5bGU6ICcxIDAnXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgY2hpbGRtYXJrID0gbmV3IHltYXBzLkdlb09iamVjdCh7XHJcbiAgICAgICAgICAgIC8vINCe0L/QuNGB0LDQvdC40LUg0LPQtdC+0LzQtdGC0YDQuNC4LlxyXG4gICAgICAgICAgICBnZW9tZXRyeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQb2ludFwiLFxyXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFs1NS43ODc3OTMsIDM3LjUxOTM0NF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8g0KHQstC+0LnRgdGC0LLQsC5cclxuICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgLy8g0JrQvtC90YLQtdC90YIg0LzQtdGC0LrQuC5cclxuICAgICAgICAgICAgICAgIGljb25Db250ZW50OiAn0JTQtdGC0YHQutCw0Y8g0YHRgtC+0LzQsNGC0L7Qu9C+0LPQuNGPINCg0YPQlNC10L3RgtCwIEtpZHMnLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAvLyDQntC/0YbQuNC4LlxyXG4gICAgICAgICAgICAvLyDQmNC60L7QvdC60LAg0LzQtdGC0LrQuCDQsdGD0LTQtdGCINGA0LDRgdGC0Y/Qs9C40LLQsNGC0YzRgdGPINC/0L7QtCDRgNCw0LfQvNC10YAg0LXQtSDRgdC+0LTQtdGA0LbQuNC80L7Qs9C+LlxyXG4gICAgICAgICAgICBwcmVzZXQ6ICdpc2xhbmRzI2RhcmtHcmVlblN0cmV0Y2h5SWNvbicsXHJcbiAgICAgICAgICAgIC8vINCc0LXRgtC60YMg0LzQvtC20L3QviDQv9C10YDQtdC80LXRidCw0YLRjC5cclxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgcGFycmVudG1hcmsgPSBuZXcgeW1hcHMuR2VvT2JqZWN0KHtcclxuICAgICAgICAgICAgLy8g0J7Qv9C40YHQsNC90LjQtSDQs9C10L7QvNC10YLRgNC40LguXHJcbiAgICAgICAgICAgIGdlb21ldHJ5OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBvaW50XCIsXHJcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogWzU1Ljc4NzEzNCwgMzcuNTE5NzczXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyDQodCy0L7QudGB0YLQstCwLlxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICAgICAgICAvLyDQmtC+0L3RgtC10L3RgiDQvNC10YLQutC4LlxyXG4gICAgICAgICAgICAgICAgaWNvbkNvbnRlbnQ6ICdD0YLQvtC80LDRgtC+0LvQvtCz0LjRjyDQoNGD0JTQtdC90YLQsCcsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIC8vINCe0L/RhtC40LguXHJcbiAgICAgICAgICAgIC8vINCY0LrQvtC90LrQsCDQvNC10YLQutC4INCx0YPQtNC10YIg0YDQsNGB0YLRj9Cz0LjQstCw0YLRjNGB0Y8g0L/QvtC0INGA0LDQt9C80LXRgCDQtdC1INGB0L7QtNC10YDQttC40LzQvtCz0L4uXHJcbiAgICAgICAgICAgIHByZXNldDogJ2lzbGFuZHMjcmVkU3RyZXRjaHlJY29uJyxcclxuICAgICAgICAgICAgLy8g0JzQtdGC0LrRgyDQvNC+0LbQvdC+INC/0LXRgNC10LzQtdGJ0LDRgtGMLlxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIG15TWFwLmdlb09iamVjdHMuYWRkKG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1Ljc4Nzc5MywgMzcuNTE5MzQ0XSwge1xyXG4gICAgICAgIC8vICAgICAgICAgLy9iYWxsb29uQ29udGVudDogJ9GG0LLQtdGCIDxzdHJvbmc+0LPQvtC70YPQsdC+0Lk8L3N0cm9uZz4nLFxyXG4gICAgICAgIC8vICAgICAgICAgLy9pY29uQ2FwdGlvbjogJ9C/0YDQvtC10LfQtCDQkdC10YDQtdC30L7QstC+0Lkg0KDQvtGJ0LgsIDgnXHJcbiAgICAgICAgLy8gICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWNvbkNvbnRlbnQ6ICfQlNC10YLRgdC60LDRjyDRgdGC0L7QvNCw0YLQvtC70L7Qs9C40Y8g0KDRg9CU0LXQvdGC0LAgS2lkcycsXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0sIHtcclxuICAgICAgICAvLyAgICAgICAgIHByZXNldDogJ2lzbGFuZHMjZGFya0dyZWVuU3RyZXRjaHlJY29uJyxcclxuICAgICAgICAvLyB9KSk7XHJcblxyXG4gICAgICAgIC8vIG15TWFwLmdlb09iamVjdHMuYWRkKG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1Ljc4NzEzNCwgMzcuNTE5NzczXSwge1xyXG4gICAgICAgIC8vICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGljb25Db250ZW50OiAnQ9GC0L7QvNCw0YLQvtC70L7Qs9C40Y8g0KDRg9CU0LXQvdGC0LAnLFxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9LCB7XHJcbiAgICAgICAgLy8gICAgICAgICBwcmVzZXQ6ICdpc2xhbmRzI3JlZFN0cmV0Y2h5SWNvbicsXHJcbiAgICAgICAgLy8gfSkpO1xyXG4gICAgICAgIG15TWFwLmdlb09iamVjdHNcclxuICAgICAgICAgICAgLmFkZChjaGlsZG1hcmspXHJcbiAgICAgICAgICAgIC5hZGQocGFycmVudG1hcmspO1xyXG4gICAgICAgICAgICAvLy5hZGQocG9seWxpbmUpO1xyXG5cclxuICAgICAgICBteU1hcC5jb250cm9scy5hZGQoem9vbUNvbnRyb2wsIHtcclxuICAgICAgICAgICAgZmxvYXQ6ICdub25lJyxcclxuICAgICAgICAgICAgcG9zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0OiAzMCxcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogNTBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB2aWRlb1BsYXkoKXtcclxuICAgIGZ1bmN0aW9uIGN1c3RvbVZpZGVvUGxheWVyKCl7XHJcbiAgICBpZiggJCgnLnZpZGVvLWpzJykubGVuZ3RoID09IDAgKXsgcmV0dXJuIGZhbHNlO31cclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgXCJjb250cm9sc1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImF1dG9wbGF5XCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcInByZWxvYWRcIjogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgIFwiZmx1aWRcIjogdHJ1ZSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZnc1BsYXllciA9IHZpZGVvanMoJ3ZpZDEnLCB7XHJcbiAgICAgICAgICB0ZWNoT3JkZXI6IFtcImh0bWw1XCIsIFwiZmxhc2hcIiwgXCJ5b3V0dWJlXCJdLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICB5b3V0dWJlOiB7IFwiaXZfbG9hZF9wb2xpY3lcIjogMyB9LFxyXG4gICAgICAgICAgc291cmNlczogW3tcclxuICAgICAgICAgICAgICB0eXBlOiBcInZpZGVvL21wNFwiLFxyXG4gICAgICAgICAgICAgIHNyYzogXCJodHRwOi8vZGlzdHJpYnV0aW9uLmJiYjNkLnJlbmRlcmZhcm1pbmcubmV0L3ZpZGVvL21wNC9iYmJfc3VuZmxvd2VyXzEwODBwXzYwZnBzX25vcm1hbC5tcDRcIlxyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAvL3ZpZGVvLmF0dHIoJ3Bvc3RlcicsICdodHRwOi8vMXgxcHgubWUvMDAwMDAwLTAucG5nJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcInZpZGVvLnZpZGVvLWpzXCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGRhdGFEZXAgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWRlcFwiKTtcclxuXHJcbiAgICAgICAgICAgIHZnc1BsYXllciA9IHZpZGVvanMoJ3ZpZDEnLCB7XHJcbiAgICAgICAgICAgICAgdGVjaE9yZGVyOiBbXCJodG1sNVwiLCBcImZsYXNoXCIsIFwieW91dHViZVwiXSxcclxuICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB5b3V0dWJlOiB7IFwiaXZfbG9hZF9wb2xpY3lcIjogMyB9LFxyXG4gICAgICAgICAgICAgICAgc291cmNlczogW3tcclxuICAgICAgICAgICAgICAgICAgdHlwZTogXCJ2aWRlby95b3V0dWJlXCIsXHJcbiAgICAgICAgICAgICAgICAgIHNyYzogXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWtrR2VPV1lPRm9BXCJcclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAvL3ZpZGVvLmF0dHIoJ3Bvc3RlcicsICdodHRwOi8vMXgxcHgubWUvMDAwMDAwLTAucG5nJylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZnc1BsYXllci5yZWFkeShmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbXlQbGF5ZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgbXlQbGF5ZXIudm9sdW1lKDAuNSk7XHJcbiAgICAgICAgICAgICAgICBteVBsYXllci5vbigndGltZXVwZGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVGltZSA9IGN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lID0gbXlQbGF5ZXIuY3VycmVudFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbXlQbGF5ZXIub24oJ3NlZWtpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIG15UGxheWVyLmNvbnRyb2xCYXIucHJvZ3Jlc3NDb250cm9sLnNlZWtCYXIudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSwgMTAwKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2hvd1ZpZGVvKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvRWwgPSAkKFwiLnZpZGVvUG9wdXBbZGF0YS1kZXA9J1wiK2RhdGFEZXArXCInXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkLm1hZ25pZmljUG9wdXAub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHZpZGVvRWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5saW5lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmFsRGVsYXk6IDUwMCwgLy9kZWxheSByZW1vdmFsIGJ5IFggdG8gYWxsb3cgb3V0LWFuaW1hdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9IFwibWZwLXpvb20taW5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWlkQ2xpY2s6IHRydWUgLy8gYWxsb3cgb3BlbmluZyBwb3B1cCBvbiBtaWRkbGUgbW91c2UgY2xpY2suIEFsd2F5cyBzZXQgaXQgdG8gdHJ1ZSBpZiB5b3UgZG9uJ3QgcHJvdmlkZSBhbHRlcm5hdGl2ZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKFwiLnZpZGVvUGxheUJ1dHRvbltkYXRhLWRlcD0nXCIrZGF0YURlcCtcIiddXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBzaG93VmlkZW8oKTtcclxuICAgICAgICAgICAgICAgICAgICBteVBsYXllci5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvLyB2aWRlb2pzKCAkdGhpc1swXSwgb3B0aW9ucywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAvLyB9KS5yZWFkeShmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgbXlQbGF5ZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIHByZXZpb3VzVGltZSA9IDA7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAgbXlQbGF5ZXIudm9sdW1lKDAuNSk7XHJcbiAgICAgICAgICAgIC8vICAgICBteVBsYXllci5vbigndGltZXVwZGF0ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHByZXZpb3VzVGltZSA9IGN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGN1cnJlbnRUaW1lID0gbXlQbGF5ZXIuY3VycmVudFRpbWUoKTtcclxuICAgICAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgbXlQbGF5ZXIub24oJ3NlZWtpbmcnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gICAgIG15UGxheWVyLmNvbnRyb2xCYXIucHJvZ3Jlc3NDb250cm9sLnNlZWtCYXIudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gfSwgMTAwKVxyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgZnVuY3Rpb24gc2hvd1ZpZGVvKCl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdmFyIHZpZGVvRWwgPSAkKFwiLnZpZGVvUG9wdXBbZGF0YS1kZXA9J1wiK2RhdGFEZXArXCInXVwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAkLm1hZ25pZmljUG9wdXAub3Blbih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBzcmM6IHZpZGVvRWwsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB0eXBlOiAnaW5saW5lJ1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICByZW1vdmFsRGVsYXk6IDUwMCwgLy9kZWxheSByZW1vdmFsIGJ5IFggdG8gYWxsb3cgb3V0LWFuaW1hdGlvblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9IFwibWZwLXpvb20taW5cIjtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgbWlkQ2xpY2s6IHRydWUgLy8gYWxsb3cgb3BlbmluZyBwb3B1cCBvbiBtaWRkbGUgbW91c2UgY2xpY2suIEFsd2F5cyBzZXQgaXQgdG8gdHJ1ZSBpZiB5b3UgZG9uJ3QgcHJvdmlkZSBhbHRlcm5hdGl2ZSBzb3VyY2UuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAkKFwiLnZpZGVvUGxheUJ1dHRvbltkYXRhLWRlcD0nXCIrZGF0YURlcCtcIiddXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBzaG93VmlkZW8oKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBteVBsYXllci5wbGF5KCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBjdXN0b21WaWRlb1BsYXllcigpO1xyXG59XHJcbmZ1bmN0aW9uIHpvb21HYWxsZXJ5UG9wdXAoKXtcclxuICAgIGlmKCAhJCgnLnpvb20tZ2FsbGVyeScpLmxlbmd0aCA+IDAgKXsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAkKCcuem9vbS1nYWxsZXJ5JykubWFnbmlmaWNQb3B1cCh7XHJcbiAgICAgICAgZGVsZWdhdGU6ICdhJyxcclxuICAgICAgICB0eXBlOiAnaW1hZ2UnLFxyXG4gICAgICAgIGNsb3NlT25Db250ZW50Q2xpY2s6IGZhbHNlLFxyXG4gICAgICAgIGNsb3NlQnRuSW5zaWRlOiBmYWxzZSxcclxuICAgICAgICBtYWluQ2xhc3M6ICdtZnAtd2l0aC16b29tIG1mcC1pbWctbW9iaWxlJyxcclxuICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICB2ZXJ0aWNhbEZpdDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gdGl0bGVTcmM6IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBpdGVtLmVsLmF0dHIoJ3RpdGxlJykgKyAnICZtaWRkb3Q7IDxhIGNsYXNzPVwiaW1hZ2Utc291cmNlLWxpbmtcIiBocmVmPVwiJytpdGVtLmVsLmF0dHIoJ2RhdGEtc291cmNlJykrJ1wiIHRhcmdldD1cIl9ibGFua1wiPmltYWdlIHNvdXJjZTwvYT4nO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnYWxsZXJ5OiB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHpvb206IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDMwMCwgLy8gZG9uJ3QgZm9nZXQgdG8gY2hhbmdlIHRoZSBkdXJhdGlvbiBhbHNvIGluIENTU1xyXG4gICAgICAgICAgICBvcGVuZXI6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmZpbmQoJ2ltZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZGV0YWlsRG9jdG9ySW5pdCgpe1xyXG4gICAgaWYoICEkKFwiLmRvY3Rvci1kZXRhaWwgLnRvcEJsb2NrOm5vdCguY29sb3JTZXQpXCIpLmxlbmd0aCA+IDAgKXsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICB2YXIgY2xhc3NlcyA9IFtcInBpbmtcIixcImRCbHVlXCIsXCJsQmx1ZVwiLFwiZ3JlZW5cIixcInllbGxvd1wiLCBcInB1cnBsZVwiXTtcclxuICAgIHZhciBjbCA9IGNsYXNzZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmNsYXNzZXMubGVuZ3RoKV07XHJcbiAgICAkKFwiLmRvY3Rvci1kZXRhaWwgLnRvcEJsb2NrXCIpLmFkZENsYXNzKGNsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVjYWxsc0Jsb2NrU2xpZGVyKCl7XHJcbiAgICBpZiggISQoXCIucmVjYWxsc0Jsb2NrU2xpZGVyIC5pdGVtXCIpLmxlbmd0aCA+IDAgKXsgcmV0dXJuIGZhbHNlO31cclxuXHJcbiAgICB2YXIgJGJsb2NrID0gJChcIi5yZWNhbGxzQmxvY2tTbGlkZXJcIiksXHJcbiAgICAgICAgJGl0ZW1zVyA9ICRibG9jay5maW5kKFwiLml0ZW1zXCIpLFxyXG4gICAgICAgICRzbGlkZXMgPSAkYmxvY2suZmluZChcIi5pdGVtXCIpLFxyXG4gICAgICAgIHNsaWRlc0NvdW50ID0gJHNsaWRlcy5sZW5ndGgsXHJcbiAgICAgICAgY3VyLFxyXG4gICAgICAgIGN1ckNsYXNzO1xyXG5cclxuICAgICAgICB2YXIgb2JqZWN0ID0gJCgnLm9iamVjdCcpO1xyXG4gICAgICAgIHZhciBzID0gU25hcCgnI3BlcnNvblN2ZycpO1xyXG4gICAgICAgIHZhciBwYXRoTSA9IHMuc2VsZWN0KCcucGF0aE0nKTtcclxuICAgICAgICB2YXIgcGF0aEIgPSBzLnNlbGVjdCgnLnBhdGhCJyk7XHJcbiAgICAgICAgdmFyIHBhdGhSID0gcy5zZWxlY3QoJy5wYXRoUicpO1xyXG4gICAgICAgIHZhciBwYXRoTCA9IHMuc2VsZWN0KCcucGF0aEwnKTtcclxuICAgICAgICB2YXIgdGltZXJJTjtcclxuXHJcbiAgICAgICAgaWYoICRzbGlkZXMuZmlsdGVyKFwiLmN1cnJlbnRcIikubGVuZ3RoID09IDAgKXtcclxuICAgICAgICAgICAgJHNsaWRlcy5lcSgwKS5hZGRDbGFzcyhcImN1cnJlbnRcIik7XHJcbiAgICAgICAgICAgIGN1ciA9IDA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGN1ciA9ICRzbGlkZXMuZmlsdGVyKFwiLmN1cnJlbnRcIikuaW5kZXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVHdlZW5NYXguc2V0KCAkaXRlbXNXLCB7IGhlaWdodDogJHNsaWRlcy5lcShjdXIpLm91dGVySGVpZ2h0KCkgfSk7XHJcbiAgICAgICAgVHdlZW5NYXguc2V0KCAkc2xpZGVzLmZpbHRlcihcIi5jdXJyZW50XCIpLCB7IGF1dG9BbHBoYToxLCBcInotaW5kZXhcIjogMiB9KTtcclxuXHJcbiAgICAgICAgaWYoICRzbGlkZXMuZmlsdGVyKFwiLmN1cnJlbnRcIikuaGFzQ2xhc3MoXCJtYWxlXCIpICl7XHJcbiAgICAgICAgICAgIGN1ckNsYXNzID0gXCJtYWxlXCI7XHJcbiAgICAgICAgfWVsc2UgaWYoICRzbGlkZXMuZmlsdGVyKFwiLmN1cnJlbnRcIikuaGFzQ2xhc3MoXCJmZW1hbGVcIikgKXtcclxuICAgICAgICAgICAgY3VyQ2xhc3MgPSBcImZlbWFsZVwiO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjdXJDbGFzcyA9IFwidW5pc2V4XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiggJHNsaWRlcy5sZW5ndGggPT0gMCl7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzbGlkZShkaXIsIGluZGV4KXtcclxuICAgICAgICAgICAgY3VyID0gJHNsaWRlcy5maWx0ZXIoXCIuY3VycmVudFwiKS5pbmRleCgpO1xyXG4gICAgICAgICAgICBpZiggJHNsaWRlcy5maWx0ZXIoXCIuY3VycmVudFwiKS5oYXNDbGFzcyhcIm1hbGVcIikgKXtcclxuICAgICAgICAgICAgICAgIGN1ckNsYXNzID0gXCJtYWxlXCI7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKCAkc2xpZGVzLmZpbHRlcihcIi5jdXJyZW50XCIpLmhhc0NsYXNzKFwiZmVtYWxlXCIpICl7XHJcbiAgICAgICAgICAgICAgICBjdXJDbGFzcyA9IFwiZmVtYWxlXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY3VyQ2xhc3MgPSBcInVuaXNleFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV4dEN1cixcclxuICAgICAgICAgICAgICAgIG5leHRDdXJDbGFzcztcclxuICAgICAgICAgICAgaWYoKGRpciA9PT0gXCJyaWdodFwiKSAmJiAoY3VyICE9PSBzbGlkZXNDb3VudC0xKSl7XHJcbiAgICAgICAgICAgICAgbmV4dEN1ciA9IGN1cisxO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZigoZGlyID09PSBcInJpZ2h0XCIpICYmIChjdXIgPT09IHNsaWRlc0NvdW50LTEpKXtcclxuICAgICAgICAgICAgICBuZXh0Q3VyID0gMDtcclxuICAgICAgICAgICAgfWVsc2UgaWYoKGRpciA9PT0gXCJsZWZ0XCIpICYmIChjdXIgIT09IDApKXtcclxuICAgICAgICAgICAgICBuZXh0Q3VyID0gY3VyLTE7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKChkaXIgPT09IFwibGVmdFwiKSAmJiAoY3VyID09PSAwKSl7XHJcbiAgICAgICAgICAgICAgbmV4dEN1ciA9IHNsaWRlc0NvdW50LTE7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbmV4dEN1ciA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgaWYobmV4dEN1ciA+IGN1cil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpciA9IFwicmlnaHRcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKG5leHRDdXIgPCBjdXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkaXIgPSBcImxlZnRcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoICRzbGlkZXMuZXEobmV4dEN1cikuaGFzQ2xhc3MoXCJtYWxlXCIpICl7XHJcbiAgICAgICAgICAgICAgICBuZXh0Q3VyQ2xhc3MgPSBcIm1hbGVcIjtcclxuICAgICAgICAgICAgfWVsc2UgaWYoICRzbGlkZXMuZXEobmV4dEN1cikuaGFzQ2xhc3MoXCJmZW1hbGVcIikgKXtcclxuICAgICAgICAgICAgICAgIG5leHRDdXJDbGFzcyA9IFwiZmVtYWxlXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbmV4dEN1ckNsYXNzID0gXCJ1bmlzZXhcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKCBjdXJDbGFzcyAhPSBuZXh0Q3VyQ2xhc3MgKXtcclxuICAgICAgICAgICAgICAgIC8vIEtVVEUudG8oJy5wYXRoTScsIHsgcGF0aDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wicGF0aE1cIl0sIGF0dHI6IHsgZmlsbDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wiY29sb3JcIl0gfSB9LCB7ZGVsYXk6IDEwLCBkdXJhdGlvbjogMTAwMCwgbW9ycGhJbmRleDo1NTB9ICkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIC8vIEtVVEUudG8oJy5wYXRoQicsIHsgcGF0aDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wicGF0aEJcIl0sIGF0dHI6IHsgZmlsbDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wiY29sb3JcIl0gfSB9LCB7ZGVsYXk6IDIwLCBkdXJhdGlvbjogMTAwMCwgbW9ycGhJbmRleDo1NTB9ICkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIC8vIEtVVEUudG8oJy5wYXRoUicsIHsgcGF0aDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wicGF0aFJcIl0sIGF0dHI6IHsgZmlsbDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wiY29sb3JcIl0gfSB9LCB7ZGVsYXk6IDMwLCBkdXJhdGlvbjogMTAwMCwgbW9ycGhJbmRleDo1NTB9ICkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIC8vIEtVVEUudG8oJy5wYXRoTCcsIHsgcGF0aDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wicGF0aExcIl0sIGF0dHI6IHsgZmlsbDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wiY29sb3JcIl0gfSB9LCB7ZGVsYXk6IDQwLCBkdXJhdGlvbjogMTAwMCwgbW9ycGhJbmRleDo1NTB9ICkuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3BhdGhNLmFuaW1hdGUoeyAncGF0aCcgOiBwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJwYXRoTVwiXSwgZmlsbDpwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJjb2xvclwiXSB9LCAxMDAwMCwgbWluYS5ib3VuY2UpO1xyXG4gICAgICAgICAgICAgICAgLy9wYXRoQi5hbmltYXRlKHsgJ3BhdGgnIDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wicGF0aEJcIl0sIGZpbGw6cGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wiY29sb3JcIl0gfSwgMTAwMDAsIG1pbmEuYm91bmNlKTtcclxuICAgICAgICAgICAgICAgIC8vcGF0aFIuYW5pbWF0ZSh7ICdwYXRoJyA6IHBlcnNvblN2Z0pzb25bbmV4dEN1ckNsYXNzXVtcInBhdGhSXCJdLCBmaWxsOnBlcnNvblN2Z0pzb25bbmV4dEN1ckNsYXNzXVtcImNvbG9yXCJdIH0sIDEwMDAwLCBtaW5hLmJvdW5jZSk7XHJcbiAgICAgICAgICAgICAgICAvL3BhdGhMLmFuaW1hdGUoeyAncGF0aCcgOiBwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJwYXRoTFwiXSwgZmlsbDpwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJjb2xvclwiXSB9LCAxMDAwMCwgbWluYS5ib3VuY2UpO1xyXG4gICAgICAgICAgICAgICAgcGF0aE0uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySU4pO1xyXG4gICAgICAgICAgICAgICAgVHdlZW5NYXgudG8oICQoJyNwZXJzb25TdmcnKSwgMC4yLCB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9BbHBoYTowLCBcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoTS5hdHRyKHsncGF0aCcgOiBwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJwYXRoTVwiXSwgZmlsbDpwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJjb2xvclwiXSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aEIuYXR0cih7J3BhdGgnIDogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wicGF0aEJcIl0sIGZpbGw6cGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wiY29sb3JcIl0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhSLmF0dHIoeydwYXRoJyA6IHBlcnNvblN2Z0pzb25bbmV4dEN1ckNsYXNzXVtcInBhdGhSXCJdLCBmaWxsOnBlcnNvblN2Z0pzb25bbmV4dEN1ckNsYXNzXVtcImNvbG9yXCJdIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoTC5hdHRyKHsncGF0aCcgOiBwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJwYXRoTFwiXSwgZmlsbDpwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJjb2xvclwiXSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnNldCgkKCcjcGVyc29uU3ZnJyksIHsgYXV0b0FscGhhOjEgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSBwYXRoTS5nZXRUb3RhbExlbmd0aCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aE0uYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhdGhcIjogcGVyc29uU3ZnSnNvbltuZXh0Q3VyQ2xhc3NdW1wicGF0aE1cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZpbGxcIjogXCIjZmZmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0cm9rZVwiOiBwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJjb2xvclwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3Ryb2tlLXdpZHRoXCI6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0cm9rZS1kYXNoYXJyYXlcIjogbGVuICsgXCIgXCIgKyBsZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0cm9rZS1kYXNob2Zmc2V0XCI6IGxlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1wic3Ryb2tlLWRhc2hvZmZzZXRcIjogMH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluYS5lYXNlb3V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVySU4gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoTS5hbmltYXRlKHsgJ2ZpbGwnOiBwZXJzb25TdmdKc29uW25leHRDdXJDbGFzc11bXCJjb2xvclwiXSwgXCJzdHJva2Utd2lkdGhcIjogMCB9LCAxMDAwICwgbWluYS5lYXNlaW5vdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oICRzbGlkZXMuZXEoY3VyKSwgMC40LCB7IGF1dG9BbHBoYTowICwgb25Db21wbGV0ZTogZnVuY3Rpb24oKXskc2xpZGVzLmVxKGN1cikuY3NzKHtcInotaW5kZXhcIjogMX0pfSB9KTtcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oICRzbGlkZXMuZXEobmV4dEN1ciksIDAuNCwgeyBhdXRvQWxwaGE6MSAsIG9uQ29tcGxldGU6IGZ1bmN0aW9uKCl7JHNsaWRlcy5lcShuZXh0Q3VyKS5jc3Moe1wiei1pbmRleFwiOiAyfSl9IH0pO1xyXG4gICAgICAgICAgICBUd2Vlbk1heC50byggJGl0ZW1zVywgMC4zNSwgeyBoZWlnaHQ6ICRzbGlkZXMuZXEobmV4dEN1cikub3V0ZXJIZWlnaHQoKSB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICRzbGlkZXMucmVtb3ZlQ2xhc3MoXCJjdXJyZW50XCIpO1xyXG4gICAgICAgICAgICAkc2xpZGVzLmVxKG5leHRDdXIpLmFkZENsYXNzKFwiY3VycmVudFwiKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgJHJhID0gJGJsb2NrLmZpbmQoXCIuc2hvd25leHRcIik7XHJcblxyXG4gICAgICAgIHZhciAkcmFJY29uID0gJHJhLmZpbmQoXCIuaWNvblwiKTtcclxuICAgICAgICB2YXIgdGwgPSBuZXcgVGltZWxpbmVNYXgoe3BhdXNlZCA6IHRydWV9KTtcclxuXHJcbiAgICAgICAgdGwudG8oJHJhSWNvbiwgMS42LCB7cm90YXRpb246IDM2MCwgcmVwZWF0Oi0xLCByZXBlYXREYWxheTogMSwgZWFzZTogUG93ZXIwLmVhc2VOb25lfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHJhLm9uKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0bC5wbGF5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHJhLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGwucGF1c2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJhLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2xpZGUoXCJyaWdodFwiKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVNsaWRlcigkYmxvY2ssICRpdGVtcyl7XHJcbiAgICB2YXIgaXRlbXNMID0gJGl0ZW1zLmxlbmd0aDtcclxuICAgIGlmKCBpdGVtc0wgPT0gMCB8fCBpdGVtc0wgPD0gNSApeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICAkaXRlbXMud3JhcEFsbChcIjxkaXYgY2xhc3M9J2RlZmF1bHRTbGlkZXInPjwvZGl2PlwiKTtcclxuICAgIHZhciBzbGlkZUwgPSAwO1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGl0ZW1zTCA7IGkrPTUpIHtcclxuICAgICAgICBpZiggaSA9PSAwICl7XHJcbiAgICAgICAgICAgICRpdGVtcy5zbGljZShpLCBpKzUpLndyYXBBbGwoXCI8ZGl2IGNsYXNzPSdzbGlkZSBjdXJyZW50Jz48L2Rpdj5cIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRpdGVtcy5zbGljZShpLCBpKzUpLndyYXBBbGwoXCI8ZGl2IGNsYXNzPSdzbGlkZSc+PC9kaXY+XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzbGlkZUwrKztcclxuICAgIH1cclxuICAgIHZhciBwYWdIdG1sID0gJzxkaXYgY2xhc3M9XCJwYWdlbmF0aW9uIGpzIGNsZWFyXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZXYganMgZGlzYWJsZWRcIj48YSBuYW1lPVwiYnV0XCI+0J3QsNC30LDQtDwvYT48L2Rpdj5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGQgY2VudGVyXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJUZXh0QmxvY2tcIj48c3BhbiBjbGFzcz1cImN1clwiPtCh0YLRgNCw0L3QuNGG0LAgPHNwYW4gY2xhc3M9XCJwYWdlXCI+MTwvc3Bhbj48L3NwYW4+PHNwYW4gY2xhc3M9XCJhbGxcIj4g0LjQtyAnK3NsaWRlTCsnPC9zcGFuPjwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBkYXRhLW1pbj1cIjFcIiBkYXRhLW1heD1cIicrc2xpZGVMKydcIiBjbGFzcz1cIm5hdkhlbHBlciBub0hyZWZcIiBzdHlsZT1cInRleHQtYWxpZ246IHJpZ2h0O1wiPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZXh0IGpzXCI+PGEgbmFtZT1cImJ1dFwiPtCU0LDQu9GM0YjQtTwvYT48L2Rpdj5cXFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pic7XHJcbiAgICAkYmxvY2suYXBwZW5kKHBhZ0h0bWwpO1xyXG5cclxuICAgIHZhciAkc2xpZGVyID0gJGl0ZW1zLmNsb3Nlc3QoXCIuZGVmYXVsdFNsaWRlclwiKSxcclxuICAgICAgICBzbGlkZXJPVCA9ICRzbGlkZXIub2Zmc2V0KCkudG9wLTgwLFxyXG4gICAgICAgICRwYWcgPSAkc2xpZGVyLm5leHQoXCIucGFnZW5hdGlvblwiKSxcclxuICAgICAgICAkc2xpZGVzID0gJHNsaWRlci5maW5kKFwiLnNsaWRlXCIpLFxyXG4gICAgICAgIHNsaWRlc0wgPSAkc2xpZGVzLmxlbmd0aCxcclxuICAgICAgICAkbmV4dEJ1dCA9ICRwYWcuZmluZChcIi5uZXh0XCIpLFxyXG4gICAgICAgICRwcmV2QnV0ID0gJHBhZy5maW5kKFwiLnByZXZcIik7XHJcbiAgICBpZiggd2luZG93LmxvY2F0aW9uLmhhc2guaW5kZXhPZihcInNsX3BhZ2VfXCIpID09PSAtMSApe1xyXG4gICAgICAgICRzbGlkZXIuY3NzKHsgXCJoZWlnaHRcIiA6ICRzbGlkZXIuZmluZChcIi5zbGlkZS5jdXJyZW50XCIpLm91dGVySGVpZ2h0KCkgfSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkc2xpZGVyLmNzcyh7IFwiaGVpZ2h0XCIgOiAkc2xpZGVyLmZpbmQoXCIuc2xpZGUuY3VycmVudFwiKS5vdXRlckhlaWdodCgpIH0pO1xyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICB2YXIgaW5pdEluZGV4ICA9IGdldEhhc2hWYWx1ZShcInNsX3BhZ2VfXCIpLTE7XHJcbiAgICAgICAgJHNsaWRlcy5yZW1vdmVDbGFzcyhcImN1cnJlbnRcIik7XHJcbiAgICAgICAgJHNsaWRlcy5lcShpbml0SW5kZXgpLmFkZENsYXNzKFwiY3VycmVudFwiKTtcclxuICAgICAgICAkcGFnLmZpbmQoXCIuY2VudGVyVGV4dEJsb2NrIC5jdXIgLnBhZ2VcIikudGV4dChpbml0SW5kZXgrMSk7XHJcbiAgICAgICAgJHNsaWRlci5jc3MoeyBcImhlaWdodFwiIDogJHNsaWRlcy5lcShpbml0SW5kZXgpLm91dGVySGVpZ2h0KCkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgJG5leHRCdXQub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCAkbmV4dEJ1dC5oYXNDbGFzcyhcImRpc2FibGVkXCIpICl7cmV0dXJuIGZhbHNlO31cclxuXHJcbiAgICAgICAgdmFyICRjdXJTbGlkZSA9ICRzbGlkZXIuZmluZChcIi5zbGlkZS5jdXJyZW50XCIpLFxyXG4gICAgICAgICAgICBjdXJJbmRleCA9ICRjdXJTbGlkZS5pbmRleCgpLFxyXG4gICAgICAgICAgICBuZXh0SW5kZXggPSBjdXJJbmRleCsxO1xyXG5cclxuICAgICAgICAkcHJldkJ1dC5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlmKCBuZXh0SW5kZXggPT0gc2xpZGVzTC0xICl7XHJcbiAgICAgICAgICAgICRuZXh0QnV0LmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzbGlkZXMucmVtb3ZlQ2xhc3MoXCJjdXJyZW50XCIpO1xyXG4gICAgICAgICRzbGlkZXMuZXEobmV4dEluZGV4KS5hZGRDbGFzcyhcImN1cnJlbnRcIik7XHJcbiAgICAgICAgJHBhZy5maW5kKFwiLmNlbnRlclRleHRCbG9jayAuY3VyIC5wYWdlXCIpLnRleHQobmV4dEluZGV4KzEpO1xyXG4gICAgICAgICRzbGlkZXIuY3NzKHsgXCJoZWlnaHRcIiA6ICRzbGlkZXMuZXEobmV4dEluZGV4KS5vdXRlckhlaWdodCgpIH0pO1xyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh3aW5kb3csIDAuNCwgeyBlYXNlOiBTaW5lLmVhc2VJbk91dCwgc2Nyb2xsVG86ICRzbGlkZXIub2Zmc2V0KCkudG9wLTgwfSk7XHJcbiAgICAgICAgYWRkaGFzaFZhbHVlKFwic2xfcGFnZV9cIiwgbmV4dEluZGV4KzEpO1xyXG4gICAgfSk7XHJcbiAgICAkcHJldkJ1dC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoICRwcmV2QnV0Lmhhc0NsYXNzKFwiZGlzYWJsZWRcIikgKXtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgICAgICB2YXIgJGN1clNsaWRlID0gJHNsaWRlci5maW5kKFwiLnNsaWRlLmN1cnJlbnRcIiksXHJcbiAgICAgICAgICAgIGN1ckluZGV4ID0gJGN1clNsaWRlLmluZGV4KCksXHJcbiAgICAgICAgICAgIG5leHRJbmRleCA9IGN1ckluZGV4LTE7XHJcblxyXG4gICAgICAgICRuZXh0QnV0LnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgaWYoIG5leHRJbmRleCA9PSAwICl7XHJcbiAgICAgICAgICAgICRwcmV2QnV0LmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzbGlkZXMucmVtb3ZlQ2xhc3MoXCJjdXJyZW50XCIpO1xyXG4gICAgICAgICRzbGlkZXMuZXEobmV4dEluZGV4KS5hZGRDbGFzcyhcImN1cnJlbnRcIik7XHJcbiAgICAgICAgJHBhZy5maW5kKFwiLmNlbnRlclRleHRCbG9jayAuY3VyIC5wYWdlXCIpLnRleHQobmV4dEluZGV4KzEpO1xyXG4gICAgICAgICRzbGlkZXIuY3NzKHsgXCJoZWlnaHRcIiA6ICRzbGlkZXMuZXEobmV4dEluZGV4KS5vdXRlckhlaWdodCgpIH0pO1xyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh3aW5kb3csIDAuNCwgeyBlYXNlOiBTaW5lLmVhc2VJbk91dCwgc2Nyb2xsVG86ICRzbGlkZXIub2Zmc2V0KCkudG9wLTgwfSk7XHJcbiAgICAgICAgYWRkaGFzaFZhbHVlKFwic2xfcGFnZV9cIiwgbmV4dEluZGV4KzEpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvY3RvckRldGFpbCgpe1xyXG4gICAgaWYoICQoXCIuZG9jdG9yLWRldGFpbFwiKS5sZW5ndGggPT0gMCApeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGNyZWF0ZVNsaWRlciggJChcIi5kb2N0b3ItZGV0YWlsIC5yZWNhbGxzLWxpc3RcIiksICQoXCIuZG9jdG9yLWRldGFpbCAucmVjYWxscy1saXN0IC5yZWNhbGwtaXRlbVwiKSApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb2N0b3JzTGlzdEluaXQoKXtcclxuICAgIGlmKCAkKFwiI2RvY3RvcnMtbGlzdDpub3QoLm93bC1jYXJvdXNlbClcIikubGVuZ3RoID4gMCApeyBcclxuICAgICAgICB2YXIgJGl0ZW1zID0gJChcIiNkb2N0b3JzLWxpc3QgLml0ZW1cIiksXHJcbiAgICAgICAgaXRlbXNMID0gJGl0ZW1zLmxlbmd0aDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDw9IGl0ZW1zTDsgaSs9Mykge1xyXG4gICAgICAgICAgICB2YXIgJGl0ZW0xID0gJGl0ZW1zLmVxKGkpLFxyXG4gICAgICAgICAgICAgICAgJGl0ZW0yID0gJGl0ZW1zLmVxKGkrMSksXHJcbiAgICAgICAgICAgICAgICAkaXRlbTMgPSAkaXRlbXMuZXEoaSsyKSxcclxuICAgICAgICAgICAgICAgIG1heFJvd0ggPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmKCAkaXRlbTEubGVuZ3RoID4gMCApeyBtYXhSb3dILnB1c2goJGl0ZW0xLm91dGVySGVpZ2h0KCkpOyB9XHJcbiAgICAgICAgICAgIGlmKCAkaXRlbTIubGVuZ3RoID4gMCApeyBtYXhSb3dILnB1c2goJGl0ZW0yLm91dGVySGVpZ2h0KCkpOyB9XHJcbiAgICAgICAgICAgIGlmKCAkaXRlbTMubGVuZ3RoID4gMCApeyBtYXhSb3dILnB1c2goJGl0ZW0zLm91dGVySGVpZ2h0KCkpOyB9XHJcbiAgICAgICAgICAgIHZhciBtYXhIID0gbWF4Um93SC5tYXgoKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhtYXhIKTtcclxuICAgICAgICAgICAgJGl0ZW0xXHJcbiAgICAgICAgICAgIC5hZGQoJGl0ZW0yKVxyXG4gICAgICAgICAgICAuYWRkKCRpdGVtMylcclxuICAgICAgICAgICAgICAgIC5jc3Moe2hlaWdodCA6IG1heEh9KVxyXG4gICAgICAgICAgICAgICAgLy8ud3JhcEFsbChcIjxkaXYgY2xhc3M9J3JvdyBjbGVhcic+XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVjYWxsc0xpc3RJbml0KCl7XHJcbiAgICBpZiggJChcIi5yZWNhbGxzLWxpc3QtcGFnZVwiKS5sZW5ndGggPT0gMCApeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgICBjcmVhdGVTbGlkZXIoICQoXCIucmVjYWxscy1saXN0LXBhZ2UgLnJlY2FsbHMtbGlzdFwiKSwgJChcIi5yZWNhbGxzLWxpc3QtcGFnZSAucmVjYWxscy1saXN0IC5yZWNhbGwtaXRlbVwiKSApO1xyXG4gICAgJChcIi5maWx0ZXJIaWRkZW4gLmZpbHRlclwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgY2xhc3NMaXN0ID0gJCh0aGlzKS5hdHRyKFwiY2xhc3NcIikuc3BsaXQoJyAnKS5qb2luKFwiIFwiKSxcclxuICAgICAgICAgICAgY2xlYXJjbGFzc0xpc3QgPSBjbGFzc0xpc3QucmVwbGFjZSgnZmlsdGVyJywnJykucmVwbGFjZSgnICcsJycpLFxyXG4gICAgICAgICAgICBteVNlbGVjdCA9IFwiPHNlbGVjdCBjbGFzcz0ncmVjYWxsc0ZpbHRlciBcIitjbGVhcmNsYXNzTGlzdCtcIic+XCI7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coY2xlYXJjbGFzc0xpc3QpO1xyXG5cclxuICAgICAgICAgICAgJHRoaXMuZmluZChcImFcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzYSA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXNJbWcgPSAkdGhpc2EucHJldihcImltZ1wiKTtcclxuICAgICAgICAgICAgICAgIGlmKCAkdGhpc0ltZy5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGltZ1NyYztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoICR0aGlzSW1nLmF0dHIoJ3NyYycpLnRyaW0oKS5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZ1NyYyA9ICR0aGlzSW1nLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWdTcmMgPSAnL2xvY2FsL3RlbXBsYXRlcy9ydWRlbnRhL2ltYWdlcy9maWx0ZXJQZXJzb24ucG5nJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCAkdGhpc2EuaGFzQ2xhc3MoXCJhY3RpdmVcIikgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlTZWxlY3QrPVwiPG9wdGlvbiBjbGFzcz0nd2l0aEltZycgZGF0YS1pbWc9J1wiK2ltZ1NyYytcIicgc2VsZWN0ZWQ9J3NlbGVjdGVkJz5cIiskdGhpc2EudGV4dCgpK1wiPC9vcHRpb24+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15U2VsZWN0Kz1cIjxvcHRpb24gY2xhc3M9J3dpdGhJbWcnIGRhdGEtaW1nPSdcIitpbWdTcmMrXCInPlwiKyR0aGlzYS50ZXh0KCkrXCI8L29wdGlvbj5cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZiggJHRoaXNhLmhhc0NsYXNzKFwiYWN0aXZlXCIpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15U2VsZWN0Kz1cIjxvcHRpb24gY2xhc3M9J2FsbCcgc2VsZWN0ZWQ9J3NlbGVjdGVkJz5cIiskdGhpc2EudGV4dCgpK1wiPC9vcHRpb24+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15U2VsZWN0Kz1cIjxvcHRpb24gY2xhc3M9J2FsbCc+XCIrJHRoaXNhLnRleHQoKStcIjwvb3B0aW9uPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbXlTZWxlY3QrPVwiPC9zZWxlY3Q+XCI7XHJcbiAgICAgICAgJChcIi5maWx0ZXNCbG9ja1wiKS5hcHBlbmQobXlTZWxlY3QpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBpZiggJChcImh0bWwjbW9iaWxlXCIpLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgdmFyICRzZWxlY3QgPSAkKCcuZmlsdGVzQmxvY2sgc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICRzZWxlY3Qub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuZmluZChcIm9wdGlvbjpzZWxlY3RlZFwiKS5pbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgbGlua0hyZWYgPSAkKFwiLmZpbHRlckhpZGRlbiAuZmlsdGVyLlwiK2NsZWFyY2xhc3NMaXN0K1wiIGE6ZXEoXCIraW5kZXgrXCIpXCIpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rSHJlZjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKCBjbGVhcmNsYXNzTGlzdC5pbmRleE9mKFwiZG9jdG9yc1wiKSA+IC0xICl7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0cmljID0gJCgnc2VsZWN0LicrY2xlYXJjbGFzc0xpc3QrJycpLnNlbGVjdHJpYyh7XHJcbiAgICAgICAgICAgICAgICAgIG9wdGlvbnNJdGVtQnVpbGRlcjogZnVuY3Rpb24oaXRlbURhdGEsIGVsZW1lbnQsIGluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBpdGVtRGF0YS5lbGVtZW50WzBdLmhhc0F0dHJpYnV0ZShcImRhdGEtaW1nXCIpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJpbWdXXCI+PGltZyBzcmM9XCInK2l0ZW1EYXRhLmVsZW1lbnRbMF0uZ2V0QXR0cmlidXRlKFwiZGF0YS1pbWdcIikrJ1wiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInRleHRcIj4nKyBpdGVtRGF0YS50ZXh0Kyc8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1EYXRhLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdHJpYy5vbihcInNlbGVjdHJpYy1jaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQsIGVsZW1lbnQsIHNlbGVjdHJpYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gJChlbGVtZW50KS5maW5kKFwib3B0aW9uOnNlbGVjdGVkXCIpLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlua0hyZWYgPSAkKFwiLmZpbHRlckhpZGRlbiAuZmlsdGVyLlwiK2NsZWFyY2xhc3NMaXN0K1wiIGE6ZXEoXCIraW5kZXgrXCIpXCIpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbGlua0hyZWY7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0cmljID0gJCgnc2VsZWN0LicrY2xlYXJjbGFzc0xpc3QrJycpLnNlbGVjdHJpYygpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0cmljLm9uKFwic2VsZWN0cmljLWNoYW5nZVwiLCBmdW5jdGlvbihldmVudCwgZWxlbWVudCwgc2VsZWN0cmljKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSAkKGVsZW1lbnQpLmZpbmQoXCJvcHRpb246c2VsZWN0ZWRcIikuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgICAgICBsaW5rSHJlZiA9ICQoXCIuZmlsdGVySGlkZGVuIC5maWx0ZXIuXCIrY2xlYXJjbGFzc0xpc3QrXCIgYTplcShcIitpbmRleCtcIilcIikuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsaW5rSHJlZjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyp1bmxvY2FsLXJlY2FsbHMqL1xyXG4gICAgVHdlZW5NYXguc2V0KCQoXCIudW5sb2NhbC1yZWNhbGxzIC51bmxvY2FsLXJlY2FsbHMtNC5zdGFydFwiKSwge29wYWNpdHk6IDF9KTtcclxuICAgIHZhciAkYnV0dG9uU2hvd01vcmUgPSAkKFwiLnVubG9jYWwtcmVjYWxscyAuYnV0dG9uTW9yZVwiKTtcclxuICAgIHZhciB0bCA9IG5ldyBUaW1lbGluZU1heCh7cGF1c2VkIDogdHJ1ZX0pO1xyXG5cclxuICAgIHRsLnRvKCRidXR0b25TaG93TW9yZS5maW5kKFwiLmljb25cIiksIDEuNiwge3JvdGF0aW9uOiAzNjAsIHJlcGVhdDotMSwgcmVwZWF0RGFsYXk6IDEsIGVhc2U6IFBvd2VyMC5lYXNlTm9uZX0pO1xyXG4gICAgXHJcbiAgICAkYnV0dG9uU2hvd01vcmUub24oXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGwucGxheSgpO1xyXG4gICAgfSk7XHJcbiAgICAkYnV0dG9uU2hvd01vcmUub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGwucGF1c2UoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkYnV0dG9uU2hvd01vcmUub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciAkc2xpZGVzID0gJChcIi51bmxvY2FsLXJlY2FsbHMgLnVubG9jYWwtcmVjYWxscy00XCIpLFxyXG4gICAgICAgICAgICBzbGlkZXNMID0gJHNsaWRlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIGN1ckluZGV4ID0gJHNsaWRlcy5maWx0ZXIoXCIuYWN0aXZlLCAuc3RhcnRcIikuaW5kZXgoKSxcclxuICAgICAgICAgICAgbmV4dEN1cjtcclxuXHJcbiAgICAgICAgaWYoY3VySW5kZXggIT09IHNsaWRlc0wtMSl7XHJcbiAgICAgICAgICBuZXh0Q3VyID0gY3VySW5kZXgrMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIG5leHRDdXIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgJGN1clMgPSAkc2xpZGVzLmVxKGN1ckluZGV4KSxcclxuICAgICAgICAgICAgJG5leHRTID0gJHNsaWRlcy5lcShuZXh0Q3VyKTtcclxuXHJcbiAgICAgICAgJGN1clMucmVtb3ZlQ2xhc3MoXCJhY3RpdmUgc3RhcnRcIik7XHJcbiAgICAgICAgJG5leHRTLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIFR3ZWVuTWF4LnRvKCAkY3VyUyAsIDAuMyAsIHsgb3BhY2l0eTogMCAgfSk7XHJcbiAgICAgICAgVHdlZW5NYXgudG8oICRuZXh0UyAsIDAuMyAsIHsgb3BhY2l0eTogMSAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gd3JpdGVSZXdpZXZGb3JtKCl7XHJcbiAgICAvKkZPUk0gd3JpdGVSZXdpZXYqL1xyXG4gICAgJChcIi53cml0ZVJldmlld0Jsb2NrIC5kZWZhdWx0QnV0dG9uXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB2YXIgJHdyaXRlUmV2aWV3Rm9ybSA9ICQoXCIud3JpdGVSZXZpZXdGb3JtXCIpO1xyXG4gICAgICAgICQubWFnbmlmaWNQb3B1cC5vcGVuKHtcclxuICAgICAgICAgICAgaXRlbXM6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogJHdyaXRlUmV2aWV3Rm9ybSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmxpbmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlbW92YWxEZWxheTogNTAwLCAvL2RlbGF5IHJlbW92YWwgYnkgWCB0byBhbGxvdyBvdXQtYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICAgICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3QubWFpbkNsYXNzID0gXCJtZnAtem9vbS1pblwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtaWRDbGljazogdHJ1ZSAvLyBhbGxvdyBvcGVuaW5nIHBvcHVwIG9uIG1pZGRsZSBtb3VzZSBjbGljay4gQWx3YXlzIHNldCBpdCB0byB0cnVlIGlmIHlvdSBkb24ndCBwcm92aWRlIGFsdGVybmF0aXZlIHNvdXJjZS5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXJ2aWNlc0xpc3QoKXtcclxuICAgIGlmKCAkKFwiLnNlcnZpY2VzTGlzdFwiKS5sZW5ndGggPT09IDAgKXsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ29TY3JvbGwoKXtcclxuICAgICAgICBpZiggd2luZG93LmxvY2F0aW9uLmhhc2gubGVuZ3RoID09PSAwICl7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgIHZhciBwYWdlSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xyXG5cclxuICAgICAgICAkKFwiLnNlcnZpY2VcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgdGhpc0lkQXJyYXkgPSAkdGhpcy5hdHRyKFwiaWRcIikuc3BsaXQoXCJfXCIpO1xyXG4gICAgICAgICAgICBpZiggdGhpc0lkQXJyYXlbdGhpc0lkQXJyYXkubGVuZ3RoLTFdICA9PT0gcGFnZUhhc2ggKXtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byh3aW5kb3csIDAsIHsgZWFzZTogU2luZS5lYXNlSW5PdXQsIHNjcm9sbFRvOiAkdGhpcy5vZmZzZXQoKS50b3AgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdvU2Nyb2xsKCk7XHJcbiAgICAkKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgZ29TY3JvbGwoKTtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gc2VydmljZXNEZXRhaWwoKXtcclxuICAgIGlmKCAhJChcImJvZHkuc2VydmljZXMtZGV0YWlsXCIpLmxlbmd0aCA+IDAgKXsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBjcmVhdGVTbGlkZXIoICQoXCIuc2VydmljZXNEZXRhaWxQYWdlIC5yZWNhbGxzLWxpc3RcIiksICQoXCIuc2VydmljZXNEZXRhaWxQYWdlIC5yZWNhbGxzLWxpc3QgLnJlY2FsbC1pdGVtXCIpICk7XHJcblxyXG4gICAgaWYoICQoXCIjZG9jdG9ycy1saXN0IC5pdGVtXCIpLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICBmdW5jdGlvbiBzZXJ2RG9jdG9yc0xpc3RCTG9jaygpe1xyXG4gICAgICAgICAgdmFyIG93bCA9ICQoXCIjZG9jdG9ycy1saXN0XCIpLFxyXG4gICAgICAgICAgICAgICRMQSA9ICQoXCIuZG9jdG9ycy5zZWN0aW9uIC5hcnJvdy5sZWZ0XCIpLFxyXG4gICAgICAgICAgICAgICRSQSA9ICQoXCIuZG9jdG9ycy5zZWN0aW9uIC5hcnJvdy5yaWdodFwiKTtcclxuICAgICAgICAgIGlmKCBvd2wubGVuZ3RoID09IDAgKXtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrQXJyb3dzU3RhdGUoZXYpe1xyXG4gICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2Lml0ZW0uaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgIGNvdW50ID0gZXYuaXRlbS5jb3VudCxcclxuICAgICAgICAgICAgICAgICAgc2l6ZSA9IGV2LnBhZ2Uuc2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgaWYoIGluZGV4ID09IDAgKXtcclxuICAgICAgICAgICAgICAgICAgJExBLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICRMQS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiggaW5kZXgrc2l6ZSA9PSBjb3VudCB8fCBjb3VudCA8PSAzICl7XHJcbiAgICAgICAgICAgICAgICAgICRSQS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAkUkEucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBvd2wub24oJ2luaXRpYWxpemVkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja0Fycm93c1N0YXRlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHZhciAkaXRlbXMgPSAkKFwiI2RvY3RvcnMtbGlzdCAuaXRlbVwiKSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zTCA9ICRpdGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBtYXhSb3dIID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaXRlbXNMOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhSb3dILnB1c2goJGl0ZW1zLmVxKGkpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtYXhIID0gbWF4Um93SC5tYXgoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1heFJvd0gpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWF4SCk7XHJcbiAgICAgICAgICAgICAgICAkaXRlbXMuY3NzKHtoZWlnaHQgOiBtYXhIfSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3dsLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgbG9vcDpmYWxzZSxcclxuICAgICAgICAgICAgaXRlbXM6IDMsXHJcbiAgICAgICAgICAgIG5hdlJld2luZDpmYWxzZSxcclxuICAgICAgICAgICAgbWFyZ2luOiAyMCxcclxuICAgICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZUZXh0OiBbXHJcbiAgICAgICAgICAgICAgXCI8aSBjbGFzcz0nZmEgZmEtY2FyZXQtbGVmdCc+PC9pPlwiLFxyXG4gICAgICAgICAgICAgIFwiPGkgY2xhc3M9J2ZhIGZhLWNhcmV0LXJpZ2h0Jz48L2k+XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheUhvdmVyUGF1c2U6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiB7XHJcbiAgICAgICAgICAgICAgMDoge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIDgwMDoge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDNcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3dsLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgY2hlY2tBcnJvd3NTdGF0ZShldmVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICRSQS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBvd2wudHJpZ2dlcignbmV4dC5vd2wuY2Fyb3VzZWwnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgJExBLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIG93bC50cmlnZ2VyKCdwcmV2Lm93bC5jYXJvdXNlbCcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZEb2N0b3JzTGlzdEJMb2NrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoICQoXCIudGVobm9sb2d5LWxpc3QgLml0ZW1cIikubGVuZ3RoID4gMCApe1xyXG4gICAgICAgIGZ1bmN0aW9uIHNlcnZUZWhub2xvZ3lMaXN0QkxvY2soKXtcclxuICAgICAgICAgIHZhciBvd2wgPSAkKFwiLnRlaG5vbG9neS1saXN0XCIpLFxyXG4gICAgICAgICAgICAgICRMQSA9ICQoXCIudGVobm9sb2d5LnNlY3Rpb24gLmFycm93LmxlZnRcIiksXHJcbiAgICAgICAgICAgICAgJFJBID0gJChcIi50ZWhub2xvZ3kuc2VjdGlvbiAuYXJyb3cucmlnaHRcIik7XHJcbiAgICAgICAgICBpZiggb3dsLmxlbmd0aCA9PSAwICl7cmV0dXJuIGZhbHNlO31cclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBjaGVja0Fycm93c1N0YXRlKGV2KXtcclxuICAgICAgICAgICAgICB2YXIgaW5kZXggPSBldi5pdGVtLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICBjb3VudCA9IGV2Lml0ZW0uY291bnQsXHJcbiAgICAgICAgICAgICAgICAgIHNpemUgPSBldi5wYWdlLnNpemU7XHJcblxyXG4gICAgICAgICAgICAgIGlmKCBpbmRleCA9PSAwICl7XHJcbiAgICAgICAgICAgICAgICAgICRMQS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAkTEEucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYoIGluZGV4K3NpemUgPT0gY291bnQgfHwgY291bnQgPD0gMyApe1xyXG4gICAgICAgICAgICAgICAgICAkUkEuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgJFJBLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgb3dsLm9uKCdpbml0aWFsaXplZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2tBcnJvd3NTdGF0ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGl0ZW1zID0gJChcIi50ZWhub2xvZ3ktbGlzdCAuaXRlbVwiKSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zTCA9ICRpdGVtcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBtYXhSb3dIID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaXRlbXNMOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXhSb3dILnB1c2goJGl0ZW1zLmVxKGkpLm91dGVySGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtYXhIID0gbWF4Um93SC5tYXgoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1heFJvd0gpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWF4SCk7XHJcbiAgICAgICAgICAgICAgICAkaXRlbXMuY3NzKHtoZWlnaHQgOiBtYXhIfSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3dsLm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgbG9vcDpmYWxzZSxcclxuICAgICAgICAgICAgaXRlbXM6IDUsXHJcbiAgICAgICAgICAgIG5hdlJld2luZDpmYWxzZSxcclxuICAgICAgICAgICAgbWFyZ2luOiAxMCxcclxuICAgICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZUZXh0OiBbXHJcbiAgICAgICAgICAgICAgXCI8aSBjbGFzcz0nZmEgZmEtY2FyZXQtbGVmdCc+PC9pPlwiLFxyXG4gICAgICAgICAgICAgIFwiPGkgY2xhc3M9J2ZhIGZhLWNhcmV0LXJpZ2h0Jz48L2k+XCJcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvcGxheUhvdmVyUGF1c2U6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiB7XHJcbiAgICAgICAgICAgICAgMDoge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIDgwMDoge1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IDVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3dsLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgY2hlY2tBcnJvd3NTdGF0ZShldmVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICRSQS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBvd2wudHJpZ2dlcignbmV4dC5vd2wuY2Fyb3VzZWwnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgJExBLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIG93bC50cmlnZ2VyKCdwcmV2Lm93bC5jYXJvdXNlbCcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZUZWhub2xvZ3lMaXN0QkxvY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtZW51U2Nyb2xsQW5pbWF0aW9uKCl7XHJcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcih7XHJcbiAgICAgICAgICAgIGdsb2JhbFNjZW5lT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckhvb2s6ICdvbkxlYXZlJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciAkbmF2QmxvY2sgPSAkKFwiLnctMWNvbCAubmF2XCIpLFxyXG4gICAgICAgICAgICBzY3JvbGxEdXIgPSAkKFwiLnctMmNvbFwiKS5vdXRlckhlaWdodCgpIC0gJG5hdkJsb2NrLm91dGVySGVpZ2h0KCk7XHJcblxyXG4gICAgICAgIG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7dHJpZ2dlckVsZW1lbnQ6ICQoXCIudG9wQmxvY2tcIiksIGR1cmF0aW9uOiBzY3JvbGxEdXIsIG9mZnNldDogLTMwfSlcclxuICAgICAgICAuc2V0UGluKCRuYXZCbG9jaylcclxuICAgICAgICAvLy5hZGRJbmRpY2F0b3JzKCkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcclxuICAgICAgICAuYWRkVG8oY29udHJvbGxlcik7XHJcblxyXG4gICAgICAgICQoXCIqW2RhdGEtYXJdXCIpLmVhY2goZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgICAgIHZhciAkdGhpc0FyID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIHRoaXNBckF0dHIgPSAkdGhpc0FyLmF0dHIoXCJkYXRhLWFyXCIpLFxyXG4gICAgICAgICAgICAgICAgJHRoaXNMaW5rID0gJChcIipbZGF0YS1saW5rPSdcIit0aGlzQXJBdHRyK1wiJ11cIiksXHJcbiAgICAgICAgICAgICAgICAkdGhpc0xpbmtMaSA9ICQoXCIqW2RhdGEtbGluaz0nXCIrdGhpc0FyQXR0citcIiddXCIpLmNsb3Nlc3QoXCJsaVwiKSxcclxuICAgICAgICAgICAgICAgIGN1ckR1ciA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoICQoXCIqW2RhdGEtYXJdOmVxKFwiKyhpKzEpK1wiKVwiKS5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyRHVyID0gJChcIipbZGF0YS1hcl06ZXEoXCIrKGkrMSkrXCIpXCIpLm9mZnNldCgpLnRvcCAtICR0aGlzQXIub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe3RyaWdnZXJFbGVtZW50OiAkdGhpc0FyLCBkdXJhdGlvbjogY3VyRHVyLCBvZmZzZXQ6IC0zMH0pXHJcbiAgICAgICAgICAgICAgICAuc2V0Q2xhc3NUb2dnbGUoICR0aGlzTGlua0xpICwgXCJhY3RpdmVcIikgLy8gYWRkIGNsYXNzIHRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkSW5kaWNhdG9ycygpIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFRvKGNvbnRyb2xsZXIpXHJcbiAgICAgICAgICAgICAgICAub24oXCJlbnRlciBsZWF2ZVwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQoXCIudWwtbmF2IGxpLmFjdGl2ZSBhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCAkYS5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZGhhc2hWYWx1ZShcImFjdGl2ZV9zZWN0b25fXCIsICRhLmF0dHIoXCJkYXRhLWxpbmtcIikgKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSGFzaChcImFjdGl2ZV9zZWN0b25fXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbWVudVNjcm9sbEFuaW1hdGlvbigpO1xyXG5cclxuICAgICQoXCIqW2RhdGEtbGlua11cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyICRsaW5rID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgbGlua0F0dHIgPSAkbGluay5hdHRyKFwiZGF0YS1saW5rXCIpLFxyXG4gICAgICAgICAgICAkYXIgPSAkKFwiKltkYXRhLWFyPSdcIitsaW5rQXR0citcIiddXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBpZiAoICRhci5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgIHZhciBhclNDID0gJGFyLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgVHdlZW5MaXRlLnRvKHdpbmRvdywgMC41LCB7IGVhc2U6IFNpbmUuZWFzZUluT3V0LCBzY3JvbGxUbzogYXJTQ30pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qaW5pdCBzY3JvbGwgb2Zmc2V0Ki9cclxuICAgIGlmKCB3aW5kb3cubG9jYXRpb24uaGFzaC5pbmRleE9mKFwiYWN0aXZlX3NlY3Rvbl9cIikgPiAtMSApe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsIVwiKTtcclxuICAgICAgICB2YXIgc2VjdEF0dHIgPSBnZXRIYXNoVmFsdWUoXCJhY3RpdmVfc2VjdG9uX1wiKSxcclxuICAgICAgICAgICAgJGFyID0gJChcIipbZGF0YS1hcj0nXCIrc2VjdEF0dHIrXCInXVwiKTtcclxuICAgICAgICB2YXIgYXJTQyA9ICRhci5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWN0QXR0cj1cIitzZWN0QXR0cik7XHJcblxyXG4gICAgICAgIFR3ZWVuTGl0ZS50byh3aW5kb3csIDAsIHsgZWFzZTogU2luZS5lYXNlSW5PdXQsIHNjcm9sbFRvOiBhclNDfSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZG9jTm90ZUJsb2NrX21heEhlaWdodCgpe1xyXG4gICAgdmFyIG1heEggPSAwO1xyXG4gICAgdmFyICRiID0gJChcIi5hcnRpY2xlcy5zZWN0aW9uIC5kb2NOb3RlQmxvY2sgYS53LTFjb2xcIik7XHJcbiAgICBpZiggJGIubGVuZ3RoID09IDAgKXsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAkYi5jc3Moe1wiaGVpZ2h0XCI6IFwiXCJ9KTtcclxuICAgICRiLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLm91dGVySGVpZ2h0KCkgPiBtYXhIID8gbWF4SCA9ICQodGhpcykub3V0ZXJIZWlnaHQoKSA6IG1heEggPSBtYXhIO1xyXG4gICAgfSk7XHJcbiAgICAkYi5jc3Moe1wiaGVpZ2h0XCI6IG1heEh9KTtcclxufVxyXG5mdW5jdGlvbiBhcnRpY2xlc0xpc3QoKXtcclxuICAgIGNyZWF0ZVNsaWRlciggJChcIi5hcnRpY2xlcy1saXN0UGFnZSAuYXJ0aWNsZXMtbGlzdFwiKSwgJChcIi5hcnRpY2xlcy1saXN0UGFnZSAuYXJ0aWNsZXMtbGlzdCAuaXRlbVwiKSApO1xyXG59XHJcbmZ1bmN0aW9uIGFydGljbGVzRGV0YWlsKCl7XHJcbiAgICBpZiggJChcIi5hcnRpY2xlc0RldGFpbFBhZ2VcIikubGVuZ3RoID09IDAgJiYgJChcIi50ZWhub2xvZ3lEZXRhaWxQYWdlXCIpLmxlbmd0aCA9PSAwICl7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgZnVuY3Rpb24gcHJpbnRQYWdlKCl7XHJcbiAgICAgICAgJChcIi5wcmludFZlcnNpb25cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKFwiaHRtbFwiKS5hdHRyKFwiaWRcIiAsIFwicHJpbnRWZXJzaW9uXCIpO1xyXG4gICAgICAgICAgICAkKFwiI21haW5XcmFwcGVyXCIpLmNzcyh7XCJwYWRkaW5nLWJvdHRvbVwiOiBcIlwifSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5wcmludEJ1dHRvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5wcmludCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuZGlzYWJsZVByaW50VmVyc2lvblwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQoXCJodG1sXCIpLmF0dHIoXCJpZFwiICwgXCJcIik7XHJcbiAgICAgICAgICAgIHNldEZvb3RlclBhZGRpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBwcmludFBhZ2UoKTtcclxufVxyXG5mdW5jdGlvbiB0ZWhub2xvZ3lwYWdlKCl7XHJcbiAgICBpZiggJChcIiN0ZWhub2xvZ3lCbG9ja1wiKS5sZW5ndGggPT0gMCApe3JldHVybiBmYWxzZTt9XHJcbiAgICB2YXIgU2h1ZmZsZSA9IHdpbmRvdy5zaHVmZmxlO1xyXG4gICAgdmFyIG15ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtc1JvdycpO1xyXG4gICAgLy8gdmFyIHNpemVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubXktc2l6ZXItZWxlbWVudCcpO1xyXG5cclxuICAgIC8vIHZhciBzaHVmZmxlID0gbmV3IFNodWZmbGUoZWxlbWVudCwge1xyXG4gICAgLy8gICAgIGl0ZW1TZWxlY3RvcjogJy5pdGVtJyxcclxuICAgIC8vICAgICBzaXplcjogJy5pdGVtJyxcclxuICAgIC8vICAgICBidWZmZXI6IDFcclxuICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICAvLyBFUzcgd2lsbCBoYXZlIEFycmF5LnByb3RvdHlwZS5pbmNsdWRlcy5cclxuICAgIGZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29udmVydCBhbiBhcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgYXJyYXkuXHJcbiAgICBmdW5jdGlvbiB0b0FycmF5KHRoaW5nKSB7XHJcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIERlbW8gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAvL3RoaXMuc2hhcGVzID0gdG9BcnJheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGlua3NCbG9jayBidXR0b24nKSk7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnkgPSB0b0FycmF5KCAkKCcubGlua3NCbG9jayAuYnV0dG9uOm5vdCgucmVzZXQpJykgKTtcclxuICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNhdGVnb3J5KTtcclxuICAgICAgdGhpcy5zaHVmZmxlID0gbmV3IFNodWZmbGUoZWxlbWVudCwge1xyXG4gICAgICAgIGl0ZW1TZWxlY3RvcjogJyNpdGVtc1JvdyAuaXRlbScsXHJcbiAgICAgICAgc2l6ZXI6IG51bGwsXHJcbiAgICAgICAgLy9idWZmZXI6IDFcclxuXHJcbiAgLy8gZ3JvdXA6IFNodWZmbGUuQUxMX0lURU1TLCAvLyBJbml0aWFsIGZpbHRlciBncm91cC5cclxuICAvLyBzcGVlZDogMjUwLCAvLyBUcmFuc2l0aW9uL2FuaW1hdGlvbiBzcGVlZCAobWlsbGlzZWNvbmRzKS5cclxuICAvLyBlYXNpbmc6ICdlYXNlJywgLy8gQ1NTIGVhc2luZyBmdW5jdGlvbiB0byB1c2UuXHJcbiAgLy8gaXRlbVNlbGVjdG9yOiAnKicsIC8vIGUuZy4gJy5waWN0dXJlLWl0ZW0nLlxyXG4gIC8vIHNpemVyOiBudWxsLCAvLyBFbGVtZW50IG9yIHNlbGVjdG9yIHN0cmluZy4gVXNlIGFuIGVsZW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSBzaXplIG9mIGNvbHVtbnMgYW5kIGd1dHRlcnMuXHJcbiAgLy8gZ3V0dGVyV2lkdGg6IDAsIC8vIEEgc3RhdGljIG51bWJlciBvciBmdW5jdGlvbiB0aGF0IHRlbGxzIHRoZSBwbHVnaW4gaG93IHdpZGUgdGhlIGd1dHRlcnMgYmV0d2VlbiBjb2x1bW5zIGFyZSAoaW4gcGl4ZWxzKS5cclxuICAvLyBjb2x1bW5XaWR0aDogMCwgLy8gQSBzdGF0aWMgbnVtYmVyIG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIG51bWJlciB3aGljaCB0ZWxscyB0aGUgcGx1Z2luIGhvdyB3aWRlIHRoZSBjb2x1bW5zIGFyZSAoaW4gcGl4ZWxzKS5cclxuICAvLyBkZWxpbWV0ZXI6IG51bGwsIC8vIElmIHlvdXIgZ3JvdXAgaXMgbm90IGpzb24sIGFuZCBpcyBjb21tYSBkZWxpbWV0ZWQsIHlvdSBjb3VsZCBzZXQgZGVsaW1ldGVyIHRvICcsJy5cclxuICAvLyBidWZmZXI6IDAsIC8vIFVzZWZ1bCBmb3IgcGVyY2VudGFnZSBiYXNlZCBoZWlnaHRzIHdoZW4gdGhleSBtaWdodCBub3QgYWx3YXlzIGJlIGV4YWN0bHkgdGhlIHNhbWUgKGluIHBpeGVscykuXHJcbiAgLy8gY29sdW1uVGhyZXNob2xkOiAwLjAxLCAvLyBSZWFkaW5nIHRoZSB3aWR0aCBvZiBlbGVtZW50cyBpc24ndCBwcmVjaXNlIGVub3VnaCBhbmQgY2FuIGNhdXNlIGNvbHVtbnMgdG8ganVtcCBiZXR3ZWVuIHZhbHVlcy5cclxuICAvLyBpbml0aWFsU29ydDogbnVsbCwgLy8gU2h1ZmZsZSBjYW4gYmUgaW5pdGlhbGl6ZWQgd2l0aCBhIHNvcnQgb2JqZWN0LiBJdCBpcyB0aGUgc2FtZSBvYmplY3QgZ2l2ZW4gdG8gdGhlIHNvcnQgbWV0aG9kLlxyXG4gIC8vIHRocm90dGxlOiB0aHJvdHRsZSwgLy8gQnkgZGVmYXVsdCwgc2h1ZmZsZSB3aWxsIHRocm90dGxlIHJlc2l6ZSBldmVudHMuIFRoaXMgY2FuIGJlIGNoYW5nZWQgb3IgcmVtb3ZlZC5cclxuICAvLyB0aHJvdHRsZVRpbWU6IDMwMCwgLy8gSG93IG9mdGVuIHNodWZmbGUgY2FuIGJlIGNhbGxlZCBvbiByZXNpemUgKGluIG1pbGxpc2Vjb25kcykuXHJcbiAgLy8gc3RhZ2dlckFtb3VudDogMTUsIC8vIFRyYW5zaXRpb24gZGVsYXkgb2Zmc2V0IGZvciBlYWNoIGl0ZW0gaW4gbWlsbGlzZWNvbmRzLlxyXG4gIC8vIHN0YWdnZXJBbW91bnRNYXg6IDI1MCwgLy8gTWF4aW11bSBzdGFnZ2VyIGRlbGF5IGluIG1pbGxpc2Vjb25kcy5cclxuICAvLyB1c2VUcmFuc2Zvcm1zOiB0cnVlLCAvLyBXaGV0aGVyIHRvIHVzZSB0cmFuc2Zvcm1zIG9yIGFic29sdXRlIHBvc2l0aW9uaW5nLlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRoaXMuZmlsdGVycyA9IHtcclxuICAgICAgICBjYXRlZ29yeTogW10sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLl9iaW5kRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kIGV2ZW50IGxpc3RlbmVycyBmb3Igd2hlbiB0aGUgZmlsdGVycyBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIERlbW8ucHJvdG90eXBlLl9iaW5kRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vdGhpcy5fb25TaGFwZUNoYW5nZSA9IHRoaXMuX2hhbmRsZVNoYXBlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX29uQ29sb3JDaGFuZ2UgPSB0aGlzLl9oYW5kbGVDb2xvckNoYW5nZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgLy8gdGhpcy5zaGFwZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgLy8gICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9vblNoYXBlQ2hhbmdlKTtcclxuICAgICAgLy8gfSwgdGhpcyk7XHJcblxyXG4gICAgICB0aGlzLmNhdGVnb3J5LmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ29sb3JDaGFuZ2UpO1xyXG4gICAgICB9LCB0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHZhbHVlcyBvZiBlYWNoIGNoZWNrZWQgaW5wdXQuXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPn1cclxuICAgICAqL1xyXG4gICAgLy8gRGVtby5wcm90b3R5cGUuX2dldEN1cnJlbnRTaGFwZUZpbHRlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgIHJldHVybiB0aGlzLnNoYXBlcy5maWx0ZXIoZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGlucHV0LmNoZWNrZWQ7XHJcbiAgICAvLyAgIH0pLm1hcChmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgIC8vICAgICByZXR1cm4gaW5wdXQudmFsdWU7XHJcbiAgICAvLyAgIH0pO1xyXG4gICAgLy8gfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgdmFsdWVzIG9mIGVhY2ggYGFjdGl2ZWAgYnV0dG9uLlxyXG4gICAgICogQHJldHVybiB7QXJyYXkuPHN0cmluZz59XHJcbiAgICAgKi9cclxuICAgIERlbW8ucHJvdG90eXBlLl9nZXRDdXJyZW50Q29sb3JGaWx0ZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYXRlZ29yeS5maWx0ZXIoZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICAgIHJldHVybiBidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuICAgICAgfSkubWFwKGZ1bmN0aW9uIChidXR0b24pIHtcclxuICAgICAgICByZXR1cm4gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS12YWwnKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBzaGFwZSBpbnB1dCBjaGVjayBzdGF0ZSBjaGFuZ2VkLCB1cGRhdGUgdGhlIGN1cnJlbnQgZmlsdGVycyBhbmQgZmlsdGUuclxyXG4gICAgICovXHJcbiAgICAvLyBEZW1vLnByb3RvdHlwZS5faGFuZGxlU2hhcGVDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgIHRoaXMuZmlsdGVycy5zaGFwZXMgPSB0aGlzLl9nZXRDdXJyZW50U2hhcGVGaWx0ZXJzKCk7XHJcbiAgICAvLyAgIHRoaXMuZmlsdGVyKCk7XHJcbiAgICAvLyB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBjb2xvciBidXR0b24gd2FzIGNsaWNrZWQuIFVwZGF0ZSBmaWx0ZXJzIGFuZCBkaXNwbGF5LlxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZ0IENsaWNrIGV2ZW50IG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgRGVtby5wcm90b3R5cGUuX2hhbmRsZUNvbG9yQ2hhbmdlID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICB2YXIgYnV0dG9uID0gZXZ0LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAvLyBUcmVhdCB0aGVzZSBidXR0b25zIGxpa2UgcmFkaW8gYnV0dG9ucyB3aGVyZSBvbmx5IDEgY2FuIGJlIHNlbGVjdGVkLlxyXG4gICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgJChcIi5saW5rc0Jsb2NrIC5idXR0b24ucmVzZXRcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeS5mb3JFYWNoKGZ1bmN0aW9uIChidG4pIHtcclxuICAgICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoXCIubGlua3NCbG9jayAuYnV0dG9uLnJlc2V0XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmZpbHRlcnMuY2F0ZWdvcnkgPSB0aGlzLl9nZXRDdXJyZW50Q29sb3JGaWx0ZXJzKCk7XHJcbiAgICAgIHRoaXMuZmlsdGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsdGVyIHNodWZmbGUgYmFzZWQgb24gdGhlIGN1cnJlbnQgc3RhdGUgb2YgZmlsdGVycy5cclxuICAgICAqL1xyXG4gICAgRGVtby5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNBY3RpdmVGaWx0ZXJzKCkpIHtcclxuICAgICAgICB0aGlzLnNodWZmbGUuZmlsdGVyKHRoaXMuaXRlbVBhc3Nlc0ZpbHRlcnMuYmluZCh0aGlzKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zaHVmZmxlLmZpbHRlcihTaHVmZmxlLkFMTF9JVEVNUyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBhbnkgb2YgdGhlIGFycmF5cyBpbiB0aGUgYGZpbHRlcnNgIHByb3BlcnR5IGhhdmUgYSBsZW5ndGggb2YgbW9yZSB0aGFuIHplcm8sXHJcbiAgICAgKiB0aGF0IG1lYW5zIHRoZXJlIGlzIGFuIGFjdGl2ZSBmaWx0ZXIuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBEZW1vLnByb3RvdHlwZS5oYXNBY3RpdmVGaWx0ZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5maWx0ZXJzKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJzW2tleV0ubGVuZ3RoID4gMDtcclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgYW4gZWxlbWVudCBwYXNzZXMgdGhlIGN1cnJlbnQgZmlsdGVycy5cclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRvIHRlc3QuXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIGl0IHNhdGlzZmllcyBhbGwgY3VycmVudCBmaWx0ZXJzLlxyXG4gICAgICovXHJcbiAgICBEZW1vLnByb3RvdHlwZS5pdGVtUGFzc2VzRmlsdGVycyA9IGZ6dW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAvL3ZhciBzaGFwZXMgPSB0aGlzLmZpbHRlcnMuc2hhcGVzO1xyXG4gICAgICB2YXIgY2F0ZWdvcnkgPSB0aGlzLmZpbHRlcnMuY2F0ZWdvcnk7XHJcbiAgICAgIC8vdmFyIHNoYXBlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2hhcGUnKTtcclxuXHJcbiAgICB2YXIgY2F0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2F0Jyk7XHJcbiAgICB2YXIgY2F0QXJyYXkgPSBjYXQuc3BsaXQoXCIgXCIpO1xyXG4gICAgdmFyIGNhdEFycmF5TGVuZ3RoID0gY2F0QXJyYXkubGVuZ3RoO1xyXG5cclxuICAgIHZhciBmbGFnID0gZmFsc2U7XHJcbiAgICBmb3IoIHZhciBpPTA7IGkgPCBjYXRBcnJheUxlbmd0aDsgaSsrICl7XHJcbiAgICAgIGlmIChjYXRlZ29yeS5sZW5ndGggPiAwICYmIGFycmF5SW5jbHVkZXMoY2F0ZWdvcnksIGNhdEFycmF5W2ldKSkge1xyXG4gICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiggIWZsYWcgKXtcclxuICAgICAgIHJldHVybiBmYWxzZTsgXHJcbiAgICB9XHJcblxyXG4gICAgICAvLyBJZiB0aGVyZSBhcmUgYWN0aXZlIHNoYXBlIGZpbHRlcnMgYW5kIHRoaXMgc2hhcGUgaXMgbm90IGluIHRoYXQgYXJyYXkuXHJcbiAgICAgIC8vIGlmIChzaGFwZXMubGVuZ3RoID4gMCAmJiAhYXJyYXlJbmNsdWRlcyhzaGFwZXMsIHNoYXBlKSkge1xyXG4gICAgICAvLyAgIHJldHVybiBmYWxzZTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgLy8gSWYgdGhlcmUgYXJlIGFjdGl2ZSBjb2xvciBmaWx0ZXJzIGFuZCB0aGlzIGNvbG9yIGlzIG5vdCBpbiB0aGF0IGFycmF5LlxyXG4gICAgICAvLyBpZiAoY2F0ZWdvcnkubGVuZ3RoID4gMCAmJiAhYXJyYXlJbmNsdWRlcyhjYXRlZ29yeSwgY2F0KSkge1xyXG4gICAgICAvLyAgIHJldHVybiBmYWxzZTtcclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG4gICAgLy9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGV2ZW5IZWlnaHRzKFtcclxuICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjaXRlbXNSb3cgLml0ZW0nKSxcclxuICAgICAgICBdKTtcclxuICAgICAgd2luZG93LmRlbW8gPSBuZXcgRGVtbyhteWVsZW1lbnQpO1xyXG4gICAgLy99KTtcclxuXHJcbiAgICAkKFwiLmxpbmtzQmxvY2sgLmJ1dHRvbi5yZXNldFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJChcIi5saW5rc0Jsb2NrIC5idXR0b24uYWN0aXZlOm5vdCgucmVzZXQpXCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYWxlc0xpc3QoKXtcclxuICAgIHZhciAkaXRlbXMgPSAkKFwiLnNhbGVzSXRlbXMgLml0ZW1cIiksXHJcbiAgICAgICAgJGZvcm0gPSAkKFwiLnJlY29yZEZvcm1cIik7XHJcblxyXG4gICAgJGl0ZW1zLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAkdGhpc0RldGFpbCA9ICR0aGlzLmZpbmQoXCIuZGV0YWlsVGV4dFwiKTtcclxuICAgICAgICAkdGhpcy5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAkLm1hZ25pZmljUG9wdXAub3Blbih7XHJcbiAgICAgICAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IFwiPGRpdiBjbGFzcz0nZGVmYXVsdFBvcHVwQ29udGVudCBtZnAtd2l0aC1hbmltJz5cIiskdGhpc0RldGFpbFswXS5vdXRlckhUTUwrJGZvcm0uaHRtbCgpK1wiPC9kaXY+XCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW5saW5lJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZW1vdmFsRGVsYXk6IDUwMCwgLy9kZWxheSByZW1vdmFsIGJ5IFggdG8gYWxsb3cgb3V0LWFuaW1hdGlvblxyXG4gICAgICAgICAgICBjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcclxuICAgICAgICAgICAgbWFpbkNsYXNzOiAnbWZwLXdpdGgtem9vbScsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgICAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdC5tYWluQ2xhc3MgPSBcIm1mcC16b29tLWluIGRlZmF1bHRQb3B1cCBzYWxlc1BvcHVwXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYmVmb3JlQ2xvc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWlkQ2xpY2s6IHRydWUgLy8gYWxsb3cgb3BlbmluZyBwb3B1cCBvbiBtaWRkbGUgbW91c2UgY2xpY2suIEFsd2F5cyBzZXQgaXQgdG8gdHJ1ZSBpZiB5b3UgZG9uJ3QgcHJvdmlkZSBhbHRlcm5hdGl2ZSBzb3VyY2UuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlSWNvbkZpbGwoJGljb24sIHRpbWVNaW4sdGltZU1heCl7XHJcbiAgICB2YXIgdGltZSA9IGdldFJhbmRvbSh0aW1lTWluICwgdGltZU1heCk7XHJcbiAgICB2YXIgY29sb3JzID0gW1xyXG4gICAgICAgICAgICBcIiM4MjI4ODdcIixcclxuICAgICAgICAgICAgXCIjZWQxMDdhXCIsXHJcbiAgICAgICAgICAgIFwiIzAwNWQ5N1wiLFxyXG4gICAgICAgICAgICBcIiMxYmJlZThcIixcclxuICAgICAgICAgICAgXCIjN2ZiMzEwXCIsXHJcbiAgICAgICAgICAgIFwiI2U2YjMxN1wiXHJcbiAgICAgICAgXSxcclxuICAgIGNvbG9yc0wgPSBjb2xvcnMubGVuZ3RoO1xyXG5cclxuICAgIGZsaWNrZXJBbmltYXRlKCRpY29uKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmbGlja2VyQW5pbWF0ZShvYmplY3QpIHtcclxuICAgICAgICBUd2Vlbk1heC50byhvYmplY3QsIE1hdGgucmFuZG9tKCkgKiAwLjUgKyAwLjUsIHtcclxuICAgICAgICAgICAgZmlsbDogY29sb3JzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxICsgKGNvbG9yc0wtMSkgLSAwKSArIDApXSxcclxuICAgICAgICAgICAgZGVsYXk6IGdldFJhbmRvbSh0aW1lTWluICwgdGltZU1heCksXHJcbiAgICAgICAgICAgIG9uQ29tcGxldGU6IGZsaWNrZXJBbmltYXRlLFxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlUGFyYW1zOiBbb2JqZWN0XVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHBhZ2VBYm91dCgpe1xyXG4gICAgaWYoICQoXCIuYWJvdXRQYWdlXCIpLmxlbmd0aCA9PSAwICl7cmV0dXJuIGZhbHNlO31cclxuICAgICQoXCIuYWJvdXRQYWdlIC50aXRsZUJsb2NrIC5pY29uXCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBjaGFuZ2VJY29uRmlsbCggJCh0aGlzKSwgMywgNCApO1xyXG4gICAgfSk7XHJcbiAgICBcclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgIHN2ZzRldmVyeWJvZHkoe30pO1xyXG4vKnJlY2FsbHMqL1xyXG4gICAgcmVjYWxsc0xpc3RJbml0KCk7XHJcbi8qcmVjYWxscyBFTkQqL1xyXG4vKkdMT0JBTCovXHJcbiAgICBvcHRpb25TZWxlY3QoICQoXCIjY29udGVudFwiKSApO1xyXG4gICAgY3VzdG9taXplQ2hlY2tib3goICQoXCIjY29udGVudFwiKSApO1xyXG4gICAgY3VzdG9taXplUmFkaW9ib3goICQoXCIjY29udGVudFwiKSApO1xyXG5cdGluaXRCb3R0b21NZW51KCk7XHJcblx0Y29udGFjdHNtYXAoKTtcclxuICAgIHpvb21HYWxsZXJ5UG9wdXAoKTtcclxuICAgIGRvY05vdGVCbG9ja19tYXhIZWlnaHQoKTtcclxuICAgIHdyaXRlUmV3aWV2Rm9ybSgpO1xyXG4gICAgdmlkZW9QbGF5KCk7XHJcbi8qRU5EIEdMT0JBTCovXHJcbi8qaG9tZXBhZ2UqL1xyXG4gICAgSFBibHVlTGlua3NCbG9jaygpO1xyXG4gICAgSFBpbml0U292ZXRpQmxvY2soKTtcclxuICAgIHJlY2FsbHNCbG9ja1NsaWRlcigpO1xyXG4gICAgSFBtYWluU2xpZGVyKCk7XHJcbi8qRU5EIGhvbWVwYWdlKi9cclxuLypwYWdlIEFib3V0Ki9cclxuICAgIHBhZ2VBYm91dCgpO1xyXG4vKkVORCBwYWdlIEFib3V0Ki9cclxuLypkb2N0b3IqL1xyXG4gICAgZGV0YWlsRG9jdG9ySW5pdCgpO1xyXG4gICAgZG9jdG9yRGV0YWlsKCk7XHJcbi8qZG9jdG9yIEVORCovXHJcbi8qdGVoKi9cclxuICAgIHRlaG5vbG9neXBhZ2UoKTtcclxuLyp0ZWggZW5kKi9cclxuLypzZXJ2aWNlc0xpc3QqL1xyXG4gICAgc2VydmljZXNMaXN0KCk7XHJcbi8qZW5kIHNlcnZpY2VzTGlzdCovXHJcbi8qc2VydmljZXNEZXRhaWwqL1xyXG4gICAgc2VydmljZXNEZXRhaWwoKTtcclxuLypzZXJ2aWNlc0RldGFpbCBFTkQqL1xyXG4vKmFydGljbGVzKi9cclxuICAgIGFydGljbGVzTGlzdCgpO1xyXG4gICAgYXJ0aWNsZXNEZXRhaWwoKTtcclxuLypFTkQgYXJ0aWNsZXMqL1xyXG4vKnNhbGVzKi9cclxuICAgIHNhbGVzTGlzdCgpO1xyXG4vKmVuZCBzYWxlcyovXHJcbi8qR0xPQkFMKi9cclxuICAgIHBhZ2VuYXRpb25IZWxwZXIoKTtcclxuLypFTkQgR0xPQkFMKi9cclxufSk7XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuLypob21lcGFnZSovXHJcbiAgICBIUGluaXREb2N0b3JzQmxvY2soKTtcclxuLypFTkQgaG9tZXBhZ2UqL1xyXG4vKmRvY3RvcnMqL1xyXG4gICAgZG9jdG9yc0xpc3RJbml0KCk7XHJcbi8qZG9jdG9ycyBFTkQqL1xyXG59Il0sImZpbGUiOiJjdXN0b21zY3JpcHQuanMifQ==
