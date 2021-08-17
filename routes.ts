const express=require('express');
const fs=require('fs');
const router=express.Router();

var myData = JSON.parse(fs.readFileSync("data.json").toString());

router.get('/',(req,res)=>{
    res.send(myData);
});


router.post('/',(req,res)=>{
    var flag=0;
    const demo=req.body;
    for(var i=0;i<myData.length;i++){
        if(myData[i]["id"]==demo.id){
            res.sendStatus(404);
            flag=1;
        }
    } 
    if(flag==0){
    myData.push(demo);
    const stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send(myData);
    }
});

router.delete('/:Id',(req,res)=>{
    const { Id } = req.params;
    myData = myData.filter((demo)=> demo.id!=Id);
    const stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send(myData);
});

router.patch('/:Id',(req,res)=>{
    const { Id } = req.params;
    console.log("req",req);

    const user = req.body;
    for(var i=0;i<myData.length;i++){
        if(myData[i]["id"]==Id){
            break;
        }
    } 
    
    myData[i]["firstName"]=user.firstName;
    myData[i]["middleName"]=user.middleName;
    myData[i]["lastName"]=user.lastName;
    myData[i]["email"]=user.email;
    myData[i]["phoneNumber"]=user.phoneNumber;
    myData[i]["role"]=user.role;
    myData[i]["address"]=user.address;

    const stringifyData = JSON.stringify(myData);
    fs.writeFileSync('data.json', stringifyData);
    res.send("User updated");
  
    
}); 

export default router;
