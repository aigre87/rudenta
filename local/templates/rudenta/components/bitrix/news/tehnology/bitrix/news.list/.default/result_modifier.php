<?php
foreach($arResult['ITEMS'] as $arItem){
    $arTems[Service::getName($arItem['PROPERTIES']['SERVICE']['VALUE'])][] = $arItem['PROPERTIES']['SERVICE']['VALUE'];
}
$tmp = [];
$all_cnt = 0;
foreach($arTems as $service_name => $service_arr){
    $tmp[$service_name]['CNT'] = count($service_arr);
    $all_cnt += count($service_arr);
    $tmp[$service_name]['SERVICE_ID'] = $service_arr[0];
}

$arResult['TEMS'] = $tmp;
$arResult['ALL_CNT'] = $all_cnt;

