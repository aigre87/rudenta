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
<div class="clear"><a class="backButton" href="/services/">Все услуги</a></div>
<div class="servicesDetailPage">
	<div class="topBlock clear">
		<div class="w-2col">
			<div class="parent-section">
				<!--<h1><?php /*echo $arResult['SECTION']['PATH'][1]['NAME']*/?></h1>-->
				<div data-ar="desc" class="parent-section-desc">
					<?php /*echo $arResult['SECTION']['PATH'][1]['DESCRIPTION']*/?>
				</div>
			</div>
			<?$i = 1;?>
			<?foreach($arResult["ITEMS"] as $arItemKey => $arItemArr):?>
				<div class="child-section">
					<?php $res = CIBlockSection::GetByID($arItemKey);?>
					<?if($ar_res = $res->GetNext()):?>
						<div class="parent-child-section">
							<?if($i == 1):?>
								<h1 data-ar="<?php echo $ar_res['ID'];?>" ><?php echo $ar_res['NAME']?></h1>
							<?else:?>
								<h2 data-ar="<?php echo $ar_res['ID'];?>" ><?php echo $ar_res['NAME']?></h2>
							<?endif;?>
							<div class="parent-child-section-desc">
								<?php echo $ar_res['DESCRIPTION']?>
							</div>
						</div>
						<?foreach($arItemArr as $arItem):?>
						<div class="service">
							<h3 data-ar="<?php echo $arItem['ID'];?>"><?php echo $arItem['NAME'];?> <?if($arItem['DISPLAY_PROPERTIES']['PRICE']['VALUE']):?>- <?php echo $arItem['DISPLAY_PROPERTIES']['PRICE']['VALUE'];?>р<?endif;?></h3>
							<div class="service-desc">
								<?php echo $arItem['PREVIEW_TEXT'];?>
							</div>
						</div>
						<?$i++;?>
						<?endforeach;?>
					<?endif;?>
				</div>
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
		<div class="w-1col">
			<div class="nav">
				<ul class="ul-nav">
					<!--<li>
						<a href="#" data-link="desc">Описание</a>
					</li>-->
					<?foreach($arResult['NAV'] as $navKey => $navValue):?>
						<li>
							<a href="#" data-link="<?php echo $navKey;?>"><span><?php echo $navValue['PARENT'];?></span></a>
							<ul class="child-nav">
								<?foreach($navValue['CHILDS'] as $id => $arr):?>
									<li class="child-li">
										<a href="#" data-link="<?php echo $id?>"><span>
											<?php echo $arr['NAME'];?>
											<?if(!empty($arr['PRICE'])):?> - <?php echo $arr['PRICE'];?>р <?endif;?>
										</span></a>
									</li>
								<?endforeach;?>
							</ul>
						</li>
					<?endforeach;?>
					<? if($arResult['PRICE']): ?>
						<li>
							<a href="#" data-link="prices">Цены</a>
						</li>
					<? endif; ?>
					<li>
						<a href="#" data-link="articles">Советы пациентам</a>
					</li>
					<li>
						<a href="#" data-link="doctors">Врачи</a>
					</li>
					<?if($arResult['CNT_RECALLS'] > 0):?>
						<li>
							<a href="#" data-link="recalls">Отзывы</a>
						</li>
					<?endif;?>
					<li>
						<a href="#" data-link="techno">Технологии</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<? if($arResult['PRICE']): ?>
		<div data-ar="prices">
			<h3>Цены</h3>
			<table>
				<? foreach($arResult['PRICE'] as $price):?>
					<tr>
						<td><?=$price['NAME']?></td>
						<? if(!empty($price['PROPERTY_PRICE_VALUE'])): ?>
							<td><?=number_format($price['PROPERTY_PRICE_VALUE'], 0, ',', ' ')?> руб</td>
						<? else: ?>
							<td>Бесплатно</td>
						<? endif;?>
						<td><?=$price['PREVIEW_TEXT']?></td>
					</tr>
				<? endforeach;?>
			</table>
		</div>
	<? endif;?>
	<?php $articles = Articles::getRandom($arResult['SECTION']['PATH'][1]['ID'], "")?>
	<?if(!empty($articles)):?>
		<div data-ar="articles" class="articles section">
			<h2 class="lBlue">Советы</h2>
			<div class="docNoteBlock clear">
				<?if(!empty($articles[0])):?>
					<a class="w-1col" href="/articles/<?=$articles[0]['ID']?>/"><?=$articles[0]['NAME']?></a>
				<?endif;?>
				<?if(!empty($articles[1])):?>
					<a class="w-1col" href="/articles/<?=$articles[1]['ID']?>/"><?=$articles[1]['NAME']?></a>
				<?endif;?>
				<?if(!empty($articles[2]) && count($articles) == 3):?>
					<a class="w-1col" href="/articles/">Все советы</a>
				<?endif;?>
				<?if(count($articles) < 3):?>
					<a class="w-1col" href="/articles/">Все советы</a>
				<?endif;?>
			</div>
		</div>
	<?endif;?>
	<?if(!empty($arResult['DOCTORS'])):?>
		<div data-ar="doctors" class="doctors section">
			<h2 class="lBlue">Врачи</h2>
			<div id="doctors-list">
			<?foreach($arResult['DOCTORS'] as $doctor):?>
				<?php
				$path_to_img = CFile::GetPath($doctor["PREVIEW_PICTURE"]);
				?>
				<a class="item doctor w-1col" href="/doctors/<?=$doctor['ID']?>/">
					<span class="imgW">
						<img
							class="preview_picture"
							border="0"
							src="<?=$path_to_img?>"
						/>
					</span>
					<span class="text">
						<span class="name"><?php echo $doctor['NAME'];?></span>
						<span class="position"><?if(!empty($doctor['PROPERTY_POSITION_VALUE'])):?><?php echo $doctor['PROPERTY_POSITION_VALUE']?><?endif;?></span>
						<span class="experience"><?if(!empty($doctor['PROPERTY_EXPERIENCE_VALUE'])):?><?php echo Doctors::getExp($doctor['PROPERTY_EXPERIENCE_VALUE'])?> опыта<?endif;?></span>
						<span class="awards'"><?if(!empty($doctor['PROPERTY_AWARDS_VALUE'])):?><?php echo count($doctor['PROPERTY_AWARDS_VALUE'])?> наград и сертификатов<?endif;?></span>
						<?/*<span class="recalls"><?php echo recalls($arItem['CNT_RECALLS'])?></span>
						<span class="articles"><?php echo articles($arItem['CNT_ARTICLES']);?></span>*/?>
						<?php $doctor_cnt_recalls = Doctors::getRecallsCnt($doctor['ID']);?>
						<span class="recalls"><?if(!empty($doctor_cnt_recalls)):?><?php echo recalls($doctor_cnt_recalls);?><?endif;?></span>
					</span>
				</a>
			<?endforeach;?>
			</div>
		</div>
	<?endif;?>
	<?if($arResult['CNT_RECALLS'] > 0):?>
	<div class="recalls section" data-ar="recalls">
		<h2 class="lBlue">Отзывы</h2>
		<div class="clear">
			<div class="w-2col">
				<?$APPLICATION->IncludeComponent(
					"bitrix:news",
					"recalls",
					Array(
						"ADD_ELEMENT_CHAIN" => "N",
						"ADD_SECTIONS_CHAIN" => "Y",
						"AJAX_MODE" => "N",
						"AJAX_OPTION_ADDITIONAL" => "",
						"AJAX_OPTION_HISTORY" => "N",
						"AJAX_OPTION_JUMP" => "N",
						"AJAX_OPTION_STYLE" => "Y",
						"BROWSER_TITLE" => "-",
						"CACHE_FILTER" => "N",
						"CACHE_GROUPS" => "Y",
						"CACHE_TIME" => "36000000",
						"CACHE_TYPE" => "A",
						"CHECK_DATES" => "Y",
						"DETAIL_ACTIVE_DATE_FORMAT" => "d.m.Y",
						"DETAIL_DISPLAY_BOTTOM_PAGER" => "Y",
						"DETAIL_DISPLAY_TOP_PAGER" => "N",
						"DETAIL_FIELD_CODE" => array("",""),
						"DETAIL_PAGER_SHOW_ALL" => "Y",
						"DETAIL_PAGER_TEMPLATE" => "",
						"DETAIL_PAGER_TITLE" => "Страница",
						"DETAIL_PROPERTY_CODE" => array("",""),
						"DETAIL_SET_CANONICAL_URL" => "N",
						"DISPLAY_BOTTOM_PAGER" => "Y",
						"DISPLAY_DATE" => "Y",
						"DISPLAY_NAME" => "Y",
						"DISPLAY_PICTURE" => "Y",
						"DISPLAY_PREVIEW_TEXT" => "Y",
						"DISPLAY_TOP_PAGER" => "N",
						"FILTER"	=> "filter_recalls",
						"HIDE_LINK_WHEN_NO_DETAIL" => "N",
						"IBLOCK_ID" => "2",
						"IBLOCK_TYPE" => "about",
						"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
						"LIST_ACTIVE_DATE_FORMAT" => "d.m.Y",
						"LIST_FIELD_CODE" => array("",""),
						"LIST_PROPERTY_CODE" => array("SERVICE","DOCTOR","RATING","CITY"),
						"MESSAGE_404" => "",
						"META_DESCRIPTION" => "-",
						"META_KEYWORDS" => "-",
						"NEWS_COUNT" => "200",
						"PAGER_BASE_LINK_ENABLE" => "N",
						"PAGER_DESC_NUMBERING" => "N",
						"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
						"PAGER_SHOW_ALL" => "N",
						"PAGER_SHOW_ALWAYS" => "N",
						"PAGER_TEMPLATE" => ".default",
						"PAGER_TITLE" => "Новости",
						"PREVIEW_TRUNCATE_LEN" => "",
						"SEF_MODE" => "N",
						"SET_LAST_MODIFIED" => "N",
						"SET_STATUS_404" => "N",
						"SET_TITLE" => "Y",
						"SHOW_404" => "N",
						"SORT_BY1" => "ACTIVE_FROM",
						"SORT_BY2" => "SORT",
						"SORT_ORDER1" => "DESC",
						"SORT_ORDER2" => "ASC",
						"USE_CATEGORIES" => "N",
						"USE_FILTER" => "N",
						"USE_PERMISSIONS" => "N",
						"USE_RATING" => "N",
						"USE_RSS" => "N",
						"USE_SEARCH" => "N",
						"USE_SHARE" => "N",
						"VARIABLE_ALIASES" => Array("ELEMENT_ID"=>"ELEMENT_ID","SECTION_ID"=>"SECTION_ID")
					)
				);?>
			</div>
			<div class="w-1col">
				<?$APPLICATION->IncludeComponent(
					"bitrix:main.include",
					".default",
					Array(
						"AREA_FILE_SHOW" => "file",
						"AREA_FILE_SUFFIX" => "inc",
						"COMPONENT_TEMPLATE" => ".default",
						"EDIT_TEMPLATE" => "",
						"PATH" => "/local/templates/rudenta/inc/add_recall.php"
					)
				);?>
			</div>
		</div>
	</div>
	<?endif;?>
</div>
