(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('LihatPDFDisposisiController', LihatPDFDisposisiController);

    
    function LihatPDFDisposisiController(EkinerjaService, doc, surat, dokumen, $uibModalInstance,
       TemplateSuratKeputusanService,
       TemplateSuratDinasService,
       TemplateLaporanService,
       TemplateTelaahanStaffService,
       TemplateSuratUndanganService,
       TemplateSuratPengantarService,
       TemplateSuratEdaranService,
       TemplatePengumumanService,
       TemplateMemorandumService,
       TemplateSuratKuasaService,
       TemplateSuratKeteranganService,
       TemplateNotaDinasService,
       TemplateBeritaAcaraService,
       TemplateSuratTugasService,
       TemplateSuratPerintahService,
       AmbilDisposisiService) {
      	var vm = this;
        var kdSurat = surat;debugger

        vm.dokumen = dokumen;

        vm.openSurat = function(){debugger
          AmbilDisposisiService.GetFile(kdSurat).then(
            function(response){
              showPdf(response.jenisSurat, response.suratDisposisi);
            }, function(errResponse){

            })
        }

        function showPdf(jenis, data){
          var docs;
          switch(jenis){
            case 0: docs = TemplateBeritaAcaraService.template(data); break;
            case 1: docs = TemplateLaporanService.template(data); break;
            case 2: docs = TemplateMemorandumService.template(data); break;
            case 3: docs = TemplateNotaDinasService.template(data); break;
            case 4: docs = TemplatePengumumanService.template(data); break;
            case 5: docs = TemplateSuratDinasService.template(data); break;
            case 6: docs = TemplateSuratEdaranService.template(data); break;
            case 7: docs = TemplateSuratKeputusanService.template(data); break;
            case 8: docs = TemplateSuratKeteranganService.template(data); break;
            case 9: docs = TemplateSuratKuasaService.template(data); break;
            case 10: docs = TemplateSuratPengantarService.template(data); break;
            case 12: docs = TemplateSuratTugasService.template(data); break;
            case 13: docs = TemplateSuratUndanganService.template(data); break;
            case 14: docs = TemplateTelaahanStaffService.template(data); break;
            case 15: console.log("123"); break;
            default: docs = TemplateSuratPerintahService.template(data); break;
          }
          EkinerjaService.lihatPdf(docs, "yang di disposisikan");
        }

        pdfMake.createPdf(doc).getDataUrl(function (outDoc) {
          document.getElementById('pdfV').src = outDoc;
        });

        vm.download = function(kdSurat){
          pdfMake.createPdf(doc).download();
      	}

      	vm.cancel = function () {
  	      $uibModalInstance.dismiss('cancel');
  	    };
   	} 
})();