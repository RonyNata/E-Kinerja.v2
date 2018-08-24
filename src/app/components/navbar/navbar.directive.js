(function() {
  'use strict';

  angular
    .module('eKinerja')
    .directive('ekinerjaNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(EkinerjaService, $state, $interval, $document, $uibModal, $scope, toastr, DashboardService) {
      var vm = this;
      vm.jmlNotif = 0;
      // console.log(ws);

      // if(ws.onmessage == null){
      //   ws.onmessage = function(event){
      //     console.log(event.data);
      //   }
      //   ws.onopen = function(){
      //     ws.send('Halo');
      //   }
      // }

      // "vm.creationDate" is available by directive option "bindToController: true"

      vm.eselon = $.parseJSON(sessionStorage.getItem('credential')).eselon.split('.')[0].toLowerCase();

      vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));
      vm.pegawai.role.role = vm.pegawai.role.role.toUpperCase();
      console.log(vm.pegawai);
      vm.logout = function(){
        EkinerjaService.logout();
      }

      vm.checkLocation = function(state){
        // console.log($state.current.name);
        if(state == $state.current.name)
          return true;
        else return false;
      }

      vm.checkRole = function(role){
        if(vm.pegawai.role.id == role)
          return true;
        else return false;
      }
      // console.log(vm.pegawai);
      function getNotif(){
        EkinerjaService.GetNotifLaporan(vm.pegawai.nipPegawai).then(
          function(response){
            for(var i = 0; i < response.length; i++){
              response[i].jenisNotif = 1;
              response[i].deskripsi = "Laporan masuk dari " + response[i].namaBawahan;
              response[i].url = '#penilaian';
            }
            vm.notif = response;
            if(response.length != 0)
              vm.jmlNotif += response.length;
            // disposisiNotif();
            // else vm.jmlNotif = undefined;
          },function(errResponse){

          })

        if(!vm.pegawai.sudahMembuatKontrak)
          vm.jmlNotif += 1;

        EkinerjaService.GetNotifAjuan(vm.pegawai.kdUnitKerja, vm.pegawai.nipPegawai).then(
          function(response){
            vm.ajuan = response;
            if(response.length != 0)
              vm.jmlNotif += response.length;
            // else vm.jmlNotif = undefined;
          },function(errResponse){

          })
      }

      function disposisiNotif(){
        DashboardService.GetDisposisi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
          function(response){
            if(response.length != 0)
              vm.jmlNotif += response.length;
            for(var i = 0; i < response.length; i++){
              response[i].tanggalDibuatMilis = response[i].tglPengirimanMilis;
              response[i].jenisNotif = 2;
              response[i].deskripsi = "Disposisi masuk dari " + response[i].namaPengirim;
              response[i].url = '#ambil-disposisi';
              vm.notif.push(response[i]);
            }
            instruksiNotif();
          }, function(errResponse){

          })
      }

      function instruksiNotif(){
        DashboardService.GetInstruksi($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
          function(response){
            if(response.length != 0)
              vm.jmlNotif += response.length;
            for(var i = 0; i < response.length; i++){
              response[i].tanggalDibuatMilis = response[i].createdDateMilis;
              response[i].jenisNotif = 3;
              response[i].deskripsi = "Instruksi masuk dari " + response[i].namaPemberi;
              response[i].url = '#penugasan';
              vm.notif.push(response[i]);
            }
            tugasNotif();
          }, function(errResponse){

          })
      }

      function tugasNotif(){
        DashboardService.GetSuratTugas($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
          function(response){
            if(response.length != 0)
              vm.jmlNotif += response.length;
            for(var i = 0; i < response.length; i++){
              response[i].tanggalDibuatMilis = response[i].createdDateMilis;
              response[i].jenisNotif = 3;
              response[i].deskripsi = "Tugas masuk dari " + response[i].namaPemberi;
              response[i].url = '#penugasan';
              vm.notif.push(response[i]);
            }
            perintahNotif();
          },function(errResponse){

          })
      }

      function perintahNotif(){
        DashboardService.GetPerintah($.parseJSON(sessionStorage.getItem('credential')).nipPegawai).then(
          function(response){
            if(response.length != 0)
              vm.jmlNotif += response.length;
            for(var i = 0; i < response.length; i++){
              response[i].tanggalDibuatMilis = response[i].createdDateMilis;
              response[i].jenisNotif = 3;
              response[i].deskripsi = "Perintah masuk dari " + response[i].namaPemberi;
              response[i].url = '#penugasan';
              vm.notif.push(response[i]);
            }
            vm.notif.sort( function ( a, b ) { return b.tanggalDibuatMilis - a.tanggalDibuatMilis; } );
          }, function(errResponse){

          })
      }

      vm.gantipwd = function(){
        if(vm.password == vm.retypePassword)
          EkinerjaService.GantiPassword({"nipPegawai": vm.pegawai.nipPegawai, "newPassword": vm.password}).then(
            function(response){
              EkinerjaService.showToastrSuccess("Password Telah Diubah");
              $state.reload();
            }, function(errResponse){

            })
        // debugger
        // $state.go('setting');
      }

      // if(!vm.pegawai.sudahMembuatKontrak && !$.parseJSON(sessionStorage.getItem('kontrak'))){
      //   sessionStorage.setItem('kontrak', 'true');
      //   EkinerjaService.changeToastrOpt();
      // }
      
      $scope.openStep = function (parentSelector) {
        var parentElem = parentSelector ? 
          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'app/login/stepByStep/stepByStep.html',
          controller: 'LoginEKinerjaController',
          controllerAs: 'stepByStep',
          // windowClass: 'app-modal-window',
          size: 'lg',
          appendTo: parentElem
        });
      };

      vm.testConnection = function() {
          Offline.options = {
                    checkOnLoad: false,
                    interceptRequests: true,
                    reconnect: {
                      initialDelay: 0
                    },
                    requests: true,
                    game: false,
                    checks: {xhr: {url: 'http://192.168.200.1'}}
                  };
          // Offline.check();
          console.log(Offline.check());
      }

      getNotif();

      // $interval(function(){
      // getNotif();
    // }, 1000);
    }
  }

})();
