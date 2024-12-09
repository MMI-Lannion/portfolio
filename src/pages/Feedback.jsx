import { PageHeading } from '@/components/Typography'
import EditableTextArea from '@/components/EditableTextArea'
import { ButtonValidate } from '@/components/ButtonValidate'
import { Flex } from '@radix-ui/themes'
import { ButtonPrev } from '@/components/ButtonNext'

export default function Feedback() {
  return (
    <>
      <PageHeading title='Feedback' />

      <EditableTextArea
        placeholder={"Donner un feedback à l'étudiant.e"}
        dataKey='feedback'
      />

      <Flex
        justify='end'
        align='end'
        direction='row'
        m='3'
        gapX='3'>
        <ButtonPrev
          name='Précédent'
          href='/'
        />
        <ButtonValidate isFeedback={true} />
      </Flex>
    </>
  )
}
