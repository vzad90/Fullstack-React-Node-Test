import request from 'supertest';
import app from '../app';

describe('API Integration Tests', () => {
  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello from Express + TypeScript!');
    });
  });

  describe('CORS', () => {
    it('should allow CORS requests', async () => {
      const response = await request(app)
        .get('/')
        .set('Origin', 'http://localhost:3000')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBe('*');
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      expect(response.body).toEqual({});
    });

    it('should handle malformed JSON in request body', async () => {
      const response = await request(app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send('invalid json')
        .expect(500);

      expect(response.body).toHaveProperty('errorss');
    });
  });

  describe('Protected Routes', () => {
    it('should require authentication for task routes', async () => {
      const response = await request(app)
        .get('/tasks')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });

    it('should require authentication for user routes that need it', async () => {
      const response = await request(app)
        .get('/users')
        .expect(401);

      expect(response.body).toEqual({ message: 'Unauthorized: No token' });
    });

    it('should allow access to user creation without authentication', async () => {
      const response = await request(app)
        .post('/users/create')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(400);

      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(401);
    });
  });
}); 