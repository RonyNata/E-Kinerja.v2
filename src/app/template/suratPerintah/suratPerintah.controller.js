(function() {
'use strict';
 
angular.
  module('eKinerja')
  .controller('SuratPerintahController', SuratPerintahController);

    
    function SuratPerintahController(EkinerjaService, SuratPerintahService, $scope, $state, HakAksesService, 
      PengumpulanDataBebanKerjaService, PenugasanService, logo_bekasi, logo_garuda, $document, $uibModal) {
        var vm = this;
        vm.loading = true;
        vm.item = {};
        if($state.current.name == 'suratperintahnonpejabat' || $state.current.name == 'perintahnonpejabatterusan')
          vm.jenis = 'Non-Pejabat';
        else vm.jenis = 'Pejabat';

        vm.item.tahun = ((new Date()).getYear() + 1900);

        vm.tembusanSurat = [{"id": new Date().getTime(), "deskripsi": ''}];
        vm.untuk = [{"id": new Date().getTime(), "deskripsiuntuk": ''}];
        vm.dasar = [{"id": new Date().getTime(), "deskripsidasar": ''}];
        vm.menimbang = [{"id": new Date().getTime(), "deskripsimenimbang": ''}];
        vm.target = [];

        vm.back =  function(){
            $state.go('kontrak');
        };

        vm.addTembusan = function(){
          var data = {"id": new Date().getTime(), "deskripsi": ''};
          vm.tembusanSurat.push(data);
        }

        vm.addMenimbang = function(){
          var dataMenimbang = {"id": new Date().getTime(), "deskripsimenimbang": ''};
          vm.menimbang.push(dataMenimbang);
        }

        vm.addDasar = function(){
          var dataDasar = {"id": new Date().getTime(), "deskripsidasar": ''};
          vm.dasar.push(dataDasar);
        }

        vm.addUntuk = function(){
          var dataUntuk = {"id": new Date().getTime(), "deskripsiuntuk": ''};
          vm.untuk.push(dataUntuk);
        }

        vm.addTarget = function(){
          var data = {"id": new Date().getTime()};
          vm.target.push(data);
        }

        PengumpulanDataBebanKerjaService.GetAllJabatan().then(
          function(response){
            vm.list_jabatan = response;
            if($state.params.kdSurat != undefined)
              getDocumentPerintah();
            vm.loading = false;
          }, function(errResponse){

          })

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
                    if($state.params.kdSurat != undefined)
                      getDocumentPerintah();
                    vm.loading = false;
                }, function(errResponse){

                })
        }

        vm.findJabatan = function(idx){
          if(vm.tembusanSurat[idx].jabat.length == 7 || vm.tembusanSurat[idx].jabat.length == 8)
            vm.tembusanSurat[idx].jabatan = EkinerjaService.findJabatanByKdJabatan(vm.tembusanSurat[idx].jabat, vm.list_jabatan);
        }

        vm.findPegawai = function(idx){
          if(vm.target[idx].pgw.length == 18)
            vm.target[idx].pegawai = EkinerjaService.findPegawaiByNip(vm.target[idx].pgw,vm.list_pegawai);
        }

        vm.getPegawai = function(){
          if($scope.pegawai.length == 18)
            vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip($scope.pegawai,vm.list_pegawai);
          debugger
        }
