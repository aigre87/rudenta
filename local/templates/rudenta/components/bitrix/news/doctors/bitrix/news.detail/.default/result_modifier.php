<?php
$arResult['DISPLAY_PROPERTIES']['EXPERIENCE']['NEW_VALUE'] = Doctors::getExp($arResult['PROPERTIES']['EXPERIENCE']['VALUE']);
$arResult['RECALLS'] = Doctors::getRecalls($arResult['ID']);