import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { logout } from '../services/apiService';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

interface EditableProduct extends Product {
  isEditing?: boolean;
}

interface FormState {
  id: string;
  name: string;
  price: string;
  description: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [formState, setFormState] = useState<FormState | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const API_URL = 'http://localhost:3001/api';

  const fetchProducts = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication token is missing');
      return;
    }
    const response = await axios.get(`${API_URL}/products/getall`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.status === 200) {
      setProducts(response.data.map((product: Product) => ({ ...product, isEditing: false })));
    } else {
      console.error('Failed to fetch products:', response.status);
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

  const startEditing = (product: Product) => {
    setFormState({ id: product._id, name: product.name, price: product.price.toString(), description: product.description });
    setProducts(products.map(p => p._id === product._id ? { ...p, isEditing: true } : p));
  };

  const cancelEditing = () => {
    setFormState(null);
    setProducts(products.map(p => ({ ...p, isEditing: false })));
  };

  const handleUpdateProduct = async () => {
    if (!formState) return;
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${API_URL}/products/${formState.id}`, {
        name: formState.name,
        price: Number(formState.price),
        description: formState.description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
      cancelEditing();  // Reset editing mode
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication token is missing');
      alert('You are not authenticated');
      return;
    }

    try {
      await axios.post(`${API_URL}/products/add`, { name, price, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(current => current ? { ...current, [name]: value } : null);
  };

  const handleDeleteProduct = async (productId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication token is missing');
      return;
    }
    try {
      await axios.delete(`${API_URL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
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
          {products.map(product => (
            <tr key={product._id}>
              <td>
                {product.isEditing ? (
                  <input type="text" name="name" value={formState?.name || ''} onChange={handleChange} />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {product.isEditing ? (
                  <input type="number" name="price" value={formState?.price || ''} onChange={handleChange} />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {product.isEditing ? (
                  <input type="text" name="description" value={formState?.description || ''} onChange={handleChange} />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {product.isEditing ? (
                  <>
                    <button onClick={handleUpdateProduct}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(product)}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  </>
                )}
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
        <input type="text" value={name} onChange={(e => setName(e.target.value))} placeholder="Name" />
        <input type="number" value={price} onChange={(e => setPrice(e.target.value))} placeholder="Price" />
        <input type="text" value={description} onChange={(e => setDescription(e.target.value))} placeholder="Description" />
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
