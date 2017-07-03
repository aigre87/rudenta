<?php

class Service{

    public static function getName($section_id){
        $res = CIBlockSection::GetList(
            array(),
            array(
                "IBLOCK_ID" => 4,
                "ID" => $section_id
                ),
            false,
            array("NAME"),
            false
        );

        return $res->GetNext()['NAME'];

    }

    public static function getAllServices(){
        $res = CIBlockSection::GetList(
            array("SORT"=>"ASC"),
            array("IBLOCK_ID" => 4,"DEPTH_LEVEL" => 2),
            false,
            array(),
            false
        );


        while($ar_result = $res->GetNext())
        {
            $arFields[$ar_result['ID']] = $ar_result['NAME'];
        }

        return $arFields;
    }

    /**
     * Возвращает только те услуги, в которых есть элементы. Так же возвращает их количество
     */
    public static function getActiveServiceWithCnt(){
        $res = CIBlockSection::GetList(
            array("SORT"=>"ASC"),
            array("IBLOCK_ID" => 4),
            false,
            array(),
            false
        );

        while($ar_result = $res->GetNext())
        {
            $arFields[$ar_result['ID']] = $ar_result['NAME'];
        }

        $result = array();
        $all_cnt = 0;
        foreach($arFields as $service_id => $service_name){
            $cnt = CIBlockElement::GetList(
                array("SORT"=>"ASC"),
                array("IBLOCK_ID" => 5, "PROPERTY_SERVICE" => $service_id),
                array(),
                false,
                array("ID")
            );

            if($cnt > 0){
                $result['SERVICE'][$service_id]['NAME'] = $service_name;
                $result['SERVICE'][$service_id]['CNT'] = $cnt;
                $all_cnt += $cnt;
            }
        }
        $result['ALL_CNT'] = $all_cnt;
        return $result;
    }

    /**
     * Получить дочерние секции
     * @param $section_id
     * @return mixed
     */
    public static function getChildren($section_id){
        $res = CIBlockSection::GetList(
            array("SORT"=>"ASC"),
            array("IBLOCK_ID" => 4,"DEPTH_LEVEL" => 2, "ACTIVE"=>"Y", "SECTION_ID"=>$section_id),
            false,
            array(),
            false
        );

        while($ar_result = $res->GetNext())
        {
                $arFields[$ar_result['IBLOCK_SECTION_ID']][] = $ar_result['NAME'];
        }


        return $arFields;
    }

    /**
     * Получить дочерние секции для страницы услуг
     * @param $section_id
     * @return array
     */
    public static function getChildrenThree($section_id){

        $res = CIBlockSection::GetList(
            array("SORT"=>"ASC"),
            array("IBLOCK_ID" => 4,"DEPTH_LEVEL" => 2, "ACTIVE"=>"Y", "SECTION_ID"=>$section_id),
            false,
            array(),
            false
        );

        while($ar_result = $res->GetNext())
        {
            $arFields[$ar_result['ID']] =
            [
                'ID' => $ar_result['ID'],
                'NAME' =>  $ar_result['NAME'],
                'MIN_PRICE' => self::getMinPrice($ar_result['ID']),

            ];
        }


        return $arFields;
    }


    /**
     * Получить ID заднего фона услуги (для верстки)
     * @param $usl_id
     * @return mixed
     */
    public static function getBackgroubdID($usl_id){
        $db_list = CIBlockSection::GetList(
            array(""),
            array('IBLOCK_ID'=>4,'ID'=>$usl_id),
            false,
            array("UF_BACKGROUND")
        );
        if($uf_value = $db_list->GetNext()){
            $id=$uf_value['UF_BACKGROUND'];
        }

        return $id;
    }

    /**
     * Получить цвет фона по его ID
     * @param $background_id
     * @return mixed
     */
    public static function getColor($background_id){
        $rsGender = CUserFieldEnum::GetList(array(), array(
            "ID" => $background_id,
        ));

        if($arGender = $rsGender->GetNext())
            return $arGender["XML_ID"];
    }

    /**
     * Получить услуги для вывода на главной
     * @return mixed
     */
    public static function getServiceForMain(){
        $res = CIBlockSection::GetList(
            array("SORT"=>"ASC"),
            array("IBLOCK_ID" => 4,"DEPTH_LEVEL" => 2, "ACTIVE"=>"Y", "!UF_MAIN"=>false),
            false,
            array('ID', 'NAME', "UF_TEXT_FOR_MAIN"),
            false
        );

        while($ar_result = $res->GetNext())
        {
            $arFields[$ar_result['ID']]['NAME'] = $ar_result['NAME'];
            $arFields[$ar_result['ID']]['TEXT_FOR_MAIN'] = $ar_result['UF_TEXT_FOR_MAIN'];
        }

        return $arFields;
    }

    /**
     * Получить минимальную цену услуги
     * @param $section_id
     * @return mixed
     */
    public static function getMinPrice($section_id){
        $res = CIBlockElement::GetList(
            array('property_price' => 'asc'),
            array("IBLOCK_ID" => 4, "SECTION_ID" => $section_id, "INCLUDE_SUBSECTIONS" => "Y"),
            false,
            false,
            array("ID","NAME", "PROPERTY_PRICE")
        );

        while($ob = $res->GetNextElement()){
            $arFields[] = $ob->GetFields();
        }

        return $arFields[0]['PROPERTY_PRICE_VALUE'];
    }

    public static function GetPrice($service_id){
        $res = CIBlockElement::GetList(
            array(),
            array("IBLOCK_ID" => 4, "ID" => $service_id),
            false,
            false,
            array("ID", "PROPERTY_PRICE")
        );

        return $res->Fetch()['PROPERTY_PRICE_VALUE'];
    }

    /**
     * Получить все отзывы услуги
     * @param $section_id
     * @return array
     */
    public static function getReccalls($section_id){
        $res = CIBlockElement::GetList(
            array('property_price' => 'asc'),
            array("IBLOCK_ID" => 2, "PROPERTY_SERVICE" => $section_id),
            false,
            false,
            array("ID","NAME")
        );

        while ($ob = $res->GetNextElement()){
            $arFields[] = $ob->GetFields();
        }

        return $arFields;
    }

    public static function getRecallsCNT($section_id){
        $cnt = CIBlockElement::GetList(
            array('property_price' => 'asc'),
            array("IBLOCK_ID" => 2, "PROPERTY_SERVICE" => $section_id),
            array(),
            false,
            array("ID","NAME")
        );

        return $cnt;
    }

    /**
     * Проверяет, что услуга является ссылкой
     * @param $section_id
     * @return bool
     */
    public static function isLink($section_id){

        $res = CIBlockSection::GetList(
            array("SORT"=>"ASC"),
            array("IBLOCK_ID" => 4, "ACTIVE"=>"Y", "ID" => $section_id),
            false,
            array("NAME", "UF_MAIN_LINK"),
            false
        );

        if($res->Fetch()['UF_MAIN_LINK'] == 1){
            return true;
        }else{
            return false;
        }

    }

    /**
     * Возвращает все технологии услуги
     * @param $section_id
     * @return mixed
     */
    public static function getTehnology($section_id){

        $res = CIBlockElement::GetList(
            array('SORT' => 'ASC'),
            array('IBLOCK_ID' => 6, 'ACTIVE' => 'Y', 'PROPERTY_SERVICE' => $section_id),
            false,
            false,
            array('PREVIEW_PICTURE', 'NAME', "ID")
        );

        while($ob = $res->GetNextElement()){
            $arFields[] = $ob->GetFields();
        }

        if(!empty($arFields)){
            return $arFields;
        }else{
            return false;
        }
    }




}