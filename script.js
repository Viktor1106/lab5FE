const form = document.getElementById('data-form');
const outputContainer = document.getElementById('output-container');
const outputList = document.getElementById('output-list');

const regexPatterns = {
    pib: /^[А-ЯІЇЄҐ][а-яіїєґ']+\s[А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/,
    variant: /^\d{1,2}$/,
    group: /^[А-ЯІЇЄҐ]{2}-\d{2}$/,
    phone: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    idcard: /^[А-ЯІЇЄҐA-Z]{2}\s№\d{6}$/
};

form.addEventListener('submit', function (event) {
    event.preventDefault(); // don't reload page

    let isValid = true;
    const formData = {};

    // remove prev errors
    document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
    outputList.innerHTML = '';

    const fields = ['pib', 'variant', 'group', 'phone', 'idcard'];

    fields.forEach(field => {
        const inputElement = document.getElementById(field);
        const value = inputElement.value.trim();

        if (!regexPatterns[field].test(value)) {
            inputElement.classList.add('error');
            isValid = false;
        } else {
            // keep the label text
            const labelText = inputElement.previousElementSibling.textContent.split(' ')[0];
            formData[labelText] = value;
        }
    });

    if (isValid) {
        outputContainer.classList.remove('hidden');
        for (const [key, value] of Object.entries(formData)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${value}`;
            outputList.appendChild(li);
        }
    } else {
        outputContainer.classList.add('hidden');
    }
});

const table = document.getElementById('interactive-table');
const colorPicker = document.getElementById('color-picker');
const variantNumber = 1;

let counter = 1;
for (let i = 0; i < 6; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 6; j++) {
        const td = document.createElement('td');
        td.textContent = counter;

        if (counter === variantNumber) {

            td.addEventListener('mouseover', function () {
                const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                this.style.backgroundColor = randomColor;
            });

            td.addEventListener('click', function () {
                this.style.backgroundColor = colorPicker.value;
            });

            td.addEventListener('dblclick', function () {
                const rowCells = this.parentElement.children;
                for (let cell of rowCells) {
                    cell.style.backgroundColor = colorPicker.value;
                }
            });
        }

        tr.appendChild(td);
        counter++;
    }
    table.appendChild(tr);
}