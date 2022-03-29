import request from 'supertest'
import getUsers from './controllers/UserControllers'

//User is not logged in 

describe('Users endpoint', () => {
	it('should return a 401 status code when no token is set', async () => {
		const response = await request('http://localhost:5000')
			.get('/api/users');
		    expect(response.statusCode).toBe(401);
	});
})

describe('Matches endpoint', () => {
	it('should return a 401 status code when no token is set', async () => {
		const response = await request('http://localhost:5000')
			.get('/api/matches');
		    expect(response.statusCode).toBe(401);
	});
})

describe('Events endpoint', () => {
	it('POST: should return a 200 status code when all atributes are set', async () => {
		const response = await request('http://localhost:5000')
			.post('/api/events/create')
            .send({
                "description": "Jest testing",
                "status": "online"
            })
		    expect(response.statusCode).toBe(200);
	});
    it('POST: should return a 400 status code when "STATUS" atribute is missing', async () => {
		const response = await request('http://localhost:5000')
			.post('/api/events/create')
            .send({
                "description": "Jest testing",
            })
		    expect(response.statusCode).toBe(400);
	});
    it('POST: should return a 400 status code when "DESCRIPTION" atribute is missing', async () => {
		const response = await request('http://localhost:5000')
			.post('/api/events/create')
            .send({
                "status": "online",
            })
		    expect(response.statusCode).toBe(400);
	});
})
