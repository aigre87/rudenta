<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Услуги");
?>

<?$APPLICATION->IncludeComponent(
	"bitrix:catalog.section.list", 
	"tree", 
	array(
		"VIEW_MODE" => "TEXT",
		"SHOW_PARENT_NAME" => "Y",
		"IBLOCK_TYPE" => "about",
		"IBLOCK_ID" => "17",
		"SECTION_ID" => $_REQUEST["SECTION_ID"],
		"SECTION_CODE" => "",
		"SECTION_URL" => "",
		"COUNT_ELEMENTS" => "Y",
		"TOP_DEPTH" => "3",
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

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>