(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.ddbprojet', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_ddbprojet', {
            url      : '/donnees-de-base/programme',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/ddbprojet/ddbprojet.html',
                    controller : 'DdbprojetController as vm'
                }
            },
            bodyClass: 'ddbprojet',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "DDB-Programme"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.ddbprojet', {
            title: 'Programme',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_ddb_ddbprojet',
			weight: 3
        });
    }

})();
