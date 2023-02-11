import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="container-1">
          <Header />
        </div>

        <div className="container-2">
          <WalletForm />
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
