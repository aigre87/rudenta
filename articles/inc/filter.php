<?php
$servs = Service::getAllServices();
$usl = (int)$_GET['usl'];
?>
<div class="topics">
    <a href="/articles">Все темы</a>
    <?foreach($servs as $serv_id => $serv_name):?>
        <?if($usl == $serv_id):?>
            <a class="active" href="/articles/?usl=<?=$serv_id?>"><?=$serv_name?></a>
        <?else:?>
            <a href="/articles/?usl=<?=$serv_id?>"><?=$serv_name?></a>
        <?endif;?>
    <?endforeach;?>
</div>

