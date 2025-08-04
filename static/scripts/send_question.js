document.getElementById("send__form").onsubmit = async function () {
    let form = document.getElementById("send__form");    
    let formData = {};
    
    for (let i = 0; i < form.elements.length; i++) {
        let element = form.elements[i];
        if (element.type !== "submit") {
            formData[element.name] = element.value;
        }
    }

    let jsonData = JSON.stringify(formData);

    let url = 'http://127.0.0.1:5000/send_mail';

    let response = await fetch(url, {
        method: 'POST',
        body: jsonData
    });
};