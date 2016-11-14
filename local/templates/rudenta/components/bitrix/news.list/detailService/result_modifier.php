<?php
foreach($arResult['ITEMS'] as $arItem){
    $tmp[$arItem['IBLOCK_SECTION_ID']][] = $arItem;
}
$arResult['ITEMS'] = $tmp;
