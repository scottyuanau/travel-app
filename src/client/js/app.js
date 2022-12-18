
//check if main is empty, if yes, display the add new destination block
window.addEventListener('load',()=>{
    if(document.querySelector('main').childElementCount ===0){
        let newDes = document.createElement('div');
        newDes.classList.add('newDestination');
        newDes.insertAdjacentHTML('afterbegin','<i class="fa-solid fa-plus"></i><p class="addnewdes">Add new destination...</p>');
        document.querySelector('main').appendChild(newDes);
    }
}

)