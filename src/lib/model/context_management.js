import React from 'react';
import { useContextBridge } from "@react-three/drei"

const ResultsContext = React.createContext()
const ContextBridge = useContextBridge(ResultsContext)

export {ResultsContext, ContextBridge}