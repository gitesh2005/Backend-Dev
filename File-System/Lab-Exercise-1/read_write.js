const fs = require("fs")

// const readstream = fs.createReadStream("./lec3/inputfile.txt",{
//     hyperMark: 64*1024
// })

// readstream.on("data",(chunk)=>{
//     console.log(chunk.toString())
// })

// readstream.on("end",()=>{
//     console.log("data finished")
// })

const writestream = fs.createWriteStream("./lec3/writefile.txt",{
    flags:"a"
})

writestream.write("this is a text file\n")
writestream.write("this is a text file ")
writestream.write("this is a text file ")
writestream.write("this is a text filesssss ")

writestream.end();

writestream.on("finish",()=>{
    console.log("data finished");
} )