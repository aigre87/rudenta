<?php
$servs = Service::getAllServices();
$usl = (int)$_GET['usl'];
?>
<div class="topics">
		<div class="title">Темы</div>
		<div class="linksBlock">
	    <a href="/articles"><span>Все темы</span></a>
	    <?foreach($servs as $serv_id => $serv_name):?>
	        <?if($usl == $serv_id):?>
	            <a class="active" href="/articles/?usl=<?=$serv_id?>"><span><?=$serv_name?></span></a>
	        <?else:?>
	            <a href="/articles/?usl=<?=$serv_id?>"><span><?=$serv_name?></span></a>
	        <?endif;?>
	    <?endforeach;?>
    </div>
</div>

