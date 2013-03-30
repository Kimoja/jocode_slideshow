
var JocodeSlideshowExemple = {},
    JocodeSlideshow = {};

function getSlideshow(name){
    
    if(!JocodeSlideshow[name])
        JocodeSlideshow[name] = JocodeSlideshowExemple[name]();
    
    return JocodeSlideshow[name];
}
$(function(){
    
    //gestion du menu des exemples
    var current_displayed = $('#main'),
        current_id = 'main',
        is_exemple = false,
        is_doc = false;
    
    $('#header ul > li > a').click(function(e){
        toogle($(this).attr("href").replace('#', ''));
    });
    
    function toogle(id){
        
        var old_is_exemple = is_exemple,
            old_is_doc = is_doc,
            old_id = current_id;
        
        if(old_id == id)return;
        
        if(/^exemple_/.test(id)){
            
            is_exemple = true;
            id = id.replace(/^exemple_/, '');
        }
        else{ 
            
            is_exemple = false;
            
            if(/^doc_/.test(id)){
                
                is_doc = true;
                id = id.replace(/^doc_/, '');
            }
            else is_doc = false;
        }
        
        current_displayed.hide();
        if(old_is_exemple)
            getSlideshow(old_id).pause();
        
        current_id = id;
        current_displayed = $('#' + id);
        
        current_displayed.show();
        
        if(is_exemple)
            getSlideshow(id).resume();
    }
    
    
    //gestion des onglets des exemples
    $('.tab a').click(function(e){
        
        e.preventDefault();
        e.stopPropagation();
            
        var self = $(this),
            type = self.attr("href").replace('#', ''),
            ul = self.parent().parent(),
            parent = ul.parent();
        
        $('li > a', ul).removeClass('active');
        
        $('> .tab_content' , parent).hide();
        $('> .tab_content.' + type , parent).show();
        
        self.addClass('active');
    });
    
    $('.doc .tab_content:not(.constructor) .item, .doc .tab_content.constructor > .item > .desc > ul > li > ul > li').each(function(){
        
        var open = false,
            self = $(this);
        
        self.click(function(e){
            
            e.preventDefault();
            e.stopPropagation();
        
            if(open){
                
                $('> .desc, > p, > ul', self).hide();
                self.removeClass('open');
                open = false;
            }
            else {
                
                $('> .desc, > p, > ul', self).show();
                self.addClass('open');
                open = true;
            }
        });
    });
    
    $('.tab li:first-child a').addClass('active');
    $('.tab + .tab_content').show();
    
    sh_highlightDocument();
});
