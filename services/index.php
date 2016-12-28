<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Услуги");
?>
<div class="clear servicesList">
	<div class="w-2col">
		<div class="customPageTitle">
			Услуги
		</div>
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
			<div class="name">Скачать полный прайс-лист услуг</div>
			<div class="desc">XLS, 124 Кб</div>
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
	</div>
</div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>