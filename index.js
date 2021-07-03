 
 const inputbox=document.getElementById("usertask")
 const addbtn=document.getElementById("addbtn")
 const taskcontainer=document.getElementById("taskcontainer");
 const taskarr = [];

 inputbox.focus()
function taskclick(){

    this.classList.toggle("completed");
    taskid=this.id;
    
    for(let i=0;i<taskarr.length;i++){

        if(taskarr[i].taskid.toString() ===taskid.toString())
        taskarr[i].iscompleted=!taskarr[i].iscompleted;
    } 
    
    settask();
}

function removetask()
{
  const taskid=this.id;
    for(let i=0;i<taskarr.length;i++){

        if(taskid.toString()===taskarr[i].taskid.toString())
        taskarr.splice(i,1);
        
    }
    settask();
    this.remove();
}

function settask(){

    localStorage.setItem("tasks",JSON.stringify(taskarr));
}

function gettask(){
    let tasks=localStorage.getItem("tasks");
    if(!tasks)return;
 
    tasks=JSON.parse(tasks);
    for(index in tasks){
        createtask(tasks[index].value,tasks[index].iscompleted,tasks[index].taskid);
        taskarr.push(tasks[index]);
    }
 }
 gettask();
 
function createtask(usertask,completed,taskid){

    const newElement=document.createElement("div")
    newElement.innerText=usertask;

    newElement.setAttribute("id",taskid)
     
    if(completed)newElement.setAttribute("class","task completed")
    
     else
    newElement.setAttribute("class","task");

    taskcontainer.append(newElement);
    newElement.addEventListener('click',taskclick);
    newElement.addEventListener('dblclick',removetask);



}

 function addtask(){
        
    const uservalue=document.getElementById("usertask").value;
    if(uservalue.trim()=="")
    {
      alert("please entry any task")
        return;
    }

    const taskObj={
        value:uservalue,
        iscompleted:false,
        taskid:Math.random()
    }

    taskarr.push(taskObj);
    settask();
    createtask(uservalue,taskObj.iscompleted,taskObj.taskid);

    inputbox.value = "";
    }

 function handle(e){

            if(e.keyCode===13)
            addtask()
 }

 addbtn.addEventListener('click',addtask);
 inputbox.addEventListener('keyup',handle);
 