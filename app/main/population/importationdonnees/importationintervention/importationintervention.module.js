(function ()
{
    'use strict';

    angular
        .module('app.population.importationdonnees.importationintervention', [])
        .run(Donnees_non_importees)
        .config(config);
	var nombre_non_importes={};

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_importationdonnees_importationintervention', {
            url      : '/importationdonnees/importation-intervention',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/importationdonnees/importationintervention/importationintervention.html',
                    controller : 'ImportationinterventionController as vm'
                }
            },
            bodyClass: 'importationintervention',
            data : {
              authorizer : true,
              permitted : ["IMP","ADMIN","VLD"],
              page: "Importation-intervention"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.importationdonnees.importationintervention', {
            title: 'Suivi Intervention',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_importationdonnees_importationintervention',
            badge: nombre_non_importes,
			weight: 2
        });
    }
	function Donnees_non_importees(loginService,$interval,$cookieStore,apiFactory,apiUrl) {
		var bla = $.post(apiUrl + "importationbeneficiaire/recuperer_nombre_liste_intervention_non_importes",{
			},function(data) {  
				nombre_non_importes.content = data ;
				nombre_non_importes.color = '#F44336' ;
			});
            $interval(function(){			
				var bla1 = $.post(apiUrl + "importationbeneficiaire/recuperer_nombre_liste_intervention_non_importes",{
					},function(data) {  
						if (nombre_non_importes.content != data) {
							nombre_non_importes.content = data ;
							nombre_non_importes.color = '#F44336' ;
						};
					});
			},150000) ;			
	}
})();
