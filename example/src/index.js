import 'material-components-web/dist/material-components-web.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Showcase } from './Showcase';

ReactDOM.render(<Showcase />, document.getElementById('root'));
registerServiceWorker();
