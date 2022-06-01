import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { MainPage } from './components/MainPage';
import { FavPicsPage } from './components/FavPicsPage';

function App() {
    
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<MainPage />}/>
                <Route path='/favorites' element={<FavPicsPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
