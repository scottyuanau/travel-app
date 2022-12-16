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
})