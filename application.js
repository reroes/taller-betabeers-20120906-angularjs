angular.module('videos', []).
	config(['$sceDelegateProvider', function($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist(['http://www.youtube.com/embed/*']);
	}]).
	controller('AppCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
		$scope.query = '';
		$scope.buscar = function() {
			$log.log('Iniciando búsqueda de "' + $scope.query + '"');
			$http.get('http://gdata.youtube.com/feeds/api/videos?v=2&alt=jsonc&max-results=9', {params:{q:$scope.query}}).
				success($scope.fetch_ok).
				error($scope.fetch_failed);
		};
		$scope.fetch_ok = function(result) {
			if (result && result.data && result.data.items) {
				$log.log('Resultados recibidos');
				var videos = [];
				angular.forEach(result.data.items, function(item) {
					videos.push({
						id: item.id,
						title: item.title,
						uploader: item.uploader,
						url: item.content['5'],
						description: item.description
					});
				});
				$scope.videos = videos;
			} else {
				$log.log('Los resultados no son válidos');
			}
		};
		$scope.fetch_failed = function() {
			$log.log('La búsqueda ha fallado');
			alert("¡La búsqueda en Youtube ha fallado!");
		};
		$scope.videoEmbedURL = function(videoId) {
			return 'http://www.youtube.com/embed/' + videoId;
		};
	}]);;

