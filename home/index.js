//less/minus buttons(-/+)

let minBtnArr = document.querySelectorAll(".less");
let moreBtnArr = document.querySelectorAll(".more");
//make all product listings clickable => go to details of clicked product
let productBtnArr = document.querySelectorAll('.clickable');
//greet user if they signed in
const greetings = document.querySelector('#account-name');
//take count of each product, send it to checkout page
let countBtnArr = document.querySelectorAll('.count');
let productCountArr;
//create transaction JSON to send to database server
let checkoutBasket = {};
//transition to checkout page
checkoutBtn = document.querySelector('.buy-these');
checkoutBtn.onclick = () => {
  window.location.href = '../checkout';
}

//fetching data from other page/database : user info if logged in.
//getting data on the current user logged in
let auth = 'Bearer ' + localStorage['jwt'];
let currentUser = {};
//fetching data of currently logged-in user
fetch('http://localhost:1337/users/me', {
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
//        console.log(credential);
        currentUser = credential;
        localStorage['currentuser'] = currentUser;
        greetings.innerHTML = "Halo, " + currentUser.firstname;
        }).catch(e => {
        console.log(e);
        });


//Page Functionality
/*
const itemDetail = function(id, quant, price) {
  this.id = id;
  this.quantity = quant;
  this.price = price;
  this.totalPrice = price * quant;
}
*/
let customerOrders = [];
                    //[new ItemDetail(1, 2, 2000), new ItemDetail(2, 3, 5000)]
/*
minBtnArr.forEach(element => {
  element.addEventListener("click", () => {
    a = element.parentElement.querySelector(".count");
    a.innerHTML = parseInt(a.innerHTML) - 1;
//    console.log("less2");
  })
});
moreBtnArr.forEach(element => {
  element.addEventListener("click", () => {
    b = element.parentElement.querySelector(".count");
    b.innerHTML = parseInt(b.innerHTML) + 1;
//    console.log("more2");
  })
});
*/
const logoutButton = document.querySelector("#logout-btn");
logoutButton.addEventListener("click", () => {
  localStorage['currentuser'] = '';
  localStorage['jwt'] = '';
  window.location.href = "../home";
})

//change display
loggedInBtns = document.querySelector('.logged-in');
loggedOutBtns = document.querySelector('.logged-out');
if(localStorage['currentuser'] == '') {
  loggedInBtns.remove();
} else {
  loggedOutBtns.remove();
}

//fetch products data : getting all the product data, show it on webpage.
root = document.querySelector('.listed-items-container');

//getting data
let productsData = {};
fetch('http://localhost:1337/products', {
    method: 'GET',
    headers: {
      /*
      'Content-Type': 'application/json',
      'Connection' : 'keep-alive',
      */
//      'Authorization': auth,
      }
    })
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(productsdata => {
        //bruh remember this is a promise. this thing will wait for response from server. 
        //put code that use the var here! not outside!
        
        productsData = productsdata;
        //fetching all available products. (add all products as cards)
        let productNode = root.querySelector('#seed').cloneNode(true);

        let docFrag = document.createDocumentFragment();
        for(let index = 0; index < productsData.length; index++) {
          productNode = root.querySelector('#seed').cloneNode(true);
          productNode.querySelector('img').src = "http://localhost:1337" + productsdata[index].picture.formats.thumbnail.url;
//          console.log(productNode.src);
          productNode.querySelector('.item-name').innerHTML = productsData[index].name;
//          productNode.querySelector('.stock').innerHTML = "Stok : " + productsData[index].stock;
          productNode.querySelector('.price').innerHTML = "Harga : Rp." + productsData[index].price;
          productNode.id = index;
          docFrag.append(productNode);
//          console.log(docFrag)
//          console.log(index);
        }
        document.querySelector('#seed').remove();
        root.append(docFrag);

        //order item functionality : order count
        minBtnArr = document.querySelectorAll(".less");
        moreBtnArr = document.querySelectorAll(".more");

        minBtnArr.forEach(element => {
          element.addEventListener("click", () => {
            a = element.parentElement.querySelector(".count");
            if(parseInt(a.innerHTML) > 0) {
            a.innerHTML = parseInt(a.innerHTML) - 1;
        //    console.log("less2");
            }
          })
        });
        moreBtnArr.forEach(element => {
          element.addEventListener("click", () => {
            b = element.parentElement.querySelector(".count");
            b.innerHTML = parseInt(b.innerHTML) + 1;
        //    console.log("more2");
          })
        });

        //make all product image and name clickable, can open link to detailed description
/*        for(let i = 0; i < productBtnArr.length; i++) {
          productBtnArr[i].onclick = () => {
          window.location.href = './product';
          console.log(i);
          }
        }
*/
        productBtnArr = document.querySelectorAll('.clickable');
        index = 0;
        //used to know which card is click. rather crude method tbh. wanna change? iunno, maybe nah
        productBtnArr.forEach((element) => {
        element.addEventListener('click', () => {
          localStorage['productno'] = parseInt(element.parentElement.parentElement.id);
          
          window.location.href = './product';
//          console.log(element);
          
          });
//          console.log(index);
          index++;
        })
        console.log(productsdata);
        //create array of item counts for enumerating orders.
        countBtnArr = document.querySelectorAll('.count');
        index = 0;
        countBtnArr.forEach((element) => {
//          productCountArr.push(parseInt(element.innerHTML));
          productBtnArr[index] = parseInt(element.innerHTML);
/*
          element.setInterval(() => {
            productCountArr[index] = parseInt(element.innerHTML);
          }, 200);
          */
//          index++;
        })

        console.log(productCountArr);
        //what to do bro i dunno, this one is for replacing old orders to a new one but 
        //if we go backward the current orders will be lost.
        console.log(productCountArr)
        console.log(localStorage['orders'])
        productCountArr = localStorage['orders'].split(',') ;
        //populate the counts on each product from orders in localstorage
        index = 0;
        countBtnArr.forEach(element => {
          element.innerHTML = localStorage['orders'].split(',')[index];
          index++;
        });
        //constantly watch change in order amounts.
        setInterval(() => {
          console.log(localStorage['orders'])
          //fault lies after here
          productCountArr = localStorage['orders'].split(',');
          for(index = 0; index < countBtnArr.length; index++) {
            productCountArr[index] = parseInt(countBtnArr[index].innerHTML);
          } 
          localStorage['orders'] = productCountArr;
        }, 400);

        }).catch(e => {
        console.log(e);
        });

