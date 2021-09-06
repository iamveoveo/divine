$(document).ready(function(){

/*-------------------------AUTOCOMPLETE-------------------------*/

    var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme",
        "Ha Noi",
        "Ho Chi Minh"
    ];
    $('input[name="search"]').autocomplete({
        source: availableTags
    });

/*-------------------------LOGIN-----------------------*/

    var logged = false;

    $('.btn-log-in').click(function(){    
        
        var validEmail = $('#input-email').val() == "user@test.com";
        var validPassword = $('#input-password').val() == "user123456";
    
        if(validEmail == true && validPassword ==true){
            window.location.replace("index.html");     
        }else{
            $('.alert').find('.input-group').css("display", "block");
        }
    })

    $('#btn-login-mini').click(function(){    
        
        var validEmail = $('#input-email-login').val() == "user@test.com";
        var validPassword = $('#input-password-login').val() == "user123456";
    
        if(validEmail == true && validPassword ==true){
            logged = true;
            $('#mini-profile-login').show();
            $('.mini-login').hide();     
            $('#button-cart-redirect').attr('data-bs-toggle','');
            $('#button-cart-redirect').attr('data-bs-target','');   
            $('.high-line-container').css("height", "321");
            $('.high-line-container').empty();
        }else{
            alert("Mật khẩu hoặc tên đăng nhập không đúng. Vui lòng thử lại!");
        }
    })

/*------------------SHOW PRODUCT DETAIL----------------*/
    
    $('.item-content').click(function(){
        $('.item-content').css({"width":"100%", "background":"#f7f7f7"});
        var img_width = $(this).children(":first").css("width");
        $(this).css({"width":"104%", "background":"#fff"});
        $(this).children(":first").css("width",img_width);
        $('.item-text-detail').text($(this).find('.item-text').text());
        var href = $(this).find('.a-item-text').attr("href");
        $('.open-item').children("a").attr("href", href);
        var this_img = $(this).find("img").attr("src");
        $('.item-detail').find("img").attr("src", this_img);
    })
    
/*--------------------SIDE BAR ACTIVE-----------------*/
    
    $('#sidebarCollapse').click(function(){
        $('#sidebar').addClass("active");
        $('.overlay').addClass("active");
    })
    
    $('#dismiss').click(function(){
        $('#sidebar').removeClass("active");
        $('.overlay').removeClass("active");
    })

    $('.overlay').click(function(){
        $('#sidebar').removeClass("active");
        $('.overlay').removeClass("active");
    })

/*---------------------RANGE PRICE-------------------*/
    
    var min;
    var max;

    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 2000000,
        values:[0,2000000],
        slide: function(event, ui){
            min = ui.values[0];
            max = ui.values[1];
            $('#min-p').val(min.toLocaleString());
            $('#max-p').val(max.toLocaleString());
        }
    })

    $('#button-search').click(function(){
        $('.cur-p').each(function(){
            var price_current0 = $(this).text().replace(',','');
            var price_current1 = price_current0.replace(',','');
            var price_current = price_current1.replace('đ','');
            if(price_current > max || price_current < min){
                $(this).closest('.col-6').addClass("hidden-product");
            }else{
                $(this).closest('.col-6').removeClass("hidden-product");
            }
        })
        var total_product = $("#service > .col-6").length;
        var hidden_product = $("#service > .hidden-product").length;
        $('#number_of_products').text(total_product - hidden_product);
        $('#status').text("(Đã sử dụng bộ lọc)").css("color","greenyellow");
        if(total_product == hidden_product){
            $('.no-result').addClass("active");
        }else{
            $('.no-result').removeClass("active");
        }
    })

    $('.ui-slider-handle').css({"border-radius":"50%","background-color":"#79ccff"});
    $('.ui-slider-range').css("background-color","#1da1f2")

/*----------------------MULTIPLE SLIDER-------------*/
	
    $('.multiple-items').slick({
		infinite: true,
        centerMode: true,
        autoplay: true,
        autoplaySpeed: 2000,
		slidesToShow: 4,
		slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 993,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                autoplay:true,
                autoplaySpeed: 2000
              }
            }
        ]
	});
	
	$('.slick-arrow').text("");
	$('.slick-prev').append("<i></i>");
	$(".slick-prev").children(":first").addClass("fas fa-chevron-left");
	$('.slick-next').append("<i></i>");
	$(".slick-next").children(":first").addClass("fas fa-chevron-right");

    $('.sp-slider-small').slick({
		infinite: true,
        autoplay: true,
        autoplaySpeed: 300,
		slidesToShow: 5,
		slidesToScroll: 1
	});
    $('.sp-slider-big').slick();

