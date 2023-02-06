import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className="container-1">
          <Header />
          <WalletForm />
        </div>
        <div className="container-2">
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
