(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.localisation', [   
            'app.population.ddb.localisation.fokontany',     
            'app.population.ddb.localisation.commune',
            'app.population.ddb.localisation.district',
            'app.population.ddb.localisation.region'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('population.ddb.localisation', {
            title : 'Localisation',
            icon  : 'icon-map-marker-multiple',
            weight: 6
        });
    }

})();
