let socket = io();

let msgSend = document.getElementById("sendMsg");
var count = 0;
var upvote = 0;
console.log(document.getElementById("name"));
msgSend.addEventListener("click", () => {
    let msgEle = document.getElementById("msgVal");
    let msgEle1  = "";
    if(msgEle.value != ""){
        let outerDiv = document.createElement("div");
        outerDiv.id = "messageOuter"+count;
        outerDiv.className = "messageOuter";
        let divEle = document.createElement("div");
        divEle.id = "messages"+count;
        divEle.className = "messages";
        
        let child1DivChild = document.createElement("div");
        let child1DivChild1 = document.createElement("div");

        child1DivChild.id = "parentChild"+count;
        child1DivChild1.id = "parentChild1"+count;

        child1DivChild.className = "parentChild";
        child1DivChild1.className = "parentChild1";

        let childDiv1 = document.createElement("div");
        let childDiv2 = document.createElement("div");
        let childDiv3 = document.createElement("div");
        
        let likeDiv = document.createElement("div");
        likeDiv.id = "usersLike";

        let likeDiv1 = document.createElement("div");
        let likeDiv2 = document.createElement("div");
        let likeDiv3 = document.createElement("div");

        likeDiv1.className = "increase";
        likeDiv2.className = "value";
        likeDiv3.className = "decrease";

        likeDiv2.textContent = 0;

        likeDiv1.id = "increase"+count;
        likeDiv2.id = "value"+count;
        likeDiv3.id = "decrease"+count;

        likeDiv.appendChild(likeDiv1);
        likeDiv.appendChild(likeDiv2);
        likeDiv.appendChild(likeDiv3);

        likeDiv1.textContent = "+";
        likeDiv3.textContent = "-";
        
        childDiv1.id = "child"+count;
        childDiv2.id = "childA"+count;
        childDiv3.id = "childB"+count;

        childDiv1.className = "child";
        childDiv2.className = "chilD1";
        childDiv3.className = "chilD2";

        let wholeDiv = document.createElement("div");
        wholeDiv.id = "outerOptionsDiv"+count;
        wholeDiv.className = "outerBox";

        let reply = document.createElement("div");
        let deleteDiv = document.createElement("div");
        let edit = document.createElement("div");

        reply.className = "replyDiv";
        deleteDiv.className = "deleteDiv";
        edit.className = "editDiv";

        edit.id = "edit"+count;
        
        wholeDiv.appendChild(reply);
        wholeDiv.appendChild(edit);
        wholeDiv.appendChild(deleteDiv);

        deleteDiv.textContent = "Del";
        edit.textContent = "Edit";
        reply.textContent = "Reply";

        reply.id = "reply"+count;
        
        // childDiv2.textContent = msgEle.value;
        child1DivChild.textContent = "User"+count;
        child1DivChild1.textContent = msgEle.value

        document.getElementById("messageDiv").appendChild(outerDiv);

        document.getElementById("messageOuter"+count).appendChild(divEle);
        document.getElementById("messages"+count).appendChild(childDiv1);

        childDiv2.appendChild(child1DivChild);
        childDiv2.appendChild(child1DivChild1);
        
        document.getElementById("messages"+count).appendChild(childDiv2);
        document.getElementById("messages"+count).appendChild(childDiv3);

        document.getElementById("child"+count).appendChild(likeDiv);
        document.getElementById("childB"+count).appendChild(wholeDiv);

        msgEle1 = msgEle.value;
        console.log(msgEle1);
        msgEle.value = "";

        document.getElementsByClassName("deleteDiv")[count].addEventListener("click", () => {
            outerDiv.remove();
            count--;
        })
        
        document.getElementsByClassName("replyDiv")[count].addEventListener("click", (event) => {
            let childId = event.target.id;
            let parentId = document.getElementById(childId).parentElement;
            let parent1Id = parentId.parentElement;
            let parent2Id = parent1Id.parentElement;
            let parent3Id = parent2Id.parentElement;
            console.log(parent3Id.id);
            let parentEle = parent3Id.id;
            console.log(divEle);
            let divOfReply = replyDivCreate(parentEle);
            console.log(divOfReply);
            document.getElementById(parent3Id.id).appendChild(divOfReply);
        })


        document.getElementsByClassName("editDiv")[count].addEventListener("click", (event)=>{
            let id = event.target.id;
            let id1 = document.getElementById(id).parentElement;
            let id2 = id1.parentElement;
            let id3 = id2.previousElementSibling;

            if(document.getElementById(id).textContent == "Edit"){
                console.log(id3);
                id3.contentEditable = true;
                id3.style.border = "2px solid blue";
                document.getElementById(id).textContent = "save";
            }
            else{
                id3.contentEditable = false;  
                id3.style.border = "none";
                document.getElementById(id).textContent = "Edit";
            }
        })

        document.getElementsByClassName("increase")[count].addEventListener("click", (event) => {
            let eventId = event.target.id;
            upvote++;
            let sibling = document.getElementById(eventId).nextElementSibling;
            console.log(sibling.textContent);
            sibling.textContent = +sibling.textContent+1;
            console.log(sibling);
        })

        document.getElementsByClassName("decrease")[count].addEventListener("click", (event) => {
            let eventId1 = event.target.id;
            upvote--;
            let sibling1 = document.getElementById(eventId1).previousElementSibling;
            sibling1.textContent = +sibling1.textContent-1;
            console.log(sibling1);
        })

        count++;
    }
    console.log(msgEle1);
    let p2 = fetch("http://localhost:3200/chat", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            msg : msgEle1,
        })
    })
   console.log(p2);
    
})

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('sendMsg').click();
    }
});

