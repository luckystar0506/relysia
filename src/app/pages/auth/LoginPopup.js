import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { withRouter } from "react-router-dom";
import Login from './Login';

const Transition1 = React.forwardRef(function Transition(props, ref) {
  return <Slide timeout={1000} mountOnEnter unmountOnExit direction="right" ref={ref} {...props} />;
});
const Transition2 = React.forwardRef(function Transition(props, ref) {
  return <Slide timeout={1000}  mountOnEnter unmountOnExit direction="left" ref={ref} {...props} />;
});

class LoginPopup extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      showLogin: false,
    }
  }

  handleClose  = () => {
    this.props.setLoginPopup(false)
    this.setState({showLogin:false})
  }

  handleRegister = () => {
    this.handleClose();
    this.props.history.push("/auth/registration")
  }

  render(){
    let {openLoginPopup, setLoginPopup, goTo} = this.props;

    return (
      <>
        <Dialog
          open={openLoginPopup && !this.state.showLogin}
          onEscapeKeyDown={() => this.handleClose()}
          onClose={() => this.handleClose()}
          aria-labelledby="email-form"
          TransitionComponent={Transition1}
        >
          <DialogContent
            style={{'minWidth':'600px',display:'flex', flexDirection:'column', 'alignItems':'center'}}
            >
            <div className="kt-login kt-login--v1">
              <div className="kt-login__wrapper" style={{padding:0}}>
                <div className="kt-login__body" style={{marginTop:"1rem"}}>
                  <div className="kt-login__form">
                    <div className="kt-login__title">
                      <h3 >Please Login</h3>
                    </div>
                    <div className="kt-form" style={{margin:"0 auto"}}>
                      <img alt="Logo" style={{'maxWidth':'90%'}} src={"/media/images/login-popup.png"} />
                        <DialogActions style={{display:"flex", justifyContent:"center"}}>
                          <div className="kt-login__actions">
                          <button
                            className="btn btn-primary btn-elevate kt-login__btn-primary"
                            style={{height:'50px', padding:'1rem', minWidth:'80px',marginRight:'20px'}}
                            onClick={()=> this.setState({showLogin: true})}
                            color="primary"
                            >
                            Login
                          </button>
                          <button
                            className="btn btn-primary btn-elevate kt-login__btn-primary"
                            style={{height:'50px', padding:'1rem', minWidth:'80px'}}
                            onClick={()=> this.handleRegister()}
                            color="primary"
                            >
                            Register
                          </button>
                        </div>
                      </DialogActions>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openLoginPopup && this.state.showLogin}
          onEscapeKeyDown={() => this.handleClose()}
          onClose={() => this.handleClose()}
          aria-labelledby="email-form"
          TransitionComponent={Transition2}
          style={{'minWidth':'600px'}}
        >
          <DialogContent
            style={{'minWidth':'600px'}}
          >
            <div className="kt-login kt-login--v1">
              <div className="kt-login__wrapper" style={{padding:0}}>
                <Login
                  isPopup={true}
                  setLoginPopup={setLoginPopup}
                  goTo={goTo}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

export default withRouter(LoginPopup);
