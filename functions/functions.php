<?php

function arrPrint($arr){
    echo "<pre>";
    print_r($arr);
    echo "</pre>";
}

function recalls($cnt_recalls){
    $count = abs($cnt_recalls) % 100;
    $lcount = $count % 10;
    if ($count >= 11 && $count <= 19) return($cnt_recalls.' Отзывов');
    if ($lcount >= 2 && $lcount <= 4) return($cnt_recalls.' Отзыва');
    if ($lcount == 1) return($cnt_recalls.' Отзыв');
    return $cnt_recalls." Отзывов";
}

function articles($cnt_articles){
    $count = abs($cnt_articles) % 100;
    $lcount = $count % 10;
    if ($count >= 11 && $count <= 19) return($cnt_articles.' Публикаций');
    if ($lcount >= 2 && $lcount <= 4) return($cnt_articles.' Публикации');
    if ($lcount == 1) return($cnt_articles.' Публикация');
    return $cnt_articles." Публикаций";
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


    if(!empty($usl)){
        echo "<a href='/recalls/?usl=$usl'>Все врачи</a>";
        foreach($docs as $key){
            if($doc == $key['ID']){
                echo "<a class='active' href=\"/recalls/?doc=" , $key['ID'] , "&usl=$usl\">" , $key['NAME'] , "</a>";
            }else{
                echo "<a href=\"/recalls/?doc=" , $key['ID'] , "&usl=$usl\">" , $key['NAME'] , "</a>";
            }
        }
    }else{
        echo "<a href='/recalls/'>Все врачи</a>";
        foreach($docs as $key){
            if($doc == $key['ID']){
                echo "<a class='active' href=\"/recalls/?doc=" , $key['ID'] , "\">" , $key['NAME'] , "</a>";
            }else{
                echo "<a href=\"/recalls/?doc=" , $key['ID'] , "\">" , $key['NAME'] , "</a>";
            }
        }
    }

    if(!empty($doc)){
        echo "<a href='/recalls/?doc=$doc'>Все услуги</a>";
        foreach($servs as $serv_id => $serv_name){
            if($usl == $serv_id){
                echo "<a class='active' href=\"/recalls/?doc=" , $doc , "&usl=$serv_id\">" , $serv_name , "</a>";
            }else{
                echo "<a href=\"/recalls/?doc=" , $doc , "&usl=$serv_id\">" , $serv_name , "</a>";
            }
        }
    }else{
        echo "<a href='/recalls/'>Все услуги</a>";
        foreach($servs as $serv_id => $serv_name){
            if($usl == $serv_id){
                echo "<a class='active' href=\"/recalls/?usl=" , $serv_id , "\">" , $serv_name , "</a>";
            }else{
                echo "<a href=\"/recalls/?usl=" , $serv_id , "\">" , $serv_name , "</a>";
            }
        }
    }

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