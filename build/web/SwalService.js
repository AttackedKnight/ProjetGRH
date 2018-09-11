/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('globalModule').factory('SweetAlert', function () {
return{

simpleNotification: function (type, titre, texte) {
swal({
type: type,
        title: titre,
        text: texte
});
        return;
},
        notificationAvecSuggestion: function (type, titre, texte, action) {
        swal({
        type: type,
                title: titre,
                text: texte,
                footer: action,
        });
                return;
        },
        finirChargementSucces: function (texte) {
        const toast = swal.mixin({
        toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
        });
                toast({
                type: 'success',
                        title: texte
                })
                return;
        },
        finirChargementEchec: function (texte) {
        const toast = swal.mixin({
        toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000
        });
                toast({
                type: 'error',
                        title: texte
                })
                return;
        },
        attendreChargement: function () {
        return;
        },
        attendreTraitement: function (titre, texte) {

                swal({
                title: titre,
                        html: texte,
                        allowOutsideClick: false,
                        onOpen: () => {
                swal.showLoading()
                }
                });
                return;
        },
        confirmerAction: function (titre, texte) {
<<<<<<< HEAD
              
            return swal({
=======
            
           return swal({
>>>>>>> 9ff7b6e1bc990209781d90294c9b9174e1700adf
                title: titre,
                text: texte,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: "Oui",
                cancelButtonColor: '#d33',
                cancelButtonText: "Annuler",
                focusCancel: true
            }).then((result) => {
                if (result.value) {
                    return true;
                }
                return false;
            });
            
            
        }
};
        });
