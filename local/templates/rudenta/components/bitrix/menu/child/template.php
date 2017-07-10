<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?if (!empty($arResult)):?>
	<div class="bestInRusMenu">
		<div class="title">
<!-- 			<svg class="icon left">
			    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/images/symbol/sprite.svg#icon-wreath-left"></use>
			</svg> -->
			Лечение как развлечение в «РуДентаКидс»
<!-- 			<svg class="icon right">
			    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/images/symbol/sprite.svg#icon-wreath-right"></use>
			</svg> -->
		</div>
		<div class="itemsW customIconsMenu">
			<div class="clear items">
			<? foreach($arResult as $arItem):?>
				<a href="<?=$arItem["LINK"]?>" class="item <?=$arItem['PARAMS']['class-img']?>">
					<svg class="icon">
					    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/images/symbol/sprite.svg#icon-<?=$arItem['PARAMS']['class-img']?>"></use>
					</svg>
					<span class="text">
						<span><?=$arItem["TEXT"]?></span>
					</span>
				</a>
			<?endforeach;?>
			</div>
		</div>
	</div>
<?endif?>