/*--------------------------AUTO PLAY WHEN SCROLL-------------------*/

    var playVideo = true;

    $('#momo-video').click(function(){
        playVideo = false;
    })

    $(window).scroll(function(){
        var videoOffSet = $('#momo-video').offset();
        if(window.pageYOffset >= videoOffSet.top - 300){
            if(playVideo == true){
                $('#momo-video').get(0).play();
            }
        }else{
                $('#momo-video').get(0).pause();
        }
    })

/*-------------------------MINES AND PLUS BUTTON---------------------*/

    $('.mines').click(function(){
        if($('#input-quantity').val() <= 1){
            $('#input-quantity').val(1);
        }else{
            $('#input-quantity').val(parseInt($('#input-quantity').val()) - 1);
        }
    })

    $('.plus').click(function(){
            $('#input-quantity').val(parseInt($('#input-quantity').val()) + 1);
    })

    $('#button-cart-redirect').attr('data-bs-toggle','modal');
    $('#button-cart-redirect').attr('data-bs-target','#modal-mini-login');  

    $('#button-cart-redirect').click(function(){
        if(logged == false){
            $('.account-content').show();
            $('.momo-quick').hide();
            showInModal('#mini-register-tab', '#mini-login-tab', '#mini-register-content', '#mini-login-content');
        }else{
            alert("Mua thành công");
        }
    })

    $('#button-cart').click(function(){
        
        let b = $('.title-detail-product').find('.fontSize-title');
        var card_title = b.html();
        var card_title_text = b.text().toString();

        let c = $('.price');
        var card_text = c.html();
        
        var amount0 = parseInt($('#input-quantity').val());
        var numberOfItens = amount0;
        var amount = parseInt($('.quantity').text());

        $('.quantity').text(amount + amount0);

        $('#no_product').hide();

        $('.name-item').each(function(){
            let a = $(this).text().toString();
            if(a == card_title_text){
                amount0 = parseInt($(this).closest("tr").find('.number-of-items').text().substring(10)) + amount0;
                $(this).closest("tr").remove();
            }
        })
        
        $("tbody").append("<tr></tr>");
        $("tbody").children(":last").html(sample_row);

        $("tbody").children(":last").find('.name-item').html(card_title);
        $("tbody").children(":last").find('.price-item').html(card_text);
        $("tbody").children(":last").find('.number-of-items').html("Số lượng: " + amount0);        
        
        var price0 = $("tbody").children(":last").find('.price-item').text();
        var price1 = price0.replace(',','');
        var price2 = price1.replace(',','');
        var price = parseInt(price2.replace('đ',''));

        var total0 = $('#total-payable').text().replace(',','');
        var total1 = total0.replace(',','');
        var total = parseInt(total1.replace('đ',''));
        total = total + (price * numberOfItens);

        $('#total-payable').text(total.toLocaleString() + "đ");
    })

/*---------------------------MODAL-------------------------*/

    $('#open_login_mini').click(function(){
        $('.account-content').show();
        $('.momo-quick').hide();
        showInModal('#mini-register-tab', '#mini-login-tab', '#mini-register-content', '#mini-login-content');
    })

    $('.open_register_mini').click(function(){
        $('.account-content').show();
        $('.momo-quick').hide();
        showInModal('#mini-login-tab', '#mini-register-tab', '#mini-login-content', '#mini-register-content');
    })

    $('.item-btn').attr('data-bs-toggle','modal');
    $('.item-btn').attr('data-bs-target','#modal-mini-login');

    $('.item-btn').click(function(){
        let a = $(this).closest('.card').find("a");
        var card_img_link = a.attr("href");
        var card_img = a.html();

        let b = $(this).closest('.card-body').children(":first");
        var card_title_link = b.attr("href");
        var card_title = b.html();
        
        let c = $(this).closest('.card-body').find('.card-text');
        var card_text = c.html();

        $('.momo-payment-product-detail').children(":first").html(card_img);        
        $('.momo-payment-product-detail').children(":first").attr("href", card_img_link);        
        $('.momo-payment-product-detail').children("a:last").html(card_title);
        $('.momo-payment-product-detail').children("a:last").attr("href", card_title_link);
        $('.momo-payment-product-detail').find('.card-text').html(card_text);

        if(logged == false){
            $('.account-content').hide();
            $('.momo-quick').show();
            showInModal('#mini-register-tab', '#mini-login-tab', '#mini-register-content', '#mini-login-content')
        }else{
            $('.account-content').show();
            $('.momo-quick').show();
            $('.container-fluid').children(":first").children(":last").hide();
        }
    })

