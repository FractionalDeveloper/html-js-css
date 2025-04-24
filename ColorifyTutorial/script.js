function paint(color){ //function to paint the circle to a specific color
    console.log(color);

    const circle = document.getElementById('circleID') //get circle element
    
    circle.style.backgroundColor = color; //apply selected color as background
    
    const colorDisplay = document.getElementById('color'); //show current color
    colorDisplay.textContent = `Current color: ${color}`

}

function randomPaint(){ //generates random hex color string
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    console.log("Random color:", randomColor);

    const circle= document.getElementById('circleID'); //paint the circle with random color
    circle.style.backgroundColor = randomColor;

    const colorDisplay= document.getElementById('color'); //display the hex code of the random color
    colorDisplay.textContent = `Current Color: ${randomColor}`;
}
