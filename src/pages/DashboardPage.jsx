import { useState } from "react";
import {
  Crown,
  Search,
  Bell,
  Menu,
  X,
  Home,
  ShoppingBag,
  Users,
  BarChart3,
  Package,
  Settings,
  LogOut,
  ChevronDown,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  UserCheck,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Clock,
  Star,
  Heart,
  Truck,
  Gift,
  CreditCard,
  Calendar,
  Filter,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";



const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: ShoppingBag, label: "Products", badge: null },
  { icon: ShoppingCart, label: "Orders", badge: "24" },
  { icon: Users, label: "Customers", badge: null },
  { icon: BarChart3, label: "Analytics", badge: null },
  { icon: CreditCard, label: "Payments", badge: "3" },
  { icon: Truck, label: "Shipping", badge: null },
  { icon: Gift, label: "Promotions", badge: null },
];

const statsData = [
  {
    label: "Total Revenue",
    value: "$48,265",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-amber-400 to-amber-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    label: "Total Orders",
    value: "1,847",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-emerald-400 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    label: "New Customers",
    value: "462",
    change: "-2.4%",
    trend: "down",
    icon: UserCheck,
    color: "from-blue-400 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Conversion Rate",
    value: "3.24%",
    change: "+0.8%",
    trend: "up",
    icon: Target,
    color: "from-purple-400 to-purple-600",
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
  { id: "#LX-7291", customer: "Amelia Kingston", product: "Silk Cashmere Blend", amount: "$425.00", status: "Delivered", avatar: "AK", date: "2 min ago" },
  { id: "#LX-7290", customer: "Marcus Chen", product: "Italian Leather Bag", amount: "$1,250.00", status: "Shipped", avatar: "MC", date: "18 min ago" },
  { id: "#LX-7289", customer: "Sophie Laurent", product: "Diamond Pendant Set", amount: "$3,780.00", status: "Processing", avatar: "SL", date: "1 hr ago" },
  { id: "#LX-7288", customer: "James Rivera", product: "Swiss Chronograph", amount: "$8,950.00", status: "Pending", avatar: "JR", date: "2 hrs ago" },
  { id: "#LX-7287", customer: "Olivia Hart", product: "Merino Wool Coat", amount: "$695.00", status: "Cancelled", avatar: "OH", date: "3 hrs ago" },
  { id: "#LX-7286", customer: "David Kim", product: "Premium Sunglasses", amount: "$340.00", status: "Delivered", avatar: "DK", date: "5 hrs ago" },
];

const topProducts = [
  { name: "Swiss Chronograph Watch", category: "Accessories", sold: 284, revenue: "$42,600", progress: 95, image: "⌚" },
  { name: "Italian Leather Handbag", category: "Bags", sold: 196, revenue: "$29,400", progress: 78, image: "👜" },
  { name: "Silk Cashmere Scarf", category: "Apparel", sold: 164, revenue: "$8,200", progress: 65, image: "🧣" },
  { name: "Diamond Pendant", category: "Jewelry", sold: 89, revenue: "$26,700", progress: 52, image: "💎" },
  { name: "Premium Sunglasses", category: "Eyewear", sold: 312, revenue: "$15,600", progress: 88, image: "🕶️" },
];

const activityFeed = [
  { type: "order", message: "New order #LX-7291 from Amelia Kingston", time: "2 min ago", icon: ShoppingCart },
  { type: "review", message: "5-star review on Swiss Chronograph Watch", time: "15 min ago", icon: Star },
  { type: "customer", message: "New VIP customer registered: Marcus Chen", time: "32 min ago", icon: UserCheck },
  { type: "stock", message: "Low stock alert: Italian Leather Bag (3 left)", time: "1 hr ago", icon: AlertCircle },
  { type: "wishlist", message: "Diamond Pendant added to 24 wishlists today", time: "2 hrs ago", icon: Heart },
  { type: "shipping", message: "Shipment #SP-4521 delivered successfully", time: "3 hrs ago", icon: Truck },
];

const statusConfig = {
  Delivered: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", icon: CheckCircle2 },
  Shipped: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", icon: Truck },
  Processing: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", icon: RefreshCw },
  Pending: { bg: "bg-stone-100", text: "text-stone-600", dot: "bg-stone-400", icon: Clock },
  Cancelled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", icon: XCircle },
};

export default function DashboardPage({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [chartPeriod, setChartPeriod] = useState("monthly");
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="min-h-screen w-full flex bg-stone-50/80">
      {/* ===== MOBILE SIDEBAR OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 lg:z-10 w-72 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center justify-between px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crown className="w-6 h-6 text-stone-900" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-widest">LUXE</h1>
              <p className="text-amber-400/60 text-[8px] tracking-[0.3em] uppercase font-medium">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-stone-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold px-3 mb-3">
            Main Menu
          </p>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
                activeNav === item.label
                  ? "bg-gradient-to-r from-amber-500/15 to-amber-500/5 text-amber-400 border border-amber-500/20"
                  : "text-stone-400 hover:text-stone-200 hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] ${activeNav === item.label ? "text-amber-400" : "text-stone-500 group-hover:text-stone-300"}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeNav === item.label
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-white/10 text-stone-400"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold px-3 mb-3">
              Settings
            </p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-stone-200 hover:bg-white/5 transition-all duration-200 group cursor-pointer">
              <Settings className="w-[18px] h-[18px] text-stone-500 group-hover:text-stone-300" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer - User */}
        <div className="relative z-10 p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-900 font-bold text-sm shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-stone-500 truncate">admin@luxe.com</p>
            </div>
            <button
              onClick={onLogout}
              className="text-stone-500 hover:text-red-400 transition-colors cursor-pointer p-1"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* ===== TOP HEADER ===== */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-200/60">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            {/* Left: Hamburger + Search */}
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-stone-600 hover:text-stone-900 p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-stone-900" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-bold text-stone-800 tracking-widest">LUXE</span>
              </div>

              {/* Search */}
              <div className="hidden sm:flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search orders, products, customers..."
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                  />
                  <kbd className="hidden md:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 font-mono">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile search */}
              <button className="sm:hidden text-stone-500 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
              </button>

              {/* Calendar */}
              <button className="hidden md:flex text-stone-500 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span className="text-stone-600 font-medium">Today</span>
              </button>

              {/* Notifications */}
              <button className="relative text-stone-500 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-stone-200 hidden sm:block" />

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-900 font-bold text-xs">
                    AD
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-stone-700">Admin</p>
                    <p className="text-[10px] text-stone-400">Owner</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-stone-400 hidden sm:block" />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-stone-100">
                        <p className="text-sm font-semibold text-stone-800">Admin User</p>
                        <p className="text-xs text-stone-500">admin@luxe.com</p>
                      </div>
                      <div className="py-1">
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 cursor-pointer">
                          <Eye className="w-4 h-4" /> View Profile
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 cursor-pointer">
                          <Settings className="w-4 h-4" /> Settings
                        </button>
                      </div>
                      <div className="border-t border-stone-100 pt-1">
                        <button
                          onClick={onLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Page Title + Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-xs tracking-wider uppercase text-amber-600 font-medium">
                  Welcome back
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-800">Dashboard</h1>
              <p className="text-stone-500 text-sm mt-1">Here's what's happening with your store today.</p>
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

          {/* ===== STATS CARDS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
            {statsData.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl border border-stone-200/60 p-5 lg:p-6 hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgLight} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    stat.trend === "up"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-stone-800 tracking-tight">{stat.value}</p>
                <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ===== CHART + TOP PRODUCTS ===== */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            {/* Revenue Chart */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-200/60 p-5 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-stone-800">Revenue Overview</h3>
                  <p className="text-sm text-stone-500">Monthly revenue performance</p>
                </div>
                <div className="flex items-center bg-stone-100 rounded-xl p-1">
                  {["weekly", "monthly", "yearly"].map((period) => (
                    <button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        chartPeriod === period
                          ? "bg-white text-stone-800 shadow-sm"
                          : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end gap-1.5 sm:gap-2 lg:gap-3 h-48 sm:h-56 lg:h-64">
                {revenueData.map((item, index) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
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
                        style={{ height: `${(item.value / 100) * 100}%`, minHeight: "8px" }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-stone-400 font-medium">{item.month}</span>
                  </div>
                ))}
              </div>

              {/* Chart Summary */}
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
                        <p className="text-sm font-semibold text-stone-700 truncate">{product.name}</p>
                        <p className="text-xs text-stone-400">{product.category} • {product.sold} sold</p>
                      </div>
                      <p className="text-sm font-bold text-stone-800 shrink-0">{product.revenue}</p>
                    </div>
                    <div className="ml-13 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          i === 0
                            ? "bg-gradient-to-r from-amber-400 to-amber-500"
                            : "bg-gradient-to-r from-stone-300 to-stone-400"
                        }`}
                        style={{ width: `${product.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2.5 text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer">
                View All Products
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ===== RECENT ORDERS + ACTIVITY ===== */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            {/* Recent Orders Table */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-200/60 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 lg:p-6 pb-0 lg:pb-0">
                <div>
                  <h3 className="text-lg font-bold text-stone-800">Recent Orders</h3>
                  <p className="text-sm text-stone-500">Latest transactions from your store</p>
                </div>
                <button className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-stone-100">
                      <th className="text-left text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-6 py-3">Order</th>
                      <th className="text-left text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-6 py-3">Customer</th>
                      <th className="text-left text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-6 py-3 hidden md:table-cell">Product</th>
                      <th className="text-left text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-6 py-3">Amount</th>
                      <th className="text-left text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const status = statusConfig[order.status];
                      return (
                        <tr
                          key={order.id}
                          className="border-b border-stone-50 last:border-0 hover:bg-stone-50/60 transition-colors"
                        >
                          <td className="px-6 py-3.5">
                            <p className="text-sm font-semibold text-stone-700">{order.id}</p>
                            <p className="text-xs text-stone-400 mt-0.5">{order.date}</p>
                          </td>
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-900 font-bold text-[10px] shrink-0">
                                {order.avatar}
                              </div>
                              <span className="text-sm text-stone-700 font-medium">{order.customer}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 hidden md:table-cell">
                            <span className="text-sm text-stone-500">{order.product}</span>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="text-sm font-semibold text-stone-800">{order.amount}</span>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
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
                {activityFeed.map((activity, i) => (
                  <div key={i} className="flex gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-colors group">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      activity.type === "order" ? "bg-amber-50 text-amber-600" :
                      activity.type === "review" ? "bg-yellow-50 text-yellow-600" :
                      activity.type === "customer" ? "bg-emerald-50 text-emerald-600" :
                      activity.type === "stock" ? "bg-red-50 text-red-500" :
                      activity.type === "wishlist" ? "bg-pink-50 text-pink-500" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-700 leading-snug">{activity.message}</p>
                      <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2.5 text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer">
                View All Activity
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ===== QUICK STATS FOOTER ===== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { label: "Pending Orders", value: "24", icon: Clock, desc: "Awaiting processing", color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Out for Delivery", value: "18", icon: Truck, desc: "In transit", color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Completed Today", value: "47", icon: CheckCircle2, desc: "Successfully delivered", color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Returns", value: "3", icon: RefreshCw, desc: "Return requests", color: "text-red-500", bg: "bg-red-50" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-stone-200/60 p-4 lg:p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl lg:text-2xl font-bold text-stone-800">{item.value}</p>
                  <p className="text-xs text-stone-500 truncate">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="border-t border-stone-200/60 bg-white/50 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
            <p>&copy; 2024 LUXE Premium Store. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-stone-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-stone-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-stone-600 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}