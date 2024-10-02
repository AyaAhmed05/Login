
var signupName = document.getElementById('signupName')
var signupEmail = document.getElementById('signupEmail')
var signupPassword = document.getElementById('signupPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')

var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}


var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}



// inputs empty or not
function isEmpty() {
    
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}


// check if email exists
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
            return true;  
        }
    }
    return false;  
}

// Sign up function
function signUp() {
    if (!isEmpty()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    if (!emailRegex.test(signupEmail.value)) {
        document.getElementById('userEmailAlert').innerHTML = '<span class="text-danger m-3">Email should be: name@example.com</span>';
        return false;
    }

    if (isEmailExist()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return false;
    }

    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };

    signUpArray.push(signUp);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
    return true;
}


var emailRegex = /^[a-zA-Z]{2,}@[a-zA-Z]{3,}\.com$/;

// Validate function
function validate(element, regex) { 
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    document.getElementById('userEmailAlert').innerHTML = ''; 
  } else {
    document.getElementById('userEmailAlert').innerHTML = '<span class="text-danger m-3">Email should be: name@example.com</span>';
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}


//input login empty
function isLoginEmpty() {
    
    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}
// login
function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    
    var password = signinPassword.value
    var email = signinEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html')
                
            } else {
                location.replace(baseURL + '/home.html')
                
            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
    
}

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

function logout() {
    localStorage.removeItem('sessionUsername')
}