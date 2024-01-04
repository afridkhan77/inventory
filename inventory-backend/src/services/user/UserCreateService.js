const UserCreateService = async(Request,DataModel)=>{
    try{
        let PostBody = Request.body;
        let data = await DataModel.Create(PostBody);
        return {status: "Success",data:data}
    }
    catch(error){
        return {status: "Fail",data:error.toString()}
    }

}
module.exports = UserCreateService