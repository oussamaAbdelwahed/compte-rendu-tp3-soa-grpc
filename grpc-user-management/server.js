const grpc = require("grpc");
const protoLoader  = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("contract.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userManagPackage = grpcObject.userManagementPackage;


const server = new grpc.Server();

server.bind('localhost:9005',grpc.ServerCredentials.createInsecure());

server.addService(userManagPackage.UserManagement.service,{
  'add': add,
  'read' : read,
  'list': list,
  'update': update,
  'remove': remove
});

const users = [];

server.start();

function add(call,callback){
   const user = {
      id : call.request.id,
      fullName :call.request.fullName,
      email:  call.request.email,
      pwd:  call.request.pwd
   }
   
   users.push(user);
   const result = {
      id : call.request.id,
      fullName :call.request.fullName,
      email:  call.request.email
   }
   callback(null,result);
}


function read(call,callback){
   const id = call.request.value;
   var user ={};
   for(var i=0;i<users.length;i++){
     if(users[i].id == id){
      user.id =  users[i].id;
      user.fullName =  users[i].fullName;
      user.email =  users[i].email;
      break;
     }
   }
   callback(null,user);
}


function list(call,callback){
   const res = [];
   for(var i=0;i<users.length;i++){
      var user = {};
      user.id =  users[i].id;
      user.fullName =  users[i].fullName;
      user.email =  users[i].email;
      res.push(user);
   }
   callback(null,{value:res});
}


function update(call,callback){
   const id = call.request.id;
   var user = null;

   for(var i=0;i<users.length;i++){
     if(users[i].id == id){
      user = users[i];
      break;
     }
   }
   if(user != null){
     user.fullName = call.request.fullName;
     user.email = call.request.email;
     user.pwd = call.request.pwd;
   }

   const result = {
      id : call.request.id,
      fullName :call.request.fullName,
      email:  call.request.email
   }
   callback(null,result);
}


function remove(call,callback){
   const id = call.request.value;
   var test=false;
   for(var i=0;i<users.length;i++){
     if(users[i].id == id){
      users.splice(i,1);
      test = true;
      break;
     }
   }
  callback(null,{value : test});
}


