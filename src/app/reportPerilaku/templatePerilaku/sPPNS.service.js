(function(){
	'use strict';

	angular.module('eKinerja')
        .service('SPPNSService', SPPNSService);

        function SPPNSService(API, $http, $q, EkinerjaService, ReportPerilakuService, HakAksesService){
        	var service = {};
     
        	service.template = function(data, bulan, tahun){

        		var docDefinition = {
			      pageSize: 'LETTER',
			        pageOrientation: "landscape",
			        pageMargins: [20,40,20,40],
			      content: [
			        {
			          text: 'REKAPITULASI PERILAKU KERJA PEGAWAI ' + $.parseJSON(sessionStorage.getItem('credential')).unit, style: 'nama_judul'
			        },

			        {
			          style: 'demoTable', margin: [0,10,0,0],
			          table: {
			            body: [
			              [{text: 'BULAN', bold: true},{text: ':'},{text: '' + tahun + ' ' + bulan}]
			            ]
			          },
			            layout: 'noBorders'
			        },

			          {
			              style: 'demoTable', margin: [0,10,0,0], alignment:'center',
			              table: {
			                  widths:['auto',130,130,'auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'],
			                  body: [
			                      [{text: 'No', rowSpan:2, bold:true, margin:[0,45,0,0]},{text: 'Nama', rowSpan:2, bold:true, margin:[0,45,0,0]},{text : 'Jabatan', rowSpan:2, bold:true, margin:[0,45,0,0]},{text: 'Tidak Hadir (hari)', colSpan:2, bold:true, margin:[0,35,0,0]}, {text:''},{text: 'Perekaman Datang/Pulang Saja/Datang Terlambat dan Pulang Sebelum Waktunya (menit)', colSpan:2, bold:true}, {text:''},{text: 'Tidak Hadir Apel (kali)', colSpan:2, bold:true, margin:[0,35,0,0]}, {text:''},{text : 'Tidak Hadir Rapat/Sidang Paripurna (kali)', colSpan:2, bold:true, margin:[0,20,0,0]}, {text:''},{text: 'Razia Gerakan Disiplin Aparatur (kali)/Pelanggaran Disiplin Lain', colSpan:2, bold:true, margin:[0,15,0,0]}, {text:''},{text: 'Manipulasi Data Kinerja', colSpan:2, bold:true, margin:[0,35,0,0]}, {text:''},{text: 'Total Faktor Pengurangan TPP', bold:true, margin:[0,30,0,0]},{text: 'Nilai (Kebalikan pengurangan)', bold:true, margin:[0,30,0,0]}],
			                      [{text: '', bold:true},{text: '', bold:true},{text : '', bold:true},{text: 'Data', bold:true}, {text: 'Nilai', bold:true},{text: 'Data', bold:true}, {text: 'Nilai', bold:true},{text: 'Data', bold:true}, {text: 'Nilai', bold:true},{text: 'Data', bold:true}, {text: 'Nilai', bold:true},{text: 'Data', bold:true}, {text: 'Nilai', bold:true},{text: 'Data', bold:true}, {text: 'Nilai', bold:true},{text: 'Jumlah', bold:true},{text: '100-Faktor',bold:true}],
			                      [{text: '1', bold:true},{text: '2', bold:true},{text : '3', bold:true},{text: '4', colSpan:2, bold:true}, {text:''},{text: '5', colSpan:2, bold:true}, {text:''},{text: '6', colSpan:2, bold:true}, {text:''},{text : '7', colSpan:2, bold:true}, {text:''},{text: '8', colSpan:2, bold:true}, {text:''},{text: '9', colSpan:2, bold:true}, {text:''},{text: '10', bold:true},{text: '11', bold:true}],


			                  ]
			              }
			          }

			      ],

			      styles: {
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
			        header: {
			          bold: true,
			          color: '#000',
			          fontSize: 10
			        },
			        demoTable: {
			          color: '#000',
			          fontSize: 8
			        },
			        tandaTangan: {
			          color: '#000',
			          fontSize: 10,
			          alignment:'right'
			        }
			      }
			    };

			    for (var i=0; i<data.length; i++){
			        docDefinition.content[2].table.body.push([{text: '' + i},{text: '' + data[i].namaPegawai, alignment:'left'},{text : '' + data[i].namaJabatan, alignment:'left'},{text: '' + data[i].dataHadir}, {text: '' + data[i].nilaiHadir},{text: '' + data[i].dataPerekamanDatangPulang}, {text: '' + data[i].nilaiPerekamanDatangPulang},{text: '' + data[i].dataHadirApel}, {text: '' + data[i].nilaiHadirApel},{text: '' + data[i].dataHadirRapat}, {text: '' + data[i].nilaiHadirRapat},{text: '' + data[i].dataRazia}, {text: '' + data[i].nilaiRazia},{text: '' + data[i].dataManipulasiData}, {text: '' + data[i].nilaiManipulasiData},{text: '' + data[i].totalFaktorPeuranganTpp, alignment:'right'},{text: '' + data[i].nilaiKebalikan, alignment:'right'}]);

			    }
			    return docDefinition;
        	}
        	return service;
        }
})();