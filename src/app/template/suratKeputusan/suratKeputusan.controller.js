(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratKeputusanController', SuratKeputusanController);

    
    function SuratKeputusanController(EkinerjaService,HakAksesService, SuratKeputusanService, $scope, $state, logo_bekasi, $uibModal, $document) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        if($state.current.name == 'suratkeputusan')
          vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.keputusan = [{"id": new Date().getTime(), "deskripsi": ''}];
        vm.target = [{"id": new Date().getTime()}];

        vm.addKeputusan = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.keputusan.push(data);
        }

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

        vm.save = function(){
          
        }

        vm.back =  function(){
          $state.go('kontrak');
        }


        // docDefinition.content[0].text = 'baka aweu';

        function template(){
          vm.docDefinition = {
            content: [
                {
                    image: logo_bekasi,
                    width: 90,
                    height: 90
                },
                {
                    margin: [90, -96, 0, 0],
                    table: {
                        widths: [400],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: 'PEMERINTAHAN KABUPATEN BEKASI',
                                    style: 'header'
                                }
                            ]
                        ]
                    }
                },
                {
                    margin: [90, -5, 0, 0],
                    table: {
                        widths: [400],
                        body: [
                            [
                                {
                                    border: [false, false, false, false],
                                    text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase(),
                                    style: 'header'
                                }
                            ]
                        ]
                    }
                },
                {
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
                },
                {
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
                },
                {
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
                },

                {
                    text: 'KEPUTUSAN ' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase() + '\n' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase()
                    +'\n' +
                    'Selaku\n' + vm.item.selaku.toUpperCase() + '\n', style: 'nama_judul'
                },
                {
                    text: 'NOMOR '+ vm.item.nomorSurat +' TAHUN ' + ((new Date()).getYear() + 1900), style: 'judul_nomor', margin: [0,15,0,15]
                },

                {
                    text: 'TENTANG', style: 'nama_judul'
                },
                {
                    text: '' + vm.item.tentang.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                },

                {
                    text: '' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Menimbang', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                                { border: [false, false, false, false], type: 'lower-alpha',
                                    ol: [
                                        
                                    ]
                                }
                            ],
                            [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}],
                            [{text: 'Mengingat', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                                {   border: [false, false, false, false],
                                    ol: [
                                        
                                    ]
                                }
                            ]
                        ]
                    }
                },

                {
                    text: 'MEMUTUSKAN', alignment: 'center', fontSize: 12, bold:true
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Menetapkan', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]}, {text:['KEPUTUSAN ','' + vm.item.pegawaiPenandatangan.jabatan + ' ' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase(), ' TENTANG ', '' + vm.item.tentang.toUpperCase()], border: [false, false, false, false]}
                            ]
                        ]
                    }
                },

                {
                    style: 'tandaTangan',
                    table: {
                        widths: [200],
                        body: [
                            [{text: ['Ditetapkan di ', {text:'' + vm.item.tempat, bold:true}], alignment : 'left', border: [false, false, false, false]}],
                            [{text: ['pada tanggal ', {text:'' + EkinerjaService.IndonesianDateFormat(new Date()), bold:true}], alignment : 'left', border: [false, false, false, false]}],
                            [{text: '' + vm.item.pegawaiPenandatangan.jabatan.toUpperCase() + ', ', alignment : 'left', bold: true, border: [false, false, false, false]}],
                            [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                            [{text: '' + vm.item.pegawaiPenandatangan.nama.toUpperCase(), alignment : 'left', border: [false, false, false, false]}]
                        ]
                    }
                }
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
                header3: {
                    bold: true,
                    color: '#000',
                    fontSize: 10
                },
                demoTable: {
                    color: '#000',
                    fontSize: 10
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
                tandaTangan: {
                    color: '#000',
                    fontSize: 10,
                    alignment:'right'
                }
            }
        };

          for(var i = 0; i < vm.keputusan.length; i++){
            var style = [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}];
            var body = [{text: '' + SuratKeputusanService.FindUrutan(i), 
                        style: 'header3', border: [false, false, false, false]},
                        {text: ':', border: [false, false, false, false]}, 
                        {text: '' + vm.keputusan[i].deskripsi, border: [false, false, false, false]}];
            vm.docDefinition.content[13].table.body.push(style);
            vm.docDefinition.content[13].table.body.push(body);
          }

          var menimbang = vm.item.menimbang.split("\n");
          for(var i = 0; i < menimbang.length; i++){
            var kata = '';
            for(var j = 1; j < (menimbang[i].split(" ")).length; j++)
              kata += (menimbang[i].split(" "))[j] + ' ';
            vm.docDefinition.content[11].table.body[0][2].ol.push(kata);
          }

          var mengingat = vm.item.mengingat.split("\n");
          for(var i = 0; i < mengingat.length; i++){
            var kata = '';
            for(var j = 1; j < (mengingat[i].split(" ")).length; j++)
              kata += (mengingat[i].split(" "))[j] + ' ';
            vm.docDefinition.content[11].table.body[2][2].ol.push(kata);
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