const grpc = require("grpc");
const protoLoader  = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("contract.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.calculatorPackage;

const client = new todoPackage.Calculator('localhost:9005',grpc.credentials.createInsecure());

client.addition({
   a:4,
   b:2
},(error,response) => {
     console.log('Received resut for addition of '+4+' AND '+2+' = '+response.value);
  }
)


client.soustract({
    a:4,
    b:2
 },(error,response) => {
    console.log('Received resut for soustract of '+4+' AND '+2+' = '+response.value);
   }
 )


 client.multiply({
    a:4,
    b:2
 },(error,response) => {
    console.log('Received resut for multiply of '+4+' AND '+2+' = '+response.value);
   }
 )


 client.divide({
    a:4,
    b:2
 },(error,response) => {
    console.log('Received resut for divide of '+4+' AND '+2+' = '+response.value);
   }
 )




