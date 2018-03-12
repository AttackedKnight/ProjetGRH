/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('DetailEmployeController',function($scope,Securite,$routeParams,UploadFile,Typedocument,Situation,Entite,$rootScope,Syndicat,Diplome,MutuelleSante,Formation,Employe,Contact,Adresse,Servir,MembreMutuelle,Grade,Fonction,Typecontrat,Document,Connexion)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
    
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
   
    $scope.formProvenanceFichier="";
    
    /* edit info generale employe*/
    
    $scope.editInfoGenerales=false;
    $scope.membreMutuelle={id:""};
    $scope.currentSyndicat=0;
    
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
    
    
    
    
    $scope.setSyndicat=function(el){
        $scope.currentSyndicat=$(el).val();
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
    
    if($rootScope.groupeUtilisateur.id==6){
        Syndicat.findSyndicatPats().success(function (data) {
            $scope.syndicats=data;  
        }).error(function () {
            alert('Une erreur est survenue');
        });
    }
    if($rootScope.groupeUtilisateur.id==3){
        Syndicat.findSyndicatPer().success(function (data) {
            $scope.syndicats=data;  
        }).error(function () {
            alert('Une erreur est survenue');
        });
    }
    
    
    $scope.controlFormEditEmploye=function(){
        var validite=true;
        $('#editInfoGenerales input').each(function(e){
           if($(this).val()==="" && $(this).attr('id')!=="profil"){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        $('#editInfoGenerales select').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        if(validite===true){
            
            /*Verification unicite identifiants  en cas de changement*/
            
            /*Si les identifiants ont ete touche*/
           
            if($scope.employe.numeroCni!==$scope.monCni){
                $scope.CheckCni();
            }
            else if($scope.employe.matriculeInterne!==$scope.monNumeroMatricule){                    
                    $scope.checkMatriculeInterne();
            }
            else if($scope.employe.matriculeCaisseSociale!==$scope.monNumeroCaisseSociale){
                $scope.checkMatriculeCaisseSociale();
            }          
            else{
                $scope.effectuerMajEmploye();
            }

        }
    };
     
    $scope.effectuerMajEmploye=function(){
        $scope.editEmploye();
        $scope.toggleEmployeEditForm();
    };
    $scope.toggleMembreMutuelle=function(){
        $scope.estMembreMutuelle=!$scope.estMembreMutuelle;
        
    };
    
    $scope.editEmploye=function(){
        Employe.edit($scope.employe).success(function(){
            alert('Modification éffectuée avec succes');
            $scope.monCni=$scope.employe.numeroCni;
            $scope.monNumeroMatricule=$scope.employe.matriculeInterne;
            $scope.monNumeroCaisseSociale=$scope.employe.matriculeCaisseSociale;
            if($scope.estMembreMutuelle===true){
                $scope.AjouterMutuelle();
            }
      }).error(function(){
          alert("Erreur lors de la modification de l'employe");
      });  
    };
    
    
    $scope.AjouterMutuelle=function(){
        $scope.membreMutuelle.employe=$scope.employe;
        $scope.membreMutuelle.mutuelleSante=$scope.mutuelles[0];
        
        MembreMutuelle.add($scope.membreMutuelle).success(function(){
            ;    
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    
    
    $scope.CheckCni=function(){
        Employe.checkcni($scope.employe.numeroCni).success(function(data){
            
            if(data=="true") {
                $('#cni_dup').show("slow").delay(3000).hide("slow");
            }    
            else{
                if($scope.employe.matriculeInterne!==$scope.monNumeroMatricule){                    
                    $scope.checkMatriculeInterne();
                }
                else if($scope.employe.matriculeCaisseSociale!==$scope.monNumeroCaisseSociale){
                    $scope.checkMatriculeCaisseSociale();
                } 
                else{
                    $scope.effectuerMajEmploye();
                }
            }
        }).error(function () {
            alert('Erreur de vérification du cni');
        });
    };
    
    $scope.checkMatriculeInterne=function(){
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
                
                if($scope.employe.matriculeCaisseSociale!==$scope.monNumeroCaisseSociale){
                    $scope.checkMatriculeCaisseSociale();
                } 
                else{
                    $scope.effectuerMajEmploye();
                }
            }
        }).error(function () {
            alert('Erreur de vérification matricule');
        });
    };
    
    $scope.checkMatriculeCaisseSociale=function(){
        Employe.checkmatriculecs($scope.employe.matriculeCaisseSociale).success(function(data){
            if(data=="true") {
                $('#mat_cs_dup').show("slow").delay(3000).hide("slow");
                
            }    
            else{
                $scope.effectuerMajEmploye();            
            }
        }).error(function () {
            alert('Erreur de vérification du matricule IPRES/FNR');
        });
    };
    
    $scope.toggleEmployeEditForm=function(){
        $scope.editInfoGenerales=!$scope.editInfoGenerales;
        if($scope.editInfoGenerales===true){
            
            $scope.showDefaultAvatar();
        }
    };
    
    /*Gestion avatar employe*/
    
    $scope.showDefaultAvatar=function(){
        
        $('#previsualisation').attr('src',''+$scope.avatar);
        $scope.cancelEditAvatar=true;
        $scope.editAvatar=true;
        $scope.file=null;
        
        
    };
    $scope.cancelEditAvatar=true;
        $scope.editAvatar=true;
    
    
    $scope.preview = function(img) {
        $scope.file=img.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            
           $scope.imgAffichee=URL.createObjectURL($scope.file);
           $('#previsualisation').attr('src',$scope.imgAffichee);
           $scope.cancelEditAvatar=false;
           $scope.editAvatar=false;
           

        };
        reader.readAsDataURL($scope.file);
    
    };
    
    
    
    $scope.editAvatarEmploye=function (){
        var dialog = bootbox.dialog({
                            title: 'MODIFICATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Modification ...</span></p>'
                        });
        Connexion.edit($scope.c_utilisateur).success(function () {           
                dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Modification effetuee avec succes</div>');                
            $scope.avatar=$scope.c_utilisateur.avatar;
            $scope.editAvatar=true;
            $scope.cancelEditAvatar=true;
            alert('Photo de profil mise à jour');
        }).error(function () {
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
        });  
    };
    
    $scope.uploadAvatar=function(){
        $scope.imgProfil=$scope.file;
        var format=$scope.imgProfil.name.split(".");
        format=format[format.length-1];
        var fd = new FormData();
        fd.append($scope.employe.numeroCni, $scope.imgProfil);
        UploadFile.uploadFile(fd).success(function(data){
            $scope.c_utilisateur.avatar='images/'+data;
          
            UploadFile.resetHttp();
            
            
            
            $scope.editAvatarEmploye();
        })
        .error(function(){
            alert("erreur lors de l'enregistrement de l'avatar");
        });
       
    };
    
    
    /*Gestion avatar employe*/
    
     /* fin edit info employe */
     
    /* Edit Situation Matrimoniale */
    
    $scope.editSituationMatri=false;
    
    $scope.toggleSituationMatriEditForm=function(){
        $scope.editSituationMatri=!$scope.editSituationMatri;
    };
    
    
    
    $scope.controlSituationMatriFormEdit=function(formulaire){
        $scope.formProvenanceFichier=formulaire;
        var validite=true;
        $('.editSituationMatriForm input[type=number]').each(function(e){
           if($(this).val()==="" ){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        $('.editSituationMatriForm select').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        if(validite===true){
            if($scope.controlDocumentForm(formulaire)){
                $scope.document.situationMatrimoniale=1;
                $scope.completerDocument();   
                
                $scope.uploadDocument($scope.lesFichiers);
                
                $scope.editEmploye();
                $scope.toggleSituationMatriEditForm();
            }
            
        }
    };
    

    /* Edit Situation Matrimoniale */
    
    /* Edit Contact */
    
    $scope.editContact=false;
    
    $scope.toggleContactEditForm=function(){
        $scope.editContact=!$scope.editContact;
    };
    
    
    
    $scope.controlContactFormEdit=function(){
        var validite=true;
        $('.editContactForm input').each(function(e){
           if($(this).val()==="" ){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        
        if(validite===true){
          
            /*Verification unicite identifiant  en cas de changement*/
            
            /*Si les identifiants ont ete touche*/
           
            if($scope.contacts.numero1!==$scope.monTel1){
                $scope.checkNumeroTel1();
            }
            else if($scope.contacts.numero2!==$scope.monTel2){                    
                     $scope.checkNumeroTel2();
            }
            else if($scope.contacts.email!==$scope.monEmail){
                $scope.checkEmail();
            }          
            else{
                $scope.effectuerMajContact();
            }
            
        }
    };
    
    $scope.editContacts=function(){
        Contact.edit($scope.contacts).success(function (data) {
            alert('Contacts mises à jour !');         
            $scope.monTel1=$scope.contacts.numero1;
            $scope.monTel2=$scope.contacts.numero2;
            $scope.monEmail=$scope.contacts.email;
        }).error(function () {
            alert('Une erreur est survenue : modification contact');
        });
    };
    
    $scope.checkNumeroTel1=function(){
        Contact.checkcontact($scope.contacts.numero1).success(function(data){
            if(data=="true") {
                $('#num_tel_1_dup').show("slow").delay(3000).hide("slow"); 
            }    
            else{
               if($scope.contacts.numero2!==$scope.monTel2){                    
                        $scope.checkNumeroTel2();
               }
               else if($scope.contacts.email!==$scope.monEmail){
                   $scope.checkEmail();
               }          
               else{
                   $scope.effectuerMajContact();
               }
            }
        }).error(function () {
            alert('Erreur de vérification du numéro de téléphone 1');
        });
    };
    $scope.checkNumeroTel2=function(){
        Contact.checkcontact($scope.contacts.numero2).success(function(data){
            if(data=="true") {
                $('#num_tel_2_dup').show("slow").delay(3000).hide("slow"); 
            }    
            else{
               if($scope.contacts.email!==$scope.monEmail){
                   $scope.checkEmail();
               }          
               else{
                   $scope.effectuerMajContact();
               }
            }
        }).error(function () {
            alert('Erreur de vérification du numéro de téléphone 1');
        });
    };
    
    $scope.checkEmail=function(){
        Contact.checkmail($scope.contacts.email).success(function(data){
            if(data=="true") {
                 $('#email_dup').show("slow").delay(3000).hide("slow");                
            }    
            else{
                $scope.effectuerMajContact();
                
            }
        }).error(function () {
            alert('Erreur de vérification de l\'adresse email');
        });
    };
    
    $scope.effectuerMajContact=function(){
        $scope.editContacts();
        $scope.toggleContactEditForm();
    };
    
    /* Edit Contact*/
    
    /* Edit Adresse */
    
    $scope.editAdresse=false;
    
    $scope.toggleAdresseEditForm=function(){
        $scope.editAdresse=!$scope.editAdresse;
    };
    
    
    
    $scope.controlAdresseFormEdit=function(){
        var validite=true;
        $('.editAdresseForm input').each(function(e){
           if($(this).val()==="" ){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
        
        if(validite===true){
            
            $scope.editEmployeAdresse();
            $scope.toggleAdresseEditForm();
        }
    };
    
    $scope.editEmployeAdresse=function(){
        Adresse.edit($scope.adresse).success(function (data) {
            alert('Adresse mise à jour !');         
        }).error(function () {
            alert('Une erreur est survenue : modification contact');
        });
    };
    
    /* Edit Adresse*/
    
    $scope.findSituation=function(){
        Situation.findAll().success(function (data) {    
            $scope.situations=data;   

            for(var i=0;i<$scope.situations.length;i++){
                if($scope.situations[i].id==$scope.employe.situationMatrimoniale.id){
                   $scope.SelectedSituationMatrimoniale=$scope.situations[i];
                   break;
                }
            }
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    
    
    
    var idEmploye=$routeParams.id;
    
    
    
   
    Employe.find(idEmploye).success(function (data) {
        $scope.employe=data;
        
        $scope.monCni=$scope.employe.numeroCni;
        $scope.monNumeroMatricule=$scope.employe.matriculeInterne;
        $scope.monNumeroCaisseSociale=$scope.employe.matriculeCaisseSociale;
        
        $scope.employe.dateDeNaissance=new Date($scope.employe.dateDeNaissance);
        $scope.employe.dateRecrutement=new Date($scope.employe.dateRecrutement);
        
        $scope.findAllFormations();
        $scope.formation={id:"",employe:$scope.employe};
        
        if($scope.employe.syndicat){
            $scope.currentSyndicat=$scope.employe.syndicat.id;
        }
        $scope.findSituation();
        MembreMutuelle.findByEmploye($scope.employe).success(function (data) {
            $scope.mutuelle=data;
            if(!data){
                $scope.estMembreMutuelle=false;
            }
            else{
                $scope.estMembreMutuelle=true;
            }
        }).error(function () {
            $scope.mutuelle=null;
        });
        Contact.findByEmploye($scope.employe).success(function (data) {
            $scope.contacts=data;         
            
            $scope.monTel1=$scope.contacts.numero1;
            $scope.monTel2=$scope.contacts.numero2;
            $scope.monEmail=$scope.contacts.email;
        }).error(function () {
            alert('Une erreur est survenue');
        });
        
        Connexion.findByEmploye($scope.employe.id).success(function (data) {
            
            $scope.c_utilisateur=data;
            $scope.avatar=$scope.c_utilisateur.avatar;
            
        }).error(function () {
            alert('Une erreur est survenue');
        });
        
        
        Adresse.findByEmploye($scope.employe).success(function (data) {
            $scope.adresse=data;         
        }).error(function () {
           alert('Une erreur est survenue');
        });
        $scope.findServir();
        Grade.findByEmploye($scope.employe).success(function (data) {
            $scope.grades=data;         
        }).error(function () {
            alert('Une erreur est survenue');
        });
        
        $scope.listerMesDocuments();
        
        $(function (){
            $('a').tooltip();
        });
    }).error(function () {
        alert('Une erreur est survenue');
    });
    
    MutuelleSante.findAll().success(function (data) {  
        $scope.mutuelles=data;
    }).error(function () {
        alert('Une erreur est survenue');
    });
    
    $scope.findServir=function(){
        Servir.findByEmploye($scope.employe).success(function (data) {
            $scope.parcours=data;  
            $scope.trouverResponsable();
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    
    $scope.trouverResponsable=function(){
        if($scope.parcours[0].responsable==1){
            if($scope.parcours[0].entite.entite !=null){
                Servir.findResponsableEntite($scope.parcours[0].entite.entite).success(function (data) {
                    $scope.mon_responsable=data.employe.civilite.code+' '+data.employe.prenom +' '+(data.employe.nom).toUpperCase();;         
                }).error(function () {
                    alert('Une erreur est survenue');
                });
            }
            else{
                $scope.mon_responsable="";
            }
            
        }
        else{
            Servir.findResponsableEntite($scope.parcours[0].entite).success(function (data) {
                $scope.mon_responsable=data.employe.civilite.code+' '+data.employe.prenom +' '+(data.employe.nom).toUpperCase();;         
            }).error(function () {
                alert('Une erreur est survenue');
            });
        }
        
    };
    /*                    Parcours professionel                       */
    
    $scope.fonction={id:""};
    $scope.servir={id:""};
    
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
    Fonction.findAll().success(function (data) {    
        $scope.fonctions=data;   
    }).error(function () {
        alert('Une erreur est survenue');
    });
    
    
    
    
    $scope.controlNewJobForm=function(s){
        var validite=true;
        $('.newEmploiForm input').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });       
        if(s.entite==null){
             $('#entite').parent().next().show("slow").delay(3000).hide("slow");
             validite=false;
        }
        if(s.typeContrat==null){
             $('#contrat').parent().next().show("slow").delay(3000).hide("slow");
             validite=false;
        }
        if(validite===true){
            $scope.completerServir();
        }
    };
    
    
    $scope.finirService=function(leService){
       
        leService.fin=new Date();
        Servir.finirService(leService).success(function(data){
            Servir.findByEmploye($scope.employe);
        }).error(function () {
            alert('Une erreur est survenue: fin service');
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
        /* Verifier d'abord que l'employe n'occupe pas un autre poste*/
        Servir.enService($scope.employe).success(function(data){
            if(data==='true'){
                alert('Cet employé est en service actuellement.');
            }
            else{
                /*Si c'est un poste poste de responsabilité, vérifier qu'il n'est pas occupe pas quelqu'un autre*/
                
                if($scope.servir.responsable===1){
                    Servir.findResponsableEntite($scope.servir.entite).success(function(data){
                        
                        if(data!==null){
                            $('.conflit-poste').show("slow").delay(3000).hide("slow");
                        }
                        else{
                            $scope.ajouterNouvelPoste();
                        }
                    }).error(function(data){
                        alert("Un erreur est survenue : vérification responsable entité");
                    });
                }
                else{
                    $scope.ajouterNouvelPoste();
                }
            }  
            return false;
        }).error(function(){
            alert('Erreur de vérification : en service');
        });

    };
    
    
   $scope.ajouterNouvelPoste=function(){
        Fonction.findByLibelle($scope.fonction.libelle).success(function(data){                         
            if(!data){
                Fonction.add($scope.fonction).success(function(){
                   Fonction.findByLibelle($scope.fonction.libelle).success(function(data){
                        $scope.servir.fonction=data;

                        Servir.add($scope.servir).success(function(){
                            $scope.fonction={id:""};
                            $scope.servir={id:""};
                            $scope.findServir();
                        }).error(function () {
                            alert('Une erreur est survenue:servir');
                        });
                    }).error(function () {
                        alert('Erreur lors de la recherche : fonction');
                    });
                }).error(function () {
                    alert('Une erreur est survenue : ajouter fonction');
                });
            }
            else{
                $scope.servir.fonction=data;
                Servir.add($scope.servir).success(function(){
                    $scope.fonction={id:""};
                    $scope.servir={id:""};
                    $scope.findServir();
                }).error(function () {
                    alert('Une erreur est survenue:servir');
                });
                
            }

        }).error(function () {

            alert('Erreur lors de la recherche : fonction');
        });    
   };
    
    $scope.reinitialiserFormulaireParcours=function(){
        $scope.fonction={id:""};
        $scope.servir={id:""};
    };
    
   /*                    Parcours professionel                       */
    /*        formation              */
    $scope.formations=[];
    $scope.today=new Date();
    $scope.diplomante=false;
    $scope.diplome={id:""};
    
    $scope.controlFormationFormation=function(formulaire){
        var validite=true;
        $('.formationForm input:not([type="file"])').each(function(e){
            if($(this).val()==="" ){
                 $(this).parent().next().show("slow").delay(3000).hide("slow");
                 validite=false;
            }
         });
         if(validite===true){
            if($scope.controlDocumentForm(formulaire)){
                
                $scope.nouvelleFormation=true;
                
                if($scope.diplomante===true){
                    $scope.completeFormation();
                }
                else{
                    $scope.addFormation();
                }

            }
            
         }
         
    };
    
    $scope.visualiserDocumentformation=function(idFormation){
        for(var i=0;i<$scope.documents.length;i++){
            if($scope.documents[i].formation!=null && $scope.documents[i].formation.id==idFormation){
                $scope.visualiserDocument($scope.documents[i].emplacement);
            }
        }
    };
    
    $scope.completerDocumentFormation=function(){
        $scope.document.formation=$scope.lastFormation;
        $scope.completerDocument();   

        $scope.uploadDocument($scope.lesFichiers);
        
        $scope.nouvelleFormation=false;
    };
    $scope.completeFormation=function(){
        
        Diplome.findByLibelle($scope.diplome.nom).success(function(data){
            
            if(!data){
                Diplome.add($scope.diplome).success(function(){
                    Diplome.findByLibelle($scope.diplome.nom).success(function(data){
                         $scope.formation.diplome=data;
                        $scope.addFormation();                                
                     }).error(function () {
                         alert('Une erreur est survenue:find diplome');
                     });
                 }).error(function () {
                     alert('Une erreur est survenue:add diplome');
                 });
                
            }else{
                $scope.formation.diplome=data;
                $scope.addFormation();
            }
        }).error(function () {

            alert('Erreur lors de la recherche : diplome');
        });
    };
    
    $scope.addFormation=function(){
        Formation.add($scope.formation).success(function(){
            $scope.findAllFormations();
            $scope.reinitialiserFormulaireFormation();
       }).error(function () {
           alert('Une erreur est survenue:formation');
       });
       
    };
    
    $scope.findAllFormations=function(){
        Formation.findAllEmployeFormation($scope.employe).success(function(data){
            $scope.formations=data;
            $scope.lastFormation=$scope.formations[0];
            if($scope.nouvelleFormation==true){
                //S'il ne s'agit pas d'un nouvelle formation, il n y a pas d'upload
                $scope.completerDocumentFormation();
            }
        }).error(function () {
            alert('Une erreur est survenue : get formation');
        });

    };
    
    
    $scope.reinitialiserFormulaireFormation=function(){
        $scope.formation={id:"",employe:$scope.employe};
        $scope.diplomante=false;
        $scope.diplome={id:""};
    };
    
    
    

    /*Gestion des documents electroniques*/
    $scope.lesFichiers=null;
    $scope.typedocuments=[];
    $scope.documents=[];
    $scope.document={id:"",dateEnregistrement:$scope.today};
    $scope.detailUploadContent="";
    Typedocument.findAll().success(function (data) {           
            $scope.typedocuments=data;
    }).error(function(){
        alert('Une erreur est survenue lors de la récuperation des types de documents');
    });
    $scope.listerMesDocuments=function(){
        Document.findByEmploye($scope.employe).success(function (data) {           
            $scope.documents=data;
            
            (function datatable() {
 
            if($('.tableau-document tr').length>0){
                setTimeout(function(){ 
                    $('.tab-content table').dataTable({
                    "bPaginate": true,
                    "bLengthChange": true,
                    "bFilter": true,
                    "bSort": true,
                    "bInfo": true,
                    "bAutoWidth": false
                  });        
                }, 2000);

            }

        })();
        }).error(function(){
            alert('Une erreur est survenue lors de la récuperation des types de documents');
        });
        
        
    };
    $scope.cancelFileUpload=function(){
        $('#'+$scope.formProvenanceFichier+' .detailUpload').html('');
        $scope.lesFichiers=null;
        
    };
    
    $scope.previewUpload = function(fichiers,formulaire) {
        $scope.formProvenanceFichier=formulaire;
        $scope.lesFichiers=fichiers;
        for(var i=0;i<fichiers.files.length;i++){
            $scope.fichierEnvoye=fichiers.files[i];  
            
            if($scope.afficheDetail($scope.fichierEnvoye,i)===true){
                var reader = new FileReader();
                var pourcentage=0;
                reader.onprogress = function(e) {  

                    pourcentage=(e.loaded/e.total)*100;
                    if(pourcentage<50){
                        $("#barreProgression_"+i).addClass("progress-bar-danger");
                       
                    }
                    else{
                        $("#barreProgression_"+i).removeClass("progress-bar-danger");
                        $("#barreProgression_"+i).addClass("progress-bar-warning");
                       
                    }
                    $("#barreProgression_"+i).css("width",  + "75%");
                    $("#pourcentage_"+i).text(pourcentage + "%");
                };

                reader.onload = function() {    
                    $(".progress-bar-"+i).removeClass("progress-bar-warning");
                    $(".progress-bar-"+i).addClass("progress-bar-success");                   
                    $(".progress-bar-"+i).css("width", "75%");
                    $("#pourcentage_"+i).text(pourcentage + "%");  
                };
                reader.readAsDataURL($scope.fichierEnvoye);
            }
        }

//        $('.detailUpload').append($scope.detailUploadContent);
    
    };
  
    $scope.afficheDetail=function(file,indice){
            var allowedTypes ="pdf"  ;                  //Type de fichier autorise  
            var imgType=file.name.split('.');
            imgType = imgType[imgType.length - 1].toLowerCase(); //Recuperer l'extension du fichier
            if(imgType===allowedTypes){
            
                var talle=Math.ceil(file.size/1024);
//                $scope.detailUploadContent+='<div><span clas>'+file.name+'</span><div class="progress progress-striped active"><div class="progress-bar progress-bar-'+indice+'"></div></div><div id="pourcentage_'+indice+'" class="pull-right"></div> </div>';
                $('#'+$scope.formProvenanceFichier+' .detailUpload').append('<div><span clas>'+file.name+'</span><div class="progress progress-striped active"><div id="barreProgression_'+indice+'" class="progress-bar"></div></div><div id="pourcentage_'+indice+'" class="pull-right"></div> </div>');
                
                return true;
            }
            else{
                $scope.cancelFileUpload();
                $(".error-format").show("slow").delay(3000).hide("slow");
                return false;
            }
    };
    
    $scope.ajouterNouveauDocument=function(formulaire){
        $scope.formProvenanceFichier=formulaire;
        if($scope.controlDocumentForm(formulaire)){
            $scope.completerDocument();   
            $scope.uploadDocument($scope.lesFichiers);
        }
    };
    
    $scope.controlDocumentForm=function(formulaire){
      var validite=true;
        $('#'+formulaire+' textarea').each(function(e){
           if($(this).val()===""){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });
       if($scope.document.typeDocument==null){
            $('#'+formulaire+' .type-doc-missing').show("slow").delay(3000).hide("slow");
            validite=false;
       }
              
        if($scope.lesFichiers==null){
            $('#'+formulaire+' .missing-file').show("slow").delay(3000).hide("slow");
            validite=false;           
        }
        
        return validite;
        
    };
    $scope.completerDocument=function(){
        $scope.document.employe=$scope.employe;
        var e=new Date();
        e.setFullYear(e.getFullYear()+$scope.document.typeDocument.dureeArchivage);
        $scope.document.echeance=e;  
        
        
    };
    
    $scope.addDocument=function(){
        Document.add($scope.document).success(function(){
            
            if($scope.finUpload==true){
                //Utile lorsqu'il y a plusieurs documents a enregistrer pour une seule table(formation,situation matri ...)
                $scope.document={id:"",dateEnregistrement:$scope.today};
                $scope.cancelFileUpload();
                $scope.listerMesDocuments();
            }
            
            
        }).error(function () {
            alert('Une erreur est survenue : add document');
        });
        
    };
    
    $scope.uploadDocument=function(fichiers){
        $scope.finUpload=false;
        for(var i=0;i<fichiers.files.length;i++){
            $scope.uploadedFile=fichiers.files[i];
            var format=$scope.uploadedFile.name.split(".");
            format=format[format.length-1];
            var fd = new FormData();
            fd.append($scope.employe.numeroCni, $scope.uploadedFile);
            UploadFile.uploadDocument(fd).success(function(data){
                $scope.document.emplacement=data;
                $scope.addDocument();
            })
            .error(function(){
                alert("erreur lors de l'enregistrement du document");
            });
        }
        $scope.finUpload=true;
        UploadFile.resetHttp();
        
    };
    
    
    
    $scope.visualiserDocument=function(lien){
        window.open(lien);
    };
    
    /*Gestion des documents electroniques*/
        
        
    
});