<<<<<<< HEAD
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('DrhModule').controller('EmployeController', function ($scope, SweetAlert, Mail, UploadFile,
        Employe, Utilisateur, Groupe, Contact, Adresse, Servir, Fonction, TypeEmploye,$window,
        Entite, Typecontrat, Fonction, Groupe, Genre, $routeParams, Document, $q, Typedocument)
{


    /*Initialisation*/
    $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
    $scope.groupe = {};
    $scope.employe = {id: ""};
    $scope.contact = {id: ""};
    $scope.adresse = {id: ""};
    $scope.servir = {id: ""};
//    $scope.membreMutuelle = {id: ""};
    $scope.fonction = {id: ""};
//    $scope.situations = [];
//    $scope.corps = [];
    $scope.today = new Date();
    $scope.employe.nationalite = "Sénégalaise";
    $scope.senegalaise = true;
//    $scope.selection = "";

    $scope.setNationalite = function () {
        if ($scope.senegalaise == true) {
            $scope.employe.nationalite = "Sénégalaise";
        } else {
            $scope.employe.nationalite = "";
        }
    };

    /*Initialisation*/

    /* Réinitialisation du formulaire */


    $scope.reinitialiser = function () {
        $scope.employe = {id: ""};
        $scope.contact = {id: ""};
        $scope.adresse = {id: ""};
//        $scope.historiqueGrade = {id: "", encours: 1};
        $scope.servir = {id: ""};
        $scope.fonction = {id: ""};
//        $scope.membreMutuelle = {id: ""};
        $scope.showDefaultAvatar();
        $scope.senegalaise = true;
        $scope.employe.nationalite = "Sénégalaise";
//        $scope.selection = "";
        $scope.setTypeEmploye();
        $scope.cancelFileUpload();
        $scope.initDocument();
    };

    /* Réinitialisation du formulaire */

    /*Gestion avatar*/

    $scope.showDefaultAvatar = function () {
        $('#previsualisation').attr('src', 'images/avatar.png');
        $scope.file = null;
    };
    $scope.showDefaultAvatar();

    $scope.preview = function (img) {
        $scope.file = img.files[0];
        var reader = new FileReader();
        reader.onload = function () {

            $scope.imgAffichee = URL.createObjectURL($scope.file);
            $('#previsualisation').attr('src', $scope.imgAffichee);

        };
        reader.readAsDataURL($scope.file);

    };

    $scope.uploadAvatar = function () {
        $scope.imgProfil = $scope.file;
        var format = $scope.imgProfil.name.split(".");
        format = format[format.length - 1];
        var fd = new FormData();
        fd.append($scope.employe.numeroCni, $scope.imgProfil);
        UploadFile.uploadFile(fd).success(function (data) {
            $scope.utilisateur.avatar = 'images/' + data;
            $scope.creerCompteUtilisateur();
            UploadFile.resetHttp();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement de l'avatar");
        });

    };

    /*Gestion avatar*/

    /*          RECCUPERATION DES ELEMENTS PARAMETRES POUR LES AFFICHER DANS LES LISTES DE SELECTION        */

    Entite.findAll().success(function (data) {
        $scope.entites = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des entités");
    });

    Typecontrat.findAll().success(function (data) {
        $scope.typecontrats = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de contrat");
    });

    Genre.findAll().success(function (data) {
        $scope.genres = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des situations matrimoniales");
    });

    Typedocument.findAll().success(function (data) {
        $scope.typedocuments = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de document !");
    });

    $scope.setTypeEmploye = function () {
        TypeEmploye.find($routeParams.type).success(function (data) {
            $scope.employe.typeEmploye = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des types d'employés");
        });
    };
    $scope.setTypeEmploye();

    Groupe.findByLibelle("employe").success(function (data) {
        $scope.groupe = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement du groupe utilisateur");
    });

    Fonction.findAll().success(function (data) {
        $scope.fonctions = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des fonctions");
    });

    /*          RECCUPERATION DES ELEMENTS PARAMETRES POUR LES AFFICHER DANS LES LISTES DE SELECTION        */

    $scope.getTypeContrat = function () {
        $scope.reinitialiser();
        $scope.servir.typeContrat = $scope.typecontrats.filter(retrieveTypeContrat)[0];
        if ($scope.servir.typeContrat.code == 'cdi') {
            $scope.estPermanent = true;
        } else
        {
            $scope.estPermanent = false;
        }

    };
    function retrieveTypeContrat(data) {
        return data.id == $scope.currentTypeContrat;
    }
    ;

    $scope.verifiercni = function () {
        Employe.checkcni($scope.employe.numeroCni).success(function (data) {
            if (data.value == true) {
                $('#cni_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.employe.matriculeInterne) {
                    $scope.verifierMatriculeInterne();
                } else {
                    $scope.verifierContact1();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du cni");
        });
    };

    $scope.verifierMatriculeInterne = function () {
        Employe.checkmatricule($scope.employe.matriculeInterne).success(function (data) {
            if (data.value == true) {
                $('#mat_int_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.verifierContact1($scope.contact.numero1);
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification matricule");
        });
    };


    $scope.verifierContact1 = function () {
        Contact.checkcontact($scope.contact.numero1).success(function (data) {
            if (data.value == true) {
                $('#num_tel_1_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.autreNumero == true) {
                    $scope.verifierContact2();
                } else {
                    $scope.verifierEmail();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du numéro de téléphone 1");
        });

    };

    $scope.verifierContact2 = function () {
        Contact.checkcontact($scope.contact.numero2).success(function (data) {
            if (data.value == true) {
                $('#num_tel_2_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.verifierEmail();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du numéro de téléphone 2");
        });
    };

    $scope.verifierEmail = function () {
        Contact.checkmail($scope.contact.email).success(function (data) {
            if (data.value == true) {
                $('#email_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.add();   //Ajout de l'employe
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification de l\'adresse email");
        });

    };
    $scope.verifierUnicite = function () {
        $scope.verifiercni();
    };

    $scope.completerAdresse = function () {
        $scope.adresse.employe = $scope.employe;
        Adresse.add($scope.adresse).success(function () {
            $scope.completerContact();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement de l'adresse");
        });
    };

    $scope.completerContact = function () {
        $scope.contact.employe = $scope.employe;
        Contact.add($scope.contact).success(function () {
            $scope.addFonctionServir();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des contacts");
        });

    };

    $scope.addFonctionServir = function () {
        var req_tab = [];
        req_tab.push(Fonction.findByLibelle($scope.fonction.libelle));
        $q.all(req_tab).then(function (results) { //Si la fonction existe deja(parametre)
            if (results[0].data) {    //Si oui
                $scope.servir.fonction = results[0].data;
                if ($scope.servir.fonction.responsabilite == true) {//Verifier si c'est un poste de responsabilite
                    $scope.servir.responsable = 1;
                } else {
                    $scope.servir.responsable = 0;
                }
                $scope.completerServir();
            } else {   //On ajoute ca dans la base
                $scope.servir.responsable = 0;
                req_tab = [];
                req_tab.push(Fonction.add($scope.fonction));
                $q.all(req_tab).then(function (data) {
                    req_tab = [];
                    req_tab.push(Fonction.findByLibelle($scope.fonction.libelle));
                    $q.all(req_tab).then(function (results) { //On le recuppere
                        $scope.servir.fonction = results[0].data;
                        $scope.completerServir();
                    });
                });
            }
        });
    };

    $scope.completerServir = function () {
        $scope.servir.employe = $scope.employe;
        if (!$scope.estPermanent) {   //Calculer la date de fin du contrat 
            var dateFinService = new Date($scope.servir.debut);
            dateFinService.setMonth(dateFinService.getMonth() + $scope.servir.dureeDuContrat);
            $scope.servir.fin = dateFinService;
        }

        if ($scope.servir.responsable === 1) {  //Si c'est un poste de responsabilite au sein de l'entite choisie
            Servir.findResponsableEntite($scope.servir.entite).success(function (data) { //Si le poste est deja occupe par quelqu'un d'autre
                if (data !== null) {    //Signaler un conflit
                    $('.conflit-poste').show("slow").delay(3000).hide("slow");
                } else {
                    $scope.addServir();
                }
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération du responsable de l'entité");
            });
        } else {
            $scope.addServir();
        }

    };

    $scope.add = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Employe.add($scope.employe).success(function () {
            $scope.findByNin();
            if ($scope.estPermanent) {
                SweetAlert.simpleNotification("success", "Succes", "Employé ajouté avec succes\n\n\
            Rendez-vous sur son boite email pour recuperer ses identifiants de connexion");
            } else {
                SweetAlert.simpleNotification("success", "Succes", "Employé ajouté avec succes");
            }

        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de l'employé");
        });
    };

    $scope.findByNin = function () {
        Employe.findByNin($scope.employe.numeroCni).success(function (data) {
            $scope.employe = data;
            $scope.idEmployeCree = data.id;
            $scope.completerAdresse();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération de l'employé ajouté");
        });
    };

    $scope.getLastServir = function () {
        Servir.findLastByEmploye($scope.employe.id).success(function (data) {
            $scope.document.servir = data;
            $scope.completerDocument();
            //Uploader les documents lies a enfant
            $scope.uploadDocument($scope.lesFichiers);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des informations sur le poste !");
        });
    };

    $scope.addServir = function () {
        Servir.add($scope.servir).success(function () {
            $scope.getLastServir(); //Recuperer l'entree aui vient d'etre cree pour completer document           
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des informations sur le poste");
        });
    };

    $scope.envoyerMail = function () {
        var corps = "\tUNIVERSITE DE THIES \nDIRECTON DES RESSOURCES HUMAINES ET DE LA FORMATION\n\n";
        corps+= "Bonjour , veuillez utiliser les identifiants suivants pour vous connectez à votre compte\n\n\
            Login : " + $scope.utilisateur.login + "\nMot de passe : " + $scope.utilisateur.motDePasse;
        var msg = 'to=' + $scope.contact.email + '&objet=identifiants de connexion&body=' + corps;

        $scope.reinitialiser();

        Mail.sendEmail(msg).success(function () {
            $scope.suggererRedirection();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'envoi du mail a échoué");
            $scope.suggererRedirection();
        });
        $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
        Mail.resetHttp();
    };
    
    $scope.testEnvoyerMail = function () {
//        var corps = "Login : fallougalass Mot de passe : mbengue2019";
//        var msg = 'to=fallou06mbengue@gmail.com&objet=identifiants de connexion&body=' + corps;
//
//        Mail.sendEmail(msg).success(function () {
            $scope.suggererRedirection();
//        }).error(function () {
//            SweetAlert.simpleNotification("error", "Erreur", "L'envoi du mail a échoué");
//            $scope.suggererRedirection();
//        });
////        $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
//        Mail.resetHttp();
    };
    
    $scope.suggererRedirection = function () {
        Promise.resolve(SweetAlert.demandeAction("Information", "Compléter la création du dossier ? "))
                .then(function (value) {
                    if (value == true) {
                        $window.location.href = '#/drh/employe/detailAgent/'+$scope.idEmployeCree;
                    }
                });
    };
    
    $scope.creerCompteUtilisateur = function () {

        if ($scope.estPermanent) {  //Un compte utilisateur est cree pour un employe permanent
            $scope.utilisateur.employe = $scope.employe;
            $scope.utilisateur.email = $scope.contact.email;
            $scope.utilisateur.groupe = $scope.groupe;

            $scope.utilisateur.login = "ut" + $scope.employe.matriculeInterne.replace("/", "");
            $scope.utilisateur.motDePasse = "passut2018";

            Utilisateur.createCompte($scope.utilisateur).success(function () {
                $scope.envoyerMail();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la création du compte utilisateur");
            });
        } else {
            $scope.reinitialiser();
        }

    };

    /*                   CONTROLES DE SAISIE                      */


    $scope.controlIdentifiant = function () {
        var validite = true;
        $('#bloc-identifiant input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlCivilite();
        }

    };

    $scope.controlCivilite = function () {
        var validite = true;
        $('#bloc-etatCivil input').each(function (e) {
            if ($(this).val() === "" && $(this).attr('id') !== "profil") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.employe.genre == null) {
            $('.genreVide').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.controlContact();
        }

    };

    $scope.controlContact = function () {
        var validite = true;
        $('#bloc-contact input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlAdresse();
        }
    };

    $scope.controlAdresse = function () {
        var validite = true;
        $('#bloc-adresse input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlPoste();
        }
    };

    $scope.controlPoste = function () {
        var validite = true;
        $('#bloc-poste input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.servir.entite == null) {
            $('#entite').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            if ($scope.controlDocumentForm()) {
                $scope.controlConcordance();
            }
        }
    };

    $scope.controlDocumentForm = function () {
        var validite = true;
        $('#newEmployeForm textarea').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.document.typeDocument == null) {
            $('#newEmployeForm .type-doc-missing').show("slow").delay(3000).hide("slow");
            validite = false;
        }

        if ($scope.lesFichiers == null) {
            $('#newEmployeForm .missing-file').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        return validite;

    };

    $scope.controlConcordance = function () {
        var validite = true;
        if ((($scope.employe.numeroCni).charAt(0) == '1' && $scope.employe.genre.libelle == 'Femme') || (($scope.employe.numeroCni).charAt(0) == '2' && $scope.employe.genre.libelle == 'Homme')) {
            $('.non-concorde').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.verifierUnicite();
        }
    };

    /*Gestion des documents electroniques*/
    $scope.lesFichiers = null;
    $scope.initDocument = function () {
        $scope.document = {id: "", dateEnregistrement: $scope.today};
    };
    $scope.initDocument();
    /*Complete les autres informations sur le document : l'employe, la date d'echeance, ...*/
    $scope.completerDocument = function () {
        $scope.document.employe = $scope.employe;
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
        var req_tab = [];
        var instanceDoc;
        for (var i = 0; i < emplacementFichiers.length; i++) {   //  Parcour des emplacements des fichier uploades
            instanceDoc = angular.copy($scope.document);
            instanceDoc.emplacement = emplacementFichiers[i];
            req_tab.push(Document.add(instanceDoc));    //Ajout dans la base de donnees
        }
        $q.all(req_tab).then(function () { //Si l'upload dans le dossier physique a reussi
            //Reinitialisation et raffraichissement liste document
            if ($scope.estPermanent) {
                if ($scope.file) {
                    $scope.uploadAvatar();
                } else {
                    $scope.creerCompteUtilisateur();
                }
            } else {
                $scope.reinitialiser();
                $scope.suggererRedirection();
            }

        });
    };

    /*Gerer l'upload de fichier*/

    $scope.uploadDocument = function (fichiers) {
        var req_tab = [];
        for (var i = 0; i < fichiers.files.length; i++) {   //  Parcour des fichier a uploader
            $scope.fileToUpload = fichiers.files[i];
            var format = $scope.fileToUpload.name.split("."); //Recuperation du format
            format = format[format.length - 1];
            var fd = new FormData();                //Creation d'un objet FormData
            fd.append($scope.employe.numeroCni, $scope.fileToUpload);   //Ajout du fichier et de son emplacement au FormData
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


    };
});

=======
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('DrhModule').controller('EmployeController', function ($scope, SweetAlert, Mail, UploadFile,
        Employe, Utilisateur, Groupe, Contact, Adresse, Servir, Fonction, TypeEmploye, $window,
        Entite, Typecontrat, Fonction, Groupe, Genre, $routeParams, Document, $q, Typedocument)
{


    /*Initialisation*/
    $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
    $scope.groupe = {};
    $scope.employe = {id: ""};
    $scope.contact = {id: ""};
    $scope.adresse = {id: ""};
    $scope.servir = {id: ""};
    $scope.fonction = {id: ""};
    $scope.today = new Date();
    $scope.employe.nationalite = "Sénégalaise";
    $scope.senegalaise = true;
    $scope.setNationalite = function () {
        if ($scope.senegalaise == true) {
            $scope.employe.nationalite = "Sénégalaise";
        } else {
            $scope.employe.nationalite = "";
        }
    };

    /*Initialisation*/

    /* Réinitialisation du formulaire */


    $scope.reinitialiser = function () {
        $scope.employe = {id: ""};
        $scope.contact = {id: ""};
        $scope.adresse = {id: ""};
        $scope.servir = {id: ""};
        $scope.fonction = {id: ""};
        $scope.showDefaultAvatar();
        $scope.senegalaise = true;
        $scope.employe.nationalite = "Sénégalaise";
        $scope.setTypeEmploye();
        $scope.cancelFileUpload();
        $scope.initDocument();
    };

    /* Réinitialisation du formulaire */

    /*Gestion avatar*/

    $scope.showDefaultAvatar = function () {
        $('#previsualisation').attr('src', 'images/avatar.png');
        $scope.file = null;
    };
    $scope.showDefaultAvatar();

    $scope.preview = function (img) {
        $scope.file = img.files[0];
        var reader = new FileReader();
        reader.onload = function () {

            $scope.imgAffichee = URL.createObjectURL($scope.file);
            $('#previsualisation').attr('src', $scope.imgAffichee);

        };
        reader.readAsDataURL($scope.file);

    };

    $scope.uploadAvatar = function () {
        $scope.imgProfil = $scope.file;
        var format = $scope.imgProfil.name.split(".");
        format = format[format.length - 1];
        var fd = new FormData();
        fd.append($scope.employe.numeroCni, $scope.imgProfil);
        UploadFile.uploadFile(fd).success(function (data) {
            $scope.utilisateur.avatar = 'images/' + data;
            $scope.creerCompteUtilisateur();
            UploadFile.resetHttp();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement de l'avatar");
        });

    };

    /*Gestion avatar*/

    /*          RECCUPERATION DES ELEMENTS PARAMETRES POUR LES AFFICHER DANS LES LISTES DE SELECTION        */

    Entite.findAll().success(function (data) {
        $scope.entites = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des entités");
    });

    Typecontrat.findAll().success(function (data) {
        $scope.typecontrats = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de contrat");
    });

    Genre.findAll().success(function (data) {
        $scope.genres = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des situations matrimoniales");
    });

    Typedocument.findAll().success(function (data) {
        $scope.typedocuments = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de document !");
    });

    $scope.setTypeEmploye = function () {
        TypeEmploye.find($routeParams.type).success(function (data) {
            $scope.employe.typeEmploye = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des types d'employés");
        });
    };
    $scope.setTypeEmploye();

    Groupe.findByLibelle("employe").success(function (data) {
        $scope.groupe = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement du groupe utilisateur");
    });

    Fonction.findAll().success(function (data) {
        $scope.fonctions = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des fonctions");
    });

    /*          RECCUPERATION DES ELEMENTS PARAMETRES POUR LES AFFICHER DANS LES LISTES DE SELECTION        */

    $scope.toggleAvoirMatriculeInt = function () {
        if ($scope.avoirMatricule === true) {
            $scope.employe.matriculeInterne = undefined;
        }
    };

    $scope.toggleAvoirMatriculeMD = function () {
        if ($scope.avoirMatriculeMD === true) {
            $scope.employe.matriculeMainDoeuvre = undefined;
        }
    };

    $scope.getTypeContrat = function () {
        $scope.reinitialiser();
        $scope.servir.typeContrat = $scope.typecontrats.filter(retrieveTypeContrat)[0];
        if ($scope.servir.typeContrat.code == 'cdi') {
            $scope.estPermanent = true;
        } else
        {
            $scope.estPermanent = false;
        }

    };
    function retrieveTypeContrat(data) {
        return data.id == $scope.currentTypeContrat;
    }
    ;

    $scope.verifiercni = function () {
        Employe.checkcni($scope.employe.numeroCni).success(function (data) {
            if (data.value == true) {
                $('#cni_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.employe.matriculeInterne) {
                    $scope.verifierMatriculeInterne();
                } else {
                    $scope.verifierContact1();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du cni");
        });
    };

    $scope.verifierMatriculeInterne = function () {
        Employe.checkmatricule($scope.employe.matriculeInterne).success(function (data) {
            if (data.value == true) {
                $('#mat_int_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.verifierMatriculeMD();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification matricule");
        });
    };

    $scope.verifierMatriculeMD = function () {
        Employe.checkmatriculemd($scope.employe.matriculeMainDoeuvre).success(function (data) {
            if (data.value == true) {
                $('#mat_md_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.verifierContact1();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification matricule");
        });
    };

    $scope.verifierContact1 = function () {
        Contact.checkcontact($scope.contact.numero1).success(function (data) {
            if (data.value == true) {
                $('#num_tel_1_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.autreNumero == true) {
                    $scope.verifierContact2();
                } else {
                    $scope.verifierEmail();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du numéro de téléphone 1");
        });

    };

    $scope.verifierContact2 = function () {
        Contact.checkcontact($scope.contact.numero2).success(function (data) {
            if (data.value == true) {
                $('#num_tel_2_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.verifierEmail();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du numéro de téléphone 2");
        });
    };

    $scope.verifierEmail = function () {
        Contact.checkmail($scope.contact.email).success(function (data) {
            if (data.value == true) {
                $('#email_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.add();   //Ajout de l'employe
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification de l\'adresse email");
        });

    };
    $scope.verifierUnicite = function () {
        $scope.verifiercni();
    };

    $scope.completerAdresse = function () {
        $scope.adresse.employe = $scope.employe;
        Adresse.add($scope.adresse).success(function () {
            $scope.completerContact();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement de l'adresse");
        });
    };

    $scope.completerContact = function () {
        $scope.contact.employe = $scope.employe;
        Contact.add($scope.contact).success(function () {
            $scope.addFonctionServir();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des contacts");
        });

    };

    $scope.addFonctionServir = function () {
        var req_tab = [];
        req_tab.push(Fonction.findByLibelle($scope.fonction.libelle));
        $q.all(req_tab).then(function (results) { //Si la fonction existe deja(parametre)
            if (results[0].data) {    //Si oui
                $scope.servir.fonction = results[0].data;
                if ($scope.servir.fonction.responsabilite == true) {//Verifier si c'est un poste de responsabilite
                    $scope.servir.responsable = 1;
                } else {
                    $scope.servir.responsable = 0;
                }
                $scope.completerServir();
            } else {   //On ajoute ca dans la base
                $scope.servir.responsable = 0;
                req_tab = [];
                req_tab.push(Fonction.add($scope.fonction));
                $q.all(req_tab).then(function (data) {
                    req_tab = [];
                    req_tab.push(Fonction.findByLibelle($scope.fonction.libelle));
                    $q.all(req_tab).then(function (results) { //On le recuppere
                        $scope.servir.fonction = results[0].data;
                        $scope.completerServir();
                    });
                });
            }
        });
    };

    $scope.completerServir = function () {
        $scope.servir.employe = $scope.employe;
        if (!$scope.estPermanent) {   //Calculer la date de fin du contrat 
            var dateFinService = new Date($scope.servir.debut);
            dateFinService.setMonth(dateFinService.getMonth() + $scope.servir.dureeDuContrat);
            $scope.servir.fin = dateFinService;
        }

        if ($scope.servir.responsable === 1) {  //Si c'est un poste de responsabilite au sein de l'entite choisie
            Servir.findResponsableEntite($scope.servir.entite).success(function (data) { //Si le poste est deja occupe par quelqu'un d'autre
                if (data !== null) {    //Signaler un conflit
                    $('.conflit-poste').show("slow").delay(3000).hide("slow");
                } else {
                    $scope.addServir();
                }
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération du responsable de l'entité");
            });
        } else {
            $scope.addServir();
        }

    };

    $scope.add = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Employe.add($scope.employe).success(function () {
            $scope.findByNin();
            if ($scope.estPermanent) {
                SweetAlert.simpleNotification("success", "Succes", "Employé ajouté avec succes<br>\n\
            Rendez-vous sur son boite email pour recuperer ses identifiants de connexion");
            } else {
                SweetAlert.simpleNotification("success", "Succes", "Employé ajouté avec succes");
            }

        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de l'employé");
        });
    };

    $scope.findByNin = function () {
        Employe.findByNin($scope.employe.numeroCni).success(function (data) {
            $scope.employe = data;
            $scope.idEmployeCree = data.id;
            $scope.completerAdresse();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération de l'employé ajouté");
        });
    };

    $scope.getLastServir = function () {
        Servir.findLastByEmploye($scope.employe.id).success(function (data) {
            $scope.document.servir = data;
            $scope.completerDocument();
            //Uploader les documents lies a enfant
            $scope.uploadDocument($scope.lesFichiers);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des informations sur le poste !");
        });
    };

    $scope.addServir = function () {
        Servir.add($scope.servir).success(function () {
            $scope.getLastServir(); //Recuperer l'entree aui vient d'etre cree pour completer document           
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des informations sur le poste");
        });
    };

    $scope.envoyerMail = function () {
        var corps = "\tUNIVERSITE DE THIES \nDIRECTON DES RESSOURCES HUMAINES ET DE LA FORMATION\n\n";
        corps += "Bonjour , veuillez utiliser les identifiants suivants pour vous connectez à votre compte\n\n\
            Login : " + $scope.utilisateur.login + "\nMot de passe : " + $scope.utilisateur.motDePasse;
        var msg = 'to=' + $scope.contact.email + '&objet=identifiants de connexion&body=' + corps;

        $scope.reinitialiser();

        Mail.sendEmail(msg).success(function () {
            $scope.suggererRedirection();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'envoi du mail a échoué");
            $scope.suggererRedirection();
        });
        $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
        Mail.resetHttp();
    };

    $scope.suggererRedirection = function () {
        Promise.resolve(SweetAlert.demandeAction("Information", "Compléter la création du dossier ? "))
                .then(function (value) {
                    if (value == true) {
                        $window.location.href = '#/drh/employe/detailAgent/' + $scope.idEmployeCree;
                    }
                });
    };

    $scope.creerCompteUtilisateur = function () {

        //Un compte utilisateur est cree pour un employe permanent
        $scope.utilisateur.employe = $scope.employe;
        $scope.utilisateur.email = $scope.contact.email;
        $scope.utilisateur.groupe = $scope.groupe;

        $scope.utilisateur.login = "ut" + $scope.employe.matriculeInterne.replace("/", "");
        $scope.utilisateur.motDePasse = "passut2018";

        Utilisateur.createCompte($scope.utilisateur).success(function () {
            Promise.resolve(SweetAlert.demandeAction("Information", "Un compte utilisateur a été crée pour cet employé. \n\
                                Voulez vous envoyé les identifiants de connexion par mail ? "))
                    .then(function (value) {
                        if (value == true) {
                            $scope.envoyerMail();
                        } else {
                            $scope.reinitialiser();
                            $scope.suggererRedirection();
                        }
                    });

        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la création du compte utilisateur");
        });


    };

    /*                   CONTROLES DE SAISIE                      */


    $scope.controlIdentifiant = function () {
        var validite = true;
        $('#bloc-identifiant input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlCivilite();
        }

    };

    $scope.controlCivilite = function () {
        var validite = true;
        $('#bloc-etatCivil input').each(function (e) {
            if ($(this).val() === "" && $(this).attr('id') !== "profil") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.employe.genre == null) {
            $('.genreVide').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.controlContact();
        }

    };

    $scope.controlContact = function () {
        var validite = true;
        $('#bloc-contact input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlAdresse();
        }
    };

    $scope.controlAdresse = function () {
        var validite = true;
        $('#bloc-adresse input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlPoste();
        }
    };

    $scope.controlPoste = function () {
        var validite = true;
        $('#bloc-poste input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.servir.entite == null) {
            $('#entite').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            if ($scope.controlDocumentForm()) {
                $scope.controlConcordance();
            }
        }
    };

    $scope.controlDocumentForm = function () {
        var validite = true;
        $('#newEmployeForm textarea').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.document.typeDocument == null) {
            $('#newEmployeForm .type-doc-missing').show("slow").delay(3000).hide("slow");
            validite = false;
        }

        if ($scope.lesFichiers == null) {
            $('#newEmployeForm .missing-file').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        return validite;

    };

    $scope.controlConcordance = function () {
        var validite = true;
        if ((($scope.employe.numeroCni).charAt(0) == '1' && $scope.employe.genre.libelle == 'Femme') || (($scope.employe.numeroCni).charAt(0) == '2' && $scope.employe.genre.libelle == 'Homme')) {
            $('.non-concorde').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.verifierUnicite();
        }
    };

    /*Gestion des documents electroniques*/
    $scope.lesFichiers = null;
    $scope.initDocument = function () {
        $scope.document = {id: "", dateEnregistrement: $scope.today};
    };
    $scope.initDocument();
    /*Complete les autres informations sur le document : l'employe, la date d'echeance, ...*/
    $scope.completerDocument = function () {
        $scope.document.employe = $scope.employe;
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
        var req_tab = [];
        var instanceDoc;
        for (var i = 0; i < emplacementFichiers.length; i++) {   //  Parcour des emplacements des fichier uploades
            instanceDoc = angular.copy($scope.document);
            instanceDoc.emplacement = emplacementFichiers[i];
            req_tab.push(Document.add(instanceDoc));    //Ajout dans la base de donnees
        }
        $q.all(req_tab).then(function () { //Si l'upload dans le dossier physique a reussi
            //Reinitialisation et raffraichissement liste document
            if ($scope.estPermanent) {
                if ($scope.file) {
                    $scope.uploadAvatar();
                } else {
                    $scope.creerCompteUtilisateur();
                }
            } else {
                $scope.reinitialiser();
                $scope.suggererRedirection();
            }

        });
    };

    /*Gerer l'upload de fichier*/

    $scope.uploadDocument = function (fichiers) {
        var req_tab = [];
        for (var i = 0; i < fichiers.files.length; i++) {   //  Parcour des fichier a uploader
            $scope.fileToUpload = fichiers.files[i];
            var format = $scope.fileToUpload.name.split("."); //Recuperation du format
            format = format[format.length - 1];
            var fd = new FormData();                //Creation d'un objet FormData
            fd.append($scope.employe.numeroCni, $scope.fileToUpload);   //Ajout du fichier et de son emplacement au FormData
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


    };
});

>>>>>>> bc6f9f44ec7f2e534730f728f2d577c1fed6b9fd
