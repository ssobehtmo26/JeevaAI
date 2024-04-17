const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    docName: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    recordDate: {
        type: Date,
        required: true
    },
    audioFile: {
        type: String,
        required: true
    }
})

userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.recordDate = ret.recordDate.toISOString().split('T')[0];
        return ret;
    }
});

module.exports = mongoose.model("User", userSchema);