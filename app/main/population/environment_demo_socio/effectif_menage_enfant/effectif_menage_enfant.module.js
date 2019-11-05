(function ()
{
    'use strict';

    angular
        .module('app.population.environment_demo_socio.effectif_menage_enfant', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_environment_demo_socio_effectif_menage_enfant', {
            url      : '/environment_demo_socio',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/environment_demo_socio/effectif_menage_enfant/effectif_menage_enfant.html',
                    controller : 'Effectif_menage_enfantController as vm'
                }
            },
            bodyClass: 'effectif_menage_enfant',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "effectif_menage_enfant"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.environment_demo_socio.effectif_menage_enfant', {
            title: 'effectif_menage_enfant',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_environment_demo_socio_effectif_menage_enfant',
              weight: 10
        });
    }

})();