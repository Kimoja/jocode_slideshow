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


(function($){


$.JocodeNavigationSlideshow = $.jocodeClass(
        
    /**
     *  The navigation class for a slideshow
     *  
     * @constructor 
     * @name $.JocodeNavigationSlideshow
     * @param {Object} config  The configuration object
     *      @param {String}   config.selector                                   The navigation items selector, relative to the slideshow context if from_context set to true
     *      @param {$.JocodeFxNavigationSlideshow.Base}[config.fx_navigation]   Transition navigation items object
     *      @param {String}   [config.hover_container]                          The selector of the container of event hover(by default,  the jQuery parent()  function to find him).
     *                                                                          It used to assign the event hover 
     *      @param {String}   [config.context]                                  The context of selectors
     *      @param {String}   [config.selected_class]                           Class of the selected item
     *      @param {String}   [config.scrolled_class]                           Class of the scrolled item
     *      @param {Boolean}  [config.pause_over=true]                          Stop on mouseover
     *      @param {Boolean}  [config.stop_event=true]                          Stop event propagation and default actions
     *      @param {Function} [config.indexOf]                                  Function that returns the index of a slide
     *      @param {Function} [config.onChange]                                 ...
     *      @param {Function} [config.onCancel]                                 ...
     *      @param {Function} [config.beforeDraw]                               ...
     *      @param {Function} [config.beforeScroll]                             ...
     **/
    function(config){

        if(!config)
            throw new Error('JocodeNavigationSlideshow Error: Missing parameter "config"');

        if(!config.selector)
            throw new Error('JocodeNavigationSlideshow Error: Missing parameter "config.selector"');

        if(!config.fx || !(config.fx instanceof $.JocodeFxNavigationSlideshow.Base))
            throw new Error('JocodeNavigationSlideshow Error: Parameter "config.fx" is missing or is not of the type "$.JocodeFxNavigationSlideshow.Base"');

        this.config = config;
    },
    {
        /**
         * @property {$.JocodeSlideshow} The slideshow
         */
        slideshow : null,

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
         * @property {jQuery} The navigation items
         */
        items : null,

        /**
         * @property {jQuery} The container of the event hover
         */
        hover_container : null,

        /**
         * @property {String} The css class of selected item
         */
        selected_class : null,
        
        /**
         * @property {String} The css class of scrolled item
         */
        scrolled_class : null,
        
        /**
         * @property {jQuery} The current item of navigation
         */
        current : null,
        
        /**
         * @property {jQuery} The current scrolled item of navigation
         */
        current_scrolled : null,
        
        /**
         * @property {jQuery} The button first
         */
        bt_first : null,

        /**
         * @property {jQuery} The button previous
         */
        bt_previous : null,
        
        /**
         * @property {jQuery} The button next 
         */
        bt_next : null,

        /**
         * @property {jQuery} The button last 
         */
        bt_last : null,

        /**
         * @property {jQuery} The scrolled index 
         */
        scrolled_index : -1,

        /**
         * @property {$.JocodeFxNavigationSlideshow.Base} Transition navigation items object
         */
        fx : null,

        /**
         * Initialize the navigation
         * @function
         * @property {$.JocodeSlideshow.Base} The slideshow
         */
        init : function(slideshow){

            var self = this,
                config = this.config;
                
            //set requiered 
            this.context = config.context ? $(config.context) : slideshow.context;
            this.slideshow = slideshow;
            this.selector = config.selector;
            this._initItems();
            this.fx = config.fx;
            
            //set options
            this.hover_container = config.hover_container ? $(config.hover_container, this.context) : this.items.parent();

            config.selected_class && (
                this.selected_class = config.selected_class
            );
            config.scrolled_class && (
                this.scrolled_class = config.scrolled_class
            );
          
            //init custom method and event
            $.each('indexOf onCancel onChange beforeScroll beforeDraw'.split(' '), function(index, method){

                typeof config[method] == 'function' && (
                    self[method]= config[method]
                );
            });

            if(!('pause_over' in config) ||  config.pause_over)
                this.slideshow.addPauseEvent(this.hover_container);
            
            //initialize buttons
            $.each('first previous next last'.split(' '), function(index, button){

                if(config['bt_' + button]){

                    (self['bt_' + button] = $(config['bt_' + button], this.context)).click(function(e){
                       
                        self.slideshow._stopEvent(e); 
                        self[button]();
                    });
                }
            });

            this.fx.init(this);
        },
        
        /**
         * Scroll to the first item
         * @function
         */
        first : function(){
            
            this.scrollTo(0);
        },

        /**
         * Scroll to the previous item
         * @function
         */
        previous : function(){
            
            var i = this.scrolled_index > -1 ? this.scrolled_index : this.slideshow.index;
            this.scrollTo(i - 1);
        },
        
        /**
         * Scroll to the next item
         * @function
         */
        next : function(){

            var i = this.scrolled_index > -1 ? this.scrolled_index : this.slideshow.index;
            this.scrollTo(i + 1);
        },

        /**
         * Scroll to the last item
         * @function
         */
        last : function(){

            this.scrollTo(this.slideshow.slides.length - 1);
        },
        
        /**
         * Scroll at the passed index
         * @function
         */
        scrollTo : function(index){
            
            index = this.slideshow.computeIndex(index);
            
            if(index === this.scrolled_index)
                return;
            
            this.setScrolled(index);
            this.fx.scrollTo(this.current, this.current_scrolled, this.slideshow.index, this.scrolled_index);
        },
        
        /**
         * Set the scrolled index and element
         * Change its css class if scrolled_class is defined
         * @function
         * @param {Number} index The index 
         */
        setScrolled : function(index){
            
            
            this.scrolled_index = index;
            
            var sible =  $(this.items[this.scrolled_index]);
            
            if(this.scrolled_class){
                
                this.current[0] != sible[0] && sible.addClass(this.scrolled_class);
                this.current_scrolled && this.current_scrolled.removeClass(this.scrolled_class);
            }
            
            this.current_scrolled = sible;
        },
        
        /**
         * Set items and its listener
         * @function
         */
        _initItems : function(){
            
            var self = this;
            
            this.items = $(this.selector, this.context);
            
            this.items.click(function(e){
                self.slideshow._stopEvent(e);
                self.slideshow.goTo(self.indexOf($(this)));
            });
        },
        
        /**
         * Method invoked when the pile of slides change
         * @function
         */
        initPile : function(){
            
            this._initItems();
            this.fx.initPile();
        },
        
        /**
         * Launch the transition
         * @function
         * @param {Number} from_index The from index
         * @param {Number} to_index The to index
         */
        draw : function(from_index, to_index){
            
            var sible = $(this.items[to_index]);

            if(this.selected_class){
                
                sible.addClass(this.selected_class);
                this.current && this.current.removeClass(this.selected_class);
                
                this.scrolled_class && this.current_scrolled 
                    && this.current_scrolled[0] == sible[0] 
                    && this.current_scrolled.removeClass(this.scrolled_class);
            }
            
            this.current = sible;
            
            this.beforeDraw();
            
            this.fx.draw(this.current, sible, from_index, to_index);
        },
        
        //to override with the config object
        
        /**
         * Return the index of an item
         * @function
         * @param {jQuery} sible The item
         */
        indexOf : function (item){

            return  item.parent().children().index(item);
        },
        
        /**
         * Custom method called when a slide is cancelled
         * @function
         * @param {Number} canceled_index The canceled index
         */
        onCancel : function(canceled_index){},
        
        /**
         * Custom method called when a slide is changed
         * @function
         * @param {Number} new_index The index of a new slide
         */
        onChange : function(new_index){},
        
        /**
         * Custom method called before the scroll
         * @function
         * @param {Number} scrolled_index The index of the scrolled index
         */
        beforeScroll : function(scrolled_index){},
        
        /**
         * Custom method called before a transition
         * @function
         */
        beforeDraw : function(){}
    }
);

/**
 * @namespace 
 * @name $.JocodeFxNavigationSlideshow
 */
$.JocodeFxNavigationSlideshow = {
    
    /**
     * The base class of a transition item navigation
     * 
     * @constructor 
     * @name $.JocodeFxNavigationSlideshow.Base
     **/
    Base : $.jocodeClass(
        function(){
            
        }, 
        {
            /** @lends $.JocodeFxNavigationSlideshow.Base.prototype */

            /**
             * @property {$.JocodeNavigationSlideshow} The navigation object
             */
            navigation : null,

            /**
             * Launch the transition
             * @param {jQuery} from Navigation item source
             * @param {jQuery} to   Navigation item destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            draw : function(from, to, from_index, to_index){},
            
            /**
             * Scroll the navigation
             * @param {jQuery} from Navigation item  source
             * @param {jQuery} to   Navigation item  destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            scrollTo : function(from, to, from_index, to_index){},
            
            /**
             * Initialize the transition object
             * @param {$.JocodeSlideshow} jocode_slideshow The slideshow
             */
            init : function(navigation){

                this.navigation = navigation;
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

})(jQuery);