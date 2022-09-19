import React, { useEffect } from 'react'
import './TrendCard.css'
import { getTrends, getTrendingPosts } from "../../actions/PostsAction";
import { useSelector, useDispatch } from "react-redux";

const TrendCard = () => {
    const dispatch = useDispatch();
    let { trends, loading } = useSelector((state) => state.trendsReducer);

    const viewTrendingPosts = (hashtags) => {

        dispatch(getTrendingPosts(hashtags));

    }

    useEffect(() => {
        dispatch(getTrends());
    }, []);

    if (!trends) return 'No Trends';
    return (
        <div className="TrendCard" data-test="TrendCard-Test">
            <h3>Latest Trends</h3>
            {loading
                ? "Fetching posts...."
                : trends.map((trend, id) => {
                    return (
                        <div key={id} onClick={() => viewTrendingPosts(trend.hashtags)}>
                            <div className="trend" key={id}>
                                <span>#{trend.hashtags}</span>
                                <span>{trend.count} shares</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TrendCard