(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.localisation.district', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_localisation_district', {
            url      : '/donnees-de-base/localisation/district',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/localisation/district/district.html',
                    controller : 'DistrictController as vm'
                }
            },
            bodyClass: 'district',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "District"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.localisation.district', {
            title: 'District',
            icon  : 'icon-tile-four',
            state: 'app.population_ddb_localisation_district',
			weight: 2
        });
    }

})();
