// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'mongolabResourceHttp'])

.run(function ($ionicPlatform, $mongolabResourceHttp) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.constant('MONGOLAB_CONFIG', {
	API_KEY: 'YOUR-MONGOLAB-API-KEY',
	DB_NAME: 'wp-reader'
})

.directive('targetBlank', function () {
	return {
		compile: function (element) {
			var elems = (element.prop('tagName') === 'A') ? element : element.find('a');
			elems.attr('target', '_blank');
		}
	};
})

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider


		.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})

	.state('app.list', {
		url: '/list',
		views: {
			'menuContent': {
				templateUrl: 'templates/list.html',
				controller: 'TodoListCtrl'
			}
		},
		resolve: {
			projects: function (Project) {
				return Project.all();
			}
		}
	})

	.state('app.new', {
			url: '/new',
			views: {
				'menuContent': {
					templateUrl: 'templates/form.html',
					controller: 'TodoFormCtrl'
				}
			},
			resolve: {
				project: function (Project) {
					return new Project();
				}
			}
		})
		.state('app.read', {
			url: '/list/:pageId/:listId',
			views: {
				'menuContent': {
					templateUrl: 'templates/read.html',
					controller: 'TodoListCtrl'
				}
			},
			resolve: {
				projects: function (Project) {
					return Project.all();
				}
			}
		})

	.state('app.start', {
			url: '/start',
			views: {
				'menuContent': {
					templateUrl: 'templates/start.html',
					controller: 'startCtrl'
				}
			}

		})
		.state('app.post', {
			url: '/post/:blogId/:postId',
			views: {
				'menuContent': {
					templateUrl: 'templates/post.html',
					controller: 'postCtrl'
				}
			}
		})
		// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/start');
});