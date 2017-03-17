<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?if (!empty($arResult)):?>
<? $count = 1; ?>
<?
foreach($arResult as $arItem):
	if($arParams["MAX_LEVEL"] == 1 && $arItem["DEPTH_LEVEL"] > 1) 
		continue;
?>
	<?if($arItem["SELECTED"]):?>
		<div class="item menuItem <?=$arItem['PARAMS']['is_main']?> <?=$arItem['PARAMS']['line']?>"><a href="<?=$arItem["LINK"]?>" class="selected"><?=$arItem["TEXT"]?></a></div>
	<?else:?>
		<div class="item menuItem <?=$arItem['PARAMS']['is_main']?> <?=$arItem['PARAMS']['line']?>"><a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a></div>
	<?endif?>
	
<?endforeach?>
<?endif?>