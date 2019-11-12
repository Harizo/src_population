(function ()
{
    'use strict';

    angular
        .module('app.population.reporting.systeme_protection_social', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_reporting_systeme_protection_social', {
            url      : '/reporting/systeme_protection_social',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/reporting/systeme_protection_social/systeme_protection_social.html',
                    controller : 'Systeme_protection_socialController as vm'
                }
            },
            bodyClass: 'systeme_protection_social',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "systeme_protection_social"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.reporting.systeme_protection_social', {
            title: 'systeme_protection_social',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_reporting_systeme_protection_social',
			weight: 1
        });
    }

})();
