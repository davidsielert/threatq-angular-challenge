'use strict';
angular.module('dms.iph', [])
    .provider('placeHolderImageUrl',[function () {
        return {
            sources: [],
            getSources: function getSources() {
                return this.sources;
            },
            setSources: function setSources(sources) {
                if (Object.prototype.toString.call(sources) === '[object Array]') {
                    this.sources = sources;
                }
            },
            toggleSource: function toggleSource(i,scope) {
                if (typeof this.sources[i] !== 'undefined') {
                    this.sources[i].enabled = !this.sources[i].enabled;
                }
                //call event on scope ..
                scope.$emit('sourcesChanged');
            },
            random: function () {
                var enabledSources = [];
                for (var i = 0; i < this.sources.length; i++) {
                    if (this.sources[i].enabled === true) {
                        enabledSources.push(this.sources[i])
                    }
                }
                return enabledSources[Math.floor(Math.random() * enabledSources.length)];
            },
            $get: function() {
                return this;
            }
        }
    }])
    .directive('phImg', ['placeHolderImageUrl', function (placeHolderImageUrl) {
        var defaultWidth = 200,
            defaultHeight = 300;
        return {
            scope: true, //or {} . isolate scope ..
            restrict: 'A',
            //This is one way to do this
            // use ng-src for 404's ... however some of these services seem to have throttling so meh
            template: '<img ng-src="{{imageUrl}}" class="iph" ng-click="setImage()"/>',
            replace: true,
            controller: ['$scope',"$rootScope",
                function ($scope,$rootScope) {
                    $scope.setImage = function () {
                        //This url formatting code could probably get offset to provider but you get the idea
                        var imageUrl = placeHolderImageUrl.random().url;
                        if (imageUrl.charAt(imageUrl.length - 1) != "/")
                            imageUrl += "/";
                        imageUrl += defaultWidth + "/" + defaultHeight;
                        $scope.imageUrl = imageUrl;
                    };
                    //We are using an isolate scope so this needs to go to rootscope..
                    $rootScope.$on('sourcesChanged', function () {
                        //more ideally we'd only change the url if it was one disabled .. beyond scope..
                        $scope.setImage();
                    });
                    $scope.setImage();

                }]
            //This is the other way...  however it's overcomplicated as I believe you'd have to bind events in compile ?

            //,link: function (scope, element, attrs) {
            //
            //    var imageUrl = placeHolderImageUrl.url;
            //    if (imageUrl.charAt(imageUrl.length - 1) != "/")
            //        imageUrl += "/";
            //    imageUrl += defaultWidth + "/" + defaultHeight;
            //    attrs.$set('src', imageUrl);
            //
            //}
        }
    }])
