(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('SuratDinasController', SuratDinasController);

    
    function SuratDinasController(EkinerjaService,  PengumpulanDataBebanKerjaService, HakAksesService, NotaDinasService, 
        $scope, $state, logo_bekasi, logo_garuda, $uibModal, $document) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

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

          })

        vm.findJabatan = function(idx){
          if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
            vm.tembusanSurat[idx].jabatan = EkinerjaService.findJabatanByKdJabatan(vm.tembusanSurat[idx].jabat, vm.list_jabatan);
        }

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
        } 
        vm.getPegawaiPenerima = function(){
          if(vm.item.pegawaiPenerimaSurat.length == 18){
            vm.item.pegawaiPenerima = EkinerjaService.findPegawaiByNip(vm.item.pegawaiPenerimaSurat,vm.list_pegawai);
            console.log(vm.item.pegawaiPenerima);
          }
        }

        vm.getPegawaiPenandatangan = function(){
          if(vm.item.pegawaiPenandatanganSurat.length == 18){
            vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(vm.item.pegawaiPenandatanganSurat,vm.list_pegawai);
            console.log(vm.item.pegawaiPenandatangan);
          }
        }

        vm.save = function(){
          vm.item.tembusanSurat = [];
          vm.item.tanggal = vm.item.tanggal1.getTime();
          vm.item.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
          vm.item.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          vm.item.nmInstansi = $.parseJSON(sessionStorage.getItem('credential')).unit;
          for(var i = 0; i < vm.tembusanSurat.length; i++)
            vm.item.tembusanSurat.push((i+1) + '. ' + vm.tembusanSurat[i].deskripsi);
          console.log(vm.item);
          NotaDinasService.save(vm.item).then(
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
                            [{text: 'Nomor', bold: true, border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},{text: ''+ vm.item.nomorSurat + '/' + vm.item.nomorSurat1 + '/' + vm.item.nomorSurat2 + '/' + (new Date().getYear()+1900), border: [false, false, false, false]}, {text: '' + vm.item.tempat + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal1), border: [false, false, false, false], alignment:'right'}],
                            [{text: 'Sifat', bold: true, border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},{text: '' + vm.item.sifat, border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                            [{text: 'Lampiran', bold: true, border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},{text: '' + vm.item.lampiran, border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}],
                            [{text: 'Hal', bold: true, border: [false, false, false, false]},{text: ':', border: [false, false, false, false]},{text: '' + vm.item.hal, border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}]
                        ]
                    }
                },

                {
                    margin: [0,0,0,15], alignment:'justifly',
                    table: {
                        widths: [150],
                        body: [
                            [{text: 'Yth. ' + vm.item.pegawaiPenerima.nama, border: [false, false, false, false]}]
                        ]
                    }
                },

                {
                    text: '' + vm.item.alineaPembuka,  margin: [0,0,0,10], alignment:'justifly'
                },
                {
                    text: '' + vm.item.alineaIsi,  margin: [0,0,0,10], alignment:'justifly'
                },
                {
                    text: '' + vm.item.alineaPenutup,  margin: [0,0,0,15], alignment:'justifly'
                },

                {
                    style: 'tandaTangan',
                    table: {
                        widths: [200],
                        body: [
                            [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true, border: [false, false, false, false]}],
                            [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                            [{text: '' + vm.item.pegawaiPenandatangan.nama, alignment : 'left', border: [false, false, false, false]}]
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
          var tembusan = {
            ol:[]
          }

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