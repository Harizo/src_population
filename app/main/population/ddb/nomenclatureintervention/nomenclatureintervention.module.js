(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.nomenclatureintervention', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_nomenclatureintervention', {
            url      : '/donnees-de-base/nomenclature-intervention',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/nomenclatureintervention/nomenclatureintervention.html',
                    controller : 'NomenclatureinterventionController as vm'
                }
            },
            bodyClass: 'nomenclatureintervention',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "nomenclatureintervention"
            }
        });

        // Navigation
        msNavigationServiceProvider.saveItem('population.ddb.nomenclatureintervention', {
            title: 'Nomenclature intervention',
            icon  : 'icon-map-marker-circle',
            state: 'app.population_ddb_nomenclatureintervention',
			weight: 5
        });
    }

})();
