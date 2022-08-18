import React from "react";
import "./Comments.css";
import { UilPen } from "@iconscout/react-unicons";
import { UilTrashAlt } from '@iconscout/react-unicons'
import ShareModal from "../ShareModal/ShareModal";
import { deletePost } from "../../actions/PostsAction";

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
    };

    handleModalState = (value) => {
        this.setState({ modalOpened: value })
    }

    render() {
        var cls = this.props.comments.slice(0, this.state.limit);

        return (
            <div className="commentBox">
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
                                </div>
                                <div className="commentMsg">{c.tweetMessage}</div>
                            </li>);
                    }, this)}
                </ul>
                {this.renderButton()}
            </div>
        );
    }

}

export default Comments;