    $(document).ready(function () {
      // Activate Carousel
      $("#post-carousel").carousel();

      // Enable Carousel Indicators
      $("#carousel_1slide").click(function () {
        $("#post-carousel").carousel(0);
      });
      $("#carousel_2slide").click(function () {
        $("#post-carousel").carousel(1);
      });
      $("#carousel_3slide").click(function () {
        $("#post-carousel").carousel(2);
      });
      $("#carousel_4slide").click(function () {
        $("#post-carousel").carousel(3);
      });
      $("#carousel_5slide").click(function () {
        $("#post-carousel").carousel(4);
      });

      // Enable Carousel Controls
      $(".left").click(function () {
        $("#post-carousel").carousel("prev");
      });
      $(".right").click(function () {
        $("#post-carousel").carousel("next");
      });
    });