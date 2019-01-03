(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('FormMasterUrtugController', FormMasterUrtugController);

	function FormMasterUrtugController(MasterUrtugService, $uibModalInstance, items, toastr, $scope, EkinerjaService){
		var vm = this;

		vm.data = false;
		$scope.data_urtug = [];

		if(items == undefined){
			$scope.data_urtug = {};
			// $scope.data_urtug.volumeKerja = 0;
			// $scope.data_urtug.normaWaktu = 0;
			vm.ok = function () {
				// console.log(JSON.stringify($scope.data_urtug));
				create();
		    };
		} else {
			$scope.data_urtug = items;
			vm.ok = function () {
				// console.log(JSON.stringify($scope.data_urtug));
				edit();
		    };
		}
		function edit(){
			MasterUrtugService.UpdateUrtug($scope.data_urtug).then(
				function(response){
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              		else toastr.error("Terjadi Kesalahan");
				}
			);
		}

		function create(){
			$scope.data_urtug.createdBy = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
			console.log(JSON.stringify($scope.data_urtug));
			MasterUrtugService.CreateUrtug($scope.data_urtug).then(
				function(response){
	      			$uibModalInstance.close();
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              		else toastr.error("Terjadi Kesalahan");
				}
			);
		}

		vm.calculateBeban = function(){
			$scope.data_urtug.bebanKerja = $scope.data_urtug.volumeKerja * $scope.data_urtug.normaWaktu;
		}


	    vm.cancel = function () {
	      $uibModalInstance.dismiss('cancel');
	    };

	    getUrtug();
		function getUrtug(){
			MasterUrtugService.GetAllUrtug().then(
				function(response){
					// vm.data_pegawai = response;
					$scope.data_urtugSearch = response;
					vm.dataLook = angular.copy($scope.data_urtugSearch);
					paging();
					// vm.loading = true;
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
					// vam.loading = true;
				}
			)
		}

		$scope.$watch('data_urtug.deskripsi', function(){
			// console.log($scope.deskripsi.length)
			if($scope.data_urtug.deskripsi != undefined){
				vm.dataLook = EkinerjaService.searchByDeskripsi($scope.data_urtug.deskripsi, $scope.data_urtugSearch);
			}else {
				vm.dataLook = $scope.data_urtugSearch;
			}
			paging();
		});

		function paging(){ 
          $scope.filteredTodos = [];
          $scope.currentPage = 0;
          $scope.numPerPage = 10;
          $scope.maxSize = Math.ceil(vm.dataLook.length/$scope.numPerPage);

          $scope.$watch("currentPage + numPerPage", function() {
            var begin = (($scope.currentPage) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

            $scope.filteredData = vm.dataLook.slice(begin, end);
          });
        }
	} 
})();