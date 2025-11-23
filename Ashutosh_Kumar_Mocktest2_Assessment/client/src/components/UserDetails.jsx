import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const UserDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    // Default to user 1 for /profile route
    const userId = id || '1';
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:4000/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <p>Loading profile...</p>;
    if (!user) return <p>User not found</p>;

    const isMyProfile = location.pathname === '/profile';

    return (
        <div style={{ border: '1px solid #ccc', padding: '30px', margin: '20px', borderRadius: '8px', maxWidth: '500px' }}>
            <h2>{isMyProfile ? 'My Profile' : 'Customer Profile'}</h2>
            <div style={{ marginTop: '20px' }}>
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            {isMyProfile && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '5px' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                        💡 This is your customer profile. You can view your account details here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
