
(function($){
    
    var nil = null,
        wrong = false,
        self;
    
    /**
     * ...
     * 
     * @class $.JocodeSlideshowProgressTransition.BarConfig
     **/
    $.JocodeSlideshowProgressTransition.BarConfig = {
        
        /**
         * ...
         * 
         * @property css
         * @type {String}
         */
        css : '',
        
       /**
        * ...
        * 
        * @property inverse
        * @type {Boolean}
        * @default false
        */
       inverse : wrong,
       
       /**
        * ...
        * 
        * @property vertical
        * @type {Boolean}
        * @default false
        */
       vertical : wrong,
       
       /**
        * Transition progress object
        * 
        * @property transition
        * @type {$.JocodeSlideshowProgressTransition}
        */
       transition : nil
    };

    /**
     * ...
     * 
     * @class $.JocodeSlideshowProgressTransition.Bar
     * @uses $.JocodeSlideshowProgressTransition.BarConfig 
     * @param {$.JocodeSlideshowProgressTransition.BarConfig} config The configuration object
     * @param {$.JocodeSlideshowProgressTransition.Bar} override  The override object
     **/ 
    $.JocodeSlideshowProgressTransition.Bar = $.jocodeClass(
    {
        
        /**
         * ...
         * 
         * @property $bar
         * @type {jQuery}
         */
        $bar : null,
        
        /**
         * ...
         * 
         * @private
         * @property _size
         * @type {jQuery}
         */
        _size : 0,
        
        /**
         * ...
         * 
         * @private
         * @property _css
         * @type {String}
         */
        _style : null,
                
        /**
         * @overriden
         */        
        init : function(progress){

            self = this;
            
            $.JocodeSlideshowProgressTransition.Base.prototype.init.call(self, progress);
            
            var el = self.$bar = $(document.createElement('div'));
            progress.$container.append(el);
            
            self.css && el.addClass(self.css);
            
            self._style = self.vertical ? 'height' : 'width';
                
            self._size = self.vertical 
                ? progress.$container.height() 
                : progress.$container.width();
        },
        
        defaultConfig : $.JocodeSlideshowProgressTransition.BarConfig,
            
        /**
         * @overriden
         */          
        goTo : function(ratio){
                    
            this.$bar.css(self._style, 
                self.inverse 
                    ? ~~((1 - ratio) * self._size) + 'px'
                    : ~~(ratio * self._size) + 'px'
            );
        }

    }, 
    $.JocodeSlideshowProgressTransition.Base,
    [$.JocodeSlideshowProgressTransition.BarConfig]
    ); 

})(jQuery);
