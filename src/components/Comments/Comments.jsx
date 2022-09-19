import { UilPen, UilTrashAlt } from "@iconscout/react-unicons";
import _clone from 'lodash/clone';
import moment from 'moment';
import React from "react";
import { deletePost, getTrendingPosts, getTrends, getUserPosts } from "../../actions/PostsAction";
import ShareModal from "../ShareModal/ShareModal";
import "./Comments.css";

class Comments extends React.Component {


    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
        this.handleModalState = this.handleModalState.bind(this)

        this.state = {
            limit: 3,
            showMore: true,
            modalOpened: false,
        };


    }

    showMore = () => {
        this.setState({
            showMore: false,
            limit: this.props.comments.length
        });
    }

    showLess = () => {
        this.setState({
            showMore: true,
            limit: 3
        });
    }


    renderButton = () => {
        if (!this.state.showMore)
            return (
                <button onClick={this.showLess} className='showMore'>Show Less</button>
            );
        if (this.props.comments.length > this.state.limit)
            return (
                <button onClick={this.showMore} className='showMore'>Show More</button>
            );
    }



    handleDelete = (data) => {
        const { dispatch } = this.props;
        dispatch(deletePost(data.id, this.props.user.userId, this.props.location));
        dispatch(getTrends());
    };

    handleModalState = (value) => {
        this.setState({ modalOpened: value })
    }

    handleTagClick = (tag) => {
        const { dispatch } = this.props;

        if (/(^|\B)@(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/gi.test(tag)) {
            dispatch(getUserPosts(tag.substring(1)))
        } else if (/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/gi.test(tag)) {
            dispatch(getTrendingPosts(tag.substring(1)))
        }

    }
    swapHashTags = (text) => {
        let displayText = _clone(text)
        let words = displayText.split(" ");
        for (let i = 0; i < words.length; i++) {
            if (/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/gi.test(words[i])) {
                words[i] = this.createTag(words[i])
            }
            else if (/(^|\B)@(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/gi.test(words[i])) {
                words[i] = this.createTag(words[i])
            }
        }
        return words
    }

    createTag = (text) => {
        var dom = document.createElement('div');
        dom.innerHTML = text;
        return dom;
    }

    getMoment = (timestamp) => {
        return moment(timestamp).fromNow();
    }

    render() {
        var cls = this.props.comments.slice(0, this.state.limit);

        return (
            <div className="commentBox" data-test="Comments-Test">
                <ul>
                    {cls.map(function (c, id) {
                        return (
                            <li key={id}>
                                <div className="detail">
                                    <span className="name">@{c.createdBy}</span>
                                    {c.createdBy === this.props.user.userId && (
                                        <span className="name"><UilPen
                                            width="2rem"
                                            height="1.2rem"
                                            onClick={() => this.handleModalState(true)}
                                        />
                                            <ShareModal
                                                modalOpened={this.state.modalOpened}
                                                setModalOpened={this.handleModalState}
                                                oldData={c}
                                                location={this.props.location}
                                            />
                                        </span>
                                    )}
                                    {c.createdBy === this.props.user.userId && (
                                        <span className="name"><UilTrashAlt
                                            width="2rem"
                                            height="1.2rem"
                                            onClick={() => this.handleDelete(c)}
                                        /></span>
                                    )}
                                    {
                                        <span className="timestamp">{
                                            this.getMoment(c.createdDateTime)
                                        }
                                        </span>
                                    }
                                </div>
                                <div className="commentMsg">
                                    {this.swapHashTags(c.tweetMessage).map(message => {
                                        if (typeof message === 'string') {
                                            return message + " "
                                        }
                                        else {
                                            return <button onClick={() => this.handleTagClick(message.innerHTML)} className='tag'>{message.innerHTML}{'\u00A0'} </button>
                                        }
                                    })}


                                </div>
                            </li>);
                    }, this)}
                </ul>
                {this.renderButton()}
            </div>
        );
    }

}

export default Comments;