(function() {
'use strict';
 
angular.
  module('eKinerja')
  .controller('PenugasanController', PenugasanController);

    
    function PenugasanController(EkinerjaService, PenugasanService, $scope, KontrakPegawaiService,
     TemplateSuratInstruksiService, TemplateSuratPerintahService, $uibModal, $document) {
        var vm = this;
        vm.loading = true;

        vm.naskah = [];
        vm.naskahHistory = [];

        getNaskahPenugasanPerintahTarget();

        function getNaskahPenugasanPerintahTarget(){
          PenugasanService.GetNaskahPenugasanPerintahTarget($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Perintah";
                response[i].jenis = 1;
                response[i].tanggalDibuat = response[i].createdDate;
                vm.naskah.push(response[i]);
              }
              getNaskahPenugasanPerintah();
            }, function(errResponse){

            })
        }

        function getNaskahPenugasanPerintah(){
          PenugasanService.GetNaskahPenugasanPerintah($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Perintah";
                response[i].jenis = 1;
                response[i].tanggalDibuat = response[i].createdDate;
                vm.naskahHistory.push(response[i]);
              }
              getNaskahPenugasanInstruksi();
            }, function(errResponse){

            })
        }

        function getNaskahPenugasanInstruksi(){
          PenugasanService.GetNaskahPenugasanInstruksi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Instruksi";
                response[i].jenis = 0;
                response[i].judulNaskah = response[i].judulInstruksi;
                vm.naskahHistory.push(response[i]);
              }
              getNaskahPenugasanInstruksiTarget();
            }, function(errResponse){

            })
          
        }

        function getNaskahPenugasanInstruksiTarget(){
          PenugasanService.GetNaskahPenugasanInstruksiTarget($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
            function(response){
              for(var i = 0; i < response.length;i++){
                response[i].nama = "Instruksi";
                response[i].jenis = 0;
                response[i].judulNaskah = response[i].judulInstruksi;
                vm.naskah.push(response[i]);
              }
              vm.loading = false;
            }, function(errResponse){

            })
        }

        vm.getDocument = function(naskah, idx, isHistory){
          if(!isHistory)
            vm.naskah[idx].loading = true;
          else vm.naskahHistory[idx].loading = true;
          switch(naskah.jenis){
            case 0 : getDocumentInstruksi(naskah.kdInstruksi, idx, isHistory); break;
            case 1 : getDocumentPerintah(naskah.kdSurat, idx, isHistory); break;
          }
        }

        function getDocumentInstruksi(kdHistory, idx, isHistory){
          KontrakPegawaiService.GetDataInstruksi(kdHistory).then(
            function(response){
              vm.data = response;
              var doc = TemplateSuratInstruksiService.template(vm.data);
              if(!isHistory)
                vm.naskah[idx].loading = false;
              else vm.naskahHistory[idx].loading = false;
              pdfMake.createPdf(doc).open();
            }, function(errResponse){

            })
        }

        function getDocumentPerintah(kdHistory, idx, isHistory){
          PenugasanService.GetDataPerintah(kdHistory).then(
            function(response){
              vm.data = response;debugger
              var doc = TemplateSuratPerintahService.template(vm.data);
              if(!isHistory)
                vm.naskah[idx].loading = false;
              else vm.naskahHistory[idx].loading = false;
              pdfMake.createPdf(doc).open();
            }, function(errResponse){

            })
        }

        vm.openTemplate = function (uraianTugas, isDPA, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/kontrakPegawai/template/listTemplate.html',
                controller: 'TemplateController',
                controllerAs: 'temp',
                // windowClass: 'app-modal-window',
                // size: 'lg',
                appendTo: parentElem,
                resolve: {
                    urtug: function () {
                        return uraianTugas;
                    },
                    isDPA: function () {
                        return isDPA;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };
   	} 
})();