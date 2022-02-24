import * as axios from 'axios'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import GavelIcon from '@mui/icons-material/Gavel'
import Grid from '@mui/material/Grid'
import LinkIcon from '@mui/icons-material/Link'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import React, { FunctionComponent } from 'react'
import { Button, Divider, IconButton, Typography } from '@mui/material'
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
  name: string
  hash: string
  msg: string
  txOK: boolean
}

interface Props {
  endpoint: string
}

export const Notarize: FunctionComponent<Props> = ({ endpoint }) => {
  const [fileList, setFileList] = useState<File[]>([])
  const [hashList, setHashList] = useState<{ name: string; hash: string }[]>([])
  const [resultList, setResultList] = useState<Result[]>([])

  const openTXLink = (link: string) => {
    // route to new page by changing window.location
    window.open('https://dashboard.mainnet.concordium.software/lookup/' + link, '') //to open new page
  }
  //file list handler
  const handleChange = (file: FileList) => {
    const tempArray = cloneDeep(fileList) as File[]
    Array.from(file).map(f => tempArray.push(f))

    //clean up duplicates
    const cleanArray = uniqBy(tempArray, 'name')
    setFileList(cleanArray)
  }

  //file hashing handler
  useEffect(() => {
    const readFiles = async () => {
      if (fileList && fileList.length > 0) {
        const tempBufferList: { name: string; hash: string }[] = []
        for (const file of fileList) {
          const checksumService = new ChecksumService()
          const hash = await checksumService.sha256(file)
          tempBufferList.push({ name: file.name, hash: hash })
        }
        const cleanArray = uniqBy(tempBufferList, 'hash')
        setHashList(cleanArray)
      }
    }
    readFiles()
  }, [fileList])

  const notarizeFiles = async () => {
    const notaryUrl = endpoint + '/notaryService'
    const finalResultArray: Result[] = []
    for (const file of hashList) {
      try {
        const result = await axios.default.post(notaryUrl, file)
        const data = result.data as Result
        const mergedResult = { ...data, ...file }
        finalResultArray.push(mergedResult)
      } catch (ex) {
        const failedTx = { ...file, msg: 'error', txOK: false }
        finalResultArray.push(failedTx)
      }
    }
    setResultList(finalResultArray)
  }

  return (
    <InputContainer style={{ marginTop: 25 }}>
      {resultList.length === 0 && <FileUploader multiple={true} handleChange={handleChange} name='file' style={{minWidth: 0}}/>}

      <div style={{ width: '80%', height: 180, marginTop: 15, overflow: 'auto' }}>
        {resultList.length === 0 && hashList.map(hash => <div key={hash.hash}>📝 {hash.name}</div>)}

        {resultList.length > 0 &&
          resultList.map(res => (
            <div key={res.hash}>
              {res.txOK && (
                <>
                  ✔️ {res.name}:{' '}
                  <IconButton
                    key={'btn' + res.hash}
                    aria-label='link'
                    size='small'
                    title='See transaction on dashboard'
                    onClick={() => openTXLink(res.msg)}
                  >
                    <LinkIcon fontSize='inherit' />
                  </IconButton>
                  <Typography variant='caption' style={{ overflowWrap: 'anywhere' }}>
                    {res.msg}
                  </Typography>
                </>
              )}
              {!res.txOK && (
                <Typography variant='caption'>
                  ❌ {res.name}: {res.msg}
                </Typography>
              )}
            </div>
          ))}
        <Divider></Divider>
      </div>
      {fileList && fileList.length > 0 && resultList.length === 0 && (
        <ButtonContainer>
          <Button onClick={notarizeFiles}>Notarize files </Button>
        </ButtonContainer>
      )}
    </InputContainer>
  )
}
