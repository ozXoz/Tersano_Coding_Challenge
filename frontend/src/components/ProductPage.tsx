import React, { useState, useEffect } from 'react';
import { logout } from '../services/apiService'; // Adjust the import path as necessary
import axios from 'axios';

// Define a type for product
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const API_URL = 'http://localhost:3001/api'; // Adjust the API URL as needed

  const fetchProducts = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token'); // Get the authentication token from localStorage
      if (!token) {
        console.error('Authentication token is missing');
        // Handle the case where the token is missing, e.g., redirect to the login page
        return;
      }
  
      const response = await axios.get(`${API_URL}/products/getall`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });
  
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error('Failed to fetch products. Server responded with status:', response.status);
      }
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post(`${API_URL}/products/add`, { name, price, description });
      fetchProducts(); // Refresh the product list after adding
      // Clear input fields after adding
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
      fetchProducts(); // Refresh the product list after deleting
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const renderProductTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Product Page</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h3>Add New Product</h3>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>
        <h3>All Products</h3>
        {renderProductTable()}
      </div>
    </div>
  );
};

export default ProductPage;
