(function($) {
	flux.slide = function(fluxanh, opts) {
		return new flux.transition(fluxanh, $.extend({
			direction: 'left',
			setup: function() {
				var width = this.anh.image1.width(),
					height = this.anh.image1.height(),

				currentImage = $('<div class="current"></div>').css({
					height: height+'px',
					width: width+'px',
					position: 'absolute',
					top: '0px',
					left: '0px',
					background: this.anh[this.options.direction == 'left' ? 'image1' : 'image2'].css('background-image')	
				}).css3({
					'backface-visibility': 'hidden'
				}),

				nextImage = $('<div class="next"></div>').css({
					height: height+'px',
					width: width+'px',
					position: 'absolute',
					top: '0px',
					left: width+'px',
					background: this.anh[this.options.direction == 'left' ? 'image2' : 'image1'].css('background-image')
				}).css3({
					'backface-visibility': 'hidden'
				});

				this.live_show = $('<div class="slide"></div>').css({
					width: (2*width)+'px',
					height: height+'px',
					position: 'relative',
					left: this.options.direction == 'left' ? '0px' : -width+'px',
					'z-index': 101
				}).css3({
					'transition-duration': '600ms',
					'transition-timing-function': 'ease-in',
					'transition-property': 'all'
				});

				this.live_show.append(currentImage).append(nextImage);

				this.anh.image1.append(this.slideContainer);
			},
			execute: function() {
				var _this = this,
					delta = this.anh.image1.width();

				if(this.options.direction == 'left')
					delta = -delta;

				this.live_show.transitionEnd(function(){
					_this.finished();
				});
				
				setTimeout(function(){
					_this.live_show.css3({
						'transform' : flux.browser.translate(delta)
					});
				}, 50);
			}
		}, opts));	
	};
})(window.jQuery || window.Zepto);