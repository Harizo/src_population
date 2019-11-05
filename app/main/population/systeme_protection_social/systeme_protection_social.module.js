(function ()
{
    'use strict';

    angular
        .module('app.population.systeme_protection_social', [	
            'app.population.systeme_protection_social.repartition_age_sexe_beneficiaire',		
          // 'app.population.systeme_protection_social.effectif_menage_enfant'
            ])        
        .config(config);
        var vs ;

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('population.systeme_protection_social', {
            title : 'Système de protection social',
            icon  : 'icon-data',
            weight: 2
        });


    }

})();
