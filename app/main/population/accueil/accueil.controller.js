(function ()
{
    'use strict';

    angular
        .module('app.population.accueil')
        .controller('AccueilController', AccueilController);

    /** @ngInject */
    function AccueilController(apiFactory, $cookieStore, loginService)
    {
    	/*var vm = this ;
   
		      let playerSpriteX = 0;

		document.addEventListener('keyup', (e) => {

			console.log(e.keyCode);
			console.log(e);

			if ( e.keyCode== 116) e.preventDefault();*/
		  /*if (e.code === "ArrowUp")        playerSpriteX += 10
		  else if (e.code === "ArrowDown") playerSpriteX -= 10

		  document.getElementById('forms').innerHTML = 'playerSpriteX = ' + playerSpriteX;*/
		//});
		var id_user = $cookieStore.get('id');

		apiFactory.getOne("utilisateurs/index", id_user).then(function(result) 
            {
                var user = result.data.response;
               

                var permission = user.roles;
                var permissions =   [
                                        "SPR_ADM",
                                        "RPT"
                                    ];
                var acces =  loginService.gestionMenu(permissions,permission);  
                console.log(acces);      
                

            });
		
    }
})();
