// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('body').on('click', '.page-scroll a', function (event) {
        var $anchor = $($(this).attr('href')).offset();
        $('html, body').stop().animate({
            scrollTop: $anchor
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});

(function () {
    'use-strict';

    var homeApp = angular.module('homeApp', []);

    homeApp.config([
      '$interpolateProvider',
        function ($interpolateProvider) {
            return $interpolateProvider.startSymbol('{(').endSymbol(')}');
      }
    ]);

    homeApp.controller('HomeController', HomeController)
    homeApp.controller('ModuleController', ModuleController)
    homeApp.factory('HomeService', HomeService);

    HomeService.$inject = ['$http'];
    HomeController.$inject = ['$scope', 'HomeService'];
    ModuleController.$inject = ['$scope', 'HomeService'];

    function HomeController($scope, HomeService) {
        HomeService.getGithubConfig('jhipster', 'generator-jhipster').success(function (data) {
            $scope.gitConfig = data;
        });

        HomeService.getNpmDownloadsLastMonth('generator-jhipster').success(function (data) {
            $scope.npmDownloads = data.downloads;
        });

    }

    function ModuleController($scope, HomeService) {
        HomeService.getModules().success(function (data) {
            $scope.modules = data;
            var modulesList = '';
            for (var i = 0; i < data.length; i++) {
                modulesList += data[i].npmPackageName + ',';
            }
            HomeService.getNpmDownloadsLastMonth(modulesList).success(function (data) {
                for (var i = 0; i < $scope.modules.length; i++) {
                    var module = $scope.modules[i];
                    var npmstats = data[module.npmPackageName];
                    if (npmstats != undefined) {
                        module.downloads = npmstats.downloads;
                    } else {
                        module.downloads = 0;
                    }
                }
            });
        });

        /*$scope.details = function (npmPackageName) {
            $location.path('/details/' + npmPackageName);
        };*/
    }

    function HomeService($http) {
        return {
            getNpmDownloadsLastMonth: function (name) {
                return $http.get('https://api.npmjs.org/downloads/point/last-month/' + name).success(function (resp) {
                    return resp;
                });
            },
            getGithubConfig: function (author, name) {
                return $http.get('https://api.github.com/repos/' + author + '/' + name).success(function (resp) {
                    return resp;
                });
            },
            getModules: function () {
                return $http.get('modules.json').success(function (resp) {
                    return resp;
                });
            }
        }
    }


})();