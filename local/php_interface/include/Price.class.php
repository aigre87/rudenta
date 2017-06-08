<?php

Class Price{

    public static function GetPriceAndDescriptionForService($section_id){

        $res_section = CIBlockSection::GetList(
            array(),
            array(
                'IBLOCK_ID' => 7,
                'UF_SERVICE' => $section_id
            ),
            false,
            array("ID"),
            false
        );

        $section_id_price = $res_section->Fetch()['ID'];

        $res = CIBlockElement::GetList(
            array('sort' => 'asc'),
            array(
                'IBLOCK_ID' => 7,
                'SECTION_ID' => $section_id_price
            ),
            false,
            false,
            array("ID", "NAME", "PREVIEW_TEXT", "PROPERTY_PRICE")
        );

        while($ob = $res->GetNextElement()){
            $arFields[] = $ob->GetFields();
        }

        foreach($arFields as $item_key => $item_arr){
            $price = $item_arr['PROPERTY_PRICE_VALUE'];
            $price = str_replace(" ","",$price);
            $arFields[$item_key]['PROPERTY_PRICE_VALUE'] = $price;
        }

        $description_res = CIBlockSection::GetByID($section_id_price);
        $description_res = $description_res->Fetch()['DESCRIPTION'];

        $result['PRICE'] = $arFields;
        $result['DESCRIPTION'] = $description_res;
        return $result;
    }

}