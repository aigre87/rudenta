<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<div class="salesListPage">
	<div class="pageAnons">
		<?$APPLICATION->IncludeComponent(
			"bitrix:main.include",
			".default",
			array(
				"AREA_FILE_SHOW" => "file",
				"AREA_FILE_SUFFIX" => "inc",
				"EDIT_TEMPLATE" => "",
				"COMPONENT_TEMPLATE" => ".default",
				"PATH" => "/local/templates/rudenta/inc/sales_text.php"
			),
			false
		);?>
	</div>
	<div class="salesItems">
		<? foreach($arResult['ITEMS'] as $arItem): ?>
			<div class="item">
				<? if(!empty($arItem['DISPLAY_PROPERTIES']['SALE']['VALUE'])): ?>
					<div class="percent">- <?=$arItem['DISPLAY_PROPERTIES']['SALE']['VALUE']?> %</div>
				<? endif; ?>
				<div class="name"><?=$arItem['NAME']?></div>

				<div class="detailText">
					<?=$arItem['PREVIEW_TEXT']?>
				</div>
			</div>
		<? endforeach; ?>
	</div>
	<div class="recordForm">
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