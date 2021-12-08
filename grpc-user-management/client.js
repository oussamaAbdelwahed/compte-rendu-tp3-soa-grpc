const grpc = require("grpc");
const protoLoader  = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("contract.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userManagPackage = grpcObject.userManagementPackage;

const client = new userManagPackage.UserManagement('localhost:9005',grpc.credentials.createInsecure());


client.list({},(error,response) => {
                  console.log('returned users list is '+JSON.stringify(response));
               }
)


client.remove({
   value:1
},(error,response) => {
     console.log('result of remove operation '+JSON.stringify(response));
  }
)

client.update({
   id:1,
   fullName:'test1 fullName UP',
   email:'test1UP@test.fr',
   pwd:'testpwd1 UP'
},(error,response) => {
     console.log('returned updated user is '+JSON.stringify(response));
  }
)

client.list({},(error,response) => {
     console.log('returned users list is '+JSON.stringify(response));
  }
)

client.read({
   value:1
},(error,response) => {
     console.log('returned user is '+JSON.stringify(response));
  }
)


client.add({
   id:1,
   fullName:'test1 fullName',
   email:'test1@test.fr',
   pwd:'testpwd1'
},(error,response) => {
     console.log('added user is '+JSON.stringify(response));
  }
)


client.add({
   id:2,
   fullName:'test2 fullName',
   email:'test2@test.fr',
   pwd:'testpwd2'
},(error,response) => {
     console.log('added user is '+JSON.stringify(response));
  }
)




