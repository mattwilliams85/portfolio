$(document).ready(function(){
  $('.landing-sect span').fadeIn(8000);

  $('.p1').on('click', function(){
    $('.icon-box').show();
    if ($(this).hasClass('active')) return;
    $('.connect').addClass('active');
    $('.p1').addClass('extend');
    $('.p2, .p4').addClass('shutter');
    $('.p3').addClass('clear extend');
  });

  $('.p2').on('click', function(){
    if ($(this).hasClass('active') || $(this).hasClass('clear')) return;
    $('.about-box').fadeIn();
    $('.myface').hide();
    setTimeout(function(){
      $('.myface').show(); 
    }, 700);
    var id = parseInt($(this).attr('id'));
    shutterPanels(id);
  });

  $('.p3').on('click', function(){
    if ($(this).hasClass('active') || $(this).hasClass('clear')) return;
    $('.clouds').hide();
    var id = parseInt($(this).attr('id'));
    $(this).addClass('extend');
    shutterPanels(id);
  });

  $('.p4').on('click', function(){
    if ($(this).hasClass('active')) return;
    $('.stack').show();
    $('.p3').addClass('shutter');
    $('.p1').addClass('retract');
    $('.p2').addClass('clear');
  });

  $('.panel').on('click', function(){
    if ($(this).hasClass('start') || $(this).hasClass('clear')) return;
    if ($('.panel').hasClass('active')) {
      returnPanels();
    } else {
      $(this).toggleClass('active');
    }
  });

  $('.logo').on('click', function(){
    if ($('.p1, .p2, .p3, .p4').hasClass('shutter')) {
      returnPanels();
    } else {
      $('.p3').addClass('start');
      $('.clouds.inverse').fadeIn();
      shutterPanels(0);
    }
  });

  $('.box').mouseover(function(){
   if ($(this).find('.badge').css('transform') !== 'none') return;
    $(this).addClass('move');
  });

  $('.box').mouseleave(function(){
    if ($(this).find('.badge').css('transform') === 'none') return;
    $(this).removeClass('move');
  });

  function shutterPanels(id) {
    hideClouds();
    if (!id) $('.landing-sect').removeClass('shutter');
    var n = id;
    for (var i = 0; i < 4; i++) {
      n += 1;
      if (n === 5) n = 1;
      if (n === id) continue;
      $('#'+n).addClass('shutter');
    }
  }

  function hideClouds() {
    setTimeout(function(){
      $('clouds').hide();
    },300);
  }

  function returnPanels() {
    $('.clouds').fadeIn();
    $('.clouds.inverse, .stack, .about-box, .icon-box').hide();
    $('.landing-sect').addClass('shutter');
    $('section').removeClass('active');
    for (var i = 1; i < 5; i++) {
      $('#'+i).removeClass('shutter clear extend retract start active');
    }
  }
});