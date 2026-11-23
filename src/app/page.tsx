'use client'

import { useState } from 'react'
import HomePage from '@/components/pages/HomePage'
import UploadPage from '@/components/pages/UploadPage'
import ModelSelector from '@/components/model-selector/ModelSelector'
import ConfigPanel, { GenerationConfig } from '@/components/config-panel/ConfigPanel'
import GeneratingPage from '@/components/pages/GeneratingPage'
import ResultPage from '@/components/pages/ResultPage'
import ProfilePage from '@/components/pages/ProfilePage'

type Page = 'home' | 'upload' | 'config' | 'generating' | 'result' | 'profile'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>('xiaoya')

  const handleUploadComplete = (file: File | null) => {
    setUploadedFile(file)
    if (file) setCurrentPage('config')
  }

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId)
  }

  const handleGenerate = (config: GenerationConfig) => {
    setCurrentPage('generating')
  }

  const handleGenerationComplete = () => {
    setCurrentPage('result')
  }

  const handleNewGeneration = () => {
    setCurrentPage('upload')
    setUploadedFile(null)
  }

  return (
    <>
      {currentPage === 'home' && (
        <HomePage 
          onUpload={() => setCurrentPage('upload')}
          onGenerate={() => setCurrentPage('upload')}
        />
      )}
      
      {currentPage === 'upload' && (
        <UploadPage onUploadComplete={handleUploadComplete} />
      )}
      
      {currentPage === 'config' && (
        <div className="container-mobile mx-auto px-4 py-6 space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {['上传', '配置', '生成'].map((step, idx) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  idx <= 1 ? "bg-primary text-white" : "bg-ink-100 text-ink-500"
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-sm ${idx <= 1 ? "text-primary font-medium" : "text-ink-500"}`}>
                  {step}
                </span>
                {idx < 2 && <div className="w-8 h-px bg-ink-300" />}
              </div>
            ))}
          </div>

          <ModelSelector onSelect={handleModelSelect} />
          
          <div className="pt-6 border-t border-ink-100">
            <h2 className="text-base font-semibold text-ink-900 mb-4">生成配置</h2>
            <ConfigPanel 
              modelId={selectedModel} 
              onGenerate={handleGenerate}
            />
          </div>
        </div>
      )}
      
      {currentPage === 'generating' && (
        <GeneratingPage onComplete={handleGenerationComplete} />
      )}
      
      {currentPage === 'result' && (
        <ResultPage 
          onNewGeneration={handleNewGeneration}
          onViewProfile={() => setCurrentPage('profile')}
        />
      )}
      
      {currentPage === 'profile' && (
        <ProfilePage />
      )}
    </>
  )
}
