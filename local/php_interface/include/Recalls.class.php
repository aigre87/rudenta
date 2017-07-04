<?php

class Recalls{

    public static function getRecallsCNT(){

            $arFilter['IBLOCK_ID'] = 2;
            if(!empty($_GET['doc']))
                $arFilter['PROPERTY_DOCTOR.ID'] = $_GET['doc'];

            if(!empty($_GET['grade'])){

                if($_GET['grade'] == 'positive'){
                    $arFilter['PROPERTY_RATING_VALUE'] = 5;
                }elseif ($_GET['grade'] == 'negative'){
                    $arFilter['PROPERTY_RATING_VALUE'] = array(4,3,2,1);
                }
            }

            if(!empty($_GET['usl']))
                $arFilter['PROPERTY_SERVICE'] = $_GET['usl'];

            $res = CIBlockElement::GetList(
                array(),
                $arFilter,
                array(),
                false,
                array("ID")
            );

            return recalls($res);
    }
}