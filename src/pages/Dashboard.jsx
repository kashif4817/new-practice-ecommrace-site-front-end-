import { useState, useEffect, useContext } from "react";
import {
  DollarSign,
  ShoppingCart,
  UserCheck,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Filter,
  Package,
  CheckCircle2,
  Truck,
  RefreshCw,
  Clock,
  XCircle,
  Star,
  Heart,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext.jsx";
// ─── Data ────────────────────────────────────────────────────────────────────

const statsData = [
  {
    label: "Total Revenue",
    value: "$48,265",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    label: "Total Orders",
    value: "1,847",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    label: "New Customers",
    value: "462",
    change: "-2.4%",
    trend: "down",
    icon: UserCheck,
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    trend: "up",
    icon: Target,
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
  },
];

const revenueData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 52 },
  { month: "May", value: 88 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 95 },
  { month: "Aug", value: 68 },
  { month: "Sep", value: 82 },
  { month: "Oct", value: 90 },
  { month: "Nov", value: 76 },
  { month: "Dec", value: 100 },
];

const recentOrders = [
  {
    id: "#LX-7291",
    customer: "Amelia Kingston",
    product: "Silk Cashmere Blend",
    amount: "$425.00",
    status: "Delivered",
    avatar: "AK",
    date: "2 min ago",
  },
  {
    id: "#LX-7290",
    customer: "Marcus Chen",
    product: "Italian Leather Bag",
    amount: "$1,250.00",
    status: "Shipped",
    avatar: "MC",
    date: "18 min ago",
  },
  {
    id: "#LX-7289",
    customer: "Sophie Laurent",
    product: "Diamond Pendant Set",
    amount: "$3,780.00",
    status: "Processing",
    avatar: "SL",
    date: "1 hr ago",
  },
  {
    id: "#LX-7288",
    customer: "James Rivera",
    product: "Swiss Chronograph",
    amount: "$8,950.00",
    status: "Pending",
    avatar: "JR",
    date: "2 hrs ago",
  },
  {
    id: "#LX-7287",
    customer: "Olivia Hart",
    product: "Merino Wool Coat",
    amount: "$695.00",
    status: "Cancelled",
    avatar: "OH",
    date: "3 hrs ago",
  },
  {
    id: "#LX-7286",
    customer: "David Kim",
    product: "Premium Sunglasses",
    amount: "$340.00",
    status: "Delivered",
    avatar: "DK",
    date: "5 hrs ago",
  },
];

const topProducts = [
  {
    name: "Swiss Chronograph Watch",
    category: "Accessories",
    sold: 284,
    revenue: "$42,600",
    progress: 95,
    image: "⌚",
  },
  {
    name: "Italian Leather Handbag",
    category: "Bags",
    sold: 196,
    revenue: "$29,400",
    progress: 78,
    image: "👜",
  },
  {
    name: "Silk Cashmere Scarf",
    category: "Apparel",
    sold: 164,
    revenue: "$8,200",
    progress: 65,
    image: "🧣",
  },
  {
    name: "Diamond Pendant",
    category: "Jewelry",
    sold: 89,
    revenue: "$26,700",
    progress: 52,
    image: "💎",
  },
  {
    name: "Premium Sunglasses",
    category: "Eyewear",
    sold: 312,
    revenue: "$15,600",
    progress: 88,
    image: "🕶️",
  },
];

const activityFeed = [
  {
    type: "order",
    message: "New order #LX-7291 from Amelia Kingston",
    time: "2 min ago",
    icon: ShoppingCart,
  },
  {
    type: "review",
    message: "5-star review on Swiss Chronograph Watch",
    time: "15 min ago",
    icon: Star,
  },
  {
    type: "customer",
    message: "New VIP customer registered: Marcus Chen",
    time: "32 min ago",
    icon: UserCheck,
  },
  {
    type: "stock",
    message: "Low stock alert: Italian Leather Bag (3 left)",
    time: "1 hr ago",
    icon: AlertCircle,
  },
  {
    type: "wishlist",
    message: "Diamond Pendant added to 24 wishlists today",
    time: "2 hrs ago",
    icon: Heart,
  },
  {
    type: "shipping",
    message: "Shipment #SP-4521 delivered successfully",
    time: "3 hrs ago",
    icon: Truck,
  },
];

