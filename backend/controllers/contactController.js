import validator from 'validator'
import contactModel from '../models/contactModel.js';

// add contact controller
const addContact = async (req,res) => {
  try {
    const {name,email,phone,subject,message} = req.body;

    if (!validator.isEmail(email)) {
      res.status(400).json({success:false,msg:"Please enter correct email"})
    }

    const newContact = new contactModel({
      name,
      email,
      phone,
      subject,
      message
    });

    await newContact.save()
    res.status(200).json({success:true,msg:"message sent"});

  } catch (error) {
    res.status(500).json({success:false,msg:error.messge})
  }
} 
// display contacts controller
const dispalyAllContacts = async (req,res) => {
  try {
    const contacts = await contactModel.find()
    res.status(200).json({success:true,contacts})
  } catch (error) {
    res.status(500).json({success:false,msg:error.message})
  }
}

export{addContact,dispalyAllContacts}
