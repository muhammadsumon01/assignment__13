/**
 * Making Dynamic Digital Clock
 */

let dateConst = new Date();
let hour = document.querySelector(".time__hour");
let minute = document.querySelector(".time__minute");
let day = document.querySelector(".day");
let date = document.querySelector(".date");

/**
 * To add 0 before the number
 * @param {addZero before the number} withZero
 * @returns
 */

function addZero(withZero) {
    if (withZero < 10) {
        withZero = "0" + withZero;
    }
    return withZero;
}

/**
 * To get day name
 * @param {dayNumber} dayNumber
 * @param {whether should it short or not} short
 * @returns
 */

function dayNameFinder(dayNumber, short) {
    if (short == "short") {
        if (dayNumber == 0) {
            dayNumber = "Sun";
        } else if (dayNumber == 1) {
            dayNumber = "Mon";
        } else if (dayNumber == 2) {
            dayNumber = "Tue";
        } else if (dayNumber == 3) {
            dayNumber = "Wed";
        } else if (dayNumber == 4) {
            dayNumber = "Thu";
        } else if (dayNumber == 5) {
            dayNumber = "Fri";
        } else if (dayNumber == 6) {
            dayNumber = "Sat";
        } else {
            dayNumber = "wrong"
        }
    } else {
        if (dayNumber == 0) {
            dayNumber = "Sunday";
        } else if (dayNumber == 1) {
            dayNumber = "Monday";
        } else if (dayNumber == 2) {
            dayNumber = "Tuesday";
        } else if (dayNumber == 3) {
            dayNumber = "Wednesday";
        } else if (dayNumber == 4) {
            dayNumber = "Thursday";
        } else if (dayNumber == 4) {
            dayNumber = "Thursday";
        } else if (dayNumber == 5) {
            dayNumber = "Friday";
        } else if (dayNumber == 6) {
            dayNumber = "Saturday";
        } else {
            dayNumber = "wrong"
        }
    }

    return dayNumber;
}

setInterval(() => {
    dateConst = new Date();
    hour.innerHTML = (dateConst.getHours() > 12) ? addZero(dateConst.getHours() - 12) : addZero(dateConst.getHours());
    minute.innerHTML = `<span class="sec">${addZero(dateConst.getSeconds())}</span>${addZero(dateConst.getMinutes())}`;
    day.innerHTML = dayNameFinder(dateConst.getDay(), "short");
    date.innerHTML = dateConst.toLocaleDateString();
}, 1000);


/**
 * Counter With Loader
 */

let prsBar = document.querySelector(".progress__bar");
let start = document.querySelector(".start");
let stop = document.querySelector(".stop");
let timer = document.querySelector(".timer");
let inputField = document.querySelector(".counter input[type='text']");
let counter = Number(inputField.value),
    countStart;


/**
 * When user click start multiple time without refresh count will start according input value
 */
inputField.addEventListener("blur", () => {
    if (inputField.value == 0) {} else {

        counter = Number(inputField.value);
        if (start.onclick) {
            inputField.value = ""
        } else {
            startCount();
        }

    }
})

/**
 * When user  click start button count will start
 */
function startCount() {
    counter = Number(inputField.value);
    counterValue = Number(inputField.value);
    start.addEventListener("click", () => {

        clearInterval(countStart);
        countStart = setInterval(() => {
            if (counter == 0) {
                clearInterval(countStart);
                timer.innerHTML = counter;
                prsBar.style.width = `${(100 * counter) / counterValue}%`;
                inputField.value = "";
            } else {
                timer.innerHTML = counter;
                prsBar.style.width = `${(100 * counter) / counterValue}%`;
                counter--;
            }
        }, 500);

    })
}
startCount();

/**
 * When user want to stop the counter
 */
stop.addEventListener("click", () => {
    clearInterval(countStart);
})

/**
 * To Do Apps
 */

let taskForm = document.querySelector("#task_form");
let taskItemContainer = document.querySelector("#tasks");
let taskInput = document.querySelector("#taskInput");
let taskAddBtn = document.querySelector(`#task_form input[type="submit"]`);

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (taskInput.value == "") {
        taskInput.setAttribute("placeholder", "Write Anything Here!!")
    } else {
        taskItemContainer.innerHTML += ` <li>${taskInput.value} <button type="button" onclick="this.parentElement.remove()" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </li>`;
    }

})

/**
 * Subject Marks Notification
 */

const bangla = document.querySelector("input[placeholder='Bangla']");
const english = document.querySelector("input[placeholder='English']");
const math = document.querySelector("input[placeholder='Math']");
const science = document.querySelector("input[placeholder='Science']");
const religion = document.querySelector("input[placeholder='Religion']");
const resultSec = document.querySelector(".mark_notification .result");
const form = document.querySelector(".mark_notification form");
const totalMarks = bangla.value + english.value + math.value + science.value + religion.value;
let failed = 0;
let pass = 0;


form.addEventListener("submit", (event) => {
    event.preventDefault();
    let resultCalculation = totalMarks / 5;
    let subjectsArr = document.querySelectorAll(".mark_notification input[type='number']");

    subjectsArr.forEach(data => {
        if (data.value == "") {
            resultSec.innerHTML = `
            <div class="text-center py-2 border w-50 mx-auto rounded alert alert-warning">
            All Fields Are Required !!
            </div>
            `;
        } else if (data.value < 33) {
            failed += 1;
        } else if (data.value > 33) {
            pass += 1;
        }
    })

    if (pass < 5) {
        resultSec.innerHTML = `
        <div class="text-center py-2 border w-50 mx-auto rounded alert" style="background-color:#ff6e6e;color:white">
        You Failed The Exam !!
        </div>
        `;
    } else if (pass >= 5) {
        resultSec.innerHTML = `
        <div class="text-center py-2 border w-50 mx-auto rounded alert alert-success">
        Congratulation!! You passed the exam
        </div>
        `;
    }

    failed = 0;
    pass = 0;

})