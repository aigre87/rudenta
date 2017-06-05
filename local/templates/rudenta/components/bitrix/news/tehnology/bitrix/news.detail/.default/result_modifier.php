<?php

$services = Tehnology::getAllServices();

foreach($services as $service_key => $service){

    if(in_array($service['ID'], $arResult['PROPERTIES']['SERVICE']['VALUE'])){
        $services[$service_key]['ACTIVE'] = 'Y';
    }else{
        $services[$service_key]['ACTIVE'] = 'N';
    }
}

$arResult['SERVICES'] = $services;