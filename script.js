let questions = [
    {
        "Q": "Which language is known as the backbone of web development?",
        "option": ["Python", "Java", "JavaScript", "C++"],
        "A": "JavaScript"
    },
    {
        "Q": "Which of the following is NOT a programming language?",
        "option": ["HTML", "Python", "Java", "C"],
        "A": "HTML"
    },
    {
        "Q": "What does CSS stand for?",
        "option": ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style System", "Computer Styled Sheets"],
        "A": "Cascading Style Sheets"
    },
    {
        "Q": "Which tag is used to create a hyperlink in HTML?",
        "option": ["<a>", "<link>", "<href>", "<h1>"],
        "A": "<a>"
    },
    {
        "Q": "Which symbol is used for single-line comments in JavaScript?",
        "option": ["//", "/*", "#", "<!--"],
        "A": "//"
    },
    {
        "Q": "Which of the following is a relational database?",
        "option": ["MongoDB", "MySQL", "Firebase", "Redis"],
        "A": "MySQL"
    },
    {
        "Q": "What does HTTP stand for?",
        "option": ["Hyper Transfer Text Protocol", "Hyper Text Transfer Protocol", "High Transfer Text Process", "Hyper Tool Transfer Protocol"],
        "A": "Hyper Text Transfer Protocol"
    },
    {
        "Q": "Which keyword is used to declare a constant in JavaScript?",
        "option": ["let", "var", "const", "static"],
        "A": "const"
    },
    {
        "Q": "Which of the following is used for version control?",
        "option": ["Git", "Docker", "Node.js", "Apache"],
        "A": "Git"
    },
    {
        "Q": "Which company developed the C programming language?",
        "option": ["Microsoft", "Sun Microsystems", "Bell Labs", "IBM"],
        "A": "Bell Labs"
    }
];

let i = 0;
let barstatus = 10;
let Question = document.querySelector(`.Question`);
let One = document.querySelector(`#one`);
let Two = document.querySelector(`#two`);
let Three = document.querySelector(`#three`);
let Four = document.querySelector(`#four`);
let option = document.querySelectorAll('.option')
Question.innerText = `${questions[0].Q}`
One.innerText = `${questions[0].option[0]}`
Two.innerText = `${questions[0].option[1]}`
Four.innerText = `${questions[0].option[2]}`
Three.innerText = `${questions[0].option[3]}`


function Default() {
    option.forEach(e => {
        e.style.backgroundColor = `rgba(255, 255, 255, 0.93)`
        e.style.color = `black`
    })
}


function resetOptions() {
  option.forEach(op => {
    op.classList.remove('fade');
    op.style.pointerEvents = '';
  });
}


function nextQuestion() {
    if (i < 9) {
        barstatus += 10;
        i++;
        document.querySelector('.bar').firstElementChild.style.width = `${parseInt(barstatus)}%`;
        Default()
        console.log(i);
        Question.innerText = `${questions[i].Q}`
        One.innerText = `${questions[i].option[0]}`
        Two.innerText = `${questions[i].option[1]}`
        Four.innerText = `${questions[i].option[2]}`
        Three.innerText = `${questions[i].option[3]}`
        resetOptions()
    }
}


function previousQuestion() {
    if (i > 0) {
        barstatus -= 10;
        i--;
        option.forEach(e =>{
            e.classList.remove('fade');
            e.disabled = false;
        });
        document.querySelector('.bar').firstElementChild.style.width = `${parseInt(barstatus)}%`;
        Default()
        Question.innerText = `${questions[i].Q}`
        One.innerText = `${questions[i].option[0]}`
        Two.innerText = `${questions[i].option[1]}`
        Four.innerText = `${questions[i].option[2]}`
        Three.innerText = `${questions[i].option[3]}`
        resetOptions()
    }
}


function check(e, id) {
    if (e == questions[i].A) {
        document.querySelector(`#${id}`).style.backgroundColor = `rgba(0, 255, 98, 0.932)`
        document.querySelector(`#${id}`).style.color = `white`
    } else {
        document.querySelector(`#${id}`).style.backgroundColor = `rgba(255, 0, 0, 0.932)`
        document.querySelector(`#${id}`).style.color = `white`
    }
}


document.querySelector('#forward').addEventListener('click', nextQuestion);

document.querySelector('#backward').addEventListener('click', previousQuestion);

option.forEach(e => {
    e.addEventListener('click', () => {
        check(e.innerText, e.id)
        option.forEach(op => {
            if (op !== e) {
                // op.classList.add('fade');
                op.style.pointerEvents = "none";
        }
    });
  });
});