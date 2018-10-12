/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('DrhModule').controller('EmployeController', function ($scope,SweetAlert, Mail, UploadFile, Securite,
        Employe, Utilisateur, Groupe, Contact, Adresse, MembreMutuelle, HistoriqueGrade, Servir, Fonction, TypeEmploye,
        Entite, Typecontrat, Fonction, Situation, Groupe, Genre, $routeParams, CaisseSocialeTypeEmploye,
        SyndicatTypeEmploye, GradeTypeEmploye, MutuelleTypeEmploye)
{

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }

    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */


    /*Initialisation*/
    $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
    $scope.groupe = {};
    $scope.employe = {id: ""};
    $scope.contact = {id: ""};
    $scope.adresse = {id: ""};
    $scope.servir = {id: ""};
    $scope.membreMutuelle = {id: ""};
    $scope.fonction = {id: ""};
    $scope.situations = [];
    $scope.corps = [];
    $scope.today = new Date();
    $scope.employe.nationalite = "Sénégalaise";
    $scope.senegalaise = true;
    $scope.selection = "";

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
        $scope.historiqueGrade = {id: "", encours: 1};
        $scope.servir = {id: ""};
        $scope.fonction = {id: ""};
        $scope.membreMutuelle = {id: ""};
        $scope.showDefaultAvatar();
        $scope.senegalaise = true;
        $scope.employe.nationalite = "Sénégalaise";
        $scope.selection = "";
        $scope.setTypeEmploye();
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

    Situation.findAll().success(function (data) {
        $scope.situations = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des situations matrimoniales");
    });

    Genre.findAll().success(function (data) {
        $scope.genres = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des situations matrimoniales");
    });

    $scope.setTypeEmploye = function(){
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

    /*Donnees qui varient selon le type de l'employe*/

    $scope.historiqueGrade = {id: "", encours: 1};

    GradeTypeEmploye.findByType($routeParams.type).success(function (data) {
        $scope.grades = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des grades !");
    });
    SyndicatTypeEmploye.findByType($routeParams.type).success(function (data) {
        $scope.syndicats = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des syndicats");
    });

    CaisseSocialeTypeEmploye.findByType($routeParams.type).success(function (data) {
        $scope.caissesociales = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des caisses sociales");
    });

    MutuelleTypeEmploye.findByType($routeParams.type).success(function (data) {
        $scope.mutuelles = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des mutuelles");
    });

    /*Donnees qui varient selon le type de l'employe*/

    $scope.removeSelectedSyndicat = function () {
        $scope.employe.syndicat = null;
    };

    $scope.removeSelectedCaisseSociale = function () {
        $scope.employe.caisseSociale = null;
    };

    $scope.removeSelectedMutuelle = function () {
        $scope.membreMutuelle.mutuelleSante = null;
    };


    /*          RECCUPERATION DES ELEMENTS PARAMETRES POUR LES AFFICHER DANS LES LISTES DE SELECTION        */
    
    $scope.getTypeContrat = function(){
        $scope.reinitialiser();
        $scope.servir.typeContrat = $scope.typecontrats.filter(retrieveTypeContrat)[0];
        console.log($scope.servir.typeContrat);
        if($scope.servir.typeContrat.code == 'cdi'){
            $scope.estPermanent = true;
        }
        else
        {
            $scope.estPermanent = false;
        }
        
    };
    function retrieveTypeContrat(data) {
        return data.id == $scope.currentTypeContrat;
    };

    $scope.estMarie = false;
    $scope.checkSituationMatrimoniale = function () {
        if ($scope.employe.situationMatrimoniale.libelle == "Marie") {
            $scope.estMarie = true;
        } else {
            $scope.estMarie = false;
        }
    };
    $scope.homme = false;
    $scope.checkGenre = function () {
        if ($scope.employe.genre.libelle == "Masculin") {
            $scope.homme = true;
        } else {
            $scope.homme = false;
        }
    };

    $scope.verifiercni = function () {
        Employe.checkcni($scope.employe.numeroCni).success(function (data) {
            if (data.value == true) {
                $('#cni_dup').show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.employe.matriculeInterne) {
                    $scope.verifierMatriculeInterne();
                }
                else {
                    if ($scope.employe.matriculeCaisseSociale) {
                        $scope.verifierMatriculeCaisseSociale();
                    }
                    else {
                        $scope.verifierContact1();
                    }
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
            }
            else {
                if ($scope.employe.matriculeCaisseSociale) {
                    $scope.verifierMatriculeCaisseSociale();
                }
                else {
                    $scope.verifierContact1($scope.contact.numero1);
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification matricule");
        });
    };
    
    $scope.verifierMatriculeCaisseSociale = function () {
        Employe.checkmatriculecs($scope.employe.matriculeCaisseSociale).success(function (data) {
            if (data.value == true) {
                $('#mat_cs_dup').show("slow").delay(3000).hide("slow");
            } else {
                $scope.verifierContact1($scope.contact.numero1);
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du matricule IPRES/FNR");
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

        /*Verification unicite de certaines informations : cni matricule, numero telephone ,adresse email*/
        if ($scope.estPermanent){
            $scope.verifiercni();
        }
        else{
            $scope.verifierContact1();
        }
        
    };

    $scope.completerGrade = function () {
        var datePassation = new Date(); //Pour la premiere fois, on l'attribut dateDePassage de l'objet grade correspond à la valeur de dateDecrutement
        var dateProchainAvancement = new Date();
        dateProchainAvancement.setFullYear(dateProchainAvancement.getFullYear() + $scope.historiqueGrade.grade.duree);

        $scope.historiqueGrade.datePassation = datePassation;
        $scope.historiqueGrade.dateProchainAvancement = dateProchainAvancement;
        $scope.historiqueGrade.employe = $scope.employe;

        HistoriqueGrade.add($scope.historiqueGrade).success(function () {
            if ($scope.membreMutuelle.mutuelleSante != null) {
                $scope.AjouterMutuelle();
            } else {
                if ($scope.file) {
                    $scope.uploadAvatar();
                } else {
                    $scope.creerCompteUtilisateur();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement du grade");
        });

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
            $scope.completerServir();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des contacts");
        });

    };


    $scope.completerServir = function () {
        $scope.servir.employe = $scope.employe;
        if(!$scope.estPermanent){   //Calculer la date de fin du contrat 
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
        if ($scope.servir.responsable === 1) {  //Si c'est un poste de responsabilite au sein de l'entite choisie
            Servir.findResponsableEntite($scope.servir.entite).success(function (data) { //Si le poste est deja occupe par quelqu'un d'autre
                if (data !== null) {    //Signaler un conflit
                    $('.conflit-poste').show("slow").delay(3000).hide("slow");
                } else {
                    $scope.ajouterPoste();
                }
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération du responsable de l'entité");
            });
        } else {
            $scope.ajouterPoste();
        }

    };

    $scope.add = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Employe.add($scope.employe).success(function () {
            $scope.findByNin();
            if ($scope.estPermanent){
                SweetAlert.simpleNotification("success", "Succes", "Employé ajouté avec succes<br>\n\
            Rendez-vous sur son boite email pour recuperer ses identifiants de connexion");
            }
            else{
                SweetAlert.simpleNotification("success", "Succes", "Employé ajouté avec succes");
            }
            
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de l'employé");
        });
    };

    $scope.findByNin = function () {
        Employe.findByNin($scope.employe.numeroCni).success(function (data) {
            $scope.employe = data;
            $scope.completerAdresse();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération de l'employé ajouté");
        });
    };

    $scope.ajouterPoste = function () {
        Fonction.findByLibelle($scope.fonction.libelle).success(function (data) {   //Verifier si la fonction existe deja
            if (!data) {    //Si non
                Fonction.add($scope.fonction).success(function () {     //Ajout� la fonction d'abord (comme si on le parametr�)
                    Fonction.findByLibelle($scope.fonction.libelle).success(function (data) {   //Recuperer cela ensuite pour completer l'objet
                        $scope.servir.fonction = data;
                        $scope.addServir();
                    }).error(function () {
                        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des informations sur la fonction occupée");
                    });
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de la nouvelle fonction");
                });
            } else {
                $scope.servir.fonction = data;
                $scope.addServir();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des informations sur la fonction occupée");
        });
    };

    $scope.addServir = function () {
        Servir.add($scope.servir).success(function () {
            if ($scope.estPermanent) {
                $scope.completerGrade();
            } else {
                if ($scope.file) {
                    $scope.uploadAvatar();
                } else {
                    $scope.creerCompteUtilisateur();
                }
            }

        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des informations sur le poste");
        });
    };

    $scope.AjouterMutuelle = function () {
        $scope.membreMutuelle.employe = $scope.employe;
        MembreMutuelle.add($scope.membreMutuelle).success(function () {
            if ($scope.file) {
                $scope.uploadAvatar();
            } else {
                $scope.creerCompteUtilisateur();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement du mutuelle de santé");
        });
    };


//    function creerIdentifiants() {
//        var text = "";
//        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-";
//
//        for (var i = 0; i < 9; i++)
//            text += possible.charAt(Math.floor(Math.random() * possible.length));
//        return text;
//    }


    $scope.envoyerMail = function () {
        var corps = "Login : " + $scope.utilisateur.login + " Mot de passe : " + $scope.utilisateur.motDePasse;
        var msg = 'to=' + $scope.contact.email + '&objet=identifiants de connexion&body=' + corps;

        $scope.reinitialiser();

        Mail.sendEmail(msg).success(function () {
            ;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'envoi du mail a échoué");
        });
        $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
        Mail.resetHttp();
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
        }
        else{
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
            if ($scope.estPermanent) {
                $scope.controlSituationMatri();
            } else {
                $scope.controlContact();
            }
        }

    };



    $scope.controlSituationMatri = function () {
        var validite = true;
        $('#bloc-situation input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.employe.situationMatrimoniale == null) {
            $('#situationMatri').parent().next().show("slow").delay(3000).hide("slow");
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
//        if ($scope.servir.typeContrat == null) {
//            $('#contrat').parent().next().show("slow").delay(3000).hide("slow");
//            validite = false;
//        }
        if (validite === true) {
            if ($scope.estPermanent) {
                $scope.controlGrade();
            } else {
                $scope.controlConcordance();
            }

        }
    };

    $scope.controlGrade = function () {
        var validite = true;
        if (!$scope.historiqueGrade.grade || $scope.historiqueGrade.grade == null) {
            $('.grade-not-selected').eq(0).show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.controlConcordance();
        }
    };

    $scope.controlConcordance = function () {
        var validite = true;
        if ((($scope.employe.numeroCni).charAt(0) == '1' && $scope.employe.genre.libelle == 'F�minin') || (($scope.employe.numeroCni).charAt(0) == '2' && $scope.employe.genre.libelle == 'Masculin')) {
            $('.non-concorde').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.verifierUnicite();
        }

    };

});

