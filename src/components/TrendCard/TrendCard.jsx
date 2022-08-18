import React, { useEffect } from 'react'
import './TrendCard.css'
import { getTrends } from "../../actions/PostsAction";
import { useSelector, useDispatch } from "react-redux";

const TrendCard = () => {
    const dispatch = useDispatch();
    let { trends, loading } = useSelector((state) => state.trendsReducer);
    useEffect(() => {
        dispatch(getTrends());
    }, []);
    if (!trends) return 'No Trends';
    return (
        <div className="TrendCard">
            <h3>Latest Trends</h3>
            {loading
                ? "Fetching posts...."
                : trends.map((trend, id) => {
                    return (
                        <div className="trend" key={id}>
                            <span>#{trend.hashtags}</span>
                            <span>{trend.count} shares</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TrendCard