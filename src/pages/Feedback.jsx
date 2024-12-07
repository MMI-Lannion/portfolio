import { PageHeading } from '@/components/Typography'
import EditableTextArea from '@/components/EditableTextArea'

export default function Feedback() {
  return (
    <>
      <PageHeading title='Feedback' />

      <EditableTextArea
        placeholder={"Donner un feedback à l'étudiant.e"}
        dataKey='feedback'
        client:load
      />
    </>
  )
}
