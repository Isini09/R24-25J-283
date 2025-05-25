import React, { useEffect, useState } from 'react';
import NavBarAdmin from '../../components/NavBarAdmin';
import axios from 'axios';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// Enhanced StatCard component with modern green theme
function StatCard({ title, value, icon }) {
  const iconsMap = {
    users: '👥',
    boxes: '📦',
    check: '✅',
    truck: '🚚',
  };

  const gradientMap = {
    users: 'from-green-400 to-teal-600',
    boxes: 'from-green-400 to-teal-600',
    check: 'from-teal-400 to-cyan-600',
    truck: 'from-lime-400 to-green-600',
  };

  return (
    <div className="relative overflow-hidden group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[icon]} opacity-90 rounded-2xl`}></div>
      <div className="relative p-6 transition-all duration-300 border shadow-xl bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl hover:scale-105 hover:shadow-2xl hover:bg-white/20">
        <div className="flex items-center space-x-4">
          <div className="p-3 text-4xl transition-transform duration-300 transform rounded-full group-hover:scale-110 group-hover:rotate-6 bg-white/20 backdrop-blur-sm">
            {iconsMap[icon]}
          </div>
          <div>
            <p className="mb-1 text-sm font-medium tracking-wide uppercase text-white/80">{title}</p>
            <p className="text-3xl font-bold text-white tabular-nums">{value}</p>
          </div>
        </div>
        <div className="absolute w-16 h-16 rounded-full -right-4 -bottom-4 bg-white/10 blur-xl"></div>
      </div>
    </div>
  );
}

// Modern chart container
function ChartContainer({ title, children, className = "" }) {
  return (
    <div className={`group relative overflow-hidden bg-white/95 backdrop-blur-sm border border-green-100 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:bg-white ${className}`}>
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-green-50/50 to-transparent group-hover:opacity-100"></div>
      <div className="relative z-10">
        <h2 className="mb-4 text-lg font-bold tracking-tight text-gray-800">{title}</h2>
        {children}
      </div>
      <div className="absolute w-20 h-20 rounded-full -top-2 -right-2 bg-gradient-to-br from-green-200/30 to-emerald-200/30 blur-xl"></div>
    </div>
  );
}

