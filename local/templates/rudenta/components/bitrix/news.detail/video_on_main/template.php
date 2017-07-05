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
<div class="videoBlock">
	<div class="img">
		<div class="videoPlayButton" data-dep="hp">
			<div class="triangle"></div>
		</div>
	</div>
	<div class="videoPopup mfp-with-anim" data-dep="hp">
		<video id="companyVideo" class="video-js" data-dep="hp"  poster="/local/templates/rudenta/images/hpVideoRow_videoPoster.png">
			<source src="/upload/video/themevideo/detskaya_stomatologiaya_rudenta.mp4" type="video/mp4">
			<source src="/upload/video/themevideo/detskaya_stomatologiaya_rudenta.webm" type="video/webm">
		</video>
	</div>
</div>