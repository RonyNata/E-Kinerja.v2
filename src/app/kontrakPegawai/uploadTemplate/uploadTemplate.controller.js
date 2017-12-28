(function() {
    'use strict';

    angular.
    module('eKinerja')
        .controller('UploadTemplateController', UploadTemplateController);


    function UploadTemplateController(EkinerjaService, KontrakPegawaiService, $uibModalInstance, 
        $scope, $state, urtug, isDPA, API, $http, Upload) {
        var vm = this;
        vm.loading = true;
        vm.item = {};
        vm.data = {};
        debugger
        vm.urtug=urtug;
        vm.isDPA=isDPA;
        vm.data.kdUnitKerja = $.parseJSON(sessionStorage.getItem('credential')).kdUnitKerja;
        vm.data.nipPegawai = $.parseJSON(sessionStorage.getItem('credential')).nipPegawai;
        vm.data.kdUrtug = vm.urtug.kdUrtug;
        vm.data.kdJabatan = $.parseJSON(sessionStorage.getItem('credential')).kdJabatan;
        vm.data.tahunUrtug = urtug.tahunUrtug;

        $scope.uploadPic = function(files) {
            console.log(files);

            var fd = new FormData();
            //Take the first selected file
            // fd.append("file", new Blob([JSON.stringify(vm.data)], {type:"aplication/json"}));


            var data = {metadata: new Blob([JSON.stringify(vm.data)], {type:"aplication/json"}), file: files[0]};
            console.log(data);
            // $http.post(API + 'create-template-lain', data, {
            //     headers: {'Content-Type': 'multipart/form' },
            //     transformRequest: angular.identity
            // }).success( '...all right!...' ).error( '..damn!...' );
            // var formData = new FormData();
            // formData.append('file', file);
            // vm.data.file = formData;
            // vm.data.file = file;
            // $http({  
            //     method: 'POST',  
            //     url: API + 'create-template-lain',  
            //     headers: { 'Content-Type': undefined },  
                 
            //     data: {metadata: vm.data, file: file}  
            // }).  
            // success(function (data, status, headers, config) {  
            //     alert("success!");
            // }).  
            // error(function (data, status, headers, config) {  
            //     alert("failed!");  
            // });  
            // files[0].upload = Upload.upload({
            //   url: 'http://10.2.1.32:8080/api/create-template-lain/',
            //   headers: { 'Content-Type': 'undefined' },
            //   data: {file: files[0]},
            //   param: vm.data
            // });

            // file.upload.then(function (response) {
            //   $timeout(function () {
            //     EkinerjaService.showToastrSuccess("File Berhasil Diupload");
            //   });
            // }, function (response) {
            //   if (response.status > 0)
            //     $scope.errorMsg = response.status + ': ' + response.data;
            // }, function (evt) {
            //   // Math.min is to fix IE which reports 200% sometimes
            //   file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            // });
        }

        vm.uploadTemplate = function () {debugger
            console.log($scope.myFile);
            console.log(vm.item);

            var formData = new FormData();
            formData.append('file', $scope.myFile);
            vm.data.file = formData;

            if(isDPA){
                vm.data.kdKegiatan = vm.urtug.kdKegiatan;
            }
            console.log(vm.data);

            KontrakPegawaiService.uploadTemplate(vm.data).then(
                function(response){
                    EkinerjaService.showToastrSuccess('Data Berhasil Disimpan');
                }, function(errResponse){

                })
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.reset = function(){
            vm.item = angular.copy(items);
        };
    }
})();