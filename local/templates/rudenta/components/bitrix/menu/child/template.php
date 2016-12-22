<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?if (!empty($arResult)):?>
	<div class="hpBestInRus">
		<div class="title">Лучшая детская стоматология России</div>
		<div class="t">РуДента заняла 1-е место в рейтинге детских стоматологий России 2016, по версии ИД «Коммерсант» и портала SmartSmile</div>
		<div class="itemsW customIconsMenu">
			<div class="clear items">
			<? foreach($arResult as $arItem):?>
				<div class="item <?=$arItem['PARAMS']['class-img']?>">
					<i></i>
					<div class="text">
						<a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a>
					</div>
				</div>
			<?endforeach;?>
			</div>
		</div>
	</div>
<?endif?>
