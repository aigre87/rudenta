<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<?=$arResult["FORM_HEADER"]?>
<div class="free-record-questions">
	<?/*<p><?=$arResult["FORM_DESCRIPTION"]?></p>*/?>
	<div class="title"><?=GetMessage("FORM_MYTITLE");?></div>

	<?if ($arResult["isFormErrors"] == "Y"):?>
		<div class="error">
			Пожалуйста, заполните все поля
		</div>
	<?endif;?>
	<input placeholder="Имя" type="text" class="inputtext name" name="form_text_1" value="" size="30">
	<input placeholder="Номер телефона" type="text" class="inputtext number" name="form_text_2" value="" size="11">
	<input class="free-record-button" type="submit" name="web_form_submit" value="Записаться на прием">
	<span class="free-record-text">Мы позвоним Вам в течении для<br />и уточним все детали</span>
</div>
