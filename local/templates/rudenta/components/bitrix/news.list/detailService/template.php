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
								<h1><?php echo $ar_res['NAME']?></h1>
							<?else:?>
								<h2><?php echo $ar_res['NAME']?></h2>
							<?endif;?>
							<div data-ar="<?php echo $ar_res['ID'];?>" class="parent-child-section-desc">
								<?php echo $ar_res['DESCRIPTION']?>
							</div>
						</div>
						<?foreach($arItemArr as $arItem):?>
						<div class="service">
							<h3><?php echo $arItem['NAME'];?> <?if($arItem['DISPLAY_PROPERTIES']['PRICE']['VALUE']):?>- <?php echo $arItem['DISPLAY_PROPERTIES']['PRICE']['VALUE'];?>р<?endif;?></h3>
							<div data-ar="<?php echo $arItem['ID'];?>" class="service-desc">
								<?php echo $arItem['PREVIEW_TEXT'];?>
							</div>
						</div>
						<?$i++;?>
						<?endforeach;?>
					<?endif;?>
				</div>
			<?endforeach;?>
		</div>
		<div class="w-1col">
			<div class="nav">
				<ul class="ul-nav">
					<li>
						<!--<a href="#" data-link="desc">Описание</a>-->
					</li>
					<?foreach($arResult['NAV'] as $navKey => $navValue):?>
						<li>
							<a href="#" data-link="<?php echo $navKey;?>"><?php echo $navValue['PARENT'];?></a>
							<ul class="child-nav">
								<?foreach($navValue['CHILDS'] as $id => $name):?>
									<li class="child-li">
										<a href="#" data-link="<?php echo $id?>"><?php echo $name;?></a>
									</li>
								<?endforeach;?>
							</ul>
						</li>
					<?endforeach;?>
					<li>
						<a href="#" data-link="articles">Советы пациентам</a>
					</li>
					<li>
						<a href="#" data-link="doctors">Врачи</a>
					</li>
					<li>
						<a href="#" data-link="recalls">Отзывы</a>
					</li>
					<li>
						<a href="#" data-link="techno">Технологии</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<?php $articles = Articles::getRandom($arResult['SECTION']['PATH'][1]['ID'], "")?>
	<?if(!empty($articles)):?>
		<div data-ar="articles" class="articles">
			<h2 class="lBlue">Советы</h2>
			<div class="docNoteBlock clear">
				<?foreach($articles as $article):?>
					<a class="w-1col" href="/articles/<?=$article['ID']?>/"><?=$article['NAME']?></a>
				<?endforeach;?>
			</div>
		</div>
	<?endif;?>
	<?php $doctors = Doctors::getDocrotsUID($arResult['SECTION']['PATH'][1]['ID']);?>
	<?if(!empty($doctors)):?>
		<div data-ar="doctors" class="doctors">
			<h2 class="lBlue">Врачи</h2>
			<div id="doctors-list">
			<?foreach($doctors as $doctor):?>
				<a class="item doctor w-1col" href="/doctors/<?=$doctor['ID']?>/">
					<span class="imgW">
						<img
							class="preview_picture"
							border="0"
							src="<?=$doctor["PREVIEW_PICTURE"]["SRC"]?>"
							alt="<?=$doctor["PREVIEW_PICTURE"]["ALT"]?>"
							title="<?=$doctor["PREVIEW_PICTURE"]["TITLE"]?>"
						/>
					</span>
					<span class="text">
						<span class="name"><?php echo $doctor['NAME'];?></span>
						<span class="position"><?php echo $doctor['PROPERTY_POSITION_VALUE']?></span>
						<span class="experience"><?php echo Doctors::getExp($doctor['PROPERTY_EXPERIENCE_VALUE'])?> опыта</span>
						<span class="awards'"><?php echo count($doctor['PROPERTY_AWARDS_VALUE'])?> наград и сертификатов</span>
						<?/*<span class="recalls"><?php echo recalls($arItem['CNT_RECALLS'])?></span>
						<span class="articles"><?php echo articles($arItem['CNT_ARTICLES']);?></span>*/?>
						<?php echo recalls(Doctors::getRecallsCnt($doctor['ID']));?>
					</span>
				</a>
			<?endforeach;?>
		</div>
	<?endif;?>

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