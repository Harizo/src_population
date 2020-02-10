(function ()
{
    'use strict';

    angular
        .module('app.population.administration.historiqueutilisateur', [])              
        .config(config);
        var vs = {};
    
    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_admin_historiqueutilisateur', {
            url      : '/administration/historiqueutilisateur',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/administration/historiqueutilisateur/historiqueutilisateur.html',
                    controller : 'HistoriqueutilisateurController as vm'
                }
            },
            bodyClass: 'historiqueutilisateur',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Historique_utilisateur"
            }
        });

        

        // Navigation
        msNavigationServiceProvider.saveItem('population.administration.utilisateurs.historiqueutilisateur', {
            title: 'Historique utilisateur',
            icon  : 'icon-package-variant',
            state: 'app.population_admin_historiqueutilisateur',
			weight: 2
        });
    }

})();
