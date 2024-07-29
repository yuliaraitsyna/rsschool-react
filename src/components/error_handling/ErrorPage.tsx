import React from 'react'
import { useRouteError } from 'react-router-dom'
import styles from "./ErrorBoundary.module.css"

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError()

  return (
    <div className={styles['error-page']}>
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