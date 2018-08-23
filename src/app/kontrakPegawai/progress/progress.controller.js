(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('ProgressController', ProgressController);

    
    function ProgressController(urtug, EkinerjaService, KontrakPegawaiService, $uibModalInstance, $scope, API, $window) {
      	var vm = this;
        vm.bulan = EkinerjaService.IndonesianMonth(new Date());
        vm.tahun = EkinerjaService.IndonesianYear(new Date());
        $scope.entries = 5;
        $scope.currentPageListProgress = 0;

        // getAllHistory();
        getProgress();
        // function getAllHistory(){
        //   KontrakPegawaiService.GetAllHistory($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        //     function(response){
        //       vm.dataHistory = response;debugger
        //     }, function(errResponse){

        //     })
        // }

        // vm.getDocument = function(kdHistory){
        //   KontrakPegawaiService.GetHistory(kdHistory).then(
        //     function(response){
        //       debugger
        //     }, function(errResponse){

        //     })
        // }

        vm.getDocument = function(progress){
          // progress.loading = true;
            // DashboardService.GetprogressLain(progress.pathFile, progress.pathFileExtension, progress.kdTemplateLain).then(
            //     function(response){
            //         progress.loading = false;debugger
                    var landingUrl = API + 'get-template-lain-file-revisi/' + progress.pathFile + '/' + progress.pathFileExtension + '/' + progress.kdTemplateLain;
                    $window.location.href = landingUrl;
                //     getprogressBawahan();

                // }, function(errResponse){
                //     progress.loading = false;
                //     getprogressBawahan();
                //     // EkinerjaService.showToastrError("Gagal Mengambil Data");
                // })
        }

        function getProgress(){
          urtug.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
          KontrakPegawaiService.GetProgress(urtug).then(
            function(response){debugger
                for(var i = 0; i < response.length; i++){
                    var date = new Date(response[i].tanggalPembuatanMilis);
                    response[i].tanggalDibuat = EkinerjaService.IndonesianDateFormat(date);
                    response[i].tanggalDibuat += " pukul " + date.getHours() + ":" + date.getMinutes();
                    response[i].status = statusBaca(response[i].statusPenilaian, response[i].approvalPenandatangan);
                }
                vm.dataprogress = response;
                vm.dataprogress = vm.dataprogress.sort( function ( a, b ) { return b.tanggalPembuatanMilis - a.tanggalPembuatanMilis; } );
                paging();
            }, function(errResponse){

            })
        }

        function statusBaca(status, isDone){
          switch (status) {
            case 0 : return 'Belum Dibaca'; break;
            case 1 : return 'Sudah Dibaca'; break;
            case 2 : return 'Sudah Diterima'; break;
            case 3 : return 'Ditolak'; break;
          }
        }

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };

        vm.reset = function(){
          vm.item = angular.copy(items);
        }

        function paging(){
            $scope.filteredDataListProgress = [];
            $scope.numPerPageListProgress = $scope.entries;
            $scope.maxSizeListProgress = Math.ceil(vm.dataprogress.length/$scope.numPerPageListProgress);
            function pageListProgress(){
                $scope.pageListProgress = [];
                for(var i = 0; i < vm.dataprogress.length/$scope.numPerPageListProgress; i++){
                    $scope.pageListProgress.push(i+1);
                }
            }
            pageListProgress();
            $scope.padListProgress = function(i){
                $scope.currentPageListProgress += i;
            }

            $scope.maxListProgress = function(){
                if($scope.currentPageListProgress >= $scope.maxSizeListProgress - 1)
                    return true;
                else return false;
            }

            $scope.$watch("currentPageListProgress + numPerPageListProgress", function() {
                var begin = (($scope.currentPageListProgress) * $scope.numPerPageListProgress)
                    , end = begin + parseInt($scope.numPerPageListProgress);

                $scope.filteredDataListProgress = vm.dataprogress.slice(begin, end);
            });
        }

   	} 
})();