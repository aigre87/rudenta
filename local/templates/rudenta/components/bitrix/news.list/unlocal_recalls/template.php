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
$i = 0;
$all = 0;
$cnt = count($arResult['ITEMS']);
?>
<div class="unlocal-recalls">
	<h3 class="title">Отзывы о клинике РуДента на сторонних порталах</h3>
	<div class="items">
		<? foreach($arResult['ITEMS'] as $key => $arItem): ?>
			<?if ($i % 4 == 0):?>
				<?if($all == 0):?>
					<div class="unlocal-recalls-4 start">
				<? else:?>	
					<div class="unlocal-recalls-4">
				<? endif;?>	
			<? endif;?>
			<div class="col">
				<a href="<?=$arItem['CODE']?>" target="_blank" class="unlocal-recalls-item">
					<span class="imgW"><img src="<?=$arItem['PREVIEW_PICTURE']['SRC']?>"></span>
					<span class="name"><?=$arItem['NAME']?></span>
				</a>
			</div>
			<? 
				$i++ ;
				$all++;
			?>

			<? if( ($i % 4 == 0 && $i != 0 && $i != 1) || $i == $cnt):?>
				</div>
			<? endif;?>
		<? endforeach; ?>
	</div>
	<?if ($all > 4):?>
		<div class="buttonMore">
			<svg class="icon">
			    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-refresh"></use>
			</svg>
			<div class="text">Еще</div>
		</div>
	<? endif;?>
</div>