var newCount=0;
function replyDivCreate(parentEle){
    console.log(newCount);
    let createReplyDiv = document.createElement("div");
    createReplyDiv.id = "replyOuterDiv"+newCount;
    createReplyDiv.className = "replyOuterDiv";

    let divEle1 = document.createElement("div");
        divEle1.id = "replyMessages"+newCount;
        divEle1.className = "replyMessages";

    let childDivA = document.createElement("div");
    let childDivB = document.createElement("input");
    let childDivC = document.createElement("div");

    let likeOuterDivNew = document.createElement("div");
        likeOuterDivNew.id = "usersLikeNew";

        let likeOuterDivNew1 = document.createElement("div");
        let likeOuterDivNew2 = document.createElement("div");
        let likeOuterDivNew3 = document.createElement("div");

        likeOuterDivNew1.className = "newIncrease";
        likeOuterDivNew2.className = "newValue";
        likeOuterDivNew3.className = "newDecrease";

        likeOuterDivNew2.textContent = 0;

        likeOuterDivNew1.id = "newIncrease"+newCount;
        likeOuterDivNew2.id = "newValue"+newCount;
        likeOuterDivNew3.id = "newDecrease"+newCount;

        likeOuterDivNew.appendChild(likeOuterDivNew1);
        likeOuterDivNew.appendChild(likeOuterDivNew2);
        likeOuterDivNew.appendChild(likeOuterDivNew3);

        likeOuterDivNew1.textContent = "+";
        likeOuterDivNew3.textContent = "-";
        
        childDivA.id = "newChild"+newCount;
        childDivB.id = "newChildA"+newCount;
        childDivC.id = "newChildB"+newCount;

        childDivA.className = "newChild";
        childDivB.className = "newChilD1";
        childDivC.className = "newChilD2";

        let newWholeDiv = document.createElement("div");
        newWholeDiv.id = "newOuterOptionDiv"+newCount;
        newWholeDiv.className = "newOuterBox";

        let newSave = document.createElement("div");
        let newDelete = document.createElement("div");
        let newEdit = document.createElement("div");

        newSave.className = "newSaveDiv";
        newDelete.className = "newDeleteDiv";
        newEdit.className = "newEditDiv";

        newEdit.id = "newEdit"+newCount;
        
        newWholeDiv.appendChild(newSave);
        newWholeDiv.appendChild(newEdit);
        newWholeDiv.appendChild(newDelete);

        newDelete.textContent = "Del";
        newEdit.textContent = "Edit";
        newSave.textContent = "Save";

        newSave.id = "save"+newCount;
        console.log(createReplyDiv);
        console.log(parentEle);

        document.getElementById(parentEle).appendChild(createReplyDiv);

        document.getElementById("replyOuterDiv"+newCount).appendChild(divEle1);
        document.getElementById("replyMessages"+newCount).appendChild(childDivA);
        
        document.getElementById("replyMessages"+newCount).appendChild(childDivB);
        document.getElementById("replyMessages"+newCount).appendChild(childDivC);

        document.getElementById("newChild"+newCount).appendChild(likeOuterDivNew);
        document.getElementById("newChildB"+newCount).appendChild(newWholeDiv);

        document.getElementsByClassName("newSaveDiv")[newCount].addEventListener("click", (event) => {
            let targetId = event.target.id;
            console.log(targetId);
            let targetId1 = document.getElementById(targetId).parentElement;
            console.log(targetId1, targetId1.id);
            let targetId2 = targetId1.parentElement;
            console.log(targetId2, targetId2.id);
            let targetId3 = targetId2.previousElementSibling;
            console.log(targetId3, targetId3.id);
            console.log(document.getElementById(targetId3.id).contentEditable);
            document.getElementById(targetId3.id).contentEditable = false;
        })

        newCount++;
        return createReplyDiv;
}

