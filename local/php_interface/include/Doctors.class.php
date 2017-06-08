<?php

class Doctors{

    public static function getExp($date_start)
    {
        return FormatDate("Q", MakeTimeStamp($date_start));
    }

    /**
     * Возвращает инфу о враче по его ID, если картинку нужно отресайзить 2 и 3 параметром передать ширину и высоту
     * @param $d_id
     * @param bool $img_width
     * @param bool $img_height
     * @return array
     */
    public static function getInfo($d_id, $img_width = false, $img_height = false){
        $res = CIBlockElement::GetList(
            array(),
            array("IBLOCK_ID"=>1, "ID" => $d_id),
            false,
            false,
            array(
                "ID",
                "NAME",
                "PREVIEW_TEXT",
                "PROPERTY_POSITION",
                "PREVIEW_PICTURE",
                "PROPERTY_EXPERIENCE",
                "PROPERTY_AWARDS"
            )
        );

        while($ob = $res->GetNextElement()) {
            $arFields[] = $ob->GetFields();
        }

        if(!empty($img_width) && !empty($img_height)){
            $arDocImg = CFile::GetFileArray($arFields[0]['PREVIEW_PICTURE']);
            $arDocImg = CFile::ResizeImageGet(
                $arDocImg,
                array('width'=>$img_width, 'height'=>$img_height),
                BX_RESIZE_IMAGE_PROPORTIONAL_ALT,
                true
            );
            $docArray['PREVIEW_PICTURE'] = $arDocImg['src'];
        } else {
            $arFields[0]['PREVIEW_PICTURE'] = CFile::GetPath($arFields[0]['PREVIEW_PICTURE']);
            $docArray['PREVIEW_PICTURE'] = $arFields[0]['PREVIEW_PICTURE'];
        }

        $docArray['ID'] = $arFields[0]['ID'];
        $docArray['NAME'] = $arFields[0]['NAME'];
        $docArray['PREVIEW_TEXT'] = $arFields[0]['PREVIEW_TEXT'];
        $docArray['POSITION'] = $arFields[0]['PROPERTY_POSITION_VALUE'];
        $docArray['EXPERIENCE'] =  $arFields[0]['PROPERTY_EXPERIENCE_VALUE'];
        $docArray['AWARDS_CNT'] = count($arFields[0]['PROPERTY_AWARDS_VALUE']);
        return $docArray;
    }

    /**
     * Получить все отызывы по ID врача
     * @param $d_id
     * @return array
     */
    public static function getRecalls($d_id){
        $res = CIBlockElement::GetList(
            array(),
            array("IBLOCK_ID"=>2, "PROPERTY_DOCTOR.ID" => $d_id, "ACTIVE" => "Y"),
            false,
            false,
            array("ID", "NAME", "PREVIEW_TEXT", "PROPERTY_SERVICE", "PROPERTY_RATING", "PROPERTY_CITY", "DATE_ACTIVE_FROM")
        );

        while($ob = $res->GetNextElement()) {
            $arFields[] = $ob->GetFields();
        }

        return $arFields;
    }

    /** получить количество отзывов по ID врача
     * @param $d_id
     * @return mixed
     */
    public static function getRecallsCnt($d_id){
        $res = CIBlockElement::GetList(
            array(),
            array("IBLOCK_ID"=>2, "PROPERTY_DOCTOR.ID" => $d_id),
            array(),
            false,
            array("ID")
        );

        return $res;
    }

    /**
     * Получить всех врачей
     * @return array
     */
    public static function getAllDoc(){
        $res = CIBlockElement::GetList(
            array(),
            array("IBLOCK_ID"=>1, "ACTIVE" => "Y"),
            false,
            false,
            array("ID","NAME", "PREVIEW_PICTURE")
        );


        while($ob = $res->GetNextElement()) {
            $arFields[] = $ob->GetFields();
        }

        foreach($arFields as $doctor_key => $doctor_arr){
            $resizeImg = CFile::GetFileArray($doctor_arr['PREVIEW_PICTURE']);
            $resizeImg = CFile::ResizeImageGet(
                $resizeImg,
                array('width'=> 50, 'height'=>50),
                BX_RESIZE_IMAGE_PROPORTIONAL,
                true
            );

            $arFields[$doctor_key]['PREVIEW_PICTURE'] = $resizeImg;
        }

        return $arFields;
    }


    /**
     * Возвращает  заметки врача
     * @param $d_id
     * @return array
     */
    public static function getArticles($d_id){
        $res = CIBlockElement::GetList(
            array(),
            array("IBLOCK_ID"=>5, 'PROPERTY_DOCTOR.ID' => $d_id),
            false,
            false,
            array("ID","NAME")
        );

        while($ob = $res->GetNextElement()) {
            $arFields[] = $ob->GetFields();
        }

        return $arFields;
    }

    /**
     * Получить количество советов врача
     * @param $d_id
     * @return mixed
     */
    public static function getArticlesCNT($d_id){
        $res = CIBlockElement::GetList(
            array(),
            array("IBLOCK_ID"=>5, 'PROPERTY_DOCTOR.ID' => $d_id),
            array(),
            false,
            array("ID","NAME")
        );

       return $res;
    }

    /**
     * Получить всех врчаей по ID услуги
     * @param $usl_id
     */
    public static function getDocrotsUID($usl_id){
        $res = CIBlockElement::GetList(
            array(),
            array("IBLOCK_ID"=>1, "PROPERTY_SERVICE"=>$usl_id, "ACTIVE" => "Y"),
            false,
            false,
            array("ID","NAME","PROPERTY_EXPERIENCE","PREVIEW_PICTURE","PROPERTY_POSITION", "PROPERTY_AWARDS", "PROPERTY_BACKGROUND")
        );


        while($ob = $res->GetNextElement()) {
            $arFields[] = $ob->GetFields();
        }


        return $arFields;
    }
}