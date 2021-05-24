//document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    const app = document.getElementById("app")

    const linksInputDiv = document.createElement("div")
    linksInputDiv.className = "linksInputDiv"

    const linksInput = document.createElement("textarea")
    linksInput.className = "linksInput"
    linksInput.setAttribute("type", "text")
    linksInput.setAttribute("id", "urlsInput")
    linksInput.setAttribute("placeholder", "Copy here the URLs ...")

    linksInputDiv.append(linksInput)

    const controlBar = document.createElement("div")
    controlBar.className = "controlBar"

    const durationInput = document.createElement("input")
    durationInput.className = "durationInput"
    durationInput.value = 10

    durationInput.setAttribute("type", "number")
    durationInput.setAttribute("id", "durationInput")

    const startBtn = document.createElement("button")
    startBtn.className = "startBtn"

    startBtn.textContent = "Start"
    startBtn.setAttribute("id", "startBtn")
    startBtn.addEventListener("click", startingFunction)
    controlBar.append(startBtn)
    controlBar.append(durationInput)

    app.append(linksInputDiv)
    app.append(controlBar)
}

function sleep( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

const openLink = async (lnk, dur) => {
    console.log("We wait")
    window.open(lnk , "sky" , '_system')
    sleep(dur)
    console.log("That happen")
}

function startingFunction(e) {
    let urls = document.getElementById("urlsInput").value.split("\n")
    let durationValue = parseInt(document.getElementById("durationInput").value) * 1000

    console.log(urls, durationValue)

    urls.map(url => openLink(url, durationValue))
}

onDeviceReady()