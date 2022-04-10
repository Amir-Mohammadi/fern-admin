import {Component} from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Router from '../router';
import styles from './containers.module.scss';
import SideMenu from './side-menu';


class Index extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.mainBox}>
          <div className={styles.sideMenu}>
            <SideMenu />
          </div>
          <div className={styles.content}>
            <Router />
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Index;
