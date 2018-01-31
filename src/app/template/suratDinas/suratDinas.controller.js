(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratDinasController', SuratDinasController);

    
    function SuratDinasController(EkinerjaService,  PengumpulanDataBebanKerjaService, HakAksesService, SuratDinasService,
        $scope, $state, logo_bekasi, logo_garuda, $uibModal, $document) {
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
          }, function(errResponse){

          });

        vm.findJabatan = function(idx){
          if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
            vm.tembusanSurat[idx].jabatan = EkinerjaService.findJabatanByKdJabatan(vm.tembusanSurat[idx].jabat, vm.list_jabatan);
        };

        vm.findJabatanTarget = function(){
            vm.item.jabatanPenerima = EkinerjaService.findJabatanByKdJabatan(vm.jabatantarget, vm.list_jabatan);
        };

        if($state.current.name == "suratdinasnonpejabat")
          vm.judul = 'Non-Pejabat';
        else vm.judul = 'Pejabat';

        vm.tembusanSurat = [{"id": new Date().getTime(), "deskripsi": ''}];

        vm.addTembusan = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.tembusanSurat.push(data);
        }

        vm.target = [{"id": new Date().getTime()}];
        
        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        }
        getAllPegawai();

        function getAllPegawai(){
          HakAksesService.GetAllPegawai().then(
            function(response){
              vm.list_pegawai = response;
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

        vm.save = function(){
            var data = {
                "kdSuratDinas": null,
                "nomorUrusan": vm.item.nomorUrusan,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,
                "nomorUnit": vm.item.nomorUnit,
                "sifat": vm.item.sifat,
                "lampiran": vm.item.lampiran,
                "hal": vm.item.hal,
                "kdJabatanPenerimaSuratDinas": vm.item.jabatanPenerima.kdJabatan,
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
                        widths: [50, 5, '*', '*'],
                        body: [
                            [{text: 'Nomor', bold: true},{text: ':'},{text: ''+ vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit + '/' + (new Date().getYear()+1900)}, {text: '' + vm.item.tempat + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal1), alignment:'right'}],
                            [{text: 'Sifat', bold: true},{text: ':'},{text: '' + vm.item.sifat}, {text: ''}],
                            [{text: 'Lampiran', bold: true},{text: ':'},{text: '' + vm.item.lampiran}, {text: ''}],
                            [{text: 'Hal', bold: true},{text: ':'},{text: '' + vm.item.hal}, {text: ''}]
                        ]
                    },
                    layout: 'noBorders'
                },

                {
                    margin: [0,0,0,15], alignment:'justifly',
                    table: {
                        widths: [150],
                        body: [
                            [{text: 'Yth. ' + vm.item.jabatanPenerima.kdJabatan}]
                        ]
                    },
                    layout: 'noBorders'
                },

                {
                    text: '' + vm.item.alineaIsi,  margin: [0,0,0,10], alignment:'justifly'
                },

                {
                    style: 'tandaTangan',
                    table: {
                        widths: [200],
                        body: [
                            [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                            [{text: ' ',margin: [0,20]}],
                            [{text: '' + vm.item.pegawaiPenandatangan.nama, alignment : 'left'}]
                        ]
                    },
                    layout: 'noBorders'
                },

                {text: 'Tembusan :'}
            ],

            styles: {
                header: {
                    bold: true,
                    fontSize: 15,
                    alignment: 'center'
                },
                header2: {
                    fontSize: 10,
                    alignment: 'center'
                },
                nama_judul: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 12
                },
                header1: {
                    bold: true,
                    fontSize: 15,
                    alignment: 'center'
                },
                judul_nomor: {
                    alignment : 'center',
                    bold: true,
                    fontSize: 11
                },
                header3: {
                    bold: true,
                    color: '#000',
                    fontSize: 10
                },
                demoTable: {
                    color: '#000',
                    fontSize: 10
                },
                tandaTangan: {
                    color: '#000',
                    fontSize: 10,
                    alignment:'right'
                }
            }
        };

        if($state.current.name == "suratdinasnonpejabat"){
            vm.docDefinition.content[2] = {
                margin: [0, 10, 0, 15],
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                            }
                        ]
                    ]
                },
                layout: {
                    fillColor: 'Black'
                }
            };

            vm.docDefinition.content[1] = {
                margin: [115, -5, 0, 0],
                table: {
                    widths: [90, 90, 150],
                    body: [
                        [
                            {
                                text: 'Telp. (021) 89970696',
                                fontSize: 9,
                                alignment: 'right'
                            },{
                            text: 'Fax. (021) 89970064',
                            fontSize: 9,
                            alignment: 'center'
                        },{
                            text: 'email : diskominfo@bekasikab.go.id',
                            fontSize: 9,
                            alignment: 'left'
                        }
                        ]
                    ]
                },
                layout: 'noBorders'
            };

            vm.docDefinition.content[0] = {
                margin: [175, -5, 0, 0],
                table: {
                    widths: [230],
                    body: [
                        [
                            {
                                text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
                                style: 'header2'
                            }
                        ]
                    ]
                },
                layout: 'noBorders'
            };
            
            vm.docDefinition.content.unshift({
                margin: [90, -5, 0, 0],
                table: {
                    widths: [400],
                    body: [
                        [
                            {
                                text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase(),
                                style: 'header1'
                            }
                        ]
                    ]
                },
                layout: 'noBorders'
            });

            vm.docDefinition.content.unshift({
                margin: [90, -96, 0, 0],
                table: {
                    widths: [400],
                    body: [
                        [
                            {
                                text: 'PEMERINTAHAN KABUPATEN BEKASI',
                                style: 'header1'
                            }
                        ]
                    ]
                },
                layout: 'noBorders'
            });

            vm.docDefinition.content.unshift({
                image: logo_bekasi,
                width: 90,
                height: 90
            });
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
          pdfMake.createPdf(vm.docDefinition).open();
        };

        $scope.downloadPdf = function() {
          pdfMake.createPdf(vm.docDefinition).download();
        };
   	} 
})();