myApp.controller('CreateController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'inside Create Controller';
    console.log('cc');
    $scope.blogPosts;
    $scope.title = '';
    $scope.date = '';
    $scope.blog = '';
    $scope.name = '';
    $scope.added = false;

    $scope.addBlogPost = function() {
        var blogPost = {
            title: $scope.title,
            date: $scope.date,
            blog: $scope.blog,
            name: $scope.name
        };

        $http.post('/addBlogPost', blogPost).then(function(response) {
            $scope.blogPosts = response.data;
            $scope.title = '';
            $scope.date = '';
            $scope.blog = '';
            $scope.name = '';
        });
        $scope.added = true;
    };

}]);