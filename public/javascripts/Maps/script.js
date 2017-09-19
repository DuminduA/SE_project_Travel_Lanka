/**
 * Created by dumindu on 15/05/2017.
 */



$(document).ready(function () {


    (function (window,google) {
        var options = {
                center:{
                    lat: 7.8731,
                    lng: 80.7718
                },
                zoom:8
            },
            element = document.getElementById('map-canvas');

        map = new google.maps.Map(element,options);


        // var marker2 = new google.maps.Marker({
        //
        //     position:{
        //         lat:6.9271,
        //         lng:79.8612
        //     },
        //     map:map
        //
        //
        // });
        var createMarker = function (lat,lng) {
            var marker2 = new google.maps.Marker({

                    position:{
                        lat:lat,
                        lng:lng
                    },
                    map:map


                });
            marker2.addListener('click',function () {
                infoWindow2.open(map,marker2);

            });
            return marker2;
        }
        var marker = new google.maps.Marker({

            position:{
                lat:7.8731,
                lng:80.7718
            },
            map:map


        });
        marker.addListener('click',function () {
            infoWindow.open(map,marker);

        });

        var infoWindow2 = new google.maps.InfoWindow({
            content:"Now You are here"

        });

        var infoWindow = new google.maps.InfoWindow({
            content:"Sri Lanka"

        });

        var panorama = new google.maps.StreetViewPanorama(document.getElementById('street_view'),{

            position:{
                lat:6.9271,
                lng:79.8612
            }

        });

        map.setStreetView(panorama);


         geocoder = new google.maps.Geocoder();

        function geocode(opts) {
            geocoder.geocode({
                address:opts.address
            },function (results,status) {
                if(status === google.maps.GeocoderStatus.OK){
                    console.log(results);
                }else{console.error("error");}
            })
        }

        geocode({

            address:"Golden Gate Bridge, San Francisco, CA",
            success:function (results) {
                var result = results[0];

                createMarker(6.623,79.365);
            }
        });

        (function () {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function (position) {
                    createMarker(position.coords.latitude,position.coords.longitude);
                        console.log(position);

                    }
                );
            };

        }())





        var input = document.getElementById('search');
        var searchBox = new google.maps.places.SearchBox(input);

        var markers = [];

        // when a place is search in the search bar show it on the map
        searchBox.addListener('places_changed',function(){
            var places = searchBox.getPlaces();

            if (places.length == 0){
                return ;
            }
            //focus the user has searched
            map.setCenter(places[0].geometry.location);
            map.setZoom(14);

        });



    }(window , google));



});
