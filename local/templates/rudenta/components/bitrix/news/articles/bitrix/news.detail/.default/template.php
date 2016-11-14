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
<div class="news-detail">
	<div><strong><?php echo $arResult['NAME']?></strong></div>
	<div><?php echo $arResult['DETAIL_TEXT']?></div>

	<?php
	$doc_array = Doctors::getInfo($arResult['DISPLAY_PROPERTIES']['DOCTOR']['VALUE'],40, 40);
	?>
	<div class="doc">
			<img src="<?=$doc_array['PREVIEW_PICTURE']?>">
		<?=$doc_array['NAME']?>
		<?=$doc_array['POSITION']?>
	</div>
	<div class="date">
		<?php echo FormatDate("d F Y", MakeTimeStamp($arResult['DISPLAY_ACTIVE_FROM']));?>
	</div>
	<?php
	$random_art = Articles::getRandom($arResult['DISPLAY_PROPERTIES']['SERVICE']['VALUE'], $arResult['ID']);
	?>
	<?if(!empty($random_art)):?>
		<div class="copy-records">
			<strong>Похожие записи</strong>
		</div>
		<?foreach ($random_art as $usl):?>
			<a href="/articles/<?=$usl['ID']?>/"><?=$usl['NAME']?></a>
		<?endforeach;?>
	<?endif;?>
</div>