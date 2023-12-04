import mongoose, { connect, Schema, model, disconnect } from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/node');

interface IUser {
    name: string;
    email: string;
    age?: number;
  }

  const userSchema = new Schema<IUser>({
      name: { type: String, required: true },
      email: { type: String, required: true },
      age: { type: Number, required: false },
  });

const User = model<IUser>("User", userSchema);

  // Create new model entity
  // Save this entity into DB

  const user = new User({
    name: "Name",
    email: "test@test.com",
    age: 18
  });

  await user.save();

//    // To find one user or get an array of users
//    const user: IUser = await User.findOne({ email: 'test@test.com' });
//    const users: Array<IUser> = await User.find({ email: 'test@test.com' });
 
//    // Or it is possible to use .where()
//    const users: Array<IUser> = await User.where('email').eq('test@test.com');
 
//    // Or get all rows and then use .where()
//    const users: Array<IUser> = User.find().where({ email: 'test@test.com' });
 
//    // Also it is possible to chain queries
//    const users: Array<IUser> = User.find().where({ email: 'test@test.com' }).where({ age: 18 });

mongoose.disconnect();