(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratDinasController', SuratDinasController);

    
    function SuratDinasController(EkinerjaService,  PengumpulanDataBebanKerjaService, HakAksesService, SuratDinasService,
        $scope, $state, logo_bekasi, logo_garuda, $uibModal, $document, PenilaianService) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.openDari = function (pegawai, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/template/dataPegawai/dataPegawai.html',
          controller: 'DataPegawaiController',
          controllerAs: 'datapegawai',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            pegawai: function(){
              return vm.list_pegawai;
            },
            pegawaiPilihan: function(){
              return pegawai;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            if(pegawai == 1)
                vm.item.pegawaiPenerima = data;
            else vm.item.pegawaiPenandatangan = data;
          }, function () {

          });
        };

        PengumpulanDataBebanKerjaService.GetAllJabatan().then(
          function(response){
            vm.list_jabatan = response;
            if($state.params.kdSuratBawahan != undefined)
                getDocumentSuratDinas();
            vm.loading = false;
          }, function(errResponse){

          });

        vm.findJabatan = function(idx){
          if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
            vm.tembusanSurat[idx].jabatan = EkinerjaService.findJabatanByKdJabatan(vm.tembusanSurat[idx].jabat, vm.list_jabatan);
        };

        vm.findJabatanTarget = function(){debugger
            vm.item.jabatanPenerima = EkinerjaService.findJabatanByKdJabatan(vm.jabatan, vm.list_jabatan);
        };

        if($state.current.name == "suratdinasnonpejabat")
          vm.judul = 'Non-Pejabat';
        else vm.judul = 'Pejabat';

        vm.tembusanSurat = [];

        vm.addTembusan = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.tembusanSurat.push(data);
        }

        vm.target = [{"id": new Date().getTime()}];
        
        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        }
        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.params.kdSuratBawahan != undefined)
                        getDocumentSuratDinas();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.getPegawai = function(idx){
          if(vm.target[idx].pegawai.length == 18)
            vm.target[idx].pegawaiTarget = EkinerjaService.findPegawaiByNip(vm.target[idx].pegawai,vm.list_pegawai);
        };
        vm.getPegawaiPenerima = function(){
          if(vm.item.pegawaiPenerimaSurat.length == 18){
            vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip(vm.item.pegawaiPenerimaSurat,vm.list_pegawai);
            console.log(vm.item.pegawaiPenerima);
          }
        };

        vm.getPegawaiPenandatangan = function(){
          if(vm.item.pegawaiPenandatanganSurat.length == 18){
            vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(vm.item.pegawaiPenandatanganSurat,vm.list_pegawai);
            console.log(vm.item.pegawaiPenandatangan);
          }
        };

        vm.openTembusan = function (jabatan, parentSelector) {
          var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
          var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/template/dataJabatan/dataJabatan.html',
          controller: 'DataJabatanController',
          controllerAs: 'datajabatan',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem,
          resolve: {
            jabatan: function(){
              return vm.list_jabatan;
            },
            jabatanPilihan: function(){
              return vm.tembusanSurat;
            },
            isPilihan: function(){
              return 0;
            }
          }
          });

          modalInstance.result.then(function () {
          }, function () {

          });
        };

        vm.openPilihanTembusan = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/template/dataJabatan/dataJabatan.html',
                controller: 'DataPegawaiController',
                controllerAs: 'datajabatan',
                // windowClass: 'app-modal-window',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    pegawai: function(){
                        return vm.tembusanSurat;
                    },
                    pegawaiPilihan: function(){
                        return vm.tembusanSurat;
                    },
                    isPilihan: function(){
                        return 1;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };

        function getDocumentSuratDinas(){
            PenilaianService.GetDataSuratDinas($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorUrusan": response.nomorUrusan,
                        "nomorPasanganUrut": response.nomorPasanganUrut,
                        "nomorUnit": response.nomorUnit,
                        "nomorUrut": response.nomorUrut,
                        "tahun": response.nomorTahun,

                        "sifat": response.sifat,
                        "hal": response.hal,
                        "lampiran": response.lampiran,
                        "tempat": response.kotaPembuatanSurat,
                        "alineaIsi": response.isiSuratDinas,
                        "pegawaiPenandatangan": EkinerjaService.findPegawaiByNip(response.nipPenandatangan,vm.list_pegawai),
                        "tanggal1": new Date(response.tanggalPembuatanMilis)
                    };

                    vm.jabatan = response.kdJabatanPenerimaSuratDinas;
                    vm.findJabatanTarget();

                    vm.tembusanSurat = [];
                    for(var i = 0; i < response.tembusanSuratDinasWrapper.length; i++)
                      vm.tembusanSurat.push({"id": new Date().getTime(), "jabat": response.tembusanSuratDinasWrapper[i].kdJabatan,
                                                "jabatan": response.tembusanSuratDinasWrapper[i]});
                }
                );
        }

        vm.save = function(){
            var data = {
                "kdSuratDinas": null,
                "nomorUrusan": vm.item.nomorUrusan,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,
                "nomorUnit": vm.item.nomorUnit,
                "sifat": vm.item.sifat,
                "lampiran": vm.item.lampiran,
                "hal": vm.item.hal,
                "kdJabatanPenerimaSuratDinas": vm.item.pegawaiPenerima.kdJabatan,
                "tanggalSuratDinasMilis": vm.item.tanggal1.getTime(),
                "kotaPembuatanSuratDinas": vm.item.tempat,
                "isiSuratDinas": vm.item.alineaIsi,
                "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "durasiPengerjaan": vm.item.durasiPengerjaan,

                "kdSuratDinasBawahan": null,
                "kdNaskahPenugasan": null,
                "jenisNaskahPenugasan": 5,
                "statusPenilaian": 0,
                "alasanPenolakan": null,
                "suratPejabat": true,
                "kdJabatanSuratPejabat": vm.item.pegawaiPenandatangan.kdJabatan,
                "kdTembusanList": []
            };

            if($state.params.kdSuratBawahan != "")
                data.kdSuratDinasBawahan = $state.params.kdSuratBawahan;

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                data.kdTembusanList.push(vm.tembusanSurat[i].jabatan.kdJabatan);

            if($state.current.name == "suratdinasnonpejabat")
                data.suratPejabat = false;

            console.log(data);
            SuratDinasService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                    $state.go('kontrak');
                }, function(errResponse){
                    EkinerjaService.showToastrError('Data Tidak Dapat Disimpan');
                })
        };

        vm.back =  function(){
          $state.go('kontrak');
        };


        // docDefinition.content[0].text = 'baka aweu';

        function template(){
          vm.docDefinition = {
                    content: [
                        {
                        image: logo_garuda,
                        width: 50,
                        height: 50,
                        alignment: 'center',
                        margin: [0,0,0,5]
                    },

                    {
                        text: '' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase(), style: 'nama_judul'
                    },

                    {
                        text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,20]
                    },

                    {
                        style: 'demoTable', margin: [0,0,0,15],
                        table: {
                            widths: [60, 5, '*', '*'],
                            body: [
                                [{text: 'Nomor', bold: true},{text: ':'},{text: ''+ vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit + '/' + (new Date().getYear()+1900)}, {text: '' + vm.item.tempat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal1), alignment:'right'}],
                                [{text: 'Sifat', bold: true},{text: ':'},{text: '' + vm.item.sifat}, {text: ''}],
                                [{text: 'Lampiran', bold: true},{text: ':'},{text: '' + vm.item.lampiran}, {text: ''}],
                                [{text: 'Hal', bold: true},{text: ':'},{text: '' + vm.item.hal}, {text: ''}]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        margin: [0,0,0,15],
                        table: {
                            widths: [200],
                            body: [
                                [{text: 'Yth. ' + vm.item.pegawaiPenerima.jabatan}]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        text: '' + vm.item.alineaIsi,  margin: [0,0,0,10], alignment:'justify'
                    },

                    {
                        columns: [
                            {
                                width: '63%',
                                text: ''
                            },
                            {
                                style: 'tandaTangan',
                                table: {
                                    widths: [200],
                                    body: [
                                        [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                        [{text: ' ',margin: [0,20]}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang, alignment : 'left', bold: true}],
                                        [{text: '' + vm.item.pegawaiPenandatangan.pangkat, alignment : 'left', bold: true}],
                                        [{text: 'NIP. ' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]
                    },
                    {text: 'Tembusan :'}
            ],

            styles: {
                header: {
                    bold: true,
                    fontSize: 14,
                    alignment: 'center'
                },
                header2: {
                    fontSize: 12,
                    alignment: 'center'
                },
                header3: {
                    fontSize: 10,
                    alignment: 'center'
                },
                nama_judul: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 12
                },
                judul_nomor: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 12
                },
                demoTable: {
                    color: '#000',
                    fontSize: 12
                },
                tandaTangan: {
                    color: '#000',
                    fontSize: 12,
                    alignment:'right'
                }
            }
        };

        if($state.current.name == "suratdinasnonpejabat"){
            vm.docDefinition.content[0] =
                {
                    margin:[0,0,0,15],
                    table:{
                        widths: [100,'*'],
                        body: [
                            [
                                {
                                    image: logo_bekasi,
                                    width: 90,
                                    height: 90,
                                    alignment: 'center'
                                },
                                [
                                    {
                                        text:[
                                            {text: 'PEMERINTAHAN KABUPATEN BEKASI\n', alignment: 'center', style:'header'},
                                            {text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase() + '\n', alignment: 'center', style:'header'},
                                            {text: 'Komplek Perkantoran Pemerintah Kabupaten\nBekasi Desa Sukamahi Kecamatan Cikarang Pusat', style: 'header2'}
                                        ]
                                    },
                                    {
                                        margin: [15,0,0,0],
                                        table: {
                                            body: [
                                                [
                                                    {text: 'Telp. (021) 89970696', style: 'header3'},
                                                    {text: 'Fax. (021) 89970064', style: 'header3'},
                                                    {text: 'email : diskominfo@bekasikab.go.id', style: 'header3'}
                                                ]
                                            ]
                                        }, layout: 'noBorders'
                                    }
                                ]
                            ],
                            [{text:'', colSpan: 2}],
                            [{text:'', fillColor: 'black', colSpan: 2}]
                        ]
                    },
                    layout: 'noBorders'
                };

            vm.docDefinition.content[1] = {};
            vm.docDefinition.content[2] = {};
        }
          var tembusan = {
            ol:[]
          };

          for(var i = 0; i < vm.tembusanSurat.length; i++)
            tembusan.ol.push(vm.tembusanSurat[i].jabatan.jabatan);
          vm.docDefinition.content.push(tembusan);
        }

        $scope.openPdf = function() {
          var blb;
          // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
          //     // turn buffer into blob
          //     blb = buffer;
          // });
          // blb = new Blob(blb);
          console.log(vm.item.pembukaSurat);
          template();
          EkinerjaService.lihatPdf(vm.docDefinition, 'Surat Dinas');
        };

        $scope.downloadPdf = function() {
          pdfMake.createPdf(vm.docDefinition).download();
        };
   	} 
})();