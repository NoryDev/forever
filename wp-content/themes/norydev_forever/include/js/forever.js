/**
 * Different animations in javascript, requires jquery 
 */

//The isEmail function is Licensed under a Creative Commons Attribution-ShareAlike 2.5 License by Ross Kendall.
//http://rosskendall.com/files/rfc822validemail.js.txt
function isEmail(email) {
    'use strict';
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
}

//validate rsvp form values
function validate(formid) {
    'use strict';

    var attends = jQuery("#widget-" + formid + "-attend_yes"),
        events = jQuery("#widget-" + formid + "-events_check"),
        minOneCB = jQuery('#' + formid + ' input:checkbox').is(':checked'),

        CName = jQuery("#widget-" + formid + "-name"),
        CEmail = jQuery("#widget-" + formid + "-email");

    CName.tipsy({trigger: 'manual', title: 'data-tipsy', offset: 1});
    CEmail.tipsy({trigger: 'manual', title: 'data-tipsy', offset: 1});
    events.tipsy({trigger: 'manual', title: 'data-tipsy', offset: 5});

    events.tipsy("hide");
    CName.tipsy("hide");
    CEmail.tipsy("hide");

    jQuery(document).on('click', function (event) {
        if (!jQuery(event.target).closest('.rsvp-submit').length) {
            events.tipsy("hide");
            CName.tipsy("hide");
            CEmail.tipsy("hide");
        }
    });

    if (attends.is(':checked') && !minOneCB) {
        events.tipsy("show");
        return false;
    }

    if (CName.val() === '') {
        CName.tipsy("show");
        return false;
    }

    if (CEmail.val() === '' || !isEmail(CEmail.val())) {
        CEmail.tipsy("show");
        return false;
    }
}

