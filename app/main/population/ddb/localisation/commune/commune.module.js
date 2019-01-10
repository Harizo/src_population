(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.localisation.commune', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_localisation_commune', {
            url      : '/donnees-de-base/localisation/commune',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/localisation/commune/commune.html',
                    controller : 'CommuneController as vm'
                }
            },
            bodyClass: 'commune',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Commune"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.localisation.commune', {
            title: 'Commune',
            icon  : 'icon-tile-four',
            state: 'app.population_ddb_localisation_commune',
			weight: 3
        });
    }

})();
