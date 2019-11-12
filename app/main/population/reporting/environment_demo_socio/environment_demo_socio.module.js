(function ()
{
    'use strict';

    angular
        .module('app.population.reporting.environment_demo_socio', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_reporting_environment_demo_socio', {
            url      : '/reporting/environment_demo_socio',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/reporting/environment_demo_socio/environment_demo_socio.html',
                    controller : 'Environment_demo_socioController as vm'
                }
            },
            bodyClass: 'environment_demo_socio',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "environment_demo_socio"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.reporting.environment_demo_socio', {
            title: 'environment_demo_socio',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_reporting_environment_demo_socio',
            weight: 1
        });
    }

})();