// Enhanced list item
function ListItem({ title, subtitle, isUser = false }) {
  return (
    <div className="flex items-center p-4 space-x-4 transition-all duration-300 border border-green-100 group rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 hover:border-green-200 hover:shadow-md hover:transform hover:translate-x-1">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 group-hover:scale-110 ${
        isUser ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-gradient-to-br from-green-400 to-teal-500'
      } text-white shadow-lg`}>
        {isUser ? '👤' : '📦'}
      </div>
      <div className="flex-1">
        <p className="text-base font-semibold text-gray-800">{title}</p>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [verifiedProducts, setVerifiedProducts] = useState(0);
  const [productsWithIssues, setProductsWithIssues] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dummyUserData = [
    { month: 'Jan', users: 30 },
    { month: 'Feb', users: 45 },
    { month: 'Mar', users: 60 },
    { month: 'Apr', users: 80 },
    { month: 'May', users: 100 },
  ];

  const dummyProductData = [
    { name: 'A', count: 20 },
    { name: 'B', count: 35 },
    { name: 'C', count: 25 },
    { name: 'D', count: 15 },
  ];

  const complianceData = [
    { name: 'Compliant', value: 400 },
    { name: 'Non-Compliant', value: 100 },
  ];

  const COLORS = ['#10B981', '#EF4444'];

  const dummyBlockchainTxData = [
    { month: 'Jan', txCount: 150 },
    { month: 'Feb', txCount: 200 },
    { month: 'Mar', txCount: 180 },
    { month: 'Apr', txCount: 220 },
    { month: 'May', txCount: 260 },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 border border-green-200 shadow-xl bg-gray-800/90 backdrop-blur-md rounded-xl">
          <p className="font-medium text-white">{`${label}`}</p>
          <p className="text-green-300">
            {`${payload[0].name}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          productsRes,
          usersRes,
          suppliersRes,
          recentProductsRes,
          recentUsersRes,
          productListRes,
          verifiedRes,
          issuesRes,
        ] = await Promise.all([
          axios.get('http://localhost:5000/admin/total-products'),
          axios.get('http://localhost:5000/admin/total-users'),
          axios.get('http://localhost:5000/admin/total-suppliers'),
          axios.get('http://localhost:5000/admin/recent-products'),
          axios.get('http://localhost:5000/admin/recent-users'),
          axios.get('http://localhost:5000/admin/products'),
          axios.get('http://localhost:5000/admin/verified-products'),
          axios.get('http://localhost:5000/admin/products-with-issues'),
        ]);

        setTotalProducts(productsRes.data.totalProducts);
        setTotalUsers(usersRes.data.totalUsers);
        setTotalSuppliers(suppliersRes.data.totalSuppliers);
        setRecentProducts(recentProductsRes.data);
        setRecentUsers(recentUsersRes.data);
        setProductList(productListRes.data);
        setVerifiedProducts(verifiedRes.data.verifiedProducts);
        setProductsWithIssues(issuesRes.data.productsWithIssues);
        setFilteredProducts(productListRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(productList);
    } else {
      setFilteredProducts(
        productList.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.supplier.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, productList]);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="absolute bg-green-200 rounded-full top-1/4 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute rounded-full top-3/4 -right-40 w-80 h-80 bg-emerald-200 mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-teal-200 rounded-full top-1/2 left-1/2 w-60 h-60 mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <NavBarAdmin />
      <div className="ml-[250px] mt-[35px] p-6 w-full overflow-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">Monitor your supply chain performance at a glance</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-4">
          <StatCard title="Total Users" value={totalUsers} icon="users" />
          <StatCard title="Total Products" value={totalProducts} icon="boxes" />
          <StatCard title="Verified Products" value={verifiedProducts} icon="check" />
          <StatCard title="Total Suppliers" value={totalSuppliers} icon="truck" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
          <ChartContainer title="User Growth (Monthly)">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dummyUserData}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#10B981" 
                  strokeWidth={4}
                  fill="url(#userGradient)"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                />
                <CartesianGrid stroke="#e0e7ff" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Products by Suppliers">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dummyProductData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Compliance Status">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={complianceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Blockchain Transactions */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-1">
          <ChartContainer title="Blockchain Transactions">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dummyBlockchainTxData}>
                <defs>
                  <linearGradient id="blockchainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="txCount" 
                  stroke="#059669" 
                  strokeWidth={4}
                  fill="url(#blockchainGradient)"
                  dot={{ fill: '#059669', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#059669', stroke: '#fff', strokeWidth: 2 }}
                />
                <CartesianGrid stroke="#e0e7ff" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Recent Products and Users */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          <ChartContainer title="Recent Products">
            <div className="space-y-3">
              {recentProducts.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mb-4 text-6xl text-gray-400">📦</div>
                  <p className="text-gray-500">No recent products</p>
                </div>
              ) : (
                recentProducts.map((product) => (
                  <ListItem
                    key={product._id}
                    title={product.name}
                    subtitle={`Supplier: ${product.supplier}`}
                    isUser={false}
                  />
                ))
              )}
            </div>
          </ChartContainer>

          <ChartContainer title="Recent Users">
            <div className="space-y-3">
              {recentUsers.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mb-4 text-6xl text-gray-400">👥</div>
                  <p className="text-gray-500">No recent users</p>
                </div>
              ) : (
                recentUsers.map((user) => (
                  <ListItem
                    key={user._id}
                    title={user.name}
                    subtitle={`Email: ${user.email}`}
                    isUser={true}
                  />
                ))
              )}
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;