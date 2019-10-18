(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.ddbbeneficiaire', [   
            'app.population.ddb.ddbbeneficiaire.possession',     
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('population.ddb.ddbbeneficiaire', {
            title : 'Bénéficiaire',
            icon  : 'icon-map-marker-multiple',
            weight: 3
        });
    }

})();
