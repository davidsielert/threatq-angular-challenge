'use strict';
//configure the sources for our custom module..
angular.module('dms.iph')
    .config(['placeHolderImageUrlProvider', function (placeHolderImageUrlProvider) {
    //set the sources..
    var sources = [
        {name: "Place Kitten", url: 'http://placekitten.com', enabled: true},
        {name: "Place Bear", url: 'http://placebear.com', enabled: true},
        {name: "Bacon Mockup", url: 'http://baconmockup.com', enabled: true},
        {name: "Full Murray", url: 'http://www.fillmurray.com', enabled: true},
        {name: "Place Sheen", url: 'http://placesheen.com', enabled: true},
        {name: "Place Cage", url: 'http://www.placecage.com', enabled: true},
        {name: "Stevens Gallery", url: 'http://www.stevensegallery.com', enabled: true},
        {name: "NiceNice Jpg", url: 'http://www.nicenicejpg.com', enabled: true},
        {name: "Beer Holdit", url: 'http://beerhold.it', enabled: true}
    ];
    placeHolderImageUrlProvider.setSources(sources)
}]);
angular.module('myApp.view1', ['ngRoute', 'dms.iph'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', "placeHolderImageUrl", function ($scope, placeHolderImageUrl) {
        $scope.sources = placeHolderImageUrl.sources;

        $scope.refresh = function () {
            $scope.$emit('sourcesChanged');
            $scope.$watch(placeHolderImageUrl.sources, function (nval, oldval, scope) {
                if (nval)
                    scope.sources = nval;
            })
        }
        $scope.toggleSource = placeHolderImageUrl.toggleSource

    }]);