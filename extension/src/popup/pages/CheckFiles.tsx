import * as axios from 'axios'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import GavelIcon from '@mui/icons-material/Gavel'
import Grid from '@mui/material/Grid'
import LinkIcon from '@mui/icons-material/Link'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { FunctionComponent } from 'react'
import { Button, Divider, IconButton, Input, Typography } from '@mui/material'
import { FileUploader } from 'react-drag-drop-files'
import { SetStateAction, useEffect, useState } from 'react'
import { cloneDeep, uniqBy } from 'lodash'

import {
  ButtonContainer,
  HorizontalRule,
  InputContainer,
  MainContainer,
  WelcomeText
} from './components/styledComponents'
import { ChecksumService } from './checksumService'

interface Result {
  tx: string
  time: string
  status: string
  finalized: boolean
}

interface Props {
  endpoint: string
}
export const CheckFiles: FunctionComponent<Props> = ({ endpoint }) => {
  const [txHash, setTxHash] = useState<string>('')
  const [result, setResult] = useState<Result>()

  const openTXLink = (link: string) => {
    // route to new page by changing window.location
    window.open('https://dashboard.mainnet.concordium.software/lookup/' + link, '') //to open new page
  }

  //handle TX hash value change
  const handleChange = event => {
    setTxHash(event.target.value)
  }

  const checkTransaction = async () => {
    const endpointURL = endpoint + '/txLookup'
    const result = await axios.default.post(endpointURL, { tx: txHash })
    const data = result.data as Result
    setResult(data)
  }

  return (
    <InputContainer style={{ marginTop: 25 }}>
      <Input
        type='text'
        placeholder='tx hash'
        value={txHash}
        onChange={handleChange}
        style={{ width: 300, fontSize: 10 }}
      />
      <div style={{ width: '80%', height: 180, marginTop: 15, overflow: 'auto', textAlign: 'center' }}>
        {result && (
          <div key={result.tx}>
            <>
              <Typography variant='body1' style={{ overflowWrap: 'anywhere' }}>
                <>{result.status}</>
              </Typography>
              <Divider />
              {result.finalized && (
                <>
                  <Typography variant='body1' style={{ overflowWrap: 'anywhere' }}>
                    <>tx Date: {result.time}</>
                  </Typography>

                  <Divider />
                  <IconButton
                    key={'btn' + result.tx}
                    aria-label='link'
                    size='large'
                    title='See transaction on dashboard'
                    onClick={() => openTXLink(result.tx)}
                  >
                    <LinkIcon fontSize='inherit' />
                  </IconButton>
                </>
              )}
            </>
          </div>
        )}{' '}
      </div>
      <Divider />

      {txHash.length > 0 && (
        <ButtonContainer>
          <Button onClick={checkTransaction}>Look up transaction</Button>
        </ButtonContainer>
      )}
    </InputContainer>
  )
}
