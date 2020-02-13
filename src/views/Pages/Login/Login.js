import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import restClient from '../../../services/restClient'
import { connect } from 'react-redux'
import actions from '../../../redux/user/actions'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';


const { login } = actions
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mostrarMensaje: false
    }
  }

  handleLogin = () => {
    this.setState({ mostrarMensaje: false })
    this.props.login({}, callback => {
      this.setState({ mostrarMensaje: true })
    })
    // restClient.getPrueba().then(response=>{
    //   console.log(response)
    // }).catch(error=>{
    //   console.log(error)
    // })
    //this.props.history.push('/dashboard');
  }
  render() {
    const { mostrarMensaje } = this.state
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleLogin}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                        {mostrarMensaje && (
                          <Col xs="8" className="text-right">
                            <Alert color="danger">Error</Alert>
                          </Col>
                        )}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// export default Login;
export default connect(
  state => {
    return {
      isLoggedIn: state.user.profile != null
    }
  }, { login }
)(Login)
