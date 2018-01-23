(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratTugasController', SuratTugasController);

    
    function SuratTugasController(EkinerjaService, SuratTugasService, $scope, $state, logo_bekasi) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.tembusanSurat = [{"id": new Date().getTime(), "deskripsi": ''}];
        vm.target = [{"id": new Date().getTime()}];

        vm.addTembusan = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.tembusanSurat.push(data);
        }

        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        }

        vm.save = function(){
          vm.item.tembusanSurat = [];
          vm.item.tanggal = vm.item.tanggal.getTime();
          vm.item.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
          vm.item.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          vm.item.nmInstansi = $.parseJSON(sessionStorage.getItem('credential')).unit;
          for(var i = 0; i < vm.tembusanSurat.length; i++)
            vm.item.tembusanSurat.push((i+1) + '. ' + vm.tembusanSurat[i].deskripsi);
          console.log(vm.item);
          SuratPerintahService.save(vm.item).then(
            function(response){
              EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
            }, function(errResponse){

            })
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
                                    text: 'DINAS KOMUNIKASI DAN INFORMATIKA PERSANDIAN DAN STATISTIK',
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
                    text: 'SURAT TUGAS', style: 'nama_judul'
                },

                {
                    text: 'NOMOR ' + vm.item.nomorSurat + '/' + vm.item.nomorSurat1 + '/'+ vm.item.nomorSurat2 + '/' + ((new Date()).getYear() + 1900), style: 'judul_nomor'
                },

                {
                    style: 'demoTable', margin: [0,15,0,0],
                    table: {
                        widths: [50, 5, '*'],
                        body: [
                            [{text: 'Nama', bold: true, border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},{text: '' + $.parseJSON(sessionStorage.getItem('credential')).namaPegawai, border: [false, false, false, false]}],
                            [{text: 'Jabatan', bold: true, border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},{text: '' + $.parseJSON(sessionStorage.getItem('credential')).jabatan, border: [false, false, false, false]}]
                        ]
                    }
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Menimbang', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                                { border: [false, false, false, false],
                                    ol: [
                                    ]
                                }
                            ],
                            [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}],
                            [{text: 'Dasar', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                                {   border: [false, false, false, false],
                                    ol: [
                                    ]
                                }
                            ]
                        ]
                    }
                },

                {
                    text: 'Memberi Tugas', alignment: 'center', fontSize: 11
                },

                {
                    style: 'demoTable', margin: [0,10,0,15],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Kepada', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},

                                {   border: [false, false, false, false], bold:true,
                                    ol: [
                                    ]
                                }],
                            [{text: '',margin: [0,0,0,3], colSpan: 3, border: [false, false, false, false]}],
                            [{text: 'Untuk', style: 'header3', border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},
                                {   border: [false, false, false, false],
                                    ol: [
                                    ]
                                }
                            ]
                        ]
                    }
                },

                {
                    style: 'tandaTangan',
                    table: {
                        widths: [200],
                        body: [
                            [{text: '' + vm.item.tempat + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal), alignment : 'left', border: [false, false, false, false]}],
                            [{text: ''+ $.parseJSON(sessionStorage.getItem('credential')).jabatan + ',', alignment : 'left', bold: true, border: [false, false, false, false]}],
                            [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                            [{text: '' + $.parseJSON(sessionStorage.getItem('credential')).namaPegawai, alignment : 'left', border: [false, false, false, false]}]
                        ]
                    }
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

          for(var i = 0; i < vm.target.length; i++){
            var data = {
                widths: ['*', '*', '*'],
                table: {
                    body: [
                        [{text: 'Nama', bold: true , border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.target[i].nama, border: [false, false, false, false]}],
                        [{text: 'NIP', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.target[i].nip, border: [false, false, false, false]}],
                        [{text: 'Pangkat/Gol. Ruang', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.target[i].gol, border: [false, false, false, false]}],
                        [{text: 'Jabatan', bold: true, border: [false, false, false, false]}, {text: ':', border: [false, false, false, false]}, {text: '' + vm.target[i].jabatan, border: [false, false, false, false]}]
                    ]
                }
            }
            vm.docDefinition.content[11].table.body[0][2].ol.push(data);
          }

          var tembusan = {
            ol:[]
          }

          for(var i = 0; i < vm.tembusanSurat.length; i++)
            tembusan.ol.push(vm.tembusanSurat[i].deskripsi);
          vm.docDefinition.content.push(tembusan);

          var menimbang = vm.item.menimbang.split("\n");
          for(var i = 0; i < menimbang.length; i++){
            var kata = '';
            for(var j = 1; j < (menimbang[i].split(" ")).length; j++)
              kata += (menimbang[i].split(" "))[j] + ' ';
            vm.docDefinition.content[9].table.body[0][2].ol.push(kata);
          }
          
          var dasar = vm.item.dasar.split("\n");
          for(var i = 0; i < dasar.length; i++){
            var kata = '';
            for(var j = 1; j < (dasar[i].split(" ")).length; j++)
              kata += (dasar[i].split(" "))[j] + ' ';
            vm.docDefinition.content[9].table.body[2][2].ol.push(kata);
          }
            
          var untuk = vm.item.untuk.split("\n");
          for(var i = 0; i < untuk.length; i++){
            var kata = '';
            for(var j = 1; j < (untuk[i].split(" ")).length; j++)
              kata += (untuk[i].split(" "))[j] + ' ';
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