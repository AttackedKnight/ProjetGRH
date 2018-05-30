/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('globalModule',['ngRoute','ngMessages','EmployeModule','ngCookies','angularFileUpload','DrhModule','ParametrageModule','AuthentificationModule','StatistiqueModule','ServiceModule']);

/*Sur serveur*/
//var chemin="https://10.157.20.203:8181/ProjetGRH"; 
/*En local*/
var chemin="http://localhost:8080/ProjetGRH";


//angular.module('globalModule',['ngRoute','ngMessages','ngCookies','angularFileUpload','DrhModule','ParametrageModule','StatistiqueModule','AuthentificationModule']);
//var chemin="http://localhost:8080/ProjetGRH"; 

window.onload=function() {
  horloge('div_horloge');
  afficherDate();
};
 
function horloge(el) {
    if(typeof el=="string"){
        el = document.getElementById(el);
    }
    function actualiser() {
        var date = new Date();
        var str = date.getHours();
        str += ':'+(date.getMinutes()<10?'0':'')+date.getMinutes();
    //    str += ':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
        el.innerHTML = str;
    }
    actualiser();
    setInterval(actualiser,1000);
}

function afficherDate(){
    
    var mois=['Janvvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
    
    var date = new Date();
    var strDate="";
    var j=date.getDay();
    
    var d=date.getDate();
    var m=date.getMonth();
    var y=date.getFullYear();
    
    switch (j){
        case 1:
            strDate+="Lundi, ";
            break;
        case 2:
            strDate+="Mardi, ";
            break;
        case 3:
            strDate+="Mercredi, ";
            break;
        case 4:
            strDate+="Jeudi, ";
            break;
        case 5:
            strDate+="Vendredi, ";
            break;
        case 6:
            strDate+="Samedi, ";
            break;
        case 7:
            strDate+="Dimanche, ";
            break;
    }
    
    strDate+=d+" "+mois[m]+" "+y;
    
    $('#date_block').html(strDate);
    
    
}