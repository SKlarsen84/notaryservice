import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #000000;
  @media only screen and (max-width: 320px) {
    width: 100%;
    height: 100%;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 100%;
    height: 100%;
    h4 {
      font-size: small;
    }
  }
`

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`

export const FileUploaderDiv = styled.div`
  border: dashed 1px #DDDDDD;
  width: 290px;
  height: 47px;
  padding: 3px;
  padding-top: 19px;
  text-align: center;
  vertical-align: middle;
  line-height: 20px;
  cursor: pointer;

`


export const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
`

export const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`
