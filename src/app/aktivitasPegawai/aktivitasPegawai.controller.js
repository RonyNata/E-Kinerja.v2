(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('AktivitasPegawaiController', AktivitasPegawaiController);

    function AktivitasPegawaiController(AktivitasPegawaiService, $uibModal, $document, $scope, EkinerjaService) {
      EkinerjaService.checkCredential();
      // EkinerjaService.checkRole($.parseJSON(sessionStorage.getItem('credential')).id);
      var vm = this;
      vm.loading = true;

      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));
      vm.rincian = [];
      // vm.date = EkinerjaService.IndonesianDateFormat(new Date());
				// console.log(JSON.stringify(vm.date));
      $scope.tanggal = new Date();
      vm.now = new Date();
      $scope.searchName = '';
      getUrtugByJabatan();
      // getAllJabatan();
      // getUrtugByJabatan();

      // checkCredentials();

      // function checkCredentials(){
      //       if(sessionStorage.getItem('credential') == undefined)
      //           $state.go('home');
      //   }

      function getUrtugByJabatan(){
      	AktivitasPegawaiService.GetRincianPegawai(vm.pegawai.nipPegawai, $scope.tanggal).then(
      		function(response){
      			vm.rincian = response;
      			vm.dataLook = response;
      			paging();
      			// debugger
      			vm.loading = false;
      		}, function(errResponse){
      			vm.loading = false;
      		}
      	)
      }

      vm.open = function (parentSelector) {
	      console.log(JSON.stringify(vm.pegawai));
	      var parentElem = parentSelector ? 
	        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	      var modalInstance = $uibModal.open({
	        animation: true,
	        ariaLabelledBy: 'modal-title',
	        ariaDescribedBy: 'modal-body',
	        templateUrl: 'app/aktivitasPegawai/formAktivitas.html',
	        controller: 'FormAktivitasController',
	        controllerAs: 'form_aktivitas',
	        // windowClass: 'app-modal-window',
	        // size: 'lg',
	        appendTo: parentElem,
	        resolve: {
	          kdJabatan: function () {
	            return vm.pegawai.kdJabatan;
	          },
	          nip: function () {
	            return vm.pegawai.nipPegawai;
	          },
	          tanggal: function(){
	          	return $scope.tanggal;
	          }
	        }
	      });

	      modalInstance.result.then(function () {
	      	// showToastrSuccess('ditambahkan');
	      	// getUrtugByJabatan();
	      	EkinerjaService.showToastrSuccess('Aktivitas Berhasil Ditambahkan');
	      	getUrtugByJabatan();
	        // vm.selected = selectedItem;
	      }, function () {
	      	// showToastrFailed('menambahkan data');
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };

	    function paging(){ 
	          $scope.filteredData = [];
	          $scope.currentPage = 0;
	          $scope.numPerPage = 5;
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

        $scope.$watch('searchName', function(){
			if($scope.searchName != undefined){
				vm.dataLook = EkinerjaService.searchByAktivitas($scope.searchName, vm.rincian);
			}else vm.dataLook = angular.copy(vm.rincian);
			paging();
		})

		$scope.$watch('tanggal', function(){
			// if($scope.searchName != undefined){
				// console.log($scope.tanggal.getDate());
				// console.log($scope.tanggal.getMonth());
				console.log($scope.tanggal.getYear());
				getUrtugByJabatan();
				vm.date = EkinerjaService.IndonesianDateFormat($scope.tanggal);
			// }else vm.dataLook = angular.copy(vm.rincian);
			// paging();
		})
   } 
})();