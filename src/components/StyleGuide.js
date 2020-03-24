/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import Text from './Text/Text'
import { TEXT_TYPE } from './Text/Text.styles'
import { PrimaryButton, SecondaryButton } from './Button'
import InputText from './InputText'
import TextArea from './Textarea'
import Autosuggest from './Autosuggest'

class StyleGuide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      facilities: []
    }
  }

  componentDidMount() {
    this.props.backend.listDropSites().then(data => {
      const facilities = data.map((facility) => ({
        name: facility.dropSiteName,
        address: facility.dropSiteAddress,
        id: facility.id
      }))
      this.setState({ facilities })
    })
  }

  render() {
    return (
      <div css={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '1em' }}>
        <h1>Style Guide</h1>
        <hr />
        <Text as='h1' type={TEXT_TYPE.HEADER_1}>Header 1</Text>
        <Text as='h2' type={TEXT_TYPE.HEADER_2}>Header 2</Text>
        <Text as='h3' type={TEXT_TYPE.HEADER_3}>Header 3</Text>
        <Text as='h4' type={TEXT_TYPE.HEADER_4}>Header 4</Text>
        <Text as='p' type={TEXT_TYPE.BODY_1}>Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc faucibus neque finibus ultrices a non risus.</Text>
        <Text as='p' type={TEXT_TYPE.BODY_2}>Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc faucibus neque finibus ultrices a non risus.</Text>
        <Text as='p' >Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc faucibus neque finibus ultrices a non risus.</Text>
        <hr />
        <div css={{ width: 500, '> div': { marginBottom: 10 } }}>
          <div>
            <PrimaryButton onClick={() => false}><Text>Primary Button</Text></PrimaryButton>
          </div>
          <div>
            <PrimaryButton disabled onClick={() => false}><Text>Primary Button Disabled</Text></PrimaryButton>
          </div>
          <div>
            <SecondaryButton onClick={() => false}><Text type={TEXT_TYPE.NOTE}>Secondary Button</Text></SecondaryButton>
          </div>
          <div>
            <SecondaryButton disabled onClick={() => false}><Text type={TEXT_TYPE.NOTE}>Secondary Button Disabled</Text></SecondaryButton>
          </div>
        </div>
        <hr />
        <div css={{ width: 500 }}>
          <div>
            <InputText label="Label" />
          </div>
          <div>
            <Autosuggest label="City or medical facility" suggestions={this.state.facilities} />
          </div>
          <div>
            <TextArea label="i.e.: All donated items must be unused and sealed in original packaging." />
          </div>
        </div>
      </div>
    );
  }
}

export default StyleGuide;