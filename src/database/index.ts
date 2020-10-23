import mongoose from 'mongoose';

mongoose.connect('mongodb://192.168.0.104:27017/twitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
