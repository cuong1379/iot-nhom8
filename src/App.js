import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from "react-router-dom";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { createContext, useContext, useState } from 'react';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  console.log(auth)
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(localStorage.getItem('user'));

  const signin = user =>  setUser(user)

  const signout = () => {
    setUser(null);
  };

  return {
    user,
    signin,
    signout
  };
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {

  // let auth = useAuth();

  // useEffect(() => {
  //   auth.signin(localStorage.getItem('user') ? localStorage.getItem('user') : null)
  // }, [])

  return (
    <ProvideAuth>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      <div className="App">
          <Router>
              <Switch>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute path="/">
                  <Main />
                </PrivateRoute>
              </Switch>
            
          </Router>    
      </div>
      
    </ProvideAuth>
  )
}



export default App
