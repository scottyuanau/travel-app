//post url to local server
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

//mergeSort
function merge(leftArr, rightArr) {
  let resultArr=[];
  while (leftArr.length && rightArr.length) {
      if(leftArr[0]>=rightArr[0]){
          resultArr.push(rightArr.shift());
      } else {
          resultArr.push(leftArr.shift());
      }

  }
  return [...resultArr,...leftArr,...rightArr];
}

function mergeSort(arr) {
 if (arr.length <= 1){
  return arr;
 } 
 let mid = Math.floor(arr.length/2); 
 let leftArr = arr.slice(0,mid);
  let rightArr = arr.slice(mid);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
 

}

export {postData,mergeSort};