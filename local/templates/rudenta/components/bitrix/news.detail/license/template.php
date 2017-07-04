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
<div class="item">
	<a class="license" download="license.pdf" href="<?=$arResult['FILE_SRC']?>">
		<svg class="icon">
			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-gramota"></use>
		</svg>
		<span class="text"><?=$arResult['NAME']?></span>
		<span class="desc">PDF &bull; <?=$arResult['FILE_SIZE']?> Кб</span>
	</a>
</div>