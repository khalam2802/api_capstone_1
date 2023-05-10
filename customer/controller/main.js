const getEle = (id) => document.getElementById(id);

import { Service } from "../services/phoneService.js";
import { CartItem } from "../model/cartItem.js";
import { Product } from "../model/product.js";
// import { renderList } from "./controller.js";
// import { renderCart } from "./controller.js";

const service = new Service();
let cart = [];

// render Phonelist
const renderList = (phoneList) => {
  let content = "";
  phoneList.forEach((ele) => {
    content += ` <div class="col-lg-3 col-md-6">
    <div class="card text-black h-100">
    <div class="content-overlay"></div>
      <img src=${ele.img} class="card-img" alt="Phone Image" />
      <div class="content-details fadeIn-top">
      <h3 class ='pb-5'>Specifications</h3>
            <div class="d-flex justify-content-start py-1">
          <span class='text-light'><b>Screen:</b></span>
          <span class='text-light'>&nbsp ${ele.screen}</span>
        </div>
        <div class="d-flex justify-content-start py-1">
          <span class='text-light'><b>Back Camera:</b> ${ele.backCamera}</span>
        </div>
        <div class="d-flex justify-content-start py-1">
          <span class='text-light'><b>Front Camera:</b> ${
            ele.frontCamera
          }</span>
        </div>

        <p class = 'pt-5'><u>click here for more details</u></p>
      </div>
      <div class="card-body">
        <div class="text-center">
          <h5 class="card-title pt-3">${ele.name}</h5>
          <span class="text-muted mb-2">$${ele.price}</span>
          <span class="text-danger"><s>$${Number(ele.price) + 300}</s></span>
        </div>
        <div class="mt-3 brand-box text-center">
          <span>${ele.type}</span>
        </div>
        <div class="d-flex justify-content-start pt-3">
          <span><b>Description:</b> ${ele.desc}</span>
        </div>
        <div class="d-flex justify-content-between pt-3">
          <div class="text-warning">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
          </div>
          <span class = 'text-success'><b>In Stock</b></span>
        </div>
        <button type="button" class="btn btn-block w-50" onclick ="btnAddToCart('${
          ele.id
        }')">Add to cart</button>
      </div>
    </div>
  </div>`;
  });
  getEle("phoneList").innerHTML = content;
};

// renderCart
const renderCart = (cart) => {
  let content = "";
  cart.forEach((item) => {
    content += `<div class="product">
  <div class="product__1">
    <div class="product__thumbnail">
      <img src=${item.product.img} 
        alt="Italian Trulli">
    </div>
    <div class="product__details">
      <div style="margin-bottom: 8px;"><b>${item.product.name}</b></div>
      <div style="font-size: 90%;">Screen: <span class="tertiary">${
        item.product.screen
      }</span></div>
      <div style="font-size: 90%;">Back Camera: <span class="tertiary">${
        item.product.backCamera
      }</span></div>
      <div style="font-size: 90%;">Front Camera: <span class="tertiary">${
        item.product.frontCamera
      }</span></div>
      <div style="margin-top: 8px;"><a href="#!" onclick ="btnRemove('${
        item.product.id
      }')">Remove</a></div>
    </div>
  </div>
  <div class="product__2">
    <div class="qty">
      <span><b>Quantity:</b> </span> &nbsp &nbsp
      <span class="minus bg-dark" onclick ="btnMinus('${
        item.product.id
      }')">-</span>
      <span class="quantityResult mx-2">${item.quantity}</span>
      <span class="plus bg-dark" onclick ="btnAdd('${
        item.product.id
      }')">+</span>
    </div>
    <div class="product__price"><b>$${
      item.quantity * item.product.price
    }</b></div>
  </div>
  </div>`;
  });
  getEle("cartList").innerHTML = content;

  // Đếm số lượng item trong cart
  let cartCount = 0;
  cart.forEach((item) => {
    cartCount += item.quantity;
  });
  const subTotal = tinhTongTien(cart);
  // if(subTotal > 0){
  //   shipping = 10
  // }else{
  //   shipping = 0
  // }
  //subTotal > 0 ? 10 : 0;
  getEle("cartCount").innerHTML = cartCount;
  getEle("priceTotal").innerHTML = "$" + subTotal;
  // console.log('subTotal: ', subTotal);
};

