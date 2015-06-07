"use strict";

angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function () {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function () {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};
})

.factory('Project', function ($mongolabResourceHttp) {
		var email = window.localStorage['mail'];
		return $mongolabResourceHttp(email);
})

.controller('startCtrl', function ($scope, $location, $ionicPopup) {
		$scope.signUp = {};
		$scope.start = function () {
			console.log($scope.signUp);
			window.localStorage['mail'] = $scope.signUp.mail;
			console.log(window.localStorage['mail']);
			var alertPopup = $ionicPopup.alert({
				title: 'All done!',
				template: 'Ready for blogs?'
			});
			alertPopup.then(function (res) {
				$location.path('/app/list');
			});
	
	
		}
})

.controller('TodoListCtrl', function ($scope, $location, $http, $stateParams, $state, projects) {
		$scope.projects = projects;
		$scope.blogs = $stateParams.listId;
		$scope.page = $stateParams.pageId;
		$http.jsonp('https://public-api.wordpress.com/rest/v1.1/sites/' + encodeURIComponent($scope.blogs) + '/posts/?page=' + $scope.page + '&callback=JSON_CALLBACK')
			.success(function (data) {
				console.log(data);
				$scope.posts = data.posts;
			})
			.error(function (data) {
				console.log("ERROR: " + data);
			})
		$http.jsonp('https://public-api.wordpress.com/rest/v1.1/sites/' + encodeURIComponent($scope.blogs) + '/?callback=JSON_CALLBACK')
			.success(function (data) {
				$scope.author = data;
			})
			.error(function (data) {
				console.log("Error: " + data);
			})
			//console.log($scope.project.site);
		$scope.nextPage = parseInt($stateParams.pageId) + 1;
		$scope.prevPage = parseInt($stateParams.pageId) - 1;
		$scope.doRefresh = function () {
			window.location.reload();
		}

})

.controller('postCtrl', function ($scope, $http, $stateParams, $window) {
		$scope.id = $stateParams.postId;
		$scope.blogs = $stateParams.blogId;
		$scope.post = {};
		$http.jsonp('https://public-api.wordpress.com/rest/v1.1/sites/' + encodeURIComponent($scope.blogs) + '/posts/' + $scope.id + '/?callback=JSON_CALLBACK')
			.success(function (data) {
				window.localStorage['post'] = JSON.stringify(data);
				$scope.post = JSON.parse(window.localStorage['post'] || '{}');
				console.log($scope.post);
			});

})



.controller('TodoFormCtrl', function ($scope, $location, $ionicPopup, project) {
	
		var projectCopy = angular.copy(project);
		var changeSuccess = function () {
			console.log('done');
		};
	
		var changeError = function () {
			throw new Error('Sth went wrong...');
		};
	
		$scope.project = project;
	
		$scope.save = function () {
			$scope.project.$saveOrUpdate(changeSuccess, changeError);
			var alertPopup = $ionicPopup.alert({
				title: 'Don\'t eat that!',
				template: 'It might taste good'
			});
			alertPopup.then(function (res) {
				$location.path("/app/list");
				console.log($location.path());
			});
	
		};
	
		$scope.remove = function () {
			$scope.project.$remove(changeSuccess, changeError);
		};
	
		$scope.hasChanges = function () {
			return !angular.equals($scope.project, projectCopy);
		};
})

.filter('encodeURIComponent', function () {
	return window.encodeURIComponent;
})

.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
		return $sce.trustAsHtml(text);
	};
}]);