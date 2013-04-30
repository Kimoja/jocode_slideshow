
(function($){
    
    var nil = nil;
    
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

            var self = this;
            
            $.JocodeSlideshowTransition.Base.prototype.init.call(self, slideshow);
            self.$scroller = self.slideshow.$(self.config.$scroller);
        },
        
        defaultConfig : $.JocodeSlideshowTransition.ScrollConfig,
         
        /**
         * ...
         * 
         * @method getOffset
         * @param {jQuery} to   Navigation item  destination
         * @param {Number} to_index The to index
         */
        getOffset : function(to, to_index){
            
            return to[0][this.vertical ? 'offsetTop' : 'offsetLeft']; 
        },
        
        /**
         * @overriden
         */ 
        draw : function(from, to, from_index, to_index){
            
            var self = this;
            
            var slideshow = self.slideshow, 
                css;

            css = [];
            css[self.vertical ? 'scrollTop' : 'scrollLeft'] = self.getOffset(to, to_index);
           
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
