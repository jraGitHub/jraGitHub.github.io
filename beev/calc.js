const elInputs = document.getElementsByClassName("inputs");

function addListeners(arg){
    for(let i=0;i<arg.length;i++){
		let buttonVal = arg[i].innerText;
		arg[i].addEventListener("click", function(){addToEqua(buttonVal);});
	}
};
let elInputsListener = addListeners(elInputs);
let elEquation = document.getElementById("equation").value;
let strInputs = "";
let strCalc = "";
let lastAnswer = "";
function addToEqua(input){
	console.log("input pressed");
	if (input === "X"){
		input = "*";
	};
	if (input === "=" && strCalc === "" || input === "=" && typeof strCalc === "number") {
		return ;
	};
	if (input.charCodeAt() > 47 && input.charCodeAt() < 58 || input === ".") { // if input is 0-9
		console.log("it's a number!");
		if (document.getElementById("equation").value == lastAnswer && typeof lastAnswer === "number") {
			console.log("nested if statement");
			strCalc = "";
			lastAnswer = "";
			clearDisplay();
		};
		strInputs += input;
		console.log(strInputs);
	    return document.getElementById("equation").value = strInputs;
	} else if (strCalc.length === 0 || typeof strCalc === "number") { // if input is not a number it adds strInputs & input to strCalc
		console.log("else if");
	    strCalc += strInputs + input;
		strInputs = "";
		console.log(strCalc,strInputs);
		return document.getElementById("equation").value = strInputs;
	}else lastAnswer = eval(strCalc + strInputs);
		strInputs = "";
		strCalc = lastAnswer;
		console.log("else" + " " + strCalc)
		return document.getElementById("equation").value = lastAnswer;
}
function clearDisplay (){ // clear entry
	console.log("display and strInputs cleared")
	strInputs = "";
	return document.getElementById("equation").value = strInputs;
}
function clearIt (){
	strCalc = "";
	lastAnswer = "";
    clearDisplay();
}
function backspace(){ 
    if (document.getElementById("equation").value == lastAnswer){ // incase user backspaces an answer 
		strInputs = lastAnswer.toString();
		strCalc = "";
	}
	strInputs = strInputs.substring(0,strInputs.length-1)
	return document.getElementById("equation").value = strInputs;
}

clearDisplay(); // incase of refresh will clear user input

// Overall status, fully working? besides missing memory functions and buttons.  I need to look over it in general