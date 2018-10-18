const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const GiftSchema= new Schema({
    giftname:String,
    description:String,
    owner: String,

});

module.exports = mongoose.model('Gift',GiftSchema);