const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const drawingUtils = window

function drawResult(results) {
  // Draw the overlays.
  console.log(results)
  console.log(faceDetection.g)
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.detections.length > 0) {
    drawingUtils.drawRectangle(
        canvasCtx, results.detections[0].boundingBox,
        {color: '#90ee90', lineWidth: 2.5, fillColor: '#00000000'});
    //drawingUtils.drawLandmarks(canvasCtx, results.detections[0].landmarks, {
    //  color: 'purple',
    //  radius: 3,
    //});
  }
  canvasCtx.restore();
}

const faceDetection = new FaceDetection({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
}});
faceDetection.setOptions({
    //modelSelection: 0,
    model: "short",
    minDetectionConfidence: 0.85
});

console.log(faceDetection)
faceDetection.onResults(drawResult);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceDetection.send({image: videoElement});
  },
  width: 260,
  height: 240
});
camera.start();