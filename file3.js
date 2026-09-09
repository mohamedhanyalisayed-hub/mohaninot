let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');

let create = document.getElementById('btn');

let search = document.getElementById('search');
let searchbycategory = document.getElementById('searchbycategory');
let searchbyitem = document.getElementById('searchbyitem');

let update = document.getElementById('update');
let delete1 = document.getElementById('delete');

let total = document.getElementById('total');


console.log(
    price,
    taxes,
    ads,
    discount,
    title,
    count,
    category,
    create,
    search,
    searchbycategory,
    searchbyitem,
    update,
    delete1,
    total
);


let mode = 'create';
let mo;


// ========================================
// Calculate Total Price
// ========================================

function calculatetotalprice() {

    if (price.value != '' ) {

        total.innerHTML =
            (+price.value + +taxes.value + +ads.value) - +discount.value;

        total.style.background = 'green';

    } else {

        total.style.background = 'rgb(164, 11, 11)';
        total.innerHTML = '';

    }
}


// ========================================
// Get Data From LocalStorage
// ========================================

let arr;

if (JSON.parse(localStorage.getItem('data1')) != null) {

    arr = JSON.parse(localStorage.getItem('data1'));

} else {

    arr = [];

}


// ========================================
// Create / Update
// ========================================

create.onclick = function () {

    let obj = {

        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value,
        title: title.value

    };

    if(title.value!='' && price.value !=" " && category.value !="" && obj.count<=100){
       if (mode == 'create') {

        if (obj.count > 1) {

            for (let i = 0; i < obj.count; i++) {

                arr.push(obj);

            }

        } else {

            arr.push(obj);

        }

    } else {

        arr[mo] = obj;

        mode = 'create';

        create.innerHTML = 'Create';

        count.style.display = 'block';

    }
    clear_data();
    }
    


    localStorage.setItem('data1', JSON.stringify(arr));

    

    show_Data();

};


// ========================================
// Clear Data
// ========================================

function clear_data() {

    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    category.value = '';
    count.value = '';

    total.innerHTML = '';

}


// ========================================
// Show Data
// ========================================

function show_Data() {

    let table = '';

    for (let i = 0; i < arr.length; i++) {

        table += `
        
        <tr>

            <td>${i}</td>

            <td>${arr[i].title}</td>

            <td>${arr[i].taxes}</td>

            <td>${arr[i].price}</td>

            <td>${arr[i].ads}</td>

            <td>${arr[i].discount}</td>

            <td>${arr[i].total}</td>

            <td>${arr[i].category}</td>

            <td>
                <button onclick="updateitem(${i})">
                    update
                </button>
            </td>

            <td>
                <button onclick="deleteitem(${i})">
                    delete
                </button>
            </td>

        </tr>

        `;

    }


    document.getElementById('tbody').innerHTML = table;


    let da = document.getElementById('deleteall');


    if (arr.length > 0) {

        da.innerHTML = `
        
            <button onclick="deleteall()">
                delete all (${arr.length})
            </button>

        `;

    } else {

        da.innerHTML = '';

    }

}


// ========================================
// Delete One Item
// ========================================

function deleteitem(i) {

    arr.splice(i, 1);

    localStorage.setItem('data1', JSON.stringify(arr));

    show_Data();

}


// ========================================
// Delete All
// ========================================

function deleteall() {

    arr.splice(0);

    localStorage.removeItem('data1');

    show_Data();

}


// ========================================
// Update Item
// ========================================

function updateitem(i) {

    title.value = arr[i].title;

    taxes.value = arr[i].taxes;

    price.value = arr[i].price;

    ads.value = arr[i].ads;

    discount.value = arr[i].discount;

    total.innerHTML = arr[i].total;

    category.value = arr[i].category;


    calculatetotalprice();


    count.style.display = 'none';

    create.innerHTML = 'Update';

    mode = 'update';

    mo = i;


    scroll({

        top: 0,

        behavior: "smooth"

    });

}


// ========================================
// Search Mode
// ========================================

let searchmod = 'title';


// ========================================
// Change Search Mode
// ========================================

function getsearchmod(id) {

    if (id == 'searchbyitem') {

        searchmod = 'title';

        search.placeholder = 'Search By Title';

    }

    else if (id == 'searchbycategory') {

        searchmod = 'category';

        search.placeholder = 'Search By Category';

    }


    search.value = '';

    search.focus();

    show_Data();

}


// ========================================
// Search Data
// ========================================

function searchdata(value) {

    let table = '';


    // ====================================
    // Search By Title
    // ====================================

    if (searchmod == 'title') {

        for (let i = 0; i < arr.length; i++) {

            if (
                arr[i].title
                    .toLowerCase()
                    .includes(value.toLowerCase())
            ) {

                table += `
                
                <tr>

                    <td>${i}</td>

                    <td>${arr[i].title}</td>

                    <td>${arr[i].taxes}</td>

                    <td>${arr[i].price}</td>

                    <td>${arr[i].ads}</td>

                    <td>${arr[i].discount}</td>

                    <td>${arr[i].total}</td>

                    <td>${arr[i].category}</td>

                    <td>
                        <button onclick="updateitem(${i})">
                            update
                        </button>
                    </td>

                    <td>
                        <button onclick="deleteitem(${i})">
                            delete
                        </button>
                    </td>

                </tr>

                `;

            }

        }

    }


    // ====================================
    // Search By Category
    // ====================================

    else if (searchmod == 'category') {

        for (let i = 0; i < arr.length; i++) {

            if (
                arr[i].category
                    .toLowerCase()
                    .includes(value.toLowerCase())
            ) {

                table += `
                
                <tr>

                    <td>${i}</td>

                    <td>${arr[i].title}</td>

                    <td>${arr[i].taxes}</td>

                    <td>${arr[i].price}</td>

                    <td>${arr[i].ads}</td>

                    <td>${arr[i].discount}</td>

                    <td>${arr[i].total}</td>

                    <td>${arr[i].category}</td>

                    <td>
                        <button onclick="updateitem(${i})">
                            update
                        </button>
                    </td>

                    <td>
                        <button onclick="deleteitem(${i})">
                            delete
                        </button>
                    </td>

                </tr>

                `;

            }

        }

    }


    document.getElementById('tbody').innerHTML = table;

}


// ========================================
// Show Data When Page Loads
// ========================================

show_Data();