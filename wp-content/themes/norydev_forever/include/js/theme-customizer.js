/**
 * Theme customization according to user's settings
 */
 
/**
 * This file adds some LIVE to the Theme Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and 
 * then make any necessary changes to the page using jQuery.
 */
(function (jQuery) {
	'use strict';
	// Update the site title in real time...
	wp.customize('blogname', function (value) {
		value.bind(function (newval) {
			jQuery('#site-title a').html(newval);
		});
	});
	
	//Update the site description in real time...
	wp.customize('blogdescription', function (value) {
		value.bind(function (newval) {
			jQuery('.site-description').html(newval);
		});
	});
	
	//Update site main color in real time...
	wp.customize('main_color', function (value) {
		value.bind(function (newval) {
			jQuery('a').css('color', newval);
			jQuery('.the-couple h2').css('color', newval);
			jQuery('.ct-color-text').css('color', newval);
			jQuery('.event-infos h3').css('color', newval);
			jQuery('form h2').css('color', newval);
			jQuery('.archives_title').css('color', newval);
			jQuery('.comments-title').css('color', newval);
			jQuery('.comments-reply-title').css('color', newval);
			jQuery('.post-title').css('color', newval);
			jQuery('.widgettitle').css('color', newval);
			jQuery('.post-content h1').css('color', newval);
			jQuery('.post-content h2').css('color', newval);
			jQuery('.post-content h3').css('color', newval);
			jQuery('.post-content h4').css('color', newval);
			jQuery('.post-content h5').css('color', newval);
			jQuery('.post-content h6').css('color', newval);
			jQuery('.diplayguest').css('color', newval);
			
			jQuery('.post-content blockquote').css('background-color', newval);
			jQuery('.top_link').css('background-color', newval);
			jQuery('a.mybutton').css('background-color', newval);
			jQuery('input[type="submit"]').css('background-color', newval);
			jQuery('button').css('background-color', newval);
			jQuery('input[type="button"]').css('background-color', newval);
			jQuery('input[type="reset"]').css('background-color', newval);
			jQuery('.pagination-links a').css('background-color', newval);
			jQuery('.pagination-single a').css('background-color', newval);
			jQuery('.couple-socials a').css('background-color', newval);
			jQuery('.ct_values').css('background-color', newval);
			jQuery('.event-infos ul').css('background-color', newval);
			jQuery('.infos-summary').css('background-color', newval);
			jQuery('.ml-inside').css('background-color', newval);
			jQuery('.comment-content').css('background-color', newval);
			
			jQuery('.ml-outside').css('border-bottom-color', newval);
			
			jQuery('.ml-outside').css('border-top-color', newval);
			
			jQuery('.post-content blockquote').after(function () { jQuery(this).css('border-left-color', newval); });
			jQuery('.sticky-logo').css('border-left-color', newval);
			
			jQuery('.comment-content').after(function () { jQuery(this).css('border-right-color', newval); });
			
		});
	});
	
	//Update navigation bar color in real time...
	wp.customize('secondary_color', function (value) {
		value.bind(function (newval) {
			
			jQuery('a.mybutton').css('color', newval);
			jQuery('a.mybutton').hover(function () { jQuery(this).css('color', newval); });
			jQuery('.pagination-single a').css('color', newval);
			jQuery('.pagination-single a').hover(function () { jQuery(this).css('color', newval); });
			
			jQuery('.pagination-links a').css('color', newval);
			jQuery('.pagination-links a').hover(function () { jQuery(this).css('color', newval); });
			jQuery('.post-content blockquote').css('color', newval);
			jQuery('.comment-content').css('color', newval);
			jQuery('.sticky-logo').before(function () { jQuery(this).css('color', newval); });
			jQuery('.comment-content cite a').css('color', newval);
			jQuery('.couple-socials a').css('color', newval);
			jQuery('.couple-socials a').hover(function () { jQuery(this).css('color', newval); });
			jQuery('.ct_values').css('color', newval);
			jQuery('.event-infos').css('color', newval);
			jQuery('.infos-summary').css('color', newval);
			
			jQuery('.event-infos h3').css('background-color', newval);
			jQuery('.event-button-box').css('background-color', newval);
			jQuery('form[id*="rsvp-form"]').css('background-color', newval);
			
			jQuery('.top_link').after(function () { jQuery(this).css('border-bottom-color', newval); });
			
		});
	});
	
	//Update navigation bar color in real time...
	wp.customize('subtitle_color', function (value) {
		value.bind(function (newval) {
			jQuery('.post-subtitle').css('color', newval);
			jQuery('.the-couple h3').css('color', newval);
		});
	});
	
	//Update navigation bar color in real time...
	wp.customize('text_color', function (value) {
		value.bind(function (newval) {
			jQuery('.post-wrap').css('color', newval);
			jQuery('a').hover(function () { jQuery(this).css('color', newval); });
			
			jQuery('.couple-socials a').hover(function () { jQuery(this).css('background-color', newval); });
		});
	});
	
	//Update navigation bar color in real time...
	wp.customize('nav_footer_color', function (value) {
		value.bind(function (newval) {
			jQuery('.main-footer').css('background-color', newval);
			jQuery('.main-menu ul li a').css('background-color', newval);
			jQuery('.mobile-nav .main-menu a').css('background-color', newval);
			jQuery('#navigation').css('background-color', newval);
		});
	});
	
	//Update navigation bar color in real time...
	wp.customize('navlinks_color', function (value) {
		value.bind(function (newval) {
			jQuery('.main-menu li a ').css('color', newval);
		});
	});
	
	//Update navigation bar color in real time...
	wp.customize('navlinkshover_color', function (value) {
		value.bind(function (newval) {
			jQuery('#navigation a').hover(function () { jQuery(this).css('color', newval); });
		});
	});
	
	//Update navigation bar color in real time...
	wp.customize('footer_text_color', function (value) {
		value.bind(function (newval) {
			jQuery('.footer-widgets ').css('color', newval);
		});
	});
	
})(jQuery);