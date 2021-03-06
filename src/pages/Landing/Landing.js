import React from "react";
import './landing.css'

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <>
        <div className="image-landing">
        </div>

        <div className="landing-description">
            <h1>E-COMMERCE DE GAMES</h1>
            <h3>Seu melhor site para compra de jogos</h3>
            <button>start</button>
        </div>
      </>
    );
  }
}

//const mapStateToProps = state => ({
 // ...state.Auth,
//  ...state.ChangePlan,
//});

//function mapDispatchToProps(dispatch) {
//  return {
 //   changePlan: value => dispatch(changePlan(value)),
//    unload: () => dispatch(unload()),
 //   loadSimulation: value => dispatch(loadSimulation(value)),
 //   save: value => dispatch(save(value)),
//    suspendPlan: value => dispatch(suspendPlan(value)),
 //   activatePlan: value => dispatch(activatePlan(value)),
//    selectCompany: value => dispatch(selectCompany(value))
//  };
//}

export default Landing;
