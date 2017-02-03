<?php
$tmp = array();
$nav = array();
foreach($arResult['ITEMS'] as $arItem){
    $tmp[$arItem['IBLOCK_SECTION_ID']][] = $arItem;
}
$arResult['ITEMS'] = $tmp;

foreach($arResult['ITEMS'] as $arItemKey => $arItemArr){
    $res = CIBlockSection::GetByID($arItemKey);
    if($ar_res = $res->GetNext()){
        $nav[$ar_res['ID']]['PARENT'] = $ar_res['NAME'];
        foreach($arItemArr as $arItem){
            $nav[$ar_res['ID']]['CHILDS'][$arItem['ID']] = $arItem['NAME'];
        }
    }
}

$arResult['NAV'] = $nav;
$arResult['CNT_RECALLS'] = Service::getRecallsCNT($arResult['SECTION']['PATH'][1]['ID']);
$arResult['DOCTORS'] = Doctors::getDocrotsUID($arResult['SECTION']['PATH'][1]['ID']);
