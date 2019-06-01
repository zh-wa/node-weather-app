console.log('This message comes from client side javascript');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             return console.log('Try Again');
//         }
//         console.log(data.location);
//         console.log(data.forecast)
//     })
// })

const DOMString = {
    locationInput: document.querySelector('.location-input'),
    locationForm: document.querySelector('.location-form'),
    message1: document.querySelector('#message1'),
    message2: document.querySelector('#message2')
}

DOMString.locationForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const location = DOMString.locationInput.value;
    console.log(location);

    DOMString.message1.textContent = 'Loading...';
    DOMString.message2.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                DOMString.message1.textContent = data.error;
            } else {
                DOMString.message1.textContent = data.location;
                DOMString.message2.textContent = data.forecast;
            }
        })
    })
})