(function (jQuery) {
    'use strict';
    //debounce
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments,
                later = function () {
                    timeout = null;
                    if (!immediate) { func.apply(context, args); }
                },
                callNow = immediate && !timeout;
            
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) { func.apply(context, args); }
        };
    }

    //For header slider pictures on home page
    function slidersize() {
        var slider_li = document.getElementsByClassName("header-slider-li"),
            i;
        for (i = 0; i < slider_li.length; ++i) {

            var li_id = "li" + jQuery(slider_li[i]).data("imgid"),
                this_pic = jQuery(slider_li[i]).data("src"),
                this_pic_css = "url(" + this_pic + ")";

            jQuery('.' + li_id).css({"background-image": this_pic_css});
        }
    }

    //Slideshow fader fct
    (function (jQuery) {
        jQuery.fn.simplestSlideShow = function (settings) {
            var config = {
                'timeOut': 3000,
                'speed': 'normal'
            };
            if (settings) { jQuery.extend(config, settings); }
            this.each(function () {
                var $elem = jQuery(this);
                $elem.children(':gt(0)').hide();
                setInterval(function () {
                    $elem.children().eq(0).fadeOut(config['speed'])
                        .next().fadeIn(config['speed'])
                        .end().appendTo($elem);
                }, config['timeOut']);
            });
            return this;
        };
    })(jQuery);


    //countdown fct
    function CountDown(target_date, countdown, ct_days_div, ct_hours_div, ct_minutes_div, ct_seconds_div) {

        // variables for time units
        var days, hours, minutes, seconds;

        // update the tag with id "countdown" every 1 second
        setInterval(function () {

            var days_string = '', hours_string = '', minutes_string = '', seconds_string = '',
                current_date = new Date().getTime(),
                seconds_left = (target_date - current_date) / 1000;

            if (seconds_left < 0) {
                jQuery('.ct-not-yet').css("display", "none");
                jQuery('.ct-done').css("display", "block");
            }

            // do some time calculations
            var days = parseInt(Math.abs(seconds_left / 86400));
            seconds_left = Math.abs(seconds_left % 86400);

            var hours = parseInt(Math.abs(seconds_left / 3600));
            seconds_left = Math.abs(seconds_left % 3600);

            var minutes = parseInt(Math.abs(seconds_left / 60)),
                seconds = parseInt(Math.abs(seconds_left % 60));

            // format countdown string + set tag value
            days_string = "<span class='ct_days'>" + days + "</span>";
            hours_string = "<span class='ct_hours'>" + hours + "</span>";
            minutes_string = "<span class='ct_minutes'>" + minutes + "</span>";
            seconds_string = "<span class='ct_seconds'>" + seconds + "</span>";

            ct_days_div.innerHTML = days_string;
            ct_hours_div.innerHTML = hours_string;
            ct_minutes_div.innerHTML = minutes_string;
            ct_seconds_div.innerHTML = seconds_string;

        }, 1000);
    }

    //Loading Google Maps
    function Gmapsinitialize(pageid, coordinates, mapzoom) {

        var latlngStr = coordinates.split(",", 2),
            lat = parseFloat(latlngStr[0]),
            lng = parseFloat(latlngStr[1]),

            myLatlng = new google.maps.LatLng(lat, lng),
            mapOptions = {
                scrollwheel: false,
                zoom: parseInt(mapzoom),
                center: myLatlng
            },
            map = new google.maps.Map(document.getElementById('event' + pageid + '-gmaps'), mapOptions),

            infowindow = new google.maps.InfoWindow(),
            geocoder = new google.maps.Geocoder();
        
        geocoder.geocode({'latLng': myLatlng}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map
                    });
                    infowindow.setContent('<span style="margin: 5px 10px; line-height: 150%; color: #000;">' + results[0].formatted_address + '</span>');
                    infowindow.open(map, marker);
                }
            }
        });

    }

    //Display Google Map when visible on screen
    function Gmaps_visible(pageid, coordinates, mapzoom) {

        var isvisible = jQuery("#event" + pageid + "-gmaps").visible(true),
            map_div = jQuery('#event' + pageid + '-gmaps');

        if (isvisible && map_div.data("coordinates")) {

            Gmapsinitialize(pageid, coordinates, mapzoom);
            map_div.data("coordinates", false);
        }

    }

    //Pages Background: parallax
    function parallax(this_page) {

        var docViewTop = jQuery(window).scrollTop(),
            docViewBottom = docViewTop + jQuery(window).height(),

            elemTop = jQuery('.nd_page_' + this_page).offset().top,
            elemBottom = elemTop + jQuery('.nd_page_' + this_page).height(),

            this_pos = "50% " + (((docViewTop - elemTop) * -0.2)) + "px";
        jQuery('.nd_page_' + this_page).css("background-position", this_pos);
    }

    jQuery(document).ready(function (jQuery) {

        'use strict';
        //gremlins
        //var horde = gremlins.createHorde()
        //horde.unleash();

        //magic popup
        var magic = jQuery('#magic').data("magic");
        if (magic !== 'off') {
            jQuery('.post-content').magnificPopup({
                delegate: 'a:has(img)', // child items selector, by clicking on it popup will open
                type: 'image',
                retina: {
                    ratio: function () { return window.devicePixelRatio === 1.5 ? 1.5 : 2  }, // Increase this number to enable retina image support.
                    // Image in popup will be scaled down by this number.
                    // Option can also be a function which should return a number (in case you support multiple ratios). For example:
                    // ratio: function () { return window.devicePixelRatio === 1.5 ? 1.5 : 2  }

                    replaceSrc: function (item, ratio) {
                        return item.src.replace(/\.\w+$/, function (m) { return '@2x' + m; });
                    } // function that changes image source
                }
            });

            jQuery('.data-orbit').each(function () { // the containers for all your galleries
                jQuery(this).magnificPopup({
                    delegate: 'li a', // the selector for gallery item
                    type: 'image',
                    gallery: {
                        enabled:true
                    }
                });
            }); 
        }
        //call slideshow fader
        slidersize();
        jQuery('.header-slider-li').fadeIn(1000);
        jQuery('.header-slider-ul').simplestSlideShow({'timeOut': 5000, 'speed': 1000});

        /**
         * CountDown
         */
        // get tag element
        var countdown = document.getElementsByClassName("countdown"),
            ct_days = document.getElementsByClassName("ct-days"),
            ct_hours = document.getElementsByClassName("ct-hours"),
            ct_minutes = document.getElementsByClassName("ct-minutes"),
            ct_seconds = document.getElementsByClassName("ct-seconds"),
            i;

        for (i = 0; i < countdown.length; ++i) {
            var mydate = jQuery(countdown[i]).data("date"),

            // set the date we're counting down to
                target_ct = new Date(mydate).getTime();
            CountDown(target_ct, countdown[i], ct_days[i], ct_hours[i], ct_minutes[i], ct_seconds[i]);
        }

        //Menu display
        var winwidth = window.innerWidth,
            homewidth = jQuery('#nav-home').width(),
            menuwidth = jQuery('#navigation .main-menu').width();
        if (winwidth > 880 && (menuwidth + homewidth + 4) < winwidth) {
            jQuery('#navigation').removeClass("mobile-nav");
            jQuery('.main-menu').css('display', 'inline-block');
            jQuery('li.home-link').css('display', 'none');
        } else {
            jQuery('#navigation').addClass("mobile-nav");
            jQuery('.main-menu').css('display', 'none');
            jQuery('li.home-link').css('display', 'block');
        }

        //mobile navigation
        jQuery('.main-menu').attr('aria-expanded', 'false');
        jQuery('#mobile-menu-logo').on('click', function () {
            jQuery('.main-menu').toggle();

            var isexpended = jQuery('#mobile-menu-logo').attr('aria-expanded');
            if (isexpended === true) {
                jQuery('.main-menu').attr('aria-expanded', 'false');
                jQuery('#mobile-menu-logo').attr('aria-expanded', 'false');
            } else {
                jQuery('.main-menu').attr('aria-expanded', 'true');
                jQuery('#mobile-menu-logo').attr('aria-expanded', 'true');
            }
        });

        //nav menu stick top of page
        var slideHeight = jQuery('#header-slider').height();

        //Top Button
        jQuery('body').append('<a href="#navigation" class="top_link" title="Back to Top"></a>');

        //make top button appear when necessary
        var posScroll = jQuery(document).scrollTop();
        if (posScroll >= (slideHeight + 150)) {
            jQuery('.top_link').fadeIn(600);
        } else {
            jQuery('.top_link').fadeOut(600);
        }

        //Smooth scroll
        jQuery('a[href^="#"]').on('click', function (e) {
            e.preventDefault();

            var target = this.hash,
                jQuerytarget = jQuery(target);

            jQuery('html, body').stop().animate({
                'scrollTop': jQuerytarget.offset().top
            }, 900, 'swing', function () {
                window.location.hash = target;
            });
        });

        /**
         * Load gmaps, requires jquery.visible.min.js
         */
        var maps = document.getElementsByClassName("event-gmaps");
        for (i = 0; i < maps.length; ++i) {
            var this_page = jQuery(maps[i]).data("pageid"),
                this_map = jQuery(maps[i]).data("coordinates"),
                this_zoom = jQuery(maps[i]).data("zoom");
            Gmaps_visible(this_page, this_map, this_zoom);
        }
        
        //RSVP Form: options visibility
        jQuery('.nd_radio input[type=radio]:checked').each(
            function() {
                if(jQuery(this).val() == "Yes") {
                    jQuery('.rsvp-options').show();
                } else {
                    jQuery('.rsvp-options').hide();
                }
            } 
        );
        
        jQuery('.nd_radio input:radio').change(function(){
            if (jQuery(this).val() == "Yes") {
                jQuery('.rsvp-options').show();
            } else {
                jQuery('.rsvp-options').hide();
            }
        });

    });

    jQuery(window).resize(debounce(function () {

        //Menu display
        var winwidth = window.innerWidth,
            homewidth = jQuery('#nav-home').width(),
            menuwidth = jQuery('#navigation .main-menu').width();

        if (winwidth > 880 && (menuwidth + homewidth + 4) < winwidth) {
            jQuery('#navigation').removeClass("mobile-nav");
            jQuery('.main-menu').css('display', 'inline-block');
            jQuery('li.home-link').css('display', 'none');
        } else {
            jQuery('#navigation').addClass("mobile-nav");
            jQuery('.main-menu').css('display', 'none');
            jQuery('li.home-link').css('display', 'block');
        }
    }, 200));

    jQuery(window).scroll(function () {

        //nav menu stick top of page
        var slideHeight = jQuery('#header-slider').height(),

        //make top button appear when necessary
            posScroll = jQuery(document).scrollTop();
        if (posScroll >= (slideHeight + 150)) {
            jQuery('.top_link').fadeIn(600);
        } else {
            jQuery('.top_link').fadeOut(600);
        }

        /**
         * Load gmaps, requires jquery.visible.min.js
         */
        var maps = document.getElementsByClassName("event-gmaps"),
            i;
        for (i = 0; i < maps.length; ++i) {
            var this_page = jQuery(maps[i]).data("pageid"),
                this_map = jQuery(maps[i]).data("coordinates"),
                this_zoom = jQuery(maps[i]).data("zoom");
            Gmaps_visible(this_page, this_map, this_zoom);
        }

        //Parallax
        var sections = document.getElementsByClassName("nd_onepage");
        for (i = 0; i < sections.length; ++i) {
            var page_id = jQuery(sections[i]).data("pageid"),
                bg_attach = jQuery(sections[i]).data("bgattach");

            if (bg_attach === 'parallax') {
                parallax(page_id);
            }
        }

    });
})(jQuery);