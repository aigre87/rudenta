$(document).ready(function(){
    $('.button_recall').click(function(e){
        e.preventDefault();

        var name = $("input[name='name']").val();
        var city = $("input[name='city']").val();
        var email = $("input[name='email']").val();
        var sex = $("input[name='sex']").val();
        var point = $("select[name='point']").val();
        var doc = $("select[name='doc']").val();
        var usl = $("select[name='usl']").val();
        var recallText = $("textarea[name='recallText']").val();

        $.ajax({
            url: "add_recall.php",
            type: "POST",
            dataType: "json",
            data: {name:name, city:city, email: email, sex:sex, point:point, doc:doc, usl:usl, recallText:recallText}
        }).done(function (res) {
            $('.result').text(res).css('color','green');
            $("input[name='name']").val('');
            $("input[name='city']").val('');
            $("input[name='email']").val('');
            $("input[name='sex']").val('');
            $("select[name='point']").val('');
            $("select[name='doc']").val('');
            $("select[name='usl']").val('');
            $("textarea[name='recallText']").val('');
        }).fail(function (res) {
            $('.result').text(res['responseText']).css('color','red');
        });
    });
});