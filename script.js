$(document).ready(function(){
  $('.p1').on('click', function(){
    $('.p1').addClass('extend')
    $('.p2, .p4').addClass('shutter')
    $('.p3').addClass('clear extend')
  });

  $('.p2').on('click', function(){
    var id = parseInt($(this).attr('id'));
    shutterPanels(id);
  });

  $('.p3').on('click', function(){
    var id = parseInt($(this).attr('id'));
    $(this).addClass('extend')
    shutterPanels(id);
  });

  $('.p4').on('click', function(){
    $('.p3').addClass('shutter')
    $('.p1').addClass('retract')
    $('.p2').addClass('clear')
  });

  $('.logo').on('click', function(){
    returnPanels();
  });


  function shutterPanels(id) {
    var n = id;
    for (var i = 0; i < 4; i++) {
      n += 1;
      if (n === 5) n = 1;
      if (n === id) continue;
      $('#'+n).addClass('shutter');
    }
  }

  function returnPanels() {
    for (var i = 1; i < 5; i++) {
      $('#'+i).removeClass('shutter clear extend retract')
    }
  }
});