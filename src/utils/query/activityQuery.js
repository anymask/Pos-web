import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';



class ActivityQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addrMine: 'N/A',
      addrEp: 'N/A',
      addrRp: 'N/A',
    }
  }


  addrActivityCheck() {
    console.log('addrActivityCheck')
    this.setState({
      addrMine: 'Waiting',
      addrEp: 'Waiting',
      addrRp: 'Waiting',
    })

    let address = this.addrAct.value
    let startepoch = this.startEpochAct.value
    let endepoch = this.endEpochAct.value

    this.serverRequest = $.get(window.serverUrl + 'addrActivityCheck?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        if (result["addrMine"] === undefined) {
          this.setState({
            addrMine: 'No found',
            addrEp: 'No found',
            addrRp: 'No found',
          })
          return;
        }
        this.setState({
          addrMine: result.addrMine,
          addrEp: result.addrEp,
          addrRp: result.addrRp,
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div className="rewardTitle">Account's Working Activity Query</div>
        <div className="rewardGrid">
          <div className="i">
            <div className="i1">Address:</div>
            <div className="i2">Start Epoch:</div>
            <div className="i3">End Epoch:</div>
            <div className="bt"><button onClick={this.addrActivityCheck.bind(this)}>Calculate</button></div>
            <div className="i11"><input placeholder="Account Address"
              ref={(input) => { this.addrAct = input }}

            ></input></div>
            <div className="i21"><input placeholder="Start Epoch"
              ref={(input) => { this.startEpochAct = input }}

            ></input></div>
            <div className="i31"><input placeholder="End Epoch"
              ref={(input) => { this.endEpochAct = input }}

            ></input></div>
          </div>
          <div className="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default ActivityQuery;