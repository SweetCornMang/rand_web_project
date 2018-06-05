/* 
    TODO: COLOR CHOICES FINAL
          TENDENCIES (SOMETIMES WEBBING STILL WONT HIT EDGE OF SCREEN)
          SUB-WEBS
          {IF TIME}CLUSTER VARIATIONS
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(50);
}

var xInit = Math.floor(Math.random() * window.innerWidth - 120);
var yInit = Math.floor(Math.random() * window.innerHeight - 60);//120 CURRENT CLUSTER WIDTH AND HEIGHT

var randCluster = Math.floor(Math.random() * 2);// DETERMINES THE SIZE OF THE CLUSTER (HOW SCRUNCHED IT IS)
    var smallClust = Math.floor(Math.random() * 9) - 12;
    var wideClust = Math.floor(Math.random() * 6);

var i;
switch(randCluster){
    case 0: 
        i = smallClust;
        break;
    case 1:
        i = wideClust;
}
    

//CHECKS INTIAL X AND Y FOR NEGATIVE NUMBERS AND TURNS THEM POSITIVE
if (xInit < 0){
    xInit *= -1;
} 
if(yInit < 0){
    yInit *= -1;
}
//MAKES SURE yInit WONT BE UNDER 60 (DONT KNOW WHY IT WONT WORK INSIDE THE CONDITIONAL ABOVE)
if(yInit < 60){
    yInit += 60;
}

console.log(xInit);
console.log(yInit);

var x = xInit;
var y = yInit;

// EACH INDEX OF ARRAY WILL REFER TO ITS BOX IN THE ORDER THEY'RE MADE
var Array_x = [
    x - i,
        x + 5 - i,
    x + 10 - i,
    x + 20,//mid point
    x + 30 + i,
        x + 35 + i,
    x + 40 + i,
    x + 50 + i,//mid point
    x + 40 + i,
        x + 35 + i,
    x + 30 + i,
    x + 20,//mid point
    x + 10 - i,
        x + 5 - i,
    x + 0 - i,
    x - 10- i//mid point
];
var Array_y = [
    y + i,
        y + 5 + i,
    y + 10 + i,
    y + 20 + i,//mid point
    y + 10 + i,
        y + 5 + i,
    y + 0 + i,
    y - 10,//mid point
    y - 20 - i,
        y - 25 - i,
    y - 30 - i,
    y - 40 - i,//mid point
    y - 30 - i,
        y - 25 - i,
    y - 20 - i,
    y - 10//mid point
];
console.log(randCluster, i);
var randCircleSize = Math.floor(Math.random() * 3);
    var lowBrush = Math.floor(Math.random() * 2) + 22;
    var medBrush = Math.floor(Math.random() * 2) + 25;
    var highBrush = Math.floor(Math.random() * 2) + 28;

var circleW;
var circleH;
switch(randCircleSize){//DETERMINES CIRCLE SIZE (BRUSH SIZE) FOR THE DRAWING LOOP
    case 0:
        circleW = lowBrush;
        circleH = lowBrush;
        break;
    case 1: 
        circleW = medBrush;
        circleH = medBrush;
        break;
    case 2: 
        circleW = highBrush;
        circleH = highBrush;
}

var randSpectrum = Math.floor((Math.random() * 20) - 10); 
var randPos = Math.floor((Math.random() * 10));
var randNeg = Math.floor((Math.random() * -10));

var colorBright = Math.floor(Math.random() * 40) + 130;
var colorDark = Math.floor(Math.random() * 50) + 80;

var webX;
var webY;

var counter = 1;
var webbingCounter = 0;
var fadeWebCounter = 0;
var alp = 130; //ALPHA VALUE OF THE BOXES **** NOT USED ANY MORE, CIRCLES JUST POP IN AND LOOK LIKE BRUSH STROKE
var tendencies;
var curveCounter = 0;
var lastRandom;//USED TO NOT REPEAT THE RANDOM NUMBERS IN THE TENDENDIES SECTION

var gradCount = 0;//ACTS AS A COUNTER FOR COLOR GRADIENT SWITCHING, IN 'TENDENCIES' SWITCH
var sizeCount = 0;

console.log(randCircleSize, circleW, circleH);


function draw(){
    noStroke();
    
    Box(Array_x[0], Array_y[0], 0, 2, -10, randPos, colorBright);
        Box(Array_x[1], Array_y[1], 2, 4, -7, randPos+3, colorDark);// randPos NEEDED TO NOT BE TOTALLY SIMILAR TO THE WEBBING CHAIN ABOVE
    Box(Array_x[2], Array_y[2], 4, 6, randNeg, 10, colorBright);
    Box(Array_x[3], Array_y[3], 6, 8, randSpectrum, 10, colorDark);
    Box(Array_x[4], Array_y[4], 8, 10, randPos, 10, colorBright);
        Box(Array_x[5], Array_y[5], 10, 12, randPos+3, 7, colorDark);
    Box(Array_x[6], Array_y[6], 12, 14, 10, randPos, colorBright);
    Box(Array_x[7], Array_y[7], 14, 16,  10, randSpectrum, colorDark);
    Box(Array_x[8], Array_y[8], 16, 18, 10, randNeg, colorBright);
        Box(Array_x[9], Array_y[9], 18, 20, 7, randNeg-3, colorDark);
    Box(Array_x[10], Array_y[10], 20, 22, randPos, -10, colorBright);
    Box(Array_x[11], Array_y[11], 22, 24, randSpectrum, -10, colorDark);
    Box(Array_x[12], Array_y[12], 24, 26, randNeg, -10, colorBright);
        Box(Array_x[13], Array_y[13], 26, 28, -7, randNeg-3, colorDark);
    Box(Array_x[14], Array_y[14],28, 30, -10, randNeg, colorBright);
    Box(Array_x[15], Array_y[15], 30, 32, -10, randSpectrum, colorDark);
    //console.log(counter);
    if(counter === 33){
        console.log('im here');
        //noLoop();
        location.reload();
    }
}

/*
pos
neg
reg

pos
pos
reg

neg
pos
reg

neg 
neg 
reg
*/

