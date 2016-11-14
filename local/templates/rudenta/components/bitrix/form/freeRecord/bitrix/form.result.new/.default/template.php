<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<?=$arResult["FORM_HEADER"]?>
<div class="free-record-questions">
	<p><?=$arResult["FORM_DESCRIPTION"]?></p>
	<?if ($arResult["isFormErrors"] == "Y"):?>
		<div class="error">
			Пожалуйста, заполните все поля
		</div>
	<?endif;?>
	<input placeholder="Имя" type="text" class="inputtext" name="form_text_1" value="" size="30"> <br/>
	<input placeholder="Номер телефона" type="text" class="inputtext" name="form_text_2" value="" size="11"> <br/>
	<input class="free-record-button" type="submit" name="web_form_submit" value="Записаться на прием">
	<p class="free-record-text">
		Бесплатная консультация проводится только при записи через сайт
	</p>
</div>
