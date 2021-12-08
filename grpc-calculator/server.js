const grpc = require("grpc");
const protoLoader  = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("contract.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculatorPackage;


const server = new grpc.Server();

server.bind('localhost:9005',grpc.ServerCredentials.createInsecure());

server.addService(calculatorPackage.Calculator.service,{
  'addition': addition,
  'soustract' : soustract,
  'multiply': multiply,
  'divide': divide
});

server.start();

function addition(call,callback){
   const result = call.request.a + call.request.b;
   callback(null,{value : result});
}


function soustract(call,callback){
   const result = call.request.a  - call.request.b;
   callback(null,{value : result});
}


function multiply(call,callback){
   const result = call.request.a * call.request.b;
   callback(null,{value : result});
}


function divide(call,callback){
  const result = call.request.a / call.request.b;
  callback(null,{value : result});
}


function readTodos(call,callback) {
    callback(null,{
     'items' : todos
   });
}