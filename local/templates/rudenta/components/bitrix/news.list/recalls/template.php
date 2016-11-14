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
<div class="news-list">
<div class="recalls">
	Отзывы
</div>
<a href="/recalls/">
	Все отзывы
</a>
<?foreach($arResult['ITEMS'] as $arItem):?>
	<?php
		if($arItem['DISPLAY_PROPERTIES']['SEX']['VALUE_XML_ID'] == 'm'){
			$txt = 'Он оставил';
		}else{
			$txt = 'Она оставила';
		}
	?>
	<div class="man">
		Это <?=$arItem['NAME']?> <?=$txt?> нам отзыв
	</div>
	<div class="text">
		<?=$arItem['PREVIEW_TEXT']?>
	</div>
	<div class="betoo">
		Будь как <?=$arItem['NAME']?>! Напиши о своем опыте посещения клиники или предложение нашему руководителю.
	</div>

	<button class="email">Напиши нам письмо</button>
	<a href="#">показать другой отзыв</a>
<?endforeach;?>
</div>
