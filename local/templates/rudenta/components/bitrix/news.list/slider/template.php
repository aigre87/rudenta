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
<div id="hp_slider">
	<div class="slidesW">
	<?foreach($arResult["ITEMS"] as $arItem):?>
		<?
		$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
		$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
		?>
			<? if (!empty($arItem['PREVIEW_PICTURE'])): ?>
				<div class="slide" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
					<div class="imgW"><img src="<?=$arItem['PREVIEW_PICTURE']['src']?>"></div>
					<div class="desc"><?=$arItem['DISPLAY_PROPERTIES']['TEXT_UNDER']['VALUE']?></div>
				</div>
			<? endif;?>
	<?endforeach;?>
	</div>
	<div class="left-arrow"></div>
	<div class="right-arrow"></div>
</div>