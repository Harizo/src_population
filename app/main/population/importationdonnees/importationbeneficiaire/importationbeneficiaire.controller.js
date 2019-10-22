(function ()
{
    'use strict';
    angular
        .module('app.population.importationdonnees.importationbeneficiaire')
        .directive('customOnChange', function() {
			return {
				restrict: 'A',
				link: function (scope, element, attrs) {
					var onChangeHandler = scope.$eval(attrs.customOnChange);
					element.bind('change', onChangeHandler);
				}
			};
		})
        .directive('fileModel', ['$parse', function ($parse) {
			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					var model = $parse(attrs.fileModel);
					var modelSetter = model.assign;        
					element.bind('change', function(){
						scope.$apply(function(){
							modelSetter(scope, element[0].files[0]);
							// console.log(element[0].files[0]);
						});
					});
				}
			};
		}])
		.service('fileUpload', ['$http', function ($http) {
			this.uploadFileToUrl = function(file, uploadUrl){
				var fd = new FormData();
				var rep='test';
				fd.append('file', file);
				// console.log(file);
				$http.post(uploadUrl, fd,{
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).success(function(){
					// console.log('tafa');
				}).error(function(){
					// console.log('Rivotra');
				});
			}
		}])
        .controller('ImportationbeneficiaireController', ImportationbeneficiaireController);
    /** @ngInject */
    function ImportationbeneficiaireController(apiFactory, $state, $scope,$cookieStore, $mdDialog,DTOptionsBuilder,apiUrl,$http,fileUpload,apiUrlbase,apiUrlvalidation)  {
        var vm = this;
        var NouvelItem=false;
        var currentItem;
        var typeact="";
        var NouveldonneesavaliderItem=0;
        var  currentdepenseItem;
        vm.selectedListedonneesavaliderItem={};
        vm.myFile={};
        vm.parent_courant={};
        vm.etat="";
        vm.fichier="";
		vm.repertoire="";
		vm.directoryName='';
        vm.typeact={};
        vm.selectedItem = {} ;
        vm.selectedcourant={};
        vm.ajout = ajout ;
        //variale affichage bouton nouveau
        vm.afficherboutonnouveau = 1 ;
        //variable cache masque de saisie
        vm.affichageMasque = 0 ;
        //pour les sous tâches
        vm.affichageMasquestache = 0 ;
        //fin pour les sous tâches
        vm.allActivite = [] ;
        vm.Listevalidationbeneficiaire=[];
		vm.Listebeneficiairevalidees=[];
        vm.allParent = [] ;
        vm.ListeParent = [] ;
		vm.monfichier ='';
        // Data
        vm.dtOptions = {
        dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
        pagingType: 'simple',
        autoWidth : false,
        responsive: true
        };
        // vm.activite_col = [{"titre":"Type de document"}];
        vm.colonne_validation = [{"titre":"Acteur"},{"titre":"Fichier"},{"titre":"Date d'envoi"},{"titre":"Utilisateur"},{"titre":"Action"}];           
        vm.colonne_donnees_validees = [{"titre":"Acteur"},{"titre":"Fichier"},{"titre":"Date d'envoi"},{"titre":"Utilisateur"},{"titre":"Date intégration"},{"titre":"Validateur"}];           
        var id_user = $cookieStore.get('id');
		vm.id_utilisateur = id_user;
        apiFactory.getOne("utilisateurs/index", id_user).then(function(result) {
			vm.nomutilisateur = result.data.response.prenom + ' ' + result.data.response.nom;
			vm.raisonsociale = result.data.response.raison_sociale;
			apiFactory.getAPIgeneraliser("listevalidationbeneficiaire/index","etat",10).then(function(result) {
				vm.Listevalidationbeneficiaire = result.data.response;
			});               
			apiFactory.getAPIgeneraliser("listevalidationbeneficiaire/index","etat",20).then(function(result) {
				vm.Listebeneficiairevalidees = result.data.response;
			});               
        });     
		function formatDate(date) {
			var mois = date.getMonth()+1;
			var dateSQL = (date.getFullYear()+ "/"+ mois + "/" + date.getDate());
			// var dateSQL = (date.getFullYear()+"-"+mois+"-"+date.getDate() + ' ' + date.getHours + ':' + date.getMinutes + ':' + date.getSeconds );
			return dateSQL;

		}
		function parseDate(date) {
			var d = moment(date, 'YYYY-MM-DD', true);
			return d.isValid() ? d.toDate() : new Date(NaN);
		}
        vm.showAlert = function(titre,textcontent) {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(false)
                .parent(angular.element(document.body))
                .title(titre)
                .textContent(textcontent)
                .ariaLabel('Alert Dialog Demo')
                .ok('Fermer')
                .targetEvent()
            );
        } 
        function ajout(activite,suppression) {
            if (NouvelItem==false) {
               // test_existance (activite,suppression);
                insert_in_base(activite,suppression); 
            } else {
                insert_in_base(activite,suppression);
            }
        }
		vm.changerdepense = function (item) {
            vm.depenses.forEach(function(lig) {
                if(lig.id==item.lignebudgetaire) {
                    item.lignebudgetaire = lig.id; 
                    item.lignebudgetaire_id = lig.id; 
                    item.libelledepense = lig.libelle ;
                }
            });
        }
        function insert_in_base(activite,suppression) {         
            //add
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var getId = 0;
            if (NouvelItem==false) {
                getId = vm.selectedItem.id;
            } 
            var datas = $.param({
                supprimer:suppression,
                id:getId,
                resume: activite.resume,
                donnees_validees: activite.donnees_validees,            
                nom_fichier: activite.nom_fichier,
                date_reception: activite.date_reception,
                date_validation: null,
                repertoire: activite.repertoire,
                site_id:vm.site_id,
                id_utilisateur:id_user,
                id_utilisateur_validation:null,
            });
            //factory
            apiFactory.add("listevalidationbeneficiaire/index",datas, config).success(function (data) {
                if (NouvelItem == false) {
                    // Update or delete: id exclu                  
                    if(suppression==0) {
                        vm.afficherboutonModifSupr = 0 ;
                        vm.afficherboutonnouveau = 1 ;
                } else {
                    var item = {
                        num_tdr: activite.num_tdr,
                        projet: activite.projet,
                        objectif: activite.objectif,
                        id:String(data.response) ,
                        date_tdr:activite.date_tdr,
                        site_id:vm.site_id 
                    };     
                    vm.allActivite.push(item);
                    vm.activite.num_tdr='';
                    vm.activite.projet='';
                    vm.activite.objectif='';
                    vm.activite.date_tdr='';                    
                }
                  vm.affichageMasque = 0 ;
              }
            }).error(function (data) {                  
                vm.showAlert('Erreur de saisie','Veuillez saisir les champs manquants !');
            });              
        }  
      //*****************************************************************     
        vm.selection= function (item) {             
            vm.selectedItem = item;
            currentItem = JSON.parse(JSON.stringify(vm.selectedItem));
            vm.afficherboutonModifSupr = 1;
            vm.afficherboutonnouveau = 1; 
        };
        $scope.$watch('vm.selectedItem', function() {
            if (!vm.allActivite) return;
            vm.allActivite.forEach(function(item) {
                item.$selected = false;
            });
            vm.selectedItem.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouter = function () {
            vm.affichageMasque = 0 ;
            NouvelItem = true ;
		    var items = {
				$edit: true,
				$selected:true,
				supprimer:0,
				id:0,
				libelle: '',
				id_utilisateur:id_user
			};
			vm.allActivite.push(items);
        };
        vm.annuler = function() {            
			vm.selectedItem.$selected = false;
			vm.affichageMasque = 0 ;
			vm.afficherboutonnouveau = 1 ;
			vm.afficherboutonModifSupr = 0 ;
			if (!item.id) {
				vm.selectedItem.depense.pop();
				return;
			}          
			item.$selected=false; 
			item.$edit=false; 
			NouvelItem = false;            
			// Restaurer les valeurs
			item.libelle = currentItem.libelle;
        };
        vm.modifier = function(item) {                    
                NouvelItem = false ;
				item.$selected=true,
				item.$edit=true;
        };
        vm.supprimer = function() {
            // Attention : suppression tache  nom de fonction à revoir ???
            vm.afficherboutonModifSupr = 0 ;
            vm.affichageMasque = 0 ;
			var rep = response.data;                
			var confirm = $mdDialog.confirm()
				.title('Confirmation de suppression')
				.textContent(vm.qui)
				.ariaLabel('Lucky day')
				.clickOutsideToClose(false)
				.parent(angular.element(document.body))
				.ok('supprimer')
				.cancel('annuler');
			$mdDialog.show(confirm).then(function() {
				   ajout(vm.selectedItem,1);
			}, function() {
			});
        };          
        vm.selectionDocument= function (item) {
            vm.selectedListedonneesavaliderItem = item;
            currentdepenseItem = JSON.parse(JSON.stringify(vm.selectedListedonneesavaliderItem));
        };
        $scope.$watch('vm.selectedListedonneesavaliderItem', function() {
			if (!vm.selectedListedonneesavaliderItem) return;
			vm.Listevalidationbeneficiaire.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedListedonneesavaliderItem.$selected = true;
        });
		$scope.uploadFile = function(event){
			var files = event.target.files;
			vm.myFile=files;  
			// console.log(vm.myFile[0].name);	
			vm.monfichier = vm.myFile[0].name;
		};
        vm.ajouterDocument = function () {
            vm.selectedListedonneesavaliderItem.$selected = false;
            NouveldonneesavaliderItem = 1 ;
			var items = {
				$edit: true,
				$selected:true,
				supprimer:0,
				resume:'',
				url:'',
				validation:0,
				fait:0,
				date_reception:new Date,
				date_validation:null,
				nom_fichier:'',
                id_utilisateur:id_user,
                id_utilisateur_validation:null,
                donnees_validees:0,
				id:0,
				nomutilisateur:vm.nomutilisateur,		
				raisonsociale:vm.raisonsociale		
			};
			vm.Listevalidationbeneficiaire.push(items);
			vm.afficherboutonnouveau=0;
		}
		vm.annulerDocument = function(item) {
			vm.afficherboutonnouveau=1;
			if (!item.id) {
				vm.Listevalidationbeneficiaire.pop();
				return;
			}          
			vm.selectedListedonneesavaliderItem.resume=vm.resume;
			vm.selectedListedonneesavaliderItem.url=vm.url;
			vm.selectedListedonneesavaliderItem.validation=vm.validation;
			vm.selectedListedonneesavaliderItem.nom_fichier=vm.fichier;
			vm.selectedListedonneesavaliderItem.date_reception=vm.date_reception;
			vm.selectedListedonneesavaliderItem.$selected = false;
			NouveldonneesavaliderItem = 0;
			item.$edit=false; 
			vm.disable=false;
        };
		vm.supprimerDocument = function(item) {
            if(id_user!=item.id_utilisateur && parseInt(id_user)!=1) {
                vm.showAlert("Information","Vous n'avez pas le droit de supprimer ce document !. Merci");
                return;
            }
            vm.selectedptaItem=item;
            var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('ok')
                .cancel('annuler');
            $mdDialog.show(confirm).then(function() {
				vm.sauverDocument(vm.selectedListedonneesavaliderItem,1);
            }, function() {
             //alert('rien');
            });
        };
		vm.modifierDocument = function(item) {
            if(id_user!=item.id_utilisateur && parseInt(id_user)!=1) {
                vm.showAlert("Information","Vous n'avez pas le droit de modifier ce document !. Merci");
                return;
            }   
            vm.resume=item.resume;
            vm.url=item.url;
            vm.validation=item.validation;
            vm.fichier=item.nom_fichier;
            vm.date_reception=item.date_reception;
            vm.fait=item.fait;
			currentdepenseItem = JSON.parse(JSON.stringify(vm.selectedListedonneesavaliderItem));
			item.date_reception = new Date(item.date_reception);
			vm.Listevalidationbeneficiaire.forEach(function(it) {
				it.$selected = false;
				it.$edit = false;
			});
            NouveldonneesavaliderItem = 0 ;
			vm.selectedListedonneesavaliderItem.$selected = true;             
            item.$edit = true;  
			item.$selected = true; 
			vm.selectedListedonneesavaliderItem = item;     
			vm.selectedListedonneesavaliderItem.$edit = true;                  
			vm.afficherboutonnouveau=0;
        };
		vm.sauverDocument = function (item,suppression) {
			var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var getId = 0;
            if (NouveldonneesavaliderItem==0) {
               getId = vm.selectedListedonneesavaliderItem.id; 
            } 
			if(suppression==1) {
				var date_temporaire = vm.selectedListedonneesavaliderItem.date_reception;
			} else {
				var date_temporaire = formatDate(vm.selectedListedonneesavaliderItem.date_reception);
			}
			// var rep = apiUrlbase + apiUrlvalidation + vm.site.toLowerCase()  ;
			var rep = apiUrlbase + apiUrlvalidation ;
			vm.directoryName=rep;
            var datas = $.param({
                supprimer:suppression,
                id:getId,
                donnees_validees: 0,            
                nom_fichier: vm.fichier,
                repertoire: vm.repertoire,
                date_reception: date_temporaire,
                date_validation: null,
                id_utilisateur:id_user,
                id_utlisateur_validation:null
            });
            apiFactory.add("listevalidationbeneficiaire/index",datas, config).success(function (data) {
                if (NouveldonneesavaliderItem == 0) {
                    vm.selectedListedonneesavaliderItem.nom_fichier=vm.fichier;
                    vm.selectedListedonneesavaliderItem.repertoire=vm.repertoire;
                    if(suppression==0) {
                      vm.selectedListedonneesavaliderItem.$selected = false;
					  vm.selectedListedonneesavaliderItem.$edit=false;
					  // repertoire : à écraser chaque fois au cas où l'utilisateur change le nom du type de document dans DDB type document
                      vm.selectedListedonneesavaliderItem ={};
                    } else {    
						vm.Listevalidationbeneficiaire = vm.Listevalidationbeneficiaire.filter(function(obj) {
							return obj.id !== currentdepenseItem.id;
						});         
                    }
                } else {
                    NouveldonneesavaliderItem=0;
					vm.selectedListedonneesavaliderItem.id=data.response[0].id;
					vm.selectedListedonneesavaliderItem.date_reception=data.response[0].date_reception;
					vm.selectedListedonneesavaliderItem.nom_fichier=vm.fichier;
					vm.selectedListedonneesavaliderItem.repertoire=vm.repertoire;
                }
				// vm.item.$selected=false;
				// vm.item.$edit=false;
				vm.selectedListedonneesavaliderItem.$edit=false;
				vm.selectedListedonneesavaliderItem.$selected=false;
				vm.afficherboutonnouveau=1;
				vm.disable=false;
            }).error(function (data) {
                alert('Erreur');
            }); 
        }      
        function test_existance (item,suppression) {          
            if (suppression!=1) {
                insert_in_base(item,suppression);                                   
            } else {
              insert_in_base(item,suppression);
            }  
        } 
 		vm.uploadFile = function (item,suppression) {
			var file =vm.myFile[0];
			// console.log('file is ' );
			// console.dir(file);
			var repertoire = apiUrlvalidation;
			// var bt = vm.site.toLowerCase() + '/';
			var uploadUrl = apiUrl + "validationbeneficiaire/upload_validationdonneesbeneficiaire";
			var name = $scope.name;
			// console.log(name);
			var fd = new FormData();
			fd.append('file', file);
			fd.append('repertoire',repertoire);
			fd.append('raison_sociale',vm.raisonsociale);
			if(file) { 
				var upl=   $http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).success(function(data){
					// console.log('upload success');
					// console.log(data);
					vm.fichier=data["nom_fichier"];
					vm.repertoire=data["repertoire"];
					if(data["reponse"]!="OK") {
						// Sauvegarde dans la BDD
						vm.sauverDocument(item,0);
						vm.showAlert("INFORMATION","Le fichier à importer ne contient pas des erreurs.Merci de votre collaboration.A bientôt");
					} else {
						vm.showAlert("INFORMATION","Il y a des erreurs dans le fichier à importer.Veuillez consulter votre e-mail et corriger les données marquées en rouge.Merci");
						// Enlever de la liste puisqu'il y a des erreurs : sans sauvegarde dans la BDD
						vm.Listevalidationbeneficiaire = vm.Listevalidationbeneficiaire.filter(function(obj) {
							return parseInt(obj.id) !== 0;
						});         						
					}	
				}).error(function(){
					// console.log("Rivotra");
				});
			} else {
				vm.sauverDocument(item,0);
			}
		}
        vm.ConfirmerImportBeneficiaire = function(donnees) {
			var confirm = $mdDialog.confirm()
                .title("Vous-êtes en train d'importer cet enregistrement.Continuer ?")
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('Continuer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				vm.importerbeneficiaire(donnees);
			}, function() {
			});
        }

		vm.importerbeneficiaire = function(item) {
			var bla = $.post(apiUrl + "importationbeneficiaire/importer_donnees_beneficiaire",{
						nom_fichier : item.nom_fichier,
						repertoire: item.repertoire,
						id_utilisateur:vm.id_utilisateur,
						id:item.id
					},function(data) {  
						console.log(data);
						// window.location = data;
						// Actualisation liste validation bénéficiaire
						vm.Listevalidationbeneficiaire =[];
						vm.Listebeneficiairevalidees =[];
						apiFactory.getAPIgeneraliser("listevalidationbeneficiaire/index","etat",10).then(function(result) {
							vm.Listevalidationbeneficiaire = result.data.response;
						});               
						apiFactory.getAPIgeneraliser("listevalidationbeneficiaire/index","etat",20).then(function(result) {
							vm.Listebeneficiairevalidees = result.data.response;
						});               
						//add historique : Intégration bénéficiaire : 
						var actions ="Intégration bénéficiaire : fichier " + item.raisonsociale + "  " + item.repertoire + item.nom_fichier;
						var config = {
							headers : {
								'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
							}
						};
						var datas = $.param({
							action:actions,
							id_utilisateur:vm.id_utilisateur
						});
						//factory
						apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
						});				
					});
		}
    }
})();