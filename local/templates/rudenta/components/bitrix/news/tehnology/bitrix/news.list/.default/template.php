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
<div class="pageAnons">
	<?$APPLICATION->IncludeComponent(
		"bitrix:main.include",
		".default",
		Array(
			"AREA_FILE_SHOW" => "file",
			"AREA_FILE_SUFFIX" => "inc",
			"COMPONENT_TEMPLATE" => ".default",
			"EDIT_TEMPLATE" => "",
			"PATH" => "/local/templates/rudenta/inc_editable/tehnology_preview_text.php"
		)
	);?>
</div>
<div id="tehnologyBlock" class="clear">
	<div id="items" class="items w-2col">
		<div id="itemsRow">
			<?foreach($arResult["ITEMS"] as $arItem):?>
				<div data-cat="<? for($i = 0;$i<count($arItem['PROPERTIES']['SERVICE']['VALUE']);$i++): ?><?=$arItem['PROPERTIES']['SERVICE']['VALUE'][$i]." "?><? endfor;?>" class="item">
					<div class="imgW" style="background-image: url(<?=$arItem['PREVIEW_PICTURE']['src']?>);"></div>
					<div class="name"><?=$arItem['NAME']?></div>
					<div class="modal-detail-text">
						<?=$arItem['NAME']?>
						<?=$arItem['PREVIEW_TEXT']?>
					</div>
				</div>
			<?endforeach;?>
		</div>
	</div>
	<div class="rc w-1col">
		<div class="topics">
			<div class="title">Темы</div>
			<div class="linksBlock">
				<div class="button reset active"><span>Все темы <sup><?=$arResult['ALL_CNT']?></sup></span></div>
				<?foreach($arResult['TEMS'] as $section_name => $section_arr):?>
					<div data-val="<?=$section_arr['SERVICE_ID']?>" class="button">
						<span><?=$section_name?><sup><?=$section_arr['CNT']?></sup></span>
					</div>
				<?endforeach;?>
			</div>
		</div>
	</div>
</div>
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
	<?=$arResult["NAV_STRING"]?>
<?endif;?>

