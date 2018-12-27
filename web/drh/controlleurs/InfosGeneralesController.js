/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('InfosGeneralesController', function ($scope, SweetAlert, Genre, Employe,
        Contact, Adresse)
{

    Genre.findAll().success(function (data) {
        $scope.genres = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des genres");
    });

    //Formatter les date pour l'affichage
    $scope.$parent.employe.dateDeNaissance = new Date($scope.$parent.employe.dateDeNaissance);
    $scope.$parent.employe.dateRecrutement = new Date($scope.$parent.employe.dateRecrutement);

    $scope.copieEmploye = angular.copy($scope.$parent.employe);

    Contact.findByEmploye($scope.$parent.employe).success(function (data) {
        if (data) {
            $scope.contacts = data;
            if ($scope.contacts.numero2) {
                $scope.autreNumero = true;
            } else {
                $scope.autreNumero = false;
            }
        } else {
            $scope.contacts = {id: "", employe: $scope.$parent.employe};
        }
        $scope.copieContacts = angular.copy($scope.contacts);
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des contacts !");
    });

    Adresse.findByEmploye($scope.$parent.employe).success(function (data) {
        if (data) {
            $scope.adresse = data;
        } else {
            $scope.adresse = {id: "", employe: $scope.$parent.employe};
        }
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement de l'adresse !");
    });

    $(function () {
        $('a').tooltip();
    });

    /* edit info generale employe*/

    $scope.editInfoGenerales = false;

    $scope.controlFormEditEmploye = function () {
        var validite = true;
        $('#editInfoGenerales input').each(function (e) {
            if ($(this).val() === "" && $(this).attr('id') !== "profil") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        $('#editInfoGenerales select').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {

            /*Verification unicite identifiants  en cas de changement*/

            /*Si les identifiants ont ete touche*/

            if ($scope.$parent.employe.numeroCni !== $scope.copieEmploye.numeroCni) {
                $scope.CheckCni();
            } else if ($scope.$parent.estPermanent == true && $scope.$parent.employe.matriculeInterne !== $scope.copieEmploye.matriculeInterne) {
                $scope.checkMatriculeInterne();
            } else {
                $scope.effectuerMajEmploye();
            }

        }
    };

    $scope.effectuerMajEmploye = function () {
        $scope.editEmploye();
        $scope.toggleEmployeEditForm();
    };

    $scope.editEmploye = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Employe.edit($scope.$parent.employe).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.copieEmploye = angular.copy($scope.$parent.employe);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.CheckCni = function () {
        Employe.checkcni($scope.$parent.employe.numeroCni).success(function (data) {

            if (data.value == true) {
                $('#cni_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.$parent.estPermanent == true && $scope.$parent.employe.matriculeInterne !== $scope.copieEmploye.matriculeInterne) {
                    $scope.checkMatriculeInterne();
                }
                {
                    $scope.effectuerMajEmploye();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de v�rification du cni");
        });
    };

    $scope.checkMatriculeInterne = function () {
        Employe.checkmatricule($scope.$parent.employe.matriculeInterne).success(function (data) {
            if (data.value == true) {
                $('#mat_int_dup').show("slow").delay(3000).hide("slow");

            } else {
                $scope.effectuerMajEmploye();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de vérification du matricule de solde");
        });
    };

    $scope.cancelEmployeEdit = function () {
        $scope.$parent.employe = angular.copy($scope.copieEmploye);
        $scope.toggleEmployeEditForm();
    };

    $scope.toggleEmployeEditForm = function () {
        $scope.editInfoGenerales = !$scope.editInfoGenerales;
    };

    /*Infos generales*/

    /* Edit Contact */

    $scope.editContact = false;

    $scope.cancelContactsEdit = function () {
        $scope.contacts = angular.copy($scope.copieContacts);
        $scope.toggleContactEditForm();
    };

    $scope.toggleContactEditForm = function () {
        $scope.editContact = !$scope.editContact;
    };

    $scope.toggleNumeroTel2 = function () {
        $scope.autreNumero = !$scope.autreNumero;
        if ($scope.autreNumero == false) {
            $scope.contacts.numero2 = null;
        }
    };

    $scope.controlContactFormEdit = function () {
        var validite = true;
        $('.editContactForm input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });

        if (validite === true) {
            /*Verification unicite identifiant  en cas de changement*/
            /*Si les identifiants ont ete touche*/

            if ($scope.contacts.numero1 != $scope.copieContacts.numero1) {
                $scope.checkNumeroTel1();
            } else if ($scope.autreNumero == true && $scope.contacts.numero2 != $scope.copieContacts.numero2) {
                $scope.checkNumeroTel2();
            } else if ($scope.contacts.email != $scope.copieContacts.email) {
                $scope.checkEmail();
            } else {
                $scope.effectuerMajContact();
            }

        }
    };

    $scope.addContact = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Contact.add($scope.contacts).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Contacts ajoutés avec succes !");
            $scope.copieContacts = angular.copy($scope.contacts);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des contacts");
        });
    };

    $scope.editContacts = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Contact.edit($scope.contacts).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Contacts mise à jour avec succes");
            $scope.copieContacts = angular.copy($scope.contacts);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.checkNumeroTel1 = function () {
        Contact.checkcontact($scope.contacts.numero1).success(function (data) {
            if (data.value == true) {
                $('#num_tel_1_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.autreNumero == true && $scope.contacts.numero2 !== $scope.copieContacts.numero2) {
                    $scope.checkNumeroTel2();
                } else if ($scope.contacts.email !== $scope.copieContacts.email) {
                    $scope.checkEmail();
                } else {
                    $scope.effectuerMajContact();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la vérification du numéro de téléphone 1");
        });
    };

    $scope.checkNumeroTel2 = function () {
        Contact.checkcontact($scope.contacts.numero2).success(function (data) {
            if (data.value == true) {
                $('#num_tel_2_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.contacts.email !== $scope.copieContacts.email) {
                    $scope.checkEmail();
                } else {
                    $scope.effectuerMajContact();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la vérification du numéro de téléphone 2");
        });
    };

    $scope.checkEmail = function () {
        Contact.checkmail($scope.contacts.email).success(function (data) {
            if (data.value == true) {
                $('#email_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.effectuerMajContact();

            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la v�rification dde l\'adresse email");
        });
    };

    $scope.effectuerMajContact = function () {
        if ($scope.contacts.id == "") {       //Si les contacts n'exisait pas encore dans la base : on fait un ajout 
            $scope.addContact();
        } else {
            $scope.editContacts();
        }
        $scope.toggleContactEditForm();
    };

    /* Edit Contact*/

    /* Edit Adresse */

    $scope.editAdresse = false;

    $scope.toggleAdresseEditForm = function () {
        $scope.editAdresse = !$scope.editAdresse;
    };

    $scope.controlAdresseFormEdit = function () {
        var validite = true;
        $('.editAdresseForm input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });

        if (validite === true) {
            if ($scope.adresse.id == "") {       //Si adresse n'exisait pas encore dans la base : on fait un ajout                         
                $scope.addAdresse();
            } else {
                $scope.editEmployeAdresse();
            }
            $scope.toggleAdresseEditForm();
        }
    };

    $scope.addAdresse = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Adresse.add($scope.adresse).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Adresse ajouté avec succes !");
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement de l'adresse");
        });
    };

    $scope.editEmployeAdresse = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Adresse.edit($scope.adresse).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes")
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    /* Adresse*/

});