<?php
foreach($arResult['ITEMS'] as $item_key => $item_val){
    $arResult['ITEMS'][$item_key]['DISPLAY_PROPERTIES']['EXPERIENCE']['NEW_VALUE'] = Doctors::getExp($item_val['PROPERTIES']['EXPERIENCE']['VALUE']);
    $arResult['ITEMS'][$item_key]['CNT_AWARDS'] = $item_val['PROPERTIES']['AWARDS']['VALUE'] ? count($item_val['PROPERTIES']['AWARDS']['VALUE']) : false;
    $arResult['ITEMS'][$item_key]['CNT_RECALLS'] = Doctors::getRecallsCnt($item_val['ID']);
    $arResult['ITEMS'][$item_key]['CNT_ARTICLES'] = Doctors::getArticlesCNT($item_val['ID']);
}