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

<?if( !empty($arResult["PROPERTIES"]["BACKGROUND"]["VALUE_XML_ID"]) ):?>
<div class="topBlock clear colorSet <?=$arResult["PROPERTIES"]["BACKGROUND"]["VALUE_XML_ID"]?>">
<?else:?>
<div class="topBlock clear">
<?endif;?>
	<div class="lc">
		<div class="name"><?php echo $arResult['NAME'];?></div>
		<div class="position">&mdash; <?php echo $arResult['DISPLAY_PROPERTIES']['POSITION']['VALUE'];?></div>
	</div>
	<?if($arResult['PREVIEW_TEXT']):?>
	<div class="quote">
			<div class="quoteIW"></div>
			<div class="quote-text"><?php echo $arResult['PREVIEW_TEXT'];?></div>
	</div>
	<?endif;?>
	<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arResult["DETAIL_PICTURE"])):?>
		<div class="imgW">
			<img
					border="0"
					src="<?=$arResult["DETAIL_PICTURE"]["SRC"]?>"
					alt="<?=$arResult["DETAIL_PICTURE"]["ALT"]?>"
					title="<?=$arResult["DETAIL_PICTURE"]["TITLE"]?>"
					/>
		</div>
	<?endif;?>
</div>
<div class="clear">
	<div class="w-2col">
		<div class="titleH3"><?php echo "Стаж работы - ", $arResult['DISPLAY_PROPERTIES']['EXPERIENCE']['NEW_VALUE'];?></div>
		<div class="text"><?php echo $arResult['DETAIL_TEXT'];?></div>
		<?if( $arResult['DISPLAY_PROPERTIES']['AWARDS']['VALUE'] ):?>
			<div class="titleH4">Награды и сертификаты</div>
			<div class="zoom-gallery clear">
			<?foreach($arResult['DISPLAY_PROPERTIES']['AWARDS']['VALUE'] as $img):?>
				<a class="w-1d6col" href="<?=CFile::GetPath($img);?>">
					<img src="<?=CFile::GetPath($img);?>">
				</a>
			<?endforeach;?>
			</div>
		<?endif;?>
		<?if(!empty($arResult['RECALLS'])):?>
			<h3>Отзывы</h3>
			<div class="recalls-list">
				<?foreach($arResult['RECALLS'] as $rec):?>
					<div class="recall-item">
						<div class="row1">
							<span class="name"><?php echo $rec['NAME'];?></span>
							<span class="town"><?php echo $rec['PROPERTY_CITY_VALUE'];?></span>
						</div>
						<?
							$str = $rec['PROPERTY_RATING_VALUE'];
							$int = filter_var($str, FILTER_SANITIZE_NUMBER_INT);
							$perc = intval($int)*100/5;
						?>
						<div class="raiting" data-val="<?=$int?>">
							<div class="val" style="width:<?=$perc?>%;"></div>
							<div class="bg"></div>
						</div>
						<div class="row2">
							<?php $res = CIBlockSection::GetByID($rec['PROPERTY_SERVICE_VALUE']);?>
							<?if($ar_res = $res->GetNext()):?>
								про
								<a href="/services/detail/?SECTION_ID=<?php echo $ar_res['IBLOCK_SECTION_ID'];?>">
									<?php echo $ar_res['NAME'];?>
								</a>
							<?endif;?>
						</div>
						<div class="text">
							<?php echo $rec['PREVIEW_TEXT'];?>
						</div>
					</div>
				<?endforeach;?>
			</div>
		<?endif;?>
	</div>
	<div class="w-1col">
		<?require_once('/home/p10298/public_html/local/templates/rudenta/inc/record.php');?>
		<div class="docNoteBlock">
			<?php $articles = Doctors::getArticles($arResult['ID']);?>
			<?if(!empty($articles)):?>
				<div class="title">Заметки врача</div>
				<?foreach($articles as $article):?>
					<a href="/articles/<?=$article['ID']?>/"><?=$article['NAME']?></a>
				<?endforeach;?>
			<?endif;?>
		</div>
	</div>
</div>