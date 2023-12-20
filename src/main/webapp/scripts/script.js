const xReg1 = new RegExp("(-5|\\+?3)$");
const xReg2 = new RegExp("-[0-4](\\.([0-9]+)?)?$");
const xReg3 = new RegExp("\\+?[0-2](\\.([0-9]+)?)?$");
const xRegSign = new RegExp("(\\+|-)$")

let xTeg, yTeg, rTeg, canvas, submitInput, clearTableInput, table, scaleSlicer, clearAudio, canvasController;

let MOUSE_DOWN = false;
let old_x_mouse_down = 0;
let old_y_mouse_down = 0;
let validator = new Validator();

let results = []
window.addEventListener("load", () => {
    xTeg = Array.from(document.getElementsByName("x"));
    yTeg = document.getElementById("y");
    rTeg = Array.from(document.getElementsByName("r"));
    canvas = document.getElementById("cartesian_plane");
    scaleSlicer = document.getElementById("scaleSlicer");
    submitInput = document.getElementById("checkingForm:submit_input");
    clearTableInput = document.getElementById("submit_clear_table")
    table = document.getElementById("results");
    canvasController = new CanvasController(canvas);

    // updateSubmitStatus();
    canvasController.drawCanvas();
    drawAllPoints();
    results.forEach((result) => { addResultToTable(result) });

    //xTeg.forEach(elem => elem.addEventListener("input", updateSubmitStatus))
    //yTeg.addEventListener("input", updateSubmitStatus)
    //rTeg.forEach(elem => elem.addEventListener("input", updateSubmitStatusAndCanvas))
    /*
    canvas.addEventListener("click", (event) => {
        if (event.button === 0) {
            console.log("click")
            const rect = canvas.getBoundingClientRect()
            let r = validator.getRadioValue(rTeg);
            if (r !== null) {
                let x = (canvasController.trimX(event.clientX) - rect.left - 200) / 100 * r / canvasController.scale
                let y = -(canvasController.trimY(event.clientY) - rect.top - 200) / 100 * r / canvasController.scale

                console.log(`x: ${x}; y: ${y}; r: ${r}`)

                sendRequestWithArgs('append', x.toFixed(4), y.toFixed(4), r)
            }
        }
    })
     */


    canvas.addEventListener("mousedown", (event) => {
        if (event.button === 2) {
            MOUSE_DOWN = true
            old_x_mouse_down = event.clientX
            old_y_mouse_down = event.clientY
            console.log("Down")
        }
    })

    canvas.addEventListener("mouseup", (event) => {
        if (event.button === 2) {
            MOUSE_DOWN = false
        }
        console.log("Up")
    })

    canvas.addEventListener("mouseout", (event) => {
        MOUSE_DOWN = false
        console.log("Out")
    })

    canvas.addEventListener("mousemove", (event) => {
        if (MOUSE_DOWN) {
            console.log("move");
            canvasController.addTranslate(event.clientX - old_x_mouse_down, event.clientY - old_y_mouse_down);
            old_x_mouse_down = event.clientX;
            old_y_mouse_down = event.clientY;
            canvasController.drawCanvas();
            let r = validator.getRadioValue(rTeg);
            if (r !== null) {
                results.forEach((p) => {
                    canvasController.drawPoint(p.x, p.y, r, p.hit);
                })
            }
        }
    })

    scaleSlicer.addEventListener("input", (event) => {
        canvasController.setScale(scaleSlicer.value);
        canvasController.drawCanvas();
        let r = validator.getRadioValue(rTeg);
        if (r !== null) {
            results.forEach((p) => {
                canvasController.drawPoint(p.x, p.y, r, p.hit);
            })
        }
    })

    clearAudio = new Audio();
    clearAudio.src = "sounds/clearAudio.mp3";
})

function drawAllPoints() {
    let r = validator.getRadioValue(rTeg);
    if (r != null) {
        results.forEach((result) => {
            canvasController.drawPoint(result.x, result.y, r, result.hit);
        });
    }
}

function playClearAudio() {
    clearAudio.play();
}

function updateSubmitStatus() {
    submitInput.setAttribute("disabled", "");
    if (validateInput()) {
        submitInput.removeAttribute("disabled");
    }
}

