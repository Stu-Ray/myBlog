'use client'

import Cropper from 'react-easy-crop'
import { useCallback, useState } from 'react'
import { getCroppedImg } from '@/utils/cropImage'

export default function ImageCropper({
  image,
  onClose,
  onCropComplete
}: {
  image: string
  onClose: () => void
  onCropComplete: (blob: Blob) => void
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const onCrop = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleDone = async () => {
    const cropped = await getCroppedImg(image, croppedAreaPixels, zoom)
    onCropComplete(cropped)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="relative w-[90vw] h-[70vh] bg-white p-4 rounded shadow-xl">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onCropComplete={onCrop}
          onZoomChange={setZoom}
        />
        <div className="absolute bottom-4 right-4 z-50 flex gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            取消
          </button>
          <button onClick={handleDone} className="px-3 py-1 bg-blue-600 text-white rounded">
            完成裁剪
          </button>
        </div>
      </div>
    </div>
  )
}
