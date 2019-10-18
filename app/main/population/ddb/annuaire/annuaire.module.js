(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.annuaire', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_annuaire', {
            url      : '/donnees-de-base/annuaire',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/annuaire/annuaire.html',
                    controller : 'AnnuaireController as vm'
                }
            },
            bodyClass: 'annuaire',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Annuaire Intervention"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.annuaire', {
            title: 'Annuaire Intervention',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_ddb_annuaire',
			weight: 5
        });
    }

})();
