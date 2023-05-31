import { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import PlayButton from './PlayButton'
import FavoriteButton from './FavoriteBtn'
import useInfoModal from '@/hooks/useInfoModal'
import useMovie from '@/hooks/useMovie'

interface InfoModalProps {
  visible?: boolean
  onClose: any
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  // why InfoModal hold its own state? why dont it use zustand store directly?
  const [isVisible, setIsVisible] = useState(!!visible)

  const { movieId } = useInfoModal()
  const { data = {} } = useMovie(movieId as string)

  useEffect(() => {
    setIsVisible(!!visible)
  }, [visible])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  if (!visible)
    return null

  return (
    // here is the full mask
    <div
      className='
        z-50
        transition
        duration-300 // turn to black slowly
        bg-black
        bg-opacity-80
        flex
        justify-center
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
      '
    >

      {/* Modal Body */}
      <div
        className='
          relative
          w-auto
          mx-auto
          max-w-3xl
          rounded-md
          overflow-hidden
        '
      >
        <div
          className={`
            ${isVisible ? 'scale-100' : 'scale-0'}
            transform
            duration-300
            relative
            flex-auto
            bg-zinc-900
            drop-shadow-md
          `}
        >
          <div
            className='relative h-96'
          >
            <video
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
              className='w-full brightness-[60%] object-cover h-full'
            />

            {/* close icon */}
            <div
              className='
                cursor-pointer
                absolute
                top-3
                right-3
                h-10
                w-10
                rounded-full
                bg-black
                bg-opacity-70
                flex
                items-center
                justify-center
              '
            >
              <AiOutlineClose className='text-white' size={20}/>
            </div>

            {/* Action Buttons */}
            <div
              className='
                absolute
                bottom-[10%]
                left-10
              '
            >
              <p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
                {data?.title}
              </p>
              <div className='flex flex-row gap-4 items-center'>
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className='px-12 py-8'>
            <p className='text-green-400 font-semibold text-lg'>
              New
            </p>
            <p className='text-white text-lg'>
              {data?.duration}
            </p>
            <p className='text-white text-lg'>
              {data?.genre}
            </p>
            <p className='text-white text-lg'>
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InfoModal
