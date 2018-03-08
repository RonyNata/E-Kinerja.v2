(function() {
'use strict';
 
angular.
	module('eKinerja')
	.controller('LihatPDFController', LihatPDFController);

    
    function LihatPDFController(EkinerjaService, doc, dokumen, $uibModalInstance) {
      	var vm = this;

        vm.dokumen = dokumen;

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