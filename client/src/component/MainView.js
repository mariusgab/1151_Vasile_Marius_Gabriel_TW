import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from "../redux/actions";

function MainView() {
    const dispatch = useDispatch();
    const { getData } = bindActionCreators(actions, dispatch);
    const state = useSelector((state) => state.data);

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
            <h3 className="p-3 text-center">React - Display a list of items</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {state.data && state.data.map(user =>
                        <tr key={user.username}>
                            <td>{user.username}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MainView;