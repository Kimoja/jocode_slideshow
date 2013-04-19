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

        
        /*!self.css_bt_on_mouseout && bts &&
                self.displayOnHover(self.event_container, $(bts, ctx_button));*/
        
            
           /* !self.display_nav_on_mouseout && self.navigation.container != container &&
                self.displayOnHover(self.event_container, self.navigation.container);*/

(function($){

var empty_func = function(){},
    nil = nil,
    self;

$.JocodeSlideshowNavigation = $.jocodeClass(
        
    /**
     *  The navigation class for a slideshow
     *  
     * @class $.JocodeSlideshowNavigation
     * @constructor 
     * @param {Object} config  The configuration object
     *      @param {String}   [config.$items]                                   The navigation items selector, relative to the slideshow container or to the config container, if defined.
     *      @param {String}   [config.$container] //changer en $navigation      The selector of the container of the navigation, relative to the slideshow container, defaut, use the slideshow container
     *      @param {String}   [config.$items_container]                         ...    
     *      @param {$.JocodeSlideshowNavigationFx.Base} config.fx_navigation    Transition navigation items object
     *      @param {String}   [config.css_selected]                             Class of the selected item
     *      @param {String}   [config.css_scrolled]                             Class of the scrolled item
     *      @param {String}   [config.css_await]                                Class of items that wait the end of a transition or a loading
     *      @param {Boolean}  [config.stop_event=true]                          Stop event propagation and default actions 
     *      @param {Function} [config.indexOf]                                  Function that returns the index of a slide
     *          @param {jQuery}     config.indexOf.item                       
     *      @param {Function} [config.onChange]                                 Custom method called when a slide is changed
     *          @param {Number}     config.onChange.new_index 
     *      @param {Function} [config.onCancel]                                 Custom method called when a slide is cancelled
     *          @param {Number}     config.onCancel.canceled_index   
     *      @param {Function} [config.itemFactory]                              ...   
     *          @param {Number}     config.itemFactory.last_pile   
     *      @param {Function} [config.beforeDraw]                               Custom method called before a transition
     *      @param {Function} [config.afterDraw]                                Custom method called after a transition
     *      @param {Function} [config.beforeScroll]                             Custom method called before the scroll
     *      @param {Function} [config.beforeSetup]                              ....
     *      @param {Function} [config.afterSetup]                               ....
     *      @param {Function} [config.beforeInitPile]                           ....
     **/
    function(config){
        this.setConfig(config);
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
         * The button next
         * 
         * @property bt_next
         * @type {jQuery}
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
         * The navigation items selector
         * 
         * @property $items
         * @type {String}
         */
        $items : nil,
        
        /**
         * The navigation items
         * 
         * @property items
         * @type {jQuery}
         */
        items : nil,
        
        /**
         * .......................
         * 
         * @property itemFactory
         * @type {Function}
         */
        itemFactory : nil,
        
        /**
         * .......................
         * 
         * @property items_container
         * @type {jQuery}
         */
        items_container : nil,
        
        /**
         * The current index
         * 
         * @property index
         * @type {Number}
         * @default -1
         */
        index : -1,
        
        /**
         * The css class of selected item
         * 
         * @property css_selected
         * @type {String}
         */
        css_selected : nil,
        
        /**
         * The css class of scrolled item
         * 
         * @property css_scrolled
         * @type {String}
         */
        css_scrolled : nil,
        
        /**
         * Class of items that wait the end of a transition or a loading
         * 
         * @property css_await
         * @type {String}
         */
        css_await : nil,
        
        /*
         * The current item
         * 
         * @property current
         * @type {jQuery}
         */
        current : nil,
        
        /**
         * he current scrolled item
         * 
         * @property current_scrolled
         * @type {jQuery}
         */
        current_scrolled : nil,
        
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
        fx : nil,

        /**
         * Initialize the navigation
         * @method init
         * @param {$.JocodeSlideshow.Base} The slideshow
         */
        init : function(slideshow){

            var self = this,
                config = self.config,
                ctx_button,
                bt;
                
            self.slideshow = slideshow;
            
            config.beforeSetup && config.beforeSetup.call(self);
            
            self.container = config.$container ? slideshow.$(config.$container) : slideshow.container;
            
            self.items_container  = self.$(config.$items_container);
            
            ctx_button = self.$(config.$buttons);

            $.each('first previous next last'.split(' '), function(index, button){

                bt = $(' .' + button, ctx_button);
                
                bt[0] && (self['bt_' + button] = bt.click(function(e){
                    self.slideshow._stopEvent(e); 
                    self[button]();
                }))
            });

            self.fx.init(self);
            
            config.afterSetup && config.afterSetup.call(self);
        },
        
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
            
            self = this;
            self.scrollTo((self.scrolled_index > -1 ? self.scrolled_index : self.slideshow.index)- 1);
        },
        
        /**
         * Scroll to the next item
         * @method next
         */
        next : function(){

            self = this;
            self.scrollTo((self.scrolled_index > -1 ? self.scrolled_index : self.slideshow.index) + 1);
        },

        /**
         * Scroll to the last item
         * @method last
         */
        last : function(){
            
            this.scrollTo(this.slideshow.slides.length - 1);
        },
        
        /**
         * Add or remove the "await" css class
         * @method setAwaitCss
         * @protected
         */
        setAwaitCss : function(add){
            
            self = this;
            
            if(!self.css_await)
                return;
            
            if(add){
                self.items.addClass(self.css_await);
                self.current && self.current.removeClass(self.css_await);
                self.current_scrolled &&  self.current_scrolled.removeClass(self.css_await);
            }
            else self.items.removeClass(self.css_await);
        },
        
        /**
         * Scroll at the passed index
         * @method scrollTo
         * @param {Number} index The index 
         */
        scrollTo : function(index){
            
            self = this;
            
            if((index = self.slideshow.computeIndex(index)) === self.scrolled_index)
                return;
            
            self.setScrolled(index);
            self.fx.scrollTo(self.current, self.current_scrolled, self.slideshow.index, self.scrolled_index);
        },
        
        /**
         * Set the scrolled index and element
         * Change its css class 
         * @method setScrolled
         * @param {Number} index The index 
         */
        setScrolled : function(index){
            
            self = this;
            
            if(self.scrolled_index === index)
                return;
            
            self.scrolled_index = index;
            
            var sible =  $(self.items[index]),
                wait = self.css_await && 
                    ((self.slideshow.await_load &&  self.slideshow.isOnLoad()) 
                    || (self.slideshow.await_fx &&  self.slideshow.isOnFx()));
            
            if(self.index != index){
                
                self.css_scrolled && sible.addClass(self.css_scrolled);
                wait && sible.removeClass(self.css_await);
            }
            
            if(self.current_scrolled){
                
                self.css_scrolled && self.current_scrolled.removeClass(self.css_scrolled);
                wait && self.scrolled_index != self.slideshow.index 
                    && self.current_scrolled.addClass(self.css_await);
            }
            
            self.current_scrolled = sible;
        },
        
        /**
         * Set items and its listener
         * @method _initItems
         * @param {jQuery} last_pile The last pile of slides 
         * @private
         */
        _initItems : function(last_pile){
            
            self = this;
            
            self.beforeInitPile();
            
            if(self.$items){
                
                self.items = $(self.$items, self.container);
            }
            else {
                
                self.slideshow.slides.each(function(index){
                    
                    var item = self.itemFactory($(this), index, last_pile);
                    item && self.items_container.append(item);
                });
                
                self.items = self.items_container.children();
            }
            
            self.items.click(function(e){
                
                self.slideshow._stopEvent(e);
                self.slideshow.goTo(self.indexOf($(this)));
            });
        },
        
        /**
         * Method invoked when the pile of slides change
         * @method initPile
         * @param {jQuery} last_pile The last pile of slides 
         */
        initPile : function(last_pile){
            
            this._initItems(last_pile);
            this.fx.initPile(last_pile);
        },
        
        /**
         * Launch the transition
         * @method draw
         * @param {Number} to_index The to index
         */
        draw : function(to_index){
            
            self = this;
            
            if(to_index == self.index)
                return;
            
            var sible = $(self.items[to_index]),
                old_index = self.index,
                old_sible = self.current;
            
            self.index = to_index;
            self.current = sible;
            
            if(self.css_selected){
                
                old_sible && old_sible.removeClass(self.css_selected);
                sible.addClass(self.css_selected);
                
                self.css_scrolled && self.scrolled_index ==  to_index
                    && self.current_scrolled.removeClass(self.css_scrolled);
            }
            self.beforeDraw();
            
            self.fx.draw(old_sible, sible, old_index, to_index);
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
        onCancel : empty_func,
        
        /**
         * Custom method called when a slide is changed
         * @method onChange
         * @param {Number} new_index The index of a new slide
         */
        onChange : empty_func,
        
        /**
         * Custom method called before the scroll
         * @method beforeScroll
         * @param {Number} scrolled_index The index of the scrolled index
         */
        beforeScroll : empty_func,
        
        /**
         * Custom method called before a transition
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
            navigation : nil,

            /**
             * Launch the transition
             * @method draw
             * @param {jQuery} from Navigation item source
             * @param {jQuery} to   Navigation item destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            draw : empty_func,
            
            /**
             * Scroll the navigation
             * @method scrollTo
             * @param {jQuery} from Navigation item  source
             * @param {jQuery} to   Navigation item  destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            scrollTo : empty_func,
            
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
             * @param {jQuery} last_pile The last pile of slides 
             */
            initPile : empty_func
        }
    )
};

})(jQuery);