const statusConfig = {
  Delivered: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Shipped: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  Processing: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  Pending: { bg: "bg-stone-100", text: "text-stone-600", dot: "bg-stone-400" },
  Cancelled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

const quickStats = [
  {
    label: "Pending Orders",
    value: "24",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Out for Delivery",
    value: "18",
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Completed Today",
    value: "47",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Returns",
    value: "3",
    icon: RefreshCw,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [chartPeriod, setChartPeriod] = useState("monthly");
  const { user, setUser } = useContext(UserContext);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs tracking-wider uppercase text-amber-600 font-medium">
              Welcome back {user.full_name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">
            Dashboard
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors cursor-pointer shadow-sm">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-stone-800 to-stone-900 text-white text-sm font-medium hover:from-stone-900 hover:to-stone-950 transition-all shadow-md shadow-stone-300 cursor-pointer">
            <Package className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-stone-200/60 p-5 lg:p-6 hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl ${stat.bgLight} flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-stone-800 tracking-tight">
              {stat.value}
            </p>
            <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-200/60 p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg font-bold text-stone-800">
                Revenue Overview
              </h3>
              <p className="text-sm text-stone-500">
                Monthly revenue performance
              </p>
            </div>
            <div className="flex items-center bg-stone-100 rounded-xl p-1">
              {["weekly", "monthly", "yearly"].map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    chartPeriod === p
                      ? "bg-white text-stone-800 shadow-sm"
                      : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-1.5 sm:gap-2 lg:gap-3 h-48 sm:h-56 lg:h-64">
            {revenueData.map((item, index) => (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div className="w-full flex flex-col items-center">
                  <span className="text-[10px] sm:text-xs text-stone-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                    ${(item.value * 482).toLocaleString()}
                  </span>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer ${
                      index === revenueData.length - 1
                        ? "bg-gradient-to-t from-amber-500 to-amber-400 shadow-lg shadow-amber-200"
                        : "bg-gradient-to-t from-stone-300 to-stone-200 group-hover:from-amber-400 group-hover:to-amber-300"
                    }`}
                    style={{
                      height: `${(item.value / 100) * 100}%`,
                      minHeight: "8px",
                    }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-stone-400 font-medium">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-stone-100">
            <div>
              <p className="text-xs text-stone-500">This Month</p>
              <p className="text-lg font-bold text-stone-800">$48,265</p>
            </div>
            <div>
              <p className="text-xs text-stone-500">Last Month</p>
              <p className="text-lg font-bold text-stone-800">$42,890</p>
            </div>
            <div>
              <p className="text-xs text-stone-500">Growth</p>
              <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                12.5%
              </p>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-5 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-stone-800">Top Products</h3>
              <p className="text-sm text-stone-500">Best sellers this month</p>
            </div>
            <button className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-5">
            {topProducts.map((product, i) => (
              <div key={product.name} className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-700 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-stone-400">
                      {product.category} • {product.sold} sold
                    </p>
                  </div>
                  <p className="text-sm font-bold text-stone-800 shrink-0">
                    {product.revenue}
                  </p>
                </div>
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? "bg-gradient-to-r from-amber-400 to-amber-500" : "bg-gradient-to-r from-stone-300 to-stone-400"}`}
                    style={{ width: `${product.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer">
            View All Products <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Orders + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-200/60 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 lg:p-6 pb-0">
            <div>
              <h3 className="text-lg font-bold text-stone-800">
                Recent Orders
              </h3>
              <p className="text-sm text-stone-500">
                Latest transactions from your store
              </p>
            </div>
            <button className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-stone-100">
                  {["Order", "Customer", "Product", "Amount", "Status"].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={`text-left text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-6 py-3 ${i === 2 ? "hidden md:table-cell" : ""}`}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const s = statusConfig[order.status];
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60 transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <p className="text-sm font-semibold text-stone-700">
                          {order.id}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {order.date}
                        </p>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-900 font-bold text-[9px] shrink-0">
                            {order.avatar}
                          </div>
                          <span className="text-sm text-stone-700 font-medium">
                            {order.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 hidden md:table-cell">
                        <span className="text-sm text-stone-500">
                          {order.product}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="text-sm font-semibold text-stone-800">
                          {order.amount}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${s.dot}`}
                          />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-5 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-stone-800">Activity</h3>
              <p className="text-sm text-stone-500">Recent store activity</p>
            </div>
            <button className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            {activityFeed.map((a, i) => (
              <div
                key={i}
                className="flex gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    a.type === "order"
                      ? "bg-amber-50 text-amber-600"
                      : a.type === "review"
                        ? "bg-yellow-50 text-yellow-600"
                        : a.type === "customer"
                          ? "bg-emerald-50 text-emerald-600"
                          : a.type === "stock"
                            ? "bg-red-50 text-red-500"
                            : a.type === "wishlist"
                              ? "bg-pink-50 text-pink-500"
                              : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <a.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-700 leading-snug">
                    {a.message}
                  </p>
                  <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer">
            View All Activity <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {quickStats.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl border border-stone-200/60 p-4 lg:p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}
            >
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xl lg:text-2xl font-bold text-stone-800">
                {item.value}
              </p>
              <p className="text-xs text-stone-500 truncate">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
