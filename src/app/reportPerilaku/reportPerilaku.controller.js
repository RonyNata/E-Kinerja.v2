(function() {
	'use strict';
	angular.
		module('eKinerja')
		.controller('ReportPerilakuController', ReportPerilakuController);

	function ReportPerilakuController(EkinerjaService, $scope, $uibModal, ReportPerilakuService, SPPNSService, $document) {
		var vm = this;
		vm.loading = true;
		var date = new Date();
		var date = new Date(EkinerjaService.IndonesianYear(date), date.getMonth());
		var milliseconds = date.getTime();
		getAllPegawaiPerilaku();
		// $scope.searchPerilaku = '';
		$scope.entries = 5;
        $scope.currentPageListPerilaku = 0;

		function getAllPegawaiPerilaku(){
			vm.loading = true;
			ReportPerilakuService.GetPerilaku($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja, milliseconds).then(
				function(responce){
					var data = responce;
					vm.dataPerilaku = angular.copy(data);
					vm.loading = false;
					paging();
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

		vm.getSP = function(){
			ReportPerilakuService.GetPerilaku($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja, milliseconds).then(
				function(responce){debugger
					var doc = SPPNSService.template(responce, EkinerjaService.IndonesianYear(date), EkinerjaService.IndonesianMonth(date));
					EkinerjaService.lihatPdf(doc, 'Surat Perilaku PNS');
				}, function(errResponce){

				})
		}

		// $scope.$watch('searchPerilaku', function(){
  //         if($scope.searchPerilaku != ''){
  //           $scope.currentPage = 0;
  //           vm.dataPerilaku = EkinerjaService.searchByPerilaku($scope.searchPerilaku, responce);
  //         }
  //         paging();
  //       })

		$scope.$watch('entries', function(){
          paging();
          debugger
        })

		function paging(){
            $scope.filteredDataListPerilaku = [];
            $scope.numPerPageListPerilaku = $scope.entries;
            $scope.maxSizeListPerilaku = Math.ceil(vm.dataPerilaku.length/$scope.numPerPageListPerilaku);
            function pageListPerilaku(){
                $scope.pageListPerilaku = [];
                for(var i = 0; i < vm.dataPerilaku.length/$scope.numPerPageListPerilaku; i++){
                    $scope.pageListPerilaku.push(i+1);
                }
            }
            pageListPerilaku();
            $scope.padListPerilaku = function(i){
                $scope.currentPageListPerilaku += i;
            }

            $scope.maxListPerilaku = function(){
                if($scope.currentPageListPerilaku >= $scope.maxSizeListPerilaku - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageListPerilaku + numPerPageListPerilaku", function() {
                var begin = (($scope.currentPageListPerilaku) * $scope.numPerPageListPerilaku)
                    , end = begin + parseInt($scope.numPerPageListPerilaku);

                $scope.filteredDataListPerilaku = vm.dataPerilaku.slice(begin, end);
            });
        }
	}
})();