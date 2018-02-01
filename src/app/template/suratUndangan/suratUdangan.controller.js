(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('SuratUndanganController', SuratUndanganController);

    function SuratUndanganController(EkinerjaService, SuratUndanganService, PengumpulanDataBebanKerjaService,  
        HakAksesService, $scope, $state, logo_bekasi, logo_garuda, $uibModal, $document) {
        var vm = this;
        vm.loading = true;
        vm.item = {};
        if($state.current.name == 'suratundangannonpejabat')
            vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

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
            if(pegawai == 1)
                vm.item.pegawaiPenerima = data;
            else vm.item.pegawaiPenandatangan = data;
          }, function () {

          });
        };

        vm.save = function(){
            var data = {
                "kdSuratUndangan": null,
                "nomorUrusan": vm.item.nomorUrusan,
                "nomorPasanganUrut": vm.item.nomorPasanganUrut,
                "nomorUnit": vm.item.nomorUnit,
                "kdJabatanPenerimaSuratUndangan": vm.item.pegawaiPenerima.kdJabatan,
                "tanggalSuratUndanganMilis": vm.item.tanggal1.getTime(),
                "kotaPembuatanSurat": vm.item.tempat,
                "sifat": vm.item.sifat,
                "lampiran": vm.item.lampiran,
                "hal": vm.item.hal,
                "nipPenerimaSuratUndangan": vm.item.pegawaiPenerima.nipPegawai,
                "bagianPembukaSuratUndangan": vm.item.isisuratundangan,
                "bagianIsiHariSuratUndangan": EkinerjaService.IndonesianDay(vm.item.tanggalpelaksanaan),
                "bagianIsiTanggalSuratUndangan": vm.item.tanggalpelaksanaan.getTime(),
                "bagianIsiWaktuSuratUndangan": vm.item.waktupelaksanaan,
                "bagianIsiTempatSuratUndangan": vm.item.tempatpelaksanaan,
                "bagianIsiAcaraSuratUndangan": vm.item.acara,
                "bagianPenutupSuratUndangan": vm.item.penutupsuratundangan,
                "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
                "nipPembuatSurat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
                "kdUnitKerja": $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja,
                "durasiPengerjaan": vm.item.durasiPengerjaan,
                "kdTembusanList": [],
                "suratPejabat": true,
                "kdNaskahPenugasan": $state.params.kdSurat,
                "jenisNaskahPenugasan": $state.params.jenisNaskah,
                "kdUrtug": $state.params.kdUrtug,
                "tahunUrtug": $state.params.tahun
            };

            if($state.current.name == "suratundangannonpejabat")
                data.suratPejabat = false;

            if($state.params.kdSurat == "")
                data.kdNaskahPenugasan = null;

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                data.kdTembusanList.push(vm.tembusanSurat[i].jabatan.kdJabatan);

            console.log(data);
            SuratUndanganService.save(data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                    $state.go('kontrak');
                }, function(errResponse){

                });

        };

        vm.back =  function(){
            $state.go('kontrak');
        };

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

        $scope.$watch('pegawai', function(){
            if($scope.pegawai.length == 18)
                vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
            debugger
        });

        $scope.$watch('pegawaipenandatangan', function(){
            if($scope.pegawaipenandatangan.length == 18)
                vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawaipenandatangan,vm.list_pegawai);
            debugger
        });

        vm.back =  function(){
          $state.go('kontrak');
        }

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
                        text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase(), style: 'header'
                    },

                    {
                        text: 'REPUBLIK INDONESIA', style: 'header', margin: [0,0,0,15]
                    },
                    {
                        table: {
                            widths: [40, 3, 200],
                            body: [
                                [
                                    {
                                        text: 'Nomor',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        text: '' + vm.item.nomorUrusan + '/' + vm.item.nomorUrut + '/' + vm.item.nomorPasanganUrut + '/' + vm.item.nomorUnit + '/' + ((new Date()).getYear() + 1900),
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Sifat',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        text: '' + vm.item.sifat,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Hal',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        text: '' + vm.item.hal,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        text: 'Lampiran',
                                        fontSize: 12
                                    },
                                    {
                                        text: ':',
                                        fontSize: 12
                                    },
                                    {
                                        text: '' + vm.item.lampiran + ' Halaman',
                                        fontSize: 12
                                    }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        margin: [0, -60, 0 , 0],
                        alignment: 'right',
                        text: '' + vm.item.tempat.toUpperCase() + ', ' + EkinerjaService.IndonesianDateFormat(new Date()),
                        fontSize: 12
                    },
                    {
                        margin: [0, 70, 0, 0],
                        table: {
                            widths: [150],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],
                                        rowSpan: 3,
                                        text: 'Yth. '+''+ vm.item.pegawaiPenerima.nama,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                    }
                                ],
                                [
                                    {
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        margin: [0, 20, 0, 0],
                        table: {
                            width: [400],
                            body: [
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.item.isisuratundangan,
                                        fontSize: 12
                                    }
                                ],
                                [
                                    {
                                        margin: [50, 0, 0 ,0],
                                        border: [false, false, false, false],
                                        table: {
                                            widths: [107, 2, 300],
                                            body: [
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: 'tanggal',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ':',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ''+ EkinerjaService.IndonesianDay(vm.item.tanggalpelaksanaan) + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggalpelaksanaan),
                                                        fontSize: 12
                                                    }
                                                ],
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: 'waktu',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ':',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ''+ vm.item.waktupelaksanaan,
                                                        fontSize: 12
                                                    }
                                                ],
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: 'tempat',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ':',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ''+ vm.item.tempatpelaksanaan,
                                                        fontSize: 12
                                                    }
                                                ],
                                                [
                                                    {
                                                        border: [false, false, false, false],
                                                        text: 'acara',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ':',
                                                        fontSize: 12
                                                    },
                                                    {
                                                        border: [false, false, false, false],
                                                        text: ''+ vm.item.acara,
                                                        fontSize: 12
                                                    }
                                                ]
                                            ]
                                        }
                                    }
                                ],
                                [
                                    {
                                        border: [false, false, false, false],
                                        text: ''+ vm.item.penutupsuratundangan,
                                        fontSize: 12
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        margin: [350, 20, 0, 0],
                        text: '' + vm.item.pegawaiPenandatangan.jabatan + ',',
                        fontSize: 12
                    },
                    {
                        margin: [350, 20, 0, 0],
                        text: 'Tanda Tangan dan Cap Instansi',
                        fontSize: 12
                    },
                    {
                        margin: [350, 20, 0, 0],
                        text: '' + vm.item.pegawaiPenandatangan.nama,
                        fontSize: 12
                    },

                    {fontSize: 12, text: 'Tembusan :'}
                ],
                styles: {
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
                    }
                },

                images:{
                    pejabat: logo_garuda
                }
            };

            var tembusan = {
                ol:[]
            };

            for(var i = 0; i < vm.tembusanSurat.length; i++)
                tembusan.ol.push(vm.tembusanSurat[i].jabatan.jabatan);
            vm.docDefinition.content.push(tembusan);

            if($state.current.name == "suratundangannonpejabat"){
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
                                    fontSize: 12,
                                    alignment: 'right'
                                },{
                                border: [false, false, false, false],
                                text: 'Fax. (021) 89970064',
                                fontSize: 12,
                                alignment: 'center'
                            },{
                                border: [false, false, false, false],
                                text: 'email : diskominfo@bekasikab.go.id',
                                fontSize: 12,
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
                                    text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase(),
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