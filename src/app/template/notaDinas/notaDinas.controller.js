(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('NotaDinasController', NotaDinasController);

    
    function NotaDinasController(EkinerjaService, HakAksesService, NotaDinasService, $scope, $state) {
      	var vm = this;
        vm.loading = true;
        vm.item = {};

        // vm.tembusanSurat = [{"id": new Date().getTime(), "deskripsi": ''}];
        vm.target = [{"id": new Date().getTime()}];

        // vm.addTembusan = function(){
        //   var data = {"id": new Date().getTime(), "deskripsi": ''};
        //   vm.tembusanSurat.push(data);
        // }

        vm.back =  function(){
            $state.go('kontrak');
        };

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

        vm.getPegawaiPemberi = function(){
          if(vm.item.pegawaiPemberiSurat.length == 18){
            vm.item.pegawaiPemberi = EkinerjaService.findPegawaiByNip(vm.item.pegawaiPemberiSurat,vm.list_pegawai);
            console.log(vm.item.pegawaiPemberi);
          }
        }

        vm.getPegawaiPenandatangan = function(){
          if(vm.item.pegawaiPenandatanganSurat.length == 18){
            vm.item.pegawaiPenandatangan = EkinerjaService.findPegawaiByNip(vm.item.pegawaiPenandatanganSurat,vm.list_pegawai);
            console.log(vm.item.pegawaiPenandatangan);
          }
        }

        // vm.getPegawaiJabatan = function(){
        //   if(vm.item.pegawaiJabatanSurat.length == 18){
        //     vm.item.pegawaiJabatan = EkinerjaService.findPegawaiByNip(vm.item.pegawaiJabatanSurat,vm.list_pegawai);
        //     console.log(vm.item.pegawaiJabatan);
        //   }
        // }

        vm.save = function(){
          vm.item.tembusanSurat = [];
          vm.item.tanggal = vm.item.tanggal.getTime();
          vm.item.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
          vm.item.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
          vm.item.nmInstansi = $.parseJSON(sessionStorage.getItem('credential')).unit;
          for(var i = 0; i < vm.target.length; i++)
            vm.item.tembusanSurat.push(vm.target[i].pegawaiTarget.nipPegawai);
          console.log(vm.item);
          for(var i = 0; i < vm.notadinas.length; i++)
            data.targetPegawaiList.push(vm.target[i].pegawaiPembuat.nipPegawai);
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
                text: '' + $.parseJSON(sessionStorage.getItem('credential')).unit.toUpperCase(), style: 'nama_instansi'
              },

              {
                text: 'NOTA DINAS', style: 'nota_dinas'
              },

              {
                text: [{text : 'NOMOR', style: 'judul_nomor'}, '' + vm.item.nomorSurat + '/' + vm.item.nomorSurat1 + '/' + vm.item.nomorSurat2]
              },

              {
                style: 'demoTable',
                table: {
                  widths: [50, 5, 150],
                  body: [
                    [{text: 'Yth', style: 'header', border: [false, false, false, false]},{text:':', border: [false, false, false, false]}, {text: '' + vm.item.nmTujuan, border: [false, false, false, false]}],
                    [{text: 'Dari', style: 'header', border: [false, false, false, false]},{text:':', border: [false, false, false, false]}, {text: '' + vm.item.nmPemberi, border: [false, false, false, false]}],
                    [{text: 'Hal', style: 'header', border: [false, false, false, false]},{text:':', border: [false, false, false, false]}, {text: '' + vm.item.hal, border: [false, false, false, false]}],
                    [{text: 'Tanggal', style: 'header', border: [false, false, false, false]},{text:':', border: [false, false, false, false]}, {text: '' + EkinerjaService.IndonesianDateFormat(vm.item.tanggal), border: [false, false, false, false]}]
                  ]
                }
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
                text: '' + vm.item.pembukaSurat, style : 'isi_paragraf'
              },

              {
                text: '' + vm.item.isiSurat, style : 'isi_paragraf'
              },

              {
                text: '' + vm.item.penutupSurat, style : 'isi_paragraf'
              },

              {
                  style: 'tandaTangan',
                  table: {
                      widths: [200],
                      body: [
                          [{text: 'Tanda Tangan', alignment : 'center', bold: true, border: [false, false, false, false]}],
                          [{text: ' ',margin: [0,20], border: [false, false, false, false]}],
                          [{text: '' + vm.item.nmLengkap, alignment : 'center', border: [false, false, false, false]}]
                      ]
                  }
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
                color: '#000',
                fontSize: 10
              },
              demoTable: {
                color: '#000',
                fontSize: 10,
                margin: [0,20,0,10],
                border: [false, false, false, false]
              },
              tandaTangan: {
                color: '#000',
                fontSize: 10,
                alignment : 'right',
                margin: [300,0,0,20],
                border: [false, false, false, false]
              }
            }
          };
          var tembusan = {
            ol:[]
          }

          for(var i = 0; i < vm.target.length; i++)
            tembusan.ol.push(vm.target[i].pegawaiTarget.nama);
          vm.docDefinition.content.push(tembusan);
        }

        $scope.openPdf = function() {
          var blb;
          // pdfMake.createPdf(vm.docDefinition).getBuffer(function(buffer) {
          //     // turn buffer into blob
          //     blb = buffer;
          // });
          // blb = new Blob(blb);
          template();
          console.log(vm.docDefinition);
          pdfMake.createPdf(vm.docDefinition).open();
        };

        $scope.downloadPdf = function() {
          pdfMake.createPdf(vm.docDefinition).download();
        };
   	} 
})();