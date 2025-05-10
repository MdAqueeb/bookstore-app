import React, { useState, useEffect } from 'react';
import { GetSales } from './Controller/Apis';

const SalesOverview = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesOverviewData = async () => {
      try {

        const data = await GetSales();
        // {
          // totalSales: 0,
          // totalOrders: 0,
          // topSellingBook: {
          //   name: '',
          //   salesCount: 0
          // },
          // topSellingBooks: []
        // };
        setSalesData(data);          
      } catch (err) {
        setError('Error fetching sales data');
      } finally {
        setLoading(false);
      }
    };

    fetchSalesOverviewData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div>{error}</div>;



  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800">Sales Overview</h1>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Total Sales</h3>
          <p className="text-2xl font-bold text-green-600">${salesData.totalAmount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Orders Count</h3>
          <p className="text-2xl font-bold text-blue-600">{salesData.ordercount} Orders</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-600">Total Books</h3>
          <p className="text-xl font-semibold text-gray-800">{Object.keys(salesData.var).length}</p>
          {/* <p className="text-gray-500">Sold: {salesData.topSellingBook.salesCount} times</p> */}
        </div>
      </div>

      {/* <div className="mt-8 bg-white p-6 rounded-lg shadow-md" style={{ height: '300px' }}>
        <h3 className="text-xl font-semibold text-gray-600">Sales by Month</h3>
        <Line data={chartData} options={{ responsive: true }} />
      </div> */}

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-600">Top Selling Books</h3>
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-middle">Book Title</th>
              <th className="px-4 py-2 text-middle">Book Count</th>
              {/* <th className="px-4 py-2 text-middle">Revenue</th> */}
            </tr>
          </thead>
          <tbody>
            {Object.entries(salesData.var).map(([bookName,salesCount],index) => (
              <tr key={index}>
                <td className="px-4 py-2">{bookName}</td>
                <td className="px-4 py-2">{salesCount}</td>
                {/* <td className="px-4 py-2">${bookName}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesOverview;










































// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';  // Optional: Use Chart.js for visual representation
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// // import { GetSalesOverviewData } from './Controller/Apis';  // You can create an API call to get the sales data

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const SalesOverview = () => {
//   const [salesData, setSalesData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSalesOverviewData = async () => {
//       try {
//         // const data = await GetSalesOverviewData();  // Replace with your API call
//         // setSalesData(data);
//         const data = {
//             labels: ['Jan', 'Feb', 'Mar', 'Apr'],
//             datasets: [
//               {
//                 label: 'Sales',
//                 data: [65, 59, 80, 81],  // Replace with your actual data
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1
//               }
//             ]
//           };
//         setSalesData(data);          
//       } catch (err) {
//         setError('Error fetching sales data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSalesOverviewData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // Sample Data for chart - Replace it with actual sales data from the API
//   const chartData = {
//     labels: salesData.months,
//     datasets: [
//       {
//         label: 'Sales by Month',
//         data: salesData.salesByMonth,
//         fill: false,
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold text-gray-800">Sales Overview</h1>

//       {/* Sales Overview Cards */}
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-medium text-gray-600">Total Sales</h3>
//           <p className="text-2xl font-bold text-green-600">${salesData.totalSales}</p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-medium text-gray-600">Orders Count</h3>
//           <p className="text-2xl font-bold text-blue-600">{salesData.totalOrders} Orders</p>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-medium text-gray-600">Top-Selling Book</h3>
//           <p className="text-xl font-semibold text-gray-800">{salesData.topSellingBook.name}</p>
//           <p className="text-gray-500">Sold: {salesData.topSellingBook.salesCount} times</p>
//         </div>
//       </div>

//       {/* Sales Chart by Month */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-semibold text-gray-600">Sales by Month</h3>
//         <Line data={chartData} options={{ responsive: true }} />
//       </div>

//       {/* Optional: Table for Top Selling Books */}
//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-lg font-medium text-gray-600">Top Selling Books</h3>
//         <table className="min-w-full mt-4 table-auto">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">Book Title</th>
//               <th className="px-4 py-2 text-left">Sales Count</th>
//               <th className="px-4 py-2 text-left">Revenue</th>
//             </tr>
//           </thead>
//           <tbody>
//             {salesData.topSellingBooks.map((book) => (
//               <tr key={book.id}>
//                 <td className="px-4 py-2">{book.name}</td>
//                 <td className="px-4 py-2">{book.salesCount}</td>
//                 <td className="px-4 py-2">${book.revenue}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SalesOverview;
