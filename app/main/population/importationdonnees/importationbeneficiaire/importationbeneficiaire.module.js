(function ()
{
    'use strict';

    angular
        .module('app.population.importationdonnees.importationbeneficiaire', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_importationdonnees_importationbeneficiaire', {
            url      : '/importationdonnees/importation-bénéficiaire',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/importationdonnees/importationbeneficiaire/importationbeneficiaire.html',
                    controller : 'ImportationbeneficiaireController as vm'
                }
            },
            bodyClass: 'importationbeneficiaire',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN","VLD"],
              page: "Importation-bénéficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.importationdonnees.importationbeneficiaire', {
            title: 'Importation bénéficiaire',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_importationdonnees_importationbeneficiaire',
			weight: 1
        });
    }

})();
