
(function(){
    
var empty_func = function(){},
nil = null,
self;



$.JocodeSlideshowProgress= $.jocodeClass(
        
    /**
     * ... 
     * 
     * @class $.JocodeSlideshowProgress
     * @constructor
     * @param {jQuery} container  The initialization container
     * @param {Object} config   The configuration object
     *      @param {String}   config.$progress                       The selector of of the progress bar, relative to the slideshow container..
     **/
    function(config){
        this.setConfig(config);
    },
            
    {
        /**
         * The configuration object
         * 
         * @property config
         * @type {Object}
         */
        config : nil,
                
        /**
         * ...
         * 
         * @property progress
         * @type {jQuery}
         */
        progress : nil,
                
        /**
         * Transition progress bar object
         * 
         * @property fx
         * @type {$.JocodeSlideshowProgressFx}
         */
        fx : nil,
                
        _interval : nil,        
                
        /**
         * Initialize the progres bar
         * @method init
         * @param {$.JocodeSlideshow} The slideshow
         */
        init : function(slideshow){
            
            self = this;
            self.progress = slideshow.$(self.config.$progress);
            self.fx.init(self);
        },
                
        play : function(delay, elapsed, start_time){
            
            var self = this;
            //clearInterval(self._interval);
            self._interval = setInterval(function(){
                self.fx.draw((delay - elapsed - (new Date().getTime() - start_time)) / delay);
            }, 30);
        },
              
        stop : function(){
            clearInterval(self._interval);
        },
                 
        hide : function(){
            self.progress.hide();
        }, 
        
        show : function(){
            self.progress.show();
        },           
    }
);
            
$.JocodeSlideshowProgressFx = {
    
        
    Base : $.jocodeClass(
    
         /**
          * The base class of a transition between items of navigation
          * 
          * @class $.JocodeSlideshowProgressFx.Base
          * @constructor 
          **/ 
        function(){
            
        }, 
        {
            /**
             * The progress bar object
             * 
             * @property progress
             * @type {$.JocodeSlideshowProgress}
             */
            progress : nil,

            /**
             * Launch the transition
             * @method draw
             */
            draw : empty_func,
            
            init : function(progress){

                this.progress = progress;
            }
        }
    )
};

})(jQuery);

