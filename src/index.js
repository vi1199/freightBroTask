import React, { Component } from 'react';
import { Root } from './config/router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store= configureStore();

class App extends Component {
    render(){
        return (
            <Provider store= {store}>
                <Root />
            </Provider>
        )
    }
}

export default App;