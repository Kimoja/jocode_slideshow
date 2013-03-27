
(function($){
    
    
$.JocodeFxSlideshow.Scroll = $.jocodeClass(

    function(config){
        
        this.config = config = config || {};
        
        config.selector  && (
            this.selector = config.selector
        );
        config.duration  && (
            this.duration = config.duration
        );
        config.easing  && (
            this.easing = config.easing
        );
        'vertical' in config && (
            this.vertical = !!config.vertical
        );
    }, {

        config : null,
        
        selector : '> .scroller',
        
        duration : 3000,
        
        easing : 'swing',
        
        vertical : false,
        
        _offsets : null,

        _scroller : null,

        init : function(slideshow){

            $.JocodeFxSlideshow.Base.prototype.init.call(this, slideshow);

            this._scroller = $(this.selector, slideshow.context);
            this.initPile();
        },
        
        
        initPile : function(){
            
            this._offsets = [];

            var step = 0,
                self = this;

            this.slideshow.slides.each(function(index, el){

                self._offsets[index] = step;
                step += self.vertical ? $(el).height() : $(el).width();
            }); 
        },
        
        draw : function(from, to, from_index, to_index){

            var slideshow = this.slideshow, css;

            if(from_index == -1){
                
                this.vertical ? this._scroller.scrollTop(this._offsets[to_index])
                    : this._scroller.scrollLeft(this._offsets[to_index]);
                slideshow.keepOn(to_index);

                return;
            }
            
            css = [];
            
            css[this.vertical ? 'scrollTop' : 'scrollLeft'] = this._offsets[to_index];
            
            this._scroller.stop().animate(css, 
                {
                    duration: this.duration, 
                    easing: this.easing,
                    complete : function(){
                        slideshow.keepOn(to_index);
                    }
                }
            );
        }

    }, 
    $.JocodeFxSlideshow.Base
); 

})(jQuery);
