(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('MemorandumController', MemorandumController);

    function MemorandumController(EkinerjaService, MemorandumService, HakAksesService, $scope, 
        $state, logo_bekasi, logo_garuda, $uibModal, $document, PengumpulanDataBebanKerjaService, PenilaianService) {
        var vm = this;
        vm.loading = true;
        vm.item = {};
        if($state.current.name == 'memorandumnonpejabat')
            vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.tembusanSurat = [{"id": new Date().getTime(), "deskripsi": ''}];

        vm.addTembusan = function(){
            var data = {"id": new Date().getTime(), "deskripsi": ''};
            vm.tembusanSurat.push(data);
        }

        PengumpulanDataBebanKerjaService.GetAllJabatan().then(
          function(response){
            vm.list_jabatan = response;
            vm.loading = false;
          }, function(errResponse){

          })

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.params.kdSuratBawahan != undefined)
                getDocumentMemorandum();
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.params.kdSuratBawahan != undefined)
                        getDocumentMemorandum();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.findJabatan = function(idx){
          if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
            vm.tembusanSurat[idx].jabatan = EkinerjaService.findJabatanByKdJabatan(vm.tembusanSurat[idx].jabat, vm.list_jabatan);
        }

        // $scope.$watch('pegawaiP', function(){
        //     if($scope.pegawaiP.length == 18)
        //         vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawaiP,vm.list_pegawai);
        //     debugger
        // })

        vm.openPenandatangan = function (parentSelector) {
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
              return vm.item.pegawaiPenandatangan;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            vm.item.pegawaiPenandatangan = data;
          }, function () {

          });
        };

        vm.openDari = function (parentSelector) {
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
              return vm.item.pegawaiPenerima;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            vm.item.pegawaiPenerima = data;
          }, function () {

          });
        };

        vm.openPegawaiDari = function (parentSelector) {
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
              return vm.item.pegawaiDari;
            },
            isPilihan: function(){
              return 2;
            }
          }
          });

          modalInstance.result.then(function (data) {
            vm.item.pegawaiDari = data;
          }, function () {

          });
        };

        // $scope.$watch('pegawai', function(){
        //     if($scope.pegawai.length == 18)
        //         vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
        //     debugger
        // });

        // $scope.$watch('pegawaidari', function(){
        //     if($scope.pegawaidari.length == 18)
        //         vm.item.pegawaiDari = EkinerjaService.findPegawaiByNip($scope.pegawaidari,vm.list_pegawai);
        //     debugger
        // });

        function getDocumentMemorandum(){
            PenilaianService.GetDataMemorandum($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorSurat": response.nomorUrusan,
                        "nomorSurat1": response.nomorPasanganUrut,
                        "nomorSurat2": response.nomorUnit,
                        "nomorUrut": response.nomorUrut,
                        "tahun": response.nomorTahun,

                        "pegawaiDari": EkinerjaService.findPegawaiByNip(response.nipPemberiMemorandum,vm.list_pegawai),
                        "pegawaiPenerima": EkinerjaService.findPegawaiByNip(response.nipPenerimaMemorandum,vm.list_pegawai),
                        "hal": response.hal,
                        "isimemorandum": response.isiMemorandum,
                        "pegawaiPenandatangan": EkinerjaService.findPegawaiByNip(response.nipPenandatangan, vm.list_pegawai)
                    };

                    vm.tembusanSurat = [];
                    for(var i = 0; i < response.tembusanMemorandumList.length; i++)
                        vm.tembusanSurat.push(
                            {"id": (new Date()).getTime(), 
                             "jabat": response.tembusanMemorandumList[i].kdJabatan,
                             "jabatan": response.tembusanSurat[i]});
                }
                );
        }

        vm.save = function(){
          var data = {
            "nomorUrusan": vm.item.nomorSurat,
            "nomorPasanganUrut": vm.item.nomorSurat1,
            "nomorUnit": vm.item.nomorSurat2,
            "nipPenerimaMemorandum": vm.item.pegawaiPenerima.nipPegawai,
            "nipPemberiMemorandum": vm.item.pegawaiDari.nipPegawai,
            "hal": vm.item.hal,
            "isiMemorandum": vm.item.isimemorandum,
            "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
            "kdUnitKerja": vm.item.pegawaiPenandatangan.kdUnitKerja,
            "kdNaskahPenugasan": "",
            "jenisNaskahPenugasan": "",
            "durasiPengerjaan": vm.item.waktuPembuatan,
            "statusPenilaian": "",
            "alasanPenolakan": "",
            "kdMemorandumBawahan": null,
            "kdJabatanTembusanList": [],
            "suratPejabat": true
            // "tanggalDibuat": (new Date()).getTime(),
          }

          if($state.params.kdSuratBawahan != undefined)
                data.kdMemorandumBawahan = $state.params.kdSuratBawahan;

          if($state.current.name == "memorandumnonpejabat")
            data.suratPejabat = false;

          debugger
          console.log(data);
          MemorandumService.save(data).then(
            function(response){
              EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
              return $state.go('kontrak');
            }, function(errResponse){
              EkinerjaService.showToastrError('Data Tidak Berhasil Disimpan');
            })
            
        };

        vm.back =  function(){
            $state.go('kontrak');
        };

        function template(){
            vm.docDefinition = {
                content: [
                    {
                        image: 'pejabat',
                        width: 50,
                        height: 50,
                        alignment: 'center',
                        margin: [0,0,0,5]
                    },

                    {
                        margin:[80,0,80,0],
                        text: '' + $.parseJSON(sessionStorage.getItem('credential')).unit.toUpperCase(), style: 'header'
                    },

                    {
                        text: 'REPUBLIK INDONESIA', style: 'header', margin: [0,0,0,15]
                    },
                    {
                        text: 'MEMORANDUM', style: 'nama_judul', size: 16
                    },

                    {
                        text: 'NOMOR '+ '' + vm.item.nomorSurat+ '/' + vm.item.nomorSurat1 + '/' + vm.item.nomorSurat2 + '/' + ((new Date()).getYear() + 1900), style: 'judul_nomor'
                    },

                    {
                        style: 'demoTable', margin: [0,15,0,15],
                        table: {
                            widths: [50, 5, '*'],
                            body: [
                                [
                                    {text: 'Yth.', bold: true},
                                    {text: ':'},
                                    {text: ''+ vm.item.pegawaiPenerima.nama}
                                ],
                                [
                                    {text: 'Dari', bold: true},
                                    {text: ':'},
                                    {text: '' + vm.item.pegawaiDari.nama}
                                ],
                                [
                                    {text: 'Hal', bold: true},
                                    {text: ':'},
                                    {text: '' + vm.item.hal}
                                ],
                                [
                                    {text: 'Tanggal', bold: true},
                                    {text: ':'},
                                    {text: ''+ EkinerjaService.IndonesianDateFormat(new Date())}
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        margin:[0,0,0,20],
                        alignment:'justify',
                        text: '' + vm.item.isimemorandum
                    },

                    {
                        style: 'tandaTangan',
                        margin:[300,30,0,0],
                        table: {
                            widths: [200],
                            body: [
                                [{text: '' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase()+',', alignment : 'left', bold: true}],
                                [{text: ' ',margin: [0,20]}],
                                [{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang, alignment : 'left'}],
                                [{text: '' + vm.item.pegawaiPenandatangan.pangkat, alignment : 'left'}],
                                [{text: 'NIP, ' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
                            ]
                        },
                        layout: 'noBorders'
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
                        fontSize: 10,
                        alignment: 'center'
                    },
                    nama_judul: {
                        alignment : 'center',
                        bold: true,
                        fontSize: 16
                    },
                    judul_nomor: {
                        alignment : 'center',
                        fontSize: 12
                    },
                    header3: {
                        bold: true,
                        color: '#000',
                        fontSize: 10
                    },
                    tandaTangan: {
                        color: '#000',
                        fontSize: 12,
                        alignment:'right'
                    },
                    header1: {
                        bold: true,
                        fontSize: 15,
                        alignment: 'center'
                    }
                },

                images:{
                    pejabat: logo_garuda
                }
            };

            var tembusan = {
                ol:[]
            }

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                tembusan.ol.push(vm.tembusanSurat[i].deskripsi);
            vm.docDefinition.content.push(tembusan);

            if($state.current.name == "memorandumnonpejabat"){
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
                                    border: [false, false, false, false],
                                    text: 'Telp. (021) 89970696',
                                    fontSize: 9,
                                    alignment: 'right'
                                },{
                                border: [false, false, false, false],
                                text: 'Fax. (021) 89970064',
                                fontSize: 9,
                                alignment: 'center'
                            },{
                                border: [false, false, false, false],
                                text: 'email : diskominfo@bekasikab.go.id',
                                fontSize: 9,
                                alignment: 'left'
                            }
                            ]
                        ]
                    }
                };

                vm.docDefinition.content[0] = {
                    margin: [175, -5, 0, 0],
                    table: {
                        widths: [230],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: 'Komplek Perkantoran Pemerintah Kabupaten Bekasi Desa Sukamahi Kecamatan Cikarang Pusat',
                                    style: 'header2'
                                }
                            ]
                        ]
                    }
                };

                vm.docDefinition.content.unshift({
                    margin: [90, -5, 0, 0],
                    table: {
                        widths: [400],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: 'DINAS KOMUNIKASI DAN INFORMATIKA PERSANDIAN DAN STATISTIK',
                                    style: 'header1'
                                }
                            ]
                        ]
                    }
                });

                vm.docDefinition.content.unshift({
                    margin: [90, -96, 0, 0],
                    table: {
                        widths: [400],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: 'PEMERINTAHAN KABUPATEN BEKASI',
                                    style: 'header1'
                                }
                            ]
                        ]
                    }
                });

                vm.docDefinition.content.unshift({
                    image: logo_bekasi,
                    width: 90,
                    height: 90
                });
            }
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