const fs= require("fs");

// fs.writeFileSync("./example.txt", "hello world");
// fs.readFile("./unknown.txt","utf8", (err,result)=>{
//     if(err){
//         console.log("Error reading file" ,err);
//     }
//     else{
//         console.log("file content", result);
//     }
// });

// console.log("1");

// const result= fs.readFileSync("./unknown.txt", "utf8");
// console.log(result);

// const os= require("os");
// console.log(os.cpus().length);



//importing File System Module
const fs = require("fs");
console.log("first")

// const read = (err, data)=>{
//     if(err){
//         throw err;
//     }
//     console.log(data)
// }
//  const data = fs.readFileSync("./unknown.txt", "utf-8");
//  console.log(data)
// fs.readFile("./unknown.txt", "utf-8",read);
// console.log("end");

// Read File Synchronously
// fs.writeFileSync("./example.txt", "Hello World!");
// const result= fs.readFileSync("./unknown.txt", "utf8");
// console.log(result);

// Blocking Operation
// console.log("1");
// const result= fs.readFileSync("./unknown.txt", "utf8");
// console.log(result);

// console.log("2");

// Non-Blocking Operation
// console.log("1");
// fs.readFile("./unknown.txt", "utf8", (err, result) => {
//     console.log(result);
// });
// console.log("2");

// Cpu Information
// const os=require("os");
// console.log(os.cpus().length);

// fs.appendFile("./Notes.txt", '$(Date.now()} Hey There! \n ');
// fs.cpSync("./example.txt", "./example_copy.txt");
// fs.unlinkSync("./example_copy.txt");
// fs.mkdirSync("./NewFolder");




console.log("first")

const read = (err, data)=>{
    if(err){
        throw err;
    }
    console.log(data)
}

// const data = fs.readFileSync("./unknown.txt","utf-8");
// console.log(data)


fs.readFile("./unknown.txt", "utf-8", read)


console.log("end")

