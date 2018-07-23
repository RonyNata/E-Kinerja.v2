(function() {
	'use strict';
	angular.
		module('eKinerja')
		.controller('ReportPerilakuController', ReportPerilakuController);

	function ReportPerilakuController(HakAksesService, EkinerjaService, $scope, $uibModal, ReportPerilakuService, SPPNSService, $document) {
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

		getAllPegawai();

		function getAllPegawai(){
			// vm.loading = true;
			HakAksesService.GetAllPegawai().then(
				function(response){
					// console.log(JSON.stringify(response));
					vm.pegawaiDinas = response;
				}, function(errResponse){

				})
		}

		getPegawai();

		function getPegawai(){
			vm.loading = true;
			ReportPerilakuService.GetPegawai($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
				function(response){
					// console.log(JSON.stringify(response));
					vm.pegawaiSKPD = response;
				}, function(errResponse){

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

		vm.getSP = function(){
			var kepalaSKPD = EkinerjaService.findPegawaiByNip(vm.kadin, vm.pegawaiSKPD);
			var pgwSKPD = EkinerjaService.findPegawaiByNip(vm.verifikator, vm.pegawaiDinas);
			var pj = EkinerjaService.findPegawaiByNip(vm.pj, vm.pegawaiSKPD);
			ReportPerilakuService.GetPerilaku($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja, milliseconds).then(
				function(responce){debugger
					var doc = SPPNSService.template(responce, EkinerjaService.IndonesianYear(date), EkinerjaService.IndonesianMonth(date),
						kepalaSKPD, pgwSKPD, pj);
					EkinerjaService.lihatPdf(doc, 'Surat Perilaku PNS');
				}, function(errResponce){

				})
		}
	}
})();