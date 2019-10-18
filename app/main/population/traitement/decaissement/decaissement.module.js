(function ()
{
    'use strict';

    angular
        .module('app.population.traitement.decaissement', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_saisie_decaissement', {
            url      : '/traitement/décaissement',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/traitement/decaissement/decaissement.html',
                    controller : 'DecaissementController as vm'
                }
            },
            bodyClass: 'decaissement',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Décaissement"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.traitement.decaissement', {
            title: 'Suivi Décaissement',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_saisie_decaissement',
			weight: 3
        });
    }

})();
