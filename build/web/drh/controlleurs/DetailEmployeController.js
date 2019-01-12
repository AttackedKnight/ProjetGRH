/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('DetailEmployeController', function ($scope, SweetAlert, $routeParams,
        UploadFile, Employe, Connexion, Servir,Document,Typedocument)
{

    /*C'est le controlleur global de la page . Les sections(pages) 
     * associees au button de navigation possedent 
     * chacune un controlleurs qui est un enfant de ce controlleur global
     * */

     /*Gestion sous menu : section*/
    $scope.templates = [
        {id:1, name: "Infos Générales", url: "drh/employe/infosGenerales.html"},
        {id:2, name: "Situation Matrimoniale", url: "drh/employe/sMatrimoniale.html"},
        {id:3, name: "Sociales", url: "drh/employe/sociales.html"},
        {id:4, name: "Parcours", url: "drh/employe/infosProfessionelles.html"},
        {id:5, name: "Avancement", url: "drh/employe/avancement.html"},
        {id:6, name: "Formation", url: "drh/employe/formation.html"},
        {id:7, name: "Absences", url: "drh/employe/absences.html"},
        {id:8, name: "Archives", url: "drh/employe/archives.html"}
    ];
    $scope.setSection = function(id){
        $scope.selectedSectionId = id;
        $scope.template = $scope.templates.filter(getSelectedSection)[0];
        $(".section").removeClass("active");
        $("#section"+id).addClass("active");
    };
    $scope.setSection(1);
    function getSelectedSection(data){
        return data.id == $scope.selectedSectionId;
    }

    /*Gestion sous menu : section*/
    
    var idEmploye = $routeParams.id;
    $scope.estPermanent = true;
    $scope.homme = false;
    $scope.today = new Date();
    
    Employe.find(idEmploye).success(function (data) {
        $scope.employe = data;
        
        //Formatter les date pour l'affichage
        $scope.employe.dateDeNaissance = new Date($scope.employe.dateDeNaissance);
        $scope.employe.dateRecrutement = new Date($scope.employe.dateRecrutement);

        $scope.copieEmploye = angular.copy($scope.employe);
        
        if ($scope.employe.genre.libelle == "Homme") {
            $scope.homme = true;
        } else {
            $scope.homme = false;
        }
        
        Servir.findFonctionEmploye($scope.employe.id).success(function (data) {
            $scope.libelleFonction = data;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la récupération du libelle de la fonction");
        });
        
        Servir.findEntiteEmploye($scope.employe.id).success(function (data) {
            $scope.entiteEmploye = data;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la récupération du libelle de la fonction");
        });
        
        Servir.estPermanent($scope.employe.id).success(function (data) {
            if(data.value == false){
                $scope.estPermanent = false;
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la vérification du statut");
        });
        
        Connexion.findByEmploye($scope.employe.id).success(function (data) {    /*Recuperer l'avatar au niveau du compte utilisateur*/
            $scope.c_utilisateur = data;
            $scope.avatar = $scope.c_utilisateur.avatar;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des informations de l'utilisateur !");
        });
        
        $scope.listerMesDocuments();
        $(function () {
            $('a').tooltip();
        });
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des informations de l'employé");
    });


    /*LISTE DES DOCUMENTS DE L'EMPLOYE*/
    $scope.listerMesDocuments = function () {
        Document.findByEmploye($scope.employe).success(function (data) {
            $scope.documents = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des documents de l'employé !");
        });
    };
    /*LISTE DES TYPES DE DOCUMENTS */
    Typedocument.findAll().success(function (data) {
        $scope.typedocuments = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de document !");
    });
    
    /*VISUALISER UN DOCUMENT A PARTIR DU NAVIGATEUR*/
    $scope.visualiserDocument = function (lien) {
        window.open(lien);
    };
    
    /*Gestion avatar employe*/

    $scope.showDefaultAvatar = function () {
        $('#previsualisation').attr('src', '' + $scope.avatar);
        $scope.cancelEditAvatar = true;
        $scope.editAvatar = true;
        $scope.file = null;
        $scope.toggleButtonProfil();
    };

    $scope.cancelEditAvatar = true;
    $scope.editAvatar = true;

    $scope.editProfil = false;
    $scope.toggleButtonProfil = function () {
        $scope.editProfil = !$scope.editProfil;
    };

    $scope.preview = function (img) {
        $scope.file = img.files[0];
        var reader = new FileReader();
        reader.onload = function () {

            $scope.imgAffichee = URL.createObjectURL($scope.file);
            $('#previsualisation').attr('src', $scope.imgAffichee);
            $scope.cancelEditAvatar = false;
            $scope.editAvatar = false;


        };
        reader.readAsDataURL($scope.file);

    };

    $scope.editAvatarEmploye = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Connexion.edit($scope.c_utilisateur).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.avatar = $scope.c_utilisateur.avatar;
            $scope.editAvatar = true;
            $scope.cancelEditAvatar = true;
            alert('Photo de profil mise à jour');
            $scope.toggleButtonProfil();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.uploadAvatar = function () {
        $scope.imgProfil = $scope.file;
        var format = $scope.imgProfil.name.split(".");
        format = format[format.length - 1];
        var fd = new FormData();
        fd.append($scope.employe.numeroCni, $scope.imgProfil);
        UploadFile.uploadFile(fd).success(function (data) {
            $scope.c_utilisateur.avatar = 'images/' + data;
            UploadFile.resetHttp();
            $scope.editAvatarEmploye();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de l'enregistrement de l'avatar");
        });

    };


    /*Gestion avatar employe*/

    $scope.deleteAgent = function (employe) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Employe.delete(employe.id).success(function () {
                            UploadFile.delete(angular.toJson({chemin: "archives/" + employe.numeroCni})).success(function () {
                                SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                                document.location.href = "#/drh/employe/consulter";
                            }).error(function () {
                                SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                            });

                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };


});