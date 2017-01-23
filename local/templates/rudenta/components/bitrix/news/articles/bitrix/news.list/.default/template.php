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
<div class="articles-list clear">
	<div class="w-2col lc">
		<?foreach($arResult["ITEMS"] as $arItem):?>
			<?
			$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
			$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
			?>
			<div class="item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
				<div class="title"><a href="<?=$arItem['DETAIL_PAGE_URL']?>"><?=$arItem['NAME']?></a></div>
				<div class="text"><?=$arItem['PREVIEW_TEXT']?></div>
				<?php
					$doc_array = Doctors::getInfo($arItem['DISPLAY_PROPERTIES']['DOCTOR']['VALUE'],40, 40);
				?>
				<div class="bottomRow">
					<div class="date">
						<a href="<?=$arItem['DETAIL_PAGE_URL']?>">Читать далее...</a>
						<?php /*echo FormatDate("d F Y", MakeTimeStamp($arItem['DISPLAY_ACTIVE_FROM']));*/?>
					</div>
					<div class="doc">
						<div class="imgW"><img src="<?=$doc_array['PREVIEW_PICTURE']?>"></div>
						<div class="rc">
							<div class="name"><?=$doc_array['NAME']?></div>
							<div class="position"><?=$doc_array['POSITION']?></div>
						</div>
					</div>
					<?/*<div class="counter">
						<?php echo $arItem['SHOW_COUNTER']. ' просмотров';?>
					</div>*/?>
				</div>
			</div>
		<?endforeach;?>
		<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
			<?=$arResult["NAV_STRING"]?>
		<?endif;?>
	</div>
	<div class="w-1col rc">
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
