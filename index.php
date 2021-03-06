<?
require($_SERVER['DOCUMENT_ROOT'].'/bitrix/header.php');
$APPLICATION->SetTitle("Rudenta Kids");
?>
<?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"child",
	Array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "child",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(""),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "child",
		"USE_EXT" => "N"
	)
);?>
<?$APPLICATION->IncludeComponent(
	"bitrix:catalog.section.list",
	"main",
	array(
		"VIEW_MODE" => "TEXT",
		"SHOW_PARENT_NAME" => "Y",
		"IBLOCK_TYPE" => "services",
		"IBLOCK_ID" => "4",
		"SECTION_ID" => $_REQUEST["SECTION_ID"],
		"SECTION_CODE" => "",
		"SECTION_URL" => "",
		"COUNT_ELEMENTS" => "N",
		"TOP_DEPTH" => "3",
		"SECTION_FIELDS" => array(
			0 => "NAME",
			1 => "",
		),
		"SECTION_USER_FIELDS" => array(
			0 => "",
			1 => "",
		),
		"ADD_SECTIONS_CHAIN" => "Y",
		"CACHE_TYPE" => "A",
		"CACHE_TIME" => "36000000",
		"CACHE_NOTES" => "",
		"CACHE_GROUPS" => "Y",
		"COMPONENT_TEMPLATE" => "tree"
	),
	false
);?>

<div class="hpVideoRow clear">
		<div class="lc">
			<div class="videoBlock">
				<div class="img">
					<div class="videoPlayButton" data-dep="hp">
						<div class="triangle"></div>
					</div>
				</div>
				<div class="videoPopup mfp-with-anim" data-dep="hp">
					<video id="companyVideo" class="video-js" data-dep="hp"  poster="/upload/img/videoPlch2.jpg">
						<source src="/upload/video/themevideo/RuDenta_Kids.mp4" type="video/mp4">
						<source src="/upload/video/themevideo/RuDenta_Kids.webm" type="video/webm">
					</video>
				</div>
			</div>
		</div>
		<div class="rc">
			<div class="t1">Принимаем детей в возрасте от 0 до 16 лет</div>
    	<div class="t2">Мы постарались сделать все, чтобы вашим деткам нарвилось лечить зубки</div>
		</div>
</div>

