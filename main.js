
$(document).ready(function() {

    loadData();

    $("input").focusout(function() {
        saveData();
    });
    
    $(".complete-btn").click(function() {
        
        var parent = $(this).parent(".field");
        
        if (parent.hasClass("complete")) {
            parent.children("input").val("");
            parent.removeClass("complete");
            saveData();
        }
        else
        {
            $(this).parent(".field").addClass("complete"); 
            saveData();
        }
        
      
    });
    
    $("#clear-all").click(function() {
       $(".field").each(function(i) {   
            $(this).children("input").val("");
            $(this).removeClass("complete");
       });
        saveData();
    });
    
    $('input').keypress(function (e) {
         if(e.which == 13)  // the enter key code
          {
              console.log("test");
              $(this).blur();
            $(this).parent(".field").next(".field").children("input").focus();
            return false;  
          }
    });   
    
    $('input').focusout(function() {
        if ($(this).val()=="") $(this).parent(".field").removeClass("complete");
    });

    function saveData() {
        var myStorage = window.localStorage;

        $(".field").each(function(i) {                   
            localStorage.setItem('setGoals_'+i, $(this).children("input").val());
            localStorage.setItem('setGoals_'+i+"_complete", $(this).hasClass("complete"));
            console.log($(this).hasClass("complete"));
        });
        
        console.log("Saved.");

    }

    function loadData() {
        $(".field").each(function(i) {                   
            $(this).children("input").val(localStorage.getItem('setGoals_'+i));
            if (localStorage.getItem('setGoals_'+i+"_complete")=="true") {
                $(this).addClass("complete");
            console.log(localStorage.getItem('setGoals_'+i+"_complete"));
            }
        });
        
        console.log("Loaded.");
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
