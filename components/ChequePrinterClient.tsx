'use client'

import { useState, useRef } from 'react'
import { ChequeForm } from '@/components/ChequeForm'
import { Cheque } from '@/components/Cheque'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Github, Star } from 'lucide-react'
import Link from 'next/link'

export default function ChequePrinterClient() {
  const [chequeData, setChequeData] = useState<{
    payee: string
    amount: string
    date: string
  } | null>(null)

  const chequeRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (chequeRef.current) {
      const printContents = chequeRef.current.innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <Alert className="mb-6 bg-yellow-100 border-yellow-400 text-yellow-800">
          <InfoIcon className="h-4 w-4 text-yellow-800" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            This system works exclusively with Bank of India cheques. Please ensure you are using a Bank of India cheque book.
          </AlertDescription>
        </Alert>
        <h2 className="text-2xl font-semibold mb-4 text-center">Enter Bank of India Cheque Details</h2>
        <ChequeForm onSubmit={setChequeData} />
      </section>
      {chequeData && (
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">Bank of India Cheque Preview</h2>
          <div className="w-full max-w-3xl">
            <Cheque ref={chequeRef} {...chequeData} />
          </div>
          <Button onClick={handlePrint} className="mt-6 bg-green-500 hover:bg-green-600 text-white">
            Print Bank of India Cheque
          </Button>
        </section>
      )}
      <section className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Open Source Project</h2>
        <p className="text-sm text-gray-600 mb-4">
          This Bank of India Cheque Printing System is an open-source project. We welcome contributions from the community.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="https://github.com/neil-jay/cheque-printing-system" className="inline-flex items-center text-blue-600 hover:underline">
            <Github className="w-5 h-5 mr-2" />
            Fork on GitHub
          </Link>
          <Link href="https://github.com/neil-jay/cheque-printing-system" className="inline-flex items-center text-blue-600 hover:underline">
            <Star className="w-5 h-5 mr-2" />
            Star on GitHub
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Developers can fork the project to contribute, while users can star it to show support!
        </p>
      </section>
    </div>
  )
}