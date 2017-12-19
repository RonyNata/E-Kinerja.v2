(function(){
	'use strict';

	angular.module('eKinerja').controller('DashboardController', DashboardController);

	function DashboardController(AmbilDisposisiService, PenugasanService, KontrakPegawaiService,
    TemplateSuratInstruksiService, TemplateSuratPerintahService){
		var vm = this;

    vm.naskah = [];

    getAllDisposisi();
    getNaskahPenugasanInstruksiTarget();
    getNaskahPenugasanPerintahTarget();

		function getAllDisposisi(){
      AmbilDisposisiService.GetAllDisposisi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        function(response){
          vm.dataHistory = response;debugger
        }, function(errResponse){

        })
    }

    function getDokumenDisposisi(kdLembarDisposisi){
      AmbilDisposisiService.GetDokumenDisposisi(kdLembarDisposisi).then(
        function(response){debugger
          template(response);
        }, function(errResponse){

        })
    }

    function getNaskahPenugasanInstruksiTarget(){
      PenugasanService.GetNaskahPenugasanInstruksiTarget($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        function(response){debugger
          for(var i = 0; i < response.length;i++){
            var waktu = new Date(response[i].tanggalDibuatMilis);
            response[i].tanggalDibuat += " pukul " + waktu.getHours() + ":" + waktu.getMinutes();
            response[i].nama = "Instruksi";
            response[i].jenis = 0;
            response[i].judulNaskah = response[i].judulInstruksi;
            vm.naskah.push(response[i]);
          }
          vm.loading = false;
        }, function(errResponse){

        })
    }
    
    function getNaskahPenugasanPerintahTarget(){
      PenugasanService.GetNaskahPenugasanPerintahTarget($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
        function(response){
          for(var i = 0; i < response.length;i++){
            var waktu = new Date(response[i].createdDateMilis);
            response[i].tanggalDibuat = response[i].createdDate;
            response[i].tanggalDibuat += " pukul " + waktu.getHours() + ":" + waktu.getMinutes();
            console.log(response);
            console.log(waktu.getHours());
            response[i].nama = "Perintah";
            response[i].jenis = 1;
            response[i].judulNaskah = "Surat Perintah";
            response[i].namaPengirim = response[i].namaPemberi;
            // response[i].tanggalDibuat = response[i].createdDate;
            vm.naskah.push(response[i]);
          }
          getNaskahPenugasanPerintah();
        }, function(errResponse){

        })
    }   

    vm.getDocument = function(naskah, idx, isHistory){
      vm.naskah[idx].loading = true;
      switch(naskah.jenis){
        case 0 : getDocumentInstruksi(naskah.kdInstruksi, idx); break;
        case 1 : getDocumentPerintah(naskah.kdSurat, idx); break;
      }

    }

    function getDocumentInstruksi(kdHistory, idx){
      KontrakPegawaiService.GetDataInstruksi(kdHistory).then(
        function(response){
          vm.data = response;
          var doc = TemplateSuratInstruksiService.template(vm.data);
          vm.naskah[idx].loading = false;
          pdfMake.createPdf(doc).open();
        }, function(errResponse){

        })
    }

    function getDocumentPerintah(kdHistory, idx){
      PenugasanService.GetDataPerintah(kdHistory).then(
        function(response){
          vm.data = response;debugger
          var doc = TemplateSuratPerintahService.template(vm.data);
          vm.naskah[idx].loading = false;
          pdfMake.createPdf(doc).open();
        }, function(errResponse){

        })
    }
	}
})();