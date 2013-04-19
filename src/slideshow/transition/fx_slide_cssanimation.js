
(function($){
    
var self;
    
$.JocodeSlideshowFx.Fade = $.jocodeClass(
    {

        config : null,
        
        duration : 3000,

        init : function(slideshow){

            self = this;
            
            $.JocodeSlideshowFx.Base.prototype.init.call(self, slideshow);

            self._scroller = $(self.selector, slideshow.context);
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
    //parent
    $.JocodeSlideshowFx.Base,
    //mixins
    [$.JocodeConfig]
); 

})(jQuery);
