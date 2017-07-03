<?php

function arrPrint($arr){
    echo "<pre>";
    print_r($arr);
    echo "</pre>";
}

function dd($arr){
    echo "<pre>";
    print_r($arr);
    echo "</pre>";
    die;
}

function recalls($cnt_recalls){
    $count = abs($cnt_recalls) % 100;
    $lcount = $count % 10;
    if ($count >= 11 && $count <= 19) return($cnt_recalls.' отзывов');
    if ($lcount >= 2 && $lcount <= 4) return($cnt_recalls.' отзыва');
    if ($lcount == 1) return($cnt_recalls.' отзыв');
    return $cnt_recalls." отзывов";
}

function articles($cnt_articles){
    $count = abs($cnt_articles) % 100;
    $lcount = $count % 10;
    if ($count >= 11 && $count <= 19) return($cnt_articles.' публикаций');
    if ($lcount >= 2 && $lcount <= 4) return($cnt_articles.' публикации');
    if ($lcount == 1) return($cnt_articles.' публикация');
    return $cnt_articles." публикаций";
}

function filterDocAndUsl(){
    $docs = Doctors::getAllDoc();
    $servs = Service::getAllServices();

    if(!empty($_GET['doc'])){
        $doc = (int)$_GET['doc'];
    }else{
        $doc = '';
    }

    if(!(empty($_GET['usl']))){
        $usl = (int)$_GET['usl'];
    }else{
        $usl = '';
    }

    $grade = $_GET['grade'];

    /* === Врачи ===*/
    echo "<div class='filter doctors'>";
    if(!empty($usl) && empty($grade)){

        echo "<a href='/reviews/?usl=$usl' class='all'>Все врачи</a>";
        foreach($docs as $key){
            echo '<img src="' . $key["PREVIEW_PICTURE"]["src"] . '">';
            if($doc == $key['ID']){
                echo "<a class='active' href=\"/reviews/?doc=" , $key['ID'] , "&usl=$usl\">" , $key['NAME'] , "</a>";
            }else{
                echo "<a href=\"/reviews/?doc=" , $key['ID'] , "&usl=$usl\">" , $key['NAME'] , "</a>";
            }
        }
    }elseif(empty($usl) && !empty($grade)){
        echo "<a href='/reviews/?grade=$grade' class='all'>Все врачи</a>";
        foreach($docs as $key){
            echo '<img src="' . $key["PREVIEW_PICTURE"]["src"] . '">';
            if($doc == $key['ID']){
                echo "<a class='active' href=\"/reviews/?doc=" , $key['ID'] , "&grade=$grade\">" , $key['NAME'] , "</a>";
            }else{
                echo "<a href=\"/reviews/?doc=" , $key['ID'] , "&grade=$grade\">" , $key['NAME'] , "</a>";
            }
        }
    }elseif(!empty($usl) && !empty($grade)){
        echo "<a href='/reviews/?usl=$usl&grade=$grade' class='all'>Все врачи</a>";
        foreach($docs as $key){
            echo '<img src="' . $key["PREVIEW_PICTURE"]["src"] . '">';
            if($doc == $key['ID']){
                echo "<a class='active' href=\"/reviews/?doc=" , $key['ID'] , "&usl=$usl&grade=$grade\">" , $key['NAME'] , "</a>";
            }else{
                echo "<a href=\"/reviews/?doc=" , $key['ID'] , "&usl=$usl&grade=$grade\">" , $key['NAME'] , "</a>";
            }
        }
    }else{
        echo "<a href='/reviews/' class='all'>Все врачи</a>";
        foreach($docs as $key){
            echo '<img src="' . $key["PREVIEW_PICTURE"]["src"] . '">';
            if($doc == $key['ID']){
                echo "<a class='active' href=\"/reviews/?doc=" , $key['ID'] , "\">" , $key['NAME'] , "</a>";
            }else{
                echo "<a href=\"/reviews/?doc=" , $key['ID'] , "\">" , $key['NAME'] , "</a>";
            }
        }
    }
    echo "</div>";
    /*===End Врачи===*/


    /*===Услуги===*/
    echo "<div class='filter services'>";
    if(!empty($doc) && empty($grade)){
        echo "<a href='/reviews/?doc=$doc'>Все услуги</a>";
        foreach($servs as $serv_id => $serv_name){
            if($usl == $serv_id){
                echo "<a class='active' href=\"/reviews/?doc=" , $doc , "&usl=$serv_id\">" , $serv_name , "</a>";
            }else{
                echo "<a href=\"/reviews/?doc=" , $doc , "&usl=$serv_id\">" , $serv_name , "</a>";
            }
        }
    }elseif(empty($doc) && !empty($grade)){
        echo "<a href='/reviews/?grade=$grade'>Все услуги</a>";
        foreach($servs as $serv_id => $serv_name){
            if($usl == $serv_id){
                echo "<a class='active' href=\"/reviews/?usl=$serv_id&grade=$grade\">" , $serv_name , "</a>";
            }else{
                echo "<a href=\"/reviews/?usl=$serv_id&grade=$grade\">" , $serv_name , "</a>";
            }
        }
    }elseif(!empty($doc) && !empty($grade)){
        echo "<a href='/reviews/?doc=$doc&grade=$grade'>Все услуги</a>";
        foreach($servs as $serv_id => $serv_name){
            if($usl == $serv_id){
                echo "<a class='active' href=\"/reviews/?doc=$doc&usl=$serv_id&grade=$grade\">" , $serv_name , "</a>";
            }else{
                echo "<a href=\"/reviews/?doc=$doc&usl=$serv_id&grade=$grade\">" , $serv_name , "</a>";
            }
        }
    }else{
        echo "<a href='/reviews/'>Все услуги</a>";
        foreach($servs as $serv_id => $serv_name){
            if($usl == $serv_id){
                echo "<a class='active' href=\"/reviews/?usl=" , $serv_id , "\">" , $serv_name , "</a>";
            }else{
                echo "<a href=\"/reviews/?usl=" , $serv_id , "\">" , $serv_name , "</a>";
            }
        }
    }
    echo "</div>";
    /*===End Услуги===*/

    /*===Отзывы===*/
    echo "<div class='filter grades'>";
    if(empty($grade)){

        if(!empty($doc) && empty($usl)){
            echo "<a class='active' href=\"/reviews/?doc=", $doc , "\">Все отзывы</a>";
        }elseif(empty($doc) && !empty($usl)){
            echo "<a class='active' href=\"/reviews/?usl=", $usl , "\">Все отзывы</a>";
        }elseif(!empty($doc) && !empty($usl)){
            echo "<a class='active' href=\"/reviews/?doc=", $doc , "&usl=" ,$usl, "\">Все отзывы</a>";
        }else{
            echo "<a class='active' href='/reviews/'>Все отзывы</a>";
        }

        if(!empty($doc) && empty($usl)) {
            echo "<a href=\"/reviews/?doc=", $doc, "&grade=positive\">Положительные</a>";
        }elseif(empty($doc) && !empty($usl)){
            echo "<a href=\"/reviews/?usl=", $usl, "&grade=positive\">Положительные</a>";
        }elseif(!empty($doc) && !empty($usl)){
            echo "<a href=\"/reviews/?doc=$doc&usl=$usl&grade=positive\">Положительные</a>";
        }else{
            echo "<a href='/reviews/?grade=positive'>Положительные</a>";
        }

        if(!empty($doc) && empty($usl)) {
            echo "<a href=\"/reviews/?doc=", $doc, "&grade=negative\">Отрицательные</a>";
        }elseif(empty($doc) && !empty($usl)){
            echo "<a href=\"/reviews/?usl=", $usl, "&grade=negative\">Отрицательные</a>";
        }elseif(!empty($doc) && !empty($usl)){
            echo "<a href=\"/reviews/?doc=$doc&usl=$usl&grade=negative\">Отрицательные</a>";
        }else{
            echo "<a href='/reviews/?grade=negative'>Отрицательные</a>";
        }

    }else{

        if($grade == 'positive'){

            if(!empty($doc) && empty($usl)){
                echo "<a href=\"/reviews/?doc=", $doc , "\">Все отзывы</a>";
            }elseif(empty($doc) && !empty($usl)){
                echo "<a href=\"/reviews/?usl=", $usl , "\">Все отзывы</a>";
            }elseif(!empty($doc) && !empty($usl)){
                echo "<a href=\"/reviews/?doc=", $doc , "&usl=" ,$usl, "\">Все отзывы</a>";
            }else{
                echo "<a href='/reviews/'>Все отзывы</a>";
            }

            if(!empty($doc) && empty($usl)){
                echo "<a class='active' href=\"/reviews/?doc=", $doc, "&grade=positive\">Положительные</a>";
            }elseif(empty($doc) && !empty($usl)){
                echo "<a class='active' href=\"/reviews/?usl=", $usl, "&grade=positive\">Положительные</a>";
            }elseif(!empty($doc) && !empty($usl)){
                echo "<a class='active' href=\"/reviews/?doc=$doc&usl=$usl&grade=positive\">Положительные</a>";
            }else{
                echo "<a class='active' href='/reviews/?grade=positive'>Положительные</a>";
            }

            if(!empty($doc) && empty($usl)) {
                echo "<a href=\"/reviews/?doc=", $doc, "&grade=negative\">Отрицательные</a>";
            }elseif(empty($doc) && !empty($usl)){
                echo "<a href=\"/reviews/?usl=", $usl, "&grade=negative\">Отрицательные</a>";
            }elseif(!empty($doc) && !empty($usl)){
                echo "<a href=\"/reviews/?doc=$doc&usl=$usl&grade=negative\">Отрицательные</a>";
            }else{
                echo "<a href='/reviews/?grade=negative'>Отрицательные</a>";
            }

        }elseif($grade == 'negative') {

            if(!empty($doc) && empty($usl)){
                echo "<a href=\"/reviews/?doc=", $doc , "\">Все отзывы</a>";
            }elseif(empty($doc) && !empty($usl)){
                echo "<a href=\"/reviews/?usl=", $usl , "\">Все отзывы</a>";
            }elseif(!empty($doc) && !empty($usl)){
                echo "<a href=\"/reviews/?doc=", $doc , "&usl=" ,$usl, "\">Все отзывы</a>";
            }else{
                echo "<a href='/reviews/'>Все отзывы</a>";
            }

            if(!empty($doc) && empty($usl)){
                echo "<a href=\"/reviews/?doc=", $doc, "&grade=positive\">Положительные</a>";
            }elseif(empty($doc) && !empty($usl)){
                echo "<a href=\"/reviews/?usl=", $usl, "&grade=positive\">Положительные</a>";
            }elseif(!empty($doc) && !empty($usl)){
                echo "<a href=\"/reviews/?doc=$doc&usl=$usl&grade=positive\">Положительные</a>";
            }else{
                echo "<a href='/reviews/?grade=positive'>Положительные</a>";
            }

            if(!empty($doc) && empty($usl)) {
                echo "<a class='active' href=\"/reviews/?doc=", $doc, "&grade=negative\">Отрицательные</a>";
            }elseif(empty($doc) && !empty($usl)){
                echo "<a class='active' href=\"/reviews/?usl=", $usl, "&grade=negative\">Отрицательные</a>";
            }elseif(!empty($doc) && !empty($usl)){
                echo "<a class='active' href=\"/reviews/?doc=$doc&usl=$usl&grade=negative\">Отрицательные</a>";
            }else {
                echo "<a class='active' href='/reviews/?grade=negative'>Отрицательные</a>";
            }
        }
    }
    echo "</div>";
    /*===End отзывы===*/
}

function filterArticles(){
    $servs = Service::getAllServices();

    if(!(empty($_GET['usl'])))
        $usl = (int)$_GET['usl'];
    else
        $usl = '';


    echo "<a href='/articles/'>Все темы</a>";
    foreach($servs as $serv_id => $serv_name){
        if($usl == $serv_id){
            echo "<a class='active' href=\"/articles/?usl=" , $serv_id , "\">" , $serv_name , "</a>";
        }else{
            echo "<a href=\"/articles/?usl=" , $serv_id , "\">" , $serv_name , "</a>";
        }
    }
}

  function translit($str) {
    $rus = array('А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', ' ');
    $lat = array('A', 'B', 'V', 'G', 'D', 'E', 'E', 'Gh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'C', 'Ch', 'Sh', 'Sch', 'Y', 'Y', 'Y', 'E', 'Yu', 'Ya', 'a', 'b', 'v', 'g', 'd', 'e', 'e', 'gh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'sch', 'y', 'y', 'y', 'e', 'yu', 'ya', "_");
    return str_replace($rus, $lat, $str);
  }