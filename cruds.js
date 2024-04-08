let title = document.getElementById("title"); // اسم المنتج

let total_All_Product = document.getElementById("total-all-product"); // اجمالى عدد القطع

let price_Buy = document.getElementById("price-buy"); // سعر الشراء

let discount_Msaref_Shahn = document.getElementById("discount-msaref-shahn"); // خصم مصاريف الشحن

let price_One_Product_After_Discount = document.getElementById(
  "price-one-product-after-discount"
); // small >> سعر القطعه الواحده بعد خصم مصاريف الشحن

let total_Payments = document.getElementById("total-payments"); // small >> اجمالى المدفوعات

let title_Tager = document.getElementById("title-tager"); // اسم التاجر

let date_Buy = document.getElementById("date-buy"); // تاريخ الشراء

let submit = document.getElementById("submit"); // Button انشاء

let searchInput = document.getElementById("search");

let btn_search_product = document.getElementById("search-by-product");

let btn_search_tager = document.getElementById("search-by-tager");

let tbody = document.getElementById("tbody");

let system = "create";
let tmp;

// get Price Of One product and total payment
function get_PriceOf_One_and_total_payment() {
  if (total_All_Product.value != "") {
    price_One_Product_After_Discount.innerHTML =
      "اضف سعر الشراء + مصاريف الشحن";
    total_Payments.innerHTML = "اضف سعر الشراء + مصاريف الشحن";

    if (price_Buy.value != "") {
      price_One_Product_After_Discount.innerHTML = "اضف مصاريف الشحن";
      total_Payments.innerHTML = "اضف مصاريف الشحن";

      if (discount_Msaref_Shahn.value != "") {
        // حساب اجمالى المدفوعات كامله و ذلك باضافة مصاريف الشحن
        let all_payment =
          +total_All_Product.value * +price_Buy.value +
          +discount_Msaref_Shahn.value;
        total_Payments.innerHTML = all_payment.toFixed(2);

        // حساب سعر القطعه الواحده و ذلك بعد اضافة مصاريف الشحن
        price_one_product = +all_payment / +total_All_Product.value;
        price_One_Product_After_Discount.innerHTML =
          price_one_product.toFixed(2);
      }
    }
  } else {
    price_One_Product_After_Discount.innerHTML =
      "اضف عدد القطع + سعر الشراء + مصاريف الشحن";
    total_Payments.innerHTML = "اضف عدد القطع + سعر الشراء + مصاريف الشحن";
  }
}
get_PriceOf_One_and_total_payment();

// create product
// لازم تعرف كمتغير عشان هتستخدمه تحت
let dataPro;
// localStorage.product != null  >>>>  معناها ان اللوكال ستورج مش فاضى يعنى فيه بيانات
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

// when you click on submit button or you need to create product
submit.onclick = function () {
  let new_pro = {
    title: title.value.toLowerCase(),
    total_All_Product: total_All_Product.value,
    price_Buy: price_Buy.value,
    discount_Msaref_Shahn: discount_Msaref_Shahn.value,
    total_Payments: total_Payments.innerHTML, // innerHTML
    price_One_Product_After_Discount:
      price_One_Product_After_Discount.innerHTML, // innerHTML

    title_Tager: title_Tager.value.toLowerCase(),
    date_Buy: date_Buy.value,
  };

  // validate data input when create product // clean data
  if (
    title.value != "" &&
    total_All_Product.value != "" &&
    price_Buy.value != "" &&
    discount_Msaref_Shahn.value != ""
  ) {
    // default system create
    if (system === "create") {
      // اضافة الاوبجكت بتاعنا بداخل المصفوفه
      dataPro.push(new_pro);
    }
    // now system = "update"
    else {
      // عشان امسك رقم العنصر او الاندكس   now >>>>> tmp = i;
      dataPro[tmp] = new_pro;

      // return system to create
      system = "create";

      // return button text to انشاء
      submit.innerHTML = "انشاء";
    }

    // to clear data from inputs after click on create button
    clearData();
  }

  // save local storage
  localStorage.setItem("product", JSON.stringify(dataPro));

  // to show data in table body after click on create button
  showData();
};

// clear inputs
function clearData() {
  title.value = "";
  total_All_Product.value = "";
  price_Buy.value = "";
  discount_Msaref_Shahn.value = "";
  total_Payments.innerHTML = "";
  price_One_Product_After_Discount.innerHTML = "";
  title_Tager.value = "";
  date_Buy.value = "";
}

