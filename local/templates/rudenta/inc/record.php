<div class="free-record">
	 <?$APPLICATION->IncludeComponent(
	"bitrix:form",
	"freeRecord",
	Array(
		"AJAX_MODE" => "Y",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "N",
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"CHAIN_ITEM_LINK" => "",
		"CHAIN_ITEM_TEXT" => "",
		"EDIT_ADDITIONAL" => "N",
		"EDIT_STATUS" => "N",
		"IGNORE_CUSTOM_TEMPLATE" => "N",
		"NOT_SHOW_FILTER" => array("",""),
		"NOT_SHOW_TABLE" => array("",""),
		"RESULT_ID" => $_REQUEST[RESULT_ID],
		"SEF_FOLDER" => "/doctors/",
		"SEF_MODE" => "Y",
		"SEF_URL_TEMPLATES" => Array(
		    "edit"=>"#WEB_FORM_ID#/edit/#RESULT_ID#/",
            "list"=>"#WEB_FORM_ID#/list/",
            "new"=>"#WEB_FORM_ID#/",
            "view"=>"#WEB_FORM_ID#/view/#RESULT_ID#/"
        ),
		"SHOW_ADDITIONAL" => "N",
		"SHOW_ANSWER_VALUE" => "N",
		"SHOW_EDIT_PAGE" => "N",
		"SHOW_LIST_PAGE" => "N",
		"SHOW_STATUS" => "N",
		"SHOW_VIEW_PAGE" => "N",
		"START_PAGE" => "new",
		"SUCCESS_URL" => "",
		"USE_EXTENDED_ERRORS" => "N",
		"WEB_FORM_ID" => "1"
	)
);?>
</div>