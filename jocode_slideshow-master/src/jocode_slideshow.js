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
 * TODO, v1
 * test  event ontouch
 * event mousewheel
 * progress class
 * change the size of the container from the contained, optional autowidth, autoHeight by default in the base class fx??? 
 * enable browsing history to change slide .... create hash for each slide, and listen onhashchange ... plugin??
 * full screen option .... HTML and CSS integration must allow it, in any case via a plugin ...
 * full of transition
 * more exemple (for test)
 * complete , and present better the documentation
 * an howto section
 **/

 /**
  * @class $
  */

(function($){
    
var empty_func = function(){},
    nil = nil,
    wrong = false,
    right = true,
    self;

$.JocodeSlideshow = $.jocodeClass(

    /**
     * The JodecodeSlideshow constructor 
     * 
     * @class $.JocodeSlideshow
     * @constructor
     * @param {jQuery} container  The initialization container
     * @param {Object} config   The configuration object
     *      @param {String}     [config.$slides]                        The slides selector, relative to the initialization container. 
     *      @param {$.JocodeSlideshowNavigation.Base}[config.navigation]The navigation object.
     *      @param {$.JocodeProgressBar.Base}[config.progress_bar]      The progress bar object (TODO)
     *      @param {String}     [config.$buttons]                       The button selector container relative to the initialization container. 
     *                                                                  The buttons should be present in the container, and have either one of the following class: first, previous, play, pause, resume, stop, next last. 
     *                                                                  If "<" is specified, then the initialization container will be used.
     *      @param {String}     [config.$loader]                        ...
     *      @param {String}     [config.$pause_hover]                   The selector, relative to the initialization container, which defines the elements to listen to trigger the break, on the "hover" event. 
     *                                                                  If "<" is specified, then the initialization container will be used.
     *      @param {String}     [config.$mask_buttons_hover]            The selector, relative to the initialization container, that defines the elements that triggers whether to display buttons, on the "hover" event. 
     *                                                                  The container of buttons must be different of the container of the slideshow.
     *                                                                  If "<" is specified, then the initialization container will be used.
     *      @param {String}     [config.$mask_nav_hover]                The selector, relative to the initialization container, that defines the elements that triggers whether to display the navigation container, on the "hover" event. 
     *                                                                  The parameter container of the navigation must be defined and must be different of the container of the slideshow.
     *                                                                  If "<" is specified, then the initialization container will be used.
    *      @param {Boolean}     [config.mask_buttons_load=false]        Hide buttons during loading of a slide.
    *                                                                   The container of buttons must be different of the container of the slideshow.
    *      @param {Boolean}     [config.mask_buttons_fx=false]          Hide buttons during transition of a slide.
    *                                                                   The container of buttons must be different of the container of the slideshow.
    *      @param {Boolean}     [config.mask_nav_load=false]            Hide navigation container during transition of a slide.
    *                                                                   The parameter container of the navigation must be defined and must be different of the container of the slideshow.
    *      @param {Boolean}     [config.mask_nav_fx=false]              Hide navigation container during transition of a slide.
    *                                                                   The parameter container of the navigation must be defined and must be different of the container of the slideshow.
     *      @param {Boolean}    [config.await_nav_fx=false]             Waiting for the end of a transition for draw the change of the navigation item.
     *      @param {Boolean}    [config.await_load=false]               Waiting for the end of a loading to be able to change slide.
     *      @param {Boolean}    [config.await_fx=false]                 Waiting for the end of a transition to be able to change slide.
     *      @param {String}     [config.css_await_bt]                   Class of buttons that wait the end of a transition or a loading.
     *      @param {Boolean}    [config.touch=false]                    Allow touch swipe events to control previous/next.
     *      @param {Boolean}    [config.touch_strength=30]              ...
     *      @param {Boolean}    [config.keyboard=false]                 Allow keyboard events to control previous/next.
     *      @param {String}     [config.css_disable_bt]                 Class of disabled buttons.
     *      @param {Boolean}    [config.auto_play=false]                Enable Autoplay.
     *      @param {Number}     [config.delay=3000]                     Time in milliseconds between each transition .
     *      @param {Boolean}    [config.stop_event=true]                Stop event propagation and default actions.
     *      @param {Number}     [config.start_index=0]                  The start index.
     *      @param {$.JocodeSlideshowFx.Base}[config.fx]                Transition slide object.
     *      @param {Function}   [config.load]                           Loading slide function.
     *          @param {Number} config.load.index
     *      @param {Function}   [config.beforeWait]                     Custom method called  while awaiting a transition.
     *          @param {Number}     config.beforeWait.delay 
     *          @param {Number}     config.beforeWait.elapsed 
     *          @param {Number}     config.beforeWait.start_time 
     *      @param {Function}   [config.onCancel]                       Custom method called when a slide is cancelled.
     *          @param {Number}     config.onCancel.canceled_index 
     *      @param {Function}   [config.onPlay]                         Custom method called when the playback start.
     *      @param {Function}   [config.onPause]                        Custom method called when on pause.
     *      @param {Function}   [config.onResume]                       Custom method called when the playback is resumed.
     *      @param {Function}   [config.onStop]                         Custom method called when the player stops.
     *      @param {Function}   [config.onChange]                       Custom method called when a slide is changed.
     *          @param {Number}      config.onChange.new_index 
     *      @param {Function}   [config.beforeDraw]                     Custom method called before a transition.
     *      @param {Function}   [config.afterDraw]                      Custom method called adter a transition. 
     *      @param {Function}   [config.beforeSetup]                    ....
     *      @param {Function}   [config.afterSetup]                     ....
     *      @param {Function}   [config.beforeInitPile]                 ....
     *      @param {Function}   [config.isLoaded]                       Check that a slide is loaded.
     *          @param {Number}      config.isLoaded.index 
     *      @param {Function}   [config.onClick]                        ...
     *          @param {Event}      config.onClick.e 
     *          @param {jQuery}     config.onClick.slide 
     **/
    function (container, config){
        
        var self = this,
            touch_from, touch_to, touch_strength, bt;
        
        self.container = container;
        self.config = config;
        
        config.beforeSetup && config.beforeSetup.call(self);
        
        this.setConfig(config);
        
        config.onClick && self.container.on('click', config.$slides, function(e){
            config.onClick.call(self, e, $(this));
        });
        
        config.$loader && (self.loader = self.$(config.$loader));
        
        if(config.$pause_hover){
            
            self.$(config.$pause_hover).hover(
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
        }
        
        if(config.keyboard){
            $(document).keyup(function(e) {
                if(e.which == 37) self.previous(); 
                else if(e.which == 39) self.next();
            });
        }
        
        if(config.touch && 'ontouchstart' in document.documentElement){
            
            touch_strength = config.touch_strength || 30;
            
            self.event_container.bind({
                
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

        if(self.navigation){
            
            self.navigation.init(self);
            
            if(self.navigation.container !== self.container){
                
                if(config.$mask_nav_hover){
                    
                     self.navigation.container.hide();
                    self._displayOnHover(self.$(config.$mask_nav_hover), self.navigation.container);
                }
                
                self.mask_nav_load = config.mask_nav_load;
                self.mask_nav_fx = config.mask_nav_fx;
            }
        }
        
        if(self.progress){
            self.progress.init(this);
        }
        
        self.buttons = self.$(config.$buttons);
        
        $.each('first previous play pause resume stop next last'.split(' '), function(index, button){
            
            bt = $(' .' + button, self.buttons);

            bt[0] && (self['bt_' + button] = bt.click(function(e){
                self._stopEvent(e); 
                self[button]();
            })); 
        });
        
        if(self.buttons != self.container){
            
            if(config.$mask_buttons_hover){
                
                self.buttons.hide();
                self._displayOnHover(self.$(config.$mask_buttons_hover), self.buttons);
            }
            
            self.mask_buttons_load = config.mask_buttons_load;
            self.mask_buttons_fx = config.mask_buttons_fx;
        }
        
        self.fx.init(self);
        
        self.initPile();
        
        if(config.auto_play){
            
            self.play();
        }
        else{ 
            
            self._toogleBt('pause resume stop', wrong, wrong);
            self.goTo(self.start_index);
        }
        
        config.afterSetup && config.afterSetup.call(self);
        
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
         * The initialization container
         * 
         * @property container
         * @type {jQuery}
         */
        container : nil,
        
        /**
         * The slides selector
         * 
         * @property $slides
         * @type {String}
         */
        $slides : nil,
        
        /**
         * The slides
         * 
         * @property slides
         * @type {jQuery}
         */
        slides : nil,
        
        /**
         * ...
         * 
         * @property loader
         * @type {jQuery}
         */
        loader : nil,

        /**
         * The navigation object
         * 
         * @property navigation
         * @type {$.JocodeSlideshowNavigation}
         */
        navigation : nil,
        
        /**
         * The container of buttons
         * 
         * @property buttons
         * @type {jQuery}
         */
        buttons : nil,
        
        /**
         * The button first
         * 
         * @property bt_first
         * @type {jQuery}
         */
        bt_first : nil,

        /**
         * The button previous
         * 
         * @property bt_previous
         * @type {jQuery}
         */
        bt_previous : nil,

        /**
         * The button play
         * 
         * @property bt_play
         * @type {jQuery}
         */
        bt_play : nil,

        /**
         * The button pause
         * 
         * @property bt_pause
         * @type {jQuery}
         */
        bt_pause : nil,

        /**
         * The button resume
         * 
         * @property bt_resume
         * @type {jQuery}
         */
        bt_resume : nil,

        /**
         * The button stop
         * 
         * @property bt_stop
         * @type {jQuery}
         */
        bt_stop : nil,

        /**
         * The button next 
         * 
         * @property bt_next
         * @type {jQuery}
         */
        /**
         * @property {jQuery} The button next 
         */
        bt_next : nil,

        /**
         * The button last 
         * 
         * @property bt_last
         * @type {jQuery}
         */
        bt_last : nil,

        /**
         * The css class of disabled buttons
         * 
         * @property css_disable_bt
         * @type {String}
         */
        css_disable_bt : nil,
        
        /**
         * Class of buttons that wait the end of a transition or a loading
         * 
         * @property css_await_bt
         * @type {String}
         */
        css_await_bt : nil,
        
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
        fx : nil,
        
        /**
         * The current slide
         * 
         * @property current
         * @type {jQuery}
         */
        current : nil,

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
         * Waiting for the end of a transition for draw the change of the navigation item
         * 
         * @property await_nav_fx
         * @type {Boolean}
         * @default false
         */
        await_nav_fx : wrong,
        
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
         * @property await_fx
         * @type {Boolean}
         * @default false
         */
        await_fx : wrong,
        
        
        /**
         * Hide buttons during loading of a slide. 
         * The container of buttons must be different of the container of the slideshow.
         * 
         * @property mask_buttons_load
         * @type {Boolean}
         * @default false
         */
        mask_buttons_load : wrong,
        
        /**
         * Hide buttons during transition of a slide.
         * The container of buttons must be different of the container of the slideshow.
         * 
         * @property mask_buttons_fx
         * @type {Boolean}
         * @default false
         */
        mask_buttons_fx : wrong,
        
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
         * @property mask_nav_fx
         * @type {Boolean}
         * @default false
         */
        mask_nav_fx : wrong,
        
        
        /**...
         */
        progress : nil,
        
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
         * @property _on_fx
         * @type {Boolean}
         * @default false
         * @private
         */
        _on_fx : wrong,

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
         * ....
         * 
         * @method $
         * @param {String} selector ...
         */
        $ : function(selector){
            
            return !selector || selector === '<' ? this.container : $(selector, this.container);
        },
        
        /**
         * Change the css classe of a set of buttons
         * 
         * @method _toogleBt
         * @param {String} buttons The set of buttons
         * @param {Boolean} enable Add or remove a css class
         * @param {Boolean} await  
         * @private
         */
        _toogleBt : function(buttons, enable, await){
            
            self = this;
            
            var cls = await ? self.css_await_bt : self.css_disable_bt;
            
            if(!cls)return;
            
            $.each(buttons.split(' '), function(index, bt){
                
                var button = self['bt_' + bt];
                button && (enable ? button.removeClass(cls)  : button.addClass(cls));
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
         * Display an element on hover a container
         * 
         * @method _displayOnHover
         * @param {jQuery} container The container to listen
         * @param {jQuery} container The element to display
         * @private
         */
        _displayOnHover : function(container, element){

            var self = this;

            container.hover(
                function() {
                    element.show();
                }, 
                function() {
                    element.hide();
                }
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
                
                self.index = self.loading_index = -1;
                
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
                
                !self._on_fx && self.keepOn(self.index);
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
         * @method isOnFx
         * @return {Boolean}
         */
        isOnFx : function(){

            return this._on_fx;
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
            
            self = this;
            
            var last_pile = self.slides;
            
            self.beforeInitPile();
            
            self.slides = $(self.$slides, self.container);
            self.fx.initPile(last_pile);
            
            self.navigation && self.navigation.initPile(last_pile);
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
            
            self.afterDraw();
            
            self._on_fx = wrong;
                
            self.navigation && self.await_nav_fx && self.navigation.draw(index);
            
            if(self.await_fx){
                
                self._toogleBt('first previous next last', right, right);
                self.navigation && self.navigation.setAwaitCss(wrong);
            }
            
            self.mask_buttons_fx && self.buttons.show();
            self.mask_nav_fx && self.navigation.container.show();
            
            if(self.isPlayed()){
                
                var delay = self.delay  - self._defer;
                
                self._time = new Date().getTime();
                
                self._on_wait = right;
                
                self._timeout = setTimeout(function(){
                    
                    self._defer  = 0;
                    self._on_wait = wrong;

                    self.goTo(self.index + 1);

                }, delay);
                
                self.progress && self.progress.play(delay, self._defer, self._time);
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
            
            self.loader &&  self.loader.hide();
                
            var old_sible = self.current,
                old_index = self.index;
                 
            self._on_load = wrong; 
            self._on_fx = right;
            
            self.current = $(self.slides[index]);
            self.index = index;
            
            self.mask_buttons_load && !self.mask_buttons_fx ? self.buttons.show() 
                : !self.mask_buttons_load && self.mask_buttons_fx && self.buttons.hide();
                
            self.mask_nav_load && !self.mask_nav_fx ? self.navigation.container.show()
                : !self.mask_nav_load && self.mask_nav_fx && self.navigation.container.hide();
            
            
            if((self.await_load && !self.await_fx) || (!self.await_load && self.await_fx)){
                
                self._toogleBt('first previous next last', !self.await_fx, right);
                self.navigation && self.navigation.setAwaitCss(self.await_fx);
            }
            
            self.beforeDraw();
            
            self.fx.draw(old_sible, self.current, old_index, index);
            self.navigation && !self.await_nav_fx && self.navigation.draw(index);
           
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
                    || (self.await_fx && self._on_fx))
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
            
            self.progress && self.isPlayed() && self.progress.stop();
            
            if(self.await_load){
                
                self._toogleBt('first previous next last', wrong, right);
                self.navigation &&  self.navigation.setAwaitCss(right);
            }
            
            self.mask_buttons_load && self.buttons.hide();  
            self.mask_nav_load && self.navigation.container.hide();   
            
            if(self.index !== -1){
                
                if(self._on_wait){
                    
                    self._defer = 0;
                    clearTimeout(self._timeout); 
                }
                
                self.onCancel(self.loading_index);
                self.navigation && self.navigation.onCancel(self.index);
            }
            
            self.loading_index = index;
           
            self.onChange(index);
            self.navigation && self.navigation.onChange(index);
            
            if(self.isLoaded(index)){
                //alert(self.loading_index)
                self.draw(index)
            }
            else {
                self.loader && self.loader.show();
                self.load(index);
            }
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
         * @method beforeDraw
         */
        beforeDraw : empty_func,
        
        /**
         * Custom method called after a transition
         * 
         * @method afterDraw
         */
        afterDraw : empty_func,
        
        
        beforeInitPile : empty_func
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
            draw : empty_func,
            
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
             * @param {jQuery} last_pile The last pile of slides 
             */
            initPile : empty_func
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

