(function(){
	'use strict';

	angular.
		module('eKinerja').
		controller('HakAksesController', HakAksesController);

		function HakAksesController(EkinerjaService, $scope, HakAksesService, $uibModal, $document){
			// EkinerjaService.checkCredential();
			var vm = this;

			$scope.searchName = '';
			$scope.searchNip = '';
			$scope.searchJabatan = '';
			$scope.searchUnitKerja = '';
			$scope.searchStatus = '';
			$scope.entries = 25;
			$scope.currentPage = 0;

			var data = [];

			getAllPegawai();

			function getAllPegawai(){
				vm.loading = true;
				HakAksesService.GetAllPegawai().then(
					function(response){
						// console.log(JSON.stringify(response));
						data = response;
						vm.dataLook = angular.copy(data);
						paging();
						vm.loading = false;
					}, function(errResponse){

					})
			}

			$scope.$watch('searchName', function(){
				if($scope.searchName != ''){
					$scope.currentPage = 0;
					vm.dataLook = EkinerjaService.searchByName($scope.searchName, data);
				}
				paging();
				debugger
			})

			$scope.$watch('searchNip', function(){
				if($scope.searchNip != ''){
					$scope.currentPage = 0;
					vm.dataLook = EkinerjaService.searchByNip($scope.searchNip, data);
				}
				paging();
				debugger
			})

			$scope.$watch('searchJabatan', function(){
				if($scope.searchJabatan != ''){
					$scope.currentPage = 0;
					vm.dataLook = EkinerjaService.searchByJabatan($scope.searchJabatan, data);
				}
				paging();
				debugger
			})

			$scope.$watch('searchUnitKerja', function(){
				if($scope.searchUnitKerja != ''){
					$scope.currentPage = 0;
					vm.dataLook = EkinerjaService.searchByUnitKerja($scope.searchUnitKerja, data);
				}
				paging();
				debugger
			})

			$scope.$watch('searchStatus', function(){
				if($scope.searchStatus != ''){
					$scope.currentPage = 0;
					vm.dataLook = EkinerjaService.searchByStatus($scope.searchStatus, data);
				}
				paging();
				debugger
			})

			$scope.$watch('entries', function(){
				// if($scope.searchNip != '')
				// 	vm.dataLook = EkinerjaService.searchByNip($scope.searchNip, data);
				paging();
				debugger
			})

			vm.open = function (pegawai, parentSelector) {
		      // console.log(JSON.stringify(vm.pegawai));
		      var parentElem = parentSelector ?
		        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
		      var modalInstance = $uibModal.open({
		        animation: true,
		        ariaLabelledBy: 'modal-title',
		        ariaDescribedBy: 'modal-body',
		        templateUrl: 'app/hakAkses/formRole.html',
		        controller: 'FormRoleController',
		        controllerAs: 'form_role',
		        // windowClass: 'app-modal-window',
		        // size: 'lg',
		        appendTo: parentElem,
		        resolve: {
		          pegawai: function () {
		            return pegawai;
		          }
		        }
		      });

		      modalInstance.result.then(function (role) {
		      	// showToastrSuccess('ditambahkan');
		      	// getUrtugByJabatan();
		      	EkinerjaService.showToastrSuccess('Role <b>'+pegawai.nama+'</b> Berhasil Diubah Menjadi <b>' + role +'</b>');
		      	pegawai.role = role;
		      	getUrtugByJabatan();
		        // vm.selected = selectedItem;
		      }, function () {
		      	// showToastrFailed('menambahkan data');
		        // $log.info('Modal dismissed at: ' + new Date());
		      });
		    };

			function paging(){
	          $scope.filteredData = [];
	          // $scope.currentPage = 0;
	          $scope.numPerPage = $scope.entries;
	          $scope.maxSize = Math.ceil(vm.dataLook.length/$scope.numPerPage);
	          function page(){
	            $scope.page = [];
	            for(var i = 0; i < vm.dataLook.length/$scope.numPerPage; i++){
	                $scope.page.push(i+1);
	            }
	          }
	          page();
	          $scope.pad = function(i){
	            $scope.currentPage += i;
	          }

	          $scope.max = function(){
	            if($scope.currentPage >= $scope.maxSize - 1)
	                return true;
	            else return false;
	          }

	          $scope.$watch("currentPage + numPerPage", function() {
	            var begin = (($scope.currentPage) * $scope.numPerPage)
	            , end = begin + parseInt($scope.numPerPage);
	            debugger
	            $scope.filteredData = vm.dataLook.slice(begin, end);
	          });
	        }
		}
})();
