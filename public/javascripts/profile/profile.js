/**
 * Created by dumindu on 12/05/2017.
 */


$('document').ready(function(){

    alert('yaaha');
    $('#createpost').hide();
   $('#createpostbtn').on('click',function () {
       $('#createpost').show();
   });
    $('#cancel_post').on('click',function () {
        $('#createpost').hide();
    });

});

