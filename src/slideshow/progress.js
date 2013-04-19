
(function(){
    
var empty_func = function(){},
nil = null,
self;


//pseudo type for documentation and typescript (TODO later)
/**
 * @class $.JocodeSlideshowProgressConfig
 * @constructor 
 **/

/**
 * The selector of of the progress bar, relative to the slideshow container
 * 
 * @property $progress
 * @type {String}
 */
//end pseudo type 


$.JocodeSlideshowProgress= $.jocodeClass(
        
   /**
    * ... 
    * 
    * @constructor
    * @class $.JocodeSlideshowProgress
    * @param {jQuery} container    The initialization container
    * @param {Object} config       The configuration object
    **/
    function(slideshow){
        
        self = this;
        self.slideshow = slideshow;
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
        init : function(config){
            
            self = this;
            
            self.$container = self.slideshow.$(config.$container);
            self.fx.init(self);
        },
                
        play : function(delay, elapsed, start_time){
            
            var self = this;
            
            self._interval = setInterval(function(){
                self.fx.draw((delay - elapsed - (new Date().getTime() - start_time)) / delay);
            }, 30);
        },
              
        stop : function(){
            clearInterval(self._interval);
        },
                 
        hide : function(){
            self.$container.hide();
        }, 
        
        show : function(){
            self.$container.show();
        }           
    },
    $.JocodeWidget, 
    nil
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
             * The progress  object
             * 
             * @property progress
             * @type {$.JocodeSlideshowProgress}
             */
            progress : nil,

            /**
             * Launch the transition
             * 
             * @method draw
             */
            draw : empty_func,
            
           /**
            * Initialize the progress transition object
            * @method init
            * @param {$.JocodeSlideshow.Base} The slideshow
            */
            init : function(progress){

                this.progress = progress;
            }
        }
    )
};

})(jQuery);

