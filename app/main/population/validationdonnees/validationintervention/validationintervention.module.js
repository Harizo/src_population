(function ()
{
    'use strict';

    angular
        .module('app.population.validationdonnees.validationintervention', [])
        .run(Donnees_non_validees)
        .config(config);
	var nombre_non_valides={};

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_validationdonnees_validationintervention', {
            url      : '/validationdonnees/validation-intervention',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/validationdonnees/validationintervention/validationintervention.html',
                    controller : 'ValidationinterventionController as vm'
                }
            },
            bodyClass: 'validationintervention',
            data : {
              authorizer : true,
              permitted : ["ADMIN","VLD"],
              page: "Validation-intervention"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.validationdonnees.validationintervention', {
            title: 'Suivi Intervention',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_validationdonnees_validationintervention',
            badge: nombre_non_valides,
			weight: 2
        });
    }
	function Donnees_non_validees(loginService,$interval,$cookieStore,apiFactory,apiUrl) {
		var bla = $.post(apiUrl + "validationbeneficiaire/recuperer_nombre_liste_intervention_non_valides",{
			},function(data) {  
				nombre_non_valides.content = data ;
				nombre_non_valides.color = '#F44336' ;
			});
            $interval(function(){			
				var bla1 = $.post(apiUrl + "validationbeneficiaire/recuperer_nombre_liste_intervention_non_valides",{
					},function(data) {  
						if (nombre_non_valides.content != data) {
							nombre_non_valides.content = data ;
							nombre_non_valides.color = '#F44336' ;
						};
					});
			},150000) ;			
	}

})();
