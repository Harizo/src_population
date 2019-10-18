(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.ddbbeneficiaire.possession', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_ddbbeneficiaire', {
            url      : '/donnees-de-base/bénéficiaire/possession',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/ddbbeneficiaire/possession/possession.html',
                    controller : 'PossessionController as vm'
                }
            },
            bodyClass: 'possession',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Région"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.ddbbeneficiaire.possession', {
            title: 'Possession',
            icon  : 'icon-tile-four',
            state: 'app.population_ddb_ddbbeneficiaire',
			weight: 1
        });
    }

})();
