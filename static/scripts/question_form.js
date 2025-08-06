document.getElementById("send__form").onsubmit = async function (e) {
    e.preventDefault();

    let button = document.getElementById('send__button');
    let buttonText = document.getElementById('button-text');
    let spinner = document.getElementById('spinner');

    buttonText.style.display = 'none';
    spinner.style.display = 'inline-block';
    button.style.background = 'linear-gradient(to bottom right, darkgreen, lawngreen)';

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

    fetch(url, {
        method: 'POST',
        signal: AbortSignal.timeout(5000),
        headers: {
                 "Content-Type": "application/json"
            },
        body: jsonData
    })
        .then((response) => response.json())
        .then((data) => {
            if (data['status_code'] == 200) {
                buttonText.style.display = 'inline-block';
                spinner.style.display = 'none';
                buttonText.innerHTML = 'Отправлено';
                button.style.background = 'lawngreen';
            } else {
                buttonText.style.display = 'inline-block';
                spinner.style.display = 'none';
                buttonText.innerHTML = 'Что-то пошло не так :(';
                button.style.background = 'firebrick';
            }
        })
            .catch(() => {
                buttonText.style.display = 'inline-block';
                spinner.style.display = 'none';
                buttonText.innerHTML = 'Что-то пошло не так :(';
                button.style.background = 'firebrick';
            })
};

document.getElementById("send__form").oninput = function () {
    let form = document.getElementById("send__form");
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (form['name'].value.trim() == "") {
        document.getElementById("send__button").disabled = true;
        return;
    }

    if (form['email'].value.trim() == "") {
        document.getElementById("send__button").disabled = true;
        return;
    } 
    
    if (!emailRegex.test(form['email'].value)) {
        document.getElementById("send__button").disabled = true;
        return;
    }

    if (form['phone'].value.trim() == "") {
        document.getElementById("send__button").disabled = true;
        return;
    }

    if (form['comment'].value.length <= 10) {
        document.getElementById("send__button").disabled = true;
        return;
    }

    document.getElementById("send__button").disabled = false;
}