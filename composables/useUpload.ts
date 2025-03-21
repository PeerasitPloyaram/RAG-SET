export const useUpload = () => {
    const uploadFile = async (file:any) => {
        if (!file) return { error: 'No file selected' }
  
        const formData = new FormData()
        formData.append('file', file)
  
        try {
            const response = await $fetch('http://127.0.0.1:8000/uploadfile/U1234', {
                method: 'POST',
                body: formData,
            })
  
            return response
        } catch (error) {
            console.error('Upload failed:', error)
            return { error: 'Upload failed' }
        }
    }
    return { uploadFile }
}
  