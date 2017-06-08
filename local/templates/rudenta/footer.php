<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
		</section>
		<!--content END-->
		<footer>
 			<div class="contactsBlock clear">
				<div class="contactsMapW w-2col">
					<div id="contactsMap"></div>
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
							<a href="/insurance/"><span>Лечение по страховке</span></a><br />
							<a href="/installment/"><span>Рассрочка</span></a>
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