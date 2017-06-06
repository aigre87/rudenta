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
<div class='serviceBlock'>
	<? foreach ($arResult['SECTIONS'] as $arSection): ?>
		<? if (Service::isLink($arSection['ID'])): ?>
			<div class="service" id="<?=$this->GetEditAreaId($arSection['ID']);?>">
				<a href="/services/detail/<?=$arSection['ID']?>/" class="serviceItem"><span class='serviceName'><?=$arSection['NAME']?></span></a>
			</div>
		<? else: ?>
			<div class="service" id="<?=$this->GetEditAreaId($arSection['ID']);?>">
				<div class="serviceTitle"><?=$arSection['NAME']?></div>
				<div class="serviceBlock">
					<? foreach($arSection['CHILDREN'] as $children_section): ?>
						<div class="service" id="<?=$this->GetEditAreaId($children_section['ID']);?>">
							<a href="/services/detail/<?=$children_section['ID']?>/" class="serviceItem"><span class='serviceName'><?=$children_section['NAME']?></span></a>
						</div>
					<? endforeach; ?>
				</div>
			</div>
		<? endif;?>
	<? endforeach; ?>
</div>
