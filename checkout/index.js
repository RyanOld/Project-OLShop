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
adminCost = document.querySelector('.admin-cost');
totalCost = document.querySelector('.total-cost');

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