/**
  -Known issues:
  - The table sorter is using a string sort instead of a numeric sort as you would expect.
  */

$(document).ready(function () {
    $.get( "/php/session.php")
      .done(function( data ) {
        obj = JSON.parse(data);
        var loginPart = document.getElementById("theLogin");
        var createPart = document.getElementById("theCreate");
        var projectPart = document.getElementById("theProject");
        if(obj.logged_in == "true"){
            var text = $("<h5 style='text-align: right; margin-right: 10px'>Welcome <a href='#logout'>" + obj.username + "</a></h5>");
            text.appendTo(loginPart);
            if(obj.type == "administrators"){
                var createButton = $("<div id='create-form' style='margin-top: 10px; margin-left: 20px'>"+
                    "<button class='openCreate_open' href='#openCreate'>Create Project</button></div>");
                var modifyButton = $("<button class='openModify_open' href='#openModify'>Modify</button>");
                var deleteButton = $("<button href='#deleteRow'>Delete</button>");
                createButton.appendTo(createPart);
                modifyButton.appendTo(projectPart);
            } else if(obj.type == "users"){
                var fundButton = $("<form id='fund'>"+
                    "<input type='number' name='fund' id='fund' placeholder='0' style='width: 20%'>"+
                    "<input type='submit' value='fund'></form>");
                fundButton.appendTo(projectPart);
            } else if(obj.type == "entrepreneurs"){
                var createButton = $("<div id='create-form' style='margin-top: 10px; margin-left: 20px'>"+
                    "<button class='openCreate_open' href='#openCreate'>Create Project</button></div>");
                createButton.appendTo(createPart);
            } else {
                alert("hmm?");
            }
        } else if(obj.logged_in == "false"){
            var button = $(
                "<div id='login-form' style='text-align:right; margin-top: 10px; margin-right: 20px'>"+
                "<button class='openlogin_open' href='#openlogin'>Log in</button></div>");
            button.appendTo(loginPart);
        } else {
            alert("why");
        }
    });
});

$(document).ready(function(){
    $("#logout").click(function(){
        
    });             
});

$(document).ready(function () {
    $('#openlogin').popup();
});

$(document).ready(function(){
    $("#login").submit(function(e){
        e.preventDefault();
        var domainName = "";
        if($("#domain").val() == "user"){
            domainName = "/php/users/login.php";
        }
        else if($("#domain").val() == "entre"){
            domainName = "/php/entrepreneurs/login.php";
        }
        else if($("#domain").val() == "admin"){
            domainName = "/php/administrators/login.php";
        }
        $.post(domainName, 
        {
          username: $("#username").val(),
          password: $("#password").val()
        })
        .done(function( data ) {
            //alert(data);
            var obj = JSON.parse(data);
            if(obj.status == "true"){
                $(document).ready(function () {
                    location.reload();
                });
            } else if(obj.status == "false"){
                var words = document.getElementById("loginSheet");
                words.innerHTML = "Sorry, login failed. Please try again."
            }
        });
    });
});

$(document).ready(function () {
    $('#openCreate').popup();
});

$(document).ready(function () {
    $('#create').submit(function(e){
        e.preventDefault();
        var _title = $("#newTitle").val();
        var _description = $("#desc").val();
        var _goal = $("#goal").val();
        var _startDate = $("startDate").val();
        var _duration = $("#dur").val();
        var _category = $("#category").val();
        $.get( "/php/session.php")
          .done(function( data ) {
            obj = JSON.parse(data);
            var domainName;
            if(obj.type == "administrators"){
                domainName = "/php/administrators/insert_project.php";
            } else if(obj.type == "entrepreneurs"){
                domainName = "/php/entrepreneurs/insert_project.php";
            }
            fillTable(obj.type, _title, obj.username, _description, _goal, _startDate, _duration, _category);
            $.post(domainName, 
            {
                title: _title,
                description: _description,
                startdate: _startDate,
                duration: _duration,
                catogories: _category,
                funding: _goal
            }).done(function ( data ){
                
            });
        });
    });
});

$(document).ready(function () {
    $('#openModify').popup();
});

$(document).ready(function () {
    $('#modify').submit(function(e){
        e.preventDefault();
        var title = $("#newTitle").val();
        var description = $("#desc").val();
        var goal = $("#goal").val();
        var funded = $("#funded").val();
        var backers = $("#backers").val();
        var duration = $("#dur").val();
        $.get( "/php/session.php")
          .done(function( data ) {
            obj = JSON.parse(data);
        });
    });
});

