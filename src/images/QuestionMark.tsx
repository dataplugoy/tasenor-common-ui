import React from 'react'

export const QuestionMarkData = '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'

export const QuestionMarkInline = `data:image/png;base64,${QuestionMarkData}`

export const QuestionMark = () => <img src={QuestionMarkInline} />
