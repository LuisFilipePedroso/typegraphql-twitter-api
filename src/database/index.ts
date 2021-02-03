import mongoose from 'mongoose';

mongoose.connect('mongodb://192.168.0.103:27017/twitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
