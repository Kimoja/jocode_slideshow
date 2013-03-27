
(function($){
    
    
$.JocodeFxSlideshow.Fade = $.jocodeClass(

    function(config){
        
        this.config = config = config || {};
        
        config.duration  && (
            this.duration = config.duration
        );
    }, {

        config : null,
        
        duration : 3000,

        init : function(slideshow){

            $.JocodeFxSlideshow.Base.prototype.init.call(this, slideshow);

            this._scroller = $(this.selector, slideshow.context);
            
            this.slideshow.slides.fadeOut(0);
        },
        
        draw : function(from, to, from_index, to_index){
            
            var slideshow = this.slideshow;

            if(from_index == -1){

                to.fadeIn(0);
                slideshow.keepOn(to_index);

                return;
            }
            
            to.fadeIn(this.duration, function(){
                
                slideshow.keepOn(to_index);
            });
            from.fadeOut(this.duration, 0);
        }

    }, 
    $.JocodeFxSlideshow.Base
); 

})(jQuery);
