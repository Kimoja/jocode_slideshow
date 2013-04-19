
(function($){
    
var self;

//pseudo type for documentation and typescript (TODO later)
/**
 * ...
 * 
 * @constructor 
 * @class $.JocodeSlideshowTransition.FadeConfig
 **/

/**
 * ...
 * 
 * @property duration
 * @type {Number}
 * @default 3000
 */
//end pseudo type

$.JocodeSlideshowTransition.Fade = $.jocodeClass(
    {

        /**
        * ...
        * 
        * @property duration
        * @type {Number}
        * @default 3000
        */
        duration : 3000,

        init : function(config){

            $.JocodeSlideshowTransition.Base.prototype.init.call(self, config);
        },
        
        initPile : function(){
            
            this.slideshow.slides.hide();
        },
        
        draw : function(from, to, from_index, to_index){
            
            self = this;
            
            var slideshow = self.slideshow;
            
            to.fadeIn(from_index == -1 ? 1 : self.duration, function(){
                slideshow.keepOn(to_index);
            });
            
            from_index !== -1 && from.fadeOut(self.duration);
        }

    }, 
    $.JocodeSlideshowTransition.Base,
    null
); 

})(jQuery);
