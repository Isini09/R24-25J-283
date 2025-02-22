import React from 'react'
import NavBarAdmin from '../../components/NavBarAdmin'

function Dashboard() {
  return (
    <div className="flex">
    <NavBarAdmin/>
      <div className=" ml-[250px] mt-[40px]">

        <div className="text-2xl mb-[40px] font-bold">Dashboard</div>

        <div className="flex gap-6">
  
          <div className="border-2 rounded-xl border-black w-[350px] h-[200px] shadow-black shadow-sm text-xl">

            <div className="flex ">
              <div className="flex flex-col ml-4">
              <div className="mt-10 ml-4 font-thin text-md">Total Users</div>
              <div className="mt-8 ml-4 text-[40px] font-bold text-green-900">20,009</div>
            </div>
              
          <svg className="w-[100px] h-[100px] mt-10 ml-auto mr-auto text-green-900 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
            
          </div>

        </div>

        <div className="border-2 rounded-xl border-black w-[350px] h-[200px] shadow-black shadow-sm text-xl">

          <div className="flex ">
            <div className="flex flex-col ml-4">
            <div className="mt-10 ml-4 text-md">Total Products</div>
            <div className="mt-8 ml-4 text-[40px] font-bold text-green-900">20,009</div>
          </div>
          
          <svg className="w-[100px] h-[100px]  mt-10 ml-auto mr-auto text-green-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>

          </div>

        </div>

        <div className="border-2 rounded-xl border-black w-[350px] h-[200px] shadow-black shadow-sm text-xl">

          <div className="flex ">
            <div className="flex flex-col ml-4">
            <div className="mt-10 ml-4 text-md">Total Suppliers</div>
            <div className="mt-8 ml-4 text-[40px] font-bold text-green-900">20,009</div>
          </div>
          
          <svg className="w-[100px] h-[100px] mt-10 ml-auto mr-auto text-green-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
          </svg>


          </div>
        </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard