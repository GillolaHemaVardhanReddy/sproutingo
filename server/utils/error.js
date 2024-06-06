export const returnError = (code,msg)=>{
    const err = new Error()
    err.statusCode = code
    err.message = msg
    return err
}