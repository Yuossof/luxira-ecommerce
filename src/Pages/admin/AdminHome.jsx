"use client"

import { useState, useRef, useEffect } from "react"
import { BarChart3, DollarSign, Package, ShoppingCart, Users, ArrowUp, ArrowDown, ArrowRight, Bell, Search, Calendar, TrendingUp, Percent, Eye, ShoppingBag, Menu, ChevronDown } from 'lucide-react'
import { SidebarProvider, useSidebar } from "../../context/AdminSidebarContext"
import AddProductForm from "../../Components/admin/products/addProducts/AddProductForm"

export default function AdminDashboard() {
  return (
    <SidebarProvider>
      <Dashboard />
    </SidebarProvider>
  )
}

function Dashboard() {
  const { isOpen, toggleSidebar } = useSidebar()
  const [activeTab, setActiveTab] = useState("overview")
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const userMenuRef = useRef(null)
  const notificationsRef = useRef(null)
  const filterRef = useRef(null)
  const viewRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {

      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false)
      }
      if (viewRef.current && !viewRef.current.contains(event.target)) {
        setViewOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const [showAddProductBox, setShowAddProductBox] = useState(false)

  return (
    <>
     <AddProductForm showAddProductBox={showAddProductBox} setShowAddProductBox={setShowAddProductBox}/>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <div className={`flex-1 transition-all duration-300`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <header className="bg-white border-b shadow-sm z-10">
              <div className="flex h-16 items-center gap-4 px-6">
                <button
                  onClick={toggleSidebar}
                  className="inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Sidebar</span>
                </button>

                <h1 className="text-xl font-semibold">Dashboard</h1>

                <div className="ml-auto flex items-center gap-4">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="search"
                      placeholder="Search..."
                      className="w-[200px] lg:w-[300px] h-9 rounded-full border border-gray-200 bg-gray-50 pl-8 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="relative" ref={notificationsRef}>
                    <button
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                      className="relative inline-flex items-center justify-center rounded-md p-1.5 text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
                        4
                      </span>
                    </button>

                    {notificationsOpen && (
                      <div className="absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="p-3 border-b">
                          <h3 className="text-sm font-semibold">Notifications</h3>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="px-4 py-3 hover:bg-gray-50 border-b last:border-0">
                              <p className="text-sm font-medium">New order received</p>
                              <p className="text-xs text-gray-500 mt-0.5">Order #{1000 + item} has been placed</p>
                              <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-2 border-t">
                          <button className="w-full rounded-md px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50">
                            View all notifications
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 overflow-hidden"
                    >
                      <img src="/placeholder-user.jpg" alt="Admin User" className="h-full w-full object-cover" />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="py-1">
                          <div className="px-4 py-2 border-b">
                            <p className="text-sm font-medium">Admin User</p>
                            <p className="text-xs text-gray-500">admin@example.com</p>
                          </div>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Settings
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Billing
                          </a>
                          <div className="border-t"></div>
                          <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            Logout
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto p-6 space-y-6">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
                    <p className="text-gray-500">Here&apos;s what&apos;s happening with your store today.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      <Calendar className="mr-2 h-4 w-4" />
                      Last 30 days
                    </button>
                    <button
                    onClick={()=> setShowAddProductBox(true)}
                     className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add Product
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Revenue Card */}
                  <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <div className="flex items-center pt-1 text-xs text-green-500">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      <span>+20.1% from last month</span>
                    </div>
                  </div>

                  {/* Orders Card */}
                  <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-gray-500">Orders</p>
                      <ShoppingCart className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">+573</div>
                    <div className="flex items-center pt-1 text-xs text-green-500">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      <span>+201 from last week</span>
                    </div>
                  </div>

                  {/* Products Card */}
                  <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-gray-500">Products</p>
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">1,324</div>
                    <div className="flex items-center pt-1 text-xs text-green-500">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      <span>+42 new this month</span>
                    </div>
                  </div>

                  {/* Customers Card */}
                  <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                      <p className="text-sm font-medium text-gray-500">Active Customers</p>
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold">+2,350</div>
                    <div className="flex items-center pt-1 text-xs text-red-500">
                      <ArrowDown className="mr-1 h-3 w-3" />
                      <span>-5.2% from last week</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 p-1 text-sm font-medium">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 ${activeTab === "overview" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                          }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveTab("recent-orders")}
                        className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 ${activeTab === "recent-orders" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                          }`}
                      >
                        Recent Orders
                      </button>
                      <button
                        onClick={() => setActiveTab("top-products")}
                        className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 ${activeTab === "top-products" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                          }`}
                      >
                        Top Products
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="relative" ref={viewRef}>
                        <button
                          onClick={() => setViewOpen(!viewOpen)}
                          className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                          Monthly
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </button>

                        {viewOpen && (
                          <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1">
                              <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Daily
                              </button>
                              <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Weekly
                              </button>
                              <button className="block w-full px-4 py-2 text-left text-sm bg-blue-50 text-blue-700">
                                Monthly
                              </button>
                              <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                Yearly
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <button className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Revenue Overview Card */}
                        <div className="col-span-4 rounded-lg border bg-white shadow-sm">
                          <div className="p-6 pb-0">
                            <h3 className="text-lg font-medium">Revenue Overview</h3>
                            <p className="text-sm text-gray-500">Monthly revenue performance and trends</p>
                          </div>
                          <div className="p-6">
                            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                              <div className="flex flex-col items-center">
                                <BarChart3 className="h-16 w-16 text-gray-300" />
                                <span className="mt-2 text-gray-400">Revenue Chart</span>
                              </div>
                            </div>
                          </div>
                          <div className="border-t px-6 py-3 flex justify-between text-xs text-gray-500">
                            <div>Updated 1 hour ago</div>
                            <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                              View Details <ArrowRight className="ml-1 h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Recent Transactions Card */}
                        <div className="col-span-3 rounded-lg border bg-white shadow-sm">
                          <div className="p-6 pb-0">
                            <h3 className="text-lg font-medium">Recent Transactions</h3>
                            <p className="text-sm text-gray-500">10 transactions in the last 24 hours</p>
                          </div>
                          <div className="p-6">
                            <div className="space-y-6">
                              {[
                                {
                                  name: "John Smith",
                                  email: "john@example.com",
                                  amount: "$1,999.00",
                                  status: "Completed",
                                },
                                {
                                  name: "Sarah Johnson",
                                  email: "sarah@example.com",
                                  amount: "$799.00",
                                  status: "Processing",
                                },
                                {
                                  name: "Michael Brown",
                                  email: "michael@example.com",
                                  amount: "$1,299.00",
                                  status: "Completed",
                                },
                                { name: "Emily Davis", email: "emily@example.com", amount: "$599.00", status: "Pending" },
                              ].map((transaction, i) => (
                                <div className="flex items-center" key={i}>
                                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    <span className="font-medium text-gray-600">{transaction.name.charAt(0)}</span>
                                  </div>
                                  <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{transaction.name}</p>
                                    <p className="text-sm text-gray-500">{transaction.email}</p>
                                  </div>
                                  <div className="ml-auto font-medium">
                                    {transaction.amount}
                                    <div className="text-xs text-gray-500">{transaction.status}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="border-t p-4">
                            <button className="w-full rounded-md px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
                              View All Transactions
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* KPI Cards */}
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* Conversion Rate Card */}
                        <div className="rounded-lg border bg-white shadow-sm">
                          <div className="p-6 pb-0">
                            <h3 className="text-lg font-medium">Conversion Rate</h3>
                            <p className="text-sm text-gray-500">Store visitor to customer conversion</p>
                          </div>
                          <div className="p-6">
                            <div className="flex flex-col items-center justify-center h-[150px]">
                              <div className="text-4xl font-bold">3.2%</div>
                              <div className="flex items-center mt-2 text-sm text-green-500">
                                <TrendingUp className="mr-1 h-4 w-4" />
                                <span>+0.5% from last month</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Average Order Value Card */}
                        <div className="rounded-lg border bg-white shadow-sm">
                          <div className="p-6 pb-0">
                            <h3 className="text-lg font-medium">Average Order Value</h3>
                            <p className="text-sm text-gray-500">Average revenue per order</p>
                          </div>
                          <div className="p-6">
                            <div className="flex flex-col items-center justify-center h-[150px]">
                              <div className="text-4xl font-bold">$78.92</div>
                              <div className="flex items-center mt-2 text-sm text-red-500">
                                <ArrowDown className="mr-1 h-4 w-4" />
                                <span>-2.3% from last month</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Discount Rate Card */}
                        <div className="rounded-lg border bg-white shadow-sm">
                          <div className="p-6 pb-0">
                            <h3 className="text-lg font-medium">Discount Rate</h3>
                            <p className="text-sm text-gray-500">Average discount per order</p>
                          </div>
                          <div className="p-6">
                            <div className="flex flex-col items-center justify-center h-[150px]">
                              <div className="text-4xl font-bold">12.5%</div>
                              <div className="flex items-center mt-2 text-sm text-green-500">
                                <Percent className="mr-1 h-4 w-4" />
                                <span>Optimal range (10-15%)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "recent-orders" && (
                    <div className="rounded-lg border bg-white shadow-sm">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6">
                        <div>
                          <h3 className="text-lg font-medium">Recent Orders</h3>
                          <p className="text-sm text-gray-500">Manage your store&apos;s latest orders</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 sm:mt-0">
                          <div className="relative" ref={filterRef}>
                            <button
                              onClick={() => setFilterOpen(!filterOpen)}
                              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                              All Orders
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </button>

                            {filterOpen && (
                              <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <div className="py-1">
                                  <button className="block w-full px-4 py-2 text-left text-sm bg-blue-50 text-blue-700">
                                    All Orders
                                  </button>
                                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                    Pending
                                  </button>
                                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                    Processing
                                  </button>
                                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                    Completed
                                  </button>
                                  <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                                    Cancelled
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          <button className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                            <ArrowDown className="mr-2 h-4 w-4" />
                            Export
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <th className="px-6 py-3">Order ID</th>
                              <th className="px-6 py-3">Customer</th>
                              <th className="px-6 py-3">Products</th>
                              <th className="px-6 py-3">Date</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3">Amount</th>
                              <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {[
                              {
                                id: "ORD-1001",
                                customer: "John Smith",
                                products: 3,
                                date: "2023-05-28",
                                status: "Completed",
                                amount: "$199.00",
                              },
                              {
                                id: "ORD-1002",
                                customer: "Sarah Johnson",
                                products: 1,
                                date: "2023-05-28",
                                status: "Processing",
                                amount: "$79.00",
                              },
                              {
                                id: "ORD-1003",
                                customer: "Michael Brown",
                                products: 2,
                                date: "2023-05-27",
                                status: "Completed",
                                amount: "$129.00",
                              },
                              {
                                id: "ORD-1004",
                                customer: "Emily Davis",
                                products: 4,
                                date: "2023-05-27",
                                status: "Pending",
                                amount: "$59.00",
                              },
                              {
                                id: "ORD-1005",
                                customer: "David Wilson",
                                products: 2,
                                date: "2023-05-26",
                                status: "Completed",
                                amount: "$149.00",
                              },
                              {
                                id: "ORD-1006",
                                customer: "Lisa Anderson",
                                products: 1,
                                date: "2023-05-26",
                                status: "Cancelled",
                                amount: "$89.00",
                              },
                            ].map((order, i) => (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.products}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${order.status === "Completed"
                                        ? "bg-green-100 text-green-800"
                                        : order.status === "Processing"
                                          ? "bg-blue-100 text-blue-800"
                                          : order.status === "Pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                      }`}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="text-gray-400 hover:text-gray-500">
                                    <Eye className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="border-t px-6 py-4 flex items-center justify-between">
                        <div className="text-xs text-gray-500">Showing 6 of 42 orders</div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-400 shadow-sm"
                            disabled
                          >
                            Previous
                          </button>
                          <button className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "top-products" && (
                    <div className="rounded-lg border bg-white shadow-sm">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6">
                        <div>
                          <h3 className="text-lg font-medium">Top Products</h3>
                          <p className="text-sm text-gray-500">Your best-selling products this month</p>
                        </div>
                        <button className="mt-4 sm:mt-0 inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                          View All Products
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <th className="px-6 py-3">Product</th>
                              <th className="px-6 py-3">Category</th>
                              <th className="px-6 py-3">Sales</th>
                              <th className="px-6 py-3">Inventory</th>
                              <th className="px-6 py-3">Price</th>
                              <th className="px-6 py-3">Conversion</th>
                              <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {[
                              {
                                name: "Advanced Mathematics Textbook",
                                category: "Educational",
                                sales: 120,
                                inventory: 50,
                                price: "$29.99",
                                conversion: "8.5%",
                              },
                              {
                                name: "The Little Prince Novel",
                                category: "Fiction",
                                sales: 105,
                                inventory: 60,
                                price: "$14.99",
                                conversion: "7.2%",
                              },
                              {
                                name: "Programming Fundamentals",
                                category: "Technical",
                                sales: 95,
                                inventory: 70,
                                price: "$39.99",
                                conversion: "6.8%",
                              },
                              {
                                name: "Arabic Dictionary",
                                category: "Reference",
                                sales: 85,
                                inventory: 40,
                                price: "$24.99",
                                conversion: "5.9%",
                              },
                              {
                                name: "World Cuisine Cookbook",
                                category: "Cooking",
                                sales: 75,
                                inventory: 30,
                                price: "$34.99",
                                conversion: "5.2%",
                              },
                            ].map((product, i) => (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {product.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.inventory}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.conversion}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="text-gray-400 hover:text-gray-500">
                                    <Eye className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="border-t px-6 py-4 flex justify-between">
                        <div className="text-xs text-gray-500">Updated 2 hours ago</div>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Download Report</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
