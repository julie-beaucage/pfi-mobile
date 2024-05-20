import React, { useState, useEffect,createContext} from 'react';
import { useContext } from 'react';

export const PanierContext = createContext();

export function usePanierContext() {
    return useContext(PanierContext);
  }