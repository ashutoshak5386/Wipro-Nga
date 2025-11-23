import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormikLogin = ({ onLoginSuccess }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(6, 'Must be at least 6 characters')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('http://localhost:4000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert(`Welcome! Logging in as ${data.user.email}`);
                    if (onLoginSuccess) {
                        onLoginSuccess();
                    }
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login');
            }
        },
    });

    return (
        <div style={{
            border: '1px solid #ddd',
            padding: '30px',
            maxWidth: '400px',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginTop: 0, textAlign: 'center' }}>Customer Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '14px'
                        }}
                        placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '14px'
                        }}
                        placeholder="Enter your password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                            {formik.errors.password}
                        </div>
                    ) : null}
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Login to ShopNow
                </button>
            </form>
        </div>
    );
};

export default FormikLogin;