<div class="doctorsBlock clear">
	<div class="w-1col">
		<div class="m123wrapper">
			<?$APPLICATION->IncludeComponent(
				"bitrix:main.include",
				".default",
				Array(
					"AREA_FILE_SHOW" => "file",
					"AREA_FILE_SUFFIX" => "inc",
					"COMPONENT_TEMPLATE" => ".default",
					"EDIT_TEMPLATE" => "",
					"PATH" => "/local/templates/rudenta/inc_editable/hp_doctorsLeftCol.php"
				)
			);?>
			<div class="icons m123">
			    <div class="item">
			        <a href="/tehnology/" class="tech">
			            <svg class="icon">
			                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-nlo"></use>
			            </svg>
			            <span class="text">Применяемые<br />технологии</span>
			        </a>
			    </div>
			    <?$APPLICATION->IncludeComponent(
			        "bitrix:news.detail",
			        "license",
			        Array(
			            "ACTIVE_DATE_FORMAT" => "d.m.Y",
			            "ADD_ELEMENT_CHAIN" => "N",
			            "ADD_SECTIONS_CHAIN" => "Y",
			            "AJAX_MODE" => "N",
			            "AJAX_OPTION_ADDITIONAL" => "",
			            "AJAX_OPTION_HISTORY" => "N",
			            "AJAX_OPTION_JUMP" => "N",
			            "AJAX_OPTION_STYLE" => "Y",
			            "BROWSER_TITLE" => "-",
			            "CACHE_GROUPS" => "Y",
			            "CACHE_TIME" => "36000000",
			            "CACHE_TYPE" => "A",
			            "CHECK_DATES" => "Y",
			            "DETAIL_URL" => "",
			            "DISPLAY_BOTTOM_PAGER" => "Y",
			            "DISPLAY_DATE" => "Y",
			            "DISPLAY_NAME" => "Y",
			            "DISPLAY_PICTURE" => "Y",
			            "DISPLAY_PREVIEW_TEXT" => "Y",
			            "DISPLAY_TOP_PAGER" => "N",
			            "ELEMENT_CODE" => "license",
			            "ELEMENT_ID" => "",
			            "FIELD_CODE" => array("NAME", ""),
			            "IBLOCK_ID" => "10",
			            "IBLOCK_TYPE" => "contect",
			            "IBLOCK_URL" => "",
			            "INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
			            "MESSAGE_404" => "",
			            "META_DESCRIPTION" => "-",
			            "META_KEYWORDS" => "-",
			            "PAGER_BASE_LINK_ENABLE" => "N",
			            "PAGER_SHOW_ALL" => "N",
			            "PAGER_TEMPLATE" => ".default",
			            "PAGER_TITLE" => "Страница",
			            "PROPERTY_CODE" => array("", "FILE"),
			            "SET_BROWSER_TITLE" => "N",
			            "SET_CANONICAL_URL" => "N",
			            "SET_LAST_MODIFIED" => "N",
			            "SET_META_DESCRIPTION" => "N",
			            "SET_META_KEYWORDS" => "N",
			            "SET_STATUS_404" => "N",
			            "SET_TITLE" => "N",
			            "SHOW_404" => "N",
			            "USE_PERMISSIONS" => "N",
			            "USE_SHARE" => "N"
			        )
			    );?>
			    <div class="item">
			        <a href="/safety/" class="vacancies">
			            <svg class="icon">
			                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/local/templates/rudenta/images/symbol/sprite.svg#icon-beidj"></use>
			            </svg>
			            <span class="text">Безопасность пациента</span>
			        </a>
			    </div>
			</div>
		</div>
	</div>
	<div class="w-2col">
	<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"doctors",
	Array(
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"ADD_SECTIONS_CHAIN" => "N",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"CACHE_FILTER" => "N",
		"CACHE_GROUPS" => "Y",
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "A",
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"DISPLAY_BOTTOM_PAGER" => "N",
		"DISPLAY_DATE" => "N",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "N",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array("",""),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => "1",
		"IBLOCK_TYPE" => "about",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
		"INCLUDE_SUBSECTIONS" => "N",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "16",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("POSITION","EXPERIENCE","AWARDS", "OFFSETX_ANONS_IMAGE", "OFFSETY_ANONS_IMAGE"),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "RAND",
		"SORT_BY2" => "SORT",
		"SORT_ORDER1" => "DESC",
		"SORT_ORDER2" => "ASC"
	)
	);?>
	</div>
</div>
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"recalls",
	Array(
		"ACTIVE_DATE_FORMAT" => "j F Y",
		"ADD_SECTIONS_CHAIN" => "N",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"CACHE_FILTER" => "N",
		"CACHE_GROUPS" => "Y",
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "A",
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"DISPLAY_BOTTOM_PAGER" => "Y",
		"DISPLAY_DATE" => "Y",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "N",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array("",""),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => "2",
		"IBLOCK_TYPE" => "about",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
		"INCLUDE_SUBSECTIONS" => "N",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "9999",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("SEX",""),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "ACTIVE_FROM",
		"SORT_BY2" => "SORT",
		"SORT_ORDER1" => "DESC",
		"SORT_ORDER2" => "ASC"
	)
);?>
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"articles",
	Array(
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"ADD_SECTIONS_CHAIN" => "N",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"CACHE_FILTER" => "N",
		"CACHE_GROUPS" => "Y",
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "A",
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"DISPLAY_BOTTOM_PAGER" => "N",
		"DISPLAY_DATE" => "N",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "N",
		"DISPLAY_PREVIEW_TEXT" => "N",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array("",""),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => "5",
		"IBLOCK_TYPE" => "about",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
		"INCLUDE_SUBSECTIONS" => "N",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "27",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("",""),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "ACTIVE_FROM",
		"SORT_BY2" => "SORT",
		"SORT_ORDER1" => "DESC",
		"SORT_ORDER2" => "ASC"
	)
);?>

<?
require($_SERVER['DOCUMENT_ROOT'].'/bitrix/footer.php');
?>