<?php

foreach($arResult['SECTIONS'] as $section_key => $arSection){

    $child_sectons = Service::getChildrenThree($arSection['ID']);
    $arResult['SECTIONS'][$section_key]['CHILDREN'] = $child_sectons;

}