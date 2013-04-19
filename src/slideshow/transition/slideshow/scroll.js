
(function($){
    
var nil = nil,
    self;

//pseudo type for documentation and typescript (TODO later)
/**
 * ...
 * 
 * @constructor 
 * @class $.JocodeSlideshowTransition.ScrollConfig
 **/

/**
 * The scroller selector
 * 
 * @property $scroller
 * @type {String}
 */

/**
 * The scroller selector
 * 
 * @property duration
 * @type {Number}
 * @default 3000
 */

/**
 * ...
 * 
 * @property duration
 * @type {Number}
 * @default 3000
 */

/**
 * ...
 * 
 * @property easing
 * @type {String}
 * @default 'swing'
 */

/**
 * ...
 * 
 * @property vertical
 * @type {Boolean}
 * @default false
 */
//end pseudo type

$.JocodeSlideshowTransition.Scroll = $.jocodeClass(
    {
        
        /**
         * ...
         * 
         * @class $.JocodeSlideshowTransition.Scroll
         * @extends $.JocodeSlideshowTransition.Base 
         **/
        
       /**
        * The scroller element
        * 
        * @property $scroller
        * @type {jQuery}
        */
        $scroller : nil,
        
       /**
        * ...
        * 
        * @property duration
        * @type {Number}
        * @default 3000
        */
        duration : 3000,
        
        /**
        * ...
        * 
        * @property easing
        * @type {String}
        * @default 'swing'
        */
        easing : 'swing',
        
        /**
        * ...
        * 
        * @property vertical
        * @type {Boolean}
        * @default false
        */
        vertical : false,
        
       /**
        * ...
        * 
        * @private
        * @property _offsets
        * @type {Array}
        */
        _offsets : nil,
        
        /**
         * Initialize the navigation
         * 
         * @method init
         * @param {$.JocodeSlideshowTransition.ScrollConfig} config The configuration object
         */
        init : function(config){

            self = this;
            
            $.JocodeSlideshowTransition.Base.prototype.init.call(self, config);
            self.$scroller = self.slideshow.$(config.$scroller);
        },
        
        
        /**
         * ...
         * 
         * @method initPile
         */
        initPile : function(){
            
            self = this;
            
            self._offsets = [];

            var step = 0;

            self.slideshow.$slides.each(function(index, el){

                self._offsets[index] = step;
                step += self.vertical ? $(el).height() : $(el).width();
            }); 
        },
        
        /**
         * ...
         * 
         * @method draw
         * @param {jQuery} from
         * @param {jQuery} to
         * @param {Number} from_index
         * @param {Number} to_index
         */
        draw : function(from, to, from_index, to_index){

            self = this;
            
            var slideshow = self.slideshow, css;

            css = [];
            
            css[self.vertical ? 'scrollTop' : 'scrollLeft'] = self._offsets[to_index];
           
            self.$scroller.stop().animate(css, 
                {
                    duration: from_index == -1 ? 1 : self.duration, 
                    easing: self.easing,
                    complete : function(){
                        slideshow.keepOn(to_index);
                    }
                }
            );
        }
    }, 
    $.JocodeSlideshowTransition.Base,
    null
); 

})(jQuery);
