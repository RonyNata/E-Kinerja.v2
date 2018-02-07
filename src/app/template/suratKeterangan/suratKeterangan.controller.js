(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('SuratKeteranganController', SuratKeteranganController);

    function SuratKeteranganController(EkinerjaService, SuratKeteranganService, HakAksesService, 
        $scope, $state, logo_bekasi, $uibModal, $document, PenilaianService) {
        var vm = this;
        vm.loading = true;
        vm.item = {};
        
        vm.target = [];

        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        }

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.item.tahun = ((new Date()).getYear() + 1900);

        if($.parseJSON(sessionStorage.getItem('pegawai')) != undefined){
            vm.list_pegawai = $.parseJSON(sessionStorage.getItem('pegawai'));
            if($state.params.kdSuratBawahan != undefined)
                getDocumentKeterangan();
            vm.loading = false; 
        }
        else
        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    sessionStorage.setItem('pegawai', JSON.stringify(vm.list_pegawai));
                    if($state.params.kdSuratBawahan != undefined)
                        getDocumentKeterangan();
                    vm.loading = false;
                }, function(errResponse){

                })
        }
        vm.getPegawai = function(idx){
          if(vm.target[idx].pegawai.length == 18)
            vm.target[idx].pegawaiTarget = EkinerjaService.findPegawaiByNip(vm.target[idx].pegawai,vm.list_pegawai);
        }

        // $scope.$watch('pegawai', function(){
        //    if(vm.target[idx].pegawai.length == 18)
        //     vm.target[idx].pegawaiTarget = EkinerjaService.findPegawaiByNip(vm.target[idx].pegawai,vm.list_pegawai);
        // }) 

        $scope.$watch('pegawaiP', function(){
            if($scope.pegawaiP.length == 18)
                vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawaiP,vm.list_pegawai);
        })

        vm.openPilihan = function (parentSelector) {
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
              return vm.target;
            },
            pegawaiPilihan: function(){
              return vm.target;
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

        vm.openPegawai = function (parentSelector) {
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
              return vm.target;
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
        };
        //   modalInstance.result.then(function (data) {
        //     vm.item.pegawaiPenerima = data;
        //   }, function () {

        //   });
        // };

        // $scope.$watch('pegawai', function(){
        //     if($scope.pegawai.length == 18)
        //         vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
        //     debugger
        // })

        function getDocumentKeterangan(){
            PenilaianService.GetDataSuratKeterangan($state.params.kdSuratBawahan).then(
                function(response){debugger
                    vm.item = {
                        "nomorSurat": response.nomorUrusan,
                        "nomorSurat1": response.nomorPasanganUrut,
                        "nomorSurat2": response.nomorUnit,
                        "nomorSura": response.nomorUrut,
                        "tahun": response.nomorTahun,
                        "isiketerangan": response.isiSuratKeterangan,
                        "tempat": response.kotaPembuatanSurat,
                        "pegawaiPemberi": EkinerjaService.findPegawaiByNip(response.nipPemberiKuasa,vm.list_pegawai),
                        "pegawaiPenerima": EkinerjaService.findPegawaiByNip(response.nipPenerimaKuasa,vm.list_pegawai),
                        "tanggal1": new Date(response.tanggalPembuatanSuratMilis)
                    };

                    vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(response.nipPenandatangan, vm.list_pegawai);
                    $scope.pegawaiP = response.nipPenandatangan;

                    vm.target = [];
                    for(var i = 0; i < response.nipPegawaiKeteranganList.length; i++){
                        var pgw = EkinerjaService.findPegawaiByNip(response.nipPegawaiKeteranganList[i].nip, vm.list_pegawai);
                        pgw.checked = true;
                        vm.target.push(pgw);
                    }
                }
                );
        }

        vm.save = function(){
          var data = {
            "kdSuratKeterangan": "",
            "nomorUrusan": vm.item.nomorSurat,
            "nomorPasanganUrut": vm.item.nomorSurat1,
            "nomorUnit": vm.item.nomorSurat2,
            "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
            "nipPegawaiKeterangan": [],
            "isiSuratKeterangan": vm.item.isiketerangan,
            "kotaPembuatanSurat": vm.item.tempat,
            "tanggalSuratKeteranganMilis": vm.item.tanggal1.getTime(),
            "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
            "durasiPengerjaan": vm.item.waktuPembuatan,
            "kdSuratKeteranganBawahan": null,
            "kdNaskahPenugasan": "",
            "jenisNaskahPenugasan": "",
            "statusPenilaian": "",
            "alasanPenolakan": "",
            "targetSuratKeteranganList": []
            // "alasan": "",
            // "targetPegawaiList": [],
            // "targetJabatanList": [],
            // "kdJabatanSuratPejabat": vm.item.pegawaiPenandatangan.kdJabatan,
          }
          for(var i = 0; i < vm.target.length; i++)
                data.nipPegawaiKeterangan.push(vm.target[i].nipPegawai);
          if($state.params.kdSuratBawahan != undefined)
                data.kdSuratKeteranganBawahan = $state.params.kdSuratBawahan;
          debugger
          console.log(data);
          SuratKeteranganService.save(data).then(
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
                        text: 'SURAT KETERANGAN',
                        style: 'header'
                    },
                    {
                        margin:[0,0,0,15],
                        text: [{text : 'NOMOR : ', style: 'judul_nomor'}, '' + vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit + '/' + ((new Date()).getYear() + 1900)]
                    },
                    {
                        margin: [0, 30, 0, 0],
                        text: 'Yang bertanda tangan di bawah ini,'
                    },
                    {
                        margin: [40, 10, 0 ,0],
                        table: {
                            widths: [107, 2, 330],
                            body: [
                                [
                                    {
                                        text: 'Nama',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + vm.item.pegawaiPenandatangan.nama,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'NIP',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + vm.item.pegawaiPenandatangan.nipPegawai,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Jabatan',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + vm.item.pegawaiPenandatangan.jabatan,
                                        fontSize: 12
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [0, 30, 0, 0],
                        text: 'Dengan ini menerangkan bahwa'
                    },
                    {
                        margin: [40, 10, 0 ,0],
                        table: {
                            widths: [107, 2, 330],
                            body: [
                                [
                                    {
                                        text: 'Nama',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.target[0].nama,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'NIP',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.target[0].nipPegawai,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Pangkat/Golongan',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: '' + vm.target[0].pangkat,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Jabatan',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.target[0].jabatan,
                                        fontSize: 12
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [-5, 20, 0 ,0],
                        table: {
                            widths: [500],
                            body: [
                                [
                                    {
                                        text: '' + vm.item.isiketerangan,
                                        fontSize: 12
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [330,30,0,0],
                        table: {
                            widths: [40, 120],
                            body: [
                                [
                                    {
                                        alignment: 'left',
                                        text: '' + vm.item.tempat+', '
                                    },
                                    {
                                        alignment: 'left',
                                        text: '' + EkinerjaService.IndonesianDateFormat(new Date())
                                    }
                                ],
                                [
                                    {
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + vm.item.pegawaiPenandatangan.jabatan
                                    }
                                ],
                                [
                                    {
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'tanda tangan\n\n'
                                    }
                                ],
                                [
                                    {
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang,
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: '' + vm.item.pegawaiPenandatangan.pangkat,
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        colSpan: 2,
                                        alignment: 'left',
                                        text: 'NIP. ' + vm.item.pegawaiPenandatangan.nipPegawai,
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    }
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
                    judul_nomor: {
                        alignment : 'center',
                        bold: true,
                        fontSize: 11
                    }
                },

                images:{
                    logo: logo_bekasi
                }
                }
            }

            // for(var i = 0; i < vm.target.length; i++){
            //     var data = {
            //         widths: [107, 2, 330],
            //         table: {
            //             body: [
            //                 [{text: 'Nama', bold: true , border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.target[i].pegawai.nama, border: [false, false, false, false]}],
            //                 [{text: 'NIP', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.target[i].pegawai.nipPegawai, border: [false, false, false, false]}],
            //                 [{text: 'Pangkat/Gol. Ruang', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.target[i].pegawai.golongan, border: [false, false, false, false]}],
            //                 [{text: 'Jabatan', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.target[i].pegawai.jabatan, border: [false, false, false, false]}]
            //             ]
            //         }
            //     }
            //     vm.docDefinition.content[8].table.body[0][2].ol.push(data);
            //   }
        
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