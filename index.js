function submitHere(){
  var name = document.getElementById('email').value;
  var price = document.getElementById('price').value;
  var quanti = document.getElementById('Qt').value;
 

  var database = firebase.database().ref();
 
  database.push().set({
    price : price,
    Product : name,
    quantityAvi : quanti
  });


}


function myFunction() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "file");
  document.body.appendChild(x);
}
