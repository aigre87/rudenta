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



    if(!empty($_GET['doc'])){
        $doc = (int)$_GET['doc'];
        $servs = Service::getAllServices($doc);
    }else{
        $servs = Service::getAllServices();
        $doc = '';
    }

    if(!(empty($_GET['usl']))){
        $usl = (int)$_GET['usl'];
        $docs = Doctors::getAllDoc($usl);
    }else{
        $docs = Doctors::getAllDoc();
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

function hex2rgb($hex) {
   $hex = str_replace("#", "", $hex);

   if(strlen($hex) == 3) {
      $r = hexdec($hex[0].$hex[0]);
      $g = hexdec($hex[1].$hex[1]);
      $b = hexdec($hex[2].$hex[2]);
   } else {
      $r = hexdec($hex[0].$hex[1]);
      $g = hexdec($hex[2].$hex[3]);
      $b = hexdec($hex[4].$hex[5]);
   }

   return array($r, $g, $b); // returns an array with the rgb values
}
function rgbToHsl( $r, $g, $b ) {
    $oldR = $r;
    $oldG = $g;
    $oldB = $b;
    $r /= 255;
    $g /= 255;
    $b /= 255;
    $max = max( $r, $g, $b );
    $min = min( $r, $g, $b );
    $h;
    $s;
    $l = ( $max + $min ) / 2;
    $d = $max - $min;
        if( $d == 0 ){
            $h = $s = 0; // achromatic
        } else {
            $s = $d / ( 1 - abs( 2 * $l - 1 ) );
        switch( $max ){
                case $r:
                    $h = 60 * fmod( ( ( $g - $b ) / $d ), 6 ); 
                        if ($b > $g) {
                        $h += 360;
                    }
                    break;
                case $g: 
                    $h = 60 * ( ( $b - $r ) / $d + 2 ); 
                    break;
                case $b: 
                    $h = 60 * ( ( $r - $g ) / $d + 4 ); 
                    break;
            }                               
    }
    return array( round( $h, 2 ), round( $s, 2 ), round( $l, 2 ) );
}
function hslToRgb( $h, $s, $l ){
    $r; 
    $g; 
    $b;
    $c = ( 1 - abs( 2 * $l - 1 ) ) * $s;
    $x = $c * ( 1 - abs( fmod( ( $h / 60 ), 2 ) - 1 ) );
    $m = $l - ( $c / 2 );
    if ( $h < 60 ) {
        $r = $c;
        $g = $x;
        $b = 0;
    } else if ( $h < 120 ) {
        $r = $x;
        $g = $c;
        $b = 0;         
    } else if ( $h < 180 ) {
        $r = 0;
        $g = $c;
        $b = $x;                    
    } else if ( $h < 240 ) {
        $r = 0;
        $g = $x;
        $b = $c;
    } else if ( $h < 300 ) {
        $r = $x;
        $g = 0;
        $b = $c;
    } else {
        $r = $c;
        $g = 0;
        $b = $x;
    }
    $r = ( $r + $m ) * 255;
    $g = ( $g + $m ) * 255;
    $b = ( $b + $m  ) * 255;
    return array( floor( $r ), floor( $g ), floor( $b ) );
}
?>