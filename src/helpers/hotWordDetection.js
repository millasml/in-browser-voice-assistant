import porcupineManager from './porcupineManager'

export default function HotwordDetection(changeStateFromWaitingToListening) {
    let keywordIDs = {
        'hey pico': new Uint8Array([
            0x28, 0x03, 0x80, 0xae, 0x56, 0x8d, 0x60, 0xaf, 0x14, 0x00, 0x26, 0xf2,
            0x2d, 0x99, 0xbf, 0x83, 0xa5, 0x90, 0x65, 0xc8, 0x06, 0x2c, 0xc7, 0xd8,
            0x5b, 0x2e, 0x4d, 0x11, 0x1b, 0xab, 0x99, 0xb3, 0xce, 0x93, 0x31, 0x01,
            0x53, 0x45, 0x6c, 0x1a, 0xad, 0xab, 0x13, 0x9c, 0xcb, 0xb2, 0xd4, 0x37,
            0x59, 0xc1, 0x5a, 0xf3, 0x1f, 0xe2, 0xb9, 0xcf, 0xda, 0x56, 0x2f, 0x72,
            0x7c, 0xa8, 0x51, 0xb5, 0xe2, 0xf8, 0x0b, 0x86, 0x0e, 0xf6, 0x0c, 0xc5,
            0xc3, 0x94, 0x44, 0x69, 0x6c, 0xd8, 0xf5, 0xa8, 0xc9, 0x09, 0x41, 0x5d
        ])
    };

    let sensitivities = new Float32Array([0.5, 1, 1, 1, 1, 1]);


    let processCallback = function (keyword) {
        if (keyword === null) {
            console.log("No hotword detected")
            return;
        }


        // if the hotword is found, change the state from waiting to listening and stop hotword detection
        if (keyword === "hey pico") {
            changeStateFromWaitingToListening()
            console.log("hey pico detected")
            PorcupineManager.stop();
        }

    };


    const porcupineWorker = `${process.env.PUBLIC_URL}/porcupine_worker.js`
    const downsamplingWorker = `${process.env.PUBLIC_URL}/downsampling_worker.js`


    const PorcupineManager = porcupineManager(
        porcupineWorker,
        downsamplingWorker
    )

    let audioManagerErrorCallback = function (ex) {
        alert(ex.toString());
    };

    let start = function () {
        PorcupineManager.start(keywordIDs, sensitivities, processCallback, audioManagerErrorCallback);

    };

    let stop = function () {
        PorcupineManager.stop();
        console.log("stopped hotword detection")
    };

    return { start: start, stop: stop }
}
