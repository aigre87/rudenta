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
<div class="unlocal-recalls">
	<? foreach($arResult['ITEMS'] as $arItem): ?>
		<a href="<?=$arItem['CODE']?>" target="_blank" class="unlocal-recalls-item">
			<img src="<?=$arItem['PREVIEW_PICTURE']['SRC']?>">
			<?=$arItem['NAME']?>
		</a>
	<? endforeach; ?>
</div>
