$(function () {
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
      $(".menu-list").toggleClass("hidden");
      $(this).toggleClass("hidden");
  });

  $("#close-btn").on("click", function () {
    $(".menu-list").addClass("hidden");
    $("#menu-btn").removeClass("hidden");
  });
});
