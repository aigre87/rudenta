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
<h1><?php echo $arResult['NAME']?></h1>
<div class="articlesDetailPage">
	<div class="topBlock clear">
		<div class="w-2col lc">
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
		<div class="w-1col rc">
			<?php
				$doc_array = Doctors::getInfo($arResult['DISPLAY_PROPERTIES']['DOCTOR']['VALUE'],40, 40);
			?>
			<div class="doctor">
				<div class="imgW"><img src="<?=$doc_array['PREVIEW_PICTURE']?>"></div>
				<div class="name"><?=$doc_array['NAME']?></div>
				<div class="position"><?=$doc_array['POSITION']?></div>
			</div>
			<div class="date">
				Опубликованно <?php echo FormatDate("d F Y", MakeTimeStamp($arResult['DISPLAY_ACTIVE_FROM']));?>
			</div>
			<div class="printVersion">Версия дял печати</div>
			<a class="printButton">Распечатать</a>
			<a class="disablePrintVersion">Обычный просмотр</a>
		</div>
	</div>

	<?php
	$random_art = Articles::getRandom($arResult['DISPLAY_PROPERTIES']['SERVICE']['VALUE'], $arResult['ID']);
	?>
	<?if(!empty($random_art)):?>
		<div class="articles section">
			<h3>Другие советы по теме</h3>
			<div class="docNoteBlock clear">
				<?foreach ($random_art as $usl):?>
					<a class="w-1col" href="/articles/<?=$usl['ID']?>/"><?=$usl['NAME']?></a>
				<?endforeach;?>
			</div>
		</div>
	<?endif;?>
</div>