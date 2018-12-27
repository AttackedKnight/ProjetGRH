/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('AbsencesController', function ($scope, SweetAlert,
        HistoriqueGrade, SyndicatTypeEmploye, GradeTypeEmploye, CaisseSocialeTypeEmploye, MutuelleTypeEmploye,
        $routeParams, UploadFile, Typedocument, Situation, Entite, Diplome, Genre, Formation, Employe,
        Contact, Adresse, Servir, MembreMutuelle, Fonction, Typecontrat, Civilite, Document, Connexion)
{


    $scope.fonction = {id: ""};
    $scope.formProvenanceFichier = "";
    
    $scope.message = "Bonjour , inf pro ctrl message";
//
//    $scope.templates=[{name:"Informations generales",url:"infosGenerales.html"},
//        {name:"Informations professionelles",url:"infosPro.html"}]

    Situation.findAll().success(function (data) {
        $scope.situations = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des situations matrimoniales");
    });
    Genre.findAll().success(function (data) {
        $scope.genres = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des genres");
    });
    Entite.findAll().success(function (data) {
        $scope.entites = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des entités");
    });
    Typecontrat.findAll().success(function (data) {
        $scope.typecontrats = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de contrats");
    });
    Fonction.findAll().success(function (data) {
        $scope.fonctions = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des fonctions");
    });

    $scope.removeSelectedSyndicat = function () {
        $scope.employe.syndicat = null;
        $scope.currentSyndicat = 0;
    };

    $scope.removeSelectedMutuelle = function () {
        $scope.membreMutuelle.mutuelleSante = null;
        $scope.currentMutuelle = 0;
    };

    $scope.removeSelectedCaisseSociale = function () {
        $scope.employe.caisseSociale = null;
        $scope.employe.matriculeCaisseSociale = "";
        $scope.currentCaisseSociale = 0;
    };


    /*RECUPERATION DES INFORMATIONS DE L'EMPLOYE*/

    $scope.getSyndicat = function (element) {
        $scope.currentSyndicat = $(element).val();
        $scope.employe.syndicat = $scope.syndicats.filter(retrieveSyndicat)[0];
    };
    function retrieveSyndicat(data) {
        return data.id == $scope.currentSyndicat;
    }
    ;

    $scope.getCaisseSociale = function (element) {
        $scope.currentCaisseSociale = $(element).val();
        $scope.employe.caisseSociale = $scope.caissesociales.filter(retrieveCaisseSociale)[0];
    };
    function retrieveCaisseSociale(data) {
        return data.id == $scope.currentCaisseSociale;
    }
    ;

    $scope.getMutulleSante = function (element) {
        $scope.currentMutuelle = $(element).val();
        $scope.membreMutuelle.mutuelleSante = $scope.mutuelles.filter(retrieveMutulleSante)[0];
    };
    function retrieveMutulleSante(data) {
        return data.id == $scope.currentMutuelle;
    }
    ;

    $scope.estMarie = false;
    $scope.checkSituationMatrimoniale = function () {
        if ($scope.employe.situationMatrimoniale.libelle == "Marié(e)") {
            $scope.estMarie = true;
        } else {
            $scope.estMarie = false;
        }
    };
    $scope.homme = false;
    $scope.checkGenre = function () {
        if ($scope.employe.genre.libelle == "Homme") {
            $scope.homme = true;
        } else {
            $scope.homme = false;
        }
    };

    var idEmploye = $routeParams.id;
    $scope.estPermanent = true;
    Employe.find(idEmploye).success(function (data) {
        $scope.employe = data;
        //Formatter les date pour l'affichage
        $scope.employe.dateDeNaissance = new Date($scope.employe.dateDeNaissance);
        $scope.employe.dateRecrutement = new Date($scope.employe.dateRecrutement);

        $scope.copieEmploye = angular.copy($scope.employe);

        if ($scope.employe.situationMatrimoniale && $scope.employe.situationMatrimoniale.libelle == "Marié(e)") {
            $scope.estMarie = true;
        }
        if ($scope.employe.genre && $scope.employe.genre.libelle == "Homme") {
            $scope.homme = true;
        }

        if ($scope.employe.syndicat != null) {
            $scope.currentSyndicat = $scope.employe.syndicat.id;
        } else {
            $scope.currentSyndicat = 0;
        }

        if ($scope.employe.caisseSociale != null) {
            $scope.currentCaisseSociale = $scope.employe.caisseSociale.id;
        } else {
            $scope.currentCaisseSociale = 0;
        }

        MembreMutuelle.findByEmploye($scope.employe).success(function (data) {
            if (data) {
                $scope.membreMutuelle = data;
                $scope.currentMutuelle = $scope.membreMutuelle.mutuelleSante.id;
            } else {
                $scope.membreMutuelle = {id: "", employe: $scope.employe};
                $scope.currentMutuelle = 0;
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement du mutuelle de sante !");
        });

        Contact.findByEmploye($scope.employe).success(function (data) {
            if (data) {
                $scope.contacts = data;
               

                if ($scope.contacts.numero2) {
                    $scope.autreNumero = true;
                } else {
                    $scope.autreNumero = false;
                }
            } else {
                $scope.contacts = {id: "", employe: $scope.employe};
            }
             $scope.copieContacts = angular.copy($scope.contacts);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des contacts !");
        });

        Adresse.findByEmploye($scope.employe).success(function (data) {
            if (data) {
                $scope.adresse = data;
            } else {
                $scope.adresse = {id: "", employe: $scope.employe};
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement de l'adresse !");
        });

        Connexion.findByEmploye($scope.employe.id).success(function (data) {    /*Recuperer l'avatar au niveau du compte utilisateur*/
            $scope.c_utilisateur = data;
            $scope.avatar = $scope.c_utilisateur.avatar;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des informations de l'utilisateur !");
        });

        /*Donnees qui varient selon le type de l'employe*/

        GradeTypeEmploye.findByType($scope.employe.typeEmploye.id).success(function (data) {
            $scope.grades = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des grades !");
        });
        SyndicatTypeEmploye.findByType($scope.employe.typeEmploye.id).success(function (data) {
            $scope.syndicats = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des syndicats");
        });

        CaisseSocialeTypeEmploye.findByType($scope.employe.typeEmploye.id).success(function (data) {
            $scope.caissesociales = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des caisses sociales");
        });

        MutuelleTypeEmploye.findByType($scope.employe.typeEmploye.id).success(function (data) {
            $scope.mutuelles = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des mutuelles");
        });

        /*Donnees qui varient selon le type de l'employe*/

        $scope.servir = {id: "", employe: $scope.employe};
        $scope.formation = {id: "", employe: $scope.employe};
        $scope.historiqueGrade = {id: "", employe: $scope.employe, encours: 1};

        $scope.findAllFormations();
        $scope.findServir();
        $scope.listerHistoriqueAvancement();
        $scope.listerMesDocuments();

        $(function () {
            $('a').tooltip();
        });
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des informations de l'employé");
    });



    /* edit info generale employe*/

    $scope.editInfoGenerales = false;
    $scope.currentSyndicat = 0;

    $scope.addMutuelle = function () {
        MembreMutuelle.add($scope.membreMutuelle).success(function () {
            ;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement du mutuelle de santé");
        });
    };

    $scope.deleteMutuelle = function () {
        MembreMutuelle.delete($scope.membreMutuelle.id).success(function () {
            ;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la suppression du mutuelle de santé");
        });
    };

    $scope.editMutuelle = function () {
        MembreMutuelle.edit($scope.membreMutuelle).success(function () {
            ;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification du mutuelle de santé");
        });
    };

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

            if ($scope.employe.numeroCni !== $scope.copieEmploye.numeroCni) {
                $scope.CheckCni();
            } else if ($scope.estPermanent == true && $scope.employe.matriculeInterne !== $scope.copieEmploye.matriculeInterne) {
                $scope.checkMatriculeInterne();
            } else if ($scope.estPermanent == true && $scope.employe.matriculeCaisseSociale != "" && $scope.employe.matriculeCaisseSociale !== $scope.copieEmploye.matriculeCaisseSociale) {
                $scope.checkMatriculeCaisseSociale();
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
        console.log("editEmploye"+ $scope.employe);
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Employe.edit($scope.employe).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.copieEmploye = angular.copy($scope.employe);
            if ($scope.membreMutuelle.id == "" && $scope.membreMutuelle.mutuelleSante != null) { //Si l'employe n'etait pas encore membre
                $scope.addMutuelle();
            }
            if ($scope.membreMutuelle.id != "" && $scope.membreMutuelle.mutuelleSante == null) { //Si l'employe n'est  plus membre
                $scope.deleteMutuelle();
            }
            if ($scope.membreMutuelle.id != "" && $scope.membreMutuelle.mutuelleSante != null) {
                $scope.editMutuelle();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.CheckCni = function () {
        Employe.checkcni($scope.employe.numeroCni).success(function (data) {

            if (data.value == true) {
                $('#cni_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.estPermanent == true && $scope.employe.matriculeInterne !== $scope.copieEmploye.matriculeInterne) {
                    $scope.checkMatriculeInterne();
                } else if ($scope.estPermanent == true && $scope.employe.matriculeCaisseSociale != "" && $scope.employe.matriculeCaisseSociale !== $scope.copieEmploye.matriculeCaisseSociale) {
                    $scope.checkMatriculeCaisseSociale();
                } else {
                    $scope.effectuerMajEmploye();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de v�rification du cni");
        });
    };

    $scope.checkMatriculeInterne = function () {
        Employe.checkmatricule($scope.employe.matriculeInterne).success(function (data) {
            if (data.value == true) {
                $('#mat_int_dup').show("slow").delay(3000).hide("slow");

            } else {
                if ($scope.estPermanent == true && $scope.employe.matriculeCaisseSociale != "" && $scope.employe.matriculeCaisseSociale !== $scope.copieEmploye.matriculeCaisseSociale) {
                    $scope.checkMatriculeCaisseSociale();
                } else {
                    $scope.effectuerMajEmploye();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de vérification du matricule de solde");
        });
    };

    $scope.checkMatriculeCaisseSociale = function () {
        Employe.checkmatriculecs($scope.employe.matriculeCaisseSociale).success(function (data) {
            if (data.value == true) {
                $('#mat_cs_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.effectuerMajEmploye();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de vérification du matricule IPRES/FNR");
        });
    };

    $scope.cancelEmployeEdit = function () {
        $scope.employe = angular.copy($scope.copieEmploye);
        $scope.toggleEmployeEditForm();
    };

    $scope.toggleEmployeEditForm = function () {
        $scope.editInfoGenerales = !$scope.editInfoGenerales;
//        if ($scope.editInfoGenerales === true) {
//            $scope.showDefaultAvatar();
//        }
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

    /* fin edit info employe */

    /* Edit Situation Matrimoniale */

    $scope.editSituationMatri = false;

    $scope.toggleSituationMatriEditForm = function () {
        $scope.editSituationMatri = !$scope.editSituationMatri;
    };

    $scope.controlSituationMatriFormEdit = function (formulaire) {
        $scope.formProvenanceFichier = formulaire;
        var validite = true;
        $('.editSituationMatriForm input[type=number]').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        $('.editSituationMatriForm select').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            /*Le nmero de cni est l'identifiant du dossier de l'employe dans les archives.
             * Donc avant l'ajout d'une info ayant une pi�ce jointe , le numero doit etre d�fini */
            if ($scope.employe.numeroCni && $scope.employe.numeroCni != '') {
                if ($scope.controlDocumentForm(formulaire)) {
                    $scope.completerDocument();
                    $scope.uploadDocument($scope.lesFichiers);
                    $scope.editEmploye();
                    $scope.toggleSituationMatriEditForm();
                }
            } else {
                SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
            }


        }
    };


    /* Edit Situation Matrimoniale */

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
    }

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

    /* Edit Adresse*/



    /*                    Parcours professionel                       */
    $scope.finContratApproche = false;
    $scope.finContratDepasse = false;
    $scope.finContratNombreJoursCritique = 15;
    $scope.findServir = function () {
        /*Recuperer le parcour professionnel de l'employe*/
        Servir.findByEmploye($scope.employe).success(function (data) {
            $scope.parcours = data;
            if ($scope.parcours[0].typeContrat.code == 'cdd') {
                $scope.estPermanent = false;            //Verifier si c'est un permanent ou non'
                var df= new Date($scope.parcours[0].fin);                
                var joursRestants = df - $scope.today;                
                joursRestants = joursRestants / 1000 / 60 / 60 / 24;
                
                if(joursRestants < 0){  //Date fin de contrat depass�
                    $scope.finContratDepasse = true;
                }
                else{
                    if(joursRestants < $scope.finContratNombreJoursCritique){  //Date fin de contrat depass�
                        $scope.finContratApproche = true;
                    } 
                }
                               
            } else {
                $scope.estPermanent = true;
            }
            $scope.trouverResponsable();    /*Trouver son superieur hierarchique actuel*/
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des informations sur le poste !");
        });
    };

    $scope.trouverResponsable = function () {
        var e = $scope.parcours[0].entite;
        if ($scope.parcours[0].responsable == 1) {  //Si l'employe est responsable de l' entite, on chercher le responsable de l'entite parent(si elle existe)      
            if ($scope.parcours[0].entite.entite != null) {
                var e = $scope.parcours[0].entite.entite;
            }
        }
        Servir.findResponsableEntite(e).success(function (data) {
            if (data) {
                var situation = '';     //Requise si seulement l'employe est feminin . Pour les hommes c'est toujour Mr(la civilt�)
                if (data.employe.genre.libelle != 'Homme') {
                    situation = data.employe.situationMatrimoniale.id + '';
                }
                Civilite.findByGenreAndSituation(data.employe.genre.id, situation).success(function (civilite) {
                    $scope.mon_responsable = civilite.code + ' ' + data.employe.prenom + ' ' + (data.employe.nom).toUpperCase();
                }).error(function () {
                    SweetAlert.finirChargementEchec("Erreur lors de la récupération de la civilité!");
                });

            } else {
                $scope.mon_responsable = "";
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des informations sur le responsable !");
        });
    };

    $scope.finirService = function (serviceActuel) {
        serviceActuel.fin = new Date();
        serviceActuel.finService = 1;
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Servir.finirService(serviceActuel).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "");
            $scope.findServir();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de traitement");
        });

    };

    $scope.controlNewJobForm = function (s) {
        var validite = true;
        $('.newEmploiForm input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (s.entite == null) {
            $('#entite').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (s.typeContrat == null) {
            $('#contrat').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.completerServir();
        }
    };

    $scope.prolongerContrat = function (leService) {
        swal({
            title: 'Le nombre de mois ?',
            input: 'number',
            showCancelButton: true,
            inputValidator: (value) => {
                return !value && 'Renseigner une valeur!'
            },
            inputAttributes: {
                max: 99,
                min : 1
            }
        }).then(function (result) {
            if (result.value) {
                leService.dureeDuContrat =leService.dureeDuContrat + parseInt(result.value);
                var dateFinService = new Date(leService.debut);
                dateFinService.setMonth(dateFinService.getMonth() + leService.dureeDuContrat);
                leService.fin = dateFinService;
                $scope.editServir(leService);
            }
        });
    };

    $scope.editServir = function(s){
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Servir.edit(s).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "");
            Servir.findByEmploye($scope.employe);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de traitement");
        });
    };

    $scope.completerServir = function () {

        if ($scope.servir.typeContrat.code == 'cdd') {   //Calculer la date de fin du contrat 
            var dateFinService = new Date($scope.servir.debut);
            dateFinService.setMonth(dateFinService.getMonth() + $scope.servir.dureeDuContrat);
            $scope.servir.fin = dateFinService;
        }

        if (($scope.fonction.libelle).toLowerCase() == "recteur" || ($scope.fonction.libelle).toLowerCase() == "rectrice" ||
                ($scope.fonction.libelle).toLowerCase() == "directeur" || ($scope.fonction.libelle).toLowerCase() == "directrice" ||
                ($scope.fonction.libelle).toLowerCase() == "chef des services administratifs" || ($scope.fonction.libelle).toLowerCase() == "chef de département") {
            $scope.servir.responsable = 1;
        } else {
            $scope.servir.responsable = 0;
        }
        /* Verifier d'abord que l'employe n'occupe pas un autre poste*/
        Servir.enService($scope.employe).success(function (data) {
            SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
            if (data.value == true) {
                SweetAlert.notificationAvecSuggestion("info", "Information", "Cet employé est en service actuellement",
                        "<h5>Clicker sur le boutton <b>fin</b> d'abord</h5>");
            } else {
                /*Si c'est un poste poste de responsabilité, vérifier que ce n'est pas occupe pas quelqu'un autre*/
                if ($scope.servir.responsable === 1) {
                    Servir.findResponsableEntite($scope.servir.entite).success(function (data) {
                        if (!data) {
                            $scope.ajouterNouvelPoste();
                        } else {
                            $('.conflit-poste').show("slow").delay(3000).hide("slow");
                        }
                    }).error(function () {
                        SweetAlert.simpleNotification("error", "Erreur", "Erreur de vérification du responsable");
                    });
                } else {
                    $scope.ajouterNouvelPoste();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur de vérification");
        });

    };

    $scope.ajouterNouvelPoste = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Fonction.findByLibelle($scope.fonction.libelle).success(function (data) {
            if (!data) {
                Fonction.add($scope.fonction).success(function () {
                    Fonction.findByLibelle($scope.fonction.libelle).success(function (data) {
                        $scope.servir.fonction = data;
                        $scope.addServir();
                    }).error(function () {
                        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération\n\
                        des informations sur la fonction occupée");
                    });
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de la nouvelle fonction");
                });
            } else {
                $scope.servir.fonction = data;
                $scope.addServir();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recherche : fonction");
        });
    };

    $scope.addServir = function () {
        Servir.add($scope.servir).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Nouveau poste enregistré avec succes");
            $scope.reinitialiserFormulaireParcours();
            $scope.findServir();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement\n\
                des informations sur le nouveau poste");
        });
    };

    $scope.reinitialiserFormulaireParcours = function () {
        $scope.fonction = {id: ""};
        $scope.servir = {id: "", employe: $scope.employe};
    };

    /*                    Parcours professionel                       */

    /*                     AVANCEMENT                                 */

    $scope.showGradeList = false;

    $scope.toggleGradeList = function () {
        $scope.showGradeList = !$scope.showGradeList;
        if ($scope.showGradeList == true) {
            if ($scope.gradeActu.grade) {
                $scope.selection = ($scope.gradeActu.grade.corps.libelle) ? $scope.gradeActu.grade.corps.libelle : $scope.gradeActu.grade.classe.libelle;
            } else {
                $scope.selection = "";
            }

        }
    };

    $scope.mesgrades = [];
    $scope.gradeActu = {};

    $scope.listerHistoriqueAvancement = function () {
        HistoriqueGrade.findByEmploye($scope.employe).success(function (data) {
            if (data) {
                $scope.mesgrades = data;
                $scope.gradeActu = $scope.mesgrades[0];
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du grade");
        });
    };

    $scope.controlGradeForm = function () {
        var validite = true;
        if (!$scope.historiqueGrade.grade || $scope.historiqueGrade.grade == null) {
            $('.grade-not-selected').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.ajouterGrade();
        }
    };

    $scope.ajouterGrade = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        if ($scope.gradeActu.grade) {
            $scope.gradeActu.encours = false;
            HistoriqueGrade.edit($scope.gradeActu).success(function () {
                $scope.addGrade();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur de mise à jour");
            });
        } else {
            $scope.addGrade();
        }

    };

    $scope.addGrade = function () {
        var datePassation = new Date();
        var dateProchainAvancement = new Date();
        dateProchainAvancement.setFullYear(dateProchainAvancement.getFullYear() + $scope.historiqueGrade.grade.duree);

        $scope.historiqueGrade.datePassation = datePassation;
        $scope.historiqueGrade.dateProchainAvancement = dateProchainAvancement;

        HistoriqueGrade.add($scope.historiqueGrade).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Grade enregistré avec succes");
            $scope.listerHistoriqueAvancement();
            $scope.reinitialiserFormulaireAvancement();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le grade n'a pas pu etre ajouté");
        });
    };

    $scope.reinitialiserFormulaireAvancement = function () {
        $scope.selection = "";
        $scope.historiqueGrade = {id: "", employe: $scope.employe, encours: 1};
    };

    /*                     AVANCEMENT                                 */


    /*        formation              */
    $scope.formations = [];
    $scope.today = new Date();
    $scope.diplomante = false;
    $scope.diplome = {id: ""};

    $scope.toggleDiplomante = function () {
        $scope.diplomante = !$scope.diplomante;
    };
    $scope.controlFormationFormation = function (formulaire) {
        var validite = true;
        $('.formationForm input:not([type="file"])').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            if ($scope.controlDocumentForm(formulaire)) {
                /*Le nmero de cni est l'identifiant du dossier de l'employe dans les archives.
                 * Donc avant l'ajout d'une info ayant une pi�ce jointe , le numero doit etre d�fini */
                if ($scope.employe.numeroCni && $scope.employe.numeroCni != '') {
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.nouvelleFormation = true;
                        if ($scope.diplomante == true) {
                            $scope.completeFormation();
                        } else {
                            $scope.addFormation();
                        }
                    }
                } else {
                    SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                }


            }

        }

    };

    $scope.visualiserDocumentformation = function (idFormation) {
        for (var i = 0; i < $scope.documents.length; i++) {
            if ($scope.documents[i].formation != null && $scope.documents[i].formation.id == idFormation) {
                $scope.visualiserDocument($scope.documents[i].emplacement);
            }
        }
    };

    /*Permet de completer le document en referencant la formation a laquelle elle se rapporte
     * Elle est appele apres que la formation soit ajoutee dans la base de donnees et recuperer*/
    $scope.completerDocumentFormation = function () {
        $scope.document.formation = $scope.lastFormation;
        $scope.completerDocument();
        $scope.uploadDocument($scope.lesFichiers);
        $scope.nouvelleFormation = false;
    };
    $scope.completeFormation = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Diplome.findByLibelle($scope.diplome.nom).success(function (data) {
            if (!data) {
                Diplome.add($scope.diplome).success(function () {
                    Diplome.findByLibelle($scope.diplome.nom).success(function (data) {
                        $scope.formation.diplome = data;
                        $scope.addFormation();
                    }).error(function () {
                        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du diplome");
                    });
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout du diplome");
                });

            } else {
                $scope.formation.diplome = data;
                $scope.addFormation();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du diplome");
        });
    };

    $scope.addFormation = function () {
        Formation.add($scope.formation).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Formation ajoutée avec succes");
            $scope.findAllFormations();
            $scope.reinitialiserFormulaireFormation();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de la formation");
        });

    };

    $scope.findAllFormations = function () {
        Formation.findAllEmployeFormation($scope.employe).success(function (data) {
            $scope.formations = data;
            $scope.lastFormation = $scope.formations[0];
            SweetAlert.finirChargementSucces("Chargement complet !");
            if ($scope.nouvelleFormation == true) {
                //S'il s'agit d'une nouvelle formation, il y a upload
                $scope.completerDocumentFormation();
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des formations !");
        });

    };

    $scope.reinitialiserFormulaireFormation = function () {
        $scope.formation = {id: "", employe: $scope.employe};
        $scope.diplomante = false;
        $('#diplomante').prop('checked', false);
        $scope.diplome = {id: ""};
    };




    /*Gestion des documents electroniques*/
    $scope.lesFichiers = null;
    $scope.typedocuments = [];
    $scope.documents = [];
    $scope.document = {id: "", dateEnregistrement: $scope.today};
    $scope.detailUploadContent = "";

    Typedocument.findAll().success(function (data) {
        $scope.typedocuments = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de document !");
    });

    $scope.listerMesDocuments = function () {
        Document.findByEmploye($scope.employe).success(function (data) {
            $scope.documents = $scope.docs = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des documents de l'employé !");
        });
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

            var talle = Math.ceil(file.size / 1024);
            $('#' + $scope.formProvenanceFichier + ' .detailUpload').append('<div><span clas>' + file.name + '</span><div class="progress progress-striped active"><div id="barreProgression_' + indice + '" class="progress-bar"></div></div><div id="pourcentage_' + indice + '" class="pull-right"></div> </div>');

            return true;
        } else {
            $scope.cancelFileUpload();
            $(".error-format").show("slow").delay(3000).hide("slow");
            return false;
        }
    };

    $scope.ajouterNouveauDocument = function (formulaire) {
        $scope.formProvenanceFichier = formulaire;
        if ($scope.controlDocumentForm(formulaire)) {
            $scope.completerDocument();
            $scope.uploadDocument($scope.lesFichiers);
        }
    };

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
        $scope.document.employe = $scope.employe;
        var e = new Date();
        e.setFullYear(e.getFullYear() + $scope.document.typeDocument.dureeArchivage);
        $scope.document.echeance = e;
    };

    $scope.addDocument = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Document.add($scope.document).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Document ajoutée avec succes");
            if ($scope.finUpload == true) {
                //Utile lorsqu'il y a plusieurs documents a enregistrer pour une seule table(formation,situation matri ...)
                $scope.document = {id: "", dateEnregistrement: $scope.today};
                $scope.cancelFileUpload();
                $scope.listerMesDocuments();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le document n'a pas pu etre ajouté");
        });

    };

    /*Gerer l'upload de fichier*/

    $scope.uploadDocument = function (fichiers) {
        if ($scope.employe.numeroCni && $scope.employe.numeroCni != '') {
            $scope.finUpload = false;
            for (var i = 0; i < fichiers.files.length; i++) {   //  Parcour des fichier a uploader
                $scope.uploadedFile = fichiers.files[i];
                var format = $scope.uploadedFile.name.split("."); //Recuperation du format
                format = format[format.length - 1];
                var fd = new FormData();                //Creation d'un objet FormData
                fd.append($scope.employe.numeroCni, $scope.uploadedFile);   //Ajout du fichier et de son emplacement au FormData
                UploadFile.uploadDocument(fd).success(function (data) {   //Appel du service(Objet java) charger d'uploader le fichier : la requete retourne le nom du fichier
                    $scope.document.emplacement = data;
                    $scope.addDocument();               //Ajout dans la base de donnees
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement du document");
                });
            }
            $scope.finUpload = true;
            UploadFile.resetHttp();
        } else {
            SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
        }

    };

    $scope.visualiserDocument = function (lien) {
        window.open(lien);
    };

    /*Gestion des documents electroniques*/

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

    $scope.deleteContact = function (id) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Contact.delete(id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.contacts = {id: ""};
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };

    $scope.deleteAdresse = function (id) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Adresse.delete(id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.adresse = {id: ""};
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };

    $scope.deleteParcours = function (id) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Servir.delete(id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.findServir();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };

    $scope.deleteGrade = function (id) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        HistoriqueGrade.delete(id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.listerHistoriqueAvancement();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };

    $scope.getDocumentformation = function (idFormation) {
        for (var i = 0; i < $scope.documents.length; i++) {
            if ($scope.documents[i].formation != null && $scope.documents[i].formation.id == idFormation) {
                return $scope.documents[i];
            }
        }
        return null;
    };

    $scope.delArchive = false;
    $scope.deleteArchive = function (doc) {
        var dateEcheanceDoc = new Date(doc.echeance);
        var dateEcheanceAtteinte = ($scope.today > dateEcheanceDoc);    //Si la date d'�cheance du document est atteinte ?
        if (dateEcheanceAtteinte) {
            Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                    .then(function (value) {
                        $scope.delArchive = true;
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
                if ($scope.delArchive == true) {
                    $scope.delArchive = false;
                    SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                    $scope.listerMesDocuments();
                }
                if ($scope.delFormation == true) {
                    /*Supprimer la formation a la quelle est rattachee le document supprimer*/
                    $scope.deleteFormation(document.formation.id);
                }
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression du document");
            });
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression du fichier");
        });
    };

    $scope.delFormation = false;  /*Verifier si le document supprimer est lie a une formation(c a d si la mathode deleteFornation doit etre appellee apres suppression du document)*/

    $scope.deleteFormationAndDocument = function (id) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        $scope.delFormation = true;
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        var doc = $scope.getDocumentformation(id); //Recuperer le document lie � cette formation
                        $scope.deleteDocument(doc);
                    }
                });
    };

    $scope.deleteFormation = function (id) {
        Formation.delete(id).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.delFormation = false;
            $scope.listerMesDocuments();
            $scope.findAllFormations();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
        });
    };

   

    $scope.gelerCompte = function () {
        ;
    };
});