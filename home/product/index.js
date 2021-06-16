let minBtnArr = document.querySelectorAll(".less");
let moreBtnArr = document.querySelectorAll(".more");

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

const itemName = document.querySelector('.item-name');
const stock = document.querySelector('.stock');
const price = document.querySelector('.price');
const description = document.querySelector('.desc');
const productImage = document.querySelector('.gambar');
productNode = document.querySelector('.product-details');

let productsData = {};

currentProduct = {};
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
//        console.log(productsdata);

        productsData = productsdata;
        //fetching currently selected product. this is tricky. take selected product id from homepage, then
        //copy to localstorage, then display in ./product
        index = localStorage['productno'];
        console.log(index);
        currentProduct = productsData[parseInt(localStorage['productno'])];
        console.log(currentProduct);

        productImage.src = "http://localhost:1337" + productsData[index].picture.url;
        console.log(productImage.src);
        itemName.innerHTML = productsData[index].name;
        stock.innerHTML = "Stock : " + productsData[index].stock;
        price.innerHTML = "Harga : " + productsData[index].price;
        description.innerHTML = productsData[index].description;
        }).catch(e => {
        console.log(e);
        });