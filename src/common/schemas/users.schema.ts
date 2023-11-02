import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { async } from 'rxjs';
export type UsersDocument = Users & Document;

@Schema({ timestamps: true, collection: 'Users' })
export class Users {
  @Prop({ required: [true, 'Please Enter your Name'] })
  name: string;

  @Prop({
    required: [true, 'Please Enter your Email'],
  })
  email: string;

  @Prop({
    required: [true, 'Please Enter your Password'],
    validate: {
      validator: (value) => value.length >= 6,
      message: 'Your password must be at least 6 characters',
    },
  })
  password: string;

  @Prop({ required: false, default: 'user' })
  role: string;

  @Prop({ required: false, default: Date.now })
  createdAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {}
});
UsersSchema.post('save', function (doc, next) {
  doc.password = undefined; // Remove the password field
  next();
});
