<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>

<img src="/bitrix/templates/rudenta/img/footimg.png">
<div class="info">
	<div>
		Адрес
		Москва, пр Березовой рощи, д8
	</div>
	<div>
		Время работы
		9:00 -21:00(без выходных)
	</div>
	<div>
		Многоканальный телефон
		+7(495)646-81-91
	</div>
	<div>
		Электронная почта
		grandpark@rudenta.ru
	</div>
	<div>
		Вайбер
		+7(985)745-79-99
	</div>
</div>

<?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"bottom",
	Array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "bottom",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(""),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "bottom",
		"USE_EXT" => "N"
	)
);?>
	</body>
</html>