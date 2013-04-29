/*
 * Copyright 2013 Joakim Carrilho de Almeida
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
 * proble doc progress bar
 * test  event ontouch
 * event mousewheel on navigation and on slides
 * enable browsing history to change slide .... create hash for each slide, and listen onhashchange ... plugin??
 * full screen option .... HTML and CSS integration must allow it, in any case via a plugin ...
 * full of transition
 * more exemple (for test)
 * complete , and present better the documentation
 * an howto section
 * a mixin observable?
 **/

(function($){

    var empty_func = function(){},
        nil = null,
        wrong = false,
        right = true,
        self;

    /**
     * @class $.JocodeSlideshowConfig
     **/
    $.JocodeSlideshowConfig = {

        /**
         * The slides selector
         * 
         * @property $slides
         * @type {String}
         */
        $slides : '',

        /**
         * ...
         * 
         * @property $loader
         * @type {String}
         */  
        $loader : '',

        /**
         * The controls button selector container relative to the initialization container. 
         * The buttons should be present in the container, and have either one of the following class: first, previous, play, pause, resume, stop, next last. 
         * If "<" is specified, then the initialization container will be used.
         * 
         * @property $controls
         * @type {String}
         * @default "<"
         */  
        $controls : '<',

        /**
         * The selector, relative to the initialization container, that defines the elements that triggers whether to display buttons, on the "hover" event. 
         * The controls container must be different of the container of the slideshow.
         * If "<" is specified, then the initialization container will be used.
         * 
         * @property $mask_controls_hover
         * @type {String}
         */ 
        $mask_controls_hover : '',

        /**
         * The selector, relative to the initialization container, that defines the elements that triggers whether to display the navigation container, on the "hover" event. 
         * The parameter container of the navigation must be defined and must be different of the container of the slideshow.
         * If "<" is specified, then the initialization container will be used.
         * 
         * @property $mask_nav_hover
         * @type {String}
         */  
        $mask_nav_hover  : '',

        /**
         * The selector, relative to the initialization container, that defines the elements that triggers whether to display the progress container, on the "hover" event. 
         * The parameter container of the progress object must be defined and must be different of the container of the slideshow.
         * If "<" is specified, then the initialization container will be used.
         * 
         * @property $mask_progress_hover
         * @type {String}
         */
        $mask_progress_hover : '',

        /**
         * Allow touch swipe events to control previous/next.
         * 
         * @property $touch
         * @type {String}
         */ 
        $touch : '',

        /**
         * ...
         * 
         * @property touch_strength
         * @type {Number}
         */ 
        touch_strength : 30,

        /**
         * Stop event propagation and default actions
         * 
         * @property stop_event
         * @type {Boolean}
         * @default true
         */
        stop_event : true,

        /**
         * The css class of disabled controls
         * 
         * @property css_disable_control
         * @type {String}
         */
        css_disable_control : nil,

        /**
         * Class of controls that wait the end of a transition or a loading
         * 
         * @property css_await_control
         * @type {String}
         */
        css_await_control : nil,

        /**
         * Time in milliseconds between each transition
         * 
         * @property delay
         * @type {Number}
         * @default 3000
         */
        delay : 1000,

        /**
         * Transition slide object
         * 
         * @property transition
         * @type {$.JocodeSlideshowTransition.Base}
         */
        transition : nil,

        /**
         * The navigation object
         * 
         * @property navigation
         * @type {$.JocodeSlideshowNavigation}
         */
        navigation : nil,

        /**
         * The progress object
         * 
         * @property progress
         * @type {$.JocodeSlideshowProgress}
         */
        progress : nil,

        /**
         * The start index
         * 
         * @property start_index
         * @type {Number}
         * @default 0
         */
        
        start_index : 0,
        /**
         * Waiting for the end of a transition for draw the change of the navigation item
         * 
         * @property await_nav_transition
         * @type {Boolean}
         * @default false
         */
        await_nav_transition : wrong,

        /**
         * Waiting for the end of a loading to be able to change slide
         * 
         * @property await_load
         * @type {Boolean}
         * @default false
         */
        await_load : wrong,

        /**
         * Waiting for the end of a transition to be able to change slide
         * 
         * @property await_transition
         * @type {Boolean}
         * @default false
         */
        await_transition : wrong,


        /**
         * Hide controls during loading of a slide. 
         * The container of controls must be different of the container of the slideshow.
         * 
         * @property mask_controls_load
         * @type {Boolean}
         * @default false
         */
        mask_controls_load : wrong,

        /**
         * Hide controls during transition of a slide.
         * The container of controls must be different of the container of the slideshow.
         * 
         * @property mask_controls_transition
         * @type {Boolean}
         * @default false
         */
        mask_controls_transition : wrong,

        /**
         * Hide navigation container during transition of a slide.
         * The parameter container of the navigation must be defined and must be different of the container of the slideshow.
         * 
         * @property mask_nav_load
         * @type {Boolean}
         * @default false
         */
        mask_nav_load : wrong,

        /**
         * Hide navigation container during transition of a slide.
         * The parameter container of the navigation must be defined and must be different of the container of the slideshow.
         * 
         * @property mask_nav_transition
         * @type {Boolean}
         * @default false
         */
        mask_nav_transition : wrong,

       /**
        * Hide the progress container during loading of a slide.
        * The parameter container of the progress object must be defined and must be different of the container of the slideshow.
        * 
        * @property mask_progress_load
        * @type {Boolean}
        * @default true
        */ 
        mask_progress_load : right, 

       /**
        * Hide the progress container during transition of a slide.
        * The parameter container of the progress object must be defined and must be different of the container of the slideshow.
        * 
        * @property mask_progress_transition
        * @type {Boolean}
        * @default true
        */  
        mask_progress_transition : right,

       /**
        * Allow keyboard events to control previous/next.
        * 
        * @property keyboard
        * @type {Boolean}
        * @default false
        */ 
        keyboard : wrong,

       /**
        * Enable Autoplay
        * 
        * @property auto_play
        * @type {Boolean}
        * @default false
        */ 
        auto_play : wrong,

        /**
         * ...
         * 
         * @method beforeSetup
         */
        beforeSetup : empty_func,

        /**
         * ...
         * 
         * @method afterSetup
         */
        afterSetup : empty_func,

        /**
         * ...
         * 
         * @method beforeInitPile
         */
        beforeInitPile : empty_func,

        /**
         * ...
         * 
         * @method onSlideClick
         * @param {Event} index ...
         * @param {jQuery} slide ...
         */
        onSlideClick : nil,

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
         * Check that a slide is loaded
         * 
         * @method isLoaded
         * @param {Number} index The index
         */
        isLoaded : function(index){
            return true;
        },

        /**
         * Custom method called  while awaiting a transition
         * 
         * @method beforeWait
         * @param {Number} delay
         * @param {Number} elapsed
         * @param {Number} start_time
         */
        beforeWait : empty_func,

        /**
         * Custom method called when a slide is cancelled
         * 
         * @method onCancel
         * @param {Number} canceled_index The canceled index
         */
        onCancel : empty_func,

        /**
         * Custom method called when the playback start
         * 
         * @method onPlay
         */
        onPlay : empty_func,

        /**
         * Custom method called when on pause
         * 
         * @method onPause
         */
        onPause : empty_func,

        /**
         * Custom method called when the playback is resumed
         * 
         * @method onResume
         */
        onResume : empty_func,

        /**
         * Custom method called when the player stops
         * 
         * @method onStop
         */
        onStop : empty_func,

        /**
         * Custom method called when a slide is changed
         * 
         * @method onChange
         * @param {Number} new_index The index of a new slide
         */
        onChange : empty_func,

        /**
         * Custom method called before a transition
         * 
         * @method beforeTransition
         */
        beforeTransition : empty_func,

        /**
         * Custom method called after a transition
         * 
         * @method afterTransition
         */
        afterTransition : empty_func
    };


    $.JocodeSlideshow = $.jocodeClass(
    {

        /**
         * The JodecodeSlideshow constructor 
         * 
         * @constructor 
         * @class $.JocodeSlideshow
         * @extends $.JocodeWidget
         * @uses $.JocodeSlideshowConfig
         * @param {jQuery} $container The initialization container
         * @param {$.JocodeSlideshowConfig} config  The configuration object
         * @param {$.JocodeSlideshow} override  The override object
         */
        constructor : function($container, config, override){

            self = this;
            
            self.override(override);
            
            self.$container = $container;

            config.beforeSetup && config.beforeSetup.call(self);

            self.initConfig(config);

            self.navigation && self.initNavigation();
            self.progress && self.initProgress();
            self.initTransition();
            self.initControls();
            self.initPile(null);

            config.auto_play 
                ? self.play() 
                : self._toogleBt('pause resume stop', wrong, wrong), self.goTo(self.start_index);

            config.afterSetup && config.afterSetup.call(self);
        },

        defaultConfig : $.JocodeSlideshowConfig,

        /**
         * ...
         * 
         * @protected 
         * @method initNavigation
         */
        initNavigation : function(){

            self.navigation.init(self);

            if(self.config.$mask_nav_hover && self.navigation.$container !== self.$container){

                self._can_mask_navigation = true;
                self._displayOnHover(self.$(self.config.$mask_nav_hover), self.navigation.$container, false);
            }
        },

        /**
         * ...
         * 
         * @protected 
         * @method initProgress
         */
        initProgress : function(){
            
            self.progress.init(self);

            if(self.config.$mask_progress_hover && self.progress.$container !== self.$container){

                self._can_mask_progress = true;
                self._displayOnHover(self.$(self.config.$mask_progress_hover), self.progress.$container, true);
            }
        },
        
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
         * @protected 
         * @method initControls
         */
        initControls : function(){

            var self = this;

            $.each('first previous play pause resume stop next last'.split(' '), function(index, button){

                var bt = self.$(self.config.$controls + ' .' + button);

                bt[0] && (self['$' + button] = bt.click(function(e){ 
                    self._stopEvent(e); 
                    self[button]();
                })); 
            });

            if(self.$controls != self.$container){

                self._can_mask_controls = true;
                self.$mask_controls_hover && 
                    self._displayOnHover(self.$(self.$mask_controls_hover), self.$controls, false);
            }
        },


        /**
         * ...
         * 
         * @protected 
         * @method setOnSlideClick
         * @param {Function} onClick 
         */
        setOnSlideClick : function(onSlideClick){
            
            if(onSlideClick != empty_func){
                
                var self = this;
                self.$container.on('click', self.config.$slides, function(e){
                    onSlideClick.call(self, e, $(this));
                });
            }
        },

        /**
         * ...
         * 
         * @protected 
         * @method setPauseHover
         * @param {String} $pause_hover 
         */
        setPauseHover : function($pause_hover){

            var self = this;

            self.$($pause_hover).hover(
                function() {
                    if(!self._stopped && !self._paused){
                        self._pause_hover = right; 
                        self._pause();
                    }
                }, 
                function() {
                    !self._stopped && self._pause_hover && self.resume();
                }
                );
        },

        /**
         * ...
         * 
         * @protected 
         * @method initKeyboard
         * @param {Boolean} keyboard 
         */
        setKeyboard : function(keyboard){

            var self = this;

            $(document).keyup(function(e) {
                if(e.which == 37) self.previous(); 
                else if(e.which == 39) self.next();
            });
        },

        /**
         * ...
         * 
         * @protected 
         * @method initTouch
         * @param {String} $touch 
         */
        setTouch : function($touch){

            var self = self,
                touch_from, 
                touch_to, 
                touch_strength;

            if('ontouchstart' in document.documentElement){

                touch_strength = self.config.touch_strength || 30;

                self.$($touch).bind({

                    touchstart : function(e){

                        touch_from = e.originalEvent.touches[0].pageX;
                        touch_to = 0;
                    },

                    touchmove : function(e) {

                        touch_to = e.originalEvent.touches[0].pageX;
                    },

                    touchend : function(e) {

                        if (Math.abs(touch_from - touch_to) > touch_strength) {

                            e.preventDefault();
                            e.stopPropagation();

                            touch_from > touch_to ? self.next() : self.previous();
                        }
                    }
                });
            }    
        },

        /**
         * The slides 
         * 
         * @property $slides
         * @type {jQuery}
         */
        $slides : nil,

        /**
         * ...
         * 
         * @property $loader
         * @type {jQuery}
         */
        $loader : nil,

        /**
         * ...
         * 
         * @property $controls
         * @type {jQuery}
         */
        $controls : nil,
        
        /**
         * The button first
         * 
         * @property $first
         * @type {jQuery}
         */
        $first : nil,

        /**
         * The button previous
         * 
         * @property $previous
         * @type {jQuery}
         */
        $previous : nil,

        /**
         * The button play
         * 
         * @property $play
         * @type {jQuery}
         */
        $play : nil,

        /**
         * The button pause
         * 
         * @property $pause
         * @type {jQuery}
         */
        $pause : nil,

        /**
         * The button resume
         * 
         * @property $resume
         * @type {jQuery}
         */
        $resume : nil,

        /**
         * The button stop
         * 
         * @property $stop
         * @type {jQuery}
         */
        $stop : nil,

        /**
         * The button next 
         * 
         * @property $next
         * @type {jQuery}
         */
        $next : nil,

        /**
         * The button last 
         * 
         * @property $last
         * @type {jQuery}
         */
        $last : nil,
        
        /**
         * The current slide
         * 
         * @property $current
         * @type {jQuery}
         */
        $current : nil,
        
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
         * ...
         * 
         * @property _can_mask_navigation
         * @type {Boolean}
         * @default false
         * @private
         */
        _can_mask_navigation : wrong,

        /**
         * ...
         * 
         * @property _can_mask_progress
         * @type {Boolean}
         * @default false
         * @private
         */
        _can_mask_progress : wrong,

        /**
         * ...
         * 
         * @property _can_mask_navigation
         * @type {Boolean}
         * @default false
         * @private
         */
        _can_mask_progress : wrong,

        /**
         * If the player is stopped
         * 
         * @property _stopped
         * @type {Boolean}
         * @default true
         * @private
         */
        _stopped : right,

        /**
         * If the player is on pause
         * 
         * @property _paused
         * @type {Boolean}
         * @default false
         * @private
         */
        _paused : wrong,

        /**
         * If the slide is on load
         * 
         * @property _on_load
         * @type {Boolean}
         * @default false
         * @private
         */
        _on_load : wrong,

        /**
         * If the slide is on transition
         * 
         * @property _on_transition
         * @type {Boolean}
         * @default false
         * @private
         */
        _on_transition : wrong,

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
        _timeout : nil,

        /**
         * Change the css classe of a set of controls
         * 
         * @method _toogleBt
         * @param {String} controls The set of controls
         * @param {Boolean} enable Add or remove a css class
         * @param {Boolean} await  
         * @private
         */
        _toogleBt : function(controls, enable, await){

            self = this;

            var cls = await ? self.css_await_control : self.css_disable_control;

            if(!cls)return;

            $.each(controls.split(' '), function(index, bt){

                var button = self['$' + bt];
                button && (enable ? button.removeClass(cls) : button.addClass(cls));
            });
        },

        /**
         * Stop an click event
         * 
         * @private
         * @method _stopEvent
         * @param {Event} e The event object
         * @param {Boolean} enable Add or remove a css class
         */
        _stopEvent : function(e){

            if(this.stop_event){

                e.preventDefault();
                e.stopPropagation();
            }
        },

        /**
         * Display an element on hover a container
         * 
         * @private
         * @method _displayOnHover
         * @param {jQuery} container The container to listen
         * @param {jQuery} element The element to display
         * @param {Boolean} inverse 
         */
        _displayOnHover : function(container, element, inverse){

            var self = this;

            function show(){
                element.show();
            }
            function hide(){
                element.hide();
            }

            !inverse && element.hide();

            container.hover(
                inverse ? hide : show, 
                inverse ? show : hide
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

            self = this;

            if(!self.isPlayed()){

                self._toogleBt('play resume', wrong, wrong);
                self._toogleBt('pause stop', right, wrong);

                self._stopped = wrong;
                self.onPlay();

                self.goTo(self.start_index);
            }
        },

        /**
         * Pause the player
         * 
         * @method pause
         */
        pause : function(){

            this._pause_hover = wrong;
            this._pause();

            this.progress && this.progress.stop();
        },

        /**
         * Pause the player
         * 
         * @private
         * @method _pause
         */
        _pause : function(){

            self = this;

            if(self.isPlayed()){

                self.progress && self.progress.stop();

                self._toogleBt('resume', right, wrong);
                self._toogleBt('pause', wrong, wrong);

                self._defer += self._on_wait ? (new Date().getTime()) - self._time : 0;
                self._paused = right;

                self.onPause();

                self._on_wait && clearTimeout(self._timeout);
            }
        },

        /**
         * Resume the player
         * 
         * @method resume
         */
        resume : function(){

            self = this;

            if(self._paused){

                self._toogleBt('resume', wrong, wrong);
                self._toogleBt('pause', right, wrong);

                self._paused = wrong;

                self.onResume();

                !self._on_transition && self.keepOn(self.index);
            }
            else if(self._stopped) self.play();
        },

        /**
         * Stop the player
         * 
         * @method stop
         */
        stop : function(){

            self = this;

            if(!self._stopped){

                self._toogleBt('play', right, wrong);
                self._toogleBt('resume pause stop' , wrong, wrong);

                self._stopped = right;

                self.onStop();

                self._on_wait && clearTimeout(self._timeout);

                self.progress && self.progress.stop();
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

            this.goTo(this.$slides.length - 1);
        },

        /**
         * Are there any slides after to current or loading slide (ignores loop)
         * 
         * @method hasNext
         * @param {Boolean} from_index True to test on the index, otherwise on the loading index
         * @return {Boolean}
         */
        hasNext : function(from_index){

            return (from_index ? this.index : this.loading_index) < this.$slides.length - 1;
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

            return (from_index ? this.index : this.loading_index) === this.$slides.length - 1;
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
         * @method isOnTransition
         * @return {Boolean}
         */
        isOnTransition : function(){

            return this._on_transition;
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

            return index >= this.$slides.length ? 0 : index <= -1 ? this.$slides.length - 1 : index;
        },

        /**
         * Method invoked when the pile of slides change
         * 
         * @method initPile
         * @param {Object} obj_arguments....
         */
        initPile : function(obj_arguments){

            self = this;

            self.$slides = self.$(self.config.$slides);
            self.transition.initPile(obj_arguments);

            self.navigation && self.navigation.initPile(obj_arguments);
        },

        /**
         * Continue playback after a transition
         * Start the timer delay between each transition, whether it is playing
         * 
         * @method keepOn
         * @param {Number} index The index
         */
        keepOn : function(index){

            var self = this;

            if(index !== self.loading_index)
                return;

            self.afterTransition();

            self._on_transition = wrong;

            self.navigation && self.await_nav_transition && self.navigation.draw(index);

            if(self.await_transition){

                self._toogleBt('first previous next last', right, right);
                self.navigation && self.navigation.setAwaitCss(wrong);
            }

            self._can_mask_controls && self.mask_controls_transition && self.$controls.show();
            self._can_mask_navigation && self.mask_nav_transition && self.navigation.container.show();

            if(self.isPlayed()){

                var delay = self.delay  - self._defer;

                self._time = new Date().getTime();

                self._on_wait = right;

                self._can_mask_prorgess && self.mask_progress_transition && self.progress.show();

                self.beforeWait(self.delay, delay, self._time);

                self._timeout = setTimeout(function(){

                    self._defer  = 0;
                    self._on_wait = wrong;

                    self.goTo(self.index + 1);

                }, delay);
                
                self.progress && self.progress.play(self.delay, self._defer, self._time);

            }
            else if(self._paused) {
                self._defer = 0;
            }
        },

        /**
         * Launch the transition, after loading a slide
         * 
         * @method draw
         * @param {Number} index The index
         */
        draw : function(index){

            self = this;

            if(index != self.loading_index)
                return; 

            self.$loader &&  self.$loader.hide();

            var old_sible = self.$current,
            old_index = self.index;

            self._on_load = wrong; 
            self._on_transition = right;

            self.$current = $(self.$slides[index]);
            self.index = index;

            self._can_mask_controls && self.mask_controls_load && !self.mask_controls_transition 
            ? self.controls.show() 
            : !self.mask_controls_load && self.mask_controls_transition && self.controls.hide();

            self._can_mask_navigation && (
                self.mask_nav_load && !self.mask_nav_transition 
                ? self.navigation.container.show()
                : !self.mask_nav_load && self.mask_nav_transition && self.navigation.container.hide()
                );

            self._can_mask_progress && (
                !self._stopped 
                ? !self.mask_progress_load && self.mask_progress_transition && self.progress.hide()
                : self.mask_progress_load && self.progress.show()
                );

            if((self.await_load && !self.await_transition) || (!self.await_load && self.await_transition)){

                self._toogleBt('first previous next last', !self.await_transition, right);
                self.navigation && self.navigation.setAwaitCss(self.await_transition);
            }

            self.beforeTransition();

            self.transition.draw(old_sible, self.$current, old_index, index);
            self.navigation && !self.await_nav_transition && self.navigation.draw(index);

        },

        /**
         * Go to slide
         * 
         * @method goTo
         * @param {Number} index The index
         */
        goTo : function(index){

            self = this;

            if((self.await_load && self._on_load) 
                || (self.await_transition && self._on_transition))
                return;

            index = self.computeIndex(index);

            if(index === self.index){

                if(self._on_wait){

                    clearTimeout(self._timeout);
                    self._defer = 0;
                    self.keepOn(index);
                }

                return;
            }

            if(index === self.loading_index)
                return;

            self._on_load = right;

            if(self.progress && !self._stopped){

                self.progress.goTo(1);
                self.progress.stop();
                self._can_mask_progress && self.mask_progress_load && self.progress.hide();
            }

            if(self.await_load){

                self._toogleBt('first previous next last', wrong, right);
                self.navigation &&  self.navigation.setAwaitCss(right);
            }

            self._can_mask_controls && self.mask_controls_load && self.controls.hide();  
            self._can_mask_navigation&& self.mask_nav_load && self.navigation.container.hide();   

            if(self.index !== -1){

                if(self._on_wait){

                    self._defer = 0;
                    clearTimeout(self._timeout); 
                }

                self.onCancel(self.loading_index);
            //self.navigation && self.navigation.onCancel(self.index);
            }

            self.loading_index = index;

            self.onChange(index);
            //self.navigation && self.navigation.onChange(index);

            if(self.isLoaded(index)){
                self.draw(index)
            }
            else {
                self.$loader && self.$loader.show();
                self.load(index);
            }
        }
    },
    $.JocodeWidget, 
    [$.JocodeSlideshowConfig]
    );


    $.JocodeSlideshowTransition = {

        Base : $.jocodeClass(
        {

            /**
            * The base class of transitions between slide
            * 
            * @constructor 
            * @uses $.JocodeConfigurable
            * @uses $.JocodeOverridable
            * @class $.JocodeSlideshowTransition.Base
            * @param {Object} config The configuration object
            * @param {$.JocodeSlideshow} override  The override object
            **/
            constructor : function(config, override){
                this.override(override);
                this.config = config;
            },

            /**
             * Initialize the transition object
             * 
             * @protected 
             * @method init
             * @param {$.JocodeSlideshow} slideshow The slideshow
             */
            init : function(slideshow){
                this.slideshow = slideshow;
                this.initConfig();
            },

            /**
             * Method invoked when the pile of slides change
             * 
             * @method initPile
             * @param {Object} obj_arguments....
             */
            initPile : empty_func,
            
            /**
             * The configuration object
             * 
             * @property config
             * @type {Object}
             */
            config : nil,

            /**
             * The slideshow
             * 
             * @property slideshow
             * @type {$.JocodeSlideshow}
             */
            slideshow : nil,

            /**
             * Launch the transition
             * 
             * @method draw
             * @param {jQuery} from Slide source
             * @param {jQuery} to   Slide destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            draw : empty_func

        }, 
        nil,
        [$.JocodeConfigurable, $.JocodeOverridable]
        )
    };
    
    /**
     * Add JocodeSlideshow as a jQuery plug-in
     * @static
     * @for $ 
     * @method jocodeSlideshow
     * @param {$.JocodeSlideshowConfig} config  The configuration object
     * @param {$.JocodeSlideshow} override  The override object
     * @return {jQuery}
     */
    $.fn.jocodeSlideshow = function(config, override) {

        return this.each(function() {

            $.data(this, 'jocodeSlideshow', new $.JocodeSlideshow($(this), config, override));
        });
    };

})(jQuery);

