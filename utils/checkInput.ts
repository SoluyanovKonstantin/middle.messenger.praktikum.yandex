const regExps = {
    login: /^(?!\d+$)[\da-zA-Z_-]+$/,
    password: /^(?![a-z\d]+$)(?![a-zA-Z]+$).{8,40}$/,
    email: /^[a-zA-Z-_]+@[a-zA-Z-_]+\.[a-zA-Z-_]+$/,
    name: /^[A-ZА-Я][А-Яа-яA-Za-z-]*$/,
    phone: /^\+[0-9]{10,14}$|^[0-9]{10,15}$/
};

function checkInput(regExp: RegExp, input: HTMLInputElement) {
    return regExp.test(input.value);
}

export { checkInput, regExps };
