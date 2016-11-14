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
<div class="parent-section">
	<h1><?php echo $arResult['SECTION']['PATH'][1]['NAME']?></h1>
	<div data-ar="<?php echo $arResult['SECTION']['PATH'][1]['ID']?>" class="parent-section-desc">
		<?php echo $arResult['SECTION']['PATH'][1]['DESCRIPTION']?>
	</div>
</div>
<?foreach($arResult["ITEMS"] as $arItemKey => $arItemArr):?>
	<div class="child-section">
		<?php $res = CIBlockSection::GetByID($arItemKey);?>
		<?if($ar_res = $res->GetNext()):?>
			<div class="parent-child-section">
				<h3><?php echo $ar_res['NAME']?></h3>
				<div class="parent-child-section-desc">
					<?php echo $ar_res['DESCRIPTION']?>
				</div>
			</div>
			<?foreach($arItemArr as $arItem):?>
			<div class="service">
				<h4><?php echo $arItem['NAME'];?> - <?php echo $arItem['DISPLAY_PROPERTIES']['PRICE']['VALUE'];?>р</h4>
				<div class="service-desc">
					<?php echo $arItem['PREVIEW_TEXT'];?>
				</div>
			</div>
			<?endforeach;?>
		<?endif;?>
	</div>
<?endforeach;?>
<?php $articles = Articles::getRandom($arResult['SECTION']['PATH'][1]['ID'])?>
<?if(!empty($articles)):?>
	<div class="articles">
		<p>Советы</p>
		<?foreach($articles as $article):?>
			<a href="/articles/<?=$article['ID']?>/"><?=$article['NAME']?></a>
		<?endforeach;?>
	</div>
<?endif;?>
<?php $doctors = Doctors::getDocrotsUID($arResult['SECTION']['PATH'][1]['ID']);?>
<?if(!empty($doctors)):?>
	<div class="doctors">
		<p>Врачи</p>
		<?foreach($doctors as $doctor):?>
			<div class="doctor">
				<a href="/doctors/<?=$doctor['ID']?>/">
					<?php echo $doctor['NAME']?>
				</a>
				<?php echo $doctor['PROPERTY_POSITION_VALUE'];?>
				<?php echo Doctors::getExp($doctor['PROPERTY_EXPERIENCE_VALUE']). " опыта";?>
				<?php echo count($doctor['PROPERTY_AWARDS_VALUE']). " наград и сертефикатов";?>
				<?php echo recalls(Doctors::getRecallsCnt($doctor['ID']));?>
			</div>
		<?endforeach;?>
	</div>
<?endif;?>

<!--Навигация-->
<div class="nav">
	<a href="#" data-link="<?php echo $arResult['SECTION']['PATH'][1]['ID']?>">Описание</a>
</div>
<!--Конец навигации-->

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