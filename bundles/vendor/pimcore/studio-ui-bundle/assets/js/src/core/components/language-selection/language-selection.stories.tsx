/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type Meta } from '@storybook/react'
import { LanguageSelection } from './language-selection'

const config: Meta = {
  title: 'Components/Controls/LanguageSelection',
  component: LanguageSelection,
  parameters: {
    layout: 'fullscreen'

  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    languages: [
      'EN',
      'DE',
      'FR'
    ],
    selectedLanguage: 'EN',
    onSelectLanguage: (language: string) => {
      console.log('Selected language:', language)
    }
  }
}
