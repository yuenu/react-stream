import Modal from "../Modal";
import history from "../../history";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from 'react-router-dom'

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params
    return (
      <>
        <button onClick={() => this.props.deleteStream(id)} className="ui primary button">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </>
    );
  }

  renderConente() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream";
    }

    return `Are you sure you want to delete this stream with TITLE:  ${this.props.stream.title}`;
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        StreamDelete
        <Modal
          title="Delete Stream"
          content={this.renderConente()}
          action={this.renderActions()}
          onDismiss={() => history.push("/")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
