


// greet = ()=>{
//     console.log("morning");
// }

// function fun(cb){
//     console.log("this function is higher order dunction ")
// }

// fun(greet);

// fun(()=>{
//     console.log("morning");
// }
// )



// console.log("start");  // synchronus
// setTimeout(()=>{
//     //asynchronus
//     console.log("login")

// },2000)

// setTimeout(()=> {    //asynchronus
//     console.log("user details")
// },1000)
// console.log("end"); //synchrounus



//Asynchorunus function ko synchronously behave krwa rhe hai using callback function

console.log("first")

function userdetails(cb){
    setTimeout(()=> {    //asynchronus
    console.log("user details")
},1000)}

function login(cb){
    setTimeout(()=>{
    //asynchronus
    console.log("login")

},2000)}

function password(cb){
    setTimeout(()=>{
        console.log("12345")
},4000)}

function signup(){
    setTimeout(()=>{
        console.log("yes")
    },3000)}

login(()=>{
    userdetails(()=>{
        password(()=>{
            signup()
        })
    })
})


