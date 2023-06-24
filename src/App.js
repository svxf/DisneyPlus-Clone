import React, { useEffect, useState } from 'react'
import './App.css';
import Detail from './components/Detail';

import MovieHelper from './components/MovieHelper'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Loading from './Loading';
import Home from './pages/Home';
import Profile from './pages/Profile';

import { auth } from './firebase'

function App() {
  const [user, setUser] = useState(null);
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading)
    <Loading />

  return (
    <div className="App">
      <Router>
        {user ? (
          <>
            <Sidebar />
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
              <Route path="/detail" element={<Detail />} />
              <Route path="/detail/:id" element={<Detail />} />
              {/* <Route path="/helper" element={<MovieHelper />} /> */}

              <Route
                path="*"
                element={
                  <h1>
                    Not Found.
                  </h1>
                }
              />
            </Routes>
          </>
        ) : (
          <Login />
        )}
      </Router>
    </div>
  );
}

export default App;