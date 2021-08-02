$(function () {
  $(window).scroll(function () {
    var height = $(window).scrollTop();

    if ($(window).width() > 1024) {
      if (height === 0) {
        $('nav').show();
      } else if (height > 95) {
        $('nav').hide();
      }
    }

    if (height <= 1000) {
      $('#back-top').addClass('fadeOutRight');
      $('#back-top').removeClass('fadeInRight');
    } else if (height > 1000) {
      $('#back-top').removeClass('hidden');
      $('#back-top').addClass('fadeInRight');
      $('#back-top').removeClass('fadeOutRight');
    }

  });

  $("#back-top").click(function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })

  $("#lang-btn").on("click", function () {
    $(".lang").toggleClass("hidden");
  });

  $(document).on("click", function (e) {
    if (e.target.id !== "lang-btn") {
      $(".lang").addClass("hidden");
    }
  });

  // MENU CLICK EVENT
  $("#menu-btn").on("click", function () {
    $(this).hide();
    $("#close-btn").show();
    $('.menu-list').removeClass('hidden');
    $(".menu-list").removeClass("slideOutLeft");
    $(".menu-list").addClass("slideInLeft");
  });

  $("#close-btn").on("click", function () {
    $(this).hide();
    $("#menu-btn").show();
    // $(".menu-list").removeClass("slideInLeft");
    // $('.menu-list').addClass('hidden');
    $(".menu-list").addClass("slideOutLeft");
  });
});
