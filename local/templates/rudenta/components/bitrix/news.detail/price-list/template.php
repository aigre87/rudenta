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
<a href="<?=$arResult['FILE_SRC']?>" download="price-list.xls" class="fileItem">
	<svg class="icon">
		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-fileDownload"></use>
	</svg>
	<div class="name">Скачать <?=$arResult['NAME']?></div>
	<div class="desc">XLS, <?=$arResult['FILE_SIZE']?> Кб</div>
</a>