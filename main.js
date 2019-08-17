
$(document).ready(function() {

    loadData();

    $("input").focusout(function() {
        saveData();
    });
    
    $(".complete-btn").click(function() {
        var parent = $(this).parent(".field");
        
        parent.children("input").val("");
        parent.appendTo("#inputs");
        saveData();      
    });
    
    $("#clear-all").click(function() {
       $(".field").each(function(i) {   
            $(this).children("input").val("");
       });
        saveData();
    });
    
    $('input').keypress(function (e) {
         if(e.which == 13)  // the enter key code
          {
            $(this).blur();
            $(this).parent(".field").next(".field").children("input").focus();
            return false;  
          }
    });   

    function saveData() {
        var myStorage = window.localStorage;

        $(".field").each(function(i) {                   
            localStorage.setItem('setGoals_'+i, $(this).children("input").val());
        });
        console.log("Success Data saved.");
    }

    function loadData() {
        $(".field").each(function(i) {                   
            $(this).children("input").val(localStorage.getItem('setGoals_'+i));
        });
        
        console.log("Success Data loaded.");
    }
    
    
    var el = document.getElementById('inputs');
    var sortable = Sortable.create(el, {
        onEnd: function (/**Event*/evt) {
            saveData();
        },
        handle: ".handle",
        animation: 150
    });

});
