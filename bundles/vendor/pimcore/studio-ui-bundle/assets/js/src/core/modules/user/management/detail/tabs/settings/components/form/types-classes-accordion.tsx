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

import React from 'react'
import { Form } from 'antd'
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { useTranslation } from 'react-i18next'
import { Select } from '@Pimcore/components/select/select'

const TypesAndClassesAccordion = ({ ...props }): React.JSX.Element => {
  const { t } = useTranslation()

  const content = [
    {
      key: '1',
      title: <>{ t('user-management.types-and-classes') }</>,
      children: (
        <Form.Item
          name="classes"
        >
          <Select
            mode="multiple"
            options={ [] }
            placeholder={ t('user-management.classes') }
          ></Select>
        </Form.Item>
      )
    }
  ]
  return (
    <Accordion
      activeKey={ '1' }
      bordered
      items={ content }
      size={ 'small' }
    />
  )
}
export { TypesAndClassesAccordion }
