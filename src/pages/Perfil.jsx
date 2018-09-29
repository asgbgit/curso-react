import React, {Component} from 'react';
import {Button, Container, Row} from 'react-bootstrap';
import ListaTweet from '../components/ListaTweet';
import UserService from '../services/UserService';
import TweetService from '../services/TweetService';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Perfil extends React.Component {

    state = {
        loading: false,
        tweets: [],
        user: {}
    };
    
    componentDidMount() {
        const { id } = this.props.match.params;

        this.setState({ loading: true }, () => {
            // UserService.getUserData(id)
            //     .then(user => {
            //         this.setState({ user: user})
            //         TweetService.getUserTweets(user)
            //             .then(tweets => {
            //                 this.setState({ tweets: tweets, loading: false})
            //             });
            //     })
            UserService.getUserData(id)
                .then(user => {
                    this.setState({ user: user});
                    return user;
                })
                .then(user => TweetService.getUserTweets(user))
                .then(tweets => this.setState({ tweets: tweets, loading: false}))
        })
    }

    render() {
        const {user, tweets, loading} = this.state;
        const {currentUser, onFollow} = this.props;

        
        if (loading) {
            return (
                <div className='sweet-loading'>
                <ClipLoader
                  className={override}
                  sizeUnit={"px"}
                  size={150}
                  color={'#123abc'}
                  loading={this.state.loading}
                />
              </div>             )
        }
        

        const shouldSHowFollowButton = currentUser !== undefined && user !== undefined && currentUser.id !== user.id;
        return (
            <Container>
                <Row className="profile-section">
                    <img src={user.photoURL} alt="foto do perfil do usuário"
                         className="profile-photo"/>
                    <div className="profile-data">
                        <span>{user.displayName}</span>
                        <span>{`@${user.userName}`}</span>
                    </div>
                    <div className="ml-auto">
                        <Button>Seguir</Button>
                    </div>
                </Row>
                <Row>
                    <ListaTweet tweets={tweets}/>
                </Row>
            </Container>
        );
    }
}

export default Perfil;
