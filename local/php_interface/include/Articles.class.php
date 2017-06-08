<?php

class Articles{

    /**
     * Возвращает 3 случайные статьи по той же тематике
     * @param $usl_id, $el_id
     * return @array
     */
    public static function getRandom($usl_id, $el_id){
        $res = CIBlockElement::GetList(
            array('RAND' => 'ASC'),
            array("IBLOCK_ID"=>5, 'SECTION_ID' => $usl_id, '!ID' => $el_id),
            false,
            array('nTopCount' => 3),
            array("ID","NAME")
        );

        while($ob = $res->GetNextElement()) {
            $arFields[] = $ob->GetFields();
        }

        return $arFields;
    }
}