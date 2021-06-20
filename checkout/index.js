const homeBtn = document.querySelector('.home');
homeBtn.onclick = () => {
  window.location.href = '../home';
}

//fetch products data : getting all the product data, show it on webpage.
root = document.querySelector('.checkout-main');

//getting data
let productsData = {};
let orders = localStorage['orders'].split(",");

//calculate total cost
const adminCost = document.querySelector('.admin-cost');
const totalCost = document.querySelector('.total-cost');
 
//select courier
const courierSelect = document.querySelector('.select');
const couriers = document.querySelector('.couriers');
const selected = document.querySelectorAll('.courier-item');

//Watch Shipping address
const shippingAddressInput = document.querySelector('#address');
let shippingAddress = '';
setInterval(() => {
  shippingAddress = shippingAddressInput.value;
}, 700);
//var storing chosen courier
let courierSelected = '';
//drop-down choice functionality
courierSelect.addEventListener('click', () => {
  if(couriers.className == 'couriers hidden') {
    couriers.className = 'couriers';
  }
  else {
    couriers.className = 'couriers hidden';
  }
})
selected.forEach(element => {
  element.addEventListener('click', () => {
//    courierSelected = element.innerHTML; 
    couriers.className = 'couriers hidden';
    courierSelect.innerHTML = element.innerHTML;
    switch(element.innerHTML) {
      case "SiCepat" :
        courierSelected = "sicepat";
        break;
      case "JNE Regular" :
        courierSelected = "jneregular";
        break;
      case "JNE OKE" :
        courierSelected = "jneoke";
        break;
      case "JNE Express" :
        courierSelected = "jneexpress";
        break;
      case "Wahana" :
        courierSelected = "wahana";
        break;
      case "Go-Jek" :
        courierSelected = "gojek";
        break;
      case "Grab" :
        courierSelected = "grab";
    }
  })
});

//select payment method
const selectedPayment = document.querySelector('.choice');
const paymentListCont = document.querySelector('.payments');
const choices = document.querySelectorAll('.payment-item');
//var storing chosen payment method
let paymentSelected = '';
//drop-down choice functionality
selectedPayment.addEventListener('click', () => {
  if(paymentListCont.className == 'payments hidden') {
    paymentListCont.className = 'payments';
  }
  else {
    paymentListCont.className = 'payments hidden';
  }
choices.forEach(element => {
  element.addEventListener('click', () => {
//    paymentSelected = element.innerHTML;
    paymentListCont.className = 'payments hidden';
    selectedPayment.innerHTML = element.innerHTML;
    switch(element.innerHTML) {
      case "Transfer BNI" :
        paymentSelected = "trfbni";
        break;
      case "Transfer BRI" :
        paymentSelected = "trfbri";
        break;
      case "Transfer BCA" :
        paymentSelected = "trfbca";
        break;
      case "Transfer Mandiri" :
        paymentSelected = "trfmandiri";
        break;
      case "Cash On Delivery (COD)" :
        paymentSelected = "cod";
        break;
    }
  })
})
//fetch products data from DB
})
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
        //fetching all available products.
        let productNode = root.querySelector('#seed').cloneNode(true);

        let docFrag = document.createDocumentFragment();
        
        orders = localStorage['orders'].split(",");
        for(let index = 0; index < productsData.length; index++) {
          productNode = root.querySelector('#seed').cloneNode(true);
          if(orders[index] != 0) {
          productNode.querySelector('.pcs').innerHTML = orders[index];
          productNode.querySelector('.product-name').innerHTML = productsData[index].name;
          productNode.querySelector('.price').innerHTML = "Rp." + productsData[index].price * orders[index];
          productNode.id = index;
          docFrag.append(productNode);
          }
        //Calculate total price
        adminCost.innerHTML =
          parseInt(adminCost.innerHTML) + parseInt(4/100 * productsData[index].price * orders[index]);
        totalCost.innerHTML = 
          parseInt(totalCost.innerHTML) + parseInt(productsData[index].price * orders[index]);
        }
        totalCost.innerHTML = parseInt(totalCost.innerHTML) + parseInt(adminCost.innerHTML);
        adminCost.innerHTML = "Rp. " + adminCost.innerHTML;
        totalCost.innerHTML = "Rp. " + totalCost.innerHTML;
        document.querySelector('#seed').remove();
        root.append(docFrag);
        }).catch(e => {
        console.log(e);
        });

//create transaction record to push into DB as receipt
//get user info
let currentUser = {};
let auth = 'Bearer ' + localStorage['jwt'];
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

        })
/*        .catch(e => {
        console.log(e);
        }); */
//set trigger as pay button. (bayar)
const payBtn = document.querySelector('.pay');
let transaction = {};
let orderArr = [];
let j = 0;
const order = {
  'note' : '',
  'itemcount' : '',
  'product' : '',
  'transaction' : ''
}
payBtn.addEventListener('click', () => {
  //create transaction object
  transaction = {
    'totalprice' : totalCost.innerHTML.split('Rp. ')[1],
    'shippingaddress' : shippingAddress,
    'paymentmethod' : paymentSelected,
    'courier' : courierSelected,
    'users_permissions_user' : currentUser.id
  }
  //failure taming fetch, trying to use some other more forceful method
  fetch('http://localhost:1337/transactions', {
    method: 'POST',
    body: JSON.stringify(transaction),
    headers: {
      'Content-Type': 'application/json',
      'Connection' : 'keep-alive',
//      'Authorization': auth,
      }
    })
    .then(data => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
        }).then(credential => {
        console.log(credential);
        transactionID = credential.id;
        //create order objects
        for(index = 0; index < productsData.length; index++) {
          //something wrong here. order spit out the same thing
//          console.log(order)
          if(localStorage['orders'].split(',')[index] != 0) {
            order.note = "";
            order.itemcount = localStorage['orders'].split(',')[index];
            order.product = productsData[index].id;
            order.transaction = transactionID;
            fetch('http://localhost:1337/orderdetails', {
              method: 'POST',
              body: JSON.stringify(order),
              headers: {
                'Content-Type': 'application/json',
                'Connection' : 'keep-alive',
//                'Authorization': auth,
              }
            })
            .then(data => {
                if (!data.ok) {
                  throw Error(data.status);
                }
                return data.json();
                }).then(credential => {
                console.log(credential);
                }).catch(e => {
                console.log(e);
                });
          }
        }
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        console.log("Hello");
        sleep(1500).then(() => { window.location.href = "../payment"; });

        }).catch(e => {
        console.log(e);
        });
})
  
  