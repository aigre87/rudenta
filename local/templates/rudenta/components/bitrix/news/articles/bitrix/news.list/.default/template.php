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
<div class="news-list">
<?foreach($arResult["ITEMS"] as $arItem):?>
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
	?>
	<p class="news-item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
		<a href="<?=$arItem['DETAIL_PAGE_URL']?>"><?=$arItem['NAME']?></a>
		<br/>
		<span><?=$arItem['PREVIEW_TEXT']?></span>
		<br/>
		<?php
			$doc_array = Doctors::getInfo($arItem['DISPLAY_PROPERTIES']['DOCTOR']['VALUE'],40, 40);
		?>
		<span class="doc">
			<img src="<?=$doc_array['PREVIEW_PICTURE']?>">
			<?=$doc_array['NAME']?>
			<?=$doc_array['POSITION']?>
		</span>
		<br/>
		<span class="date">
			<?php echo FormatDate("d F Y", MakeTimeStamp($arItem['DISPLAY_ACTIVE_FROM']));?>
		</span>
		<br/>
		<span class="counter">
			<?php echo $arItem['SHOW_COUNTER']. ' просмотров';?>
		</span>
	</p>
<?endforeach;?>

	<?$APPLICATION->IncludeComponent(
		"bitrix:main.include",
		".default",
		array(
			"AREA_FILE_SHOW" => "file",
			"AREA_FILE_SUFFIX" => "inc",
			"EDIT_TEMPLATE" => "",
			"COMPONENT_TEMPLATE" => ".default",
			"PATH" => "/articles/inc/filter.php"
		),
		false
	);?>
</div>
