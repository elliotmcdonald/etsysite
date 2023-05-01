$(document).ready(function () {
  const artworksSection = $("#artworks-section");
  const menuLinks = $("nav a");
  const carouselElements = $(".product-card");
  const etsyButton = $(".open-etsy");

  $(window).on("scroll", function () {
    const scrollPosition = $(window).scrollTop();
    const windowHeight = $(window).height();
    const artworksSectionTop = artworksSection.offset().top;

    // Calculate the progress of scrolling
    const progress = Math.min(
      Math.max(
        (scrollPosition - artworksSectionTop + windowHeight) / windowHeight,
        0
      ),
      1
    );

    // Calculate the new background color and text color based on the progress
    const bgColorValue = 255 * progress;
    const textColorValue = 255 - bgColorValue;
    const newBgColor = `rgb(${bgColorValue}, ${bgColorValue}, ${bgColorValue})`;
    const newTextColor = `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`;

    // Set the new background color and text color
    artworksSection.css("background-color", newBgColor);
    artworksSection.find("*").css("color", newTextColor);

    // Update menu link colors
    menuLinks.css("color", newTextColor);

    // Update menu link hover color
    const hoverColorValue = 255 - textColorValue;
    const newHoverColor = `rgb(${hoverColorValue}, ${hoverColorValue}, ${hoverColorValue})`;
    menuLinks.hover(
      function () {
        $(this).css("color", newHoverColor);
      },
      function () {
        $(this).css("color", newTextColor);
      }
    );

    // Update carousel element colors
    carouselElements.css("background-color", newBgColor);
    carouselElements.css("color", newTextColor);
    $(".product-card img").css(
      "opacity",
      0 + 0.8 * progress
    ); // Set the image opacity based on the progress

    // Update Etsy button colors
    etsyButton.css("color", newTextColor);
    etsyButton.css("border-color", newTextColor);
    etsyButton.hover(
      function () {
        $(this).css("color", newBgColor);
        $(this).css("background-color", newTextColor);
      },
      function () {
        $(this).css("color", newTextColor);
        $(this).css("background-color", "transparent");
      }
    );
  });

  // Scroll to artworks section smoothly when the shop button is clicked
  $("a[href='#artworks-section']").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        1000,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});
