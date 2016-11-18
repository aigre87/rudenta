<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();

global $isHomePage;
global $currentDir;
global $shareImgSrc; /* uses in footer.php social share */
global $shareDescription; /* uses in footer.php social share */

$shareImgSrc = "";
$shareDescription = "";

$currentDir = $APPLICATION->GetCurDir();


$arCurrentDir = explode("/", $currentDir);

$bodyClassArray = explode("/", $currentDir);
$bodyClassString = $bodyClassArray[1]." ";
for ($i=2; $i < count($bodyClassArray)-1 ; $i++) {
	if( $bodyClassArray[$i-1] !== "en" ){
		$bodyClassArray[$i] = $bodyClassArray[$i-1]."-".$bodyClassArray[$i];
		$bodyClassString.=$bodyClassArray[$i]." ";
	} else{
		$bodyClassString.=$bodyClassArray[$i]." ";
	}
}

if ( $_SERVER["REQUEST_URI"] == '/' || ($currentDir == '/' && $_SERVER["SCRIPT_NAME"] == '/index.php') || $_SERVER["REQUEST_URI"] == '/en/' || ($currentDir == '/en/' && $_SERVER["SCRIPT_NAME"] == '/en/index.php'))
	$isHomePage = true;
else
	$isHomePage = false;

?>
<!DOCTYPE html>
<html>
	<head>
		<?$APPLICATION->ShowHead();?>
		<title><?$APPLICATION->ShowTitle();?></title>

    <meta name="keywords" content="<?$APPLICATION->ShowProperty("keywords");?>" />
    <meta name="description" content="<?$APPLICATION->ShowProperty("description");?>" />

		<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />


		<link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/fonts/fonts.css">
		<link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/css/template_styles.min.css">
		
    <script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/libs/libs.min.js"></script>
    <script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/main.min.js"></script>
	</head>
	<body class='<?=defined("ERROR_404") ? "page404 " : ""?><?= $isHomePage ? "homepage" : "innerpage ".str_replace('/', ' ', $bodyClassString) ?>'>
	<div class='globalLoader siteLoader'><div class='overlay'></div><div class='loader-icon'><div></div></div></div>
	<div id="panel">
		<?$APPLICATION->ShowPanel();?>
	</div>
	<div id="mainWrapper">

		<header>
			<a href="/" id="headerLogo"><img src="<?=SITE_TEMPLATE_PATH?>/images/mainSiteLogo.png" alt="logo"></a>
			<menu id="headerMenu">
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
			</menu>
			<div class="headerContacts">
				<div class="phone">+7 (495) 646&bull;81&bull;91</div>
				<div class="adress">Москва, пр. Берёзовой рощи, д. 8</div>
				<div class="desc"><a>Взрослое отделение</a> в соседнем здании</div>
			</div>
		</header>

			<?if ( !$isHomePage && !defined("ERROR_404") ): ?>
				<div class="pageTitle clear">
					<h1><?$APPLICATION->ShowTitle(false)?></h1>
				</div>
			<?endif;?>
		<section id="content">
		
						