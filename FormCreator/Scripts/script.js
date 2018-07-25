class mainInput{
    constructor(id){
        this.id= id;
        this.child = null;
        this.mainDiv = document.createElement('div');
        this.mainDiv.margin = 0;
        this.mainDiv.id = 'main'+this.id;
        this.mainDiv.className = "mainDiv";
        document.getElementById('formContainer').appendChild(this.mainDiv);

        this.container = document.createElement('form');
        this.container.className = "mainInput";
        this.mainDiv.appendChild(this.container);

        this.questionContainer = document.createElement('div');
            this.questionContainer.className = "questionContainer";
            this.questionContainer.innerHTML = "Question: ";
            this.container.appendChild(this.questionContainer);

        this.questionInput = document.createElement('input');
            this.questionInput.className = "questionInput";
            this.questionInput.type = "text";
            this.questionInput.style.width = "70%";
            this.questionContainer.appendChild(this.questionInput);

        this.typeContainer = document.createElement('div');
            this.typeContainer.className = "typeContainer";
            this.typeContainer.innerHTML = "Type: ";
            this.container.appendChild(this.typeContainer);

        this.typeInput = document.createElement('select');
            this.typeInput.className = "typeInput";
            this.typeInput.style.width = "71.5%";
                this.typeInput.add(this.createNewOption("Text"));
                this.typeInput.add(this.createNewOption("Number"));
                this.typeInput.add(this.createNewOption("Yes / No"));
            this.typeContainer.appendChild(this.typeInput);

        this.addSubInput = document.createElement('input');
            this.addSubInput.className = "addSubInput";
            this.addSubInput.type = "button";
            this.addSubInput.value = "Add Sub-Input";
            this.addSubInput.onclick = () =>{
                structure.push(new subInput(this.mainDiv, structure.length,this.id));
                this.child = structure[structure.length - 1];
            };
        this.container.appendChild(this.addSubInput);

        this.deleteButton = document.createElement('input');
        this.deleteButton.className = "deleteButton";
        this.deleteButton.type = "button";
        this.deleteButton.value = "Delete";
        this.deleteButton.onclick = () =>{
            if(this.child)this.deleteChild(this.child.id);
            delete structure[this.id];
            document.getElementById("formContainer").removeChild(this.mainDiv);
        };
        this.container.appendChild(this.deleteButton);
    }
    createNewOption(text){
        let opt = document.createElement("option");
        opt.text = text;
        return opt;
    }
    deleteChild(id) {
        if(this.child.child){
            this.child.deleteChild(this.child.child.id);
        }
        this.child = null;
        this.mainDiv.removeChild(document.getElementById('sub'+id));
        delete structure[id];
    }
    getChildData(id){
        let data = [];
        if(this.child && this.child.child){
            data.push({
                "Question": this.questionInput.value, "type": this.typeInput.value ,
                "child": this.child.getChildData(this.child.child.id)
            });
        }else if(this.child) {
            data.push({
                "Question": this.questionInput.value,
                "type": this.typeInput.value,
                "child":{
                    "Condition":this.child.conditionInput.value + this.child.conditionAnswer.value,
                    "Question": this.child.questionInput.value,
                    "type": this.child.typeInput.value
                }
            })
        }else {
            data.push({
                "Question": this.questionInput.value, "type": this.typeInput.value ,
            });
        }
        return data;
    }
}
class subInput{
    constructor(parent, id, parentId){
        this.id = id;
        this.child = null;
        this.parentId = parentId;
        this.parent = parent;
            this.mainDiv = document.createElement('div');
            this.mainDiv.className = "mainDiv ";
            this.mainDiv.id = 'sub'+this.id;
            this.mainDiv.className += "condition-div";
            this.mainDiv.margin = parent.margin + 20;
        parent.appendChild(this.mainDiv);

        this.container = document.createElement('form');
            this.container.className = "mainInput";
            this.container.style = "margin-left: "+this.mainDiv.margin +"px";
            this.mainDiv.appendChild(this.container);

        this.conditionContainer = document.createElement('div');
            this.conditionContainer.className = "conditionContainer";
            this.conditionContainer.innerHTML = "Condition: ";
            this.container.appendChild(this.conditionContainer);

        this.conditionInput = document.createElement('select');
            this.conditionInput.className = "conditionInput";
            this.conditionInput.add(this.createNewOption("Equals"));
            if(this.parent.getElementsByTagName('form')[0].getElementsByClassName('typeContainer')[0].lastChild.value === "Number") {
                this.conditionInput.add(this.createNewOption("Greater than"));
                this.conditionInput.add(this.createNewOption("Less than"));
            }
        this.conditionInput.style.width = "30%";

        if(this.parent.getElementsByTagName('form')[0].getElementsByClassName('typeContainer')[0].lastChild.value === "Yes / No"){
            this.conditionAnswer = document.createElement('select');
            this.conditionAnswer.add(this.createNewOption("Yes"));
            this.conditionAnswer.add(this.createNewOption("No"));
            this.conditionAnswer.style.height = "21px";
            this.conditionAnswer.style.width = "41.5%";
        }else{
            this.conditionAnswer = document.createElement('input');
            this.conditionAnswer.style.width = "40%";
        }
        this.conditionAnswer.className = "conditionAnswer";
            this.conditionContainer.appendChild(this.conditionAnswer);
            this.conditionContainer.appendChild(this.conditionInput);

        this.questionContainer = document.createElement('div');
            this.questionContainer.className = "questionContainer";
            this.questionContainer.innerHTML = "Question: ";
            this.questionContainer.style = "margin-top: 10px";
            this.container.appendChild(this.questionContainer);

        this.questionInput = document.createElement('input');
            this.questionInput.className = "questionInput";
            this.questionInput.type = "text";
            this.questionInput.style.width = "70%";
            this.questionContainer.appendChild(this.questionInput);

        this.typeContainer = document.createElement('div');
            this.typeContainer.className = "typeContainer";
            this.typeContainer.innerHTML = "Type: ";
            this.container.appendChild(this.typeContainer);

        this.typeInput = document.createElement('select');
            this.typeInput.className = "typeInput";
            this.typeInput.style.width = "71.5%";
            this.typeInput.add(this.createNewOption("Text"));
            this.typeInput.add(this.createNewOption("Number"));
            this.typeInput.add(this.createNewOption("Yes / No"));
            this.typeContainer.appendChild(this.typeInput);

        this.addSubInput = document.createElement('input');
            this.addSubInput.className = "addSubInput";
            this.addSubInput.type = "button";
            this.addSubInput.value = "Add Sub-Input";
            this.addSubInput.onclick = () =>{
                structure.push(new subInput(this.mainDiv, structure.length, this.id));
                this.child = structure[structure.length - 1];
            };
        this.container.appendChild(this.addSubInput);

        this.deleteButton = document.createElement('input');
        this.deleteButton.className = "deleteButton";
        this.deleteButton.type = "button";
        this.deleteButton.value = "Delete";
        this.deleteButton.onclick = () =>{
            structure[this.parentId].deleteChild(this.id)
        };
        this.container.appendChild(this.deleteButton);
    }
    createNewOption(text){
        let opt = document.createElement("option");
        opt.text = text;
        return opt;
    }
    deleteChild(id) {
        if(this.child.child){
            this.child.deleteChild(this.child.child.id);
        }
        this.child = null;
        this.mainDiv.removeChild(document.getElementById('sub'+id));
        delete structure[id];
    }
    getChildData(id){
        let data = [];
        if(this.child.child){
            data.push({
                "Condition":this.conditionInput.value + this.conditionAnswer.value,
                "Question": this.questionInput.value, "type": this.typeInput.value ,
                "child": this.child.getChildData(this.child.child.id)
            });
        }else if(this.child) {
            data.push({
                "Condition":this.conditionInput.value + this.conditionAnswer.value,
                "Question": this.questionInput.value,
                "type": this.typeInput.value,
                "child":{
                    "Condition":this.child.conditionInput.value + this.child.conditionAnswer.value,
                    "Question": this.child.questionInput.value,
                    "type": this.child.typeInput.value
                }
            })
        }else {
            data.push({
                "Condition":this.conditionInput.value + this.conditionAnswer.value,
                "Question": this.questionInput.value, "type": this.typeInput.value ,
            });
        }
        return data;
    }
}
document.getElementById('creator').onclick = () =>{
  structure.push(new mainInput(structure.length));
};
document.getElementById('showAsJSON').onclick = () =>{
    console.log(JSON.stringify(getJsonFromStructure()))
};
document.getElementById("saveButton").onclick = () => {
    alert("saved json structure to localhost");
    localStorage.setItem("savedDataForm", JSON.stringify(getJsonFromStructure()));
};
document.body.onload = () => {
    //to be done later;
    //document.getElementById('formContainer').innerHTML += ((localStorage.getItem('savedDataForm')));
};
getJsonFromStructure = () => {
    json = [];
    for(let i in structure){
        if(!structure[i].parent){
            if(structure[i].child){
                json.push(structure[i].getChildData(structure[i].id))
            }else {
                json.push(structure[i].getChildData(structure[i].id))
            }
        }
    }
    return json;
};
let structure = [];
let json = [];