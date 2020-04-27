(function ()
{
    "use strict";

    angular
        .module("fuse")

		.constant("apiUrl", "http://localhost/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://localhost/2019/population/")
		.constant('apiUrlExcel', "http://localhost/2019/population/exportexcel/")

		/* SERVEUR Min Pop*/

		/*.constant("apiUrl", "http://192.168.3.7/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://192.168.3.7/2019/population/")
		.constant('apiUrlExcel', "http://192.168.3.7/2019/population/exportexcel/")*/

		/* SERVEUR Min Pop*/
		
		/* SERVEUR Externe ASTRUM*/
			/*.constant("apiUrl", "http://196.192.38.40/2019/population/api/index.php/api/")
			.constant("apiUrlbase", "http://196.192.38.40/2019/population/")
			.constant('apiUrlExcel', "http://196.192.38.40/2019/population/exportexcel/")*/
		/*FIN SERVEUR Externe ASTRUM*/


		/* SERVEUR LOCAL ASTRUM*/
			/*.constant("apiUrl", "http://192.168.88.200/2019/population/api/index.php/api/")
			.constant("apiUrlbase", "http://192.168.88.200/2019/population/")
			.constant('apiUrlExcel', "http://192.168.88.200/2019/population/exportexcel/")*/
		/*FIN SERVEUR LOCAL ASTRUM*/


		/* Telma SERVEUR */
		/*.constant("apiUrl", "http://41.207.51.186/registresocial/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://41.207.51.186/registresocial/2019/population/")
		.constant('apiUrlExcel', "http://41.207.51.186/registresocial/2019/population/exportexcel/")*/
		/*FIN Telma SERVEUR */


		/* Ip public */
		/*.constant("apiUrl", "http://41.188.46.142/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://41.188.46.142/2019/population/")
		.constant('apiUrlExcel', "http://41.188.46.142/2019/population/exportexcel/")*/
		/*FIN Ip public */


		.constant("apiUrlvalidationbeneficiaire", "validationdonnees/beneficiaire/")
		.constant("apiUrlvalidationintervention", "validationdonnees/intervention/")
		.constant("apiUrlrecommandation", "recommandation/")
		.constant("apiUrlcanevasformate", "canevasformate/");

		
})();
