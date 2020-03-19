(function ()
{
    'use strict';

    angular
        .module('app.population.reporting.carte', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_reporting_carte', {
            url      : '/reporting/carte',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/reporting/carte/carte.html',
                    controller : 'carteController as vm'
                }
            },
            bodyClass: 'carte',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "carte"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.reporting.carte', {
            title: 'Carte',
            icon  : 'icon-google-maps',
            state: 'app.population_reporting_carte',
            weight: 2
        });
    }

})();