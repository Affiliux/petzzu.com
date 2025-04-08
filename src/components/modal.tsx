'use client'

import React from 'react'

import { Modal, ModalBody, ModalContent } from '@/components/ui/animated-modal'

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  childen: React.ReactNode
}

export default function AnimatedModal({ isOpen, onClose, childen }: AnimatedModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalBody>
        <ModalContent>{childen}</ModalContent>
      </ModalBody>
    </Modal>
  )
}
