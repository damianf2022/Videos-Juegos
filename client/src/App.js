import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Landing from './components/Landing'
import Form from './components/Form/index'
import Detail from './components/Detail/index'
// import imagen from '../src/components/imagenes/'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/home' component={Home} />
          <Route path='/games/:id' component={Detail} />
          <Route path='/games' component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
