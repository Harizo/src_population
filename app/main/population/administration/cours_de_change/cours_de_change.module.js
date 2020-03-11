(function ()
{
    'use strict';

    angular
        .module('app.population.administration.cours_de_change', [])              
        .config(config);
        var vs = {};
    
    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_admin_cours_de_change', {
            url      : '/administration/cours-devise',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/administration/cours_de_change/cours_de_change.html',
                    controller : 'CoursdechangeController as vm'
                }
            },
            bodyClass: 'cours_de_change',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Cours-de-change"
            }
        });

        

        // Navigation
        msNavigationServiceProvider.saveItem('population.administration.cours_de_change', {
            title: 'Cours de change',
            icon  : 'icon-package-variant',
            state: 'app.population_admin_cours_de_change'
        });
    }

})();
