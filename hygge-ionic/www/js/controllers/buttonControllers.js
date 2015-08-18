angular.module('hygge.buttonControllers', [])

.controller('IntroActions', function($rootScope, $scope, $state, $ionicSlideBoxDelegate){ 
    $scope.startApp = function(){
        v5.pause();
        v4.pause();
        v3.pause();
        v2.pause();
        v1.pause();
        jQuery("#ts2").fadeOut();
        jQuery("#ts3").fadeOut();
        jQuery("#ts4").fadeOut();
        jQuery("#ts5").fadeOut();
        jQuery("#ts1").fadeIn();
        $ionicSlideBoxDelegate.slide(0);
        //$scope.$apply();
        window.localStorage['didTutorial'] = "true";

        $state.go('tab.map',{});
        //window.analytics.trackView('Map');
    
    }
    $scope.playIntro = function(){
        $state.go('intro',{});    
    }    
    $scope.playBtnAudio = function(){
        if( window.plugins && window.plugins.NativeAudio ) {
            window.plugins.NativeAudio.play( 'click' );
            console.log('audio');
            // Stop multichannel clip after 5 seconds
            window.setTimeout( function(){
                window.plugins.NativeAudio.unload( 'click' );
            }, 1000 * 5 );
        } else {
            console.log('NativeAudio not found');
        }       
    }    
    $scope.getDirections = function(){
        $scope.playBtnAudio();      
        jQuery("#btnDirs").replaceWith('<i class="icon ion-loading-c" style="color:#fff;font-size:16rem" id="btnDirs"></i>');
        var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
        var PRun = Parse.Object.extend("directions");
        var prun = new PRun();
          prun.save({run: 1}, {
          success: function(object) {
        jQuery("#btnDirs").replaceWith('<i class="icon ion-checkmark-circled" style="color:#fff;font-size:16rem" id="btnDirs"></i>');
          },
          error: function(model, error) {
        jQuery("#btnDirs").replaceWith('<i class="icon ion-close-circled" style="color:#fff;font-size:16rem" id="btnDirs"></i>');
          }
        });    
        if(deviceType=="Android"){
            window.open('https://www.google.com/maps/place/Mithun', '_system', 'location=yes');
            return false;
        } else {
            window.open('maps://?q=510 S Marquette Ave, Minneapolis, MN, 55402', '_system', 'location=yes');
            return false;
        };        
    }
    $scope.launchIAT = function(){  
        $scope.playBtnAudio();       
        jQuery("#btnBIAT").replaceWith('<i class="icon ion-loading-c" style="color:#fff;font-size:16rem" id="btnBIAT"></i>');
        window.open('http://mithun-46828.azurewebsites.net/BrandIAT', '_system', 'location=yes');
        var PRun = Parse.Object.extend("BrandIAT");
        var prun = new PRun();
          prun.save({run: 1}, {
          success: function(object) {
        jQuery("#btnBIAT").replaceWith('<i class="icon ion-checkmark-circled" style="color:#fff;font-size:16rem" id="btnBIAT"></i>');
          },
          error: function(model, error) {
        jQuery("#btnBIAT").replaceWith('<i class="icon ion-close-circled" style="color:#fff;font-size:16rem" id="btnBIAT"></i>');
          }
        });          
    }
    $scope.mithunInstagram = function(){
        $scope.playBtnAudio();      
        window.open('http://instagram.com/mithunagency', '_system', 'location=yes');
        var PRun = Parse.Object.extend("Instagram");
        var prun = new PRun();
          prun.save({run: 1}, {
          success: function(object) {
            //$(".success").show();
          },
          error: function(model, error) {
            //$(".error").show();
          }
        });          
    }
    $scope.mithunContact = function(){
        $scope.playBtnAudio();      
        jQuery("#btnCont").replaceWith('<i class="icon ion-loading-c" style="color:#fff;font-size:16rem" id="btnCont"></i>');
        window.open('http://mithun.agency/contact', '_system', 'location=yes');
        var PRun = Parse.Object.extend("Contact");
        var prun = new PRun();
          prun.save({run: 1}, {
          success: function(object) {
            jQuery("#btnCont").replaceWith('<i class="icon ion-checkmark-circled" style="color:#fafafa;font-size:16rem" id="btnCont"></i>');
          },
          error: function(model, error) {
            jQuery("#btnCont").replaceWith('<i class="icon ion-close-circled" style="color:#fafafa;font-size:16rem" id="btnCont"></i>');
          }
        });          
    }
})
.controller('locationButtons', function($rootScope, $scope, $state, $ionicSlideBoxDelegate){    
    
    $scope.show = function(num){
        //write one div into the show div then hide buttons and show div
        $("#circles").slideUp();
        $("#show-card").html($("#near-card"+num).html()).slideDown();
        $("#back-to-circles").fadeIn();
    } 

    $scope.hideinfo = function(){
        //write one div into the show div then hide buttons and show div
        $("#back-to-circles").fadeOut();
        $("#show-card").slideUp();
        $("#circles").slideDown();
    } 
    
    $scope.makeSuggestion = function(){
        $scope.playBtnAudio();      
        jQuery("#btnSugg").replaceWith('<div id="btnSugg"><input type="text" size="50" id="txtSuggest"></input><br><button id="btnSuggest" class="button button-default">Send</button></div>');
        jQuery("#btnSuggest").click(function(){
            var PRun = Parse.Object.extend("Suggestion");
            var prun = new PRun();
              prun.save({run: jQuery("#txtSuggest").text()}, {
              success: function(object) {
                jQuery("#btnSugg").replaceWith('<i class="icon ion-checkmark-circled" style="color:#fafafa;font-size:16rem" id="btnCont"></i>');
              },
              error: function(model, error) {
                jQuery("#btnSugg").replaceWith('<i class="icon ion-close-circled" style="color:#fafafa;font-size:16rem" id="btnCont"></i>');
              }
            });
        });
    }
})
.controller('funButtons', function($rootScope, $scope, $state, $ionicSlideBoxDelegate){    
    
    $scope.playBtnAudio = function(){
        if( window.plugins && window.plugins.NativeAudio ) {
            window.plugins.NativeAudio.play( 'click' );
            console.log('audio');
            // Stop multichannel clip after 5 seconds
            window.setTimeout( function(){
                window.plugins.NativeAudio.unload( 'click' );
            }, 1000 * 5 );
        } else {
            console.log('NativeAudio not found');
        }       
    }
    $scope.joinMITHUN = function(){
        $scope.playBtnAudio();      
        jQuery("#btnJoin").replaceWith('<i class="icon ion-loading-c" style="color:#fff;font-size:16rem" id="btnJoin"></i>');
        window.open('https://ch.tbe.taleo.net/CH08/ats/servlet/Rss?org=CMITHUN&cws=1&WebPage=SRCHR&WebVersion=0&_rss_version=2&CUSTOM_774=2536', '_system', 'location=yes');
        var PRun = Parse.Object.extend("btnJoin");
        var prun = new PRun();
          prun.save({run: 1}, {
          success: function(object) {
            jQuery("#btnJoin").replaceWith('<i class="icon ion-checkmark-circled" style="color:#fafafa;font-size:16rem" id="btnJoin"></i>');
          },
          error: function(model, error) {
            jQuery("#btnJoin").replaceWith('<i class="icon ion-close-circled" style="color:#fafafa;font-size:16rem" id="btnJoin"></i>');
          }
        });         
    } 
    
    $scope.makeSuggestion = function(){
        $scope.playBtnAudio();      
        jQuery("#btnSugg").replaceWith('<div id="btnSugg"><input type="text" size="50" id="txtSuggest"></input><br><button id="btnSuggest" class="button button-default">Send</button></div>');
        jQuery("#btnSuggest").click(function(){
            var PRun = Parse.Object.extend("Suggestion");
            var prun = new PRun();
              prun.save({run: jQuery("#txtSuggest").text()}, {
              success: function(object) {
                jQuery("#btnSugg").replaceWith('<i class="icon ion-checkmark-circled" style="color:#fafafa;font-size:16rem" id="btnCont"></i>');
              },
              error: function(model, error) {
                jQuery("#btnSugg").replaceWith('<i class="icon ion-close-circled" style="color:#fafafa;font-size:16rem" id="btnCont"></i>');
              }
            });
        });
    }
});
