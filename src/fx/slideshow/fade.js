
(function($){
    
var self;
    
$.JocodeSlideshowFx.Fade = $.jocodeClass(

    function(config){
        
        self = this;
        
        self.config = config = config || {};
        $.extend(self, config);
        
    }, {

        config : null,
        
        duration : 3000,

        init : function(slideshow){

            self = this;
            
            $.JocodeSlideshowFx.Base.prototype.init.call(self, slideshow);

            self._scroller = $(self.selector, slideshow.context);
            
            self.slideshow.slides.fadeOut(0);
        },
        
        draw : function(from, to, from_index, to_index){
            
            self = this;
            
            var slideshow = self.slideshow;

            if(from_index == -1){

                to.fadeIn(0);
                slideshow.keepOn(to_index);

                return;
            }
            
            to.fadeIn(self.duration, function(){
                
                slideshow.keepOn(to_index);
            });
            from.fadeOut(self.duration, 0);
        }

    }, 
    $.JocodeSlideshowFx.Base
); 

})(jQuery);
