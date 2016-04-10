/**
  -Known issues:
  - The table sorter is using a string sort instead of a numeric sort as you would expect.
  */

function fillTable(type){
    $.get("/php/all_projects.php")
    .done(function( data ) {
        var obj = JSON.parse(data);
        $.each(obj, function(index, value){
                    //type, title, user, desc, goal, start, dur, cat
            addRow(type, value.title, value.e_name, value.description, value.remaining_amount,
                    value.amount, value.start_date, value.duration, value.category);
        });
    });
}

/*var modifyButton = $("<button class='openModify_open' onclick='toModify(this)'>Modify</button>");
var deleteButton = $("<button onclick='deleteRow(this)' style='margin-left: 10px'>Delete</button>");
modifyButton.appendTo(projectPart);
deleteButton.appendTo(projectPart);
var fundButton = $("<form id='fund'>"+
    "<input type='number' name='fund' id='fund' placeholder='0' style='width: 20%'>"+
    "<input type='submit' value='fund'></form>");
fundButton.appendTo(projectPart);*/

$(document).ready(function () {
    $.get( "/php/session.php")
      .done(function( data ) {
        obj = JSON.parse(data);
        var loginPart = document.getElementById("theLogin");
        var createPart = document.getElementById("theCreate");
        fillTable(obj.type);
        if(obj.logged_in == "true"){
            var text = $("<h5 style='text-align: right; margin-top: 10px; margin-right: 20px'>Welcome <a href='#' onclick='logout()'>" + obj.username + "</a></h5>");
            text.appendTo(loginPart);
            if(obj.type == "administrators" || obj.type == "entrepreneurs"){
                var createButton = $("<div id='create-form' style='margin-top: 10px; margin-right: 20px'>"+
                    "<button class='openCreate_open' href='#openCreate'>Create Project</button></div>");
                createButton.appendTo(createPart);
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
    $.post("/php/logout.php")
    .done(function( data ){
        location.reload();
    });    
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
            var obj = JSON.parse(data);
            if(obj.status == "true"){
                location.reload();
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
        if($("#rDomain").val() == "user"){
            domainName = "/php/administrators/create_users.php";
        }
        else if($("#rDomain").val() == "entre"){
            domainName = "/php/administrators/create_entrepreneurs.php";
        }
        else if($("#rDomain").val() == "admin"){
            domainName = "/php/administrators/create_administrators.php";
        }
        $.post(domainName, 
        {
          username: $("#rUsername").val(),
          password: $("#rPassword").val()
        })
        .done(function( data ) {
            //location.reload();
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
        var _goal = $("#theGoal").val();
        var _startDate = $("#create #startDate").val();
        var _duration = $("#dur").val();
        var _category = $("#theCategory").val();
        $.get("/php/session.php")
        .done(function (data){
            var obj = JSON.parse(data);
            addRow(obj.type, _title, obj.username, _description, _goal, _startDate, _duration, _category);
            $.post("/php/entrepreneurs/insert_project.php", 
            {
                title: _title,
                description: _description,
                start_date: _startDate,
                duration: _duration,
                category: _category,
                amount: _goal,
                remaining_amount: _goal
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
    $.post("/php/users/search.php", 
    {
        title: theTitle
    }).done(function(data){
        var val = JSON.parse(data);
        if(val.length == 1){
            var obj = val[0];
            //title, desc, fund, goal, start, dur, cat
            setUpModPopup(theTitle, obj.description, obj.remaining_amount, obj.amount, obj.start_date, obj.duration, obj.category);
        }
    });
    // query data for the other info, then create ModPopUp from info
    $('#modify').submit(function(e){
        e.preventDefault();
        var _title = $("#mTitle").val();
        var _description = $("#mDesc").val();
        var _goal = $("#mGoal").val();
        var _fundRem = $("#mFund").val();
        var _startDate = $("#modify #mStartDate").val();
        var _duration = $("#mDur").val();
        var _category = $("#mCategory").val();
        $.post("/php/administrators/modify_project.php", 
        {
            original_title: theTitle,
            title: _title,
            description: _description,
            remaining_amount: _fundRem,
            amount: _goal,
            start_date: _startDate,
            duration: _duration,
            category: _category
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
    $.post("/php/administrators/delete_project.php", 
    {
        title: theTitle
    })
    .done( function( data ){
        
    });
}

$(document).ready(function () {
    $('#openSearch').popup();
});

$(document).ready(function(){
    $("#search").submit(function(e){
        e.preventDefault();
        $.post("/php/users/search.php", 
        {
            title: $("#sTitle").val(),
            category: $("#sCategory").val(),
            amount: $("#sGoal").val(),
            remaining_amount: $("#sFund").val(),
            e_name: $("#eName").val()
        }).done(function( data ) {
            var obj = JSON.parse(data);
            var titles = [];
            $.each(obj, function(index, value){
               titles.push(value.title); 
            });
            var rows = $('table tr:gt(0)');
            rows.each(function (index, value) {
                title = value.getElementsByTagName("A")[0].innerHTML;
                var isSearch = false;
                for(i=0; i<titles.length; i++){
                    if(title == titles[i]){
                        isSearch = true;
                    }
                }
                if (isSearch) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
        $("#openSearch").popup('hide');
    });
});

$(document).on("submit", "#userFund", function(e){
    e.preventDefault();
    var el = this;
    var _amt = el.getElementsByTagName('input')[0].value;
    var _title;
    while(el.parentNode) {
        el = el.parentNode;
        if(el.className == "row"){
            _title = el.getElementsByTagName("A")[0].innerHTML;
        }
    }
    //var _amt = $("#toFund").val();
    $.post("/php/users/funding.php", 
    {
        project_title: _title,
        amount_pledged: _amt
    }).done(function(data){
        location.reload();
    });
});

function setUpModPopup(title, desc, fund, goal, start, dur, cat){
    var thePop = document.getElementById('openModify');
    var list = thePop.getElementsByClassName('toEdit');
    for(i = 0; i < list.length; i++){
        if(list[i].id == ('mTitle')){
            list[i].setAttribute('value', title);
        } else if(list[i].id == ('mDesc')){
            list[i].innerHTML = desc;
        } else if(list[i].id == ('mCategory')){
            list[i].setAttribute('value', cat);
        } else if(list[i].id == ('mFund')){
            list[i].setAttribute('value', fund);
        } else if(list[i].id == ('mGoal')){
            list[i].setAttribute('value', goal);
        } else if(list[i].id == ('mStartDate')){
            list[i].setAttribute('value', start);
        } else if(list[i].id == ('mDur')){
            list[i].setAttribute('value', dur);
        }
    }
}

function addRow(type, title, user, desc, rem, goal, start, dur, cat){
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
        "    <td class='money'>$"+rem+"</td>",
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
        "                <form id='userFund'>",
        "                   <input type='number' name='toFund' id='toFund' min='1' value='1' placeholder='1' style='width: 20%'>",
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
        "    <td class='money'>$"+rem+"</td>",
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
        "    <td class='money'>$"+rem+"</td>",
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
        titleDef.prependTo(table);
    }
}