function Box(circleX, circleY, lowerCount, higherCount, xWebIncrement, yWebIncrement, colorType){
 
        /* FIRST CONDITIONAL CHECKS THE COUNTER TO FADE-IN THE INITIAL CLUSTER 
        BOX IT IS CURRENTLY MAKING */
    if(counter > lowerCount && counter < higherCount){
        c = color(colorType);// alp WILL STOP INCREMENTING AT 260 WHICH IS 5 MORE THAN THE MAX ALPHA VALUE
        fill(c);
        fadeIn(circleX, circleY, circleW, circleH);
        counter++;
    } else if(counter === higherCount && webbingCounter < 160){
        if(webbingCounter === 0){
            //alp = 130;
            webX = circleX + xWebIncrement;
            webY = circleY + yWebIncrement;
            //console.log(webX, webY);
            webbingCounter++;
        }
        webbing(xWebIncrement, yWebIncrement, colorType); //CALLS WEBBING CERTAIN AMOUNT OF TIMES BEFORE MOVING ONTO next INITIAL CLUSTER BOX
        if(webbingCounter === 160){
            colorBright = Math.floor(Math.random() * 50) + 130;//RESETS THE COLOR TO ANOTHER RANDOM FOR EACH NEW BOX
            colorDark = Math.floor(Math.random() * 50) + 80;

            webbingCounter = 0;
            //console.log("im here");
            counter++
        }
    }

}

