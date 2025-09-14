import { Link, useLocation } from "react-router-dom"
import {
  Package,
  ShoppingCart,
  Users,
  Settings,
  Home,
  LogOut,
  HelpCircle,
  Search,
  TicketPercent,
  Percent
} from "lucide-react"
import { useSidebar } from "../../context/AdminSidebarContext"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

export function AdminSidebar() {
  const {t} = useTranslation()
  const { i18n } = useTranslation()
  const location = useLocation()
  const pathname = location.pathname
  const { isOpen, isMobile } = useSidebar()
  const [searchQuery, setSearchQuery] = useState("")
  const [reget, setReget] = useState(false)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("lang", lng)

  }

  useEffect(() => {
    const storedLang = localStorage.getItem("lang")
    if (storedLang) {
      i18n.changeLanguage(storedLang)
    }
    document.documentElement.setAttribute("dir", storedLang === "ar" ? "rtl" : "ltr")
  }, [i18n, reget])

  if (isMobile && !isOpen) return null

  return (
    <div className={`${isOpen ? "w-64" : "w-0 -ml-64"} lg:ml-0 transition-all duration-300 fixed inset-y-0 left-0 z-40 flex flex-col bg-slate-900 border-r border-gray-700`}>
      {/* Sidebar Header */}
      <div className="flex flex-col">
        <div className="flex h-16 items-center px-4">
          <Link to="/admin" className="flex items-center gap-2 font-semibold text-white">
            <Package className="h-6 w-6 text-blue-500" />
            <span className="text-xl">Luxira</span>
          </Link>
        </div>
        <div className="px-4 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`${t("search")}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-md border border-gray-700 bg-slate-800 text-white px-8 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-auto py-2">
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">{t("main_menu")}</h3>
          <nav className="space-y-1">
            {[
              { to: "/admin", icon: <Home className="h-4 w-4" />, label: t("dashboard") },
              { to: "/admin/products", icon: <Package className="h-4 w-4" />, label: t("products") },
              // { to: "/admin/customers", icon: <Users className="h-4 w-4" />, label: t("customers") },
              { to: "/admin/g-data", icon: <Users className="h-4 w-4" />, label: t("insert_global_data") },
              { to: "/admin/offers", icon: <Percent className="h-4 w-4" />, label: t("offers") },
              { to: "/admin/coupons", icon: <TicketPercent className="h-4 w-4" />, label: t("coupons") },
              // { to: "/admin/analytics", icon: <BarChart3 className="h-4 w-4" />, label: "Analytics" },
              // { to: "/admin/payments", icon: <CreditCard className="h-4 w-4" />, label: "Payments" },
            ].map(({ to, icon, label, badge }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === to
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {icon}
                  <span>{label}</span>
                </div>
                {badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-700 text-white text-xs font-medium">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Settings</h3>
          <nav className="space-y-1">
            <span
              onClick={() => {
                const newLang = i18n.language === "en" ? "ar" : "en"
                changeLanguage(newLang)
                setReget(!reget)
              }}
              className="block cursor-pointer px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              {i18n.language === "en" ? "العربية" : "English"}
            </span>
          </nav>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-gray-700 p-4">
        <button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-all">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
  