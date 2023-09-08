import { CircularProgress } from '@mui/material'
import React from 'react'

export function getLoadingElement(text?: JSX.Element): JSX.Element {
    return (
        <div style={{ textAlign: 'center' }}>
            <span>
                <CircularProgress></CircularProgress>
            </span>
            {text ? text : <p>Loading Data...</p>}
        </div>
    )
}
