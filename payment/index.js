//calculate total cost
const adminCost = document.querySelector('.admin-cost');
const totalCost = document.querySelector('.total-cost');
 //fetch products data : getting all the product data, show it on webpage.
root = document.querySelector('#root');
let orders = [];

//clickable payment options
const paymentOptions = document.querySelectorAll(".payment-list h3")
const paymentContainer = document.querySelectorAll(".payment-list div")

for(let index = 0; index < paymentContainer.length ; index++) {
  paymentOptions[index].addEventListener('click', () => {
    if(paymentContainer[index].className == "") {
      paymentContainer[index].className = "hide"
    }
    else {
      paymentContainer[index].className = ""
    }
  })
  console.log(index)
}

fetch('https://olshop-kel-f-db.herokuapp.com/products', {
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
        //console.log(productNode)
        let docFrag = document.createDocumentFragment();
        
        orders = localStorage['orders'].split(",");
        //console.log(orders)
        for(let index = 0; index < productsData.length; index++) {
          productNode = root.querySelector('#seed').cloneNode(true);
          if(orders[index] != 0) {
          productNode.querySelector('.pcs').innerHTML = orders[index];
          productNode.querySelector('.product-name').innerHTML = productsData[index].name;
          productNode.querySelector('.price').innerHTML = "Rp." + productsData[index].price * orders[index];
          productNode.id = index;
          console.log(productNode)
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