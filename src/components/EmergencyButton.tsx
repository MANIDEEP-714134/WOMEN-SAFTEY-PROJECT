import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const EmergencyButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleEmergency = async () => {
    if (!user) {
      alert('You must be logged in to send an emergency alert!');
      return;
    }

    setIsLoading(true);
    console.log('Emergency button clicked');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('Location retrieved:', position.coords);

        const emergencyData = {
          userId: user.uid,
          timestamp: new Date().toISOString(),
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          status: 'active',
        };

        try {
          await setDoc(doc(db, 'emergencies', `${user.uid}_${Date.now()}`), emergencyData);
          alert('🚨 Emergency alert sent successfully!');
        } catch (error) {
          console.error('Error sending emergency alert:', error);
          alert('Failed to send emergency alert. Try again.');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('⚠️ Location access denied! Enable GPS and try again.');
        setIsLoading(false);
      }
    );
  };

  return (
    <button
      onClick={handleEmergency}
      disabled={isLoading}
      className="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white rounded-full p-6 shadow-lg transform transition-transform hover:scale-105 flex items-center gap-2"
    >
      {isLoading ? (
        <AlertCircle className="w-8 h-8 animate-pulse" />
      ) : (
        <Shield className="w-8 h-8" />
      )}
      <span className="text-lg font-bold">Emergency</span>
    </button>
  );
};
