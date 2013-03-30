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
 * evenement touch et clavier pour l'acc�ssibilit� !important
 * attendre fin de transition pour changer d'item de navigation.... 
 * permettre une initailisation de l'index de d�part via un random, par exemple en mettant -1 ?? bof
 * diff�rence entre un pause via le bouton et via l'evenement hover !important
 * cr�ation des items de navigation � la vol�  via des fonctions , ou des templates, encore mieux!! !important
 * options infinie, �l�ment pr�c�dent en fin de pile  !important, mais ca va �tre gal�re .... � faire en premier !!!
 * fx, changer la taille du conteneur par rapport au contenue, en option , autowidth, autoheight, par d�faut dans la classe de base fx ???  !important
 * activer l'historique de navigation au changement de slide .... pour des sites avec juste un slide comme contenue, ca peut �tre pas mal
 * afficher les boutons , navigation ou du player, que lors d'un mouse hover ... pk pas
 * �couteur live on click sur un slide, !important 
 * option plein �cran .... faut que  l'int�gration HTML et CSS le permet, en tout cas via un plugin, � r�fl�chir ...
 * tout plein de transition qui envoie
 * revoir play et l'index start
 **/

 /**
  * @class $
  */

(function($){

$.JocodeSlideshow = $.jocodeClass(

    /**
     * The JodecodeSlideshow constructor 
     * 
     * @class $.JocodeSlideshow
     * @constructor
     * @param {jQuery} context  The initialization context
     * @param {Object} config   The configuration object
     *      @param {String}     config.$slides                          The slides selector, relative to the initialization context
     *      @param {String}     [config.$buttons]                       The button selector
     *      @param {$.JocodeSlideshowNavigation.Base}[config.navigation]The navigation object
     *      @param {$.JocodeProgressBar.Base}[config.progress_bar]      The progress bar object (TODO)
     *      @param {String}     [config.disabled_bt_class]              Class of disabled buttons
     *      @param {Boolean}    [config.auto_play=false]                Enable Autoplay
     *      @param {Number}     [config.delay=3000]                     Time in milliseconds between each transition
     *      @param {String}     [config.hover_container]                The selector of the container of event hover(by default,  the jQuery parent()  function to find him).
     *      @param {Boolean}    [config.pause_over=true]                Stop on mouseover
     *      @param {Boolean}    [config.stop_event=true]                Stop event propagation and default actions
     *      @param {Number}     [config.start_index=0]                  The start index
     *      @param {$.JocodeSlideshowFx.Base}[config.fx]                Transition slide object
     *      @param {Function}   [config.load]                           Loading slide function 
     *          @param {Number} config.load.index
     *      @param {Function}   [config.beforeWait]                     Custom method called  while awaiting a transition
     *          @param {Number}     config.beforeWait.delay 
     *          @param {Number}     config.beforeWait.elapsed 
     *          @param {Number}     config.beforeWait.start_time 
     *      @param {Function}   [config.onCancel]                       Custom method called when a slide is cancelled
     *          @param {Number}     config.onCancel.canceled_index 
     *      @param {Function}   [config.onPlay]                         Custom method called when the playback start
     *      @param {Function}   [config.onPause]                        Custom method called when on pause
     *      @param {Function}   [config.onResume]                       Custom method called when the playback is resumed
     *      @param {Function}   [config.onStop]                         Custom method called when the player stops
     *      @param {Function}   [config.onChange]                       Custom method called when a slide is changed
     *          @param {Number}      config.onChange.new_index 
     *      @param {Function}   [config.beforeDraw]                     Custom method called before a transition
     **/
    function (context, config){
        
        //check error
        if(!config)
            throw new Error('jocodeSlideshow Error: Missing parameter "config"');

        if(!config.$slides)
            throw new Error('jocodeSlideshow Error: Missing parameter "config.$slides"');

        if(!config.fx || !(config.fx instanceof $.JocodeSlideshowFx.Base))
            throw new Error('jocodeSlideshow Error: Parameter "config.fx" is missing or is not of the type "$.JocodeSlideshowFx.Base"');

        var self = this,
            ctx_button,
            bt;
        
        //set requiered 
        this.context = context;
        this.config = config;
        this.fx = config.fx;
        this.$slides = config.$slides;
        this.slides = $(config.$slides, context);
        //alert(this.slides.length)
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
        'start_index' in config && (
            this.start_index = Math.abs(config.start_index) || 0
        ); 
            
        //init event
        $.each('load beforeWait onCancel onPlay onPause onResume onStop onChange beforeDraw'.split(' '), function(index, method){
                
            typeof config[method] == 'function' && (
                self[method]= config[method]
            );
        });
        
        if(!('pause_over' in config) ||  config.pause_over)
            this.addPauseEventOnHover(this.hover_container);
        
        //init navigation
        if(config.navigation && config.navigation instanceof $.JocodeSlideshowNavigation){

            this.navigation = config.navigation;
            this._have_navigation = true; 
            this.navigation.init(this);
        }
        
        //initialize buttons
        if(config.$buttons){
            
            ctx_button = $(config.$buttons, context);
            
            $.each('first previous play pause resume stop next last'.split(' '), function(index, button){
                
                bt = $(' .' + button, ctx_button);
                if(bt[0]){
                    
                    self['bt_' + button] = bt.click(function(e){

                        self._stopEvent(e); 
                        self[button]();
                    });
                }
            });
        }
        
        //init transition object
        this.fx.init(this);
        
        //enable/disable buttons
        if(config.auto_play){
            
            this.play();
        }
        else{ 
            
            this._toogleBt('pause resume stop', false);
            //got to start index
            self.goTo(this.start_index);
        }
        
    },
    
    {
        /**
         * The configuration object
         * 
         * @property config
         * @type {Object}
         */
        config : null,
        
        /**
         * The initialization context
         * 
         * @property context
         * @type {jQuery}
         */
        context : null,
        
        /**
         * The slides selector
         * 
         * @property $slides
         * @type {String}
         */
        $slides : null,
        
        /**
         * The slides
         * 
         * @property slides
         * @type {jQuery}
         */
        slides : null,
        
        /**
         * The container of the event hover
         * 
         * @property hover_container
         * @type {jQuery}
         */
        hover_container : null,
        
        /**
         * The navigation object
         * 
         * @property navigation
         * @type {$.JocodeSlideshowNavigation.Base}
         */
        navigation : null,
        
        /**
         * The button first
         * 
         * @property bt_first
         * @type {jQuery}
         */
        bt_first : null,

        /**
         * The button previous
         * 
         * @property bt_previous
         * @type {jQuery}
         */
        bt_previous : null,

        /**
         * The button play
         * 
         * @property bt_play
         * @type {jQuery}
         */
        bt_play : null,

        /**
         * The button pause
         * 
         * @property bt_pause
         * @type {jQuery}
         */
        bt_pause : null,

        /**
         * The button resume
         * 
         * @property bt_resume
         * @type {jQuery}
         */
        bt_resume : null,

        /**
         * The button stop
         * 
         * @property bt_stop
         * @type {jQuery}
         */
        bt_stop : null,

        /**
         * The button next 
         * 
         * @property bt_next
         * @type {jQuery}
         */
        /**
         * @property {jQuery} The button next 
         */
        bt_next : null,

        /**
         * The button last 
         * 
         * @property bt_last
         * @type {jQuery}
         */
        bt_last : null,

        /**
         * The css class of disabled buttons
         * 
         * @property disabled_bt_class
         * @type {String}
         */
        disabled_bt_class : null,

        /**
         * Time in milliseconds between each transition
         * 
         * @property delay
         * @type {Number}
         * @default 3000
         */
        delay : 3000,
        
        /**
         * Transition slide object
         * 
         * @property fx
         * @type {$.JocodeSlideshowFx.Base}
         */
        fx : null,
        
        /**
         * The current slide
         * 
         * @property current
         * @type {jQuery}
         */
        current : null,

        /**
         * The start index
         * 
         * @property start_index
         * @type {Number}
         * @default 0
         */
        start_index : 0,
        
        /**
         * The current index
         * 
         * @property index
         * @type {Number}
         * @default -1
         */
        index : -1,
        
        
        /**
         * The loading index
         * 
         * @property loading_index
         * @type {Number}
         * @default -1
         */
        loading_index : -1,
        
        /**
         * If the player is stopped
         * 
         * @property _stopped
         * @type {Boolean}
         * @default true
         * @private
         */
        _stopped : true,

        /**
         * If the player is on pause
         * 
         * @property _paused
         * @type {Boolean}
         * @default false
         * @private
         */
        _paused : false,
        
        /**
         * If the slide is on load
         * 
         * @property _on_load
         * @type {Boolean}
         * @default false
         * @private
         */
        _on_load : false,
        
        /**
         * If the slide is on transition
         * 
         * @property _on_draw
         * @type {Boolean}
         * @default false
         * @private
         */
        _on_draw : false,

        /**
         * If have navigation
         * 
         * @property _have_navigation
         * @type {Boolean}
         * @default false
         * @private
         */
        _have_navigation : false,
        
        /**
         * The timestamp of the beginning of the time interval between transitions
         * 
         * @property _time
         * @type {Number}
         * @default 0
         * @private
         */
        _time : 0,

        /**
         * The time delay during a break
         * 
         * @property _defer
         * @type {Number}
         * @default 0
         * @private
         */
        _defer : 0,

        /**
         * The waiting timer between slides
         * 
         * @property _timeout
         * @type {Number}
         * @private
         */
        _timeout : null,
        
        /**
         * Change the css classe of a set of buttons
         * 
         * @method _toogleBt
         * @param {String} buttons The set of buttons
         * @param {Boolean} enable Add or remove a css class
         * @private
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
         * Stop an click event
         * 
         * @method _stopEvent
         * @param {Event} e The event object
         * @param {Boolean} enable Add or remove a css class
         * @private
         */
        _stopEvent : function(e){

            if(this.stop_event){

                e.preventDefault();
                e.stopPropagation();
            }
        },
        
        /**
         * Set pause on hover event
         * 
         * @method addPauseEventOnHover
         * @param {jQuery} el The element to listen
         */
        addPauseEventOnHover : function(el){

            var self = this;

            el.hover(
                function() {self.pause();}, 
                function() {self.resume();}
            );
        },
        
        /**
         * Go to the first slide
         * 
         * @method first
         */
        first : function(){

            this.goTo(0);
        },
        
        /**
         * Go to the previous slide
         * 
         * @method previous
         */
        previous : function(){

            this.goTo(this.loading_index - 1);
        },
        /**
         * Start the player
         * 
         * @method play
         */
        play : function(){
            
            if(!this.isPlayed()){
                
                this.index = this.loading_index = -1;
                
                this._toogleBt('play resume', false);
                this._toogleBt('pause stop', true);

                this._stopped = false;
                this.onPlay();
                
                this.goTo(this.start_index);
            }
        },
        
        /**
         * Pause the player
         * 
         * @method pause
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
         * 
         * @method resume
         */
        resume : function(){

            if(this._paused){
                this._toogleBt('resume', false);
                this._toogleBt('pause', true);

                this._paused = false;
                
                this.onResume();
                
                !this._on_draw && this.keepOn(this.index);
            }
            else this.play();
        },
        
        /**
         * Stop the player
         * 
         * @method stop
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
         * 
         * @method next
         */
        next : function(){

            this.goTo(this.loading_index + 1);
        },
        
        /**
         * Go to the last slide
         * 
         * @method last
         */
        last : function(){

            this.goTo(this.slides.length - 1);
        },
        
         /**
         * Are there any slides after to current or loading slide (ignores loop)
         * 
         * @method hasNext
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @return {Boolean}
         */
        hasNext : function(from_index){

            return (from_index ? this.index : this.loading_index) < this.slides.length - 1;
        },
        
        /**
         * Are there any slides previous to current or loading slide (ignores loop)
         * 
         * @method hasPrevious
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @return {Boolean}
         */
        hasPrevious : function(from_index){

            return (from_index ? this.index : this.loading_index) > 0;
        },
        
        /**
         * If the current or loading slide is the first
         * 
         * @method isFirst
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @return {Boolean}
         */
        isFirst : function(from_index){

            return (from_index ? this.index : this.loading_index) === 0;
        },
        
        /**
         * If the current or loading slide is the last
         * 
         * @method isLast
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @return {Boolean}
         */
        isLast : function(from_index){

            return (from_index ? this.index : this.loading_index) === this.slides.length - 1;
        },
        
        /**
         * If the current or loading slide index is that passed as argument
         * 
         * @method is
         * @param {Number} index The index
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @return {Boolean}
         */
        is : function(index, from_index){

            return (from_index ? this.index : this.loading_index) == index;
        },
        
        /**
         * If a slide is an load
         * 
         * @method isOnLoad
         * @return {Boolean}
         */
        isOnLoad : function(){

            return this._on_load;
        },
        
        /**
         * If a slide is an transition
         * 
         * @method isOnDraw
         * @return {Boolean}
         */
        isOnDraw : function(){

            return this._on_draw;
        },
        
        /**
         * If playback is waiting for a transition
         * 
         * @method isOnWait
         * @return {Boolean}
         */
        isOnWait : function(){

            return this._on_wait && this.isPlayed();
        },
        
        /**
         * If the player is playing
         * 
         * @method isPlayed
         * @return {Boolean}
         */
        isPlayed : function(){

            return !this._stopped && !this._paused;
        },
        
        /**
         * If the player is stopped
         * 
         * @method isStopped
         * @return {Boolean}
         */
        isStopped : function(){

            return this._stopped;
        },
        
        /**
         * If the player is on pause
         * 
         * @method isPaused
         * @return {Boolean}
         */
        isPaused : function(){

            return this._paused;
        },
        
        /**
         * Calculate an index
         * 
         * @method computeIndex
         * @param {Number} index The index
         * @return {Number}
         */
        computeIndex : function(index){
            
            return index >= this.slides.length ? 0 : index <= -1 ? this.slides.length - 1 : index;
        },
        
        /**
         * Method invoked when the pile of slides change
         * 
         * @method initPile
         */
        initPile : function(){
            
            this.slides = $(this.$slides, this.context);
            this.fx.initPile();
            
            this._have_navigation && this.navigation.initPile();
        },
        
        /**
         * Continue playback after a transition
         * Start the timer delay between each transition, whether it is playing
         * 
         * @method keepOn
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
         * 
         * @method draw
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
         * Go to slide
         * 
         * @method goTo
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
         * 
         * @method load
         * @param {Number} index The index
         */
        load : function(index){
            
            this.draw(index);
        },
        
        /**
         * Custom method called  while awaiting a transition
         * 
         * @method beforeWait
         * @param {Number} delay
         * @param {Number} elapsed
         * @param {Number} start_time
         */
        beforeWait : function(delay, elapsed, start_time){},
        
        /**
         * Custom method called when a slide is cancelled
         * 
         * @method onCancel
         * @param {Number} canceled_index The canceled index
         */
        onCancel : function(canceled_index){},
        
        /**
         * Custom method called when the playback start
         * 
         * @method onPlay
         */
        onPlay : function(){},
        
       /**
         * Custom method called when on pause
         * 
         * @method onPause
         */
        onPause : function(){},
        
        /**
         * Custom method called when the playback is resumed
         * 
         * @method onResume
         */
        onResume : function(){},
        
        /**
         * Custom method called when the player stops
         * 
         * @method onStop
         */
        onStop : function(){},
        
        /**
         * Custom method called when a slide is changed
         * 
         * @method onChange
         * @param {Number} new_index The index of a new slide
         */
        onChange : function(new_index){},
        
        /**
         * Custom method called before a transition
         * 
         * @method beforeDraw
         */
        beforeDraw : function(){}
    }
);


$.JocodeSlideshowFx = {
    
    Base : $.jocodeClass(
    
        /**
         * The base class of transitions between slide
         * 
         * @class $.JocodeSlideshowFx.Base
         * @constructor 
         **/
        function(){
            
        }, 
        {
            /**
             * The slideshow
             * 
             * @property slideshow
             * @type {$.JocodeSlideshow}
             */
            slideshow : null,
            
            /**
             * Launch the transition
             * 
             * @method draw
             * @param {jQuery} from Slide source
             * @param {jQuery} to   Slide destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            draw : function(from, to, from_index, to_index){},
            
            /**
             * Initialize the transition object
             * 
             * @method init
             * @param {$.JocodeSlideshow} jocode_slideshow The slideshow
             */
            init : function(slideshow){

                this.slideshow = slideshow;
            },
            
            /**
             * Method invoked when the pile of slides change
             * 
             * @method initPile
             */
            initPile : function(){
                
            }
        }
    )
};

/**
  * Add JocodeSlideshow as a jQuery plug-in
  * @method jocodeSlideshow
  * @param {Object} config The configuration object
  * @for $ 
  * @static
  * @return {jQuery}
  */
//
$.fn.jocodeSlideshow = function(config) {
    
    return this.each(function() {
       
        $.data(this, 'jocodeSlideshow', new $.JocodeSlideshow($(this), config));
    });
};

})(jQuery);

