
(function($){
    
    /**
     * ...
     * 
     * @constructor 
     * @class $.JocodeSlideshowTransition.FadeConfig
     **/  
    $.JocodeSlideshowTransition.FadeConfig = {
        
        /**
         * ...
         * 
         * @property duration
         * @type {Number}
         * @default 500
         */
        duration : 500
    };
    
    
    /**
     * ...
     * 
     * @class $.JocodeSlideshowTransition.Fade
     * @extends $.JocodeSlideshowTransition.Base 
     * @uses $.JocodeSlideshowTransition.FadeConfig 
     * @param {$.JocodeSlideshowTransition.FadeConfig} config The configuration object
     * @param {$.JocodeSlideshowTransition.Fade} override  The override object
     **/
    $.JocodeSlideshowTransition.Fade = $.jocodeClass(
    {
        
        /**
         * @overriden
         */
        init : function(slideshow){

            $.JocodeSlideshowTransition.Base.prototype.init.call(this, slideshow);
        },
        
        defaultConfig : $.JocodeSlideshowTransition.FadeConfig,
        
        /**
         * @overriden
         */
        initPile : function(){
            
            this.slideshow.$slides.hide();
        },
        
        /**
         * @overriden
         */
        draw : function(from, to, from_index, to_index){
            
            var self = this;
            
            var slideshow = self.slideshow;
            
            to.fadeIn(from_index == -1 ? 1 : self.duration, function(){
                slideshow.keepOn(to_index);
            });
            
            from_index !== -1 && from.fadeOut(self.duration);
        }
    }, 
    $.JocodeSlideshowTransition.Base,
    [$.JocodeSlideshowTransition.FadeConfig]
    ); 

})(jQuery);
