// import { svService } from "../services/phoneService";
var idSelected = null

const BASE_URL = "https://643e1144c72fda4a0becfbc4.mockapi.io/product"
function fetchDSSP() {
//   batLoading();
  axios({
    url: "https://643e1144c72fda4a0becfbc4.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      // debugger
      renderDSSP(res.data)

    })
    .catch(function (err) {
    //   tatLoading();
      console.log("err", err);
    });
}
fetchDSSP();

// DELETE
function xoaSP(id){
  batLoading()
    axios({
        url: BASE_URL + '/' + id,
        method: 'DELETE'
    })
    .then(function(res){
      tatLoading()
        console.log('res',res);
        fetchDSSP()
        Toastify({
          text: "Xoá sản phẩm thành công",
          offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        }).showToast();
    })
    .catch(function(err){
        console.log('err: ', err);
        tatLoading()
    })
}
// ADD
document.querySelector('#btnAddPhone').onclick = function(id){
  batLoading()
  var dataSp = layThongTinTuForm();
  //Name
  var validate = kiemTraRong("tbname", dataSp.name)
  //Price
  validate = validate & kiemTraRong('tbprice', dataSp.price) && kiemTraGiaTien(dataSp.price)
  // screen
  validate = validate & kiemTraRong('tbscreen', dataSp.screen)
  // blackCamera
  validate = validate & kiemTraRong('tbbackCam', dataSp.backCamera)
  //frontCamera
  validate = validate & kiemTraRong('tbfrontCam', dataSp.frontCamera)
  // Image Link
  validate = validate & kiemTraRong('tbimg', dataSp.img)
  //Description
  validate = validate & kiemTraRong('tbdesc', dataSp.desc)
  //Type
  validate = validate & kiemTraRong('tbtype', dataSp.type) && kiemTraType(dataSp.type)
  if(validate){
    axios({
      url: BASE_URL,
      method: 'POST',
      data: dataSp
    })
    .then(function(res){
      tatLoading()
      console.log('res: ', res);
      Toastify({
        text: "Thêm sản phẩm thành công",
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();
      resetForm()
      fetchDSSP()
    })
    .catch(function(err){
      tatLoading()
      resetForm()
      // console.log('err: ', err);
    })
  }
  else{
    tatLoading()
    resetForm()
  }
 
}

//EDIT
function suaSP(id){
  idSelected = id
  axios({
    url:`https://643e1144c72fda4a0becfbc4.mockapi.io/product/${id}`,
    method: "GET",
  })
  .then(function(res){
    showThongTinLenForm(res.data)
  })
  .catch(function(err){
    console.log(err);
  })
}

// UPDATE
document.querySelector('#btnUpdate').onclick = function(id){
  var dataSp = layThongTinTuForm();
  batLoading()
  //Name
  var validate = kiemTraRong("tbname", dataSp.name)
  //Price
  validate = validate & kiemTraRong('tbprice', dataSp.price) && kiemTraGiaTien(dataSp.price)
  // screen
  validate = validate & kiemTraRong('tbscreen', dataSp.screen)
  // blackCamera
  validate = validate & kiemTraRong('tbbackCam', dataSp.backCamera)
  //frontCamera
  validate = validate & kiemTraRong('tbfrontCam', dataSp.frontCamera)
  // Image Link
  validate = validate & kiemTraRong('tbimg', dataSp.img)
  //Description
  validate = validate & kiemTraRong('tbdesc', dataSp.desc)
  //Type
  validate = validate & kiemTraRong('tbtype', dataSp.type) && kiemTraType(dataSp.type)
  if(validate){
    axios({
      url: `${BASE_URL}/${idSelected}`,
      method: 'PUT',
      data: layThongTinTuForm()
    })
    .then(function(res){
      Toastify({
        text: "Cập nhật sản phẩm thành công",
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
      }).showToast();
      resetForm()
      tatLoading()
      fetchDSSP()
    })
    .catch(function(err){
      tatLoading()
      resetForm()
      console.log(err);
    })
  }else{
    tatLoading()
    resetForm()
  }
}

function resetForm(){
  document.getElementById('formPhone').reset()
}
// const resetForm = () => {
// }