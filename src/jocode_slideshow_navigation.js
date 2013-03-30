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


$.JocodeSlideshowNavigation = $.jocodeClass(
        
    /**
     *  The navigation class for a slideshow
     *  
     * @class $.JocodeSlideshowNavigation
     * @constructor 
     * @param {Object} config  The configuration object
     *      @param {String}   config.$items                                     The navigation items selector, relative to the slideshow context or to the config context, if defined.
     *      @param {String}   [config.$context]                                 The selector context, defaut,  use the slideshow context
     *      @param {$.JocodeSlideshowNavigationFx.Base}[config.fx_navigation]   Transition navigation items object
     *      @param {String}   [config.hover_container]                          The selector of the container of event hover(by default,
     *      @param {String}   [config.selected_class]                           Class of the selected item
     *      @param {String}   [config.scrolled_class]                           Class of the scrolled item
     *      @param {Boolean}  [config.pause_over=true]                          Stop on mouseover
     *      @param {Boolean}  [config.stop_event=true]                          Stop event propagation and default actions
     *      @param {Function} [config.indexOf]                                  Function that returns the index of a slide
     *          @param {jQuery}     config.indexOf.item                       
     *      @param {Function} [config.onChange]                                 Custom method called when a slide is changed
     *          @param {Number}     config.onChange.new_index 
     *      @param {Function} [config.onCancel]                                 Custom method called when a slide is cancelled
     *          @param {Number}     config.onCancel.canceled_index 
     *      @param {Function} [config.beforeDraw]                               Custom method called before a transition
     *      @param {Function} [config.beforeScroll]                             Custom method called before the scroll
     **/
    function(config){

        if(!config)
            throw new Error('JocodeSlideshowNavigation Error: Missing parameter "config"');

        if(!config.$items)
            throw new Error('JocodeSlideshowNavigation Error: Missing parameter "config.$items"');

        if(!config.fx || !(config.fx instanceof $.JocodeSlideshowNavigationFx.Base))
            throw new Error('JocodeSlideshowNavigation Error: Parameter "config.fx" is missing or is not of the type "$.JocodeSlideshowNavigationFx.Base"');

        this.config = config;
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
         * The navigation items selector
         * 
         * @property $items
         * @type {String}
         */
        $items : null,
        
        /**
         * The navigation items
         * 
         * @property items
         * @type {jQuery}
         */
        items : null,

        /**
         * The container of the event hover
         * 
         * @property hover_container
         * @type {jQuery}
         */
        hover_container : null,

        /**
         * The css class of selected item
         * 
         * @property selected_class
         * @type {String}
         */
        selected_class : null,
        
        /**
         * The css class of scrolled item
         * 
         * @property scrolled_class
         * @type {String}
         */
        scrolled_class : null,
        
        /**
         * The current item
         * 
         * @property current
         * @type {jQuery}
         */
        current : null,
        
        /**
         * he current scrolled item
         * 
         * @property current_scrolled
         * @type {jQuery}
         */
        current_scrolled : null,
        
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
         * The button next
         * 
         * @property bt_next
         * @type {jQuery}
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
         * The scrolled index
         * 
         * @property scrolled_index
         * @type {Number}
         */
        scrolled_index : -1,

        /**
         * Transition navigation items object
         * 
         * @property fx
         * @type {$.JocodeSlideshowNavigationFx}
         */
        fx : null,

        /**
         * Initialize the navigation
         * @method init
         * @param {$.JocodeSlideshow.Base} The slideshow
         */
        init : function(slideshow){

            var self = this,
                config = this.config,
                ctx_button,
                bt;
                
            //set requiered 
            this.slideshow = slideshow;
            this.context = config.$context ? $(config.$context) : slideshow.context;
            this.$items = config.$items;
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
                this.slideshow.addPauseEventOnHover(this.hover_container);
            
            //initialize buttons
            if(config.$buttons){

                ctx_button = $(config.$buttons, this.context);
                
                $.each('first previous next last'.split(' '), function(index, button){

                    bt = $(' .' + button, ctx_button);
                    if(bt[0]){

                        self['bt_' + button] = bt.click(function(e){

                            self.slideshow._stopEvent(e); 
                            self[button]();
                        });
                    }
                });
            }

            this.fx.init(this);
        },
        
        /**
         * Scroll to the first item
         * @method first
         */
        first : function(){
            
            this.scrollTo(0);
        },

        /**
         * Scroll to the previous item
         * @method previous
         */
        previous : function(){
            
            var i = this.scrolled_index > -1 ? this.scrolled_index : this.slideshow.index;
            this.scrollTo(i - 1);
        },
        
        /**
         * Scroll to the next item
         * @method next
         */
        next : function(){

            var i = this.scrolled_index > -1 ? this.scrolled_index : this.slideshow.index;
            this.scrollTo(i + 1);
        },

        /**
         * Scroll to the last item
         * @method last
         */
        last : function(){

            this.scrollTo(this.slideshow.slides.length - 1);
        },
        
        /**
         * Scroll at the passed index
         * @method scrollTo
         * @param {Number} index The index 
         */
        scrollTo : function(index){
            
            if((index = this.slideshow.computeIndex(index)) === this.scrolled_index)
                return;
            
            this.setScrolled(index);
            this.fx.scrollTo(this.current, this.current_scrolled, this.slideshow.index, this.scrolled_index);
        },
        
        /**
         * Set the scrolled index and element
         * Change its css class if scrolled_class is defined
         * @method setScrolled
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
         * @method _initItems
         * @private
         */
        _initItems : function(){
            
            var self = this;
            
            this.items = $(this.$items, this.context);
            
            this.items.click(function(e){
                
                self.slideshow._stopEvent(e);
                self.slideshow.goTo(self.indexOf($(this)));
            });
        },
        
        /**
         * Method invoked when the pile of slides change
         * @method initPile
         */
        initPile : function(){
            
            this._initItems();
            this.fx.initPile();
        },
        
        /**
         * Launch the transition
         * @method draw
         * @param {Number} from_index The from index
         * @param {Number} to_index The to index
         */
        draw : function(from_index, to_index){
            
            var sible = $(this.items[to_index]);

            if(this.selected_class){
                
                this.current && this.current.removeClass(this.selected_class);
                sible.addClass(this.selected_class);
                
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
         * @method indexOf
         * @param {jQuery} item The item
         */
        indexOf : function (item){

            return  item.parent().children().index(item);
        },
        
        /**
         * Custom method called when a slide is cancelled
         * @method onCancel
         * @param {Number} canceled_index The canceled index
         */
        onCancel : function(canceled_index){},
        
        /**
         * Custom method called when a slide is changed
         * @method onChange
         * @param {Number} new_index The index of a new slide
         */
        onChange : function(new_index){},
        
        /**
         * Custom method called before the scroll
         * @method beforeScroll
         * @param {Number} scrolled_index The index of the scrolled index
         */
        beforeScroll : function(scrolled_index){},
        
        /**
         * Custom method called before a transition
         * @method beforeDraw
         */
        beforeDraw : function(){}
    }
);


$.JocodeSlideshowNavigationFx = {
    
        
    Base : $.jocodeClass(
    
         /**
          * The base class of a transition between items of navigation
          * 
          * @class $.JocodeSlideshowNavigationFx.Base
          * @constructor 
          **/ 
        function(){
            
        }, 
        {
            /**
             * The navigation object
             * 
             * @property navigation
             * @type {$.JocodeSlideshowNavigation}
             */
            navigation : null,

            /**
             * Launch the transition
             * @method draw
             * @param {jQuery} from Navigation item source
             * @param {jQuery} to   Navigation item destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            draw : function(from, to, from_index, to_index){},
            
            /**
             * Scroll the navigation
             * @method scrollTo
             * @param {jQuery} from Navigation item  source
             * @param {jQuery} to   Navigation item  destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            scrollTo : function(from, to, from_index, to_index){},
            
            /**
             * Initialize the transition object
             * @method init
             * @param {$.JocodeSlideshow} navigation The slideshow
             */
            init : function(navigation){

                this.navigation = navigation;
            },
            
            /**
             * Method invoked when the pile of slides change
             * @method initPile
             */
            initPile : function(){
                
            }
        }
    )
};

})(jQuery);