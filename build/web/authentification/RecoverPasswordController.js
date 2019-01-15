/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('AuthentificationModule').controller('RecoverPasswordController', function ($scope, Securite,
        Connexion, Securite, $cookies, SweetAlert, Mail)
{
    (function init() {  //Lanc?e a chaque fois que la page est affich?e
        Securite.hide();
        Connexion.clearCredentials();
    })();

    $scope.controlForm = function () {
        if ($scope.email == null || $scope.email == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            $scope.checkUtilisateur();
        }
    };

    $scope.checkUtilisateur = function () {
        Connexion.setAdminCredentials({login:"superadmin" , motDePasse:"superadmin"});    //Utile pour authentifier la requete
        Connexion.checkUtilisateur($scope.email).success(function (data) {
            if (parseInt(data) != 0) {
//                //Creer une cookies pour garder l'email du compte dont le mdp est à reinitialiser.
//                //Elle servira dans la phase de 
//                //reinitialisation(NewPasswordController.js) du mot de passe a identifier le compte a mettre a jour
//                var cookieExp = new Date();
//                cookieExp.setDate(cookieExp.getDate()+1);   //Expire au bout d'un jour
//                $cookies.putObject('newPasswordAccountEmail', $scope.email, {expires: cookieExp});
                           
                
                $scope.envoyerMail(parseInt(data));
            } else {
                SweetAlert.simpleNotification("error", "Erreur", "Cet adresse n'existe pas");
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la vérification de l'adresse");
        });
    };

    $scope.envoyerMail = function (data) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        
        var lien_reinitialisation = "http://localhost:33967" + chemin + "/#/authentification/"+data+"/newpassword";

        var corps = "\tUNIVERSITE DE THIES \nDIRECTON DES RESSOURCES HUMAINES ET DE LA FORMATION\n\n";
        corps+="Bonjour , veuillez cliquer sur le lien suivant pour\n\
 réinitialiser votre mot de passe :\n\n" + lien_reinitialisation;

        var msg = 'to=' + $scope.email + '&objet=Réinitialisation mot de passe&body=' + corps;

        
        Mail.sendEmail(msg).success(function () {
            Connexion.clearAdminCredentials();
            Mail.resetHttp();
            SweetAlert.simpleNotification("success", "Succes", "Un message a été envoyé dans votre boite email !");
        }).error(function () {
            Connexion.clearAdminCredentials();
            Mail.resetHttp();
            SweetAlert.simpleNotification("error", "Erreur", "L'envoi du mail a échoué");
        });
        
        $scope.email = "";
        
    };
});
