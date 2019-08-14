import React, { Component } from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      // console.log("Unmount", this.resInterceptor, this.reqInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    modalClosedHandler = () => {
      this.setState({
        error: null
      });
    };

    render() {
      let modalPreview = null;
      if (this.state.error) {
        modalPreview = (
          <Modal show={this.state.error} modalClosed={this.modalClosedHandler}>
            <p>{this.state.error.message}</p>
          </Modal>
        );
      }
      return (
        <Aux>
          {modalPreview}
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
