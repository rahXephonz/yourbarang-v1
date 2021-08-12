// Method dark mode dengan toggle
const chk = document.getElementById('chk');
chk.addEventListener('change', () => {
	document.body.classList.toggle('dark-theme');
});

class Item{
    constructor(title,price){
        this.title = title;
        this.price = price;
    }
}

class UI{
    addItemToList(item){
        const list = document.getElementById('item-list');
        //Membuat tr element
        const row = document.createElement('tr');
        //Insert kolom
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td style="text-align:center;"><a href="#" class="delete">Hapus</a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message, className){
        // Membuat element div untuk pembungkus
        const div = document.createElement('div');
        // tambahkan kelas
        div.className = `alert ${className}`;
        // tambahkan tulisan text
        div.appendChild(document.createTextNode(message));

        // Insert ke parent

        // get form
        const container = document.querySelector('.container');
        const form = document.querySelector('#item-form')
        // insert allert
        container.insertBefore(div, form);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteItem(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
            document.getElementById('val').innerHTML = "Total Harga :";
        }

    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('price').value = '';
    }
}

// Local Storage class
class Store{
    static getItems(){
        let items;

        if(localStorage.getItem('items') === null){
            items = [];
        }
        else{
            items = JSON.parse(localStorage.getItem('items'));
        }

        return items;
    }

    static displayItems(){
        const items = Store.getItems();
        items.forEach(function(item){
            const ui = new UI;

            //Tambahkan item ke UI
            ui.addItemToList(item);
        });
    }

    static addItems(item){
        const items = Store.getItems();

        //push item kedalam array
        items.push(item);

        //tampilkan item di display window
        localStorage.setItem('items', JSON.stringify(items));

    }

    static removeItems(price){
        const items = Store.getItems();
        items.forEach(function(item, index){
            if(item.price == price){
                items.splice(index, 1);
            }
        });

        localStorage.setItem('items', JSON.stringify(items));

    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayItems);

// Event Listeners
document.getElementById('item-form').addEventListener('submit', function(e) {
    // Mendapatkan nilai dari form
    const title = document.getElementById('title').value,
          price = document.getElementById('price').value;
    
    // Inisiasi nilai makanan dari form input user
    const item = new Item(title, price);
    //Inisiasi UI
    const ui = new UI();
    
    if(title === '' || price === ''){
        //Error
        ui.showAlert('😩 Eiits! Form tidak boleh kosong ya!', 'error');
    }
    else if(price == 0){
        ui.showAlert('😵 Aduh, Harganya gaboleh 0 ya!', 'error');
    }

    else if(!(/^[0-9_-]{1,16}$/.test(price))){
        ui.showAlert('⛔️ Duh isi form harga dengan pure angka ya!', 'error');
    }

    else if(price.length == 1 || price.length == 2){
        ui.showAlert('🙄 Hmm harganya harus minimal ratusan yaa!', 'error');
    }

    else{
        
        //Tambahkan makanan dan harga ke list
        ui.addItemToList(item);
        //Menambahkan item ke local storage
        Store.addItems(item);
        //Succes
        ui.showAlert('👍 Mantapp! Data telah ditambahkan', 'success');
        //Menghilangkan fields;
        ui.clearFields();
    }

    e.preventDefault();
});


// yang bisa diclick liat target terlebih dahulu karena di id item-result ada btn
document.getElementById('item-result').addEventListener('click', function(e){
    const ui = new UI();
    var table = document.getElementById('table'), sumVal = 0;
    // ini diakhir click button save
    for(var i = 1; i < table.rows.length; i++)
    {
        sumVal = sumVal + parseInt(table.rows[i].cells[1].innerHTML);
    }

    if(sumVal == 0){
        ui.showAlert('😒 Ups, kamu belum masukin barang nih!', 'error');
        var targetElement = document.querySelector('.author');
        targetElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }

    else{
        document.getElementById('val').innerHTML = "Total Harganya :" + " Rp. " + sumVal;
    }

    e.preventDefault();
        
});

document.getElementById('item-list').addEventListener('click', function(e){
    
    const ui = new UI();
    //Hapus List item
    ui.deleteItem(e.target);
    //Hapus item di localstorage
    Store.removeItems(e.target.parentElement.previousElementSibling.textContent);
    //Tampilkan show succes allert
    ui.showAlert('👌 OK Sip! Item yang dipilih telah dihapus!', 'success');
    //Menghindari tindakan dari aksi yang ada pada element
    e.preventDefault();
})
