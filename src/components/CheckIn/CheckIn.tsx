import React from 'react';

import style from './check-in.module.css'
import { Feeling, Prayer } from 'src/types/types';
import FeelingButtons from '../FeelingButtons/FeelingButtons';
import PrayerNavigation from '../PrayerNavigation/PrayerNavigation';
import { getAllFeelings, getAllPrayers } from '../../api/firebase';
import Loading from '../Loading/Loading';
import CheckInPrayers from './CheckInPrayers';

enum CheckInStage {
  CURRENT_FEELINGS = 'CURRENT_FEELINGS',
  WANT_FEELINGS = 'WANT_FEELINGS',
  PRAYERS = 'PRAYERS'
}

interface CheckInState {
  stage: CheckInStage;
  feelings?: Feeling[];
  prayers?: Prayer[];
  selectedCurrentFeelings: Feeling[];
  selectedWantFeelings: Feeling[];
}

class CheckIn extends React.Component<{}, CheckInState> {

  state: CheckInState = {
    stage: CheckInStage.CURRENT_FEELINGS,
    feelings: undefined,
    selectedCurrentFeelings: [],
    selectedWantFeelings: []
  }

  async componentDidMount() {
    const feelings = await getAllFeelings();
    this.setState({ feelings });
  }

  handleFeelingToggle = (feeling: Feeling) => {
    const { stage } = this.state;
    const selectedFeelings = stage === CheckInStage.CURRENT_FEELINGS ?
      this.state.selectedCurrentFeelings :
      this.state.selectedWantFeelings;

    const newFeelings = [...selectedFeelings];
    if (newFeelings.includes(feeling)) {
      newFeelings.splice(newFeelings.indexOf(feeling), 1);
    } else {
      newFeelings.push(feeling);
    }

    if (stage === CheckInStage.CURRENT_FEELINGS) {
      this.setState({ selectedCurrentFeelings: newFeelings });
    } else if (stage === CheckInStage.WANT_FEELINGS) {
      this.setState({ selectedWantFeelings: newFeelings });
    }
  }

  async fetchPrayers() {
    const prayers = await getAllPrayers();
    this.setState({ prayers });
  }

  handleNextStage = () => {
    const { stage } = this.state;
    if (stage === CheckInStage.CURRENT_FEELINGS) {
      this.setState({ stage: CheckInStage.WANT_FEELINGS });
    } else if (stage === CheckInStage.WANT_FEELINGS) {
      this.fetchPrayers();
      this.setState({
        stage: CheckInStage.PRAYERS,
      });
    }
  }

  handlePrevStage = () => {
    const { stage } = this.state;
    if (stage === CheckInStage.WANT_FEELINGS) {
      this.setState({ stage: CheckInStage.CURRENT_FEELINGS });
    } else if (stage === CheckInStage.PRAYERS) {
      this.setState({ stage: CheckInStage.WANT_FEELINGS });
    }
  }

  render() {
    const { stage, feelings, selectedCurrentFeelings, selectedWantFeelings, prayers } = this.state;

    if (!feelings) {
      return <Loading />;
    }

    return (
      <div className={style['check-in-wrap']}>
        <h1>
          {stage === CheckInStage.CURRENT_FEELINGS && 'How are you feeling now?'}
          {stage === CheckInStage.WANT_FEELINGS && 'How do you want to be feeling?'}
          {stage === CheckInStage.PRAYERS && 'Here are a few t\'fillot that are recommended for you:'}
        </h1>

        {
          (stage === CheckInStage.CURRENT_FEELINGS || stage === CheckInStage.WANT_FEELINGS) &&
          <div>
            <FeelingButtons
              feelings={feelings}
              selectedFeelings={stage === CheckInStage.CURRENT_FEELINGS ? selectedCurrentFeelings : selectedWantFeelings}
              handleFeelingToggle={this.handleFeelingToggle}
            />
          </div>
        }

        {
          (stage === CheckInStage.PRAYERS) &&
          (prayers
            ? <CheckInPrayers 
                prayers={prayers}
                wantFeelings={selectedWantFeelings}
              />
            : <Loading />)
        }

        <PrayerNavigation
          enableBack={stage !== CheckInStage.CURRENT_FEELINGS}
          enableNext={stage !== CheckInStage.PRAYERS}
          handleNext={this.handleNextStage}
          handleBack={this.handlePrevStage}
        />

      </div>
    )
  }
}

export default CheckIn;