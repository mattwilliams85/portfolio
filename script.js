$(document).ready(function(){
  $('.p1').on('click', function(){
    $('.connect').addClass('active');
    $('.p1').addClass('extend');
    $('.p2, .p4').addClass('shutter');
    $('.p3').addClass('clear extend');
  });

  $('.p2').on('click', function(){
    var id = parseInt($(this).attr('id'));
    shutterPanels(id);
  });

  $('.p3').on('click', function(){
    var id = parseInt($(this).attr('id'));
    $(this).addClass('extend');
    shutterPanels(id);
  });

  $('.p4').on('click', function(){
    $('.p3').addClass('shutter');
    $('.p1').addClass('retract');
    $('.p2').addClass('clear');
  });

  $('.panel').on('click', function(){
    if ($('.panel').hasClass('start')) return;
    if ($('.panel').hasClass('active')) {
      returnPanels();
    } else {
      $(this).toggleClass('active');
    }
  });

  $('.logo').on('click', function(){
    $('.logo').off('mouseover mouseleave')
    if ($('.p1, .p2, .p3, .p4').hasClass('shutter')) {
      returnPanels();
    } else {
      $('.p3').addClass('start');
      shutterPanels(0);
    }
  });

  $('.logo').mouseover(fadeIn);
  $('.logo').mouseleave(fadeOut);

  function fadeIn() {
    $('.landing-sect span').stop();
    $('.landing-sect span').fadeIn(3000);
  }

  function fadeOut() {
    $('.landing-sect span').stop();
    $('.landing-sect span').fadeOut(3000);
  }

  function shutterPanels(id) {
    if (!id) $('.landing-sect').removeClass('shutter');
    var n = id;
    for (var i = 0; i < 4; i++) {
      n += 1;
      if (n === 5) n = 1;
      if (n === id) continue;
      $('#'+n).addClass('shutter');
    }
  }

  function returnPanels() {
    $('.landing-sect').addClass('shutter');
    $('section').removeClass('active');
    for (var i = 1; i < 5; i++) {
      $('#'+i).removeClass('shutter clear extend retract start active')
    }
  }
});