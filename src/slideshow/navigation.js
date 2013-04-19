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

var empty_func = function(){},
    nil = nil,
    self;

//pseudo type for documentation and typescript (TODO later)
/**
 * @class $.JocodeSlideshowNavigationConfig
 * @constructor 
 **/

/**
 * The selector of the container of the navigation, relative to the slideshow container, defaut, use the slideshow container
 * 
 * @property $container
 * @type {String}
 */

/**
 * The navigation items selector, relative to the slideshow container or to the config container, if defined
 * 
 * @property $items
 * @type {String}
 */

/**
 * The navigation items selector, relative to the slideshow container or to the config container, if defined
 * 
 * @property $items
 * @type {String}
 */

/**
 * The transition configuration object
 * 
 * @property transition
 * @type {Object}
 */

/**
 * Class of the selected item
 * 
 * @property css_selected
 * @type {String}
 */

/**
 * Class of the scrolled item
 * 
 * @property css_scrolled
 * @type {String}
 */

/**
 * Class of items that wait the end of a transition or a loading
 * 
 * @property css_await
 * @type {String}
 */

/**
 * Return the index of an item
 * @method indexOf
 * @param {jQuery} item The item
 */

/**
 * Custom method called before the scroll
 * @method beforeScroll
 * @param {Number} scrolled_index The index of the scrolled index
 */

/**
 * Custom method called before a transition
 * @method beforeTransition
 */

/**
 * Custom method called after a transition
 * 
 * @method afterTransition
 */

/**
 * ...
 * 
 * @method beforeSetup
 */

/**
 * ...
 * 
 * @method afterSetup
 */

//end pseudo type 

$.JocodeSlideshowNavigation = $.jocodeClass(
        {
           
        /**
        *  The navigation class for a slideshow
        *  
        * @constructor 
        * @class $.JocodeSlideshowNavigationConfig
        * @extends $.JocodeWidget
        * @param {Object} config  The configuration object
        **/
        constructor : function(slideshow, config){
            
            self = this;
            self.slideshow = slideshow;
        },

        /**
         * The slideshow
         * 
         * @property slideshow
         * @type {$.JocodeSlideshow}
         */
        slideshow : nil,

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
         * The navigation items 
         * 
         * @property $items
         * @type {jQuery}
         */
        $items : nil,

        /**
         * ...
         * 
         * @property itemsFactory
         * @type {Function}
         */
        itemsFactory : empty_func,

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
         * The current scrolled item
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
         * @property transition
         * @type {$.JocodeSlideshowNavigationTransition}
         */
        transition : nil,

        /**
         * Initialize the navigation
         * 
         * @method init
         * @param {$.JocodeSlideshowNavigationConfig} config 
         */
        init : function(config){
            
            self.$container = config.$container ? self.slideshow.$(config.$container) : self.slideshow.$container;
            
            config.beforeSetup && config.beforeSetup.call(self);
            
            self.setConfig(config);
            self.transition.init(self);

            config.afterSetup && config.afterSetup.call(self);
        },
       
        defaultConfig : {
            
            $controls : '<'
        },
        
        
        /**
         * ...
         * 
         * @protected 
         * @method initControls
         */
        initControls : function($controls){
            
            var self = this,
                controls = self.$($controls);

            $.each('first previous next last'.split(' '), function(index, button){

                var bt = $(' .' + button, controls);

                bt[0] && (self['$' + button] = bt.click(function(e){
                    self.slideshow._stopEvent(e); 
                    self[button]();
                }))
            });
        },
        
        /**
         * ...
         * 
         * @protected 
         * @method setTransition
         * @param {Object} config 
         * @return {$.JocodeSlideshowTransition.Base}
         */
        setTransition : function(config){
            
            var type = config.type;alert($.JocodeSlideshowNavigationTransition[type.charAt(0).toUpperCase() + type.slice(1)])
            return new $.JocodeSlideshowNavigationTransition[type.charAt(0).toUpperCase() + type.slice(1)](config);
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

            this.scrollTo(this.slideshow.$slides.length - 1);
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
                self.$items.addClass(self.css_await);
                self.current && self.current.removeClass(self.css_await);
                self.current_scrolled &&  self.current_scrolled.removeClass(self.css_await);
            }
            else self.$items.removeClass(self.css_await);
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
            self.transition.scrollTo(self.current, self.current_scrolled, self.slideshow.index, self.scrolled_index);
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

            var sible =  $(self.$items[index]),
                wait = self.css_await && 
                    ((self.slideshow.await_load &&  self.slideshow.isOnLoad()) 
                    || (self.slideshow.await_transition &&  self.slideshow.isOnTransition()));

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
         * Method invoked when the pile of $slides change
         * @method initPile
         * @param {Object} obj_arguments ...
         */
        initPile : function(obj_arguments){
            
            self = this;
            alert(self.transition.draw)
            
            self.itemsFactory(obj_arguments);
           
            self.$items = self.$(self.config.$items);
            
            self.$items.click(function(e){

                self.slideshow._stopEvent(e);
                self.slideshow.goTo(self.indexOf($(this)));
            });
            
            //self.transition.initPile(obj_arguments);
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

            var sible = $(self.$items[to_index]),
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
            self.beforeTransition();

            self.transition.draw(old_sible, sible, old_index, to_index);
        },

        /**
         * Return the index of an item
         * @method indexOf
         * @param {jQuery} item The item
         */
        indexOf : function (item){

            return  item.parent().children().index(item);
        },
        
        /**
         * Custom method called before the scroll
         * @method beforeScroll
         * @param {Number} scrolled_index The index of the scrolled index
         */
        beforeScroll : empty_func,

        /**
         * Custom method called before a transition
         * @method beforeTransition
         */
        beforeTransition : empty_func,

        /**
         * Custom method called after a transition
         * 
         * @method afterTransition
         */
        afterTransition : empty_func
        
    },
    $.JocodeWidget, 
    nil
);


$.JocodeSlideshowNavigationTransition = {
    
    Base : $.jocodeClass(
        {   
            /**
            * The base class of a transition between items of navigation
            * 
            * @constructor 
            * @class $.JocodeSlideshowNavigationTransition.Base
            * @uses $.JocodeConfigurable
            * @param {$.JocodeSlideshowNavigation} navigation The navigation object
            **/ 
            constructor : function(navigation){
               
                this.navigation = navigation;
            },
            
            /**
             * The navigation object
             * 
             * @property navigation
             * @type {$.JocodeSlideshowNavigation}
             */
            navigation : nil,

            /**
             * Launch the transition
             * 
             * @method draw
             * @param {jQuery} from Navigation item source
             * @param {jQuery} to   Navigation item destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            draw : empty_func,

            /**
             * Scroll the navigation
             * 
             * @method scrollTo
             * @param {jQuery} from Navigation item  source
             * @param {jQuery} to   Navigation item  destination
             * @param {Number} from_index The from index
             * @param {Number} to_index The to index
             */
            scrollTo : empty_func,

            /**
             * Initialize the transition object
             * 
             * @method init
             * @param {Object} config The configuration object
             */
            init : function(config){

                this.setConfig(config)
            },

            /**
             * Method invoked when the pile of $slides change
             * 
             * @method initPile
             * @param {Object} obj_arguments....
             */
            initPile : empty_func
        }, 
        nil,
        [$.JocodeConfigurable]
    )
};

})(jQuery);