// read or show data in table
function showData() {
  get_PriceOf_One_and_total_payment();

  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    // put + to add new tr every time >> ex  table += "" === mean table = table + "ahmed"
    table += `
      <tr>
        <td>${i + 1}</td>  
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].total_All_Product}</td>
        <td>${dataPro[i].price_Buy}</td>
        <td>  ${
          dataPro[i].discount_Msaref_Shahn
        }                             </td>
        <td>  ${
          dataPro[i].total_Payments
        }                                    </td>
        <td>  ${
          dataPro[i].price_One_Product_After_Discount
        }                  </td>
        
        
        <td>  ${
          dataPro[i].title_Tager
        }                                       </td>
        <td>  ${
          dataPro[i].date_Buy
        }                                          </td>
        <td> 
          <button onclick = "update_Data(${i})" class="btn bg-transparent" id="update">
            <i class="fa-solid fa-pen-to-square text-primary" title="تعديل" ></i>
          </button> 
        </td>
        <td> 
          <button onclick = "delete_One_Element(${i})" class="btn bg-transparent" id="delete"> 
            <i class="fa-solid fa-trash-can text-danger" title="حذف"></i>
          </button> 
        </td>
      </tr>
    `;
    // to show all data in table body
    tbody.innerHTML = table;
  }
}
// to show all data always in table
showData();

// delete one element when click on delete button
function delete_One_Element(i) {
  // to delete one element from array =>>>> datapro
  dataPro.splice(i, 1);

  // to delete one element from locale storage >> product  معناها انك جبت المصفوفه الجديده تانى بس بعد ما تكون مسحت منها العنصر المطلوب حذفه
  localStorage.product = JSON.stringify(dataPro);

  // to do refresh automatic on table when click on delete button
  showData();
}

// update >>>> update one element when click on update button
function update_Data(i) {
  title.value = dataPro[i].title;
  total_All_Product.value = dataPro[i].total_All_Product;
  price_Buy.value = dataPro[i].price_Buy;
  discount_Msaref_Shahn.value = dataPro[i].discount_Msaref_Shahn;
  total_Payments.value = dataPro[i].total_Payments.innerHTML; // innerHTML
  price_One_Product_After_Discount.value =
    dataPro[i].price_One_Product_After_Discount.innerHTML; // innerHTML

  title_Tager.value = dataPro[i].title_Tager;
  date_Buy.value = dataPro[i].date_Buy;

  // you must call function get_PriceOf_One_and_total_payment() to calculate total automatic when click on update button
  get_PriceOf_One_and_total_payment();
  // to change create button to update button
  submit.innerHTML = "تعديل";

  // chang system from "create" to "update" to do this function
  system = "update";

  // to use i in other function do this and you must decelerate it before << let tmp;
  tmp = i;

  // scroll to top when click on update button to see inputs and do update easy
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "product-title";

function getSearchMood(id) {
  if (id == "search-by-product") {
    searchMood = "product-title";
    searchInput.placeholder = " بحث باسم المنتج ";
  } else {
    searchMood = "tager-name";
    searchInput.placeholder = " بحث باسم التاجر ";
  }

  searchInput.focus();

  searchInput.value = "";

  showData();
}

function searchData(value) {
  let table = "";
  // to search by product name

  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "product-title") {
      // to search by title product
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>  ${i}                                                            </td>  
          <td>  ${dataPro[i].title}                                             </td>
          <td>  ${dataPro[i].total_All_Product}                                 </td>
          <td>  ${dataPro[i].price_Buy}                                         </td>
          <td>  ${dataPro[i].discount_Msaref_Shahn}                             </td>
          <td>  ${dataPro[i].total_Payments}                                    </td>
          <td>  ${dataPro[i].price_One_Product_After_Discount}                  </td>
          <td>  ${dataPro[i].title_Tager}                                       </td>
          <td>  ${dataPro[i].date_Buy}                                          </td>
          <td> 
            <button onclick = "update_Data(${i})" class="btn bg-transparent" id="update">
              <i class="fa-solid fa-pen-to-square text-primary" title="تعديل" ></i>
            </button> 
          </td>
          <td> 
            <button onclick = "delete_One_Element(${i})" class="btn bg-transparent" id="delete"> 
              <i class="fa-solid fa-trash-can text-danger" title="حذف"></i>
            </button> 
          </td>
        </tr>`;
      }
    }
    // to search by tager name
    else {
      if (dataPro[i].title_Tager.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>  ${i}                                                            </td>  
            <td>  ${dataPro[i].title}                                             </td>
            <td>  ${dataPro[i].total_All_Product}                                 </td>
            <td>  ${dataPro[i].price_Buy}                                         </td>
            <td>  ${dataPro[i].discount_Msaref_Shahn}                             </td>
            <td>  ${dataPro[i].total_Payments}                                    </td>
            <td>  ${dataPro[i].price_One_Product_After_Discount}                  </td>
            <td>  ${dataPro[i].title_Tager}                                       </td>
            <td>  ${dataPro[i].date_Buy}                                          </td>
            <td> 
              <button onclick = "update_Data(${i})" class="btn bg-transparent" id="update">
                <i class="fa-solid fa-pen-to-square text-primary" title="تعديل" ></i>
              </button> 
            </td>
            <td> 
              <button onclick = "delete_One_Element(${i})" class="btn bg-transparent" id="delete"> 
                <i class="fa-solid fa-trash-can text-danger" title="حذف"></i>
              </button> 
            </td>  
            
          </tr>
        `;
      }
    }
  }

  // to show all data in table body
  tbody.innerHTML = table;
}
