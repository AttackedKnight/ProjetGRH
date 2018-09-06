/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('DrhModule').controller('EmployeController', function ($scope, $rootScope, $q, SweetAlert, Mail,
        UploadFile, Securite, $http, Employe, Utilisateur, Groupe, Contact, Adresse, Syndicat,
        MutuelleSante, MembreMutuelle, Grade, HistoriqueGrade, Servir, Fonction, TypeEmploye,
        Entite, Typecontrat, Fonction, Situation, Civilite, Corps, Classe, Echelon, Niveau,
        Categorie, Groupe, AccesGroupeTable)
{

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }

    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
    $scope.groupe = {};

    $scope.employe = {id: ""};
    $scope.contact = {id: ""};
    $scope.adresse = {id: ""};
//    $scope.grade={id:""};
//    $scope.estMembre={id:""};
    $scope.servir = {id: ""};
    $scope.membreMutuelle = {id: ""};

    $scope.fonction = {id: ""};

    $scope.situations = [];
    $scope.corps = [];



    $scope.today = new Date();
    $scope.employe.nationalite = "SÃ©nÃ©galaise";
    $scope.senegalaise = true;

    $scope.setNationalite = function () {
        if ($scope.senegalaise == true) {
            $scope.employe.nationalite = "SÃ©nÃ©galaise";
        } else {
            $scope.employe.nationalite = "";
        }
    };


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


    /*GERER VUE ET DONNEES POUR LA DRH*/
    $scope.typeEmp = "PER";
    $scope.estPER = true;
    $scope.changerTypeEmploye = function () {
        $scope.estPER = !$scope.estPER;
        if ($scope.estPER === true) {
            $scope.typeEmp = "PER";
        } else {
            $scope.typeEmp = "PATS";
        }

        $scope.changerListeSyndicats();
        $scope.afficheTableGrade();
        $scope.historiqueGrade = {id: "", encours: 1};
    };

    $scope.changerListeSyndicats = function () {
        if ($scope.estPER === true) {
            $scope.syndicats = $scope.syndicatsPer;
        } else {
            $scope.syndicats = $scope.syndicatsPats;
        }

    };
    /*GERER VUE ET DONNEES POUR LA DRH*/

    /*Grade*/



    $scope.historiqueGrade = {id: "", encours: 1};

    $scope.afficheTableGrade = function () {
        if ($rootScope.groupeUtilisateur.code == 'PATS_AD'
                || ($rootScope.groupeUtilisateur.code == 'DRH_AD' && $scope.typeEmp == "PATS")) {

            $scope.classes = [];
            $scope.gradeClasse = [];
            var req_classes = [];
            $scope.categorieClasse = [];
            $scope.niveauClasse = [];
            $scope.classeSelectionnee = "1";

            for (var i = 1; i <= 4; i++) {
                req_classes.push(Grade.findPatsClasse(i));
            }

            $q.all(req_classes).then(function (result) {
                for (var i = 0; i < result.length; i++) {
                    $scope.classes[i] = result[i].data;
                }

                $scope.getCategorieAndNiveauClasse();
            });

            $scope.getCategorieAndNiveauClasse = function () {
                $scope.classeSelectionnee = $('#classe').val();
                $scope.gradeClasse = $scope.classes[parseInt($scope.classeSelectionnee) - 1];

                var req_cat_niv = [];
                req_cat_niv.push(Grade.compterPatsCategorieClasse($scope.classeSelectionnee));
                req_cat_niv.push(Grade.compterPatsNiveauClasse($scope.classeSelectionnee));

                $q.all(req_cat_niv).then(function (result) {

                    $scope.categorieClasse = result[0].data;
                    $scope.niveauClasse = result[1].data;
                });
            };
        }
        if ($rootScope.groupeUtilisateur.code == 'PER_AD'
                || ($rootScope.groupeUtilisateur.code == 'DRH_AD' && $scope.typeEmp == "PER")) {

            $scope.corps = [];
            var req_corps = [];
            $scope.classeCorps = [];
            $scope.gradeCorps = [];

            $scope.corpsSelectionnee = "0";

            req_corps.push(Grade.findPerCorps("Assistant"));
            req_corps.push(Grade.findPerCorps("MaÃ®tre de confÃ©rence"));
            req_corps.push(Grade.findPerCorps("Professeur"));

            $q.all(req_corps).then(function (result) {
                for (var i = 0; i < result.length; i++) {
                    $scope.corps[i] = result[i].data;
                }
                $scope.getClasseCorps($scope.corps);
            });

            $scope.getClasseCorps = function () {
                $scope.corpsSelectionnee = $('#corps').val();
                $scope.gradeCorps = $scope.corps[parseInt($scope.corpsSelectionnee)];

                var req_classe_corps = [];
                var choix = parseInt($scope.corpsSelectionnee);

                switch (choix) {

                    case 0:
                        req_classe_corps.push(Grade.compterPerClasseCorps("Assistant"));
                        break;
                    case 1:
                        req_classe_corps.push(Grade.compterPerClasseCorps("MaÃ®tre de confÃ©rence"));
                        break;
                    case 2:
                        req_classe_corps.push(Grade.compterPerClasseCorps("Professeur"));
                        break;
                }

                $q.all(req_classe_corps).then(function (result) {

                    $scope.classeCorps = result[0].data;
                });

            };
        }


    };

    $scope.afficheTableGrade();


    /*Grade*/



    if ($rootScope.groupeUtilisateur.code == 'PATS_AD') {
        Syndicat.findSyndicatPats().success(function (data) {
            $scope.syndicats = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des syndicats (PATS)");
        });
    }
    if ($rootScope.groupeUtilisateur.code == 'PER_AD' || $rootScope.groupeUtilisateur.code == 'DRH_AD') {
        Syndicat.findSyndicatPer().success(function (data) {
            $scope.syndicats = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des syndicats (PER)");
        });
    }

    if ($rootScope.groupeUtilisateur.code == 'DRH_AD') {
        Syndicat.findSyndicatPer().success(function (data) {
            $scope.syndicatsPer = data;
            $scope.syndicats = data;
            Syndicat.findSyndicatPats().success(function (data) {
                $scope.syndicatsPats = data;
            }).error(function () {
                SweetAlert.finirChargementEchec("Erreur de chargement des syndicats (PATS)");
            });

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des syndicats (PER)");
        });
    }





    MutuelleSante.findAll().success(function (data) {
        $scope.mutuelles = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des mutuelles de santé");
    });

    Civilite.findAll().success(function (data) {
        $scope.civilites = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des civilités");
    });

    TypeEmploye.findAll().success(function (data) {
        $scope.typeemployes = data;

    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'employés");
    });

    Groupe.findByLibelle("employe").success(function (data) {
        $scope.groupe = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement du groupe utilisateur");
    });

    $scope.listerFonctions = function () {
        Fonction.findAll().success(function (data) {
            $scope.fonctions = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des fonctions");
        });
    };
    $scope.listerFonctions();


    /*          RECCUPERATION DES ELEMENTS PARAMETRES POUR LES AFFICHER DANS LES LISTES DE SELECTION        */




    //Civilite et type employe sont Ã  prÃ©ciser avant l'insertion

    $scope.CompleterInformation = function (c, contact, adr, tra) {
        if (c.sexe == 'masculin') {
            c.civilite = $scope.civilites[0];
        } else {
            if (c.situationMatrimoniale == $scope.situations[0] || c.situationMatrimoniale == $scope.situations[2] || c.situationMatrimoniale == $scope.situations[3]) {
                c.civilite = $scope.civilites[1];
            } else {
                c.civilite = $scope.civilites[2];
            }
        }

        if ($rootScope.groupeUtilisateur.code == 'PER_AD') {
            c.typeEmploye = $scope.typeemployes[0];
        }
        if ($rootScope.groupeUtilisateur.code == 'PATS_AD') {
            c.typeEmploye = $scope.typeemployes[1];
        }
        if ($rootScope.groupeUtilisateur.code == 'DRH_AD') {
            if ($scope.typeEmp == 'PER') {
                c.typeEmploye = $scope.typeemployes[0];
            }
            if ($scope.typeEmp == 'PATS') {
                c.typeEmploye = $scope.typeemployes[1];
            }
        }

        /*Verification unicite de certaines information*/

        Employe.checkcni($scope.employe.numeroCni).success(function (data) {

            if (data == "true") {
                $('#cni_dup').show("slow").delay(3000).hide("slow");
            } else {
                Employe.checkmatricule().success(function (data) {
                    data = data.split('-');
                    var existe = false;
                    for (var i = 0; i < data.length; i++) {
                        if ($scope.employe.matriculeInterne == data[i]) {
                            existe = true;
                            break;
                        }

                    }
                    if (existe == true) {
                        $('#mat_int_dup').show("slow").delay(3000).hide("slow");
                    } else {
                        Employe.checkmatriculecs($scope.employe.matriculeCaisseSociale).success(function (data) {
                            if (data == "true") {
                                $('#mat_cs_dup').show("slow").delay(3000).hide("slow");
                            } else {
                                Contact.checkcontact($scope.contact.numero1).success(function (data) {
                                    if (data == "true") {
                                        $('#num_tel_1_dup').show("slow").delay(3000).hide("slow");
                                    } else {
                                        Contact.checkcontact($scope.contact.numero2).success(function (data) {
                                            if (data == "true") {
                                                $('#num_tel_2_dup').show("slow").delay(3000).hide("slow");
                                            } else {
                                                Contact.checkmail($scope.contact.email).success(function (data) {
                                                    if (data == "true") {
                                                        $('#email_dup').show("slow").delay(3000).hide("slow");
                                                    } else {
                                                        $scope.add(c, contact, adr, tra);

                                                    }
                                                }).error(function () {
                                                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification de l\'adresse email");
                                                });
                                            }
                                        }).error(function () {
                                            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du numéro de téléphone 2");
                                        });
                                    }
                                }).error(function () {
                                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du numÃ©ro de téléphone 1");
                                });
                            }
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du matricule IPRES/FNR");
                        });
                    }
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification matricule");
                });


            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de vérification du cni");
        });




    };

//    RÃ©initialisation du formulaire


    $scope.reinitialiser = function () {
        $scope.employe = {id: ""};
        $scope.contact = {id: ""};
        $scope.adresse = {id: ""};
        $scope.historiqueGrade = {id: "", encours: 1};
        if ($rootScope.groupeUtilisateur.code == 'PATS_AD' || ($rootScope.groupeUtilisateur.code == 'DRH_AD' && $scope.typeEmp == "PATS")) {
            $scope.classeSelectionnee = "1";
            $scope.getCategorieAndNiveauClasse();
        }
        if ($rootScope.groupeUtilisateur.code == 'PER_AD' || ($rootScope.groupeUtilisateur.code == 'DRH_AD' && $scope.typeEmp == "PER")) {
            $scope.corpsSelectionnee = "0";
            $scope.getClasseCorps();
        }

        $scope.servir = {id: ""};
        $scope.fonction = {id: ""};
        $scope.estMembreMutuelle = false;
        $scope.membreSyndicat = false;
        $scope.caisseSociale = false;
        $scope.showDefaultAvatar();
        $scope.currentSyndicat = 0;

        $scope.senegalaise = true;
        $scope.employe.nationalite = "SÃ©nÃ©galaise";
    };

    //Pour la premiere fois, on l'attribut dateDePassage de l'objet grade correspond Ã  la valeur de dateDecrutement de
    //l'objet employe.Quant a l'attribut typeAvancement ,il est null

    $scope.currentSyndicat = 0;
    $scope.setSyndicat = function () {
        if ($scope.currentSyndicat == 0) {

            $scope.employe.syndicat = null;
        } else {
            var i = 0;
            for (; i < $scope.syndicats.length; i++) {
                if ($scope.syndicats[i].id == $scope.currentSyndicat) {
                    $scope.employe.syndicat = $scope.syndicats[i];
                    break;
                }
            }
        }
    };

    $scope.completerGrade = function () {
        var datePassation = new Date();
        var dateProchainAvancement = new Date();

        dateProchainAvancement.setFullYear(dateProchainAvancement.getFullYear() + $scope.historiqueGrade.grade.duree);

        $scope.historiqueGrade.datePassation = datePassation;
        $scope.historiqueGrade.dateProchainAvancement = dateProchainAvancement;
        $scope.historiqueGrade.employe = $scope.employe;


        HistoriqueGrade.add($scope.historiqueGrade).success(function () {

            if ($scope.estMembreMutuelle == true) {
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

        if (($scope.fonction.libelle).toLowerCase() == "recteur" || ($scope.fonction.libelle).toLowerCase() == "rectrice" ||
                ($scope.fonction.libelle).toLowerCase() == "directeur" || ($scope.fonction.libelle).toLowerCase() == "directrice" ||
                ($scope.fonction.libelle).toLowerCase() == "chef des services administratifs" || ($scope.fonction.libelle).toLowerCase() == "chef de dÃ©partement") {
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
            }).error(function (data) {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du responsable de l'entité");
            });
        } else {
            $scope.ajouterPoste();
        }

    };

    $scope.ajouterPoste = function () {
        Fonction.findByLibelle($scope.fonction.libelle).success(function (data) {   //Verifier si la fonction existe deja
            if (!data) {    //Si non
                Fonction.add($scope.fonction).success(function () {     //Ajouté la fonction d'abord (comme si on le parametré)
                    Fonction.findByLibelle($scope.fonction.libelle).success(function (data) {   //Recuperer cela ensuite pour completer l'objet
                        $scope.servir.fonction = data;

                        Servir.add($scope.servir).success(function () {
                            $scope.completerGrade();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des informations sur le poste");
                        });
                    }).error(function () {
                        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des informations sur la fonction occupée");
                    });
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de la nouvelle fonction");
                });
            } else {
                $scope.servir.fonction = data;
                Servir.add($scope.servir).success(function () {
                    $scope.completerGrade();
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement des informations sur le poste");
                });

            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des informations sur la fonction occupée");
        });
    };

    //Verifier membreSyndicat : si true, creer l'objet  estMembre et mettre dans sont attribut sysdicat(estMembre.syndicat)
    // le syndicat correspondant selon que l'employe est un PER ou PATS




    $scope.AjouterMutuelle = function () {

        $scope.membreMutuelle.employe = $scope.employe;
        $scope.membreMutuelle.mutuelleSante = $scope.mutuelles[0];

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


    function creerIdentifiants() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-";

        for (var i = 0; i < 9; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


    $scope.envoyerMail = function (c) {

        var corps = "Login : " + c.login + " Mot de passe : " + c.motDePasse;

        var msg = 'to=' + $scope.contact.email + '&objet=identifiants de connexion&body=' + corps;

        $scope.reinitialiser();

        Mail.sendEmail(msg).success(function (data) {
            ;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'envoi du mail a échoué");
        });
        $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
        Mail.resetHttp();
    };

    $scope.creerCompteUtilisateur = function () {

        $scope.utilisateur.employe = $scope.employe;
        $scope.utilisateur.email = $scope.contact.email;
        $scope.utilisateur.groupe = $scope.groupe;

        //Generer login
        do {
            $scope.utilisateur.login = creerIdentifiants();
        } while (!(/^[a-z]+[0-9.\-]*[a-z0-9]+$/i.test($scope.utilisateur.login)));
        //Generer mot de passe
        do {
            $scope.utilisateur.motDePasse = creerIdentifiants();
        } while (!(/^[a-z0-9]+$/i.test($scope.utilisateur.motDePasse)));




        Utilisateur.createCompte($scope.utilisateur).success(function (data) {
            $scope.envoyerMail($scope.utilisateur);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la création du compte utilisateur");
        });
    };


    $scope.add = function (c, contact, adr, tra) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Employe.add(c).success(function () {
            $scope.findByNin(c);
            SweetAlert.simpleNotification("success", "Succes", "Employé ajouté avec succes</br>\n\
            Rendez-vous sur son boite email pour recuperer ses identifiants de connexion");
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de l'employé");
        });
    };

    $scope.findByNin = function (c) {
        Employe.findByNin(c.numeroCni).success(function (data) {
            $scope.employe = data;

            $scope.completerAdresse();

        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récuperation de l'employé ajouté");
        });
    };






    /*                   CONTROLES DE SAISIE                      */

    $scope.controlForm = function (c, contact, adr, tra) {
        $scope.controlIdentifiant(c, contact, adr, tra);
    };


    $scope.controlIdentifiant = function (c, contact, adr, tra) {
        var validite = true;
        $('#bloc-identifiant input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlCivilite(c, contact, adr, tra);
        }

    };

    $scope.controlCivilite = function (c, contact, adr, tra) {
        var validite = true;
        $('#bloc-etatCivil input').each(function (e) {
            if ($(this).val() === "" && $(this).attr('id') !== "profil") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        $('#bloc-etatCivil select').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlSituationMatri(c, contact, adr, tra);
        }

    };



    $scope.controlSituationMatri = function (c, contact, adr, tra) {
        var validite = true;
        $('#bloc-situation input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (c.situationMatrimoniale == null) {
            $('#situationMatri').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.controlContact(c, contact, adr, tra);
        }

    };

    $scope.controlContact = function (c, contact, adr, tra) {
        var validite = true;
        $('#bloc-contact input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlAdresse(c, contact, adr, tra);
        }

    };

    $scope.controlAdresse = function (c, contact, adr, tra) {
        var validite = true;
        $('#bloc-adresse input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            $scope.controlPoste(c, contact, adr, tra);
        }

    };

    $scope.controlPoste = function (c, contact, adr, tra) {
        var validite = true;
        $('#bloc-poste input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (tra.entite == null) {
            $('#entite').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (tra.typeContrat == null) {
            $('#contrat').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            $scope.controlGrade(c, contact, adr, tra);
        }


    };

    $scope.controlGrade = function (c, contact, adr, tra) {
        var validite = true;
        if (!$scope.historiqueGrade.grade || $scope.historiqueGrade.grade == null) {

            if ($rootScope.groupeUtilisateur.code == 'PATS_AD' || $rootScope.groupeUtilisateur.code == 'PER_AD') {
                $('.grade-not-selected').eq(0).show("slow").delay(3000).hide("slow");
            }
            if ($rootScope.groupeUtilisateur.code == 'DRH_AD' && $scope.typeEmp == "PATS") {
                $('.grade-not-selected').eq(0).show("slow").delay(3000).hide("slow");
            }
            if ($rootScope.groupeUtilisateur.code == 'DRH_AD' && $scope.typeEmp == "PER") {
                $('.grade-not-selected').eq(1).show("slow").delay(3000).hide("slow");
            }
            validite = false;

        }

        if (validite === true) {
            $scope.controlConcordance(c, contact, adr, tra);
        }

    };

    $scope.controlConcordance = function (c, contact, adr, tra) {
        var validite = true;

        if (((c.numeroCni).charAt(0) == '1' && c.sexe == 'feminin') || ((c.numeroCni).charAt(0) == '2' && c.sexe == 'masculin')) {
            $('.non-concorde').show("slow").delay(3000).hide("slow");
            validite = false;
        }

        if (validite === true) {
            $scope.CompleterInformation(c, contact, adr, tra);
        }

    };


});

