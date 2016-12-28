<?php
$doctors = Doctors::getAllDoc();
$services = Service::getAllServices();
?>
<form action="#">
    <input type="text" name="name" placeholder="Ваше имя">
    <input type="text" name="city" placeholder="Ваш город">
    <p><b>Ваш пол:</b><Br>
    <input name="sex" type="radio" value="1"> Муж.
    <input name="sex" type="radio" value="2"> Жен.
    <br/>
    <label for="point">Оценка</label>
    <select name="point">
        <option value="1">5 Баллов</option>
        <option value="2">4 Балла</option>
        <option value="3">3 Балла</option>
        <option value="4">2 Балла</option>
        <option value="5">1 Балл</option>
    </select>
    <label for="doc">Врач</label>
    <select name="doc">
        <option value=""></option>
        <?foreach($doctors as $doctor):?>
            <option value="<?=$doctor['ID']?>"><?=$doctor['NAME']?></option>
        <?endforeach;?>
    </select>
    <label for="usl">Услуга</label>
    <select name="usl">
        <option value=""></option>
        <?foreach($services as $id => $name):?>
            <option value="<?=$id?>"><?=$name?></option>
        <?endforeach;?>
    </select>
</form>