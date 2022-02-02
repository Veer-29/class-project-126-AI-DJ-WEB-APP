song=""

scoreLeft=0;
scoreRight=0;

leftwristx=0;
rightwristx=0;

leftwristy=0;
rightwristy=0;

function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,modelloaded)
    poseNet.on('pose',gotposes)
}

function modelloaded(){
    console.log("poseNet is Initialized")
}

function gotposes(results){
if(results.length>0){
    console.log(results)

   scoreLeft=results[0].pose.keypoints[9].score
   scoreRight=results[0].pose.keypoints[10].score
   console.log("scoreLeft ="+scoreLeft+",scoreRight ="+scoreRight)

   leftwristx=results[0].pose.leftWrist.x 
   leftwristy=results[0].pose.leftWrist.y
   console.log("leftWristx ="+ leftwristx+",leftWristy ="+leftwristy)

   rightwristx=results[0].pose.rightWrist.x
   rightwristy=results[0].pose.rightWrist.y
   console.log("rightwristy ="+rightwristy+",rightwristx ="+rightwristx)
}
}

function draw(){
    image(video,0,0,600,500)

    fill(52, 235, 219)
    stroke(52, 119, 235)

    if(scoreLeft>0.2){
    circle(leftwristx,leftwristy,20)
    numberleftwristy=Number(leftwristy)
    remove_decimals=floor(numberleftwristy)
    volume=remove_decimals/500
    song.setVolume(volume)
    document.getElementById("volume").innerHTML="volume ="+volume;
    }

    if(scoreRight >0.2){
        circle(rightwristx,rightwristy,20)
        
        if(rightwristy>0 && rightwristy <=100){
            song.rate(0.5)
            document.getElementById("speed").innerHTML="Speed = 0.5x"
        }
        else if(rightwristy>100 && rightwristy <=200){
            song.rate(1)
            document.getElementById("speed").innerHTML="Speed = 1x"
        }
        else if(rightwristy>200 && rightwristy <=300){
            song.rate(1.5)
            document.getElementById("speed").innerHTML="Speed = 1.5x"
        }
        else if(rightwristy>300 && rightwristy <=400){
            song.rate(2)
            document.getElementById("speed").innerHTML="Speed = 2x"
        }
        else if(rightwristy>=400){
            song.rate(2.5)
            document.getElementById("speed").innerHTML="Speed = 2.5x"
        }
    }
}


function preload(){
    song=loadSound("music.mp3")
}

function play(){
    song.play()
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.pause()
}