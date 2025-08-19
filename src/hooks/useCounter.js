import React, { useState } from 'react'

export default function useCounter(initValue = 0) {
    const [count, setCount] =useState(initValue);

    return  [count, setCount ];
}
