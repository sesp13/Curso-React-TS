import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({ name: 'Monitor', price: 0 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toContain('precio');
  });

  it('should validate that the price is a number and greater than 0', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({ name: 'Monitor', price: 'Hola' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(2);
    expect(response.body.errors[0].msg).toContain('precio');
  });

  it('should create a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Test Product',
      price: 50,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /api/products', () => {
  it('should check if /api/products url exists', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).not.toBe(404);
  });

  it('should Get a JSON response with products', async () => {
    const response = await request(server).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty('errors');
    expect(response.status).not.toBe(404);
  });
});

describe('GET /api/products/:id', () => {
  it('should return a 404 response for a non-existent product', async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Producto no encontrado');
  });

  it('should check a valid id in the url', async () => {
    const response = await request(server).get('/api/products/invalid-url');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toContain('id no válido');
  });

  it('should get a JSON response for a single product', async () => {
    const response = await request(server).get('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('PUT /api/products', () => {
  it('should check a valid id in the url', async () => {
    const response = await request(server)
      .put('/api/products/invalid-url')
      .send({
        name: 'Producto',
        availability: true,
        price: 200,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toContain('id no válido');
  });

  it('should display validation messages when updating a product', async () => {
    const response = await request(server).put('/api/products/1');

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toEqual(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).put('/api/products/1').send({
      name: 'Monitor',
      availability: true,
      price: -300,
    });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('El precio debe ser positivo');

    expect(response.status).not.toEqual(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should return a 404 response for a not existent product', async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Monitor',
        availability: true,
        price: 300,
      });

    expect(response.status).toEqual(404);
    expect(response.body.error).toContain('Producto no encontrado');

    expect(response.status).not.toEqual(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should update an existing product with valid data', async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Monitor',
        availability: true,
        price: 300,
      });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toEqual(400);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('DELETE /api/products', () => {
  it('should check a valid id', async () => {
    const response = await request(server).delete('/api/products/not-valid');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].msg).toContain('id no válido');
  });

  it('should return a 404 response for a non existent product', async () => {
    const productId = 2000;
    const response = await request(server).delete(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toContain('Producto no encontrado');
  });

  it('should delete a product', async () => {
    const productId = 1;
    const response = await request(server).delete(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.msg).toContain('Producto eliminado');

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});
