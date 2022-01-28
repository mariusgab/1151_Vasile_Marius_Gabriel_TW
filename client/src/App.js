import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "./redux/actions";
import './App.css';
import MainView from './component/MainView';

function App() {
  const dispatch = useDispatch();
  const { syncDB } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    // syncDB();
  }, []);

  return (
    <MainView />
  );
}

export default App;
