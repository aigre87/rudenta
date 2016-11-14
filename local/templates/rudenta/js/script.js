$(document).ready(function(){
    $('.fancybox').fancybox();

    $( "input[name*='form_text_2']" ).mask('9(999)999-99-99');

    var free_record_name;
    var free_record_phone;

    $('.free-record-button').on('click',function(){
        var flag = false;
        var $inputs = $(".free-record-questions input[type='text']");
        $inputs.each(function(){
           var $this = $(this);
            $this.css("border","1px solid red");
            if( !$this.val() ){
                $this.css("border","1px solid red");
                flag = true;
            }else{
                $this.css("border","none");
            }
        });
        if(flag){return false;}
    });
});