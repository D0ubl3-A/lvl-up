import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function LandingCustomer() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
    fetchServices();
    fetchBookings();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get(`${API}/auth/me`);
      setUser(data);
    } catch (e) {
      toast.error('Failed to load profile');
    }
  };

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${API}/services`);
      setServices(data);
    } catch (e) {
      // Fallback to sample data
      setServices([
        { id: 1, name: 'Profile Optimization', description: 'Optimize your BIGO profile for better visibility', price: 50 },
        { id: 2, name: 'Live Coaching Session', description: '1-on-1 coaching for live streaming', price: 100 },
        { id: 3, name: 'Content Creation', description: 'Custom content for your streams', price: 75 }
      ]);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(`${API}/bookings`);
      setBookings(data);
    } catch (e) {
      // No bookings or error
    }
    setLoading(false);
  };

  const bookService = async (serviceId) => {
    try {
      await axios.post(`${API}/bookings`, { service_id: serviceId });
      toast.success('Service booked successfully');
      fetchBookings();
    } catch (e) {
      toast.error('Failed to book service');
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(`${API}/auth/profile`, user);
      toast.success('Profile updated');
    } catch (e) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input
                  value={user?.name || ''}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BIGO ID</label>
                <Input
                  value={user?.bigo_id || ''}
                  onChange={(e) => setUser({ ...user, bigo_id: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={user?.email || ''}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input
                  value={user?.phone || ''}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={updateProfile}>Update Profile</Button>
          </CardContent>
        </Card>

        {/* Services Section */}
        <Card>
          <CardHeader>
            <CardTitle>Available Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card key={service.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">${service.price}</Badge>
                      <Button onClick={() => bookService(service.id)} size="sm">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bookings Section */}
        <Card>
          <CardHeader>
            <CardTitle>My Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-gray-600">No bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{booking.service?.name}</h3>
                          <p className="text-sm text-gray-600">{booking.status}</p>
                          <p className="text-xs text-gray-500">Booked on: {new Date(booking.created_at).toLocaleDateString()}</p>
                        </div>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LandingCustomer;
