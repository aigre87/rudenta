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
<div class="tehnologyDetailPage">
	<div class="topBlock clear">
		<div class="w-2col lc">
			<h1><?php echo $arResult['NAME']?></h1>
			<div class="text">
				<div class="previewText">
					<?php echo $arResult['PREVIEW_TEXT'];?>
				</div>
				<div class="detailText">
					<?php echo $arResult['DETAIL_TEXT']?>
				</div>
			</div>
			<div class="shareBlock">
				<script src="//yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
				<script src="//yastatic.net/share2/share.js"></script>
				<div class="ya-share2" data-services="vkontakte,odnoklassniki,facebook,twitter" data-counter="" data-title="<?=$arResult["NAME"]?>" data-description="<?=$arResult['PREVIEW_TEXT']?>"></div>
			</div>
		</div>
		<div class="w-1col rc">

			<div class="topics">
				<div class="title">Темы</div>
				<div class="linksBlock">
					<? foreach($arResult['SERVICES'] as $service): ?>
						<div class="button <?if($service['ACTIVE'] == 'Y'): ?> active <? endif; ?>">
							<span><?=$service['NAME']?></span>
						</div>
					<? endforeach; ?>
				</div>
			</div>

			<div class="printVersion">Версия для печати</div>
			<a class="printButton">Распечатать</a>
			<a class="disablePrintVersion">Обычный просмотр</a>
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
</div>