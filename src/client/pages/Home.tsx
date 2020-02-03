import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      loaded: false,
      chirpInfo: [],
      username: '',
      message: ''
    };
  }

  async componentDidMount() {
    let chirpData = await fetch('/api/chirps');
    let chirpInfo = await chirpData.json();
    this.setState({
      loaded: true,
      chirpInfo,
    });
  }

  async handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let newBody = {
      username: this.state.username,
      message: this.state.message
    };
    try {
      let chirpData = await fetch(`/api/chirps/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBody)

      });
      if (chirpData.ok) {
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleChirpUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleChirpMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  render() {
    if (this.state.loaded) {
      return (
        <main className="container py-5">

          <div className="row">
            <form className="d-flex align-content-start">
              <input className="form-control shadow" type="text" name="username" value={this.state.username} onChange={(event) => this.handleChirpUsernameChange(event)} placeholder="Enter your name" />
              <input className="form-control shadow" type="text" name="message" value={this.state.message} onChange={(event) => this.handleChirpMessageChange(event)} placeholder="Enter chirp" />
            </form>
          </div>
          <div className="row">
            <button className="d-flex align-content-end row" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleAdd(e)}>Submit it!</button></div>
          <section className="py-4">
            {this.state.chirpInfo.map(chirp => {
              return (
                <aside key={chirp.id}>
                  <div className="card border-primary mb-3">
                    <h5 className="card-header shadow bg-secondary text-white">{chirp.username}</h5>
                    <div className="card-body text-primary">
                      <p className="card-text">{chirp.message}</p>
                    </div>
                    <div className="card-footer text-muted d-flex flex-row-reverse">
                      <Link className="btn btn-success" to={`/edit/${chirp.id}`}>Admin Options</Link>

                    </div>
                  </div>
                </aside>
              );
            })}
          </section>

        </main>
      );
    } else {
      return <h6>Please wait!</h6>;
    }
  }
}

export interface IHomeProps extends RouteComponentProps<{ id: string }> { }

interface chirpObject {
  username: string;
  message: string;
  id: number;
}

export interface IHomeState {
  loaded: boolean;
  chirpInfo: chirpObject[];
  username: string;
  message: string;
}

export default Home;
