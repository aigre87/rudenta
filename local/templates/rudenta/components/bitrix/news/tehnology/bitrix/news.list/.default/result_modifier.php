<?php
$all_cnt = 0;
foreach($arResult['ITEMS'] as $item_key => $arItem){
    $all_cnt ++;
    if(!empty($arItem['PROPERTIES']['SERVICE']['VALUE'])){
        for($i = 0; $i < count($arItem['PROPERTIES']['SERVICE']['VALUE']); $i++) {
            $arTems[Service::getName($arItem['PROPERTIES']['SERVICE']['VALUE'][$i])][] = $arItem['PROPERTIES']['SERVICE']['VALUE'][$i];
        }
    }

    $resizeImg = CFile::GetFileArray($arItem['PREVIEW_PICTURE']['ID']);
    $resizeImg = CFile::ResizeImageGet(
        $resizeImg,
        array('width'=> 200, 'height'=>400),
        BX_RESIZE_IMAGE_PROPORTIONAL,
        true
    );

    $arResult['ITEMS'][$item_key]['PREVIEW_PICTURE'] = $resizeImg;
}

$tmp = [];
foreach($arTems as $service_name => $service_arr){
    $tmp[$service_name]['CNT'] = count($service_arr);
    $tmp[$service_name]['SERVICE_ID'] = $service_arr[0];
}


$arResult['TEMS'] = $tmp;
$arResult['ALL_CNT'] = $all_cnt;

