(function ()
{
    'use strict';

    angular
        .module('app.population', [
            'app.population.accueil',
           'app.population.auth.login',
            'app.population.auth.register',
            'app.population.auth.forgot-password',
            'app.population.auth.reset-password',
            'app.population.auth.lock',
            'app.population.administration',
            'app.population.ddb'
       ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider, $mdDateLocaleProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('population', {
            title : 'Menu Principale',
            group : true,
            weight: 1
        });

         $mdDateLocaleProvider.formatDate = function(date) {
            return date ? moment(date).format('DD/MM/YYYY') : new Date(NaN);
        };
  
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    }
})();