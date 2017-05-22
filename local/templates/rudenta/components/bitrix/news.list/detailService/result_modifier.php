<?php
$tmp = array();
$tmp_for_sort = array();
$nav = array();
// сортировка по разделам
foreach($arResult['ITEMS'] as $arItem){
    $db_list = CIBlockSection::GetList(
        array(),
        array('IBLOCK_ID' => 4, 'ID' => $arItem['IBLOCK_SECTION_ID']),
        false,
        array(
            'ID',
            'SORT'
        )
    );

    while($ar_result = $db_list->GetNext())
    {
        if($ar_result['ID'] == $arItem['IBLOCK_SECTION_ID']){
            $tmp_for_sort[$ar_result['SORT']][] = $arItem;
        }
    }
}


ksort($tmp_for_sort);
foreach($tmp_for_sort as $sort => $arItem){
    foreach($arItem as $item){
        $tmp[$item['IBLOCK_SECTION_ID']][] = $item;
    }
}


$arResult['ITEMS'] = $tmp;

// боковая навигация
foreach($arResult['ITEMS'] as $arItemKey => $arItemArr){
    $res = CIBlockSection::GetByID($arItemKey);
    if($ar_res = $res->GetNext()){
        $nav[$ar_res['ID']]['PARENT'] = $ar_res['NAME'];
        foreach($arItemArr as $arItem){
            $nav[$ar_res['ID']]['CHILDS'][$arItem['ID']]['NAME'] = $arItem['NAME'];
            $nav[$ar_res['ID']]['CHILDS'][$arItem['ID']]['PRICE'] = Service::GetPrice($arItem['ID']);
        }
    }
}


$arResult['NAV'] = $nav;
$arResult['CNT_RECALLS'] = Service::getRecallsCNT($arResult['SECTION']['PATH'][1]['ID']);
$arResult['DOCTORS'] = Doctors::getDocrotsUID($arResult['SECTION']['PATH'][1]['ID']);
$arResult['PRICE'] =  Price::GetPriceForService($arParams['PARENT_SECTION']);
$arResult['ARTICLES'] =  Articles::getRandom($arResult['SECTION']['PATH'][1]['ID'], "");

