
(function(){
    
    var nil = null,
        self;
    
   /**
    * @class $.JocodeSlideshowProgressConfig
    **/
    $.JocodeSlideshowProgressConfig = {
        
        /**
         * The selector of the container of the progress object, relative to the slideshow container, defaut, use the slideshow container
         * 
         * @property $container
         * @type {String}
         */
        $container : '<',
        
        /**
         * Transition progress object
         * 
         * @property transition
         * @type {$.JocodeSlideshowProgressTransition}
         */
        transition : 'nil'
    };    
    
    $.JocodeSlideshowProgress= $.jocodeClass(
        
    {
            /**
             * ... 
             * 
             * @constructor
             * @class $.JocodeSlideshowProgress
             * @extends $.JocodeWidget
             * @uses $.JocodeSlideshowProgressConfig
             * @param {$.JocodeSlideshowProgressConfig} config  The configuration object
             * @param {$.JocodeSlideshowNavigation} override  The override object
             **/
            constructor : function(config, override){
                this.override(override);
                this.config = config;
            },
        
            /**
             * Initialize the progress object
             * 
             * @protected 
             * @method init
             * @param {$.JocodeSlideshow} slideshow The slideshow
             */
            init : function(slideshow){
                
                self = this;
                self.slideshow = slideshow;
                self.$container = slideshow.$(self.config.$container);
                self.initConfig();
                self.initTransition();
            },
            
            defaultConfig : $.JocodeSlideshowProgressConfig,
            
            /**
             * ...
             * 
             * @protected 
             * @method initTransition
             */
            initTransition : function(){
                self.transition.init(self);
            },
            
            /**
             * ...
             * 
             * @property _interval
             * @type {Number}
             */
            _interval : nil,        
                
        
            /**
             * ...
             * 
             * @method draw
             * @param {Number} ratio
             */
            goTo : function(ratio){
                self.transition.goTo(ratio);
            },
        
            /**
             * ...
             * 
             * @method play
             * @param {Number} delay
             * @param {Number} elapsed
             * @param {Number} start_time
             */
            play : function(delay, elapsed, start_time){
            
                var self = this;
                
                self._interval = setInterval(function(){
                    self.transition.goTo((delay - elapsed - (new Date().getTime() - start_time)) / delay);
                }, 30);
            },
            
            /**
             * ...
             * 
             * @method stop
             */  
            stop : function(){
                clearInterval(self._interval);
            },
             
            /**
             * ...
             * 
             * @method hide
             */      
            hide : function(){
                self.$container.hide();
            }, 
            
            /**
             * ...
             * 
             * @method show
             */  
            show : function(){
                self.$container.show();
            }  
        },
        $.JocodeWidget, 
        [$.JocodeSlideshowProgressConfig]
        );
            
    $.JocodeSlideshowProgressTransition = {
    
        Base : $.jocodeClass(
        {   
            
            /**
             * The base class of a transition between items of navigation
             * 
             * @constructor 
             * @class $.JocodeSlideshowProgressTransition.Base
             * @uses $.JocodeConfigurable
             * @uses $.JocodeOverridable
             * @param {Object} config The configuration object
             * @param {$.JocodeSlideshow} override  The override object
             **/ 
            constructor : function(config, override){
                this.override(override);
                this.config = config;
            },
            
            /**
             * Initialize the progress transition object
             * 
             * @protected 
             * @method init
             * @param {$.JocodeSlideshowProgress} progress
             */
            init : function(progress){
                this.progress = progress;
                this.initConfig();
            },
        
            /**
             * The progress object
             * 
             * @property progress
             * @type {$.JocodeSlideshowProgress}
             */
            progress : nil,

            /**
             * ...
             * 
             * @method goTo
             * @param {Number} ratio
             */
            goTo : function(){}
            
        }, 
        nil,
        [$.JocodeConfigurable, $.JocodeOverridable]
        )
    };

})(jQuery);

