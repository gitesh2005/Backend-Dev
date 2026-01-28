function login(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("login")
            resolve()
        },2000)

    })
}

function userdetails(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("user details")
            resolve()
        },2000)

    })
}

function password(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("password")
            resolve()
        },2000)

    })
}

// login()
// .then(()=>{
//     return userdetails();
// }).then(()=>{
//     return password()
// }).then(()=>{
//     console.log("all task done")
// }).catch((error)=>{
//     console.log("error")
// })


async function run(){

    try {
    await login()
    await userdetails()
    await password()
        
    } catch (error) {
        console.log("error")
        
    }
    
}

run()