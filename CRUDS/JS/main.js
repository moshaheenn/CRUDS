onload = function () {
    //let title = this.document.getElementById('title');
    let pricee = this.document.getElementById('pricee');
    let taxes = this.document.getElementById('taxes');
    let ads = this.document.getElementById('ads');
    let discount = this.document.getElementById('discount');
    let total = this.document.getElementById('total');
    let count = this.document.getElementById('count');
    let category = this.document.getElementById('category');
    let submit = this.document.getElementById('submit');
    // console.log(title,pricee,taxes,ads,discount,total,count,category,submit);
}

let mood = 'create';
let tmp;

// get total of price 
function gettotal() {
    if (pricee.value != '') {
        let result = (+pricee.value + +taxes.value + +ads.value - +discount.value);
        total.innerHTML = result;
        total.style.background = 'green';

    } else {
        total.innerHTML = '';
        total.style.background = 'red';
    }


}

// Create ( collect data in object - saved array - local storage )
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function () {

    let newpro = {
        title: title.value.toLowerCase(),
        pricee: pricee.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()

    }


    if (mood === 'create') {
        if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro);
                cleardata();
                showData();
            }
        } else
            datapro.push(newpro);

    } else {

        datapro[tmp] = newpro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
    }

    // save in local storage 
    localStorage.setItem('product', JSON.stringify(datapro));


    showData();
    cleardata();
}


// cleardata

function cleardata() {
    title.value = '',
        pricee.value = '',
        taxes.value = '',
        ads.value = '',
        discount.value = '',
        total.innerHTML = '',
        count.value = '',
        category.value = ''
}
function showData() {

    gettotal()
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].pricee}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>

        <td><button  onclick = "updateData(${i})" id="update">update</button></td>
        <td><button  onclick = "deleteData(${i})" id="delete">delete</button></td>

    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById('delete_All');
    if (datapro.length > 0) {
        btnDeleteAll.innerHTML =
            `
    <button onclick="deleteAll()" >Delete All </button>
    `
    } else
        btnDeleteAll.innerHTML = '';

}
showData()

// delete products 

function deleteData(i) {

    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);

    showData()

}


function deleteAll() {
    localStorage.clear;
    datapro.splice(0);
    showData();
}


function updateData(i) {
    title.value = datapro[i].title;
    pricee.value = datapro[i].pricee;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal()
    count.style.display = 'none';
    category.value = datapro[i].category;

    submit.innerHTML = 'update';

    mood = 'update';
    tmp = i;

    scroll({
        top: 0,
        behavior: 'smooth'
    })


}



// Search Function 

let SearchMood = 'title';

function getsearchmood(id) {
    let search = document.getElementById('search');

    if (id == 'searchTitle') {
        SearchMood = 'title';
        
    } else {
        SearchMood = 'category';
        
    }
    search.placeholder = 'Search By '+ SearchMood;
    search.focus();
    showData ;
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {

        if (datapro[i].title.includes(value.toLowerCase())) {

            table += `
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].pricee}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>

    <td><button  onclick = "updateData(${i})" id="update">update</button></td>
    <td><button  onclick = "deleteData(${i})" id="delete">delete</button></td>

</tr>
    `

        }

    }
    if (SearchMood == 'title') {

        
    } else {
        for (let i = 0; i < datapro.length; i++) {

            if (datapro[i].category.includes(value.toLowerCase())) {

                table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].pricee}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>

        <td><button  onclick = "updateData(${i})" id="update">update</button></td>
        <td><button  onclick = "deleteData(${i})" id="delete">delete</button></td>

    </tr>
        `

            }

        }

    }
    document.getElementById('tbody').innerHTML = table;
}



/* console.log('Test');
  console.error('Error');
  window.print(); */