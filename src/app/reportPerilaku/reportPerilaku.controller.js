(function() {
	'use strict';
	angular.
		module('eKinerja')
		.controller('ReportPerilakuController', ReportPerilakuController);

	function ReportPerilakuController(EkinerjaService, $scope, $uibModal, ReportPerilakuService) {
		var vm = this;
		vm.loading = true;
		var date = new Date();
		var date = new Date(EkinerjaService.IndonesianYear(date), date.getMonth());
		var milliseconds = date.getTime();
		getAllPegawaiPerilaku();

		function getAllPegawaiPerilaku(){
			vm.loading = true;
			ReportPerilakuService.GetPerilaku($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja, milliseconds).then(
				function(responce){
					var data = responce;
					vm.dataPerilaku = angular.copy(data);
					vm.loading = false;
				}, function(errResponce){
					
				})
		}


		vm.open = function(perilaku, parentSelector) {
			var parentElem = parentSelector ?
			angular.element($doscument[0].querySelector('modal-demo' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
				animation: true,
		        ariaLabelledBy: 'modal-title',
		        ariaDescribedBy: 'modal-body',
		        templateUrl: 'app/reportPerilaku/formPerilaku.html',
		        controller: 'FormPerilakuController',
		        controllerAs: 'form_perilaku',
		        size: 'lg',
		        appendTo: parentElem,
		        resolve: {
		        	perilaku:function () {
		        		return perilaku;
		        	}
		        }
			});

			modalInstance.result.then(function () {		      	
		      	getAllPegawaiPerilaku()
		        // vm.selected = selectedItem;
		      }, function () {
		      	// showToastrFailed('menambahkan data');
		        // $log.info('Modal dismissed at: ' + new Date());
		      });

		}
	}
})();