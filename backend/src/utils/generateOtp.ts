
export function generateOtp(length:number=4):String{
    const digit ='0123456789'
    let  otp=''

    for(let i=0;i<length;i++){
        otp +=digit[Math.floor(Math.random()*10)]
    }
    return otp
}