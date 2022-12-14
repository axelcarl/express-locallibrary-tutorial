const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100},
  family_name: { type: String, required: true, maxLength: 100},
  date_of_birth: { type: Date},
  date_of_death: { type: Date},
});

AuthorSchema.virtual("name").get(function () {
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual('birth').get(function () {
  return this.date_of_birth ? this.date_of_birth.toLocaleString('en-US') : '';
})

AuthorSchema.virtual('death').get(function () {
  return this.date_of_death ? this.date_of_death.toLocaleString('en-US') : '';
})

module.exports = mongoose.model("Author", AuthorSchema);