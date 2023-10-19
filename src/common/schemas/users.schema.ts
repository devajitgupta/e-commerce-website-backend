import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcrypt';
import { async } from 'rxjs';
export type UsersDocument = Users & Document;

@Schema({ timestamps: true, collection: 'Users' })
export class Users {
  @Prop({ required: false })
  username: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;
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
