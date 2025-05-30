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

import { type NamePath } from 'antd/es/form/interface'
import { Form } from '../form'
import React, { useEffect, useMemo, useState } from 'react'
import { type KeyedListData, KeyedListProvider } from './provider/keyed-list/keyed-list-provider'
import { KeyedListIterator } from './iterator/keyed-list-iterator'
import { cloneDeep, isArray, isEqual, isObject, get, isUndefined, setWith } from 'lodash'
import { useItem } from '../item/provider/item/use-item'

export interface KeyedListProps {
  children: React.ReactNode
  value?: KeyedListData['values']
  onChange?: (value: KeyedListData['values']) => void
  onFieldChange?: (field: NamePath, value: any) => void
  getAdditionalComponentProps?: (name: NamePath) => Record<string, any>
}

const KeyedList = ({ children, value: baseValue, onChange: baseOnChange, onFieldChange, getAdditionalComponentProps }: KeyedListProps): React.JSX.Element => {
  const initialValue = isArray(baseValue) ? {} : baseValue ?? {}
  const [value, setValue] = useState(cloneDeep(initialValue))
  const { name } = useItem()

  const onChange: KeyedListData['onChange'] = (newValue) => {
    baseOnChange !== undefined && baseOnChange(newValue)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isEqual(value, initialValue)) {
        onChange(value)
      }
    }, 300)

    return () => { clearTimeout(timeoutId) }
  }, [value])

  useEffect(() => {
    if (!isEqual(value, initialValue)) {
      setValue(initialValue)
    }
  }, [baseValue])

  const add: KeyedListData['operations']['add'] = (key, newValue = {}) => {
    setValue((currentValue) => {
      if (isObject(currentValue) && currentValue[key] !== undefined) {
        return currentValue
      }

      const _newValue = cloneDeep(currentValue)
      _newValue[key] = newValue
      return _newValue
    })
  }

  const remove: KeyedListData['operations']['remove'] = (key) => {
    const newValue = cloneDeep(value)
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newValue[key]

    setValue(() => newValue)
  }

  const update: KeyedListData['operations']['update'] = (subFieldname, newSubValue, isInitialValue) => {
    const currentName: string[] = isArray(name) ? name : [name]
    const currentSubFieldname: string[] = isArray(subFieldname) ? subFieldname : [subFieldname]

    const nameDifference: string[] = []

    for (let i = 0; i < currentSubFieldname.length; i++) {
      if (currentName[i] !== currentSubFieldname[i]) {
        nameDifference.push(currentSubFieldname[i])
      }
    }

    if (!isInitialValue) {
      onFieldChange?.(currentSubFieldname, newSubValue)
    }

    const setAsObject = (obj): object => {
      if (isUndefined(obj)) {
        return {}
      }

      return obj
    }

    setValue((currentValue) => {
      const newValue = cloneDeep(currentValue)
      setWith(newValue, nameDifference, newSubValue, setAsObject)
      return newValue
    })
  }

  const getValue = (subFieldNames: string[]): any => {
    const currentName: string[] = isArray(name) ? name : [name]
    const nameDifference: string[] = []

    for (let i = 0; i < subFieldNames.length; i++) {
      if (currentName[i] !== subFieldNames[i]) {
        nameDifference.push(subFieldNames[i])
      }
    }

    return get(value, nameDifference)
  }

  return useMemo(() => (
    <KeyedListProvider
      getAdditionalComponentProps={ getAdditionalComponentProps }
      onChange={ onChange }
      operations={ { add, remove, update, getValue } }
      values={ value ?? {} }
    >
      <Form.Group name={ name }>
        {children}
      </Form.Group>
    </KeyedListProvider>
  ), [name, value, children, onChange, add, remove, update, getValue])
}

KeyedList.Iterator = KeyedListIterator

export { KeyedList }
