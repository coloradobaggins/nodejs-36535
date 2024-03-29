console.log(`profile.js`);

const form = document.getElementById('profile_img');
form.addEventListener('submit', submitForm);

/*
function submitForm(e){

    e.preventDefault();

    const files = document.querySelector('#files');

    const formData = new FormData();

    formData.append('files', files.files[0]);

    
    fetch('http://localhost:3001/file_upload', {

        method: 'POST',
        body: formData//,
        //headers: {
            //'Content-Type': 'multipart/form-data boundary="test"'
        //}
        

    })
    .then((result) =>{ 
        console.log(result) 

        if(result.updated){
            alert(`Reload`);
            location.reload();
        }

    })
    .catch((err)=> { console.log(err) });


}
*/

async function submitForm(e){

    e.preventDefault();

    const files = document.querySelector('#files');

    const formData = new FormData();

    formData.append('files', files.files[0]);

    const rawResponse = await fetch('http://localhost:3001/file_upload', {

        method: 'POST',
        body: formData
        
    })

    const content = await rawResponse.json();
    console.log(content);
    
    if(content.updated){
        location.reload();
    }

}