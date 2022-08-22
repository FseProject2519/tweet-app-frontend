import React, { useState, useEffect } from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
import { MentionsInput, Mention } from 'react-mentions'
import { useDispatch } from "react-redux";
import { getUserPosts } from "../../actions/PostsAction";
import { getAllUser } from "../../api/UserRequests";
import { getHashtags } from "../../api/PostsRequests";
import _clone from 'lodash/clone'
import _escapeRegExp from 'lodash/escapeRegExp'
import { getTrendingPosts, searchPosts } from "../../actions/PostsAction";

const LogoSearch = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [persons, setPersons] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const swapUserTags = (text) => {
    let displayText = _clone(text)
    const tags = text.match(/@\{\{[^\}]+\}\}/gi) || []
    tags.map(myTag => {
      const tagData = myTag.slice(3, -2)
      const tagDataArray = tagData.split('||')
      const tagDisplayValue = tagDataArray[1]
      displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue)
    })
    return displayText
  }

  const swapHashTags = (text) => {
    let displayText = _clone(text)
    const tags = text.match(/#\{\{[^\}]+\}\}/gi) || []
    tags.map(myTag => {
      const tagData = myTag.slice(3, -2)
      const tagDataArray = tagData.split('||')
      const tagDisplayValue = tagDataArray[1]
      displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue)
    })
    return displayText
  }

  const searchPost = async () => {
    let text = searchText
    if (searchText.includes("@")) {
      text = swapUserTags(searchText)
      setSearchText(text)
      dispatch(getUserPosts(text.substring(1)));
    }
    if (searchText.includes("#")) {
      text = swapHashTags(searchText)
      setSearchText(text)
      dispatch(getTrendingPosts(text.substring(1)));
    }
    else {
      setSearchText(text)
      dispatch(searchPosts(text));
    }
    setSearchText("");
  }
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data.usersList);
    };
    fetchPersons();
  }, []);
  useEffect(() => {
    const fetchHashtags = async () => {
      const { data } = await getHashtags();
      setHashtags(data.hashtagsList);
    };
    fetchHashtags();
  }, []);
  const userMentionData = persons.map(myUser => ({
    id: myUser.userId,
    display: `@${myUser.userId}`
  }));

  const hashtagMentionData = hashtags.map(hashtag => ({
    id: hashtag,
    display: `#${hashtag}`
  }));

  const setSearchTexts = (message) => {
    setSearchText(message)
  }
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
        <MentionsInput
          value={searchText}
          onChange={event => setSearchTexts(event.target.value)}
          placeholder={"Eg. @Jack_11 or #Holiday"}
          className="mentions_search"

        >
          <Mention
            type="user"
            trigger="@"
            data={userMentionData}
            className="mentions__mention"
            markup="@{{__id__||__display__}}"
          />

          <Mention
            type="hashtag"
            trigger="#"
            data={hashtagMentionData}
            className="mentions__mention"
            markup="#{{__id__||__display__}}"
          />
        </MentionsInput>
        <button className="s-icon" onClick={searchPost}>
          <UilSearch />
        </button>
      </div>
    </div>
  );
};

export default LogoSearch;
