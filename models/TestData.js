const mongoose = require('mongoose')
const { Schema } = mongoose

const testData = new Schema({
    name: String,
    birthdate: String,
    testdate: String,
    testtype: String,
    eyeside: String,
    rawgamedata: [{
        correctReaction: Number,
        ectopicReaction: Number,
        colorMode: String,
        size: String,
        col: Number,
        row: Number,
        index: Number
    }],
    numericalsummary: {
        total: Number,
        pureCorrectCount: Number,
        pureCorrectMean: Number,
        pureCorrectSd: Number,
        pureCorrectSmallCount: Number,
        pureCorrectSmallMean: Number,
        pureCorrectSmallSd: Number,
        pureCorrectMediumCount: Number,
        pureCorrectMediumMean: Number,
        pureCorrectMediumSd: Number,
        pureCorrectLargeCount: Number,
        pureCorrectLargeMean: Number,
        pureCorrectLargeSd: Number
    }
})


mongoose.model("testdata", testData)