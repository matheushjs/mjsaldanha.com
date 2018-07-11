var input = [0, 0]; // 2 input numbers
var nInput = 0; // Counter of input given
var operation = "+";

function setDisplay(str){
    $(".myDisplay").text(str);
}

function onClear(){
    input[0] = 0;
    input[1] = 0;
    nInput = 0;

    setDisplay("");
    return false;
}

function onNum(num){
    var old = $(".myDisplay").text();
    $(".myDisplay").text(old + num);
    return false;
}

function pushNumber(){
    var str = $(".myDisplay").text();
    if(str.length === 0){
        return;
    }

    var num = Number(str);
    
    if(nInput < 2) {
        input[nInput] = num;
        nInput += 1;
    } else {
        input.shift();
        input.concat(Number());
    }
}

function onOp(op){
    pushNumber();
    operation = op;
    setDisplay("");
    return false;
}

function onEqual(){
    if(nInput === 0){
        return false;
    }

    pushNumber();

    if(nInput !== 2){
        return false;
    }

    var result = 0;

    switch(operation){
    case "+":
        result = input[0] + input[1];
        break;
    case "-":
        result = input[0] - input[1];
        break;
    case "*":
        result = input[0] * input[1];
        break;
    case "/":
        result = input[0] / input[1];
        break;
    case "**":
        result = Math.pow(input[0], input[1]);
        break;
    }

    nInput = 0;
    setDisplay(result.toString());

    return false;
}

function onSubmit(operation){
    var in1 = Number($("#in1").val());
    var in2 = Number($("#in2").val());
    var out = 0;
    var opStr = "";

    switch(operation){
    case "add":
        out = in1 + in2;
        opStr = "+";
        break;
    case "sub":
        out = in1 - in2;
        opStr = "-";
        break;
    case "mult":
        out = in1 * in2;
        opStr = "*";
        break;
    case "div":
        out = in1 / in2;
        opStr = "/";
        break;
    case "pow":
        out = 1;
        opStr = "**";
        for(var i = 0; i < in2; i++){
            out *= in1;
        }
        break;
    default:
    }

    $("#answer").text(out.toString());
    $("#opStr").text(opStr);

    return false;
}