function webbing(xWebIncrement, yWebIncrement, colorType){

    /* CHECKS IF A WEBBING SQUARE HAD BEEN FADED IN ALL THE WAY AND 
    PICKS THE RANDOM POSITION OF THE next WEBBING SQUARE */
    if(fadeWebCounter === 1){

//HANDLES TENDENCIES OF THE RAND POSITIONS WHILE WEBBING       
        //RE-INITALIZES THE RANDOM NUMBER GENERATORS EACH TIME A BOX IS DONE FADING READY FOR NEW BOX
        randSpectrum = Math.floor((Math.random() * 20) - 10); // -10 --- 10 spectrum
        randPos = Math.floor((Math.random() * 10)); //+
        randNeg = Math.floor((Math.random() * -10));//-

        /*PICKS A 1 OR 0 TO DECIDE IF WEB SHOULD DEVIATE BY 
        MULTIPLIYING ITS RAND POSITION BY -1*/
        

        if(webbingCounter === 10){
             tendencies = Math.floor((Math.random() * 3));
             lastRandom === tendencies;
            //console.log(tendencies);
            //tendencies = 0;
        } else if (webbingCounter === 20 || webbingCounter === 40 
            || webbingCounter === 60 || webbingCounter === 70 
            || webbingCounter === 80 || webbingCounter === 90 
            || webbingCounter === 100|| webbingCounter === 110
            || webbingCounter === 120|| webbingCounter === 130
            || webbingCounter === 140|| webbingCounter === 150){
                tendencies = Math.floor((Math.random() * 4));//SO IT WONT PICK OPTION ZERO AFTER THE WEB GETS PAST 10
                while(tendencies === lastRandom){
                    tendencies = Math.floor((Math.random() * 4));
                }
                //console.log(tendencies);
                lastRandom = tendencies;
                //tendencies = 3;
            }

        switch(tendencies){
            case 0://GOES FOR DEFUALT BEHAVIOR 
                //gradient(colorType);
                //console.log('in case 0');
                break;
            case 1://SWIGGLES
                //gradient(colorType);
                randPos = randSpectrum;
                randNeg = randSpectrum;
                //console.log('in case 1');
                break;
            case 2://SHARP TURN, MOST THE TIME
                //gradient(colorType);
                randPos *= -1;
                randNeg *= -1;
                //console.log('in case 2');
                break;
            case 3://BIGGER SWIGGLES
                //gradient(colorType);
                randPos = (randSpectrum * 1.3);
                randNeg = (randSpectrum * 1.3);
                //console.log('in case 3');
                break;
            case 4://SMOOTHER TURN, MOST THE TIME
                //gradient(colorType);
                if(curveCounter < 4){
                    randPos *= -.5;
                    randNeg *= -.5;
                } else if(curveCounter <= 9){
                    randPos *= -.9;
                    randNeg *= -.9;
                } else if(curveCounter === 10){
                    curveCounter = 0;
                }
               // console.log('in case 4');   
            }
        gradient(colorType);
        //sizeChange();
        webX += xWebIncrement;
        webY += yWebIncrement;
        //console.log(webX, webY);
        //console.log(randSpectrum);
        fadeWebCounter = 0;
        //alp = 130;
        webbingCounter++;
        //CHECKS IF THE WEBBING HIT THE EDGE AND TELLS IT TO MOVE ONTO THE NExt INITIAL CLUSTER BOX
        if(webX > window.innerWidth || webX < -20 || webY > window.innerHeight 
            || webY < -20 || webbingCounter === 160){

            webbingCounter = 160;
            /* RESETS TENDENCIES AND ALL POSITIONS TO ORIGINAL 
            STATE SO THE WEB STARTS AT INTENTED DIRECTION BEFORE CHOOSING TO DEVIATE OR NOT */
            tendencies = 0;
            randSpectrum = Math.floor((Math.random() * 20) - 10); // -10 -- 10 spectrum
            randPos = Math.floor((Math.random() * 10)); //+
            randNeg = Math.floor((Math.random() * -10));//-
        }
    } else {
    c = color(colorType);
    //console.log(colorType);
    fill(c);
    fadeIn(webX, webY, circleW, circleH);
    fadeWebCounter++;
    //alp += 20;
    }

}

function gradient(colorType){
    if(gradCount <= 4){ 
        if(colorType === colorBright){
            colorBright += 6;
            gradCount++;
            //console.log(colorType, colorBright,  'in first conditional');
        } else{
            colorDark += 6;
            gradCount++;
        }
    } else if(gradCount <= 9){
        if(colorType === colorBright){
            colorBright -= 6;
            gradCount++;
        //console.log(colorType, colorBright,  'in first conditional');
        } else{
            colorDark -= 6;
            gradCount++;
        }
    } else {
        gradCount = 0;
    }
}

