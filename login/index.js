
//--------------------------------------------------------------------

const identifierInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector('.signup-btn');
/*
signupBtn.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.replace("../signup");
})
*/
localStorage['jwt'] = '';
localStorage['currentuser'] = {};

let identifier = "";
let password = "";

let credential = {};
let options = {};
setInterval(() => {
  identifier = identifierInput.value;
  password = passwordInput.value;
  credential = {
  "identifier" : identifier,
  "password" : password,
  };
  options = {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  'Connection' : 'keep-alive',
  /*
  'Authorization': 'Bearer aqsdqwwqeqwe(jwt)',
  */
  },
  body: JSON.stringify(credential),
};
//  console.log(username);
//  console.log(password);
}, 100);

/*
let xhr = new XMLHttpRequest();
*/
let jwt = "";
var jwtToken = localStorage['jwt'];

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();

  

  fetch('http://localhost:1337/auth/local', options)
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(credential => {
        console.log(credential);
//        alert("success");
        jwt = credential["jwt"];
//        console.log(jwt); //no problem here
        localStorage['jwt'] = jwt; // only strings
        jwtToken = localStorage['jwt'] || '';
//        console.log(jwtToken); //no problem here
        window.location.href = "../home";
        return false; 
        }).catch(e => {
        console.log(e);
        alert("Username/Email atau Password salah! Klik Sign Up jika Anda belum memiliki akun.")
        });
})
