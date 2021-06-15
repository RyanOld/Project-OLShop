//less/minus buttons(-)

let minBtnArr = document.querySelectorAll(".less");
let moreBtnArr = document.querySelectorAll(".more");

const greetings = document.querySelector('#account-name');
//fetching data from other page/database : user info if logged in.
//getting data on the current user logged in
let auth = 'Bearer ' + localStorage['jwt'];
let currentUser = {};
//fetching currently logged-in user
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
const itemDetail = function(id, quant, price) {
  this.id = id;
  this.quantity = quant;
  this.price = price;
  this.totalPrice = price * quant;
}

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
        console.log(productsdata);

        productsData = productsdata;
        //fetching all available products.
        let productNode = root.querySelector('#seed').cloneNode(true);

        let docFrag = document.createDocumentFragment();
        for(let index = 0; index < productsData.length; index++) {
          productNode = root.querySelector('#seed').cloneNode(true);
 /*
          productNode = document.createElement('li');
          productNode.append(document.createElement('img'));
          productNode.append(document.createElement('div'));
          productNode.querySelector('div').append(document.createElement('h3'));
          productNode.querySelector('div').append(document.createElement('p'));
          productNode.querySelector('div').append(document.createElement('p'));
          productNode.querySelector('div').append(document.createElement('p'));
          productNode.querySelector('div').append(document.createElement('div'));
          productNode.querySelector('div').querySelector('div').append(document.createElement('button'));
          productNode.querySelector('div').querySelector('div').append(document.createElement('p'));
          productNode.querySelector('div').querySelector('div').append(document.createElement('button'));

          document.querySelector('.listed-items-container').append(productNode);
*/
          productNode.querySelector('img').src = "http://localhost:1337" + productsdata[index].picture.formats.thumbnail.url;
          console.log(productNode.src);
          productNode.querySelector('.item-name').innerHTML = productsData[index].name;
          productNode.querySelector('.stock').innerHTML = "Stok : " + productsData[index].stock;
          productNode.querySelector('.price').innerHTML = "Harga : Rp." + productsData[index].price;
          productNode.id = index;
          docFrag.append(productNode);
          console.log(docFrag)
          console.log(index);
        }
        document.querySelector('#seed').remove();
        root.append(docFrag);

        //order item functionality : order count
        minBtnArr = document.querySelectorAll(".less");
        moreBtnArr = document.querySelectorAll(".more");

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

        }).catch(e => {
        console.log(e);
        });

//getting it on screen

//  index++
/*
  '<li class="listed-item">
       <img src= ' + element.picture.formats.thumbnail.url +' alt="">
       <div class="item-info">
          <h3 class = "item-name"   >' + element.name + 'Nama Produk</h3>
          <p class = "desc"         >' + element.description + 'Deskripsi</p>
          <p class = "stock"        >' + element.stock + 'Stok</p>
          <p class = "price"        >' + element.price + 'Harga</p>
          <div class="order-buttons">
            <button class="less">-</button>
            <p class="count">0</p>
            <button class="more">+</button>
          </div>
       </div>
     </li>'
*/
//    });
//  index = 0;