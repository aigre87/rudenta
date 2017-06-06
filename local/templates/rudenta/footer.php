<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
		</section>
		<!--content END-->
		<footer>
 			<div class="contactsBlock clear">
				<div class="contactsMapW w-2col">
					<div id="contactsMap">
   <script type="text/javascript">
               function BX_SetPlacemarks_MAP_R8UPGQMhv2(map)
               {
                   if(typeof window["BX_YMapAddPlacemark"] != 'function')
                   {
                       /* If component's result was cached as html,
                        * script.js will not been loaded next time.
                        * let's do it manualy.
                        */
               
                       (function(d, s, id)
                       {
                           var js, bx_ym = d.getElementsByTagName(s)[0];
                           if (d.getElementById(id)) return;
                           js = d.createElement(s); js.id = id;
                           js.src = "/local/templates/rudenta/components/bitrix/map.yandex.view/.default/script.js";
                           bx_ym.parentNode.insertBefore(js, bx_ym);
                       }(document, 'script', 'bx-ya-map-js'));
               
                       var ymWaitIntervalId = setInterval( function(){
                               if(typeof window["BX_YMapAddPlacemark"] == 'function')
                               {
                                   BX_SetPlacemarks_MAP_R8UPGQMhv2(map);
                                   clearInterval(ymWaitIntervalId);
                               }
                           }, 300
                       );
               
                       return;
                   }
               
                   var arObjects = {PLACEMARKS:[],POLYLINES:[]};
                               arObjects.PLACEMARKS[arObjects.PLACEMARKS.length] = BX_YMapAddPlacemark(map, {'LON':'37.519392304229','LAT':'55.787733395982','TEXT':'Детская стоматология РуДента  Kids','PRESET':'twirl#greenStretchyIcon'});
                               arObjects.PLACEMARKS[arObjects.PLACEMARKS.length] = BX_YMapAddPlacemark(map, {'LON':'37.51986292801','LAT':'55.787140830477','TEXT':'Cтоматология РуДента','PRESET':'twirl#redStretchyIcon'});
                           }
            </script>
            <div class="bx-yandex-view-layout">
               <div class="bx-yandex-view-map">
                  <script type="text/javascript">
                     if (!window.GLOBAL_arMapObjects)
                     	window.GLOBAL_arMapObjects = {};
                     
                     function init_MAP_R8UPGQMhv2()
                     {
                     	if (!window.ymaps)
                     		return;
                     
                     	if(typeof window.GLOBAL_arMapObjects['MAP_R8UPGQMhv2'] !== "undefined")
                     		return;
                     
                     	var node = BX("BX_YMAP_MAP_R8UPGQMhv2");
                     	node.innerHTML = '';
                     
                     	var map = window.GLOBAL_arMapObjects['MAP_R8UPGQMhv2'] = new ymaps.Map(node, {
                     		center: [55.787570792988, 37.518470300026],
                     		zoom: 16,
                     		type: 'yandex#map'
                     	});
                     
                     	if (map.behaviors.isEnabled("scrollZoom"))
                     		map.behaviors.disable("scrollZoom");
                     	map.behaviors.enable("dblClickZoom");
                     	map.behaviors.enable("drag");
                     	if (map.behaviors.isEnabled("rightMouseButtonMagnifier"))
                     		map.behaviors.disable("rightMouseButtonMagnifier");
                     	map.controls.add('zoomControl', {left: 40, top: 50});
                     	map.controls.add('miniMap', {left: 50, bottom: 40});
                     	map.controls.add('typeSelector', {right: 50, top: 30});
                     	if (window.BX_SetPlacemarks_MAP_R8UPGQMhv2)
                     	{
                     		window.BX_SetPlacemarks_MAP_R8UPGQMhv2(map);
                     	}
                     }
                     BX.ready(function() {
	                     (function bx_ymaps_waiter(){
	                     	if(typeof ymaps !== 'undefined')
	                     		ymaps.ready(init_MAP_R8UPGQMhv2);
	                     	else
	                     		setTimeout(bx_ymaps_waiter, 100);
	                     })();
											});

                     
                     
                     /* if map inits in hidden block (display:none)
                     *  after the block showed
                     *  for properly showing map this function must be called
                     */
                     function BXMapYandexAfterShow(mapId)
                     {
                     	if(window.GLOBAL_arMapObjects[mapId] !== undefined)
                     		window.GLOBAL_arMapObjects[mapId].container.fitToViewport();
                     }
                     
                  </script>
                  <div id="BX_YMAP_MAP_R8UPGQMhv2" class="bx-yandex-map" style="height: 540px; width: 830px;">загрузка карты...</div>
               </div>
            </div>
					</div>
				</div>
				<div class="contactsText w-1col">
					<div class="item">
						<div class="title">Адрес</div>
						<div class="desc"><b>Москва, пр Березовой рощи, д8</b></div>
					</div>
					<div class="item">
						<div class="title">Время работы</div>
						<div class="desc">9:00 - 21:00 ежедневно</div>
					</div>
					<div class="item phone">
						<div class="title">Многоканальный телефон</div>
						<div class="desc"><a href="tel:+74956468191"><b>+ 7 (495) 104-77-87</b></a></div>
					</div>
					<div class="item">
						<div class="title">Электронная почта</div>
						<div class="desc"><a href="mailto:grandpark@rudenta.ru">grandpark@rudenta.ru</a></div>
					</div>
				</div>
			</div>
			<menu id="bottomMenu">
			<div class="layoutW clear">
				<?$APPLICATION->IncludeComponent(
					"bitrix:menu",
					"bottom",
					Array(
						"ALLOW_MULTI_SELECT" => "N",
						"CHILD_MENU_TYPE" => "bottom",
						"DELAY" => "N",
						"MAX_LEVEL" => "1",
						"MENU_CACHE_GET_VARS" => array(""),
						"MENU_CACHE_TIME" => "3600",
						"MENU_CACHE_TYPE" => "N",
						"MENU_CACHE_USE_GROUPS" => "Y",
						"ROOT_MENU_TYPE" => "bottom",
						"USE_EXT" => "N"
					)
				);?>
				<div class="w-1d4col rc">
					<div class="t clear">
						<div class="lb">
							<div class="text">
								Принимаем<br />
								наличные и карты
							</div>
							<div class="icons">
								<div class="visa"></div>
								<div class="mastercard"></div>
								<div class="koshel"></div>
							</div>
						</div>
						<div class="rb">
							<a class="sales" href="/sales/">
								<span class="text">Скидки и акции</span>
								<svg class="icon">
								    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-sale"></use>
								</svg>
							</a><br />
							<span>Лечение по страховке</span><br />
							<span>Рассрочка</span>
						</div>
					</div>
					<div class="socialLinks">
						<a href="https://vk.com/rudenta_clinic" class="vk">
							<svg class="icon">
							    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/images/symbol/sprite.svg#icon-vkontakte-white"></use>
							</svg>
							Вконтакте
						</a>
						<a href="https://www.facebook.com/clinicrudenta/" class="fb">
							<svg class="icon">
							    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/images/symbol/sprite.svg#icon-facebook-white"></use>
							</svg>
							Фейсбук
						</a>
						<a href="https://www.instagram.com/rudenta_kids/" class="ig">
							<svg class="icon">
							    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/images/symbol/sprite.svg#icon-instagram-white"></use>
							</svg>
							Инстаграм
						</a>
					</div>
				</div>
			</div>
			</menu>
			<div class="bb">
			<div class="layoutW clear">
				<div class="copyright">
					&copy; 2007–2016, Стоматологическая клиника «РуДента»
				</div>
				<div class="siteMap">
					Карта сайта
				</div>
				<a class="adultDepartment">
					<a target="_blank" class="adultDepartment" href="https://rudenta.ru">Взрослое отделение стоматологии «РуДента»</a>
				</a>
			</div>
			</div>
		</footer>
	</div>
	<!--mainWrapper-->

	<?
		global $shareImgSrc; /* declared in components of this template */
		global $shareDescription; /* declared in components of this template */

		if(!$shareImgSrc) {
			$shareImgSrc = SITE_TEMPLATE_PATH."/images/siteShareImg.png";
		}
		$shareImgSrc = preg_match("^https?://(.*)", $url) ? $shareImgSrc : "http://".$_SERVER["HTTP_HOST"].$shareImgSrc;

		if(!$shareDescription) {
			$shareDescription = $APPLICATION->GetDirProperty("description");
			if( empty($shareDescription) ) {
				$shareDescription = "Rudenta детская стоматология";
			}
		}


		$APPLICATION->AddHeadString('<meta property="og:title" content="' . $APPLICATION->GetTitle() . '" />', false, false);
		$APPLICATION->AddHeadString('<meta property="og:url" content=http://' . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] . '" />', false, false);
		$APPLICATION->AddHeadString('<meta property="og:image" content="'.$shareImgSrc.'" />', false, false);
		$APPLICATION->AddHeadString('<meta property="og:description" content="'.str_replace('"',"'", $shareDescription).'" />', false, false);
	?>
	</body>
</html>