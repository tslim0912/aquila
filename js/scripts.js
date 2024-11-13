document.addEventListener("DOMContentLoaded", function(event) {
	AOS.init();
    $(document).ready(function() {
        if( !$('body').hasClass('home') ) {
            $(document).on('click', '#masthead .navbar .navbar-nav .nav-link', function(e) {
                var $this = $(this),
                    $target = $this.attr('href'),
                    $menu_item = $target.replace('#', '');
                if( $menu_item == 'about-us' || $menu_item == 'services' ) {
                    e.preventDefault();
                    var newURL = aquila.home_url+$target;
                    window.location.href = newURL;
                }
            });
        }

        $(document).on('click', '#disclaimerModal button[type="button"]', function(e) {
            e.preventDefault();
            var $this = $(this),
                $parents = $this.parents('.pum-container'),
                $close = $parents.find('button.pum-close.popmake-close');
            $close.click();
        });

        let lastScrollTop = 0;
    
        $(window).on('scroll', function() {
            let currentScroll = $(this).scrollTop();
    
            if (currentScroll > lastScrollTop) {
                $('#masthead .navbar').addClass('scroll-down');
            } else {
                $('#masthead .navbar').removeClass('scroll-down');
            }
    
            lastScrollTop = currentScroll;
        });

        var paymentOptionsSwiper = new Swiper('#swiper-payment-options', {
            slidesPerView: 8,
            loop: false,
            speed: 6000,
            autoplay: {
                delay: 0,
                disableOnInteraction: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: "auto",
                    loop: true,
                    centeredSlides: true,
                    spaceBetween: 15,
                    allowTouchMove: false,
                },
                1200: {
                    slidesPerView: 8,
                    loop: false,
                }
            }
        });

        $(document).on('click', '.hamburger', function(e) {
            var $this = $(this);
            if($this.hasClass('is-active')) {
                setTimeout(function() {
                    $this.removeClass('is-active');
                }, 100);
            }
            else {
                setTimeout(function() {
                    $this.addClass('is-active');
                }, 100);
            }
        });

        $('.iconbox-services .iconbox-item').on('mouseenter', function(e) {
            var $this = $(this);
            $('.iconbox-services .iconbox-item').not(this).addClass('gray-out');
        }).on('mouseleave', function() {
            $('.iconbox-services .iconbox-item.gray-out').removeClass('gray-out');
        });
		
        autoRunNumberIncrement();
		$(window).on('scroll', function() {
            autoRunNumberIncrement();
		});
		
        function autoRunNumberIncrement() {
			$('.statistic-number').each(function(){
				var $this = $(this),
					$number = $this.attr('data-number');
				if ( !isNaN($number) && !$this.hasClass('animated') && isElementInViewport($this) ) {
					$this.addClass('animated');
					$({ counter: 0 }).animate({ counter: $number }, {
						duration: 3000, // 3 seconds
						easing: 'swing',
						step: function(now) {
							$this.text( formatNumberWithCommas(Math.ceil(now)) + '+' );
						}
					});
				}
			});
        }

		function isElementInViewport($el) {
			var rect = $el[0].getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}
		
		function formatNumberWithCommas(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
    });
});