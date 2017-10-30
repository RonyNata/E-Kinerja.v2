(function() {
	'use strict';

	angular
	.module('eKinerja')
	.controller('welcomeController', welcomeController);

	function welcomeController(EkinerjaService, $state) {
		var vm = this;

		vm.pegawai = $.parseJSON(sessionStorage.getItem('credential'));

		vm.checkLocation = function(state){
        if(state == $state.current.name)
          	return true;
        else return false;
	    }

	    vm.checkRole = function(role){
	    if(vm.pegawai.role.id == role)
	        return true;
	    else return false;
	    }
	}
})();