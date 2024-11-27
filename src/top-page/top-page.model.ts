import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

@Schema({
	timestamps: true,
})
export class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

@Schema({
	timestamps: true,
})
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop()
	alias: string;

	@Prop({ unique: true })
	title: string;

	@Prop()
	category: string;

	@Prop()
	hh?: HhData;

	@Prop()
	advantages?: TopPageAdvantage[];

	@Prop()
	seoText?: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
