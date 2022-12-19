import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import { GitHubContextProvider } from './context/github/GithubContext';
import { AlertContextProvider } from './context/alert/AlertContext';
import Alert from './components/Alert';
import User from './pages/User';


const App = () => {
  return (
    <GitHubContextProvider>
      <AlertContextProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">

            <Navbar title="Github Finder" />

            <main className='container mx-auto px-3 pb-12'>
              <Alert />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/user/:login' element={<User />} />
                <Route path='/notFound' element={<PageNotFound />} />
                <Route path='/*' element={<PageNotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AlertContextProvider>
    </GitHubContextProvider>
  );
}

export default App;
