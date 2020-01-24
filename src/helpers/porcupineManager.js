import webVoiceProcessor from './webVoiceProcessor'

// TODO: refactor this to hotWordDetection.js to keep it in one script since we only use it once?

export default function (porcupineWorkerScript, downsamplingScript) {
    const WebVoiceProcessor = webVoiceProcessor()
    let porcupineWorker;

    let start = function (keywordIDs, sensitivities, detectionCallback, errorCallback) {
        porcupineWorker = new Worker(porcupineWorkerScript);
        porcupineWorker.postMessage({
            command: 'init',
            keywordIDs: keywordIDs,
            sensitivities: sensitivities
        });

        porcupineWorker.onmessage = function (e) {
            detectionCallback(e.data.keyword);
        };

        WebVoiceProcessor.start([porcupineWorker], downsamplingScript, errorCallback);
    };

    let stop = function () {
        WebVoiceProcessor.stop();
        porcupineWorker.postMessage({command: "release"});
    };

    return {start: start, stop: stop}
}