debugger

        function getDocumentPerintah(){debugger
          PenugasanService.GetDataPerintah($state.params.kdSurat).then(
            function(response){
              // vm.item.nomorSurat = response.nomorSurat;
              vm.item.nomorSurat1 = response.nomorSurat1;
              vm.item.nomorSurat2 = response.nomorSurat2;
              vm.item.tempat = response.tempat;
              $scope.pegawai = response.nipPenandatangan;
              vm.getPegawai();
              vm.item.tanggal1 = new Date(response.tanggalDibuatMilis);
              // vm.maksud = [];
              // for(var i = 0; i < response.daftarIsiInstruksi.length; i++)
              //   vm.maksud.push({
              //     "id": new Date().getTime(),
              //     "deskripsi": response.daftarIsiInstruksi[i]
              //   });
              vm.tembusanSurat = [];
              for(var i = 0; i < response.daftarTembusan.length; i++){
                vm.tembusanSurat.push({
                  "id": new Date().getTime(), 
                  "jabat": response.daftarTembusan[i].kdJabatan,
                  "jabatan": response.daftarTembusan[i]
                });
              }
              vm.target = [];
              for(var i = 0; i < response.daftarTargetPegawai.length; i++){
                var pgw = EkinerjaService.findPegawaiByNip(response.daftarTargetPegawai[i].nip, vm.list_pegawai);
                pgw.checked = true;
                vm.target.push(pgw);
              }

              // vm.item.menimbang = "";
              // for(var i = 0; i < response.menimbangList.length;i++){
              //   vm.item.menimbang += (i+1) + '. ' + response.menimbangList;
              //   if(i != response.menimbangList.length-1)
              //     vm.item.menimbang += '\n';
              // }
              vm.menimbang = [];
              for(var i = 0; i < response.menimbangList.length; i++){
                vm.addMenimbang();
                vm.menimbang[i].deskripsimenimbang = response.menimbangList[i];
              }
                
              // vm.item.dasar = "";
              // for(var i = 0; i < response.dasarList.length;i++){
              //   vm.item.dasar += (i+1) + '. ' + response.dasarList + '\n';
              //   if(i != response.dasarList.length-1)
              //     vm.item.dasar += '\n';
              // }
              vm.dasar = [];
              for(var i = 0; i < response.dasarList.length; i++){
                vm.addDasar();
                vm.dasar[i].deskripsidasar = response.dasarList[i];
              }
              // vm.item.untuk = "";
              // for(var i = 0; i < response.untukList.length;i++){
              //   vm.item.untuk += (i+1) + '. ' + response.untukList + '\n';
              //   if(i != response.untukList.length-1)
              //     vm.item.untuk += '\n';
              // }
              vm.untuk = [];
              for(var i = 0; i < response.untukList.length; i++){
                vm.addUntuk();
                vm.untuk[i].deskripsiuntuk = response.untukList[i];
              }
              debugger
            }, function(errResponse){

            })
        }

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
          var data = {
            "kdSuratPerintah": "",
            "nipPembuat": $.parseJSON(sessionStorage.getItem('credential')).nipPegawai,
            "kdUnitKerja": vm.item.pegawaiPenandatangan.kdUnitKerja,
            "nomorSurat1": vm.item.nomorSurat,
            "nomorSurat2": vm.item.urusan,
            "nomorSurat3": vm.item.unit,
            "nomorTahun": ((new Date()).getYear() + 1900),
            "menimbangList": [], 
            "dasarList": [], 
            "untukList": [], 
            "tempat": vm.item.tempat,
            "tanggalPerintahMilis": vm.item.tanggal1.getTime(),
            "ttdPath": "",
            "kdTargetPegawaiList": [], 
            "kdTargetPejabatList": [], 
            "kdTembusanList": [], 
            "nipPenandatangan": vm.item.pegawaiPenandatangan.nipPegawai,
            "suratPejabat": true,
            "kdJabatanSuratPejabat": vm.item.pegawaiPenandatangan.kdJabatan,
            "durasiPengerjaan": vm.item.durasiPengerjaan
          };

          // if(save() == true){
          //   $state.go('kontak');
          // }

          if($state.current.name == 'perintahnonpejabatterusan' || $state.current.name == 'perintahpejabatterusan')
            data.kdSuratPerintahBawahan = $state.params.kdSurat;

          // var menimbang = vm.item.menimbang.split("\n");
          // for(var i = 0; i < menimbang.length; i++){
          //   var kata = '';
          //   for(var j = 1; j < (menimbang[i].split(" ")).length; j++)
          //     kata += (menimbang[i].split(" "))[j] + ' ';
          //   data.menimbangList.push(kata);
          // }

          // var dasar = vm.item.dasar.split("\n");
          // for(var i = 0; i < dasar.length; i++){
          //   var kata = '';
          //   for(var j = 1; j < (dasar[i].split(" ")).length; j++)
          //     kata += (dasar[i].split(" "))[j] + ' ';
          //   data.dasarList.push(kata);
          // }
            
          // var untuk = vm.item.untuk.split("\n");
          // for(var i = 0; i < untuk.length; i++){
          //   var kata = '';
          //   for(var j = 1; j < (untuk[i].split(" ")).length; j++)
          //     kata += (untuk[i].split(" "))[j] + ' ';
          //   data.untukList.push(kata);
          // }

          for(var i = 0; i < vm.target.length; i++)
            data.kdTargetPegawaiList.push(vm.target[i].nipPegawai);

          for(var i = 0; i < vm.tembusanSurat.length; i++)
            data.kdTembusanList.push(vm.tembusanSurat[i].jabatan.kdJabatan);

          for(var i = 0; i < vm.untuk.length; i++)
            data.untukList.push(vm.untuk[i].deskripsiuntuk);

          for(var i = 0; i < vm.dasar.length; i++)
            data.dasarList.push(vm.dasar[i].deskripsidasar);

          for(var i = 0; i < vm.menimbang.length; i++)
            data.menimbangList.push(vm.menimbang[i].deskripsimenimbang);

          if($state.current.name == "suratperintahnonpejabat")
            data.suratPejabat = false;

          console.log(data);
          SuratPerintahService.save(data).then(
            function(response){
              EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
              $state.go('kontrak');
            }, function(errResponse){

            })
        };

        vm.back =  function(){
          $state.go('kontrak');
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
                    text: '' , style: ['nama_instansi', 'nama_judul']
                },

                {
                    text: 'REPUBLIK INDONESIA', style: 'nama_judul', margin: [0,0,0,15]
                },

                {
                    text: 'SURAT PERINTAH', style: 'nama_judul'
                },

                {
                    text: 'NOMOR ' + vm.item.urusan + '/....-' + vm.item.unit + '/'+ ((new Date()).getYear() + 1900) , style: 'judul_nomor'
                },

                {
                    style: 'demoTable', margin: [0,15,0,0],
                    table: {
                        widths: [50, 5, '*'],
                        body: [
                            [{text: 'Nama', bold: true},{text: ':'},{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang}],
                            [{text: 'Jabatan', bold: true},{text: ':'},{text: '' + vm.item.pegawaiPenandatangan.jabatan}]
                        ]
                    },
                    layout: 'noBorders'
                },

                {
                    style: 'demoTable', margin: [0,15,0,10],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Menimbang', style:'header4'},{text: ':', style:'header5'},
                                {
                                    ol: []
                                }
                            ],
                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                            [{text: 'Dasar', style:'header4'},{text: ':', style:'header5'},
                                {
                                    ol: []
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },

                {
                    text: 'Memberi Perintah', alignment: 'center', fontSize: 12
                },

                {
                    style: 'demoTable', margin: [0,10,0,15],
                    table: {
                        widths: [80, 5, '*'],
                        body: [
                            [{text: 'Kepada', style:'header4'},{text: ':', style:'header5'},

                                {
                                    ol: []
                                }],
                            [{text: '',margin: [0,0,0,3], colSpan: 3}],
                            [{text: 'Untuk', style:'header4'},{text: ':', style:'header5'},
                                {
                                    ol : []
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },

                {
                    columns: [
                        {
                            width: '63%',
                            text: ''
                        },
                        {
                            style: 'tandaTangan',
                            table: {
                                widths: [200],
                                body: [
                                    [{text: '' + vm.item.tempat + ', ' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal1), alignment : 'left'}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.jabatan + ',', alignment : 'left', bold: true}],
                                    [{text: ' ',margin: [0,20]}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.gelarDepan + vm.item.pegawaiPenandatangan.nama + vm.item.pegawaiPenandatangan.gelarBelakang, alignment : 'left', bold:true}],
                                    [{text: '' + vm.item.pegawaiPenandatangan.pangkat, alignment : 'left', bold:true}],
                                    [{text: 'NIP. ' + vm.item.pegawaiPenandatangan.nipPegawai, alignment : 'left'}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                    ]
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
                }
            }
          };

            for(var i = 0; i < vm.target.length; i++){
                var dat = {
                    widths: ['*', '*', '*'],
                    table: {
                        body: [
                            [{text: 'Nama', bold: true}, {text: ':'}, {text: '' + vm.target[i].gelarDepan + vm.target[i].nama + vm.target[i].gelarBelakang}],
                            [{text: 'NIP', bold: true}, {text: ':'}, {text: '' + vm.target[i].nipPegawai}],
                            [{text: 'Pangkat/Gol. Ruang', bold: true}, {text: ':'}, {text: '' + vm.target[i].pangkat + ' - ' + vm.target[i].golongan}],
                            [{text: 'Jabatan', bold: true}, {text: ':'}, {text: '' + vm.target[i].jabatan}]
                        ]
                    },
                    layout: 'noBorders'
                };
                docDefinition.content[8].table.body[0][2].ol.push(dat);
            }

          var tembusan = {
            ol:[]
          }

          for(var i = 0; i < vm.tembusanSurat.length; i++)
            tembusan.ol.push(vm.tembusanSurat[i].jabatan.jabatan);
          vm.docDefinition.content.push(tembusan);

          // var menimbang = vm.item.menimbang.split("\n");
          // for(var i = 0; i < menimbang.length; i++){
          //   var kata = '';
          //   for(var j = 1; j < (menimbang[i].split(" ")).length; j++)
          //     kata += (menimbang[i].split(" "))[j] + ' ';
          //   vm.docDefinition.content[6].table.body[0][2].ol.push(kata);
          // }
          for(var i = 0; i < vm.menimbang.length; i++)
            vm.docDefinition.content[6].table.body[0][2].ol.push(vm.menimbang[i].deskripsimenimbang);
          
          // var dasar = vm.item.dasar.split("\n");
          // for(var i = 0; i < dasar.length; i++){
          //   var kata = '';
          //   for(var j = 1; j < (dasar[i].split(" ")).length; j++)
          //     kata += (dasar[i].split(" "))[j] + ' ';
          //   vm.docDefinition.content[6].table.body[2][2].ol.push(kata);
          // }
          for(var i = 0; i < vm.dasar.length; i++)
            vm.docDefinition.content[6].table.body[2][2].ol.push(vm.dasar[i].deskripsidasar);
            
          // var untuk = vm.item.untuk.split("\n");
          // for(var i = 0; i < untuk.length; i++){
          //   var kata = '';
          //   for(var j = 1; j < (untuk[i].split(" ")).length; j++)
          //     kata += (untuk[i].split(" "))[j] + ' ';
          //   vm.docDefinition.content[8].table.body[2][2].ol.push(kata);
          // }
          for(var i = 0; i < vm.untuk.length; i++)
            vm.docDefinition.content[8].table.body[2][2].ol.push(vm.untuk[i].deskripsiuntuk);

          if($state.current.name == "suratperintahnonpejabat"){
              docDefinition.content[0] = {
                  margin:[0,0,0,15],
                  table:{
                      widths: [100,'*'],
                      body: [
                          [
                              {
                                  image: logo_bekasi,
                                  width: 90,
                                  height: 90,
                                  alignment: 'center'
                              },
                              [
                                  {
                                      text:[
                                          {text: 'PEMERINTAHAN KABUPATEN BEKASI\n', alignment: 'center', style:'header'},
                                          {text: '' + vm.item.pegawaiPenandatangan.unitKerja.toUpperCase() + '\n', alignment: 'center', style:'header'},
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
              };

              vm.docDefinition.content[1] = {};

              vm.docDefinition.content[2] = {};
          }
          else vm.docDefinition.content[1].text += vm.item.pegawaiPenandatangan.jabatan.toUpperCase();
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