
//todo methode pour changer les contenue

(function($){
    
$.JocodeFxNavigationSlideshow.Scroll = $.jocodeClass(
    
    function(config){
        
        this.config = config = config || {};
        
        config.selector  && (
            this.selector = config.selector
        );
        config.scroll_over  && (
            this.scroll_over = config.scroll_over
        );
        config.velocity  && (
            this.velocity = config.velocity
        );
        'vertical' in config && (
            this.vertical = !!config.vertical
        );
    }, 
    
    {
    
        config : null,
        
        selector : '> .navigation > div > .scroller',
        
        scroll_over : false,
        
        velocity : 30,
        
        vertical : false,
        
        _scroller : null,

        _size : 0,

        _scroll_size : 0,

        _max_scroll : 0,

        _interval : 0,

        _to : 0,

        _from : 0,

        _on_scroll : false,

        _by_click : false,
        
        _to_animate : false,

        _offsets : null,

        init : function(navigation){

            $.JocodeFxNavigationSlideshow.Base.prototype.init.call(this, navigation);

            this._scroller = $(this.selector, navigation.context);
            this.initPile();
        },
          
        initPile : function(){
            
            this._size = this.vertical 
                    ? this._scroller.height() 
                    : this._scroller.width();
                    
            this._scroll_size =  this.vertical 
                    ? this._scroller[0].scrollHeight
                    : this._scroller[0].scrollWidth;

            if(this._scroll_size > this._size){

                var step = 0,
                    self = this;

                this._to_animate = true;
                this._max_scroll = this._scroll_size - this._size;
                this._offsets = [];

                this.navigation.items.each(function(index, el){

                    self._offsets[index] = step;
                    step +=  self.vertical ? $(el).height() : $(el).width();
                }); 
                
                this.scroll_over && this._scroller.mousemove(function(e){
                    
                   var page =  self.vertical ? e.pageY : e.pageX,
                       off =  self.vertical ? self._scroller.offset().top : self._scroller.offset().left;
                        
                   self._to =  Math.ceil(((page - off) / self._size) * self._max_scroll);
                   self._animate();
                });
            }
            else this._to_animate = false; 
        },
        
        draw : function(from, to, from_index, to_index){
            
            if(!this._to_animate)
                return;
            
            if(this._by_click){
                
                this._by_click = false;
                return;
            }
            
            this.navigation.setScrolled(to_index);
            
            this._goTo(to, to_index);
        },
        
        scrollTo : function(from, to, from_index, to_index){
            
            if(!this._to_animate)
                return;
            
            this._by_click = true;
            
            this._goTo(to, to_index);
        },
    
        _goTo : function(to, to_index){
            
            var to_ = this.vertical ? to.height() : to.width(),
                x;

            x = this._offsets[to_index];
            x -= this._size / 2 - to_ / 2;

            this._to = x < 0 ? 0 : x > this._max_scroll ? this._max_scroll : x;

            this._animate();
        },
        
        _animate : function(){

            if(this._on_scroll)
                return;
         
            var self = this;

            this._on_scroll = true;

            this._interval = setInterval(function(){

                if(self._to == self._from){

                    clearInterval(self._interval);

                    self._on_scroll = false;
                    return;
                }

                var shift = ((self._to - self._from) / self._size) * self.velocity;
                self._from += self._to < self._from ? Math.floor(shift) : Math.ceil(shift);
                
                self.vertical ? self._scroller.scrollTop(self._from):  self._scroller.scrollLeft(self._from);

            }, 30);
        }
        
    }, 
    $.JocodeFxNavigationSlideshow.Base
); 

})(jQuery);
