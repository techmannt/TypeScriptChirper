import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class Edit extends React.Component<IEditProps, IEditState> {
  constructor(props: IEditProps) {
    super(props);
    this.state = {
      username: '',
      message: ''
    };
  }

  async componentDidMount() {
    try {
      let chirpData = await fetch(`/api/chirps/${this.props.match.params.id}`, {
        method: "GET"  // Make the GET request. No headers needed!
      });
      let chirpInfo = await chirpData.json();
      this.setState({
        username: chirpInfo.username,
        message: chirpInfo.message
      });
    } catch (error) {
      console.log(error);
    }
  }

  async handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let editedBody = {
      username: this.state.username,
      message: this.state.message
    };
    try {
      let chirpData = await fetch(`/api/chirps/${this.props.match.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedBody)
      });
      if (chirpData.ok) {
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      let chirpData = await fetch(`/api/chirps/${this.props.match.params.id}`, {
        method: "DELETE"
      });
      if (chirpData.ok) {
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <form className="py-5 px-2">
        <label><h4>Username:</h4>
          <input type="text" className="form-control" name="username" value={this.state.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ username: e.target.value })} /></label>
          <label><h4>Chirp:</h4>
          <input type="text" className="form-control" name="message" value={this.state.message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ message: e.target.value })} /></label>

        <button className="btn btn-primary shadow" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleEdit(e)}>Save Edit</button>
        <button className="btn btn-danger shadow" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleDelete(e)}>DELETE!</button>
      </form>
    )
  }

}

interface IEditProps extends RouteComponentProps<{ id: string }> { }
interface IEditState {
  username: string,
  message: string
}

export default Edit;
