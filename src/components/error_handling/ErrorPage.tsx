"use client"
import React from 'react'
import styles from "./ErrorBoundary.module.css"

const ErrorPage: React.FC = () => {

  return (
    <div className={styles['error-page']}>
      <h1>Something went wrong!</h1>
    </div>
  )
}

export default ErrorPage