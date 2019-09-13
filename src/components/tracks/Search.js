import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import Spinner from '../layouts/Spinner';

class Search extends Component {
    state = {
        trackTitle: '',
        isLoading: false
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    findTrack = (dispatch, e) => {
        e.preventDefault();

        this.setState({
            isLoading: true
        });

        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
            )
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    track_list: res.data.message.body.track_list,
                    query: this.state.trackTitle
                });

                this.setState({
                    trackTitle: '',
                    isLoading: false
                });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <div className='card card-body m-4 p-4'>
                            <h1 className='display-4 text-center'>
                                <i className='fa fa-music'></i> Search for a song
                            </h1>
                            <p className='Lead text-center'>Get the lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        className='form-control form-control-lg'
                                        placeholder='Song Title...'
                                        name='trackTitle'
                                        value={this.state.trackTitle}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button
                                    className='btn btn-primary btn-lg btn-block mb-5'
                                    type='submit'
                                >
                                    Get track lyrics
                                </button>
                                {this.state.isLoading && <Spinner />}
                            </form>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default Search;
