
/*Gere l'upload de fichier : appel a la servlet java charger de l'upload*/

/*La methode :
 * UploadFile gere l'upload des avatars(photo de profil utilisateur)
 * UploadDocument: gere la partie archivage de document*/
angular.module('AuthentificationModule').factory('UploadFile', function ($http) {

    return{

        uploadFile: function (item) {
//            $http.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded; charset=UTF-8';
            return $http.post(chemin + '/UploadServlet', item, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        },
        uploadDocument: function (item) {
            return $http.post(chemin + '/UploadFileServlet', item, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        },
        resetHttp: function () {
            $http.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
            return;
        }
    };

});


