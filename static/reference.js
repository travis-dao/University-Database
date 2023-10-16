window.onload = function initReference(event) {
    event.preventDefault();

    fetch('https://university-database-roan.vercel.app/api/reference', {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            let names = data['names']
            let namesString = names.join('<br>');
            
            document.getElementById("reference").innerHTML = namesString;
        })
        .catch(error => console.error('Error:', error));
}