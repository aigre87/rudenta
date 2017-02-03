<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
CModule::IncludeModule("iblock");

$name = htmlspecialchars($_POST['name']);
$city = htmlspecialchars($_POST['city']);
$email = htmlspecialchars($_POST['email']);
$sex = (int)htmlspecialchars($_POST['sex']);
$point = (int)htmlspecialchars($_POST['point']);
$doc = (int)htmlspecialchars($_POST['doc']);
$usl = (int)htmlspecialchars($_POST['usl']);
$recallText = htmlspecialchars($_POST['recallText']);


if (!empty ($name) && !empty ($recallText)){
    $el = new CIBlockElement;

    $PROP = array(
        'SERVICE' => $usl,
        'DOCTOR' => $doc,
        'RATING' => $point,
        'CITY' => $city,
        'SEX' => $sex,
        'Email' => $email
    );

    $arLoadProductArray = Array(
        "IBLOCK_ID"      => 2,
        "PROPERTY_VALUES"=> $PROP,
        "NAME"           => $name,
        "ACTIVE"         => "Y",            // активен
        "PREVIEW_TEXT"   => $recallText,
        "DATE_ACTIVE_FROM" => date("d.m.Y")
    );

    if($PRODUCT_ID = $el->Add($arLoadProductArray))
        echo json_encode("Спасибо! Отзыв отправлен!");
    else
        echo "Error: ".$el->LAST_ERROR;
}else{
    echo "Поля имя и отзыв обязательны!";
    die;
}




