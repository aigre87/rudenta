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
<div class="blueBlockLinks clear">
	<a href="#" class="w-1d6col col">
		<span class="name">Первое посещение</span>
		<span class="value">Бесплатно</span>
	</a>
	<?foreach($arResult['MAIN_SECTIONS'] as $section_id => $section_arr):?>
		<a href="/services/detail/<?=$section_id?>/" class="w-1d6col col">
			<span class="name"><?=$section_arr['NAME']?></span>
			<span class="value"><?if(!empty($section_arr['MIN_PRICE'])):?>от <?=$section_arr['MIN_PRICE']?> Р<?endif;?></span>
		</a>
	<?endforeach;?>
	<a href="/services/" class="w-1d6col col all">
		<span class="name">Все услуги</span>
	</a>
</div>
