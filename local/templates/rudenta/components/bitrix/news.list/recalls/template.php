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
<div class="recallsBlock">
<div class="recallsBlockIW">
	<h2>
		Клиенты о нас
	</h2>
	<div class="items">
		<?foreach($arResult['ITEMS'] as $arItem):?>
			<?php
				if($arItem['DISPLAY_PROPERTIES']['SEX']['VALUE_XML_ID'] == 'm'){
					$class = 'male';
				}else{
					$class = 'female';
				}
			?>
			<div class="item <?=$class?>">
				<div class="text">
					<?=$arItem['PREVIEW_TEXT']?>
				</div>
				<div class="desc"><?=$arItem['NAME']?>, <?=$arItem["ACTIVE_FROM"]?></div>
			</div>
		<?endforeach;?>
	</div>
	<div class="nav">
		<div class="shownext">Eщё отзыв</div>
		<a class="allRecalls" href="/recalls/"><span>Все отзывы</span></a>
	</div>
</div>
</div>
