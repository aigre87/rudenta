<?php

foreach($arResult['ITEMS'] as $key => $arItem){



        $resizeImg = CFile::GetFileArray($arItem['PREVIEW_PICTURE']['ID']);

        $resizeImg = CFile::ResizeImageGet(
            $resizeImg,
            array('width'=> 870, 'height'=>542),
            BX_RESIZE_IMAGE_PROPORTIONAL,
            true
        );

        $arResult['ITEMS'][$key]['PREVIEW_PICTURE'] = $resizeImg;


}

