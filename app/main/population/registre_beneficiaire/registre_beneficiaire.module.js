(function ()
{
    'use strict';

    angular
        .module('app.population.registre_beneficiaire', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_registre_beneficiaire', {
            url      : '/registre_beneficiaire',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/registre_beneficiaire/registre_beneficiaire.html',
                    controller : 'registre_beneficiaireController as vm'
                }
            },
            bodyClass: 'registre_beneficiaire',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "registre_beneficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.registre_beneficiaire', {
            title: 'Registre beneficiaire',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_registre_beneficiaire',
            weight: 3
        });
    }

})();