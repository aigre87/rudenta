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
function getRandom(min, max) {
  return min + Math.random() * (max - min);
}


function optionSelect(){
    console.log($('select').length);
    if( myGlobalisMobileDevice ){ return false; }
    $('select').selectric({
        disableOnMobile: false
    });
    console.log($('select').length);
    $(".selectric-scroll").niceScroll({
        cursorcolor: '#ff9300',
        cursorwidth: '5px',
        cursorborderradius: '2px',
        cursorborder: '0px solid #ff9300',
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
function customizeCheckbox( $element ){
    var $cBox = $element.find("input[type='checkbox']");
    if( !$cBox.length > 0 ){return false;}
    $cBox.each(function(){
        $(this).wrap("<span class='custom-checkbox' />").after('<span class="box"><span class="tick"></span></span>');
    });
};
function initBottomMenu(){
    if( !$("#bottomMenu .item").length > 0 ){ return false;}
	var $items = $("#bottomMenu .item"),
	itemsL = $items.length,
	count = Math.ceil(itemsL/3);

	for(var i = 0; i < itemsL; i+=count) {
	  $items.slice(i, i+count).wrapAll("<div class='w-1d4col'></div>");
	}
}

function HPinitSovetiBlock(){
    if( !$(".homepage .sovetiBlock .item").length > 0 ){ return false;}
    var $items = $(".homepage .sovetiBlock .item"),
    itemsL = $items.length,
    count = Math.ceil(itemsL/3);

    for(var i = 0; i < itemsL; i+=count) {
      $items.slice(i, i+count).wrapAll("<div class='w-1col'></div>");
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

    function initIcons(){
        $overFlows.each(function(i , el){
            var $overflow = $(this),
                $col = $overflow.closest(".col"),
                $link = $col.find(".item"),
                $iw = $link.find(".iw");
                thisInitRotate = getRandom(-5 , 5);

            TweenMax.set( $overflow, { rotation: thisInitRotate , left: "76px", top: "76px",  x: "-50%", y:"-50%", transformOrigin: "50% 50%", zIndex:1});
            var tl = new TimelineMax({
                paused: true,
            });
//zIndex: 4, width: "380px", left: 0, top: 0, height: $iw.outerHeight(), x: "0%", y: "0%"
            tl.fromTo( $overflow, 0.12, 
              {rotation: thisInitRotate, left: "76px", top: "76px", x: "-50%", y:"-50%", transformOrigin: "50% 50%", zIndex:1},
              { rotation : 0, ease:Power0.easeNone })
                .to( $overflow, 0.12, { "border-width" : 0, ease:Power0.easeNone })
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
}


function contactsmap(){
    ymaps.ready(init);
    function init () {
        var myMap = new ymaps.Map("contactsMap", {
                center: [55.787811, 37.519467],
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            }),

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




$(document).ready(function(){
/*GLOBAL*/
    optionSelect();
    customizeCheckbox( $("#content") );
	initBottomMenu();
	contactsmap();
/*END GLOBAL*/
/*homepage*/
    HPinitSovetiBlock();
    HPrecallsBlock();
/*END homepage*/
});
window.onload = function() {
/*homepage*/
    HPinitDoctorsBlock();
/*END homepage*/
}