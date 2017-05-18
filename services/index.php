<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Услуги");
?>
<div class="clear servicesList">
	<div class="w-2col">
		<?$APPLICATION->IncludeComponent(
			"bitrix:catalog.section.list", 
			"tree", 
			array(
				"VIEW_MODE" => "TEXT",
				"SHOW_PARENT_NAME" => "Y",
				"IBLOCK_TYPE" => "services",
				"IBLOCK_ID" => "4",
				"SECTION_ID" => $_REQUEST["SECTION_ID"],
				"SECTION_CODE" => "",
				"SECTION_URL" => "",
				"COUNT_ELEMENTS" => "N",
				"TOP_DEPTH" => "2",
				"SECTION_FIELDS" => array(
					0 => "NAME",
					1 => "",
				),
				"SECTION_USER_FIELDS" => array(
					0 => "",
					1 => "",
				),
				"ADD_SECTIONS_CHAIN" => "Y",
				"CACHE_TYPE" => "A",
				"CACHE_TIME" => "36000000",
				"CACHE_NOTES" => "",
				"CACHE_GROUPS" => "Y",
				"COMPONENT_TEMPLATE" => "tree"
			),
			false
		);?>
	</div>
	<div class="w-1col">
		<a href="#" class="fileItem">
			<svg class="icon">
		    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-fileDownload"></use>
			</svg>
			<div class="name">Скачать полный прайс-лист услуг</div>
			<div class="desc">XLS, 124 Кб</div>
		</a>
		<a href="#" class="salesItem">
			<svg class="icon">
		    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-sale"></use>
			</svg>
			<div class="name">Скидки и акции</div>
		</a>
		<?$APPLICATION->IncludeComponent(
			"bitrix:main.include",
			".default",
			array(
				"AREA_FILE_SHOW" => "file",
				"AREA_FILE_SUFFIX" => "inc",
				"EDIT_TEMPLATE" => "",
				"COMPONENT_TEMPLATE" => ".default",
				"PATH" => "/local/templates/rudenta/inc/record.php"
			),
			false
		);?>
		<?$APPLICATION->IncludeComponent(
			"bitrix:menu",
			"child",
			Array(
				"ALLOW_MULTI_SELECT" => "N",
				"CHILD_MENU_TYPE" => "child",
				"DELAY" => "N",
				"MAX_LEVEL" => "1",
				"MENU_CACHE_GET_VARS" => array(""),
				"MENU_CACHE_TIME" => "3600",
				"MENU_CACHE_TYPE" => "N",
				"MENU_CACHE_USE_GROUPS" => "Y",
				"ROOT_MENU_TYPE" => "child",
				"USE_EXT" => "N"
			)
		);?>
	</div>
</div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>