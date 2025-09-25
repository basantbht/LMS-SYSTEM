// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { useGetPurchasedCoursesQuery } from '@/features/api/purchaseApi'
// import { LineChart } from 'lucide-react'
// import React from 'react'
// import { CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// const Dashboard = () => {

//   const {data,isSuccess,isError,isLoading} = useGetPurchasedCoursesQuery();

//   if(isLoading) return <h1>Loading...</h1>
//   if(isError) return <h1 className='text-red-500'>Failed to get purchased course</h1>

//   const {purchasedCourse} = data || [];

//   const courseData = purchasedCourse.map((course) => ({
//     name:course.courseId.courseTitle,
//     price:course.courseId.coursePrice
//   }))

//   return (
//     <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
//         <Card className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
//             <CardHeader>
//                 <CardTitle>Total Sales</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className='text-3xl font-bold text-blue-600'>400</p>
//             </CardContent>
//         </Card>

//         <Card className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
//             <CardHeader>
//                 <CardTitle>Total Revenue</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className='text-3xl font-bold text-blue-600'>1200</p>
//             </CardContent>
//         </Card>

//           {/* Course Prices Chart/Card */}
//       <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-gray-700">
//             Course Prices
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={courseData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//               <XAxis
//                 dataKey="name"
//                 stroke="#6b7280"
//                 angle={-30} // Rotated labels for better visibility
//                 textAnchor="end"
//                 interval={0} // Display all labels
//               />
//               <YAxis stroke="#6b7280" />
//               <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
//               <Line
//                 type="monotone"
//                 dataKey="price"
//                 stroke="#4a90e2" // Changed color to a different shade of blue
//                 strokeWidth={3}
//                 dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default Dashboard

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetPurchasedCoursesQuery } from '@/features/api/purchaseApi';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Dashboard = () => {
  // Fetch purchased courses
  const { data, isLoading, isError } = useGetPurchasedCoursesQuery();

  // Loading state
  if (isLoading) return <h1>Loading...</h1>;

  // Error state
  if (isError) return <h1 className="text-red-500">Failed to get purchased courses</h1>;

  // Safely get purchasedCourse array
  const purchasedCourse = data?.purchasedCourse || [];

  // Transform data for chart
  const courseData = purchasedCourse
    .filter(course => course?.courseId) // make sure courseId exists
    .map(course => ({
      name: course.courseId.courseTitle,
      price: course.courseId.coursePrice
    }));

    const totalRevenue = purchasedCourse.reduce((acc,element) => acc+(element.amount || 0), 0);

    const totalSales = purchasedCourse.length;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Total Sales Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      {/* Total Revenue Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">
            {totalRevenue}
          </p>
        </CardContent>
      </Card>

      {/* Course Prices Chart/Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">Course Prices</CardTitle>
        </CardHeader>
        <CardContent>
          {courseData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4a90e2"
                  strokeWidth={3}
                  dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No purchased courses yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
