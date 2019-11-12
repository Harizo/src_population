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
            url      : '/importationdonnees/importation-bénéficiaire',
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
              page: "Importation-bénéficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.importationdonnees.importationintervention', {
            title: 'Intervention',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_importationdonnees_importationintervention',
            badge: nombre_non_importes,
			weight: 2
        });
    }
	function Donnees_non_importees(loginService,$cookieStore,apiFactory,apiUrl) {
		var bla = $.post(apiUrl + "importationbeneficiaire/recuperer_nombre_liste_intervention_non_importes",{
			},function(data) {  
				var x = data;
				nombre_non_importes.content = x ;
				nombre_non_importes.color = '#F44336' ;
				console.log(x);
			});
	}

})();