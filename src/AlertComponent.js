import React from 'react';
import { Alert } from 'reactstrap';

class AlertComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      color: props.color,
      text: props.text
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false, color: '', text: '' });
    this.props.onDismissAlert();
  }

  render() {
      let text = this.state.text;
    return (
        <div>
            { text !== null ?
            <Alert color={this.state.color} isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.state.text}
            </Alert> : '' }
        </div>
    );
  }
}

export default AlertComponent;