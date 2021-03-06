if (location.href.substr(0, 5) !== 'https')
  location.href = 'https' + location.href.substr(4, location.href.length - 4)

const socket = io()


let producer = null;

nameInput.value = 'bob' + Math.round(Math.random() * 1000)

socket.request = function request(type, data = {}) {
  return new Promise((resolve, reject) => {
    socket.emit(type, data, (data) => {
      if (data.error) {
        reject(data.error)
      } else {
        resolve(data)
      }
    })
  })
}

let rc = null

function joinRoom(name, room_id) {
  if (rc && rc.isOpen()) {
    console.log('already connected to a room')
  } else {
    rc = new RoomClient(
      // localMedia, 
      // remoteVideos, 
      remoteAudios, window.mediasoupClient, socket, room_id, name, roomOpen)

    addListeners()
  }

}

function roomOpen() {
  login.className = 'hidden'
  reveal(startAudioButton)
  hide(stopAudioButton)
  control.className = ''
  reveal(viewRecordsButton)
  
}

function hide(elem) {
  elem.className = 'hidden'
}

function reveal(elem) {
  elem.className = ''
}


function addListeners() {
  rc.on(RoomClient.EVENTS.stopAudio, () => {
    hide(stopAudioButton)
    reveal(startAudioButton)

  })
  rc.on(RoomClient.EVENTS.startAudio, () => {
    hide(startAudioButton)
    reveal(stopAudioButton)
    reveal(startRecordButton)
  })

  rc.on(RoomClient.EVENTS.exitRoom, () => {
    hide(control)
    reveal(login)
  })

  rc.on(RoomClient.EVENTS.startRecord, () => {
    reveal(stopRecordButton)
    hide(startRecordButton)
  })

  rc.on(RoomClient.EVENTS.stopRecord, () => {
    hide(stopRecordButton)
    reveal(startRecordButton)
  })
}

// Load mediaDevice options
navigator.mediaDevices.enumerateDevices().then(devices =>
  devices.forEach(device => {
    let el = null
    if ('audioinput' === device.kind) {
      el = audioSelect
    } else if ('videoinput' === device.kind) {
      el = videoSelect
    }
    if(!el) return

    let option = document.createElement('option')
    option.value = device.deviceId
    option.innerText = device.label
    el.appendChild(option)
  })
)
