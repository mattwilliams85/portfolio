$(document).ready(function(){

  var modalText = {
    roambi: {
      header: 'Roambi.com',
      detail: 'Roambi provides analytics, reporting, and business intelligence for companies to use on the go.',
      bullets: ['PHP & Javascript','Wordpress','Hubspot Integration'],
    },
    walker: {
      header: 'WalkerTracker',
      detail: 'Walker Tracker offers goal management, fitness tracking, and team competitions to companies for internal use.',
      bullets: ['Node w/Sails','Gamification','Mobile Integration']
    },
    powur: {
      header: 'Powur.com',
      detail: 'Powur is a multi-level marketing platform for lead generation, recruitment, and team building.',
      bullets: ['Rails App','Visual Analytics','Team Tree Management System']
    },
    mystand: {
      header: 'MyStand',
      detail: 'MyStand is a crowd-funding, media sharing website, that has you donating actions instead of money out of your pocket.',
      bullets: ['Rails App','Social Media & Networking','Crowd-funding']
    },
    never: {
      header: 'NeverSurrender',
      detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS.',
      bullets: ['Pure Javascript','Parallax Effects','Fluid Design']
    },
  };

  $(document).foundation();

  var slider = $('#projects-carousel');

  function initCarousel() {
    var slidesToShow = 3;
    if ($(window).width() < 800) slidesToShow = 2;
    if ($(window).width() < 650) slidesToShow = 1;
    $('.projects').show();
    $(slider).slick({
      centerMode: true,
      infinite: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: false,
      dots: true,
      dotsCount: 4,
      arrows: false,
      focusOnSelect: true,
      pauseOnHover: true,
      speed: 700,
      autoplaySpeed: 2500
    });
    $(slider).slick('slickPlay');
    setTimeout(function(){
      $(slider).slick("slickNext");
    },400);
  }

  function destroyCarousel() {
    if (!$('.projects').is(":visible")) return;
    $(slider).slick('unslick');
    $('.projects').hide();
  }

  var windowWidth = $(window).width();

  $(window).resize(function(){
    if(!$('.projects').hasClass('active') || windowWidth === $(window).width()) return;
    destroyCarousel();
    initCarousel();
  });

  $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
    setTimeout(function(){
      $(slider).slick("slickNext");
    },400);
  });


  $('.modaler').click(function(){
    if (!$(this).parent().parent().is('.slick-current')) return;
    $('.top').css('transform','scale(1,1) translateY(0%)');
    var id = $(this).attr('id');
    $('#modal').foundation('reveal', 'open');
    fillModal(id);
  });


  $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
    $('#modal-carousel').slick({
      adaptiveHeight: true,
      arrows: true,
      prevArrow: '<i class="fa fa-chevron-left"></i>',
      nextArrow: '<i class="fa fa-chevron-right"></i>'
    });
  });

  $('.slide-wrap').mouseover(function(){
    $(slider).slick('slickPause');
  });

  $('.projects').click(function(){
    $(slider).slick('slickPause');
  });

  $('.slide-wrap').mouseover(function(){
    if (!$(this).parent().is('.slick-current')) return;
    $(this).find('.top').css('transform','scale(0.6,0.6) translateY(-20%)');
  });

  $('.slide-wrap').mouseleave(function(){
   $(this).find('.top').css('transform','scale(1,1) translateY(0%)');
  });


  function fillModal(id) {
    if ($('#modal-carousel').is('.slick-initialized')) {
      $('#modal-carousel').slick('unslick');
    }
    $('#modal').find('.header').text(modalText[id].header);

    $('#modal').find('.detail').text(modalText[id].detail);

    $.each($('#modal').find('li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal').find('.slide'), function(index, value) {
      $(this).children('img').attr('src', 'images/slides/' + id + '-' + index + '.jpg');
    });
    
  }

  $('.landing-sect span').css('opacity','1');

  $('.p1').on('click', function(){
    $('.icon-box').show();
    if ($(this).hasClass('active')) return;
    $('.connect').addClass('active');
    $('.p1').addClass('extend');

    $('.p2, .p4').addClass('shutter');
    $('.p3').addClass('clear extend');
    $('.icon').addClass('pop-in');
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
    if ($(this).is('.active, .clear, .start')) return;
    $('.projects').show();
    $('.projects').addClass('active');
    initCarousel();
    var id = parseInt($(this).attr('id'));
    $(this).addClass('extend');
    shutterPanels(id);
  });

  $('.p4').on('click', function(){
    if ($(this).hasClass('active')) return;
    $('.box').show();
    $('.p3').addClass('shutter');
    $('.p1').addClass('retract');
    $('.p2').addClass('clear');
  });

  $('.pane').on('click', function(){
    if ($(this).hasClass('start') || $(this).hasClass('clear')) return;
    if ($('.pane').hasClass('active')) {
      returnPanels();
    } else {
      $(this).toggleClass('active');
    }
  });

  $('.logo').on('click', function(){
    $(this).removeClass('shake');
    if ($('.p1, .p2, .p3, .p4').hasClass('shutter')) {
      returnPanels();
    } else {
      $('.p3').addClass('start');
      $('.clouds.inverse').fadeIn(300);
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
    $('.clouds.inverse, .box').hide();

    setTimeout(function(){ 
      $('.about-box').hide();
      $('.icon').removeClass('pop-in');
      destroyCarousel(); 
    },300);
    $('.landing-sect').addClass('shutter');
    $('section').removeClass('active');

    for (var i = 1; i < 5; i++) {
      $('#'+i).removeClass('shutter clear extend retract start active');
    }
  }
});