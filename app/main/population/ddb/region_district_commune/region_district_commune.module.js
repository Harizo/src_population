(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.region_district_commune', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_region_district_commune', {
            url      : '/donnees-de-base/region_district_commune',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/region_district_commune/region_district_commune.html',
                    controller : 'Region_district_communeController as vm'
                }
            },
            bodyClass: 'region_district_commune',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "region_district_commune"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.region_district_commune', {
            title: 'Découpage administratif',
            icon  : 'icon-map-marker-circle',
            state: 'app.population_ddb_region_district_commune',
			weight: 4
        });
    }

})();
