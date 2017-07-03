<?php

$file_id = $arResult['PROPERTIES']['FILE']['VALUE'];
$file_array = CFile::GetFileArray($file_id);

$file_size_bite = $file_array['FILE_SIZE'];


$arResult['FILE_SRC'] = $file_array['SRC'];
$arResult['FILE_SIZE'] = round($file_size_bite / 8000);
