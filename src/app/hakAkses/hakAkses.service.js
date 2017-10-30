(function(){
	'use strict';

	angular.
		module('eKinerja').
		service('HakAksesService', HakAksesService);

		function HakAksesService(API, $q, $http){
			var service = {};

			service.GetAllPegawai = function(){
				var deferred = $q.defer();
	            $http.get(API + 'get-pegawai/').then(
	                function (response){
	                    deferred.resolve(response.data);
	                },
	                function(errResponse){
	                    deferred.reject(errResponse);
	                }
	            );
	            return deferred.promise;
			}

			service.GetRolePegawai = function(nip){
				var deferred = $q.defer();
	            $http.get(API + 'get-pegawai-roles/' + nip).then(
	                function (response){
	                    deferred.resolve(response.data);
	                },
	                function(errResponse){
	                    deferred.reject(errResponse);
	                }
	            );
	            return deferred.promise;
			}

			service.SetRolePegawai = function(pegawai){
				var role = {
					"nipPegawai": pegawai.nipPegawai,
					"roleId": pegawai.role.id
				};
				var deferred = $q.defer();
	            $http.post(API + 'set-role/', role).then(
	                function (response){
	                    deferred.resolve(response.data);
	                },
	                function(errResponse){
	                    deferred.reject(errResponse);
	                }
	            );
	            return deferred.promise;
			}

			service.findRole = function(kdRole, array){
	            for(var i = 0; i<array.length; i++){
	                if (array[i].id.search(kdRole) != -1){
	                    return array[i]; break;
	                } 
	            }
	        }		

			return service;
		}
})();