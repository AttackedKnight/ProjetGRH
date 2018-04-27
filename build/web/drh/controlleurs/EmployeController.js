/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('DrhModule').controller('EmployeController',function($scope,$rootScope,$q,Mail,UploadFile,Securite,$http,Employe,Utilisateur,Groupe,Contact,Adresse,Syndicat,MutuelleSante,MembreMutuelle,Grade,HistoriqueGrade,Servir,Fonction,TypeEmploye,Entite,Typecontrat,Fonction,Situation,Civilite,Corps,Classe,Echelon,Niveau,Categorie,Groupe,AccesGroupeTable)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */
   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    } 

    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
   
    $scope.utilisateur={id:"",avatar:"images/avatar.png"};
    $scope.groupe={};
    
    $scope.employe={id:""};
    $scope.contact={id:""};
    $scope.adresse={id:""};
//    $scope.grade={id:""};
//    $scope.estMembre={id:""};
    $scope.servir={id:""};
    $scope.membreMutuelle={id:""};
    
    $scope.fonction={id:""};
   
    $scope.situations=[];
    $scope.corps=[];
    


    $scope.today=new Date();
    $scope.employe.nationalite="Sénégalaise";
    $scope.senegalaise=true;
     
     $scope.setNationalite=function(){
         if($scope.senegalaise==true){
             $scope.employe.nationalite="Sénégalaise";
         }
         else{
             $scope.employe.nationalite="";
         }
     };
    
    
    $scope.showDefaultAvatar=function(){
        $('#previsualisation').attr('src','images/avatar.png');
        $scope.file=null;
    };
    $scope.showDefaultAvatar();
    
    $scope.preview = function(img) {
        $scope.file=img.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            
           $scope.imgAffichee=URL.createObjectURL($scope.file);
           $('#previsualisation').attr('src',$scope.imgAffichee);

        };
        reader.readAsDataURL($scope.file);
    
    };
    
    
    
    $scope.uploadAvatar=function(){
        $scope.imgProfil=$scope.file;
        var format=$scope.imgProfil.name.split(".");
        format=format[format.length-1];
        var fd = new FormData();
        fd.append($scope.employe.numeroCni, $scope.imgProfil);
        UploadFile.uploadFile(fd).success(function(data){
            $scope.utilisateur.avatar='images/'+data;
            
            $scope.creerCompteUtilisateur();
            UploadFile.resetHttp();
        })
        .error(function(){
            alert("erreur lors de l'enregistrement de l'avatar");
        });
       
    };
    
    
    /*          RECCUPERATION DES ELEMENTS PARAMETRES POUR LES AFFICHER DANS LES LISTES DE SELECTION        */
    
    Entite.findAll().success(function (data) {
        $scope.entites=data;
    }).error(function () {
        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue:creation</div>');
    });          
    
    
    
    Typecontrat.findAll().success(function (data) {
        $scope.typecontrats=data;
    }).error(function () {
        alert('Une erreur est survenue');
    });          
    
    
    Situation.findAll().success(function (data) {
        $scope.situations=data;        
    }).error(function () {
        alert('Une erreur est survenue');
    });
    
    /*Grade*/
    
    
    
    $scope.historiqueGrade = {id:"",encours:1};
    
    
    

    if($rootScope.groupeUtilisateur.code=='PATS_AD' || ($rootScope.groupeUtilisateur.code=='DRH_AD' &&  $scope.typeEmp=="PATS")){
        
        $scope.classes=[];
        $scope.gradeClasse=[];
        var req_classes=[];
        $scope.categorieClasse=[];
        $scope.niveauClasse=[];
        $scope.classeSelectionnee="1";

        for(var i=1;i<=3;i++){
            req_classes.push(Grade.findPatsClasse(i));
        }

        $q.all(req_classes).then(function(result){
            for(var i=0;i<result.length;i++){
                $scope.classes[i]=result[i].data;           
            }

            $scope.getCategorieAndNiveauClasse();
        });

        

        $scope.getCategorieAndNiveauClasse=function(){     
            $scope.gradeClasse=$scope.classes[parseInt($scope.classeSelectionnee)-1];

            var req_cat_niv=[];
            req_cat_niv.push(Grade.compterPatsCategorieClasse($scope.classeSelectionnee));
            req_cat_niv.push(Grade.compterPatsNiveauClasse($scope.classeSelectionnee));

            $q.all(req_cat_niv).then(function(result){

                $scope.categorieClasse=result[0].data;
                $scope.niveauClasse=result[1].data;
            });
        };
    }
    if($rootScope.groupeUtilisateur.code=='PATS_AD' || ($rootScope.groupeUtilisateur.code=='DRH_AD' &&  $scope.typeEmp=="PER")){
        
        $scope.corps=[];
        var req_corps=[];
        $scope.classeCorps=[];
        $scope.gradeCorps=[];
        
        
        $scope.corpsSelectionnee="0";
        
        
        req_corps.push(Grade.findPerCorps("Assistant"));
        req_corps.push(Grade.findPerCorps("Maître de conférence"));
        req_corps.push(Grade.findPerCorps("Professeur"));
        

        $q.all(req_corps).then(function(result){
            for(var i=0;i<result.length;i++){
                $scope.corps[i]=result[i].data;           
            }
            console.log($scope.corps);
            $scope.getClasseCorps();
        });
        
        $scope.getClasseCorps=function(){     
            $scope.gradeCorps=$scope.corps[parseInt($scope.classeSelectionnee)];
            
            var req_classe_corps=[];
            switch (parseInt($scope.classeSelectionnee)){
                
                case 0:
                    req_classe_corps.push(Grade.compterPerClasseCorps("Assistant"));
                    break;
                case 1:
                    req_classe_corps.push(Grade.compterPerClasseCorps("Maitre de conférérence"));
                    break;
                case 2:
                    req_classe_corps.push(Grade.compterPerClasseCorps("Professeur"));
                    break;
            }

            $q.all(req_classe_corps).then(function(result){

                $scope.classeCorps=result[0].data;
                
                console.log($scope.classeCorps);
                
            });
        };
    }
    
    
    
    
    /*Grade*/
    
    

    if($rootScope.groupeUtilisateur.code=='PATS_AD'){
        Syndicat.findSyndicatPats().success(function (data) {
            $scope.syndicats=data;  
        }).error(function () {
            alert('Une erreur est survenue');
        });
    }
    if($rootScope.groupeUtilisateur.code=='PER_AD' || $rootScope.groupeUtilisateur.code=='DRH_AD'){
        Syndicat.findSyndicatPer().success(function (data) {
            $scope.syndicats=data;  
        }).error(function () {
            alert('Une erreur est survenue');
        });
    }
    
    if($rootScope.groupeUtilisateur.code=='DRH_AD'){
        Syndicat.findSyndicatPer().success(function (data) {
            $scope.syndicatsPer=data;
            $scope.syndicats=data;
            Syndicat.findSyndicatPats().success(function (data) { 
                $scope.syndicatsPats=data;
            }).error(function () {
                alert('Une erreur est survenue');
            });
            
        }).error(function () {
            alert('Une erreur est survenue');
        });
    }
    
    
    
    
    
    MutuelleSante.findAll().success(function (data) {  
        $scope.mutuelles=data;
    }).error(function () {
        alert('Une erreur est survenue');
    });
    
    Civilite.findAll().success(function (data) {    
        $scope.civilites=data;   
    }).error(function () {
        alert('Une erreur est survenue');
    });          
    
    TypeEmploye.findAll().success(function (data) {
        $scope.typeemployes=data;      
        
    }).error(function () {
        alert('Une erreur est survenue');
    }); 
    
    Groupe.findByLibelle("employe").success(function(data){
        $scope.groupe=data;
    }).error(function () {
        alert('Une erreur est survenue:find fonc');
    });
    
    $scope.listerFonctions=function(){
        Fonction.findAll().success(function (data) {    
            $scope.fonctions=data;   
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.listerFonctions();
    

    /*          RECCUPERATION DES ELEMENTS PARAMETRES POUR LES AFFICHER DANS LES LISTES DE SELECTION        */
    
    
    /*GERER VUE ET DONNEES POUR LA DRH*/
    $scope.typeEmp="PER";
    $scope.estPER=true;
    $scope.changerTypeEmploye=function(){
        $scope.estPER=!$scope.estPER;
        if($scope.estPER===true){
            $scope.typeEmp="PER";
        }
        else{
            $scope.typeEmp="PATS";
        }
        console.log($scope.typeEmp);
        console.log($scope.estPER);
        
        $scope.changerListeSyndicats();
    };
    
    $scope.changerListeSyndicats=function(){
        if($scope.estPER===true){
            $scope.syndicats=$scope.syndicatsPer;
        }
        else{
             $scope.syndicats=$scope.syndicatsPats;
        }
       console.log($scope.syndicats);    
       
    };
    /*GERER VUE ET DONNEES POUR LA DRH*/
    
    //Civilite et type employe sont à préciser avant l'insertion
    
    $scope.CompleterInformation=function (c,contact,adr,tra){
        if(c.sexe=='masculin'){
            c.civilite=$scope.civilites[0];
        }
        else{
            if(c.situationMatrimoniale==$scope.situations[0] || c.situationMatrimoniale==$scope.situations[2] || c.situationMatrimoniale==$scope.situations[3]){
                c.civilite=$scope.civilites[1];
            }
            else{
                c.civilite=$scope.civilites[2];
            }
        }
        
        if($rootScope.groupeUtilisateur.code=='PER_AD'){
            c.typeEmploye=$scope.typeemployes[0];
        }
        if($rootScope.groupeUtilisateur.code=='PATS_AD'){
            c.typeEmploye=$scope.typeemployes[1];
        }
        if($rootScope.groupeUtilisateur.code=='DRH_AD'){
            if($scope.typeEmp=='PER'){
                c.typeEmploye=$scope.typeemployes[0];
            }
            if($scope.typeEmp=='PATS'){
                c.typeEmploye=$scope.typeemployes[1];
            }
        }
         
         /*Verification unicite de certaines information*/

        Employe.checkcni($scope.employe.numeroCni).success(function(data){
            
            if(data=="true") {
                $('#cni_dup').show("slow").delay(3000).hide("slow");
            }    
            else{
                Employe.checkmatricule().success(function(data){
                    data=data.split('-');
                    var existe=false;
                    for(var i=0;i<data.length;i++){
                        if($scope.employe.matriculeInterne==data[i]) {                           
                            existe=true;
                            break;
                        } 
                        
                    }
                    if(existe==true) {
                         $('#mat_int_dup').show("slow").delay(3000).hide("slow");
                    }    
                    else{
                        Employe.checkmatriculecs($scope.employe.matriculeCaisseSociale).success(function(data){
                            if(data=="true") {
                                 $('#mat_cs_dup').show("slow").delay(3000).hide("slow");
                            }    
                            else{
                                Contact.checkcontact($scope.contact.numero1).success(function(data){
                                    if(data=="true") {
                                         $('#num_tel_1_dup').show("slow").delay(3000).hide("slow");
                                    }    
                                    else{
                                        Contact.checkcontact($scope.contact.numero2).success(function(data){
                                            if(data=="true") {
                                                 $('#num_tel_2_dup').show("slow").delay(3000).hide("slow");
                                            }    
                                            else{
                                                Contact.checkmail($scope.contact.email).success(function(data){
                                                    if(data=="true") {
                                                         $('#email_dup').show("slow").delay(3000).hide("slow");
                                                    }    
                                                    else{
                                                        $scope.add(c,contact,adr,tra);
                                                       
                                                    }
                                                }).error(function () {
                                                    alert('Erreur de vérification de l\'adresse email');
                                                });
                                            }
                                        }).error(function () {
                                            alert('Erreur de vérification du numéro de téléphone 2');
                                        });
                                    }
                                }).error(function () {
                                    alert('Erreur de vérification du numéro de téléphone 1');
                                });
                            }
                        }).error(function () {
                            alert('Erreur de vérification du matricule IPRES/FNR');
                        });
                    }
                }).error(function () {
                    alert('Erreur de vérification matricule');
                });
                

            }
        }).error(function () {
            alert('Erreur de vérification du cni');
        });
       
      


    };
    
    $scope.testDup=function(){
        
        alert('yes');
         
    };
//    Réinitialisation du formulaire
    
    
    $scope.reinitialiserFormulaire=function(){
        $scope.employe={id:""};
        $scope.contact={id:""};
        $scope.adresse={id:""};
        $scope.historiqueGrade = {id:"",encours:1};
        $scope.classeSelectionnee="1";
        $scope.getCategorieAndNiveauClasse();
        $scope.servir={id:""};
        $scope.fonction={id:""};
        $scope.estMembreMutuelle=false;
        $scope.membreSyndicat=false;
        $scope.caisseSociale=false;
        $scope.showDefaultAvatar();
        $scope.currentSyndicat=0;
        
        $scope.senegalaise=true;
        $scope.employe.nationalite="Sénégalaise";
    };
    
    //Pour la premiere fois, on l'attribut dateDePassage de l'objet grade correspond à la valeur de dateDecrutement de
    //l'objet employe.Quant a l'attribut typeAvancement ,il est null
   
    $scope.currentSyndicat=0;
    $scope.setSyndicat=function(){
        if($scope.currentSyndicat==0){
           
            $scope.employe.syndicat=null;
        }else{
            var i=0;
            for(;i<$scope.syndicats.length;i++){
                if($scope.syndicats[i].id==$scope.currentSyndicat){
                    $scope.employe.syndicat=$scope.syndicats[i];
                    break;
                }
            }
        }
    };
    
    $scope.completerGrade=function (){
        var datePassation=new Date();
        var dateProchainAvancement=new Date();
        
        dateProchainAvancement.setFullYear(dateProchainAvancement.getFullYear()+$scope.historiqueGrade.grade.duree);
        
        $scope.historiqueGrade.datePassation=datePassation;
        $scope.historiqueGrade.dateProchainAvancement=dateProchainAvancement;
        $scope.historiqueGrade.employe=$scope.employe;
        
        HistoriqueGrade.add($scope.historiqueGrade).success(function(){ 
            
            if($scope.estMembreMutuelle==true){
                $scope.AjouterMutuelle();
            }
            else{
                if($scope.file){
                    $scope.uploadAvatar();
                }
                else{
                    $scope.creerCompteUtilisateur();
                }
            }
            
        }).error(function () {
            alert('Une erreur est survenue');
        });
        
    };
    $scope.completerAdresse=function (){
        $scope.adresse.employe=$scope.employe;
        
        Adresse.add($scope.adresse).success(function(){ 
            $scope.completerContact();
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.completerContact=function (){
        $scope.contact.employe=$scope.employe;
        
        Contact.add($scope.contact).success(function(){  
            $scope.completerServir();
        }).error(function () {
            alert('Une erreur est survenue');
        });
        
    };
    

    $scope.completerServir=function (){
        $scope.servir.employe=$scope.employe;

        if(($scope.fonction.libelle).toLowerCase()=="recteur" || ($scope.fonction.libelle).toLowerCase()=="rectrice" ||
           ($scope.fonction.libelle).toLowerCase()=="directeur" || ($scope.fonction.libelle).toLowerCase()=="directrice" ||
           ($scope.fonction.libelle).toLowerCase()=="chef des services administratifs" || ($scope.fonction.libelle).toLowerCase()=="chef de département"){
            $scope.servir.responsable=1;
        }
        else{
            $scope.servir.responsable=0;
        }
        
        if($scope.servir.responsable===1){
            Servir.findResponsableEntite($scope.servir.entite).success(function(data){
                if(data!==null){
                    $('.conflit-poste').show("slow").delay(3000).hide("slow");
                }
                else{
                    $scope.ajouterPoste();
                }
            }).error(function(data){
                alert("Un erreur est survenue : vérification responsable entité");
            });
        }
        else{
            $scope.ajouterPoste();
        }
        
    };
    
    $scope.ajouterPoste=function(){
        Fonction.findByLibelle($scope.fonction.libelle).success(function(data){
            if(!data){
                Fonction.add($scope.fonction).success(function(){
                    Fonction.findByLibelle($scope.fonction.libelle).success(function(data){
                         $scope.servir.fonction=data;

                         Servir.add($scope.servir).success(function(){
                             $scope.completerGrade();
                         }).error(function () {
                             alert('Une erreur est survenue:servir');
                         });
                     }).error(function () {
                         alert('Une erreur est survenue:find fonc');
                     });
                 }).error(function () {
                     alert('Une erreur est survenue:add fonc');
                 });
            }else{
                $scope.servir.fonction=data;
                Servir.add($scope.servir).success(function(){
                    $scope.completerGrade();    
                }).error(function () {
                    alert('Une erreur est survenue:servir');
                });
                
            }
        }).error(function () {
            
            alert('Erreur lors de la recherche : fonction');
        });
    };
    
    //Verifier membreSyndicat : si true, creer l'objet  estMembre et mettre dans sont attribut sysdicat(estMembre.syndicat)
    // le syndicat correspondant selon que l'employe est un PER ou PATS
    
    
        

    $scope.AjouterMutuelle=function(){

        $scope.membreMutuelle.employe=$scope.employe;
        $scope.membreMutuelle.mutuelleSante=$scope.mutuelles[0];
        
        MembreMutuelle.add($scope.membreMutuelle).success(function(){
            if($scope.file){
                $scope.uploadAvatar();
            }
            else{
                $scope.creerCompteUtilisateur();
            }
            
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    
    
    function creerIdentifiants() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-";

        for (var i = 0; i < 9; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


    $scope.envoyerMail=function(c){
      
        var corps="Login : "+c.login+" Mot de passe : "+c.motDePasse;
        
        var msg='to='+$scope.contact.email+'&objet=identifiants de connexion&body='+corps;

        $scope.reinitialiserFormulaire();
        
        Mail.sendEmail(msg).success(function(data){ 
            ;
        }).error(function () {
            alert('L\' envoi de mail a echoué');
        });
        $scope.utilisateur={id:"",avatar:"images/avatar.png"};
        Mail.resetHttp();
    };
 
    $scope.creerCompteUtilisateur=function(){
        
        $scope.utilisateur.employe=$scope.employe;
        $scope.utilisateur.email=$scope.contact.email;
        $scope.utilisateur.groupe=$scope.groupe;
        
        //Generer login
        do{
            $scope.utilisateur.login=creerIdentifiants();
        }while(!(/^[a-z]+[0-9.\-]*[a-z0-9]+$/i.test($scope.utilisateur.login)));
        //Generer mot de passe
        do{
           $scope.utilisateur.motDePasse=creerIdentifiants(); 
        }while(!(/^[a-z0-9]+$/i.test($scope.utilisateur.motDePasse)));
        
       
               
        
        Utilisateur.createCompte($scope.utilisateur).success(function (data){
//           dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Compte crée !<br>Rendez-vous sur votre boite email pour recuperer vos identifiants de connexion</div>');
           $scope.envoyerMail($scope.utilisateur);
        }).error(function(){
          alert('Une erreur est survenue:creation');
        });  
    };

    
    $scope.add=function(c,contact,adr,tra){
        var dialog = bootbox.dialog({
                            title: 'CREATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Création ...</span></p>'
                        });
        Employe.add(c).success(function(){
            $scope.findByNin(c);
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Creation effetuee avec succes\n\
                                        <br>Rendez-vous sur votre boite email pour recuperer vos identifiants de connexion</div>'); 
        }).error(function () {
            alert("Une erreur est survenue lors de l'ajout d'un employé");
        });
    };
    
    $scope.findByNin=function(c){
        Employe.findByNin(c.numeroCni).success(function (data) {    
            $scope.employe=data; 
                       
            $scope.completerAdresse();

        }).error(function () {
            alert('Une erreur est survenue');
        });          
    };
    
    
    
    
    
    
/*                   CONTROLES DE SAISIE                      */
    
    $scope.controlForm=function(c,contact,adr,tra){
       $scope.controlIdentifiant(c,contact,adr,tra);
    };
    

    $scope.controlIdentifiant=function(c,contact,adr,tra){
        var validite=true;
        $('#bloc-identifiant input').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        if(validite===true){
//            $('#bloc-identifiant').removeClass('box-primary');
//            $('#bloc-identifiant').addClass('box-success');
            $scope.controlCivilite(c,contact,adr,tra);
        }

    };
    
    $scope.controlCivilite=function(c,contact,adr,tra){ 
        var validite=true;
        $('#bloc-etatCivil input').each(function(e){
           if($(this).val()==="" && $(this).attr('id')!=="profil"){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        $('#bloc-etatCivil select').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        if(validite===true){
//            $('#bloc-etatCivil').removeClass('box-primary');
//            $('#bloc-etatCivil').addClass('box-success');
            $scope.controlSituationMatri(c,contact,adr,tra);
        }
        
    };
    
    
    
    $scope.controlSituationMatri=function(c,contact,adr,tra){
        var validite=true;
        $('#bloc-situation input').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        if(c.situationMatrimoniale==null){
             $('#situationMatri').parent().next().show("slow").delay(3000).hide("slow");
             validite=false;
        }
        if(validite===true){
          //  $('#bloc-situation').removeClass('box-primary');
//            $('#bloc-situation').addClass('box-success');
           $scope.controlContact(c,contact,adr,tra);
        }
        
    };
    
    $scope.controlContact=function(c,contact,adr,tra){
        var validite=true;
        $('#bloc-contact input').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        if(validite===true){
 //           $('#bloc-contact').removeClass('box-primary');
//            $('#bloc-contact').addClass('box-success');
           $scope.controlAdresse(c,contact,adr,tra);
        }
        
    };
    
    $scope.controlAdresse=function(c,contact,adr,tra){
        var validite=true;
        $('#bloc-adresse input').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });       
        if(validite===true){
//            $('#bloc-adresse').removeClass('box-primary');
//            $('#bloc-adresse').addClass('box-success');
           $scope.controlPoste(c,contact,adr,tra);
        }
        
    };
    
    $scope.controlPoste=function(c,contact,adr,tra){
        var validite=true;
        $('#bloc-poste input').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });       
        if(tra.entite==null){
             $('#entite').parent().next().show("slow").delay(3000).hide("slow");
             validite=false;
        }
        if(tra.typeContrat==null){
             $('#contrat').parent().next().show("slow").delay(3000).hide("slow");
             validite=false;
        }
        if(validite===true){
//            $('#bloc-poste').removeClass('box-primary');
//            $('#bloc-poste').addClass('box-success');
             $scope.controlGrade(c,contact,adr,tra);
        }
        
                                                   
    };
    
    $scope.controlGrade=function(c,contact,adr,tra){
        var validite=true;
        if(!$scope.historiqueGrade.grade || $scope.historiqueGrade.grade==null){
            
            $('#grade-not-selected').show("slow").delay(3000).hide("slow");
            validite=false;
           
        }
        
        if(validite===true){
            $scope.controlConcordance(c,contact,adr,tra);
        }
        
    };
    
    $scope.controlConcordance=function(c,contact,adr,tra){
        var validite=true;
        
        if(( (c.numeroCni).charAt(0)=='1' && c.sexe=='feminin' ) || ( (c.numeroCni).charAt(0)=='2' && c.sexe=='masculin' )){
             $('.non-concorde').show("slow").delay(3000).hide("slow");
             validite=false;
        }
        
        if(validite===true){
            $scope.CompleterInformation(c,contact,adr,tra);         
        }

    };
    
    
});