// hàm tính tổng tiền trong giỏ hàng
const tinhTongTien = (cart) => {
  let subTotal = 0;
  cart.forEach((item) => {
    subTotal += item.product.price * item.quantity;
  });
  return subTotal;
};

// hàm tìmcart item trong giỏ hàng theo id sản phẩm, trả về cartitem
// const findItemById = (cart, id) => {
//   return cart.find((ele) => ele.product.id === id);
// };
const findItemById = (cart, id) => {
  let item;
  cart.forEach((ele) => {
    if (ele.product.id == id) {
      item = ele;
      return;
    }
  });
  return item;
};

// tải danh sách điện thoại lên web
onload = async () => {
  const phoneList = await service.getPhones();
  renderList(phoneList);
  cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  // if (localStorage.getItem("cart")) {
  //   cart = JSON.parse(localStorage.getItem("cart"));
  // } else {
  //   cart = [];
  // }
  renderCart(cart);
};

//lọc phone
getEle("selectList").onchange = async () => {
  const data = await service.getPhones();
  const selectValue = getEle("selectList").value;
  let filterData;
  // Nếu selectValue có giá trị = all thì trả về data nếu khác thì dựa vào type trong data để trả về
  if (selectValue == "all") {
    filterData = data;
  } else {
    filterData = data.filter((item) => item.type == selectValue);
  }
  renderList(filterData);
};


// Thêm sản phầm
window.btnAddToCart = async (productId) => {
  const phoneData = await service.getPhoneById(productId);
  const { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
    phoneData;
  const product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  const newCartItem = new CartItem(product, 1);
  let cartItem = findItemById(cart, newCartItem.product.id);
  // Kiểm tra sản phẩm có trong giỏ hàng hay chưa. Nếu sản phẩm đã tồn tại trong giỏ hàng, hàm sẽ tăng số lượng của sản phẩm đó lên một. Nếu sản phẩm chưa tồn tại trong giỏ hàng, hàm sẽ thêm sản phẩm đó vào giỏ hàng.
  // if (!cartItem) {
  //   cart.push(newCartItem);
  // } else {
  //   cartItem.quantity ++;
  // }
  !cartItem ? cart.push(newCartItem) : cartItem.quantity++;
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// dấu cộng trong giỏ hàng
//Tất cả các biến toàn cục (global variables) và hàm được định nghĩa ở phạm vi đỉnh cao nhất trong chương trình JavaScript đều là thuộc tính của đối tượng "window" => việc gán hàm "btnAdd" cho thuộc tính "btnAdd" của đối tượng "window" cho phép truy cập hàm này từ bất kỳ đâu trong chương trình
// window.btnAdd = (id) => {
//   let cartItem = findItemById(cart, id);
//   if (cartItem) {
//     cartItem.quantity += 1;
//   }
//   renderCart(cart);
//   // lưu và localStorage
//   localStorage.setItem("cart", JSON.stringify(cart));
// };
  window.btnAdd = (id) => {
    let cartItem = findItemById(cart, id);
    if (cartItem) cartItem.quantity++;
    renderCart(cart);
    // lưu và localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

// dấu trừ trong giỏ hàng
window.btnMinus = (id) => {
  // let cartItem = findItemById(cart, id);
  // if (cartItem) {
  //   cartItem.quantity -= 1;
  // }
  // cart = cart.filter((item) => item.quantity != 0);
  // renderCart(cart);
  // localStorage.setItem("cart", JSON.stringify(cart));
  let cartItem = findItemById(cart, id);
  if (cartItem) cartItem.quantity--;
  cart = cart.filter((ele) => ele.quantity != 0);
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// xóa sản phẩm khỏi giỏ hàng
window.btnRemove = (id) => {
  cart = cart.filter((item) => item.product.id != id);
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// clear giỏ hàng
window.emptyCart = () => {
  cart = [];
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

//Nút thanh toán
window.payNow = () => {
  if (cart.length > 0) {
    // Thư viện Swal
    // Swal.fire() được sử dụng để hiển thị một cửa sổ thông báo
    // icon: đại diện cho biểu tượng được hiển thị trên thông báo.
    // title: đại diện cho tiêu đề của thông báo.
    // text: đại diện cho nội dung của thông báo.
    Swal.fire({
      icon: "success",
      title: "Your order is completed",
      showConfirmButton: false,
      timer: 1500,
    });
    emptyCart();
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your cart is empty",
    });
  }
};
