import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name)
		private readonly UserModel: Model<UserModel>,
	) {}
	async createUser(dto: AuthDto) {
		const salt = genSaltSync(10);

		const newUser = new this.UserModel({
			email: dto.login,
			passwordHash: hashSync(dto.password, salt),
		});

		return newUser.save();
	}
	async findUser(email: string) {
		return this.UserModel.findOne({ email }).exec();
	}
}
