import {useState} from 'react'

function useCustomHook() {
    const [customState, setCustomState] = useState('custom state value');
  
    return [customState, setCustomState];
  }