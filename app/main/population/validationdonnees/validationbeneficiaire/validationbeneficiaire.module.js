(function ()
{
    'use strict';

    angular
        .module('app.population.validationdonnees.validationbeneficiaire', [])
        .run(Donnees_non_validees)
        .config(config);
	var nombre_non_valides={};
    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_validationdonnees_validationbeneficiaire', {
            url      : '/validationdonnees/validation-bénéficiaire',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/validationdonnees/validationbeneficiaire/validationbeneficiaire.html',
                    controller : 'ValidationbeneficiaireController as vm'
                }
            },
            bodyClass: 'validationbeneficiaire',
            data : {
              authorizer : true,
              permitted : ["ADMIN","VLD"],
              page: "Validation-bénéficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.validationdonnees.validationbeneficiaire', {
            title: 'Bénéficiaire',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_validationdonnees_validationbeneficiaire',
            badge: nombre_non_valides,
			weight: 1
        });
    }
	function Donnees_non_validees(loginService,$interval,$cookieStore,apiFactory,apiUrl) {
		var bla = $.post(apiUrl + "validationbeneficiaire/recuperer_nombre_liste_beneficiaire_non_valides",{
			},function(data) {  
				nombre_non_valides.content = data ;
				nombre_non_valides.color = '#F44336' ;
			});
            $interval(function(){			
				var bla1 = $.post(apiUrl + "validationbeneficiaire/recuperer_nombre_liste_beneficiaire_non_valides",{
					},function(data) {  
						if (nombre_non_valides.content != data) {
							nombre_non_valides.content = data ;
							nombre_non_valides.color = '#F44336' ;
						};
					});
			},150000) ;			
	}

})();
