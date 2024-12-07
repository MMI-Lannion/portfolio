import { $sae, $user } from '@/store/Store'
import { useStore } from '@nanostores/react'
import {
  CheckIcon,
  ExclamationTriangleIcon,
  EyeOpenIcon,
  TrashIcon,
  UploadIcon,
} from '@radix-ui/react-icons'
import { Button, Callout, Flex, Link, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import styles from './InputFile.module.css'

const STORAGE_URL = 'https://studio.pinfig.com/storage/v1/object/public'

function removeSpecialCharacters(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
}

const InputFile = ({ onChange = null }) => {
  const [fileError, setFileError] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState(false)
  const [files, setFiles] = useState([])
  const saeId = useStore($sae)
  const user = useStore($user)
  const folder = `sae${removeSpecialCharacters(saeId)}_${user.username}_${user.userId}`

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)
    const maxSize = 5 * 1024 * 1024
    const validFiles = []
    let hasError = false

    selectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        hasError = true
      } else {
        validFiles.push(file)
      }
    })

    setFileError(hasError)
    setFiles((prevFiles) => [...prevFiles, ...validFiles])
    event.target.value = ''
  }

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    for (const file of files) {
      const filePath = `${folder}/${Date.now()}_${file.name}`
      const { data, error } = await supabase.storage
        .from('saeFiles')
        .upload(filePath, file)

      if (error) {
        console.error("Erreur lors de l'upload:", error.message)
        setUploadError(true)
        setUploadSuccess(false)
      } else {
        console.log('Upload réussi:', data)
        setUploadSuccess(true)
        setUploadError(false)
      }
    }

    if (onChange) onChange(folder)
    setFiles([])
  }

  return (
    <Flex
      direction='column'
      gap='3'>
      {fileError && (
        <Callout.Root
          color='red'
          role='alert'>
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>
            Un ou plusieurs fichiers dépassent la limite de 5 Mo.
          </Callout.Text>
        </Callout.Root>
      )}
      {uploadError && (
        <Callout.Root
          color='red'
          role='alert'>
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Erreur lors du téléchargement du fichier.</Callout.Text>
        </Callout.Root>
      )}
      {uploadSuccess && (
        <Callout.Root
          color='green'
          role='alert'>
          <Callout.Icon>
            <CheckIcon />
          </Callout.Icon>
          <Callout.Text>Téléchargement réussi !</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit}>
        <Flex
          gap='3'
          align='center'>
          <div className={styles.inputFile__fileInputContainer}>
            <label
              htmlFor='fileInput'
              className={styles.inputFile__label}>
              <UploadIcon />
              <Text>
                Ajouter un ou plusieurs fichiers : ({files?.length} sélectionnés)
              </Text>
            </label>
            <input
              id='fileInput'
              type='file'
              name='fileInput'
              accept='image/*, video/*, .pdf, .doc, .docx, .odt'
              multiple
              className={styles.inputFile__hiddenInput}
              onChange={handleFileChange}
            />
          </div>

          <Button
            type='submit'
            size='4'>
            <CheckIcon />
            Valider
          </Button>
        </Flex>
      </form>

      {files.length > 0 && (
        <ul className={styles.inputFile__fileList}>
          {files.map((file, index) => (
            <li key={index}>
              <Text>{file.name}</Text>
              <Button
                size='2'
                color='red'
                onClick={() => handleRemoveFile(index)}
                aria-label='Remove file'>
                <TrashIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <FileViewer folderPath={folder} />
    </Flex>
  )
}

const FileViewer = ({ folderPath }) => {
  const [files, setFiles] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFiles = async () => {
      const bucket = 'saeFiles'
      const { data, error } = await supabase.storage.from(bucket).list(folderPath)

      if (error) {
        console.error('Error fetching files:', error.message)
        setError(error.message)
      } else {
        let allFiles = []
        for (const item of data) {
          const encodedFileName = encodeURIComponent(item.name)
          allFiles.push({
            name: item.name,
            publicURL: `${STORAGE_URL}/${bucket}/${folderPath}/${encodedFileName}`,
          })
        }
        setFiles(allFiles)
      }
    }

    fetchFiles()
  }, [folderPath])

  const handleDeleteFile = async (fileName) => {
    const bucket = 'saeFiles'
    const { error } = await supabase.storage
      .from(bucket)
      .remove([`${folderPath}/${fileName}`])

    if (error) {
      console.error('Error deleting file:', error.message)
      setError('Erreur lors de la suppression du fichier.')
    } else {
      console.log('File deleted successfully:', `${folderPath}/${fileName}`)
      setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName))
      setError(null)
    }
  }

  return (
    <Flex
      direction='column'
      gap='3'>
      {error && (
        <Callout.Root
          color='red'
          role='alert'>
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>Erreur lors de la récupération des fichiers.</Callout.Text>
        </Callout.Root>
      )}

      {files.length > 0 ? (
        <ul className={styles.inputFile__fileList}>
          {files.map((file, index) => (
            <li key={index}>
              <Text>{file.name}</Text>

              <Flex gap='2'>
                <Button
                  color='red'
                  onClick={() => handleDeleteFile(file.name)}
                  aria-label={`Delete ${file.name}`}>
                  <TrashIcon />
                </Button>

                <Link
                  size='2'
                  color='blue'
                  href={file.publicURL}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`View ${file.name}`}>
                  <Button>
                    <EyeOpenIcon />
                  </Button>
                </Link>
              </Flex>
            </li>
          ))}
        </ul>
      ) : (
        <Text>Aucun fichier trouvé</Text>
      )}
    </Flex>
  )
}

export default InputFile
