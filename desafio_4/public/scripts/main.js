const form = document.querySelector("#add_form");
/*

form.addEventListener('submit', onSubmit);

function onSubmit(e) {

    e.preventDefault();

    const formData = new FormData(form);    //// Bind the FormData object and the form element
    
    let objToSend = {
        title: formData.get('productName'),
        price: formData.get('productPrice'),
        thumbnail: formData.get('productThumb')
    }

    console.log(objToSend);

    const XHR = new XMLHttpRequest();

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
      console.log( event.target.responseText );
    } );

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      console.log( 'Oops! Something went wrong.' );
    } );

    // Set up our request
    XHR.open( "POST", "/api/productos" );

    // The data sent is what the user provided in the form
    XHR.send( objToSend );




    
    

  }

  */