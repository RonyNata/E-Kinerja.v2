(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('NotaDinasController', NotaDinasController);

    
    function NotaDinasController(EkinerjaService, HakAksesService, NotaDinasService, PengumpulanDataBebanKerjaService, 
      $scope, $state, logo_bekasi, $uibModal, $document, PenilaianService) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.target = [{"id": new Date().getTime()}];

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.tembusanSurat = [];

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
                case 1: vm.item.pegawaiPenerima = data; break;
                case 2: vm.item.pegawaiPemberi = data; break;
                case 3: vm.item.pegawaiPenandatangan = data; break;
            }
          }, function () {

          });
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

        vm.openPilihan = function (parentSelector) {
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
                        "pegawaiPemberi": EkinerjaService.findPegawaiByNip(response.pemberiNotaDinas.nip,vm.list_pegawai),
                        "pegawaiPenerima": EkinerjaService.findJabatanByKdJabatan(response.kdJabatanPenerimaNotaDinas, vm.list_pegawai),
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
                "kdJabatanPenerimaNotaDinas": vm.item.pegawaiPenerima.kdJabatan,
                "nipPemberiNotaDinas": vm.item.pegawaiPemberi.nipPegawai,
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
                data.kdTembusanList.push(vm.tembusanSurat[i].kdJabatan);

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

        PengumpulanDataBebanKerjaService.GetAllJabatan().then(
            function(response){
                vm.list_jabatan = response;
                vm.loading = false;
            }, function(errResponse){

            });

        $scope.$watch('pegawaipenerima', function(){
            if($scope.pegawaipenerima.length == 18)
                vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawaipenerima,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaipemberi', function(){
            if($scope.pegawaipemberi.length == 18)
                vm.item.pegawaiPemberi = EkinerjaService.findPegawaiByNip($scope.pegawaipemberi,vm.list_pegawai);
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
                    margin:[0,0,0,15],
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
                                            {text: '' + $.parseJSON(sessionStorage.getItem('credential')).unit.toUpperCase() + '\n', alignment: 'center', style:'header'},
                                            {text: 'Komplek Perkantoran Pemerintah Kabupaten\nBekasi Desa Sukamahi Kecamatan Cikarang Pusat', style: 'header2'}
                                        ]
                                    },
                                    {
                                        margin: [15,0,0,0],
                                        table: {
                                            body: [
                                                [
                                                    {text: 'Telp. (021) 89970696', style: 'header2'},
                                                    {text: 'Fax. (021) 89970064', style: 'header2'},
                                                    {text: 'email : diskominfo@bekasikab.go.id', style: 'header2'}
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
                text: 'NOTA DINAS', style: 'nota_dinas'
              },

              {
                text: [{text : 'NOMOR ', style: 'judul_nomor'}, '' + vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit + '/' + ((new Date()).getYear() + 1900)]
              },

              {
                style: 'demoTable',
                table: {
                  widths: [50, 5, 150],
                  body: [
                    [{text: 'Yth', bold: true},{text:':'}, {text: '' + vm.item.pegawaiPenerima.jabatan}],
                    [{text: 'Dari', bold: true},{text:':'}, {text: '' + vm.item.pegawaiPemberi.jabatan}],
                    [{text: 'Hal', bold: true},{text:':'}, {text: '' + vm.item.hal}],
                    [{text: 'Tanggal', bold: true},{text:':'}, {text: ''+ EkinerjaService.IndonesianDay(vm.item.tanggal) + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal)}]
                  ]
                },
                  layout: 'noBorders'
              },

              {
                  style: 'garis',
                  table: {
                      widths: ["*"],
                      body: [
                          [{text: ''}]]
                  }
              },

              {
                text: '' + vm.item.isiNotaDinas, style : 'isi_paragraf'
              },

              {
                  style: 'tandaTangan',
                  table: {
                      widths: [200],
                      body: [
                          [{text: 'Tanda Tangan,', alignment : 'center', bold: true}],
                          [{text: ' ',margin: [0,20]}],
                          [{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang, alignment : 'center'}],
                          [{text: '' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'center'}]
                      ]
                  },
                  layout: 'noBorders'
              },

              {text: 'Tembusan :', style: 'tembusan'}

            ],

            styles: {
              nama_instansi: {
                alignment : 'center',
                bold: true,
                fontSize: 14,
                margin: [0,0,0,30]
              },
              nota_dinas : {
                alignment : 'center',
                bold: true,
                fontSize: 14
              },
              judul_nomor: {
                  alignment : 'center',
                  bold: true,
                  fontSize: 11
              },
              garis: {
                  fillColor: 'black'
              },
              isi_paragraf: {
                alignment : 'justify',
                margin: [0,20,0,30]
              },
                header: {
                    bold: true,
                    fontSize: 14,
                    alignment: 'center'
                },
                header3: {
                    fontSize: 10,
                    alignment: 'center'
                },
                header1: {
                    bold: true,
                    fontSize: 15,
                    alignment: 'center'
                },
                header2: {
                    fontSize: 10,
                    alignment: 'center'
                },
              demoTable: {
                color: '#000',
                fontSize: 10,
                margin: [0,20,0,10]
              },
              tandaTangan: {
                color: '#000',
                alignment : 'right',
                margin: [300,0,0,20]
              }
            },

              images:{
                  logo: logo_bekasi
              }
          };

          var tembusanSurat = {
            ol:[]
          };

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                tembusanSurat.ol.push(vm.tembusanSurat[i].jabatan);
            vm.docDefinition.content.push(tembusanSurat);
        }

        $scope.openPdf = function() {
            var blb;
            // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
            //     // turn buffer into blob
            //     blb = buffer;
            // });
            // blb = new Blob(blb);
            template();
            // console.log(vm.tembusanSurat);

            EkinerjaService.lihatPdf(vm.docDefinition, 'Nota Dinas');
        };

        $scope.downloadPdf = function() {
          pdfMake.createPdf(vm.docDefinition).download();
        };
   	} 
})();