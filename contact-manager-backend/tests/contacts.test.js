const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Contacts = require('../model/Contacts');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Contact API', () => {
  let contactId;

  it('should add a contact', async () => {
    const res = await request(app).post('/api/contacts').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    contactId = res.body._id;
  });

  it('should not allow duplicate email', async () => {
    const res = await request(app).post('/api/contacts').send({
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
    });
    expect(res.statusCode).toBe(409);
  });

  it('should fetch all contacts', async () => {
    const res = await request(app).get('/api/contacts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch contacts with search query', async () => {
    const res = await request(app).get('/api/contacts?search=Test');
    expect(res.statusCode).toBe(200);
    expect(res.body.some(c => c.email === 'testuser@example.com')).toBe(true);
  });

  it('should update a contact', async () => {
    const res = await request(app)
      .put(`/api/contacts/${contactId}`)
      .send({
        firstName: 'Updated',
        lastName: 'User',
        email: 'updated@example.com',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe('Updated');
    expect(res.body.email).toBe('updated@example.com');
  });

  it('should return 404 when updating a non-existent contact', async () => {
    const res = await request(app)
      .put('/api/contacts/64f8adf0ddee8f23b89c7654') 
      .send({
        firstName: 'Fake',
        lastName: 'User',
        email: 'fake@example.com',
      });
    expect(res.statusCode).toBe(404);
  });

  it('should delete a contact', async () => {
    const res = await request(app).delete(`/api/contacts/${contactId}`);
    expect(res.statusCode).toBe(204);
  });
});
