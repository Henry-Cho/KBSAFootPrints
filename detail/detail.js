// display in detail.html

function displayDetail() {
    const content = document.querySelector(".content");

    let html_str = ``;

    // for (let i = 0; i < activities.other_pics.length; i++) {
    //     html_str += `<img src=${activities.other_pics[i]}> <br>`
    // } 

    content.innerHTML = `
    <div><img src=${sessionStorage.getItem("img")} alt="picß"></div>
    <div>${sessionStorage.getItem("title")}</div>
    <div>${sessionStorage.getItem("location")}</div>
    <div>${sessionStorage.getItem("date")}</div>
    <div>${sessionStorage.getItem("description")}</div>

    `;
    // ${html_str}
}
