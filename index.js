// Method dark mode dengan toggle

const chk = document.getElementById('chk');
chk.addEventListener('change', () => {
	document.body.classList.toggle('dark-theme');
});

function validate(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

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
        document.getElementById('val').innerHTML = "Total Harga :";
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
        ui.showAlert('😩 Eiits! Form tidak boleh kosong ya!', 'error');
    }
    else if(price == 0){
        ui.showAlert('😵 Aduh, Harganya gaboleh 0 ya!', 'error');
    }

    else{
        
        //Tambahkan makanan dan harga ke list
        ui.addFoodToList(food);
        //Succes
        ui.showAlert('👍 Mantapp! Data telah ditambahkan', 'success');
        //Menghilangkan fields;
        ui.clearFields();
    }

    e.preventDefault();
});


// yang bisa diclick liat target terlebih dahulu karena di id food-result ada btn
document.getElementById('food-result').addEventListener('click', function(e){
    const ui = new UI();
    var table = document.getElementById('table'), sumVal = 0;
    // ini diakhir click button save
    for(var i = 1; i < table.rows.length; i++)
    {
        sumVal = sumVal + parseInt(table.rows[i].cells[1].innerHTML);
    }

    if(sumVal == 0){
        ui.showAlert('😒 Kamu masukin nilai kosong, coba lagi yuk!', 'error');
    }

    else{
        document.getElementById('val').innerHTML = "Total Harganya :" + " Rp. " + sumVal;
    }

    e.preventDefault();
        
});

document.getElementById('food-list').addEventListener('click', function(e){
    
    const ui = new UI();
    //Hapus List makanan
    ui.deleteFood(e.target);
    //Tampilkan show succes allert
    ui.showAlert('👌 OK Sip! Item yang dipilih telah dihapus!', 'success');
    //Menghindari tindakan dari aksi yang ada pada element
    e.preventDefault();
})
