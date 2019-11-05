(function ()
{
    'use strict';

    angular
        .module('app.population.systeme_protection_social.repartition_age_sexe_beneficiaire', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_systeme_protection_social_repartition_age_sexe_beneficiaire', {
            url      : '/systeme_protection_social',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/systeme_protection_social/repartition_age_sexe_beneficiaire/repartition_age_sexe_beneficiaire.html',
                    controller : 'Repartition_age_sexe_beneficiaireController as vm'
                }
            },
            bodyClass: 'repartition_age_sexe_beneficiaire',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "repartition_age_sexe_beneficiaire"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.systeme_protection_social.repartition_age_sexe_beneficiaire', {
            title: 'repartition_age_sexe_beneficiaire',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_systeme_protection_social_repartition_age_sexe_beneficiaire',
			  weight: 10
        });
    }

})();
