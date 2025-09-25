document.getElementById("btn-login").addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const cnfpass = document.getElementById("cnfpass").value.trim();

    let isValid = true;

    document.getElementById("error-email").innerHTML = '';
    document.getElementById("error-password").innerHTML = '';
    document.getElementById("error-cnfpass").innerHTML = '';

const passwordregex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const emailregex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if(email === ""){
        document.getElementById('error-email').innerHTML='Please enter email';
        isValid = false;
    } 

    if(password ===""){
        document.getElementById('error-password').innerHTML='Please enter password';
        isValid = false;

    }
    if(!passwordregex.test(password)){
        document.getElementById('error-password').innerHTML = 'Password must be 8-16 characters,include uppercase,lowercase,number,Special character and no spaces';
        isValid = false;
    }

    if(!emailregex.test(email)){
        document.getElementById('error-email').innerHTML = 'Invalid email';
        isValid = false;
    }

    if (email === '' || password === '' || cnfpass === '') {
        const errorMsg = 'Please fill all the fields';
        if (email === '') document.getElementById("error-email").innerHTML = errorMsg;
        if (password === '') document.getElementById("error-password").innerHTML = errorMsg;
        if (cnfpass === '') document.getElementById("error-cnfpass").innerHTML = errorMsg;
         return;
    }
  



    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (!storedEmail && !storedPassword) {
        document.getElementById("error-email").innerHTML = "No registered user found.";
        isValid = false;
    } else {

        if (email !== storedEmail) {
            document.getElementById("error-email").innerHTML = "Email does not match.";
            isValid = false;
        }

        if (password !== storedPassword) {
            document.getElementById("error-password").innerHTML = "Password does not match.";
            isValid = false;
        }

    }
     if
      (cnfpass !== storedPassword) {
         document.getElementById("error-cnfpass").innerHTML = "Both password should be same "
    }

    if (isValid) {
        alert("Login Successful");
        window.location.href = "../dashboard/dashboard.html";
    }
});
