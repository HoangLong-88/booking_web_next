'use client'

// ...existing code...
import { useState } from "react"
import { useStayForm } from "../hook/useStayForm"
import  { useMultipleFileUpload }  from "@/hook/useMultipleFileUpload"
import FormSelect from "@/component/common/FormSelect"
import DragAndDropUpload from "@/component/ui/DragAndDropUpload"
import { Input } from "@/component/ui/input"
import { Label } from "@/component/ui/label"
import { UploadedFile } from "@/types/upload"
import { tree } from "next/dist/build/templates/app-page"

export default function StayForm() {
  const {
    options,
    formData,
    onChange,
    setImages,
    addImage,
    submit,
    locationOptions,
    categoryOptions
  } = useStayForm()

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const {
    previews,
    createPreviews,
    handleUpload,
    } = useMultipleFileUpload ({
        onUploaded: async (files) => {
            setImages(files.map(f => f.path))
        },
    })

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setMessage(null)
        try {
            const uploaded = await handleUpload('uploads/stays');
 
            await submit(uploaded.map(f => f.path))
            setMessage('Created stay successfully')
        } catch (err) {
            console.error(err)
          setMessage('Failed to create stay')
        } finally {
            setSubmitting(false)
        }
      }}
      className="space-y-6 mx-2 w-full p-6 bg-white/80 dark:bg-slate-800 rounded-lg shadow-sm"
    >
      <h1 className="text-2xl font-semibold">Create Stay</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            name="stayName"
            value={formData.stayName}
            onChange={onChange}
            placeholder="Stay name"
            required
          />
          <Label>Stay name</Label>
        </div>

        <div className="relative">
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={onChange}
            placeholder="Price"
            required
          />
          <Label>Price</Label>
        </div>

        <div className="md:col-span-2 relative">
          <textarea
            name="description"
            onChange={onChange}
            placeholder="Description"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[88px] peer placeholder-transparent"
          />
          <Label>Description</Label>
        </div>

        <div className="relative w-full">
          <Input
            name="address"
            onChange={onChange}
            placeholder="Address"
            required
          />
          <Label>Address</Label>
        </div>

        <div className="md:col-span-2 relative flex flex-row justify-between items-center gap-4">
          <div className="w-full">
            <FormSelect
              name="locationID"
              value={formData.locationID}
              options={locationOptions}
              placeholder="Select location"
              onChange={onChange}
            />
          </div>
          <div className="w-full">
            <FormSelect
              name="categoryID"
              value={formData.categoryID}
              options={categoryOptions}
              placeholder="Select category"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
      <div> 
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Images</label>
          <button
            type="button"
            onClick={addImage}
            className="text-sm px-3 py-1 bg-slate-100 rounded hover:bg-slate-200"
          >
            Add empty slot
          </button>
        </div>

        <DragAndDropUpload
          onUploadMultiple={createPreviews}
          preview={previews}
          
          fileName={''}
          accept="image/*"
          multiple={true}

        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-60"
        >
          {submitting ? 'Creating...' : 'Create'}
        </button>

        {message && (
          <div className="text-sm text-gray-700">{message}</div>
        )}
      </div>
    </form>
  )
}