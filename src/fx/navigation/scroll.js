
//todo methode pour changer les contenue

(function($){
    
var nil = nil,
    wrong = false,
    right = true,
    self;

$.JocodeSlideshowNavigationFx.Scroll = $.jocodeClass(
    
    function(config){
        
        self = this;
        
        self.config = config = config || {};
        $.extend(self, config);
    }, 
    
    {
    
        config : nil,
        
        $scroller : nil,
        
        scroll_over : wrong,
        
        velocity : 30,
        
        vertical : wrong,
        
        _scroller : nil,

        _size : 0,

        _scroll_size : 0,

        _max_scroll : 0,

        _interval : 0,

        _to : 0,

        _from : 0,

        _on_scroll : wrong,

        _by_click : wrong,
        
        _to_animate : wrong,

        _offsets : nil,

        init : function(navigation){

            self = this;
        
            $.JocodeSlideshowNavigationFx.Base.prototype.init.call(self, navigation);
            
            self._scroller = $(self.$scroller, navigation.context);
            self.initPile();
        },
          
        initPile : function(){
            
            var self = this;
            
            self._size = self.vertical 
                    ? self._scroller.height() 
                    : self._scroller.width();
                    
            self._scroll_size =  self.vertical 
                    ? self._scroller[0].scrollHeight
                    : self._scroller[0].scrollWidth;

            if(self._scroll_size > self._size){

                var step = 0;

                self._to_animate = right;
                self._max_scroll = self._scroll_size - self._size;
                self._offsets = [];

                self.navigation.items.each(function(index, el){

                    self._offsets[index] = step;
                    step +=  self.vertical ? $(el).height() : $(el).width();
                }); 
                
                self.scroll_over && self._scroller.mousemove(function(e){
                    
                   var page =  self.vertical ? e.pageY : e.pageX,
                       off =  self.vertical ? self._scroller.offset().top : self._scroller.offset().left;
                        
                   self._to =  Math.ceil(((page - off) / self._size) * self._max_scroll);
                   self._animate();
                });
            }
            else self._to_animate = wrong; 
        },
        
        draw : function(from, to, from_index, to_index){
            
            self = this;
            
            if(!self._to_animate)
                return;
            
            if(self._by_click){
                
                self._by_click = wrong;
                return;
            }
            
            self.navigation.setScrolled(to_index);
            
            self._goTo(to, to_index);
        },
        
        scrollTo : function(from, to, from_index, to_index){
            
            self = this;
            
            if(!self._to_animate)
                return;
            
            self._by_click = right;
            
            self._goTo(to, to_index);
        },
    
        _goTo : function(to, to_index){
            
            self = this;
            
            var to_ = self.vertical ? to.height() : to.width(),
                off;
               
            off = self._offsets[to_index];
            off -= self._size / 2 - to_ / 2;

            self._to = off < 0 ? 0 : off > self._max_scroll ? self._max_scroll : off;

            self._animate();
        },
        
        _animate : function(){
            
            var self = this;
            
            if(self._on_scroll)
                return;
         
            self._on_scroll = right;

            self._interval = setInterval(function(){
               
                if(self._to == self._from){

                    clearInterval(self._interval);

                    self._on_scroll = wrong;
                    return;
                } 

                var shift = ((self._to - self._from) / self._size) * self.velocity;
                self._from += self._to < self._from ? Math.floor(shift) : Math.ceil(shift);
                
                self.vertical ? self._scroller.scrollTop(self._from):  self._scroller.scrollLeft(self._from);

            }, 30);
        }
        
    }, 
    $.JocodeSlideshowNavigationFx.Base
); 

})(jQuery);
