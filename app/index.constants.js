(function ()
{
    "use strict";

    angular
        .module("fuse")
		.constant("apiUrl", "http://localhost/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://localhost/2019/population/")
		.constant("apiUrlvalidation", "validationdonnees/");
	/*	.constant("apiUrl", "http://192.168.88.200/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://192.168.88.200/2019/population/")*/
   /* .constant("apiUrl", "http://196.192.38.40/2019/population/api/index.php/api/")
    .constant("apiUrlbase", "http://196.192.38.40/2019/population/");*/
		/*.constant("apiUrl", "http://192.168.88.186:8080/2017/population/api/index.php/api/")
		.constant("apiUrlbase", "http://192.168.88.186:8080/2017/population/");*/

		
})();
