$.scrollTo = $.fn.scrollTo = function(x, y, options){
  if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

  options = $.extend({}, {
    gap: {
      x: 0,
      y: 0
    },
    animation: {
      easing: 'swing',
      duration: 600,
      complete: $.noop,
      step: $.noop
    }
  }, options);

  return this.each(function(){
    var elem = $(this);
    elem.stop().animate({
      scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
      scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
    }, options.animation);
  });
};


$(document).ready(function(){
  $(".owl-carousel").owlCarousel({items:1,loop:true,})
  $(window).scroll(function(){
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).height(); // get the height of the window
    var docHeight = $(document).height();

    for (var i=0; i < aArray.length; i++) {
      var theID = aArray[i];
      var divPos = $(theID).offset().top; // get the offset of the div from the top of page
      var divHeight = $(theID).height(); // get the height of the div in question
      if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
        $("a[href='" + theID + "']").addClass("active");
      } else {
        $("a[href='" + theID + "']").removeClass("active");
      }
    }
    var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
    var div_top = $('#nav-anchor').offset().top;
    if (window_top > div_top) {
      $('.menu nav').addClass('stick');
    } else {
      $('.menu nav').removeClass('stick');
    }
  });

  $(".menu nav li.here a, .buy-now").click(function(evn){
    var el = this;
    evn.preventDefault();
    $('html,body').scrollTo(el.hash, el.hash, {
      animation: {
        complete: function(){
          location.hash = el.hash;
        }
      }
    });
  });

  var aChildren = $(".menu nav li.here").children(); // find the a children of the list items
  var aArray = []; // create the empty aArray
  for (var i=0; i < aChildren.length; i++) {
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    aArray.push(ahref);
  } // this for loop fills the aArray with attribute href values


});
//Code stolen from css-tricks for smooth scrolling:

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  $( "#tabs" ).tabs();
});
function showDate()
{
  var now = new Date();
  var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
  var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number)
  {
    return (number < 1000) ? number + 1900 : number;
  }

  tnow=new Date();
  thour=now.getHours();
  tmin=now.getMinutes();
  tsec=now.getSeconds();

  if (tmin<=9) { tmin="0"+tmin; }
  if (tsec<=9) { tsec="0"+tsec; }
  if (thour<10) { thour="0"+thour; }

  today = days[now.getDay()] + ", " + date + " " + months[now.getMonth()] + ", " + (fourdigits(now.getYear())) + " - " + thour + ":" + tmin +":"+ tsec;
  document.getElementById("dateDiv").innerHTML = today;
}
setInterval("showDate()", 1000);

$(function() {

  var contador = 1;
  $('.menu_bar').click(function(e){

    if(contador == 1){
      contador = 0;
      $('nav').animate({ right: '0'});
      $('.bt-menu').addClass("active");
    } else {
      contador = 1;
      $('nav').animate({
        right: '-250px'
      });
      $('.bt-menu').removeClass("active");
    }
  });
});


//google.maps.event.addDomListener(window, 'load', init);

function init() {
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 15,
    scrollwheel: false,

    // The latitude and longitude to center the map (always required)
    center: new google.maps.LatLng(-34.606596, -58.41068), // Centro Cultural Konex

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles:

    [
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#1A2024"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f1f1f1"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.government",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "hue": "#1A2024"
          }
        ]
      },
      {
        "featureType": "poi.government",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "hue": "#1A2024"
          }

        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#1A2024"
          },
          {
            "visibility": "on"
          }
        ]
      }
    ]

  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using our element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);

  // Let's also add a marker while we're at it
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(-34.606596, -58.41068),
    map: map,
    title: 'Konex',
    icon: 'images/back-home.svg'
  });
}
