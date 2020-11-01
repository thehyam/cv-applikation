
  //variables declaration
    var uname = document.getElementById("uname");
    var pword = document.getElementById("pword");
    var login_msg = document.getElementById("login_msg");
    var login_btn = document.getElementById("login_btn");
    

    login_btn.onclick = function(e){
        var pwordx = pword.value;
        var unamex = uname.value;

        //validate
        if (unamex && pwordx ){
            //var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/read_edu.php";
            var url = "https://studenter.miun.se/~emha1904/DT173-webbutveckling-III/cv_api/api/login.php";

            var ajax = new XMLHttpRequest();
            ajax.open("POST", url, true );
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            ajax.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200) {

                    // Response
                    var res = JSON.parse(this.responseText);
                    var res_msg = res.message;
                    var res_token = res.token;

                     //when logged in
                    if (res_token) {

                        login_token.value = res_token;
                        login_msg.innerHTML = 'Login Successful';

                        window.location.href = 'records.html?'+res_token;
                        
                    }else{
                       
                        login_msg.innerHTML = res_msg;

                    }
               }
            };

            //data to send
            var datax = { "uname": unamex, "pword": pwordx };
            ajax.send(JSON.stringify(datax));
            
        }else{
            login_msg.innerHTML = 'Please enter login details';

        }
    };
