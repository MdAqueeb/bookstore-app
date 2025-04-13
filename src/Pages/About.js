import React from 'react';
import Header from '../Components/Header';

const About = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-6 text-center">About Our Bookstore</h1>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                alt="Bookstore interior" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="mb-4">
                Founded in 2010, our bookstore has been a haven for book lovers from all walks of life. 
                What started as a small corner shop has now grown into a beloved community space where 
                ideas are exchanged, stories are shared, and imaginations are ignited.
              </p>
              <p className="mb-4">
                We believe in the power of literature to transform lives and build bridges between 
                different cultures and perspectives. Our carefully curated collection spans across 
                genres, ensuring there's something for everyone.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Mission</h2>
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <p className="text-lg italic text-center">
              "To foster a love for reading and learning by providing access to diverse, 
              thought-provoking literature in a welcoming environment."
            </p>
          </div>
        </section>

        {/* <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <img 
                src="https://randomuser.me/api/portraits/women/42.jpg" 
                alt="Sarah Johnson" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-medium text-center">Sarah Johnson</h3>
              <p className="text-gray-600 text-center">Founder & CEO</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="David Chen" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-medium text-center">David Chen</h3>
              <p className="text-gray-600 text-center">Head of Curation</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <img 
                src="https://randomuser.me/api/portraits/women/24.jpg" 
                alt="Maya Patel" 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-medium text-center">Maya Patel</h3>
              <p className="text-gray-600 text-center">Community Manager</p>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
};

export default About; 