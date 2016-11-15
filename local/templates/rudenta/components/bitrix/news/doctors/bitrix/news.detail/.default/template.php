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
<div class="news-detail">
	<div><?php echo $arResult['NAME'];?></div>
	<div><?php echo $arResult['DISPLAY_PROPERTIES']['POSITION']['VALUE'];?></div>
	<div><?php echo $arResult['PREVIEW_TEXT'];?></div>
	<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arResult["DETAIL_PICTURE"])):?>
		<img
			border="0"
			src="<?=$arResult["DETAIL_PICTURE"]["SRC"]?>"
			width="<?=$arResult["DETAIL_PICTURE"]["WIDTH"]?>"
			height="<?=$arResult["DETAIL_PICTURE"]["HEIGHT"]?>"
			alt="<?=$arResult["DETAIL_PICTURE"]["ALT"]?>"
			title="<?=$arResult["DETAIL_PICTURE"]["TITLE"]?>"
			/>
	<?endif?>
	<div><?php echo "Стаж работы - ", $arResult['DISPLAY_PROPERTIES']['EXPERIENCE']['NEW_VALUE'];?></div>
	<div><?php echo $arResult['DETAIL_TEXT'];?></div>
	<p><strong>Награды и сертификаты</strong></p>
	<?foreach($arResult['DISPLAY_PROPERTIES']['AWARDS']['VALUE'] as $img):?>
		<a class="fancybox" href="<?=CFile::GetPath($img);?>" data-fancybox-group="awards">
			<img width="200" height="200" src="<?=CFile::GetPath($img);?>">
		</a>
	<?endforeach;?>
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
	<p><strong>Заметки врача</strong></p>
	<?php $articles = Doctors::getArticles($arResult['ID']);?>
	<?foreach($articles as $article):?>
		<a href="/articles/<?=$article['ID']?>/"><?=$article['NAME']?></a>
	<?endforeach;?>

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
</div>