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
        history.replaceState( undefined, undefined, "#");
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
                    history.replaceState( undefined, undefined, hashArr.join("&"));
                }else{
                    history.replaceState( undefined, undefined, hashArr[0]);
                }
                return;
            }
        }
    }
}
function addhashValue(string, value){
    //нет хеша
    if( window.location.hash.length == 0 ){
        history.replaceState( undefined, undefined, "#"+string+value);
    //есть хеш
    }else{
        //один хеш
        if( window.location.hash.indexOf("&") === -1 ){
            //нет такого типа хеша
            if( window.location.hash.indexOf(string) === -1 ){
                history.replaceState( undefined, undefined, window.location.hash +"&"+string+value);
            //есть такой тип хеша
            }else{
                history.replaceState( undefined, undefined, "#"+string+value);
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
                history.replaceState( undefined, undefined, window.location.hash+"&"+string+value);
            }else{
                history.replaceState( undefined, undefined, hashArr.join("&"));
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

    $block.on("mouseover", function(){
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
                addhashValue("sl_page_", nextCurIndex+1);
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


    // for(var i = 0; i < colsL; i+=4) {
    //   $cols.slice(i, i+4).wrapAll("<div class='row clear'></div>");
    // }
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
    //$(".homepage .doctors-list").css({visibility:"visible"});
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
        $("video.video-js").each(function(){
            var $this = $(this);
            var dataDep = $(this).attr("data-dep");
            videojs( $this[0], options, function() {

            }).ready(function(event){
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
                            },
                            open: function() {
                                myPlayer.play();
                            },
                            beforeClose: function() {
                                myPlayer.pause();
                            }
                        },
                        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
                    });
                }
                $(".videoPlayButton[data-dep='"+dataDep+"']").on("click", function(){
                    showVideo();
                });
            });
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


    function sertifSlider(){
      var owl = $(".doctor-detail .zoom-gallery"),
          $LA = $(".doctor-detail .arrow.left"),
          $RA = $(".doctor-detail .arrow.right");
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
            var $items = $(".doctor-detail .zoom-gallery .item"),
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
        items: 4,
        navRewind:false,
        margin: 10,
        nav: true,
        navText: [
          "<i class='fa fa-caret-left'></i>",
          "<i class='fa fa-caret-right'></i>"
        ],
        autoplay: false,
        autoplayHoverPause: false,
        // responsive: {
        //   0: {
        //     items: 2
        //   },
        //   800: {
        //     items: 3
        //   }
        // }
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
    sertifSlider();
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
            var $select = $('.filtesBlock select.'+clearclassList+'');
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
    if( !$(".servicesDetailPage").length > 0 ){ return false; }
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
            TweenLite.to(window, 0.5, { ease: Sine.easeInOut, scrollTo: arSC-15});
        }
    });

    /*init scroll offset*/
    if( window.location.hash.indexOf("active_secton_") > -1 ){
        var sectAttr = getHashValue("active_secton_"),
            $ar = $("*[data-ar='"+sectAttr+"']");
        var arSC = $ar.offset().top;

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
    Demo.prototype.itemPassesFilters = function (element) {
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

function tehnologyPopup(){
    $(".tehnology-list .item").on("click", function(e){
        var $this = $(this),
            $thisDetail = $this.find(".modal-detail-text");
        if( $thisDetail.length != 0 ){
            e.preventDefault();
            var $this = $(this),
                $thisDetail = $this.find(".modal-detail-text");

            $.magnificPopup.open({
                items: {
                    src: "<div class='defaultPopupContent mfp-with-anim'>"+$thisDetail[0].outerHTML+"</div>",
                    type: 'inline'
                },
                removalDelay: 500, //delay removal by X to allow out-animation
                closeBtnInside: true,
                mainClass: 'mfp-with-zoom',
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = "mfp-zoom-in defaultPopup";
                    },
                    beforeClose: function() {
                        $this.removeClass("active");
                    },
                },
                midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
            });
        }
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

function defaultSpoiler(){
    function initMultiple(){
        $(".default-spoiler").each(function(){
            var $this = $(this);
            if( $this.closest(".default-spoilers-wraper").length == 0 ){
                var $prevs = $this.prevUntil( "*:not(.default-spoiler)" );
                var $nexts = $this.nextUntil( "*:not(.default-spoiler)" );
                if( $prevs.length > 0 || $nexts.length > 0 ){
                    $this.add($prevs).add($nexts).wrapAll("<div class='default-spoilers-wraper'>");
                }
            }
        });
    }
    initMultiple();
    function action($spoiler, update){
        var $spoiler = $spoiler,
            $otherActiveSpoilers = $spoiler.siblings(".default-spoiler.active"),
            $header = $spoiler.find(".header"),
            $content = $spoiler.find(".content"),
            minH = $header.outerHeight(),
            maxH = minH+$content.outerHeight(),
            args = Array.prototype.slice.call(arguments);
            
        if( args.indexOf("update") > -1 ){
            if( !$spoiler.hasClass("active") ){
                TweenMax.set( $spoiler , { height : minH });
                $spoiler.addClass("complete");
            }else{
                TweenMax.set( $spoiler , { height : maxH });
                $spoiler.addClass("complete");
            }
        }else{
            if($otherActiveSpoilers.length > 0){
                $otherActiveSpoilers.removeClass("complete");
                TweenMax.to( $otherActiveSpoilers , 0.5, { height : minH, className:"-=active", ease: Power1.easeInOut, onComplete: function(){
                    $otherActiveSpoilers.addClass("complete");
                } });
            }
            
            if( !$spoiler.hasClass("active") ){
                $spoiler.removeClass("complete");
                TweenMax.to( $spoiler , 0.5, { height : maxH, className:"+=active", ease: Power1.easeInOut, onComplete: function(){
                    $spoiler.addClass("complete");
                } });
            }else{
                $spoiler.removeClass("complete");
                TweenMax.to( $spoiler , 0.5, { height : minH, className:"-=active", ease: Power1.easeInOut, onComplete: function(){
                    $spoiler.addClass("complete");
                } });
            }
        }
    }

    $(".default-spoiler .header").on("click", function(){
        action($(this).closest(".default-spoiler"));
    });
    $(".default-spoiler.open").each(function(){
        action($(this));
    });
    $(".default-spoiler").each(function(){
        action($(this), "update");
    });
    // $(window).smartresize(function(){
    //     $(".default-spoiler").each(function(){
    //         action($(this), "update");
    //     })
    // });
}

$(document).ready(function(){
    svg4everybody({});
/*recalls*/
    recallsListInit();
/*recalls END*/
/*GLOBAL*/
    defaultSpoiler();
    optionSelect( $("#content") );
    customizeCheckbox( $("#content") );
    customizeRadiobox( $("#content") );
	initBottomMenu();
	contactsmap();
    zoomGalleryPopup();
    docNoteBlock_maxHeight();
    writeRewievForm();
    videoPlay();
    tehnologyPopup();
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