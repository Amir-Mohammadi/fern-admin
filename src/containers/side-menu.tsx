import React, {Component} from 'react';
import SideBar from '../components/side-bar';
import {SIDE_BAR,} from '../utils/muck';


export default class SideMenu extends Component {

  render() {
    return (
      <div>
        <SideBar {...SIDE_BAR} />
      </div>
    );
  }
}
