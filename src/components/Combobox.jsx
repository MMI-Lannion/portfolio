import { $competencesCles, $saeData, $updateCompetenceCle } from '@/store/Store'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { AutoComplete } from './AutoComplete'

export function Combobox() {
  const [saeData, setSaeData] = useState([])

  const competencesCles = useStore($competencesCles) || []
  const competenceCle = saeData?.competenceCle
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setSaeData($saeData.get())
    }, 0)
  }, [])

  return (
    <>
      <AutoComplete
        data={competencesCles}
        defaultValue={competenceCle}
        onSelect={(item) => {
          setOpen(false)
          $updateCompetenceCle(item)
        }}
      />
    </>
  )
}
