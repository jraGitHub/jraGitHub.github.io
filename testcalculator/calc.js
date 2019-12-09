//
//
//
//

	function myCalculator(optStrClassName, optStrContainerClassName){
		let obj = new Object();
		let strClassName = optStrClassName || "myCalculator";
		let strCombinedValue = "";
		let numTheAnswer = "";
		let strLastOperator = "";
		
		
		obj.strButtonClassName = strClassName + "Buttons";
		obj.strContainerClassName = optStrContainerClassName || "body";
		obj.arrInputs = null;
		obj.arrCalculations = [];
		//obj.arrFunctions = ["C", "CE", "<<", "M+", "M-", "MS"]; // to do later
		obj.arrOperators = ["X", "/", "-", "+", "="];
		obj.arrNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "."];


		//
		// Build Calculator HTML
		//
		obj.build = function(){			
			let objMyCalculator = this;
			let iNumbersArrayLen = objMyCalculator.arrNumbers.length;
			let strFormula = "<div class='" + strClassName + "DivFormula'><span id='" + strClassName + "Formula'></span></div>";
			let strAnswer = "<div class='" + strClassName + "DivAnswer'><input type='text' id='" + strClassName + "Answer' value=''/></div>";
			let strTable0 = "<div class='" + strClassName + "Functions'><table class='" + strClassName + "Functions'>[TABLE0ROWS]</table></div>";
			let strTable1 = "<div class='" + strClassName + "Div1'><table class='" + strClassName + "Table1'>[TABLE1ROWS]</table></div>";
			let strTable2 = "<div class='" + strClassName + "Div2'><table class='" + strClassName + "Table2'>[TABLE2ROWS]</table></div>";
			let strCSS = "<style>." + strClassName + "Form{float: left;}." + strClassName + "Div1{float: left;}." + strClassName + "Div2{float: left;} ." + strClassName + "Buttons { width: 50px;} #" + strClassName + "Answer { text-align: right; width: 216px; }</style>";
			let strTable0Rows = "";
			let strTable1Rows = "";
			let strTable2Rows = "";
			
			
			let b1 = "<button class='" + strClassName + "Buttons'>";
			let b2 = "</button>";
			
			for(let x = 0; x < iNumbersArrayLen; x++){
				let n1 = objMyCalculator.arrNumbers[x++];
				let n2, n3 = "";
				
				if(n1 != ""){
					n1 = b1 + n1 + b2;
				}else{
					n1 = "&nbsp;";
				}
				
				if(x < iNumbersArrayLen){
					n2 = objMyCalculator.arrNumbers[x++];
					if(n2 != ""){
						n2 = b1 + n2 + b2;
					}else{
						n2 = "&nbsp;";
					}
				}
				
				if(x < iNumbersArrayLen){
					n3 = objMyCalculator.arrNumbers[x];					
					if(n3 != ""){
						n3 = b1 + n3 + b2;
					}else{
						n3 = "&nbsp;";
					}
				}				
				
				strTable1Rows += "<tr class='" + strClassName + "Row'><td class='" + strClassName + "Cell'>" + n1 + "</td>" + 
								"<td class='" + strClassName + "Cell'>" + n2 + "</td>" + 
								"<td class='" + strClassName + "Cell'>" + n3 + "</td></tr>"
			}
			
			for(let x = 0; x < objMyCalculator.arrOperators.length; x++){
				let o1 = objMyCalculator.arrOperators[x];
				strTable2Rows += "<tr class='" + strClassName + "Row'><td class='" + strClassName + "Cell'><button class='" + strClassName + "Buttons'>" + o1 + "</button></td></tr>";
			}
			
			strTable1 = strTable1.replace("[TABLE1ROWS]", strTable1Rows);
			strTable2 = strTable2.replace("[TABLE2ROWS]", strTable2Rows);
			
			// to do objMyCalculator.strContainerClassName
			document.write("<div class='" + strClassName + "Form'>" + strFormula + strAnswer + strTable1 + strTable2 + strCSS + "</div>");
		}
		
		
		//
		//  appendToFormulaArray
		//
		//
		obj.appendToFormulaArray = function(strValue){
			let objMyCalculator = this;
			
			//
			// EQUALS KEY
			//
			if (strValue === "="){
				if(strCombinedValue != ""){
					objMyCalculator.arrCalculations.push(strCombinedValue);
				}
			
				let strCurrentOperator = "";
				for(let x = 0; x < objMyCalculator.arrCalculations.length; x++){
					
					let arrItem = objMyCalculator.arrCalculations[x];					
					let bIsNum = !isNaN(arrItem);
					
					if(bIsNum){
						if(strCurrentOperator != ""){
							let strTemp = (numTheAnswer + " " + strCurrentOperator + " " + arrItem);							
							numTheAnswer = eval(strTemp);
							
						}else{
							numTheAnswer += eval(arrItem);
							
						}
					}else{
						strCurrentOperator = arrItem;
						
					}
				}		
				
				document.getElementById(strClassName + "Answer").value = numTheAnswer;				

				numTheAnswer = 0;
				strCombinedValue = "";

			//
			//  OPERATOR KEYS
			//
			//
			}else if (objMyCalculator.arrOperators.indexOf(strValue) >= 0){ 
				// design flaw
				if (strValue === "X"){
					strValue = "*";
				}
				if(strCombinedValue != ""){
					objMyCalculator.arrCalculations.push(strCombinedValue);
				}
				
				// if the last key pressed was an operator the pop it off the array
				if (strLastOperator !== "="){
					if (objMyCalculator.arrOperators.indexOf(strLastOperator) >= 0){ 
						objMyCalculator.arrCalculations.pop();
					}
				}
								
				objMyCalculator.arrCalculations.push(strValue);
				strCombinedValue = "";
				
			//
			// FUNCTION KEYS
			//
			//
			//}else if (objMyCalculator.arrFunctions.indexOf(strValue) >= 0){ 
				// to do
				
			}else{
				//
				// NUMBER KEYS
				//
				//
				
				// this is a new formula, lets clear the array and text box
				if (strLastOperator == "="){ 
				    objMyCalculator.arrCalculations = [];
					//document.getElementById(strClassName + "Answer").value = "0";
				}
				
				strCombinedValue += strValue;
				document.getElementById(strClassName + "Answer").value = strCombinedValue;
			}
			
			strLastOperator = strValue;  
		}
		
		//
		//  addListeners
		//
		//
		obj.addListeners = function(){
			let objMyCalculator = this;
			for (let x = 0; x < objMyCalculator.arrInputs.length; x++) {
				var objInput = objMyCalculator.arrInputs[x];
				
				objInput.addEventListener("click", function() {					
					objMyCalculator.appendToFormulaArray(this.innerText);
				});
			}
		}
		
		//
		//  init
		//
		//
		obj.init = function(){
			let objMyCalculator = this;
			objMyCalculator.build();
			// to do check is classname is passed
			objMyCalculator.arrInputs = document.getElementsByClassName(objMyCalculator.strButtonClassName);
			objMyCalculator.addListeners();
			document.getElementById(strClassName + "Answer").value = "0";
			
			
		}
		
		
		
		obj.init();
		return obj;
	}

    
	var calc = myCalculator();
	
	
	
	
//
//
//
//

	function myClassObject(optStrClassName, optStrContainerClassName){
		let obj = new Object();
        obj.version = "1.00 - 12/9/19"

		obj.helloWorld = function(){
			let objMyCalculator = this;
			//alert('Hello!  version: ' + objMyCalculator.version);
		}
        				
		//
		//  init
		//
		obj.init = function(){
			let objMyCalculator = this;
			// do some init stuff
		}	
		
		obj.init();
		return obj;
	}

    
	var obj = myClassObject();
	obj.helloWorld();
	