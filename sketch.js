let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
var gif_loadImg, gif_createImg; //https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  gif_loadImg = loadImage("laugh.gif");
  gif_createImg = createImg("laugh.gif");
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  image(gif_loadImg, noseX-gif_loadImg.width/2, noseY-gif_loadImg.height/2);
  gif_createImg.position(noseX-gif_createImg.width/2, noseY-gif_createImg.height/2);
  
  // let d = dist(noseX, noseY, eyelX, eyelY);
  // fill(255, 0, 0);
  // ellipse(noseX, noseY, d);
  //fill(0,0,255);
  //ellipse(eyelX, eyelY, 50);
}