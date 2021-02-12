import { Switch, Route, Redirect } from 'react-router-dom';
import SocketContextProvider from './contexts/Socket';
import React, { useEffect, useContext } from 'react';
import NotFoundPage from './screens/NotFoundPage';
import { AuthContext } from './contexts/Auth';
import EditVideo from './screens/EditVideo';
import MyVideos from './screens/MyVideos';
import Footer from './components/Footer';
import Header from './components/Header';
import Videos from './screens/Videos';
import Logout from './screens/Logout';
import Login from './screens/Login';

const App: React.FC = () => {

  const { tryAutoLogin, userToken } = useContext(AuthContext);
  
  useEffect(() => {
    tryAutoLogin();
  }, [tryAutoLogin]);

  const isUserAuthenticated: boolean = !!userToken;

  let routes: JSX.Element = (
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/videos?category=trailers' />} />
      <Route exact path='/videos' component={Videos} />
      <Route path='/login' component={Login} />
      <Route path='*' component={NotFoundPage} />
    </Switch>
  );

  if(isUserAuthenticated) {
    routes = (
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/videos?category=trailers' />} />
        <Route exact path='/videos' component={Videos} />
        <Route exact path='/videos/contents' component={MyVideos} />
        <Route path='/videos/contents/:videoId/edit' component={EditVideo} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    );
  };

  return (
    <>
      <SocketContextProvider>
        <Header />

        <main className='mt-5'>
          {routes}
        </main>

        <Footer />
      </SocketContextProvider>
    </>
  );
};

export default App;