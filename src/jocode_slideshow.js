/*
 * Copyright 2013 Joakim Carrilo de Almeida
 * http://jocode.org/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 *  copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * TODO
 * evenement touch et clavier pour l'accéssibilité !important
 * attendre fin de transition pour changer d'item de navigation.... 
 * permettre une initailisation de l'index de départ via un random, par exemple en mettant -1 ?? bof
 * différence entre un pause via le bouton et via l'evenement hover !important
 * création des items de navigation à la volé  via des fonctions , ou des templates, encore mieux!! !important
 * options infinie, élément précédent en fin de pile  !important, mais ca va être galère .... à faire en premier !!!
 * fx, changer la taille du conteneur par rapport au contenue, en option , autowidth, autoheight, par défaut dans la classe de base fx ???  !important
 * activer l'historique de navigation au changement de slide .... pour des sites avec juste un slide comme contenue, ca peut être pas mal
 * afficher les boutons , navigation ou du player, que lors d'un mouse hover ... pk pas
 * écouteur live on click sur un slide, !important 
 * option plein écran .... faut que  l'intégration HTML et CSS le permet, en tout cas via un plugin, à réfléchir ...
 * tout plein de transition qui envoie
 **/

(function($){

$.JocodeSlideshow = $.jocodeClass(

    /**
     * Slideshow builder, based on transition objects, and custom html structure and css
     * 
     * @constructor 
     * @name $.JocodeSlideshow
     * @param {jQuery} context The initialization context
     * @param {Object} config  The configuration object
     *      @param {String}   config.selector                               The slides selector, relative to the initialization context
     *      @param {$.JocodeNavigationSlideshow.Base}[config.navigation]    The navigation object
     *      @param {$.JocodeProgressBar.Base}[config.progress_bar]          The progress bar object
     *      @param {String}   [config.hover_container]                      The selector of the container of event hover(by default,  the jQuery parent()  function to find him).
     *      @param {String}   [config.bt_first]                             The Selector of buttons "first"  relative to the initialization context
     *      @param {String}   [config.bt_previous]                          The Selector of buttons "previous"", relative to the initialization context
     *      @param {String}   [config.bt_play]                              The Selector of buttons "play", relative to the initialization context
     *      @param {String}   [config.bt_pause]                             The Selector of buttons "pause", relative to the initialization context
     *      @param {String}   [config.bt_resume]                            The Selector of buttons "resume", relative to the initialization context
     *      @param {String}   [config.bt_stop]                              The Selector of buttons "stop", relative to the initialization context 
     *      @param {String}   [config.bt_next]                              The Selector of buttons "next", relative to the initialization context
     *      @param {String}   [config.bt_last]                              The Selector of buttons "last", relative to the initialization context
     *      @param {String}   [config.disabled_bt_class]                    Class of disabled buttons
     *      @param {Boolean}  [config.auto_play=false]                      Enable Autoplay
     *      @param {Number}   [config.delay=3000]                           Time in milliseconds between each transition
     *      @param {Boolean}  [config.pause_over=true]                      Stop on mouseover
     *      @param {Boolean}  [config.stop_event=true]                      Stop event propagation and default actions
     *      @param {Number}   [config.start_index=0]                            ...
     *      @param {$.JocodeFxSlideshow.Base}[config.fx]                    Transition slide object
     *      @param {Function} [config.load]                                 Loading slide function 
     *      @param {Function} [config.beforeWait]                           Function called when waiting for the next transition
     *      @param {Function} [config.onCancel]                             ...
     *      @param {Function} [config.onPlay]                               ...
     *      @param {Function} [config.onPause]                              ...
     *      @param {Function} [config.onResume]                             ...
     *      @param {Function} [config.onStop]                               ...
     *      @param {Function} [config.onChange]                             ...
     *      @param {Function} [config.beforeDraw]                           ...
     *      
     *      
     **/
    function (context, config){
        
        if(!config)
            throw new Error('jocodeSlideshow Error: Missing parameter "config"');

        if(!config.selector)
            throw new Error('jocodeSlideshow Error: Missing parameter "config.selector"');

        if(!config.fx || !(config.fx instanceof $.JocodeFxSlideshow.Base))
            throw new Error('jocodeSlideshow Error: Parameter "config.fx" is missing or is not of the type "$.JocodeFxSlideshow.Base"');

        var self = this,
            buttons = 'first previous play pause resume stop next last'.split(' ');
        
        //set requiered 
        this.context = context;
        this.config = config;
        this.fx = config.fx;
        this.selector = config.selector;
        this.slides = $(config.selector, context);
        
        //set options 
        this.hover_container = config.hover_container ? $(config.hover_container, context) : this.slides.parent();
        
        config.disabled_bt_class && (
            this.disabled_bt_class = config.disabled_bt_class.toString()
        );
        config.delay && (
            this.delay = Math.abs(config.delay) || this.delay
        );
        'stop_event' in config && (
            this.stop_event = !!config.stop_event
        );
            
        //init event
        $.each('load beforeWait onCancel onPlay onPause onResume onStop onChange beforeDraw'.split(' '), function(index, method){
                
            typeof config[method] == 'function' && (
                self[method]= config[method]
            );
        });
        
        if(!('pause_over' in config) ||  config.pause_over)
            this.addPauseEvent(this.hover_container);
        
        //init navigation
        if(config.navigation && config.navigation instanceof $.JocodeNavigationSlideshow){

            this.navigation = config.navigation;
            this._have_navigation = true; 
            this.navigation.init(this);
        }
        
        //initialize buttons
        $.each('first previous play pause resume stop next last'.split(' '), function(index, button){
            
            if(config['bt_' + button]){

                (self['bt_' + button] = $(config['bt_' + button], context)).click(function(e){

                    self._stopEvent(e); 
                    self[button]();
                });
            }
        });
        
        //init transition object
        this.fx.init(this);
        
        //enable/disable buttons
        if(config.auto_play){
            
            this._toogleBt('play resume', false);
            this._toogleBt('pause stop', true);

            this._stopped = false;
        }
        else this._toogleBt('pause resume stop', false);
        
        //got to start index
        self.goTo(config.start_index || 0);
    },
    
    {
        /** @lends $.JocodeSlideshow.prototype */
        
        /**
         * @property {Object} The configuration object
         */
        config : null,
        
        /**
         * @property {jQuery} The initialization context
         */
        context : null,
        
        /**
         * @property {String} The slides selector
         */
        selector : null,
        
        /**
         * @property {jQuery} The slides
         */
        slide : null,
        
        /**
         * @property {jQuery} The container of the event hover
         */
        hover_container : null,
        
        /**
         * @property {jQuery} The navigation items
         */
        navigation : null,
        
        /**
         * @property {jQuery} The button first
         */
        bt_first : null,

        /**
         * @property {jQuery} The button previous
         */
        bt_previous : null,

        /**
         * @property {jQuery} The button play
         */
        bt_play : null,

        /**
         * @property {jQuery} The button pause
         */
        bt_pause : null,

        /**
         * @property {jQuery} The button resume
         */
        bt_resume : null,

        /**
         * @property {jQuery} The button stop
         */
        bt_stop : null,

        /**
         * @property {jQuery} The button next 
         */
        bt_next : null,

        /**
         * @property {jQuery} The button last 
         */
        bt_last : null,

        /**
         * @property {String} The css class of disabled buttons
         */
        disabled_bt_class : null,

        /**
         * @property {Number} Time in milliseconds between each transition
         */
        delay : 3000,
        
        
        /**
         * @property {$.JocodeFxSlideshow.Base} Transition slide object
         */
        fx : null,
        
        /**
         * @property {jQuery} The current slide
         */
        current : null,

        /**
         * @property {Number} The current index
         */
        index : -1,
        
        /**
         * @property {Number} The loading index
         */
        loading_index : -1,
        
        /**
         * @private
         * @property {Boolean} If the player is stopped
         */
        _stopped : true,

        /**
         * @private
         * @property {Boolean} If the player is on pause
         */
        _paused : false,
        
        /**
         * @private
         * @property {Boolean} If the slide is on load
         */
        _on_load : false,
        
        /**
         * @private
         * @property {Boolean} If the slide is on transition
         */
        _on_draw : false,

        /**
         * @private
         * @property {Boolean} If have navigation
         */
        _have_navigation : false,
        
        /**
         * @private
         * @property {Number} The timestamp of the beginning of the time interval between transitions
         */
        _time : 0,

        /**
         * @private
         * @property {Number} The time delay during a break
         */
        _defer : 0,

        /**
         * @private
         * @property {Number} The waiting timer between slides
         */
        _timeout : null,
        
        /**
         * Change the css classe of a set of buttons
         * @private
         * @function
         * @param {String} buttons The set of buttons
         * @param {Boolean} enable Add or remove a css class
         */
        _toogleBt : function(buttons, enable){
            
            var self = this;
                
            $.each(buttons.split(' '), function(index, bt){
                
                var button = self['bt_' + bt];
                button && (enable ? button.removeClass(self.disabled_bt_class) 
                        : button.addClass(self.disabled_bt_class));
            });
        },

        /**
         * Stop an event
         * @private
         * @function
         * @param {Event} el The event object
         */
        _stopEvent : function(e){

            if(this.stop_event){

                e.preventDefault();
                e.stopPropagation();
            }
        },

        /**
         * Set event on pause
         * @function
         * @param {jQuery} el The element to listen
         */
        addPauseEvent : function(el){

            var self = this;

            el.hover(
                function() {self.pause();}, 
                function() {self.resume();}
            );
        },

        /**
         * Go to the first slide
         * @function
         */
        first : function(){

            this.goTo(0);
        },

        /**
         * Go to the previous slide
         * @function
         */
        previous : function(){

            this.goTo(this.loading_index - 1);
        },

        /**
         * Start the player
         * @function
         */
        play : function(){

            if(!this.isPlayed()){

                this._toogleBt('play resume', false);
                this._toogleBt('pause stop', true);

                this._stopped = false;
                
                this.onPlay();
                this.keepOn(this.index);
            }
        },

        /**
         * Pause the player
         * @function
         */
        pause : function(){

            if(this.isPlayed()){

                this._toogleBt('resume', true);
                this._toogleBt('pause', false);
                
                this._defer += this._on_wait ? (new Date().getTime()) - this._time : 0;
                this._paused = true;
                
                this.onPause();
               
                this._on_wait && clearTimeout(this._timeout);
            }
        },

        /**
         * Resume the player
         * @function
         */
        resume : function(){

            if(this._paused){
                this._toogleBt('resume', false);
                this._toogleBt('pause', true);

                this._paused = false;
                
                this.onResume();
                
                !this._on_draw && this.keepOn(this.index);
            }
        },

        /**
         * Stop the player
         * @function
         */
        stop : function(){

            if(this.isPlayed()){

                this._toogleBt('play', true);
                this._toogleBt('resume pause stop' , false);

                this._stopped = true;
                
                this.onStop();
                
                this._on_wait && clearTimeout(this._timeout);
            }
        },

        /**
         * Go to the next slide
         * @function
         */
        next : function(){

            this.goTo(this.loading_index + 1);
        },

        /**
         * Go to the last slide
         * @function
         */
        last : function(){

            this.goTo(this.slides.length - 1);
        },
        
        /**
         * Are there any slides after to current or loading slide (ignores loop)
         * @function
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @returns {Boolean}
         */
        hasNext : function(from_index){

            return (from_index ? this.index : this.loading_index) < this.slides.length - 1;
        },

        /**
         * Are there any slides previous to current or loading slide (ignores loop)
         * @function
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @returns {Boolean}
         */
        hasPrevious : function(from_index){

            return (from_index ? this.index : this.loading_index) > 0;
        },
        
        /**
         * If the current or loading slide is the first
         * @function
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @returns {Boolean}
         */
        isFirst : function(from_index){

            return (from_index ? this.index : this.loading_index) === 0;
        },

        /**
         * If the current or loading slide is the last
         * @function
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @returns {Boolean}
         */
        isLast : function(from_index){

            return (from_index ? this.index : this.loading_index) === this.slides.length - 1;
        },

        /**
         * If the current or loading slide index is that passed as argument
         * @function
         * @param {Number} index The index
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @returns {Boolean}
         */
        is : function(index, from_index){

            return (from_index ? this.index : this.loading_index) == index;
        },
        
        /**
         * If a slide is an load
         * @function
         * @returns {Boolean}
         */
        isOnLoad : function(){

            return this._on_load;
        },

        /**
         * If a slide is an transition
         * @function
         * @returns {Boolean}
         */
        isOnDraw : function(){

            return this._on_draw;
        },

        /**
         * If playback is waiting for a transition
         * @function
         * @returns {Boolean}
         */
        isOnWait : function(){

            return this._on_wait && this.isPlayed();
        },

        /**
         * If the player is playing
         * @function
         * @returns {Boolean}
         */
        isPlayed : function(){

            return !this._stopped && !this._paused;
        },

        /**
         * If the player is stopped
         * @function
         * @returns {Boolean}
         */
        isStopped : function(){

            return this._stopped;
        },

        /**
         * If the player is on pause
         * @function
         * @returns {Boolean}
         */
        isPaused : function(){

            return this._paused;
        },
        
        
        /**
         * 
         * @function
         * @returns {Boolean}
         */
        computeIndex : function(index){
            
            return index >= this.slides.length ? 0 : index <= -1 ? this.slides.length - 1 : index;
        },
        
        /**
         * Method invoked when the pile of slides change
         * @function
         */
        initPile : function(){
            
            this.slides = $(this.selector, this.context);
            this.fx.initPile();
            this._have_navigation && this.navigation.initPile();
        },
        
        /**
         * Continue playback after a transition
         * Start the timer delay between each transition, whether it is playing
         * @function
         * @param {Number} index The index
         */
        keepOn : function(index){
            
            if(index !== this.loading_index)
                return;
            
            this._on_draw = false;
                
            if(this.isPlayed()){
                
                var self = this,
                    delay = this.delay  - this._defer;
                
                this._time = new Date().getTime();
                
                this._on_wait = true;
                
                this._timeout = setTimeout(function(){
                    
                    self._defer  = 0;
                    self._on_wait = false;

                    self.goTo(self.index + 1);

                }, delay);
                
                this.beforeWait(delay, this._defer, this._time);
            }
            else if(this._paused) {
                this._defer = 0;
            }
        },


        /**
         * Launch the transition, after loading a slide
         * @function
         * @param {Number} index The index
         */
        draw : function(index){
            
            if(index != this.loading_index)
                return; 
            
            var old_sible = this.current,
                old_index = this.index;

            this._on_load = false; 
            this._on_draw = true;
            
            this.current = $(this.slides[index]);
            this.index = index;
            
            this.beforeDraw();
            
            this.fx.draw(old_sible, this.current, old_index, this.index);

            this._have_navigation && this.navigation.draw(old_index, this.index);
        },

        /**
         * Go to the index of a slide
         * @function
         * @param {Number} index The index
         */
        goTo : function(index){
            
            index = this.computeIndex(index);
            
            if(index === this.index){
                
                if(this._on_wait){
                    
                    clearTimeout(this._timeout);
                    this._defer = 0;
                    this.keepOn(index);
                }
                
                return;
            }
            
            if(index === this.loading_index)
                return;
            
            if(this.index !== -1){
                
                if(this._on_wait){
                    
                    this._defer = 0;
                    clearTimeout(this._timeout); 
                }
                
                this.onCancel(this.loading_index);
                this._have_navigation && this.navigation.onCancel(this.index);
            }
            
            this.loading_index = index;
            this._on_load = true;
           
            this.onChange(index);
            this._have_navigation && this.navigation.onChange(index);
            
            this.load(index);
        },
        
        //to override with the config object
        
        /**
         * Load a slide
         * @function
         * @param {Number} index The index
         */
        load : function(index){
            
            this.draw(index);
        },
        
        /**
         * Custom method called  while awaiting a transition
         * @function
         */
        beforeWait : function(delay, elapsed, start_time){},
        
        /**
         * Custom method called when a slide is cancelled
         * @function
         * @param {Number} canceled_index The canceled index
         */
        onCancel : function(canceled_index){},
        
        /**
         * Custom method called when the playback start
         * @function
         */
        onPlay : function(){},
        
        /**
         * Custom method called when on pause
         * @function
         */
        onPause : function(){},
        
        /**
         * Custom method called when the playback is resumed
         * @function
         */
        onResume : function(){},
        
        /**
         * Custom method called when the player stops
         * @function
         */
        onStop : function(){},
        
        /**
         * Custom method called when a slide is changed
         * @function
         * @param {Number} new_index The index of a new slide
         */
        onChange : function(new_index){},
        
        /**
         * Custom method called before a transition
         * @function
         */
        beforeDraw : function(){}
    }
);

/**
 * @namespace 
 * @name $.JocodeFxSlideshow
 */
$.JocodeFxSlideshow = {
    
    /**
     * The base class of a transition between slide
     * 
     * @constructor 
     * @name $.JocodeFxSlideshow.Base
     **/
    Base : $.jocodeClass(
        function(){
            
        }, 
        {
            /** @lends $.JocodeFxSlideshow.Base.prototype */

            /**
             * @property {$.JocodeSlideshow} The slideshow
             */
            slideshow : null,

            /**
             * Launch the transition
             * @function
             * @param {jQuery} from Slide source
             * @param {jQuery} to   Slide destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            draw : function(from, to, from_index, to_index){},

            /**
             * Initialize the transition object
             * @function
             * @param {$.JocodeSlideshow} jocode_slideshow The slideshow
             */
            init : function(slideshow){

                this.slideshow = slideshow;
            },
            
            /**
             * Method invoked when the pile of slides change
             * @function
             */
            initPile : function(){
                
            }
        }
    )
};


/**
 * @namespace 
 * @name $.JocodeProgressBar
 */
$.JocodeProgressBar = {
    
    /**
     * The base class of a transition between slide
     * 
     * @constructor 
     * @name $.JocodeProgressBar.Base
     **/
    Base : $.jocodeClass(
        function(){
            
        }, 
        {
            /** @lends $.JocodeProgressBar.Base.prototype */

            /**
             * 
             * @function
             * @param {Number} value
             * @param {Number} delay
             */
            progress : function(value){}
        }
    )
};



//add JocodeSlideshow as a jQuery plug-in
$.fn.jocodeSlideshow = function(config) {
    
    return this.each(function() {

        $.data(this, 'jocodeSlideshow', new $.JocodeSlideshow(this, config));
    });
};

})(jQuery);

