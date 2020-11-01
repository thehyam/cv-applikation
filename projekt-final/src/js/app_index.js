    //alert('hello');
    var edu_box1 = document.getElementById("edu_box1");
    var web_box1 = document.getElementById("web_box1");
    var work_box1 = document.getElementById("work_box1");
    
    //calling functions to load records
    read_edu_data();
    read_web_data();
    read_work_data();

       
    //reading education data
    function read_edu_data() {

        var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_edu.php";

        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true );
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        ajax.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {

                // Response
                var res = JSON.parse(this.responseText);

                var output = "<table><thead>" +
                            "<tr><th>Program</th><th>University</th><th>Degree</th>"+
                            "<th>Start Date</th><th>End Date</th></th><th>Description</th></tr></thead><tbody>";
                //looping through results          
                for (var i in res) {
                    output += "<tr><td>"+ res[i].program +"</td>"+
                                "<td>"+ res[i].university +"</td>"+
                                "<td>"+ res[i].degree +"</td>"+
                                "<td>"+ res[i].year +"</td>"+
                                "<td>"+ res[i].end_date +"</td>"+
                                "<td>"+ res[i].description +"</td></tr>";
                }

                output += "</tbody></table>";
                
                //displaying records
                edu_box1.innerHTML = output;
                    
           }
        };
       
        ajax.send();
    }


    //reading Website data
    function read_web_data() {

        var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_web.php";

        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true );
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        ajax.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {

                // Response
                var res = JSON.parse(this.responseText);

                //displaying records
                var output = "<table><thead>" +
                            "<tr><th>Website</th><th>URL</th><th>Description</th></tr></thead><tbody>";
                
                //looping through results          
                for (var i in res) {
                    //alert(res[i].website);
                    output += "<tr><td>"+ res[i].website +"</td>"+
                                "<td>"+ res[i].url +"</td>"+
                                "<td>"+ res[i].description +"</td></tr>";
                }

                output += "</tbody></table>";
                
                //displaying records
                web_box1.innerHTML = output;
                    
           }
        };
       
        ajax.send();
    }

    //reading Work Life data
    function read_work_data() {

        var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_work.php";

        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true );
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        ajax.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {

                // Response
                var res = JSON.parse(this.responseText);

                var output = "<table><thead>" +
                            "<tr><th>Title</th><th>Company</th><th>Start Date</th>"+
                            "<th>End Date</th>"+
                           "</tr></thead><tbody>";
                
                //looping through results          
                for (var i in res) {
                    //alert(res[i].website);
                    output += "<tr><td>"+ res[i].title +"</td>"+
                                "<td>"+ res[i].company +"</td>"+
                                "<td>"+ res[i].start_date +"</td>"+
                                "<td>"+ res[i].end_date +"</td></tr>";
                }

                output += "</tbody></table>";
                //displaying records
                work_box1.innerHTML = output;
                    
           }
        };
       
        ajax.send();
    }

 