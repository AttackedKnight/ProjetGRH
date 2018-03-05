    /* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Mail', function ($http) {
return{

        
        sendEmail:function(item){
            $http.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
            return $http.post(chemin+'/EmailServlet',item);
        },
        resetHttp:function(){
            $http.defaults.headers.post['Content-Type']='application/json; charset=UTF-8';
            return ;
        }
};
});
