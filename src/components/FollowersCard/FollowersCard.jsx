import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePosts, getUserPosts } from "../../actions/PostsAction";

const FollowersCard = () => {
  const dispatch = useDispatch();
  const [persons, setPersons] = useState([]);
  const [limit, setLimit] = useState(3);
  const [showMore, setShowMore] = useState(true);
  const user = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data.usersList);
    };
    fetchPersons();
  }, []);


  const showMoreHandler = () => {
    setShowMore(false);
    setLimit(persons.length)
  }

  const showLessHandler = () => {
    setShowMore(true);
    setLimit(3)
  }


  const renderButton = () => {
    if (!showMore)
      return (
        <button onClick={showLessHandler} className='showMore'>Show Less</button>
      );
    if (persons.length > limit)
      return (
        <button onClick={showMoreHandler} className='showMore'>Show More</button>
      );
  }

  const viewUserPosts = (userId) => {

    dispatch(getUserPosts(userId));

  }

  const viewTimelinePosts = () => {
    dispatch(getTimelinePosts());
  }


  return (
    <div className="FollowersCard">
      <div className="viewTimeline" onClick={() => viewTimelinePosts()}>View All Posts</div>
      <h3>People you may know</h3>
      {persons.slice(0, limit + 1).map((person, id) => {
        if (person.userId !== user.userId) return (
          <div key={id} onClick={() => viewUserPosts(person.userId)}>
            <User person={person} key={id} />
          </div>);
      })}
      {renderButton()}
    </div >
  );
};

export default FollowersCard;
