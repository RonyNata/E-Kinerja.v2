(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('NotaDinasPencairanController', NotaDinasPencairanController);

    
    function NotaDinasPencairanController(EkinerjaService, HakAksesService, NotaDinasService, PengumpulanDataBebanKerjaService, 
      $scope, $state, logo_bekasi, $uibModal, $document, PenilaianService) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.target = [{"id": new Date().getTime()}];

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.tembusanSurat = [{"id": new Date().getTime(), "deskripsi": ''}];

        vm.addTembusan = function(){
            var data = {"id": new Date().getTime(), "deskripsi": ''};
            vm.tembusanSurat.push(data);
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
            switch(pegawai){
                case 1: vm.item.pembuatKomitmen = data; break;
                case 2: vm.item.pegawaiPelaksana = data; break;
                // case 3: vm.item.pegawaiPenandatangan = data; break;
            }
          }, function () {

          });
        };

        PengumpulanDataBebanKerjaService.GetProgram($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
              function(response){
                vm.list_program = response;debugger
                
              },
              function(errResponse){

              }
            )

        PengumpulanDataBebanKerjaService.GetAllKegiatan($.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja).then(
              function(response){
                vm.list_kegiatan = response;debugger
                
              },
              function(errResponse){

              }
            )

        function getDocumentNodin(){
            PenilaianService.GetDataNodin($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorUrusan": response.nomorUrusan,
                        "nomorPasanganUrut": response.nomorPasanganUrut,
                        "nomorUnit": response.nomorUnit,
                        "nomorUrut": response.nomorUrut,
                        "tahun": response.nomorTahun,

                        "isiNotaDinas": response.isiNotaDinas,
                        "hal": response.hal,
                        "pegawaiPelaksana": EkinerjaService.findPegawaiByNip(response.pemberiNotaDinas.nip,vm.list_pegawai),
                        "pembuatKomitmen": EkinerjaService.findJabatanByKdJabatan(response.kdJabatanPenerimaNotaDinas, vm.list_pegawai),
                        "pegawaiPenandatangan": EkinerjaService.findPegawaiByNip(response.penandatangan.nip,vm.list_pegawai),
                        "tanggal": new Date(response.tanggalPembuatanMilis)
                    };

                    vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(response.nipPenandatangan, vm.list_pegawai);
                    $scope.pegawaiP = response.nipPenandatangan;

                    vm.tembusanSurat = [];
                    for(var i = 0; i < response.tembusanNotaDinasList.length; i++)
                      vm.tembusanSurat.push({"id": new Date().getTime(), "jabat": response.tembusanNotaDinasList[i].kdJabatan,
                                                "jabatan": response.tembusanNotaDinasList[i]});
                }
                );
        }

        vm.save = function(){
            var data = {
                "kdNotaDinas": "",
                "nomorUrusan": vm.item.nomorUrusan,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,
                "nomorUnit": vm.item.nomorUnit,
                "kdJabatanPenerimaNotaDinas": vm.item.pembuatKomitmen.kdJabatan,
                "nipPemberiNotaDinas": vm.item.pegawaiPelaksana.nipPegawai,
                "hal": vm.item.hal,
                "tanggalNotaDinasMilis": vm.item.tanggal.getTime(),
                "isiNotaDinas": vm.item.isiNotaDinas,
                "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "durasiPengerjaan": vm.item.durasiPengerjaan,
                "kdTembusanList": [],
                "kdNotaDinasBawahan": null,
                "kdNaskahPenugasan": "",
                "jenisNaskahPenugasan": "3",
                "statusPenilaian": "",
                "alasanPenolakan": ""
            };

            if($state.params.kdSuratBawahan != "")
                data.kdNotaDinasBawahan = $state.params.kdSuratBawahan;

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                data.kdTembusanList.push(vm.tembusanSurat[i].jabatan.kdJabatan);

            console.log(data);
            NotaDinasService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                    return $state.go('kontrak');
                }, function(errResponse){
                    EkinerjaService.showToastrError('Data Tidak Berhasil Disimpan');
                });

        };

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        };

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.params.kdSuratBawahan != undefined)
                getDocumentNodin();
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.params.kdSuratBawahan != undefined)
                      getDocumentNodin();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.findJabatan = function(idx){
            if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
                vm.tembusanSurat[idx].jabatan = EkinerjaService.findJabatanByKdJabatan(vm.tembusanSurat[idx].jabat, vm.list_jabatan);
        };

        vm.findProgram = function(kdProg){
            // if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
                vm.item.program = EkinerjaService.findProgram(kdProg, vm.list_program);
        };

        vm.findKegiatan = function(kdKeg){
            // if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
                vm.item.kegiatan = PengumpulanDataBebanKerjaService.GetKegiatanById(vm.list_kegiatan, kdKeg);
        };

        PengumpulanDataBebanKerjaService.GetAllJabatan().then(
            function(response){
                vm.list_jabatan = response;
                vm.loading = false;
            }, function(errResponse){

            });

        $scope.$watch('pembuatKomitmen', function(){
            if($scope.pembuatKomitmen.length == 18)
                vm.item.pembuatKomitmen = EkinerjaService.findPegawaiByNip($scope.pembuatKomitmen,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaiPelaksana', function(){
            if($scope.pegawaiPelaksana.length == 18)
                vm.item.pegawaiPelaksana = EkinerjaService.findPegawaiByNip($scope.pegawaiPelaksana,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaipenandatangan', function(){
            if($scope.pegawaipenandatangan.length == 18)
                vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawaipenandatangan,vm.list_pegawai);
            debugger
        });

        // vm.save = function(){
        //   vm.item.tembusanSurat = [];
        //   vm.item.tanggal = vm.item.tanggal.getTime();
        //   vm.item.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
        //   vm.item.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
        //   vm.item.nmInstansi = $.parseJSON(sessionStorage.getItem('credential')).unit;
        //   for(var i = 0; i < vm.target.length; i++)
        //     vm.item.tembusanSurat.push(vm.target[i].pegawaiTarget.nipPegawai);
        //   console.log(vm.item);
        //   for(var i = 0; i < vm.notadinas.length; i++)
        //     data.targetPegawaiList.push(vm.target[i].pegawaiPembuat.nipPegawai);
        //   NotaDinasService.save(vm.item).then(
        //     function(response){
        //       EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
        //     }, function(errResponse){

        //     })
        // };

        vm.back =  function(){
          $state.go('kontrak');
        };

        function template(){
          vm.docDefinition = {
            content: [
              {
                  table:{
                      widths: [100,'*'],
                      body: [
                          [
                              {
                                  image: 'logo',
                                  width: 90,
                                  height: 90,
                                  alignment: 'center'
                              },
                              [
                                  {
                                      text:[
                                          {text: 'PEMERINTAHAN KABUPATEN BEKASI\n', alignment: 'center', style:'header'},
                                          {text: '' + vm.item.pembuatKomitmen.unitKerja.toUpperCase() +'\n', alignment: 'center', style:'header'},
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
              },

              {
                  margin: [0,15,0,0],
                  text: 'NOTA PENCAIRAN',
                  style: 'header4',
                  alignment: 'center'
              },

              {
                  text: 'NOMOR : '+ vm.item.nomorUrusan +'/..../'+ vm.item.nomorUnit + '.' + vm.item.nomorPasanganUrut +'/' + vm.item.tahun,
                  style: 'judul_nomor'
              },

              {
                  margin: [0,15,0,0],
                  table: {
                      headerRows: 1,
                      body: [
                          [
                              {
                                  colSpan: 7,
                                  table: {
                                      body: [
                                          [
                                              {text: 'BENDAHARA PENGELUARAN', style: 'header4', colSpan: 4, alignment : 'center'},{},{},{}
                                          ],
                                          [
                                              {text: '' + vm.item.pembuatKomitmen.unitKerja.toUpperCase(), style: 'header4', colSpan: 4, alignment : 'center'},{},{},{}
                                          ],
                                          [
                                              {text: 'Supaya mencairkan dana kepada :', style: 'header5', colSpan: 4},{},{},{}
                                          ],
                                          [
                                              {text: '1.', style: 'header4'},
                                              {text: 'Pejabat Pelaksana Teknis Kegiatan', style: 'header4'},
                                              {text: ':', style: 'header4'},
                                              {text: '' + vm.item.pegawaiPelaksana.nama, style: 'header5'}
                                          ],
                                          [
                                              {text: '2.', style: 'header4'},
                                              {text: 'Program', style: 'header4'},
                                              {text: ':', style: 'header4'},
                                              {text: '' + vm.item.program.ketProgram, style: 'header5'}
                                          ],
                                          [
                                              {text: '3.', style: 'header4'},
                                              {text: 'Nama Kegiatan', style: 'header4'},
                                              {text: ':', style: 'header4'},
                                              {text: '' + vm.item.kegiatan.ketKegiatan, style: 'header5'}
                                          ],
                                          [
                                              {text: '4.', style: 'header4'},
                                              {text: 'Nomor DPA', style: 'header4'},
                                              {text: ':', style: 'header4'},
                                              {text: '2.10.01.15.15.5.2', style: 'header5'}
                                          ],
                                          [
                                              {text: '5.', style: 'header4'},
                                              {text: 'Tahun Anggaran', style: 'header4'},
                                              {text: ':', style: 'header4'},
                                              {text: '' + vm.item.kegiatan.tahun, style: 'header5'}
                                          ]
                                      ]
                                  }, layout: 'noBorders'
                              },{},{},{},{},{},{}
                          ],
                          [
                              {
                                  colSpan: 7,
                                  table: {
                                      body: [
                                          [
                                              {text: 'Pembebanan pada kode rekening', style: 'header4'},
                                              {text: ':', style: 'header4'},
                                              {text: '2.10.2.10.01.15.15', style: 'header5'}
                                          ]
                                      ]
                                  }, layout: 'noBorders'
                              },{},{},{},{},{},{}
                          ],
                          [
                              {text: 'No', style: 'header4', alignment : 'center'},
                              {text: 'Kode Rekening', style: 'header4'},
                              {text: 'Uraian', style: 'header4'},
                              {text: 'Anggran (Rp)', style: 'header4'},
                              {text: 'Akumulasi pencairan sebelumnya', style: 'header4'},
                              {text: 'Pencairan saat ini', style: 'header4'},
                              {text: 'Sisa (Rp)', style: 'header4'}
                          ],
                          [
                              {text: '1', style: 'header4', alignment : 'center'},
                              {text: '5.2.3.17.02', style: 'header4'},
                              {text: 'Honorium panitia penerima hasil pekerjaan', style: 'header4'},
                              {text: '1.750.000', style: 'header6'},
                              {text: '-', style: 'header6'},
                              {text: '1.750.000', style: 'header6'},
                              {text: '0', style: 'header6'}
                          ],
                          [
                              {text: '2', style: 'header4', alignment : 'center'},
                              {text: '5.2.3.17.02', style: 'header4'},
                              {text: 'Honor pengelola keuangan PPK, pelaksana administrasi', style: 'header4'},
                              {text: '7.520.000', style: 'header6'},
                              {text: '-', style: 'header6'},
                              {text: '7.520.000', style: 'header6'},
                              {text: '0', style: 'header6'}
                          ],
                          [
                              {text: '3', style: 'header4', alignment : 'center'},
                              {text: '5.2.3.17.02', style: 'header4'},
                              {text: 'Belanja alat tulis kantor (ATK)', style: 'header4'},
                              {text: '1.860.000', style: 'header6'},
                              {text: '-', style: 'header6'},
                              {text: '1.860.000', style: 'header6'},
                              {text: '0', style: 'header6'}
                          ],
                          [
                              {text: '4', style: 'header4', alignment : 'center'},
                              {text: '5.2.3.17.02', style: 'header4'},
                              {text: 'Belanja cetak dan penggandaan', style: 'header4'},
                              {text: '250.000', style: 'header6'},
                              {text: '-', style: 'header6'},
                              {text: '250.000', style: 'header6'},
                              {text: '0', style: 'header6'}
                          ],
                          [
                              {text: 'Jumlah', style: 'header4', colSpan: 3},{},{},
                              {text: '11.380.000', style: 'header6'},
                              {text: '-', style: 'header6'},
                              {text: '11.380.000', style: 'header6'},
                              {text: '-', style: 'header6'}
                          ]
                      ]
                  }
              },

              {
                  margin: [0,15,0,0],
                  columns: [
                      {
                          style: 'tandaTangan',
                          table: {
                              widths: [240],
                              body: [
                                  [{text: ' ', alignment : 'left', bold: true}],
                                  [{text: 'PEJABAT PEMBUAT KOMITMEN', alignment : 'left', bold: true}],
                                  [{text: ' ',margin: [0,15]}],
                                  [{text: '' + vm.item.pembuatKomitmen.nama, alignment : 'left', bold:true}],
                                  [{text: 'PANGKAT', alignment : 'left', bold:true}],
                                  [{text: 'NIP. ' + vm.item.pembuatKomitmen.nipPegawai, alignment : 'left'}]
                              ]
                          }, layout: 'noBorders'
                      },
                      {
                          style: 'tandaTangan',
                          table: {
                              widths: [240],
                              body: [
                                  [{text: ''+ vm.item.tempat +', ' + EkinerjaService.IndonesianDateFormat(new Date()), alignment : 'left', bold: true}],
                                  [{text: 'PEJABAT PELAKSANA TEKNIS KEGIATAN', alignment : 'left', bold: true}],
                                  [{text: ' ',margin: [0,15]}],
                                  [{text: '' + vm.item.pegawaiPelaksana.nama, alignment : 'left', bold:true}],
                                  [{text: 'PANGKAT', alignment : 'left', bold:true}],
                                  [{text: 'NIP. ' + vm.item.pegawaiPelaksana.nipPegawai, alignment : 'left'}]
                              ]
                          }, layout: 'noBorders'
                      }
                  ]
              }
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
              },
              header4: {
                  bold: true,
                  fontSize: 12
              },
              header5: {
                  fontSize: 12
              },
              header6: {
                  fontSize: 12,
                  alignment:'right'
              }
          },
              images:{
                  logo: logo_bekasi
              }
          };
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