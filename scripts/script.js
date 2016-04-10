/**
  -Known issues:
  - The table sorter is using a string sort instead of a numeric sort as you would expect.
  */

function fillTable(){
    $.get("/php")
    .done(function( data ) {
        var obj = JSON.parse(data);
        /*for(){
            addRow();
        }*/
    });
}

$(document).ready(function () {
    $.get( "/php/session.php")
      .done(function( data ) {
        obj = JSON.parse(data);
        var loginPart = document.getElementById("theLogin");
        var createPart = document.getElementById("theCreate");
        var projectPart = document.getElementById("theProject");
        if(obj.logged_in == "true"){
            var text = $("<h5 style='text-align: right; margin-top: 10px; margin-right: 20px'>Welcome <a href='#' onclick='logout()'>" + obj.username + "</a></h5>");
            text.appendTo(loginPart);
            if(obj.type == "administrators"){
                var createButton = $("<div id='create-form' style='margin-top: 10px; margin-right: 20px'>"+
                    "<button class='openCreate_open' href='#openCreate'>Create Project</button></div>");
                var modifyButton = $("<button class='openModify_open' onclick='toModify(this)'>Modify</button>");
                var deleteButton = $("<button onclick='deleteRow(this)' style='margin-left: 10px'>Delete</button>");
                createButton.appendTo(createPart);
                modifyButton.appendTo(projectPart);
                deleteButton.appendTo(projectPart);
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
        } else {
            var button = $(
                "<div id='login-form' style='text-align:right; margin-top: 10px; margin-right: 20px'>"+
                "<button class='openlogin_open' href='#openlogin'>Log in</button></div>");
            button.appendTo(loginPart);
        }
    });
});

function logout() {
    alert("logging out");
        location.reload();
}

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
    $('#openRegister').popup();
});

$(document).ready(function () {
    $('#register').submit(function(e){
        var domainName = "";
        if($("#domain").val() == "user"){
            domainName = "/php/users/create.php";
        }
        else if($("#domain").val() == "entre"){
            domainName = "/php/entrepreneurs/create.php";
        }
        else if($("#domain").val() == "admin"){
            domainName = "/php/administrators/create.php";
        }
        $.post(domainName, 
        {
          username: $("#username").val(),
          password: $("#password").val()
        })
        .done(function( data ) {
            location.reload();
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
        var _startDate = $("#create #startDate").val();
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
            addRow(obj.type, _title, obj.username, _description, _goal, _startDate, _duration, _category);
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
        $("#openCreate").popup('hide');
    });
});

function toModify(row){
    el = row;
    var theTitle;
    while(el.parentNode) {
        el = el.parentNode;
        if(el.className == "row"){
            theTitle = el.getElementsByTagName("A")[0].innerText;
        }
    }
    // query data for the other info, then create ModPopUp from info
    setUpModPopup(theTitle, "test lalala", "90", "100", "2000-11-11", "6", "Movie");
    $('#modify').submit(function(e){
        e.preventDefault();
        var title = $("#newTitle").val();
        var description = $("#desc").val();
        var goal = $("#goal").val();
        var fundRem = $("#fund").val();
        var startDate = $("#modify #startDate").val();
        var duration = $("#dur").val();
        var category = $("category").val();
        $.post("/php/administrators/modify.php", 
        {
            title: theTitle
        }).done(function(data){
            location.reload();
        });
    });
}

$(document).ready(function () {
    $('#openModify').popup();
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

function setUpModPopup(title, desc, fund, goal, start, dur, cat){
    var thePop = document.getElementById('openModify');
    var list = thePop.getElementsByClassName('toEdit');
    for(i = 0; i < list.length; i++){
        if(list[i].id == ('newTitle')){
            list[i].setAttribute('value', title);
        } else if(list[i].id == ('desc')){
            list[i].innerHTML = desc;
        } else if(list[i].id == ('category')){
            list[i].setAttribute('value', cat);
        } else if(list[i].id == ('fund')){
            list[i].setAttribute('value', fund);
        } else if(list[i].id == ('goal')){
            list[i].setAttribute('value', goal);
        } else if(list[i].id == ('startDate')){
            list[i].setAttribute('value', start);
        } else if(list[i].id == ('dur')){
            list[i].setAttribute('value', dur);
        }
    }
}

function addRow(type, title, user, desc, goal, start, dur, cat){
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
        "                <button class='openModify_open' onclick='toModify(this)'>Modify</button>",
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
        "    <td class='money'>$"+goal+"</td>",
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
        "    <td class='money'>$"+goal+"</td>",
        "    <td class='money'>$"+goal+"</td>",
        "    <td class='date'>"+start+"</td>",
        "    <td class='days'>"+dur+"</td>",
        "    <td class='text'>"+cat+"</td>",
        "</tr>"
    ].join("\n"));
    var titleDef = $([
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
        "    <td class='money'>$"+goal+"</td>",
        "    <td class='money'>$"+goal+"</td>",
        "    <td class='date'>"+start+"</td>",
        "    <td class='days'>"+dur+"</td>",
        "    <td class='text'>"+cat+"</td>",
        "</tr>"
    ].join("\n"));
    if(type == "administrators"){
        titleAdmin.prependTo(table);
    } else if(type == "users") {
        titleUser.prependTo(table);
    } else {
        titleEntre.prependTo(table);
    }
}







