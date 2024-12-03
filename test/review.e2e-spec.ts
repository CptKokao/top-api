import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';

const productId = new Types.ObjectId().toHexString();
const testDto = {
	name: 'test name',
	title: 'test title',
	description: 'test description',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST)', async () => {
		try {
			const response = await request(app.getHttpServer())
				.post('/review/create')
				.send(testDto);

			expect(response.status).toBe(201);
			const { body } = response;
			createId = body._id;
			expect(createId).toBeDefined();
		} catch (error) {
			console.error('Ошибка в тесте:', error);
			throw error;
		}
	});

	it('/review/byProduct/:productId (GET)', async () => {
		try {
			const response = await request(app.getHttpServer()).get(
				'/review/byProduct/' + productId,
			);

			expect(response.status).toBe(200);
			const { body } = response;
			expect(body.length).toBe(1);
		} catch (error) {
			console.error('Ошибка в тесте:', error);
			throw error;
		}
	});

	it('/review/:id (DELETE)', async () => {
		try {
			const response = await request(app.getHttpServer()).delete(
				'/review/' + createId,
			);

			expect(response.status).toBe(200);
		} catch (error) {
			console.error('Ошибка в тесте:', error);
			throw error;
		}
	});

	afterAll(() => {
		disconnect();
	});
});
