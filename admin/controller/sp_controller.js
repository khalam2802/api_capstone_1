function renderDSSP(spArr) {
  var contentHTML = "";
  for (var i = 0; i < spArr.length; i++) {
    var sp = spArr[i];
    // sp là item trong array dssp
    var contentTr = ` 
    <tr>
      <td>${sp.id}</td>
      <td><strong>${sp.name}</strong></td>
      <td>$${sp.price}</td>
      <td style="text-align: center"><img src=${sp.img} alt="phone-img" width="150" height="150"></td>
      <td>${sp.desc}</td>
      <td>
      <button 
      class = 'btn btn-secondary my-3 me-1'
      data-toggle="modal"
      data-target="#exampleModalCenter" onclick="suaSP(${sp.id})">Sửa</button>
          <button class="btn btn-danger" onclick="xoaSP(${sp.id})">
      Delete <i class="fa fa-trash ms-2"></i>
      </button></td>
    </tr>`;
    contentHTML = contentHTML + contentTr;
  }
  document.getElementById("tablePhone").innerHTML = contentHTML;
}

function layThongTinTuForm() {
  var name = document.querySelector("#name").value;
  var price = document.querySelector("#price").value;
  var screen = document.querySelector("#screen").value;
  var backCamera = document.querySelector("#backCam").value;
  var frontCamera = document.querySelector("#frontCam").value;
  var img = document.querySelector("#img").value;
  var desc = document.querySelector("#desc").value;
  var type = document.querySelector("#type").value;

  var sp = new Product(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  return sp;
}

function showThongTinLenForm(sp) {
  document.querySelector("#name").value = sp.name;
  document.querySelector("#price").value = sp.price;
  document.querySelector("#screen").value = sp.screen;
  document.querySelector("#backCam").value = sp.backCamera;
  document.querySelector("#frontCam").value = sp.frontCamera;
  document.querySelector("#img").value = sp.img;
  document.querySelector("#desc").value = sp.desc;
  document.querySelector("#type").value = sp.type;
}
function batLoading() {
  document.getElementById("loading").style.display = "flex";
}

function tatLoading() {
  document.getElementById("loading").style.display = "none";
}
