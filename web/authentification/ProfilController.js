angular.module('AuthentificationModule').controller('ProfilController', function ($scope, Connexion, $rootScope,SweetAlert,
$cookies, UploadFile)
{

    var cookie = JSON.parse($cookies.get('globals'));

    $scope.utilisateur = cookie.currentUser.user;


    $scope.imgAffichee;
    $scope.edit = false;

    $scope.esteditable=false;
    $scope.editable = function () {
        $scope.edit = true;
        $scope.esteditable=true;
    };

    $scope.cancel = function () {
        $scope.edit = false;
        $scope.esteditable=false;
        $scope.motDePasseConfirm = "";

    };



    $scope.showProfil = function () {
        $('#previsualisation').attr('src', $scope.utilisateur.avatar);
        $scope.file = null;
    };
    $scope.showProfil();

    $scope.preview = function (img) {
        $scope.file = img.files[0];
        var reader = new FileReader();
        reader.onload = function () {

            $scope.imgAffichee = URL.createObjectURL($scope.file);
            $('#previsualisation').attr('src', $scope.imgAffichee);

        };
        reader.readAsDataURL($scope.file);

    };

    $scope.controlForm = function (c) {

        if (c.login == null || c.login == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if (c.motDePasse == null || c.motDePasse == "") {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                $scope.submit();
            }
        }

    };

    $scope.submit = function () {

        if (!$scope.file) {

            $scope.editUser();

        } else {
            $scope.imgProfil = $scope.file;
            var format = $scope.imgProfil.name.split(".");
            format = format[format.length - 1];
            var fd = new FormData();
            fd.append($scope.utilisateur.id, $scope.imgProfil);
            UploadFile.uploadFile(fd).success(function (data) {
                $scope.utilisateur.avatar = 'images/' + data;
                $scope.editUser();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement de l'avatar");
            });
        }
    };

    $scope.editUser = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Connexion.edit($scope.utilisateur).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            Connexion.setCredentials($scope.utilisateur);
            $rootScope.avatarUtilisateur = $scope.utilisateur.avatar;
            SweetAlert.finirChargementSucces("Photo de profil mise à jour !");
            $scope.cancel();
        }).error(function () {
    SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");       
    });
    };

});
