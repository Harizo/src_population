(function ()
{
    'use strict';

    angular
        .module('app.population.validationdonnees.validationbeneficiaire', [])
        .config(config);

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
              permitted : ["USER","PERSONNEL","ADMIN","VLD"],
              page: "Validation-bénéficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.validationdonnees.validationbeneficiaire', {
            title: 'Validation bénéficiaire',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_validationdonnees_validationbeneficiaire',
			weight: 1
        });
    }

})();
