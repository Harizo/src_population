(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.ddbvariable', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_ddbvariable', {
            url      : '/donnees-de-base/variable',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/ddbvariable/ddbvariable.html',
                    controller : 'VariableController as vm'
                }
            },
            bodyClass: 'ddbvariable',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "ddbvariable"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.ddbvariable', {
            title: 'Variable/Intervention',
            icon  : 'icon-map-marker-circle',
            state: 'app.population_ddb_ddbvariable',
			weight: 6
        });
    }

})();
