// calendar

let calendar = {
    cur_year: new Date().getFullYear(),
    cur_month: new Date().getMonth(),
    cur_day: ""
};

// schedule

let schedule = {
    "2021-10-22": {"title": "Alumni Seminar", "location": "TNR 400", "time": "16:00 PM"}
}

// get day = sun: 0 - sat: 6 || so today is wed: 3
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const goPrev = () => {
    if (calendar.cur_month - 1 < 0) {
        calendar.cur_year -= 1;
        calendar.cur_month = 11;
    }
    else {
        calendar.cur_month -= 1;
    }
    display();
}

const goNext = () => {
    if (calendar.cur_month + 1 > 11) {
        calendar.cur_year += 1;
        calendar.cur_month = 0;
    }
    else {
        calendar.cur_month += 1;
    }
    display();
}

// modal

const closeModal = () => {
    console.log("DJDJDJD")
    const modal_bg = document.querySelector(".modal_bg");
    console.log(modal_bg);
    const modal = document.querySelector(".modal");

    modal_bg.style.display="none";
    modal.style.display = "none";
}

function popModal(e) {

    console.log(e)
    // console.log(e.target.children[1]);

    const modal_bg = document.querySelector(".modal_bg");
    const modal = document.querySelector(".modal");
    const modal_date = document.querySelector(".modal_date");

    let day_info = `${calendar.cur_year}-${calendar.cur_month+1}-${e.target.id}`;

    const schedule_date = document.querySelector(".modal_schedule");

    modal_date.innerHTML = `${months[calendar.cur_month]} ${e.target.id}, ${calendar.cur_year}`;
    modal_bg.style.display="block";
    modal.style.display = "block";
    schedule_date.innerHTML = schedule[day_info].title;
    
}

const days = {"SUN": "Sunday", "MON": "Monday", "TUE": "Tuesday", "WED": "Wednesday", "THU": "Thursday", "FRI": "Friday", "SAT": "Saturday"}

const display = () => {
    const day = new Date().toString().split(" ");

    const num_date = new Date().toString().split(" ")[2];
    const today_mon = new Date().getMonth();
    const today_year = new Date().getFullYear();
    
    const is_cur_cal = (today_mon === calendar.cur_month) && (today_year === calendar.cur_year);

    const cur_month = document.querySelector("#month");
    cur_month.innerHTML = `${months[calendar.cur_month]} ${calendar.cur_year} `;

    let start_day = new Date(`${months[calendar.cur_month]} 1, 2020`).getDay() + 1;

    // start > 0 total row = original (5) + 1
    // else total row = 5
    if (start_day >= 7) {
        start_day = 0;
    }

    let day_id = 0;

    let html_string = ``;

    let row_num = start_day > 4 ? 6 : 5;
    let cell_limit = start_day > 4? 42: 35;
    let cell_count = 0;
    let last_date = new Date(calendar.cur_year, calendar.cur_month + 1, 0).getDate();

    // February 
    if (calendar.cur_month === 1) {
        row_num = 5;
    }
{/* <div class="todo" id="${calendar.cur_year}-${months[calendar.cur_month]}-${day_id+1}"></div> */}
    for (let i = 0; i < row_num; i++) {
        html_string += `<div class="row">`;
        if (i === 0) {
            for (let j = 0; j < 7; j++) {
                let day_info = `${calendar.cur_year}-${calendar.cur_month+1}-${day_id+1}`;
                console.log(schedule[day_info])
                // first cell
                if (j === 0 && j === start_day) {
                    html_string += `
                    <div class="cell first" id="cell${day_id}" onclick="popModal(event)">
                        <div class="upper">
                            <div class="${day_id + 1=== parseInt(num_date) && is_cur_cal ? "day today" : "day"}" id="${day_id + 1}">${day_id + 1}</div>
                            ${schedule[day_info] !== undefined ? `<div class="schedule yes"></div> id="${day_info}"`: `<div class="schedule"></div>`}
                        </div>
                    </div>`;
                    ++day_id;
                    ++cell_count;
                    continue;
                }
                else if (j === 0) {
                    html_string += `
                    <div class="cell first">
                    </div>`;
                    ++cell_count;
                    continue;
                }
                // put cell id
                if (j >= start_day) {
                    html_string += `
                    <div class="cell" id="cell${day_id}" onclick="popModal(event)">
                        <div class="upper">
                            <div class="${day_id + 1=== parseInt(num_date) && is_cur_cal ? "day today" : "day"}" id="${day_id + 1}">${day_id + 1}</div>
                            ${schedule[day_info] !== undefined ? `<div class="schedule yes" id="${day_info}"></div>`: `<div class="schedule"></div>`}
                        </div>
                    </div>`;
                    ++day_id;
                    ++cell_count;
                    continue;
                }
                // do not put cell id
                html_string += `
                    <div class="cell">
                    </div>`;
                ++cell_count;
            }
            html_string += `</div>`;
        }
        else {
            for (let j = 0; j < 7; j++) {
                let day_info = `${calendar.cur_year}-${calendar.cur_month+1}-${day_id+1}`;
                console.log(schedule[day_info])
                if (j === 0) {
                    html_string += `
                    <div class="cell first" id="cell${day_id}" onclick="popModal(event)">
                        <div class="upper">
                            <div class="${day_id + 1 === parseInt(num_date) && is_cur_cal? "day today" : "day"}" id="${day_id + 1}">${day_id + 1}</div>
                            ${schedule[day_info] !== undefined ? `<div class="schedule yes" id="${day_info}"></div>`: `<div class="schedule"></div>`}
                        </div>
                    </div>`;
                    ++day_id;
                    ++cell_count;
                    continue;
                }
                if (cell_count > cell_limit) {
                    break;
                }
                if (day_id >= last_date) {
                    html_string += `
                    <div class="cell">
                    </div>`
                    ++cell_count;
                    continue;
                }
                html_string += `
                <div class="cell" id="cell${day_id}" onclick="popModal(event)">
                    <div class="upper">
                    <div class="${day_id + 1=== parseInt(num_date) && is_cur_cal ? "day today" : "day"}" id="${day_id + 1}">${day_id + 1}</div>
                    ${schedule[day_info] !== undefined ? `<div class="schedule yes" id="${day_info}"></div>`: `<div class="schedule"></div>`}
                    </div>
                </div>`;
                ++day_id;
                ++cell_count;
            }
            html_string += `</div>`
        }

    }
    const body_body = document.querySelector(".body-body");
    body_body.innerHTML = html_string;

    const schedule_yes = document.querySelector(".schedule.yes");
    schedule_yes.parentNode.children[0].style.border = '1px solid orange';
}



// banner