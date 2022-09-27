prediction1 ="";
prediction2 ="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera =document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}

console.log('ml5 version;',ml5.version);
classifier =ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NPiwYE1K9/model.json",modelLoaded); 

function modelLoaded(){
    console.log("modelLoaded");
}







function gotresult(error,result){
    if(error)
    {
        console.log(error);
    }
    else {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if(result[0].label=="victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
            
        }
        if(result[0].label=="amazing"){
            document.getElementById("update_emoji").innerHTML="&#128077;"
    }
    if(result[0].label=="best"){
        document.getElementById("update_emoji").innerHTML="&#128076;"
    }
    if(prediction2=="victory"){
        document.getElementById("update_emoji2").innerHTML="&#9996;";
        
    }
    if(prediction2=="amazing"){
        document.getElementById("update_emoji2").innerHTML="&#128077;"
}
if(prediction2=="best"){
    document.getElementById("update_emoji2").innerHTML="&#128076;"
}
    }
} 
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult)
}

function speak(){
    var synth=window.speechSynthesis;
    speakdata1="the first prediction is"+prediction1;
    speakdata2="the second prediction is"+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2)
    synth.speak(utterthis);

}



