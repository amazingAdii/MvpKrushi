// Initialize Firebase
var config = {
  apiKey: "AIzaSyDlERu9deNlB2ZBo7LtcNkzUibYPq4z_X8",
  authDomain: "mvp-krushi-basket.firebaseapp.com",
  databaseURL: "https://mvp-krushi-basket.firebaseio.com",
  projectId: "mvp-krushi-basket",
  storageBucket: "mvp-krushi-basket.appspot.com",
  messagingSenderId: "116321154537"
};
firebase.initializeApp(config);

const database = firebase.database().ref();
const storageRef = firebase.storage().ref();

function submitHere(){
  var name = document.getElementById('email').value;
  var price = document.getElementById('price').value;
  var quanti = document.getElementById('Qt').value;
  var sPrice = document.getElementById('sPrice').value;
  var selectedFile = document.getElementById('get-image').files[0];
 
  if(name!="" || price!="" ||quanti!="" ||sPrice!=""){

    //document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
    //document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);
    if(selectedFile!=null) {
      console.log('function call upload file');
      handleFileUploadSubmit(name, price, sPrice, quanti, selectedFile);
    }else{
      console.log('file is null');
    }

  } else {
    //Handle popup for fields empty
    console.log('Fields are empty')
  }

}

// function handleFileUploadChange(e) {
//   selectedFile = e.target.files[0];
// }

function handleFileUploadSubmit(name, price, sPrice,quanti, selectedFile) {

  //Uploading seleted file to firebase storage
  const uploadTask = storageRef.child(`farmer_buy_list/${selectedFile.name}`).put(selectedFile);
  
  uploadTask.on('state_changed', (snapshot) =>{
    //show progress bar whikle uploading the task
    console.log('Uplaoding Image file');
  },
   (error) => {
    //Show error here while uploading the task
    console.log(error);
  },
   () => {
    //Show succesfull message here and do stuff
    console.log('Success');
    var imageRef = storageRef.child(`farmer_buy_list/${selectedFile.name}`);
    imageRef.getDownloadURL().then(function(url){
      //use download url for further process
      database.push().set({
        price : price,
        Product : name,
        quantityAvi : quanti,
        sPrice : sPrice,
        imageUrl : url
      });
    }).catch(function(error){
      //show error while getting download url
      console.log(error);
    })      
  });

}




