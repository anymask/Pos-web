import React, { Component } from 'react';
import './index.css';
import $ from 'jquery';
import { Table } from 'antd';



class LeaderBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leaderBoard: []
    }
  }

  getLeaderBoard() {
    this.serverRequest = $.get(window.serverUrl + 'stakerInfo', function (result) {
      console.log(result)
      if (!result) { return }
      console.log(result)
      this.setState({
        leaderBoard: result,
      })
    }.bind(this));
  }

  componentDidMount() {
    this.getLeaderBoard()
    this.timer = setInterval(this.getLeaderBoard.bind(this), 5000, null)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  columns = [{
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
  }, {
    title: 'Amount',
    dataIndex: 'Amount',
    key: 'Amount',
  }, {
    title: 'Start Epoch',
    dataIndex: 'StakingEpoch',
    key: 'StakingEpoch',
  }, {
    title: 'Lock Epoch',
    dataIndex: 'LockEpochs',
    key: 'LockEpochs',
  }, {
    title: 'Next Lock',
    dataIndex: 'NextLockEpochs',
    key: 'NextLockEpochs',
  }, {
    title: 'Fee Rate',
    dataIndex: 'FeeRate',
    key: 'FeeRate',
  }, {
    title: 'Delegators',
    dataIndex: 'Delegators',
    key: 'Delegators',
  }, {
    title: 'Delegate Percent',
    dataIndex: 'DelegatePercent',
    key: 'DelegatePercent',
  }];

  render() {
    const snap = this.state.leaderBoard.slice(0, this.state.leaderBoard.length)

    const items = snap.map((value, index) => {
      let delegateAmount = 0
      for (let i = 0; i < value.Clients.length; i++) {
        delegateAmount += Number(value.Clients[i].Amount);
      }
      //delegateAmount /= 1e18;
      let delePercent = delegateAmount * 100 / (value.Amount * 5)

      value.Delegators = value.Clients.length
      value.DelegatePercent = delePercent.toFixed(0) + '%'

      let parnterAmount = 0
      for (let i = 0; i < value.Partners.length; i++) {
        parnterAmount += Number(value.Partners[i].Amount);
      }
      value.Amount =Number(value.Amount) + Number(parnterAmount)
      return value
    })


    return (
      <div className="LeaderBoard">
        <div className="LeaderBoardTitle">All Validators</div>
        <div className="LeaderBoardBody">
          <Table dataSource={items} columns={this.columns}></Table>
        </div>
      </div>
    );
  }
}


export default LeaderBoard;