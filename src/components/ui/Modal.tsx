import { Dialog, Transition } from '@headlessui/react'
import { RiCloseLine as IconClose } from 'react-icons/ri'

import { Fragment, ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  className?: string
  hideCloseButton?: boolean
}

export default function Modal(props: ModalProps): JSX.Element {
  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog onClose={() => props?.onClose?.()}>
        <Transition.Child
          as={Fragment}
          enter="ease-linear duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-linear duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-20 bg-white/25 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-rk-easing duration-350"
          enterFrom="opacity-0 translate-y-[20%]"
          enterTo="opacity-100 translate-y-0"
          leave="ease-rk-easing duration-350"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-[20%]"
        >
          <div className="fixed inset-x-0 top-0 z-30 h-screen overflow-auto">
            <div className="flex min-h-screen items-end justify-center sm:items-center">
              <Dialog.Panel
                className={`relative w-full bg-white/90 sm:max-w-[768px] sm:max-w-[480px] ${props.className} rounded-md`}
              >
                {!props.hideCloseButton && (
                  <div
                    className="absolute top-0 right-0 flex h-12 w-14 cursor-pointer items-center justify-center justify-center p-2 transition-colors duration-200"
                    onClick={() => props?.onClose?.()}
                  >
                    <IconClose className="h-[18px] w-[18px]" />
                  </div>
                )}
                <div className="p-8">{props.children}</div>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
