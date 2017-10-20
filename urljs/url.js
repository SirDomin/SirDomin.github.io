window["urljs_variables"] = [];

urlVariable = function(name, value) {
    this.name = name;
    this.value = value;
    return this.name;
}

function setVariable(name_of_variable, value_of_variable) {
    for(var i in window["urljs_variables"])
    {
        if(window["urljs_variables"][i].name == name_of_variable) {
            window["urljs_variables"][i].value = value_of_variable;
        } else {
            window["urljs_variables"].push(new urlVariable(name_of_variable,value_of_variable)); 
        }
    }
    
    if(window["urljs_variables"].length == 0)
        window["urljs_variables"].push(new urlVariable(name_of_variable,value_of_variable));
    
    return true;
}

function redirect(link, variables_to_send) {
    var tmp = "";
    
    for(var i in window["urljs_variables"])
    {
        for(var x=1;x<arguments.length;x++)
        {
            if(arguments[x] == window["urljs_variables"][i].name)
                tmp += window["urljs_variables"][i].name + "=" + window["urljs_variables"][i].value + "&";
        }
    }
    
    document.location.href = link + "?" + tmp;
}


function getVariable(variable_name) {
    var urlVar = document.location.search.replace("?", "");
    var err = false;
    urlVar = urlVar.split("&");
    
    console.log(urlVar.length)
    
    for(var i = 0; i < urlVar.length-1; i++)
    {   
        console.log(i)
        
        if(urlVar[i].match(variable_name)) {
            err = false;
            return urlVar[i].split("=")[1] || undefined;
        } else {
            err = true;
        }
    }
    
    if(err == true) return ("variable " + variable_name + " not found");
    
    //console.log(document.location.search.match("/"+variable_name+"/"))
}
