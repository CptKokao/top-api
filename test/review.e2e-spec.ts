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

const loginDto = {
	login: 'test@test.ru',
	password: '1234',
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto);

		token = body.access_token;
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

	it('/review/create (POST) - fail', async () => {
		try {
			const response = await request(app.getHttpServer())
				.post('/review/create')
				.send({ ...testDto, rating: 0 });

			expect(response.status).toBe(400);
		} catch (error) {
			console.error('Ошибка в тесте:', error);
			throw error;
		}
	});

	it('/review/byProduct/:productId (GET)', async () => {
		try {
			const response = await request(app.getHttpServer())
				.get('/review/byProduct/' + productId)
				.set('Authorization', 'Bearer ' + token);

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
			const response = await request(app.getHttpServer())
				.delete('/review/' + createId)
				.set('Authorization', 'Bearer ' + token);

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
