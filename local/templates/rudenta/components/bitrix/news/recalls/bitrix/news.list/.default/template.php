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
<div class="recalls-list">
	<h2>
		<?=Recalls::getRecallsCNT();?>
	</h2>
	<?foreach($arResult["ITEMS"] as $arItem):?>
		<?
		$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
		$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
		?>
		<div class="recall-item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
			<div class="row1">
				<span class="name"><?=$arItem["NAME"]?></span>
				<span class="town"><?=$arItem['DISPLAY_PROPERTIES']['CITY']['VALUE']?></span>
			</div>
			<?
				$str = $arItem['DISPLAY_PROPERTIES']['RATING']['VALUE'];
				$int = filter_var($str, FILTER_SANITIZE_NUMBER_INT);
				$perc = intval($int)*100/5;
			?>
			<div class="raiting" data-val="<?=$int?>">
				<div class="val" style="width:<?=$perc?>%;"></div>
				<div class="bg"></div>
			</div>
			<div class="row2">
				<?echo FormatDate("d F Y", MakeTimeStamp($arItem["DISPLAY_ACTIVE_FROM"]));?>
				<?if(!empty($arItem['DISPLAY_PROPERTIES']['SERVICE']['VALUE'])):?>
					про <?=$arItem['DISPLAY_PROPERTIES']['SERVICE']['DISPLAY_VALUE']?>
				<?endif;?>
				<?if(!empty($arItem['DISPLAY_PROPERTIES']['DOCTOR']['VALUE'])):?>
					врачу <?=$arItem['DISPLAY_PROPERTIES']['DOCTOR']['DISPLAY_VALUE']?>
				<?endif;?>
			</div>
			<div class="text">
				<?echo $arItem["PREVIEW_TEXT"];?>
			</div>
		</div>
	<?endforeach;?>	
</div>
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
	<?=$arResult["NAV_STRING"]?>
<?endif;?>
