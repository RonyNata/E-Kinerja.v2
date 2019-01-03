(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('MasterUrtugController', MasterUrtugController);

	function MasterUrtugController(MasterUrtugService, $uibModal, $document, toastr, EkinerjaService, $scope){
		var vm = this;
		$scope.loading = false;

		// EkinerjaService.checkCredential();
      	// EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);

		vm.data = false;

		vm.data_pegawai = {};
		vm.data_urtug = [];
		$scope.deskripsi;

		getUrtug();
		getSop();
		getStatusPj();

		function getUrtug(){
			MasterUrtugService.GetAllUrtug().then(
				function(response){
					// vm.data_pegawai = response;
					vm.data_urtug = response;
					vm.dataLook = angular.copy(vm.data_urtug);
					paging();
					$scope.loading = true;
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
					// vam.loading = true;
				}
			)
		}

		function getSop(){
			MasterUrtugService.GetAllSop().then(
				function(response){
					// vm.data_pegawai = response;
					vm.data_sop = response;
					vm.dataLookSop = angular.copy(vm.data_sop);
					pagingSop();
					$scope.loading = true;
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
					$scope.loading = true;
				}
			)
		}

		$scope.$watch('deskripsi', function(){
			// console.log($scope.deskripsi.length)
			if($scope.deskripsi != undefined){
				vm.dataLook = EkinerjaService.searchByDeskripsi($scope.deskripsi, vm.data_urtug);
			}else {
				vm.dataLook = vm.data_urtug;
			}
			paging();
		});

		function getStatusPj(){
			MasterUrtugService.GetStatusPJ().then(
				function(response){
					vm.dataLookPj = response;
					pagingPj();
				}, function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
				})
		}

		function showToastrSuccess(message) {
	      toastr.success('Data Uraian Tugas berhasil ' + message);

	    }

	    function showToastrFailed(message){
	    	toastr.error('Terjadi Kesalahan saat ' + message);

	    }

		vm.deleteUrtug = function(kd_urtug){
			MasterUrtugService.DeleteUrtugById(kd_urtug).then(
				function(response){
					showToastrSuccess('dihapus');
					getUrtug();
					// vm.data_pegawai = response;
					vm.data_urtug = response;
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              		else showToastrFailed('menghapus data');
				}
			)
		}

		vm.edit = function(urtug){
			vm.open(urtug);
		}

		vm.open = function (items, parentSelector) {
	      // console.log(items);
	      var item = angular.copy(items);
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/formMaster/urtug/formMasterUrtug.html',
	        controller: 'FormMasterUrtugController',
	        controllerAs: 'form_urtug',
	        size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	showToastrSuccess('ditambahkan');
			getUrtug();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    vm.editSop = function(sop){
			vm.openSop(sop);
		}

		vm.deleteSop = function(kd_sop){
			console.log(kd_sop);
			MasterUrtugService.DeleteSopById(kd_sop).then(
				function(response){
					EkinerjaService.showToastrSuccess('Data SOP Berhasil Dihapus');
					getSop();
					// vm.data_pegawai = response;
					// vm.data_urtug = response;
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              		else EkinerjaService.showToastrError('Gagal Menghapus Data SOP');
				}
			)
		}

		vm.deletePj = function(kd_pj){
			console.log(kd_pj);
			MasterUrtugService.DeletePj(kd_pj).then(
				function(response){
					EkinerjaService.showToastrSuccess('Data jabatan organisasi berhasil dihapus');
					getStatusPj();
					// vm.data_pegawai = response;
					// vm.data_urtug = response;
					// debugger
				},function(errResponse){
					if(errResponse.status == -1)
              			EkinerjaService.showToastrError('Gagal Terhubung Ke Server');
              		else EkinerjaService.showToastrFailed('Gagal Menghapus Data Jabatan Organisasi');
				}
			)
		}

	    vm.openSop = function (items, parentSelector) {
	      // console.log(items);
	      var item = angular.copy(items);
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/formMaster/sop/formSop.html',
	        controller: 'FormMasterSopController',
	        controllerAs: 'form_sop',
	        size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	EkinerjaService.showToastrSuccess("Data SOP berhasil ditambahkan");
			getSop();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    vm.openPj = function (items, parentSelector) {
	      // console.log(items);
	      var item = angular.copy(items);
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/formMaster/penanggungjawab/penanggungjawab.html',
	        controller: 'PenanggungJawabController',
	        controllerAs: 'form_pj',
	        size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          items: function () {
	            return item;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	// EkinerjaService.showToastrSuccess("Data SOP berhasil ditambahkan");
			getStatusPj();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    function paging(){ 
          $scope.filteredTodos = [];
          $scope.currentPage = 0;
          $scope.numPerPage = 25;
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
            , end = begin + $scope.numPerPage;

            $scope.filteredData = vm.dataLook.slice(begin, end);
          });
        }

        function pagingSop(){ 
          $scope.filteredTodosSop = [];
          $scope.currentPageSop = 0;
          $scope.numPerPage = 5;
          $scope.maxSizeSop = Math.ceil(vm.dataLookSop.length/$scope.numPerPage);
          function pageSop(){
            $scope.pageSop = [];
            for(var i = 0; i < vm.dataLookSop.length/$scope.numPerPage; i++){
                $scope.pageSop.push(i+1);
            }
          }
          pageSop();
          $scope.padSop = function(i){
            $scope.currentPageSop += i;
          }

          $scope.maxSop = function(){
            if($scope.currentPageSop >= $scope.maxSizeSop - 1)
                return true;
            else return false;
          }

          $scope.$watch("currentPageSop + numPerPage", function() {
            var begin = (($scope.currentPageSop) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

            $scope.filteredDataSop = vm.dataLookSop.slice(begin, end);
          });
        }

        function pagingPj(){ 
          $scope.filteredTodosPj = [];
          $scope.currentPagePj = 0;
          $scope.numPerPage = 25;
          $scope.maxSizePj = Math.ceil(vm.dataLookPj.length/$scope.numPerPage);
          function pagePj(){
            $scope.pagePj = [];
            for(var i = 0; i < vm.dataLookPj.length/$scope.numPerPage; i++){
                $scope.pagePj.push(i+1);
            }
          }
          pagePj();
          $scope.padPj = function(i){
            $scope.currentPagePj += i;
          }

          $scope.maxPj = function(){
            if($scope.currentPagePj >= $scope.maxSizePj - 1)
                return true;
            else return false;
          }

          $scope.$watch("currentPagePj + numPerPage", function() {
            var begin = (($scope.currentPagePj) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

            $scope.filteredDataPj = vm.dataLookPj.slice(begin, end);
          });
        }
	} 
})();