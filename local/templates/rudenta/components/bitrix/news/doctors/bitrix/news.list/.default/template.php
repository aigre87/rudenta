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
		<h1><?$APPLICATION->ShowTitle(false)?></h1>
	</div>
	<?if($arParams["DISPLAY_TOP_PAGER"]):?>
		<?=$arResult["NAV_STRING"]?>
	<?endif;?>
	<?foreach($arResult["ITEMS"] as $arItem):?>
		<?
		$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
		$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
		?>

	<?
		if( !empty($arItem['PROPERTIES']['BG_LIST']['VALUE']) && preg_match("/^#\w{6}$/", $arItem['PROPERTIES']['BG_LIST']['VALUE']) ){
			$color = $arItem['PROPERTIES']['BG_LIST']['VALUE'];
			$rgb = hex2rgb($color);
			$hsl = rgbToHsl( $rgb[0], $rgb[1], $rgb[2] );
			$hsl[2] = ($hsl[2] - 0.15 > 0) ? ($hsl[2] - 0.15) : 0;
			$newrgb = hslToRgb($hsl[0], $hsl[1], $hsl[2]);
			$newrgb_string = implode(",", $newrgb);
		}
	?>
	<?if( !empty($arItem['PROPERTIES']['BG_LIST']['VALUE']) ):?>
		<a
		 style="box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0); background: <?=$color?>"
		 onMouseOver='this.style.boxShadow="0px 30px 35px -19px rgba(<?=$newrgb_string?>, 0.7)"'
		 onMouseOut='this.style.boxShadow="0px 0px 0px 0px rgba(255, 255, 255, 0)"'
		 href="<?=$arItem["DETAIL_PAGE_URL"]?>"
		 class="item doctor w-1col"
		 id="<?=$this->GetEditAreaId($arItem['ID']);?>">
	<?else:?>
		<a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="item doctor w-1col" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
	<?endif?>
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
				src="<?=$arItem["PREVIEW_PICTURE"]["src"]?>"
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
