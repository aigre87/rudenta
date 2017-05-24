<?php
$arResult['DOCTOR'] = Doctors::getInfo($arResult['DISPLAY_PROPERTIES']['DOCTOR']['VALUE'],40, 40);
$arResult['DOCTOR']['EXPERIENCE'] = Doctors::getExp($arResult['DOCTOR']['EXPERIENCE']);
$arResult['DOCTOR']['RECALLS_CNT'] = Doctors::getRecallsCnt($arResult['DOCTOR']['ID']);
$arResult['DOCTOR']['ARTICLES_CNT'] = Doctors::getArticlesCNT($arResult['DOCTOR']['ID']);