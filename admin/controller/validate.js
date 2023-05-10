var showMessage = function (id, message) {
  document.getElementById(id).innerHTML = message;
};
// Kiếm tra rỗng
var kiemTraRong = function(idError, value){
    if(value.length == 0){
        showMessage(idError, 'Trường này không được để trống!')
        return false
    }else{
        return true
    }
}
var kiemTraGiaTien = function(price){
    var regName = /^-?\d+(\.\d+)?$/
    if(regName.test(price)){
        return true
    }else{
        showMessage('tbprice', 'Giá tiền chỉ nhập số!')
        return false
    }
}

var kiemTraType = function(type){
    if((type === 'Samsung') || (type === 'Apple')){
        return true
    }else{
        showMessage('tbtype', 'Chọn loại sản phẩm!')
        return false
    }
}