function sizeChange(){

    if(sizeCount <= 4){ 
        circleW -= 1;
        circleH -= 1;
        sizeCount++;

    } else if(sizeCount <= 9){
        circleW += 1;
        circleH += 1;
        sizeCount++;
    } else {
        sizeCount = 0;
    }

}

function fadeIn(x, y, w, h){

    ellipse(x, y, w, h);
    //alp += 130; 

}

/*


var Array_x = [
    x - i - 2,
        x + 5 - i,
    x + 10 - i,
    x + 20,//mid point
    x + 30 + i,
        x + 35 + i,
    x + 40 + i + 2,
    x + 50 + i,//mid point
    x + 40 + i + 2,
        x + 35 + i,
    x + 30 + i,
    x + 20,//mid point
    x + 10 - i,
        x + 5 - i,
    x + 0 - i - 2,
    x - 10- i//mid point
];
var Array_y = [
    y + i,
        y + 5 + i,
    y + 10 + i + 2,
    y + 20 + i,//mid point
    y + 10 + i + 2,
        y + 5 + i,
    y + 0 + i,
    y - 10,//mid point
    y - 20 - i,
        y - 25 - i,
    y - 30 - i - 2,
    y - 40 - i,//mid point
    y - 30 - i - 2,
        y - 25 - i,
    y - 20 - i,
    y - 10//mid point
];

/*

LIGHT BACKDROP:
var colorBright = Math.floor(Math.random() * 50) + 110;
var colorDark = Math.floor(Math.random() * 50) + 50;
BACKDROP(170)

DARK BACDROP:
var colorBright = Math.floor(Math.random() * 50) + 130;
var colorDark = Math.floor(Math.random() * 50) + 75;
BAKCDROP(70);
/*



Box(Array_x[0], Array_y[0], 0, 13, -10, randPos);
Box(Array_x[1], Array_y[1], 13, 26, randNeg, 10);
Box(Array_x[2], Array_y[2], 26, 39, randSpectrum,10);

Box(Array_x[3], Array_y[3], 39, 52, randPos, 10);
Box(Array_x[4], Array_y[4], 52, 65, 10, randPos);
Box(Array_x[5], Array_y[5], 65, 78,  10, randSpectrum);

Box(Array_x[6], Array_y[6], 78, 91, 10, randNeg);
Box(Array_x[7], Array_y[7], 91, 104, randPos, -10);
Box(Array_x[8], Array_y[8], 104, 117, randSpectrum, -10);

Box(Array_x[9], Array_y[9], 117, 130, randNeg, -10);
Box(Array_x[10], Array_y[10], 130, 143, -10, randNeg);
Box(Array_x[11], Array_y[11], 143, 156, -10, randSpectrum);






/*
 
    Box(Array_x[0], Array_y[0], 0, 13, -15, randPos);
    Box(Array_x[1], Array_y[1], 13, 26, randNeg, 15);
    Box(Array_x[2], Array_y[2], 26, 39, randSpectrum, 15);

    Box(Array_x[3], Array_y[3], 39, 52, randPos, 15);
    Box(Array_x[4], Array_y[4], 52, 65, 30, randPos);
    Box(Array_x[5], Array_y[5], 65, 78,  30, randSpectrum);

    Box(Array_x[6], Array_y[6], 0, 13, 30, randNeg);
    Box(Array_x[7], Array_y[7], 13, 26, randPos, -30);
    Box(Array_x[8], Array_y[8], 26, 39, randSpectrum, -30);

    Box(Array_x[9], Array_y[9], 39, 52, randNeg, -30);
    Box(Array_x[10], Array_y[10], 52, 65, -30, randNeg);
    Box(Array_x[11], Array_y[11], 65, 78, -30, randSpectrum);








Box(Array_x[0], Array_y[0], 0, 13, -15, randPos);
Box(Array_x[1], Array_y[1], 13, 26, randNeg, 15);
Box(Array_x[2], Array_y[2], 26, 39, randSpectrum, 15);

Box(Array_x[3], Array_y[3], 39, 52, randPos, 15);
Box(Array_x[4], Array_y[4], 52, 65, 30, randPos);
Box(Array_x[5], Array_y[5], 65, 78,  30, randSpectrum);

Box(Array_x[6], Array_y[6], 78, 91, 30, randNeg);
Box(Array_x[7], Array_y[7], 91, 104, randPos, -30);
Box(Array_x[8], Array_y[8], 104, 117, randSpectrum, -30);

Box(Array_x[9], Array_y[9], 117, 130, randNeg, -30);
Box(Array_x[10], Array_y[10], 130, 143, -30, randNeg);
Box(Array_x[11], Array_y[11], 143, 156, -30, randSpectrum);



*/


