import React from 'react'
import { CiUser } from 'react-icons/ci'
import { FaShoppingCart } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { MdDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'

const SideBar = ({className}) => {
  return (
    <div className={`fixed inset-y-0 z-50 max-md:-left-14 max-md:hover:left-0 w-16 hover:w-64 bg-white
     shadow-black shadow-xl transition-all duration-300 ease-in-out group ${className}`}>
    <div className="p-4 overflow-hidden">
      <h2 className="text-xl font-bold mb-6 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Admin Panel
      </h2>
      <nav>
        <ul className="space-y-10 font-semibold">
          <li>
            <Link
              to="/admin"
              className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
            >
              <MdDashboard size={24} className="flex-shrink-0" />
              <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
            >
              <GiClothes size={24} className="flex-shrink-0" />
              <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Products
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
            >
              <FaShoppingCart size={24} className="flex-shrink-0" />
              <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Orders
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center text-gray-700 hover:text-[#ff6c00] transition-all"
            >
              <CiUser size={24} className="flex-shrink-0" />
              <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Users
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  )
}

export default SideBar;
