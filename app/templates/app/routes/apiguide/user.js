
/**
  @apiGroup User
  @apiVersion 0.1.0
  @api {post} /users/:id   获取用户信息
  
  @apiParam {Number} id  1-用户id
  @apiParamExample {json} Request-Example:
    {
      id:1
    }
 
  @apiSuccessExample Success-Response:
    HTTP/1.1 200 OK 
  {
    msg:"success",
    "code": 200,
    
}  


  @apiError code   错误代码
  @apiError msg   错误描述
  @apiErrorExample Error-Response:
      HTTP/1.1 200 
      {
        code:500,
        msg: "系统错误."
      }
 
 */


