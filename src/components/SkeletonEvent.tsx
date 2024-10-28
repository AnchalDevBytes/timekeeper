import React from 'react'

const SkeletonEvent = () => {
  return (
    <div className='flex flex-col gap-2'>
        <div className="bg-purple-200 rounded-md shadow py-8 animate-pulse">
            <h3 className="font-semibold text-black"></h3>
            <p className="text-sm text-gray-500"></p>
        </div>
        <div className="bg-purple-200 rounded-md shadow py-8 animate-pulse">
            <h3 className="font-semibold text-black"></h3>
            <p className="text-sm text-gray-500"></p>
        </div>
        <div className="bg-purple-200 rounded-md shadow py-8 animate-pulse">
            <h3 className="font-semibold text-black"></h3>
            <p className="text-sm text-gray-500"></p>
        </div>
        <div className="bg-purple-200 rounded-md shadow py-8 animate-pulse">
            <h3 className="font-semibold text-black"></h3>
            <p className="text-sm text-gray-500"></p>
        </div>
    </div>
  )
}

export default SkeletonEvent;
