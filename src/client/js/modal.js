import { postData } from "./comm";
//add new destination modal
let modal = document.getElementById("addNewDestination");

window.addEventListener('click',(event)=>{
    if (event.target.className == 'newDestination' || event.target.id == 'homeadd') {
        modal.style.display = "block";
      } else if (event.target.className == 'close') {
        modal.style.display = "none";
      } else if (event.target == modal) {
        modal.style.display = "none";
      }
})

//add trip button on the modal
document.querySelector('#modaladdtrip').addEventListener('click',(event)=>{
    event.preventDefault();
    let destination = document.querySelector('#destination').value;
    let country = document.querySelector('#country').value;
    let arrivaldate = document.querySelector('#arrivaldate').value;
    let arrivaltime = document.querySelector('#arrivaltime').value;
    let flight = document.querySelector('#flight').value;
    postData('/posttrip',{
      'Destination': destination,
      'Country':country,
      'Date':arrivaldate,
      'Time':arrivaltime,
      'Flight':flight,
    }).then(()=>{return updateUI()})
      .then(
      ()=>{return modal.style.display = "none"} //close modal after completes
    );
})

const updateUI = async ()=>{
  return;
  };

