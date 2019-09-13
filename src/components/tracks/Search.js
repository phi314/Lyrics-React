import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    findTrack = e => {
        e.preventDefault();

        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_artist=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
            )
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Consumer>
                {value => {
                    return (
                        <div className="card card-body m-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fa fa-music"></i> Search for a song
                            </h1>
                            <p className="Lead text-center">Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Song Title..."
                                        name="trackTitle"
                                        value={this.state.trackTitle}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary btn-lg btn-block mb-5"
                                    type="submit"
                                >
                                    Get track lyrics
                                </button>
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Search;