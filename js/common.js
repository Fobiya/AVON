$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(500).fadeOut('slow');
});


function set(obj) {var id=obj.title; $('.pacet').val(id);}
function setbtn(obj) {var id=obj.title; $('.pacet').val("Кнопка: " + id);}


 



"use strict";
$(function() {
    $(".youtube").each(function() {
        // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
        $(this).css('background-image', '');

        // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
        $(this).append($('<div/>', {'class': 'play'}));

        $(document).delegate('#'+this.id, 'click', function() {
            // создаем iframe со включенной опцией autoplay
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() })

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).replaceWith(iframe);
        });
    });
 });

 


//
//// Cache selectors
//var lastId,
//    topMenu = $("#top-menu"),
//    topMenuHeight = topMenu.outerHeight()+15,
//    // All list items
//    menuItems = topMenu.find("a"),
//    // Anchors corresponding to menu items
//    scrollItems = menuItems.map(function(){
//      var item = $($(this).attr("href"));
//      if (item.length) { return item; }
//    });
//
//// Bind click handler to menu items
//// so we can get a fancy scroll animation
//menuItems.click(function(e){
//  var href = $(this).attr("href"),
//      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
//  $('html, body').stop().animate({ 
//      scrollTop: offsetTop
//  }, 300);
//  e.preventDefault();
//});
//
//// Bind to scroll
//$(window).scroll(function(){
//   // Get container scroll position
//   var fromTop = $(this).scrollTop()+topMenuHeight;
//   
//   // Get id of current scroll item
//   var cur = scrollItems.map(function(){
//     if ($(this).offset().top < fromTop)
//       return this;
//   });
//   // Get the id of the current element
//   cur = cur[cur.length-1];
//   var id = cur && cur.length ? cur[0].id : "";
//   
//   if (lastId !== id) {
//       lastId = id;
//       // Set/remove active class
//       menuItems
//         .parent().removeClass("active")
//         .end().filter("[href='#"+id+"']").parent().addClass("active");
//   }                   
//});
//        
// 



//Форма отправки 2.0 //
$(function() {
    $("[name=send]").click(function () {
        $(":input.error").removeClass('error');
        $(".allert").remove();
        
        var error;
        var btn = $(this);
        var ref = btn.closest('form').find('[required]');
        var msg = btn.closest('form').find('input');
        var send_btn = btn.closest('form').find('[name=send]');
        var send_options = btn.closest('form').find('[name=campaign_token]');

        $(ref).each(function() {
            if ($(this).val() == '') {
                var errorfield = $(this);
                $(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></div>');
                error = 1;
                $(":input.error:first").focus();
                return;
            } else {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if ($(this).attr("type") == 'email') {
                    if(!pattern.test($(this).val())) {
                        $("[name=email]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
                var patterntel = /^()[0-9]{9,18}/i;
                if ( $(this).attr("type") == 'tel') {
                    if(!patterntel.test($(this).val())) {
                        $("[name=phone]").val('');
                        $(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-circle" aria-hidden="true"></i></div>');
                        error = 1;
                        $(":input.error:first").focus();
                    }
                }
            }
        });
        if(!(error==1)) {
            $(send_btn).each(function() {
                $(this).attr('disabled', true);
            });
            $(send_options).each(function() {
                if ($(this).val() == '') {
                    $.ajax({
                        type: 'POST',
                        url: 'mail.php',
                        data: msg,
                        success: function() {
                            $('form').trigger("reset");
                            setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
                            // Настройки модального окна после удачной отправки
                            $('div.md-show').removeClass('md-show');
                            $("#call_ok")[0].click();
                        },
                        error: function(xhr, str) {
                            alert('Возникла ошибка: ' + xhr.responseCode);
                        }
                    });
                } else {
                    $.ajax({
                        type: 'POST',
                        url: 'mail.php',
                        data: msg,
                        success:
                            $.ajax({
                                type: 'POST',
                                url: 'https://app.getresponse.com/add_subscriber.html',
                                data: msg,
                                statusCode: {0:function() {
                                    $('form').trigger("reset");
                                    setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
                                    // Настройки модального окна после удачной отправки
                                    $('div.md-show').removeClass('md-show');
                                    $("#call_ok")[0].click();
                                }}
                            }),
                        error:  function(xhr, str) {
                            alert('Возникла ошибка: ' + xhr.responseCode);
                        }
                    });
                }
            });
        }
        return false;
    })
});


//// SLIDER    ----------------------->
//
//
//$('.slider').each(function() {
//  var $this = $(this);
//  var $group = $this.find('.slide_group');
//  var $slides = $this.find('.slide');
//  var bulletArray = [];
//  var currentIndex = 0;
//  var timeout;
//  
//  function move(newIndex) {
//    var animateLeft, slideLeft;
//    
//    advance();
//    
//    if ($group.is(':animated') || currentIndex === newIndex) {
//      return;
//    }
//    
//    bulletArray[currentIndex].removeClass('active');
//    bulletArray[newIndex].addClass('active');
//    
//    if (newIndex > currentIndex) {
//      slideLeft = '100%';
//      animateLeft = '-100%';
//    } else {
//      slideLeft = '-100%';
//      animateLeft = '100%';
//    }
//    
//    $slides.eq(newIndex).css({
//      display: 'block',
//      left: slideLeft
//    });
//    $group.animate({
//      left: animateLeft
//    }, function() {
//      $slides.eq(currentIndex).css({
//        display: 'none'
//      });
//      $slides.eq(newIndex).css({
//        left: 0
//      });
//      $group.css({
//        left: 0
//      });
//      currentIndex = newIndex;
//    });
//  }
//  
//  function advance() {
//    clearTimeout(timeout);
//    timeout = setTimeout(function() {
//      if (currentIndex < ($slides.length - 1)) {
//        move(currentIndex + 1);
//      } else {
//        move(0);
//      }
//    }, 4000);
//  }
//  
//  $('.next_btn').on('click', function() {
//    if (currentIndex < ($slides.length - 1)) {
//      move(currentIndex + 1);
//    } else {
//      move(0);
//    }
//  });
//  
//  $('.previous_btn').on('click', function() {
//    if (currentIndex !== 0) {
//      move(currentIndex - 1);
//    } else {
//      move(3);
//    }
//  });
//  
//  $.each($slides, function(index) {
//    var $button = $('<a class="slide_btn">&bull;</a>');
//    
//    if (index === currentIndex) {
//      $button.addClass('active');
//    }
//    $button.on('click', function() {
//      move(index);
//    }).appendTo('.slide_buttons');
//    bulletArray.push($button);
//  });
//  
//  advance();
//});


//  CARUSELKA

  $(document).ready(function() {

      var owl = $("#owl-demo");

      owl.owlCarousel({
        navigation : true,
        singleItem : true,
        transitionStyle : "fade"
      });

      //Select Transtion Type
      $("#transitionType").change(function(){
        var newValue = $(this).val();

        //TransitionTypes is owlCarousel inner method.
        owl.data("owlCarousel").transitionTypes(newValue);

        //After change type go to next slide
        owl.trigger("owl.next");
      });
    });




