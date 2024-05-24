let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let total = document.getElementById('total');
let category = document.getElementById('category');
let search = document.getElementById('search');
let Create = document.getElementById('Create');
var proImage = document.getElementById('proImage');




let mood ='create'
let tmp;
// get total


function getTotal() {
  if (price.value != '' && taxes.value != '' && ads.value != '') {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = 'rgb(113, 26, 26)';
  }
}

// create product
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

Create.onclick = function(){
  let nwePro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
    //pImage: `./images/${proImage.files[0]?.title}`,
  };
  // count
  if(title.value !='' && price.value != ''&& category.value !='' && nwePro.count < 200){
  if (mood === 'create') {
    if (nwePro.count > 1) {
      for (let i = 0; i < nwePro.count; i++) {
        datapro.push(nwePro);
      }
    } else {
      datapro.push(nwePro);
    }
  } else {
    datapro[tmp] = nwePro;
    mood = 'create';
    Create.innerHTML = 'create';
    count.style.display = 'block';
  }
  clearData();
}

  datapro.push(nwePro);
  // save localstorage

  localStorage.setItem('product', JSON.stringify(datapro));
  
  showData();
};

// clear
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  count.value = '';
  category.value = '';
  total.innerHTML = '';
  proImage.value = '';
}

function showData(){
  getTotal()
  let table ='';
  for(let i = 1; i < datapro.length; i++){
    table += `       <tr class=" align-items-center justify-content-center text-center">
          
            <td >
        <div class="d-flex align-items-center justify-content-center text-center">
          <img
              src="${datapro[i].pImage}" 
              alt=""
              style="width: 40px; height: 40px"
              class="rounded-circle"
              />
          <div class="ms-3">
         ${i}
          </div>
        </div>
      </td>
            <td >${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td>
              <button onclick="updataData(${i})" class="btn btn-outline-warning  btn-sm">Update</button>
              <button onclick="deleteData(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr> `;
  }

  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll')
  if(datapro.length > 0){
    btnDelete.innerHTML = `
    <button onclick="deleteAll(${datapro.length})" class="btn btn-outline-danger mb-3 w-100 btn-sm"> Delete  </button>`;
  }else{
    btnDelete.innerHTML = '';
  }
}
 showData();

// delete
function deleteData(i){
  datapro.splice(i,1)
  localStorage.product =JSON.stringify(datapro);
  showData();
}

function deleteAll(){
  localStorage.clear()
  datapro.splice(0)
  showData();
}
// update
function updataData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display='none';
    category.value = datapro[i].category;
    Create.innerHTML = 'update'
    mood ='update'
    tmp = i;
    scroll({
      top:0,
      behavior:'smooth'
    })
}
// search
let SearchMood = 'title';

function getSearchMood(id){
  let search = document.getElementById('search')
    if(id == 'searchTitle'){
      SearchMood = 'title'
      search.Placeholder ='Search By title'
    }else{
      SearchMood = 'category'
          search.Placeholder = 'Search By category';
    }
   search.focus() 
   search.value='';
   showData();
}

function searchData(value){

     let table=''
    if(SearchMood =='title'){

      for (let i=0 ; i < datapro.length ; i++){

if ( datapro[i].title.includes(value.toLowerCase())){
   table += `
     <tr class=" align-items-center justify-content-center text-center">
          
            <td >
        <div class="d-flex align-items-center justify-content-center text-center">
          <img
              src="${datapro[i].pImage}" 
              alt=""
              style="width: 40px; height: 40px"
              class="rounded-circle"
              />
          <div class="ms-3">
         ${i}
          </div>
        </div>
      </td>
            <td >${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td>
              <button onclick="updataData(${i})" class="btn btn-outline-warning mb-2 btn-sm">Update</button>
              <button onclick="deleteData(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
   `;
}
      }

    }

    else{
        for (let i=0 ; i < datapro.length ; i++){
if ( datapro[i].category.includes(value.toLowerCase())){
   table += `
     <tr class=" align-items-center justify-content-center text-center">
          
            <td >
        <div class="d-flex align-items-center justify-content-center text-center">
          <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style="width: 40px; height: 40px"
              class="rounded-circle"
              />
          <div class="ms-3">
         ${i}
          </div>
        </div>
      </td>
            <td >${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td>
              <button onclick="updataData(${i})" class="btn btn-outline-warning mb-2 btn-sm">Update</button>
              <button onclick="deleteData(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
          </tr>
   `;
}
      }
      };

 document.getElementById('tbody').innerHTML = table;
}


// clean data
