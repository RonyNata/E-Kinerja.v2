(function () {
    'use strict';
    angular.
    module('eKinerja')
        .controller('MemorandumController', MemorandumController);

    function MemorandumController(EkinerjaService, MemorandumService, HakAksesService, $scope, 
        $state, logo_bekasi, logo_garuda, $uibModal, $document) {
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

        getAllPegawai();

        function getAllPegawai(){
            HakAksesService.GetAllPegawai().then(
                function(response){
                    vm.list_pegawai = response;
                    vm.loading = false;
                }, function(errResponse){

                })
        }

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

        $scope.$watch('pegawai', function(){
            if($scope.pegawai.length == 18)
                vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
            debugger
        });

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
                        text: 'MEMORANDUM', style: 'nama_judul'
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
                                    {text: '' + $.parseJSON(sessionStorage.getItem('credential')).namaPegawai}
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
                        table: {
                            widths: [200],
                            body: [
                                [{text: '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan.toUpperCase()+',', alignment : 'left', bold: true}],
                                [{text: ' ',margin: [0,20]}],
                                [{text: '' + $.parseJSON(sessionStorage.getItem('credential')).namaPegawai, alignment : 'left'}]
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
                        fontSize: 12
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
                    tandaTangan: {
                        color: '#000',
                        fontSize: 10,
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