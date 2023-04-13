import React from 'react'
import { Chip } from 'konsta/react'

const Dosis = ({ml}) => {
    const roundToTwo = (num) => {
        return +(Math.round(num + "e+2") + "e-2");
    }
  return (
    <Chip colors={{ fillBg: 'bg-yellow-500', fillText: 'text-white' }}><span className="text-base">Dosis: {roundToTwo(ml)} ml</span></Chip>
  )
}

export default Dosis