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
<div id="doctors-list">
	<div class="item w-1col title">
		<span><?$APPLICATION->ShowTitle(false)?></span>
	</div>
	<?if($arParams["DISPLAY_TOP_PAGER"]):?>
		<?=$arResult["NAV_STRING"]?>
	<?endif;?>
	<?foreach($arResult["ITEMS"] as $arItem):?>
		<?
		$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
		$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
		?>
	<a href="<?=$arItem["DETAIL_PAGE_URL"]?>" <?/*style="background-color: <?php echo $arItem['PROPERTIES']['BACKGROUND']['VALUE_XML_ID']?>"*/?> class="item doctor w-1col" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
		<span class="text">
			<span class="name"><?php echo $arItem['NAME'];?></span>
			<span class="position"><?php echo $arItem['DISPLAY_PROPERTIES']['POSITION']['DISPLAY_VALUE']?></span>
			<span class="experience"><?php echo $arItem['DISPLAY_PROPERTIES']['EXPERIENCE']['NEW_VALUE']?> опыта</span>
			<span class="awards'"><?if(!empty($arItem['CNT_AWARDS'])):?><?php echo $arItem['CNT_AWARDS']?> наград и сертификатов<?endif;?></span>
			<span class="recalls"><?if(!empty($arItem['CNT_RECALLS'])):?><?php echo recalls($arItem['CNT_RECALLS'])?><?endif;?></span>
			<span class="articles"><?if(!empty($arItem['CNT_ARTICLES'])):?><?php echo articles($arItem['CNT_ARTICLES']);?><?endif;?></span>
		</span>
		<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
		<span class="imgW">
			<img
				class="preview_picture"
				border="0"
				src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>"
				alt="<?=$arItem["PREVIEW_PICTURE"]["ALT"]?>"
				title="<?=$arItem["PREVIEW_PICTURE"]["TITLE"]?>"
			/>
		</span>
		<?endif;?>
		<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
		<?endif?>
	</a>
	<?endforeach;?>
	<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
		<?=$arResult["NAV_STRING"]?>
	<?endif;?>
</div>
