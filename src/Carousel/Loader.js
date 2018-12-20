import ContentLoader from 'react-content-loader'
import React from 'react'

export default props => {
  if (props.slidesAmount === 1) {
    return (
      <div className="w-100 aspect-ratio aspect-ratio--1x1">
        <ContentLoader
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          height="100%"
          width="100%">
          <rect width="100%" height="100%" />
        </ContentLoader>
      </div>
    )
  }

  return (
    <div className="w-100 aspect-ratio aspect-ratio--1x1">
      <ContentLoader
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        height="100%"
        width="100%">
        <rect className="dn db-ns" width="18%" height="18%" />
        <rect className="dn db-ns" width="18%" height="18%" y="20%" />
        <rect className="dn db-ns" width="18%" height="18%" y="40%" />
        <rect className="dn db-ns" width="18%" height="18%" y="60%" />
        <rect className="dn db-ns" width="89%" height="89%" x="20%" />
        <rect className="db dn-ns" width="100%" height="100%" />
      </ContentLoader>
    </div>
  )
}
