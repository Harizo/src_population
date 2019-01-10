(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.localisation.region', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_localisation_region', {
            url      : '/donnees-de-base/localisation/region',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/localisation/region/region.html',
                    controller : 'RegionController as vm'
                }
            },
            bodyClass: 'region',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Région"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.localisation.region', {
            title: 'Région',
            icon  : 'icon-tile-four',
            state: 'app.population_ddb_localisation_region',
			weight: 1
        });
    }

})();
