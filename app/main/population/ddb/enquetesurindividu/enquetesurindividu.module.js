(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.enquetesurindividu', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_enquetesurindividu', {
            url      : '/donnees-de-base/enquete-sur-individu',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/enquetesurindividu/enquetesurindividu.html',
                    controller : 'EnquetesurindividuController as vm'
                }
            },
            bodyClass: 'enquetesurindividu',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Enquête/Individu"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.enquetesurindividu', {
            title: 'Enquête/Individu',
            icon  : 'icon-tile-four',
            state: 'app.population_ddb_enquetesurindividu',
			weight: 2
        });
    }

})();
