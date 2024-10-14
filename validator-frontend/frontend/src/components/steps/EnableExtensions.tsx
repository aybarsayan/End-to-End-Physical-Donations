import React from 'react'

import styles from './Step.module.css'

export default function EnableExtensions() {
  const kiltExtensionsApiInitialized =
    typeof (window as any).kilt?.meta !== 'undefined'

  return (
    <div className={styles.step}>
      <h2>1. Enabling Extensions</h2>
      <p>
        This refers to the process that allows extensions to add themselves.
      </p>
      <p>
        We perform this process when the website loads. The relevant code can be
        found in the 'index.tsx' file.
      </p>
      {kiltExtensionsApiInitialized && '✅ Extensions are enabled'}
      {!kiltExtensionsApiInitialized && '❌ Extensions are not enabled'}
      <p>
        You can verify this by running the 'window.kilt' command in your
        browser's console.
      </p>
    </div>
  )
}
