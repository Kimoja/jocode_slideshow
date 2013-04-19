
$(function(){
    
    var processor = {
        
        slideshow : {
            afterLoad : function(){
            },
            beforeHide : function(){
                $.data($('.' + old_project + '.' + old_id)[0], 'jocodeSlideshow').pause();
            },
            afterShow : function(){
                $.data($('.' + project + '.' + id)[0], 'jocodeSlideshow').resume();
            }
        },
        
        doc : {
            afterLoad : function(){
                
                var ctx = $(hash.replace(/\$|\./g, function(a){return '\\' + a;}));
                
                $('> .tabs > .tab_content > .item', ctx).each(function(){
        
                    var open = false,
                        self = $(this);

                    self.click(function(e){

                        if(open){

                            $('> .desc', self).hide();
                            self.removeClass('open');
                            open = false;
                        }
                        else {

                            $('> .desc', self).show();
                            self.addClass('open');
                            open = true;
                        }
                    });
                });
                
                $('.show_private', ctx).change(function() {
                    this.checked ? $('.private', ctx).show() : $('.private', ctx).hide();
                });
                
                $('.show_inherit', ctx).change(function() {
                    this.checked ? $('.inherit', ctx).show() : $('.inherit', ctx).hide();
                });
                
                initLink('a[href^="#doc_"]', ctx);
            }
        }
    };    
    
    var hash = '#main',
        displayed = $(hash),
        loaded = {'#main' : true, '#todo' : true},
        loader = $('#loader'),
        body = $(document.body),
        project,
        old_project,
        id,
        old_id;
    
    function initLink(selector, context){
        
        $(selector, context).click(function(e){
        
            var old_hash = hash,
                i;

            hash = $(this).attr("href");

            if(old_hash == hash)return;

            i = hash.indexOf('_');

            old_project = project;
            project = ~i && hash.slice(1, i);

            old_id = id;
            id = hash.slice(i + 1)

            loaded[hash] ? display() : getPage();
        });
    }
        
    function display(js){
        
        var old_displayed = displayed;
        
        displayed = $(hash.replace(/\$|\./g, function(a){return '\\' + a;}));
        
        old_project && processor[old_project].beforeHide 
            && processor[old_project].beforeHide();
        old_displayed.hide();
        
        displayed.show();
        js && $("<script></script>").appendTo("head").html(js);
        
        project && processor[project].afterShow 
            && processor[project].afterShow();
    }
    
    function getPage(){
        
        var exs = Page[project][id],
            i = 0,
            l = exs.length,
            pending = l,
            js;
        
        body.css('overflow', 'hidden');
        loader.css('top', body.scrollTop());
        loader.show();
        
            
        for(; i < l; i++){
            
            (function(ex){
                
                $.ajax({
                    url: 'site/' + project + '/' + id  + '.' + ex,
                    dataType : 'text',
                    cache : false
                }).done(function(data) {
                    
                    if(ex === 'html')
                        $('#wrapper').append(data);
                    else if(ex === 'css')
                        $("<style></style>").appendTo("head").html(data);
                    else js = data;
                    
                    if(!--pending){
                        
                        loaded[hash] = true;
                        
                        if(processor[project].afterLoad)
                            processor[project].afterLoad();
                        
                        display(js);
                        initTabs();
                        
                        body.css('overflow', 'auto');
                        loader.hide();
                    }
                });
            })(exs[i]);
        }
    }
    
    function initTabs(){
        
        $('.tab + .tab_content', displayed).show();
        $('.tab > div:first-child a', displayed).addClass('active');
    
        $('.tab a', displayed).click(function(e){
        
            e.preventDefault();
            e.stopPropagation();

            var self = $(this),
                type = self.attr("href").replace('#', ''),
                tab = self.parent().parent(),
                tabs = tab.parent();

            $('> div > a', tab).removeClass('active');

            $('> .tab_content' , tabs).hide();
            $('> .tab_content.' + type , tabs).show();

            self.addClass('active');
        });
    }
    
    initLink('#header ul > li > a', null);
});
