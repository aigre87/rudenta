<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
<!DOCTYPE html>
<html>
	<head>
		<?$APPLICATION->ShowHead();?>
		<title><?$APPLICATION->ShowTitle();?></title>
		<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

		<link rel="stylesheet" type="text/css" href="<?=SITE_TEMPLATE_PATH?>/js/fancybox/jquery.fancybox.css">
		<link rel="stylesheet" type="text/css" href="<?=SITE_TEMPLATE_PATH?>/js/fancybox/helpers/jquery.fancybox-buttons.css">
		<link rel="stylesheet" type="text/css" href="<?=SITE_TEMPLATE_PATH?>/js/fancybox/helpers/jquery.fancybox-thumbs.css">

		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jquery-1.10.1.min.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jquery.mask.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jquery.mousewheel-3.0.6.pack.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/fancybox/jquery.fancybox.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/fancybox/jquery.fancybox.pack.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/fancybox/helpers/jquery.fancybox-buttons.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/fancybox/helpers/jquery.fancybox-media.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/fancybox/helpers/jquery.fancybox-thumbs.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/fancybox/helpers/jquery.mousewheel-3.0.6.pack.js"></script>
		<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/script.js"></script>
	</head>
	<body>
		<div id="panel">
			<?$APPLICATION->ShowPanel();?>
		</div>
		<a href="/"><img src="/local/templates/rudenta/img/logo.png"></a>
		<?$APPLICATION->IncludeComponent(
			"bitrix:menu",
			"header",
			Array(
				"ALLOW_MULTI_SELECT" => "N",
				"CHILD_MENU_TYPE" => "left",
				"DELAY" => "N",
				"MAX_LEVEL" => "1",
				"MENU_CACHE_GET_VARS" => array(""),
				"MENU_CACHE_TIME" => "3600",
				"MENU_CACHE_TYPE" => "N",
				"MENU_CACHE_USE_GROUPS" => "Y",
				"ROOT_MENU_TYPE" => "left",
				"USE_EXT" => "N"
			)
		);?>
						