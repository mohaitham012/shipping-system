import companyModel from "../models/companyModel.js";
import shippmentCompanyModel from "../models/companyShippmentsModel.js";

const addCompanyShippment = async (req, res) => {
  try {
    const { companyId, origin, destination, package_details } = req.body;
    const companyData = await companyModel.findById(companyId);

    // تحقق إذا كانت الشركة غير موجودة
    if (!companyData) {
      return res.json({ success: false, msg: "User is not defined" }); // استخدم return لتوقف تنفيذ الكود
    }

    const newShippment = await shippmentCompanyModel.create({
      companyId,
      origin,
      destination,
      package_details,
    });

    companyData.shipments = companyData.shipments || [];
    companyData.shipments.push(newShippment._id);

    await companyData.save(); // يجب حفظ بيانات الشركة بعد إضافة الشحنة

    res.json({
      success: true,
      msg: "Added successfully",
      shipment: newShippment,
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const getCompanyShippments = async (req, res) => {
  try {
    const { companyId } = req.query;
    const company = await companyModel
      .findById(companyId)
      .populate("shippments");

    if (!company) {
      res.json({ success: false, msg: "User is not defiend" });
    }

    res.json({ success: true, shipments: company.shipments });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const updateCompanyShippment = async (req, res) => {
  try {
    const {
      shipId,
      status,
      origin,
      destination,
      package_details,
      transition,
      transition_date,
      arrived,
      arrived_date,
      picked_up,
      picked_up_date,
      courier,
      estimated_delivery,
    } = req.body;
    const shippment = await shippmentCompanyModel.findByIdAndUpdate(
      shipId,
      {
        status,
        origin,
        destination,
        package_details,
        transition,
        transition_date,
        arrived,
        arrived_date,
        picked_up,
        picked_up_date,
        courier,
        estimated_delivery,
      },
      { new: true }
    );

    if (!shippment) {
      res.json({success:false,msg:"shippment is not defiend"});
    }else{
      res.json({success:true,shippment})
    }

  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const getShippmentByNumber = async (req, res) => {
  try {
    const {number} = req.query;
    const ship = await shippmentCompanyModel.findOne({number});

    if (!ship) {
      res.json({success:false,msg:"Shippment is not defiend"});
    }else{
      res.json({success:true,ship})
    }
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const getAllCompanyShippments = async (req, res) => {
try {
    const shippmentData = await shippmentCompanyModel.find();
    res.json({success:true,shipData:shippmentData});
} catch (error) {
  res.json({ success: false, msg: error.message });
}
};

export {
  addCompanyShippment,
  getCompanyShippments,
  updateCompanyShippment,
  getShippmentByNumber,
  getAllCompanyShippments,
};