/*---------------------------CART ADD----------------------------*/

    var item_btn_a = $('.item-btn-a').find("a");
    var sample_row = $('#sample-row').html();

    $(item_btn_a).click(function(){

        var amount = 1;

        let b = $(this).closest('.card-body').children(":first");
        var card_title = b.html();
        var card_title_text = b.text();

        let c = $(this).closest('.card-body').find('.cur-p');
        var card_text = c.html();

        $('#no_product').hide();

        $('.name-item').each(function(){
            let a = $(this).text();
            if(a == card_title_text){
                amount = parseInt($(this).closest("tr").find('.number-of-items').text().substring(10)) + 1;
                $(this).closest("tr").remove();
            }
        })

        $('.quantity').text(parseInt($('.quantity').text())+1);
        
        $("tbody").append("<tr></tr>");
        $("tbody").children(":last").html(sample_row);

        $("tbody").children(":last").find('.name-item').html(card_title);
        $("tbody").children(":last").find('.price-item').html(card_text);
        $("tbody").children(":last").find('.number-of-items').html("Số lượng: " + amount);        
        
        var price0 = $("tbody").children(":last").find('.price-item').text();
        var price1 = price0.replace(',','');
        var price2 = price1.replace(',','');
        var price = parseInt(price2.replace('đ',''));

        var total0 = $('#total-payable').text().replace(',','');
        var total1 = total0.replace(',','');
        var total = parseInt(total1.replace('đ',''));
        total = total + price;

        $('#total-payable').text(total.toLocaleString() + "đ");
    })

/*----------------------------TAKE PICTURE-------------------------*/

    $('.prev-img').click(function(){
        $('.click_show_slide').html($(this).html());
        $('.prev-img').removeClass("active");
        $(this).addClass("active");
    })

/*---------------------------LOGIN-------------------------------*/

    $('#login').validate();    

    $('#register').validate({
        rules: {
            email: {
                required: true,
                email: true,
            },
            username: {
                required: true,
            },
            password: {
                required: true,
                minlength: 8
            },
            password_confirm: {
                required: true,
                minlength: 8,
                equalTo: "#input-password"
            },
            terms: "required"
        },
        messages: {
            email: {
                required: "Nhâp địa chỉ Email của bạn",
                minlength: "Nhập địa chỉ Email có hiệu lực"
            },
            username: {
                required: "Nhập tên tài khoản mà bạn mong muốn",
            },
            password: {
                required: "Nhập mật khẩu của bạn",
                minlength: jQuery.validator.format("Mật khẩu gồm ít nhất {0} ký tự")
            },
            password_confirm: {
                required: "Nhập lại mật khẩu của bạn",
                minlength: jQuery.validator.format("Mật khẩu gồm ít nhất {0} ký tự"),
                equalTo: "Mật khẩu chưa khớp"
            },
            terms: "Đọc kĩ vào tích vào ô trên"
        },
        submitHandler: function() {
            alert("Đăng ký thành công");
            window.location.replace("index.html");
        }
    })

})

/*---------------------------MY FUNCTION---------------------------*/
function showContentWithPrice(price){
    $('#max_p_50').hide();
    $('#max_p_100').hide();
    $('#max_p_200').hide();
    $('#max_p_500').hide();
    $(price).show()
}

function loadMoreContent(btn_load_more, content_load_more){
    $(content_load_more).toggle(100);
    if($(btn_load_more).text() == "Tải thêm sản phẩm"){
        $(btn_load_more).text("ẩn bớt sản phẩm");
    }else{
        $(btn_load_more).text("Tải thêm sản phẩm");
    }
}

function loadMoreComment(btn_load_more, content_load_more){
    $(content_load_more).children('.hidden-product').toggle();
    if($(btn_load_more).text() == "Xem thêm bình luận"){
        $(btn_load_more).text("ẩn bớt bình luận");
    }else{
        $(btn_load_more).text("Xem thêm bình luận");
    }
}

function showInModal(remove_prev, show_next, remove_prev_content, show_next_content){
    $(remove_prev).removeClass("active");
    $(remove_prev).attr("aria-selected", "false");
    $(remove_prev_content).removeClass("show active");
    
    $(show_next).addClass("active");
    $(show_next).attr("aria-selected", "true");
    $(show_next_content).addClass("show active");
}

function removeCartClick(current_remove){
    let current_amount = parseInt($(current_remove).closest("tr").find('.number-of-items').text().substring(10));
    let quantity = parseInt($('.quantity').text()) - current_amount;
    
    $('.quantity').text(quantity);
    $(current_remove).closest("tr").remove();
    
    var price0 = $(current_remove).closest("tr").find('.price-item').text();
    var price1 = price0.replace(',','');
    var price2 = price1.replace(',','');
    var price = parseInt(price2.replace('đ',''));

    var total0 = $('#total-payable').text().replace(',','');
    var total1 = total0.replace(',','');
    var total = parseInt(total1.replace('đ',''));
    total = total - (price * current_amount);

    $('#total-payable').text(total.toLocaleString() + "đ");
    
    let table_lemght = $("tbody> tr").length;
    if(table_lemght <= 1){
        $('#no_product').show();
        $('#total-payable').text("0,000đ");
    }
}
