$(document).ready(function(){

  $(document).foundation();

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
      bullets: ['Node.js on Sails','Social Media & Networking','Crowd-funding']
    },
    never: {
      header: 'NeverSurrender',
      detail: 'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS.',
      bullets: ['Pure Javascript','Parallax Effects','Fluid Design']
    },
  };

  //CAROUSEL
  var slider = $('#projects-carousel');
  var windowWidth = $(window).width();

  function initCarousel() {
    var slidesToShow = 3;
    if (windowWidth < 800) slidesToShow = 2;
    if (windowWidth < 650) slidesToShow = 1;
    $('.projects').show();
    $(slider).slick({
      centerMode: true,
      infinite: true,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      dotsCount: 4,
      arrows: false,
      focusOnSelect: true,
      speed: 700,
    });
  }

  function destroyCarousel() {
    if (!$('.projects').is(":visible")) return;
    $(slider).slick('unslick');
    $('.projects').hide();
  }

  $(window).resize(function(){
    if(!$('.projects').hasClass('active') || 
       windowWidth === $(window).width()) return;
    windowWidth = $(window).width();
    destroyCarousel();
    initCarousel();
  });

  $('#slick-prev').click(function(){
    $(slider).slick('slickPrev');
  });

  $('#slick-next').click(function(){
    $(slider).slick('slickNext');
  });

  $('.slide-wrap').mouseover(function(){
    if (!$(this).parent().is('.slick-current')) return;
    $(this).find('.top').css('transform','scale(0.6,0.6) translateY(-20%)');
  });

  $('.slide-wrap').mouseleave(function(){
   $(this).find('.top').css('transform','scale(1,1) translateY(0%)');
  });

  //MODAL
  $('.modaler').click(function(){
    if (!$(this).parent().parent().is('.slick-current')) return;
    $('.top').css('transform','scale(1,1) translateY(0%)');
    $('#modal').foundation('reveal', 'open');
    fillModal(this.id);
  });

  $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
    $('#modal-carousel').slick({
      adaptiveHeight: true,
      arrows: true,
      prevArrow: '<i class="fa fa-chevron-left"></i>',
      nextArrow: '<i class="fa fa-chevron-right"></i>'
    });
    $('#modal-carousel').css('height','100%');
  });

  $(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
    $('#modal-carousel').css('height','1px');
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

  //BADGES
  $('.box').mouseover(function(){
   if ($(this).find('.badge').css('transform') !== 'none') return;
    $(this).addClass('move');
  });

  $('.box').mouseleave(function(){
    if ($(this).find('.badge').css('transform') === 'none') return;
    $(this).removeClass('move');
  });

  //PANE TRANSITIONS
  $('.landing-sect span').css('opacity','1');

  $('.p1').on('click', function(){
    if ($(this).hasClass('active')) return;
    $('.icon-box').show();
    $('.icon').addClass('pop-in');
    $('.connect').addClass('active');
    $('.p1').addClass('extend');
    $('.p2, .p4').addClass('shutter');
    $('.p3').addClass('clear extend');
  });

  $('.p2').on('click', function(){
    if ($(this).is('.active, .clear')) return;
    $('.about-box').fadeIn();
    $('.myface').hide();
    setTimeout(function(){
      $('.myface').show(); 
    }, 700);
    shutterPanels(this.id);
  });

  $('.p3').on('click', function(){
    if ($(this).is('.active, .clear, .start')) return;
    $(this).addClass('extend');
    $('.projects').show();
    $('.projects').addClass('active');
    initCarousel();
    shutterPanels(this.id);
  });

  $('.p4').on('click', function(){
    if ($(this).hasClass('active')) return;
    $('.box').show();
    $('.p1').addClass('retract');
    $('.p2').addClass('clear');
    $('.p3').addClass('shutter');
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

  function shutterPanels(id) {
    id = parseInt(id);
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
    $('.pane').removeClass('shutter clear extend retract start active');
  }
});