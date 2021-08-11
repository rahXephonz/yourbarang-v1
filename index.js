// Method dark mode dengan toggle

const chk = document.getElementById('chk');
chk.addEventListener('change', () => {
	document.body.classList.toggle('dark-theme');
});

// Food Constructor
function Food(title, price){
    this.title = title;
    this.price = price;
}

// UI Constructor
function UI(){

}

//Tambahkan makanan ke kelas food
UI.prototype.addFoodToList = function(food) {
    const list = document.getElementById('food-list');
    //Membuat tr element
    const row = document.createElement('tr');
    //Insert kolom
    row.innerHTML = `
        <td>${food.title}</td>
        <td>${food.price}</td>
        <td style="text-align:center;"><a href="#" class="delete">Hapus</a></td>
    `;

    list.appendChild(row);
}

//Method untuk hapus
UI.prototype.deleteFood = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Tampilkan alert
UI.prototype.showAlert = function(message, className) {
    // Membuat element div untuk pembungkus
    const div = document.createElement('div');
    // tambahkan kelas
    div.className = `alert ${className}`;
    // tambahkan tulisan text
    div.appendChild(document.createTextNode(message));

    // Insert ke parent

    // get form
    const container = document.querySelector('.container');
    const form = document.querySelector('#food-form')
    // insert allert
    container.insertBefore(div, form);
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}


//Hapus fields dari form
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
}

// Event Listeners
document.getElementById('food-form').addEventListener('submit', function(e) {
    // Mendapatkan nilai dari form
    const title = document.getElementById('title').value,
          price = document.getElementById('price').value;
    
    // Inisiasi nilai makanan dari form input user
    const food = new Food(title, price);
    //Inisiasi UI
    const ui = new UI();
    //Validasi form
    if(title === '' || price === ''){
        //Error
        ui.showAlert('😟 Eiits! Form tidak boleh kosong!', 'error');
    }

    else{
        
        //Tambahkan makanan dan harga ke list
        ui.addFoodToList(food);
        //Succes
        ui.showAlert('👍 Sip! Data telah ditambahkan', 'success');
        //Menghilangkan fields;
        ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById('food-list').addEventListener('click', function(e){
    
    const ui = new UI();
    //Hapus List makanan
    ui.deleteFood(e.target);
    //Tampilkan show succes allert
    ui.showAlert('👌 OK! Item yang dipilih telah dihapus!', 'success');
    //Menghindari tindakan dari aksi yang ada pada element
    e.preventDefault();
})