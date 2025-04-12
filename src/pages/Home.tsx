import React from 'react';
import { Shield, Phone, MapPin, Bell } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../lib/firebase'; // Firebase setup with firestore()
export const Home = () => {

  const firstLoad = useRef(true); // avoids showing alerts for old data on load

  useEffect(() => {
    // Listen to real-time updates from the "emergencies" collection
    const unsub = onSnapshot(collection(db, "emergencies"), (snapshot) => {
      
      // Ignore old docs when first loading the page
      if (firstLoad.current) {
        firstLoad.current = false;
        return;
      }

      // Handle new documents (added)
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          const data = change.doc.data();
          const status = data.status?.stringValue || data.status;
          const timestamp = data.timestamp?.timestampValue || data.timestamp;
          
          // Show an alert with the data
          alert(`🚨 Emergency!\n\nStatus: ${status}\nTime: ${timestamp}`);
        }
      });
    });

    // Cleanup the listener when the component unmounts
    return () => unsub();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-4">
          Your Safety Matters
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Empowering women with immediate access to emergency assistance and safety resources
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <FeatureCard
          icon={<Shield className="w-8 h-8 text-purple-600" />}
          title="Emergency Alert"
          description="One-click emergency alert system with location tracking"
        />
        <FeatureCard
          icon={<Phone className="w-8 h-8 text-purple-600" />}
          title="Quick Contact"
          description="Instantly connect with emergency services"
        />
        <FeatureCard
          icon={<MapPin className="w-8 h-8 text-purple-600" />}
          title="Location Sharing"
          description="Real-time location tracking for your safety"
        />
        <FeatureCard
          icon={<Bell className="w-8 h-8 text-purple-600" />}
          title="Alert Contacts"
          description="Notify your emergency contacts immediately"
        />
      </div>

      <section className="bg-white rounded-2xl p-8 shadow-lg mb-16">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">Safety Resources</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Emergency Numbers</h3>
            <ul className="space-y-2">
              <li>Police: 911</li>
              <li>Women's Helpline: 1-800-XXX-XXXX</li>
              <li>Domestic Violence Hotline: 1-800-XXX-XXXX</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Safety Tips</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Stay aware of your surroundings</li>
              <li>Share your location with trusted contacts</li>
              <li>Keep emergency numbers on speed dial</li>
              <li>Trust your instincts</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);




