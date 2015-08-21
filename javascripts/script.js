$(document).ready(function(){

  var modalText = {
    roambi: {
      header: 'Roambi.com',
      color: '#FF8FBD',
      detail: 'Visual data and analytics for big business.',
      bullets: ['Wordpress','Visual Analytics','Hubspot Integration']
    },
    walker: {
      header: 'WalkerTracker',
      color: '#81FFCC',
      detail: 'Fitness Tracking for big business.',
      bullets: ['Device Integration','Visual Analytics','Gamification']
    },
    powur: {
      header: 'Powur.com',
      color: '#8BE7FF',
      detail: 'Solar Panel MLM Platform.',
      bullets: ['Rails App','Visual Analytics','Team Tree Management']
    },
    mystand: {
      header: 'MyStand',
      color: '#FF4E4E',
      detail: 'Social Media charity platform',
      bullets: ['Social Networking','Media Sharing','Gamfication']
    },
    never: {
      header: 'NeverSurrender',
      color: '#FFD2E0',
      detail: 'ALS foundation website.',
      bullets: ['Single Page App','Visual Effects','Mobile Device Support']
    },
  }

  $(document).foundation();
  jQuery('.scrollbar-outer').scrollbar();

  function initCarousel() {
    var slidesToShow = 3;
    if ($(window).width() < 650) slidesToShow = 1;
    $('.projects').show();
    $('.carousel').slick({
      centerMode: true,
      infinite: true,
      slidesToShow: slidesToShow,
      dotsCount: 4,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      // dots: true,
      arrows: false,
      focusOnSelect: true,
      speed: 700
    });
    $('.carousel').slick('slickPlay');
  }

  function destroyCarousel() {
    if (!$('.projects').is(":visible")) return;
    $('.carousel').slick('unslick');
    $('.projects').hide();
  }

  $(window).resize(function(){
    if(!$('.projects').hasClass('active') || $(window).width() > 650) return;
    destroyCarousel()
    initCarousel();
  })

  var dragging;

  $('.slide-img').mousedown(function(){
    dragging = false;
    setTimeout(function(){
      dragging = true;
    },100)
  });

  $('.slide-img').mouseup(function(){
    if (!$(this).parent().is('.slick-current')) return;
    var id = $(this).attr('id');
    if (!dragging) {
      fillModal(id);
      $('#modal').foundation('reveal', 'open');
      $('.carousel').slick('slickPause');
    }
  })

  function fillModal(id) {
    $('#modal').find('.header').text(modalText[id].header)
                               .css('color',modalText[id].color)
    $('#modal').find('.detail').text(modalText[id].detail)

    $.each($('#modal').find('li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index])
    });
    $('.modal-img').attr('src','images/logos/'+ id + '-full.jpg')
  }

  $('.slide-img').click(function(){
    $('.carousel').slick('slickPause');
  })

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
    if ($(this).is('.active, .clear, .start')) return;
    // $('.clouds').hide();
    $('.projects').show();
    $('.projects').addClass('active');
    initCarousel();
    var id = parseInt($(this).attr('id'));
    $(this).addClass('extend');
    shutterPanels(id)
  });

  $('.p4').on('click', function(){
    if ($(this).hasClass('active')) return;
    $('.stack').show();
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
    $('.clouds.inverse, .stack, .about-box').hide();
    setTimeout(function(){ destroyCarousel(); },300)
    $('.landing-sect').addClass('shutter');
    $('section').removeClass('active');
    for (var i = 1; i < 5; i++) {
      $('#'+i).removeClass('shutter clear extend retract start active');
    }
  }
});