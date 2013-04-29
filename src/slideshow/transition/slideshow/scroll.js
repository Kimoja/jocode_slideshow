
(function($){
    
    var nil = nil,
        self;
    
    /**
     * ...
     * 
     * @class $.JocodeSlideshowTransition.ScrollConfig
     **/    
    $.JocodeSlideshowTransition.ScrollConfig = {
        
        /**
        * The scroller selector
        * 
        * @property $scroller
        * @type {String}
        */
       
       $scroller : '',

       /**
        * ...
        * 
        * @property duration
        * @type {Number}
        * @default 500
        */
       duration : 500,
       
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
       vertical : false
        
    };


    /**
    * ...
    * 
    * @class $.JocodeSlideshowTransition.Scroll
    * @extends $.JocodeSlideshowTransition.Base 
    * @uses $.JocodeSlideshowTransition.ScrollConfig 
    * @param {$.JocodeSlideshowTransition.ScrollConfig} config The configuration object
    * @param {$.JocodeSlideshowTransition.Scroll} override  The override object
    **/
    $.JocodeSlideshowTransition.Scroll = $.jocodeClass(
    {
        
        
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
         * @private
         * @property _offsets
         * @type {Array}
         */
        _offsets : nil,
        
        /**
         * @overriden
         */ 
        init : function(slideshow){

            self = this;
            
            $.JocodeSlideshowTransition.Base.prototype.init.call(self, slideshow);
            self.$scroller = self.slideshow.$(self.config.$scroller);
        },
        
        defaultConfig : $.JocodeSlideshowTransition.ScrollConfig,
            
        /**
         * @overriden
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
         * @overriden
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
    [$.JocodeSlideshowTransition.ScrollConfig]
    );

})(jQuery);