function deleteRow(row){
    var el = row;
    var theTitle;
    var index;
    while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName === "TR"){
            index = el.rowIndex;
            break;
        }   
    }
    el = row;
    while(el.parentNode) {
        el = el.parentNode;
        if(el.className == "row"){
            theTitle = el.getElementsByTagName("A")[0].innerHTML;
        }
    }
    document.getElementById("project-table").deleteRow(index-1);
    $.post("/php/projects/delete.php", 
    {
        title: theTitle
    })
    .done( function( data ){
        alert("done");
    });
}

$(document).ready(function() {
    searcher();
    $('.table2').tablesorter();
});

searcher = function() {
    $('#search').keyup(function() {
        var regex = new RegExp($('#search').val(), "i");
        var rows = $('table tr:gt(0)');
        rows.each(function (index) {
            title = $(this).children("#title").html()
                if (title.search(regex) != -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
        });
    });
}

function fillTable(type, title, user, desc, goal, start, dur, cat){
    var table = document.getElementById("project-table");
    
    var titleAdmin = $([
        "<tr class: 'good'>",
        "    <td id='title'>",
        "        <div class='row'>",
        "            <div class='column'>",
        "                <h3><a href='#'>"+title+"</a></h3>",
        "                <h5>by <a href='#'>"+user+"</a></h5>",
        "            </div>",
        "            <div class='column' id='theProject' style='text-align: right'>",
        "                <button class='openModify_open' href='#openModify'>Modify</button>",
        "                <button onclick='deleteRow(this)'>Delete</button>",
        "            </div>",
        "        </div>",
        "        <div class='row'>",
        "            <div class='description'>"+desc,                
        "            </div>",
        "        </div>",
        "        <div class='pledge-bar bg-grey'>",
        "            <div class='pledge-bar bg-green' style='width: 100%'></div>",
        "        </div>",
        "    </td>",
        "    <td class='money'>$0</td>",
        "    <td class='money'>$"+goal+"</td>",
        "    <td class='date'>"+start+"</td>",
        "    <td class='days'>"+dur+"</td>",
        "    <td class='text'>"+cat+"</td>",
        "</tr>"
    ].join("\n"));
    var titleEntre = $([
        "<tr class: 'good'>",
        "    <td id='title'>",
        "        <div class='row'>",
        "            <div class='column'>",
        "                <h3><a href='#'>"+title+"</a></h3>",
        "                <h5>by <a href='#'>"+user+"</a></h5>",
        "            </div>",
        "            <div class='column' id='theProject' style='text-align: right'>",
        "            </div>",
        "        </div>",
        "        <div class='row'>",
        "            <div class='description'>"+desc,
        "            </div>",
        "        </div>",
        "        <div class='pledge-bar bg-grey'>",
        "            <div class='pledge-bar bg-green' style='width: 100%'></div>",
        "        </div>",
        "    </td>",
        "    <td class='money'>$0</td>",
        "    <td class='money'>$"+goal+"</td>",
        "    <td class='date'>"+start+"</td>",
        "    <td class='days'>"+dur+"</td>",
        "    <td class='text'>"+cat+"</td>",
        "</tr>"
    ].join("\n"));
    var titleUser = $([
        "<tr class: 'good'>",
        "    <td id='title'>",
        "        <div class='row'>",
        "            <div class='column'>",
        "                <h3><a href='#'>"+title+"</a></h3>",
        "                <h5>by <a href='#'>"+user+"</a></h5>",
        "            </div>",
        "            <div class='column' id='theProject' style='text-align: right'>",
        "                <form id='fund'>",
        "                   <input type='number' name='fund' id='fund' placeholder='0' style='width: 20%'>",
        "                   <input type='submit' value='fund'>",
        "                </form>",
        "            </div>",
        "        </div>",
        "        <div class='row'>",
        "            <div class='description'>"+desc,
        "            </div>",
        "        </div>",
        "        <div class='pledge-bar bg-grey'>",
        "            <div class='pledge-bar bg-green' style='width: 100%'></div>",
        "        </div>",
        "    </td>",
        "    <td class='money'>$0</td>",
        "    <td class='money'>$"+goal+"</td>",
        "    <td class='date'>"+start+"</td>",
        "    <td class='days'>"+dur+"</td>",
        "    <td class='text'>"+cat+"</td>",
        "</tr>"
    ].join("\n"));
    if(type == "administrators"){
        titleAdmin.prependTo(table);
    } else if(type == "entrepreneurs"){
        titleEntre.prependTo(table);
    } else if(type == "users") {
        titleUser.prependTo(table);
    }
}







