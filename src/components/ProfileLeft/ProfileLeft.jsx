import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'

const ProfileLeft = (location) => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <InfoCard />
      {(<FollowersCard location={location} />)}
    </div>
  )
}

export default ProfileLeft