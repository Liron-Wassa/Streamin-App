import { Switch, Route, Redirect } from 'react-router-dom';
import SocketContextProvider from './contexts/Socket';
import EditVideo from './screens/EditVideo';
import MyVideos from './screens/MyVideos';
import Footer from './components/Footer';
import Header from './components/Header';
import Videos from './screens/Videos';
import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <SocketContextProvider>
        <Header />

        <main className='main'>
          <Switch>       
            <Route exact path='/' render={() => <Redirect to='/videos?category=trailers' />} />

            <Route exact path='/videos/contents' component={MyVideos} />
            <Route path='/videos/contents/:videoId/edit' component={EditVideo} />
            <Route path='/videos' component={Videos} />
          </Switch>
        </main>

        <Footer />
      </SocketContextProvider>
    </>
  );
};

export default App;