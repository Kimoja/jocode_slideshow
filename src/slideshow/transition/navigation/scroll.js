

(function($){
    
    var nil = nil,
        wrong = false,
        right = true;
        
    /**
     * ...
     * 
     * @class $.JocodeSlideshowNavigationTransition.ScrollConfig
     **/    
    $.JocodeSlideshowNavigationTransition.ScrollConfig = {
      
        /**
         * ...
         * 
         * @property $scroller
         * @type {String}
         */
        $scroller : '',
        
        /**
         * ...
         * 
         * @property scroll_over
         * @type {Boolean}
         */
        scroll_over : wrong,
        
        /**
         * ...
         * 
         * @property velocity
         * @type {Number}
         */
        velocity : 30,
        
        /**
         * ...
         * 
         * @property vertical
         * @type {Boolean}
         */
        vertical : wrong
    };  
    
    /**
     * The base class of a transition between $items of navigation
     *  
     * @class $.JocodeSlideshowNavigationTransition.Scroll
     * @extends $.JocodeSlideshowNavigationTransition.Base
     * @uses $.JocodeSlideshowNavigationTransition.ScrollConfig 
     * @param {Object} config  The configuration object
     * @param {$.JocodeSlideshowNavigationTransition.Scroll} override  The override object
     **/ 
    $.JocodeSlideshowNavigationTransition.Scroll = $.jocodeClass(
    {
        /**
         * ...
         * 
         * @property $scroller
         * @type {jQuery}
         */
        $scroller : nil,
        
        /**
         * ...
         * 
         * @private
         * @property _size
         * @type {Number}
         */
        _size : 0,
        
        /**
         * ...
         * 
         * @private
         * @property _scroll_size
         * @type {Number}
         */
        _scroll_size : 0,
        
        /**
         * ...
         * 
         * @private
         * @property _max_scroll
         * @type {Number}
         */
        _max_scroll : 0,
        
        /**
         * ...
         * 
         * @private
         * @property _interval
         * @type {Number}
         */
        _interval : 0,

        /**
         * ...
         * 
         * @private
         * @property _to
         * @type {Number}
         */
        _to : 0,

        /**
         * ...
         * 
         * @private
         * @property _from
         * @type {Number}
         */
        _from : 0,

        /**
         * ...
         * 
         * @private
         * @property _on_scroll
         * @type {Boolean}
         */
        _on_scroll : wrong,

        /**
         * ...
         * 
         * @private
         * @property _by_click
         * @type {Boolean}
         */
        _by_click : wrong,
        
        /**
         * ...
         * 
         * @private
         * @property _to_animate
         * @type {Boolean}
         */
        _to_animate : wrong,

        
        /**
         * @overriden
         */ 
        init : function(navigation){

            var self = this;
            $.JocodeSlideshowNavigationTransition.Base.prototype.init.call(self, navigation);
            self.$scroller = navigation.$(self.$scroller);
        },
          
        defaultConfig : $.JocodeSlideshowNavigationTransition.ScrollConfig,
            
        /**
         * @overriden
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
         * @overriden
         */ 
        draw : function(from, to, from_index, to_index){
            
            var self = this;
            
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
         * @overriden
         */ 
        scrollTo : function(from, to, from_index, to_index){
            
            var self = this;
            
            if(!self._to_animate)
                return;
            
            self._by_click = right;
            
            self._goTo(to, to_index);
        },
        
        /**
         * ...
         * 
         * @method getOffset
         * @param {jQuery} to   Navigation item  destination
         * @param {Number} to_index The to index
         */
        getOffset : function(to, to_index){
            
            var self = this;
            return (to[0][self.vertical ? 'offsetTop' : 'offsetLeft']) - 
                   (self._size / 2 - (self.vertical ? to.height() : to.width()) / 2); 
        },
        
        /**
         * Scroll the navigation
         * 
         * @private
         * @method _goTo
         * @param {jQuery} to   Navigation item  destination
         * @param {Number} to_index The to index
         */
        _goTo : function(to, to_index){
            
            var self = this;
            
            var off = self.getOffset(to, to_index);

            self._to = off < 0 ? 0 : off > self._max_scroll ? self._max_scroll : off;

            self._animate();
        },
        
        /**
         * ...
         * 
         * @private
         * @method _animate
         */
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
    $.JocodeSlideshowNavigationTransition.Base,
    [$.JocodeSlideshowNavigationTransition.ScrollConfig]
    ); 

})(jQuery);
