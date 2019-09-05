/* eslint-disable no-undef */
import { AppRegistry } from 'react-native';
import App from './App';
import 'steerpath-smart-sdk/steerpath-smart.css'

/**
 * React native vector icons font setup
 */

// Generate required css

AppRegistry.registerComponent('App', () => App);
// eslint-disable-next-line no-undef
AppRegistry.runApplication('App', { rootTag: document.getElementById('react-root') });

