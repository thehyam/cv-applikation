    //variables declaration
    var login_tokenx = document.getElementById("login_tokenx");

    var edit_edu_box = document.getElementById("edit_edu_box");
    var edit_web_box = document.getElementById("edit_web_box");
    var edit_work_box = document.getElementById("edit_work_box");


   /* var edu_view_box = document.getElementById("edu_view_box");
    var web_view_box = document.getElementById("web_view_box");
    var work_view_box = document.getElementById("work_view_box");*/

    var edu_delete_msg = document.getElementById("edu_delete_msg");
    var edu_create_msg = document.getElementById("edu_create_msg");
    var edu_update_msg = document.getElementById("edu_update_msg");

    var web_delete_msg = document.getElementById("web_delete_msg");
    var web_create_msg = document.getElementById("web_create_msg");
    var web_update_msg = document.getElementById("web_update_msg");

    var work_delete_msg = document.getElementById("work_delete_msg");
    var work_create_msg = document.getElementById("workx_create_msg");
    var work_update_msg = document.getElementById("work_update_msg");


    var edu_add_btn = document.getElementById("edu_add_btn");
    var edu_update_btn = document.getElementById("edu_update_btn");

    var web_add_btn = document.getElementById("web_add_btn");
    var web_update_btn = document.getElementById("web_update_btn");

    var work_add_btn = document.getElementById("work_add_btn");
    var work_update_btn = document.getElementById("work_update_btn");
  
    var login_tkx = location.search.substring(1);

    //set token
    login_tokenx.value = login_tkx;

    alert(login_tkx);

    //redirect when not logged
    /*verify_auth(login_tkx);

    function verify_auth(login_tk) {
      
        //alert(login_tk);
        var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/admin_auth.php";
        
        var ajax = new XMLHttpRequest();
        ajax.open("POST", url, true );
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        ajax.onreadystatechange = function() {
           
           if (this.readyState == 4 && this.status == 200) {

                // Response
                var res = JSON.parse(this.responseText);
                var access = res.access;
                //var res_msg = res.message;
                //alert(access);
                //when not logged in
                if (access == 1) {
                     
                }else{
                    window.location.href = 'login.html';   
                }
           }
        };

        //data to send
        var datax = { "token": login_tk };
        ajax.send(JSON.stringify(datax));
    }
*/


    //calling functions to load records
    read_education_data();
    read_website_data();
    read_work_life_data();


    //hide
    edit_edu_box.style.visibility = 'hidden';
    edit_web_box.style.visibility = 'hidden';
    edit_work_box.style.visibility = 'hidden';

    //Reading education data
    function read_education_data() {

        var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_edu.php";

        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true );
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        ajax.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {

                // Response
                var res = JSON.parse(this.responseText);
                var res_msg = res.message;

                //when having error message
                if (res_msg) { 
                    edu_delete_msg.innerHTML = res_msg; 
                    return false;
                }

                //displaying records
                var output = "<table ><thead>" +
                            "<tr><th>Program</th><th>University</th><th>Degree</th>"+
                            "<th>Year</th><th>End Date</th></th><th>Description</th><th>User Action(UA)</th></tr></thead><tbody>";
                //looping through results          
                for (var i in res) {
                    var id = res[i].id;
                    var action = '<input type="button" onclick="preview_edu_record(this)" name='+ id +' class="view_edu_record" value="Update">';
                        action += '<input type="button" onclick="delete_edu_record(this)" name='+ id +' class="del_edu_record" value="Delete">';

                    output += "<tr><td>"+ res[i].program +"</td>"+
                                "<td>"+ res[i].university +"</td>"+
                                "<td>"+ res[i].degree +"</td>"+
                                "<td>"+ res[i].year +"</td>"+
                                "<td>"+ res[i].end_date +"</td>"+
                                "<td>"+ res[i].description +"</td>"+
                                "<td>"+ action +"</td>"+
                                "</tr>";
                }

                
                output += "</tbody></table>";
                
                //displaying records
                document.getElementById("edu_view_box").innerHTML = output;
                    
           }
        };
       
        ajax.send();
    }

    //Preview education record
    function preview_edu_record(el) {
        var id = el.name;
        //validate
        if (id) {
        
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_single_edu.php?id="+id;

            var ajax = new XMLHttpRequest();
            ajax.open("GET", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;
                    /*alert(res);*/
                    if (!res_msg) {
                        var edu_id = res.id;
                        var edu_prog = res.program;
                        var edu_uni = res.university;
                        var edu_deg = res.degree;
                        var edu_year = res.year;
                        var edu_end_date = res.end_date;
                        var edu_desc = res.description ;
                        
                        //show Edu Edit div
                        edu_update_msg.innerHTML = '';
                        edit_edu_box.style.visibility = 'visible';

                        //fill up inputs
                        document.getElementById("edu_id").value = edu_id;
                        document.getElementById("edu_prog").value = edu_prog;
                        document.getElementById("edu_uni").value = edu_uni;
                        document.getElementById("edu_deg").value = edu_deg;
                        document.getElementById("edu_year").value = edu_year;
                        document.getElementById("edu_end_date").value = edu_end_date;
                        document.getElementById("edu_desc").value = edu_desc;
                    
                    }else{
                        edu_delete_msg.innerHTML = res_msg;
                        edit_edu_box.style.visibility = 'hidden';
                        //alert(res_msg);

                    }
                        
               }
            };
            
            ajax.send();

        }
    }

    //Add new education record
    edu_add_btn.onclick = function(){
        
        var login_tokenx = document.getElementById("login_tokenx").value;
        var edu_prog = document.getElementById("edu_progx").value;
        var edu_uni = document.getElementById("edu_unix").value;
        var edu_deg = document.getElementById("edu_degx").value;
        var edu_year = document.getElementById("edu_yearx").value;
        var edu_end_date = document.getElementById("edu_end_datex").value;
        var edu_desc = document.getElementById("edu_descx").value;

        //validate
        if (login_tokenx  && edu_prog &&  edu_uni &&
             edu_deg && edu_year && edu_end_date && edu_desc) {
            //alert(login_tokenx);
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/create_edu.php";
            
            var ajax = new XMLHttpRequest();
            ajax.open("POST", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;

                    //calling functions to load records
                    read_education_data();
                    edu_create_msg.innerHTML = res_msg;
                    edit_edu_box.style.visibility = 'hidden';

               }
            };

            //data to send
            var datax = {
                        "token": login_tokenx,
                        "program": edu_prog,
                        "university": edu_uni,
                        "degree": edu_deg,
                        "year": edu_year,
                        "end_date": edu_end_date,
                        "description": edu_desc                       
                    };

            ajax.send(JSON.stringify(datax));


        }else{
            edu_create_msg.innerHTML = 'Please enter all fields';
        }
    };

    //Update education record 
    edu_update_btn.onclick = function(){
        
        var login_tokenx = document.getElementById("login_tokenx").value;
        var edu_id = document.getElementById("edu_id").value;
        var edu_prog = document.getElementById("edu_prog").value;
        var edu_uni = document.getElementById("edu_uni").value;
        var edu_deg = document.getElementById("edu_deg").value;
        var edu_year = document.getElementById("edu_year").value;
        var edu_end_date = document.getElementById("edu_end_date").value;
        var edu_desc = document.getElementById("edu_desc").value;

        //validate
        if (login_tokenx && edu_id && edu_prog &&  edu_uni &&
             edu_deg && edu_year && edu_end_date && edu_desc) {
            //alert(login_tokenx);
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/update_edu.php";
            
            var ajax = new XMLHttpRequest();
            ajax.open("POST", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;

                    //calling functions to load records
                    read_education_data();
                    edu_update_msg.innerHTML = res_msg;
                    
               }
            };

            //data to send
            var datax = {
                        "token": login_tokenx,
                        "program": edu_prog,
                        "university": edu_uni,
                        "degree": edu_deg,
                        "year": edu_year,
                        "end_date": edu_end_date,
                        "description": edu_desc,                      
                        "id": edu_id                      
                    };

            ajax.send(JSON.stringify(datax));


        }else{
            edu_update_msg.innerHTML = 'Please enter all fields';
        }
    };

    //Delete education record
    function delete_edu_record(el) {
        var id = el.name;
        var login_tokenx = document.getElementById("login_tokenx").value;
        //validate
        if (id) {
        
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/delete_edu.php?id="+id+"&token="+login_tokenx;

            var ajax = new XMLHttpRequest();
            ajax.open("GET", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;
                   
                    read_education_data();
                    edu_delete_msg.innerHTML = res_msg;
                    edit_edu_box.style.visibility = 'hidden';
       
               }
            };
            
            ajax.send();

        }
    }

    //Reading Website data
    function read_website_data() {

        var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_web.php";

        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true );
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        ajax.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {

                // Response
                var res = JSON.parse(this.responseText);
                var res_msg = res.message;

                //when having error message
                if (res_msg) { 
                    web_delete_msg.innerHTML = res_msg; 
                    return false;
                }

                //displaying records
                var output = "<table ><thead>" +
                            "<tr><th>Website</th><th>URL</th><th>Description</th>"+
                            "<th>User Action(UA)</th></tr></thead><tbody>";
                //looping through results          
                for (var i in res) {
                    var id = res[i].id;
                    var action = '<input type="button" onclick="preview_web_record(this)" name='+ id +' class="view_web_record" value="Update">';
                      action += '<input type="button" onclick="delete_web_record(this)" name='+ id +' class="del_web_record" value="Delete">';

                    output += "<tr><td>"+ res[i].website +"</td>"+
                                "<td>"+ res[i].url +"</td>"+
                                "<td>"+ res[i].description +"</td>"+
                                "<td>"+ action +"</td>"+
                                "</tr>";
                }

                
                output += "</tbody></table>";
                
                //displaying records
                document.getElementById("web_view_box").innerHTML = output;
                    
           }
        };
       
        ajax.send();
    }

    //Preview Website record
    function preview_web_record(el) {
        var id = el.name;
        //validate
        if (id) {
        
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_single_web.php?id="+id;

            var ajax = new XMLHttpRequest();
            ajax.open("GET", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;
                    /*alert(res);*/
                    if (!res_msg) {
                        var web_id = res.id;
                        var web_website = res.website;
                        var web_url = res.url;
                        var web_desc = res.description;
                        
                        //show Web Edit div
                        web_update_msg.innerHTML = '';
                        edit_web_box.style.visibility = 'visible';

                        //fill up inputs
                        document.getElementById("web_id").value = web_id;
                        document.getElementById("web_website").value = web_website;
                        document.getElementById("web_url").value = web_url;
                        document.getElementById("web_desc").value = web_desc;
                        
                    
                    }else{
                        web_delete_msg.innerHTML = res_msg;
                        edit_web_box.style.visibility = 'hidden';
                        //alert(res_msg);

                    }
                        
               }
            };
            
            ajax.send();

        }
    }

    //Add new Website record
    web_add_btn.onclick = function(){
        
        var login_tokenx = document.getElementById("login_tokenx").value;
        var web_website = document.getElementById("web_websitex").value;
        var web_url = document.getElementById("web_urlx").value;
        var web_desc = document.getElementById("web_descx").value;
        
        //validate
        if (login_tokenx && web_website && web_url && web_desc) {
            //alert(login_tokenx);
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/create_web.php";
            
            var ajax = new XMLHttpRequest();
            ajax.open("POST", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;

                    //calling functions to load records
                    read_website_data();
                    web_create_msg.innerHTML = res_msg;
                    edit_web_box.style.visibility = 'hidden';

               }
            };

            //data to send
            var datax = {
                        "token": login_tokenx,
                        "website": web_website,
                        "url": web_url,
                        "description": web_desc                        
                    };

            ajax.send(JSON.stringify(datax));


        }else{
            web_create_msg.innerHTML = 'Please enter all fields';
        }
    };

    //Update Website record 
    web_update_btn.onclick = function(){
        
        var login_tokenx = document.getElementById("login_tokenx").value;
        var web_id = document.getElementById("web_id").value;
        var web_website = document.getElementById("web_website").value;
        var web_url = document.getElementById("web_url").value;
        var web_desc = document.getElementById("web_desc").value;
        

        //validate
        if (login_tokenx && web_id && web_website && web_url && web_desc) {
            //alert(login_tokenx);
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/update_web.php";
            
            var ajax = new XMLHttpRequest();
            ajax.open("POST", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;

                    //calling functions to load records
                    read_website_data();
                    web_update_msg.innerHTML = res_msg;
                    
               }
            };

            //data to send
            var datax = {
                        "token": login_tokenx,
                        "website": web_website,
                        "url": web_url,
                        "description": web_desc,                     
                        "id": web_id                      
                    };

            ajax.send(JSON.stringify(datax));


        }else{
            web_update_msg.innerHTML = 'Please enter all fields';
        }
    };

    //Delete Website record
    function delete_web_record(el) {
        var id = el.name;
        var login_tokenx = document.getElementById("login_tokenx").value;
        //validate
        if (id) {
        
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/delete_web.php?id="+id+"&token="+login_tokenx;

            var ajax = new XMLHttpRequest();
            ajax.open("GET", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;
                   
                    read_website_data();
                    web_delete_msg.innerHTML = res_msg;
                    edit_web_box.style.visibility = 'hidden';
       
               }
            };
            
            ajax.send();

        }
    }


    //Reading Work data
    function read_work_life_data() {

        var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_work.php";

        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true );
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        ajax.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {

                // Response
                var res = JSON.parse(this.responseText);
                var res_msg = res.message;

                //when having error message
                if (res_msg) { 
                    work_delete_msg.innerHTML = res_msg; 
                    return false;
                }

                //displaying records
                var output = "<table ><thead>" +
                            "<tr><th>Title</th><th>Company</th><th>Start Date</th><th>End Date</th>"+
                            "<th>User Action(UA)</th></tr></thead><tbody>";
                //looping through results          
                for (var i in res) {
                    var id = res[i].id;
                    var action = '<input type="button" onclick="preview_work_record(this)" name='+ id +' class="view_work_record" value="Update">';
                       action += '<input type="button" onclick="delete_work_record(this)" name='+ id +' class="del_work_record" value="Delete">';

                    output += "<tr><td>"+ res[i].title +"</td>"+
                                "<td>"+ res[i].company +"</td>"+
                                "<td>"+ res[i].start_date +"</td>"+
                                "<td>"+ res[i].end_date +"</td>"+
                                "<td>"+ action +"</td>"+
                                "</tr>";
                }

                
                output += "</tbody></table>";
                
                //displaying records
                document.getElementById("work_view_box").innerHTML = output;
                    
           }
        };
       
        ajax.send();
    }

    //Preview Work record
    function preview_work_record(el) {
        var id = el.name;
        //validate
        if (id) {
        
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_single_work.php?id="+id;

            var ajax = new XMLHttpRequest();
            ajax.open("GET", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;
                    /*alert(res);*/
                    if (!res_msg) {
                        var work_id = res.id;
                        var work_title = res.title;
                        var work_company = res.company;
                        var work_start_date = res.start_date;
                        var work_end_date = res.end_date;
                        
                        //show Web Edit div
                        work_update_msg.innerHTML = '';
                        edit_work_box.style.visibility = 'visible';

                        //fill up inputs
                        document.getElementById("work_id").value = work_id;
                        document.getElementById("work_title").value = work_title;
                        document.getElementById("work_company").value = work_company;
                        document.getElementById("work_start_date").value = work_start_date;
                        document.getElementById("work_end_date").value = work_end_date;
                        
                    
                    }else{
                        work_delete_msg.innerHTML = res_msg;
                        edit_work_box.style.visibility = 'hidden';
                        //alert(res_msg);

                    }
                        
               }
            };
            
            ajax.send();

        }
    }

    //Add new Work record
    work_add_btn.onclick = function(){
        
        var login_tokenx = document.getElementById("login_tokenx").value;
        var work_title = document.getElementById("work_titlex").value;
        var work_company = document.getElementById("work_companyx").value;
        var work_start_date = document.getElementById("work_start_datex").value;
        var work_end_date = document.getElementById("work_end_datex").value;
        
        //validate
        if (login_tokenx && work_title && work_company && work_start_date && work_end_date) {
            //alert(login_tokenx);
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/create_work.php";
            
            var ajax = new XMLHttpRequest();
            ajax.open("POST", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
                
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;

                    //calling functions to load records
                    read_work_life_data();
                    work_create_msg.innerHTML = res_msg;
                    edit_work_box.style.visibility = 'hidden';

               }
            };

            //data to send
            var datax = {
                        "token": login_tokenx,
                        "title": work_title,
                        "company": work_company,
                        "start_date": work_start_date,
                        "end_date": work_end_date                         
                    };

            ajax.send(JSON.stringify(datax));


        }else{
            work_create_msg.innerHTML = 'Please enter all fields';
        }
    };

    //Update Work record 
    work_update_btn.onclick = function(){
        
        var login_tokenx = document.getElementById("login_tokenx").value;
        var work_id = document.getElementById("work_id").value;
        var work_title = document.getElementById("work_title").value;
        var work_company = document.getElementById("work_company").value;
        var work_start_date = document.getElementById("work_start_date").value;
        var work_end_date = document.getElementById("work_end_date").value;
        

        //validate
        if (login_tokenx && work_id && work_title && work_company && work_start_date && work_end_date) {
            //alert(login_tokenx);
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/update_work.php";
            
            var ajax = new XMLHttpRequest();
            ajax.open("POST", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;

                    //calling functions to load records
                    read_work_life_data();
                    work_update_msg.innerHTML = res_msg;
                    
               }
            };

            //data to send
            var datax = {
                        "token": login_tokenx,
                        "title": work_title,
                        "company": work_company,
                        "start_date": work_start_date,
                        "end_date": work_end_date,                   
                        "id": work_id                      
                    };

            ajax.send(JSON.stringify(datax));


        }else{
            work_update_msg.innerHTML = 'Please enter all fields';
        }
    };

    //Delete Work record
    function delete_work_record(el) {
        var id = el.name;
        var login_tokenx = document.getElementById("login_tokenx").value;
        //validate
        if (id) {
        
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/delete_work.php?id="+id+"&token="+login_tokenx;

            var ajax = new XMLHttpRequest();
            ajax.open("GET", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;
                   
                    read_work_life_data();
                    work_delete_msg.innerHTML = res_msg;
                    edit_work_box.style.visibility = 'hidden';
       
               }
            };
            
            ajax.send();

        }
    }



