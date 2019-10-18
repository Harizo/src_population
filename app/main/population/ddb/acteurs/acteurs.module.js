(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.acteurs', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_acteurs', {
            url      : '/donnees-de-base/acteurs',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/acteurs/acteurs.html',
                    controller : 'ActeursController as vm'
                }
            },
            bodyClass: 'acteurs',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Acteurs-Type transfert"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.acteurs', {
            title: 'Acteurs/Type transfert',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_ddb_acteurs',
			weight: 3
        });
    }

})();
