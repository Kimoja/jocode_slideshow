
(function($){
    
var nil = nil,
    self;

$.JocodeSlideshowFx.Scroll = $.jocodeClass(

    function(config){
        
        self = this;
        
        self.config = config = config || {};
        $.extend(self, config);
    }, {

        config : nil,
        
        $scroller : nil,
        
        duration : 3000,
        
        easing : 'swing',
        
        vertical : false,
        
        _offsets : nil,

        _scroller : nil,

        init : function(slideshow){

            self = this;
            
            $.JocodeSlideshowFx.Base.prototype.init.call(self, slideshow);
            self._scroller = $(self.$scroller, slideshow.container);
        },
        
        
        initPile : function(){
            
            self = this;
            
            self._offsets = [];

            var step = 0;

            self.slideshow.slides.each(function(index, el){

                self._offsets[index] = step;
                step += self.vertical ? $(el).height() : $(el).width();
            }); 
        },
        
        draw : function(from, to, from_index, to_index){

            self = this;
            
            var slideshow = self.slideshow, css;

            if(from_index == -1){
                
                self.vertical ? self._scroller.scrollTop(self._offsets[to_index])
                    : self._scroller.scrollLeft(self._offsets[to_index]);
                slideshow.keepOn(to_index);
                
                return;
            }
            
            css = [];
            
            css[self.vertical ? 'scrollTop' : 'scrollLeft'] = self._offsets[to_index];
           
            self._scroller.stop().animate(css, 
                {
                    duration: self.duration, 
                    easing: self.easing,
                    complete : function(){
                        slideshow.keepOn(to_index);
                    }
                }
            );
        }

    }, 
    $.JocodeSlideshowFx.Base
); 

})(jQuery);
