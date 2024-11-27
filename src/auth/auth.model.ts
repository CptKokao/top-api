import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<AuthModel>;

@Schema({
	timestamps: true,
})
export class AuthModel {
	@Prop({ unique: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;
}
export const AuthSchema = SchemaFactory.createForClass(AuthModel);
