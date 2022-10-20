$(document).ready(function () {
    function createOrder(image, price, attr){
        var html = "";
        html+= 
        `<div class="cart-item siparis">
            <div class="left">
               <div class="cart-image">
                  <div class="image-wrapper"><img src="${image}" class="image order-ia"></div>
               </div>
            </div>
            <div class="right">
               <div class="name">${name}</div>
               <div class="price">$<span class="for-total-price">${price}</span></div>
               <div class="count">
                  <div class="button left-btnmbr" yok=${attr} price=${price}>&lt;</div>
                  <div class="number miktar">1</div>
                  <div class="button right-btnmbr" price=${price}>&gt;</div>
               </div>
            </div>
        </div>`
        return html;
    }
    function createOrderAction(image, price, attr){
        $('.car-item-order').prepend(createOrder(image, price, attr));
        var total = 0;
        console.log("test")
        $('.for-total-price').each(function(){
          total += Number($(this).text());
          var yazdir = total.toFixed(2)
          $('.total-amunthh').text('$'+yazdir);
        });
        $(".right-btnmbr").click(function(e){
            e.stopImmediatePropagation();
            var miktarText = $(this).parent().children('.miktar');
            var numberOfMiktarText = Number(miktarText.text());
            miktarText.text(numberOfMiktarText + 1);
            console.log(numberOfMiktarText)
            console.log(miktarText.text())
            var totalPrice = $(this).parent('.count').parent('.right').children('.price').children('.for-total-price');
            var price = $(this).attr("price");
            var totalMiktarPrice = (Number(price)*Number(miktarText.text())).toFixed(2);
            totalPrice.text(totalMiktarPrice);
            
            var total = 0;
            $('.for-total-price').each(function(){
                total += Number($(this).text());
                var yazdir = total.toFixed(2)
                $('.total-amunthh').text('$'+yazdir);
            });
        });
        $(".left-btnmbr").click(function(e){
            e.stopImmediatePropagation();
            var miktarText = $(this).parent('.count').children('.miktar');
            if(miktarText.text() == "1"){
                $(this).parent('.count').parent('.right').parent('.cart-item').remove();
                var overid = $(this).attr("yok")
                var changeAble = $(".add-to-card-button[yok=" + overid + "]");
                changeAble.html('<p>ADD TO CART</p>');
                changeAble.css('width', '');
            } else{
                
                var numberOfMiktarText = Number(miktarText.text());
                miktarText.text(--numberOfMiktarText);
                var totalPrice = $(this).parent('.count').parent('.right').children('.price').children('.for-total-price');
                var price = $(this).attr("price");
                var totalMiktarPrice = (Number(price)*Number(miktarText.text())).toFixed(2);
                totalPrice.text(totalMiktarPrice);

                var total = 0;
                $('.for-total-price').each(function(){
                  total += Number($(this).text());
                  var yazdir = total.toFixed(2)
                  $('.total-amunthh').text('$'+yazdir);
                });
            }
        });
    }
    $('.add-to-card-button').click(function(){
        var checkInside = $(this).children('p').html()
        if(checkInside == "ADD TO CART"){
            $(this).css('width', '46px');
            $(this).html(`<div class="cover"> <div class="check"> </div> </div>`);
            
            var priceNot = $(this).parent('.bottom-area').children('.price').html();
            var price = priceNot.substring(1, priceNot.length)
            var name = $(this).parent('.bottom-area').parent('.item-block').children('.name').html();
            var image = $(this).parent('.bottom-area').parent('.item-block').children('.image-area').children('.image').attr('src');
            var attr = $(this).attr("yok");
            createOrderAction(image, price, attr);
        }
    });
    $('.sepet-container').click(function(){
        $('.main-container').css('display', 'none');
        $('.cart-container').css('display', 'block');
    });
    $('.first-goback-button').click(function(){
        $('.main-container').css('display', 'block');
        $('.cart-container').css('display', 'none');
    });
    $('.pay-button').click(function(){
         if($('.siparis').length == 0){

         } else{
                 $('.cart-container').css('display', 'none');
                 $('.confirm-container').css('display', 'block');
                 setTimeout(function () {
                     $('.loader-gif').css('display', 'none');
                     var idtext = Math.floor((Math.random() * 99999999999) + 10000000000);
                     $('.id-text').text("ORDER ID:" + ' ' + idtext);
                     $('.confirm-containers').fadeIn();
                     setTimeout(function(){
                         $('.wrapper').css('display', 'none');
                         setTimeout(function () {
                             location.reload();
                         },50)
                     },2000)
                 },2000)
         }
    });
});


