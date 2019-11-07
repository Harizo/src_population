(function ()
{
    'use strict';
    angular
        .module('app.population.ddb.annuaire')
        .controller('AnnuaireController', AnnuaireController);

    /** @ngInject */
    function AnnuaireController(apiFactory, $state, $mdDialog, $scope,$cookieStore) {
		var vm = this;
		vm.titrepage ="Ajout Tutelle";
		vm.ajoutProgramme = ajoutProgramme ;
		vm.ajoutZoneinterventionprogramme = ajoutZoneinterventionprogramme ;
		vm.ajoutFinancementprogramme = ajoutFinancementprogramme ;
		vm.ajoutIntervention = ajoutIntervention ;
		vm.ajoutFinancementintervention = ajoutFinancementintervention ;
		vm.ajoutZoneintervention = ajoutZoneintervention ;
		
		var NouvelItemProgramme=false;
		var NouvelItemZoneinterventionprogramme=false;
		var NouvelItemFinancementprogramme=false;
		var NouvelItemIntervention=false;
		var NouvelItemFinancementintervention=false;
		var NouvelItemZoneintervention=false;
		
		var currentItemProgramme={};
		var currentItemZoneinterventionprogramme={};
		var currentItemfinancementprogramme={};
		var currentItemIntervention={};
		var currentItemFinancementintervention={};
		var currentItemZoneintervention={};
		
		vm.selectedItemProgramme = [] ;
		vm.selectedItemZoneinterventionprogramme = {} ;
		vm.selectedItemfinancementprogramme = {} ;
		vm.selectedItemIntervention = {} ;
		vm.selectedItemFinancementintervention = {} ;
		vm.selectedItemZoneintervention = {} ;
		vm.selectedItemDetailtypetransfert = {} ;     
		
		vm.selectedItemProgramme.detail_zone_intervention_programme = [] ;
		vm.selectedItemProgramme.detail_financement_programme = [] ;
		vm.selectedItemProgramme.detail_intervention = [] ;
		
		vm.selectedItemIntervention.detail_financement_intervention =[];
		vm.selectedItemIntervention.detail_zone_intervention =[];
		
		vm.all_region =[];
		vm.allRecordsRegion =[];
		vm.all_district =[];
		vm.allRecordsDistrict =[];
		vm.all_commune =[];
		vm.allRecordsCommune =[];
		vm.all_fokontany =[];
		vm.allRecordsFokontany =[];
		vm.acteur =[];
		vm.allRecordsProgramme = [] ;
		vm.allRecordsZoneinterventionprogramme = [] ;
		vm.allRecordsTypeaction = [] ;
		vm.allRecordsTypefinancement = [] ;
		vm.allRecordsSourcefinancement = [] ;
		vm.allRecordsAxestrategique = [] ;
		vm.allRecordsDevise = [] ;
		vm.allRecordsTypesecteur = [] ;
		vm.allRecordsActeur = [] ;
		vm.allRecordsTypetransfert = [] ;
		vm.allRecordsActionstrategique = [] ;
		vm.allRecordsDetailtypetransfert = [] ;
		vm.ListeDetailtypetransfert = [] ;
		vm.allRecordsFrequencetransfert = [] ;
		vm.allRecordsTutelle = [] ;
		
        vm.afficherboutonnouveauprogramme = 1 ;
		vm.afficherboutonModifSuprprogramme = 0 ;
        vm.affichageMasqueprogramme = 0 ;
		
        vm.afficherboutonnouveaufinancementprogramme = 1 ;
		vm.afficherboutonModifSuprfinancementprogramme = 0 ;
        vm.affichageMasquefinancementprogramme = 0 ;
		
        vm.afficherboutonnouveauintervention = 1 ;
		vm.afficherboutonModifSuprintervention = 0 ;
        vm.affichageMasqueintervention = 0 
		
        vm.afficherboutonnouveaufinancementintervention = 1 ;
		vm.afficherboutonModifSuprfinancementintervention = 0 ;
        vm.affichageMasquefinancementintervention = 0 ;
		
		vm.titreacteur="Ajout Programme";
		vm.titrefinancementprogramme="Ajout Financement programme";
		vm.titreintervention="Ajout Intervention";
		vm.titrefinancementintervention="Ajout Financement intervention";
		
		vm.filtre=[];
		vm.filtre.id_region ={};
		vm.filtre.id_district ={};
		vm.filtre.id_commune ={};
		vm.affiche_load=false;
		// Récupérer via cookies id utilisateur
		vm.id_utilisateur =$cookieStore.get('id');
		//style
		vm.dtOptions = {
		dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
		pagingType: 'simple',
		autoWidth: false,
		responsive: true
		};
		//col table
		vm.programme_column = [{titre:"Contact Informateur"},{titre:"Identifiant"},{titre:"Bénéficiaire"},{titre:"Action"},{titre:"Intitulé"},{titre:"Début-Fin"}];
		vm.ziprg_column = [{titre:"Région"},{titre:"District"},{titre:"Ménage prévu"},{titre:"Indiv prévu"},{titre:"Actions"}];
		vm.financementprogramme_column = [{titre:"Programme/Src-finance/Axe stratégique"},{titre:"Devise"},{titre:"Secteur"},{titre:"Budget initial"},{titre:"Budget modif"}];
		vm.intervention_column = [{titre:"Contact Informateur"},{titre:"Ident/Intitulé/Comment"},{titre:"Acteur/Catég int/Action"},{titre:"Action"},{titre:"Intitulé"}];
		vm.financementintervention_column = [{titre:"Programme/Src-finance/Axe stratégique"},{titre:"Devise"},{titre:"Secteur"},{titre:"Budget initial"},{titre:"Budget modif"}];
		vm.zone_column = [{titre:"Région"},{titre:"District"},{titre:"Commune"},{titre:"Fokontany"},{titre:"Ménage prévu"},{titre:"Indiv prévu"},{titre:"Actions"}];
		vm.detailtypetransfert_column = [{titre:"Choix"},{titre:"Descript°"},{titre:"Qté/Val"},{titre:"Unité"}];
		apiFactory.getAll("region/index").then(function(result){
			vm.all_region = result.data.response;
			vm.allRecordsRegion = result.data.response;
		});    
		apiFactory.getAll("district/index").then(function(result){
			vm.allRecordsDistrict = result.data.response;
			vm.all_district = result.data.response;
		});    
		apiFactory.getAll("programme/index").then(function(result){
			vm.allRecordsProgramme = result.data.response;
			apiFactory.getAll("type_action/index").then(function(result){
				vm.allRecordsTypeaction = result.data.response;
				apiFactory.getAll("type_financement/index").then(function(result){
					vm.allRecordsTypefinancement = result.data.response;
					apiFactory.getAll("type_transfert/index").then(function(result){
						vm.allRecordsTypetransfert = result.data.response;
						apiFactory.getAll("detail_type_transfert/index").then(function(result){
							vm.allRecordsDetailtypetransfert = result.data.response;
							vm.ListeDetailtypetransfert = result.data.response;
							console.log(vm.allRecordsDetailtypetransfert);
						});    
					});    
				});    
			});    
		});    
		apiFactory.getAll("zone_intervention_programme/index").then(function(result){
			vm.allRecordsZoneinterventionprogramme = result.data.response;
			apiFactory.getAll("acteur/index").then(function(result){
				vm.allRecordsActeur = result.data.response;
			});    
		});    
		apiFactory.getAll("source_financement/index").then(function(result){
			vm.allRecordsSourcefinancement = result.data.response;
		});    
		apiFactory.getAll("axe_strategique/index").then(function(result){
			vm.allRecordsAxestrategique = result.data.response;
		});    
		apiFactory.getAll("action_strategique/index").then(function(result){
			vm.allRecordsActionstrategique = result.data.response;
		});    
		apiFactory.getAll("devise/index").then(function(result){
			vm.allRecordsDevise = result.data.response;
		});    
		apiFactory.getAll("type_secteur/index").then(function(result){
			vm.allRecordsTypesecteur = result.data.response;
		});    
		apiFactory.getAll("frequence_transfert/index").then(function(result){
			vm.allRecordsFrequencetransfert = result.data.response;
		});    
		apiFactory.getAll("tutelle/index").then(function(result){
			vm.allRecordsTutelle = result.data.response;
		});    
		//add historique : consultation DDB annuaire d'intervention
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var datas = $.param({
			action:"Consultation DDB : Annuaire d'intervention",
			id_utilisateur:vm.id_utilisateur
		});
		//factory
		apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
		});				
		vm.filtre_region = function() {
			apiFactory.getAPIgeneraliserREST("district/index","cle_etrangere",vm.filtre.id_region).then(function(result) { 
				vm.all_district = result.data.response;   
				vm.filtre.id_district = null ; 
				vm.filtre.id_commune = null ; 
				vm.programme.id_fokontany = null ; 
			});
		}
		vm.filtre_commune = function() {
			apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",vm.filtre.id_district).then(function(result)  { 
				vm.all_commune = result.data.response; 
				vm.filtre.id_commune = null ; 
				vm.programme.id_fokontany = null ;           
			});
		}
		vm.filtre_fokontany = function() {
			apiFactory.getAPIgeneraliserREST("fokontany/index","cle_etrangere",vm.filtre.id_commune).then(function(result) { 
				vm.all_fokontany = result.data.response;    
				vm.programme.id_fokontany = null ; 
			});
		}
        function formatDate(date) {
            if (date) {
                var mois = date.getMonth()+1;
                var dateSQL = (date.getFullYear()+"/"+mois+"/"+date.getDate());
                return dateSQL;
            };
        }
		// DEBUT PROGRAMME	
		function ajoutProgramme(entite,suppression) {
            test_existenceProgramme (entite,suppression);
        }
        function insert_in_baseProgramme(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemProgramme==false) {
			   getId = vm.selectedItemProgramme.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				nom: entite.nom,
				prenom: entite.prenom,
				telephone: entite.telephone,
				email: entite.email,
				id_tutelle: entite.id_tutelle,
				intitule: entite.intitule,
				situation_intervention: entite.situation_intervention,
				id_type_financement: entite.id_type_financement,
				date_debut: formatDate(entite.date_debut),
				date_fin: formatDate(entite.date_fin),
				description: entite.description,
				flag_integration_donnees: entite.flag_integration_donnees,
				nouvelle_integration: entite.nouvelle_integration,
				commentaire: entite.commentaire,
				id_type_action: entite.id_type_action,
				typeaction: entite.typeaction,
				identifiant: entite.identifiant,
				inscription_budgetaire: entite.inscription_budgetaire,
			});       
			//factory
			apiFactory.add("programme/index",datas, config).success(function (data) {
				if (NouvelItemProgramme == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemProgramme.id = entite.id;
					  vm.selectedItemProgramme.nom = entite.nom;
					  vm.selectedItemProgramme.prenom = entite.prenom;
					  vm.selectedItemProgramme.telephone = entite.telephone;
					  vm.selectedItemProgramme.email = entite.email;
					  vm.selectedItemProgramme.id_tutelle = entite.id_tutelle;
					  vm.selectedItemProgramme.tutelle = entite.tutelle;
					  vm.selectedItemProgramme.intitule = entite.intitule;
					  vm.selectedItemProgramme.situation_intervention = entite.situation_intervention;
					  vm.selectedItemProgramme.id_type_financement = entite.id_type_financement;
					  vm.selectedItemProgramme.typefinancement = entite.typefinancement;
					  vm.selectedItemProgramme.date_debut = entite.date_debut;
					  vm.selectedItemProgramme.date_fin = entite.date_fin;
					  vm.selectedItemProgramme.description = entite.description;
					  vm.selectedItemProgramme.flag_integration_donnees = entite.flag_integration_donnees;
					  vm.selectedItemProgramme.nouvelle_integration = entite.nouvelle_integration;
					  vm.selectedItemProgramme.commentaire = entite.commentaire;
					  vm.selectedItemProgramme.id_type_action = entite.id_type_action;
					  vm.selectedItemProgramme.typeaction = entite.typeaction;
					  vm.selectedItemProgramme.identifiant = entite.identifiant;
					  vm.selectedItemProgramme.inscription_budgetaire = entite.inscription_budgetaire;
					  vm.selectedItemProgramme.$selected = false;
					  vm.selectedItemProgramme.$edit = false;
					  // vm.selectedItemProgramme ={};
						vm.afficherboutonModifSuprprogramme = 0 ;
						vm.afficherboutonnouveauprogramme = 1 ;
					  vm.action="Modification d'un enregistrement de DDB (Annuaire): Programme" + " ("+ entite.intitule + ")";
					} else {    
						vm.allRecordsProgramme = vm.allRecordsProgramme.filter(function(obj) {
							return obj.id !== vm.selectedItemProgramme.id;
						});
						vm.action="Suppression d'un enregistrement de DDB (Annuaire): Programme" + " ("+ entite.intitule + ")";
					}
				} else {
                    var item = {
						id:String(data.response) ,
						nom: entite.nom,
						prenom:entite.prenom,
						telephone: entite.telephone,
						email: entite.email,
						id_tutelle: entite.id_tutelle,
						intitule: entite.intitule,
						situation_intervention: entite.situation_intervention,
						id_type_financement: entite.id_type_financement,
						typefinancement: entite.typefinancement,
						date_debut: entite.date_debut,
						date_fin: entite.date_fin,
						description: entite.description,
						flag_integration_donnees: entite.flag_integration_donnees,
						nouvelle_integration: entite.nouvelle_integration,
						commentaire: entite.commentaire,
						id_type_action: entite.id_type_action,
						typeaction: entite.typeaction,
						identifiant: entite.identifiant,
						inscription_budgetaire: entite.inscription_budgetaire,
					};
					vm.allRecordsProgramme.push(item); 
					NouvelItemProgramme=false;
					vm.action="Ajout d'un enregistrement de DDB (Annuaire): Programme" + " ("+ entite.intitule + ")";
				}
				entite.$selected=false;
				entite.$edit=false;
				vm.affichageMasqueprogramme =0;
				//add historique : suppresion/modifcation/ajout DDB Annuaire Programme
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var datas = $.param({
					action:vm.action,
					id_utilisateur:vm.id_utilisateur
				});
				//factory
				apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
				});								
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionProgramme= function (item) {     
            vm.selectedItemProgramme = item;
			console.log(vm.selectedItemProgramme);
            currentItemProgramme = angular.copy(vm.selectedItemProgramme);       
            vm.afficherboutonModifSuprprogramme = 1 ;
            vm.affichageMasqueprogramme = 0 ;
            vm.afficherboutonnouveauprogramme = 1 ;
            NouvelItemProgramme=false;
			if(parseInt(vm.selectedItemProgramme.detail_charge)==0) {
				var inb_rien =0;
				vm.affiche_load=true;
				apiFactory.getAPIgeneraliserREST("zone_intervention_programme/index","cle_etrangere",vm.selectedItemProgramme.id).then(function(result) { 				
					item.detail_zone_intervention_programme = []; 
					if(result.data.response.length >0) {
						item.detail_zone_intervention_programme = result.data.response; 
						vm.selectedItemProgramme.detail_zone_intervention_programme = result.data.response; 
					} else {
						inb_rien =1;
					}			
					apiFactory.getAPIgeneraliserREST("financement_programme/index","cle_etrangere",vm.selectedItemProgramme.id).then(function(result) { 				
						item.detail_financement_programme = []; 
						if(result.data.response.length >0) {
							item.detail_financement_programme = result.data.response; 
							vm.selectedItemProgramme.detail_financement_programme = result.data.response; 
						} else {
							inb_rien =2;							
						}
						apiFactory.getAPIgeneraliserREST("intervention/index","cle_etrangere",vm.selectedItemProgramme.id).then(function(result) { 				
							item.detail_intervention = []; 
							if(result.data.response.length >0) {
								item.detail_intervention = result.data.response; 
								vm.selectedItemProgramme.detail_intervention = result.data.response; 
							} else {
								inb_rien =3;							
							}
							if(inb_rien==2) {
								vm.showAlert("INFORMATION","Aucun détail d'enregistrement trouvé !");
							}	
							item.detail_charge=1;
							vm.affiche_load=false;						
						});
					});
				});
			}			
        };
        $scope.$watch('vm.selectedItemProgramme', function() {
			if (!vm.allRecordsProgramme) return;
			vm.allRecordsProgramme.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemProgramme.$selected = true;
        });
        vm.ajouterProgramme = function () {
			vm.titreacteur="Ajout Programme";
			vm.selectedItemProgramme.$selected = false;
			vm.affichageMasqueprogramme = 1 ;
			vm.programme.id=0;
			vm.programme.nom=null;
			vm.programme.prenom=null;
			vm.programme.telephone=null;
			vm.programme.email=null;
			vm.programme.id_tutelle=null;
			vm.programme.tutelle=[];
			vm.programme.intitule=null;
			vm.programme.situation_intervention=null;
			vm.programme.id_type_financement=null;
			vm.programme.typefinancement=[];
			vm.programme.date_debut=null;
			vm.programme.date_fin=null;
			vm.programme.description=null;
			vm.programme.flag_integration_donnees=false;
			vm.programme.nouvelle_integration=false;
			vm.programme.commentaire=null;
			vm.programme.id_type_action=null;
			vm.programme.typeaction=[];
			vm.programme.identifiant=null;
			vm.programme.inscription_budgetaire=null;
			vm.programme.detail_charge=1;
			vm.programme.detail_zone_intervention_programme=[];
			vm.programme.detail_financement_programme=[];
			NouvelItemProgramme = true ;			
            vm.selectedItemProgramme.$selected = false;
        };
        vm.annulerProgramme = function(item) {
			vm.selectedItemProgramme = {} ;
			vm.selectedItemProgramme.$selected = false;
			vm.affichageMasqueprogramme = 0 ;
			vm.afficherboutonnouveauprogramme = 1 ;
			vm.afficherboutonModifSuprprogramme = 0 ;
			NouvelItemProgramme = false;
       };
        vm.modifierProgramme = function(item) {
			vm.titreacteur="Modification Programme";
			NouvelItemProgramme = false ;
			vm.affichageMasqueprogramme = 1 ;
			vm.programme.id = vm.selectedItemProgramme.id ;
			vm.programme.nom = vm.selectedItemProgramme.nom ;
			vm.programme.prenom=vm.selectedItemProgramme.prenom;
			vm.programme.telephone = vm.selectedItemProgramme.telephone ;
			vm.programme.email = vm.selectedItemProgramme.email ;
			vm.programme.intitule = vm.selectedItemProgramme.intitule ;
			vm.programme.situation_intervention = vm.selectedItemProgramme.situation_intervention ;
			if(vm.selectedItemProgramme.id_tutelle) {
				vm.programme.id_tutelle = parseInt(vm.selectedItemProgramme.id_tutelle);
			} else vm.programme.id_tutelle = null;
			if(vm.selectedItemProgramme.id_type_financement) {
				vm.programme.id_type_financement = parseInt(vm.selectedItemProgramme.id_type_financement);
			} else vm.programme.id_type_financement = null;
			vm.programme.typefinancement = vm.selectedItemProgramme.typefinancement ;
			if(vm.selectedItemProgramme.date_debut) {
				vm.programme.date_debut=new Date(vm.selectedItemProgramme.date_debut);
			} else vm.programme.date_debut =null;
			if(vm.selectedItemProgramme.date_fin) {
				vm.programme.date_fin=new Date(vm.selectedItemProgramme.date_fin);
			} else vm.programme.date_fin =null;
			vm.programme.description = vm.selectedItemProgramme.description;
			vm.programme.flag_integration_donnees = vm.selectedItemProgramme.flag_integration_donnees;
			vm.programme.nouvelle_integration = vm.selectedItemProgramme.nouvelle_integration;
			vm.programme.commentaire = vm.selectedItemProgramme.commentaire;
			if(vm.selectedItemProgramme.id_type_action) {
				vm.programme.id_type_action = parseInt(vm.selectedItemProgramme.id_type_action);
			} else vm.programme.id_type_action = null;				
			vm.programme.tutelle = vm.selectedItemProgramme.tutelle;
			vm.programme.typeaction = vm.selectedItemProgramme.typeaction;
			vm.programme.identifiant = vm.selectedItemProgramme.identifiant;
			vm.programme.inscription_budgetaire = vm.selectedItemProgramme.inscription_budgetaire;
			vm.afficherboutonModifSuprprogramme = 0;
			vm.afficherboutonnouveauprogramme = 0;  
        };
        vm.supprimerProgramme = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutProgramme(vm.selectedItemProgramme,1);
			}, function() {
			});
        }
        function test_existenceProgramme (item,suppression) {    
			if(item.intitule.length > 0) {
				var doublon = 0;
				if (suppression!=1) {
					vm.allRecordsProgramme.forEach(function(dispo) {   
						if((dispo.intitule==item.intitule) && dispo.id!=item.id) {
							doublon=1;	
						} 
					});
					if(doublon==1) {
						vm.showAlert('Information !','ERREUR ! : Intitulé déjà utilisé')
					} else {
						insert_in_baseProgramme(item,0);
					}
				} else {
				  insert_in_baseProgramme(item,suppression);
				}  
			} else {
				vm.showAlert('Erreur',"Veuillez saisir l'intitulé du programme !");
			}		
        }
        vm.modifierTutelle = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTutelle.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_tutelle)) {
					vm.nontrouvee=false;
					vm.programme.id_tutelle=prg.id;
					item.id_tutelle=prg.id;
					vm.programme.tutelle=[];
					vm.programme.tutelle.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.programme.id_tutelle = null; 
					vm.programme.tutelle=[];
			}
		}	
        vm.modifierTypeaction = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypeaction.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_type_action)) {
					vm.nontrouvee=false;
					vm.programme.id_type_action=prg.id;
					item.id_type_action=prg.id;
					vm.programme.typeaction=[];
					vm.programme.typeaction.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.programme.id_type_action = null; 
					vm.programme.typeaction=[];
			}
		}	
        vm.modifierTypefinancement = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypefinancement.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_type_financement)) {
					vm.nontrouvee=false;
					vm.programme.id_type_financement=prg.id;
					item.id_type_financement=prg.id;
					vm.programme.typeacteurs=[];
					vm.programme.typeacteurs.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.programme.id_type_financement = null; 
					vm.programme.typeacteurs=[];
			}
		}	

		
        vm.modifierRegion = function (item) { 
			vm.all_region.forEach(function(prg) {
				if(prg.id==item.id_region) {
					item.region=[];
					var itemss = {
						id: prg.id,
						code: prg.code,
						nom: prg.nom,
					};
					item.region.push(itemss);
				}
			});
		}	
        vm.modifierZoneinterventionprogrammeProgramme = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsZoneinterventionprogramme.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_type_acteur)) {
					vm.nontrouvee=false;
					vm.programme.id_type_acteur=prg.id;
					item.id_type_acteur=prg.id;
					vm.programme.typeacteurs=[];
					var itemss = {
						id: prg.id,
						description: prg.description,
					};
					vm.programme.typeacteurs.push(itemss);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.programme.id_type_acteur = null; 
					vm.programme.typeacteurs=[];
			}
		}	
        vm.modifierFokontany = function (item) { 
			vm.nontrouvee=true;
			vm.all_fokontany.forEach(function(fkt) {
				if(parseInt(fkt.id)==parseInt(item.id_fokontany)) {
					vm.programme.id_fokontany = fkt.id; 
					vm.programme.fokontany=[];
					var itemss = {
						id: fkt.id,
						id_commune: fkt.id_commune,
						nom: fkt.nom,
						code: fkt.code,
					};
					vm.programme.fokontany.push(itemss);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					vm.programme.id_fokontany = null; 
					vm.programme.fokontany=[];
			}
		}
		// FIN PROGRAMME
		// DEBUT ZONE D'INTERVENTION PROGRAMME	
		function ajoutZoneinterventionprogramme(zoneprg,suppression) {
            test_existence_ziprg (zoneprg,suppression);
        }
        function insert_in_base_ziprg(zoneprg,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemZoneinterventionprogramme==false) {
			   getId = vm.selectedItemZoneinterventionprogramme.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				id_programme: zoneprg.id_programme,
				id_district: zoneprg.id_district,
				id_region: zoneprg.id_region,
				menage_beneficiaire_prevu: zoneprg.menage_beneficiaire_prevu,
				individu_beneficiaire_prevu: zoneprg.individu_beneficiaire_prevu,
			});       
			//factory
			apiFactory.add("zone_intervention_programme/index",datas, config).success(function (data) {
				if (NouvelItemZoneinterventionprogramme == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemZoneinterventionprogramme.id_programme = zoneprg.id_programme;
					  vm.selectedItemZoneinterventionprogramme.id_district = zoneprg.id_district;
					  vm.selectedItemZoneinterventionprogramme.id_region = zoneprg.id_region;
					  vm.selectedItemZoneinterventionprogramme.menage_beneficiaire_prevu = zoneprg.menage_beneficiaire_prevu;
					  vm.selectedItemZoneinterventionprogramme.individu_beneficiaire_prevu = zoneprg.individu_beneficiaire_prevu;
					  vm.selectedItemZoneinterventionprogramme.$selected = false;
					  vm.selectedItemZoneinterventionprogramme.$edit = false;
					  vm.selectedItemZoneinterventionprogramme ={};
					  vm.action="Modification d'un enregistrement de DDB (Annuaire): Zone d'intervention programme";
					} else {    
						vm.selectedItemProgramme.detail_zone_intervention_programme = vm.selectedItemProgramme.detail_zone_intervention_programme.filter(function(obj) {
							return obj.id !== vm.selectedItemZoneinterventionprogramme.id;
						});
						vm.action="Suppression d'un enregistrement de DDB (Annuaire): Zone d'intervention programme";
					}
				} else {
					zoneprg.id=data.response;	
					NouvelItemZoneinterventionprogramme=false;
					vm.action="Ajout d'un enregistrement de DDB (Annuaire): Zone d'intervention programme";
				}
				zoneprg.$selected=false;
				zoneprg.$edit=false;
				//add historique : suppresion/modifcation/ajout DDB Annuaire zone d'intervention programme
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var datas = $.param({
					action:vm.action,
					id_utilisateur:vm.id_utilisateur
				});
				//factory
				apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
				});								
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
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
        vm.selectionZoneinterventionprogramme= function (item) {     
            vm.selectedItemZoneinterventionprogramme = item;
        };
        $scope.$watch('vm.selectedItemZoneinterventionprogramme', function() {
			if (!vm.selectedItemProgramme) return;
			vm.selectedItemProgramme.detail_zone_intervention_programme.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemZoneinterventionprogramme.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterZoneinterventionprogramme = function () {
            vm.selectedItemZoneinterventionprogramme.$selected = false;
            NouvelItemZoneinterventionprogramme = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                id_programme: vm.selectedItemProgramme.id ,
                programme: [] ,
                id_district: null ,
                district: [] ,
                id_region: null ,
                region: [] ,
                menage_beneficiaire_prevu: null ,
                individu_beneficiaire_prevu: null ,
			};
			vm.selectedItemProgramme.detail_zone_intervention_programme.push(items);
		    vm.selectedItemProgramme.detail_zone_intervention_programme.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemZoneinterventionprogramme = it;
				}
			});			
        };
        vm.annulerZoneinterventionprogramme = function(item) {
			if (!item.id) {
				vm.selectedItemProgramme.detail_zone_intervention_programme.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemZoneinterventionprogramme = false;
			 item.description = currentItemZoneinterventionprogramme.description;
			vm.selectedItemZoneinterventionprogramme = {} ;
			vm.selectedItemZoneinterventionprogramme.$selected = false;
       };
        vm.modifierZoneinterventionprogramme = function(item) {
			NouvelItemZoneinterventionprogramme = false ;
			vm.selectedItemZoneinterventionprogramme = item;
			currentItemZoneinterventionprogramme = angular.copy(vm.selectedItemZoneinterventionprogramme);
			$scope.vm.allRecordsZoneinterventionprogramme.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemZoneinterventionprogramme.id_programme = parseInt(vm.selectedItemZoneinterventionprogramme.id_programme);
			if (vm.selectedItemZoneinterventionprogramme.id_region) {
				vm.selectedItemZoneinterventionprogramme.id_region = parseInt(vm.selectedItemZoneinterventionprogramme.id_region);
			} else vm.selectedItemZoneinterventionprogramme.id_region = null;
			if (vm.selectedItemZoneinterventionprogramme.id_district) {
				vm.selectedItemZoneinterventionprogramme.id_district = parseInt(vm.selectedItemZoneinterventionprogramme.id_district);
			} else vm.selectedItemZoneinterventionprogramme.id_district = null;
			if (vm.selectedItemZoneinterventionprogramme.menage_beneficiaire_prevu) {
				vm.selectedItemZoneinterventionprogramme.menage_beneficiaire_prevu = parseInt(vm.selectedItemZoneinterventionprogramme.menage_beneficiaire_prevu);
			} else vm.selectedItemZoneinterventionprogramme.menage_beneficiaire_prevu = null;
			if (vm.selectedItemZoneinterventionprogramme.individu_beneficiaire_prevu) {
				vm.selectedItemZoneinterventionprogramme.individu_beneficiaire_prevu = parseInt(vm.selectedItemZoneinterventionprogramme.individu_beneficiaire_prevu);
			} else vm.selectedItemZoneinterventionprogramme.individu_beneficiaire_prevu = null;
			vm.selectedItemZoneinterventionprogramme.$edit = true;	
        };
        vm.supprimerZoneinterventionprogramme = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutZoneinterventionprogramme(vm.selectedItemZoneinterventionprogramme,1);
			}, function() {
			});
        }
        function test_existence_ziprg (item,suppression) {    
			insert_in_base_ziprg(item,suppression);
        }
        vm.modifierProgrammeZIPRG = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsProgramme.forEach(function(ax) {
				if(parseInt(ax.id)==parseInt(item.id_programme)) {
					item.id_programme = ax.id; 
					item.programme=[];
					item.programme.push(ax);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					item.id_programme = null; 
					item.programme=[];
			}
		}
        vm.modifierRegionZIPRG = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsRegion.forEach(function(ax) {
				if(parseInt(ax.id)==parseInt(item.id_region)) {
					item.id_region = ax.id; 
					item.region=[];
					item.region.push(ax);
					vm.nontrouvee=false;
					vm.allRecordsDistrict = vm.allRecordsDistrict.filter(function(obj) {
						return obj.region_id == item.id_region;
					});
					console.log(vm.allRecordsDistrict);
				}
			});
			if(vm.nontrouvee==true) {				
					item.id_region = null; 
					item.region=[];
					vm.allRecordsDistrict =vm.all_district;
			}
		}
        vm.modifierDistrictZIPRG = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsDistrict.forEach(function(ax) {
				if(parseInt(ax.id)==parseInt(item.id_district)) {
					item.id_district = ax.id; 
					item.district=[];
					item.district.push(ax);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					item.id_district = null; 
					item.district=[];
			}
		}
		// FIN ZONE D'INTERVENTION PROGRAMME	
		// DEBUT FINANCEMENT PROGRAMME	
		function ajoutFinancementprogramme(entite,suppression) {
			insert_in_baseFinancementprogramme(entite,suppression);
        }
        function insert_in_baseFinancementprogramme(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemFinancementprogramme==false) {
			   getId = vm.selectedItemFinancementprogramme.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				id_programme: entite.id_programme,
				id_source_financement: entite.id_source_financement,
				id_axe_strategique: entite.id_axe_strategique,
				id_devise: entite.id_devise,
				id_type_secteur: entite.id_type_secteur,
				budget_initial: entite.budget_initial,
				budget_modifie: entite.budget_modifie,
			});       
			//factory
			apiFactory.add("financement_programme/index",datas, config).success(function (data) {
				if (NouvelItemFinancementprogramme == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemFinancementprogramme.id = entite.id;
					  vm.selectedItemFinancementprogramme.id_programme = entite.id_programme;
					  vm.selectedItemFinancementprogramme.programme = entite.programme;
					  vm.selectedItemFinancementprogramme.id_source_financement = entite.id_source_financement;
					  vm.selectedItemFinancementprogramme.sourcefinancement = entite.sourcefinancement;
					  vm.selectedItemFinancementprogramme.id_axe_strategique = entite.id_axe_strategique;
					  vm.selectedItemFinancementprogramme.axestrategique = entite.axestrategique;
					  vm.selectedItemFinancementprogramme.id_devise = entite.id_devise;
					  vm.selectedItemFinancementprogramme.devise = entite.devise;
					  vm.selectedItemFinancementprogramme.id_type_secteur = entite.id_type_secteur;
					  vm.selectedItemFinancementprogramme.typesecteur = entite.typesecteur;
					  vm.selectedItemFinancementprogramme.budget_initial = entite.budget_initial;
					  vm.selectedItemFinancementprogramme.budget_modifie = entite.budget_modifie;
					  vm.selectedItemFinancementprogramme.$selected = false;
					  vm.selectedItemFinancementprogramme.$edit = false;
					  // vm.selectedItemFinancementprogramme ={};
						vm.afficherboutonModifSuprfinancementprogramme = 0 ;
						vm.afficherboutonnouveaufinancementprogramme = 1 ;
					  vm.action="Modification d'un enregistrement de DDB (Annuaire): Source de finacement";
					} else {    
						vm.selectedItemProgramme.detail_financement_programme = vm.selectedItemProgramme.detail_financement_programme.filter(function(obj) {
							return obj.id !== vm.selectedItemFinancementprogramme.id;
						});
					  vm.action="Suppression d'un enregistrement de DDB (Annuaire): Source de finacement";
					}
				} else {
                    var item = {
						id:String(data.response) ,
						id_programme: entite.id_programme,
						programme: entite.programme,
						id_source_financement:entite.id_source_financement,
						sourcefinancement:entite.sourcefinancement,
						id_axe_strategique: entite.id_axe_strategique,
						axestrategique: entite.axestrategique,
						id_devise: entite.id_devise,
						devise: entite.devise,
						id_type_secteur: entite.id_type_secteur,
						typesecteur: entite.typesecteur,
						budget_initial: entite.budget_initial,
						budget_modifie: entite.budget_modifie,
					};
					vm.selectedItemProgramme.detail_financement_programme.push(item); 
					NouvelItemFinancementprogramme=false;
					  vm.action="Ajout d'un enregistrement de DDB (Annuaire): Source de finacement";
				}
				entite.$selected=false;
				entite.$edit=false;
				vm.affichageMasquefinancementprogramme =0;
				//add historique : suppresion/modifcation/ajout DDB Annuaire : source de financement
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var datas = $.param({
					action:vm.action,
					id_utilisateur:vm.id_utilisateur
				});
				//factory
				apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
				});								
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionFinancementprogramme= function (item) {     
            vm.selectedItemFinancementprogramme = item;
            vm.afficherboutonModifSuprfinancementprogramme = 1 ;
            vm.affichageMasquefinancementprogramme = 0 ;
            vm.afficherboutonnouveaufinancementprogramme = 1 ;
        };
        $scope.$watch('vm.selectedItemFinancementprogramme', function() {
			if (vm.selectedItemProgramme.length==0) return;
			vm.selectedItemProgramme.detail_financement_programme.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemFinancementprogramme.$selected = true;
        });
        vm.ajouterFinancementprogramme = function () {
			vm.titrefinancementprogramme="Ajout Financement programme";
			vm.affichageMasquefinancementprogramme = 1 ;
			vm.financementprogramme.id=0;
			vm.financementprogramme.id_programme=vm.selectedItemProgramme.id;
			vm.financementprogramme.programme=null;
			vm.financementprogramme.id_source_financement=null;
			vm.financementprogramme.sourcefinancement=null;
			vm.financementprogramme.id_axe_strategique=null;
			vm.financementprogramme.axestrategique=null;
			vm.financementprogramme.id_devise=null;
			vm.financementprogramme.devise=null;
			vm.financementprogramme.id_type_secteur=[];
			vm.financementprogramme.typesecteur=null;
			vm.financementprogramme.budget_initial=null;
			vm.financementprogramme.budget_modifie=null;
			vm.financementprogramme.detail_charge=1;
			NouvelItemFinancementprogramme = true ;			
        };
        vm.annulerFinancementprogramme = function(item) {
			vm.selectedItemFinancementprogramme = {} ;
			vm.selectedItemFinancementprogramme.$selected = false;
			vm.affichageMasquefinancementprogramme= 0 ;
			vm.afficherboutonnouveaufinancementprogramme = 1 ;
			vm.afficherboutonModifSuprfinancementprogramme = 0 ;
			NouvelItemFinancementprogramme = false;
       };
        vm.modifierFinancementprogramme = function(item) {
			vm.titrefinancementprogramme="Modification Financement programme";
			NouvelItemFinancementprogramme = false ;
			vm.affichageMasquefinancementprogramme = 1 ;
			vm.financementprogramme.id = vm.selectedItemFinancementprogramme.id ;
			vm.financementprogramme.id_programme = vm.selectedItemFinancementprogramme.id_programme ;			
			if(vm.selectedItemFinancementprogramme.id_source_financement) {
				vm.financementprogramme.id_source_financement = parseInt(vm.selectedItemFinancementprogramme.id_source_financement);
			} else vm.financementprogramme.id_source_financement = null;
			if(vm.selectedItemFinancementprogramme.id_axe_strategique) {
				vm.financementprogramme.id_axe_strategique = parseInt(vm.selectedItemFinancementprogramme.id_axe_strategique);
			} else vm.financementprogramme.id_axe_strategique = null;
			if(vm.selectedItemFinancementprogramme.id_devise) {
				vm.financementprogramme.id_devise = parseInt(vm.selectedItemFinancementprogramme.id_devise);
			} else vm.financementprogramme.id_devise = null;
			if(vm.selectedItemFinancementprogramme.id_type_secteur) {
				vm.financementprogramme.id_type_secteur = parseInt(vm.selectedItemFinancementprogramme.id_type_secteur);
			} else vm.financementprogramme.id_type_secteur = null;
			if(vm.selectedItemFinancementprogramme.budget_initial) {
				vm.financementprogramme.budget_initial = parseFloat(vm.selectedItemFinancementprogramme.budget_initial);
			} else vm.financementprogramme.budget_initial = null;
			if(vm.selectedItemFinancementprogramme.budget_modifie) {
				vm.financementprogramme.budget_modifie = parseFloat(vm.selectedItemFinancementprogramme.budget_modifie);
			} else vm.financementprogramme.budget_modifie = null;			
			vm.financementprogramme.programme = vm.selectedItemFinancementprogramme.programme ;
			vm.financementprogramme.sourcefinancement = vm.selectedItemFinancementprogramme.sourcefinancement;
			vm.financementprogramme.axestrategique = vm.selectedItemFinancementprogramme.axestrategique;
			vm.financementprogramme.devise = vm.selectedItemFinancementprogramme.devise;
			vm.financementprogramme.typesecteur = vm.selectedItemFinancementprogramme.typesecteur;
			vm.afficherboutonModifSuprfinancementprogramme = 0;
			vm.afficherboutonnouveaufinancementprogramme = 0;  
        };
        vm.supprimerFinancementprogramme = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('CONFIRMATION')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutFinancementprogramme(vm.selectedItemFinancementprogramme,1);
			}, function() {
			});
        }
        vm.modifierProgrammeFNP = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsProgramme.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_programme)) {
					vm.nontrouvee=false;
					vm.financementprogramme.id_programme=prg.id;
					item.id_programme=prg.id;
					vm.financementprogramme.programme=[];
					vm.financementprogramme.programme.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementprogramme.id_programme = null; 
					vm.financementprogramme.programme=[];
			}
		}	
        vm.modifierSourcefinancementFNP = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsSourcefinancement.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_source_financement)) {
					vm.nontrouvee=false;
					vm.financementprogramme.id_source_financement=prg.id;
					item.id_source_financement=prg.id;
					vm.financementprogramme.sourcefinancement=[];
					vm.financementprogramme.sourcefinancement.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementprogramme.id_source_financement = null; 
					vm.financementprogramme.sourcefinancement=[];
			}
		}	
        vm.modifierAxestrategiqueFNP = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsAxestrategique.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_axe_strategique)) {
					vm.nontrouvee=false;
					vm.financementprogramme.id_axe_strategique=prg.id;
					item.id_axe_strategique=prg.id;
					vm.financementprogramme.axestrategique=[];
					vm.financementprogramme.axestrategique.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementprogramme.id_axe_strategique = null; 
					vm.financementprogramme.axestrategique=[];
			}
		}	
        vm.modifierTypesecteurFNP = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypesecteur.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_type_secteur)) {
					vm.nontrouvee=false;
					vm.financementprogramme.id_type_secteur=prg.id;
					item.id_type_secteur=prg.id;
					vm.financementprogramme.typesecteur=[];
					vm.financementprogramme.typesecteur.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementprogramme.id_type_secteur = null; 
					vm.financementprogramme.typesecteur=[];
			}
		}	
        vm.modifierDeviseFNP = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsDevise.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_devise)) {
					vm.nontrouvee=false;
					vm.financementprogramme.id_devise=prg.id;
					item.id_devise=prg.id;
					vm.financementprogramme.devise=[];
					vm.financementprogramme.devise.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementprogramme.id_devise = null; 
					vm.financementprogramme.devise=[];
			}
		}	
		// FIN FINANCEMENT PROGRAMME
		// DEBUT INTERVENTION	
		function ajoutIntervention(entite,suppression) {
			insert_in_baseIntervention(entite,suppression);
        }
        function insert_in_baseIntervention(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemIntervention==false) {
			   getId = vm.selectedItemIntervention.id; 
			} 
			vm.nombre = vm.ListeDetailtypetransfert.length;
			var txtTmp="";
			txtTmp += "supprimer" +":\"" + suppression + "\",";	
			txtTmp += "id" +":\"" + getId + "\",";	
			txtTmp += "id_programme" +":\"" + entite.id_programme + "\",";	
			txtTmp += "identifiant" +":\"" + entite.identifiant + "\",";	
			txtTmp += "nom_informateur" +":\"" + entite.nom_informateur + "\",";	
			txtTmp += "prenom_informateur" +":\"" + entite.prenom_informateur + "\",";	
			txtTmp += "telephone_informateur" +":\"" + entite.telephone_informateur + "\",";	
			txtTmp += "email_informateur" +":\"" + entite.email_informateur + "\",";	
			txtTmp += "ministere_tutelle" +":\"" + entite.ministere_tutelle + "\",";	
			txtTmp += "intitule" +":\"" + entite.intitule + "\",";	
			txtTmp += "id_acteur" +":\"" + entite.id_acteur + "\",";	
			txtTmp += "categorie_intervention" +":\"" + entite.categorie_intervention + "\",";	
			txtTmp += "inscription_budgetaire" +":\"" + entite.inscription_budgetaire + "\",";	
			txtTmp += "programmation" +":\"" + entite.programmation + "\",";	
			txtTmp += "duree" +":\"" + entite.duree + "\",";	
			txtTmp += "unite_duree" +":\"" + entite.unite_duree + "\",";	
			txtTmp += "id_type_transfert" +":\"" + entite.id_type_transfert + "\",";	
			txtTmp += "flag_integration_donnees" +":\"" + entite.flag_integration_donnees + "\",";	
			txtTmp += "nouvelle_integration" +":\"" + entite.nouvelle_integration + "\",";	
			txtTmp += "commentaire" +":\"" + entite.commentaire + "\",";	
			txtTmp += "id_type_action" +":\"" + entite.id_type_action + "\",";	
			txtTmp += "id_frequence_transfert" +":\"" + entite.id_frequence_transfert + "\",";	
			var i=0;
			if(vm.nombre >0) {
				vm.txt="";
				console.log(vm.ListeDetailtypetransfert);
				vm.ListeDetailtypetransfert.forEach(function(det) {
					// Stocker seulement les id >0 et qte/val >0 ; le reste à ignorer
					if(parseInt(det.id_detail_type_transfert) >0 && parseFloat(det.valeur_quantite) >0) {
						txtTmp += "id_intervention_" + i +":\"" + getId + "\",";	
						txtTmp += "id_detail_type_transfert_" + i +":\"" + det.id_detail_type_transfert + "\",";	
						txtTmp += "valeur_quantite_" + i +":\"" + det.valeur_quantite + "\",";	
						i=i + 1;
					}
				});	
				vm.allRecordsDetailtypetransfert.forEach(function(det) {	
					// Enlever l'ancien choix type transfert
					if(parseInt(entite.id_type_transfert) != det.id_type_transfert && parseFloat(det.valeur_quantite) >0) {
						det.valeur_quantite=null;
						det.id_detail_type_transfert=0;
					}
				});	
				vm.detail_transfert ="";
				vm.ListeDetailtypetransfert.forEach(function(det) {
					if(parseInt(det.id_detail_type_transfert) >0 && parseFloat(det.valeur_quantite) >0) {
						vm.allRecordsDetailtypetransfert.forEach(function(obj) {	
							// Ajouter le nouveau choix type transfert
							if(parseInt(obj.id) == det.id_detail_type_transfert) {
								obj.valeur_quantite=det.valeur_quantite;
								obj.id_detail_type_transfert=det.id_detail_type_transfert;
								vm.detail_transfert =vm.detail_transfert  + det.description + " " + det.valeur_quantite + " " + det.unitedemesure[0].description + String.fromCharCode(13)+"; ";
							}
						});	
					}	
				});	
			}			
			txtTmp += "nombre_detail_type_transfert" +":\"" + i + "\"";	

			txtTmp = txtTmp.replace(new RegExp('\'', 'g'),'\\\'');
			txtTmp = txtTmp.replace(new RegExp('(\r\n|\r|\n)', 'g'),'');
			var donnees = $.param(eval('({' + txtTmp + '})'));

			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				id_programme: entite.id_programme,
				identifiant: entite.identifiant,
				nom_informateur: entite.nom_informateur,
				prenom_informateur: entite.prenom_informateur,
				telephone_informateur: entite.telephone_informateur,
				email_informateur: entite.email_informateur,
				ministere_tutelle: entite.ministere_tutelle,
				intitule: entite.intitule,
				id_acteur: entite.id_acteur,
				categorie_intervention: entite.categorie_intervention,
				inscription_budgetaire: entite.inscription_budgetaire,
				programmation: entite.programmation,
				duree: entite.duree,
				unite_duree: entite.unite_duree,
				id_type_transfert: entite.id_type_transfert,
				flag_integration_donnees: entite.flag_integration_donnees,
				nouvelle_integration: entite.nouvelle_integration,
				commentaire: entite.commentaire,
				id_type_action: entite.id_type_action,				
				id_frequence_transfert: entite.id_frequence_transfert,				
				nombre_detail_type_transfert: i,
			});       
			//factory
			// apiFactory.add("intervention/index",datas, config).success(function (data) {
			apiFactory.add("intervention/index",donnees, config).success(function (data) {
				if (NouvelItemIntervention == false) {
					// Update or delete: id exclu  
					console.log(data);
					if(suppression==0) {
					  vm.selectedItemIntervention.id = entite.id;
					  vm.selectedItemIntervention.id_programme = entite.id_programme;
					  vm.selectedItemIntervention.identifiant = entite.identifiant;
					  vm.selectedItemIntervention.nom_informateur = entite.nom_informateur;
					  vm.selectedItemIntervention.prenom_informateur = entite.prenom_informateur;
					  vm.selectedItemIntervention.telephone_informateur = entite.telephone_informateur;
					  vm.selectedItemIntervention.email_informateur = entite.email_informateur;
					  vm.selectedItemIntervention.ministere_tutelle = entite.ministere_tutelle;
					  vm.selectedItemIntervention.intitule = entite.intitule;
					  vm.selectedItemIntervention.id_acteur = entite.id_acteur;
					  vm.selectedItemIntervention.acteur = entite.acteur;
					  vm.selectedItemIntervention.categorie_intervention = entite.categorie_intervention;
					  vm.selectedItemIntervention.inscription_budgetaire = entite.inscription_budgetaire;
					  vm.selectedItemIntervention.programmation = entite.programmation;
					  vm.selectedItemIntervention.duree = entite.duree;
					  vm.selectedItemIntervention.unite_duree = entite.unite_duree;
					  vm.selectedItemIntervention.id_type_transfert = entite.id_type_transfert;
					  vm.selectedItemIntervention.typetransfert = entite.typetransfert;
					  vm.selectedItemIntervention.flag_integration_donnees = entite.flag_integration_donnees;
					  vm.selectedItemIntervention.nouvelle_integration = entite.nouvelle_integration;
					  vm.selectedItemIntervention.commentaire = entite.commentaire;
					  vm.selectedItemIntervention.id_type_action = entite.id_type_action;
					  vm.selectedItemIntervention.typeaction = entite.typeaction;
					  vm.selectedItemIntervention.id_frequence_transfert = entite.id_frequence_transfert;
					  vm.selectedItemIntervention.frequencetransfert = entite.frequencetransfert;
					  vm.selectedItemIntervention.detail_transfert = vm.detail_transfert;
					  vm.selectedItemIntervention.$selected = false;
					  vm.selectedItemIntervention.$edit = false;
						vm.afficherboutonModifSuprintervention = 0 ;
						vm.afficherboutonnouveauintervention = 1 ;
					  vm.action="Modification d'un enregistrement de DDB (Annuaire): Intervention";
					} else {    
						vm.selectedItemProgramme.detail_intervention = vm.selectedItemProgramme.detail_intervention.filter(function(obj) {
							return obj.id !== vm.selectedItemIntervention.id;
						});
					  vm.action="Suppression d'un enregistrement de DDB (Annuaire): Intervention";
					}
				} else {
                    var item = {
						id:String(data.response) ,
						id_programme: entite.id_programme,
						identifiant: entite.identifiant,
						nom_informateur:entite.nom_informateur,
						prenom_informateur:entite.prenom_informateur,
						telephone_informateur: entite.telephone_informateur,
						email_informateur: entite.email_informateur,
						ministere_tutelle: entite.ministere_tutelle,
						intitule: entite.intitule,
						id_acteur: entite.id_acteur,
						acteur: entite.acteur,
						categorie_intervention: entite.categorie_intervention,
						inscription_budgetaire: entite.inscription_budgetaire,
						programmation: entite.programmation,
						duree: entite.duree,
						unite_duree: entite.unite_duree,
						id_type_transfert: entite.id_type_transfert,
						typetransfert: entite.typetransfert,
						flag_integration_donnees: entite.flag_integration_donnees,
						nouvelle_integration: entite.nouvelle_integration,
						commentaire: entite.commentaire,
						id_type_action: entite.id_type_action,
						typeaction: entite.typeaction,
						id_frequence_transfert: entite.id_frequence_transfert,
						frequencetransfert: entite.frequencetransfert,
						detail_transfert: vm.detail_transfert,
					};
					vm.selectedItemProgramme.detail_intervention.push(item); 
					NouvelItemIntervention=false;
					  vm.action="Ajout d'un enregistrement de DDB (Annuaire): Intervention";
				}
				entite.$selected=false;
				entite.$edit=false;
				vm.selectedItemIntervention ={};
				vm.affichageMasqueintervention =0;
				//add historique : suppresion/modifcation/ajout DDB Annuaire : intervention
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var datas = $.param({
					action:vm.action,
					id_utilisateur:vm.id_utilisateur
				});
				//factory
				apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
				});								
			}).error(function (data) {
				console.log();
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionIntervention= function (item) {     
            vm.selectedItemIntervention = item;
            currentItemIntervention = angular.copy(vm.selectedItemIntervention);       
            vm.afficherboutonModifSuprintervention = 1 ;
            vm.affichageMasqueintervention = 0 ;
            vm.afficherboutonnouveauintervention = 1 ;
            NouvelItemIntervention=false;
			if(parseInt(vm.selectedItemIntervention.detail_charge)==0) {
				var inb_rien =0;
				vm.affiche_load=true;
				apiFactory.getAPIgeneraliserREST("zone_intervention/index","cle_etrangere",vm.selectedItemIntervention.id).then(function(result) { 				
					item.detail_zone_intervention = []; 
					if(result.data.response.length >0) {
						item.detail_zone_intervention = result.data.response; 
						vm.selectedItemIntervention.detail_zone_intervention = result.data.response; 
					} else {
						inb_rien =1;
					}			
					apiFactory.getAPIgeneraliserREST("financement_intervention/index","cle_etrangere",vm.selectedItemIntervention.id).then(function(result) { 				
						item.detail_financement_intervention = []; 
						if(result.data.response.length >0) {
							item.detail_financement_intervention = result.data.response; 
							vm.selectedItemIntervention.detail_financement_intervention = result.data.response; 
						} else {
							inb_rien =2;							
						}						
						apiFactory.getAPIgeneraliser("detail_type_transfert/index","id_intervetion",vm.selectedItemIntervention.id).then(function(result) {
							vm.ListeDetailtypetransfert=[];
							if(result.data.response.length >0) {
								vm.ListeDetailtypetransfert = result.data.response; 
								vm.ListeDetailtypetransfert.forEach(function(it) {
									// Formatage valeur_quantite en vue de modification
									if(it.valeur_quantite) {
										it.valeur_quantite = parseFloat(it.valeur_quantite);
									}
								});
								vm.allRecordsDetailtypetransfert=vm.ListeDetailtypetransfert;
							} else {
								inb_rien =3;							
							}
							console.log(vm.ListeDetailtypetransfert);
						})
						if(inb_rien==3) {
							vm.showAlert("INFORMATION","Aucun détail d'enregistrement trouvé !");
						}	
						item.detail_charge=1;
						vm.affiche_load=false;						
					});
				});
			}			
        };
        $scope.$watch('vm.selectedItemIntervention', function() {
			if (vm.selectedItemProgramme.length==0) return;
			vm.selectedItemProgramme.detail_intervention.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemIntervention.$selected = true;
        });
        vm.ajouterIntervention = function () {
			vm.titreintervention="Ajout Intervention";
			vm.affichageMasqueintervention = 1 ;
			vm.intervention.id=0;
			vm.intervention.id_programme=vm.selectedItemProgramme.id;
			vm.intervention.identifiant=null;
			vm.intervention.nom_informateur=null;
			vm.intervention.prenom_informateur=null;
			vm.intervention.telephone_informateur=null;
			vm.intervention.email_informateur=null;
			vm.intervention.ministere_tutelle=null;
			vm.intervention.intitule=null;
			vm.intervention.id_acteur=null;
			vm.intervention.acteur=[];
			vm.intervention.categorie_intervention=null;
			vm.intervention.inscription_budgetaire=null;
			vm.intervention.programmation=null;
			vm.intervention.duree=null;
			vm.intervention.unite_duree=null;
			vm.intervention.id_type_transfert=null;
			vm.intervention.typetransfert=[];
			vm.intervention.flag_integration_donnees=null;
			vm.intervention.nouvelle_integration=null;
			vm.intervention.commentaire=null;
			vm.intervention.id_type_action=null;
			vm.intervention.typeaction=[];
			vm.intervention.id_frequence_transfert=null;
			vm.intervention.frequencetransfert=[];
			vm.intervention.flag_integration_donnees=false;
			vm.intervention.nouvelle_integration=false;
			vm.intervention.detail_charge=1;
			NouvelItemIntervention = true ;			
        };
        vm.annulerIntervention = function(item) {
			vm.selectedItemIntervention = {} ;
			vm.selectedItemIntervention.$selected = false;
			vm.affichageMasqueintervention= 0 ;
			vm.afficherboutonnouveauintervention = 1 ;
			vm.afficherboutonModifSuprintervention = 0 ;
			NouvelItemIntervention = false;
       };
        vm.modifierIntervention = function(item) {
			vm.titreintervention="Modification Intervention";
			NouvelItemIntervention = false ;
			vm.affichageMasqueintervention = 1 ;
			vm.intervention.id = vm.selectedItemIntervention.id ;			
			vm.intervention.id_programme = vm.selectedItemIntervention.id_programme ;			
			vm.intervention.identifiant=vm.selectedItemIntervention.identifiant;
			vm.intervention.nom_informateur=vm.selectedItemIntervention.nom_informateur;
			vm.intervention.prenom_informateur=vm.selectedItemIntervention.prenom_informateur;
			vm.intervention.telephone_informateur=vm.selectedItemIntervention.telephone_informateur;
			vm.intervention.email_informateur=vm.selectedItemIntervention.email_informateur;
			vm.intervention.ministere_tutelle=vm.selectedItemIntervention.ministere_tutelle;
			vm.intervention.intitule=vm.selectedItemIntervention.intitule;
			if(vm.selectedItemIntervention.id_acteur) {
				vm.intervention.id_acteur=parseInt(vm.selectedItemIntervention.id_acteur);
			} else vm.intervention.id_acteur=null;			
			vm.intervention.acteur=vm.selectedItemIntervention.acteur;
			vm.intervention.categorie_intervention=vm.selectedItemIntervention.categorie_intervention;
			vm.intervention.inscription_budgetaire=vm.selectedItemIntervention.inscription_budgetaire;
			vm.intervention.programmation=vm.selectedItemIntervention.programmation;
			if(vm.selectedItemIntervention.duree) {
				vm.intervention.duree=parseInt(vm.selectedItemIntervention.duree);
			} else vm.intervention.duree=null;
			vm.intervention.unite_duree=vm.selectedItemIntervention.unite_duree;
			if(vm.selectedItemIntervention.id_type_transfert) {
				vm.intervention.id_type_transfert=parseInt(vm.selectedItemIntervention.id_type_transfert);
			} else vm.intervention.id_type_transfert=null;
			vm.intervention.typetransfert=vm.selectedItemIntervention.typetransfert;
			vm.intervention.flag_integration_donnees=vm.selectedItemIntervention.flag_integration_donnees;
			vm.intervention.nouvelle_integration=vm.selectedItemIntervention.nouvelle_integration;
			vm.intervention.commentaire=vm.selectedItemIntervention.commentaire;
			if(vm.selectedItemIntervention.id_type_action) {
				vm.intervention.id_type_action=parseInt(vm.selectedItemIntervention.id_type_action);
			} else vm.intervention.id_type_action=null;
			vm.intervention.typeaction=vm.selectedItemIntervention.typeaction;			
			if(vm.intervention.id_type_transfert) {
				console.log(vm.intervention.id_type_transfert);
				if(vm.selectedItemIntervention.detail_type_transfert_intervention) {
					vm.ListeDetailtypetransfert =vm.allRecordsDetailtypetransfert;
					console.log(vm.ListeDetailtypetransfert);
					vm.ListeDetailtypetransfert = vm.ListeDetailtypetransfert.filter(function(obj) {
						return parseInt(obj.id_type_transfert) == parseInt(vm.intervention.id_type_transfert);
					});		
					console.log(vm.ListeDetailtypetransfert);
					// vm.ListeDetailtypetransfert = vm.selectedItemIntervention.detail_type_transfert_intervention;					
					vm.ListeDetailtypetransfert.forEach(function(dt) {
						dt.valeur_quantite = parseFloat(dt.valeur_quantite);
						dt.id_detail_type_transfert = parseInt(dt.id_detail_type_transfert);
					});					
				} else {	
					vm.ListeDetailtypetransfert =vm.allRecordsDetailtypetransfert;
					vm.ListeDetailtypetransfert = vm.ListeDetailtypetransfert.filter(function(obj) {
						return parseInt(obj.id_type_transfert) == parseInt(vm.intervention.id_type_transfert);
					});
				}	
			}	
			if(vm.selectedItemIntervention.id_frequence_transfert) {
				vm.intervention.id_frequence_transfert=parseInt(vm.selectedItemIntervention.id_frequence_transfert);
			} else vm.intervention.id_frequence_transfert=null;
			vm.intervention.frequencetransfert=vm.selectedItemIntervention.frequencetransfert;
			vm.afficherboutonModifSuprintervention = 0;
			vm.afficherboutonnouveauintervention = 0;  
			console.log(vm.intervention);
        };
        vm.supprimerIntervention = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('CONFIRMATION')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutIntervention(vm.selectedItemIntervention,1);
			}, function() {
			});
        }
        vm.modifierActeur = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsActeur.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_acteur)) {
					vm.nontrouvee=false;
					vm.intervention.id_acteur=prg.id;
					item.id_acteur=prg.id;
					vm.intervention.acteur=[];
					vm.intervention.acteur.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.intervention.id_acteur = null; 
					vm.intervention.acteur=[];
			}
		}	
        vm.modifierTypetransfert = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypetransfert.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_type_transfert)) {
					vm.nontrouvee=false;
					vm.intervention.id_type_transfert=prg.id;
					item.id_type_transfert=prg.id;
					vm.intervention.typetransfert=[];
					vm.intervention.typetransfert.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.intervention.id_type_transfert = null; 
					vm.intervention.typetransfert=[];
			} else {
				// Affichage détail et saisie quantité ou valeur
				vm.ListeDetailtypetransfert=vm.allRecordsDetailtypetransfert;
				vm.ListeDetailtypetransfert = vm.allRecordsDetailtypetransfert.filter(function(obj) {
					return parseInt(obj.id_type_transfert) == parseInt(item.id_type_transfert);
				});
			}
		}	
        vm.modifierTypeactionIntervention = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypeaction.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_type_action)) {
					vm.nontrouvee=false;
					vm.intervention.id_type_action=prg.id;
					item.id_type_action=prg.id;
					vm.intervention.typeaction=[];
					vm.intervention.typeaction.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.intervention.id_type_action = null; 
					vm.intervention.typeaction=[];
			}
		}	
        vm.modifierFrequencetransfert = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsFrequencetransfert.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_frequence_transfert)) {
					vm.nontrouvee=false;
					vm.intervention.id_frequence_transfert=prg.id;
					item.id_frequence_transfert=prg.id;
					vm.intervention.frequencetransfert=[];
					vm.intervention.frequencetransfert.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.intervention.id_frequence_transfert = null; 
					vm.intervention.frequencetransfert=[];
			}
		}	
		// FIN INTERVENTION
	// DEBUT FINANCEMENT INTERVENTION	
		function ajoutFinancementintervention(entite,suppression) {
			insert_in_baseFinancementintervention(entite,suppression);
        }
        function insert_in_baseFinancementintervention(entite,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemFinancementintervention==false) {
			   getId = vm.selectedItemFinancementintervention.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				id_intervention: entite.id_intervention,
				id_source_financement: entite.id_source_financement,
				id_action_strategique: entite.id_action_strategique,
				id_devise: entite.id_devise,
				id_type_secteur: entite.id_type_secteur,
				budget_initial: entite.budget_initial,
				budget_modifie: entite.budget_modifie,
			});       
			//factory
			apiFactory.add("financement_intervention/index",datas, config).success(function (data) {
				if (NouvelItemFinancementintervention == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemFinancementintervention.id = entite.id;
					  vm.selectedItemFinancementintervention.id_intervention = entite.id_intervention;
					  vm.selectedItemFinancementintervention.intervention = entite.intervention;
					  vm.selectedItemFinancementintervention.id_source_financement = entite.id_source_financement;
					  vm.selectedItemFinancementintervention.sourcefinancement = entite.sourcefinancement;
					  vm.selectedItemFinancementintervention.id_action_strategique = entite.id_action_strategique;
					  vm.selectedItemFinancementintervention.actionstrategique = entite.actionstrategique;
					  vm.selectedItemFinancementintervention.id_devise = entite.id_devise;
					  vm.selectedItemFinancementintervention.devise = entite.devise;
					  vm.selectedItemFinancementintervention.id_type_secteur = entite.id_type_secteur;
					  vm.selectedItemFinancementintervention.typesecteur = entite.typesecteur;
					  vm.selectedItemFinancementintervention.budget_initial = entite.budget_initial;
					  vm.selectedItemFinancementintervention.budget_modifie = entite.budget_modifie;
					  vm.selectedItemFinancementintervention.$selected = false;
					  vm.selectedItemFinancementintervention.$edit = false;
					  // vm.selectedItemFinancementintervention ={};
						vm.afficherboutonModifSuprfinancementintervention = 0 ;
						vm.afficherboutonnouveaufinancementintervention = 1 ;
					  vm.action="Modification d'un enregistrement de DDB (Annuaire): Financement Intervention";
					} else {    
						vm.selectedItemIntervention.detail_financement_intervention = vm.selectedItemIntervention.detail_financement_intervention.filter(function(obj) {
							return obj.id !== vm.selectedItemFinancementintervention.id;
						});
					  vm.action="Suppression d'un enregistrement de DDB (Annuaire): Financement Intervention";
					}
				} else {
                    var item = {
						id:String(data.response) ,
						id_intervention: entite.id_intervention,
						intervention: entite.intervention,
						id_source_financement:entite.id_source_financement,
						sourcefinancement:entite.sourcefinancement,
						id_action_strategique: entite.id_action_strategique,
						actionstrategique: entite.actionstrategique,
						id_devise: entite.id_devise,
						devise: entite.devise,
						id_type_secteur: entite.id_type_secteur,
						typesecteur: entite.typesecteur,
						budget_initial: entite.budget_initial,
						budget_modifie: entite.budget_modifie,
					};
					vm.selectedItemIntervention.detail_financement_intervention.push(item); 
					NouvelItemFinancementintervention=false;
					  vm.action="Ajout d'un enregistrement de DDB (Annuaire): Financement Intervention";
				}
				entite.$selected=false;
				entite.$edit=false;
				vm.affichageMasquefinancementintervention =0;
				//add historique : suppresion/modifcation/ajout DDB Annuaire : financement intervention
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var datas = $.param({
					action:vm.action,
					id_utilisateur:vm.id_utilisateur
				});
				//factory
				apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
				});								
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
        }
        vm.selectionFinancementintervention= function (item) {     
            vm.selectedItemFinancementintervention = item;
            vm.afficherboutonModifSuprfinancementintervention = 1 ;
            vm.affichageMasquefinancementintervention = 0 ;
            vm.afficherboutonnouveaufinancementintervention = 1 ;
        };
        $scope.$watch('vm.selectedItemFinancementintervention', function() {
			if (vm.selectedItemIntervention.length==0) return;
			vm.selectedItemIntervention.detail_financement_intervention.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemFinancementintervention.$selected = true;
        });
        vm.ajouterFinancementintervention = function () {
			vm.titrefinancementintervention="Ajout Financement intervention";
			vm.affichageMasquefinancementintervention = 1 ;
			vm.financementintervention.id=0;
			vm.financementintervention.id_intervention=vm.selectedItemIntervention.id;
			vm.financementintervention.intervention=null;
			vm.financementintervention.id_source_financement=null;
			vm.financementintervention.sourcefinancement=null;
			vm.financementintervention.id_action_strategique=null;
			vm.financementintervention.actionstrategique=null;
			vm.financementintervention.id_devise=null;
			vm.financementintervention.devise=null;
			vm.financementintervention.id_type_secteur=[];
			vm.financementintervention.typesecteur=null;
			vm.financementintervention.budget_initial=null;
			vm.financementintervention.budget_modifie=null;
			vm.financementintervention.detail_charge=1;
			NouvelItemFinancementintervention = true ;			
        };
        vm.annulerFinancementintervention = function(item) {
			vm.selectedItemFinancementintervention = {} ;
			vm.selectedItemFinancementintervention.$selected = false;
			vm.affichageMasquefinancementintervention= 0 ;
			vm.afficherboutonnouveaufinancementintervention = 1 ;
			vm.afficherboutonModifSuprfinancementintervention = 0 ;
			NouvelItemFinancementintervention = false;
       };
        vm.modifierFinancementintervention = function(item) {
			vm.titrefinancementintervention="Modification Financement intervention";
			NouvelItemFinancementintervention = false ;
			vm.affichageMasquefinancementintervention = 1 ;
			vm.financementintervention.id = vm.selectedItemFinancementintervention.id ;
			vm.financementintervention.id_intervention = vm.selectedItemFinancementintervention.id_intervention ;			
			if(vm.selectedItemFinancementintervention.id_source_financement) {
				vm.financementintervention.id_source_financement = parseInt(vm.selectedItemFinancementintervention.id_source_financement);
			} else vm.financementintervention.id_source_financement = null;
			if(vm.selectedItemFinancementintervention.id_action_strategique) {
				vm.financementintervention.id_action_strategique = parseInt(vm.selectedItemFinancementintervention.id_action_strategique);
			} else vm.financementintervention.id_action_strategique = null;
			if(vm.selectedItemFinancementintervention.id_devise) {
				vm.financementintervention.id_devise = parseInt(vm.selectedItemFinancementintervention.id_devise);
			} else vm.financementintervention.id_devise = null;
			if(vm.selectedItemFinancementintervention.id_type_secteur) {
				vm.financementintervention.id_type_secteur = parseInt(vm.selectedItemFinancementintervention.id_type_secteur);
			} else vm.financementintervention.id_type_secteur = null;
			if(vm.selectedItemFinancementintervention.budget_initial) {
				vm.financementintervention.budget_initial = parseFloat(vm.selectedItemFinancementintervention.budget_initial);
			} else vm.financementintervention.budget_initial = null;
			if(vm.selectedItemFinancementintervention.budget_modifie) {
				vm.financementintervention.budget_modifie = parseFloat(vm.selectedItemFinancementintervention.budget_modifie);
			} else vm.financementintervention.budget_modifie = null;			
			vm.financementintervention.intervention = vm.selectedItemFinancementintervention.intervention ;
			vm.financementintervention.sourcefinancement = vm.selectedItemFinancementintervention.sourcefinancement;
			vm.financementintervention.actionstrategique = vm.selectedItemFinancementintervention.actionstrategique;
			vm.financementintervention.devise = vm.selectedItemFinancementintervention.devise;
			vm.financementintervention.typesecteur = vm.selectedItemFinancementintervention.typesecteur;
			vm.afficherboutonModifSuprfinancementintervention = 0;
			vm.afficherboutonnouveaufinancementintervention = 0;  
        };
        vm.supprimerFinancementintervention = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('CONFIRMATION')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutFinancementintervention(vm.selectedItemFinancementintervention,1);
			}, function() {
			});
        }
        vm.modifierProgrammeINTV = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsProgramme.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_intervention)) {
					vm.nontrouvee=false;
					vm.financementintervention.id_intervention=prg.id;
					item.id_intervention=prg.id;
					vm.financementintervention.intervention=[];
					vm.financementintervention.intervention.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementintervention.id_intervention = null; 
					vm.financementintervention.intervention=[];
			}
		}	
        vm.modifierSourcefinancementINTV = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsSourcefinancement.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_source_financement)) {
					vm.nontrouvee=false;
					vm.financementintervention.id_source_financement=prg.id;
					item.id_source_financement=prg.id;
					vm.financementintervention.sourcefinancement=[];
					vm.financementintervention.sourcefinancement.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementintervention.id_source_financement = null; 
					vm.financementintervention.sourcefinancement=[];
			}
		}	
        vm.modifierActionstrategiqueINTV = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsActionstrategique.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_action_strategique)) {
					vm.nontrouvee=false;
					vm.financementintervention.id_action_strategique=prg.id;
					item.id_action_strategique=prg.id;
					vm.financementintervention.actionstrategique=[];
					vm.financementintervention.actionstrategique.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementintervention.id_action_strategique = null; 
					vm.financementintervention.actionstrategique=[];
			}
		}	
        vm.modifierTypesecteurINTV = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsTypesecteur.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_type_secteur)) {
					vm.nontrouvee=false;
					vm.financementintervention.id_type_secteur=prg.id;
					item.id_type_secteur=prg.id;
					vm.financementintervention.typesecteur=[];
					vm.financementintervention.typesecteur.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementintervention.id_type_secteur = null; 
					vm.financementintervention.typesecteur=[];
			}
		}	
        vm.modifierDeviseINTV = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsDevise.forEach(function(prg) {
				if(parseInt(prg.id)==parseInt(item.id_devise)) {
					vm.nontrouvee=false;
					vm.financementintervention.id_devise=prg.id;
					item.id_devise=prg.id;
					vm.financementintervention.devise=[];
					vm.financementintervention.devise.push(prg);
				}
			});
			if(vm.nontrouvee==true) {				
					vm.financementintervention.id_devise = null; 
					vm.financementintervention.devise=[];
			}
		}	
		// FIN FINANCEMENT INTERVENTION		
		// DEBUT ZONE D'INTERVENTION 	
		function ajoutZoneintervention(zoneint,suppression) {
            test_existence_zoneint (zoneint,suppression);
        }
        function insert_in_base_zoneint(zoneint,suppression) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemZoneintervention==false) {
			   getId = vm.selectedItemZoneintervention.id; 
			} 
			var datas = $.param({
				supprimer:suppression,
				id:getId,      
				id_intervention: zoneint.id_intervention,
				id_fokontany: zoneint.id_fokontany,
				menage_beneficiaire_prevu: zoneint.menage_beneficiaire_prevu,
				individu_beneficiaire_prevu: zoneint.individu_beneficiaire_prevu,
			});       
			//factory
			apiFactory.add("zone_intervention/index",datas, config).success(function (data) {
				if (NouvelItemZoneintervention == false) {
					// Update or delete: id exclu                   
					if(suppression==0) {
					  vm.selectedItemZoneintervention.id_intervention = zoneint.id_intervention;
					  vm.selectedItemZoneintervention.id_region = zoneint.id_region;
					  vm.selectedItemZoneintervention.region = zoneint.region;
					  vm.selectedItemZoneintervention.id_district = zoneint.id_district;
					  vm.selectedItemZoneintervention.district = zoneint.district;
					  vm.selectedItemZoneintervention.id_commune = zoneint.id_commune;
					  vm.selectedItemZoneintervention.commune = zoneint.commune;
					  vm.selectedItemZoneintervention.id_fokontany = zoneint.id_fokontany;
					  vm.selectedItemZoneintervention.fokontany = zoneint.fokontany;
					  vm.selectedItemZoneintervention.menage_beneficiaire_prevu = zoneint.menage_beneficiaire_prevu;
					  vm.selectedItemZoneintervention.individu_beneficiaire_prevu = zoneint.individu_beneficiaire_prevu;
					  vm.selectedItemZoneintervention.$selected = false;
					  vm.selectedItemZoneintervention.$edit = false;
					  vm.selectedItemZoneintervention ={};
					  vm.action="Modification d'un enregistrement de DDB (Annuaire): Zone d'ntervention";
					} else {    
						vm.selectedItemIntervention.detail_zone_intervention = vm.selectedItemIntervention.detail_zone_intervention.filter(function(obj) {
							return obj.id !== vm.selectedItemZoneintervention.id;
						});
						vm.action="Suppression d'un enregistrement de DDB (Annuaire): Zone d'ntervention";
					}
				} else {
					zoneint.id=data.response;	
					NouvelItemZoneintervention=false;
					vm.action="Ajout d'un enregistrement de DDB (Annuaire): Zone d'ntervention";
				}
				zoneint.$selected=false;
				zoneint.$edit=false;
				//add historique : suppresion/modifcation/ajout DDB Annuaire : zone d'intervention
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var datas = $.param({
					action:vm.action,
					id_utilisateur:vm.id_utilisateur
				});
				//factory
				apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
				});								
			}).error(function (data) {
				vm.showAlert('Erreur lors de la sauvegarde','Veuillez corriger le(s) erreur(s) !');
			});  
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
        vm.selectionZoneintervention= function (item) {     
            vm.selectedItemZoneintervention = item;
			console.log(item);
        };
        $scope.$watch('vm.selectedItemZoneintervention', function() {
			if (!vm.selectedItemIntervention) return;
			vm.selectedItemIntervention.detail_zone_intervention.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemZoneintervention.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterZoneintervention = function () {
            vm.selectedItemZoneintervention.$selected = false;
            NouvelItemZoneintervention = true ;
		    var items = {
				$edit: true,
				$selected: true,
				supprimer:0,
                id_intervention: vm.selectedItemIntervention.id ,
                intervention: [] ,
                id_region: null ,
                region: [] ,
                id_district: null ,
                district: [] ,
                id_commune: null ,
                commune: [] ,
                id_fokontany: null ,
                fokontany: [] ,
                menage_beneficiaire_prevu: null ,
                individu_beneficiaire_prevu: null ,
			};
			vm.selectedItemIntervention.detail_zone_intervention.push(items);
		    vm.selectedItemIntervention.detail_zone_intervention.forEach(function(it) {
				if(it.$selected==true) {
					vm.selectedItemZoneintervention = it;
				}
			});			
        };
        vm.annulerZoneintervention = function(item) {
			if (!item.id) {
				vm.selectedItemIntervention.detail_zone_intervention.pop();
				return;
			}          
			item.$selected=false;
			item.$edit=false;
			NouvelItemZoneintervention = false;
			 item.description = currentItemZoneintervention.description;
			vm.selectedItemZoneintervention = {} ;
			vm.selectedItemZoneintervention.$selected = false;
       };
        vm.modifierZoneintervention = function(item) {
			vm.affiche_load=true;
			NouvelItemZoneintervention = false ;
			vm.selectedItemZoneintervention = item;
			currentItemZoneintervention = angular.copy(vm.selectedItemZoneintervention);
			$scope.vm.selectedItemIntervention.detail_zone_intervention.forEach(function(it) {
				it.$edit = false;
			});        
			item.$edit = true;	
			item.$selected = true;	
			vm.selectedItemZoneintervention.$edit=true;
			vm.selectedItemZoneintervention.$selected=true;
			vm.selectedItemZoneintervention.id_intervention = parseInt(vm.selectedItemZoneintervention.id_intervention);
			if (vm.selectedItemZoneintervention.id_region) {
				vm.selectedItemZoneintervention.id_region = parseInt(vm.selectedItemZoneintervention.id_region);
			} else vm.selectedItemZoneintervention.id_region = null;
			if (vm.selectedItemZoneintervention.menage_beneficiaire_prevu) {
				vm.selectedItemZoneintervention.menage_beneficiaire_prevu = parseInt(vm.selectedItemZoneintervention.menage_beneficiaire_prevu);
			} else vm.selectedItemZoneintervention.menage_beneficiaire_prevu = null;
			if (vm.selectedItemZoneintervention.individu_beneficiaire_prevu) {
				vm.selectedItemZoneintervention.individu_beneficiaire_prevu = parseInt(vm.selectedItemZoneintervention.individu_beneficiaire_prevu);
			} else vm.selectedItemZoneintervention.individu_beneficiaire_prevu = null;
			apiFactory.getAPIgeneraliserREST("fokontany/index","cle_etrangere",vm.selectedItemZoneintervention.id_commune).then(function(result) { 
				vm.allRecordsFokontany = [];
				vm.allRecordsCommune = [];
				vm.allRecordsDistrict = [];
				vm.allRecordsFokontany = result.data.response;    
				apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",vm.selectedItemZoneintervention.id_district).then(function(result) { 
					vm.allRecordsCommune = result.data.response;    
					apiFactory.getAPIgeneraliserREST("district/index","cle_etrangere",vm.selectedItemZoneintervention.id_region).then(function(result) { 
						vm.allRecordsDistrict = result.data.response;    
						if (vm.selectedItemZoneintervention.id_district) {
							vm.selectedItemZoneintervention.id_district = parseInt(vm.selectedItemZoneintervention.id_district);
						} else vm.selectedItemZoneintervention.id_district = null;
						if (vm.selectedItemZoneintervention.id_commune) {
							vm.selectedItemZoneintervention.id_commune = parseInt(vm.selectedItemZoneintervention.id_commune);
						} else vm.selectedItemZoneintervention.id_commune = null;
						if (vm.selectedItemZoneintervention.id_fokontany) {
							vm.selectedItemZoneintervention.id_fokontany = parseInt(vm.selectedItemZoneintervention.id_fokontany);
						} else vm.selectedItemZoneintervention.id_fokontany = null;
						vm.affiche_load=false;
					});
				});
			});
			
			vm.selectedItemZoneintervention.$edit = true;	
        };
        vm.supprimerZoneintervention = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutzoneintervention(vm.selectedItemZoneintervention,1);
			}, function() {
			});
        }
        function test_existence_zoneint (item,suppression) {    
			insert_in_base_zoneint(item,suppression);
        }
        vm.modifierInterventionZONEINT = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsIntervention.forEach(function(ax) {
				if(parseInt(ax.id)==parseInt(item.id_intervention)) {
					item.id_intervention = ax.id; 
					item.intervention=[];
					item.intervention.push(ax);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					item.id_intervention = null; 
					item.intervention=[];
			}
		}
        vm.modifierRegionZONEINT = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsRegion.forEach(function(ax) {
				if(parseInt(ax.id)==parseInt(item.id_region)) {
					item.id_region = ax.id; 
					item.region=[];
					item.region.push(ax);
					vm.nontrouvee=false;
					apiFactory.getAPIgeneraliserREST("district/index","cle_etrangere",item.id_region).then(function(result) { 
						vm.allRecordsDistrict = result.data.response;   
						vm.all_district = result.data.response;   
						item.id_district = null ; 
						item.id_commune = null ; 
						item.id_fokontany = null ; 
					});
				}
			});
			if(vm.nontrouvee==true) {				
					item.id_region = null; 
					item.region=[];
					vm.allRecordsDistrict =vm.all_district;
			}
		}
        vm.modifierDistrictZONEINT = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsDistrict.forEach(function(ax) {
				if(parseInt(ax.id)==parseInt(item.id_district)) {
					item.id_district = ax.id; 
					item.district=[];
					item.district.push(ax);
					vm.nontrouvee=false;
					apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",item.id_district).then(function(result)  { 
						vm.allRecordsCommune = result.data.response; 
						vm.all_commune = result.data.response; 
						item.id_commune = null ; 
						item.id_fokontany = null ;           
					});
				}
			});
			if(vm.nontrouvee==true) {				
					item.id_district = null; 
					item.district=[];
					vm.allRecordsCommune =vm.all_commune;
			}
		}
        vm.modifierCommuneZONEINT = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsCommune.forEach(function(ax) {
				if(parseInt(ax.id)==parseInt(item.id_commune)) {
					item.id_commune = ax.id; 
					item.commune=[];
					item.commune.push(ax);
					vm.nontrouvee=false;
					apiFactory.getAPIgeneraliserREST("fokontany/index","cle_etrangere",item.id_commune).then(function(result) { 
						vm.allRecordsFokontany = result.data.response;    
						vm.all_fokontany = result.data.response;    
						item.id_fokontany = null ; 
					});
				}
			});
			if(vm.nontrouvee==true) {				
					item.id_commune = null; 
					item.commune=[];
					vm.allRecordsFokontany =vm.all_fokontany;
			}
		}
        vm.modifierFokontanyZONEINT = function (item) { 
			vm.nontrouvee=true;
			vm.allRecordsFokontany.forEach(function(ax) {
				if(parseInt(ax.id)==parseInt(item.id_fokontany)) {
					item.id_fokontany = ax.id; 
					item.fokontany=[];
					item.fokontany.push(ax);
					vm.nontrouvee=false;
				}
			});
			if(vm.nontrouvee==true) {				
					item.id_fokontany = null; 
					item.fokontany=[];
					vm.allRecordsFokontany =vm.all_fokontany;
			}
		}
		// FIN ZONE D'INTERVENTION 	
		// DEBUT DETAIL TYPE TRANSFERT
        vm.selectionDetailtypetransfert= function (item) {     
            vm.selectedItemDetailtypetransfert = item;
        };
        $scope.$watch('vm.selectedItemDetailtypetransfert', function() {
			if (!vm.selectedItemDetailtypetransfert) return;
			vm.ListeDetailtypetransfert.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemDetailtypetransfert.$selected = true;
        });
		vm.modifierQuantitValeur=function(enreg) {
			if(parseFloat(enreg.valeur_quantite) >0) {
				if(parseInt(enreg.id_detail_type_transfert)==0) {
					enreg.id_detail_type_transfert=erneg.id;
				}
			}
		}
		vm.modifierChoixTypetransfert=function(enreg) {
			if(parseInt(enreg.id_detail_type_transfert)==0 && parseFloat(enreg.valeur_quantite) >0) {
				enreg.valeur_quantite=null;
			}
		}
		// FIN DETAIL TYPE TRANSFERT
    }
  })();
