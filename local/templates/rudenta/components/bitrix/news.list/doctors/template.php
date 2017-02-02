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
<div class="doctors-list">
	<?if($arParams["DISPLAY_TOP_PAGER"]):?>
		<?=$arResult["NAV_STRING"]?><br />
	<?endif;?>

	<?foreach($arResult["ITEMS"] as $arItem):?>
		<?
		$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
		$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
		?>
		<?
			$cssClass = translit($arItem['NAME']);
		?>
		<div class="w-1d6col col">
		<a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="itemOverflow"></a>
		<a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="item <?=$cssClass?>" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
			<span class="iw">
					<span class="text">
						<span class="name"><?php echo $arItem['NAME'];?></span>
						<span class="position"><?php echo $arItem['DISPLAY_PROPERTIES']['POSITION']['DISPLAY_VALUE']?></span>
						<span class="experience"><?php echo $arItem['DISPLAY_PROPERTIES']['EXPERIENCE']['NEW_VALUE']?> стаж работы</span>
						<span class="awards'"><?if(!empty($arItem['CNT_AWARDS'])):?><?php echo $arItem['CNT_AWARDS']?> наград и сертификатов<?endif;?></span>
						<span class="recalls"><?if(!empty($arItem['CNT_RECALLS'])):?><?php echo recalls($arItem['CNT_RECALLS'])?><?endif;?></span>
						<span class="articles"><?if(!empty($arItem['CNT_ARTICLES'])):?><?php echo articles($arItem['CNT_ARTICLES']);?><?endif;?></span>
					</span>
					<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
					<span class="imgW">
						<img
							src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>"
							alt="<?=$arItem["PREVIEW_PICTURE"]["ALT"]?>"
							title="<?=$arItem["PREVIEW_PICTURE"]["TITLE"]?>"
							style="
								<?if( $arItem['DISPLAY_PROPERTIES']['OFFSETX_ANONS_IMAGE'] ):?>
									margin-left: <?=$arItem['DISPLAY_PROPERTIES']['OFFSETX_ANONS_IMAGE']['VALUE'].'px'?>;
								<?endif;?>
								<?if( $arItem['DISPLAY_PROPERTIES']['OFFSETY_ANONS_IMAGE'] ):?>
									margin-top: <?=$arItem['DISPLAY_PROPERTIES']['OFFSETY_ANONS_IMAGE']['VALUE'].'px'?>;
								<?endif;?>
							"
						/>
					</span>
					<?endif;?>
			</span>
		</a>
		</div>
	<?endforeach;?>
	<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
		<?=$arResult["NAV_STRING"]?>
	<?endif;?>
</div>
