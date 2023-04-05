const { model, Schema } = require("mongoose");

let testSchema = new Schema({
  GuildId: String,
  UserId: String,
});

module.exports = model("testSchema", testSchema);
