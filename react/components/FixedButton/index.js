import React, { Fragment } from 'react'
import BottomExtraSpace from './BottomExtraSpace'
import NoSsr from '@material-ui/core/NoSsr'

export default props => (
  <Fragment>
    <div className="fixed bottom-0 left-0 w-100 z-999">{props.children}</div>
    <NoSsr>
      <BottomExtraSpace>{props.children}</BottomExtraSpace>
    </NoSsr>
  </Fragment>
)
