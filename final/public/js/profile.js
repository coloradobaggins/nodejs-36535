console.log(`profile.js`);

const form = document.getElementById('profile_img');
form.addEventListener('submit', submitForm);

window.onload = () => {

    getProfileImg();

}

async function submitForm(e){

    e.preventDefault();

    const files = document.querySelector('#files');

    const formData = new FormData();

    //formData.append('files', files.files[0]);
    formData.append('archivo', files.files[0]);

    const rawResponse = await fetch('http://localhost:3001/file_upload', {

        method: 'POST',
        body: formData
        
    })

    const content = await rawResponse.json();
    console.log(content);
    
    if(content.status=='uploaded'){
        location.reload();
    }

}


//Get Profile img
const getProfileImg = async()=>{

    const rawRes = await fetch('http://localhost:3001/file_upload', {
        method: 'GET'
    })

    console.log(rawRes);

    document.getElementById('profileimg').src = rawRes.url;
}