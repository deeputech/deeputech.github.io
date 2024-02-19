jQuery(document).ready(function ($) {
  //fix for stupid ie object cover
  if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    jQuery(".featured-box-img-cover").each(function () {
      var t = jQuery(this),
        s = "url(" + t.attr("src") + ")",
        p = t.parent(),
        d = jQuery("<div></div>");

      p.append(d);
      d.css({
        height: "290",
        "background-size": "cover",
        "background-repeat": "no-repeat",
        "background-position": "50% 20%",
        "background-image": s,
      });
      t.hide();
    });
  }

  $(".navbar button.navbar-toggler").on("click", function () {
    $("div#navbarMediumish").toggleClass("collapse");
  });

  // alertbar later
  // $(document).scroll(function () {
  //   var y = $(this).scrollTop();
  //   if (y > 280) {
  //     $(".alertbar").show();
  //   } else {
  //     $(".alertbar").hide();
  //   }
  // });

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $("nav").outerHeight();

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $("nav").removeClass("nav-down").addClass("nav-up");
      $(".nav-up").css("top", -$("nav").outerHeight() + "px");
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $("nav").removeClass("nav-up").addClass("nav-down");
        $(".nav-up, .nav-down").css("top", "0px");
      }
    }

    lastScrollTop = st;
  }

  $(".site-content").css("margin-top", $("header").outerHeight() + "px");

  // spoilers
  $(document).on("click", ".spoiler", function () {
    $(this).removeClass("spoiler");
  });
});

// deferred style loading
var loadDeferredStyles = function () {
  var addStylesNode = document.getElementById("deferred-styles");
  var replacement = document.createElement("div");
  replacement.innerHTML = addStylesNode.textContent;
  document.body.appendChild(replacement);
  addStylesNode.parentElement.removeChild(addStylesNode);
};
var raf =
  window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (raf)
  raf(function () {
    window.setTimeout(loadDeferredStyles, 0);
  });
else window.addEventListener("load", loadDeferredStyles);
