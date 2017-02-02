<?php
$servs = Service::getActiveServiceWithCnt();
$usl = (int)$_GET['usl'];
?>
<div class="topics">
		<div class="title">Темы</div>
		<div class="linksBlock">
	    <a href="/articles"><span>Все темы (<?=$servs['ALL_CNT']?>)</span></a>
	    <?foreach($servs['SERVICE'] as $serv_id => $serv_info):?>
	        <?if($usl == $serv_id):?>
	            <a class="active" href="/articles/?usl=<?=$serv_id?>"><span><?=$serv_info['NAME']?> (<?=$serv_info['CNT']?>)</span></a>
	        <?else:?>
	            <a href="/articles/?usl=<?=$serv_id?>"><span><?=$serv_info['NAME']?> (<?=$serv_info['CNT']?>)</span></a>
	        <?endif;?>
	    <?endforeach;?>
    </div>
</div>

