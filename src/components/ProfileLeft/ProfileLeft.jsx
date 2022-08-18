import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'

const ProfileLeft = (location) => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <InfoCard />
      {location && location === "profilePage" && (<FollowersCard />)}
    </div>
  )
}

export default ProfileLeft