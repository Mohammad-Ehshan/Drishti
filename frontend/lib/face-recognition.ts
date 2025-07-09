import * as faceapi from 'face-api.js'

export async function createFaceEncoding(file: File) {
  const image = await faceapi.bufferToImage(file)
  const detections = await faceapi
    .detectSingleFace(image)
    .withFaceLandmarks()
    .withFaceDescriptor()
    
  if (!detections) throw new Error('No face detected')
  return Array.from(detections.descriptor)
}

export async function processUploads(formData: FormData) {
  const name = formData.get('name') as string
  const primaryPhoto = formData.get('primaryPhoto') as File
  const profilePhoto = formData.get('profilePhoto') as File | null
  const altPhoto = formData.get('altPhoto') as File | null
  
  if (!primaryPhoto) {
    throw new Error('Primary photo is required')
  }
  
  try {
    // Load face-api models
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    
    const encodings = [
      await createFaceEncoding(primaryPhoto),
      ...(profilePhoto ? [await createFaceEncoding(profilePhoto)] : []),
      ...(altPhoto ? [await createFaceEncoding(altPhoto)] : [])
    ]
    
    return {
      name,
      encodings,
      metadata: {
        lastLocation: formData.get('lastLocation') || '',
        timestamp: new Date().toISOString(),
        photosCount: encodings.length
      }
    }
  } catch (error) {
    console.error('Face processing error:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to process face: ${error.message}`)
    } else {
      throw new Error('Failed to process face: Unknown error')
    }
  }
}