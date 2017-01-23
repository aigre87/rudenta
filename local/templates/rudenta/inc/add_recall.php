<?php
$doctors = Doctors::getAllDoc();
$services = Service::getAllServices();
?>
<form action="#">
    <h3 class="title">Написать отзыв</h3>
    <div class="row">
        <input type="text" name="name" placeholder="Ваше имя">
        <input type="text" name="city" placeholder="Ваш город">
    </div>
    <div class="row">
        <div class="fieldName">Ваш пол:</div>
        <input name="sex" type="radio" id="male" value="1"><label for="male">Муж.</label>
        <input name="sex" type="radio" id="female" value="2"><label for="female">Жен.</label>
    </div>
    <div class="row">
        <div class="fieldName">Оценка</div>
        <select name="point">
            <option value="1">5 Баллов</option>
            <option value="2">4 Балла</option>
            <option value="3">3 Балла</option>
            <option value="4">2 Балла</option>
            <option value="5">1 Балл</option>
        </select>
    </div>
    <div class="row">
        <div class="fieldName">Врач</div>
        <select name="doc">
            <option value=""></option>
            <?foreach($doctors as $doctor):?>
                <option value="<?=$doctor['ID']?>"><?=$doctor['NAME']?></option>
            <?endforeach;?>
        </select>
    </div>
    <div class="row">
        <div class="fieldName">Услуга</div>
        <select name="usl">
            <option value=""></option>
            <?foreach($services as $id => $name):?>
                <option value="<?=$id?>"><?=$name?></option>
            <?endforeach;?>
        </select>
    </div>
    <div class="row">
        <div class="fieldName">Отзыв</div>
        <textarea name="recallText"></textarea>
    </div>
    <input type="submit" value="Отправить">
</form>