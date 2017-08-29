var IDSapp = {
    init: function () {
        IDSapp.chosenInit();
        IDSapp.imgPreload();
        IDSapp.onepageInit();
        IDSapp.homeColors();
        $('.icon-mouse').on('click', IDSapp.homeDown);
        $('#menu-btn').on('click', IDSapp.showMenu);
        $('#close-btn').on('click', IDSapp.hideMenu);
        $('nav').bind('clickoutside', IDSapp.hideNav);
        $('#menu-links-btn').on('click', IDSapp.showLinks);
        $('#close-links-btn').on('click', IDSapp.hideLinks);
        $('#home .more-btn').on('click', IDSapp.scrollNext);
        IDSapp.rolloverEffect();
        IDSapp.rolloverAction();
        IDSapp.landingFlip();
        if ($('#showcase').length || $('#blog-details').length) {
            IDSapp.stealColor();
        }
        $('.find-us').on('click', IDSapp.sectionDown);
        $('.contact-us').on('click', IDSapp.sectionUp);
        $('.reveal-comments').on('click', IDSapp.showComments);
        $('.tag-btn').on('click', IDSapp.showTags);
        $('.scroll-btn').on('click', IDSapp.scrollElem);
        //IDSapp.mouseMenu();
        IDSapp.linkHover();
        IDSapp.preventMultipleSubmissions();
        IDSapp.submitNewsletterBox();
        IDSapp.landingMenu();
        IDSapp.touchDevice();
    },
    loaded: function () {
        IDSapp.chosenScroll();
        IDSapp.trackingCode($('.section.active').data('name'));
    },
    chosenScroll: function () {
        $('.spane').each(function () {
            $(this).jScrollPane({
                autoReinitialise: true
            });
        });
    },
    chosenInit: function () {
        $('#country').attr('data-placeholder', 'Country').chosen({disable_search_threshold: 10});
        $('#hear').attr('data-placeholder', 'How did you hear about us?').chosen({disable_search_threshold: 10});
    },
    imgPreload: function (img) {
        $(img).fadeIn(600);
    },
    onepageInit: function () {
        var contact = $('#contact #main');
        var opt = {
            sectionContainer: "article",
            easing: "easeInOutExpo",
            animationTime: 800,
            updateURL: false,
            loop: false
        };
        if ($(window).width() > 767 && contact.length) {
            contact.onepage_scroll(opt);
        }
    },
    homeColors: function () {
        var win = $(window);
        var section = $('.section');
        win.on('scroll', function () {
            var winScroll = win.scrollTop();
            if (section.length) {
                if (winScroll < 10) {
                    $('header').addClass('no-bg');
                } else {
                    $('header').removeClass('no-bg');
                }
            }
            section.each(function () {
                var self = $(this);
                var pos = self.offset().top;
                if (pos <= winScroll) {
                    section.removeClass('active');
                    self.addClass('active');
                    IDSapp.getColor($('.section.active').data('bgcolor'));
                    if ($('.section.active div.bg').hasClass('zoom-in') || $('.section.active div.bg').hasClass('zoom-out')) {
                        $('.section.active div.bg').addClass('go');
                    }
                }
            });
        }).trigger('scroll');
    },
    homeDown: function () {
        var self = $(this);
        var par = self.parents('article');
        var next = par.next();
        var pos = next.offset().top;
        $('body, html').animate({scrollTop: pos}, 800, 'easeInOutExpo');
    },
    getColor: function (color) {
        var bgColor = color;
        var bgElems = $('.get-bg');
        var colorElems = $('.get-color, nav ul li a.active');
        var btns = $('#home .btn');
        bgElems.css({'background-color': 'rgb(' + bgColor + ')'});
        colorElems.css({'color': 'rgb(' + bgColor + ')'});
        $('.onepage-pagination li a.active').css({'border-color': 'rgb(' + bgColor + ')'});
    },
    trackingCode: function (elem) {
        ga('send', 'event', 'slider', 'change', elem, {
            nonInteraction: true
        });
    },
    showMenu: function () {
        var self = $(this);
        var header = $('header');
        var nest = $('#menu-nest');
        var menu = $('nav');
        var mW = menu.width();
        var ct = $('.content, header, #bottom');
        var home = $('#home, #services');
        var close_btn = $('#close-btn');
        if (self.hasClass('active')) {
            IDSapp.hideMenu();
        } else {
            header.addClass('open');
            nest.addClass('hide');
            home.addClass('still');
            menu.animate({'right': 0}, 800, 'easeOutExpo', function () {
                menu.addClass('active');
            });
            ct.animate({'left': -mW}, 800, 'easeOutExpo', function () {
                close_btn.addClass('active');
                self.addClass('active');
            });
        }
    },
    hideMenu: function () {
        var self = $(this);
        var header = $('header');
        var nest = $('#menu-nest');
        var menu = $('nav');
        var btn = $('#menu-btn');
        var mW = menu.width();
        var ct = $('.content, header, #bottom');
        var home = $('#home, #services');
        var pager = $('.onepage-pagination');
        self.removeClass('active');
        menu.animate({'right': -mW}, 800, 'easeOutExpo', function () {
            menu.removeClass('active');
        });
        ct.animate({'left': 0}, 800, 'easeOutExpo', function () {
            nest.removeClass('hide');
            home.removeClass('still');
            btn.removeClass('active');
            header.removeClass('open');
        });
        pager.animate({'margin-right': 0}, 800, 'easeOutExpo');
    },
    hideNav: function () {
        var cbtn = $("#close-btn");
        var nest = $('#menu-nest');
        var menu = $('nav');
        var btn = $('#menu-btn');
        var mW = menu.width();
        var ct = $('.content, header, #bottom');
        var home = $('#home, #services');
        var pager = $('.onepage-pagination');
        if (menu.hasClass('active')) {
            $('.tiles-pane').removeClass('hide-bar');
            cbtn.removeClass('active');
            menu.animate({'right': -mW}, 800, 'easeOutExpo', function () {
                menu.removeClass('active');
            });
            ct.animate({'left': 0}, 800, 'easeOutExpo', function () {
                nest.removeClass('hide');
                home.removeClass('still');
                btn.removeClass('active');
            });
            pager.animate({'margin-right': 0}, 800, 'easeOutExpo');
        }
    },
    showLinks: function () {
        var nest = $('#menu-links-nest');
        var links = $('#bottom .links');
        var close_btn = $('#close-links-btn');
        nest.addClass('hide');
        links.slideDown(400, 'easeOutExpo', function () {
            var ot = links.offset().top;
            close_btn.addClass('active');
            $('body, html').animate({scrollTop: ot}, 800, 'easeInOutExpo');
        });
    },
    hideLinks: function () {
        var self = $(this);
        var nest = $('#menu-links-nest');
        var links = $('#bottom .links');
        self.removeClass('active');
        links.slideUp(800, 'easeOutExpo', function () {
            nest.removeClass('hide');
        });
    },
    scrollNext: function () {
        $('#main').moveDown();
    },
    showText: function () {
        var text = $('.text-hd');
        if (text.is(':visible')) {
            text.slideUp(400, 'easeInOutExpo');
        } else {
            text.slideDown(400, 'easeInOutExpo');
        }
    },
    menuDrop: function () {
        var self = $(this);
        self.find('ul').slideToggle(200, "easeInOutExpo");
    },
    rolloverEffect: function () {
        $('.item.testimonial div.over').each(function () {
            var self = $(this);
            var color = self.data('color');
            self.css('background-color', color);
        });
    },
    rolloverAction: function () {
        $('div.item.testimonial div.over').on('mouseenter', function () {
            var self = $(this);
            var color = self.data('color');
            var heading = self.find('h3');
            heading.css('color', color);
        });
        $('div.item.testimonial div.over').on('mouseleave', function () {
            var self = $(this);
            var heading = self.find('h3');
            heading.removeAttr('style');
        });
    },
    landingFlip: function () {
        var box = $('.landing .bottom');
        function flip1st() {
            setTimeout(function () {
                box.addClass('move');
                flip2nd();
            }, 6000);
        }
        function flip2nd() {
            setTimeout(function () {
                box.removeClass('move');
                flip1st();
            }, 6000);
        }
        flip1st();
    },
    showComments: function () {
        var self = $(this);
        var cm = $('.reveal');
        var of = self.offset().top - 150;
        cm.slideDown(600, 'easeInOutExpo', function () {
            $('html, body').animate({scrollTop: of}, 600, 'easeInOutExpo');
        });
    },
    sectionDown: function () {
        $('#main').moveDown();
    },
    sectionUp: function () {
        $('#main').moveUp();
    },
    sectionMove: function () {
        var self = $(this);
        var ind = self.data('index');
        $('#main').moveTo(ind);
    },
    articleDown: function () {
        var self = $(this);
        var art = self.parents('article');
        var next = art.next();
        var pos = next.offset().top;
        $('body,html').animate({scrollTop: pos}, 600, 'easeInOutExpo');
    },
    showTags: function () {
        var self = $(this);
        var nest = self.parents('#tags');
        if (nest.hasClass('reveal')) {
            nest.removeClass('reveal');
        } else {
            nest.addClass('reveal');
        }
    },
    scrollElem: function () {
        var self = $(this);
        var box = $(self.data('scroll'));
        var pos = box.offset().top;
        $('body, html').animate({scrollTop: pos}, 800, 'easeInOutExpo');
    },
    stealColor: function () {
        var bgColor = $('#get-color').data('headerbg');
        var textColor = $('#get-color').data('headercolor');
        var logoColor = $('#get-color').data('headerlogo');
        var header = $('header');
        var logo = $('#logo span, header a#menu-btn div.stripes span, div.details-nav a span, div.details-nav a p, div.info a.btn, div#bottom, div.traffic div.inner');
        var elems = $('header ul li, header ul li a, header a#menu-btn');
        var links = $('div.info a:not(.btn), nav ul li a.active');
        var quote = $('blockquotem, div.info a.btn');
        var dnav = $('.details-nav a');
        var infobtn = $('div.info a.dis-btn');
        if ($('#showcase').length) {
            header.css('background-color', 'rgba(' + bgColor + ',0.5)');
        }
        logo.css({backgroundColor: 'rgb(' + logoColor + ')'});
        elems.css({'color': 'rgb(' + textColor + ')'});
        quote.css({'border-color': 'rgb(' + logoColor + ')'});
        dnav.css({'border-color': 'rgb(' + logoColor + ')'});
        infobtn.css({'color': 'rgb(' + logoColor + ')', 'border-color': 'rgb(' + logoColor + ')'});
        links.css({'color': 'rgb(' + logoColor + ')'});
        dnav.on('mouseenter', function () {
            var self = $(this);
            self.css({backgroundColor: 'rgb(' + logoColor + ')'});
            self.find('span').css({backgroundColor: '#fff'});
        });
        dnav.on('mouseleave', function () {
            var self = $(this);
            self.css({backgroundColor: 'transparent'});
            self.find('span').css({backgroundColor: 'rgb(' + logoColor + ')'});
        });
        infobtn.not('.dis-btn').on('mouseenter', function () {
            var self = $(this);
            self.css({backgroundColor: 'rgb(' + logoColor + ')'});
        });
        infobtn.not('.dis-btn').on('mouseleave', function () {
            var self = $(this);
            self.css({backgroundColor: 'transparent'});
        });
    },
    mouseMenu: function () {
        var hoverSpace = $('#home .icon-mouse');
        hoverSpace.each(function () {
            var self = $(this);
            self.on('mouseenter', function () {
                $(this).addClass('enter');
            }).on('mouseleave', function () {
                $(this).removeClass('enter');
            });
        });
    },
    linkHover: function () {
        $('div#bottom a.cta-btn').on('mouseenter', function () {
            var self = $(this);
            var color = self.data('color');
            self.css({'color': 'rgb(' + color + ')'});
        });
        $('div#bottom a.cta-btn').on('mouseleave', function () {
            var self = $(this);
            var color = '#ffffff';
            self.css({'color': 'rgb(' + color + ')'});
        });
        $('#home .btn:not(.inactive), div.info a.btn.visit').on('mouseenter', function () {
            var self = $(this);
            var color = self.data('hovercolor');
            self.css({'color': 'rgb(' + color + ')'});
        });
        $('#home .btn:not(.inactive), div.info a.btn.visit').on('mouseleave', function () {
            var self = $(this);
            var color = self.data('hovercolor');
            self.css({'color': '#ffffff', 'background': 'rgb(' + color + ')'});
        });
    },
    preventMultipleSubmissions: function () {
        $('form.wpcf7-form').submit(function () {
            var submit = $(this).find('input[type=submit]');
            submit.prop('disabled', true);
            submit.css('opacity', 0.2);
            IDSapp.checkIfSent();
        });
    },
    checkIfSent: function () {
        if ($('form.wpcf7-form').hasClass('sent') || $('form.wpcf7-form').hasClass('invalid')) {
            var submit = $('form.wpcf7-form').find('input[type=submit]');
            submit.prop('disabled', false);
            submit.css('opacity', 1);
        } else {
            setTimeout(IDSapp.checkIfSent, 500);
        }
    },
    submitNewsletterBox: function () {
        $(document).on('submit', '#newsletter-box', function (e) {
            $.ajax({
                type: "POST",
                url: '/ajax.php',
                data: {
                    email: $('#newsletter-box input[name="email"]').val(),
                    first_name: $('#newsletter-box input[name="first_name"]').val(),
                    xc: $('#newsletter-box input[name="xc"]').val(),
                },
                success: function (html) {
                    if (html == 'sent') {
                        $("#newsletter-box").hide();
                        $("div#success").show();
                    }
                },
                dataType: 'html'
            });
            e.preventDefault();
        });
    },
    landingSuccess: function () {
        var welcome = $('.landing .welcome');
        var thanks = $('.landing .thank-you');
        $('body,html').animate({scrollTop: 0}, 800, 'easeInOutExpo');
        welcome.hide();
        thanks.show();
    },
    landingMenu: function () {
        if ($('.landing').length) {
            var form = $('.landing-form');
            var pos = form.offset().top;
            var windowScroll;
            $(window).on('scroll', function () {
                windowScroll = $(window).scrollTop();
                if (windowScroll >= pos) {
                    $('body').addClass('hide-menu');
                } else {
                    $('body').removeClass('hide-menu');
                }
            });
        }
    },
    touchDevice: function () {
        function isTouchDevice() {
            return 'ontouchstart' in document.documentElement;
        }
        if (isTouchDevice()) {
            $('nav ul li a').on('click touchend', function (e) {
                var el = $(this);
                var link = el.attr('href');
                window.location = link;
            });
        }
    }
};
$(document).ready(IDSapp.init);
$(window).load(IDSapp.loaded);
