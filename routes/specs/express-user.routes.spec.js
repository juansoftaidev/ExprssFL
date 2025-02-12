import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/express-user.routes.js'; // Adjust the path as necessary
import { expect } from 'chai'; // Import Chai for assertions

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes); // Mount the user routes

describe('User  Routes', () => {
    // Test data
    const users = [
        { id: 1, name: 'User  One' },
        { id: 2, name: 'User  Two' },
    ];

    // Mock the user data retrieval
    before(() => {
        // You can set up any necessary mocks or initial data here
        // For example, you could use a library like sinon to mock database calls
    });

    it('should return all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body).to.deep.equal(users); // Check if the response matches the mock data
    });

    it('should return a user by ID', async () => {
        const res = await request(app).get('/api/users/1');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', 1);
        expect(res.body).to.have.property('name', 'User  One');
    });

    it('should return 404 for a non-existent user', async () => {
        const res = await request(app).get('/api/users/999');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'User  not found');
    });
});