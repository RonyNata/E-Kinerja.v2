(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratEdaranController', SuratEdaranController);

    
    function SuratEdaranController(EkinerjaService, SuratEdaranService, HakAksesService, $scope, $state, logo_bekasi, logo_garuda) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        vm.back =  function(){
            $state.go('kontrak');
        };

        if($state.current.name == 'suratedarannonpejabat')
          vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.subab = [
            {
              "nomor": "A",
              "judul": "Latar Belakang",
              "isi": ""
            },
            {
              "nomor": "B",
              "judul": "Maksud dan Tujuan",
              "isi": ""
            },
            {
              "nomor": "C",
              "judul": "Ruang Lingkup",
              "isi": ""
            },
            {
              "nomor": "D",
              "judul": "Dasar",
              "isi": ""
            }
        ];

        getAllPegawai();

        function getAllPegawai(){
          HakAksesService.GetAllPegawai().then(
            function(response){
              vm.list_pegawai = response;
              vm.loading = false;
            }, function(errResponse){

            })
        }

        $scope.$watch('pegawai', function(){
          if($scope.pegawai.length == 18)
            vm.item.pegawaiPembuat = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
          debugger
        })

        vm.addSubab = function() {
          // var idx = vm.subab.length-1;
          // console.log(idx);
          var data = {
            "nomor": String.fromCharCode(65 + vm.subab.length),
            "judul": "",
            "isi": ""
          }
          vm.subab.push(data);
        }

        vm.save = function(){
          var data = {
            "kdSuratEdaran": "",
            "nomorTahun": ((new Date()).getYear() + 1900),
            "nomorSurat": vm.item.nomorSurat,
            "tentang": vm.item.ttgSuratEdaran,
            "tempat": vm.item.tempat,
            "tanggalPenetapan": vm.item.tanggalPenetapan.getTime(),
            "nipPenandatangan": vm.item.pegawaiPembuat.nipPegawai,
            "latarBelakang": vm.subab[0].isi,
            "maksudDanTujuan": vm.subab[1].isi,
            "ruangLingkup": vm.subab[2].isi,
            "dasar": vm.subab[3].isi,
            "subLain": [],
            "suratPejabat": true
          };

          for(var i = 4; i < vm.subab.length;i++)
            data.subLain.push({"nama": vm.subab[i].judul, "isi": vm.subab[i].isi});

          if($state.current.name == "suratedarannonpejabat")
            data.suratPejabat = false;
        }

        vm.back =  function(){
          $state.go('kontrak');
        }

        vm.removeSubab = function(idx){
          vm.subab.splice(idx,1);
          for(var i = 0; i < vm.subab.length;i++)
            vm.subab[i].nomor = String.fromCharCode(65 + i);
        }

        // docDefinition.content[0].text = 'baka aweu';

        function template(){
          vm.docDefinition = {
            pageSize: 'A4',
            content: [
                {
                    image: logo_garuda,
                    width: 50,
                    height: 50,
                    alignment: 'center',
                    margin: [0,0,0,5]
                },

                {
                    text: '' + vm.item.pegawaiPembuat.jabatan.toUpperCase(), style: 'nama_judul'
                },
                {
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    text: 'SURAT EDARAN', style: 'nama_judul'
                },
                {
                    text: 'NOMOR '+ vm.item.nomorSurat +' TAHUN ' + ((new Date()).getYear() + 1900), style: 'judul_nomor', margin: [0,0,0,15]
                },

                {
                    text: 'TENTANG', style: 'nama_judul'
                },
                {
                    text: '' + vm.item.ttgSuratEdaran.toUpperCase(), style: 'judul_nomor', margin:[0,0,0,15]
                }

            ],

            styles: {
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
                header2: {
                    fontSize: 10,
                    alignment: 'center'
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

          var isi = {
            type: 'upper-alpha', bold: true, margin:[0,0,0,15],
            ol: []
          };
          for(var i = 0; i < vm.subab.length; i++){
              isi.ol.push({text:[''+ vm.subab[i].judul +'\n', {text:'' + vm.subab[i].isi, bold:false}],margin:[0,0,0,10]});
          }  
          vm.docDefinition.content.push(isi);
          vm.docDefinition.content.push({
              style: 'tandaTangan',
              table: {
                  widths: [100],
                  body: [
                      [{text: ''+vm.item.pegawaiPembuat.jabatan+',', alignment : 'left', bold: true, border: [false, false, false, false]}],
                      [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                      [{text: '' + vm.item.pegawaiPembuat.nama, alignment : 'left', border: [false, false, false, false]}]
                  ]
              }
          });
          if($state.current.name == "suratedarannonpejabat"){
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