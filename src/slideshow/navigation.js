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
        nil = null;

    /**
     * @class $.JocodeSlideshowNavigationConfig
     **/
    $.JocodeSlideshowNavigationConfig = {
        
        /**
         * The selector of the container of the navigation, relative to the slideshow container, defaut, use the slideshow container
         * 
         * @property $container
         * @type {String}
         */
        $container : '<',
        
        /**
         * The navigation items selector, relative to the slideshow container or to the config container, if defined
         * 
         * @property $items
         * @type {String}
         */
        $items : '',
        
        /**
         * The transition object
         * 
         * @property transition
         * @type {Object}
         */
        transition : nil,
        
        /**
         * Class of the selected item
         * 
         * @property css_selected
         * @type {String}
         */
        css_selected : '',
        
        /**
         * Class of the scrolled item
         * 
         * @property css_scrolled
         * @type {String}
         */
        css_scrolled : '',

        /**
         * Class of items that wait the end of a transition or a loading
         * 
         * @property css_await
         * @type {String}
         */
        $controls : '<',

        /**
         * Return the index of an item
         * @method indexOf
         * @param {jQuery} item The item
         */
        indexOf : function (item){
            return  item.parent().children().index(item);
        },

        /**
         * ...
         * 
         * @property itemsFactory
         * @type {Function}
         */
        itemsFactory : empty_func,

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
    };

    $.JocodeSlideshowNavigation = $.jocodeClass(
        {

            /**
             * ... 
             * 
             * @constructor
             * @class $.JocodeSlideshowNavigation
             * @extends $.JocodeWidget
             * @uses $.JocodeSlideshowNavigationConfig
             * @param {Object} config The configuration object
             * @param {$.JocodeSlideshowNavigation} override  The override object
             **/
            constructor : function(config, override){
                this.override(override);
                this.config = config;
            },
            
            /**
             * Initialize the navigation
             * 
             * @protected 
             * @method init
             * @param {$.JocodeSlideshow} slideshow The slideshow
             */
            init : function(slideshow){

                var self = this;

                self.slideshow = slideshow;
                self.$container = slideshow.$(self.config.$container);
                
                self.initConfig();
                self.initTransition();
                self.initControls();
            },

            defaultConfig : $.JocodeSlideshowNavigationConfig,
            
            /**
             * ...
             * 
             * @protected 
             * @method initTransition
             */
            initTransition : function(){

                this.transition.init(this);
            },

            /**
             * ...
             * 
             * @protected 
             * @method initControls
             */
            initControls : function(){

                var self = this,
                    select = self.config.$controls == '<' ? '' : self.config.$controls;

                $.each('first previous next last'.split(' '), function(index, button){
                    
                    var bt = self.$(' .' + button, self.$controls);

                    bt[0] && (self['$' + button] = bt.click(function(e){
                        self.slideshow._stopEvent(e); 
                        self[button]();
                    }));
                });
            },

            /**
             * The slideshow
             * 
             * @property slideshow
             * @type {$.JocodeSlideshow}
             */
            slideshow : nil,

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
             * The current index
             * 
             * @property index
             * @type {Number}
             * @default -1
             */
            index : -1,
            /*
             * The current item
             * 
             * @property current
             * @type {jQuery}
             */
            $current : nil,

            /**
             * The current scrolled item
             * 
             * @property current_scrolled
             * @type {jQuery}
             */
            $current_scrolled : nil,

            /**
             * The scrolled index
             * 
             * @property scrolled_index
             * @type {Number}
             */
            scrolled_index : -1,

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

                var self = this;
                self.scrollTo((self.scrolled_index > -1 ? self.scrolled_index : self.slideshow.index)- 1);
            },

            /**
             * Scroll to the next item
             * @method next
             */
            next : function(){

                var self = this;
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

                var self = this;

                if(!self.css_await)
                    return;

                if(add){
                    self.$items.addClass(self.css_await);
                    self.$current && self.$current.removeClass(self.css_await);
                    self.$current_scrolled &&  self.$current_scrolled.removeClass(self.css_await);
                }
                else self.$items.removeClass(self.css_await);
            },

            /**
             * Scroll at the passed index
             * @method scrollTo
             * @param {Number} index The index 
             */
            scrollTo : function(index){

                var self = this;

                if((index = self.slideshow.computeIndex(index)) === self.scrolled_index)
                    return;

                self.setScrolled(index);
                self.transition.scrollTo(self.$current, self.$current_scrolled, self.slideshow.index, self.scrolled_index);
            },

            /**
             * Set the scrolled index and element
             * Change its css class 
             * @method setScrolled
             * @param {Number} index The index 
             */
            setScrolled : function(index){

                var self = this;

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

                if(self.$current_scrolled){

                    self.css_scrolled && self.$current_scrolled.removeClass(self.css_scrolled);
                    wait && self.scrolled_index != self.slideshow.index 
                        && self.$current_scrolled.addClass(self.css_await);
                }

                self.$current_scrolled = sible;
            },

            /**
             * Method invoked when the pile of $slides change
             * @method initPile
             * @param {Object} obj_arguments ...
             */
            initPile : function(obj_arguments){

                var self = this;

                self.itemsFactory(obj_arguments);

                self.$items = self.$(self.config.$items).click(function(e){

                    self.slideshow._stopEvent(e);
                    self.slideshow.goTo(self.indexOf($(this)));
                });

                self.transition.initPile(obj_arguments);
            },

            /**
             * Launch the transition
             * @method draw
             * @param {Number} to_index The to index
             */
            draw : function(to_index){

                var self = this;

                if(to_index == self.index)
                    return;

                var sible = $(self.$items[to_index]),
                    old_index = self.index,
                    old_sible = self.$current;

                self.index = to_index;
                self.$current = sible;

                if(self.css_selected){

                    old_sible && old_sible.removeClass(self.css_selected);
                    sible.addClass(self.css_selected);

                    self.css_scrolled && self.scrolled_index ==  to_index
                        && self.$current_scrolled.removeClass(self.css_scrolled);
                }
                self.beforeTransition();

                self.transition.draw(old_sible, sible, old_index, to_index);
            }
        },
        $.JocodeWidget, 
        [$.JocodeSlideshowNavigationConfig]
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
             * @uses $.JocodeOverridable
             * @param {Object} config The configuration object
             * @param {$.JocodeSlideshow} override  The override object
             **/ 
            constructor : function(config, override){
                this.override(override);
                this.config = config;
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
             * @protected 
             * @method init
             * @param {$.JocodeSlideshowNavigation} navigation The navigation object
             */
            init : function(navigation){
                this.navigation = navigation;
                this.initConfig();
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
        [$.JocodeConfigurable, $.JocodeOverridable]
        )
    };

})(jQuery);