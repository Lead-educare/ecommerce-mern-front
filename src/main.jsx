import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./assets/css/glightbox.min.css"
import "./assets/css/nouislider.min.css"
import "./assets/css/swiper-bundle.min.css"
import "./assets/css/style.default.css"
import './assets/css/animate.min.css';
import './assets/css/style.css';
import './assets/css/sidebar.css';
import './assets/css/progress.css';
import './assets/css/dropdownmenu.css';
import {Provider} from 'react-redux';
import store from './redux/store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
             <App />
      </Provider>
  </React.StrictMode>,
)
