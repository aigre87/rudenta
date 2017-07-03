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
<a class="license">
	<svg class="icon">
		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="<?=$arResult['FILE_SRC']?>"></use>
	</svg>
	<span class="text"><?=$arResult['NAME']?></span>
	<span class="desc">PDF &bull; <?=$arResult['FILE_SIZE']?> Кб</span>
</a>