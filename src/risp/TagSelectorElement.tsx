import React from 'react'
import { Renderer, RenderingProps } from 'react-interactive-stateful-process'
import { TasenorSetup, Tag, TagModel, TagsElement } from '@dataplug/tasenor-common'
import { isNamedElement } from 'interactive-elements'
import { TagGroup } from '..'
import { FormGroup, FormLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'


export const TagsSelectorRenderer: Renderer<TasenorSetup, TagsElement> = (props: RenderingProps<TasenorSetup, TagsElement>) => {
  const { t } = useTranslation()
  const { element, setup, values } = props
  const [selected, setSelected] = React.useState<Tag[]>(isNamedElement(element) ? values[element.name] as Tag[] || [] : [])
  const label = ('label' in element) ? element.label : ((isNamedElement(element) && element.name) ? t(`label-${element.name}`) : '')

  let Selector = <></>
  const tags: Record<Tag, TagModel> = setup.store.db ? setup.store.dbsByName[setup.store.db].tagsByTag : {}

  if ('types' in element) {
    Selector = (
      <TagGroup
        tags={tags}
        single={!!element.single}
        types={element.types}
        onChange={(selected) => {
          setSelected(selected)
          const newValue = element.single ? selected[0] : selected
          element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: newValue }, props)
        }}
        selected={selected}
      />
    )
  } else if ('options' in element) {
    Selector = (
      <TagGroup
        tags={tags}
        single={!!element.single}
        options={element.options}
        onChange={(selected) => {
          setSelected(selected)
          const newValue = element.single ? selected[0] : selected
          element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: newValue }, props)
        }}
        selected={selected}
      />
    )
  } else {
    throw new Error(`Unable to figure out how to render selector ${JSON.stringify(element)}.`)
  }
  return <FormGroup>
    <FormLabel>{label}</FormLabel>
    {Selector}
  </FormGroup>
}
