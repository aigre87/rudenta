<?php
$all_cnt = 0;
foreach($arResult['ITEMS'] as $item_key => $arItem){
    $all_cnt ++;
    if(!empty($arItem['PROPERTIES']['SERVICE']['VALUE'])){
        for($i = 0; $i < count($arItem['PROPERTIES']['SERVICE']['VALUE']); $i++) {
            $arTems[Service::getName($arItem['PROPERTIES']['SERVICE']['VALUE'][$i])][] = $arItem['PROPERTIES']['SERVICE']['VALUE'][$i];
        }
    }
}

$tmp = [];
foreach($arTems as $service_name => $service_arr){
    $tmp[$service_name]['CNT'] = count($service_arr);
    $tmp[$service_name]['SERVICE_ID'] = $service_arr[0];
}


$arResult['TEMS'] = $tmp;
$arResult['ALL_CNT'] = $all_cnt;

