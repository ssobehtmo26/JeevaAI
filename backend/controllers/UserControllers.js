const User = require("../models/UserSchema");

module.exports.allUsers = async (req,res) => {
    const userdata = await User.find();
    res.send(userdata);
}

module.exports.registerUser = async (req,res) => {
    const {docName, patientName, patientAge, recordDate, audioFile} = req.body;
    User.create({
        docName: docName,
        patientName: patientName,
        patientAge: patientAge,
        recordDate: recordDate,
        audioFile: audioFile
    }).then((data) => {
        console.log("created user");
        res.status(201).send(data);
    }).catch(e => {
        console.log(e);
        res.send({error: e, msg: "Something went wrong"});
    });

}