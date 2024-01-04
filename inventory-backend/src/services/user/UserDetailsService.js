const UserDetailsService = async(Request,DataModel)=>{
    try{
        let data = await DataModel.aggregate([{$match:{email:Request.headers['email']}}])
        return {status: "Success",data:data}
    }
    catch(error){
        return {status: "Fail",data:error.toString()}
    }
}
module.exports = UserDetailsService