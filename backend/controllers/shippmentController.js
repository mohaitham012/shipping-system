import shippmentModel from "../models/shippmentModel.js";
import userModel from "../models/userModel.js";

const addShippment = async (req, res) => {
  try {
    const { userId, origin, destination, packageDetails } = req.body;

    // التحقق من وجود المستخدم
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, msg: "User not found" });
    }

    // إنشاء شحنة جديدة وفقًا للنموذج
    const newShipment = await shippmentModel.create({
      userId,
      origin,
      destination,
      packageDetails,
    });

    // إضافة الشحنة إلى حساب المستخدم
    userData.shipments = userData.shipments || []; // التأكد من وجود حقل الشحنات
    userData.shipments.push(newShipment._id);

    // حفظ التحديثات في قاعدة بيانات المستخدم
    await userData.save();

    res.json({
      success: true,
      msg: "Shipment added successfully",
      shipment: newShipment,
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};
const getUserShippments = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await userModel.findById(userId).populate("shipments");

    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    res.json({ success: true, shippments: user.shipments });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const updateShippment = async (req, res) => {
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
    const shippment = await shippmentModel.findByIdAndUpdate(
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
      res.json({ success: false, msg: "shippment is not defiend" });
    } else {
      res.json({ success: true, shippment });
    }
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const getShippmentByNumber = async (req, res) => {
  try {
    const { number } = req.query;
    const ship = await shippmentModel.findOne({ number });

    if (!ship) {
      res.json({ success: false, msg: "shippment is not found" });
    } else {
      res.json({ success: true, ship });
    }
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

const getAllShippments = async (req, res) => {
  try {
    const shipData = await shippmentModel.find();
    res.json({ success: true, shipData });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

export {
  addShippment,
  getUserShippments,
  updateShippment,
  getShippmentByNumber,
  getAllShippments,
};
