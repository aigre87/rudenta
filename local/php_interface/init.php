<?php
require_once($_SERVER['DOCUMENT_ROOT']."/functions/functions.php");
AddEventHandler('main', 'OnEndBufferContent', 'controller404', 1001);

spl_autoload_register(function($class){
    $file = $_SERVER["DOCUMENT_ROOT"]."/local/php_interface/include/$class.class.php";
    if(file_exists($file)) {
        require_once($file);
    }
});



function controller404(&$content) {
    if(defined('ERROR_404') && ERROR_404 == 'Y') {
        $content = file_get_contents($_SERVER["DOCUMENT_ROOT"].'/local/templates/rudenta/404.php');
        return false;
    }
}