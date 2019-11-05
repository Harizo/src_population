(function ()
{
    'use strict';

    angular
        .module('app.population.environment_demo_socio.effectif_age_sexe_population', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_environment_demo_socio_effectif_age_sexe_population', {
            url      : '/environment_demo_socio',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/environment_demo_socio/effectif_age_sexe_population/effectif_age_sexe_population.html',
                    controller : 'Effectif_age_sexe_populationController as vm'
                }
            },
            bodyClass: 'effectif_age_sexe_population',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "effectif_age_sexe_population"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.environment_demo_socio.effectif_age_sexe_population', {
            title: 'effectif_age_sexe_population',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_environment_demo_socio_effectif_age_sexe_population',
			  weight: 10
        });
    }

})();
