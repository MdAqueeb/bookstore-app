import React, { useState, useEffect } from 'react';
import { AddRequestRole, GetRequestRole } from './Controller/Apis';

const RequestSellerRole = () => {
  const [reason, setReason] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [requestStatus, setRequestStatus] = useState(null);
  const [Requests, setRequestData] = useState([]);;

  // Fetch request status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await GetRequestRole();
        if (data && Array.isArray(data)) {
          console.log(data);
          console.log(data.length);
          setRequestData(data); // Store the list of requests in state
        } // Store the list of requests in state
      } catch (error) {
        console.error('Error fetching request status:', error.message);
      }
    };

    fetchStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason || !termsAccepted) {
      setSubmitStatus('Please fill out all fields and accept the terms.');
      return;
    }

    try {
      const response = await AddRequestRole({ reason });

      if (response && response.success) {
        setSubmitStatus('Your request has been successfully submitted! We will review it shortly.');

        if (response.data) {
          setRequestStatus({
            date: new Date(response.data.date).toLocaleDateString(),
            status: response.data.status,
          });
        }
      } else {
        setSubmitStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting request:', error.message);
      setSubmitStatus('Submission failed. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Request Seller Role</h1>
      <p className="text-center mb-6">
        Please fill out the form below to request an upgrade to a seller role. Your request will be reviewed by our team.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Reason Textbox */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-lg font-medium text-gray-700 mb-2">
            Why do you want to become a seller?
          </label>
          <textarea
            id="reason"
            name="reason"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Explain why you want to become a seller."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="mb-4">
          <label htmlFor="terms" className="block text-lg font-medium text-gray-700 mb-2">
            Terms and Conditions
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              required
            />
            <label htmlFor="terms" className="text-gray-600">
              I agree to the terms and conditions of becoming a seller.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-4 text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Request
          </button>
        </div>
      </form>

      {/* Submission Status */}
      {submitStatus && (
        <div className="mt-4 text-center text-lg text-gray-800">
          {submitStatus}
        </div>
      )}

      {/* Request Status Table */}
      <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Request Role Status</h2>
      {Requests.length === 0 ? (
        <p className="text-xl text-gray-500">Your Request Status is empty.</p>
      ) : (
        
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="py-3 px-6 border-b text-left bg-gray-100">Date Submitted</th>
                <th className="py-3 px-6 border-b text-left bg-gray-100">Status</th>
              </tr>
            </thead>

            <tbody>
              {/* Loop through all requests */}
              {Requests.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-6 border-b">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="py-3 px-6 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        item.status === 'PENDING'
                          ? 'bg-yellow-500'
                          : item.status === 'REJECTED'
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
      )}
      </div>
    </div>
  );
};

export default RequestSellerRole;
