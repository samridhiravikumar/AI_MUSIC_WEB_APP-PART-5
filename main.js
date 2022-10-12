high_hopes_song = "";
harry_potter_theme = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
high_hopes = "";
scoreRightWrist = 0;
Harry_potter_song = "";


function preload() {
    high_hopes_song = loadSound("High-hopes.mp3");
    harry_potter_theme = loadSound("harry-potter.mp3");
}

function setup() {
    canvas = createCanvas(700, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}


function draw() {
    image(video, 0, 0, 800, 700);
    fill("#FF0000");
    stroke("#FF0000");

    high_hopes = high_hopes_song.isPlaying();
    console.log(high_hopes);

    Harry_potter_song = harry_potter_theme.isPlaying();
    console.log(Harry_potter_song);

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        harry_potter_theme.stop();
        if (high_hopes == false) {
            high_hopes_song.play();
        }
        else {
            document.getElementById("name").innerHTML = "Song Name : High hopes";
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        high_hopes_song.stop();
        if (Harry_potter_song == false) {
            harry_potter_theme.play();
        }
        else {
            document.getElementById("name").innerHTML = "Song Name : Harry Potter Theme Song";
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
