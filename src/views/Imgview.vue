<template>
  <div>
    <input type="file" @change="uploadImage" accept="image/*">
    <div v-if="uploadedImageUrl">
      <img :src="uploadedImageUrl" alt="Uploaded Image">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedImageUrl: null
    }
  },
  methods: {
    async uploadImage(event) {
      const file = event.target.files[0]
      const formData = new FormData()

      // Your Cloudinary configuration
      const cloudName = 'die2xceeh'
      const uploadPreset = 'plan_path'

      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        )

        const result = await response.json()
        this.uploadedImageUrl = result.secure_url
        console.log(result.secure_url)
      } catch (error) {
        console.error('Upload failed', error)
      }
    }
  }
}
</script>
