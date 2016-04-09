/**
  -Known issues:
  - The table sorter is using a string sort instead of a numeric sort as you would expect.
  */

$(document).ready(function () {
    $('#openlogin').popup();
});

$(document).ready(function(){
    $("#login").submit(function(){
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
                alert("login success");
            } else if(obj.status == "false"){
                alert("login failed");
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
        fillTable();
    })
});

$(document).ready(function () {
    $('#openModify').popup();
});

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

function fillTable(){
    var table = document.getElementById("project-table");
    /*var row = table.insertRow(0);
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    var col3 = row.insertCell(2);
    var col4 = row.insertCell(3);
    var col5 = row.insertCell(4);*/
    
    var title = $([
        "<tr class: 'good'>",
        "    <td id='title'>",
        "        <div class='row'>",
        "            <div class='column'>",
        "                <h3><a href='#'>Hyper Light Drifter</a></h3>",
        "                <h5>by <a href='#'>Heart Machine</a></h5>",
        "            </div>",
        "            <div class='column' style='text-align: right'>",
        "                <button class='openModify_open' href='#openModify'>Modify</button>",
        "                <form id='fund'>",
        "                    <input type='number' name='fund' id='fund' placeholder='0' style='width: 20%'>",
        "                    <input type='submit' value='fund'>",
        "                </form>",
        "            </div>",
        "        </div>",
        "        <div class='row'>",
        "            <div class='description'>",
        "                Hyper Light Drifter is a 2D Action RPG in the vein of the best 8-bit and 16-bit classics, with modernized mechanics and designs on a much grander scale.",
        "                <br />Explore a beautiful, vast and ruined world riddled with unknown dangers and lost technologies. Inspired by nightmares and dreams alike.",
        "            </div>",
        "        </div>",
        "        <div class='pledge-bar bg-grey'>",
        "            <div class='pledge-bar bg-green' style='width: 100%'></div>",
        "        </div>",
        "    </td>",
        "    <td class='money'>$53890</td>",
        "    <td class='money'>$24500</td>",
        "    <td class='people'>5322</td>",
        "    <td class='days'>1</td>",
        "</tr>"
    ].join("\n"));
    /*var goal = $("<td class='money'>$53890</td>");
    var funded = $("<td class='money'>$24500</td>");
    var backers = $("<td class='people'>5322</td>");
    var duration = $("<td class='days'>1</td>");
    title.appendTo(col1);
    goal.appendTo(col2);
    funded.appendTo(col3);
    backers.appendTo(col4);
    duration.appendTo(col5);*/
    title.prependTo(table);
}









