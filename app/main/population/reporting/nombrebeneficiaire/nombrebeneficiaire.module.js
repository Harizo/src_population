(function ()
{
    'use strict';

    angular
        .module('app.population.reporting.nombrebeneficiaire', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_reporting_nombrebeneficiaire', {
            url      : '/reporting/nombre-bénéficiaire',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/reporting/nombrebeneficiaire/nombrebeneficiaire.html',
                    controller : 'NombrebeneficiaireController as vm'
                }
            },
            bodyClass: 'nombrebeneficiaire',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Nombre bénéficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.reporting.nombrebeneficiaire', {
            title: 'Nombre bénéficiaire',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_reporting_nombrebeneficiaire',
			weight: 1
        });
    }

})();
