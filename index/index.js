// navigation bar

const nav = document.querySelector(".nav_bar");
const banner = document.querySelector(".banner");
const banner_height = banner.getBoundingClientRect().height;
const nav_height = nav.getBoundingClientRect().height;

// go to top button
const gotoTop = document.querySelector(".toTop");

document.addEventListener('scroll', ()=> {
    if (window.scrollY > nav_height) {
        nav.classList.add('navbar--dark');
    }

    else {
        nav.classList.remove('navbar--dark');
    }

    gotoTop.style.opacity = `${window.scrollY / (nav_height + (banner_height / 2))}`;

})

// calendar

let calendar = {
    cur_year: new Date().getFullYear(),
    cur_month: new Date().getMonth(),
    cur_day: ""
};

// schedule

let schedule = {
    "2021-10-22": {"title": "Alumni Seminar", "location": "TNRB 400", "time": "16:00 PM"}
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

    const schedule_date = document.querySelector(".modal_schedule");

    schedule_date.innerHTML = "";

    const modal_bg = document.querySelector(".modal_bg");
    const modal = document.querySelector(".modal");
    const modal_date = document.querySelector(".modal_date");

    let target = e.target.id;
    if (target === "") {
        target = e.target.children[0].id;
    }

    let day_info = `${calendar.cur_year}-${calendar.cur_month+1}-${target}`;

    if (schedule[day_info] === undefined) {
        return;
    }

    modal_date.innerHTML = `${months[calendar.cur_month]} ${target}, ${calendar.cur_year}`;
    modal_bg.style.display="block";
    modal.style.display = "block";
    schedule_date.innerHTML = 
    `<span>${schedule[day_info].title}</span>
    <br>
    <span>${schedule[day_info].location}</span>
    <br>
    <span>${schedule[day_info].time}</span>`;
    
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

    if (schedule_yes !== null) {
        schedule_yes.parentNode.children[0].style.border = '1px solid orange';
    }
}

// activities 
let activities = {
    "Current_Activity": 
"https://cdn.pixabay.com/photo/2018/05/05/17/10/business-3376777_1280.jpg",   
    "title": "KBSA Opening Social",
    "Location": "Campus Edge ",
    "Date": "09-00-2021",
    "Description": "2021 Fall KBSA Opening SOcial",
}


const act_img = document.querySelector("#imgDDD");
act_img.addEventListener('click', (e) => {

    console.log(e.target.currentSrc);
    activities.Current_Activity = e.target.currentSrc;
    sessionStorage.setItem("img", e.target.currentSrc);
    sessionStorage.setItem("title", activities.title);
    sessionStorage.setItem("Location", activities.Location);
    sessionStorage.setItem("Date", activities.Date);
    sessionStorage.setItem("Description", activities.Description);

    window.location.href = "../detail/detail.html"
})

// to home page
const toHome = () => {
    window.location.href = "index.html";
}

// to about page
const toAbout = () => {
    window.location.href = "../about/about.html";
}

// to Contact page
const toContact = () => {
    window.location.href = "../contact.html";
}

// banner
document.getElementById("img0").style.display = "block";

let imgArr = ["../static/example0.jpg", "./static/example1.png", "./static/example2.jpg", "./static/example3.jpg"]
var imgCount = 0;
var next = document.getElementById("next");
var prev = document.getElementById("prev");

function rightButton() {
    
    var imgShow = document.getElementById("img" + imgCount);
    imgShow.style.display = "none";
    imgCount = imgCount + 1;

    if (imgCount >= imgArr.length) {
        imgCount = imgCount-imgArr.length;
        document.getElementById("img" + imgCount).style.display = "block";
    }
    var imgHide = document.getElementById("img" + imgCount);
    imgHide.style.display = "block";
    
    return imgCount;
}

function leftButton() {

    var imgHide = document.getElementById("img" + imgCount);
    imgHide.style.display = "none";

    imgCount = imgCount - 1;

    if (imgCount < 0) {
        imgCount = imgCount + imgArr.length;
    }

    var imgShow = document.getElementById("img" + imgCount);
    imgShow.style.display = "block";

    return imgCount;
}