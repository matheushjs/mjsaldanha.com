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
        for(var i = 0; i < in2; i++)
            out *= in1;
        break;
    default:
    }

    $("#answer").text(out.toString());
    $("#opStr").text(opStr);

    return false;
}