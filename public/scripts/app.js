var myApp = angular.module("myApp", ['ngRoute']);
console.log('are we in app.js?');

myApp.config(['$routeProvider', function($routeProvider) {
    console.log('here');
    $routeProvider
        .when('/createPost', {
            templateUrl: '/views/templates/createPost.html',
            controller: 'CreateController'
        })
        .when('/reviewPost', {
            templateUrl: '/views/templates/listPosts.html',
            controller: 'ListPostsController'
        })
        .when('/editPost', {
            templateUrl: '/views/templates/editPost.html',
            controller: 'EditPostController'
        })
        .otherwise({
            redirectTo: '/createPost'
        });
}]);