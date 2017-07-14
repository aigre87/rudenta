<?php

$resizeImg = CFile::GetFileArray($arResult['DETAIL_PICTURE']['ID']);
$resizeImg = CFile::ResizeImageGet(
    $resizeImg,
    array('width'=> 380, 'height'=>340),
    BX_RESIZE_IMAGE_PROPORTIONAL,
    true
);
$resizeImg['SRC'] = $resizeImg['src'];
$arResult['DETAIL_PICTURE'] = $resizeImg;

$arResult['DISPLAY_PROPERTIES']['EXPERIENCE']['NEW_VALUE'] = Doctors::getExp($arResult['PROPERTIES']['EXPERIENCE']['VALUE']);
$arResult['RECALLS'] = Doctors::getRecalls($arResult['ID']);