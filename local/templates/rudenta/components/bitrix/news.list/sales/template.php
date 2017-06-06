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
<div class="sales">
	<? foreach($arResult['ITEMS'] as $arItem): ?>
		<div class="sale-item">
			<? if(!empty($arItem['DISPLAY_PROPERTIES']['SALE']['VALUE'])): ?>
				<div class="sale-item-percent">- <?=$arItem['DISPLAY_PROPERTIES']['SALE']['VALUE']?> %</div>
			<? endif; ?>
			<div class="sale-item-name"><?=$arItem['NAME']?></div>

			<div class="sale-item-hide">
				<div class="sale-item-hide-text"><?=$arItem['PREVIEW_TEXT']?></div>
			</div>
		</div>
	<? endforeach; ?>
	<div class="sale-hide-record">
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