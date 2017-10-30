(function() {
	'use strict';

	angular.module('eKinerja')
		.controller('PengadaanBarangJasaController', PengadaanBarangJasaController);


	function PengadaanBarangJasaController(PengadaanBarangJasaService, EkinerjaService, $state, $uibModal, $document){
		var vm = this;
		vm.loading = true;
		vm.noDpa = "";
		vm.kegStat = true;
		vm.loadData = true;

		// vm.jabatanDpa = [
		// 	{
		// 		"nipPegawai": null,
		// 		"nama": null,
		// 		"status": "PA"
		// 	},
		// 	{
		// 		"nipPegawai": null,
		// 		"nama": null,
		// 		"status": "PPK"
		// 	},
		// 	{
		// 		"nipPegawai": null,
		// 		"nama": null,
		// 		"status": "PPTK"
		// 	},
		// 	{
		// 		"nipPegawai": null,
		// 		"nama": null,
		// 		"status": "PPHP"
		// 	}
		// ];

		// getAllPegawaiUnit();
		getUrtugKegiatanByJabatan();

		function getAllPegawaiUnit(data){
			PengadaanBarangJasaService.GetPegawaiPenanggungJawab(data)
				.then(function(response){
					vm.pegawai = response;
					debugger
				}, function(errResponse){

				})
		}

		vm.findPegawai = function(data){
			data.nama = PengadaanBarangJasaService.FindPegawai(vm.pegawai, data.nipPegawai);
			// console.log(data);
		}

		function getUrtugKegiatanByJabatan(){
	  		var data = {
	  			"kdUrtug": $state.params.kdUrtug,
	  			"kdJabatan": $state.params.kdJabatan,
	  			"kdJenisUrtug": $state.params.kdJenis,
	  			"tahunUrtug": $state.params.tahun,
	  			"kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
	  		};
	  		PengadaanBarangJasaService.GetUrtugKegiatanByJabatan(data).then(
	  			function(response){
	  				vm.dataLookKegiatan = response;
					vm.loading = false;
					vm.loadData = false;
	  				debugger
	  			}, function(errResponse){

	  			})
      	}

      	vm.getPJ = function(){
      		vm.loadData = true;
      		var keg = PengadaanBarangJasaService.FindKegiatan(vm.dataLookKegiatan, vm.noDpa);
      		var data = {
      			"kdUrtug": $state.params.kdUrtug,
			    "kdJabatan": $state.params.kdJabatan,
			    "kdJenisUrtug": $state.params.kdJenis,
			    "tahunUrtug": $state.params.tahun,
			    "kdUrusan": keg.kdUrusan,
			    "kdBidang": keg.kdBidang,
			    "kdUnit": keg.kdUnit,
			    "kdSub": keg.kdSub,
			    "tahun": keg.tahun,
			    "kdProg": keg.kdProg,
			    "idProg": keg.idProg,
			    "kdKeg": keg.kdKeg,
			    "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja
      		}

      		getAllPegawaiUnit(data);

      		PengadaanBarangJasaService.GetUrtugKegiatanPenanggungjawab(data).then(
      			function(response){
      				vm.jabatanDpa = response;debugger
      				vm.kegStat = false;
      				vm.loadData = false;
      			}, function(errResponse){
      				vm.kegStat = true;
      			})
      	}

      	vm.remove = function(data){
      		var keg = PengadaanBarangJasaService.FindKegiatan(vm.dataLookKegiatan, vm.noDpa);
	  		var item = {
	  			"kdUrtug": $state.params.kdUrtug,
			    "kdJabatan": $state.params.kdJabatan,
			    "kdJenisUrtug": $state.params.kdJenis,
			    "tahunUrtug": $state.params.tahun,
			    "kdUrusan": keg.kdUrusan,
			    "kdBidang": keg.kdBidang,
			    "kdUnit": keg.kdUnit,
			    "kdSub": keg.kdSub,
			    "tahun": keg.tahun,
			    "kdProg": keg.kdProg,
			    "idProg": keg.idProg,
			    "kdKeg": keg.kdKeg,
			    "nipPegawai": data.nipPegawai,
			    "kdStatusPenanggungJawab": data.kdStatusPenanggungJawab
	  		}
	  		PengadaanBarangJasaService.RemovePJ(item).then(
	  			function(response){
	  				EkinerjaService.showToastrSuccess('Data Penanggungjawab berhasil dihapus dari kegiatan');
	  				vm.getPJ();
	  			}, function(errResponse){
	  				EkinerjaService.showToastrError('Gagal Dihapus');
	  			})

      	}

      	vm.addPJ = function (parentSelector) {
	      	var keg = PengadaanBarangJasaService.FindKegiatan(vm.dataLookKegiatan, vm.noDpa);
	  		var item = {
	  			"kdUrtug": $state.params.kdUrtug,
			    "kdJabatan": $state.params.kdJabatan,
			    "kdJenisUrtug": $state.params.kdJenis,
			    "tahunUrtug": $state.params.tahun,
			    "kdUrusan": keg.kdUrusan,
			    "kdBidang": keg.kdBidang,
			    "kdUnit": keg.kdUnit,
			    "kdSub": keg.kdSub,
			    "tahun": keg.tahun,
			    "kdProg": keg.kdProg,
			    "idProg": keg.idProg,
			    "kdKeg": keg.kdKeg
	  		}
			console.log(item);
			var parentElem = parentSelector ? 
			angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'app/pengadaanBarangJasa/formPenanggungJawab.html',
			controller: 'FormPenanggungJawabController',
			controllerAs: 'skform',
			// windowClass: 'app-modal-window',
			// size: 'lg',
			appendTo: parentElem,
			resolve: {
			  items: function () {
			    return item;
			  },
			  pegawai: function(){
			  	return vm.pegawai;
			  }
			}
			});

			modalInstance.result.then(function () {
				vm.getPJ();
			}, function () {
				// showToastrFailed('menambahkan data');
			// $log.info('Modal dismissed at: ' + new Date());
			});
	    };


	}

})();
//       	:idProg:210
// kdBidang
// :10
// kdJabatan
// :
// "3241000A"
// kdJenisUrtug
// :
// "KJU001"
// kdKeg
// :
// 2
// kdProg
// :
// 1
// kdSub
// :
// 1
// kdUnit
// :
// 1
// kdUrtug
// :
// "1506558209178"
// kdUrusan
// :
// 2
// ketKeg
// :
// "Penyediaan Bahan Penyelenggaraan Administrasi Perkantoran"
// paguAnggaran
// :
// 200000000
// tahun
// :
// 2017
// tahunUrtug
// :
// 2017