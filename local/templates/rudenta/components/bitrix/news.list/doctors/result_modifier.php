<?php
$i = 1;
$arResult['FOUR_DIV'] = [];
$tmp = array();
foreach($arResult['ITEMS'] as $item_key => $item_val){
    $arResult['ITEMS'][$item_key]['DISPLAY_PROPERTIES']['EXPERIENCE']['NEW_VALUE'] = Doctors::getExp($item_val['PROPERTIES']['EXPERIENCE']['VALUE']);
    $arResult['ITEMS'][$item_key]['CNT_AWARDS'] = $item_val['PROPERTIES']['AWARDS']['VALUE'] ? count($item_val['PROPERTIES']['AWARDS']['VALUE']) : false;
    $arResult['ITEMS'][$item_key]['CNT_RECALLS'] = Doctors::getRecallsCnt($item_val['ID']);
    $arResult['ITEMS'][$item_key]['CNT_ARTICLES'] = Doctors::getArticlesCNT($item_val['ID']);

    $resizeImg = CFile::GetFileArray($item_val['PREVIEW_PICTURE']['ID']);
    $resizeImg = CFile::ResizeImageGet(
        $resizeImg,
        array('width'=> 200, 'height'=>200),
        BX_RESIZE_IMAGE_PROPORTIONAL,
        true
    );

    $arResult['ITEMS'][$item_key]['PREVIEW_PICTURE'] = $resizeImg;


    $tmp[] = $arResult['ITEMS'][$item_key];
    unset($arResult['ITEMS'][$item_key]);
    if($i % 4 == 0){
        $arResult['FOUR_DIV'][] = $tmp;
        $tmp = array();
    }
    $i++;
}

if(!empty($tmp)){
    $arResult['FOUR_DIV'][] = $tmp;
}

