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
		<h3>Отзывы</h3>

<div class="recalls-list">
	<?foreach($arResult["ITEMS"] as $arItem):?>
		<?
		$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
		$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
		?>
		<div class="recall-item" id="<?=$this->GetEditAreaId($arItem['ID']);?>">
			<div class="row1">
				<span class="name"><?=$arItem["NAME"]?></span>
				<span class="town"><?=$arItem['DISPLAY_PROPERTIES']['CITY']['VALUE']?></span>
			</div>
			<?
				$str = $arItem['DISPLAY_PROPERTIES']['RATING']['VALUE'];
				$int = filter_var($str, FILTER_SANITIZE_NUMBER_INT);
				$perc = intval($int)*100/5;
			?>
			<div class="raiting" data-val="<?=$int?>">
				<div class="val" style="width:<?=$perc?>%;"></div>
				<div class="bg"></div>
			</div>
			<div class="row2">
				<?echo FormatDate("d F Y", MakeTimeStamp($arItem["DISPLAY_ACTIVE_FROM"]));?>
				<?if(!empty($arItem['DISPLAY_PROPERTIES']['SERVICE']['VALUE'])):?>
					про <?=$arItem['DISPLAY_PROPERTIES']['SERVICE']['DISPLAY_VALUE']?>
				<?endif;?>
				<?if(!empty($arItem['DISPLAY_PROPERTIES']['DOCTOR']['VALUE'])):?>
					врачу <?=$arItem['DISPLAY_PROPERTIES']['DOCTOR']['DISPLAY_VALUE']?>
				<?endif;?>
			</div>
			<div class="text">
				<?echo $arItem["PREVIEW_TEXT"];?>
			</div>
		</div>
	<?endforeach;?>	
</div>



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