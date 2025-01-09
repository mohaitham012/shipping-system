import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next) => {
  const {token} = req.headers

  if (!token) {
    return res.json({success:false,msg:"Not Authorized Login Again"})
  }

try {
    const token_decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId = token_decoded.id
    next()

} catch (error) {
  console.log(error.message);
  return res.json({success:false,msg:error.message})
}};

export default userAuth;