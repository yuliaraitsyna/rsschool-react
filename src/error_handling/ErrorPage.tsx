import React from 'react'
import { useRouteError } from 'react-router-dom'
import "./ErrorPage.css"

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError()

  return (
    <div className='error-page'>
      <h1>Oops!</h1>
      <p>
        <i>
          {(error as Error)?.message || (error as { status?: string })?.status}
        </i>
      </p>
    </div>
  )
}

export default ErrorPage