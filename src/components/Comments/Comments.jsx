import React from "react";
import "./Comments.css";

class Comments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            limit: 3,
            showMore: true
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

    render() {
        var cls = this.props.comments.slice(0, this.state.limit);

        return (
            <div className="commentBox">
                <ul>
                    {cls.map(function (c, id) {
                        return (
                            <li key={id}>
                                <div className="commentBy">@{c.createdBy}</div>
                                <div className="commentMsg">{c.tweetMessage}</div>
                            </li>);
                    })}
                </ul>
                {this.renderButton()}
            </div>
        );
    }

}

export default Comments;