document.getElementById("btn-submit").addEventListener("click", function (e) {
        e.preventDefault();
     
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const dob = document.getElementById("dob").value.trim();
    const address = document.getElementById("address").value.trim();
    const country = document.getElementById("country").value.trim();

    localStorage.setItem("email",(email));
    localStorage.setItem("password",(password));
    

    document.getElementById('error-firstname').innerHTML = '';
    document.getElementById('error-lastname').innerHTML = '';
    document.getElementById('error-email').innerHTML = '';
    document.getElementById('error-password').innerHTML = '';
    document.getElementById('error-phone').innerHTML = '';

    document.getElementById('error-dob').innerHTML = '';
    document.getElementById('error-address').innerHTML = '';
    document.getElementById('error-country').innerHTML = '';


    if (firstname === '' && lastname === '' && email === '' && password === '' && phone === '' && dob === '' && address === '' && country === '') {
        const errorMsg = 'please fill all the fields'
        document.getElementById('error-firstname').innerHTML = errorMsg;
        document.getElementById('error-lastname').innerHTML = errorMsg;
        document.getElementById('error-email').innerHTML = errorMsg;
        document.getElementById('error-password').innerHTML = errorMsg;
        document.getElementById('error-phone').innerHTML = errorMsg;

        document.getElementById('error-dob').innerHTML = errorMsg;
        document.getElementById('error-address').innerHTML = errorMsg;
        document.getElementById('error-country').innerHTML = errorMsg;
        isValid = false;
        return;
    }
    let isValid = true;

    if (firstname === '') {
        document.getElementById('error-firstname').innerHTML = 'please enter first name';
        isValid = false;
    }

    if (lastname === '') {
        document.getElementById('error-lastname').innerHTML = 'please enter last name';
        isValid = false;
    }
    if (email === '') {
        document.getElementById('error-email').innerHTML = 'please enter email';
        isValid = false;
    }
    if (password === '') {
        document.getElementById('error-password').innerHTML = 'please enter password';
        isValid = false;

    }
    const passwordregex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if(!passwordregex.test(password)){
        document.getElementById('error-password').innerHTML = 'Password must be 8-16 characters,include uppercase,number,lowercase,Speacial character and no spaces';
        isValid = false;
    }

    if (phone === '') {
        document.getElementById('error-phone').innerHTML = 'please enter phone';
        isValid = false;
    }

    if (dob === '') {
        document.getElementById('error-dob').innerHTML = 'please enter date of birth';
        isValid = false;
    }
    if (address === '') {
        document.getElementById('error-address').innerHTML = 'please enter address';
        isValid = false;
    }
    if (country === '') {
        document.getElementById('error-country').innerHTML = 'please select country';
        isValid = false;
    }

    if (isValid) {
        alert("Register Successful");
        window.location.href = "../login/login.html"
    }
})

