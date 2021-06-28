homeBtn = document.querySelector(".home");
homeBtn.onclick = () => {
  window.location.href = '../../home';
}
myProfileBtn = document.querySelector(".myprofile");
myProfileBtn.onclick = () => {
  window.location.href = '../';
}
editBtn = document.querySelector(".edit");
editBtn.onclick = () => {
  window.location.href = './';
}
changePassBtn = document.querySelector(".change-password");
changePassBtn.onclick = () => {
  window.location.href = '../changepass'
}

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  localStorage['currentuser'] = '';
  localStorage['jwt'] = '';
  window.location.href = "../";
})

//populate identity field from data taken from db
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const cellphone = document.querySelector('#cellphone');
const password = document.querySelector('#password');
//edit button clicked = trigger put request
const editProfileBtn = document.querySelector(".edit-profile-btn");

let auth = 'Bearer ' + localStorage['jwt'];
let currentUser = {};

fetch('https://olshop-kel-f-db.herokuapp.com/users/me', {
    method: 'GET',
    headers: {
      /*
      'Content-Type': 'application/json',
      'Connection' : 'keep-alive',
      */
      'Authorization': auth,
      }
    })
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(credential => {
        console.log(credential);
        currentUser = credential;
        localStorage['currentuser'] = currentUser;
        
        firstName.value = currentUser.firstname
        lastName.value = currentUser.lastname
        cellphone.value = currentUser.cellphone;
        let editedProfile = {};
        editProfileBtn.addEventListener("click", (event) => {
          event.preventDefault()
            //create userdata that is going to be changed
            editedProfile = {
              "firstname" : firstName.value,
              "lastname" : lastName.value,
              "cellphone" : cellphone.value
            }
            //try to login with stored username and inputted password for auth ##FAILURE
            //try to just edit with no password input instead
            //fetch put request here
                  fetch('https://olshop-kel-f-db.herokuapp.com/users/' + currentUser.id , {
                    method: 'PUT',
                    body: JSON.stringify(editedProfile),
                    headers: {
                      'Content-Type': 'application/json',
                      'Connection' : 'keep-alive',
                      'Authorization': auth,
                      }
                    })
                    .then(data => {
                        if (!data.ok) {
                          throw Error(data.status);
                        }
                        return data.json();
                        }).then(data => {
                        console.log(data);
                        //go back to profile page
                        window.location.href = "../"
                        }).catch(e => {
                        console.log(e);
                        });
        })
        }).catch(e => {
        console.log(e);
        });



