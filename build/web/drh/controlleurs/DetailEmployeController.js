/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('DetailEmployeController',function($scope,$q,Securite,HistoriqueGrade,Classe,Categorie,Niveau,Corps,Echelon,$routeParams,Avancement,UploadFile,Typedocument,Situation,Entite,$rootScope,Syndicat,Diplome,MutuelleSante,Formation,Employe,Contact,Adresse,Servir,MembreMutuelle,Grade,Fonction,Typecontrat,Document,Connexion)
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
    
    /*RECUPERATION DES INFORMATIONS DE L'EMPLOYE*/
    
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
        $scope.historiqueGrade={id:"",employe:$scope.employe,encours:1};
        
        if($scope.employe.syndicat){
            $scope.currentSyndicat=$scope.employe.syndicat.id;
        }
        if($scope.employe.typeEmploye.code=='PATS'){
            Syndicat.findSyndicatPats().success(function (data) {
                $scope.syndicats=data;  
            }).error(function () {
                alert('Une erreur est survenue');
            });
        }
        if($scope.employe.typeEmploye.code=='PER'){
            Syndicat.findSyndicatPer().success(function (data) {
                $scope.syndicats=data;  
            }).error(function () {
                alert('Une erreur est survenue');
            });
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
        $scope.listerHistoriqueAvancement();
        
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
                
                if(data){
                    $scope.mon_responsable=data.employe.civilite.code+' '+data.employe.prenom +' '+(data.employe.nom).toUpperCase();;
                }
                else{
                    $scope.mon_responsable="";
                }
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
                        console.log(data);
                        if(!data){
                            $scope.ajouterNouvelPoste();
                        }
                        else{
                            
                            $('.conflit-poste').show("slow").delay(3000).hide("slow");
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
   
   /*                     AVANCEMENT                                 */

   $scope.showGradeList=false;
   
   $scope.toggleGradeList=function(){
       $scope.showGradeList=!$scope.showGradeList;
       
   };
   
    $scope.getCategorieAndNiveauClasse=function(){    

        $scope.classeSelectionnee=$('#classe').val();
        $scope.gradeClasse=$scope.classes[parseInt($scope.classeSelectionnee)-1];

        var req_cat_niv=[];
        req_cat_niv.push(Grade.compterPatsCategorieClasse($scope.classeSelectionnee));
        req_cat_niv.push(Grade.compterPatsNiveauClasse($scope.classeSelectionnee));

        $q.all(req_cat_niv).then(function(result){

            $scope.categorieClasse=result[0].data;
            $scope.niveauClasse=result[1].data;
        });
    };
    
    $scope.getClasseCorps=function(){     
//        $scope.gradeCorps=$scope.corps[parseInt($scope.corpsSelectionnee)];
        $scope.corpsSelectionnee=$('#corps').val();;      
        $scope.gradeCorps=$scope.corps[parseInt($scope.corpsSelectionnee)];
        
        var req_classe_corps=[];
        var choix=parseInt($scope.corpsSelectionnee);
        
        switch (choix){

            case 0:
                req_classe_corps.push(Grade.compterPerClasseCorps("Assistant"));
                break;
            case 1:
                req_classe_corps.push(Grade.compterPerClasseCorps("Maître de conférence"));
                break;
            case 2:
                req_classe_corps.push(Grade.compterPerClasseCorps("Professeur"));
                break;
        }

        $q.all(req_classe_corps).then(function(result){

            $scope.classeCorps=result[0].data;

        });
    };
    $scope.listerGrade=function(arg){
        if($scope.employe.typeEmploye.code=='PATS'){
        
            $scope.classes=[];
            $scope.gradeClasse=[];
            var req_classes=[];
            $scope.categorieClasse=[];
            $scope.niveauClasse=[];
            $scope.classeSelectionnee=arg;

            for(var i=1;i<=4;i++){
                req_classes.push(Grade.findPatsClasse(i));
            }

            $q.all(req_classes).then(function(result){
                for(var i=0;i<result.length;i++){
                    $scope.classes[i]=result[i].data;           
                }

                $scope.getCategorieAndNiveauClasse();
            });  
        }
        
        if($scope.employe.typeEmploye.code=='PER'){

            $scope.corps=[];
            var req_corps=[];
            $scope.classeCorps=[];
            $scope.gradeCorps=[];

            $scope.corpsSelectionnee=arg;

            req_corps.push(Grade.findPerCorps("Assistant"));
            req_corps.push(Grade.findPerCorps("Maître de conférence"));
            req_corps.push(Grade.findPerCorps("Professeur"));


            $q.all(req_corps).then(function(result){
                for(var i=0;i<result.length;i++){
                    $scope.corps[i]=result[i].data;           
                }
                
                $scope.getClasseCorps();
            });          
        }
   };
   
    
    
   
   $scope.listerHistoriqueAvancement=function(){
        HistoriqueGrade.findByEmploye($scope.employe).success(function (data) {
            $scope.grades=data;         
            $scope.gradeActu=$scope.grades[0];
//            console.log($scope.gradeActu)
            $scope.listerGrade();    
            
            var selection="";
            
            if($scope.gradeActu){
                if($scope.employe.typeEmploye.code=="PATS"){
                    selection=$scope.gradeActu.grade.classe.libelle;

                }
                if($scope.employe.typeEmploye.code=="PER"){
                    if($scope.gradeActu.grade.corps.libelle=="Assistant"){
                        selection="0";
                    }
                    if($scope.gradeActu.grade.corps.libelle=="Maître de conférence"){
                        selection="1";
                    }
                    if($scope.gradeActu.grade.corps.libelle=="Professeur"){
                        selection="2";
                    }

                }
            }
            else{
                if($scope.employe.typeEmploye.code=="PATS"){
                    selection="1";
                }
                if($scope.employe.typeEmploye.code=="PER"){
                    selection="0";
                }
            }
            

            $scope.listerGrade(selection);
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };

    
    
    $scope.controlGradeForm=function(){
        var validite=true;
        if(!$scope.historiqueGrade.grade || $scope.historiqueGrade.grade==null){
            $('#grade-not-selected').show("slow").delay(3000).hide("slow");
            validite=false;
        }
   
        if(validite===true){
            $scope.ajouterGrade();
        }
        
    };
    
    $scope.ajouterGrade=function (){
        
        var datePassation=new Date();
        var dateProchainAvancement=new Date();
        
        dateProchainAvancement.setFullYear(dateProchainAvancement.getFullYear()+$scope.historiqueGrade.grade.duree);
        
        $scope.historiqueGrade.datePassation=datePassation;
        $scope.historiqueGrade.dateProchainAvancement=dateProchainAvancement;
        
        if($scope.gradeActu){
            $scope.gradeActu.encours=false;
            HistoriqueGrade.edit($scope.gradeActu).success(function(){
                HistoriqueGrade.add($scope.historiqueGrade).success(function(){ 
                    $scope.listerHistoriqueAvancement();
                    $scope.reinitialiserFormulaireAvancement();          
                }).error(function () {
                    alert('Une erreur est survenue : grade add');
                });
            }).error(function () {
                alert('Une erreur est survenue : grade update');
            });
        }
        else{
            HistoriqueGrade.add($scope.historiqueGrade).success(function(){ 
                $scope.listerHistoriqueAvancement();
                $scope.reinitialiserFormulaireAvancement();          
            }).error(function () {
                alert('Une erreur est survenue : grade add');
            });
        }
        
    };

    $scope.reinitialiserFormulaireAvancement=function(){
        $scope.historiqueGrade={id:"",employe:$scope.employe,encours:1};          
    };
   
    /*                     AVANCEMENT                                 */
   
   
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
                
                if($scope.diplomante==true){
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
    
    /*Permet de completer le document en referencant la formation a laquelle elle se rapporte
     * Elle est appele apres que la formation soit ajoutee dans la base de donnees et recuperer*/
    $scope.completerDocumentFormation=function(){
        $scope.document.formation=$scope.lastFormation;
        
        $scope.completerDocument();   

        
        $scope.uploadDocument($scope.lesFichiers);
        
        $scope.nouvelleFormation=false;
    };
    $scope.completeFormation=function(){
        Console.log("complete formation avac diplome")
        Diplome.findByLibelle($scope.diplome.nom).success(function(data){
            console.log("Data "+data)
            if(!data){
                Diplome.add($scope.diplome).success(function(){
                    Diplome.findByLibelle($scope.diplome.nom).success(function(data){
                         $scope.formation.diplome=data;
                         console.log("Diplome ajoute et recuperer "+$scope.formation)
                        $scope.addFormation();                                
                     }).error(function () {
                         alert('Une erreur est survenue:find diplome');
                     });
                 }).error(function () {
                     alert('Une erreur est survenue:add diplome');
                 });
                
            }else{
                $scope.formation.diplome=data;
                console.log("Diplome recupere "+$scope.formation)
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
    
//    $scope.options = {
//        rowHeight: 50,
//        headerHeight: 50,
//        footerHeight: 50,
//        scrollbarV: true,
//        selectable: true,
//        reorderable:true,
//        checkboxSelection:false,
//        columnMode:'force',
//        loadingMessage:'Chargement ...',
//        emptyMessage:'Pas de documents'
//    };
    
//   $scope.ecouteRecherche=function(data){
//        $scope.prev = function(ev){
//            ev.stopPropagation();
//        };
//
//        $scope.$watch('filterKeywords', function(newVal) {
//            if(!data)return;
//            $scope.documents = data.filter(function(d) {
//              console.log(d.name, d.name.indexOf(newVal));
//              return d.name.toLowerCase().indexOf(newVal) !== -1 || !newVal;
//            });
//        });
//   };
//    
     $scope.firstLoading=true;    
    $scope.listerMesDocuments=function(){
        Document.findByEmploye($scope.employe).success(function (data) {           
            $scope.documents=$scope.docs=data;
            
//            $scope.ecouteRecherche($scope.documents);
            
            if($scope.firstLoading==true){
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
                $scope.firstLoading=false;
            }else{
                
                console.log('yes');
//               $('.tab-content table').dataTable().ajax.reload( null, false );
//                $('.tab-content table').dataTable().refreshTable();
               
            }
            
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
    
    /*Complete les autre information sur le document : l'employe, la date d'echeance, ...*/
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
    
    /*Gerer l'upload de fichier*/
    
    $scope.uploadDocument=function(fichiers){
        $scope.finUpload=false;
        for(var i=0;i<fichiers.files.length;i++){   //  Parcour des fichier a uploader
            $scope.uploadedFile=fichiers.files[i];
            var format=$scope.uploadedFile.name.split("."); //Recuperation du format
            format=format[format.length-1];
            var fd = new FormData();                //Creation d'un objet FormData
            fd.append($scope.employe.numeroCni, $scope.uploadedFile);   //Ajout du fichier et de son emplacement au FormData
            UploadFile.uploadDocument(fd).success(function(data){   //Appel du service(Objet java) charger d'uploader le fichier : la requete retourne le nom du fichier
                $scope.document.emplacement=data;
                $scope.addDocument();               //Ajout dans la base de donnees
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
	
	
	
/*	Set the data and the options in your controller:

```javascript
    module.controller('HomeController', function($scope){
      $scope.options = {
        scrollbarV: false
      };

      $scope.data = [
        { name: 'Austin', gender: 'Male' },
        { name: 'Marjan', gender: 'Male' }
      ];
    });
```

then using expressive markup in your template:

```html
    <dtable options="options" rows="data" class="material dt">
      <column name="Name" width="300" flex-grow="2"></column>
      <column name="Gender">
        <strong>{{$row.name}}</strong>: {{$cell}}
      </column>
    </dtable>
```  */
    
    /*Gestion des documents electroniques*/
        
        
    
});