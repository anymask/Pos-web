import React, { Component } from 'react';
import './utils.css';
import RewardMiner from './reward/rewardMiner'
import RewardDelegate from './reward/rewardDelegate'
import RewardQuery from './query/rewardQuery'
import ActivityQuery from './query/activityQuery'
import UserHistoryQuery from './query/userHistoryQuery'
import ValidatorInfoQuery from './query/validatorInfoQuery'

class Utils extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="Utils">
        <RewardMiner />
        <RewardDelegate />
        <RewardQuery />
        <ActivityQuery />
        <UserHistoryQuery />
        <ValidatorInfoQuery />
      </div>
    );
  }
}

export default Utils;
