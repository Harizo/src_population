(function ()
{
    'use strict';

    angular
        .module('app.population.environment_demo_socio', [	
            'app.population.environment_demo_socio.effectif_age_sexe_population',		
           'app.population.environment_demo_socio.effectif_menage_enfant'
            ])        
        .config(config);
        var vs ;

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('population.environment_demo_socio', {
            title : 'Environment demo_socio',
            icon  : 'icon-data',
            weight: 2
        });


    }

})();
