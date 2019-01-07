/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('DrhModule').controller('ArchivesController', function ($scope, SweetAlert,$q, UploadFile, Document)
{


    $scope.ajouterNouveauDocument = function (formulaire) {
        $scope.formProvenanceFichier = formulaire;
        if ($scope.controlDocumentForm(formulaire)) {
            $scope.completerDocument();
            $scope.uploadDocument($scope.lesFichiers);
        }
    };

    /*Gestion des documents electroniques*/
    $scope.lesFichiers = null;
    $scope.initDocument = function () {
        $scope.document = {id: "", dateEnregistrement: $scope.$parent.today};
    };
    $scope.initDocument();

    $scope.controlDocumentForm = function (formulaire) {
        var validite = true;
        $('#' + formulaire + ' textarea').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.document.typeDocument == null) {
            $('#' + formulaire + ' .type-doc-missing').show("slow").delay(3000).hide("slow");
            validite = false;
        }

        if ($scope.lesFichiers == null) {
            $('#' + formulaire + ' .missing-file').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        return validite;

    };

    /*Complete les autres informations sur le document : l'employe, la date d'echeance, ...*/
    $scope.completerDocument = function () {
        $scope.document.employe = $scope.$parent.employe;
        var e = new Date();
        e.setFullYear(e.getFullYear() + $scope.document.typeDocument.dureeArchivage);
        $scope.document.echeance = e;
    };

    $scope.cancelFileUpload = function () {
        $('#' + $scope.formProvenanceFichier + ' .detailUpload').html('');
        $scope.lesFichiers = null;

    };

    $scope.previewUpload = function (fichiers, formulaire) {
        $scope.formProvenanceFichier = formulaire;
        $scope.lesFichiers = fichiers;
        for (var i = 0; i < fichiers.files.length; i++) {
            $scope.fichierEnvoye = fichiers.files[i];
            if ($scope.afficheDetail($scope.fichierEnvoye, i) === true) {
                var reader = new FileReader();
                reader.readAsDataURL($scope.fichierEnvoye);
            }
        }
    };

    $scope.afficheDetail = function (file, indice) {
        var allowedTypes = "pdf";                  //Type de fichier autorise  
        var imgType = file.name.split('.');
        imgType = imgType[imgType.length - 1].toLowerCase(); //Recuperer l'extension du fichier
        if (imgType === allowedTypes) {
            $('#' + $scope.formProvenanceFichier + ' .detailUpload').append('<div><span clas>' + file.name + '</span><div class="progress progress-striped active"><div id="barreProgression_' + indice + '" class="progress-bar"></div></div><div id="pourcentage_' + indice + '" class="pull-right"></div> </div>');

            return true;
        } else {
            $scope.cancelFileUpload();
            $(".error-format").show("slow").delay(3000).hide("slow");
            return false;
        }
    };

    $scope.addDocument = function (emplacementFichiers) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        var req_tab = [];
        var instanceDoc;
        for (var i = 0; i < emplacementFichiers.length; i++) {   //  Parcour des emplacements des fichier uploades
            instanceDoc = angular.copy($scope.document);
            instanceDoc.emplacement = emplacementFichiers[i];
            req_tab.push(Document.add(instanceDoc));    //Ajout dans la base de donnees
        }
        $q.all(req_tab).then(function () { //Si l'upload dans le dossier physique a reussi
            //Reinitialisation et raffraichissement liste document
            SweetAlert.simpleNotification("success", "Succes", "Document ajouté avec succes !");
            $scope.initDocument();
            $scope.cancelFileUpload();
            $scope.$parent.listerMesDocuments();
        });
    };

    /*Gerer l'upload de fichier*/

    $scope.uploadDocument = function (fichiers) {
        if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
            var req_tab = [];
            for (var i = 0; i < fichiers.files.length; i++) {   //  Parcour des fichier a uploader
                $scope.fileToUpload = fichiers.files[i];
                var format = $scope.fileToUpload.name.split("."); //Recuperation du format
                format = format[format.length - 1];
                var fd = new FormData();                //Creation d'un objet FormData
                fd.append($scope.$parent.employe.numeroCni, $scope.fileToUpload);   //Ajout du fichier et de son emplacement au FormData
                req_tab.push(UploadFile.uploadDocument(fd));    //Upload dans le dossier physique
            }
            $q.all(req_tab).then(function (results) { //Si l'upload dans le dossier physique a reussi
                var emplacement = [];
                for (var i = 0; i < results.length; i++) { //Recuperer les emplacement de chaque fichier uploader dans le dossier physique
                    emplacement.push(results[i].data);
                }
                $scope.addDocument(emplacement);               //Ajout dans la base de donnees     
                UploadFile.resetHttp();
            });

        } else {
            SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
        }

    };


    $scope.deleteArchive = function (doc) {
        var dateEcheanceDoc = new Date(doc.echeance);
        var dateEcheanceAtteinte = ($scope.today > dateEcheanceDoc);    //Si la date d'�cheance du document est atteinte ?
        if (dateEcheanceAtteinte) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        $scope.deleteDocument(doc);
                    }
                });
        } else {
            SweetAlert.simpleNotification("warning", "Attention", "Vous ne pouvez pas supprimer ce document \n\
                                            car la date d'écheance n'est pas encore atteinte");
        }

    };

    $scope.deleteDocument = function (document) {
        UploadFile.delete(angular.toJson({chemin: document.emplacement})).success(function () {
            Document.delete(document.id).success(function () {
                SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                $scope.$parent.listerMesDocuments();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression du document");
            });
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression du fichier");
        });
    };

    /*Gestion des documents electroniques*/
});