function updateSubmitStatusAndCanvas() {
    updateSubmitStatus();
    console.log("submitStatus");

    canvasController.drawCanvas();

    let r = validator.getRadioValue(rTeg)

    if (r !== null) {
        let old_results = [...results]

        while (results.length !== 0)
            results.pop();

        for (let result of old_results) {
            sendRequestWithArgs("append", result.x, result.y, r, false);
        }

        console.log("canvas");
    }
}

function validateInput() {
    while (!validator.validateText(yTeg) && yTeg?.value && yTeg.value.search(xRegSign) !== 0) {
        yTeg.value = yTeg?.value?.slice(0, -1);
    }

    return validator.validateCheckBox(xTeg) && validator.validateText(yTeg) && validator.validateRadio(rTeg);
}

function clearResultsTable() {
    sendRequestWithArgs("clear");
    table.innerHTML = "";
    while (results.length !== 0) results.pop();
    canvasController.drawCanvas();
}

function sendAppendRequest() {
    if (validateInput()) {
        let x = validator.getCheckBoxValue(xTeg);
        let y = validator.getTextValue(yTeg);
        let r = validator.getRadioValue(rTeg);
        sendRequestWithArgs("append", x, y, r);
    }
}

function sendRequestWithArgs(type, x, y, r, addToTable = true) {
    let req = null;
    if (window.XMLHttpRequest) {
        try {
            req = new XMLHttpRequest();
        } catch (e) { }
    } else if (window.ActiveXObject) {
        try {
            req = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                req = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) { }
        }
    }
    if (req) {
        let data;
        let url = "controller"

        switch (type) {
            case 'append':
                console.log("Формирование запроса на добавление нового элемента")
                data = `?type=append&x=${x}&y=${y}&r=${r}&addToResults=${addToTable}`;
                req.onreadystatechange = () => { handleAppendResponse(req, addToTable); };
                break;
            case 'clear':
                console.log("Формирование запроса на очистку таблицы")
                data = "?type=clear";
                req.onreadystatechange = () => { handleClearResponse(req); };
                break;
        }

        url += data;

        req.open("GET", url, true);
        req.send();
        console.log("Запрос отправлен")
    }
}

function handleClearResponse(context) {
    if (context.readyState === 4) {
        console.log("Загрузка завершена");
        if (context.status === 200) {
            console.log("Ответ получен");
            let res;

            try {
                console.log(context.responseText);
                res = JSON.parse(context.responseText);
                console.log(res);
                if (!checkResponse(res)) {
                    alert(`Ошибка`)
                }
            } catch (e) {
                console.error("Ответ сервера некорректен");
            }
        } else {
            console.error(`Некорректный статус ответа: ${context.status}`);
        }
    }
}
function handleAppendResponse(context, addToTable = true) {
    if (context.readyState === 4) {
        console.log("Загрузка завершена");
        if (context.status === 200) {
            console.log("Ответ получен");
            let res;

            try {
                console.log(context.responseText);
                res = JSON.parse(context.responseText);
                console.log(res);
                if (!checkResponse(res)) {
                    alert(`Ошибка:\n${res['errMsg']}`)
                    return;
                }

            } catch (e) {
                console.error("Ответ сервера некорректен");
                return;
            }
            results.push(
                {
                    x: res['result']['x'],
                    y: res['result']['y'],
                    r: res['result']['r'],
                    hit: res['result']['hit'],
                    startTime: res['result']['startTime'],
                    processingTime: res['result']['processingTime']
                })

            if (addToTable) {
                addResultToTable(results.slice(-1)[0])
            }

            canvasController.drawPoint(
                results.slice(-1)[0]['x'],
                results.slice(-1)[0]['y'],
                results.slice(-1)[0]['r'],
                results.slice(-1)[0]['hit'],
            )
        } else {
            console.error(`Некорректный статус ответа: ${context.status}`);
        }
    }
}

function checkResponse(res) {
    return !res['err'];
}

function formatTime(s) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
}

function addResultToTable(result) {
    table.innerHTML += `
                <tr>
                    <td>${result.x}</td>
                    <td>${result.y}</td>
                    <td>${result.r}</td>
                    <td>${(result.hit) ? "Попадание" : "Мимо"}</td>
                    <td>${(new Date(result.startTime)).toLocaleString("ru-RU")}</td>
                    <td>${formatTime(result.processingTime)}</td>
                </tr>`;
}