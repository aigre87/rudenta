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
						<div class="desc">9:00 -21:00(без выходных)</div>
					</div>
					<div class="item phone">
						<div class="title">Многоканальный телефон</div>
						<div class="desc"><a href="tel:+74956468191"><b>+7(495)646-81-91</b></a></div>
					</div>
					<div class="item">
						<div class="title">Электронная почта</div>
						<div class="desc"><a href="mailto:grandpark@rudenta.ru">grandpark@rudenta.ru</a></div>
					</div>
					<div class="item">
						<div class="title">Вайбер</div>
						<div class="desc">+7(985)745-79-99</div>
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
					<div class="item notMenu">
						У нас  можно<br />
						расплатиться картой
						<div class="images">
							<i class="mastercard"></i>
							<i class="visa"></i>
						</div>
					</div>
					<div class="item notMenu">
						и взять рассрочку<br />
						на 10 месяцев
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
				<div class="adultDepartment">
					Взрослое отделение стоматологии «РуДента»
				</div>
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