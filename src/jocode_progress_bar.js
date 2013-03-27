
/**
 * TODO
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