//6.5 * 40 = 260 (THE MAX), I AM GOING BY 7's BECAUSE I ROUNDED AND INTs ARE EASIER TO WORK WITH 
/*Box(0, 7, 15, 15, -30, randSpectrum); 
    Box(8, 15, 15, 15, randSpectrum, 30);
    Box(16, 23, 15, 15, randSpectrum, 30);
    Box(24, 31, 15, -15, randSpectrum, 30);
    Box(32, 39, 15, -15, 30, randSpectrum);
    Box(40, 47, 15, -15, 30, randSpectrum);
    Box(48, 55, -15, -15, 30, randSpectrum);
    Box(56, 63, -15, -15, randSpectrum, -30);
    Box(64, 71, -15, -15, randSpectrum, -30);
    Box(72, 79, -15, 15, randSpectrum, -30);
    Box(80, 87, -15, 15, -30, randSpectrum);
    Box(88, 95, -15, 15, -30, randSpectrum);*/








/*
    Box(13, 26, 15, 15);
    Box(26, 39, 15, 15);
    Box(39, 52, 15, -15);
    Box(52, 65, 15, -15);
    Box(65, 78, 15, -15);
    Box(78, 91, -15, -15);
    Box(91, 104, -15, -15);
    Box(104, 117, -15, -15);
    Box(117, 130, -15, 15);
    Box(130, 143, -15, 15);
    Box(143, 156, -15, 15);*/


/*







if(counter < 13){
    // WILL STOP EXACUTING WHEN alp REACHES 260 BEACAUSE 
    //alp INCREMENTS BY 20 REACH TIME (13 * 20 = 260)
    console.log("num one");
    c = color(colorBright, alp);// alp WILL STOP INCREMENTING AT 260 WHICH IS 5 MORE THAN THE MA ALPHA VALUE
    fill(c);
    fadeIn();
    counter++;

} else if(counter === 13 && webbingCounter < 2){
    alp = 0;
    webbing();

    webbingCounter++;
    if(webbingCounter === 2){
        webbingCounter = 0;
        counter++
    }
}  */





/*
    if(counter > 13 && counter < 26){
        console.log("num two");
        fadeIn();
        counter++;
    } else if(counter === 26){
        alp = 0;
        x += 15;
        y += 15;
        counter++;
    }  */ 







/* 
var x = xInit;
    var y = yInit;

    for(i = 0; i < 1; i++){
        while(i < 3){
            var alp = 0;
            while(alp < 256){
                
                alp += 50;
            }


            x += 15;
            y += 15;
            i++;

        }
        while(i < 6){
            c = color(80, 255);
            fill(c);
            rect(x, y, 30, 30);
            x += 15;
            y -= 15;
            i++;
        }
        while(i < 9){
            c = color(110, 255);
            fill(c);
            rect(x, y, 30, 30);
            x -= 15;
            y -= 15;
            i++;
        }
        while(i < 12){
            c = color(130, 255);
            fill(c);
            rect(x, y, 30, 30);
            x -= 15;
            y += 15;
            i++;
        }
    }
*/