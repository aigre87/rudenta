<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Вакансии");
?>

    <div class="articlesDetailPage">
        <div class="topBlock clear">
            <div class="w-2col lc">
                <div class="text">
                    <?$APPLICATION->IncludeComponent(
                        "bitrix:main.include",
                        ".default",
                        array(
                            "AREA_FILE_SHOW" => "file",
                            "AREA_FILE_SUFFIX" => "inc",
                            "EDIT_TEMPLATE" => "",
                            "COMPONENT_TEMPLATE" => ".default",
                            "PATH" => "/local/templates/rudenta/inc/vacancy.php"
                        ),
                        false
                    );?>
                </div>
                <div class="shareBlock">
                    <script src="//yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
                    <script src="//yastatic.net/share2/share.js"></script>
                    <div class="ya-share2" data-services="vkontakte,odnoklassniki,facebook,twitter" data-counter="" data-title="<?=$arResult["NAME"]?>" data-description="<?=$arResult['PREVIEW_TEXT']?>"></div>
                </div>
            </div>
            <div class="w-1col rc">
                <div class="printVersion">
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-print"></use>
                    </svg>
                    Версия для печати
                </div>
                <a class="printButton">Распечатать</a>
                <a class="disablePrintVersion">Обычный просмотр</a>
                <?$APPLICATION->IncludeComponent(
                    "bitrix:main.include",
                    ".default",
                    array(
                        "AREA_FILE_SHOW" => "file",
                        "AREA_FILE_SUFFIX" => "inc",
                        "EDIT_TEMPLATE" => "",
                        "COMPONENT_TEMPLATE" => ".default",
                        "PATH" => "/local/templates/rudenta/inc/record.php"
                    ),
                    false
                );?>
            </div>
        </div>
    </div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>