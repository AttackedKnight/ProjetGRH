$(function(){
    $('.treeview').click(function (){
        $('.treeview').removeClass('active');
        $(this).addClass('active');  
    });
    
    $('.treeview-menu li').click(function (){
        if($(this).hasClass('treeview')){
            $(this).addClass('active');
        }
        else{
            $('.treeview-menu li').removeClass('active');
            $(this).addClass('active');
        }        
    });
    
    
    //Gestion du chemin
    
    $('.menu-root a').click(function (e){
        
        e.stopPropagation();
        var noeud="";
        var el=$(this);
        if(el.attr('href')!=="#"){
            noeud+='<li><a href="'+el.attr('href')+'"><i class="fa fa-dashboard"></i>'+el.text()+'</a></li>';
           
            var depart=true;
            var parent=el.parent();
            var noeud_inter;
            var text_inter
            while(depart){
                if(parent.hasClass('treeview')){
                    depart=false;
                }
                if(parent.hasClass('treeview-menu')){
                    noeud_inter=parent.parent();
                    text_inter=$(noeud_inter).children('a').eq(0).text();
                    noeud='<li><a href=""><i class="fa fa-dashboard"></i>'+text_inter+'</a></li>'+noeud;
                }
                parent=parent.parent();

            }
            $('.breadcrumb').html(noeud);
            
        }
    });

});

