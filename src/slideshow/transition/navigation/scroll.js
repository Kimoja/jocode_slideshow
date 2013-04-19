

(function($){
    
var nil = nil,
    wrong = false,
    right = true,
    self;

$.JocodeSlideshowNavigationTransition.Scroll = $.jocodeClass(
    {
       /**
        * The base class of a transition between $items of navigation
        * 
        * @constructor 
        * @class $.JocodeSlideshowNavigationTransition.Scroll
        * @extends $.JocodeSlideshowNavigationTransition.Base
        * @uses $.JocodeConfig
        * @param {Object} config  The configuration object
        **/ 
           
        config : nil,
        
        $scroller : nil,
        
        scroll_over : wrong,
        
        velocity : 30,
        
        vertical : wrong,
        
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
        
        /**
        * Initialize the transition object
        * @method init
        * @param {$.JocodeSlideshow} navigation The slideshow
        */
        init : function(navigation){

            self = this;
        
            $.JocodeSlideshowNavigationTransition.Base.prototype.init.call(self, navigation);
            
            self.$scroller = $(self.$scroller, navigation.$container);
        },
          
        /**
        * Method invoked when the pile of slides change
        * @method initPile
        * @param {jQuery} last_pile The last pile of slides 
        */  
        initPile : function(last_pile){
            
            var self = this;
            
            self._size = self.vertical 
                    ? self.$scroller.height() 
                    : self.$scroller.width();
                    
            self._scroll_size =  self.vertical 
                    ? self.$scroller[0].scrollHeight
                    : self.$scroller[0].scrollWidth;

            if(self._scroll_size > self._size){

                var step = 0;

                self._to_animate = right;
                self._max_scroll = self._scroll_size - self._size;
                self._offsets = [];

                self.navigation.$items.each(function(index, el){

                    self._offsets[index] = step;
                    step +=  self.vertical ? $(el).height() : $(el).width();
                }); 
                
                self.scroll_over && self.$scroller.mousemove(function(e){
                    
                   var page =  self.vertical ? e.pageY : e.pageX,
                       off =  self.vertical ? self.$scroller.offset().top : self.$scroller.offset().left;
                        
                   self._to =  Math.ceil(((page - off) / self._size) * self._max_scroll);
                   self._animate();
                });
            }
            else self._to_animate = wrong; 
        },
        
        /**
        * Launch the transition
        * @method draw
        * @param {jQuery} from Navigation item source
        * @param {jQuery} to   Navigation item destination
        * @param {Number} from_index The from index
        * @param {Number} to_index The to index
        */
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
        
        /**
        * Scroll the navigation
        * @method scrollTo
        * @param {jQuery} from Navigation item  source
        * @param {jQuery} to   Navigation item  destination
        * @param {Number} from_index The from index
        * @param {Number} to_index The to index
        */
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
            
            var self = this,
                temp;
            
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
                
                temp = self._from + shift;
                
                self._from = self._to < self._from ? temp < self._from ? temp : self._to 
                            : temp > self._from ? temp : self._to;
                            
                self.vertical ? self.$scroller.scrollTop(self._from):  self.$scroller.scrollLeft(self._from);
            }, 30);
        }
        
    }, 
    //parent
    $.JocodeSlideshowNavigationTransition.Base
); 

})(jQuery);
