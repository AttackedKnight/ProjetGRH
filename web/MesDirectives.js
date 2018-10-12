/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*Directive gerant la confirmation d'un mot de passe*/

angular.module('globalModule').directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        };
    }]);

//angular.module('globalModule').directive('select', function(){
//    return {
//        link: function(scope, elm){
//            console.log('eee', elm);
//            elm.css('color', 'red');
//        }
//    }
//});