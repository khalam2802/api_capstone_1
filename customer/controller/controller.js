// const getEle = (id) => document.getElementById(id);

// export const renderList = (phoneList) => {
//     let content = "";
//     phoneList.forEach((ele) => {
//       content += ` <div class="col-lg-3 col-md-6">
//       <div class="card text-black h-100">
//       <div class="content-overlay"></div>
//         <img src=${ele.img} class="card-img" alt="Phone Image" />
//         <div class="content-details fadeIn-top">
//         <h3 class ='pb-5'>Specifications</h3>
//               <div class="d-flex justify-content-start py-1">
//             <span class='text-light'><b>Screen:</b></span>
//             <span class='text-light'>&nbsp ${ele.screen}</span>
//           </div>
//           <div class="d-flex justify-content-start py-1">
//             <span class='text-light'><b>Back Camera:</b> ${ele.backCamera}</span>
//           </div>
//           <div class="d-flex justify-content-start py-1">
//             <span class='text-light'><b>Front Camera:</b> ${
//               ele.frontCamera
//             }</span>
//           </div>
  
//           <p class = 'pt-5'><u>click here for more details</u></p>
//         </div>
//         <div class="card-body">
//           <div class="text-center">
//             <h5 class="card-title pt-3">${ele.name}</h5>
//             <span class="text-muted mb-2">$${ele.price}</span>
//             <span class="text-danger"><s>$${Number(ele.price) + 300}</s></span>
//           </div>
//           <div class="mt-3 brand-box text-center">
//             <span>${ele.type}</span>
//           </div>
//           <div class="d-flex justify-content-start pt-3">
//             <span><b>Description:</b> ${ele.desc}</span>
//           </div>
//           <div class="d-flex justify-content-between pt-3">
//             <div class="text-warning">
//                 <i class="fa fa-star"></i>
//                 <i class="fa fa-star"></i>
//                 <i class="fa fa-star"></i>
//                 <i class="fa fa-star"></i>
//                 <i class="fa fa-star"></i>
//             </div>
//             <span class = 'text-success'><b>In Stock</b></span>
//           </div>
//           <button type="button" class="btn btn-block w-50" onclick ="btnAddToCart('${
//             ele.id
//           }')">Add to cart</button>
//         </div>
//       </div>
//     </div>`;
//     });
//     getEle("phoneList").innerHTML = content;
//   };

// export const renderCart = (cart) => {
//     let content = "";
//     cart.forEach((item) => {
//       content += `<div class="product">
//     <div class="product__1">
//       <div class="product__thumbnail">
//         <img src=${item.product.img} 
//           alt="Italian Trulli">
//       </div>
//       <div class="product__details">
//         <div style="margin-bottom: 8px;"><b>${item.product.name}</b></div>
//         <div style="font-size: 90%;">Screen: <span class="tertiary">${
//           item.product.screen
//         }</span></div>
//         <div style="font-size: 90%;">Back Camera: <span class="tertiary">${
//           item.product.backCamera
//         }</span></div>
//         <div style="font-size: 90%;">Front Camera: <span class="tertiary">${
//           item.product.frontCamera
//         }</span></div>
//         <div style="margin-top: 8px;"><a href="#!" onclick ="btnRemove('${
//           item.product.id
//         }')">Remove</a></div>
//       </div>
//     </div>
//     <div class="product__2">
//       <div class="qty">
//         <span><b>Quantity:</b> </span> &nbsp &nbsp
//         <span class="minus bg-dark" onclick ="btnMinus('${
//           item.product.id
//         }')">-</span>
//         <span class="quantityResult mx-2">${item.quantity}</span>
//         <span class="plus bg-dark" onclick ="btnAdd('${
//           item.product.id
//         }')">+</span>
//       </div>
//       <div class="product__price"><b>$${
//         item.quantity * item.product.price
//       }</b></div>
//     </div>
//     </div>`;
//     });
//     getEle("cartList").innerHTML = content;
  
//     // Đếm số lượng item trong cart
//     let cartCount = 0;
//     cart.forEach((item) => {
//       cartCount += item.quantity;
//     });
//     const subTotal = tinhTongTien(cart);
//     // if(subTotal > 0){
//     //   shipping = 10
//     // }else{
//     //   shipping = 0
//     // }
//     //subTotal > 0 ? 10 : 0;
//     getEle("cartCount").innerHTML = cartCount;
//     getEle("priceTotal").innerHTML = "$" + subTotal;
//     // console.log('subTotal: ', subTotal);
//   };