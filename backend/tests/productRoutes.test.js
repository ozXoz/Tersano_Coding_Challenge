import request from 'supertest';
import app from '../server';  // Ensure this path is correct
import Product from '../models/Product';  // Ensure this is properly mocked if necessary
import { generateToken } from '../middleware/jwt'; // Ensure this path is correct and the utility exists

// Mock the Product model
jest.mock('../models/Product', () => {
  return {
    find: jest.fn().mockResolvedValue([
      { _id: '1', name: 'Product1', price: 100, description: 'Description1' },
      { _id: '2', name: 'Product2', price: 150, description: 'Description2' }
    ]),
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: '123', name: 'Updated Product', price: 150, description: 'Updated Description'
    }),
    findByIdAndDelete: jest.fn().mockResolvedValue({ _id: '123' }),
    mockReturnValue: jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: 'mocked-id',
        name: 'New Product',
        price: 200,
        description: 'New Description'
      })
    }))
  };
});

// Prepare a valid JWT token for testing
const testUser = { _id: 'testUserId' };  // Mock user data
const validToken = generateToken(testUser);  // Generate token

describe('Product Routes', () => {
  // Before all tests, you can set up mock data or establish a database connection if necessary
  beforeAll(async () => {
    // Set up any necessary mock data or database connection here
  });

  // After all tests, you can close any open connections or perform cleanup
  afterAll(async () => {
    // Close any open connections or perform cleanup here
  });

  // Test for GET /api/products/getall endpoint
  test('GET /api/products/getall - should return all products', async () => {
    // Mock data for testing
    const mockProducts = [
      { _id: '1', name: 'Product1', price: 100, description: 'Description1' },
      { _id: '2', name: 'Product2', price: 150, description: 'Description2' },
    ];

    // Mock the behavior of the Product model's find method
    Product.find.mockResolvedValue(mockProducts);

    // Send a GET request to the endpoint with authentication token in headers
    const response = await request(app)
      .get('/api/products/getall')
      .set('Authorization', `Bearer ${validToken}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });

  // Test for POST /api/products/add endpoint
  test('POST /api/products/add - should add a new product', async () => {
    const newProduct = { name: 'New Product', price: 200, description: 'New Description' };
    const expectedProduct = { ...newProduct, _id: 'mocked-id' };  // Expected output
    
    const response = await request(app)
      .post('/api/products/add')
      .set('Authorization', `Bearer ${validToken}`)
      .send(newProduct);
  
    console.log("Response Headers:", response.headers);
    console.log("Response Body:", response.body);  // To check the actual response body
    console.log("Response Status:", response.status);
  
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(expectedProduct);
  });
  
  // Test for PUT /api/products/:productId endpoint
  test('PUT /api/products/:productId - should update an existing product', async () => {
    // Mock data for testing
    const updatedProduct = { name: 'Updated Product', price: 150, description: 'Updated Description' };

    // Mock the behavior of the Product model's findByIdAndUpdate method
    Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

    // Send a PUT request to the endpoint with authentication token in headers
    const response = await request(app)
      .put('/api/products/123')
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedProduct);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedProduct);
  });

  // Test for DELETE /api/products/:productId endpoint
  test('DELETE /api/products/:productId - should delete the product', async () => {
    // Mock data for testing
    const productId = '123';

    // Mock the behavior of the Product model's findByIdAndDelete method
    Product.findByIdAndDelete.mockResolvedValue({ _id: productId });

    // Send a DELETE request to the endpoint with authentication token in headers
    const response = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${validToken}`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Product deleted successfully" });
  });
});
