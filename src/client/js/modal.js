//add new destination modal
let modal = document.getElementById("addNewDestination");

window.addEventListener('click',(event)=>{
    if (event.target.className == 'newDestination' || event.target.className == 'addblue') {
        modal.style.display = "block";
      } else if (event.target.className == 'close') {
        modal.style.display = "none";
      } else if (event.target == modal) {
        modal.style.display = "none";
      }
})

