const form  = document.getElementsByTagName('form')[0]
const first = document.getElementById('first')
const second = document.getElementById('second')
const next = document.getElementById('next')
const submit = document.getElementById('submit')
const inputs = Array.from(document.getElementsByTagName('input'))
const country = document.getElementById('country')
const zip = document.getElementById('zip')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('password-confirm')
const message = document.createElement('span')

const validation = (tgt) => {
    let empty = false;
    let error = false;
    let notYet = false;
    let valid = false;
    
    if (tgt.validity.valueMissing) {
        empty = true;
    } else if (tgt === confirmPassword) {
        if (tgt.value.length < password.value.length) {
            notYet = true
        } else if (tgt.value === password.value && password.validity.valid) {
            valid = true
        } else {
            error = true
        }
    } else if (tgt.validity.tooShort) {
        notYet = true
    } else if (tgt.validity.patternMismatch) {
        error = true
    } else {
        valid = true
    }

    if (tgt === country) {
        let maxLength = 50;
        let remainingChar = maxLength - tgt.value.length;
        message.id = 'remaining-char'
        message.textContent = remainingChar;
        tgt.nextElementSibling.after(message)
    }
    
    if (empty) {
        tgt.className = '';
        tgt.classList.add('empty');
        tgt.nextElementSibling.textContent = 'This field is required';
        tgt.setCustomValidity('This field is required')
    } else if (error) {
        tgt.className = '';
        tgt.classList.add('error');
        if (tgt === country) {
            tgt.nextElementSibling.textContent = 'This field cannot contain digit';
            tgt.setCustomValidity('This field cannot contain digit')
        }
        if (tgt === zip) {
            tgt.nextElementSibling.textContent = 'Please use a number from 4 to 6 digits';
            tgt.setCustomValidity('Please use a number from 4 to 6 digits')
        }
        if (tgt === email) {
            tgt.nextElementSibling.textContent = 'Invalid email address';
            tgt.setCustomValidity('Invalid email address')
        }
        if (tgt === password) {
            tgt.nextElementSibling.textContent = 'Use lowercase, uppercase, digit & special character';
            tgt.setCustomValidity('Use lowercase, uppercase, digit & special character')
        }
        if (tgt === confirmPassword) {
            tgt.nextElementSibling.textContent = 'The confirmation is not identical to your password';
            tgt.setCustomValidity('The confirmation is not identical to your password')
        }
    } else if (notYet) {
        tgt.className = '';
        tgt.classList.add('not-finished');
        tgt.nextElementSibling.textContent = 'Your input is too short';
        tgt.setCustomValidity('Your input is too short');
    } else if (valid) {
        tgt.className = '';
        tgt.classList.add('valid');
        tgt.nextElementSibling.textContent = '✅';
        tgt.setCustomValidity('');
    }

    return valid
}

inputs.forEach(input => {
    input.onkeyup = (e) => {
        if (e.key !== 'Tab') {
           validation(e.target)
        }
    }
    input.onblur = (e) => {
        validation(e.target);
    }
});

next.onclick = () => { 
    let validity = [];
    validity[0] = validation(country);
    validity[1] = validation(zip)
    if (validity[0] && validity[1]) {
        second.classList.toggle('hidden');
        first.classList.toggle('hidden');
    }
    form.onsubmit = (e) => e.preventDefault()
}

submit.onclick = () => {
    let validity = [];
    validity[0] = validation(email);
    validity[1] = validation(password)
    validity[2] = validation(confirmPassword);
    if (validity[0] && validity[1] && validity[2]) {
        let answers = {
            country: country.value,
            zip: zip.value,
            email: email.value,
            password: password.value
        };
        console.log(answers);
        first.classList.toggle('hidden');
        second.classList.toggle('hidden');
        inputs.forEach(input => {
            input.value = '';
            input.className = '';
            input.nextElementSibling.textContent = '';
        });
        alert('send!'); 
    } else {
        form.onsubmit = (e) => {e.preventDefault()}
    }
}