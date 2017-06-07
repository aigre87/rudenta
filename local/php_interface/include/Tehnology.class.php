<?php

Class Tehnology{

    /**
     * Вернуть все услуги, к которым привязаны технологии
     * @return array
     */
    public static function getAllServices(){

        $services = array();
        $res = CIBlockElement::GetList(
            array(),
            array(
                'IBLOCK_ID' => 6,
            ),
            false,
            false,
            array('ID', 'NAME', 'PROPERTY_SERVICE')
        );

        while($ob = $res->GetNextElement()){
            $arFields[] = $ob->GetFields();
        }


        foreach($arFields as $tehno){
            if(!empty($tehno['PROPERTY_SERVICE_VALUE'])){
                $services[] = $tehno['PROPERTY_SERVICE_VALUE'];
            }
        }

        $services = array_values(array_unique($services));

        foreach($services as $service_key => $service_id){
            $services[$service_key] = ['ID' => $service_id, 'NAME' => Service::getName($service_id)];
        }

        return $services;

    }

}