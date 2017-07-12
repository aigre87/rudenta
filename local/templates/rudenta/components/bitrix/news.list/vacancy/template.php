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
<div class="vacancy-list">
<?foreach($arResult["ITEMS"] as $arItem):?>
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
	?>
	<div class="default-spoiler" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
		<div class="header">
			<?echo $arItem["NAME"]?>
		</div>
		<div class="content">
			<?if($arItem["PREVIEW_TEXT"]):?>
				<div class="detailText"><?echo $arItem["PREVIEW_TEXT"];?></div>
			<?endif;?>
			<div class="duties cat">
			<div class="catTitle">Обязанности:</div>
			 <ul>
				 <?foreach($arItem['PROPERTIES']['DUTIES']['VALUE'] as $duties_name):?>
					<li><?=$duties_name?></li>
				 <?endforeach;?>
			 </ul>
			</div>
			<div class="requir cat">
				<div class="catTitle">Требования:</div>
				<ul>
					<?foreach($arItem['PROPERTIES']['REQUIR']['VALUE'] as $requir_name):?>
						<li><?=$requir_name?></li>
					<?endforeach;?>
				</ul>
			</div>
			<div class="conditions cat">
				<div class="catTitle">Условия:</div>
				<ul>
					<?foreach($arItem['PROPERTIES']['CONDITIONS']['VALUE'] as $condition_name):?>
						<li><?=$condition_name?></li>
					<?endforeach;?>
				</ul>
			</div>
		</div>
	</div>
<?endforeach;?>
</div>
