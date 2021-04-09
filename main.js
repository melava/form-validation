const first = document.getElementById('first')
const second = document.getElementById('second')
const next = document.getElementById('next')
const submit = document.getElementById('submit')
const country = document.getElementById('country')
const zip = document.getElementById('zip')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPasword = document.getElementById('password-confirm')

country.onblur = () => {
    if (country.value === '') {
        alert('empty')
    }
}

zip.onblur = () => {
    if (zip.value === '') {
        alert('empty')
    }
}

email.onblur = () => {
    if (email.value === '') {
        alert('empty')
    }
}

password.onblur = () => {
    if (password.value === '') {
        alert('empty')
    }
}

confirmPasword.onblur = () => {
    if (confirmPasword.value === '') {
        alert('empty')
    }
}

next.onclick = () => { 
    first.classList.toggle('hidden');
    second.classList.toggle('hidden');
}

submit.onclick = () => { 
    alert('send!'); 
    first.classList.toggle('hidden');
    second.classList.toggle('hidden');
}