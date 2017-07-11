<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
		</section>
		<!--content END-->
		<footer>
			<?$APPLICATION->IncludeComponent(
				"bitrix:main.include",
				".default",
				Array(
					"AREA_FILE_SHOW" => "file",
					"AREA_FILE_SUFFIX" => "inc",
					"COMPONENT_TEMPLATE" => ".default",
					"EDIT_TEMPLATE" => "",
					"PATH" => "/local/templates/rudenta/inc_editable/footer_contacts.php"
				)
			);?>
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
						<a href="https://vk.com/rudenta_clinic" target="_blank" class="vk">
							<svg class="icon">
							    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/images/symbol/sprite.svg#icon-vkontakte-white"></use>
							</svg>
							Вконтакте
						</a>
						<a href="https://www.facebook.com/clinicrudenta/" target="_blank" class="fb">
							<svg class="icon">
							    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/images/symbol/sprite.svg#icon-facebook-white"></use>
							</svg>
							Фейсбук
						</a>
						<a href="https://www.instagram.com/rudenta_kids/" target="_blank" class="ig">
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
					&copy; 2007–<?=date('Y');?>, Стоматологическая клиника «РуДента»
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
			if( empty($shareDescription) || $shareDescription == "description" || $shareDescription == "Description" ) {
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