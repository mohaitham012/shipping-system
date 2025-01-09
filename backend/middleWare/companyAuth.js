import jwt from 'jsonwebtoken';

const companyAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, msg: "Not Authorized, Login Again" }); // أضف return هنا
  }

  try {
    const token_decoded = jwt.verify(token, process.env.COMPANY_JWT_SECRET);
    req.body.company = token_decoded.id; // إضافة بيانات التوكن إلى الطلب
    next(); // الانتقال إلى الدالة التالية
  } catch (error) {
    return res.json({ success: false, msg: error.message }); // أضف return هنا
  }
};

export default companyAuth;
