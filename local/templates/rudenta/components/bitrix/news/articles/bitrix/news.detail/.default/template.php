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
<div class="articlesDetailPage">
	<div class="topBlock clear">
		<div class="w-2col lc">
			<h1><?php echo $arResult['NAME']?></h1>
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
		</div>
		<div class="w-1col rc">
			<a href="/doctors/<?=$arResult['DOCTOR']['ID']?>/" class="doctor">
				<span class="imgW"><img class="preview_picture" border="0" src="<?=$arResult['DOCTOR']['PREVIEW_PICTURE']?>"></span>
				<span class="text">
					<span class="name"><?=$arResult['DOCTOR']['NAME']?></span>
					<span class="position"><?=$arResult['DOCTOR']['POSITION']?></span>
					<? if(!empty($arResult['DOCTOR']['EXPERIENCE'])): ?>
						<span class="experience"><?=$arResult['DOCTOR']['EXPERIENCE']?> опыта</span>
					<? endif; ?>
					<? if(!empty($arResult['DOCTOR']['AWARDS_CNT'])): ?>
						<span class="awards"><?=$arResult['DOCTOR']['AWARDS_CNT']?> наград и сертификатов</span>
					<? endif; ?>
					<? if(!empty($arResult['DOCTOR']['RECALLS_CNT'])): ?>
						<span class="recalls"><?=recalls($arResult['DOCTOR']['RECALLS_CNT'])?></span>
					<? endif; ?>
					<? if(!empty($arResult['DOCTOR']['ARTICLES_CNT'])): ?>
						<span class="articles"><?=recalls($arResult['DOCTOR']['ARTICLES_CNT'])?></span>
					<? endif; ?>
				</span>
			</a>
			<div class="printVersion">
				<svg class="icon">
				    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-print"></use>
				</svg>
				Версия для печати
			</div>
			<a class="printButton">Распечатать</a>
			<a class="disablePrintVersion">Обычный просмотр</a>
			<?require_once('/home/p10298/public_html/local/templates/rudenta/inc/record.php');?>
			<?php
			$random_art = Articles::getRandom($arResult['DISPLAY_PROPERTIES']['SERVICE']['VALUE'], $arResult['ID']);
			?>
			<?if(!empty($random_art)):?>
				<div class="articles section">
					<h3>Другие советы по теме</h3>
					<div class="docNoteBlock clear">
						<?foreach ($random_art as $usl):?>
							<a href="/articles/<?=$usl['ID']?>/"><?=$usl['NAME']?></a>
						<?endforeach;?>
					</div>
				</div>
			<?endif;?>
		</div>
	</div>
</div>