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
<div class="topBlock clear">
	<div class="lc">
		<div class="name"><?php echo $arResult['NAME'];?></div>
		<div class="position">&mdash; <?php echo $arResult['DISPLAY_PROPERTIES']['POSITION']['VALUE'];?></div>
	</div>
	<?if($arResult['PREVIEW_TEXT']):?>
		<div class="quote">
			<div class="quoteIW"><?php echo $arResult['PREVIEW_TEXT'];?></div>
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
		<div class="titleH4">Награды и сертификаты</div>
		<?if( $arResult['DISPLAY_PROPERTIES']['AWARDS']['VALUE'] ):?>
			<div class="zoom-gallery clear">
			<?foreach($arResult['DISPLAY_PROPERTIES']['AWARDS']['VALUE'] as $img):?>
				<a class="w-1d6col" href="<?=CFile::GetPath($img);?>">
					<img src="<?=CFile::GetPath($img);?>">
				</a>
			<?endforeach;?>
			</div>
		<?endif;?>
		<p><strong>Отзывы</strong></p>
		<?foreach($arResult['RECALLS'] as $rec):?>
			<div class="recall">
				<div class="recall-name"><?php echo $rec['NAME'];?> <?php echo $rec['PROPERTY_CITY_VALUE'];?></div>
				<div class="rating"><?php echo $rec['PROPERTY_RATING_VALUE'];?></div>
				<div class="date"><?php echo FormatDate("d F Y", MakeTimeStamp($rec['DATE_ACTIVE_FROM']));?></div>
				<div class="service">
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
	<div class="w-1col">
		<?$APPLICATION->IncludeComponent(
			"bitrix:main.include",
			".default",
			array(
				"AREA_FILE_SHOW" => "file",
				"AREA_FILE_SUFFIX" => "inc",
				"EDIT_TEMPLATE" => "",
				"COMPONENT_TEMPLATE" => ".default",
				"PATH" => "/local/templates/rudenta/inc/record.php"
			),
			false
		);?>
		<div class="docNoteBlock">
			<div class="title">Заметки врача</div>
			<?php $articles = Doctors::getArticles($arResult['ID']);?>
			<?foreach($articles as $article):?>
				<a href="/articles/<?=$article['ID']?>/"><?=$article['NAME']?></a>
			<?endforeach;?>
		</div>
	</div>
</div>