import React from 'react'
import Gravatar from 'react-gravatar'
const CardUser = ({name, email}) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="flex flex-col items-center pb-10">
        <Gravatar email={email} size={100} rating="pg" default="monsterid" className="mt-4 w-32 h-32 rounded-full" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
    </div>
</div>
  )
}

export default CardUser