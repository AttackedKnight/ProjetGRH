angular.module('AuthentificationModule').factory('UploadFile', function ($http) {
    
    return{

        
        uploadFile:function(item){
//            $http.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
            return $http.post(chemin+'/UploadServlet',item,{
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        },
        resetHttp:function(){
            $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
            return ;
        }
    };

});