socket.on("dbCommands", (data) => {
    for(let i=0; i<data.length; i++){
        if((data[i].name != null) && (data[i].commands != null)){
            let outerDiv = document.createElement("div");
        outerDiv.id = "messageOuter"+count;
        outerDiv.className = "messageOuter";
        let divEle = document.createElement("div");
        divEle.id = "messages"+count;
        divEle.className = "messages";

        let childDiv1 = document.createElement("div");
        let childDiv2 = document.createElement("div");
        let childDiv3 = document.createElement("div");
        
        let likeDiv = document.createElement("div");
        likeDiv.id = "usersLike";

        let likeDiv1 = document.createElement("div");
        let likeDiv2 = document.createElement("div");
        let likeDiv3 = document.createElement("div");

        likeDiv1.className = "increase";
        likeDiv2.className = "value";
        likeDiv3.className = "decrease";

        likeDiv2.textContent = 0;

        likeDiv1.id = "increase"+count;
        likeDiv2.id = "value"+count;
        likeDiv3.id = "decrease"+count;

        likeDiv.appendChild(likeDiv1);
        likeDiv.appendChild(likeDiv2);
        likeDiv.appendChild(likeDiv3);

        likeDiv1.textContent = "+";
        likeDiv3.textContent = "-";
        
        childDiv1.id = "child"+count;
        childDiv2.id = "childA"+count;
        childDiv3.id = "childB"+count;

        childDiv1.className = "child";
        childDiv2.className = "chilD1";
        childDiv3.className = "chilD2";

        let wholeDiv = document.createElement("div");
        wholeDiv.id = "outerOptionsDiv"+count;
        wholeDiv.className = "outerBox";

        let reply = document.createElement("div");
        let deleteDiv = document.createElement("div");
        let edit = document.createElement("div");

        reply.className = "replyDiv";
        deleteDiv.className = "deleteDiv";
        edit.className = "editDiv";

        edit.id = "edit"+count;
        
        wholeDiv.appendChild(reply);
        wholeDiv.appendChild(edit);
        wholeDiv.appendChild(deleteDiv);

        deleteDiv.textContent = "Del";
        edit.textContent = "Edit";
        reply.textContent = "Reply";

        reply.id = "reply"+count;
        
        childDiv2.textContent = data[i].commands;

        document.getElementById("messageDiv").appendChild(outerDiv);

        document.getElementById("messageOuter"+count).appendChild(divEle);
        document.getElementById("messages"+count).appendChild(childDiv1);
        
        document.getElementById("messages"+count).appendChild(childDiv2);
        document.getElementById("messages"+count).appendChild(childDiv3);

        document.getElementById("child"+count).appendChild(likeDiv);
        document.getElementById("childB"+count).appendChild(wholeDiv);

        msgEle1 = data[i].commands;

        document.getElementsByClassName("deleteDiv")[count].addEventListener("click", () => {
            outerDiv.remove();
            count--;
        })
        
        document.getElementsByClassName("replyDiv")[count].addEventListener("click", (event) => {
            let childId = event.target.id;
            let parentId = document.getElementById(childId).parentElement;
            let parent1Id = parentId.parentElement;
            let parent2Id = parent1Id.parentElement;
            let parent3Id = parent2Id.parentElement;
            console.log(parent3Id.id);
            let parentEle = parent3Id.id;
            console.log(divEle);
            let divOfReply = replyDivCreate(parentEle);
            console.log(divOfReply);
            document.getElementById(parent3Id.id).appendChild(divOfReply);
        })


        document.getElementsByClassName("editDiv")[count].addEventListener("click", (event)=>{
            let id = event.target.id;
            let id1 = document.getElementById(id).parentElement;
            let id2 = id1.parentElement;
            let id3 = id2.previousElementSibling;

            if(document.getElementById(id).textContent == "Edit"){
                id3.contentEditable = true;
                id3.style.border = "2px solid blue";
                document.getElementById(id).textContent = "save";
            }
            else{
                id3.contentEditable = false;  
                id3.style.border = "none";
                document.getElementById(id).textContent = "Edit";
            }
        })

        document.getElementsByClassName("increase")[count].addEventListener("click", (event) => {
            let eventId = event.target.id;
            upvote++;
            let sibling = document.getElementById(eventId).nextElementSibling;
            console.log(sibling.textContent);
            sibling.textContent = +sibling.textContent+1;
            console.log(sibling);
        })

        document.getElementsByClassName("decrease")[count].addEventListener("click", (event) => {
            let eventId1 = event.target.id;
            upvote--;
            let sibling1 = document.getElementById(eventId1).previousElementSibling;
            sibling1.textContent = +sibling1.textContent-1;
            console.log(sibling1);
        })

        count++;
    }
    }
})

